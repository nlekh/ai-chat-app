# Food Order Assistant

AI chat with streaming, tool calls, and human approval before execution.

You describe what you want to eat — the assistant builds an order and shows it as a card. You review, approve or cancel. If you cancel, it asks what to change.

**Example:**
- `Order 2 margherita pizzas and a tiramisu from Restaurant`
- `I'm hungry, get me a burger and fries from Five Guys`
- `Order sushi for 2 — salmon rolls, edamame, miso soup`
- `I want Thai food` _(it picks a restaurant for you)_

## Setup

```bash
npm install
cp .env.example .env.local
# Add your OpenAI API key to .env.local
npm run dev
```

## Tech Stack

Next.js 16, TypeScript, Vercel AI SDK 6, HeroUI v3, Tailwind v4, OpenAI GPT-4o

## Structure

```
lib/
    constants.ts,
    tools.ts
app/api/chat/route.ts     — streamText, no execute
components/
    Chat.tsx              — useChat, approval handlers
    OrderCard.tsx         — card with Place Order / Cancel
    MessageList.tsx       — parts loop, delegates to cards
    MessageBubble.tsx     
    EmptyState.tsx
    LoadingIndicator.tsx
    ChatInput.tsx
```

## Environment Variables

```
OPENAI_API_KEY=''
```
