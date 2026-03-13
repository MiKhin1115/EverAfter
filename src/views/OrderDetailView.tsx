import { ArrowLeft } from 'lucide-react'
import { ChecklistGroup } from '../components/ui/ChecklistGroup'
import { SectionCard } from '../components/ui/SectionCard'

type OrderStatus = 'Paid' | 'Pending' | 'Failed'

type OrderItem = {
  id: string
  productName: string
  vendorName: string
  totalMMK: number
  status: OrderStatus
  bookingDate: string
  options: string[]
  category: string
  location?: string
  duration?: string
  paymentRef: string
  paymentDate: string
}

type OrderDetailViewProps = {
  selectedOrder: OrderItem | null
  goBack: () => void
  goHome: () => void
  formatMMK: (value: number) => string
}

export function OrderDetailView({ selectedOrder, goBack, goHome, formatMMK }: OrderDetailViewProps) {
  if (!selectedOrder) {
    return (
      <main className="mx-auto max-w-[480px] pb-24 font-poppins">
        <header className="rounded-b-[32px] bg-white px-4 pb-4 pt-5 shadow-[0_12px_26px_rgba(13,92,171,0.12)]">
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={goBack}
              className="absolute left-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0D5CAB] shadow-sm"
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold text-slate-900">Order Detail</h1>
          </div>
        </header>
        <section className="px-4 pt-6">
          <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-600 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
            No order selected.
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-[480px] pb-24 font-poppins">
      <header className="rounded-b-[32px] bg-white px-4 pb-4 pt-5 shadow-[0_12px_26px_rgba(13,92,171,0.12)]">
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={goBack}
            className="absolute left-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0D5CAB] shadow-sm"
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold text-slate-900">Order Detail</h1>
        </div>
        <p className="mt-2 text-center text-xs text-[#6B7A90]">Order ID: {selectedOrder.id}</p>
      </header>

      <section className="space-y-4 px-4 pt-6">
        <SectionCard className="rounded-2xl bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">Order Summary</h2>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-[#6B7A90]">Product</span>
              <span className="font-medium text-slate-900">{selectedOrder.productName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6B7A90]">Vendor</span>
              <span className="font-medium text-slate-900">{selectedOrder.vendorName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6B7A90]">Booking Date</span>
              <span className="font-medium text-slate-900">{selectedOrder.bookingDate}</span>
            </div>
            <div>
              <span className="text-[#6B7A90]">Selected options</span>
              <ChecklistGroup
                items={selectedOrder.options}
                listClassName="mt-2 space-y-1 text-sm text-slate-700"
                itemClassName="flex items-center gap-2"
                iconClassName="text-[#0D5CAB]"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard className="rounded-2xl bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">Payment Information</h2>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-[#6B7A90]">Amount paid</span>
              <span className="font-semibold text-[#0D5CAB]">
                {formatMMK(selectedOrder.totalMMK)} <span className="text-[10px] font-semibold text-[#0D5CAB]/60">MMK</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6B7A90]">KBZPay reference</span>
              <span className="font-medium text-slate-900">{selectedOrder.paymentRef}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6B7A90]">Payment date</span>
              <span className="font-medium text-slate-900">{selectedOrder.paymentDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6B7A90]">Status</span>
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                  selectedOrder.status === 'Paid'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : selectedOrder.status === 'Pending'
                      ? 'border-amber-200 bg-amber-50 text-amber-700'
                      : 'border-rose-200 bg-rose-50 text-rose-700'
                }`}
              >
                {selectedOrder.status === 'Paid' ? 'Success' : selectedOrder.status}
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard className="rounded-2xl bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#0D5CAB]">Service Details</h2>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-[#6B7A90]">Category</span>
              <span className="font-medium text-slate-900">{selectedOrder.category}</span>
            </div>
            {selectedOrder.location && (
              <div className="flex items-center justify-between">
                <span className="text-[#6B7A90]">Location</span>
                <span className="font-medium text-slate-900">{selectedOrder.location}</span>
              </div>
            )}
            {selectedOrder.duration && (
              <div className="flex items-center justify-between">
                <span className="text-[#6B7A90]">Duration</span>
                <span className="font-medium text-slate-900">{selectedOrder.duration}</span>
              </div>
            )}
          </div>
        </SectionCard>

        <div className="grid gap-3 pt-2">
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#CFE3FA] bg-white text-sm font-semibold text-[#0D5CAB] shadow-[0_8px_16px_rgba(13,92,171,0.12)]"
          >
            Contact Vendor
          </button>
          <button
            type="button"
            onClick={goHome}
            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#0D5CAB] to-[#1A73D9] text-sm font-semibold text-white shadow-[0_12px_24px_rgba(13,92,171,0.28)]"
          >
            Back to Home
          </button>
        </div>
      </section>
    </main>
  )
}
