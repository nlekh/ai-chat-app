import { BOUNCE_DELAYS } from '@/lib/constants'

export function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-bl-sm bg-zinc-100 px-4 py-3">
        <div className="flex gap-1.5">
          {BOUNCE_DELAYS.map((delay) => (
            <span
              key={delay}
              className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
