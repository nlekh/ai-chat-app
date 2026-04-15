import type { ChatStatus } from 'ai'

// App
export const APP_NAME = 'Food Order Assistant'
export const APP_DESCRIPTION = 'Order food with review before placing'
export const APP_PLACEHOLDER = 'What would you like to order?'
export const APP_HINT = "Order 2 margherita pizzas and a tiramisu from Luigi's"

// API
export const CHAT_API = '/api/chat'
export const MODEL_ID = 'gpt-4o'
export const THROTTLE_MS = 100

// Tool
export const TOOL_NAME = 'orderFood' as const
export const TEXT_PART_TYPE = 'text' as const
export const TOOL_PART_TYPE = `tool-${TOOL_NAME}` as const

export const TOOL_DESCRIPTION =
  'Order food delivery from a restaurant. Use whenever the user wants to order food, lunch, dinner, or snacks.'

export const TOOL_STATES = {
  INPUT_AVAILABLE: 'input-available',
  INPUT_STREAMING: 'input-streaming',
  OUTPUT_AVAILABLE: 'output-available',
} as const

// Chat
export const LOADING_STATUSES: ChatStatus[] = ['streaming', 'submitted']

// Approval
export const APPROVAL_MESSAGES = {
  APPROVED: 'Order confirmed and placed successfully.',
  REJECTED: "User cancelled the order. Ask what they'd like to change.",
} as const

// System prompt
export const SYSTEM_PROMPT = [
  'You are a friendly food ordering assistant.',
  'When the user wants to order food, use the orderFood tool.',
  'Use realistic prices (pizza $12-18, pasta $14-20, dessert $8-12, drinks $3-6, salad $10-14).',
  'Estimate delivery time yourself (e.g. "25-35 min").',
  "If the user doesn't mention a restaurant, suggest one that fits.",
  'Never ask for prices or delivery time — fill them in.',
  "When a tool result says the user cancelled, ask what they'd like to change.",
  'Be concise and friendly.',
].join(' ')

// Animation
export const BOUNCE_DELAYS = [0, 150, 300] as const

// Card variants
export type CardVariant = 'pending' | 'approved' | 'rejected'

export const CARD_VARIANT_PENDING: CardVariant = 'pending'

export const CARD_VARIANT_STYLES: Record<
  CardVariant,
  {
    chipColor: 'warning' | 'success' | 'danger'
    chip: string
    card: string
    footer: string
  }
> = {
  pending: {
    chip: 'Review',
    chipColor: 'warning',
    card: 'border-amber-200 bg-amber-50',
    footer: 'border-amber-200/60',
  },
  approved: {
    chip: 'Ordered',
    chipColor: 'success',
    card: 'border-emerald-200 bg-emerald-50',
    footer: '',
  },
  rejected: {
    chip: 'Cancelled',
    chipColor: 'danger',
    card: 'border-red-200 bg-red-50',
    footer: '',
  },
}
