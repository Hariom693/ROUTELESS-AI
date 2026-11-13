import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Bus, Navigation, School, MapPin } from 'lucide-react'
import { VILLAGES, COLLEGES, SAMPLE_BUSES, PRIVATE_VEHICLES } from '../../lib/constants'

// Fix Leaflet marker icons in React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

// Route Polyline Paths & Traffic levels
// Green: low/clear, Orange: medium, Red: heavy
export const ROUTE_PATHS: Record<string, { points: [number, number][]; color: string; traffic: string; delay: number }> = {
  'r1': {
    points: [
      [9.1727, 77.8692], // Kovilpatti
      [9.2500, 77.8800], // Ettayapuram
      [9.3500, 77.8300], // Vilathikulam cross
      [9.4529, 77.7961], // Sivakasi
    ],
    color: '#22c55e', // Green - clear
    traffic: 'Low (Clear)',
    delay: 0,
  },
  'r2': {
    points: [
      [9.1667, 77.5500], // Sankarankovil
      [9.2900, 77.6500], // Watrap
      [9.4000, 77.7200], // Alangulam cross
      [9.4529, 77.7961], // Sivakasi
    ],
    color: '#f97316', // Orange - medium
    traffic: 'Medium (+15 min delay)',
    delay: 15,
  },
  'r3': {
    points: [
      [9.4494, 77.5578], // Rajapalayam
      [9.5100, 77.6400], // Srivilliputhur
      [9.1000, 77.7000], // Kadayanallur bypass
      [8.7139, 77.7567], // Tirunelveli
    ],
    color: '#22c55e', // Green - clear
    traffic: 'Low (Clear)',
    delay: 0,
  },
  'r4': {
    points: [
      [9.5810, 77.9624], // Virudhunagar
      [9.5100, 77.8900], // Vembakottai
      [9.4529, 77.8100], // Sivakasi
    ],
    color: '#ef4444', // Red - heavy
    traffic: 'Heavy (+25 min delay)',
    delay: 25,
  },
  'r5': {
    points: [
      [9.1727, 77.8692], // Kovilpatti
      [8.9500, 77.7800], // Kayathar
      [8.8200, 77.7600], // Gangaikondan
      [8.7139, 77.7567], // Tirunelveli
    ],
    color: '#f97316', // Orange - medium
    traffic: 'Medium (+10 min delay)',
    delay: 10,
  },
}

// Custom vehicle icons using Leaflet divIcon
const createBusIcon = (number: string, isFull: boolean, isBreakdown: boolean) => {
  const bg = isBreakdown ? '#ef4444' : isFull ? '#f97316' : '#10b981'
  return L.divIcon({
    className: 'custom-bus-marker',
    html: `
      <div style="background-color: ${bg}; color: white; border: 2px solid white; border-radius: 9999px; padding: 4px 8px; font-weight: bold; font-size: 11px; display: flex; align-items: center; gap: 4px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); white-space: nowrap;">
        <span>🚌</span>
        <span>${number}</span>
      </div>
    `,
    iconSize: [80, 28],
    iconAnchor: [40, 14],
  })
}

const createPrivateIcon = (type: string) => {
  return L.divIcon({
    className: 'custom-private-marker',
    html: `
      <div style="background-color: #3b82f6; color: white; border: 2px solid white; border-radius: 9999px; padding: 3px 6px; font-weight: bold; font-size: 10px; display: flex; align-items: center; gap: 3px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2); white-space: nowrap;">
        <span>🚐</span>
        <span>${type}</span>
      </div>
    `,
    iconSize: [60, 24],
    iconAnchor: [30, 12],
  })
}

const createCollegeIcon = (name: string) => {
  return L.divIcon({
    className: 'custom-college-marker',
    html: `
      <div style="background-color: #0f172a; color: white; border: 2px solid #38bdf8; border-radius: 8px; padding: 3px 6px; font-size: 10px; font-weight: bold; display: flex; align-items: center; gap: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); white-space: nowrap;">
        <span>🏛️</span>
        <span>${name}</span>
      </div>
    `,
    iconSize: [120, 24],
    iconAnchor: [60, 12],
  })
}

interface TransportMapProps {
  selectedVehicleId?: string
  height?: string
  animated?: boolean
  showTrafficLegend?: boolean
}

export default function TransportMap({
  selectedVehicleId,
  height = '500px',
  animated = true,
  showTrafficLegend = true,
}: TransportMapProps) {
  // Simulated vehicle progress along route for animated tracking
  const [animStep, setAnimStep] = useState(0)

  useEffect(() => {
    if (!animated) return
    const timer = setInterval(() => {
      setAnimStep((prev) => (prev + 1) % 100)
    }, 1500)
    return () => clearInterval(timer)
  }, [animated])

  // Helper to interpolate position along polyline
  const getSimulatedVehicleCoord = (routeKey: string, progressFraction: number): [number, number] => {
    const route = ROUTE_PATHS[routeKey] || ROUTE_PATHS['r1']
    const pts = route.points
    const totalSegments = pts.length - 1
    const scaled = (progressFraction % 1) * totalSegments
    const segIndex = Math.min(Math.floor(scaled), totalSegments - 1)
    const segT = scaled - segIndex

    const p1 = pts[segIndex]
    const p2 = pts[segIndex + 1]

    const lat = p1[0] + (p2[0] - p1[0]) * segT
    const lng = p1[1] + (p2[1] - p1[1]) * segT
    return [lat, lng]
  }

  // Active tracking vehicle position
  const activeBus = SAMPLE_BUSES.find((b) => b.id === selectedVehicleId) || SAMPLE_BUSES[0]
  const animPos = getSimulatedVehicleCoord('r1', (animStep * 0.05) % 1)

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ height }}>
      <MapContainer
        center={[9.35, 77.78]}
        zoom={10}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', background: '#f8fafc' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 1. Traffic Polylines */}
        {Object.entries(ROUTE_PATHS).map(([key, route]) => (
          <Polyline
            key={key}
            positions={route.points}
            pathOptions={{
              color: route.color,
              weight: 5,
              opacity: 0.85,
              dashArray: route.delay > 0 ? '8, 8' : undefined,
            }}
          >
            <Popup>
              <div className="text-xs p-1">
                <div className="font-bold text-slate-900">Route Segment {key.toUpperCase()}</div>
                <div className="text-slate-600 mt-1">Traffic: <span className="font-semibold">{route.traffic}</span></div>
                {route.delay > 0 && (
                  <div className="text-amber-600 font-medium">Estimated Delay: +{route.delay} mins</div>
                )}
              </div>
            </Popup>
          </Polyline>
        ))}

        {/* 2. Villages Markers (CircleMarkers) */}
        {VILLAGES.map((v) => (
          <CircleMarker
            key={v.id}
            center={[v.lat, v.lng]}
            radius={8}
            pathOptions={{
              color: '#0f172a',
              fillColor: '#38bdf8',
              fillOpacity: 0.9,
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-xs p-1">
                <div className="font-bold text-slate-900">📍 Village: {v.name}</div>
                <div className="text-slate-500">Rural Commuter Hub</div>
                <div className="mt-1 text-[11px] text-emerald-600 font-semibold">Active pickup &amp; drop point</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* 3. Colleges Markers */}
        {COLLEGES.map((c) => (
          <Marker key={c.id} position={[c.lat, c.lng]} icon={createCollegeIcon(c.name)}>
            <Popup>
              <div className="text-xs p-1">
                <div className="font-bold text-slate-900">🏛️ {c.name}</div>
                <div className="text-slate-500">Educational Destination</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 4. Public Buses */}
        {SAMPLE_BUSES.map((bus, idx) => {
          // If this is the active animated bus, use animPos
          const isSelected = bus.id === activeBus.id
          const pos = isSelected
            ? animPos
            : getSimulatedVehicleCoord(`r${(idx % 5) + 1}`, (0.2 + idx * 0.22) % 1)

          return (
            <Marker
              key={bus.id}
              position={pos}
              icon={createBusIcon(bus.number, bus.status === 'full', bus.status === 'breakdown')}
            >
              <Popup>
                <div className="text-xs p-1 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>🚌 {bus.number}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                      bus.status === 'full' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {bus.status}
                    </span>
                  </div>
                  <div className="text-slate-600">Route: <span className="font-medium">{bus.route}</span></div>
                  <div className="text-slate-600">Departure: <span className="font-medium">{bus.departureTime} AM</span></div>
                  <div className="text-slate-600">
                    Seats: <span className="font-bold text-emerald-600">{bus.available}</span> / {bus.capacity} free
                  </div>
                  {isSelected && (
                    <div className="mt-2 text-emerald-700 font-bold bg-emerald-50 p-1.5 rounded text-[11px] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Live Animated GPS Tracking
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          )
        })}

        {/* 5. Private Vehicles */}
        {PRIVATE_VEHICLES.map((v, i) => {
          const pos: [number, number] = [
            9.4529 + (i === 0 ? 0.02 : -0.015),
            77.7961 + (i === 0 ? 0.01 : 0.03 * (i - 1)),
          ]
          return (
            <Marker key={v.id} position={pos} icon={createPrivateIcon(v.type)}>
              <Popup>
                <div className="text-xs p-1 space-y-1">
                  <div className="font-bold text-slate-900">🚐 {v.type} ({v.number})</div>
                  <div className="text-slate-600">Available: <span className="font-bold text-blue-600">{v.available}</span> / {v.capacity} seats</div>
                  <div className="text-slate-600">Fare: ₹{v.cost}</div>
                  <div className="text-slate-600">Pickup: {v.pickupPoint}</div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      {/* Interactive Legend Box */}
      {showTrafficLegend && (
        <div className="absolute bottom-4 right-4 z-[1000] bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-3 shadow-lg text-[11px] space-y-1.5">
          <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-emerald-600" />
            <span>Map Legend &amp; Traffic</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-emerald-500 rounded" />
            <span className="text-slate-700">Clear Traffic</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-amber-500 rounded" />
            <span className="text-slate-700">Moderate Traffic (+10-15m)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-rose-500 rounded" />
            <span className="text-slate-700">Heavy Traffic (+25m)</span>
          </div>
          <div className="pt-1 border-t border-slate-100 flex items-center justify-between gap-4 text-slate-500 text-[10px]">
            <span>🔵 Village</span>
            <span>🏛️ College</span>
            <span>🚌 Bus</span>
          </div>
        </div>
      )}
    </div>
  )
}
