'use client'

import { useState, useEffect } from 'react'
import { supabase, Expert, ExpertIndustry, ExpertAchievement, ExpertAbility, ExpertPhilosophy } from '@/lib/supabase'

interface ExpertProfileProps {
  expertId: string
}

interface ExpertWithDetails extends Expert {
  industries: ExpertIndustry[]
  achievements: ExpertAchievement[]
  abilities: ExpertAbility[]
  philosophies: ExpertPhilosophy[]
}

export default function ExpertProfile({ expertId = "sample-expert-id" }: ExpertProfileProps) {
  const [expert, setExpert] = useState<ExpertWithDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'philosophy' | 'achievements' | 'abilities'>('philosophy')

  useEffect(() => {
    fetchExpertProfile()
  }, [expertId])

  const fetchExpertProfile = async () => {
    try {
      // Fetch expert basic info
      const { data: expertData, error: expertError } = await supabase
        .from('experts')
        .select('*')
        .eq('id', expertId)
        .single()

      if (expertError) {
        console.error('Error fetching expert:', expertError)
        // Use mock data for demo
        setExpert(getMockExpert())
        setLoading(false)
        return
      }

      // Fetch related data
      const [industriesRes, achievementsRes, abilitiesRes, philosophiesRes] = await Promise.all([
        supabase.from('expert_industries').select('*').eq('expert_id', expertId),
        supabase.from('expert_achievements').select('*').eq('expert_id', expertId),
        supabase.from('expert_abilities').select('*').eq('expert_id', expertId),
        supabase.from('expert_philosophies').select('*').eq('expert_id', expertId)
      ])

      setExpert({
        ...expertData,
        industries: industriesRes.data || [],
        achievements: achievementsRes.data || [],
        abilities: abilitiesRes.data || [],
        philosophies: philosophiesRes.data || []
      })
    } catch (error) {
      console.error('Error:', error)
      setExpert(getMockExpert())
    } finally {
      setLoading(false)
    }
  }

  const getMockExpert = (): ExpertWithDetails => ({
    id: 'mock-expert-1',
    user_id: 'mock-user-1',
    name: 'Dr. Sarah Chen',
    title: 'AI Strategy & Innovation Leader',
    bio: 'Former VP of AI at Google, now helping companies navigate the AI transformation. 15+ years in tech leadership with expertise in machine learning, product strategy, and organizational change.',
    profile_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80',
    hourly_rate: 500,
    years_experience: 15,
    rating: 4.9,
    total_reviews: 127,
    is_verified: true,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    industries: [
      { id: '1', expert_id: 'mock-expert-1', industry: 'Artificial Intelligence', created_at: '2024-01-01T00:00:00Z' },
      { id: '2', expert_id: 'mock-expert-1', industry: 'Technology Strategy', created_at: '2024-01-01T00:00:00Z' },
      { id: '3', expert_id: 'mock-expert-1', industry: 'Product Management', created_at: '2024-01-01T00:00:00Z' }
    ],
    achievements: [
      {
        id: '1',
        expert_id: 'mock-expert-1',
        title: 'Led AI transformation at Fortune 500 company',
        description: 'Successfully implemented AI-driven solutions that increased operational efficiency by 40%',
        year: 2023,
        organization: 'Google',
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        expert_id: 'mock-expert-1',
        title: 'Published 25+ research papers on ML',
        description: 'Contributed to top-tier conferences including NeurIPS, ICML, and ICLR',
        year: 2022,
        organization: 'Stanford University',
        created_at: '2024-01-01T00:00:00Z'
      }
    ],
    abilities: [
      { id: '1', expert_id: 'mock-expert-1', skill: 'Machine Learning', proficiency_level: 'Expert', created_at: '2024-01-01T00:00:00Z' },
      { id: '2', expert_id: 'mock-expert-1', skill: 'Strategic Planning', proficiency_level: 'Expert', created_at: '2024-01-01T00:00:00Z' },
      { id: '3', expert_id: 'mock-expert-1', skill: 'Team Leadership', proficiency_level: 'Advanced', created_at: '2024-01-01T00:00:00Z' },
      { id: '4', expert_id: 'mock-expert-1', skill: 'Product Strategy', proficiency_level: 'Expert', created_at: '2024-01-01T00:00:00Z' }
    ],
    philosophies: [
      {
        id: '1',
        expert_id: 'mock-expert-1',
        philosophy_type: 'Core Life Philosophy',
        description: 'I believe in the power of continuous learning and adaptation. Technology evolves rapidly, but human-centered design principles remain constant. Success comes from balancing innovation with empathy.',
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        expert_id: 'mock-expert-1',
        philosophy_type: 'Leadership Philosophy',
        description: 'Great leaders create more leaders, not followers. I focus on empowering teams to make autonomous decisions while providing clear vision and support.',
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '3',
        expert_id: 'mock-expert-1',
        philosophy_type: 'Innovation Philosophy',
        description: 'Innovation happens at the intersection of technology and human needs. The best solutions are simple, elegant, and solve real problems that people face every day.',
        created_at: '2024-01-01T00:00:00Z'
      }
    ]
  })

  const getProficiencyColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'bg-purple-100 text-purple-800'
      case 'Advanced': return 'bg-blue-100 text-blue-800'
      case 'Intermediate': return 'bg-green-100 text-green-800'
      case 'Beginner': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading expert profile...</p>
        </div>
      </div>
    )
  }

  if (!expert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Expert not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-start space-x-6">
            <img
              src={expert.profile_image_url || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80'}
              alt={expert.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{expert.name}</h1>
                {expert.is_verified && (
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-xl text-gray-600 mb-3">{expert.title}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span>⭐ {expert.rating} ({expert.total_reviews} reviews)</span>
                <span>💼 {expert.years_experience} years experience</span>
                <span>💰 ${expert.hourly_rate}/hour</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {expert.industries.map((industry) => (
                  <span
                    key={industry.id}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    {industry.industry}
                  </span>
                ))}
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Book Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
          <p className="text-gray-700 leading-relaxed">{expert.bio}</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'philosophy', label: 'Philosophy & Approach', icon: '🧠' },
                { key: 'achievements', label: 'Achievements', icon: '🏆' },
                { key: 'abilities', label: 'Skills & Abilities', icon: '⚡' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'philosophy' && (
              <div className="space-y-6">
                {expert.philosophies.map((philosophy) => (
                  <div key={philosophy.id} className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {philosophy.philosophy_type}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{philosophy.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                {expert.achievements.map((achievement) => (
                  <div key={achievement.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
                      <span className="text-sm text-gray-500">{achievement.year}</span>
                    </div>
                    {achievement.organization && (
                      <p className="text-blue-600 font-medium mb-2">{achievement.organization}</p>
                    )}
                    <p className="text-gray-700">{achievement.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'abilities' && (
              <div className="grid md:grid-cols-2 gap-4">
                {expert.abilities.map((ability) => (
                  <div key={ability.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{ability.skill}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getProficiencyColor(ability.proficiency_level)}`}>
                      {ability.proficiency_level}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}