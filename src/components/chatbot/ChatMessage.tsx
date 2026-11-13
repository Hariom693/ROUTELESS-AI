interface ChatMessageBubbleProps {
  message: { role: 'user' | 'assistant'; content: string; timestamp: Date }
}
export default function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`px-4 py-2 rounded-xl max-w-xs ${message.role === 'user' ? 'bg-brand-green text-white' : 'bg-white border text-gray-800'}`}>
        {message.content}
      </div>
    </div>
  )
}

