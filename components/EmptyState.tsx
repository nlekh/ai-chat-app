import { APP_NAME, APP_HINT } from '@/lib/constants'

const FoodIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2" />
    <path d="M6 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6h3a2 2 0 0 0 2-2z" />
    <path d="M16 22v-7" />
  </svg>
)

export function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
        <FoodIcon />
      </div>
      <div>
        <p className="text-base font-semibold text-zinc-700">{APP_NAME}</p>
        <p className="mt-1 text-sm text-zinc-400">Try: &ldquo;{APP_HINT}&rdquo;</p>
      </div>
    </div>
  )
}
