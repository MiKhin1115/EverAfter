import { ChevronDown } from 'lucide-react'

type AccordionItem = {
  key: string
  title: string
  body: string
}

type AccordionProps = {
  items: AccordionItem[]
  openMap: Record<string, boolean>
  onToggle: (key: string) => void
}

export function Accordion({ items, openMap, onToggle }: AccordionProps) {
  return (
    <div className="mt-4 space-y-3">
      {items.map((section) => (
        <button
          key={section.key}
          type="button"
          onClick={() => onToggle(section.key)}
          className="w-full rounded-2xl bg-white px-4 py-4 text-left shadow-[0_12px_24px_rgba(13,92,171,0.08)]"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900">{section.title}</span>
            <ChevronDown
              size={16}
              className={`text-[#7A93B8] transition-transform ${openMap[section.key] ? 'rotate-180' : ''}`}
            />
          </div>
          {openMap[section.key] && <p className="mt-2 text-sm text-[#6B7A90]">{section.body}</p>}
        </button>
      ))}
    </div>
  )
}
