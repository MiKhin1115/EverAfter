import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

type FAQLanguage = 'en' | 'mm'

type FAQsViewProps = {
  goBack: () => void
}

const englishFAQBody = `1. What is EverAfter?
EverAfter is a digital platform designed to help couples and families plan important life events such as weddings, engagements, and celebrations. It connects users with venues, services, and event packages in one place.

2. What services can I find on EverAfter?
Users can explore a variety of services including:
Wedding venues
Bridal studios and beauty services
Event decoration
Photography services
Honeymoon travel packages
Catering and event planning services

3. How do I book a service on EverAfter?
Users can browse available services, view packages and pricing, and select the service they prefer. After choosing a package, they can submit a booking request directly through the app.

4. Can I compare different vendors or packages?
Yes. EverAfter allows users to view multiple vendors and compare their packages, prices, and services before making a decision.

5. Is EverAfter free to use?
Yes. Browsing services and exploring packages on EverAfter is completely free for users.

6. How do vendors join EverAfter?
Businesses such as bridal studios, venues, clinics, or travel agencies can register on EverAfter and list their services and packages to reach more customers.

7. Can I customize my event package?
Some vendors offer customizable packages. Users can contact the vendor directly through the app to discuss special requirements or personalized services.

8. How does EverAfter help with event planning?
EverAfter simplifies event planning by organizing all essential services in one platform, helping users save time and easily manage their event arrangements.

9. Is my personal information secure?
Yes. EverAfter prioritizes user privacy and ensures that personal information and booking details are securely handled.

10. What makes EverAfter different from other event platforms?
EverAfter focuses on providing a complete event ecosystem, combining venues, beauty services, travel planning, and event packages in one convenient platform.

11. What is the AI Wedding Planner in EverAfter?
The AI Wedding Planner is a smart feature that helps couples plan their wedding step-by-step. It provides recommendations for venues, services, and schedules based on the user’s preferences, location, and budget.

12. How does the AI Wedding Planner give recommendations?
The AI analyzes information such as your budget, event size, preferred style, and location. Based on this data, it suggests suitable vendors, venues, and packages available on the EverAfter platform.

13. What is the Budget Calculator in EverAfter?
The Budget Calculator helps users estimate and manage their event expenses. It automatically calculates expected costs for venues, bridal services, decoration, travel, and other wedding-related services.

14. Can the Budget Calculator help me stay within my budget?
Yes. Users can enter their maximum budget, and the system will suggest service packages and vendors that match their budget, helping them plan their event without overspending.`

const myanmarFAQBody = `၁။ EverAfter ဆိုတာ ဘာလဲ?
EverAfter ဆိုသည်မှာ မင်္ဂလာဆောင်များ၊ စေ့စပ်ပွဲများနှင့် အခြားသော အထိမ်းအမှတ်ပွဲများကဲ့သို့ အရေးကြီးသော ဘဝမှတ်တိုင်များကို စီစဉ်ရာတွင် ကူညီပေးသည့် Digital Platform တစ်ခုဖြစ်သည်။ အခမ်းအနား ကျင်းပမည့်နေရာများ၊ ဝန်ဆောင်မှုများနှင့် ပွဲစီစဉ်သည့် အထုပ်အပိုး (Packages) များကို တစ်နေရာတည်းတွင် ချိတ်ဆက်ပေးထားပါသည်။

၂။ EverAfter မှာ ဘယ်လိုဝန်ဆောင်မှုမျိုးတွေကို ရှာဖွေနိုင်သလဲ?
အသုံးပြုသူများသည် အောက်ပါဝန်ဆောင်မှုမျိုးစုံကို ရှာဖွေနိုင်သည် -
မင်္ဂလာဆောင်ခန်းမများနှင့် နေရာများ
မင်္ဂလာဆောင် ဝတ်စုံဆိုင်များနှင့် အလှအပရေးရာ ဝန်ဆောင်မှုများ
အခမ်းအနား အပြင်အဆင် (Decoration) လုပ်ငန်းများ
ဓာတ်ပုံနှင့် ဗီဒီယို ဝန်ဆောင်မှုများ
ဟန်းနီးမွန်း (Honeymoon) ခရီးစဉ်များ
စားသောက်ကုန်နှင့် ပွဲစီစဉ်မှု ဝန်ဆောင်မှုများ

၃။ EverAfter မှာ ဝန်ဆောင်မှုတစ်ခုကို ဘယ်လို ဘွတ်ကင် (Booking) တင်ရမလဲ?
ရရှိနိုင်သော ဝန်ဆောင်မှုများကို ရှာဖွေကြည့်ရှုပြီး မိမိနှစ်သက်ရာ Package နှင့် ဈေးနှုန်းကို ရွေးချယ်ပါ။ ထို့နောက် App မှတစ်ဆင့် ဝန်ဆောင်မှုပေးသူထံသို့ ဘွတ်ကင်တင်ရန် တောင်းဆိုချက် (Booking Request) ကို တိုက်ရိုက်ပေးပို့နိုင်ပါသည်။

၄။ မတူညီတဲ့ Vendor (ဝန်ဆောင်မှုပေးသူ) တွေ ဒါမှမဟုတ် Package တွေကို နှိုင်းယှဉ်လို့ရသလား?
ရပါသည်။ EverAfter တွင် ဝန်ဆောင်မှုပေးသူအများအပြားကို ကြည့်ရှုနိုင်ပြီး ဆုံးဖြတ်ချက်မချမီ ၎င်းတို့၏ Package များ၊ ဈေးနှုန်းများနှင့် ဝန်ဆောင်မှုများကို နှိုင်းယှဉ်ကြည့်ရှုနိုင်သည်။

၅။ EverAfter ကို အသုံးပြုခ ပေးရသလား?
မပေးရပါ။ EverAfter တွင် ဝန်ဆောင်မှုများနှင့် Package များကို ရှာဖွေကြည့်ရှုခြင်းသည် အသုံးပြုသူများအတွက် လုံးဝ အခမဲ့ ဖြစ်ပါသည်။

၆။ ဝန်ဆောင်မှုပေးသူ (Vendors) တွေအနေနဲ့ EverAfter မှာ ဘယ်လိုပါဝင်နိုင်သလဲ?
မင်္ဂလာဆောင်ဝတ်စုံဆိုင်များ၊ အခမ်းအနားကျင်းပသည့်နေရာများ၊ ဆေးခန်းများနှင့် ခရီးသွားလုပ်ငန်းများအနေဖြင့် EverAfter တွင် မှတ်ပုံတင်ပြီး ၎င်းတို့၏ ဝန်ဆောင်မှုများကို စာရင်းသွင်းကာ ဖောက်သည်များထံသို့ ချိတ်ဆက်နိုင်ပါသည်။

၇။ မိမိစိတ်ကြိုက် ပွဲစီစဉ်မှု Package (Customized Package) ကို ပြုလုပ်လို့ရသလား?
အချို့သော ဝန်ဆောင်မှုပေးသူများသည် စိတ်ကြိုက်ပြင်ဆင်နိုင်သော Package များကို ပေးဆောင်ပါသည်။ အသုံးပြုသူများသည် မိမိတို့ လိုအပ်ချက်များကို ဆွေးနွေးရန် App မှတစ်ဆင့် Vendor ထံသို့ တိုက်ရိုက်ဆက်သွယ်နိုင်ပါသည်။

၈။ EverAfter က ပွဲစီစဉ်ရာမှာ ဘယ်လိုကူညီပေးသလဲ?
EverAfter သည် လိုအပ်သော ဝန်ဆောင်မှုအားလုံးကို Platform တစ်ခုတည်းတွင် စုစည်းပေးထားခြင်းကြောင့် အချိန်ကုန်သက်သာစေပြီး မိမိ၏ပွဲအစီအစဉ်များကို လွယ်ကူစွာ စီမံခန့်ခွဲနိုင်ရန် ကူညီပေးပါသည်။

၉။ ကျွန်ုပ်၏ ကိုယ်ရေးအချက်အလက်များ လုံခြုံမှုရှိပါသလား?
ရှိပါသည်။ EverAfter သည် အသုံးပြုသူများ၏ ကိုယ်ရေးကိုယ်တာလုံခြုံမှုကို ဦးစားပေးပြီး သင့်အချက်အလက်များနှင့် ဘွတ်ကင်အသေးစိတ်များကို စနစ်တကျ လုံခြုံစွာ ကိုင်တွယ်ဆောင်ရွက်ပါသည်။

၁၀။ EverAfter က တခြားပွဲစီစဉ်တဲ့ Platform တွေနဲ့ ဘာကွာခြားသလဲ?
EverAfter သည် နေရာထိုင်ခင်း၊ အလှအပရေးရာ၊ ခရီးသွားလာရေးနှင့် ပွဲစီစဉ်မှု Package အားလုံးကို တစ်နေရာတည်းတွင် အလုံးစုံ ဝန်ဆောင်မှုပေးနိုင်သည့် ပြီးပြည့်စုံသော Ecosystem တစ်ခု ဖြစ်ခြင်းကြောင့် ကွာခြားပါသည်။

၁၁။ EverAfter ရှိ AI Wedding Planner ဆိုတာ ဘာလဲ?
AI Wedding Planner သည် မင်္ဂလာဆောင်မောင်နှံများကို တစ်ဆင့်ချင်းစီ စီစဉ်နိုင်အောင် ကူညီပေးသည့် စမတ်နည်းပညာသုံး အင်္ဂါရပ် တစ်ခုဖြစ်သည်။ ၎င်းသည် အသုံးပြုသူ၏ စိတ်ကြိုက်ရွေးချယ်မှု၊ တည်နေရာနှင့် ဘတ်ဂျက်အပေါ် မူတည်ပြီး သင့်တော်မည့်နေရာများ၊ ဝန်ဆောင်မှုများနှင့် အချိန်ဇယားများကို အကြံပြုပေးပါသည်။

၁၂။ AI Wedding Planner က အကြံပြုချက်တွေကို ဘယ်လိုပေးတာလဲ?
AI သည် သင်၏ ဘတ်ဂျက်၊ ပွဲအရွယ်အစား၊ နှစ်သက်သည့်ပုံစံနှင့် တည်နေရာစသည့် အချက်အလက်များကို ခွဲခြမ်းစိတ်ဖြာသည်။ ထို့နောက် EverAfter Platform ပေါ်ရှိ သင့်တော်မည့် Vendors များ၊ နေရာများနှင့် Package များကို အကြံပြုပေးပါသည်။

၁၃။ EverAfter ရှိ Budget Calculator ဆိုတာ ဘာလဲ?
Budget Calculator သည် အသုံးပြုသူများအတွက် ပွဲကုန်ကျစရိတ်များကို ခန့်မှန်းရန်နှင့် စီမံခန့်ခွဲရန် ကူညီပေးပါသည်။ ၎င်းသည် နေရာထိုင်ခင်း၊ ဝတ်စုံ၊ အပြင်အဆင်၊ ခရီးသွားလာရေးနှင့် အခြားမင်္ဂလာကုန်ကျစရိတ်များကို အလိုအလျောက် တွက်ချက်ပေးပါသည်။

၁၄။ Budget Calculator က သတ်မှတ်ဘတ်ဂျက်အတွင်းမှာ ရှိနေအောင် ကူညီပေးနိုင်သလား?
ကူညီပေးနိုင်ပါသည်။ အသုံးပြုသူများသည် မိမိတို့ အသုံးစပြုလိုသည့် အများဆုံးဘတ်ဂျက်ကို ထည့်သွင်းနိုင်ပြီး၊ စနစ်မှ ထိုဘတ်ဂျက်နှင့် ကိုက်ညီသော ဝန်ဆောင်မှုများနှင့် Vendors များကို အကြံပြုပေးမည်ဖြစ်သည်။ ထို့ကြောင့် ငွေကုန်ကြေးကျ မပိုစေဘဲ စနစ်တကျ စီစဉ်နိုင်မည်ဖြစ်ပါသည်။`

export function FAQsView({ goBack }: FAQsViewProps) {
  const [language, setLanguage] = useState<FAQLanguage>('en')

  const title = language === 'en' ? 'EverAfter Mini App - FAQs' : 'EverAfter Mini App - အမေးများသော မေးခွန်းများ (FAQs)'
  const body = language === 'en' ? englishFAQBody : myanmarFAQBody

  return (
    <motion.main
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="mx-auto min-h-screen max-w-[480px] overflow-x-hidden px-4 pb-8 pt-4"
    >
      <header className="relative rounded-2xl bg-gradient-to-r from-[#0D5CAB] to-[#1A73D9] px-4 pb-6 pt-4 text-white shadow-[0_10px_26px_rgba(13,92,171,0.28)]">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="absolute right-4 top-4 inline-flex overflow-hidden rounded-full bg-white/20 p-1">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${language === 'en' ? 'bg-white text-[#0D5CAB]' : 'text-white'}`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage('mm')}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${language === 'mm' ? 'bg-white text-[#0D5CAB]' : 'text-white'}`}
          >
            MM
          </button>
        </div>

        <h1 className="mt-4 text-base font-semibold">FAQs</h1>
      </header>

      <section className="mt-4 max-w-full overflow-hidden rounded-2xl bg-white p-4 shadow-[0_10px_24px_rgba(13,92,171,0.1)]">
        <h2 className="text-sm font-semibold leading-6 text-slate-900">{title}</h2>
        <pre className="mt-4 max-w-full whitespace-pre-wrap break-words font-sans text-sm leading-7 text-slate-700">{body}</pre>
      </section>
    </motion.main>
  )
}
