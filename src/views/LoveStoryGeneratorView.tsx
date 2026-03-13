import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Download,
  HeartHandshake,
  MapPin,
  PartyPopper,
  PenLine,
  Share2,
  Sparkles,
} from 'lucide-react'

type LoveStoryGeneratorViewProps = {
  goBack: () => void
  goHome: () => void
}

type StoryForm = {
  partnerOne: string
  partnerTwo: string
  whereMet: string
  whenMet: string
  firstMoment: string
  proposalStory: string
  description: string
  tone: 'romantic' | 'classic' | 'playful'
  length: 'short' | 'full'
}

type GeneratedStory = {
  title: string
  badge: string
  subtitle: string
  chapters: { title: string; body: string }[]
  closingLine: string
  highlightLine: string
  cardText: string
}

const whereMetOptions = ['University', 'Event', 'Work', 'Travel']
const toneOptions: { key: StoryForm['tone']; label: string }[] = [
  { key: 'romantic', label: 'Romantic' },
  { key: 'classic', label: 'Classic' },
  { key: 'playful', label: 'Playful' },
]

const initialForm: StoryForm = {
  partnerOne: '',
  partnerTwo: '',
  whereMet: 'University',
  whenMet: '',
  firstMoment: '',
  proposalStory: '',
  description: '',
  tone: 'romantic',
  length: 'short',
}

function getInitials(firstName: string, secondName: string) {
  const firstInitial = firstName.trim().charAt(0).toUpperCase() || 'A'
  const secondInitial = secondName.trim().charAt(0).toUpperCase() || 'B'
  return `${firstInitial} & ${secondInitial}`
}

function toTitleCase(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function toSentence(value: string, fallback: string) {
  const trimmed = value.trim()
  if (!trimmed) return fallback
  const sentence = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  return /[.!?]$/.test(sentence) ? sentence : `${sentence}.`
}

function buildLoveStory(form: StoryForm): GeneratedStory {
  const partnerOne = toTitleCase(form.partnerOne) || 'Partner One'
  const partnerTwo = toTitleCase(form.partnerTwo) || 'Partner Two'
  const meetingPlace = form.whereMet.toLowerCase()
  const meetingTime = form.whenMet.trim() || 'a meaningful chapter in their lives'
  const firstMoment = toSentence(
    form.firstMoment,
    'Their first special memory was filled with easy laughter and a natural sense of comfort.',
  )
  const proposalStory = toSentence(
    form.proposalStory,
    'When the right moment arrived, they chose forever with full hearts and clear certainty.',
  )
  const description = toSentence(
    form.description,
    'What started as a simple connection slowly became deep love, trust, and true partnership.',
  )

  const toneCopy: Record<
    StoryForm['tone'],
    {
      subtitle: string
      chapterOneEnding: string
      chapterTwoBridge: string
      chapterThreeOpening: string
      closingLine: string
      highlightLine: string
    }
  > = {
    romantic: {
      subtitle: 'A heartfelt story crafted by EverAfter.',
      chapterOneEnding: 'From that day on, every moment between them felt a little more meaningful.',
      chapterTwoBridge: 'Their days filled with support, gentle understanding, and shared dreams.',
      chapterThreeOpening: 'When the right moment arrived, love spoke clearly.',
      closingLine: 'And now, their EverAfter begins — warm, joyful, and beautifully real.',
      highlightLine: 'Built on love, trust, and everyday kindness.',
    },
    classic: {
      subtitle: 'A timeless story crafted by EverAfter.',
      chapterOneEnding: 'What began quietly became a steady and lasting bond.',
      chapterTwoBridge: 'Step by step, they built a partnership rooted in respect and loyalty.',
      chapterThreeOpening: 'With certainty in their hearts, they chose a future together.',
      closingLine: 'And now, their EverAfter begins — graceful, steady, and full of promise.',
      highlightLine: 'A timeless journey toward forever.',
    },
    playful: {
      subtitle: 'A joyful story crafted by EverAfter.',
      chapterOneEnding: 'One small moment turned into a story full of smiles.',
      chapterTwoBridge: 'From laughter to little adventures, their connection kept growing.',
      chapterThreeOpening: 'Then came the big question — and an even bigger yes.',
      closingLine: 'And now, their EverAfter begins — bright, fun, and full of happy surprises.',
      highlightLine: 'From first laugh to forever.',
    },
  }

  const selectedTone = toneCopy[form.tone]

  const fullChapters = [
    {
      title: 'Chapter 1 — The First Meeting',
      body: `${partnerOne} and ${partnerTwo} met through ${meetingPlace} in ${meetingTime}. ${description} ${selectedTone.chapterOneEnding}`,
    },
    {
      title: 'Chapter 2 — Growing Together',
      body: `${firstMoment} ${selectedTone.chapterTwoBridge}`,
    },
    {
      title: 'Chapter 3 — A New Journey',
      body: `${selectedTone.chapterThreeOpening} ${proposalStory}`,
    },
  ]

  const chapters = form.length === 'short' ? fullChapters.slice(0, 2) : fullChapters

  return {
    title: `${partnerOne} & ${partnerTwo}'s Love Story`,
    badge: `${partnerOne} ❤ ${partnerTwo}`,
    subtitle: selectedTone.subtitle,
    chapters,
    closingLine: selectedTone.closingLine,
    highlightLine: selectedTone.highlightLine,
    cardText: `${partnerOne} ❤ ${partnerTwo}\nOur Love Story\n\n${partnerOne} and ${partnerTwo} met through ${meetingPlace} in ${meetingTime}. Their journey grew through laughter, support, and shared dreams.`,
  }
}

function createStoryCardMarkup(story: GeneratedStory) {
  const lines = story.cardText.split('\n')
  const escapedLines = lines.map((line) =>
    line
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;'),
  )

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fff7fb"/>
          <stop offset="45%" stop-color="#f4ecff"/>
          <stop offset="100%" stop-color="#e6f0ff"/>
        </linearGradient>
      </defs>
      <rect width="1080" height="1920" rx="48" fill="url(#bg)"/>
      <circle cx="170" cy="230" r="110" fill="#ffd7ea" opacity="0.65"/>
      <circle cx="900" cy="360" r="150" fill="#d9ebff" opacity="0.75"/>
      <circle cx="870" cy="1600" r="130" fill="#f7d8ff" opacity="0.7"/>
      <text x="540" y="240" text-anchor="middle" font-size="44" fill="#0d5cab" font-family="Georgia, serif">EverAfter</text>
      <text x="540" y="360" text-anchor="middle" font-size="74" font-weight="700" fill="#23324f" font-family="Georgia, serif">${escapedLines[0] ?? ''}</text>
      <text x="540" y="430" text-anchor="middle" font-size="42" fill="#6b7280" font-family="Arial, sans-serif">${escapedLines[1] ?? ''}</text>
      <rect x="120" y="540" width="840" height="930" rx="56" fill="#ffffff" opacity="0.92"/>
      ${escapedLines.slice(3).map((line, index) => `<text x="180" y="${670 + index * 70}" font-size="38" fill="#334155" font-family="Arial, sans-serif">${line}</text>`).join('')}
      <text x="540" y="1635" text-anchor="middle" font-size="36" fill="#0d5cab" font-family="Arial, sans-serif">And this is only the beginning.</text>
    </svg>
  `
}

export function LoveStoryGeneratorView({ goBack, goHome }: LoveStoryGeneratorViewProps) {
  const [step, setStep] = useState<'intro' | 'form' | 'story'>('intro')
  const [form, setForm] = useState<StoryForm>(initialForm)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null)
  const [shareStatus, setShareStatus] = useState('')
  const [showFullStory, setShowFullStory] = useState(false)

  const coupleInitials = useMemo(() => getInitials(form.partnerOne, form.partnerTwo), [form.partnerOne, form.partnerTwo])

  const updateField = <Key extends keyof StoryForm,>(field: Key, value: StoryForm[Key]) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleGenerate = () => {
    if (!form.partnerOne.trim() || !form.partnerTwo.trim() || !form.whenMet.trim() || !form.firstMoment.trim() || !form.description.trim()) {
      setShareStatus('Please complete the main story details first.')
      return
    }

    setShareStatus('')
    setIsGenerating(true)

    window.setTimeout(() => {
      setGeneratedStory(buildLoveStory(form))
      setIsGenerating(false)
      setShowFullStory(false)
      setStep('story')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 900)
  }

  const handleDownload = () => {
    if (!generatedStory) {
      return
    }

    const blob = new Blob([createStoryCardMarkup(generatedStory)], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${generatedStory.badge.replaceAll(' ', '-').replaceAll('❤', 'love-story')}.svg`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    setShareStatus('Story card downloaded.')
  }

  const handleShare = async () => {
    if (!generatedStory) {
      return
    }

    const sharePayload = {
      title: generatedStory.title,
      text: generatedStory.cardText,
    }

    try {
      if (navigator.share) {
        await navigator.share(sharePayload)
        setShareStatus('Love story shared successfully.')
        return
      }

      await navigator.clipboard.writeText(`${generatedStory.title}\n\n${generatedStory.cardText}`)
      setShareStatus('Love story copied to clipboard.')
    } catch {
      setShareStatus('Sharing is not available on this device yet.')
    }
  }

  const handleCopyStory = async () => {
    if (!generatedStory) return
    try {
      const fullText = generatedStory.chapters.map((chapter) => `${chapter.title}\n${chapter.body}`).join('\n\n')
      await navigator.clipboard.writeText(`${generatedStory.title}\n\n${fullText}\n\n${generatedStory.closingLine}`)
      setShareStatus('Story text copied.')
    } catch {
      setShareStatus('Copy is not available on this device yet.')
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-[480px] px-4 pb-24 pt-4">
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#fff7fb] via-[#f7f0ff] to-[#eaf3ff] px-5 pb-6 pt-5 shadow-[0_18px_40px_rgba(13,92,171,0.14)]">
        <div className="relative flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#0D5CAB] shadow-sm"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={goHome}
            className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0D5CAB] shadow-sm"
          >
            Home
          </button>
        </div>

        <AnimatePresence mode="wait">
          {step === 'intro' ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative pb-2 pt-10 text-center"
            >
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/85 text-[#D9468B] shadow-[0_10px_24px_rgba(217,70,139,0.16)]">
                <Sparkles className="h-8 w-8" />
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-[#0D5CAB]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                Create Your Love Story
              </h1>
              <p className="mx-auto mt-4 max-w-[320px] text-sm leading-7 text-[#4B5563]">Turn your memories into a beautiful wedding story.</p>
              <motion.button
                type="button"
                onClick={() => setStep('form')}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#0D5CAB] px-6 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(13,92,171,0.24)]"
              >
                Start Writing Your Story
              </motion.button>
            </motion.div>
          ) : step === 'form' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative pt-6"
            >
              <div className="rounded-3xl bg-white/82 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D9468B]">Story Studio</p>
                    <h1 className="mt-1 text-2xl font-bold text-[#0D5CAB]">Tell Us About Your Journey</h1>
                  </div>
                  <span className="inline-flex min-w-[72px] items-center justify-center rounded-full bg-[#E8F1FB] px-3 py-2 text-sm font-semibold text-[#0D5CAB]">
                    {coupleInitials}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[#F8FBFF] p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">Story tone</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {toneOptions.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => updateField('tone', option.key)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                            form.tone === option.key ? 'bg-[#0D5CAB] text-white' : 'bg-white text-[#0D5CAB] shadow-sm'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[#F8FBFF] p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">Story length</p>
                    <div className="mt-2 flex gap-2">
                      {[
                        { key: 'short' as const, label: 'Short' },
                        { key: 'full' as const, label: 'Full' },
                      ].map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => updateField('length', option.key)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                            form.length === option.key ? 'bg-[#0D5CAB] text-white' : 'bg-white text-[#0D5CAB] shadow-sm'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <label className="col-span-1 rounded-2xl bg-[#F8FBFF] p-4">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                      <HeartHandshake className="h-4 w-4 text-[#0D5CAB]" /> Partner 1 Name
                    </span>
                    <input
                      value={form.partnerOne}
                      onChange={(event) => updateField('partnerOne', event.target.value)}
                      className="mt-3 w-full bg-transparent text-sm text-[#1F2937] outline-none placeholder:text-slate-400"
                      placeholder="Enter Partner 1 name"
                    />
                  </label>
                  <label className="col-span-1 rounded-2xl bg-[#F8FBFF] p-4">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                      <HeartHandshake className="h-4 w-4 text-[#0D5CAB]" /> Partner 2 Name
                    </span>
                    <input
                      value={form.partnerTwo}
                      onChange={(event) => updateField('partnerTwo', event.target.value)}
                      className="mt-3 w-full bg-transparent text-sm text-[#1F2937] outline-none placeholder:text-slate-400"
                      placeholder="Enter Partner 2 name"
                    />
                  </label>

                  <label className="col-span-2 rounded-2xl bg-[#F8FBFF] p-4">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                      <MapPin className="h-4 w-4 text-[#0D5CAB]" /> Where did you meet?
                    </span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {whereMetOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField('whereMet', option)}
                          className={`rounded-full px-3 py-2 text-xs font-semibold transition ${form.whereMet === option ? 'bg-[#0D5CAB] text-white' : 'bg-white text-[#0D5CAB] shadow-sm'}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </label>

                  <label className="col-span-2 rounded-2xl bg-[#F8FBFF] p-4">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                      <Calendar className="h-4 w-4 text-[#0D5CAB]" /> When did you meet?
                    </span>
                    <input
                      value={form.whenMet}
                      onChange={(event) => updateField('whenMet', event.target.value)}
                      className="mt-3 w-full bg-transparent text-sm text-[#1F2937] outline-none placeholder:text-slate-400"
                      placeholder="June 2019"
                    />
                  </label>

                  <label className="col-span-2 rounded-2xl bg-[#F8FBFF] p-4">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                      <Sparkles className="h-4 w-4 text-[#0D5CAB]" /> First memorable moment
                    </span>
                    <textarea
                      value={form.firstMoment}
                      onChange={(event) => updateField('firstMoment', event.target.value)}
                      rows={3}
                      className="mt-3 w-full resize-none bg-transparent text-sm leading-6 text-[#1F2937] outline-none placeholder:text-slate-400"
                      placeholder="Your first special memory together."
                    />
                  </label>

                  <label className="col-span-2 rounded-2xl bg-[#F8FBFF] p-4">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                      <PartyPopper className="h-4 w-4 text-[#0D5CAB]" /> Proposal story (optional)
                    </span>
                    <textarea
                      value={form.proposalStory}
                      onChange={(event) => updateField('proposalStory', event.target.value)}
                      rows={3}
                      className="mt-3 w-full resize-none bg-transparent text-sm leading-6 text-[#1F2937] outline-none placeholder:text-slate-400"
                      placeholder="Tell us how the proposal happened."
                    />
                  </label>

                  <label className="col-span-2 rounded-2xl bg-[#F8FBFF] p-4">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
                      <PenLine className="h-4 w-4 text-[#0D5CAB]" /> Love story
                    </span>
                    <textarea
                      value={form.description}
                      onChange={(event) => updateField('description', event.target.value)}
                      rows={5}
                      className="mt-3 w-full resize-none bg-transparent text-sm leading-7 text-[#1F2937] outline-none placeholder:text-slate-400"
                      placeholder={`Two people met at the right time.\nWhat started as friendship grew into love.\nNow they are ready for forever.`}
                    />
                  </label>
                </div>

                {shareStatus && <p className="mt-4 text-sm font-medium text-[#B45309]">{shareStatus}</p>}

                <motion.button
                  type="button"
                  onClick={handleGenerate}
                  whileTap={{ scale: 0.98 }}
                  className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#0D5CAB] text-sm font-semibold text-white shadow-[0_12px_24px_rgba(13,92,171,0.24)]"
                >
                  {isGenerating ? 'Creating your story...' : 'Generate Love Story'}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative pt-6"
            >
              {generatedStory && (
                <div className="space-y-4">
                  <section className="overflow-hidden rounded-[32px] border border-white/80 bg-white/88 px-5 pb-6 pt-6 shadow-[0_18px_40px_rgba(13,92,171,0.12)] backdrop-blur-sm">
                    <div className="rounded-[28px] bg-gradient-to-br from-[#fff8fb] via-white to-[#eef5ff] px-5 py-6 text-center">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D9468B]">Digital Wedding Story</p>
                      <h1 className="mt-3 text-3xl font-bold text-[#0D5CAB]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        {generatedStory.title}
                      </h1>
                      <p className="mt-2 text-sm text-slate-600">{generatedStory.subtitle}</p>
                      <div className="mt-4 flex justify-center">
                        <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0D5CAB] shadow-sm">{generatedStory.badge}</span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="rounded-2xl bg-[#F8FBFF] px-3 py-2 text-center">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">Tone</p>
                        <p className="mt-1 text-xs font-semibold text-[#0D5CAB]">{toTitleCase(form.tone)}</p>
                      </div>
                      <div className="rounded-2xl bg-[#F8FBFF] px-3 py-2 text-center">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">Length</p>
                        <p className="mt-1 text-xs font-semibold text-[#0D5CAB]">{form.length === 'short' ? 'Short' : 'Full'}</p>
                      </div>
                      <div className="rounded-2xl bg-[#F8FBFF] px-3 py-2 text-center">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">Chapters</p>
                        <p className="mt-1 text-xs font-semibold text-[#0D5CAB]">{generatedStory.chapters.length}</p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-4">
                      {(showFullStory ? generatedStory.chapters : generatedStory.chapters.slice(0, 2)).map((chapter) => (
                        <article key={chapter.title} className="rounded-3xl border border-[#E6EEF8] bg-white px-5 py-5">
                          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#D9468B]">{chapter.title}</p>
                          <p className="mt-3 text-sm leading-7 text-[#475569]">{chapter.body}</p>
                        </article>
                      ))}
                    </div>

                    {generatedStory.chapters.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setShowFullStory((current) => !current)}
                        className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-[#F8FBFF] px-5 text-xs font-semibold uppercase tracking-[0.1em] text-[#0D5CAB]"
                      >
                        {showFullStory ? 'Show less' : 'Read full story'}
                      </button>
                    )}

                    <div className="mt-5 rounded-3xl bg-[#E8F1FB] px-5 py-4 text-center">
                      <p className="text-sm font-semibold text-[#0D5CAB]">{generatedStory.highlightLine}</p>
                      <p className="text-base font-semibold italic text-[#0D5CAB]">“{generatedStory.closingLine}”</p>
                    </div>
                  </section>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={handleCopyStory}
                      className="inline-flex h-11 items-center justify-center rounded-full bg-[#F8FBFF] text-xs font-semibold uppercase tracking-[0.08em] text-[#0D5CAB] shadow-sm"
                    >
                      Copy
                    </button>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="inline-flex h-11 items-center justify-center gap-1 rounded-full bg-[#0D5CAB] text-xs font-semibold uppercase tracking-[0.08em] text-white"
                    >
                      <Download className="h-4 w-4" /> Card
                    </button>
                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex h-11 items-center justify-center gap-1 rounded-full bg-[#F8FBFF] text-xs font-semibold uppercase tracking-[0.08em] text-[#0D5CAB] shadow-sm"
                    >
                      <Share2 className="h-4 w-4" /> Share
                    </button>
                  </div>

                  {shareStatus && <p className="text-sm font-medium text-[#0D5CAB]">{shareStatus}</p>}

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('form')}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#0D5CAB] shadow-sm"
                    >
                      Edit Story Details
                    </button>
                    <button
                      type="button"
                      onClick={goHome}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-[#0D5CAB] text-sm font-semibold text-white"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  )
}
