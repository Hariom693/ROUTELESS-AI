export type UserRole = 'student' | 'admin' | 'driver'
export type TransportType = 'public' | 'private'
export type TrafficLevel = 'low' | 'medium' | 'high'
export type TripStatus = 'scheduled' | 'waiting' | 'in_transit' | 'delayed' | 'completed' | 'cancelled'
export type VehicleStatus = 'available' | 'full' | 'unavailable' | 'breakdown'

export interface User {
  id: string; full_name: string; email: string; phone?: string;
  role: UserRole; village?: string; created_at: string; last_login_at?: string;
}
export interface Vehicle {
  id: string; vehicle_number: string; vehicle_type: string; transport_category: TransportType;
  capacity: number; available_seats: number; occupied_seats: number;
  driver_id?: string; availability_status: VehicleStatus; route?: string;
  departure_time?: string; pickup_point?: string; estimated_cost?: number; traffic_level?: TrafficLevel;
}
export interface Route {
  id: string; source: string; destination: string; distance: number;
  estimated_duration: number; route_status: string;
}
export interface RouteStop {
  id: string; route_id: string; stop_name: string; latitude: number; longitude: number; stop_order: number;
}
export interface StudentTrip {
  id: string; student_id: string; route_id: string; vehicle_id: string;
  pickup_point: string; destination: string; travel_date: string; trip_status: TripStatus;
}
export interface DemandPrediction {
  id: string; route_id: string; route?: string; predicted_students: number;
  available_capacity: number; predicted_shortage: number; prediction_period: string; explanation: string;
}
export interface EmergencyEvent {
  id: string; vehicle_id: string; event_type: string; affected_students: number;
  reassigned_students: number; unassigned_students: number; created_at: string;
}
export interface TrafficInfo {
  id: string; route_id: string; traffic_level: TrafficLevel; estimated_delay: number; updated_at: string;
}
export interface ChatMessage {
  id: string; role: 'user' | 'assistant'; content: string; timestamp: Date;
}
export interface LocationCoord {
  id: string; name: string; lat: number; lng: number; type: 'village' | 'college';
}

