import { CheckCircle2 } from 'lucide-react'
import type { Package } from '../../types/catalog'

type PackageHeroProps = {
  pkg: Package
  detailSlideIndex: number
  fallbackHeroImage: string
}

export function PackageHero({ pkg, detailSlideIndex, fallbackHeroImage }: PackageHeroProps) {
  const image = pkg.heroImages[detailSlideIndex % pkg.heroImages.length] ?? pkg.heroImages[0]

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-[0_18px_36px_rgba(13,92,171,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={pkg.title}
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = fallbackHeroImage
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/10 to-transparent" />
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {pkg.heroImages.map((_, index) => (
            <span key={index} className={`h-1.5 w-1.5 rounded-full ${index === detailSlideIndex ? 'w-5 bg-white' : 'bg-white/60'}`} />
          ))}
        </div>
        {pkg.verified && (
          <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#E8F1FB] px-3 py-1 text-xs font-semibold text-[#0D5CAB]">
            <CheckCircle2 size={12} /> Verified
          </div>
        )}
      </div>
    </article>
  )
}
