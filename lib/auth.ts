'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuthStatus = () => {
      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          const user = JSON.parse(userData)
          setIsLoggedIn(true)
          setUser(user)
        } catch (error) {
          console.error('Error parsing user data:', error)
          localStorage.removeItem('user')
          setIsLoggedIn(false)
          setUser(null)
        }
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
      setLoading(false)
    }

    checkAuthStatus()
    
    // Listen for auth changes
    window.addEventListener('storage', checkAuthStatus)
    return () => window.removeEventListener('storage', checkAuthStatus)
  }, [])

  const logout = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/')
  }

  return { isLoggedIn, user, loading, logout }
}

export function redirectIfAuthenticated() {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        JSON.parse(userData)
        return true // User is authenticated
      } catch (error) {
        localStorage.removeItem('user')
        return false
      }
    }
  }
  return false
}
