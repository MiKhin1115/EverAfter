import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Heart, Search, Settings2, X } from 'lucide-react'
import type { Package } from '../types/catalog'

type FilterState = {
  priceRange: [number, number]
  categories: string[]
}

type FilterCategory = {
  id: string
  name: string
  count: number
}

type PackagesViewProps = {
  goBack: () => void
  packageSearch: string
  onPackageSearchChange: (value: string) => void
  openFilterDrawer: () => void
  appliedFilterCount: number
  filteredPackages: Package[]
  openPackageDetail: (pack: Package) => void
  onBookPackage: (pack: Package) => void
  getPackageImage: (pack: Package) => string
  toggleSavedPackage: (pack: Package) => void
  isPackageSaved: (packId: string) => boolean
  formatMMK: (value: number) => string
  isFilterOpen: boolean
  closeFilterDrawer: () => void
  resetDraftFilters: () => void
  draftFilters: FilterState
  updateDraftMinPrice: (value: number) => void
  updateDraftMaxPrice: (value: number) => void
  mmkMax: number
  priceStep: number
  filterCategories: FilterCategory[]
  toggleCategory: (categoryId: string) => void
  applyFilters: () => void
}

export function PackagesView({
  goBack,
  packageSearch,
  onPackageSearchChange,
  openFilterDrawer,
  appliedFilterCount,
  filteredPackages,
  openPackageDetail,
  onBookPackage,
  getPackageImage,
  toggleSavedPackage,
  isPackageSaved,
  formatMMK,
  isFilterOpen,
  closeFilterDrawer,
  resetDraftFilters,
  draftFilters,
  updateDraftMinPrice,
  updateDraftMaxPrice,
  mmkMax,
  priceStep,
  filterCategories,
  toggleCategory,
  applyFilters,
}: PackagesViewProps) {
  return (
    <>
      <main className="mx-auto flex h-[100dvh] max-w-[480px] flex-col overflow-hidden">
        <header className="shrink-0 rounded-b-[32px] bg-white px-5 pb-5 pt-5 shadow-[0_12px_26px_rgba(13,92,171,0.12)]">
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={goBack}
              className="absolute left-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0D5CAB] shadow-sm"
              aria-label="Back"
            >
              <ArrowLeft size={20} className="text-[#0D5CAB]" />
            </button>
            <h1 className="text-xl font-semibold text-slate-900">Full Packages</h1>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <label className="flex h-12 flex-1 items-center gap-3 rounded-full bg-[#F5F7FA] px-4 text-slate-600 shadow-[0_6px_16px_rgba(15,23,42,0.08)]">
              <Search size={18} className="text-[#0D5CAB]" />
              <input
                value={packageSearch}
                onChange={(event) => onPackageSearchChange(event.target.value)}
                placeholder="Search by shop..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </label>
            <button
              type="button"
              onClick={openFilterDrawer}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0D5CAB] shadow-[0_6px_16px_rgba(15,23,42,0.08)]"
              aria-label="Open filters"
            >
              <Settings2 size={20} />
            </button>
          </div>
        </header>

        <section className="min-h-0 flex-1 overflow-y-auto pb-40">
          {appliedFilterCount > 0 && (
            <div className="px-5 pt-3">
              <span className="inline-flex rounded-full bg-[#0D5CAB] px-3 py-1 text-xs font-semibold text-white">
                {appliedFilterCount} Filters Applied
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 items-start gap-6 px-5 pt-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.length === 0 && (
              <article className="col-span-2 rounded-2xl bg-white p-5 text-center text-sm text-slate-600 shadow-sm">
                No packages found for your current search and filters.
              </article>
            )}

            {filteredPackages.map((pack) => (
              <article
                key={pack.id}
                onClick={() => openPackageDetail(pack)}
                className="cursor-pointer overflow-hidden rounded-2xl border border-[#E8F1FB] bg-white shadow-lg transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={getPackageImage(pack)} alt={pack.title} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/35 to-transparent" />
                  <div className="absolute right-3 top-3">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        toggleSavedPackage(pack)
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F1FB]/90 text-[#0D5CAB] shadow-sm"
                      aria-label="Favorite package"
                    >
                      <Heart size={16} className={isPackageSaved(pack.id) ? 'fill-[#0D5CAB]/20 text-[#0D5CAB]' : 'text-[#0D5CAB]'} />
                    </button>
                  </div>
                </div>

                <div className="p-3">
                  <div className="p-1">
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
                  </div>

                  <div className="p-1 pt-0">
                    <div className="mb-3 text-lg font-bold text-[#0D5CAB]">
                      {formatMMK(pack.priceMMK)}
                      <span className="text-[10px] font-semibold text-[#0D5CAB]/60"> MMK</span>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        onBookPackage(pack)
                      }}
                      className="inline-flex h-9 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#0D5CAB] to-[#1A73D9] text-xs font-semibold text-white shadow-[0_10px_20px_rgba(13,92,171,0.28)] transition-transform duration-150 hover:scale-[1.01] active:scale-[0.98]"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeFilterDrawer}
              className="fixed inset-0 z-40 bg-slate-900/45"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[84vh] w-full max-w-[480px] rounded-t-3xl bg-white"
            >
              <div className="max-h-[84vh] overflow-y-auto px-5 pb-28 pt-4">
                <div className="mb-5 flex items-center justify-between">
                  <button type="button" onClick={resetDraftFilters} className="text-sm font-semibold text-[#0D5CAB]">
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={closeFilterDrawer}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                <section>
                  <h2 className="text-base font-semibold text-slate-900">Price Range</h2>
                  <div className="mt-2 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                    <p>Min: {formatMMK(draftFilters.priceRange[0])} MMK</p>
                    <p className="mt-1">Max: {formatMMK(draftFilters.priceRange[1])} MMK</p>
                  </div>

                  <div className="mt-3 space-y-4">
                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">Minimum</p>
                      <input
                        type="range"
                        min={0}
                        max={mmkMax}
                        step={priceStep}
                        value={draftFilters.priceRange[0]}
                        onChange={(event) => updateDraftMinPrice(Number(event.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#dbe7f7] accent-[#0D5CAB]"
                      />
                    </div>

                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">Maximum</p>
                      <input
                        type="range"
                        min={0}
                        max={mmkMax}
                        step={priceStep}
                        value={draftFilters.priceRange[1]}
                        onChange={(event) => updateDraftMaxPrice(Number(event.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#dbe7f7] accent-[#0D5CAB]"
                      />
                    </div>
                  </div>
                </section>

                <section className="mt-6">
                  <h2 className="text-base font-semibold text-slate-900">Categories</h2>
                  <div className="mt-3 grid max-h-[320px] grid-cols-2 gap-2 overflow-y-auto pr-1">
                    {filterCategories.map((category) => {
                      const selected = draftFilters.categories.includes(category.id)

                      return (
                        <button
                          type="button"
                          key={category.id}
                          onClick={() => toggleCategory(category.id)}
                          className={`rounded-2xl border px-3 py-2.5 text-left text-sm font-medium transition ${
                            selected ? 'border-[#0D5CAB] bg-[#0D5CAB] text-white' : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          <span className="block leading-5">{category.name}</span>
                          <span className={`mt-1 block text-[11px] ${selected ? 'text-white/85' : 'text-slate-400'}`}>
                            {category.count} package{category.count === 1 ? '' : 's'}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </section>
              </div>

              <div className="absolute inset-x-0 bottom-0 border-t border-slate-100 bg-white p-4">
                <button
                  type="button"
                  onClick={applyFilters}
                  className="h-12 w-full rounded-full bg-[#0D5CAB] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(13,92,171,0.35)]"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
