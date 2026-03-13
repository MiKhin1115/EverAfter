import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bot,
  Calculator,
  Camera,
  Car,
  FileText,
  Gem,
  Gift,
  Heart,
  HelpCircle,
  History,
  Home,
  Info,
  MapPin,
  Music,
  Package,
  Paintbrush,
  Plane,
  Shirt,
  Sparkles,
  Stethoscope,
  Store,
  User,
  Utensils,
  WandSparkles,
  X,
} from 'lucide-react'
import { HomeView } from './views/HomeView'
import { PackagesView } from './views/PackagesView'
import { PackageDetailView } from './views/PackageDetailView'
import { VendorsView } from './views/VendorsView'
import { VendorDetailView } from './views/VendorDetailView'
import { SelectionView } from './views/SelectionView'
import { ProfileView } from './views/ProfileView'
import { SavedView } from './views/SavedView'
import { OrderHistoryView } from './views/OrderHistoryView'
import { OrderDetailView } from './views/OrderDetailView'
import { WeddingCompatibilityAIView } from './views/WeddingCompatibilityAIView'
import { CompatibilityQuizComingSoonView } from './views/CompatibilityQuizComingSoonView'
import { LoveStoryGeneratorView } from './views/LoveStoryGeneratorView'
import { HoneymoonMatcherView } from './views/HoneymoonMatcherView'
import { TermsAndConditionsView } from './views/TermsAndConditionsView'
import { FAQsView } from './views/FAQsView'
import { ShopPartnerView } from './views/ShopPartnerView'
import { WeddingBlogView } from './views/WeddingBlogView'
import { AssistantWidget } from './components/assistant/AssistantWidget'
import { Toast } from './components/ui/Toast'
import { categories } from './data/catalog/categories'
import { shops } from './data/catalog/shops'
import { packages as catalogPackages } from './data/catalog/packages'
import type { Package as CatalogPackage, Shop } from './types/catalog'
import { getAssistantEnabled, setAssistantEnabled } from './features/assistant/storage'
import {
  addToBudgetCart,
  BUDGET_CART_STORAGE_KEY,
  getBudgetCart,
  removeFromBudgetCart,
  type BudgetCartItem,
  type SelectedAddOn,
} from './features/budgetCart/storage'
import { useBudgetCartToast } from './hooks/useBudgetCartToast'

type View =
  | 'home'
  | 'packages'
  | 'packageDetail'
  | 'vendors'
  | 'vendorDetail'
  | 'selection'
  | 'profile'
  | 'saved'
  | 'ai'
  | 'orderHistory'
  | 'orderDetail'
  | 'weddingCompatibilityAI'
  | 'compatibilityQuiz'
  | 'loveStoryGenerator'
  | 'honeymoonMatcher'
  | 'termsAndConditions'
  | 'faqs'
  | 'shopPartner'
  | 'weddingBlog'

type HomeActionItem = {
  name: string
  icon: ComponentType<{ size?: number; className?: string }>
  onClick: () => void
}

type HomeCategoryItem = {
  name: string
  icon: ComponentType<{ size?: number; className?: string }>
}

type FilterState = {
  priceRange: [number, number]
  categories: string[]
}

type SelectedPackage = CatalogPackage & {
  selected: boolean
  basePriceMMK?: number
  selectedAddOns?: SelectedAddOn[]
}
type ProfileModalKey = 'account' | 'about'
type ProfileMenuKey = ProfileModalKey | 'partner' | 'terms' | 'faq' | 'orders'

type OrderStatus = 'Paid' | 'Pending' | 'Failed'
type PaymentStep = 'idle' | 'method' | 'pin' | 'success'
type OrderItem = {
  id: string
  productName: string
  vendorName: string
  orderDate: string
  totalMMK: number
  status: OrderStatus
  bookingDate: string
  options: string[]
  category: string
  location?: string
  duration?: string
  paymentRef: string
  paymentDate: string
}

const MMK_MAX = 50_000_000
const PRICE_STEP = 500_000

const moneyMMK = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
const moneyMMKDecimal = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const vendorTabs = [
  'All',
  'Bridal Beauty',
  'Catering',
  'Clothing',
  'Decoration',
  'Entertainment',
  'Health',
  'Honeymoon',
  'Invitations',
  'Jewelry',
  'Photography',
  'Transportation',
  'Venue',
]

const profileMenuItems: { key: ProfileMenuKey; title: string; icon: ComponentType<{ size?: number; className?: string }> }[] = [
  { key: 'account', title: 'User Account', icon: User },
  { key: 'orders', title: 'Order History', icon: History },
  { key: 'about', title: 'About Us', icon: Info },
  { key: 'partner', title: 'Become a Shop Partner', icon: Store },
  { key: 'terms', title: 'Terms and Conditions', icon: FileText },
  { key: 'faq', title: 'FAQs', icon: HelpCircle },
]

const heroSlides = [
  {
    title: 'Royal Ocean Package',
    image:
      '/images/ads/home-hero-01.jpg',
  },
  {
    title: 'Luxe Ballroom Package',
    image:
      '/images/ads/home-hero-02.jpg',
  },
  {
    title: 'Garden Bliss Package',
    image:
      '/images/ads/home-hero-03.jpg',
  },
  {
    title: 'Cinematic Memories Package',
    image:
      '/images/ads/home-hero-04.jpg',
  },
  {
    title: 'Intimate Signature Package',
    image:
      '/images/ads/home-hero-05.jpg',
  },
]

const orderHistoryData: OrderItem[] = [
  {
    id: 'EVR-2026-00091',
    productName: 'Royal Gold Combo',
    vendorName: 'EverAfter Premium Studio',
    orderDate: '12 Feb 2026',
    totalMMK: 12_800_000,
    status: 'Paid',
    bookingDate: '20 Mar 2026',
    options: ['Full-day photo + video', 'Catering for 300 guests', 'Stage floral styling'],
    category: 'Full Combo',
    location: 'Yangon',
    duration: '12 hours',
    paymentRef: 'KBZ-PAID-8821',
    paymentDate: '12 Feb 2026',
  },
  {
    id: 'EVR-2026-00104',
    productName: 'Signature Photo & Glam',
    vendorName: 'Golden Hour Studio',
    orderDate: '02 Feb 2026',
    totalMMK: 5_600_000,
    status: 'Pending',
    bookingDate: '05 Apr 2026',
    options: ['Cinematic pre-wedding', 'HD bridal makeup', 'Highlight teaser reel'],
    category: 'Photography',
    location: 'Yangon',
    duration: '8 hours',
    paymentRef: 'KBZ-PEND-4102',
    paymentDate: '02 Feb 2026',
  },
  {
    id: 'EVR-2026-00118',
    productName: 'Aurelia Diamond Heritage Set',
    vendorName: 'Aurelia Jewel House',
    orderDate: '27 Jan 2026',
    totalMMK: 6_800_000,
    status: 'Failed',
    bookingDate: 'N/A',
    options: ['Gold band set', 'Certification & warranty'],
    category: 'Jewelry',
    paymentRef: 'KBZ-FAIL-0933',
    paymentDate: '27 Jan 2026',
  },
]

const orderStatusStyles: Record<OrderStatus, string> = {
  Paid: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Pending: 'border-amber-200 bg-amber-50 text-amber-700',
  Failed: 'border-rose-200 bg-rose-50 text-rose-700',
}

const fallbackHeroImage =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#E8F1FB"/>
          <stop offset="1" stop-color="#CFE3FA"/>
        </linearGradient>
      </defs>
      <rect width="1400" height="900" fill="url(#g)"/>
      <circle cx="260" cy="210" r="160" fill="rgba(13,92,171,0.08)"/>
      <circle cx="1120" cy="260" r="180" fill="rgba(13,92,171,0.1)"/>
    </svg>`,
  )

const homeCategories: HomeCategoryItem[] = [
  { name: 'Bridal Beauty', icon: Sparkles },
  { name: 'Catering', icon: Utensils },
  { name: 'Clothing', icon: Shirt },
  { name: 'Decoration', icon: Paintbrush },
  { name: 'Entertainment', icon: WandSparkles },
  { name: 'Health', icon: Stethoscope },
  { name: 'Honeymoon', icon: Plane },
  { name: 'Invitations', icon: Gift },
  { name: 'Jewelry', icon: Gem },
  { name: 'Photography', icon: Camera },
  { name: 'Transportation', icon: Car },
  { name: 'Venue', icon: MapPin },
]

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const buildBudgetSelectionFromStorage = (): { selectedPackages: SelectedPackage[]; selectedAddOns: SelectedAddOn[] } => {
  const packageMap = new Map(catalogPackages.map((pack) => [pack.id, pack]))
  const stored = getBudgetCart()

  const selectedPackages = stored.selectedPackages
    .map((packageId) => {
      const pack = packageMap.get(packageId)
      if (!pack) return null

      return {
        ...pack,
        basePriceMMK: pack.basePriceMMK ?? pack.priceMMK,
        selectedAddOns: stored.selectedAddOns.filter((entry) => entry.packageId === pack.id),
        selected: true,
      }
    })
    .filter((pack): pack is SelectedPackage => pack !== null)

  const activePackageIds = new Set(selectedPackages.map((pack) => pack.id))

  return {
    selectedPackages,
    selectedAddOns: stored.selectedAddOns.filter((entry) => activePackageIds.has(entry.packageId)),
  }
}

function App() {
  const categoryNameToId = useMemo(() => Object.fromEntries(categories.map((category) => [category.name, category.id])), [])
  const filterCategories = useMemo(() => categories.map((category) => category.name), [])
  const shopNameHints = useMemo(() => shops.map((shop) => shop.name), [])
  const initialFilters: FilterState = useMemo(
    () => ({
      priceRange: [0, MMK_MAX],
      categories: [],
    }),
    [],
  )

  const [view, setView] = useState<View>('home')
  const [viewHistory, setViewHistory] = useState<View[]>(['home'])
  const [selectedVendor, setSelectedVendor] = useState<Shop | null>(null)
  const [ripples, setRipples] = useState<number[]>([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [searchHintIndex, setSearchHintIndex] = useState(0)
  const [homeSearch, setHomeSearch] = useState('')
  const [homeSearchError, setHomeSearchError] = useState('')

  const [packageSearch, setPackageSearch] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(initialFilters)
  const [draftFilters, setDraftFilters] = useState<FilterState>(initialFilters)
  const [assistantPackageCategoryId, setAssistantPackageCategoryId] = useState<string | null>(null)
  const [assistantEnabled, setAssistantEnabledState] = useState<boolean>(() => getAssistantEnabled())
  const [assistantOpen, setAssistantOpen] = useState(false)

  const [vendorSearch, setVendorSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const [activeProfileModal, setActiveProfileModal] = useState<ProfileModalKey | null>(null)
  const [selectedPackageDetail, setSelectedPackageDetail] = useState<CatalogPackage | null>(null)
  const [detailSlideIndex, setDetailSlideIndex] = useState(0)
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null)
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    about: true,
    deliverables: false,
    timeline: false,
    cancellation: false,
    reschedule: false,
  })
  const [selectedServiceOptions, setSelectedServiceOptions] = useState<Record<string, boolean>>({})
  const [selectedTier, setSelectedTier] = useState('Standard')
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedMaterial, setSelectedMaterial] = useState('Gold')
  const [selectedEngraving, setSelectedEngraving] = useState(false)
  const [selectedRental, setSelectedRental] = useState<'Rent' | 'Buy'>('Rent')
  const [selectedTravelMonth, setSelectedTravelMonth] = useState('November 2026')

  const [selectedPackages, setSelectedPackages] = useState<SelectedPackage[]>(() => buildBudgetSelectionFromStorage().selectedPackages)
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOn[]>(() => buildBudgetSelectionFromStorage().selectedAddOns)
  const [savedPackages, setSavedPackages] = useState<CatalogPackage[]>([])
  const [isRecalculating, setIsRecalculating] = useState(false)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [paymentStep, setPaymentStep] = useState<PaymentStep>('idle')
  const [pinCode, setPinCode] = useState('')
  const [transactionNo, setTransactionNo] = useState('01003877277368126989')
  const [transactionTime, setTransactionTime] = useState('')
  const { open: toastOpen, message: toastMessage } = useBudgetCartToast()
  const vendorTabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const vendorTabContainerRef = useRef<HTMLDivElement | null>(null)
  const scrollPositionsRef = useRef<Record<string, number>>({})
  const prevViewRef = useRef<View>(view)

  const preserveScrollViews = useMemo(() => new Set<View>(['vendors', 'packages']), [])

  useEffect(() => {
    const sliderTimer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 4200)

    return () => window.clearInterval(sliderTimer)
  }, [])

  useEffect(() => {
    if (shopNameHints.length === 0) return
    const searchTimer = window.setInterval(() => {
      setSearchHintIndex((current) => (current + 1) % shopNameHints.length)
    }, 2400)

    return () => window.clearInterval(searchTimer)
  }, [shopNameHints])

  useEffect(() => {
    if (view !== 'vendors') return
    const tab = vendorTabRefs.current[activeCategory]
    if (!tab) return
    tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [activeCategory, view])

  useLayoutEffect(() => {
    const previousView = prevViewRef.current
    if (previousView === view) return

    if (preserveScrollViews.has(previousView)) {
      scrollPositionsRef.current[previousView] = window.scrollY
    }

    const nextScroll = preserveScrollViews.has(view) ? scrollPositionsRef.current[view] ?? 0 : 0
    window.scrollTo({ top: nextScroll, left: 0, behavior: 'auto' })
    prevViewRef.current = view
  }, [preserveScrollViews, view])

  useEffect(() => {
    if (view !== 'home') return
    setHomeSearch('')
    setHomeSearchError('')
  }, [view])

  useEffect(() => {
    if (view !== 'packageDetail') return
    const slideTimer = window.setInterval(() => {
      setDetailSlideIndex((current) => (current + 1) % 3)
    }, 4200)

    return () => window.clearInterval(slideTimer)
  }, [view, selectedPackageDetail?.id])

  const syncBudgetCartSelection = () => {
    const next = buildBudgetSelectionFromStorage()
    setSelectedPackages(next.selectedPackages)
    setSelectedAddOns(next.selectedAddOns)
  }

  useEffect(() => {
    syncBudgetCartSelection()

    const onAdded = () => {
      syncBudgetCartSelection()
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key && event.key !== BUDGET_CART_STORAGE_KEY) return
      syncBudgetCartSelection()
    }

    window.addEventListener('everafter:budgetcart-added', onAdded as EventListener)
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener('everafter:budgetcart-added', onAdded as EventListener)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const matchesVendorCategoryTab = (shop: Shop, activeTab: string) => {
    if (activeTab === 'All') return true
    if (activeTab === 'Bridal Beauty') return shop.categoryId === 'bridal-beauty'
    if (activeTab === 'Catering') return shop.categoryId === 'catering-cake'

    const categoryMap: Record<string, string[]> = {
      Catering: ['catering-cake'],
      Clothing: ['clothing-fashion'],
      Decoration: ['decoration-floral'],
      Entertainment: ['entertainment-hosting'],
      Health: ['health-fitness'],
      Honeymoon: ['honeymoon'],
      Invitations: ['favors-invitations'],
      Jewelry: ['jewelry'],
      Photography: ['photography'],
      Transportation: ['transportation'],
      Venue: ['venue'],
    }

    const mappedIds = categoryMap[activeTab] ?? []
    if (mappedIds.length > 0) {
      return mappedIds.includes(shop.categoryId)
    }

    const label = shop.vendorCategoryLabel.toLowerCase()
    const active = activeTab.toLowerCase()
    return label.includes(active) || active.includes(label)
  }

  const findBestVendorMatch = (query: string) => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return null

    const candidates = shops.filter((shop) => {
      const name = shop.name.toLowerCase()
      const category = shop.vendorCategoryLabel.toLowerCase()
      return name.includes(normalized) || category.includes(normalized)
    })

    if (candidates.length === 0) return null

    return candidates.sort((a, b) => a.name.localeCompare(b.name))[0]
  }

  const handleHomeSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const fallbackQuery = shopNameHints[searchHintIndex] ?? ''
    const query = homeSearch.trim().length > 0 ? homeSearch : fallbackQuery
    const match = findBestVendorMatch(query)

    if (!match) {
      setHomeSearchError('No shop found.')
      return
    }

    setHomeSearchError('')
    openVendorDetail(match)
  }

  const triggerCalculatorRipple = () => {
    const id = Date.now()
    setRipples((current) => [...current, id])

    window.setTimeout(() => {
      setRipples((current) => current.filter((item) => item !== id))
    }, 520)
  }

  const goTo = (next: View) => {
    setViewHistory((current) => {
      const last = current[current.length - 1]
      if (last === next) return current
      return [...current, next]
    })
    setView(next)
  }

  const goBack = () => {
    setViewHistory((current) => {
      if (current.length <= 1) return current
      const nextHistory = current.slice(0, -1)
      setView(nextHistory[nextHistory.length - 1])
      return nextHistory
    })
  }

  const openSelectionPage = () => {
    triggerCalculatorRipple()
    goTo('selection')
  }

  const openSaved = () => goTo('saved')
  const openPackages = () => {
    setAssistantPackageCategoryId(null)
    goTo('packages')
  }
  const openAIChat = () => {
    setAssistantEnabled(true)
    setAssistantEnabledState(true)
    setAssistantOpen(true)
  }
  const openTermsAndConditions = () => goTo('termsAndConditions')
  const openFAQs = () => goTo('faqs')
  const openShopPartner = () => goTo('shopPartner')
  const openWeddingBlog = () => goTo('weddingBlog')
  const openWeddingCompatibilityAI = () => goTo('weddingCompatibilityAI')
  const openLoveStoryGenerator = () => goTo('loveStoryGenerator')
  const openHoneymoonMatcher = () => goTo('honeymoonMatcher')
  const openProfile = () => goTo('profile')
  const openOrderHistory = () => goTo('orderHistory')

  const openOrderDetail = (order: OrderItem) => {
    setSelectedOrder(order)
    goTo('orderDetail')
  }

  const goPrevSlide = () => {
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length)
  }

  const goNextSlide = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length)
  }

  const openVendors = (category?: string) => {
    setVendorSearch('')
    setActiveCategory(category ?? 'All')
    goTo('vendors')
  }

  const openVendorByName = (name: string) => {
    const normalized = name.trim().toLowerCase()
    const match = shops.find((shop) => shop.name.trim().toLowerCase() === normalized)

    if (match) {
      openVendorDetail(match)
      return
    }

    const fallbackMatch = findBestVendorMatch(name)
    if (fallbackMatch) openVendorDetail(fallbackMatch)
  }

  const openFilterDrawer = () => {
    setDraftFilters(appliedFilters)
    setIsFilterOpen(true)
  }

  const closeFilterDrawer = () => setIsFilterOpen(false)

  const openPackageDetail = (pack: CatalogPackage) => {
    setSelectedPackageDetail(pack)
    setDetailSlideIndex(0)
    setOpenAccordions({
      about: true,
      deliverables: false,
      timeline: false,
      cancellation: false,
      reschedule: false,
    })
    const nextSelectedOptions = Object.fromEntries(
      selectedAddOns.filter((entry) => entry.packageId === pack.id).map((entry) => [entry.addOnId, true]),
    )
    setSelectedServiceOptions(nextSelectedOptions)
    setSelectedTier('Standard')
    setSelectedSize('M')
    setSelectedMaterial('Gold')
    setSelectedEngraving(false)
    setSelectedRental('Rent')
    setSelectedTravelMonth('November 2026')
    goTo('packageDetail')
  }

  const handleBookPackage = (pack: CatalogPackage) => {
    const bookingMeta = (
      pack as CatalogPackage & {
        meta?: {
          basePriceMMK?: number
          selectedAddOns?: SelectedAddOn[]
        }
      }
    ).meta

    const nextSelectedAddOns = bookingMeta?.selectedAddOns ?? []
    const basePriceMMK = bookingMeta?.basePriceMMK ?? pack.basePriceMMK ?? pack.priceMMK
    const addOnsTotalMMK = nextSelectedAddOns.reduce((sum, item) => sum + (item.addPriceMMK ?? 0), 0)

    const item: BudgetCartItem = {
      id: pack.id,
      title: pack.title,
      categoryId: pack.categoryId,
      vendorName: pack.vendorName,
      price: basePriceMMK + addOnsTotalMMK,
      imageUrl: getPackageImage(pack),
      addedAt: Date.now(),
    }

    const alreadyAdded = getBudgetCart().selectedPackages.includes(item.id)
    addToBudgetCart(item.id, nextSelectedAddOns)
    syncBudgetCartSelection()

    window.dispatchEvent(
      new CustomEvent('everafter:budgetcart-added', {
        detail: {
          item,
          added: !alreadyAdded,
        },
      }),
    )
  }

  const filteredPackages = useMemo(() => {
    const query = packageSearch.trim().toLowerCase()

    return catalogPackages.filter((item) => {
      const inPriceRange = item.priceMMK >= appliedFilters.priceRange[0] && item.priceMMK <= appliedFilters.priceRange[1]
      const inAssistantCategory = assistantPackageCategoryId === null || item.categoryId === assistantPackageCategoryId
      const inCategory =
        appliedFilters.categories.length === 0 ||
        appliedFilters.categories.some((selectedName) => item.categoryId === categoryNameToId[selectedName])

      const matchesQuery =
        query.length === 0 ||
        item.title.toLowerCase().includes(query) ||
        item.vendorName.toLowerCase().includes(query) ||
        item.includesGroups.flatMap((group) => group.items).join(' ').toLowerCase().includes(query)

      return inPriceRange && inAssistantCategory && inCategory && matchesQuery
    })
  }, [appliedFilters, packageSearch, categoryNameToId, assistantPackageCategoryId])

  const filteredVendors = useMemo(() => {
    const query = vendorSearch.trim().toLowerCase()

    return shops.filter((shop) => {
      const categoryMatch = matchesVendorCategoryTab(shop, activeCategory)
      const searchMatch = query.length === 0 || shop.name.toLowerCase().includes(query)

      return categoryMatch && searchMatch
    })
  }, [vendorSearch, activeCategory])

  const vendorPackages = useMemo(() => {
    if (!selectedVendor) return []
    const directMatchByShop = catalogPackages.filter((pack) => pack.shopId === selectedVendor.id)
    if (directMatchByShop.length > 0) return directMatchByShop

    const directMatchByName = catalogPackages.filter((pack) => pack.vendorName === selectedVendor.name)
    if (directMatchByName.length > 0) return directMatchByName

    return []
  }, [selectedVendor])

  const appliedFilterCount = useMemo(() => {
    let count = 0

    if (appliedFilters.priceRange[0] > 0 || appliedFilters.priceRange[1] < MMK_MAX) {
      count += 1
    }

    count += appliedFilters.categories.length

    return count
  }, [appliedFilters])

  const packagesTotal = useMemo(() => {
    return selectedPackages.reduce((sum, pkg) => sum + (pkg.basePriceMMK ?? pkg.priceMMK ?? 0), 0)
  }, [selectedPackages])

  const addOnsTotal = useMemo(() => {
    return selectedAddOns.reduce((sum, addOn) => sum + (addOn.addPriceMMK ?? 0), 0)
  }, [selectedAddOns])

  const grandTotal = useMemo(() => packagesTotal + addOnsTotal, [packagesTotal, addOnsTotal])

  const activeNav = useMemo(() => {
    if (view === 'vendors' || view === 'vendorDetail' || view === 'packageDetail') return 'shops'
    if (view === 'profile') return 'profile'
    if (view === 'saved') return 'saved'
    return 'home'
  }, [view])

  const toggleSelectedPackage = (id: string) => {
    const next = removeFromBudgetCart(id)
    setSelectedPackages((current) => current.filter((item) => item.id !== id))
    setSelectedAddOns(next.selectedAddOns)
  }

  const handleCalculate = () => {
    setIsRecalculating(true)

    window.setTimeout(() => {
      setSelectedPackages((items) => items.filter((item) => item.selected))
      setIsRecalculating(false)
      setHasCalculated(true)
      setAcceptedTerms(false)
      setPaymentStep('idle')
      setPinCode('')
    }, 700)
  }

  const agreeTermsAndContinue = () => {
    setPaymentStep('method')
  }

  const proceedToPin = () => {
    setPinCode('')
    setPaymentStep('pin')
  }

  const closePaymentFlow = () => {
    setPaymentStep('idle')
    setPinCode('')
  }

  const finishPaymentSuccess = () => {
    const now = new Date()
    const date = now.toLocaleDateString('en-GB')
    const time = now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    setTransactionNo(`0100${Math.floor(100000000000000 + Math.random() * 900000000000000)}`)
    setTransactionTime(`${date} ${time}`)
    setPaymentStep('success')
    setPinCode('')
  }

  const onPinKeyPress = (value: string) => {
    setPinCode((current) => {
      if (value === 'backspace') {
        return current.slice(0, -1)
      }

      if (current.length >= 6) return current
      const next = `${current}${value}`

      if (next.length === 6) {
        window.setTimeout(() => {
          finishPaymentSuccess()
        }, 250)
      }

      return next
    })
  }

  const goHomeAfterPayment = () => {
    setPaymentStep('idle')
    setHasCalculated(false)
    syncBudgetCartSelection()
    goTo('home')
  }

  const updateDraftMinPrice = (value: number) => {
    setDraftFilters((current) => ({
      ...current,
      priceRange: [Math.min(value, current.priceRange[1]), current.priceRange[1]],
    }))
  }

  const updateDraftMaxPrice = (value: number) => {
    setDraftFilters((current) => ({
      ...current,
      priceRange: [current.priceRange[0], Math.max(value, current.priceRange[0])],
    }))
  }

  const toggleCategory = (category: string) => {
    setDraftFilters((current) => {
      const exists = current.categories.includes(category)

      return {
        ...current,
        categories: exists ? current.categories.filter((item) => item !== category) : [...current.categories, category],
      }
    })
  }

  const applyFilters = () => {
    setAssistantPackageCategoryId(null)
    setAppliedFilters(draftFilters)
    setIsFilterOpen(false)
  }

  const resetDraftFilters = () => {
    setAssistantPackageCategoryId(null)
    setDraftFilters(initialFilters)
  }

  const openVendorDetail = (vendor: Shop) => {
    setSelectedVendor(vendor)
    goTo('vendorDetail')
  }

  const toggleSavedPackage = (pack: CatalogPackage) => {
    setSavedPackages((current) => {
      const exists = current.some((item) => item.id === pack.id)
      return exists ? current.filter((item) => item.id !== pack.id) : [...current, pack]
    })
  }

  const isPackageSaved = (packId: string) => savedPackages.some((pack) => pack.id === packId)

  const profileModalContent: Record<ProfileModalKey, { title: string; content: ReactNode }> = {
    account: {
      title: 'User Account',
      content: (
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            <span className="font-semibold text-slate-900">Name:</span> Su Su
          </p>
          <p>
            <span className="font-semibold text-slate-900">Phone Number:</span> +95 9 123 456 789
          </p>
          <p>
            <span className="font-semibold text-slate-900">Gender:</span> Female
          </p>
          <p>
            <span className="font-semibold text-slate-900">BirthDate:</span> 12 Dec 1998
          </p>
        </div>
      ),
    },
    about: {
      title: 'About Us',
      content: (
        <p className="text-sm text-slate-700">
          EverAfter is a KBZPay-integrated wedding planning platform that connects couples with trusted vendors, curated packages,
          and secure digital booking.
        </p>
      ),
    },
  }

  const assistantCategoryToTab: Record<string, string> = {
    'bridal-beauty': 'Bridal Beauty',
    'catering-cake': 'Catering',
    'clothing-fashion': 'Clothing',
    'decoration-floral': 'Decoration',
    'entertainment-hosting': 'Entertainment',
    'health-fitness': 'Health',
    honeymoon: 'Honeymoon',
    'favors-invitations': 'Invitations',
    jewelry: 'Jewelry',
    photography: 'Photography',
    transportation: 'Transportation',
    venue: 'Venue',
  }

  const handleAssistantNavigate = (path: string) => {
    const shopMatch = path.match(/^\/shops\/([^/]+)$/)
    if (shopMatch) {
      const categoryId = decodeURIComponent(shopMatch[1])
      const mappedTab = assistantCategoryToTab[categoryId] ?? 'All'
      setVendorSearch('')
      setActiveCategory(mappedTab)
      goTo('vendors')
      return
    }

    const packageMatch = path.match(/^\/packages\/([^/]+)$/)
    if (packageMatch) {
      const categoryId = decodeURIComponent(packageMatch[1])
      setAssistantPackageCategoryId(categoryId)
      setPackageSearch('')
      setAppliedFilters(initialFilters)
      setDraftFilters(initialFilters)
      goTo('packages')
    }
  }

  const homeActions: HomeActionItem[] = [
    { name: 'Packages', icon: Package, onClick: openPackages },
    { name: 'Shops', icon: Store, onClick: () => openVendors() },
    { name: 'Profile', icon: User, onClick: openProfile },
    { name: 'AI ChatBot', icon: Bot, onClick: openAIChat },
  ]

  const bottomNavItems = [
    { key: 'home', label: 'Home', icon: Home, onClick: () => goTo('home') },
    { key: 'shops', label: 'Shops', icon: Store, onClick: () => openVendors() },
    { key: 'saved', label: 'Saved', icon: Heart, onClick: openSaved },
    { key: 'profile', label: 'Profile', icon: User, onClick: openProfile },
  ]

  const formatMMK = (value: number) => moneyMMK.format(value)
  const formatMMKDecimalValue = (value: number) => moneyMMKDecimal.format(value)

  const handleProfileMenuClick = (key: ProfileMenuKey) => {
    if (key === 'orders') {
      openOrderHistory()
      return
    }

    if (key === 'terms') {
      openTermsAndConditions()
      return
    }

    if (key === 'faq') {
      openFAQs()
      return
    }

    if (key === 'partner') {
      openShopPartner()
      return
    }

    setActiveProfileModal(key)
  }

  const getPackageImage = (pack: CatalogPackage) => pack.heroImages[0] ?? fallbackHeroImage

  const renderCurrentView = () => {
    switch (view) {
      case 'home':
        return (
          <HomeView
            heroSlides={heroSlides}
            activeSlide={activeSlide}
            fallbackHeroImage={fallbackHeroImage}
            goPrevSlide={goPrevSlide}
            goNextSlide={goNextSlide}
            handleHomeSearchSubmit={handleHomeSearchSubmit}
            homeSearch={homeSearch}
            onHomeSearchChange={(value) => {
              setHomeSearch(value)
              setHomeSearchError('')
            }}
            shopNameHints={shopNameHints}
            searchHintIndex={searchHintIndex}
            homeSearchError={homeSearchError}
            homeActions={homeActions}
            homeCategories={homeCategories}
            openVendors={openVendors}
            openVendorByName={openVendorByName}
            openWeddingCompatibilityAI={openWeddingCompatibilityAI}
            openLoveStoryGenerator={openLoveStoryGenerator}
            openHoneymoonMatcher={openHoneymoonMatcher}
            openWeddingBlog={openWeddingBlog}
          />
        )
      case 'packages':
        return (
          <PackagesView
            goBack={goBack}
            packageSearch={packageSearch}
            onPackageSearchChange={setPackageSearch}
            openFilterDrawer={openFilterDrawer}
            appliedFilterCount={appliedFilterCount}
            filteredPackages={filteredPackages}
            openPackageDetail={openPackageDetail}
            onBookPackage={handleBookPackage}
            getPackageImage={getPackageImage}
            toggleSavedPackage={toggleSavedPackage}
            isPackageSaved={isPackageSaved}
            formatMMK={formatMMK}
            isFilterOpen={isFilterOpen}
            closeFilterDrawer={closeFilterDrawer}
            resetDraftFilters={resetDraftFilters}
            draftFilters={draftFilters}
            updateDraftMinPrice={updateDraftMinPrice}
            updateDraftMaxPrice={updateDraftMaxPrice}
            mmkMax={MMK_MAX}
            priceStep={PRICE_STEP}
            filterCategories={filterCategories}
            toggleCategory={toggleCategory}
            applyFilters={applyFilters}
          />
        )
      case 'packageDetail':
        return (
          <PackageDetailView
            goBack={goBack}
            onOpenBudgetCalculator={openSelectionPage}
            onBookPackage={handleBookPackage}
            selectedPackageDetail={selectedPackageDetail}
            detailSlideIndex={detailSlideIndex}
            fallbackHeroImage={fallbackHeroImage}
            toggleSavedPackage={toggleSavedPackage}
            isPackageSaved={isPackageSaved}
            formatMMK={formatMMK}
            selectedServiceOptions={selectedServiceOptions}
            setSelectedServiceOptions={setSelectedServiceOptions}
            selectedTier={selectedTier}
            setSelectedTier={setSelectedTier}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            selectedEngraving={selectedEngraving}
            setSelectedEngraving={setSelectedEngraving}
            selectedRental={selectedRental}
            setSelectedRental={setSelectedRental}
            selectedTravelMonth={selectedTravelMonth}
            setSelectedTravelMonth={setSelectedTravelMonth}
            openAccordions={openAccordions}
            setOpenAccordions={setOpenAccordions}
          />
        )
      case 'vendors':
        return (
          <VendorsView
            goBack={goBack}
            vendorSearch={vendorSearch}
            onVendorSearchChange={setVendorSearch}
            vendorTabs={vendorTabs}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            vendorTabRefs={vendorTabRefs}
            vendorTabContainerRef={vendorTabContainerRef}
            filteredVendors={filteredVendors}
            openVendorDetail={openVendorDetail}
            formatMMK={formatMMK}
            listVariants={listVariants}
            itemVariants={itemVariants}
          />
        )
      case 'vendorDetail':
        return (
          <VendorDetailView
            goBack={goBack}
            selectedVendor={selectedVendor}
            vendorPackages={vendorPackages}
            openPackageDetail={openPackageDetail}
            onBookPackage={handleBookPackage}
            getPackageImage={getPackageImage}
            toggleSavedPackage={toggleSavedPackage}
            isPackageSaved={isPackageSaved}
            formatMMK={formatMMK}
          />
        )
      case 'selection':
        return (
          <SelectionView
            goBack={goBack}
            selectedPackages={selectedPackages}
            toggleSelectedPackage={toggleSelectedPackage}
            isRecalculating={isRecalculating}
            hasCalculated={hasCalculated}
            grandTotal={grandTotal}
            formatMMK={formatMMK}
            formatMMKDecimal={formatMMKDecimalValue}
            handleCalculate={handleCalculate}
            openTermsAndConditions={openTermsAndConditions}
            acceptedTerms={acceptedTerms}
            setAcceptedTerms={setAcceptedTerms}
            agreeTermsAndContinue={agreeTermsAndContinue}
            paymentStep={paymentStep}
            closePaymentFlow={closePaymentFlow}
            proceedToPin={proceedToPin}
            pinCode={pinCode}
            onPinKeyPress={onPinKeyPress}
            transactionTime={transactionTime}
            transactionNo={transactionNo}
            goHomeAfterPayment={goHomeAfterPayment}
          />
        )
      case 'profile':
        return <ProfileView goBack={goBack} menuItems={profileMenuItems} onMenuClick={handleProfileMenuClick} />
      case 'saved':
        return (
          <SavedView
            goBack={goBack}
            savedPackages={savedPackages}
            openPackageDetail={openPackageDetail}
            getPackageImage={getPackageImage}
            toggleSavedPackage={toggleSavedPackage}
            formatMMK={formatMMK}
          />
        )
      case 'ai':
        return null
      case 'orderHistory':
        return (
          <OrderHistoryView
            goBack={goBack}
            orders={orderHistoryData}
            orderStatusStyles={orderStatusStyles}
            openOrderDetail={openOrderDetail}
            formatMMK={formatMMK}
          />
        )
      case 'orderDetail':
        return <OrderDetailView selectedOrder={selectedOrder} goBack={goBack} goHome={() => goTo('home')} formatMMK={formatMMK} />
      case 'weddingCompatibilityAI':
        return (
          <WeddingCompatibilityAIView
            goBack={goBack}
            goHome={() => goTo('home')}
          />
        )
      case 'compatibilityQuiz':
        return <CompatibilityQuizComingSoonView goBack={goBack} goHome={() => goTo('home')} />
      case 'loveStoryGenerator':
        return <LoveStoryGeneratorView goBack={goBack} goHome={() => goTo('home')} />
      case 'honeymoonMatcher':
        return <HoneymoonMatcherView goBack={goBack} openVendors={openVendors} />
      case 'termsAndConditions':
        return <TermsAndConditionsView goBack={goBack} />
      case 'faqs':
        return <FAQsView goBack={goBack} />
      case 'shopPartner':
        return <ShopPartnerView goBack={goBack} />
      case 'weddingBlog':
        return <WeddingBlogView goBack={goBack} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {renderCurrentView()}

      <AnimatePresence>
        {activeProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4"
            onClick={() => setActiveProfileModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-[448px] rounded-2xl bg-white p-4 shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">{profileModalContent[activeProfileModal].title}</h2>
                <button
                  type="button"
                  onClick={() => setActiveProfileModal(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600"
                  aria-label="Close popup"
                >
                  <X size={16} />
                </button>
              </div>
              {profileModalContent[activeProfileModal].content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {(view === 'vendorDetail' || view === 'packages') && (
        <nav className="fixed bottom-4 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 px-4 font-poppins">
          <div className="rounded-3xl border border-white/70 bg-white/85 px-5 pb-4 pt-7 shadow-[0_18px_40px_rgba(13,92,171,0.12)] backdrop-blur-lg">
            <div className="grid grid-cols-5 items-end gap-2">
              {bottomNavItems.slice(0, 2).map((item) => {
                const Icon = item.icon
                const isActive = activeNav === item.key

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={item.onClick}
                    className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2.5 text-[11px] font-medium leading-tight transition-all duration-150 active:scale-[0.96] ${
                      isActive
                        ? 'bg-[#E8F1FB] text-[#0D5CAB] font-semibold shadow-[inset_0_0_0_1px_rgba(13,92,171,0.08)]'
                        : 'text-[#7A93B8]'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-[#0D5CAB]' : 'text-[#7A93B8]'} />
                    {item.label}
                  </button>
                )
              })}

              <div className="flex justify-center">
                <motion.button
                  type="button"
                  onClick={openSelectionPage}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex h-16 w-16 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#0D5CAB] to-[#1A73D9] text-white shadow-[0_18px_36px_rgba(13,92,171,0.4)] ring-4 ring-white/80 transition-transform active:scale-[0.96]"
                  aria-label="Open budget calculator"
                >
                  <Calculator size={26} />
                  <AnimatePresence>
                    {ripples.map((rippleId) => (
                      <motion.span
                        key={rippleId}
                        initial={{ scale: 0.2, opacity: 0.45 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="pointer-events-none absolute inset-0 rounded-full border border-white/70"
                      />
                    ))}
                  </AnimatePresence>
                </motion.button>
              </div>

              {bottomNavItems.slice(2).map((item) => {
                const Icon = item.icon
                const isActive = activeNav === item.key

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={item.onClick}
                    className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2.5 text-[11px] font-medium leading-tight transition-all duration-150 active:scale-[0.96] ${
                      isActive
                        ? 'bg-[#E8F1FB] text-[#0D5CAB] font-semibold shadow-[inset_0_0_0_1px_rgba(13,92,171,0.08)]'
                        : 'text-[#7A93B8]'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-[#0D5CAB]' : 'text-[#7A93B8]'} />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        </nav>
      )}

      {(view === 'home' || view === 'vendors') && (
        <motion.button
          type="button"
          onClick={openSelectionPage}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="fixed bottom-5 left-4 z-50 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#0D5CAB] text-white shadow-[0_12px_28px_rgba(13,92,171,0.45)]"
          aria-label="Open budget calculator"
        >
          <Calculator size={24} />
          <AnimatePresence>
            {ripples.map((rippleId) => (
              <motion.span
                key={rippleId}
                initial={{ scale: 0.2, opacity: 0.45 }}
                animate={{ scale: 2.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="pointer-events-none absolute inset-0 rounded-full border border-white/70"
              />
            ))}
          </AnimatePresence>
        </motion.button>
      )}

      <AssistantWidget
        enabled={assistantEnabled}
        open={assistantOpen}
        onOpenChange={setAssistantOpen}
        onNavigate={handleAssistantNavigate}
        isHomeView={view === 'home'}
      />

      <Toast open={toastOpen} message={toastMessage} />
    </div>
  )
}

export default App
