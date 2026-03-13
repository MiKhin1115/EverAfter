import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'

const placeholders = ['Search by shop...', 'Search by package...']

function DynamicSearch() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % placeholders.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="relative -mt-7 px-5">
      <div className="flex h-14 items-center gap-3 rounded-full bg-white px-5 shadow-[0_14px_30px_rgba(15,23,42,0.12)]">
        <Search size={19} className="text-[#0D5CAB]" />

        <AnimatePresence mode="wait">
          <motion.span
            key={placeholders[index]}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-sm text-slate-500"
          >
            {placeholders[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DynamicSearch
