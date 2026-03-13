import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

type ShopPartnerLanguage = 'en' | 'mm'

type ShopPartnerViewProps = {
  goBack: () => void
}

const englishShopPartnerBody = `Join EverAfter as a verified vendor and showcase your wedding services to couples planning their special day. By becoming a shop partner, you can create your business profile, present your services, and reach customers who are actively searching for wedding-related solutions.

As a partner, you can manage your service listings, share pricing or packages, and connect with potential clients through the platform. EverAfter helps you increase your visibility and grow your business by making it easier for couples to discover and contact your services.

EverAfter Mini App Support
Hotline: 09 444 555 666
Email: everafter@gmail.com`

const myanmarShopPartnerBody = `EverAfter platform တွင် vendor အဖြစ် ပါဝင်ပြီး မင်္ဂလာပွဲစီစဉ်နေသော couples များထံသို့ သင့်ဝန်ဆောင်မှုများကို ပြသနိုင်ပါသည်။ Shop partner အဖြစ် မှတ်ပုံတင်ပြီးပါက သင့်လုပ်ငန်း profile ကို ဖန်တီးနိုင်ပြီး ဝန်ဆောင်မှုများကို ပြသကာ မင်္ဂလာပွဲနှင့်ဆိုင်သော ဝန်ဆောင်မှုများကို ရှာဖွေနေသော customers များနှင့် ချိတ်ဆက်နိုင်ပါသည်။

Partner အဖြစ် သင့် service listings များကို စီမံနိုင်ပြီး package များနှင့် စျေးနှုန်းအချက်အလက်များကို မျှဝေနိုင်ပါသည်။ EverAfter က couples များအတွက် သင့်ဝန်ဆောင်မှုကို ရှာဖွေတွေ့ရှိရန်နှင့် ဆက်သွယ်ရန် ပိုမိုလွယ်ကူစေပြီး သင့်လုပ်ငန်းကို ပိုမိုမြင်သာစေကာ တိုးတက်စေရန် ကူညီပေးပါသည်။

EverAfter Mini App Support
Hotline: ၀၉ ၄၄၄ ၅၅၅ ၆၆၆
Email: everafter@gmail.com`

export function ShopPartnerView({ goBack }: ShopPartnerViewProps) {
  const [language, setLanguage] = useState<ShopPartnerLanguage>('en')

  const title = language === 'en' ? 'Become a Shop Partner' : 'Shop Partner အဖြစ်ပါဝင်ရန်'
  const body = language === 'en' ? englishShopPartnerBody : myanmarShopPartnerBody

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

        <h1 className="mt-4 text-base font-semibold">Become a Shop Partner</h1>
      </header>

      <section className="mt-4 max-w-full overflow-hidden rounded-2xl bg-white p-4 shadow-[0_10px_24px_rgba(13,92,171,0.1)]">
        <h2 className="text-sm font-semibold leading-6 text-slate-900">{title}</h2>
        <pre className="mt-4 max-w-full whitespace-pre-wrap break-words font-sans text-sm leading-7 text-slate-700">{body}</pre>
      </section>
    </motion.main>
  )
}
