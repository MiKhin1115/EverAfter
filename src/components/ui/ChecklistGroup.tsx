import { Check } from 'lucide-react'

type ChecklistGroupProps = {
  items: string[]
  listClassName?: string
  itemClassName?: string
  iconClassName?: string
  textClassName?: string
}

export function ChecklistGroup({
  items,
  listClassName = '',
  itemClassName = '',
  iconClassName = '',
  textClassName = '',
}: ChecklistGroupProps) {
  return (
    <ul className={listClassName}>
      {items.map((item) => (
        <li key={item} className={itemClassName}>
          <Check size={14} className={iconClassName} />
          <span className={textClassName}>{item}</span>
        </li>
      ))}
    </ul>
  )
}
