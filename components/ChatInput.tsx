'use client'

import { Button } from '@heroui/button'
import { APP_PLACEHOLDER } from '@/lib/constants'
import type { FormEvent, KeyboardEvent } from 'react'

interface ChatInputProps {
  input: string
  isLoading: boolean
  onInputChange: (value: string) => void
  onSubmit: (text: string) => void
  onStop: () => void
}

export function ChatInput({ input, isLoading, onInputChange, onSubmit, onStop }: ChatInputProps) {
  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(input)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit(input)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="border-t border-zinc-100 bg-white px-4 py-3">
      <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-2 shadow-sm transition-all focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-md focus-within:ring-4 focus-within:ring-blue-50">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={APP_PLACEHOLDER}
          disabled={isLoading}
          autoFocus
          className="min-w-0 flex-1 bg-transparent py-1.5 text-[15px] text-zinc-800 outline-none placeholder:text-zinc-400 disabled:opacity-50"
        />
        {isLoading ? (
          <Button
            size="sm"
            onPress={onStop}
            className="h-9 rounded-xl bg-red-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-red-600"
          >
            Stop
          </Button>
        ) : (
          <Button
            type="submit"
            size="sm"
            isDisabled={!input.trim()}
            className="h-9 rounded-xl bg-blue-500 px-5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
          >
            Send
          </Button>
        )}
      </div>
    </form>
  )
}
