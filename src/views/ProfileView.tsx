import { ArrowLeft, User, type LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

type ProfileMenuKey = 'account' | 'about' | 'partner' | 'terms' | 'faq' | 'orders'

type ProfileMenuItem = {
  key: ProfileMenuKey
  title: string
  icon: LucideIcon
}

type ProfileViewProps = {
  goBack: () => void
  menuItems: ProfileMenuItem[]
  onMenuClick: (key: ProfileMenuKey) => void
}

export function ProfileView({ goBack, menuItems, onMenuClick }: ProfileViewProps) {
  return (
    <motion.main
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="mx-auto max-w-[480px] pb-4"
    >
      <header className="relative h-[15vh] min-h-[120px] bg-gradient-to-b from-[#0D5CAB] to-[#1A73D9] px-4 pt-4 text-white">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"
          aria-label="Back"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        <div className="absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white bg-[#E8F1FB] p-1 shadow-sm">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#CFE3FA] text-[#0D5CAB]">
            <User size={34} />
          </div>
        </div>
      </header>

      <section className="px-4 pt-14">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-slate-800">Su Su</h1>
        </div>

        <div className="mt-5 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                type="button"
                key={item.title}
                onClick={() => onMenuClick(item.key)}
                className="flex min-h-[86px] w-full items-center justify-between rounded-xl border border-[#CFE3FA] bg-white px-4 py-6 text-left transition hover:bg-[#E8F1FB] active:bg-[#E8F1FB]"
              >
                <span className="inline-flex items-center gap-3">
                  <Icon size={18} className="text-[#0D5CAB]" />
                  <span className="text-sm font-medium text-slate-800">{item.title}</span>
                </span>
              </button>
            )
          })}
        </div>
      </section>
    </motion.main>
  )
}
