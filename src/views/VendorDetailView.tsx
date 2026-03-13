import { useMemo, useState } from 'react'
import { ArrowLeft, CheckCircle2, Heart, MapPin, Phone, Star, X } from 'lucide-react'
import type { Package, Shop } from '../types/catalog'

const getShopGalleryImages = (shopImage: string | undefined, vendorPackages: Package[]) =>
  Array.from(new Set([shopImage, ...vendorPackages.map((pack) => pack.heroImages[0])].filter(Boolean) as string[]))

type VendorDetailViewProps = {
  goBack: () => void
  selectedVendor: Shop | null
  vendorPackages: Package[]
  openPackageDetail: (pack: Package) => void
  onBookPackage: (pack: Package) => void
  getPackageImage: (pack: Package) => string
  toggleSavedPackage: (pack: Package) => void
  isPackageSaved: (packId: string) => boolean
  formatMMK: (value: number) => string
}

export function VendorDetailView({
  goBack,
  selectedVendor,
  vendorPackages,
  openPackageDetail,
  onBookPackage,
  getPackageImage,
  toggleSavedPackage,
  isPackageSaved,
  formatMMK,
}: VendorDetailViewProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const galleryImages = useMemo(() => {
    return getShopGalleryImages(selectedVendor?.image, vendorPackages)
  }, [selectedVendor?.image, vendorPackages])

  const heroGalleryImages = galleryImages.slice(0, 3)

  return (
    <main className="mx-auto max-w-[480px] pb-44 font-poppins">
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
          <h1 className="text-xl font-semibold text-slate-900">Shop Detail</h1>
        </div>
      </header>

      {selectedVendor && (
        <section className="space-y-4 px-4 pt-4">
          <article className="overflow-hidden rounded-3xl border border-[#E8F1FB] bg-white shadow-[0_10px_22px_rgba(13,92,171,0.12)]">
            <div className="relative p-2">
              {heroGalleryImages.length > 0 ? (
                <>
                  <div className="grid h-[320px] grid-cols-3 grid-rows-2 gap-2 overflow-hidden rounded-[22px] bg-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsGalleryOpen(true)}
                      className="group relative col-span-2 row-span-2 overflow-hidden text-left"
                    >
                      <img src={heroGalleryImages[0]} alt={selectedVendor.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
                    </button>

                    {heroGalleryImages.slice(1, 3).map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setIsGalleryOpen(true)}
                        className="group relative overflow-hidden text-left"
                      >
                        <img src={image} alt={`${selectedVendor.name} gallery ${index + 2}`} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsGalleryOpen(true)}
                    className="absolute bottom-5 right-5 rounded-xl bg-black/60 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
                  >
                    View All Photos
                  </button>
                </>
              ) : (
                <div className="flex h-[320px] items-center justify-center rounded-[22px] bg-slate-100 px-6 text-center text-sm font-medium text-slate-500">
                  Package photos will appear here when this shop has active packages.
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-2xl font-semibold text-slate-900">{selectedVendor.name}</h2>
                <span className="inline-flex items-center rounded-full bg-[#E8F1FB] px-3 py-1 text-xs font-semibold text-[#0D5CAB]">
                  {selectedVendor.vendorCategoryLabel}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{selectedVendor.tags.join(' • ')}</p>
              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Starting from</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-[#0D5CAB]">
                  {formatMMK(selectedVendor.startingPriceMMK)} <span className="text-xs font-semibold text-[#0D5CAB]/70">MMK</span>
                </p>
              </div>

              <div className="mt-4 border-t border-slate-200 pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-amber-500 shadow-sm">
                        <Star size={16} className="fill-current" />
                      </span>
                      <span className="font-semibold text-slate-900">{selectedVendor.rating.toFixed(1)} rating</span>
                    </div>
                    <span className="text-slate-500">{selectedVendor.reviewCount} reviews</span>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl px-1 text-sm text-slate-600">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0D5CAB]">
                      <MapPin size={16} />
                    </span>
                    <span className="font-medium text-slate-700">{selectedVendor.city || selectedVendor.location}</span>
                  </div>

                  {selectedVendor.phone && (
                    <div className="flex items-center gap-3 rounded-2xl px-1 text-sm text-slate-600">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0D5CAB]">
                        <Phone size={16} />
                      </span>
                      <a href={`tel:${selectedVendor.phone}`} className="font-medium text-[#0D5CAB] transition hover:text-[#0A4D90]">
                        {selectedVendor.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>

          <div className="rounded-2xl bg-[#F5F7FA] p-3">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">Services &amp; Offers</h2>
              <span className="text-xs text-slate-500">Curated essentials.</span>
            </div>

            <div className="grid grid-cols-2 items-start gap-4">
              {vendorPackages.length === 0 ? (
                <div className="col-span-2 rounded-2xl bg-white p-4 text-center text-sm text-slate-600 shadow-[0_12px_24px_rgba(13,92,171,0.1)]">
                  No packages available yet.
                </div>
              ) : (
                vendorPackages.map((pack) => (
                  <article
                    key={pack.id}
                    onClick={() => openPackageDetail(pack)}
                    className="cursor-pointer overflow-hidden rounded-3xl border border-[#E8F1FB] bg-white shadow-[0_16px_32px_rgba(13,92,171,0.12)] transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-b-none rounded-t-3xl">
                      <img src={getPackageImage(pack)} alt={pack.title} className="h-full w-full object-cover" loading="lazy" />
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/40 to-transparent" />
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          toggleSavedPackage(pack)
                        }}
                        className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F1FB]/90 text-[#0D5CAB] shadow-sm"
                        aria-label="Favorite package"
                      >
                        <Heart size={16} className={isPackageSaved(pack.id) ? 'fill-[#0D5CAB]/20 text-[#0D5CAB]' : 'text-[#0D5CAB]'} />
                      </button>
                    </div>

                    <div className="p-3">
                      <div>
                        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">{pack.title}</h3>
                        <div className="mt-1 flex flex-wrap items-center gap-1 text-[11px] text-[#6B7A90]">
                          <span>{pack.vendorName}</span>
                          {pack.verified && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F1FB] px-2 py-0.5 text-[10px] font-semibold text-[#0D5CAB]">
                              <CheckCircle2 size={10} /> Verified
                            </span>
                          )}
                        </div>

                        <ul className="mt-2 space-y-1.5 text-[11px] font-medium text-[#6B7A90]">
                          {(pack.includesGroups[0]?.items ?? []).slice(0, 2).map((item) => (
                            <li key={item} className="line-clamp-2">{item}</li>
                          ))}
                        </ul>

                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-lg font-bold text-[#0D5CAB]">
                            {formatMMK(pack.priceMMK)}
                            <span className="text-[10px] font-semibold text-[#0D5CAB]/60"> MMK</span>
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          onBookPackage(pack)
                        }}
                        className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#0D5CAB] to-[#1A73D9] text-xs font-semibold text-white shadow-[0_10px_20px_rgba(13,92,171,0.28)] transition-transform duration-150 hover:scale-[1.01] active:scale-[0.98]"
                      >
                        Book
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          {isGalleryOpen && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
              <div className="mx-auto flex h-full max-w-[480px] flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.35)]">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">{selectedVendor.name} Photos</h2>
                    <p className="text-xs text-slate-500">Curated gallery preview</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsGalleryOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700"
                    aria-label="Close gallery"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="grid flex-1 grid-cols-2 gap-3 overflow-y-auto p-4">
                  {galleryImages.map((image, index) => (
                    <div key={`${image}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                      <img src={image} alt={`${selectedVendor.name} photo ${index + 1}`} className="h-full w-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/30 to-transparent" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  )
}
