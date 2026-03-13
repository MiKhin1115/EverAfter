import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

type TermsLanguage = 'en' | 'mm'

type TermsAndConditionsViewProps = {
  goBack: () => void
}

const englishTermsBody = `These Terms and Conditions are made for the users (“You”, “Your”, “User”) who use the EverAfter Mini App (“Mini App”) available through the KBZPay App. By accessing or using EverAfter Mini App, you agree that you have read, understood, and accepted these Terms and Conditions. If you do not agree with any part of these Terms and Conditions, you should stop using the Mini App.
EverAfter Mini App is a platform that helps users explore event-related services such as wedding packages, venues, beauty services, travel packages, family care packages, and other related services offered by merchants or service providers through the Mini App.

1. DEFINITION
1.1. “Business Day” means a day other than Saturday, Sunday, public holiday, or bank holiday in Myanmar.
1.2. “Mini App” means the EverAfter Mini App made available through KBZPay.
1.3. “Merchant” or “Service Provider” means the business, vendor, clinic, travel agency, venue, or other provider offering services or packages through EverAfter Mini App.
1.4. “Services” means any products, packages, bookings, consultations, or related offerings available on EverAfter Mini App.
1.5. “User” means any person accessing or using the Mini App.
1.6. “Service Fee” means the fees, charges, or prices shown for packages, bookings, or services in the Mini App.
1.7. “Refund” means any full or partial amount returned to the User according to the refund policy of the relevant service or merchant.

2. USE OF EVERAFTER MINI APP
2.1. Users must ensure that their mobile device, software, and internet connection are suitable for using the Mini App.
2.2. Users under the age of 18 should use the Mini App only with the consent of a parent or legal guardian.
2.3. Users shall not use the Mini App for any unlawful, fraudulent, or unauthorized purpose.
2.4. Users are responsible for providing accurate and complete information when making inquiries, bookings, or payments.
2.5. EverAfter may update, modify, suspend, or remove any feature, service, or content of the Mini App at any time without prior notice.

3. SERVICES AND BOOKINGS
3.1. EverAfter allows Users to browse and select packages, services, and vendors available in the Mini App.
3.2. All bookings, package requests, and service selections are subject to availability and confirmation by the relevant merchant or service provider.
3.3. Prices, package details, and service descriptions shown in the Mini App may change from time to time.
3.4. EverAfter will make reasonable efforts to display accurate information, but does not guarantee that all descriptions, prices, or package details are completely error-free or always up to date.
3.5. Users are responsible for reviewing package details carefully before confirming any booking or payment.
3.6. If the User enters incorrect information, including name, phone number, date, time, event details, or booking details, EverAfter and KBZPay shall not be liable for any resulting issue or loss.

4. PAYMENTS, CANCELLATIONS, AND REFUNDS
4.1. Payment for selected services may be made through KBZPay or other available payment methods shown in the Mini App.
4.2. Users must have sufficient balance or a valid payment method before completing any payment.
4.3. Cancellation and refund eligibility may depend on the type of service, package, or merchant policy.
4.4. If a booking is canceled by the User, refund eligibility, if any, will be determined according to the relevant merchant’s cancellation policy.
4.5. EverAfter and KBZPay are not responsible for refund delays caused by third-party merchants, payment providers, or circumstances beyond reasonable control.
4.6. If there is any payment error or booking issue, the User should contact the support team through the contact details provided in the Mini App.

5. USER RESPONSIBILITIES
5.1. The User agrees to use the Mini App only for personal and lawful purposes.
5.2. The User shall not misuse the platform, attempt unauthorized access, interfere with system operations, or use bots, scripts, or automated tools to disrupt the Mini App.
5.3. The User shall not upload, post, or share any false, harmful, offensive, unlawful, or misleading content through the Mini App.
5.4. The User is solely responsible for the accuracy of any information submitted through the Mini App.
5.5. The User agrees not to copy, reproduce, resell, or commercially exploit any content, images, branding, or materials from EverAfter Mini App without prior written permission.

6. CHATBOT AND TOOLS
6.1. EverAfter may provide features such as a chatbot, budget calculator, package suggestions, or other planning tools for user convenience.
6.2. These tools are provided for general guidance only and do not constitute professional, legal, medical, or financial advice.
6.3. The chatbot in EverAfter is intended to help users navigate the app and access service information. It does not make guaranteed decisions or provide professional event planning advice.
6.4. Budget estimates shown in the Mini App are for reference only and actual costs may vary depending on final bookings, vendor terms, and service availability.

7. PRIVACY AND DATA
7.1. By using the Mini App, the User agrees that EverAfter, KBZPay, and relevant service providers may collect, use, store, and share necessary information for the purpose of providing services, processing bookings, handling payments, and customer support.
7.2. The User agrees that notifications, confirmations, promotions, and service-related messages may be sent through the Mini App, SMS, phone, or email.
7.3. EverAfter will take reasonable steps to protect User information, but cannot guarantee complete security of data transmitted through the internet or mobile networks.

8. INTELLECTUAL PROPERTY
8.1. All logos, names, designs, text, graphics, content, and other materials in EverAfter Mini App are protected by intellectual property rights owned by EverAfter, KBZPay, or relevant third parties.
8.2. Users must not use, copy, reproduce, modify, or distribute any content from the Mini App without prior written consent from the rightful owner.

9. LIMITATION OF LIABILITY
9.1. EverAfter Mini App is provided on an “as is” and “as available” basis.
9.2. EverAfter and KBZPay do not guarantee uninterrupted access, error-free operation, or that the Mini App will always be free from technical issues, delays, or viruses.
9.3. EverAfter and KBZPay shall not be liable for any direct or indirect loss, damage, delay, dissatisfaction, cancellation, service issue, or dispute arising from the services provided by merchants or service providers listed in the Mini App.
9.4. Any dispute relating to the quality, timing, performance, or delivery of a merchant’s service should be addressed directly with the relevant merchant or service provider.

10. TERMINATION OR SUSPENSION
10.1. EverAfter or KBZPay may suspend, restrict, or terminate access to the Mini App at any time without prior notice if the User violates these Terms and Conditions or if required for security, maintenance, or legal reasons.
10.2. The User may stop using the Mini App at any time.

11. AMENDMENT
11.1. EverAfter reserves the right to amend, modify, or update these Terms and Conditions at any time.
11.2. Continued use of the Mini App after such updates means the User accepts the revised Terms and Conditions.

12. GOVERNING LAW
These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of the Union of Myanmar. Any dispute arising from these Terms and Conditions shall be subject to the jurisdiction of the courts in Myanmar.

13. CONTACT
If you have any questions, complaints, or need support regarding EverAfter Mini App, please contact:
EverAfter Mini App Support
Hotline: 09 444 555 666
Email: everafter@gmail.com`

const myanmarTermsBody = `ဤ Terms and Conditions များသည် KBZPay App မှတဆင့် အသုံးပြုနိုင်သော EverAfter Mini App (“Mini App”) ကို အသုံးပြုသည့် အသုံးပြုသူများ (“You”, “Your”, “User”) အတွက် သတ်မှတ်ထားခြင်းဖြစ်ပါသည်။ EverAfter Mini App ကို ဝင်ရောက်အသုံးပြုခြင်း သို့မဟုတ် အသုံးပြုခြင်းအားဖြင့် သင်သည် ဤစည်းကမ်းချက်များနှင့် သတ်မှတ်ချက်များကို ဖတ်ရှုပြီး၊ နားလည်ပြီး၊ သဘောတူလက်ခံကြောင်း အတည်ပြုသည့် အဓိပ္ပါယ်ရှိပါသည်။ ဤစည်းကမ်းချက်များနှင့် သတ်မှတ်ချက်များ၏ မည်သည့်အစိတ်အပိုင်းကိုမဆို သင်မသဘောတူပါက Mini App ကို အသုံးပြုခြင်းကို ရပ်ဆိုင်းရပါမည်။
EverAfter Mini App သည် event-related services များဖြစ်သော wedding packages, venues, beauty services, travel packages, family care packages နှင့် အခြားဆက်စပ်သော services များကို merchants သို့မဟုတ် service providers များမှတဆင့် အသုံးပြုသူများ ရှာဖွေကြည့်ရှုနိုင်ရန် ကူညီပေးသော platform တစ်ခုဖြစ်ပါသည်။

၁။ အဓိပ္ပါယ်ဖွင့်ဆိုချက်များ
1.1. “Business Day” ဆိုသည်မှာ မြန်မာနိုင်ငံအတွင်းရှိ စနေနေ့၊ တနင်္ဂနွေနေ့၊ အများပြည်သူရုံးပိတ်ရက် သို့မဟုတ် bank holiday မဟုတ်သော နေ့ရက်ကို ဆိုလိုပါသည်။
1.2. “Mini App” ဆိုသည်မှာ KBZPay မှတဆင့် အသုံးပြုနိုင်သော EverAfter Mini App ကို ဆိုလိုပါသည်။
1.3. “Merchant” သို့မဟုတ် “Service Provider” ဆိုသည်မှာ EverAfter Mini App တွင် services သို့မဟုတ် packages များကို ပေးအပ်ထားသော business, vendor, clinic, travel agency, venue သို့မဟုတ် အခြား service provider များကို ဆိုလိုပါသည်။
1.4. “Services” ဆိုသည်မှာ EverAfter Mini App တွင် ရရှိနိုင်သော products, packages, bookings, consultations သို့မဟုတ် ဆက်စပ်သော offerings များကို ဆိုလိုပါသည်။
1.5. “User” ဆိုသည်မှာ Mini App ကို ဝင်ရောက်အသုံးပြုသူ မည်သူမဆိုကို ဆိုလိုပါသည်။
1.6. “Service Fee” ဆိုသည်မှာ Mini App တွင် ဖော်ပြထားသော packages, bookings သို့မဟုတ် services များအတွက် fees, charges, သို့မဟုတ် prices များကို ဆိုလိုပါသည်။
1.7. “Refund” ဆိုသည်မှာ သက်ဆိုင်ရာ service သို့မဟုတ် merchant ၏ refund policy အရ User ထံ ပြန်လည်ပေးအပ်သော ငွေပမာဏ အပြည့်အစုံ သို့မဟုတ် တစ်စိတ်တစ်ပိုင်းကို ဆိုလိုပါသည်။

၂။ EVERAFTER MINI APP အသုံးပြုခြင်း
2.1. အသုံးပြုသူများသည် Mini App ကို အသုံးပြုရန် မိမိတို့၏ mobile device, software နှင့် internet connection တို့သည် သင့်လျော်ပြီး အသုံးပြုနိုင်သော အခြေအနေတွင်ရှိကြောင်း သေချာစေရမည်။
2.2. အသက် ၁၈ နှစ်အောက် အသုံးပြုသူများသည် မိဘ သို့မဟုတ် တရားဝင်အုပ်ထိန်းသူ၏ ခွင့်ပြုချက်ဖြင့်သာ Mini App ကို အသုံးပြုသင့်ပါသည်။
2.3. အသုံးပြုသူများသည် Mini App ကို မည်သည့် unlawful, fraudulent, သို့မဟုတ် unauthorized purpose အတွက်မဆို အသုံးမပြုရပါ။
2.4. အသုံးပြုသူများသည် inquiry, booking, သို့မဟုတ် payment ပြုလုပ်ရာတွင် တိကျမှန်ကန်ပြီး ပြည့်စုံသော အချက်အလက်များကို ပေးရန် တာဝန်ရှိပါသည်။
2.5. EverAfter သည် Mini App ၏ feature, service, သို့မဟုတ် content များကို မည်သည့်အချိန်တွင်မဆို ကြိုတင်အသိပေးခြင်းမရှိဘဲ update, modify, suspend, သို့မဟုတ် remove ပြုလုပ်နိုင်ပါသည်။

၃။ SERVICES နှင့် BOOKINGS
3.1. EverAfter သည် အသုံးပြုသူများအား Mini App အတွင်း ရရှိနိုင်သော packages, services နှင့် vendors များကို ရှာဖွေကြည့်ရှုရွေးချယ်နိုင်ရန် ခွင့်ပြုပါသည်။
3.2. bookings, package requests နှင့် service selections အားလုံးသည် သက်ဆိုင်ရာ merchant သို့မဟုတ် service provider ၏ availability နှင့် confirmation ပေါ်မူတည်ပါသည်။
3.3. Mini App တွင် ဖော်ပြထားသော prices, package details နှင့် service descriptions များသည် အချိန်နှင့်အမျှ ပြောင်းလဲနိုင်ပါသည်။
3.4. EverAfter သည် တိကျမှန်ကန်သော အချက်အလက်များကို ဖော်ပြရန် သင့်တော်သောကြိုးပမ်းမှုများ ပြုလုပ်မည်ဖြစ်သော်လည်း descriptions, prices, သို့မဟုတ် package details များသည် အမှားလုံးဝမရှိကြောင်း သို့မဟုတ် အမြဲတမ်း updated ဖြစ်ကြောင်း အာမခံမပေးနိုင်ပါ။
3.5. အသုံးပြုသူများသည် booking သို့မဟုတ် payment မပြုလုပ်မီ package details များကို သေချာစွာ စစ်ဆေးရန် တာဝန်ရှိပါသည်။
3.6. User က name, phone number, date, time, event details, သို့မဟုတ် booking details စသည့် အချက်အလက်များကို မှားယွင်းစွာ ဖြည့်သွင်းပါက ထိုမှ ဖြစ်ပေါ်လာသော ပြဿနာ သို့မဟုတ် ဆုံးရှုံးမှုများအတွက် EverAfter နှင့် KBZPay တို့တွင် တာဝန်မရှိပါ။

၄။ PAYMENTS, CANCELLATIONS နှင့် REFUNDS
4.1. ရွေးချယ်ထားသော services များအတွက် payment ကို KBZPay သို့မဟုတ် Mini App တွင် ဖော်ပြထားသော အခြား available payment methods များမှတဆင့် ပြုလုပ်နိုင်ပါသည်။
4.2. အသုံးပြုသူများသည် payment completion မလုပ်မီ လုံလောက်သော balance သို့မဟုတ် valid payment method ရှိရပါမည်။
4.3. cancellation နှင့် refund ရရှိနိုင်မှုသည် service အမျိုးအစား၊ package အမျိုးအစား သို့မဟုတ် merchant policy ပေါ်မူတည်နိုင်ပါသည်။
4.4. booking ကို User ဘက်မှ cancel ပြုလုပ်ပါက refund ရနိုင်ခြင်းရှိ/မရှိကို သက်ဆိုင်ရာ merchant ၏ cancellation policy အရ သတ်မှတ်မည်ဖြစ်ပါသည်။
4.5. third-party merchants, payment providers, သို့မဟုတ် reasonable control အပြင်ဘက်ရှိ အခြေအနေများကြောင့် refund delay ဖြစ်ပါက EverAfter နှင့် KBZPay တို့တွင် တာဝန်မရှိပါ။
4.6. payment error သို့မဟုတ် booking issue တစ်စုံတစ်ရာ ဖြစ်ပေါ်ပါက User သည် Mini App တွင် ဖော်ပြထားသော contact details များမှတဆင့် support team ကို ဆက်သွယ်ရပါမည်။

၅။ USER ၏ တာဝန်များ
5.1. User သည် Mini App ကို personal နှင့် lawful purposes များအတွက်သာ အသုံးပြုရန် သဘောတူပါသည်။
5.2. User သည် platform ကို misuse မပြုရ၊ unauthorized access ရယူရန် မကြိုးစားရ၊ system operations ကို မနှောင့်ယှက်ရ၊ bots, scripts, သို့မဟုတ် automated tools များဖြင့် Mini App ကို မထိခိုက်စေရပါ။
5.3. User သည် false, harmful, offensive, unlawful, သို့မဟုတ် misleading content များကို Mini App မှတဆင့် upload, post, သို့မဟုတ် share မပြုရပါ။
5.4. Mini App ထဲသို့ submit ပြုလုပ်သော အချက်အလက်များ၏ မှန်ကန်မှုအတွက် User တစ်ဦးတည်းသာ တာဝန်ရှိပါသည်။
5.5. User သည် EverAfter Mini App မှ content, images, branding, သို့မဟုတ် materials များကို prior written permission မရှိဘဲ copy, reproduce, resell, သို့မဟုတ် commercially exploit မပြုလုပ်ရန် သဘောတူပါသည်။

၆။ CHATBOT နှင့် TOOLS
6.1. EverAfter သည် user convenience အတွက် chatbot, budget calculator, package suggestions, သို့မဟုတ် အခြား planning tools များကို ပံ့ပိုးပေးနိုင်ပါသည်။
6.2. ဤ tools များကို general guidance အတွက်သာ ပံ့ပိုးထားခြင်းဖြစ်ပြီး professional, legal, medical, သို့မဟုတ် financial advice အဖြစ် မသတ်မှတ်ပါ။
6.3. EverAfter တွင်ပါရှိသော chatbot သည် users များ app ကို လွယ်ကူစွာ အသုံးပြုနိုင်စေရန်နှင့် service information များ ရယူနိုင်စေရန် ကူညီပေးရန် ရည်ရွယ်ထားပါသည်။ ၎င်းသည် guaranteed decisions များ မပြုလုပ်သကဲ့သို့ professional event planning advice ကိုလည်း မပေးပါ။
6.4. Mini App တွင် ဖော်ပြထားသော budget estimates များသည် reference အတွက်သာ ဖြစ်ပြီး actual costs များမှာ final bookings, vendor terms, နှင့် service availability ပေါ်မူတည်၍ ကွာခြားနိုင်ပါသည်။

၇။ PRIVACY နှင့် DATA
7.1. Mini App ကို အသုံးပြုခြင်းအားဖြင့် User သည် EverAfter, KBZPay နှင့် သက်ဆိုင်ရာ service providers များအား services ပံ့ပိုးရန်, bookings process လုပ်ရန်, payments ကိုင်တွယ်ရန်, နှင့် customer support ပေးရန် လိုအပ်သော information များကို collect, use, store, နှင့် share ပြုလုပ်နိုင်ကြောင်း သဘောတူပါသည်။
7.2. User သည် notifications, confirmations, promotions, နှင့် service-related messages များကို Mini App, SMS, phone, သို့မဟုတ် email မှတဆင့် လက်ခံရရှိနိုင်ကြောင်း သဘောတူပါသည်။
7.3. EverAfter သည် User information ကို ကာကွယ်ရန် reasonable steps များယူမည်ဖြစ်သော်လည်း internet သို့မဟုတ် mobile networks မှတဆင့် ပေးပို့သော data များ၏ complete security ကို အာမခံမပေးနိုင်ပါ။

၈။ INTELLECTUAL PROPERTY
8.1. EverAfter Mini App အတွင်းရှိ logos, names, designs, text, graphics, content နှင့် အခြား materials များအားလုံးသည် EverAfter, KBZPay, သို့မဟုတ် သက်ဆိုင်ရာ third parties များပိုင်ဆိုင်သော intellectual property rights များဖြင့် ကာကွယ်ထားပါသည်။
8.2. User များသည် rightful owner ၏ prior written consent မရှိဘဲ Mini App မှ content များကို use, copy, reproduce, modify, သို့မဟုတ် distribute မပြုရပါ။

၉။ တာဝန်ယူမှု ကန့်သတ်ချက်
9.1. EverAfter Mini App ကို “as is” နှင့် “as available” အခြေအနေဖြင့် ပံ့ပိုးထားခြင်းဖြစ်ပါသည်။
9.2. EverAfter နှင့် KBZPay တို့သည် uninterrupted access, error-free operation, သို့မဟုတ် Mini App သည် technical issues, delays, သို့မဟုတ် viruses များကင်းစင်နေမည်ဟု အာမခံမပေးနိုင်ပါ။
9.3. EverAfter နှင့် KBZPay တို့သည် Mini App တွင် ဖော်ပြထားသော merchants သို့မဟုတ် service providers များမှ ပေးအပ်သော services များနှင့် ပတ်သက်၍ ဖြစ်ပေါ်လာသော direct or indirect loss, damage, delay, dissatisfaction, cancellation, service issue, သို့မဟုတ် dispute များအတွက် တာဝန်မရှိပါ။
9.4. merchant ၏ service quality, timing, performance, သို့မဟုတ် delivery နှင့်ဆိုင်သော dispute များအား သက်ဆိုင်ရာ merchant သို့မဟုတ် service provider နှင့် တိုက်ရိုက် ဖြေရှင်းရပါမည်။

၁၀။ TERMINATION သို့မဟုတ် SUSPENSION
10.1. User သည် ဤ Terms and Conditions များကို ချိုးဖောက်ပါက သို့မဟုတ် security, maintenance, သို့မဟုတ် legal reasons များကြောင့် လိုအပ်ပါက EverAfter သို့မဟုတ် KBZPay သည် User ၏ Mini App access ကို prior notice မပေးဘဲ suspend, restrict, သို့မဟုတ် terminate ပြုလုပ်နိုင်ပါသည်။
10.2. User သည် Mini App ကို မည်သည့်အချိန်တွင်မဆို အသုံးပြုခြင်း ရပ်ဆိုင်းနိုင်ပါသည်။

၁၁။ ပြင်ဆင်ခြင်း
11.1. EverAfter သည် ဤ Terms and Conditions များကို မည်သည့်အချိန်တွင်မဆို amend, modify, သို့မဟုတ် update ပြုလုပ်ပိုင်ခွင့်ရှိပါသည်။
11.2. ထိုသို့ update ပြုလုပ်ပြီးနောက် Mini App ကို ဆက်လက်အသုံးပြုခြင်းသည် revised Terms and Conditions ကို User က သဘောတူလက်ခံကြောင်း အဓိပ္ပါယ်ရပါသည်။

၁၂။ သက်ဆိုင်ရာဥပဒေ
ဤ Terms and Conditions များကို မြန်မာနိုင်ငံ၏ တည်ဆဲဥပဒေများနှင့်အညီ အဓိပ္ပါယ်ဖွင့်ဆိုကာ အုပ်ချုပ်မည်ဖြစ်ပါသည်။ ဤ Terms and Conditions မှ ဖြစ်ပေါ်လာသော dispute များအား မြန်မာနိုင်ငံရှိ တရားရုံးများ၏ စီရင်ပိုင်ခွင့်အောက်တွင် ဖြေရှင်းရမည်ဖြစ်ပါသည်။

၁၃။ ဆက်သွယ်ရန်
EverAfter Mini App နှင့် ပတ်သက်၍ မေးမြန်းလိုသည်များ၊ တိုင်ကြားလိုသည်များ သို့မဟုတ် support လိုအပ်ပါက အောက်ပါအတိုင်း ဆက်သွယ်နိုင်ပါသည်။
EverAfter Mini App Support
Hotline: ၀၉ ၄၄၄ ၅၅၅ ၆၆၆
Email: everafter@gmail.com`

export function TermsAndConditionsView({ goBack }: TermsAndConditionsViewProps) {
  const [language, setLanguage] = useState<TermsLanguage>('en')

  const title =
    language === 'en'
      ? 'EVERAFTER MINI APP TERMS AND CONDITIONS'
      : 'EVERAFTER MINI APP စည်းကမ်းချက်များနှင့် သတ်မှတ်ချက်များ'

  const body = language === 'en' ? englishTermsBody : myanmarTermsBody

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

        <h1 className="mt-4 text-base font-semibold">Terms and Conditions</h1>
      </header>

      <section className="mt-4 max-w-full overflow-hidden rounded-2xl bg-white p-4 shadow-[0_10px_24px_rgba(13,92,171,0.1)]">
        <h2 className="text-sm font-semibold leading-6 text-slate-900">{title}</h2>
        <pre className="mt-4 max-w-full whitespace-pre-wrap break-words font-sans text-sm leading-7 text-slate-700">{body}</pre>
      </section>
    </motion.main>
  )
}
