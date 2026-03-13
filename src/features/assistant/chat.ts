import botData from './bot-data.json'
import { shops as catalogShops } from '../../data/catalog/shops'
import { packages as catalogPackages } from '../../data/catalog/packages'
import type { AssistantAction, AssistantLanguage } from './storage'
import { toCanonicalCategoryId } from '../../data/catalog/packages/base'

type ChatResult = {
  reply: string
  quickReplies: string[]
  actions: AssistantAction[]
}

type BotIntentId =
  | 'FIND_VENDOR'
  | 'FIND_PACKAGE'
  | 'BOOKING_HELP'
  | 'PAYMENT_HELP'
  | 'CANCEL_HELP'
  | 'CONTACT_HELP'
  | 'BUDGET_HELP'
  | 'GREETING'
  | 'FALLBACK'

type IntentEntry = {
  id: BotIntentId
  reply: { en: string; mm: string }
  quickReplies: { en: string[]; mm: string[] }
  synonyms: { en: string[]; mm: string[] }
}

type CategoryEntry = {
  categoryId: string
  keywords: { en: string[]; mm: string[] }
}

type BotDataShape = {
  defaults: {
    quickReplies: { en: string[]; mm: string[] }
    fallback: { en: string; mm: string }
    greeting: { en: string; mm: string }
    nextQuestion: { en: string; mm: string }
  }
  prompts: Record<string, { en: string; mm: string }>
  intents: IntentEntry[]
  categoryKeywords: CategoryEntry[]
}

type ExtractedInfo = {
  budgetMMK: number | null
  city: string | null
  eventDate: string | null
  guestCount: number | null
  style: string | null
  durationDays: number | null
  categoryId: string | null
}

const data = botData as BotDataShape

const categoryAliasMap: Record<string, string[]> = {
  'bridal-beauty': ['bridal-beauty', 'makeup', 'beauty', 'hair', 'mua'],
  'catering-cake': ['catering-cake', 'catering', 'cake', 'menu', 'buffet'],
  'clothing-fashion': ['clothing-fashion', 'clothing', 'fashion', 'dress', 'gown', 'suit'],
  'decoration-floral': ['decoration-floral', 'deco-floral', 'decor', 'decoration', 'flower', 'floral'],
  'entertainment-hosting': ['entertainment-hosting', 'entertainment', 'hosting', 'mc', 'dj', 'music'],
  'health-fitness': ['health-fitness', 'health', 'fitness', 'clinic', 'medical'],
  honeymoon: ['honeymoon', 'honeymoon-travel', 'travel', 'villa', 'beach', 'island'],
  'favors-invitations': ['favors-invitations', 'invitations', 'invite', 'card', 'invitation'],
  jewelry: ['jewelry', 'jewellery', 'ring', 'gold', 'diamond'],
  photography: ['photography', 'photo-video', 'photo', 'video', 'camera', 'videography'],
  transportation: ['transportation', 'transport', 'car', 'ride', 'shuttle', 'vehicle'],
  venue: ['venue', 'venue-setup', 'hall', 'ballroom', 'hotel', 'place'],
}

const cityKeywords = [
  'yangon',
  'mandalay',
  'naypyitaw',
  'nay pyi taw',
  'bagan',
  'inle',
  'phuket',
  'bali',
  'maldives',
  'bangkok',
  'pattaya',
  'ngwe saung',
  'chaung tha',
  'ရန်ကုန်',
  'မန္တလေး',
  'နေပြည်တော်',
  'ငွေဆောင်',
  'ချောင်းသာ',
]

const styleKeywords = ['classic', 'modern', 'romantic', 'luxury', 'minimal', 'traditional', 'classic', 'romance']

function toEnglishDigits(value: string): string {
  const mmDigits: Record<string, string> = {
    '၀': '0',
    '၁': '1',
    '၂': '2',
    '၃': '3',
    '၄': '4',
    '၅': '5',
    '၆': '6',
    '၇': '7',
    '၈': '8',
    '၉': '9',
  }

  return value
    .split('')
    .map((char) => mmDigits[char] ?? char)
    .join('')
}

function normalizeInput(raw: string): string {
  const lowered = toEnglishDigits(raw.toLowerCase().trim())
  const withoutPunctuation = lowered
    .replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]/g, ' ')
    .replace(/၊|။/g, ' ')
  return withoutPunctuation.replace(/\s+/g, ' ').trim()
}

function compactText(value: string): string {
  return value.replace(/\s+/g, '')
}

function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length

  const matrix: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0))

  for (let i = 0; i <= a.length; i += 1) matrix[i][0] = i
  for (let j = 0; j <= b.length; j += 1) matrix[0][j] = j

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost)
    }
  }

  return matrix[a.length][b.length]
}

function fuzzyContains(normalizedText: string, keyword: string): boolean {
  const normalizedKeyword = normalizeInput(keyword)
  if (!normalizedKeyword) return false

  if (normalizedText.includes(normalizedKeyword)) return true
  if (compactText(normalizedText).includes(compactText(normalizedKeyword))) return true

  const tokens = normalizedText.split(' ')
  const keywordTokens = normalizedKeyword.split(' ')

  if (keywordTokens.length === 1) {
    const target = keywordTokens[0]
    return tokens.some((token) => {
      if (Math.abs(token.length - target.length) > 1) return false
      return levenshteinDistance(token, target) <= 1
    })
  }

  return false
}

function parseBudgetMMK(text: string): number | null {
  const normalized = toEnglishDigits(text).replace(/,/g, '')

  const lakhMatch = normalized.match(/(\d+(?:\.\d+)?)\s*(lakh|lakhs|သိန်း)/i)
  if (lakhMatch) {
    const value = Number(lakhMatch[1])
    if (Number.isFinite(value)) return Math.round(value * 100000)
  }

  const match = normalized.match(/(under|below|max|<=|အောက်|အများဆုံး)?\s*(\d{3,10})\s*(mmk|ks|kyat|k)?/i)
  if (!match) return null

  let value = Number(match[2])
  if (!Number.isFinite(value)) return null

  const suffix = (match[3] || '').toLowerCase()
  if (suffix === 'k') value *= 1000

  return value
}

function parseDurationDays(text: string): number | null {
  const normalized = toEnglishDigits(text)
  const match = normalized.match(/(\d{1,2})\s*(d|day|days|ရက်)/i)
  if (!match) return null

  const value = Number(match[1])
  return Number.isFinite(value) ? value : null
}

function parseGuestCount(text: string): number | null {
  const normalized = toEnglishDigits(text).replace(/,/g, '')
  const match = normalized.match(/(\d{2,4})\s*(guests?|pax|people|ဧည့်သည်)/i)
  if (!match) return null

  const value = Number(match[1])
  return Number.isFinite(value) ? value : null
}

function parseDate(text: string): string | null {
  const match = text.match(/(\d{4}-\d{1,2}-\d{1,2}|\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?)/)
  return match ? match[1] : null
}

function parseCity(normalizedText: string): string | null {
  for (const city of cityKeywords) {
    if (fuzzyContains(normalizedText, city)) return city
  }
  return null
}

function parseStyle(normalizedText: string): string | null {
  for (const style of styleKeywords) {
    if (fuzzyContains(normalizedText, style)) return style
  }
  return null
}

function detectCategoryId(normalizedText: string): string | null {
  const scoreByCategory = new Map<string, number>()

  for (const entry of data.categoryKeywords || []) {
    const categoryId = entry.categoryId
    const keywords = [...(entry.keywords.en || []), ...(entry.keywords.mm || [])]
    for (const keyword of keywords) {
      if (fuzzyContains(normalizedText, keyword)) {
        scoreByCategory.set(categoryId, (scoreByCategory.get(categoryId) ?? 0) + 2)
      }
    }
  }

  for (const [categoryId, keywords] of Object.entries(categoryAliasMap)) {
    for (const keyword of keywords) {
      if (fuzzyContains(normalizedText, keyword)) {
        scoreByCategory.set(categoryId, (scoreByCategory.get(categoryId) ?? 0) + 1)
      }
    }
  }

  let best: { id: string; score: number } | null = null
  for (const [id, score] of scoreByCategory.entries()) {
    if (!best || score > best.score) best = { id, score }
  }

  return best?.id ?? null
}

function extractInfo(text: string): ExtractedInfo {
  const normalized = normalizeInput(text)
  return {
    budgetMMK: parseBudgetMMK(normalized),
    city: parseCity(normalized),
    eventDate: parseDate(normalized),
    guestCount: parseGuestCount(normalized),
    style: parseStyle(normalized),
    durationDays: parseDurationDays(normalized),
    categoryId: detectCategoryId(normalized),
  }
}

function getIntentById(id: BotIntentId): IntentEntry {
  return data.intents.find((intent) => intent.id === id) ?? data.intents.find((intent) => intent.id === 'FALLBACK')!
}

function detectIntent(normalizedText: string): BotIntentId {
  let best: { id: BotIntentId; score: number } = { id: 'FALLBACK', score: 0 }

  for (const intent of data.intents) {
    let score = 0
    const synonyms = [...(intent.synonyms.en || []), ...(intent.synonyms.mm || [])]

    for (const keyword of synonyms) {
      if (fuzzyContains(normalizedText, keyword)) {
        score += keyword.length > 6 ? 2 : 1
      }
    }

    if (intent.id === 'GREETING' && /^(hi|hello|hey|mingalar|မင်္ဂလာပါ)/i.test(normalizedText)) {
      score += 3
    }

    if (score > best.score) {
      best = { id: intent.id, score }
    }
  }

  if (best.score === 0) {
    if (parseBudgetMMK(normalizedText) !== null) return 'BUDGET_HELP'
    if (detectCategoryId(normalizedText)) return 'FIND_VENDOR'
  }

  return best.id
}

function mapCategoryToExisting(categoryId: string | null): string | null {
  if (!categoryId) return null
  const existing = new Set(catalogShops.map((shop) => shop.categoryId))

  if (existing.has(categoryId)) return categoryId

  const fallbackMap: Record<string, string[]> = {
  }

  const candidates = fallbackMap[categoryId] ?? []
  for (const candidate of candidates) {
    if (existing.has(candidate)) return candidate
  }

  return null
}

function getText(lang: AssistantLanguage, content: { en: string; mm: string }): string {
  return lang === 'mm' ? content.mm : content.en
}

function summarizeCategory(categoryId: string, lang: AssistantLanguage): string {
  const shops = catalogShops.filter((shop) => shop.categoryId === categoryId)
  const items = catalogPackages.filter((item) => item.categoryId === categoryId)

  return lang === 'mm'
    ? `${shops.length} shops နဲ့ ${items.length} packages/items တွေတွေ့ပါတယ်။`
    : `I found ${shops.length} shops and ${items.length} packages/items in this category.`
}

function buildBudgetSuggestions(budgetMMK: number, categoryId: string | null, lang: AssistantLanguage): string {
  const list = catalogPackages
    .filter((pack) => (categoryId ? pack.categoryId === categoryId : true))
    .filter((pack) => pack.priceMMK <= budgetMMK)
    .sort((a, b) => a.priceMMK - b.priceMMK)
    .slice(0, 4)

  if (list.length === 0) {
    return lang === 'mm'
      ? `${budgetMMK.toLocaleString()} MMK အောက် package မတွေ့ပါ။ Budget ကိုတိုးပြီးစမ်းကြည့်ပါ။`
      : `No package found under ${budgetMMK.toLocaleString()} MMK. Try a higher budget.`
  }

  const names = list.map((item) => item.title).join(', ')
  return lang === 'mm'
    ? `${budgetMMK.toLocaleString()} MMK အောက် အကြံပြုချက်: ${names}`
    : `Suggestions under ${budgetMMK.toLocaleString()} MMK: ${names}`
}

function buildNextQuestions(extracted: ExtractedInfo, lang: AssistantLanguage): string[] {
  const missing: string[] = []

  if (extracted.budgetMMK === null) missing.push(getText(lang, data.prompts.budget))
  if (!extracted.city) missing.push(getText(lang, data.prompts.city))
  if (!extracted.eventDate) missing.push(getText(lang, data.prompts.eventDate))
  if (extracted.guestCount === null) missing.push(getText(lang, data.prompts.guestCount))
  if (!extracted.style) missing.push(getText(lang, data.prompts.style))

  return missing.slice(0, 2)
}

function makeResult(reply: string, quickReplies: string[], actions: AssistantAction[] = []): ChatResult {
  return { reply, quickReplies, actions }
}

export function getInitialAssistantMessage(lang: AssistantLanguage): ChatResult {
  return makeResult(getText(lang, data.defaults.greeting), data.defaults.quickReplies[lang], [])
}

export function runLocalAssistant(input: string, lang: AssistantLanguage): ChatResult {
  const raw = input.trim()
  if (!raw) return getInitialAssistantMessage(lang)

  const normalized = normalizeInput(raw)
  const intentId = detectIntent(normalized)
  const intent = getIntentById(intentId)
  const extracted = extractInfo(raw)

  const resolvedCategoryId = mapCategoryToExisting(extracted.categoryId)
  const categoryLabel = resolvedCategoryId ? summarizeCategory(resolvedCategoryId, lang) : ''

  const actions: AssistantAction[] = []

  if (intentId === 'GREETING') {
    return makeResult(
      `${getText(lang, intent.reply)} ${getText(lang, data.defaults.nextQuestion)}`,
      intent.quickReplies[lang],
      [],
    )
  }

  if (intentId === 'FIND_VENDOR' || intentId === 'FIND_PACKAGE') {
    const wantsPackage =
      intentId === 'FIND_PACKAGE' ||
      fuzzyContains(normalized, 'package') ||
      fuzzyContains(normalized, 'service') ||
      fuzzyContains(normalized, 'offer')

    if (resolvedCategoryId) {
      actions.push({
        type: 'NAVIGATE',
        path: wantsPackage ? `/packages/${resolvedCategoryId}` : `/shops/${resolvedCategoryId}`,
        label: wantsPackage ? 'Open Packages' : 'Open Shops',
      })
    }

    const nextQuestions = buildNextQuestions(extracted, lang)
    const budgetText =
      extracted.budgetMMK !== null ? ` ${buildBudgetSuggestions(extracted.budgetMMK, resolvedCategoryId, lang)}` : ''

    const replyBase = `${getText(lang, intent.reply)} ${categoryLabel}`.trim()
    const followUp = nextQuestions.length > 0 ? ` ${nextQuestions.join(' ')}` : ''
    return makeResult(`${replyBase}${budgetText}${followUp}`.trim(), intent.quickReplies[lang], actions)
  }

  if (intentId === 'BUDGET_HELP') {
    const reply =
      extracted.budgetMMK !== null
        ? buildBudgetSuggestions(extracted.budgetMMK, resolvedCategoryId, lang)
        : `${getText(lang, intent.reply)} ${getText(lang, data.prompts.budget)}`

    if (resolvedCategoryId) {
      actions.push({ type: 'NAVIGATE', path: `/packages/${resolvedCategoryId}`, label: 'Open Packages' })
    }

    return makeResult(reply, intent.quickReplies[lang], actions)
  }

  if (intentId === 'BOOKING_HELP' || intentId === 'PAYMENT_HELP' || intentId === 'CANCEL_HELP' || intentId === 'CONTACT_HELP') {
    const nextQuestions = buildNextQuestions(extracted, lang)
    const followUp = nextQuestions.length > 0 ? ` ${nextQuestions.join(' ')}` : ''

    if (resolvedCategoryId) {
      actions.push({ type: 'NAVIGATE', path: `/shops/${resolvedCategoryId}`, label: 'Open Shops' })
    }

    return makeResult(`${getText(lang, intent.reply)}${followUp}`, intent.quickReplies[lang], actions)
  }

  if (extracted.durationDays !== null) {
    const candidates = catalogPackages
      .filter((pack) => {
        const daysValue = (pack as { durationDays?: number }).durationDays
        if (typeof daysValue !== 'number') return false
        return daysValue <= extracted.durationDays!
      })
      .slice(0, 3)

    if (candidates.length > 0) {
      const names = candidates.map((item) => item.title).join(', ')
      return makeResult(
        lang === 'mm'
          ? `${extracted.durationDays} ရက်အတွင်း အကြံပြု package: ${names}`
          : `Suggested packages within ${extracted.durationDays} days: ${names}`,
        data.defaults.quickReplies[lang],
      )
    }
  }

  return makeResult(getText(lang, data.defaults.fallback), data.defaults.quickReplies[lang], [])
}
