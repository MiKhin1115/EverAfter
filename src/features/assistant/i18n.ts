import type { AssistantLanguage } from './storage'

export type I18nMap = { en: string; mm: string }

export function t(lang: AssistantLanguage, value: I18nMap): string {
  return lang === 'mm' ? value.mm : value.en
}

export const TEXT = {
  title: { en: 'Romantix', mm: 'Romantix' },
  versionEN: { en: 'English Version', mm: 'English Version' },
  versionMM: { en: 'Myanmar Version', mm: 'Myanmar Version' },

  startQuestion: {
    en: 'How can I help today?',
    mm: 'ဒီနေ့ ဘာကူညီပေးရမလဲ?',
  },
  chooseCategoryVendor: {
    en: 'Which vendor category are you looking for?',
    mm: 'ဘယ် vendor category ကိုရှာချင်ပါသလဲ?',
  },
  chooseCategoryPackage: {
    en: 'Which package category do you want?',
    mm: 'ဘယ် package category ကိုလိုချင်ပါသလဲ?',
  },
  chooseFiltersGeneral: {
    en: 'You can set an optional budget filter.',
    mm: 'ဘတ်ဂျက် filter ကို optional သတ်မှတ်နိုင်ပါတယ်။',
  },
  chooseFiltersGuest: {
    en: 'You can set budget and guest count filters.',
    mm: 'Budget နဲ့ Guest count filter ကိုသတ်မှတ်နိုင်ပါတယ်။',
  },
  chooseBudget: {
    en: 'Choose your budget range.',
    mm: 'Budget range ကိုရွေးပါ။',
  },
  chooseGuestCount: {
    en: 'Choose guest count.',
    mm: 'Guest count ကိုရွေးပါ။',
  },
  helpQuestion: {
    en: 'What kind of help do you need?',
    mm: 'ဘယ်လိုအကူအညီလိုပါသလဲ?',
  },
  bookingHelp: {
    en: 'Booking flow: choose shop, open package, review details, then confirm and pay.',
    mm: 'Booking လုပ်စဉ်: Shop ရွေးပါ၊ Package ဖွင့်ပါ၊ အသေးစိတ်စစ်ပြီး confirm + pay လုပ်ပါ။',
  },
  paymentHelp: {
    en: 'Payment is supported via KBZPay in-app.',
    mm: 'ငွေပေးချေမှုကို app အတွင်း KBZPay ဖြင့်လုပ်နိုင်ပါတယ်။',
  },
  contactHelp: {
    en: 'Contact support via Telegram or Viber from support channels.',
    mm: 'Support channels မှ Telegram သို့မဟုတ် Viber ဖြင့် ဆက်သွယ်နိုင်ပါတယ်။',
  },
  topMatches: {
    en: 'Here are top matches.',
    mm: 'ကိုက်ညီတဲ့အကောင်းဆုံး ရလဒ်တွေပါ။',
  },
  topMatchesWithBudget: {
    en: 'Here are top matches. Filter applied: {budget} MMK',
    mm: 'ကိုက်ညီတဲ့အကောင်းဆုံး ရလဒ်တွေပါ။ Filter: {budget} MMK',
  },
  noMatches: {
    en: 'No exact matches found for current filters.',
    mm: 'လက်ရှိ filter နဲ့ တိုက်ဆိုင်တဲ့ရလဒ် မတွေ့ပါ။',
  },
  opening: {
    en: 'Opening now...',
    mm: 'ဖွင့်နေပါသည်...',
  },
} as const

export const LABELS = {
  findVendor: { en: 'Find a Vendor', mm: 'Vendor ရှာရန်' },
  findPackage: { en: 'Find a Package', mm: 'Package ရှာရန်' },
  helpSupport: { en: 'Help & Support', mm: 'အကူအညီ' },

  venue: { en: 'Venue', mm: 'နေရာ' },
  makeup: { en: 'Makeup', mm: 'မိတ်ကပ်' },
  photo: { en: 'Photo', mm: 'ဓာတ်ပုံ' },
  dress: { en: 'Dress', mm: 'ဝတ်စုံ' },
  catering: { en: 'Catering', mm: 'စားသောက်' },
  honeymoon: { en: 'Honeymoon', mm: 'ဟန်းနီးမွန်း' },
  flower: { en: 'Flower', mm: 'ပန်းအလှဆင်' },

  more: { en: 'More...', mm: 'ပိုမို...' },
  back: { en: 'Back', mm: 'နောက်သို့' },
  startOver: { en: 'Start Over', mm: 'အစမှ ပြန်စ' },

  setBudget: { en: 'Set budget', mm: 'Budget သတ်မှတ်မယ်' },
  skipBudget: { en: 'Skip budget', mm: 'Budget မသတ်မှတ်' },
  setGuest: { en: 'Set guest count', mm: 'Guest count သတ်မှတ်မယ်' },
  skipGuest: { en: 'Skip guest count', mm: 'Guest count မသတ်မှတ်' },
  showMatches: { en: 'Show matches', mm: 'ရလဒ်ကြည့်မယ်' },

  budget1: { en: '1,000,000 MMK', mm: '1,000,000 MMK' },
  budget2: { en: '2,000,000 MMK', mm: '2,000,000 MMK' },
  budget3: { en: '3,000,000 MMK', mm: '3,000,000 MMK' },
  budget5: { en: '5,000,000 MMK', mm: '5,000,000 MMK' },
  budget8: { en: '8,000,000 MMK', mm: '8,000,000 MMK' },

  guest100: { en: '100 Guests', mm: 'ဧည့်သည် 100' },
  guest200: { en: '200 Guests', mm: 'ဧည့်သည် 200' },
  guest300: { en: '300 Guests', mm: 'ဧည့်သည် 300' },
  guest500: { en: '500 Guests', mm: 'ဧည့်သည် 500' },

  bookingHelp: { en: 'Booking help', mm: 'Booking အကူအညီ' },
  paymentHelp: { en: 'Payment help', mm: 'Payment အကူအညီ' },
  contactHelp: { en: 'Contact support', mm: 'Support ဆက်သွယ်ရန်' },

  openVendorList: { en: 'Open Vendor List', mm: 'Vendor List ဖွင့်ရန်' },
  openPackageList: { en: 'Open Package List', mm: 'Package List ဖွင့်ရန်' },
  adjustFilters: { en: 'Adjust filters', mm: 'Filter ပြန်ပြင်မယ်' },
} as const
