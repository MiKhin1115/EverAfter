import type { ReactNode } from 'react'

type SectionCardProps = {
  children: ReactNode
  className?: string
}

export function SectionCard({ children, className = '' }: SectionCardProps) {
  return <div className={className}>{children}</div>
}
