import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { SAMPLE_BUSES, PRIVATE_VEHICLES } from '../../lib/constants'

interface ChatMsg {
  role: 'user' | 'assistant'
  content: string
}

const getResponse = (msg: string): string => {
  const l = msg.toLowerCase()

  // Sivakasi-specific queries
  if (l.includes('sivakasi')) {
    const sivBuses = SAMPLE_BUSES.filter((b) => b.route.toLowerCase().includes('sivakasi'))
    if (sivBuses.length > 0) {
      return `🚌 Buses to Sivakasi:\n${sivBuses.map((b) => `• ${b.number} — ${b.route}\n  Departs: ${b.departureTime} AM | Seats: ${b.available}/${b.capacity} free | Pickup: ${b.pickupPoint}`).join('\n')}\n\n📊 Total available seats to Sivakasi: ${sivBuses.reduce((a, b) => a + b.available, 0)}`
    }
    return '📍 No direct buses found to Sivakasi currently. Try checking private transport options or ask about alternatives.'
  }

  // Tirunelveli-specific queries
  if (l.includes('tirunelveli')) {
    const tnBuses = SAMPLE_BUSES.filter((b) => b.route.toLowerCase().includes('tirunelveli'))
    if (tnBuses.length > 0) {
      return `🚌 Buses to Tirunelveli:\n${tnBuses.map((b) => `• ${b.number} — ${b.route}\n  Departs: ${b.departureTime} AM | Seats: ${b.available}/${b.capacity} free | Pickup: ${b.pickupPoint}`).join('\n')}`
    }
    return '📍 No direct buses to Tirunelveli at this time.'
  }

  // Kovilpatti queries
  if (l.includes('kovilpatti')) {
    const kvBuses = SAMPLE_BUSES.filter((b) => b.route.toLowerCase().includes('kovilpatti'))
    return `📍 Buses from Kovilpatti:\n${kvBuses.map((b) => `• ${b.number} → ${b.route} (${b.available} seats free, ${b.departureTime} AM)`).join('\n')}`
  }

  // Travel time queries
  if (l.includes('time') || l.includes('how long') || l.includes('duration') || l.includes('travel time')) {
    return `⏱️ Estimated Travel Times:\n• Kovilpatti → Sivakasi: ~55 mins (28.5 km)\n• Sankarankovil → Sivakasi: ~70 mins (45.2 km)\n• Rajapalayam → Tirunelveli: ~85 mins (55 km)\n• Virudhunagar → Sivakasi: ~35 mins (20 km)\n• Kovilpatti → Tirunelveli: ~110 mins (72 km)\n\n⚠️ Add 15-25 mins during heavy traffic periods.`
  }

  // Bus availability / find buses
  if (l.includes('bus') || l.includes('find') || l.includes('available')) {
    const avail = SAMPLE_BUSES.filter((b) => b.status === 'available')
    const full = SAMPLE_BUSES.filter((b) => b.status === 'full')
    return `🚌 Bus Status Overview:\n\n✅ Available (${avail.length}):\n${avail.map((b) => `• ${b.number} — ${b.route}\n  ${b.available} seats free | Departs ${b.departureTime} AM`).join('\n')}\n\n🔴 Full (${full.length}):\n${full.map((b) => `• ${b.number} — ${b.route} (No seats)`).join('\n')}\n\n💡 Tip: Full buses? Check private vehicles or AI alternatives!`
  }

  // Seat / capacity queries
  if (l.includes('seat') || l.includes('capacity')) {
    const pubSeats = SAMPLE_BUSES.reduce((a, b) => a + b.available, 0)
    const pubTotal = SAMPLE_BUSES.reduce((a, b) => a + b.capacity, 0)
    const pvtSeats = PRIVATE_VEHICLES.reduce((a, p) => a + p.available, 0)
    const pvtTotal = PRIVATE_VEHICLES.reduce((a, p) => a + p.capacity, 0)
    return `💺 Seat Availability Summary:\n\n🚌 Public Buses: ${pubSeats} free of ${pubTotal} total\n🚐 Private Vehicles: ${pvtSeats} free of ${pvtTotal} total\n📊 Network Total: ${pubSeats + pvtSeats} seats available across ${SAMPLE_BUSES.length + PRIVATE_VEHICLES.length} vehicles\n\n${pubSeats + pvtSeats < 30 ? '⚠️ Low availability! Consider booking early.' : '✅ Good availability across the network.'}`
  }

  // Emergency / breakdown
  if (l.includes('emergency') || l.includes('breakdown') || l.includes('break down')) {
    return `🚨 Emergency Bus Breakdown Response:\n\nWhen a bus breaks down, ROUTELESS AI:\n1️⃣ Marks the bus as unavailable immediately\n2️⃣ Identifies all affected students\n3️⃣ Scans nearby buses with spare capacity\n4️⃣ Checks private vehicles (shuttles, autos)\n5️⃣ Reallocates students without exceeding capacity\n6️⃣ Notifies drivers of new allocations\n\n👨‍💼 Admins can simulate this in the Emergency Simulation panel.\n\n⚡ Average reallocation time: Under 5 seconds!`
  }

  // Traffic queries
  if (l.includes('traffic') || l.includes('congestion') || l.includes('delay')) {
    return `🚦 Live Traffic Status:\n\n🟢 Kovilpatti → Sivakasi: Clear (~55 min)\n🟡 Sankarankovil → Sivakasi: Moderate (+15 min delay)\n🔴 Virudhunagar → Sivakasi: Heavy Congestion (+25 min)\n🟢 Rajapalayam → Tirunelveli: Clear (~85 min)\n🟡 Kovilpatti → Tirunelveli: Moderate (+10 min delay)\n\n💡 Tip: Start early on 🔴 routes to avoid missing classes!`
  }

  // Route queries
  if (l.includes('route') || l.includes('routes')) {
    return `📍 Active Routes (${SAMPLE_BUSES.length + PRIVATE_VEHICLES.length} vehicles):\n\n1. Kovilpatti → Sivakasi (28.5 km) — 2 buses\n2. Sankarankovil → Sivakasi (45.2 km) — 1 bus\n3. Rajapalayam → Tirunelveli (55 km) — 1 bus\n4. Virudhunagar → Sivakasi (20 km) — 1 bus\n5. Kovilpatti → Tirunelveli (72 km) — 1 bus\n\n🚐 Plus ${PRIVATE_VEHICLES.length} private vehicles on flexible routes.`
  }

  // Alternative transport
  if (l.includes('alternative') || l.includes('other option') || l.includes('no bus') || l.includes('full')) {
    return `🔄 Alternative Transport Options:\n\nWhen government buses are full or cancelled:\n\n🚐 Private Mini-Bus: ${PRIVATE_VEHICLES[0]?.number || 'Available'}\n   ${PRIVATE_VEHICLES[0]?.available || 0} seats | ₹${PRIVATE_VEHICLES[0]?.cost || 25}/student\n\n🛺 Shared Auto-Rickshaws:\n   Standby at Kovilpatti Market | ₹40/student\n\n🚌 Community Vans:\n   Rajapalayam Temple Gate | ₹30/student\n\n🔀 Multi-Stage Shuttle:\n   Via Ettayapuram Hub connecting service\n\n💡 All alternatives are verified and registered with the district transport office.`
  }

  // Private transport
  if (l.includes('private') || l.includes('auto') || l.includes('rickshaw') || l.includes('van')) {
    return `🚐 Private Transport Options:\n${PRIVATE_VEHICLES.map((p) => `• ${p.number} (${p.type})\n  Capacity: ${p.capacity} | Available: ${p.available} seats\n  Pickup: ${p.pickupPoint} | Cost: ₹${p.cost}/student`).join('\n\n')}\n\n📞 Private vehicles can be requested through the admin panel.`
  }

  // Cost / fare
  if (l.includes('cost') || l.includes('fare') || l.includes('price') || l.includes('fee')) {
    return `💰 Transport Costs:\n\n🚌 Government Buses: FREE with valid student pass\n🚐 Private Mini-Bus: ₹25-30/student\n🛺 Shared Auto: ₹40/student\n🚌 Community Van: ₹30/student\n\n📋 Students with rural transport passes travel free on all government TNSTC buses.`
  }

  // Demand / prediction
  if (l.includes('demand') || l.includes('predict') || l.includes('forecast') || l.includes('shortage')) {
    return `📊 AI Demand Forecast (Tomorrow):\n\n⚠️ Kovilpatti → Sivakasi: 120 predicted / 90 seats (SHORT 30)\n✅ Sankarankovil → Sivakasi: 70 predicted / 80 seats\n🚨 Rajapalayam → Tirunelveli: 100 predicted / 60 seats (SHORT 40)\n✅ Virudhunagar → Sivakasi: 85 predicted / 100 seats\n\n🤖 AI recommends deploying 2 additional private vehicles on shortage routes.\n\n⚠️ These are AI estimates, not confirmed counts.`
  }

  // Greeting
  if (l.includes('hello') || l.includes('hi') || l.includes('hey') || l.includes('help')) {
    return `Hi! 👋 I'm ROUTELESS AI Assistant.\n\nI can help you with:\n🚌 Bus availability — "Find buses"\n💺 Seat status — "Check seats"\n📍 Route info — "Show routes"\n⏱️ Travel time — "How long to Sivakasi?"\n🚦 Traffic updates — "Traffic info"\n🚨 Emergencies — "What happens in breakdown?"\n💰 Fares — "What's the cost?"\n📊 AI predictions — "Demand forecast"\n🔄 Alternatives — "No bus available"\n\nJust type your question!`
  }

  // Thank you
  if (l.includes('thank') || l.includes('thanks')) {
    return `You're welcome! 😊 Safe travels! If you need anything else, just ask. 🚌`
  }

  // Default fallback
  return `I can help with:\n• "Buses to Sivakasi" — route-specific search\n• "Check seats" — seat availability\n• "Traffic info" — live traffic status\n• "Travel time" — journey duration\n• "Alternatives" — when buses are full\n• "Cost" — fare information\n• "Demand forecast" — AI predictions\n\nTry asking about a specific route or topic!`
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMsg[]>([{ role: 'assistant', content: "Hi! 👋 I'm ROUTELESS AI Assistant. Ask me about buses, seats, routes, traffic, or emergencies!" }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const send = (text?: string) => {
    const t = text || input.trim()
    if (!t) return
    setMessages((prev) => [...prev, { role: 'user', content: t }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: getResponse(t) }])
      setTyping(false)
    }, 600 + Math.random() * 500)
  }

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[340px] h-[480px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <div>
                <div className="text-sm font-bold">ROUTELESS AI</div>
                <div className="text-[10px] text-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" /> Online — Ask anything
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-emerald-700 transition cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-sm'
                    : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                }`}>
                  <div className="whitespace-pre-line">{m.content}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-xl rounded-bl-sm px-3 py-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {['Buses to Sivakasi', 'Check seats', 'Traffic info', 'Travel time', 'Alternatives'].map((q) => (
                <button key={q} onClick={() => send(q)} className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold hover:bg-emerald-100 cursor-pointer">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); send() }} className="p-3 border-t border-slate-200 flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about buses, routes, traffic..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-emerald-500 outline-none"
            />
            <button type="submit" disabled={!input.trim()} className="p-2 rounded-xl bg-emerald-600 text-white disabled:opacity-40 cursor-pointer">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
