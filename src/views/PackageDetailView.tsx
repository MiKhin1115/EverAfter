import { ArrowLeft, Heart } from 'lucide-react'
import { StickyHeader } from '../components/ui/StickyHeader'
import type { SelectedAddOn } from '../features/budgetCart/storage'
import type { Package } from '../types/catalog'
import { PackageHero } from '../components/packageDetail/PackageHero'
import { PackageSummary } from '../components/packageDetail/PackageSummary'
import { IncludesGroups } from '../components/packageDetail/IncludesGroups'
import { AddOnGroups } from '../components/packageDetail/AddOnGroups'
import { InfoAccordion } from '../components/packageDetail/InfoAccordion'
import { Reviews } from '../components/packageDetail/Reviews'
import { StickyCTA } from '../components/packageDetail/StickyCTA'
import { CategorySections } from '../components/packageDetail/CategorySections'

type PackageDetailViewProps = {
  goBack: () => void
  onOpenBudgetCalculator: () => void
  onBookPackage: (pack: Package) => void
  selectedPackageDetail: Package | null
  detailSlideIndex: number
  fallbackHeroImage: string
  toggleSavedPackage: (pack: Package) => void
  isPackageSaved: (packId: string) => boolean
  formatMMK: (value: number) => string
  selectedServiceOptions: Record<string, boolean>
  setSelectedServiceOptions: (updater: (current: Record<string, boolean>) => Record<string, boolean>) => void
  selectedTier: string
  setSelectedTier: (tier: string) => void
  selectedSize: string
  setSelectedSize: (size: string) => void
  selectedMaterial: string
  setSelectedMaterial: (material: string) => void
  selectedEngraving: boolean
  setSelectedEngraving: (updater: (current: boolean) => boolean) => void
  selectedRental: 'Rent' | 'Buy'
  setSelectedRental: (value: 'Rent' | 'Buy') => void
  selectedTravelMonth: string
  setSelectedTravelMonth: (value: string) => void
  openAccordions: Record<string, boolean>
  setOpenAccordions: (updater: (current: Record<string, boolean>) => Record<string, boolean>) => void
}

export function PackageDetailView({
  goBack,
  onOpenBudgetCalculator,
  onBookPackage,
  selectedPackageDetail,
  detailSlideIndex,
  fallbackHeroImage,
  toggleSavedPackage,
  isPackageSaved,
  formatMMK,
  selectedServiceOptions,
  setSelectedServiceOptions,
  selectedTier,
  setSelectedTier,
  selectedSize,
  setSelectedSize,
  selectedMaterial,
  setSelectedMaterial,
  selectedEngraving,
  setSelectedEngraving,
  selectedRental,
  setSelectedRental,
  selectedTravelMonth,
  setSelectedTravelMonth,
  openAccordions,
  setOpenAccordions,
}: PackageDetailViewProps) {
  if (!selectedPackageDetail) {
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
            <h1 className="text-xl font-semibold text-slate-900">Package Detail</h1>
          </div>
        </header>

        <section className="px-4 pt-6">
          <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-600 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
            No package selected.
          </div>
        </section>
      </main>
    )
  }

  const pkg = selectedPackageDetail
  const totalAddOnMMK = pkg.addOnGroups
    .flatMap((group) => group.items)
    .filter((item) => selectedServiceOptions[item.id])
    .reduce((sum, item) => sum + (item.addPriceMMK ?? 0), 0)

  const estimatedTotalMMK = pkg.priceMMK + totalAddOnMMK
  const ctaLabel = pkg.ctaLabel ?? (pkg.template === 'TRAVEL' ? 'Book Package' : pkg.template === 'PRODUCT' ? 'Add to Cart' : 'Book Now')

  const selectedChoices: Record<string, string> = {
    size: selectedSize,
    rentBuy: selectedRental,
    lookStyle: selectedMaterial,
    photoStyle: selectedMaterial,
    palette: selectedMaterial,
    timeSlot: selectedTier,
    guestRange: selectedTier,
    performanceType: selectedTier,
    quantityPack: selectedTier,
    hoursBlock: selectedTier,
    planningScope: selectedTier,
    programWeeks: selectedTier,
  }

  const handleSelectChoice = (key: string, value: string) => {
    if (key === 'size') {
      setSelectedSize(value)
      return
    }

    if (key === 'rentBuy') {
      setSelectedRental(value as 'Rent' | 'Buy')
      return
    }

    if (['lookStyle', 'photoStyle', 'palette'].includes(key)) {
      setSelectedMaterial(value)
      return
    }

    setSelectedTier(value)
  }

  return (
    <main className="mx-auto max-w-[480px] pb-40 font-poppins">
      <StickyHeader
        title={pkg.template === 'SERVICE' ? 'Service Detail' : 'Package Detail'}
        onBack={goBack}
        backIconSize={18}
        wrapperClassName="sticky top-0 z-40 bg-[#F5F7FA]/80 px-4 pt-3 backdrop-blur-md"
        innerClassName="flex items-center justify-between rounded-full bg-white/90 px-3 py-2 shadow-[0_10px_24px_rgba(13,92,171,0.12)]"
        backButtonClassName="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0D5CAB]"
        titleClassName="text-sm font-semibold text-slate-700"
        rightSlot={
          <button
            type="button"
            onClick={() => toggleSavedPackage(pkg)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0D5CAB]"
            aria-label="Save package"
          >
            <Heart size={18} className={isPackageSaved(pkg.id) ? 'fill-[#0D5CAB]/20 text-[#0D5CAB]' : 'text-[#0D5CAB]'} />
          </button>
        }
      />

      <section className="px-4 pt-4">
        <PackageHero pkg={pkg} detailSlideIndex={detailSlideIndex} fallbackHeroImage={fallbackHeroImage} />
        <PackageSummary pkg={pkg} formatMMK={formatMMK} />

        <IncludesGroups groups={pkg.includesGroups} />

        {pkg.addOnGroups.length > 0 && (
          <AddOnGroups
            groups={pkg.addOnGroups}
            selected={selectedServiceOptions}
            onSelect={(id) => {
              setSelectedServiceOptions((current) => ({
                ...current,
                [id]: !current[id],
              }))
            }}
            formatMMK={formatMMK}
          />
        )}

        <CategorySections
          sections={pkg.extraSections}
          selectedChoices={selectedChoices}
          onSelectChoice={handleSelectChoice}
          selectedTravelMonth={selectedTravelMonth}
          onSelectTravelMonth={setSelectedTravelMonth}
          formatMMK={formatMMK}
        />

        {pkg.categoryId === 'clothing-fashion' && (
          <div className="mt-4 rounded-3xl bg-white p-5 shadow-[0_14px_30px_rgba(13,92,171,0.1)]">
            <button
              type="button"
              onClick={() => setSelectedEngraving((current) => !current)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium ${
                selectedEngraving
                  ? 'border-[#0D5CAB]/40 bg-[#E8F1FB] text-[#0D5CAB]'
                  : 'border-[#E8F1FB] bg-white text-slate-700'
              }`}
            >
              Personalization
              <span className="text-xs font-semibold">{selectedEngraving ? 'Enabled' : 'Off'}</span>
            </button>
          </div>
        )}

        <InfoAccordion
          policies={pkg.policies}
          openAccordions={openAccordions}
          onToggle={(key) => {
            setOpenAccordions((current) => ({
              ...current,
              [key]: !current[key],
            }))
          }}
        />

        <Reviews reviews={pkg.reviews} />
      </section>

      <StickyCTA
        totalMMK={estimatedTotalMMK}
        formatMMK={formatMMK}
        ctaLabel={ctaLabel}
        onOpenBudgetCalculator={onOpenBudgetCalculator}
        onBookNow={() => {
          const selectedAddOns: SelectedAddOn[] = pkg.addOnGroups
            .flatMap((group) => group.items)
            .filter((item) => selectedServiceOptions[item.id])
            .map((item) => ({
              packageId: pkg.id,
              addOnId: item.id,
              name: item.name,
              addPriceMMK: item.addPriceMMK ?? 0,
            }))

          onBookPackage({
            ...pkg,
            priceMMK: estimatedTotalMMK,
            meta: {
              ...(pkg.meta ?? {}),
              basePriceMMK: pkg.priceMMK,
              selectedAddOns,
            },
          } as Package)
        }}
      />
    </main>
  )
}
