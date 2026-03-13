import { packages as catalogPackages } from '../../data/catalog/packages'
import { shops as catalogShops } from '../../data/catalog/shops'
import type { AssistantLanguage } from './storage'
import { LABELS, TEXT, t } from './i18n'
import { toCanonicalCategoryId } from '../../data/catalog/packages/base'

export type RuleStep =
  | 'START'
  | 'CATEGORY'
  | 'CATEGORY_MORE'
  | 'FILTERS'
  | 'BUDGET'
  | 'GUESTS'
  | 'HELP'
  | 'RESULTS'

export type RuleMode = 'vendor' | 'package' | null

export type RuleOption = {
  id: string
  label: string
}

export type RuleAction = {
  type: 'NAVIGATE'
  path: string
}

export type RuleState = {
  step: RuleStep
  mode: RuleMode
  categoryId: string | null
  budget: number | null
  guestCount: number | null
}

export type RuleResult = {
  botText: string
  nextOptions: RuleOption[]
  actions?: RuleAction[]
}

const categoryConfig = [
  { id: 'venue', key: 'venue' as const },
  { id: 'bridal-beauty', key: 'makeup' as const },
  { id: 'photography', key: 'photo' as const },
  { id: 'clothing-fashion', key: 'dress' as const },
  { id: 'catering-cake', key: 'catering' as const },
  { id: 'honeymoon', key: 'honeymoon' as const },
  { id: 'decoration-floral', key: 'flower' as const },
] as const

const guestRelevantCategories = new Set(['venue', 'catering-cake'])

const budgetOptions = [
  { id: 'budget_1000000', value: 1000000, text: 'budget1' as const },
  { id: 'budget_2000000', value: 2000000, text: 'budget2' as const },
  { id: 'budget_3000000', value: 3000000, text: 'budget3' as const },
  { id: 'budget_5000000', value: 5000000, text: 'budget5' as const },
  { id: 'budget_8000000', value: 8000000, text: 'budget8' as const },
] as const

const guestOptions = [
  { id: 'guest_100', value: 100, text: 'guest100' as const },
  { id: 'guest_200', value: 200, text: 'guest200' as const },
  { id: 'guest_300', value: 300, text: 'guest300' as const },
  { id: 'guest_500', value: 500, text: 'guest500' as const },
] as const

export const initialRuleState: RuleState = {
  step: 'START',
  mode: null,
  categoryId: null,
  budget: null,
  guestCount: null,
}

function button(lang: AssistantLanguage, id: string, label: { en: string; mm: string }): RuleOption {
  return { id, label: t(lang, label) }
}

function isCategoryAvailable(categoryId: string): boolean {
  const canonicalCategoryId = toCanonicalCategoryId(categoryId)
  return catalogShops.some((shop) => shop.categoryId === canonicalCategoryId)
}

function resolveCategoryForData(categoryId: string | null): string[] {
  if (!categoryId) return []
  return [toCanonicalCategoryId(categoryId)]
}

function parseCategory(optionId: string): string | null {
  if (!optionId.startsWith('cat_')) return null
  return optionId.replace('cat_', '')
}

function parseBudget(optionId: string): number | null {
  const found = budgetOptions.find((item) => item.id === optionId)
  return found ? found.value : null
}

function parseGuest(optionId: string): number | null {
  const found = guestOptions.find((item) => item.id === optionId)
  return found ? found.value : null
}

function formatBudgetText(lang: AssistantLanguage, budget: number): string {
  return t(lang, TEXT.topMatchesWithBudget).replace('{budget}', budget.toLocaleString('en-US'))
}

function makeStartResult(lang: AssistantLanguage): RuleResult {
  return {
    botText: t(lang, TEXT.startQuestion),
    nextOptions: [
      button(lang, 'main_vendor', LABELS.findVendor),
      button(lang, 'main_package', LABELS.findPackage),
      button(lang, 'main_help', LABELS.helpSupport),
    ],
  }
}

function categoryButtons(lang: AssistantLanguage, more: boolean): RuleOption[] {
  const available = categoryConfig.filter((item) => isCategoryAvailable(item.id))
  const primary = available.slice(0, 4)
  const secondary = available.slice(4)

  const convert = (item: (typeof categoryConfig)[number]) =>
    button(lang, `cat_${item.id}`, LABELS[item.key])

  if (!more) {
    const options = primary.map(convert)
    if (secondary.length > 0) options.push(button(lang, 'cat_more', LABELS.more))
    return options
  }

  const options = secondary.map(convert)
  options.push(button(lang, 'cat_back', LABELS.back))
  return options
}

function makeCategoryResult(lang: AssistantLanguage, mode: RuleMode, more = false): RuleResult {
  return {
    botText: mode === 'package' ? t(lang, TEXT.chooseCategoryPackage) : t(lang, TEXT.chooseCategoryVendor),
    nextOptions: categoryButtons(lang, more),
  }
}

function makeFilterResult(lang: AssistantLanguage, state: RuleState): RuleResult {
  const needsGuest = state.categoryId ? guestRelevantCategories.has(state.categoryId) : false
  if (needsGuest) {
    return {
      botText: t(lang, TEXT.chooseFiltersGuest),
      nextOptions: [
        button(lang, 'filter_set_budget', LABELS.setBudget),
        button(lang, 'filter_skip_budget', LABELS.skipBudget),
        button(lang, 'filter_set_guest', LABELS.setGuest),
        button(lang, 'filter_skip_guest', LABELS.skipGuest),
      ],
    }
  }

  return {
    botText: t(lang, TEXT.chooseFiltersGeneral),
    nextOptions: [
      button(lang, 'filter_set_budget', LABELS.setBudget),
      button(lang, 'filter_skip_budget', LABELS.skipBudget),
      button(lang, 'filter_show', LABELS.showMatches),
    ],
  }
}

function makeBudgetResult(lang: AssistantLanguage): RuleResult {
  return {
    botText: t(lang, TEXT.chooseBudget),
    nextOptions: budgetOptions.map((item) => button(lang, item.id, LABELS[item.text])),
  }
}

function makeGuestResult(lang: AssistantLanguage): RuleResult {
  return {
    botText: t(lang, TEXT.chooseGuestCount),
    nextOptions: guestOptions.map((item) => button(lang, item.id, LABELS[item.text])),
  }
}

function makeHelpResult(lang: AssistantLanguage): RuleResult {
  return {
    botText: t(lang, TEXT.helpQuestion),
    nextOptions: [
      button(lang, 'help_booking', LABELS.bookingHelp),
      button(lang, 'help_payment', LABELS.paymentHelp),
      button(lang, 'help_contact', LABELS.contactHelp),
      button(lang, 'help_back', LABELS.back),
    ],
  }
}

function matchesExist(state: RuleState): boolean {
  const categories = resolveCategoryForData(state.categoryId)
  if (categories.length === 0 || !state.mode) return false

  if (state.mode === 'vendor') {
    const list = catalogShops.filter((shop) => categories.includes(shop.categoryId))
    if (state.budget !== null) {
      return list.some((shop) => shop.startingPriceMMK <= state.budget)
    }
    return list.length > 0
  }

  const list = catalogPackages.filter((pkg) => categories.includes(pkg.categoryId))
  if (state.budget !== null) {
    return list.some((pkg) => pkg.priceMMK <= state.budget)
  }
  return list.length > 0
}

function makeResultResult(lang: AssistantLanguage, state: RuleState): RuleResult {
  const categoryId = state.categoryId ?? 'venue'
  const budgetText = state.budget !== null ? formatBudgetText(lang, state.budget) : t(lang, TEXT.topMatches)
  const hasMatches = matchesExist(state)

  if (!hasMatches) {
    return {
      botText: t(lang, TEXT.noMatches),
      nextOptions: [
        button(lang, 'result_adjust', LABELS.adjustFilters),
        button(lang, 'result_vendor', LABELS.openVendorList),
        button(lang, 'result_package', LABELS.openPackageList),
      ],
      actions: [],
    }
  }

  return {
    botText: budgetText,
    nextOptions: [
      button(lang, 'result_vendor', LABELS.openVendorList),
      button(lang, 'result_package', LABELS.openPackageList),
      button(lang, 'result_restart', LABELS.startOver),
    ],
    actions: [],
  }
}

function withNavigate(path: string): RuleAction[] {
  return [{ type: 'NAVIGATE', path }]
}

export function getInitialRuleResult(lang: AssistantLanguage): RuleResult {
  return makeStartResult(lang)
}

export function runRuleTransition(state: RuleState, selectedOptionId: string, lang: AssistantLanguage): { nextState: RuleState; result: RuleResult } {
  if (selectedOptionId === 'result_restart') {
    return { nextState: initialRuleState, result: makeStartResult(lang) }
  }

  if (state.step === 'START') {
    if (selectedOptionId === 'main_vendor') {
      const nextState: RuleState = { ...initialRuleState, step: 'CATEGORY', mode: 'vendor' }
      return { nextState, result: makeCategoryResult(lang, 'vendor') }
    }
    if (selectedOptionId === 'main_package') {
      const nextState: RuleState = { ...initialRuleState, step: 'CATEGORY', mode: 'package' }
      return { nextState, result: makeCategoryResult(lang, 'package') }
    }
    if (selectedOptionId === 'main_help') {
      const nextState: RuleState = { ...state, step: 'HELP' }
      return { nextState, result: makeHelpResult(lang) }
    }
    return { nextState: state, result: makeStartResult(lang) }
  }

  if (state.step === 'HELP') {
    if (selectedOptionId === 'help_booking') {
      return {
        nextState: state,
        result: { botText: t(lang, TEXT.bookingHelp), nextOptions: [button(lang, 'help_back', LABELS.back), button(lang, 'result_restart', LABELS.startOver)] },
      }
    }
    if (selectedOptionId === 'help_payment') {
      return {
        nextState: state,
        result: { botText: t(lang, TEXT.paymentHelp), nextOptions: [button(lang, 'help_back', LABELS.back), button(lang, 'result_restart', LABELS.startOver)] },
      }
    }
    if (selectedOptionId === 'help_contact') {
      return {
        nextState: state,
        result: { botText: t(lang, TEXT.contactHelp), nextOptions: [button(lang, 'help_back', LABELS.back), button(lang, 'result_restart', LABELS.startOver)] },
      }
    }
    if (selectedOptionId === 'help_back') {
      return { nextState: initialRuleState, result: makeStartResult(lang) }
    }
    return { nextState: state, result: makeHelpResult(lang) }
  }

  if (state.step === 'CATEGORY') {
    if (selectedOptionId === 'cat_more') {
      const nextState: RuleState = { ...state, step: 'CATEGORY_MORE' }
      return { nextState, result: makeCategoryResult(lang, state.mode, true) }
    }

    const category = parseCategory(selectedOptionId)
    if (category) {
      const nextState: RuleState = { ...state, step: 'FILTERS', categoryId: category }
      return { nextState, result: makeFilterResult(lang, nextState) }
    }

    return { nextState: state, result: makeCategoryResult(lang, state.mode) }
  }

  if (state.step === 'CATEGORY_MORE') {
    if (selectedOptionId === 'cat_back') {
      const nextState: RuleState = { ...state, step: 'CATEGORY' }
      return { nextState, result: makeCategoryResult(lang, state.mode, false) }
    }

    const category = parseCategory(selectedOptionId)
    if (category) {
      const nextState: RuleState = { ...state, step: 'FILTERS', categoryId: category }
      return { nextState, result: makeFilterResult(lang, nextState) }
    }

    return { nextState: state, result: makeCategoryResult(lang, state.mode, true) }
  }

  if (state.step === 'FILTERS') {
    if (selectedOptionId === 'filter_set_budget') {
      return { nextState: { ...state, step: 'BUDGET' }, result: makeBudgetResult(lang) }
    }
    if (selectedOptionId === 'filter_skip_budget') {
      const nextState = { ...state, budget: null }
      return { nextState: { ...nextState, step: 'RESULTS' }, result: makeResultResult(lang, { ...nextState, step: 'RESULTS' }) }
    }
    if (selectedOptionId === 'filter_set_guest' && state.categoryId && guestRelevantCategories.has(state.categoryId)) {
      return { nextState: { ...state, step: 'GUESTS' }, result: makeGuestResult(lang) }
    }
    if (selectedOptionId === 'filter_skip_guest' && state.categoryId && guestRelevantCategories.has(state.categoryId)) {
      const nextState = { ...state, guestCount: null }
      return { nextState: { ...nextState, step: 'RESULTS' }, result: makeResultResult(lang, { ...nextState, step: 'RESULTS' }) }
    }
    if (selectedOptionId === 'filter_show') {
      const nextState = { ...state, step: 'RESULTS' as const }
      return { nextState, result: makeResultResult(lang, nextState) }
    }

    return { nextState: state, result: makeFilterResult(lang, state) }
  }

  if (state.step === 'BUDGET') {
    const budget = parseBudget(selectedOptionId)
    if (budget !== null) {
      const nextState: RuleState = { ...state, budget, step: 'RESULTS' }
      return { nextState, result: makeResultResult(lang, nextState) }
    }

    return { nextState: state, result: makeBudgetResult(lang) }
  }

  if (state.step === 'GUESTS') {
    const guests = parseGuest(selectedOptionId)
    if (guests !== null) {
      const nextState: RuleState = { ...state, guestCount: guests, step: 'RESULTS' }
      return { nextState, result: makeResultResult(lang, nextState) }
    }
    return { nextState: state, result: makeGuestResult(lang) }
  }

  if (state.step === 'RESULTS') {
    const categoryId = state.categoryId ?? 'venue'
    if (selectedOptionId === 'result_vendor') {
      const resolved = mapCategoryAlias(categoryId)
      return {
        nextState: state,
        result: {
          botText: t(lang, TEXT.opening),
          nextOptions: [button(lang, 'result_restart', LABELS.startOver)],
          actions: withNavigate(`/shops/${resolved}`),
        },
      }
    }
    if (selectedOptionId === 'result_package') {
      const resolved = mapCategoryAlias(categoryId)
      return {
        nextState: state,
        result: {
          botText: t(lang, TEXT.opening),
          nextOptions: [button(lang, 'result_restart', LABELS.startOver)],
          actions: withNavigate(`/packages/${resolved}`),
        },
      }
    }
    if (selectedOptionId === 'result_adjust') {
      const nextState: RuleState = { ...state, step: 'FILTERS' }
      return { nextState, result: makeFilterResult(lang, nextState) }
    }

    return { nextState: state, result: makeResultResult(lang, state) }
  }

  return { nextState: initialRuleState, result: makeStartResult(lang) }
}
