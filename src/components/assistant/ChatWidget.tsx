import { useEffect, useMemo, useRef, useState } from 'react'
import { MessageCircle, RotateCcw, X } from 'lucide-react'
import {
  clearAssistantChatHistory,
  clearAssistantRuleState,
  getAssistantChatHistory,
  getAssistantLanguage,
  getAssistantRuleState,
  setAssistantChatHistory,
  setAssistantLanguage,
  setAssistantRuleState,
  type AssistantLanguage,
  type AssistantMessage,
} from '../../features/assistant/storage'
import { getInitialRuleResult, initialRuleState, runRuleTransition } from '../../features/assistant/rules'
import { TEXT, t } from '../../features/assistant/i18n'

type ChatWidgetProps = {
  enabled: boolean
  open: boolean
  onOpenChange: (next: boolean) => void
  onNavigate: (path: string) => void
  isHomeView: boolean
}

export function ChatWidget({ enabled, open, onOpenChange, onNavigate, isHomeView }: ChatWidgetProps) {
  const [lang, setLang] = useState<AssistantLanguage>(() => getAssistantLanguage())
  const [ruleState, setRuleState] = useState(() => getAssistantRuleState() ?? initialRuleState)
  const [messages, setMessages] = useState<AssistantMessage[]>(() => {
    const saved = getAssistantChatHistory()
    if (saved.length > 0) return saved
    const initial = getInitialRuleResult(getAssistantLanguage())
    return [{ role: 'bot', text: initial.botText, options: initial.nextOptions, actions: initial.actions }]
  })

  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setAssistantLanguage(lang)
  }, [lang])

  useEffect(() => {
    setAssistantChatHistory(messages)
  }, [messages])

  useEffect(() => {
    setAssistantRuleState(ruleState)
  }, [ruleState])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  if (!enabled) return null

  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const hideOnHome = isHomeView && pathname === '/'

  const latestBotOptions = useMemo(() => {
    const latestBot = [...messages].reverse().find((item) => item.role === 'bot' && item.options && item.options.length > 0)
    return latestBot?.options ?? []
  }, [messages])

  const resetChat = (nextLang: AssistantLanguage = lang) => {
    clearAssistantChatHistory()
    clearAssistantRuleState()
    const initial = getInitialRuleResult(nextLang)
    setRuleState(initialRuleState)
    setMessages([{ role: 'bot', text: initial.botText, options: initial.nextOptions, actions: initial.actions }])
  }

  const handleOptionClick = (optionId: string, optionLabel: string) => {
    const transition = runRuleTransition(ruleState, optionId, lang)

    setRuleState(transition.nextState)
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: optionLabel, selectedOptionId: optionId },
      {
        role: 'bot',
        text: transition.result.botText,
        options: transition.result.nextOptions,
        actions: transition.result.actions,
      },
    ])

    if (transition.result.actions && transition.result.actions.length > 0) {
      const action = transition.result.actions[0]
      if (action.type === 'NAVIGATE') {
        window.setTimeout(() => {
          onNavigate(action.path)
          onOpenChange(false)
        }, 180)
      }
    }
  }

  return (
    <>
      {!hideOnHome && (
        <button
          type="button"
          onClick={() => onOpenChange(!open)}
          className="fixed bottom-5 right-4 z-[72] inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#0D5CAB] to-[#1A73D9] text-white shadow-[0_12px_28px_rgba(13,92,171,0.35)]"
          aria-label="Open Romantix"
        >
          <MessageCircle size={20} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-20 right-4 z-[85] w-[360px] max-w-[calc(100vw-1rem)] overflow-hidden rounded-2xl border border-[#CFE3FA] bg-white shadow-[0_18px_42px_rgba(13,92,171,0.3)]">
          <header className="flex items-center justify-between bg-[#0D5CAB] px-3 py-2 text-white">
            <div>
              <h2 className="text-sm font-semibold">{t(lang, TEXT.title)}</h2>
              <p className="text-[10px] text-[#E8F1FB]">{lang === 'mm' ? t(lang, TEXT.versionMM) : t(lang, TEXT.versionEN)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const next = lang === 'en' ? 'mm' : 'en'
                  setLang(next)
                  resetChat(next)
                }}
                className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-[#0D5CAB]"
              >
                {lang === 'mm' ? 'EN' : 'MM'}
              </button>

              <button
                type="button"
                onClick={() => resetChat()}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0D5CAB]"
                aria-label="Reset chat"
              >
                <RotateCcw size={13} />
              </button>

              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0D5CAB]"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>
          </header>

          <div ref={listRef} className="h-[500px] overflow-y-auto bg-[#F5F7FA] p-3">
            <div className="space-y-2">
              {messages.map((message, index) => {
                const isUser = message.role === 'user'
                const bubbleClass = isUser ? 'bg-[#0D5CAB] text-white' : 'bg-white text-[#0D5CAB] border border-[#E8F1FB]'

                return (
                  <div key={`${message.role}-${index}`} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[86%] rounded-2xl px-3 py-2 text-sm ${bubbleClass}`}>
                      <p>{message.text}</p>

                      {!isUser && message.options && message.options.length > 0 && (
                        <div className="mt-2 space-y-1.5">
                          {message.options.slice(0, 4).map((option) => (
                            <button
                              key={`${option.id}-${index}`}
                              type="button"
                              onClick={() => handleOptionClick(option.id, option.label)}
                              className="w-full rounded-xl border border-[#CFE3FA] bg-[#E8F1FB] px-3 py-2 text-left text-xs font-medium text-[#0D5CAB]"
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

              {latestBotOptions.length > 4 && (
                <div className="flex justify-start">
                  <div className="max-w-[86%] rounded-2xl border border-[#E8F1FB] bg-white px-3 py-2 text-xs text-[#7A93B8]">
                    {lang === 'mm' ? 'ပိုမိုရွေးချယ်ရန် နောက်အဆင့်ကိုနှိပ်ပါ။' : 'Tap to continue for more options.'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
