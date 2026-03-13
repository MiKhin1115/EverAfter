import { useMemo, useState } from 'react'
import { ArrowLeft, Leaf, MessageCircle, RotateCcw } from 'lucide-react'

type EcoWeddingScoreViewProps = {
  goBack: () => void
  openVendors: (category?: string) => void
}

type Language = 'en' | 'mm'

type LocalizedText = Record<Language, string>

type EcoOption = {
  label: LocalizedText
  points: number
}

type EcoFactor = {
  id: string
  title: LocalizedText
  subtitle: LocalizedText
  quickTip: LocalizedText
  weight: number
  options: EcoOption[]
}

type Tier = {
  label: string
  badgeClassName: string
  message: string
}

const ecoFactors: EcoFactor[] = [
  {
    id: 'venue',
    title: {
      en: 'Venue & Energy',
      mm: 'Venue နှင့် Energy',
    },
    subtitle: {
      en: 'Power use, natural light, and efficiency.',
      mm: 'လျှပ်စစ်သုံးစွဲမှု၊ natural lighting နှင့် efficiency ကို တိုင်းတာပါသည်။',
    },
    quickTip: {
      en: 'Use natural light and efficient cooling.',
      mm: 'နေ့အလင်းရောင်ကောင်းပြီး cooling system ထိရောက်သော venue ကို ရွေးပါ။',
    },
    weight: 20,
    options: [
      {
        label: {
          en: 'Traditional venue setup',
          mm: 'ရိုးရိုး venue setup',
        },
        points: 35,
      },
      {
        label: {
          en: 'Partly energy-efficient venue',
          mm: 'energy-efficient အနည်းငယ်ရှိသော venue',
        },
        points: 68,
      },
      {
        label: {
          en: 'Certified eco-friendly venue',
          mm: 'အသိအမှတ်ပြု eco venue',
        },
        points: 96,
      },
    ],
  },
  {
    id: 'food',
    title: {
      en: 'Catering & Food Waste',
      mm: 'Catering နှင့် Food Waste',
    },
    subtitle: {
      en: 'Food sourcing and leftover management.',
      mm: 'menu sourcing နှင့် leftovers management ကို တိုင်းတာပါသည်။',
    },
    quickTip: {
      en: 'Use local seasonal food and donate leftovers.',
      mm: 'local seasonal menu သုံးပြီး မထိရသေးသောပိုလျှံအစားအစာကို လှူဒါန်းပါ။',
    },
    weight: 20,
    options: [
      {
        label: {
          en: 'Buffet with mostly imported food',
          mm: 'imported-heavy buffet',
        },
        points: 30,
      },
      {
        label: {
          en: 'Mix of local and imported menu',
          mm: 'local + imported ပေါင်းစပ် menu',
        },
        points: 66,
      },
      {
        label: {
          en: 'Local seasonal menu + food donation',
          mm: 'local seasonal + donation plan',
        },
        points: 95,
      },
    ],
  },
  {
    id: 'attire',
    title: {
      en: 'Attire & Styling',
      mm: 'Attire နှင့် Styling',
    },
    subtitle: {
      en: 'Clothing choices, reuse, and materials.',
      mm: 'fashion ရွေးချယ်မှု၊ reuse နှင့် materials ကို တိုင်းတာပါသည်။',
    },
    quickTip: {
      en: 'Renting or reusing outfits helps reduce waste.',
      mm: 'rental, ပြန်ဝတ်နိုင်သော items သို့မဟုတ် ethically sourced materials ကို ရွေးပါ။',
    },
    weight: 15,
    options: [
      {
        label: {
          en: 'Single-use fast-fashion items',
          mm: 'တစ်ခါသုံး fast-fashion items',
        },
        points: 28,
      },
      {
        label: {
          en: 'Reusable custom outfits',
          mm: 'partial reuse ပါသော custom pieces',
        },
        points: 64,
      },
      {
        label: {
          en: 'Rental, reused, or ethical materials',
          mm: 'rental / reused / ethical materials',
        },
        points: 94,
      },
    ],
  },
  {
    id: 'decor',
    title: {
      en: 'Decor & Flowers',
      mm: 'Decor နှင့် Flowers',
    },
    subtitle: {
      en: 'Decor reuse and flower sourcing.',
      mm: 'reusable decor နှင့် floral sourcing ကို တိုင်းတာပါသည်။',
    },
    quickTip: {
      en: 'Choose reusable decor and locally grown flowers.',
      mm: 'reusable decor နှင့် local flowers ကို အသုံးပြုပါ။',
    },
    weight: 15,
    options: [
      {
        label: {
          en: 'Mostly disposable decorations',
          mm: 'အများစု disposable decor',
        },
        points: 32,
      },
      {
        label: {
          en: 'Reusable + disposable decor',
          mm: 'reusable + disposable ပေါင်းစပ်',
        },
        points: 65,
      },
      {
        label: {
          en: 'Reusable decor with local flowers',
          mm: 'reusable sets + local florals',
        },
        points: 92,
      },
    ],
  },
  {
    id: 'transport',
    title: {
      en: 'Guest Transportation',
      mm: 'Guest Transportation',
    },
    subtitle: {
      en: 'Travel impact from guest transport.',
      mm: 'guest movement မှ travel emissions ကို တိုင်းတာပါသည်။',
    },
    quickTip: {
      en: 'Group travel helps reduce emissions.',
      mm: 'shuttle routes နှင့် group travel plans ကို စီစဉ်ပါ။',
    },
    weight: 15,
    options: [
      {
        label: {
          en: 'Guests travel individually',
          mm: 'တစ်ဦးချင်း သွားလာမှုသာ',
        },
        points: 34,
      },
      {
        label: {
          en: 'Some guests use ride-sharing',
          mm: 'ride-sharing groups အချို့',
        },
        points: 67,
      },
      {
        label: {
          en: 'Group transport or shuttle',
          mm: 'shuttle + grouped logistics',
        },
        points: 93,
      },
    ],
  },
  {
    id: 'waste',
    title: {
      en: 'Waste & Materials',
      mm: 'Waste နှင့် Materials',
    },
    subtitle: {
      en: 'Invites, packaging, and recycling.',
      mm: 'invites၊ packaging နှင့် recycling practice ကို တိုင်းတာပါသည်။',
    },
    quickTip: {
      en: 'Use digital invites and recycling bins.',
      mm: 'digital invites သုံးပြီး labeled recycling points များ ထည့်ပါ။',
    },
    weight: 15,
    options: [
      {
        label: {
          en: 'Mostly single-use materials',
          mm: 'single-use materials များပြား',
        },
        points: 30,
      },
      {
        label: {
          en: 'Some recycling practices',
          mm: 'partial recycling practice',
        },
        points: 63,
      },
      {
        label: {
          en: 'Digital invites + recycling stations',
          mm: 'digital-first + recycling stations',
        },
        points: 95,
      },
    ],
  },
]

const totalWeight = ecoFactors.reduce((sum, factor) => sum + factor.weight, 0)

const copy = {
  en: {
    title: 'Eco Wedding Score',
    subtitle: 'Discover greener ways to plan your wedding.',
    scoreOutOf: '/100',
    factorsAnswered: (count: number) => `${count}/${ecoFactors.length} factors answered`,
    co2Saved: 'CO2 Saved',
    wasteCut: 'Waste Cut',
    localMatch: 'Local Match',
    quickWays: 'Quick Ways to Improve',
    reset: 'Reset',
    cta: 'Discover Eco-Friendly Vendors',
    pointsUnit: 'pts',
    emptyRecommendations: 'Complete all sections to see your sustainability tips.',
    supportChat: 'Support chat',
  },
  mm: {
    title: 'Eco Wedding Score',
    subtitle: 'Sustainability impact ကိုတိုင်းတာပြီး ပိုမိုစမတ်ကျသော green decisions များ ရွေးချယ်နိုင်ပါသည်။',
    scoreOutOf: '/100',
    factorsAnswered: (count: number) => `${count}/${ecoFactors.length} ခု ဖြေပြီးပါပြီ`,
    co2Saved: 'CO2 လျော့ချမှု',
    wasteCut: 'Waste လျော့ချမှု',
    localMatch: 'Local Match',
    quickWays: 'အမြန် တိုးတက်စေနိုင်သော နည်းလမ်းများ',
    reset: 'ပြန်စရန်',
    cta: 'Eco-Friendly Vendors များရှာမည်',
    pointsUnit: 'မှတ်',
    emptyRecommendations: 'အမြန်တိုးတက်စေနိုင်သော အကြံပြုချက်များကို မြင်ရန် factor ၆ ခုကို ဖြေပါ။',
    supportChat: 'Support chat',
  },
} satisfies Record<Language, {
  title: string
  subtitle: string
  scoreOutOf: string
  factorsAnswered: (count: number) => string
  co2Saved: string
  wasteCut: string
  localMatch: string
  quickWays: string
  reset: string
  cta: string
  pointsUnit: string
  emptyRecommendations: string
  supportChat: string
}>

function getTier(language: Language, score: number): Tier {
  if (score >= 85) {
    return {
      label: language === 'en' ? 'Green Legend' : 'Green Legend',
      badgeClassName: 'bg-[#DCFCE7] text-[#166534]',
      message:
        language === 'en'
          ? 'Exceptional choices. Your wedding plan is strongly eco-conscious.'
          : 'ရွေးချယ်မှုများ အလွန်ကောင်းပါသည်။ သင့် wedding plan သည် eco-conscious ဖြစ်မှု မြင့်မားပါသည်။',
    }
  }

  if (score >= 65) {
    return {
      label: language === 'en' ? 'Eco Elegant' : 'Eco Elegant',
      badgeClassName: 'bg-[#E0F2FE] text-[#0F766E]',
      message:
        language === 'en'
          ? 'Beautiful progress. A few thoughtful upgrades can push this even higher.'
          : 'တိုးတက်မှုကောင်းနေပါသည်။ သေချာရွေးချယ်ထားသော upgrades အနည်းငယ်က score ကို ပိုမြင့်စေနိုင်သည်။',
    }
  }

  return {
    label: language === 'en' ? 'Eco Starter' : 'Eco Starter',
    badgeClassName: 'bg-[#FCE7F3] text-[#9D174D]',
    message:
      language === 'en'
        ? 'Great start. Quick upgrades can raise your score fast.'
        : 'အစကောင်းပါသည်။ အလွယ်တကူပြင်ဆင်နိုင်သော upgrades များက score ကို မြန်မြန်တင်ပေးနိုင်သည်။',
  }
}

function buildRecommendation(language: Language, factorId: string) {
  if (factorId === 'food') {
    return language === 'en'
      ? 'Use local seasonal menus and donate untouched surplus food.'
      : 'local seasonal menu အသုံးပြုပြီး မထိရသေးသောပိုလျှံအစားအစာကို လှူဒါန်းပါ။'
  }

  if (factorId === 'waste') {
    return language === 'en'
      ? 'Switch to digital invites and labeled recycling points.'
      : 'digital invites သို့ပြောင်းပြီး labeled recycling points များ ထည့်ပါ။'
  }

  if (factorId === 'transport') {
    return language === 'en'
      ? 'Coordinate shuttle routes and group travel plans.'
      : 'shuttle routes နှင့် group travel plans များကို စီစဉ်ပါ။'
  }

  if (factorId === 'venue') {
    return language === 'en'
      ? 'Choose venues with daytime lighting and efficient cooling systems.'
      : 'နေ့အလင်းရောင်ကောင်းပြီး cooling system ထိရောက်သော venue ကို ရွေးပါ။'
  }

  if (factorId === 'attire') {
    return language === 'en'
      ? 'Favor rental pieces, rewearable looks, and ethical materials.'
      : 'rental pieces, ပြန်ဝတ်နိုင်သော looks နှင့် ethical materials များကို ဦးစားပေးပါ။'
  }

  return language === 'en'
    ? 'Use reusable decor and locally grown flowers.'
    : 'reusable decor နှင့် local flowers များကို အသုံးပြုပါ။'
}

export function EcoWeddingScoreView({ goBack, openVendors }: EcoWeddingScoreViewProps) {
  const [language, setLanguage] = useState<Language>('en')
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const t = copy[language]
  const answeredCount = Object.keys(answers).length

  const score = useMemo(() => {
    const weighted = ecoFactors.reduce((sum, factor) => {
      const selectedIndex = answers[factor.id]
      const selected = typeof selectedIndex === 'number' ? factor.options[selectedIndex] : null
      return sum + (selected ? selected.points * factor.weight : 0)
    }, 0)

    return Math.round(weighted / totalWeight)
  }, [answers])

  const tier = getTier(language, score)
  const co2Saved = Math.round(score * 4.8)
  const wasteCut = Math.round(score * 0.64)
  const localMatch = Math.min(96, 7 + Math.round(score * 0.88))

  const weakestFactors = useMemo(() => {
    return ecoFactors
      .map((factor) => {
        const selectedIndex = answers[factor.id]
        const selected = typeof selectedIndex === 'number' ? factor.options[selectedIndex] : null
        return {
          factor,
          selected,
          points: selected?.points ?? 0,
        }
      })
      .filter((entry) => entry.selected)
      .sort((left, right) => left.points - right.points)
      .slice(0, 3)
  }, [answers])

  const resetAnswers = () => setAnswers({})

  return (
    <main className="mx-auto flex h-[100dvh] max-w-[480px] flex-col overflow-hidden bg-[#F4FFF7] px-3 pb-0 pt-3 sm:px-4 sm:pt-4">
      <section className="relative shrink-0 overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#17913B_0%,#1BBE4E_62%,#1FD65E_100%)] p-4 text-white shadow-[0_18px_36px_rgba(22,163,74,0.22)] sm:rounded-[28px] sm:p-5">
        <div className="pointer-events-none absolute -right-6 top-0 h-24 w-24 rounded-full bg-white/12" />
        <div className="pointer-events-none absolute right-3 top-16 h-32 w-32 rounded-full bg-white/10" />

        <div className="relative flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/18 text-white shadow-[0_8px_18px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:h-11 sm:w-11"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="inline-flex rounded-full bg-white/18 p-1 backdrop-blur-sm">
            {(['en', 'mm'] as const).map((value) => {
              const active = language === value

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLanguage(value)}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition sm:px-3 ${
                    active ? 'bg-white text-[#166534] shadow-sm' : 'text-white/75'
                  }`}
                >
                  {value}
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative mt-5 sm:mt-6">
          <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.02em]">{t.title}</h1>
          <p className="mt-2.5 text-[13px] leading-6 text-white/88 sm:mt-3 sm:text-[14px]">
            {language === 'en' ? (
              <span className="whitespace-nowrap">Discover greener ways to plan your wedding.</span>
            ) : (
              t.subtitle
            )}
          </p>
        </div>
      </section>

      <div className="min-h-0 flex-1 overflow-y-auto pb-24 pt-4 sm:pb-20 sm:pt-5">
        <section className="rounded-[24px] bg-white p-3.5 shadow-[0_16px_30px_rgba(21,128,61,0.08)] sm:rounded-[28px] sm:p-5">
          <div className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3 min-[375px]:grid-cols-[96px_minmax(0,1fr)] min-[375px]:gap-4">
            <div
              className="relative grid h-[88px] w-[88px] shrink-0 place-items-center rounded-full min-[375px]:h-[96px] min-[375px]:w-[96px] sm:h-[108px] sm:w-[108px]"
              style={{
                background: `conic-gradient(#16A34A ${score * 3.6}deg, #DCFCE7 ${score * 3.6}deg 360deg)`,
              }}
            >
              <div className="grid h-[68px] w-[68px] place-items-center rounded-full bg-white text-center min-[375px]:h-[76px] min-[375px]:w-[76px] sm:h-[84px] sm:w-[84px]">
                <div>
                  <p className="text-[26px] font-semibold leading-none text-slate-900 min-[375px]:text-[1.7rem] sm:text-[2rem]">{score}</p>
                  <p className="mt-1 text-[12px] font-medium text-slate-500">{t.scoreOutOf}</p>
                </div>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${tier.badgeClassName}`}>{tier.label}</span>
              <p className="mt-2.5 text-[15px] font-semibold leading-7 text-slate-900 min-[375px]:mt-3 min-[375px]:text-[16px]">
                {tier.message}
              </p>
              <p className="mt-2.5 text-[13px] text-slate-500 min-[375px]:mt-3">{t.factorsAnswered(answeredCount)}</p>
            </div>
          </div>

          <div className="mt-3.5 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
            <div className="rounded-2xl bg-[#F0FBF3] px-2.5 py-3 text-center sm:px-3">
              <p className="text-[12px] text-slate-500">{t.co2Saved}</p>
              <p className="mt-2 text-lg font-semibold text-slate-800 sm:text-xl">{co2Saved} kg</p>
            </div>
            <div className="rounded-2xl bg-[#F0FBF3] px-2.5 py-3 text-center sm:px-3">
              <p className="text-[12px] text-slate-500">{t.wasteCut}</p>
              <p className="mt-2 text-lg font-semibold text-slate-800 sm:text-xl">{wasteCut}%</p>
            </div>
            <div className="rounded-2xl bg-[#F0FBF3] px-2.5 py-3 text-center sm:px-3">
              <p className="text-[12px] text-slate-500">{t.localMatch}</p>
              <p className="mt-2 text-lg font-semibold text-slate-800 sm:text-xl">{localMatch}%</p>
            </div>
          </div>
        </section>

        <section className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
          {ecoFactors.map((factor) => {
            const selectedIndex = answers[factor.id]
            const hasSelection = typeof selectedIndex === 'number'

            return (
              <article key={factor.id} className="rounded-[22px] border border-[#DDF3E3] bg-white p-3.5 shadow-[0_12px_24px_rgba(21,128,61,0.06)] sm:rounded-[24px] sm:p-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <h2
                      className={`text-[17px] font-semibold leading-tight tracking-[-0.03em] text-slate-900 min-[375px]:text-[18px] sm:text-[24px] ${
                        language === 'en' ? 'whitespace-nowrap' : ''
                      }`}
                    >
                      {factor.title[language]}
                    </h2>
                    {!hasSelection && (
                      <p
                        className={`mt-1 text-[12px] text-slate-500 min-[390px]:text-[13px] sm:text-[14px] ${
                          language === 'en' ? 'whitespace-nowrap' : ''
                        }`}
                      >
                        {factor.subtitle[language]}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 rounded-full bg-[#ECFDF3] px-3 py-1 text-[12px] font-semibold leading-none text-[#15803D]">
                    {factor.weight}%
                  </span>
                </div>

                <div className="mt-3.5 space-y-2.5 sm:mt-4 sm:space-y-3">
                  {factor.options.map((option, index) => {
                    const active = selectedIndex === index

                    return (
                      <button
                        key={`${factor.id}-${language}-${index}`}
                        type="button"
                        onClick={() => setAnswers((current) => ({ ...current, [factor.id]: index }))}
                        className={`flex w-full items-center justify-between gap-2 rounded-2xl border px-3 py-2.5 text-left text-[13px] transition min-[390px]:px-3.5 min-[390px]:text-[14px] sm:px-4 sm:py-3 sm:text-[16px] ${
                          active
                            ? 'border-[#4CC26A] bg-[#F7FFF9] text-[#245338] shadow-[inset_0_0_0_1px_rgba(76,194,106,0.22)]'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-[#B7E9C4]'
                        }`}
                      >
                        <span
                          className={`min-w-0 flex-1 pr-1.5 leading-5 tracking-[-0.02em] min-[390px]:pr-2 sm:leading-6 ${
                            language === 'en' ? 'whitespace-nowrap' : ''
                          }`}
                        >
                          {option.label[language]}
                        </span>
                        <span className="shrink-0 whitespace-nowrap text-right text-[13px] font-medium text-slate-700 min-[390px]:text-[14px] sm:text-[16px]">
                          {option.points} {t.pointsUnit}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {!hasSelection && (
                  <p
                    className={`mt-3.5 text-[12px] leading-5 text-slate-400 min-[390px]:text-[13px] sm:mt-4 sm:leading-6 sm:text-slate-500 ${
                      language === 'en' ? 'whitespace-nowrap' : ''
                    }`}
                  >
                    {factor.quickTip[language]}
                  </p>
                )}
              </article>
            )
          })}
        </section>

        <section className="mt-4 rounded-[22px] border border-[#DDF3E3] bg-white p-3.5 shadow-[0_14px_28px_rgba(21,128,61,0.08)] sm:mt-5 sm:rounded-[24px] sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="min-w-0 flex-1 whitespace-nowrap text-[14px] font-semibold leading-none tracking-[-0.05em] text-slate-900 min-[360px]:text-[16px] min-[390px]:text-[18px] sm:text-[24px]">
              {t.quickWays}
            </h2>
            <button
              type="button"
              onClick={resetAnswers}
              className="shrink-0 inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-100 min-[390px]:gap-1.5 min-[390px]:px-2.5 min-[390px]:text-[12px]"
            >
              <RotateCcw size={13} /> {t.reset}
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {weakestFactors.length > 0 ? (
              weakestFactors.map(({ factor }) => (
                <div key={factor.id} className="rounded-2xl bg-[#F7FFF9] px-4 py-4">
                  <p className="text-[16px] font-semibold text-slate-900">{factor.title[language]}</p>
                  <p className="mt-1 text-[14px] leading-6 text-slate-500">{buildRecommendation(language, factor.id)}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-[#F7FFF9] px-4 py-5 text-[14px] leading-6 text-slate-500">
                {t.emptyRecommendations}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => openVendors()}
            className="mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[18px] bg-[#16A34A] px-4 text-center text-[16px] font-semibold text-white shadow-[0_14px_24px_rgba(22,163,74,0.22)] transition hover:bg-[#15803D] sm:h-14 sm:rounded-2xl"
          >
            <Leaf size={18} /> {t.cta}
          </button>
        </section>
      </div>

      <button
        type="button"
        aria-label={t.supportChat}
        className="fixed bottom-4 right-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1F75DB] text-white shadow-[0_10px_20px_rgba(31,117,219,0.24)] sm:bottom-5 sm:right-4 sm:h-14 sm:w-14"
      >
        <MessageCircle size={22} />
      </button>
    </main>
  )
}
