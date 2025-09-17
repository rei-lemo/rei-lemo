import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Expert = {
  id: string
  user_id: string
  name: string
  title: string
  bio?: string
  profile_image_url?: string
  hourly_rate?: number
  years_experience?: number
  rating: number
  total_reviews: number
  is_verified: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export type ExpertIndustry = {
  id: string
  expert_id: string
  industry: string
  created_at: string
}

export type ExpertAchievement = {
  id: string
  expert_id: string
  title: string
  description?: string
  year?: number
  organization?: string
  created_at: string
}

export type ExpertAbility = {
  id: string
  expert_id: string
  skill: string
  proficiency_level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  created_at: string
}

export type ExpertPhilosophy = {
  id: string
  expert_id: string
  philosophy_type: string
  description: string
  created_at: string
}

export type Consultation = {
  id: string
  expert_id: string
  user_id: string
  question: string
  response?: string
  status: 'pending' | 'answered' | 'cancelled'
  consultation_type: 'text' | 'voice' | 'video'
  created_at: string
  answered_at?: string
}