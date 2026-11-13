import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Sparkles, User as UserIcon } from 'lucide-react'
import { SAMPLE_BUSES, PRIVATE_VEHICLES } from '../../lib/constants'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const getSmartResponse = (msg: string): string => {
  const l = msg.toLowerCase()

  if (l.includes('bus') || l.includes('find') || l.includes('available')) {
    const avail = SAMPLE_BUSES.filter(b => b.status === 'available')
    return `I found ${avail.length} government buses currently available:\n\n${avail.map(b => `• **${b.number}** (${b.route}) – ${b.available} seats free, departs ${b.departureTime} AM`).join('\n')}\n\nWould you like details on a specific route?`
  }

  if (l.includes('seat') || l.includes('capacity')) {
    const totalPub = SAMPLE_BUSES.reduce((a, b) => a + b.available, 0)
    const totalPri = PRIVATE_VEHICLES.reduce((a, p) => a + p.available, 0)
    return `💺 **Current Seat Availability:**\n\n• Public bus seats available: **${totalPub}**\n• Private vehicle seats: **${totalPri}**\n• Total network capacity: **310 seats**\n\nBus TN 72 C 3456 (Virudhunagar) is currently **FULL**. Try TN 72 B 1234 or TN 58 N 2345 for the most available seats.`
  }

  if (l.includes('emergency') || l.includes('breakdown') || l.includes('cancel')) {
    return `🚨 **Emergency Transport Protocol:**\n\n1. AI identifies all affected students from the broken-down bus\n2. Alternative vehicles with available seats are found\n3. Students are reassigned proportionally (never exceeding capacity)\n4. New pickup points are generated\n5. Both students and admin are notified\n\nTo simulate this, ask your **admin** to use the **Emergency Simulation** panel in the Admin Dashboard.`
  }

  if (l.includes('traffic') || l.includes('delay') || l.includes('congestion')) {
    return `🚦 **Current Traffic Status:**\n\n• Kovilpatti → Sivakasi: 🟢 Clear (no delay)\n• Sankarankovil → Sivakasi: 🟡 Moderate (+15 min)\n• Rajapalayam → Tirunelveli: 🟢 Clear\n• Virudhunagar → Sivakasi: 🔴 **Heavy** (+25 min delay)\n• Kovilpatti → Tirunelveli: 🟡 Moderate (+10 min)\n\nI recommend leaving early if your route passes through Virudhunagar.`
  }

  if (l.includes('route') || l.includes('kovilpatti') || l.includes('sivakasi') || l.includes('tirunelveli')) {
    return `📍 **Available Routes:**\n\n• Kovilpatti → Sivakasi (28.5 km, ~55 min)\n• Sankarankovil → Sivakasi (45.2 km, ~80 min)\n• Rajapalayam → Tirunelveli (55 km, ~90 min)\n• Virudhunagar → Sivakasi (20 km, ~40 min)\n• Kovilpatti → Tirunelveli (72 km, ~110 min)\n\nWhich route would you like more details about?`
  }

  if (l.includes('alternative') || l.includes('private') || l.includes('option') || l.includes('auto')) {
    return `🚐 **Alternative Transport Options:**\n\n${PRIVATE_VEHICLES.map(v => `• **${v.type}** (${v.number}) – ${v.available} seats available, ₹${v.cost}/trip, pickup: ${v.pickupPoint}`).join('\n')}\n\nShared community vehicles and verified auto-rickshaws are also on standby. Contact admin for local provider list.`
  }

  if (l.includes('time') || l.includes('depart') || l.includes('arrival') || l.includes('when')) {
    return `⏰ **Departure Schedule:**\n\n${SAMPLE_BUSES.map(b => `• **${b.number}**: ${b.departureTime} AM (${b.pickupPoint})${b.status === 'full' ? ' – FULL' : ''}`).join('\n')}\n\nI recommend arriving 10 minutes before departure time.`
  }

  if (l.includes('hello') || l.includes('hi') || l.includes('help') || l.includes('hey')) {
    return `Hello! 👋 I'm **ROUTELESS AI**, your smart rural transportation assistant.\n\nI can help you with:\n🔍 Finding available buses\n💺 Checking seat availability\n🗺️ Route information and stops\n🚦 Live traffic updates\n🚨 Emergency transport guidance\n🚐 Alternative private transport\n⏰ Departure times and schedules\n\nWhat would you like to know?`
  }

  return `Thank you for your query! Based on current transportation data:\n\n• **4 buses** are available today (1 is full)\n• **${SAMPLE_BUSES.reduce((a, b) => a + b.available, 0)} public seats** available\n• **3 private vehicles** with ${PRIVATE_VEHICLES.reduce((a, p) => a + p.available, 0)} seats\n\nFor specific information, try asking about buses, seats, routes, traffic, or alternatives. You can also use the **Search Routes** feature for detailed results.`
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      role: 'assistant',
      content: "Hello! 👋 I'm your **ROUTELESS AI** assistant. I can help you find buses, check availability, suggest alternatives, and answer transportation queries for rural student commuters in Tamil Nadu.\n\nHow can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  const quickReplies = ['Find buses to Sivakasi', 'Check seat availability', 'Emergency transport info', 'Show traffic status']

  const handleSend = (text?: string) => {
    const msgText = text || input.trim()
    if (!msgText) return

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: msgText, timestamp: new Date() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getSmartResponse(msgText)
      const aiMsg: Message = { id: `a-${Date.now()}`, role: 'assistant', content: response, timestamp: new Date() }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 800 + Math.random() * 700)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-black text-slate-900">ROUTELESS AI Assistant</h1>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online — Using live transportation data
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-emerald-600 text-white rounded-br-sm'
                : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-xs'
            }`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-bold text-emerald-600">
                  <Sparkles className="w-3 h-3" /> ROUTELESS AI
                </div>
              )}
              <div className="whitespace-pre-line text-xs">
                {msg.content.split(/\*\*(.*?)\*\*/g).map((part, i) =>
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
                )}
              </div>
              <div className={`text-[10px] mt-1.5 ${msg.role === 'user' ? 'text-emerald-200' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="ml-2 text-[11px]">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Replies */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 py-3 border-t border-slate-100">
          {quickReplies.map((qr) => (
            <button
              key={qr}
              onClick={() => handleSend(qr)}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition cursor-pointer"
            >
              {qr}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="pt-3 border-t border-slate-200 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about buses, routes, seats, traffic..."
          className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition disabled:opacity-40 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
