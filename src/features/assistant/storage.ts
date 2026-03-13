import type { RuleOption, RuleState } from './rules'

export type AssistantLanguage = 'en' | 'mm'

export type AssistantAction = { type: 'NAVIGATE'; path: string; label?: string }

export type AssistantMessage = {
  role: 'user' | 'bot'
  text: string
  selectedOptionId?: string
  options?: RuleOption[]
  actions?: AssistantAction[]
}

const LANG_KEY = 'everafter.assistant.lang.v1'
const CHAT_KEY = 'everafter.assistant.chat.v1'
const ENABLED_KEY = 'everafter.assistant.enabled.v1'
const STATE_KEY = 'everafter.assistant.state.v1'

export function getAssistantEnabled(): boolean {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(ENABLED_KEY) === '1'
}

export function setAssistantEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(ENABLED_KEY, enabled ? '1' : '0')
}

export function getAssistantLanguage(): AssistantLanguage {
  if (typeof window === 'undefined') return 'en'
  const value = window.localStorage.getItem(LANG_KEY)
  return value === 'mm' ? 'mm' : 'en'
}

export function setAssistantLanguage(lang: AssistantLanguage): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LANG_KEY, lang)
}

export function getAssistantChatHistory(): AssistantMessage[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = JSON.parse(window.localStorage.getItem(CHAT_KEY) || '[]')
    if (!Array.isArray(raw)) return []

    return raw
      .filter((item) => item && (item.role === 'user' || item.role === 'bot') && typeof item.text === 'string')
      .map((item) => ({
        role: item.role,
        text: item.text,
        selectedOptionId: typeof item.selectedOptionId === 'string' ? item.selectedOptionId : undefined,
        options: Array.isArray(item.options)
          ? item.options
              .filter((entry: unknown) => {
                if (!entry || typeof entry !== 'object') return false
                const candidate = entry as { id?: string; label?: string }
                return typeof candidate.id === 'string' && typeof candidate.label === 'string'
              })
              .slice(0, 8)
          : undefined,
        actions: Array.isArray(item.actions)
          ? item.actions
              .filter((entry: unknown) => {
                if (!entry || typeof entry !== 'object') return false
                const candidate = entry as { type?: string; path?: string }
                return candidate.type === 'NAVIGATE' && typeof candidate.path === 'string'
              })
              .map((entry: { path: string; label?: string }) => ({
                type: 'NAVIGATE' as const,
                path: entry.path,
                label: typeof entry.label === 'string' ? entry.label : undefined,
              }))
          : undefined,
      }))
      .slice(-60)
  } catch {
    return []
  }
}

export function setAssistantChatHistory(messages: AssistantMessage[]): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CHAT_KEY, JSON.stringify(messages.slice(-60)))
}

export function clearAssistantChatHistory(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(CHAT_KEY)
}

export function getAssistantRuleState(): RuleState | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = JSON.parse(window.localStorage.getItem(STATE_KEY) || 'null')
    if (!raw || typeof raw !== 'object') return null

    if (typeof raw.step !== 'string') return null

    return {
      step: raw.step,
      mode: raw.mode === 'vendor' || raw.mode === 'package' ? raw.mode : null,
      categoryId: typeof raw.categoryId === 'string' ? raw.categoryId : null,
      budget: typeof raw.budget === 'number' ? raw.budget : null,
      guestCount: typeof raw.guestCount === 'number' ? raw.guestCount : null,
    }
  } catch {
    return null
  }
}

export function setAssistantRuleState(state: RuleState): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STATE_KEY, JSON.stringify(state))
}

export function clearAssistantRuleState(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STATE_KEY)
}
