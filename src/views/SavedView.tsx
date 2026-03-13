import { ArrowLeft, Heart } from 'lucide-react'
import type { Package } from '../types/catalog'

type SavedViewProps = {
  goBack: () => void
  savedPackages: Package[]
  openPackageDetail: (pack: Package) => void
  getPackageImage: (pack: Package) => string
  toggleSavedPackage: (pack: Package) => void
  formatMMK: (value: number) => string
}

export function SavedView({
  goBack,
  savedPackages,
  openPackageDetail,
  getPackageImage,
  toggleSavedPackage,
  formatMMK,
}: SavedViewProps) {
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
          <h1 className="text-xl font-semibold text-slate-900">Saved</h1>
        </div>
      </header>

      <section className="px-4 pt-6">
        {savedPackages.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-center shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
            <div className="mx-auto mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F1FB] text-[#0D5CAB]">
              <Heart size={26} />
            </div>
            <p className="text-sm font-medium text-slate-700">No saved items yet.</p>
            <p className="mt-1 text-xs text-slate-500">Tap the heart on packages to save them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {savedPackages.map((pack) => (
              <article
                key={pack.id}
                onClick={() => openPackageDetail(pack)}
                className="cursor-pointer overflow-hidden rounded-3xl border border-[#E8F1FB] bg-white shadow-[0_16px_32px_rgba(13,92,171,0.12)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={getPackageImage(pack)} alt={pack.title} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/35 to-transparent" />
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      toggleSavedPackage(pack)
                    }}
                    className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F1FB]/90 text-[#0D5CAB] shadow-sm"
                    aria-label="Remove from saved"
                  >
                    <Heart size={16} className="fill-[#0D5CAB]/20 text-[#0D5CAB]" />
                  </button>
                </div>

                <div className="p-3">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">{pack.title}</h3>
                  <p className="mt-1 text-[11px] text-[#6B7A90]">{pack.vendorName}</p>
                  <p className="mt-3 text-base font-bold text-[#0D5CAB]">
                    {formatMMK(pack.priceMMK)}
                    <span className="text-[10px] font-semibold text-[#0D5CAB]/60"> MMK</span>
                  </p>
                  <button
                    type="button"
                    onClick={(event) => event.stopPropagation()}
                    className="mt-3 inline-flex h-8 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#0D5CAB] to-[#1A73D9] text-[11px] font-semibold text-white shadow-[0_10px_20px_rgba(13,92,171,0.28)] transition-transform duration-150 hover:scale-[1.01] active:scale-[0.98]"
                  >
                    View Detail
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
