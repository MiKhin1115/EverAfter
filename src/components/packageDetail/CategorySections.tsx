import { Check } from 'lucide-react'
import type { ExtraSection } from '../../types/catalog'

type CategorySectionsProps = {
  sections: ExtraSection[]
  selectedChoices: Record<string, string>
  onSelectChoice: (key: string, value: string) => void
  selectedTravelMonth: string
  onSelectTravelMonth: (value: string) => void
  formatMMK: (value: number) => string
}

export function CategorySections({
  sections,
  selectedChoices,
  onSelectChoice,
  selectedTravelMonth,
  onSelectTravelMonth,
  formatMMK,
}: CategorySectionsProps) {
  return (
    <div className="mt-4 space-y-4">
      {sections.map((section, sectionIndex) => {
        if (section.type === 'STYLE_GALLERY') {
          return (
            <div key={`${section.type}-${sectionIndex}`} className="rounded-3xl bg-white p-5 shadow-[0_14px_30px_rgba(13,92,171,0.1)]">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">{section.title}</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {section.items.map((item) => (
                  <div key={item.label} className="overflow-hidden rounded-2xl border border-[#E8F1FB] bg-[#F8FAFF]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={item.image} alt={item.label} className="h-full w-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/25 to-transparent" />
                    </div>
                    <p className="px-3 py-2 text-xs font-medium text-slate-700">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        }

        if (section.type === 'SPEC_TABLE') {
          return (
            <div key={`${section.type}-${sectionIndex}`} className="rounded-3xl bg-white p-5 shadow-[0_14px_30px_rgba(13,92,171,0.1)]">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">{section.title}</h2>
              <div className="mt-3 grid gap-3 text-xs text-[#6B7A90]">
                {section.rows.map((row) => (
                  <div key={row.label} className="flex justify-between rounded-2xl border border-[#E8F1FB] bg-[#F8FAFF] px-4 py-3">
                    <span>{row.label}</span>
                    <span className="font-semibold text-slate-900">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        }

        if (section.type === 'CHOICE_CHIPS') {
          return (
            <div key={`${section.type}-${section.key}-${sectionIndex}`} className="rounded-3xl bg-white p-5 shadow-[0_14px_30px_rgba(13,92,171,0.1)]">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">{section.title}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {section.choices.map((choice) => {
                  const active = selectedChoices[section.key] === choice
                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => onSelectChoice(section.key, choice)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold ${
                        active ? 'bg-[#CFE3FA] text-[#0D5CAB]' : 'bg-[#E8F1FB] text-[#6B7A90]'
                      }`}
                    >
                      {choice}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        }

        if (section.type === 'MENU_TIERS') {
          return (
            <div key={`${section.type}-${sectionIndex}`} className="rounded-3xl bg-white p-5 shadow-[0_14px_30px_rgba(13,92,171,0.1)]">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">{section.title}</h2>
              <div className="mt-3 space-y-2">
                {section.tiers.map((tier) => (
                  <div key={tier.name} className="rounded-2xl border border-[#E8F1FB] bg-[#F8FAFF] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">{tier.name}</p>
                      <p className="text-xs font-semibold text-[#0D5CAB]">+{formatMMK(tier.priceAdd)} MMK</p>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {tier.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check size={12} className="text-[#0D5CAB]" /> {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )
        }

        return (
          <div key={`${section.type}-${sectionIndex}`} className="rounded-3xl bg-white p-5 shadow-[0_14px_30px_rgba(13,92,171,0.1)]">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">{section.title}</h2>
            <div className="mt-4">
              <label className="text-xs font-semibold text-[#6B7A90]">Travel Month</label>
              <select
                value={selectedTravelMonth}
                onChange={(event) => onSelectTravelMonth(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#E8F1FB] bg-white px-4 py-3 text-sm text-slate-700"
              >
                {section.months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )
      })}
    </div>
  )
}
