import { useState } from 'react'
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Plane } from 'lucide-react'

type HoneymoonMatcherViewProps = {
  goBack: () => void
  openVendors: (category?: string) => void
}

type HoneymoonTrait = 'adventure' | 'relaxation' | 'cultural' | 'beach' | 'nature' | 'city' | 'luxury'

type HoneymoonOption = {
  label: string
  traits: HoneymoonTrait[]
}

type HoneymoonQuestion = {
  id: string
  title: string
  options: HoneymoonOption[]
  similarGroups?: number[][]
}

type Destination = {
  title: string
  tags: HoneymoonTrait[]
  reason: string
}

type QuestionDetail = {
  question: HoneymoonQuestion
  firstAnswer: string
  secondAnswer: string
  score: number
}

type HoneymoonResult = {
  score: number
  message: string
  personality: string
  bestDestination: Destination
  backupDestination: Destination
  detail: QuestionDetail[]
}

const honeymoonQuestions: HoneymoonQuestion[] = [
  {
    id: 'pace',
    title: 'What trip pace do you prefer?',
    options: [
      { label: 'Action-packed days', traits: ['adventure', 'nature'] },
      { label: 'Balanced pace', traits: ['cultural', 'city'] },
      { label: 'Slow and restful', traits: ['relaxation', 'luxury'] },
    ],
    similarGroups: [
      [0, 1],
      [1, 2],
    ],
  },
  {
    id: 'landscape',
    title: 'Which landscape feels most romantic?',
    options: [
      { label: 'Tropical beaches', traits: ['beach', 'relaxation'] },
      { label: 'Mountain scenery', traits: ['nature', 'adventure'] },
      { label: 'Historic cities', traits: ['cultural', 'city'] },
    ],
    similarGroups: [[1, 2]],
  },
  {
    id: 'dailyActivity',
    title: 'Your favorite honeymoon activity?',
    options: [
      { label: 'Water sports and hiking', traits: ['adventure', 'nature'] },
      { label: 'Museums, food tours, culture', traits: ['cultural', 'city'] },
      { label: 'Spa, resort, and sunset dinners', traits: ['relaxation', 'luxury'] },
    ],
    similarGroups: [[1, 2]],
  },
  {
    id: 'stayStyle',
    title: 'Preferred stay style?',
    options: [
      { label: 'Boutique city hotel', traits: ['city', 'cultural'] },
      { label: 'Nature lodge or chalet', traits: ['nature', 'adventure'] },
      { label: 'Luxury beach villa', traits: ['beach', 'luxury'] },
    ],
    similarGroups: [[0, 2]],
  },
  {
    id: 'weather',
    title: 'What weather do you enjoy most?',
    options: [
      { label: 'Warm and sunny', traits: ['beach', 'relaxation'] },
      { label: 'Cool and fresh', traits: ['nature', 'adventure'] },
      { label: 'Mild city weather', traits: ['city', 'cultural'] },
    ],
    similarGroups: [
      [0, 2],
      [1, 2],
    ],
  },
]

const destinations: Destination[] = [
  {
    title: 'Bali, Indonesia',
    tags: ['adventure', 'beach', 'nature'],
    reason: 'Strong fit for active couples who want both beaches and outdoor exploration.',
  },
  {
    title: 'Maldives',
    tags: ['relaxation', 'beach', 'luxury'],
    reason: 'Best for calm, romantic luxury with private villas and resort experiences.',
  },
  {
    title: 'Kyoto, Japan',
    tags: ['cultural', 'city', 'relaxation'],
    reason: 'Great cultural match with peaceful temples, food, and scenic old-town charm.',
  },
  {
    title: 'Swiss Alps',
    tags: ['nature', 'adventure', 'luxury'],
    reason: 'Ideal for mountain scenery, soft adventure, and premium alpine stays.',
  },
  {
    title: 'Santorini, Greece',
    tags: ['beach', 'city', 'relaxation'],
    reason: 'Romantic sunsets and coastal town vibes with a balanced travel pace.',
  },
]

const traitLabel: Record<HoneymoonTrait, string> = {
  adventure: 'Adventure',
  relaxation: 'Relaxation',
  cultural: 'Cultural',
  beach: 'Beach',
  nature: 'Nature',
  city: 'City',
  luxury: 'Luxury',
}

function similarityScore(question: HoneymoonQuestion, firstAnswer: string, secondAnswer: string) {
  if (firstAnswer === secondAnswer) return 1

  const firstIndex = question.options.findIndex((option) => option.label === firstAnswer)
  const secondIndex = question.options.findIndex((option) => option.label === secondAnswer)

  if (question.similarGroups?.some((group) => group.includes(firstIndex) && group.includes(secondIndex))) return 0.65
  return 0.25
}

function findOption(question: HoneymoonQuestion, answer: string) {
  return question.options.find((option) => option.label === answer)
}

function buildHoneymoonResult(partnerAnswers: [string[], string[]]): HoneymoonResult {
  const detail = honeymoonQuestions.map((question, index) => {
    const firstAnswer = partnerAnswers[0][index]
    const secondAnswer = partnerAnswers[1][index]
    const score = similarityScore(question, firstAnswer, secondAnswer)

    return {
      question,
      firstAnswer,
      secondAnswer,
      score,
    }
  })

  const totalScore = detail.reduce((sum, item) => sum + item.score, 0)
  const score = Math.round((totalScore / honeymoonQuestions.length) * 100)

  const traitPoints: Record<HoneymoonTrait, number> = {
    adventure: 0,
    relaxation: 0,
    cultural: 0,
    beach: 0,
    nature: 0,
    city: 0,
    luxury: 0,
  }

  detail.forEach((item) => {
    const firstOption = findOption(item.question, item.firstAnswer)
    const secondOption = findOption(item.question, item.secondAnswer)
    if (!firstOption || !secondOption) return

    const sharedTraits = firstOption.traits.filter((trait) => secondOption.traits.includes(trait))
    if (sharedTraits.length > 0) {
      sharedTraits.forEach((trait) => {
        traitPoints[trait] += 1 + item.score
      })
      return
    }

    firstOption.traits.forEach((trait) => {
      traitPoints[trait] += item.score
    })
    secondOption.traits.forEach((trait) => {
      traitPoints[trait] += item.score
    })
  })

  const topTraits = Object.entries(traitPoints)
    .sort(([, pointA], [, pointB]) => pointB - pointA)
    .slice(0, 2)
    .map(([trait]) => trait as HoneymoonTrait)

  const rankedDestinations = destinations
    .map((destination) => ({
      destination,
      score: destination.tags.reduce((sum, tag) => sum + traitPoints[tag], 0),
    }))
    .sort((a, b) => b.score - a.score)

  const message =
    score >= 85
      ? 'Your honeymoon styles are highly aligned. You will likely enjoy a very smooth trip together.'
      : score >= 65
        ? 'You have a strong match with a few preference differences. A balanced itinerary will work best.'
        : 'You have different travel styles. Combining activities and rest days will give both of you a great experience.'

  return {
    score,
    message,
    personality: topTraits.map((trait) => traitLabel[trait]).join(' + '),
    bestDestination: rankedDestinations[0]?.destination ?? destinations[0],
    backupDestination: rankedDestinations[1]?.destination ?? destinations[1],
    detail,
  }
}

export function HoneymoonMatcherView({ goBack, openVendors }: HoneymoonMatcherViewProps) {
  const [started, setStarted] = useState(false)
  const [participantIndex, setParticipantIndex] = useState<0 | 1>(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [nameDraft, setNameDraft] = useState('')
  const [names, setNames] = useState<[string, string]>(['', ''])
  const [answers, setAnswers] = useState<[string[], string[]]>([[], []])
  const [result, setResult] = useState<HoneymoonResult | null>(null)

  const currentQuestion = honeymoonQuestions[questionIndex]
  const currentParticipantAnswers = answers[participantIndex]
  const selectedAnswer = currentParticipantAnswers[questionIndex]
  const currentPartnerLabel = names[participantIndex] || `Partner ${participantIndex + 1}`
  const isCollectingName = !names[participantIndex]
  const canMoveForward = Boolean(selectedAnswer)
  const totalSteps = honeymoonQuestions.length * 2
  const currentStep = participantIndex * honeymoonQuestions.length + questionIndex + 1
  const progressWidth = (currentStep / totalSteps) * 100

  const handleStartQuiz = () => {
    setStarted(true)
    setParticipantIndex(0)
    setQuestionIndex(0)
    setNameDraft('')
    setNames(['', ''])
    setAnswers([[], []])
    setResult(null)
  }

  const handleNameSubmit = () => {
    const trimmed = nameDraft.trim()
    if (!trimmed) return

    setNames((current) => {
      const next = [...current] as [string, string]
      next[participantIndex] = trimmed
      return next
    })
    setNameDraft('')
  }

  const handleAnswerSelect = (optionLabel: string) => {
    setAnswers((current) => {
      const next = current.map((entry) => [...entry]) as [string[], string[]]
      next[participantIndex][questionIndex] = optionLabel
      return next
    })
  }

  const goNext = () => {
    if (!canMoveForward) return

    if (questionIndex === honeymoonQuestions.length - 1) {
      if (participantIndex === 0) {
        setParticipantIndex(1)
        setQuestionIndex(0)
        return
      }

      setResult(buildHoneymoonResult(answers))
      return
    }

    setQuestionIndex((current) => current + 1)
  }

  const goBackStep = () => {
    if (isCollectingName) {
      if (participantIndex === 1) {
        setParticipantIndex(0)
        setQuestionIndex(honeymoonQuestions.length - 1)
        return
      }
      setStarted(false)
      return
    }

    if (questionIndex > 0) {
      setQuestionIndex((current) => current - 1)
      return
    }

    setNames((current) => {
      const next = [...current] as [string, string]
      next[participantIndex] = ''
      return next
    })
    setNameDraft('')
  }

  return (
    <main className="mx-auto max-w-[480px] px-4 pb-16 pt-4">
      <section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FFF4E8] via-white to-[#FFE7D1] p-5 shadow-[0_10px_24px_rgba(234,88,12,0.12)]">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#C2410C] shadow-sm transition hover:bg-[#FFF8F2]"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FCD9B8] bg-white/90 px-3 py-1 text-xs font-semibold text-[#C2410C]">
            <Plane size={14} /> Travel Match
          </span>
        </div>

        <div className="mt-6">
          <h1 className="text-[2rem] font-bold leading-tight tracking-[-0.01em] text-[#C2410C]">Honeymoon Finder</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Answer together and get a realistic destination match.</p>
          <button
            type="button"
            onClick={handleStartQuiz}
            className="mt-5 inline-flex items-center justify-center rounded-2xl bg-[#EA580C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#C2410C]"
          >
            Start Quiz
          </button>
        </div>
      </section>

      <section className="mt-5 rounded-[28px] bg-white p-5 shadow-[0_10px_24px_rgba(234,88,12,0.08)]">
        {!started ? (
          <div className="rounded-2xl border border-dashed border-[#FCD9B8] bg-[#FFF8F2] px-5 py-8 text-center">
            <p className="text-lg font-semibold text-slate-900">Ready to find your honeymoon match?</p>
            <p className="mt-2 text-sm text-slate-600">Each partner answers 5 quick questions.</p>
            <button
              type="button"
              onClick={handleStartQuiz}
              className="mt-5 inline-flex items-center justify-center rounded-2xl bg-[#EA580C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C2410C]"
            >
              Start Quiz
            </button>
          </div>
        ) : result ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#FCD9B8] bg-[#FFF4E8] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C2410C]">Match Result</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">Match Score: {result.score}%</h3>
              <p className="mt-2 text-sm text-slate-700">
                {result.score >= 85
                  ? 'Great match. Your travel styles are strongly aligned.'
                  : result.score >= 65
                    ? 'Good match. A balanced trip plan will work best.'
                    : 'Different styles. Mix adventure and rest for both partners.'}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white px-3 py-2 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#C2410C]">Score</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{result.score}%</p>
                </div>
                <div className="rounded-xl bg-white px-3 py-2 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#C2410C]">Style</p>
                  <p className="mt-1 text-xs font-semibold text-slate-900">{result.personality}</p>
                </div>
                <div className="rounded-xl bg-white px-3 py-2 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#C2410C]">Aligned</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {result.detail.filter((item) => item.score >= 0.65).length}/{honeymoonQuestions.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="rounded-2xl border border-[#FDE6CF] bg-white p-3.5">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#C2410C]">Recommended Destination</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{result.bestDestination.title}</p>
                <p className="mt-1 text-sm text-slate-600 line-clamp-2">{result.bestDestination.reason}</p>
              </div>
              <div className="rounded-2xl border border-[#FDE6CF] bg-white p-3.5">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#C2410C]">Alternative</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{result.backupDestination.title}</p>
                <p className="mt-1 text-sm text-slate-600">A great backup with a similar vibe.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleStartQuiz}
                className="inline-flex h-11 items-center justify-center rounded-full border border-[#FCD9B8] px-5 text-sm font-semibold text-[#C2410C] hover:bg-[#FFF8F2]"
              >
                Retake Quiz
              </button>
              <button
                type="button"
                onClick={() => openVendors('Honeymoon')}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#EA580C] px-5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(234,88,12,0.22)] transition hover:bg-[#C2410C]"
              >
                Explore Honeymoon Ideas
              </button>
            </div>
          </div>
        ) : isCollectingName ? (
          <div className="rounded-2xl border border-[#FDE6CF] bg-[#FFF8F2] p-4">
            <p className="text-sm font-semibold text-[#C2410C]">{participantIndex === 0 ? 'Partner 1' : 'Partner 2'}</p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">Enter your name</h3>
            <div className="mt-4 rounded-2xl border border-[#FDE6CF] bg-white p-4">
              <label htmlFor="partner-name" className="text-sm font-semibold text-slate-800">
                {participantIndex === 0 ? 'Partner 1' : 'Partner 2'} name
              </label>
              <input
                id="partner-name"
                value={nameDraft}
                onChange={(event) => setNameDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleNameSubmit()
                  }
                }}
                placeholder={participantIndex === 0 ? 'Enter Partner 1 name' : 'Enter Partner 2 name'}
                className="mt-3 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#FDBA74] focus:ring-4 focus:ring-[#FFEDD5]"
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleNameSubmit}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#EA580C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#C2410C]"
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={goBackStep}
                  className="inline-flex items-center justify-center rounded-2xl border border-[#FCD9B8] px-5 py-3 text-sm font-semibold text-[#9A3412] transition hover:bg-[#FFF8F2]"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#C2410C]">{currentPartnerLabel}</p>
                <p className="mt-1 text-sm text-slate-500">
                  Question {questionIndex + 1} of {honeymoonQuestions.length}
                </p>
              </div>
              <div className="min-w-[220px] flex-1 sm:max-w-xs">
                <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#C2410C]">
                  <span>Progress</span>
                  <span>{Math.round(progressWidth)}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[#EA580C] to-[#F59E0B] transition-all"
                    style={{ width: `${progressWidth}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#FFF8F2] p-5">
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">{currentQuestion.title}</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {currentQuestion.options.map((option) => {
                  const active = selectedAnswer === option.label
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => handleAnswerSelect(option.label)}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition ${
                        active
                          ? 'border-[#EA580C] bg-[#FFF4E8] text-[#C2410C] shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-[#FDBA74] hover:bg-[#FFFBF7]'
                      }`}
                    >
                      <span>{option.label}</span>
                      {active ? <Check size={18} /> : null}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={goBackStep}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#FCD9B8] px-5 py-3 text-sm font-semibold text-[#9A3412] transition hover:bg-[#FFF8F2]"
              >
                <ChevronLeft size={16} /> Back
              </button>
              {questionIndex === honeymoonQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canMoveForward}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#EA580C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#C2410C] disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {participantIndex === 0 ? 'Submit Partner 1' : 'Show Match'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canMoveForward}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EA580C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#C2410C] disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Next <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
