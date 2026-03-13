import { UserRound } from 'lucide-react'

type HomeHeaderProps = {
  onProfileClick?: () => void
}

function HomeHeader({ onProfileClick }: HomeHeaderProps) {
  return (
    <header className="relative h-[20vh] min-h-[150px] max-h-[210px] overflow-hidden rounded-b-[32px] bg-gradient-to-b from-[#0D5CAB] to-[#1A73D9] px-5 text-white shadow-[0_18px_42px_rgba(13,92,171,0.35)]">
      <h1 className="font-title absolute inset-0 flex items-center justify-center text-[2rem] font-bold tracking-[0.02em] text-white">
        EverAfter
      </h1>

      <button
        type="button"
        onClick={onProfileClick}
        aria-label="User profile"
        className="absolute left-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
      >
        <UserRound size={20} className="text-white" />
      </button>

      <div className="absolute right-5 top-5 flex items-center gap-2">
        <button
          type="button"
          aria-label="AI recommendations"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
        >
          <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#1f2937] bg-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#facc15]" />
          </span>
        </button>
        <button
          type="button"
          aria-label="My bookings"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
        >
          <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#1f2937] bg-white">
            <span className="h-2 w-2 rounded-full border border-[#1f2937]" />
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#60a5fa]" />
          </span>
        </button>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 left-0 h-24 w-full bg-gradient-to-b from-transparent via-[#f5f7fa80] to-[#F5F7FA]"
      />
    </header>
  )
}

export default HomeHeader
