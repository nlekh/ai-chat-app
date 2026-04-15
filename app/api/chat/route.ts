import { streamText, tool, convertToModelMessages } from 'ai'
import { openai } from '@ai-sdk/openai'
import { orderFoodSchema } from '@/lib/tools'
import { SYSTEM_PROMPT, MODEL_ID, TOOL_NAME, TOOL_DESCRIPTION } from '@/lib/constants'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!Array.isArray(messages)) {
      return new Response('Invalid request: messages must be an array', { status: 400 })
    }

    const result = streamText({
      model: openai(MODEL_ID),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      tools: {
        [TOOL_NAME]: tool({
          description: TOOL_DESCRIPTION,
          inputSchema: orderFoodSchema,
        }),
      },
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return new Response(message, { status: 500 })
  }
}
