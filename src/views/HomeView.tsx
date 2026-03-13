import { AnimatePresence, motion } from 'framer-motion'
import { Archive, BookOpen, ChevronLeft, ChevronRight, HeartHandshake, Leaf, Plane, Search, Sparkles, type LucideIcon } from 'lucide-react'

type HeroSlide = {
  title: string
  image: string
}

type HomeActionItem = {
  name: string
  icon: LucideIcon
  onClick: () => void
}

type HomeCategoryItem = {
  name: string
  icon: LucideIcon
}

type HomeViewProps = {
  heroSlides: HeroSlide[]
  activeSlide: number
  fallbackHeroImage: string
  goPrevSlide: () => void
  goNextSlide: () => void
  handleHomeSearchSubmit: (event: React.FormEvent) => void
  homeSearch: string
  onHomeSearchChange: (value: string) => void
  shopNameHints: string[]
  searchHintIndex: number
  homeSearchError: string
  homeActions: HomeActionItem[]
  homeCategories: HomeCategoryItem[]
  openVendors: (category?: string) => void
  openVendorByName: (name: string) => void
  openWeddingCompatibilityAI: () => void
  openLoveStoryGenerator: () => void
  openHoneymoonMatcher: () => void
  openWeddingBlog: () => void
  openEcoWeddingScore: () => void
}

export function HomeView({
  heroSlides,
  activeSlide,
  fallbackHeroImage,
  goPrevSlide,
  goNextSlide,
  handleHomeSearchSubmit,
  homeSearch,
  onHomeSearchChange,
  shopNameHints,
  searchHintIndex,
  homeSearchError,
  homeActions,
  homeCategories: _homeCategories,
  openVendors,
  openVendorByName,
  openWeddingCompatibilityAI,
  openLoveStoryGenerator,
  openHoneymoonMatcher,
  openWeddingBlog,
  openEcoWeddingScore,
}: HomeViewProps) {
  const addOnMiniProjects = [
    {
      icon: Sparkles,
      title: 'Couple Compatibility',
      description: 'Check how well you match.',
      cta: 'Start',
      iconBg: 'bg-[#DDEEFF]',
      iconColor: 'text-[#0D5CAB]',
      cardClassName: 'border border-[#D5E7FF] bg-gradient-to-br from-[#F7FBFF] to-[#EAF3FF]',
      titleClassName: 'text-[#0D5CAB]',
      textClassName: 'text-[#5B6B81]',
      ctaClassName: 'text-[#0D5CAB]',
      onClick: openWeddingCompatibilityAI,
    },
    {
      icon: HeartHandshake,
      title: 'Love Story Generator',
      description: 'Turn your journey into a story.',
      cta: 'Create',
      iconBg: 'bg-[#FFE5F2]',
      iconColor: 'text-[#D9468B]',
      cardClassName: 'border border-[#FFD7EA] bg-gradient-to-br from-[#FFF8FC] to-[#FFEFF7]',
      titleClassName: 'text-[#BE185D]',
      textClassName: 'text-[#7A3A5C]',
      ctaClassName: 'text-[#BE185D]',
      onClick: openLoveStoryGenerator,
    },
    {
      icon: Archive,
      title: 'Wedding Memories',
      description: 'Save your special moments.',
      cta: 'Open',
      iconBg: 'bg-[#EEE5FF]',
      iconColor: 'text-[#7C3AED]',
      cardClassName: 'border border-[#E7DDFF] bg-gradient-to-br from-[#FAF8FF] to-[#F1ECFF]',
      titleClassName: 'text-[#6D28D9]',
      textClassName: 'text-[#5E5A82]',
      ctaClassName: 'text-[#6D28D9]',
      onClick: () => openVendors(),
    },
    {
      icon: Leaf,
      title: 'Eco Wedding Score',
      description: 'See your eco-friendly score.',
      cta: 'Check',
      iconBg: 'bg-[#DCFCE7]',
      iconColor: 'text-[#15803D]',
      cardClassName: 'border border-[#BBF7D0] bg-gradient-to-br from-[#F0FDF4] to-[#E7FBEF]',
      titleClassName: 'text-[#166534]',
      textClassName: 'text-[#3E6952]',
      ctaClassName: 'text-[#166534]',
      onClick: openEcoWeddingScore,
    },
    {
      icon: Plane,
      title: 'Honeymoon Finder',
      description: 'Find your perfect destination.',
      cta: 'Find',
      iconBg: 'bg-[#FFEAD5]',
      iconColor: 'text-[#EA580C]',
      cardClassName: 'border border-[#FFDDB9] bg-gradient-to-br from-[#FFF8EE] to-[#FFEFD9]',
      titleClassName: 'text-[#C2410C]',
      textClassName: 'text-[#7A5A38]',
      ctaClassName: 'text-[#C2410C]',
      onClick: openHoneymoonMatcher,
    },
    {
      icon: BookOpen,
      title: 'Wedding Blog',
      description: 'Read trends, tips, and ideas.',
      cta: 'Explore',
      iconBg: 'bg-[#FFF8CC]',
      iconColor: 'text-[#CA8A04]',
      cardClassName: 'border border-[#FDE68A] bg-gradient-to-br from-[#FFFEF2] to-[#FFF6C9]',
      titleClassName: 'text-[#A16207]',
      textClassName: 'text-[#756046]',
      ctaClassName: 'text-[#A16207]',
      onClick: openWeddingBlog,
    },
  ]

  const shopPromotions = [
    {
      vendor: 'Dream Click Studio',
      image: '/images/promotions/dream click promo banner.png',
      imageClassName: 'h-full w-full object-contain object-center',
      onClick: () => openVendorByName('DreamClick'),
    },
    {
      vendor: 'Velvet Cake Studio',
      image: '/images/promotions/velvet studio promo banner.png',
      imageClassName: 'h-full w-full object-cover object-center',
      onClick: () => openVendorByName('Velvet Cake Studio'),
    },
    {
      vendor: 'Crystal Garden',
      image: '/images/promotions/garden classic promo banner.png',
      imageClassName: 'h-full w-full object-cover object-center',
      onClick: () => openVendorByName('Crystal Garden'),
    },
    {
      vendor: 'Achit Kayee Travel',
      image: '/images/promotions/achit kayee promo banner.png',
      imageClassName: 'h-full w-full object-cover object-center',
      onClick: () => openVendorByName('Achit Kayee Travel'),
    },
  ]

  return (
    <main className="mx-auto max-w-[480px] px-4 pb-24 pt-4">
      <section className="relative h-[30vh] min-h-[220px] overflow-hidden rounded-3xl border border-[#CFE3FA] bg-[#E8F1FB] shadow-[0_14px_30px_rgba(13,92,171,0.2)] sm:h-[34vh]">
        <img
          src={heroSlides[activeSlide].image}
          alt={heroSlides[activeSlide].title}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = fallbackHeroImage
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D5CAB]/40 via-[#0D5CAB]/18 to-[#0D5CAB]/8" />
        <button
          type="button"
          onClick={goPrevSlide}
          className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#0D5CAB] shadow-[0_8px_18px_rgba(13,92,171,0.18)] backdrop-blur-sm transition-transform active:scale-[0.96]"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={goNextSlide}
          className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#0D5CAB] shadow-[0_8px_18px_rgba(13,92,171,0.18)] backdrop-blur-sm transition-transform active:scale-[0.96]"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {heroSlides.map((slide, index) => (
            <span
              key={slide.title}
              className={`h-1.5 w-1.5 rounded-full transition ${index === activeSlide ? 'w-4 bg-white' : 'bg-white/60'}`}
            />
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-2xl bg-white px-5 pb-6 pt-7 shadow-[0_16px_30px_rgba(13,92,171,0.18)]">
        <motion.h1
          className="text-center text-[3.3rem] font-bold text-[#0D5CAB] tracking-[-0.02em]"
          style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }}
          animate={{
            textShadow: [
              '0 0 6px rgba(13,92,171,0.14)',
              '0 0 14px rgba(13,92,171,0.22)',
              '0 0 6px rgba(13,92,171,0.14)',
            ],
            filter: ['blur(0px)', 'blur(0.2px)', 'blur(0px)'],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          EverAfter
        </motion.h1>
        <p className="mt-3 text-center text-xs font-medium tracking-[0.08em] text-[#6B7280]">
          From <span className="font-semibold text-[#0D5CAB]">YES</span> to EverAfter
        </p>

        <form
          onSubmit={handleHomeSearchSubmit}
          className="relative mt-4 flex h-12 items-center rounded-2xl bg-white px-4 shadow-[0_8px_18px_rgba(13,92,171,0.16)]"
        >
          <Search size={18} className="text-[#0D5CAB]" />
          <input
            value={homeSearch}
            onChange={(event) => onHomeSearchChange(event.target.value)}
            className="w-full bg-transparent pl-3 text-sm text-[#1F2937] outline-none placeholder:text-slate-400"
            aria-label="Search shops"
          />
          {!homeSearch && (
            <div className="pointer-events-none absolute left-11 right-20 text-sm text-slate-400">
              <AnimatePresence mode="wait">
                <motion.span
                  key={shopNameHints[searchHintIndex] ?? 'Search shops...'}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="block"
                >
                  {shopNameHints[searchHintIndex] ?? 'Search shops...'}
                </motion.span>
              </AnimatePresence>
            </div>
          )}
          <button
            type="submit"
            className="ml-2 inline-flex h-8 items-center justify-center rounded-full bg-[#E8F1FB] px-3 text-xs font-semibold text-[#0D5CAB] transition hover:bg-[#D9E8FB]"
          >
            Search
          </button>
        </form>
        {homeSearchError && <p className="mt-2 text-xs font-medium text-[#B91C1C]">{homeSearchError}</p>}

        <div className="mt-4 grid grid-cols-4 gap-3">
          {homeActions.map((item) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.name}
                type="button"
                onClick={item.onClick}
                whileTap={{ scale: 1.04 }}
                className="flex min-h-11 flex-col items-center text-center"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_16px_rgba(13,92,171,0.16)]">
                  <Icon size={22} className="text-[#0D5CAB]" />
                </span>
                <span className="mt-2 text-[11px] font-semibold text-[#1F2937]">{item.name}</span>
              </motion.button>
            )
          })}
        </div>
      </section>

      <section className="mt-6 rounded-[20px] bg-[#F5F7FA] p-0">
        <div className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#EEF5FB_0%,#E6EFF7_100%)] px-[18px] pb-[18px] pt-[18px] shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
            <span className="absolute left-5 top-5 text-[18px] text-[#A9BED4]">♥</span>
            <span className="absolute right-16 top-8 text-[12px] text-[#C1CEDB]">✦</span>
            <span className="absolute right-8 top-16 text-[16px] text-[#A9BED4]">♥</span>
            <span className="absolute left-24 top-12 text-[10px] text-[#C1CEDB]">✦</span>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.42),transparent_52%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.26),transparent_34%)]" />

          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B7C93]">EverAfter Picks</p>
              <button
                type="button"
                onClick={() => openVendors()}
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-[10px] py-1 text-[13px] font-medium text-[#2F6FED] shadow-[0_4px_10px_rgba(47,111,237,0.08)]"
              >
                <span>See All</span>
                <ChevronRight size={16} />
              </button>
            </div>
            <h2
              className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em] text-[#0D5CAB] sm:text-[1.9rem]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }}
            >
              Hot Wedding Deals
            </h2>
          </div>

          <div className="scrollbar-hide relative mt-4 -mr-[18px] flex snap-x snap-mandatory gap-3 overflow-x-auto pr-[18px] pb-1">
            {shopPromotions.map((promotion) => (
              <motion.button
                key={promotion.vendor}
                type="button"
                onClick={promotion.onClick}
                whileTap={{ scale: 0.985 }}
                aria-label={promotion.vendor}
                className="relative w-[286px] shrink-0 snap-start overflow-hidden rounded-[14px] text-left shadow-[0_10px_24px_rgba(31,41,55,0.12)]"
              >
                <div className="aspect-[2.35/1] w-full overflow-hidden rounded-[14px]">
                  <img
                    src={promotion.image}
                    alt={promotion.vendor}
                    className={promotion.imageClassName}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[20px] bg-[#F5F7FA] p-0">
        <div className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#EEF5FB_0%,#E6EFF7_100%)] px-[18px] pb-[18px] pt-[18px] shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
            <span className="absolute left-5 top-5 text-[18px] text-[#A9BED4]">♥</span>
            <span className="absolute right-16 top-8 text-[12px] text-[#C1CEDB]">✦</span>
            <span className="absolute right-8 top-16 text-[16px] text-[#A9BED4]">♥</span>
            <span className="absolute left-24 top-12 text-[10px] text-[#C1CEDB]">✦</span>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.42),transparent_52%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.26),transparent_34%)]" />

          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B7C93]">EverAfter Tools</p>
            <h2
              className="mt-1 text-[1.9rem] font-bold tracking-[-0.03em] text-[#0D5CAB]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }}
            >
              Smart Wedding Tools
            </h2>
          </div>

          <div className="relative mt-4 grid grid-cols-2 gap-2.5">
          {addOnMiniProjects.map((project) => (
            <motion.button
              key={project.title}
              type="button"
              onClick={project.onClick}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98, y: -2 }}
              className={`flex min-h-[118px] flex-col rounded-[18px] p-3 text-left shadow-[0_4px_12px_rgba(13,92,171,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_26px_rgba(13,92,171,0.16)] active:-translate-y-0.5 ${project.cardClassName}`}
            >
              <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${project.iconBg}`}>
                <project.icon className={`h-[18px] w-[18px] stroke-[2.2] ${project.iconColor}`} />
              </span>
              <h3 className={`mt-2 text-[13.5px] font-semibold leading-snug ${project.titleClassName}`}>{project.title}</h3>
              <p className={`mt-0.5 text-[11px] leading-4 ${project.textClassName}`}>{project.description}</p>
              <span className={`mt-auto pt-1.5 text-[11px] font-semibold ${project.ctaClassName}`}>{project.cta} →</span>
            </motion.button>
          ))}
        </div>
        </div>
      </section>
    </main>
  )
}
