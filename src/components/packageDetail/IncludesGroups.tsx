import { Check } from 'lucide-react'
import type { IncludesGroup } from '../../types/catalog'

type IncludesGroupsProps = {
  groups: IncludesGroup[]
}

export function IncludesGroups({ groups }: IncludesGroupsProps) {
  return (
    <div className="mt-4 rounded-3xl bg-white p-5 shadow-[0_14px_30px_rgba(13,92,171,0.1)]">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">What’s Included</h2>
      <div className="mt-4 space-y-4">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#7A93B8]">{group.title}</h3>
            <ul className="mt-2 space-y-2 text-sm text-[#6B7A90]">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F1FB] text-[#0D5CAB]">
                    <Check size={14} />
                  </span>
                  <span className="font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
