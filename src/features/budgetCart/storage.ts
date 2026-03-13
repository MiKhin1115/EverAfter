export type SelectedAddOn = {
  packageId: string
  addOnId: string
  name: string
  addPriceMMK: number
}

export type BudgetCartState = {
  selectedPackages: string[]
  selectedAddOns: SelectedAddOn[]
}

export type BudgetCartItem = {
  id: string
  title: string
  categoryId: string
  vendorName?: string
  price: number
  imageUrl?: string
  addedAt: number
}

export const BUDGET_CART_STORAGE_KEY = 'everafter_budget_cart_v1'

const emptyState = (): BudgetCartState => ({ selectedPackages: [], selectedAddOns: [] })

function sanitizeSelectedAddOn(input: unknown): SelectedAddOn | null {
  if (!input || typeof input !== 'object') return null

  const candidate = input as Partial<SelectedAddOn>
  if (typeof candidate.packageId !== 'string' || candidate.packageId.trim().length === 0) return null
  if (typeof candidate.addOnId !== 'string' || candidate.addOnId.trim().length === 0) return null
  if (typeof candidate.name !== 'string' || candidate.name.trim().length === 0) return null
  if (typeof candidate.addPriceMMK !== 'number' || !Number.isFinite(candidate.addPriceMMK)) return null

  return {
    packageId: candidate.packageId,
    addOnId: candidate.addOnId,
    name: candidate.name,
    addPriceMMK: candidate.addPriceMMK,
  }
}

function sanitizeState(input: unknown): BudgetCartState {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return emptyState()

  const candidate = input as Partial<BudgetCartState>
  const selectedPackages = Array.isArray(candidate.selectedPackages)
    ? Array.from(new Set(candidate.selectedPackages.filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0)))
    : []

  const selectedAddOns = Array.isArray(candidate.selectedAddOns)
    ? candidate.selectedAddOns.map((entry) => sanitizeSelectedAddOn(entry)).filter((entry): entry is SelectedAddOn => entry !== null)
    : []

  const activePackageIds = new Set(selectedPackages)

  return {
    selectedPackages,
    selectedAddOns: selectedAddOns.filter((entry) => activePackageIds.has(entry.packageId)),
  }
}

function migrateLegacyState(input: unknown): BudgetCartState {
  if (!Array.isArray(input)) return emptyState()

  const selectedPackages: string[] = []
  const selectedAddOns: SelectedAddOn[] = []

  input.forEach((entry) => {
    if (!entry || typeof entry !== 'object') return

    const candidate = entry as {
      id?: string
      selectedAddOns?: { id?: string; label?: string; price?: number }[]
    }

    if (typeof candidate.id !== 'string' || candidate.id.trim().length === 0) return
    selectedPackages.push(candidate.id)

    if (!Array.isArray(candidate.selectedAddOns)) return

    candidate.selectedAddOns.forEach((addOn) => {
      if (!addOn || typeof addOn !== 'object') return
      if (typeof addOn.id !== 'string' || typeof addOn.label !== 'string' || typeof addOn.price !== 'number') return

      selectedAddOns.push({
        packageId: candidate.id!,
        addOnId: addOn.id,
        name: addOn.label,
        addPriceMMK: addOn.price,
      })
    })
  })

  return sanitizeState({ selectedPackages, selectedAddOns })
}

export function getBudgetCart(): BudgetCartState {
  if (typeof window === 'undefined') return emptyState()

  try {
    const raw = JSON.parse(window.localStorage.getItem(BUDGET_CART_STORAGE_KEY) || 'null')

    if (Array.isArray(raw)) {
      const migrated = migrateLegacyState(raw)
      window.localStorage.setItem(BUDGET_CART_STORAGE_KEY, JSON.stringify(migrated))
      return migrated
    }

    return sanitizeState(raw)
  } catch {
    return emptyState()
  }
}

function writeBudgetCart(state: BudgetCartState): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(BUDGET_CART_STORAGE_KEY, JSON.stringify(sanitizeState(state)))
}

export function addToBudgetCart(packageId: string, addOns: SelectedAddOn[]): BudgetCartState {
  const current = getBudgetCart()
  const selectedPackages = current.selectedPackages.includes(packageId)
    ? current.selectedPackages
    : [...current.selectedPackages, packageId]

  const next: BudgetCartState = {
    selectedPackages,
    selectedAddOns: [...current.selectedAddOns.filter((entry) => entry.packageId !== packageId), ...addOns],
  }

  writeBudgetCart(next)
  return next
}

export function removeFromBudgetCart(packageId: string): BudgetCartState {
  const current = getBudgetCart()
  const next: BudgetCartState = {
    selectedPackages: current.selectedPackages.filter((entry) => entry !== packageId),
    selectedAddOns: current.selectedAddOns.filter((entry) => entry.packageId !== packageId),
  }

  writeBudgetCart(next)
  return next
}

export function clearBudgetCart(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(BUDGET_CART_STORAGE_KEY)
}
