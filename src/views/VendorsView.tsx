import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Search, Star } from 'lucide-react'
import type { MutableRefObject, RefObject } from 'react'
import type { Shop } from '../types/catalog'

type VendorsViewProps = {
  goBack: () => void
  vendorSearch: string
  onVendorSearchChange: (value: string) => void
  vendorTabs: string[]
  activeCategory: string
  setActiveCategory: (value: string) => void
  vendorTabRefs: MutableRefObject<Record<string, HTMLButtonElement | null>>
  vendorTabContainerRef: RefObject<HTMLDivElement | null>
  vendorListRef: RefObject<HTMLDivElement | null>
  filteredVendors: Shop[]
  openVendorDetail: (vendor: Shop) => void
  formatMMK: (value: number) => string
  listVariants: { hidden: { opacity: number }; show: { opacity: number; transition: { staggerChildren: number; delayChildren: number } } }
  itemVariants: { hidden: { opacity: number; y: number }; show: { opacity: number; y: number } }
}

export function VendorsView({
  goBack,
  vendorSearch,
  onVendorSearchChange,
  vendorTabs,
  activeCategory,
  setActiveCategory,
  vendorTabRefs,
  vendorTabContainerRef,
  vendorListRef,
  filteredVendors,
  openVendorDetail,
  formatMMK,
  listVariants,
  itemVariants,
}: VendorsViewProps) {
  return (
    <main className="mx-auto flex h-[100dvh] max-w-[480px] flex-col overflow-hidden font-poppins">
      <header className="shrink-0 rounded-b-[32px] bg-white px-4 pb-5 pt-5 shadow-[0_12px_26px_rgba(13,92,171,0.12)]">
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={goBack}
            className="absolute left-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0D5CAB] shadow-sm"
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold text-slate-900">Shops</h1>
        </div>

        <div className="mt-4">
          <label className="flex h-12 items-center gap-3 rounded-full bg-[#F5F7FA] px-4 shadow-[0_6px_16px_rgba(15,23,42,0.08)]">
            <Search size={18} className="text-[#0D5CAB]" />
            <input
              value={vendorSearch}
              onChange={(event) => onVendorSearchChange(event.target.value)}
              placeholder="Search shops..."
              className="w-full bg-transparent text-sm font-normal text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>

        <div ref={vendorTabContainerRef} className="scrollbar-hide mt-4 overflow-x-auto pb-1">
          <div className="inline-flex min-w-max gap-2">
            {vendorTabs.map((tab) => {
              const active = tab === activeCategory

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveCategory(tab)}
                  ref={(el) => {
                    vendorTabRefs.current[tab] = el
                  }}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? 'bg-[#E8F1FB] text-[#0D5CAB] shadow-[inset_0_0_0_1px_rgba(13,92,171,0.12)]'
                      : 'text-slate-500 hover:bg-white hover:text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <section ref={vendorListRef} className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-28 pt-5">
        {filteredVendors.length === 0 ? (
          <article className="rounded-xl bg-white p-5 text-center text-sm text-slate-600 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
            No shops match this category or search.
          </article>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${vendorSearch}`}
              variants={listVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-4"
            >
              {filteredVendors.map((vendor) => (
                <motion.article
                  key={vendor.id}
                  variants={itemVariants}
                  className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
                >
                  <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-2xl">
                    <img src={vendor.image} alt={vendor.name} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950/30 to-transparent" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-semibold text-slate-900">{vendor.name}</h3>
                    <p className="text-xs text-slate-500">{vendor.vendorCategoryLabel}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {vendor.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F1FB] px-2 py-0.5 text-[11px] font-semibold text-[#0D5CAB]">
                          Verified
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600">
                        <Star size={12} className="fill-[#F4C430] text-[#F4C430]" /> {vendor.rating}/5
                      </span>
                    </div>
                    <p className="mt-2 whitespace-nowrap text-[11px] font-medium text-slate-500">
                      Starting from {formatMMK(vendor.startingPriceMMK)} Ks
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openVendorDetail(vendor)}
                    className="shrink-0 rounded-full bg-[#0D5CAB] px-4 py-2 text-xs font-medium text-white shadow-[0_8px_18px_rgba(13,92,171,0.25)] transition-colors hover:bg-[#0B4E92]"
                  >
                    View Shop
                  </button>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </main>
  )
}
