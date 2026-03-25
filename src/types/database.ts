// Types generated from Supabase schema
// These will be replaced with auto-generated types from `supabase gen types typescript`

export type UserRole = 'client' | 'admin' | 'super_admin'
export type RentalStatus = 'pending_payment' | 'confirmed' | 'active' | 'completed' | 'cancelled'
export type PaymentStatus = 'pending' | 'processing' | 'approved' | 'rejected' | 'refunded'
export type InvoiceStatus = 'draft' | 'sent_to_set' | 'approved' | 'rejected' | 'cancelled'
export type MachineryStatus = 'available' | 'rented' | 'maintenance' | 'inactive'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  company: string | null
  ruc: string | null
  phone: string | null
  avatar_url: string | null
  role: UserRole
  address: string | null
  city: string | null
  billing_name: string | null
  billing_ruc: string | null
  billing_address: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface MachineryCategory {
  id: string
  name: string
  slug: string
  description: string | null
  icon_url: string | null
  created_at: string
}

export interface Machinery {
  id: string
  category_id: string
  name: string
  slug: string
  brand: string
  model: string
  year: number | null
  serial_number: string | null
  description: string | null
  specifications: Record<string, unknown> | null
  images: string[]
  price_per_hour: number
  price_per_day: number
  price_per_week: number
  price_per_month: number
  deposit_amount: number
  status: MachineryStatus
  is_featured: boolean
  horse_power: number | null
  weight_kg: number | null
  fuel_type: string | null
  load_capacity_kg: number | null
  max_speed_kmh: number | null
  created_at: string
  updated_at: string
  category?: MachineryCategory
}

export interface Rental {
  id: string
  rental_number: string
  user_id: string
  machinery_id: string
  status: RentalStatus
  start_date: string
  end_date: string
  rate_type: string
  rate_amount: number
  subtotal: number
  iva_amount: number
  deposit_amount: number
  total_amount: number
  delivery_type: string | null
  delivery_address: string | null
  delivery_notes: string | null
  notes: string | null
  created_at: string
  updated_at: string
  machinery?: Machinery
}

export interface Payment {
  id: string
  rental_id: string
  shop_process_id: string
  bancard_process_id: string | null
  amount: number
  currency: string
  status: PaymentStatus
  bancard_response: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  rental_id: string
  invoice_number: string
  cdc: string | null
  xml_content: string | null
  qr_code: string | null
  pdf_url: string | null
  status: InvoiceStatus
  emitter_ruc: string
  emitter_name: string
  receiver_ruc: string
  receiver_name: string
  subtotal: number
  iva_amount: number
  total_amount: number
  timbrado: string
  created_at: string
}

export interface MachineryTelemetry {
  id: string
  machinery_id: string
  rental_id: string | null
  latitude: number
  longitude: number
  engine_on: boolean
  engine_hours: number
  fuel_level: number
  speed_kmh: number
  fuel_consumption_liters: number
  timestamp: string
}
