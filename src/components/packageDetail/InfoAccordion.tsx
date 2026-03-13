import { ChevronDown } from 'lucide-react'
import type { Policy } from '../../types/catalog'

type InfoAccordionProps = {
  policies: Policy
  openAccordions: Record<string, boolean>
  onToggle: (key: string) => void
}

export function InfoAccordion({ policies, openAccordions, onToggle }: InfoAccordionProps) {
  const sections = [
    { key: 'about', title: 'About Service', body: policies.about },
    { key: 'deliverables', title: 'Deliverables', body: policies.deliverables ?? 'Deliverables are confirmed after booking.' },
    { key: 'timeline', title: 'Timeline', body: policies.timeline ?? 'Timeline will be shared by the vendor team.' },
    { key: 'cancellation', title: 'Cancellation', body: policies.cancellation },
    { key: 'reschedule', title: 'Reschedule', body: policies.reschedule },
  ]

  return (
    <div className="mt-4 space-y-3">
      {sections.map((section) => (
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
              className={`text-[#7A93B8] transition-transform ${openAccordions[section.key] ? 'rotate-180' : ''}`}
            />
          </div>
          {openAccordions[section.key] && <p className="mt-2 text-sm text-[#6B7A90]">{section.body}</p>}
        </button>
      ))}
    </div>
  )
}
