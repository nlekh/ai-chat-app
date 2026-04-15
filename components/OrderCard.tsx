'use client'

import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'
import { TOOL_STATES, CARD_VARIANT_STYLES, CARD_VARIANT_PENDING } from '@/lib/constants'
import type { CardVariant } from '@/lib/constants'
import type { OrderFoodParams, ToolApprovalResult } from '@/lib/tools'

interface OrderCardProps {
  toolCallId: string
  state: string
  input: OrderFoodParams
  output?: ToolApprovalResult
  onApprove: (toolCallId: string) => void
  onReject: (toolCallId: string) => void
}

const TITLES: Record<CardVariant, string> = {
  pending: 'Confirm Order?',
  approved: 'Order Placed',
  rejected: 'Order Cancelled',
}

const FoodIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2" />
    <path d="M6 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6h3a2 2 0 0 0 2-2z" />
    <path d="M16 22v-7" />
  </svg>
)

function getVariant(state: string, output?: ToolApprovalResult): CardVariant {
  if (state === TOOL_STATES.INPUT_AVAILABLE || state === TOOL_STATES.INPUT_STREAMING)
    return 'pending'
  if (state === TOOL_STATES.OUTPUT_AVAILABLE && output?.approved) return 'approved'
  return 'rejected'
}

export function OrderCard({
  toolCallId,
  state,
  input,
  output,
  onApprove,
  onReject,
}: OrderCardProps) {
  const variant = getVariant(state, output)
  const style = CARD_VARIANT_STYLES[variant]
  const isPending = variant === CARD_VARIANT_PENDING
  const items = input.items ?? []
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Card
      shadow="sm"
      className={`my-3 max-w-sm overflow-hidden rounded-2xl border-2 p-0 ${style.card}`}
    >
      <CardHeader className="flex items-center gap-2.5 bg-white/60 px-4 pt-3 pb-1">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
          <FoodIcon />
        </div>
        <p className="flex-1 text-sm font-semibold text-zinc-800">{TITLES[variant]}</p>
        <Chip size="sm" variant="flat" color={style.chipColor} className="text-xs font-semibold">
          {style.chip}
        </Chip>
      </CardHeader>

      <CardBody className="gap-1 px-4 py-3">
        {input.restaurant && (
          <p className="text-sm font-semibold text-zinc-800">{input.restaurant}</p>
        )}

        {items.length > 0 && (
          <div className="mt-1 space-y-0.5">
            {items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm text-zinc-600">
                <span>
                  {item.quantity ?? 1}x {item.name ?? '...'}
                </span>
                <span className="text-zinc-400">
                  ${((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-1.5 flex justify-between border-t border-zinc-200/80 pt-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total</span>
            <span className="text-sm font-bold text-zinc-800">${total.toFixed(2)}</span>
          </div>
        )}

        {input.deliveryTime && (
          <div className="flex justify-between text-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Delivery
            </span>
            <span className="text-zinc-600">{input.deliveryTime}</span>
          </div>
        )}

        {output?.message && <p className="mt-2 text-xs italic text-zinc-500">{output.message}</p>}
      </CardBody>

      {isPending && (
        <CardFooter className={`gap-2 border-t bg-white/40 px-4 py-2.5 ${style.footer}`}>
          <Button
            size="sm"
            onPress={() => onApprove(toolCallId)}
            className="rounded-lg bg-emerald-500 px-5 font-semibold text-white shadow-sm hover:bg-emerald-600"
          >
            Place Order
          </Button>
          <Button
            size="sm"
            onPress={() => onReject(toolCallId)}
            className="rounded-lg bg-red-100 px-5 font-semibold text-red-600 hover:bg-red-200"
          >
            Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
