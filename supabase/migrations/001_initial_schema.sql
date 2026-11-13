-- ==============================================================================
-- ROUTELESS AI – THE LAST MILE
-- AI-Powered Rural Student Transportation Management System
-- Database Schema, RLS Security Policies, and Initial Seed Data
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('student', 'admin', 'driver')),
  village TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- 3. Vehicles Table
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_number TEXT UNIQUE NOT NULL,
  vehicle_type TEXT NOT NULL,
  transport_category TEXT NOT NULL CHECK (transport_category IN ('public', 'private')),
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  available_seats INTEGER NOT NULL DEFAULT 0,
  occupied_seats INTEGER NOT NULL DEFAULT 0,
  driver_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  availability_status TEXT NOT NULL DEFAULT 'available' CHECK (availability_status IN ('available', 'full', 'unavailable', 'breakdown')),
  route TEXT,
  departure_time TEXT,
  pickup_point TEXT,
  estimated_cost DECIMAL(8,2),
  traffic_level TEXT DEFAULT 'low' CHECK (traffic_level IN ('low', 'medium', 'high')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT seats_check CHECK (available_seats + occupied_seats <= capacity)
);

-- 4. Routes Table
CREATE TABLE IF NOT EXISTS public.routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT NOT NULL,
  destination TEXT NOT NULL,
  distance DECIMAL(8,2),
  estimated_duration INTEGER,
  route_status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Route Stops Table
CREATE TABLE IF NOT EXISTS public.route_stops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_id UUID REFERENCES public.routes(id) ON DELETE CASCADE,
  stop_name TEXT NOT NULL,
  latitude DECIMAL(10,7) NOT NULL,
  longitude DECIMAL(10,7) NOT NULL,
  stop_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Student Trips Table
CREATE TABLE IF NOT EXISTS public.student_trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  route_id UUID REFERENCES public.routes(id),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  pickup_point TEXT,
  destination TEXT,
  travel_date DATE NOT NULL,
  trip_status TEXT DEFAULT 'scheduled' CHECK (trip_status IN ('scheduled', 'waiting', 'in_transit', 'delayed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Vehicle Locations Table
CREATE TABLE IF NOT EXISTS public.vehicle_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  latitude DECIMAL(10,7) NOT NULL,
  longitude DECIMAL(10,7) NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Demand Predictions Table
CREATE TABLE IF NOT EXISTS public.demand_predictions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_id UUID REFERENCES public.routes(id),
  predicted_students INTEGER NOT NULL,
  available_capacity INTEGER NOT NULL,
  predicted_shortage INTEGER NOT NULL DEFAULT 0,
  prediction_period TEXT NOT NULL,
  explanation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Emergency Events Table
CREATE TABLE IF NOT EXISTS public.emergency_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL DEFAULT 'breakdown',
  affected_students INTEGER NOT NULL DEFAULT 0,
  reassigned_students INTEGER NOT NULL DEFAULT 0,
  unassigned_students INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Login Activity Table
CREATE TABLE IF NOT EXISTS public.login_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  login_timestamp TIMESTAMPTZ DEFAULT NOW(),
  logout_timestamp TIMESTAMPTZ,
  session_status TEXT DEFAULT 'active'
);

-- 11. Traffic Information Table
CREATE TABLE IF NOT EXISTS public.traffic_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route_id UUID REFERENCES public.routes(id) ON DELETE CASCADE,
  traffic_level TEXT CHECK (traffic_level IN ('low', 'medium', 'high')),
  estimated_delay INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.route_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demand_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_info ENABLE ROW LEVEL SECURITY;

-- Users RLS
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Allow insert on register" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Vehicles RLS
CREATE POLICY "Anyone can view vehicles" ON public.vehicles
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage vehicles" ON public.vehicles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Routes & Stops RLS
CREATE POLICY "Anyone can view routes" ON public.routes
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage routes" ON public.routes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Anyone can view route stops" ON public.route_stops
  FOR SELECT USING (true);

-- Student Trips RLS
CREATE POLICY "Students view own trips" ON public.student_trips
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can insert trips" ON public.student_trips
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Admins manage all trips" ON public.student_trips
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Demand Predictions RLS
CREATE POLICY "Anyone can view predictions" ON public.demand_predictions
  FOR SELECT USING (true);

CREATE POLICY "Admins manage predictions" ON public.demand_predictions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Emergency Events RLS
CREATE POLICY "Anyone can view emergencies" ON public.emergency_events
  FOR SELECT USING (true);

CREATE POLICY "Admins manage emergencies" ON public.emergency_events
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Traffic Info RLS
CREATE POLICY "Anyone can view traffic" ON public.traffic_info
  FOR SELECT USING (true);

-- Login Activity RLS
CREATE POLICY "Users view own login activity" ON public.login_activity
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins view all login activity" ON public.login_activity
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- 1. Routes
INSERT INTO public.routes (id, source, destination, distance, estimated_duration, route_status) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Kovilpatti', 'Sivakasi', 28.5, 55, 'active'),
  ('a1b2c3d4-0001-4000-8000-000000000002', 'Sankarankovil', 'Sivakasi', 45.2, 80, 'active'),
  ('a1b2c3d4-0001-4000-8000-000000000003', 'Rajapalayam', 'Tirunelveli', 55.0, 90, 'active'),
  ('a1b2c3d4-0001-4000-8000-000000000004', 'Virudhunagar', 'Sivakasi', 20.0, 40, 'active'),
  ('a1b2c3d4-0001-4000-8000-000000000005', 'Kovilpatti', 'Tirunelveli', 72.0, 110, 'active')
ON CONFLICT (id) DO NOTHING;

-- 2. Route Stops
INSERT INTO public.route_stops (route_id, stop_name, latitude, longitude, stop_order) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Kovilpatti Bus Stand', 9.1727, 77.8692, 1),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Ettayapuram Junction', 9.2500, 77.8800, 2),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Sivakasi Main Stand', 9.4529, 77.7961, 3),
  ('a1b2c3d4-0001-4000-8000-000000000002', 'Sankarankovil Market', 9.1667, 77.5500, 1),
  ('a1b2c3d4-0001-4000-8000-000000000002', 'Watrap Junction', 9.2900, 77.6500, 2),
  ('a1b2c3d4-0001-4000-8000-000000000002', 'Sivakasi Depot', 9.4529, 77.7961, 3),
  ('a1b2c3d4-0001-4000-8000-000000000003', 'Rajapalayam Bus Depot', 9.4494, 77.5578, 1),
  ('a1b2c3d4-0001-4000-8000-000000000003', 'Srivilliputhur Stop', 9.5100, 77.6400, 2),
  ('a1b2c3d4-0001-4000-8000-000000000003', 'Tirunelveli Junction', 8.7139, 77.7567, 3),
  ('a1b2c3d4-0001-4000-8000-000000000004', 'Virudhunagar Town Stand', 9.5810, 77.9624, 1),
  ('a1b2c3d4-0001-4000-8000-000000000004', 'Vembakottai Route', 9.5100, 77.8900, 2),
  ('a1b2c3d4-0001-4000-8000-000000000004', 'Sivakasi East Gate', 9.4529, 77.8100, 3),
  ('a1b2c3d4-0001-4000-8000-000000000005', 'Kovilpatti New Stand', 9.1727, 77.8692, 1),
  ('a1b2c3d4-0001-4000-8000-000000000005', 'Kayathar Junction', 8.9500, 77.7800, 2),
  ('a1b2c3d4-0001-4000-8000-000000000005', 'Tirunelveli Central', 8.7139, 77.7567, 3)
ON CONFLICT DO NOTHING;

-- 3. Vehicles (Public & Private)
INSERT INTO public.vehicles (id, vehicle_number, vehicle_type, transport_category, capacity, available_seats, occupied_seats, availability_status, route, departure_time, pickup_point, traffic_level) VALUES
  ('b1b2c3d4-0002-4000-8000-000000000001', 'TN 72 B 1234', 'Government Bus', 'public', 50, 18, 32, 'available', 'Kovilpatti – Sivakasi', '07:30', 'Kovilpatti Bus Stand', 'low'),
  ('b1b2c3d4-0002-4000-8000-000000000002', 'TN 72 B 5678', 'Government Bus', 'public', 45, 5, 40, 'available', 'Sankarankovil – Sivakasi', '07:00', 'Sankarankovil Market', 'medium'),
  ('b1b2c3d4-0002-4000-8000-000000000003', 'TN 58 N 2345', 'Government Bus', 'public', 55, 22, 33, 'available', 'Rajapalayam – Tirunelveli', '07:15', 'Rajapalayam Bus Depot', 'low'),
  ('b1b2c3d4-0002-4000-8000-000000000004', 'TN 72 C 3456', 'Government Bus', 'public', 50, 0, 50, 'full', 'Virudhunagar – Sivakasi', '07:45', 'Virudhunagar Town Bus Stand', 'high'),
  ('b1b2c3d4-0002-4000-8000-000000000005', 'TN 58 B 7890', 'Government Bus', 'public', 60, 15, 45, 'available', 'Kovilpatti – Tirunelveli', '08:00', 'Kovilpatti New Bus Stand', 'medium'),
  ('b1b2c3d4-0002-4000-8000-000000000006', 'TN 72 AK 4321', 'Private Bus', 'private', 30, 12, 18, 'available', 'Sivakasi – College Route', '07:30', 'Sivakasi Main Road', 'low'),
  ('b1b2c3d4-0002-4000-8000-000000000007', 'TN 72 R 9876', 'Auto Rickshaw', 'private', 6, 2, 4, 'available', 'Kovilpatti Local', '08:00', 'Kovilpatti Market', 'low'),
  ('b1b2c3d4-0002-4000-8000-000000000008', 'TN 58 E 5555', 'Shared Van', 'private', 12, 5, 7, 'available', 'Rajapalayam – Tirunelveli', '07:45', 'Rajapalayam Temple Road', 'medium')
ON CONFLICT (id) DO NOTHING;

-- 4. Traffic Information
INSERT INTO public.traffic_info (route_id, traffic_level, estimated_delay) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'low', 0),
  ('a1b2c3d4-0001-4000-8000-000000000002', 'medium', 15),
  ('a1b2c3d4-0001-4000-8000-000000000003', 'low', 0),
  ('a1b2c3d4-0001-4000-8000-000000000004', 'high', 25),
  ('a1b2c3d4-0001-4000-8000-000000000005', 'medium', 10)
ON CONFLICT DO NOTHING;

-- 5. Demand Predictions
INSERT INTO public.demand_predictions (route_id, predicted_students, available_capacity, predicted_shortage, prediction_period, explanation) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 120, 90, 30, '2026-11-14', 'High demand predicted based on Monday travel surge. Historical average: 115 students. Pre-exam schedule detected. 30 student shortage expected.'),
  ('a1b2c3d4-0001-4000-8000-000000000002', 70, 80, 0, '2026-11-14', 'Normal demand expected. Historical average: 68 students. Available capacity is sufficient.'),
  ('a1b2c3d4-0001-4000-8000-000000000003', 100, 60, 40, '2026-11-14', 'Critical shortage predicted. Exam period at PSN College Tirunelveli. Demand 35% higher. Deploy 1 extra vehicle recommended.'),
  ('a1b2c3d4-0001-4000-8000-000000000004', 85, 100, 0, '2026-11-14', 'Capacity adequate. Heavy traffic (+25 min delay) requires early student departure warnings.'),
  ('a1b2c3d4-0001-4000-8000-000000000005', 60, 75, 0, '2026-11-14', 'Comfortable surplus. Regular commuter load expected.')
ON CONFLICT DO NOTHING;
