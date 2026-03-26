import type { MachineryTelemetry } from '@/types/database'

// Demo telemetry data — Asunción area coordinates
export const demoTelemetry: (MachineryTelemetry & { machinery_name: string; machinery_image: string })[] = [
  {
    id: 't-001',
    machinery_id: '1',
    rental_id: 'r-001',
    machinery_name: 'Bobcat S70',
    machinery_image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=80',
    latitude: -25.2867,
    longitude: -57.6470,
    engine_on: true,
    engine_hours: 342.5,
    fuel_level: 72,
    speed_kmh: 4.2,
    fuel_consumption_liters: 128.3,
    timestamp: '2026-03-26T14:30:00Z',
  },
  {
    id: 't-002',
    machinery_id: '2',
    rental_id: 'r-002',
    machinery_name: 'CAT 226D3',
    machinery_image: 'https://images.unsplash.com/photo-1621922688758-db23b1cec2a4?w=800&q=80',
    latitude: -25.3000,
    longitude: -57.6350,
    engine_on: false,
    engine_hours: 1205.8,
    fuel_level: 45,
    speed_kmh: 0,
    fuel_consumption_liters: 456.1,
    timestamp: '2026-03-26T12:15:00Z',
  },
  {
    id: 't-003',
    machinery_id: '3',
    rental_id: 'r-003',
    machinery_name: 'John Deere 324G',
    machinery_image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    latitude: -25.2750,
    longitude: -57.6150,
    engine_on: true,
    engine_hours: 587.2,
    fuel_level: 88,
    speed_kmh: 7.8,
    fuel_consumption_liters: 234.7,
    timestamp: '2026-03-26T14:28:00Z',
  },
]

// Historical telemetry for charts (last 24h for machine 1)
export const demoTelemetryHistory = Array.from({ length: 24 }, (_, i) => {
  const hour = i
  const isWorkHour = hour >= 7 && hour <= 17
  return {
    hour: `${String(hour).padStart(2, '0')}:00`,
    fuel_level: Math.max(30, 95 - i * 2.5 + (Math.random() * 5 - 2.5)),
    speed_kmh: isWorkHour ? Math.random() * 10 + 2 : 0,
    engine_on: isWorkHour,
    engine_hours: 340 + (isWorkHour ? (i - 7) * 1 : 0),
    fuel_consumption: isWorkHour ? Math.random() * 3 + 1 : 0,
  }
})

// Daily reports for a rental
export const demoDailyReports = [
  { date: '2026-03-20', hours_used: 8.5, fuel_used: 24.3, distance_km: 12.1, alerts: 0 },
  { date: '2026-03-21', hours_used: 9.2, fuel_used: 26.1, distance_km: 15.3, alerts: 0 },
  { date: '2026-03-22', hours_used: 7.0, fuel_used: 19.8, distance_km: 8.7, alerts: 1 },
  { date: '2026-03-23', hours_used: 0, fuel_used: 0, distance_km: 0, alerts: 0 },
  { date: '2026-03-24', hours_used: 10.1, fuel_used: 29.5, distance_km: 18.2, alerts: 0 },
  { date: '2026-03-25', hours_used: 8.8, fuel_used: 25.0, distance_km: 14.5, alerts: 0 },
  { date: '2026-03-26', hours_used: 5.5, fuel_used: 15.2, distance_km: 9.3, alerts: 0 },
]
