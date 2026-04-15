'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import {
  APP_NAME,
  APP_DESCRIPTION,
  CHAT_API,
  TOOL_NAME,
  THROTTLE_MS,
  APPROVAL_MESSAGES,
  LOADING_STATUSES,
} from '@/lib/constants'
import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'

const FoodIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2" />
    <path d="M6 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6h3a2 2 0 0 0 2-2z" />
    <path d="M16 22v-7" />
  </svg>
)

const transport = new DefaultChatTransport({ api: CHAT_API })

export function Chat() {
  const [input, setInput] = useState('')

  const { messages, status, error, sendMessage, stop, addToolResult, clearError } = useChat({
    transport,
    experimental_throttle: THROTTLE_MS,
  })

  const hasPendingTool = messages.some((m) =>
    m.parts.some((p) => {
      if (p.type !== `tool-${TOOL_NAME}`) return false
      const state = (p as Record<string, unknown>).state
      return state === 'input-available' || state === 'input-streaming'
    }),
  )
  const isLoading = LOADING_STATUSES.includes(status) || hasPendingTool

  function handleSubmit(text: string) {
    if (!text.trim() || isLoading) return
    sendMessage({ text })
    setInput('')
  }

  function handleApprove(toolCallId: string) {
    addToolResult({
      tool: TOOL_NAME,
      toolCallId,
      output: { approved: true, message: APPROVAL_MESSAGES.APPROVED },
    })
  }

  function handleReject(toolCallId: string) {
    addToolResult({
      tool: TOOL_NAME,
      toolCallId,
      output: { approved: false, message: APPROVAL_MESSAGES.REJECTED },
    })
  }

  return (
    <div className="mx-auto flex h-dvh max-w-2xl flex-col border-x border-zinc-200 bg-white">
      <header className="flex items-center gap-3 border-b border-zinc-200 px-5 py-3.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
          <FoodIcon />
        </div>
        <div>
          <h1 className="text-[15px] font-semibold text-zinc-900">{APP_NAME}</h1>
          <p className="text-xs text-zinc-400">{APP_DESCRIPTION}</p>
        </div>
      </header>

      <MessageList
        messages={messages}
        isLoading={isLoading}
        hasPendingTool={hasPendingTool}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {error && (
        <div className="mx-4 mb-2 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-red-500"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="flex-1 text-sm text-red-600">{error.message}</p>
          <button
            onClick={() => clearError()}
            className="shrink-0 text-xs font-semibold text-red-400 hover:text-red-600"
          >
            Dismiss
          </button>
        </div>
      )}

      {hasPendingTool && (
        <div className="mx-4 mb-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-700">
          Please approve or cancel the pending order before sending a new message
        </div>
      )}

      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        onStop={stop}
      />
    </div>
  )
}
