type ToastProps = {
  open: boolean
  message: string
}

export function Toast({ open, message }: ToastProps) {
  if (!open) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[80] flex justify-center px-4">
      <div className="rounded-2xl border border-[#CFE3FA] bg-white px-4 py-3 text-sm font-medium text-[#0D5CAB] shadow-[0_12px_24px_rgba(13,92,171,0.18)]">
        {message}
      </div>
    </div>
  )
}
