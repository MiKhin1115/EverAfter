import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock3 } from 'lucide-react'

type BlogLanguage = 'en' | 'mm'
type BlogCategoryKey = 'planning' | 'beauty' | 'decor' | 'budget' | 'honeymoon' | 'memories' | 'relationship'

type WeddingBlogViewProps = {
  goBack: () => void
}

type BlogArticle = {
  id: string
  category: BlogCategoryKey
  titleEn: string
  titleMm: string
  summaryEn: string
  summaryMm: string
  readTimeMinutes: number
  relatedServiceEn: string
  relatedServiceMm: string
  detailsEn: string[]
  detailsMm: string[]
}

const categoryLabels: Record<BlogLanguage, Record<BlogCategoryKey, string>> = {
  en: {
    planning: 'Planning',
    beauty: 'Beauty',
    decor: 'Decor',
    budget: 'Budget',
    honeymoon: 'Honeymoon',
    memories: 'Memories',
    relationship: 'Relationship',
  },
  mm: {
    planning: 'အစီအစဉ်',
    beauty: 'အလှအပ',
    decor: 'အပြင်အဆင်',
    budget: 'ဘတ်ဂျက်',
    honeymoon: 'ဟန်းနီးမွန်း',
    memories: 'အမှတ်တရ',
    relationship: 'အချစ်ရေး',
  },
}

const articles: BlogArticle[] = [
  {
    id: 'venue-guide',
    category: 'planning',
    titleEn: 'How to Choose the Perfect Wedding Venue',
    titleMm: 'သင့်တော်သော မင်္ဂလာဆောင်နေရာကို ဘယ်လိုရွေးမလဲ',
    summaryEn: 'Compare guest size, location, and service bundles before confirming your venue.',
    summaryMm: 'ဧည့်သည်အရေအတွက်၊ တည်နေရာနှင့် ဝန်ဆောင်မှု package များကို နှိုင်းယှဉ်ပြီးမှ နေရာကို အတည်ပြုပါ။',
    readTimeMinutes: 1,
    relatedServiceEn: 'Venue Packages',
    relatedServiceMm: 'Venue Packages',
    detailsEn: [
      'Start by confirming your guest count range so you only compare venues that fit comfortably.',
      'Check transport access, parking, and travel time for both families before deciding.',
      'Review what is included in each package such as tables, sound, lighting, and coordination support.',
      'Ask about backup plans for rain or power cuts to avoid last-minute stress.',
    ],
    detailsMm: [
      'ဧည့်သည်အရေအတွက် ခန့်မှန်းချိန်ကို အရင်သတ်မှတ်ပြီး ဝင်ဆံ့နိုင်သော venue များကိုသာ နှိုင်းယှဉ်ပါ။',
      'မိသားစုနှစ်ဖက်အတွက် သွားလာရလွယ်ကူမှု၊ parking နှင့် travel time ကို စစ်ဆေးပါ။',
      'Package တစ်ခုချင်းစီတွင် table၊ sound၊ lighting နှင့် coordination support ပါ/မပါကို သေချာကြည့်ပါ။',
      'မိုးရွာခြင်း သို့မဟုတ် မီးပြတ်ခြင်းအတွက် backup plan ရှိ/မရှိကို မေးမြန်းပြီး စိတ်ဖိစီးမှုလျှော့ပါ။',
    ],
  },
  {
    id: 'eco-ideas',
    category: 'decor',
    titleEn: '7 Eco-Friendly Wedding Ideas for Modern Couples',
    titleMm: 'ခေတ်သစ်မောင်နှံများအတွက် Eco-Friendly မင်္ဂလာစိတ်ကူး ၇ ခု',
    summaryEn: 'Use reusable decor, seasonal flowers, and digital invitations for a greener event.',
    summaryMm: 'ပြန်လည်အသုံးပြုနိုင်သော decor၊ ရာသီပန်းများနှင့် digital invitation များဖြင့် ပိုမိုစိမ်းလန်းသောပွဲကို ဖန်တီးပါ။',
    readTimeMinutes: 1,
    relatedServiceEn: 'Decoration & Floral',
    relatedServiceMm: 'Decoration & Floral',
    detailsEn: [
      'Choose local seasonal flowers to reduce waste and lower floral transport costs.',
      'Use reusable welcome signs, fabric decor, and rented centerpieces whenever possible.',
      'Switch paper invites to digital invites for guests who are comfortable online.',
      'Work with vendors who already offer sustainable material options.',
    ],
    detailsMm: [
      'Local seasonal flowers များကို ရွေးချယ်ခြင်းဖြင့် waste လျော့ပြီး ပန်းပို့ဆောင်ရေးကုန်ကျစရိတ်ကိုလည်း လျှော့နိုင်ပါသည်။',
      'Reusable welcome signs၊ fabric decor နှင့် rented centerpiece များကို ဦးစားပေးအသုံးပြုပါ။',
      'Online အသုံးပြုရလွယ်ကူသော ဧည့်သည်များအတွက် paper invite အစား digital invite သုံးပါ။',
      'Sustainable material option ပေးနိုင်သော vendor များနှင့် ပူးပေါင်းလုပ်ဆောင်ပါ။',
    ],
  },
  {
    id: 'beauty-checklist',
    category: 'beauty',
    titleEn: 'Pre-Wedding Beauty Checklist for Brides',
    titleMm: 'မင်္ဂလာမတိုင်ခင် သတို့သမီးအလှအပ Checklist',
    summaryEn: 'Build a 3-month beauty timeline for skincare, makeup trial, and final look booking.',
    summaryMm: 'Skincare၊ makeup trial နှင့် final look booking အတွက် ၃ လကြိုတင် timeline တစ်ခုရေးဆွဲပါ။',
    readTimeMinutes: 1,
    relatedServiceEn: 'Bridal Beauty Services',
    relatedServiceMm: 'Bridal Beauty Services',
    detailsEn: [
      'Plan skincare routines at least 8 to 12 weeks before the event.',
      'Book your makeup and hair trials early so you can adjust style confidently.',
      'Prepare an emergency beauty kit for touch-ups on the ceremony day.',
      'Prioritize rest and hydration in the final week for a fresh, natural look.',
    ],
    detailsMm: [
      'Skincare routine ကို ပွဲမတိုင်ခင် ၈ ပတ်မှ ၁၂ ပတ်အလိုတွင် စတင်စီစဉ်ပါ။',
      'Makeup/hair trial များကို ကြိုတင်ဘွတ်ကင်လုပ်ပြီး style ကို အချိန်မီပြင်ဆင်ပါ။',
      'ပွဲနေ့ touch-up အတွက် emergency beauty kit တစ်စုံပြင်ဆင်ထားပါ။',
      'နောက်ဆုံးအပတ်တွင် အနားယူမှုနှင့် ရေဓာတ်ပြည့်ဝမှုကို ဦးစားပေးပါ။',
    ],
  },
  {
    id: 'budget-hacks',
    category: 'budget',
    titleEn: 'Budget Hacks for a Dream Wedding',
    titleMm: 'စိတ်ကူးမင်္ဂလာပွဲအတွက် Budget Hacks များ',
    summaryEn: 'Split must-have vs nice-to-have costs and use package combos to control spending.',
    summaryMm: 'မဖြစ်မနေလိုအပ်သည်နှင့် ရွေးချယ်နိုင်သည်တို့ကို ခွဲပြီး package combo များသုံးကာ ကုန်ကျစရိတ်ကို ထိန်းပါ။',
    readTimeMinutes: 1,
    relatedServiceEn: 'Budget Calculator',
    relatedServiceMm: 'Budget Calculator',
    detailsEn: [
      'Separate fixed costs from flexible costs before selecting any package.',
      'Bundle services from trusted vendors to reduce overlapping charges.',
      'Track every paid and pending amount in one checklist to avoid surprises.',
      'Keep a small contingency budget for last-minute adjustments.',
    ],
    detailsMm: [
      'Package မရွေးချယ်မီ fixed costs နှင့် flexible costs ကို သီးခြားခွဲသတ်မှတ်ပါ။',
      'ယုံကြည်စိတ်ချရသော vendor များ၏ bundle service များကို အသုံးပြုပြီး ထပ်တိုးကုန်ကျစရိတ်လျှော့ပါ။',
      'ပေးချေပြီး/မပေးချေသေးသောငွေပမာဏအားလုံးကို checklist တစ်ခုထဲတွင် မှတ်တမ်းတင်ပါ။',
      'နောက်ဆုံးအချိန်ပြောင်းလဲမှုများအတွက် contingency budget သေးသေးတစ်ခုထားပါ။',
    ],
  },
  {
    id: 'honeymoon-guide',
    category: 'honeymoon',
    titleEn: 'Top Honeymoon Destinations for Newlyweds',
    titleMm: 'အသစ်စက်စက် မောင်နှံများအတွက် ထိပ်တန်း ဟန်းနီးမွန်းနေရာများ',
    summaryEn: 'Match your travel style with destination mood, weather, and activity budget.',
    summaryMm: 'သင့်ခရီးသွားပုံစံ၊ ရာသီဥတုနှင့် လုပ်ဆောင်စရာ budget အလိုက် သင့်တော်သောနေရာကို ရွေးပါ။',
    readTimeMinutes: 1,
    relatedServiceEn: 'Honeymoon Packages',
    relatedServiceMm: 'Honeymoon Packages',
    detailsEn: [
      'Pick destination climate first, then compare activities that fit your couple style.',
      'Balance relaxation days with one or two adventure experiences.',
      'Set a clear travel budget including flights, hotel, food, and local transport.',
      'Book early for better room options and seasonal prices.',
    ],
    detailsMm: [
      'Destination ရာသီဥတုကို အရင်ရွေးပြီး မောင်နှံ style နဲ့ကိုက်ညီသော activities များကို နှိုင်းယှဉ်ပါ။',
      'အနားယူရက်များနှင့် adventure activities တစ်ချို့ကို မျှတအောင် စီစဉ်ပါ။',
      'Flight၊ hotel၊ food နှင့် local transport အပါအဝင် travel budget ကို သေချာသတ်မှတ်ပါ။',
      'Room option ကောင်းများနှင့် seasonal price အတွက် ကြိုတင်ဘွတ်ကင်လုပ်ပါ။',
    ],
  },
  {
    id: 'package-matching',
    category: 'planning',
    titleEn: 'How to Pick Matching Wedding Packages',
    titleMm: 'ကိုက်ညီသော မင်္ဂလာ Package များကို ဘယ်လိုရွေးမလဲ',
    summaryEn: 'Align photo, beauty, decor, and venue packages so timelines and styles stay consistent.',
    summaryMm: 'Photo၊ beauty၊ decor နှင့် venue package များကို အချိန်ဇယားနှင့် style ကိုက်ညီအောင် ပေါင်းစည်းရွေးချယ်ပါ။',
    readTimeMinutes: 1,
    relatedServiceEn: 'All Service Packages',
    relatedServiceMm: 'All Service Packages',
    detailsEn: [
      'Match visual style across venue, decoration, and photography for one consistent theme.',
      'Align service timelines so setup, makeup, and photo sessions do not overlap.',
      'Compare package exclusions carefully to avoid hidden add-on costs.',
      'Confirm who handles coordination on event day for smooth execution.',
    ],
    detailsMm: [
      'Theme တစ်ခုတည်းထိန်းသိမ်းရန် venue၊ decoration နှင့် photography style များကို ကိုက်ညီအောင်ရွေးပါ။',
      'Setup၊ makeup နှင့် photo session အချိန်ဇယားများ မတိုက်ခိုက်စေရန် timeline ကို တပြိုင်နက်ချိန်ညှိပါ။',
      'Package exclusion များကို သေချာဖတ်ရှုပြီး add-on အပိုကုန်ကျစရိတ်များကိုရှောင်ပါ။',
      'Event day coordination ကို ဘယ်သူအဓိကတာဝန်ယူမလဲကို အတည်ပြုပါ။',
    ],
  },
  {
    id: 'memory-tips',
    category: 'memories',
    titleEn: 'Saving Wedding Memories the Smart Way',
    titleMm: 'မင်္ဂလာအမှတ်တရများကို စနစ်တကျ သိမ်းဆည်းနည်း',
    summaryEn: 'Create a memory timeline from engagement day to wedding day with shared albums.',
    summaryMm: 'Engagement နေ့မှ မင်္ဂလာနေ့အထိ shared albums ဖြင့် memory timeline တစ်ခုဖန်တီးပါ။',
    readTimeMinutes: 1,
    relatedServiceEn: 'Wedding Memories',
    relatedServiceMm: 'Wedding Memories',
    detailsEn: [
      'Create shared folders for engagement, pre-wedding, and wedding-day photos.',
      'Collect short voice notes or letters from close family for emotional keepsakes.',
      'Tag files by date and event type so they are easy to revisit later.',
      'Export a highlight story after the event to keep your timeline meaningful.',
    ],
    detailsMm: [
      'Engagement၊ pre-wedding နှင့် wedding-day photos များအတွက် shared folder များဖန်တီးပါ။',
      'အနီးကပ်မိသားစုများထံမှ voice note သို့မဟုတ် letter အတိုများကို စုစည်းထားပါ။',
      'File များကို date နှင့် event type အလိုက် tag လုပ်ထားခြင်းဖြင့် နောက်တစ်ကြိမ်ရှာဖွေရလွယ်ကူပါသည်။',
      'Event ပြီးနောက် highlight story တစ်ခု export လုပ်ပြီး timeline ကို အဓိပ္ပါယ်ပြည့်စုံစေပါ။',
    ],
  },
  {
    id: 'relationship-advice',
    category: 'relationship',
    titleEn: 'Couple Communication Tips Before the Big Day',
    titleMm: 'မင်္ဂလာမတိုင်ခင် မောင်နှံဆက်သွယ်ရေး အကြံပြုချက်များ',
    summaryEn: 'Use weekly check-ins and role sharing to reduce stress during wedding planning.',
    summaryMm: 'မင်္ဂလာစီစဉ်ချိန် စိတ်ဖိစီးမှုလျော့ရန် အပတ်စဉ် check-in နှင့် တာဝန်ခွဲဝေမှုကို အသုံးပြုပါ။',
    readTimeMinutes: 1,
    relatedServiceEn: 'Couple Compatibility AI',
    relatedServiceMm: 'Couple Compatibility AI',
    detailsEn: [
      'Set one short planning check-in each week to align priorities and concerns.',
      'Divide responsibilities clearly so both partners feel involved and supported.',
      'Use calm communication when discussing budget and family expectations.',
      'Celebrate small progress milestones to keep planning enjoyable.',
    ],
    detailsMm: [
      'အပတ်စဉ် planning check-in အချိန်တိုတစ်ခုထားပြီး ဦးစားပေးချက်များကို တူညီအောင်ပြုလုပ်ပါ။',
      'တာဝန်များကို ရှင်းလင်းစွာခွဲဝေပြီး မောင်နှံနှစ်ဖက်စလုံးပါဝင်မှုရှိစေရန် လုပ်ဆောင်ပါ။',
      'Budget နှင့် မိသားစုမျှော်မှန်းချက်များကို ဆွေးနွေးရာတွင် တည်ငြိမ်သော ဆက်သွယ်ရေးနည်းလမ်းအသုံးပြုပါ။',
      'ပြီးမြောက်သည့် အဆင့်ငယ်များကို အတူတကွဆင်နွှဲပြီး planning ကို ပိုမိုပျော်ရွှင်စေပါ။',
    ],
  },
  {
    id: 'timeline-planning',
    category: 'planning',
    titleEn: 'Wedding Timeline: What to Book First',
    titleMm: 'မင်္ဂလာ Timeline မှာ ဘာကို အရင်ဘွတ်ကင်လုပ်သင့်သလဲ',
    summaryEn: 'Follow a clear booking order so your venue, vendors, and schedule stay on track.',
    summaryMm: 'Venue၊ vendor နှင့် schedule ကို အချိန်မီဖြစ်စေရန် booking order ကို စနစ်တကျလိုက်နာပါ။',
    readTimeMinutes: 2,
    relatedServiceEn: 'Planning & Vendor Packages',
    relatedServiceMm: 'Planning & Vendor Packages',
    detailsEn: [
      'Start by locking your venue and date before booking other services.',
      'Book high-demand teams first, including photo/video and makeup.',
      'Create monthly checkpoints for payments, fittings, and guest confirmations.',
      'Use a shared checklist for both partners to track progress quickly.',
      'Keep your final week focused on confirmations, rehearsals, and backup plans.',
      'A clear timeline protects budget and reduces last-minute stress.',
    ],
    detailsMm: [
      'အခြားဝန်ဆောင်မှုများမတိုင်မီ venue နှင့် date ကို အရင်အတည်ပြုပါ။',
      'Demand မြင့်သော photo/video နှင့် makeup team များကို ကြိုတင်ဘွတ်ကင်လုပ်ပါ။',
      'Payment၊ fitting နှင့် guest confirmation များအတွက် လစဉ် checkpoint သတ်မှတ်ပါ။',
      'မောင်နှံနှစ်ဦးလုံး အလွယ်တကူစစ်ဆေးနိုင်ရန် shared checklist အသုံးပြုပါ။',
      'နောက်ဆုံးအပတ်တွင် confirmation၊ rehearsal နှင့် backup plan ကို ဦးစားပေးပါ။',
      'Timeline ရှင်းလင်းခြင်းက budget ထိန်းနိုင်စေပြီး စိတ်ဖိစီးမှုကိုလည်း လျှော့ပေးပါသည်။',
    ],
  },
  {
    id: 'groom-style-prep',
    category: 'beauty',
    titleEn: 'Groom Style Guide Before Wedding Day',
    titleMm: 'မင်္ဂလာမတိုင်ခင် သတို့သား Style လမ်းညွှန်',
    summaryEn: 'Simple grooming and outfit planning can upgrade the groom’s final look.',
    summaryMm: 'Grooming နှင့် outfit planning ကို လွယ်ကူစွာ စီစဉ်ခြင်းဖြင့် သတို့သားရုပ်သွင်ကို ပိုမိုကောင်းမွန်စေပါသည်။',
    readTimeMinutes: 2,
    relatedServiceEn: 'Groom Styling & Beauty',
    relatedServiceMm: 'Groom Styling & Beauty',
    detailsEn: [
      'Schedule haircut and beard trim three to five days before the ceremony.',
      'Match suit color and texture with the wedding theme and bride styling.',
      'Keep skincare simple with cleansing, moisturizing, hydration, and sleep.',
      'Try the full outfit once with shoes and accessories before event day.',
      'Prepare a mini touch-up kit with comb, tissue, and perfume.',
      'Consistent grooming creates sharper and cleaner wedding photos.',
    ],
    detailsMm: [
      'ပွဲမတိုင်ခင် ၃ ရက်မှ ၅ ရက်အလိုတွင် haircut နှင့် beard trim လုပ်ပါ။',
      'Wedding theme နှင့် bride styling ကိုက်ညီသော suit အရောင်နှင့်အဆင်ကို ရွေးပါ။',
      'Skincare ကို cleanse၊ moisturize၊ hydration နှင့် အနားယူမှုအခြေခံဖြင့် ထိန်းပါ။',
      'ပွဲနေ့မတိုင်ခင် shoes နှင့် accessories အပါအဝင် outfit ကို တစ်ကြိမ်ပြည့်စုံစမ်းသပ်ပါ။',
      'Comb၊ tissue နှင့် perfume ပါဝင်သော touch-up kit သေးသေးတစ်ခု ပြင်ဆင်ထားပါ။',
      'Grooming တည်ငြိမ်မှုက wedding photo ကို ပိုမိုသန့်ရှင်းတောက်ပစေပါသည်။',
    ],
  },
  {
    id: 'budget-negotiation',
    category: 'budget',
    titleEn: 'How to Negotiate Wedding Packages Calmly',
    titleMm: 'Wedding Package များကို တည်ငြိမ်စွာ ညှိနှိုင်းနည်း',
    summaryEn: 'Use package comparisons and clear priorities to negotiate better rates.',
    summaryMm: 'Package နှိုင်းယှဉ်ခြင်းနှင့် ဦးစားပေးလိုအပ်ချက်များကို ရှင်းလင်းစွာ သတ်မှတ်ခြင်းဖြင့် ဈေးနှုန်းကောင်းရနိုင်ပါသည်။',
    readTimeMinutes: 2,
    relatedServiceEn: 'Budget Calculator & Packages',
    relatedServiceMm: 'Budget Calculator & Packages',
    detailsEn: [
      'Collect at least three itemized quotes from similar vendors.',
      'Share your must-have services first, then discuss optional items.',
      'Ask if vendors can swap extras instead of reducing quality.',
      'Confirm exclusions clearly to avoid hidden charges after booking.',
      'Set one final budget limit and communicate it to every vendor.',
      'Strong negotiation is clarity and planning, not pressure.',
    ],
    detailsMm: [
      'တူညီသော vendor အမျိုးအစားမှ itemized quote ၃ ခုခန့် စုဆောင်းပါ။',
      'မဖြစ်မနေလိုအပ်သော service များကို အရင်ပြောပြီး optional item များကိုနောက်မှ ဆွေးနွေးပါ။',
      'Quality မလျှော့ဘဲ extra item ပြောင်းလဲပေးနိုင်မလား vendor များကို မေးမြန်းပါ။',
      'Booking ပြီးနောက် hidden charge မဖြစ်စေရန် exclusion များကို ရှင်းလင်းစွာ အတည်ပြုပါ။',
      'Budget အမြင့်ဆုံးပမာဏတစ်ခုသတ်မှတ်ပြီး vendor တိုင်းနှင့် တူညီစွာဆက်သွယ်ပါ။',
      'ကောင်းမွန်သော negotiation သည် ဖိအားမဟုတ်ဘဲ planning နှင့် clarity ဖြစ်ပါသည်။',
    ],
  },
  {
    id: 'short-honeymoon-plan',
    category: 'honeymoon',
    titleEn: '3-Day Honeymoon Plan for Busy Couples',
    titleMm: 'အလုပ်များသော မောင်နှံများအတွက် ၃ ရက် Honeymoon အစီအစဉ်',
    summaryEn: 'A short honeymoon can still feel romantic with smart itinerary planning.',
    summaryMm: 'အချိန်တို Honeymoon ကိုပင် itinerary စီစဉ်မှုကောင်းဖြင့် ရိုမန်တစ်ဖြစ်အောင် ပြုလုပ်နိုင်ပါသည်။',
    readTimeMinutes: 2,
    relatedServiceEn: 'Honeymoon Finder & Travel Packages',
    relatedServiceMm: 'Honeymoon Finder & Travel Packages',
    detailsEn: [
      'Choose destinations with short transfer times to maximize relaxation.',
      'Use day one for check-in and light activities after travel.',
      'Plan one signature experience on day two, like sunset cruise or spa.',
      'Keep day three flexible for cafés, photos, and easy return.',
      'Bundle hotel and transport when possible for smoother logistics.',
      'Short trips feel better when each day has a clear mood.',
    ],
    detailsMm: [
      'Transfer time တိုသော destination များကို ရွေးပြီး အနားယူချိန်ကို ပိုမိုထုတ်ယူပါ။',
      'Day 1 ကို check-in နှင့် light activity များအတွက် သုံးပါ။',
      'Day 2 တွင် sunset cruise သို့မဟုတ် spa ကဲ့သို့ signature experience တစ်ခု စီစဉ်ပါ။',
      'Day 3 ကို café၊ ဓာတ်ပုံနှင့် အလွယ်ပြန်ခရီးအတွက် flexible ထားပါ။',
      'အဆင်ပြေပါက hotel နှင့် transport ကို package တစ်ခုတည်းဖြင့်ဘွတ်ကင်လုပ်ပါ။',
      'နေ့တိုင်း mood ရှင်းလင်းစွာထားသော short trip များသည် ပိုမိုနှစ်သက်ဖွယ်ကောင်းပါသည်။',
    ],
  },
  {
    id: 'digital-memory-book',
    category: 'memories',
    titleEn: 'Create a Digital Wedding Memory Book',
    titleMm: 'Digital Wedding Memory Book တစ်ခု ဖန်တီးနည်း',
    summaryEn: 'Turn your best photos, notes, and clips into one timeline keepsake.',
    summaryMm: 'အကောင်းဆုံးဓာတ်ပုံများ၊ မှတ်စုများနှင့် clip များကို timeline keepsake တစ်ခုအဖြစ် စုစည်းပါ။',
    readTimeMinutes: 2,
    relatedServiceEn: 'Wedding Memories Tool',
    relatedServiceMm: 'Wedding Memories Tool',
    detailsEn: [
      'Split folders by event stage: engagement, pre-wedding, ceremony, after-party.',
      'Add short captions so moments are easy to revisit and share.',
      'Collect voice notes from parents or close friends for deeper meaning.',
      'Select only highlight photos to keep the album clean and emotional.',
      'Export anniversary editions yearly to keep your story growing.',
      'A curated memory book feels warmer than random gallery storage.',
    ],
    detailsMm: [
      'Event stage အလိုက် engagement၊ pre-wedding၊ ceremony၊ after-party folder များခွဲပါ။',
      'Moment များကို ပြန်ကြည့်ရလွယ်ကူစေရန် caption အတိုများထည့်ပါ။',
      'မိဘ သို့မဟုတ် သူငယ်ချင်းနီးစပ်သူများ၏ voice note များကို စုဆောင်းပြီး meaning တိုးပါ။',
      'Album ကို သန့်ရှင်းစေရန် highlight photo များကိုသာ ရွေးချယ်ပါ။',
      'နှစ်ပတ်လည်တိုင်း edition အသစ် export လုပ်ပြီး story ကို ဆက်လက်တိုးတက်စေပါ။',
      'Random gallery ထက် curated memory book သည် ပိုမိုနွေးထွေးအဓိပ္ပါယ်ရှိပါသည်။',
    ],
  },
]

export function WeddingBlogView({ goBack }: WeddingBlogViewProps) {
  const [language, setLanguage] = useState<BlogLanguage>('en')
  const [activeCategory, setActiveCategory] = useState<BlogCategoryKey>('planning')
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)
  const selectedArticle = useMemo(() => articles.find((article) => article.id === selectedArticleId) ?? null, [selectedArticleId])
  const categoryOrder: BlogCategoryKey[] = ['planning', 'beauty', 'decor', 'budget', 'honeymoon', 'memories', 'relationship']
  const visibleArticles = useMemo(
    () => articles.filter((article) => article.category === activeCategory),
    [activeCategory],
  )

  const introTitle = language === 'en' ? 'Wedding Blog' : 'မင်္ဂလာ Blog'
  const introDescription =
    language === 'en'
      ? 'Discover expert tips, wedding trends, and inspiration for every stage of your journey.'
      : 'သင့်ခရီးစဉ်အဆင့်တိုင်းအတွက် ကျွမ်းကျင်အကြံပြုချက်များ၊ trend များနှင့် အိုင်ဒီယာများကို ရှာဖွေဖတ်ရှုနိုင်ပါသည်။'

  const handleBack = () => {
    if (selectedArticleId) {
      setSelectedArticleId(null)
      return
    }
    goBack()
  }

  return (
    <motion.main
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="mx-auto min-h-screen max-w-[480px] overflow-x-hidden px-4 pb-8 pt-4"
    >
      <header className="relative rounded-2xl bg-gradient-to-r from-[#B45309] to-[#D97706] px-4 pb-6 pt-4 text-white shadow-[0_10px_26px_rgba(202,138,4,0.28)]">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="absolute right-4 top-4 inline-flex overflow-hidden rounded-full bg-white/20 p-1">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${language === 'en' ? 'bg-white text-[#A16207]' : 'text-white'}`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage('mm')}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${language === 'mm' ? 'bg-white text-[#A16207]' : 'text-white'}`}
          >
            MM
          </button>
        </div>

        <h1 className="mt-4 text-base font-semibold">
          {selectedArticle ? (language === 'en' ? 'Article Detail' : 'ဆောင်းပါးအသေးစိတ်') : introTitle}
        </h1>
      </header>

      {!selectedArticle ? (
        <>
          <section className="mt-4 rounded-2xl bg-white p-4 shadow-[0_10px_24px_rgba(202,138,4,0.1)]">
            <h2 className="text-lg font-semibold text-[#A16207]">{introTitle}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">{introDescription}</p>

            <div
              className="mt-3 overflow-x-auto scrollbar-hide touch-pan-x"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="inline-flex min-w-max gap-2 pr-2">
                {categoryOrder.map((category) => {
                  const active = category === activeCategory
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        active
                          ? 'border-[#CA8A04] bg-[#FFF8CC] text-[#A16207]'
                          : 'border-[#F7E6B1] bg-white text-[#7A6A4F] hover:border-[#F0D389]'
                      }`}
                    >
                      {categoryLabels[language][category]}
                    </button>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="mt-4 space-y-3">
            {visibleArticles.map((article) => (
              <button
                key={article.id}
                type="button"
                onClick={() => setSelectedArticleId(article.id)}
                className="w-full rounded-2xl bg-white p-4 text-left shadow-[0_8px_20px_rgba(202,138,4,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(202,138,4,0.16)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#FFF8CC] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#A16207]">
                    {categoryLabels[language][article.category]}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <Clock3 size={13} />
                    {article.readTimeMinutes} min
                  </span>
                </div>

                <h3 className="mt-3 text-[15px] font-semibold leading-6 text-slate-900">
                  {language === 'en' ? article.titleEn : article.titleMm}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{language === 'en' ? article.summaryEn : article.summaryMm}</p>

                <p className="mt-2 text-xs font-medium text-[#A16207]">
                  {language === 'en' ? 'Related in EverAfter:' : 'EverAfter တွင် ဆက်စပ်ဝန်ဆောင်မှု:'}{' '}
                  <span className="font-semibold">{language === 'en' ? article.relatedServiceEn : article.relatedServiceMm}</span>
                </p>
              </button>
            ))}
          </section>
        </>
      ) : (
        <section className="mt-4 rounded-2xl bg-white p-4 shadow-[0_10px_24px_rgba(202,138,4,0.1)]">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-[#FFF8CC] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#A16207]">
              {categoryLabels[language][selectedArticle.category]}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Clock3 size={13} />
              {selectedArticle.readTimeMinutes} min
            </span>
          </div>

          <h2 className="mt-3 text-lg font-semibold leading-7 text-slate-900">
            {language === 'en' ? selectedArticle.titleEn : selectedArticle.titleMm}
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">{language === 'en' ? selectedArticle.summaryEn : selectedArticle.summaryMm}</p>

          <div className="mt-4 space-y-3">
            {(language === 'en' ? selectedArticle.detailsEn : selectedArticle.detailsMm).map((line) => (
              <p key={line} className="text-sm leading-7 text-slate-700">
                {line}
              </p>
            ))}
          </div>

          <p className="mt-4 rounded-xl bg-[#FFFBEB] px-3 py-2 text-xs font-medium text-[#A16207]">
            {language === 'en' ? 'Related in EverAfter:' : 'EverAfter တွင် ဆက်စပ်ဝန်ဆောင်မှု:'}{' '}
            <span className="font-semibold">{language === 'en' ? selectedArticle.relatedServiceEn : selectedArticle.relatedServiceMm}</span>
          </p>
        </section>
      )}
    </motion.main>
  )
}
