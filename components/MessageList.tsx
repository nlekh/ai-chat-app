'use client'

import { useRef, useEffect } from 'react'
import type { UIMessage } from 'ai'
import { TEXT_PART_TYPE, TOOL_PART_TYPE, TOOL_STATES } from '@/lib/constants'
import type { OrderFoodParams, ToolApprovalResult } from '@/lib/tools'
import { MessageBubble } from './MessageBubble'
import { OrderCard } from './OrderCard'
import { EmptyState } from './EmptyState'
import { LoadingIndicator } from './LoadingIndicator'

interface MessageListProps {
  messages: UIMessage[]
  isLoading: boolean
  hasPendingTool: boolean
  onApprove: (toolCallId: string) => void
  onReject: (toolCallId: string) => void
}

export function MessageList({
  messages,
  isLoading,
  hasPendingTool,
  onApprove,
  onReject,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) return <EmptyState />

  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-5 py-6">
      {messages.map((message) => (
        <div key={message.id}>
          {message.parts.map((part, index) => {
            if (part.type === TEXT_PART_TYPE && part.text.trim()) {
              return (
                <MessageBubble
                  key={`${message.id}-${index}`}
                  role={message.role}
                  text={part.text}
                />
              )
            }

            if (part.type === TOOL_PART_TYPE) {
              const tp = part as Record<string, unknown>
              const input = tp.input as OrderFoodParams | undefined
              const toolCallId = tp.toolCallId as string | undefined
              const state = tp.state as string | undefined

              if (!input || !toolCallId || !state) return null
              const output =
                state === TOOL_STATES.OUTPUT_AVAILABLE
                  ? (tp.output as ToolApprovalResult)
                  : undefined

              return (
                <OrderCard
                  key={toolCallId}
                  toolCallId={toolCallId}
                  state={state}
                  input={input}
                  output={output}
                  onApprove={onApprove}
                  onReject={onReject}
                />
              )
            }

            return null
          })}
        </div>
      ))}

      {isLoading && !hasPendingTool && <LoadingIndicator />}

      <div ref={bottomRef} />
    </div>
  )
}
