import { ArrowLeft, Clock3, Sparkles } from 'lucide-react'

type CompatibilityQuizComingSoonViewProps = {
  goBack: () => void
  goHome: () => void
}

export function CompatibilityQuizComingSoonView({ goBack, goHome }: CompatibilityQuizComingSoonViewProps) {
  return (
    <main className="mx-auto max-w-[700px] px-4 pb-16 pt-8">
      <section className="rounded-3xl bg-[#E8F1FB] p-6 md:p-8">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0D5CAB] shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="mt-6 rounded-3xl bg-white p-8 text-center shadow-sm">
          <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CFE3FA]">
            <Clock3 className="h-8 w-8 text-[#0D5CAB]" />
          </span>
          <h1 className="mt-4 text-3xl font-bold text-[#0D5CAB]">Compatibility Quiz Coming Soon</h1>
          <p className="mt-3 text-sm text-slate-700">
            The interactive quiz experience is under development. You can preview the feature details and start planning right away.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#0D5CAB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0A4D90]"
            >
              <Sparkles size={16} />
              Back to Feature
            </button>
            <button
              type="button"
              onClick={goHome}
              className="inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0D5CAB] transition hover:bg-[#CFE3FA]"
            >
              Go Home
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
