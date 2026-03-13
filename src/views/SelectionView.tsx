import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Check, Heart, LoaderCircle, ChevronRight, X } from 'lucide-react'
import { useState } from 'react'
import type { Package } from '../types/catalog'

type SelectedPackage = Package & { selected: boolean }
type PaymentStep = 'idle' | 'method' | 'pin' | 'success'

type SelectionViewProps = {
  goBack: () => void
  selectedPackages: SelectedPackage[]
  toggleSelectedPackage: (id: string) => void
  isRecalculating: boolean
  hasCalculated: boolean
  grandTotal: number
  formatMMK: (value: number) => string
  formatMMKDecimal: (value: number) => string
  handleCalculate: () => void
  openTermsAndConditions: () => void
  acceptedTerms: boolean
  setAcceptedTerms: (value: boolean) => void
  agreeTermsAndContinue: () => void
  paymentStep: PaymentStep
  closePaymentFlow: () => void
  proceedToPin: () => void
  pinCode: string
  onPinKeyPress: (value: string) => void
  transactionTime: string
  transactionNo: string
  goHomeAfterPayment: () => void
}

export function SelectionView({
  goBack,
  selectedPackages,
  toggleSelectedPackage,
  isRecalculating,
  hasCalculated,
  grandTotal,
  formatMMK,
  formatMMKDecimal,
  handleCalculate,
  openTermsAndConditions,
  acceptedTerms,
  setAcceptedTerms,
  agreeTermsAndContinue,
  paymentStep,
  closePaymentFlow,
  proceedToPin,
  pinCode,
  onPinKeyPress,
  transactionTime,
  transactionNo,
  goHomeAfterPayment,
}: SelectionViewProps) {
  const [isTermsSheetOpen, setIsTermsSheetOpen] = useState(false)

  const purchaseDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date())

  if (paymentStep === 'success') {
    return (
      <main className="mx-auto flex min-h-screen max-w-[480px] flex-col bg-white px-5 pb-7 pt-5">
        <h1 className="text-3xl font-bold text-slate-900">EverAfter</h1>
        <p className="mt-5 text-sm font-semibold text-slate-800">Transaction Details</p>

        <div className="mt-14 text-center">
          <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#0D5CAB] text-white">
            <Check size={38} />
          </div>
          <p className="mt-4 text-base font-medium text-slate-700">Payment Successful</p>
          <p className="mt-1 text-[44px] font-semibold leading-none text-slate-900">
            -{formatMMKDecimal(grandTotal)} <span className="ml-1 text-base font-medium text-slate-500">Ks</span>
          </p>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-xs">
          {[
            ['Transaction Time', transactionTime],
            ['Transaction No.', transactionNo],
            ['Transaction Type', 'Online Payment'],
            ['Transfer To', '7010092872618 - 91817628 EverAfter'],
            ['Amount', `-${formatMMKDecimal(grandTotal)} Ks`],
            ['Service Fee', '0.00 Ks'],
            ['Total Amount', `-${formatMMKDecimal(grandTotal)} Ks`],
          ].map(([label, value]) => (
            <div key={label} className="mb-2 flex items-center justify-between gap-4 text-slate-500">
              <span>{label}</span>
              <span className="max-w-[57%] text-right font-medium text-slate-800">{value}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={goHomeAfterPayment}
          className="mt-auto inline-flex h-11 w-full items-center justify-center rounded-md bg-[#0D5CAB] text-sm font-semibold text-white"
        >
          Go to Home
        </button>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-[480px] pb-40">
      <header className="bg-[#0D5CAB] px-4 pb-4 pt-4 text-white shadow-[0_10px_26px_rgba(13,92,171,0.35)]">
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={goBack}
            className="absolute left-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20"
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">Reservation Review to Pay</h1>
        </div>
      </header>

      <section className="space-y-3 px-4 pt-4">
        {selectedPackages.length === 0 ? (
          <div className="rounded-2xl bg-white px-5 py-10 text-center shadow-sm">
            <div className="mx-auto mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#fbe8ee] text-[#D72638]">
              <Heart size={30} className="fill-[#D72638]/20" />
            </div>
            <p className="text-sm font-medium text-slate-700">Your dream wedding starts with a selection! Go back to explore packages.</p>
          </div>
        ) : (
          <AnimatePresence>
            {selectedPackages.map((item) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -120 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`rounded-2xl bg-white p-4 shadow-sm ${item.selected ? 'opacity-100' : 'opacity-50'}`}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleSelectedPackage(item.id)}
                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 transition ${
                      item.selected ? 'border-[#0D5CAB] bg-[#0D5CAB] text-white' : 'border-slate-300 bg-white text-transparent'
                    }`}
                    aria-label={item.selected ? 'Deselect package' : 'Select package'}
                  >
                    <Check size={16} />
                  </button>

                  <div className="relative h-14 w-14 overflow-hidden rounded-xl"><img src={item.heroImages[0]} alt={item.title} className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-950/25 to-transparent" /></div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-slate-900">{item.title}</h3>
                    <p className="truncate text-xs text-slate-600">{item.vendorName}</p>
                    {!item.selected && <p className="mt-0.5 text-xs font-medium text-[#FF0000]">Deselected</p>}
                  </div>

                  <p className="text-sm font-bold text-[#0D5CAB]">{formatMMK(item.priceMMK)} MMK</p>
                </div>

                {isRecalculating && (
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                      className="h-full w-1/2 bg-[#0D5CAB]/70"
                    />
                  </div>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        )}

        {hasCalculated && selectedPackages.length > 0 && (
          <article className="rounded-3xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Reservation Review</h2>
            <div className="mt-3 space-y-1 text-xs text-slate-500">
              <p className="flex items-center justify-between">
                <span>Reservation by</span>
                <span className="font-medium text-slate-900">Ko Maung</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Phone Number</span>
                <span className="font-medium text-slate-900">09782312316</span>
              </p>
              <p className="flex items-center justify-between">
                <span>Purchase Date</span>
                <span className="font-medium text-slate-900">{purchaseDate}</span>
              </p>
            </div>
            <div className="mt-4 border-t border-slate-100 pt-3">
              <p className="flex items-center justify-between text-sm font-semibold text-slate-900">
                <span>Total</span>
                <span>{formatMMK(grandTotal)} MMK</span>
              </p>
            </div>
          </article>
        )}
      </section>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-slate-100 bg-white/95 p-4 backdrop-blur-sm">
        {hasCalculated && selectedPackages.length > 0 && (
          <div className="mb-3 flex items-center justify-between rounded-2xl bg-[#E8F1FB] px-4 py-3">
            <p className="text-sm font-medium text-slate-700">Grand Total</p>
            <p className="text-lg font-bold text-[#0D5CAB]">{formatMMK(grandTotal)} MMK</p>
          </div>
        )}

        {hasCalculated && selectedPackages.length > 0 ? (
          <button
            type="button"
            onClick={() => setIsTermsSheetOpen(true)}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0D5CAB] text-sm font-semibold text-white"
          >
            Confirm & Pay
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCalculate}
            disabled={isRecalculating}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0D5CAB] text-sm font-semibold text-white disabled:opacity-80"
          >
            {isRecalculating ? (
              <>
                <LoaderCircle size={16} className="animate-spin" /> Recalculating...
              </>
            ) : (
              'Calculate'
            )}
          </button>
        )}
      </div>

      <AnimatePresence>
        {isTermsSheetOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] flex items-end bg-slate-900/45 p-4"
            onClick={() => setIsTermsSheetOpen(false)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full rounded-3xl bg-white p-5"
              onClick={(event) => event.stopPropagation()}
            >
              <h3 className="text-base font-semibold text-slate-900">Terms & Conditions</h3>
              <p className="mt-2 text-sm text-slate-600">
                Please review the{' '}
                <button
                  type="button"
                  onClick={openTermsAndConditions}
                  className="font-medium text-[#0D5CAB] underline underline-offset-2"
                >
                  Terms & Conditions
                </button>{' '}
                before payment.
              </p>
              <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#0D5CAB] focus:ring-[#0D5CAB]"
                />
                <span>I agree to the Terms & Conditions</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsTermsSheetOpen(false)
                  agreeTermsAndContinue()
                }}
                disabled={!acceptedTerms}
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#0D5CAB] text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Confirm & Pay
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {paymentStep === 'method' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[66] flex items-center justify-center bg-slate-900/40 p-4"
            onClick={closePaymentFlow}
          >
            <motion.div
              initial={{ y: 22, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 22, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-[420px] rounded-2xl bg-[#F4F4F7] p-4"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={closePaymentFlow}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500"
                  aria-label="Close payment"
                >
                  <X size={18} />
                </button>
                <button type="button" className="text-sm font-semibold text-[#0D5CAB]">
                  Use Face ID
                </button>
              </div>

              <p className="text-center text-[15px] text-slate-700">Pay for EverAfter</p>
              <p className="mt-1 text-center text-[42px] font-semibold leading-none text-slate-900">
                {formatMMKDecimal(grandTotal)} <span className="ml-1 text-base font-medium text-slate-500">Ks</span>
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-white px-3 py-3 text-sm text-slate-600">
                  <span className="text-slate-500">Payment Method</span>
                  <span className="flex items-center gap-1 font-medium text-slate-900">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#0D5CAB]" />
                    Balance <ChevronRight size={14} />
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={proceedToPin}
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-[#0D5CAB] text-sm font-semibold text-white"
              >
                Pay for EverAfter
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {paymentStep === 'pin' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[67] bg-slate-900/45"
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="mx-auto mt-[18vh] w-[92%] max-w-[440px] rounded-2xl bg-white p-4"
            >
              <div className="mb-1 flex items-center justify-between">
                <button
                  type="button"
                  onClick={closePaymentFlow}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500"
                  aria-label="Close PIN modal"
                >
                  <X size={18} />
                </button>
                <p className="pr-2 text-sm text-slate-700">Enter PIN</p>
                <span className="h-8 w-8" />
              </div>
              <p className="mt-3 text-center text-sm text-slate-700">Pay for EverAfter</p>
              <p className="mt-1 text-center text-[42px] font-semibold leading-none text-slate-900">
                {formatMMKDecimal(grandTotal)} <span className="ml-1 text-base font-medium text-slate-500">Ks</span>
              </p>
              <div className="mt-6 flex items-center justify-center gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <span key={index} className="flex h-6 w-7 items-center justify-center rounded-sm border border-slate-200 bg-slate-100">
                    {index < pinCode.length && <span className="h-2.5 w-2.5 rounded-full bg-[#0D5CAB]" />}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="fixed bottom-0 left-1/2 grid w-full max-w-[480px] -translate-x-1/2 grid-cols-3 bg-white text-4xl font-normal text-slate-800">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => onPinKeyPress(String(digit))}
                  className="h-[54px] border border-slate-100"
                >
                  {digit}
                </button>
              ))}
              <div className="h-[54px] border border-slate-100 bg-slate-50" />
              <button type="button" onClick={() => onPinKeyPress('0')} className="h-[54px] border border-slate-100">
                0
              </button>
              <button
                type="button"
                onClick={() => onPinKeyPress('backspace')}
                className="h-[54px] border border-slate-100 text-sm font-medium text-slate-500"
              >
                Del
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
