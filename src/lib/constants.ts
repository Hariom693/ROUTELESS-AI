import { LocationCoord } from '../types'

export const VILLAGES: LocationCoord[] = [
  { id: 'v1', name: 'Kovilpatti', lat: 9.1727, lng: 77.8692, type: 'village' },
  { id: 'v2', name: 'Sivakasi', lat: 9.4529, lng: 77.7961, type: 'village' },
  { id: 'v3', name: 'Sankarankovil', lat: 9.1667, lng: 77.5500, type: 'village' },
  { id: 'v4', name: 'Rajapalayam', lat: 9.4494, lng: 77.5578, type: 'village' },
  { id: 'v5', name: 'Virudhunagar', lat: 9.5810, lng: 77.9624, type: 'village' },
]

export const COLLEGES: LocationCoord[] = [
  { id: 'c1', name: 'Govt Arts College Sivakasi', lat: 9.4610, lng: 77.8080, type: 'college' },
  { id: 'c2', name: 'NPR College Dindigul', lat: 10.3540, lng: 77.9980, type: 'college' },
  { id: 'c3', name: 'PSN College Tirunelveli', lat: 8.7139, lng: 77.7567, type: 'college' },
  { id: 'c4', name: 'VHNSN College Virudhunagar', lat: 9.5890, lng: 77.9700, type: 'college' },
]

export const SAMPLE_BUSES = [
  {
    id: 'b1', number: 'TN 72 B 1234', route: 'Kovilpatti – Sivakasi',
    capacity: 50, available: 18, occupied: 32, type: 'public',
    departureTime: '07:30', pickupPoint: 'Kovilpatti Bus Stand',
    status: 'available', trafficLevel: 'low'
  },
  {
    id: 'b2', number: 'TN 72 B 5678', route: 'Sankarankovil – Sivakasi',
    capacity: 45, available: 5, occupied: 40, type: 'public',
    departureTime: '07:00', pickupPoint: 'Sankarankovil Market',
    status: 'available', trafficLevel: 'medium'
  },
  {
    id: 'b3', number: 'TN 58 N 2345', route: 'Rajapalayam – Tirunelveli',
    capacity: 55, available: 22, occupied: 33, type: 'public',
    departureTime: '07:15', pickupPoint: 'Rajapalayam Bus Depot',
    status: 'available', trafficLevel: 'low'
  },
  {
    id: 'b4', number: 'TN 72 C 3456', route: 'Virudhunagar – Sivakasi',
    capacity: 50, available: 0, occupied: 50, type: 'public',
    departureTime: '07:45', pickupPoint: 'Virudhunagar Town Bus Stand',
    status: 'full', trafficLevel: 'high'
  },
  {
    id: 'b5', number: 'TN 58 B 7890', route: 'Kovilpatti – Tirunelveli',
    capacity: 60, available: 15, occupied: 45, type: 'public',
    departureTime: '08:00', pickupPoint: 'Kovilpatti New Bus Stand',
    status: 'available', trafficLevel: 'medium'
  },
]

export const PRIVATE_VEHICLES = [
  {
    id: 'p1', number: 'TN 72 AK 4321', type: 'Private Bus',
    capacity: 30, available: 12, occupied: 18, category: 'private',
    cost: 25, pickupPoint: 'Sivakasi Main Road', status: 'available'
  },
  {
    id: 'p2', number: 'TN 72 R 9876', type: 'Auto Rickshaw',
    capacity: 6, available: 2, occupied: 4, category: 'private',
    cost: 40, pickupPoint: 'Kovilpatti Market', status: 'available'
  },
  {
    id: 'p3', number: 'TN 58 E 5555', type: 'Shared Van',
    capacity: 12, available: 5, occupied: 7, category: 'private',
    cost: 30, pickupPoint: 'Rajapalayam Temple Road', status: 'available'
  },
]

export const DEMAND_PREDICTIONS = [
  { route: 'Kovilpatti – Govt Arts College Sivakasi', predicted: 120, available: 90, shortage: 30 },
  { route: 'Sankarankovil – PSN College Tirunelveli', predicted: 70, available: 80, shortage: 0 },
  { route: 'Rajapalayam – PSN College Tirunelveli', predicted: 100, available: 60, shortage: 40 },
  { route: 'Virudhunagar – VHNSN College', predicted: 85, available: 100, shortage: 0 },
]

export const ADMIN_STATS = {
  totalStudents: 487,
  publicBuses: 5,
  privateVehicles: 3,
  totalOccupiedSeats: 170,
  totalAvailableSeats: 72,
  activeRoutes: 8,
  emergencyAllocations: 2,
}

