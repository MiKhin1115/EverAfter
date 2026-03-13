import { ArrowLeft, ArrowRight, Bot } from 'lucide-react'
import type { Package } from '../types/catalog'
import { SectionCard } from '../components/ui/SectionCard'

type AiViewProps = {
  goBack: () => void
  openPackages: () => void
  aiSuggestions: Package[]
  openPackageDetail: (pack: Package) => void
  getPackageImage: (pack: Package) => string
  formatMMK: (value: number) => string
  applyBudgetPreset: (min: number, max: number) => void
  mmkMax: number
  openSelectionPage: () => void
}

export function AiView({
  goBack,
  openPackages,
  aiSuggestions,
  openPackageDetail,
  getPackageImage,
  formatMMK,
  applyBudgetPreset,
  mmkMax,
  openSelectionPage,
}: AiViewProps) {
  const budgetPresets = [
    { label: 'Under 5,000,000 MMK', min: 0, max: 5_000_000 },
    { label: '5–10 Million MMK', min: 5_000_000, max: 10_000_000 },
    { label: '10 Million+ MMK', min: 10_000_000, max: mmkMax },
  ]

  return (
    <main className="mx-auto max-w-[480px] pb-24 font-poppins">
      <header className="rounded-b-[32px] bg-white px-4 pb-4 pt-5 shadow-[0_12px_26px_rgba(13,92,171,0.12)]">
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={goBack}
            className="absolute left-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0D5CAB] shadow-sm"
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold text-slate-900">AI Planner</h1>
        </div>
      </header>

      <section className="space-y-6 px-4 pt-6">
        <SectionCard className="rounded-3xl bg-white p-5 shadow-[0_14px_30px_rgba(13,92,171,0.12)]">
          <div className="flex items-start gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F1FB] text-[#0D5CAB]">
              <Bot size={22} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Your wedding assistant</h2>
              <p className="mt-1 text-sm text-[#6B7A90]">
                I can suggest curated packages, help balance your budget, and take you straight to booking details.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Plan a 10M wedding', 'Show romantic photo packages', 'Find premium venues'].map((prompt) => (
              <span key={prompt} className="rounded-full bg-[#F5F7FA] px-3 py-1 text-xs font-medium text-[#6B7A90]">
                {prompt}
              </span>
            ))}
          </div>
        </SectionCard>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">Suggested Packages</h2>
            <button type="button" onClick={openPackages} className="text-xs font-semibold text-[#0D5CAB]">
              View all
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {aiSuggestions.map((pack) => (
              <article
                key={pack.id}
                onClick={() => openPackageDetail(pack)}
                className="cursor-pointer overflow-hidden rounded-3xl border border-[#E8F1FB] bg-white shadow-[0_16px_32px_rgba(13,92,171,0.12)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden"><img src={getPackageImage(pack)} alt={pack.title} className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/35 to-transparent" /></div>
                <div className="p-3">
                  <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">{pack.title}</h3>
                  <p className="mt-1 text-[11px] text-[#6B7A90]">{pack.vendorName}</p>
                  <p className="mt-3 text-base font-bold text-[#0D5CAB]">
                    {formatMMK(pack.priceMMK)}
                    <span className="text-[10px] font-semibold text-[#0D5CAB]/60"> MMK</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <SectionCard className="rounded-3xl bg-white p-5 shadow-[0_14px_30px_rgba(13,92,171,0.12)]">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">Budget Helper</h2>
          <p className="mt-2 text-sm text-[#6B7A90]">Pick a range and I will filter packages that fit your budget.</p>
          <div className="mt-4 grid gap-3">
            {budgetPresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyBudgetPreset(preset.min, preset.max)}
                className="flex items-center justify-between rounded-2xl border border-[#E8F1FB] bg-[#F8FAFF] px-4 py-3 text-left text-sm font-medium text-slate-700 shadow-[0_8px_18px_rgba(13,92,171,0.1)] transition hover:-translate-y-0.5"
              >
                {preset.label}
                <ArrowRight size={16} className="text-[#0D5CAB]" />
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard className="rounded-3xl bg-white p-5 shadow-[0_14px_30px_rgba(13,92,171,0.12)]">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">Quick Actions</h2>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={openSelectionPage}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[#0D5CAB] to-[#1A73D9] py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(13,92,171,0.28)]"
            >
              Open Budget Builder
            </button>
            <button
              type="button"
              onClick={openPackages}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-[#E8F1FB] bg-white py-3 text-sm font-semibold text-[#0D5CAB]"
            >
              Browse Packages
            </button>
          </div>
        </SectionCard>
      </section>
    </main>
  )
}
