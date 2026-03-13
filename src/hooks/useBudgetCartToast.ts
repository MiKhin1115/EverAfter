import { useEffect, useRef, useState } from 'react'
import type { BudgetCartItem } from '../features/budgetCart/storage'

type BudgetCartAddedEventDetail = {
  item: BudgetCartItem
  added: boolean
}

type BudgetCartToastState = {
  open: boolean
  message: string
}

const moneyMMK = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

export function useBudgetCartToast(): BudgetCartToastState {
  const [state, setState] = useState<BudgetCartToastState>({ open: false, message: '' })
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const onAdded = (event: Event) => {
      const custom = event as CustomEvent<BudgetCartAddedEventDetail>
      const detail = custom.detail
      if (!detail?.item) return

      const title = detail.item.title
      const price = moneyMMK.format(detail.item.price)
      const message = detail.added
        ? `Added to Budget Calculator: ${title} (${price} MMK)`
        : `Already added: ${title}`

      setState({ open: true, message })

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = window.setTimeout(() => {
        setState((current) => ({ ...current, open: false }))
      }, 2500)
    }

    window.addEventListener('everafter:budgetcart-added', onAdded as EventListener)

    return () => {
      window.removeEventListener('everafter:budgetcart-added', onAdded as EventListener)
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return state
}
