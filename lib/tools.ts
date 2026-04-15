import { z } from 'zod'

export const orderFoodSchema = z.object({
  restaurant: z.string().describe('Restaurant name'),
  items: z
    .array(
      z.object({
        name: z.string().describe('Item name'),
        quantity: z.number().describe('Quantity'),
        price: z.number().describe('Price per item in USD'),
      }),
    )
    .describe('List of food items'),
  deliveryTime: z.string().describe('Estimated delivery time, e.g. "30-40 min"'),
})

export type OrderFoodParams = z.infer<typeof orderFoodSchema>

export interface ToolApprovalResult {
  approved: boolean
  message: string
}
