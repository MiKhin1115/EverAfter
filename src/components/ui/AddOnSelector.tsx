import { Check } from 'lucide-react'

type AddOnItem = {
  key: string
  label: string
}

type AddOnSelectorProps = {
  options: AddOnItem[]
  selected: Record<string, boolean>
  onToggle: (key: string) => void
}

export function AddOnSelector({ options, selected, onToggle }: AddOnSelectorProps) {
  return (
    <div className="mt-3 space-y-2">
      {options.map((option) => {
        const checked = !!selected[option.key]

        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onToggle(option.key)}
            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition ${
              checked
                ? 'border-[#0D5CAB]/40 bg-[#E8F1FB] text-[#0D5CAB]'
                : 'border-[#E8F1FB] bg-white text-slate-700'
            }`}
          >
            <span>{option.label}</span>
            <span
              className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${
                checked ? 'border-[#0D5CAB] bg-[#0D5CAB] text-white' : 'border-[#CBD5E1] bg-white text-transparent'
              }`}
            >
              <Check size={14} />
            </span>
          </button>
        )
      })}
    </div>
  )
}
