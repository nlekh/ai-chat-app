interface MessageBubbleProps {
  role: 'user' | 'assistant' | 'system'
  text: string
}

const USER_ROLE = 'user'

export function MessageBubble({ role, text }: MessageBubbleProps) {
  const isUser = role === USER_ROLE

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed shadow-sm ${
          isUser
            ? 'rounded-br-sm bg-blue-500 text-white'
            : 'rounded-bl-sm bg-zinc-100 text-zinc-800'
        }`}
      >
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  )
}
