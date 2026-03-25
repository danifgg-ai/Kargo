'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/stores/useAuthStore'

export function useAuth() {
  const router = useRouter()
  const { user, isLoading, setUser, setLoading, clear } = useAuthStore()

  useEffect(() => {
    const supabase = createClient()

    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()

      if (authUser) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', authUser.id)
          .single()

        if (profile) {
          setUser({
            id: profile.id,
            email: profile.email,
            fullName: profile.full_name,
            company: profile.company,
            ruc: profile.ruc,
            phone: profile.phone,
            avatarUrl: profile.avatar_url,
            role: profile.role,
          })
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === 'SIGNED_IN') {
          await getUser()
        } else if (event === 'SIGNED_OUT') {
          clear()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [setUser, setLoading, clear])

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    clear()
    router.push('/')
  }

  return { user, isLoading, signOut }
}
