import type { AddOnGroup } from '../../types/catalog'

type AddOnGroupsProps = {
  groups: AddOnGroup[]
  selected: Record<string, boolean>
  onSelect: (id: string) => void
  formatMMK: (value: number) => string
}

export function AddOnGroups({ groups, selected, onSelect, formatMMK }: AddOnGroupsProps) {
  return (
    <div className="mt-4 rounded-3xl bg-white p-5 shadow-[0_14px_30px_rgba(13,92,171,0.1)]">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">Customization</h2>

      <div className="mt-3 space-y-4">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#7A93B8]">{group.title}</h3>

            <div className="mt-2 space-y-2">
              {group.items.map((item) => {
                const checked = !!selected[item.id]

                return (
                  <label
                    key={item.id}
                    htmlFor={item.id}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                      checked
                        ? 'border-[#0D5CAB]/40 bg-[#E8F1FB] text-[#0D5CAB]'
                        : 'border-[#E8F1FB] bg-white text-slate-700'
                    }`}
                  >
                    <span>{item.name}</span>

                    <span className="inline-flex items-center gap-2">
                      <span className="text-xs font-semibold">
                        +{formatMMK(item.addPriceMMK ?? 0)} MMK
                      </span>

                      <input
                        id={item.id}
                        type="checkbox"
                        checked={checked}
                        onChange={() => onSelect(item.id)}
                        className="h-6 w-6 accent-[#0D5CAB]"
                      />
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}