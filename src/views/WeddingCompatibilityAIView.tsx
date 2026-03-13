import { useRef, useState } from 'react'
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Heart, Sparkles, X } from 'lucide-react'

type WeddingCompatibilityAIViewProps = {
  goBack: () => void
  goHome: () => void
}

type QuizQuestion = {
  id: string
  title: string
  options: string[]
  suggestionKey: 'venue' | 'budget' | 'honeymoon' | 'beauty' | 'guest'
  similarGroups?: number[][]
}

type QuizResult = {
  score: number
  message: string
  summary: string
  suggestions: {
    venue: string
    beauty: string
    honeymoon: string
  }
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'atmosphere',
    title: 'Preferred wedding atmosphere',
    options: ['Elegant Ballroom', 'Outdoor Garden', 'Beach Wedding', 'Modern Minimal'],
    suggestionKey: 'venue',
    similarGroups: [
      [0, 3],
      [1, 2],
    ],
  },
  {
    id: 'budget',
    title: 'Budget preference',
    options: ['Luxury Wedding', 'Mid-range Wedding', 'Budget Friendly Wedding'],
    suggestionKey: 'budget',
    similarGroups: [[0, 1], [1, 2]],
  },
  {
    id: 'honeymoon',
    title: 'Honeymoon style',
    options: ['Adventure Travel', 'Relaxing Beach', 'Cultural Exploration'],
    suggestionKey: 'honeymoon',
    similarGroups: [
      [0, 2],
      [1, 2],
    ],
  },
  {
    id: 'eventStyle',
    title: 'Event style preference',
    options: ['Glamorous', 'Natural', 'Traditional', 'Modern'],
    suggestionKey: 'beauty',
    similarGroups: [
      [0, 3],
      [1, 2],
    ],
  },
  {
    id: 'guestSize',
    title: 'Guest size preference',
    options: ['Small and intimate', 'Medium celebration', 'Large grand wedding'],
    suggestionKey: 'guest',
    similarGroups: [[0, 1], [1, 2]],
  },
]

const participantLabels = ['Partner 1', 'Partner 2']

function getSimilarityScore(question: QuizQuestion, answerA: string, answerB: string) {
  if (answerA === answerB) {
    return 1
  }

  const optionAIndex = question.options.indexOf(answerA)
  const optionBIndex = question.options.indexOf(answerB)

  if (question.similarGroups?.some((group) => group.includes(optionAIndex) && group.includes(optionBIndex))) {
    return 0.6
  }

  return 0.2
}

function getPreferredAnswer(answerA: string, answerB: string, score: number) {
  if (score >= 0.6) {
    return answerA === answerB ? answerA : answerA
  }

  return answerA
}

function buildResult(partnerAnswers: [string[], string[]]) {
  const detail = quizQuestions.map((question, index) => {
    const first = partnerAnswers[0][index]
    const second = partnerAnswers[1][index]
    const score = getSimilarityScore(question, first, second)

    return {
      question,
      first,
      second,
      score,
      preferredAnswer: getPreferredAnswer(first, second, score),
    }
  })

  const totalScore = detail.reduce((sum, item) => sum + item.score, 0)
  const percentage = Math.round((totalScore / quizQuestions.length) * 100)
  const alignedTopics = detail.filter((item) => item.score >= 0.6)
  const strongestTopics = alignedTopics.slice(0, 2).map((item) => item.question.title.toLowerCase())

  const message =
    percentage >= 85
      ? 'You and your partner are highly aligned for your wedding vision.'
      : percentage >= 65
        ? 'You have a strong foundation with a few style differences to explore.'
        : 'You have different ideas, which can inspire a balanced and unique celebration.'

  const summary =
    strongestTopics.length > 0
      ? `You align well on ${strongestTopics.join(' and ')}.`
      : 'Your quiz shows a mix of shared ideas and fresh perspectives.'

  const suggestionMap = Object.fromEntries(detail.map((item) => [item.question.suggestionKey, item.preferredAnswer])) as Record<
    QuizQuestion['suggestionKey'],
    string
  >

  return {
    score: percentage,
    message,
    summary,
    suggestions: {
      venue: suggestionMap.venue ?? 'Outdoor Garden',
      beauty: suggestionMap.beauty ? `${suggestionMap.beauty} Bridal Style` : 'Natural Bridal Style',
      honeymoon: suggestionMap.honeymoon ?? 'Relaxing Beach',
    },
  } satisfies QuizResult
}

export function WeddingCompatibilityAIView({ goBack, goHome }: WeddingCompatibilityAIViewProps) {
  const quizSectionRef = useRef<HTMLElement | null>(null)
  const [started, setStarted] = useState(false)
  const [participantIndex, setParticipantIndex] = useState<0 | 1>(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [nameDraft, setNameDraft] = useState('')
  const [names, setNames] = useState<[string, string]>(['', ''])
  const [answers, setAnswers] = useState<[string[], string[]]>([[], []])
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<QuizResult | null>(null)

  const currentQuestion = quizQuestions[questionIndex]
  const currentParticipantAnswers = answers[participantIndex]
  const selectedAnswer = currentParticipantAnswers[questionIndex]
  const progressWidth = ((questionIndex + 1) / quizQuestions.length) * 100
  const currentName = names[participantIndex] || participantLabels[participantIndex]
  const isCollectingName = !names[participantIndex]
  const canMoveForward = Boolean(selectedAnswer)

  const scrollToQuiz = () => {
    quizSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleStartQuiz = () => {
    setStarted(true)
    requestAnimationFrame(scrollToQuiz)
  }

  const handleNameSubmit = () => {
    const trimmedName = nameDraft.trim()

    if (!trimmedName) {
      return
    }

    setNames((current) => {
      const next = [...current] as [string, string]
      next[participantIndex] = trimmedName
      return next
    })
    setNameDraft('')
  }

  const handleAnswerSelect = (option: string) => {
    setAnswers((current) => {
      const next = current.map((entry) => [...entry]) as [string[], string[]]
      next[participantIndex][questionIndex] = option
      return next
    })
  }

  const goToNextQuestion = () => {
    if (!canMoveForward) {
      return
    }

    if (questionIndex === quizQuestions.length - 1) {
      if (participantIndex === 0) {
        setParticipantIndex(1)
        setQuestionIndex(0)
        return
      }

      const nextResult = buildResult(answers)
      setResult(nextResult)
      setShowResult(true)
      return
    }

    setQuestionIndex((current) => current + 1)
  }

  const goToPreviousStep = () => {
    if (isCollectingName) {
      if (participantIndex === 1) {
        setParticipantIndex(0)
        setQuestionIndex(quizQuestions.length - 1)
      }
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

  const handleRetake = () => {
    setStarted(true)
    setParticipantIndex(0)
    setQuestionIndex(0)
    setNameDraft('')
    setNames(['', ''])
    setAnswers([[], []])
    setResult(null)
    setShowResult(false)
    requestAnimationFrame(scrollToQuiz)
  }

  return (
    <>
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-5 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#E8F1FB] via-white to-[#D7E9FF] p-6 shadow-sm md:p-8">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0D5CAB] shadow-sm transition hover:bg-[#F5FAFF]"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#B9D7FA] bg-white/90 px-3 py-1 text-xs font-semibold text-[#0D5CAB]">
              Couple Match
            </span>
          </div>

          <div className="mt-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#0D5CAB] md:text-5xl">Couple Compatibility</h1>
              <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
                Take a short quiz together and get your shared wedding style.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0D5CAB]">{quizQuestions.length} questions</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0D5CAB]">2 partners</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleStartQuiz}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#0D5CAB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0A4D90]"
                >
                  Start Quiz
                </button>
                <button
                  type="button"
                  onClick={goHome}
                  className="inline-flex items-center justify-center rounded-2xl border border-[#B9D7FA] bg-white px-6 py-3 text-sm font-semibold text-[#0D5CAB] transition hover:bg-[#F5FAFF]"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </section>

        <section ref={quizSectionRef} className="mt-6 rounded-[32px] bg-white p-5 shadow-sm sm:p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5A8FCC]">Compatibility Quiz</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">{started ? 'One partner answers at a time.' : 'Ready to start the quiz?'}</h2>
            </div>
            {started && !isCollectingName ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FF] px-4 py-2 text-sm font-semibold text-[#0D5CAB]">
                <Heart size={16} /> {participantLabels[participantIndex]}
              </span>
            ) : null}
          </div>

          {!started ? (
            <div className="mt-6 rounded-3xl border border-dashed border-[#B9D7FA] bg-[#F8FBFF] px-5 py-10 text-center">
              <p className="text-lg font-semibold text-slate-900">Start when both partners are ready.</p>
              <p className="mt-2 text-sm text-slate-600">Answer {quizQuestions.length} quick questions and get your match score.</p>
              <button
                type="button"
                onClick={handleStartQuiz}
                className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#0D5CAB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0A4D90]"
              >
                Start Quiz
              </button>
            </div>
          ) : isCollectingName ? (
            <div className="mt-6 rounded-3xl border border-slate-200 p-5">
              <p className="text-sm font-semibold text-[#0D5CAB]">{participantLabels[participantIndex]}</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">Enter your name to begin.</h3>
              <label htmlFor="partner-name" className="mt-4 block text-sm font-semibold text-slate-800">
                {participantLabels[participantIndex]} name
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
                className="mt-3 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#7EB8F5] focus:ring-4 focus:ring-[#D8EBFF]"
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleNameSubmit}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#0D5CAB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0A4D90]"
                >
                  Continue
                </button>
                {(participantIndex === 1 || names[participantIndex]) && (
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Back
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#0D5CAB]">{currentName}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Question {questionIndex + 1} of {quizQuestions.length}
                  </p>
                </div>
                <div className="min-w-[220px] flex-1 sm:max-w-xs">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#5A8FCC]">
                    <span>Progress</span>
                    <span>{Math.round(progressWidth)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[#0D5CAB] to-[#60A5FA] transition-all"
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-[#F8FBFF] p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5A8FCC]">{participantLabels[participantIndex]}</p>
                <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{currentQuestion.title}</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {currentQuestion.options.map((option) => {
                    const active = selectedAnswer === option

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleAnswerSelect(option)}
                        className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition ${
                          active
                            ? 'border-[#0D5CAB] bg-[#EAF4FF] text-[#0D5CAB] shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-[#B9D7FA] hover:bg-[#F8FBFF]'
                        }`}
                      >
                        <span>{option}</span>
                        {active ? <Check size={18} /> : null}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <ChevronLeft size={16} /> Back
                </button>

                {questionIndex === quizQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={goToNextQuestion}
                    disabled={!canMoveForward}
                    className="inline-flex items-center justify-center rounded-2xl bg-[#0D5CAB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0A4D90] disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {participantIndex === 0 ? 'Submit Partner 1' : 'Submit Quiz'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goToNextQuestion}
                    disabled={!canMoveForward}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0D5CAB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0A4D90] disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      {showResult && result ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/55 p-4 sm:items-center">
          <div className="w-full max-w-lg rounded-[32px] bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0D5CAB]">
                  <Sparkles size={14} /> Match Result
                </span>
                <h3 className="mt-3 text-2xl font-bold text-slate-900">Match Score: {result.score}%</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowResult(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-900">{result.message}</p>
            <p className="mt-2 text-sm text-slate-600">{result.summary}</p>

            <div className="mt-5 rounded-3xl bg-[#F8FBFF] p-5">
              <p className="text-sm font-semibold text-[#0D5CAB]">Recommended Picks</p>
              <ul className="mt-3 space-y-3 text-sm text-slate-700">
                <li className="flex items-start justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                  <span className="font-medium text-slate-500">Venue</span>
                  <span className="font-semibold text-slate-900">{result.suggestions.venue}</span>
                </li>
                <li className="flex items-start justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                  <span className="font-medium text-slate-500">Beauty</span>
                  <span className="font-semibold text-slate-900">{result.suggestions.beauty}</span>
                </li>
                <li className="flex items-start justify-between gap-4 rounded-2xl bg-white px-4 py-3">
                  <span className="font-medium text-slate-500">Honeymoon</span>
                  <span className="font-semibold text-slate-900">{result.suggestions.honeymoon}</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleRetake}
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-[#0D5CAB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0A4D90]"
              >
                Retake Quiz
              </button>
              <button
                type="button"
                onClick={goHome}
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-[#B9D7FA] px-5 py-3 text-sm font-semibold text-[#0D5CAB] transition hover:bg-[#F5FAFF]"
              >
                Back Home
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
