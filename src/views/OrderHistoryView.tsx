import { ArrowLeft } from 'lucide-react'

type OrderStatus = 'Paid' | 'Pending' | 'Failed'

type OrderItem = {
  id: string
  productName: string
  vendorName: string
  orderDate: string
  totalMMK: number
  status: OrderStatus
}

type OrderHistoryViewProps = {
  goBack: () => void
  orders: OrderItem[]
  orderStatusStyles: Record<OrderStatus, string>
  openOrderDetail: (order: OrderItem) => void
  formatMMK: (value: number) => string
}

export function OrderHistoryView({ goBack, orders, orderStatusStyles, openOrderDetail, formatMMK }: OrderHistoryViewProps) {
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
          <h1 className="text-xl font-semibold text-slate-900">Order History</h1>
        </div>
      </header>

      <section className="space-y-4 px-4 pt-6">
        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-600 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
            You have no orders yet.
          </div>
        ) : (
          orders.map((order) => (
            <article
              key={order.id}
              onClick={() => openOrderDetail(order)}
              className="cursor-pointer rounded-xl bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{order.productName}</h3>
                  <p className="mt-1 text-xs text-[#6B7A90]">{order.vendorName}</p>
                </div>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${orderStatusStyles[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#6B7A90]">
                <span>{order.orderDate}</span>
                <span className="text-sm font-semibold text-[#0D5CAB]">
                  {formatMMK(order.totalMMK)} <span className="text-[10px] font-semibold text-[#0D5CAB]/60">MMK</span>
                </span>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  )
}
