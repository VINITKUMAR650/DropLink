'use client'

import { useAuth } from '@/lib/auth'
import { Button } from './Button'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SmartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  href?: string
  children: React.ReactNode
}

const SmartButton = forwardRef<HTMLButtonElement, SmartButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, href, children, ...props }, ref) => {
    const { isLoggedIn } = useAuth()
    const router = useRouter()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (href && isLoggedIn) {
        e.preventDefault()
        // If user is logged in and trying to go to auth pages, redirect to dashboard
        if (href === '/register' || href === '/login') {
          router.push('/dashboard')
          return
        }
      }
      
      // Call original onClick if provided
      if (props.onClick) {
        props.onClick(e)
      }
    }

    if (href) {
      // If user is logged in and trying to go to auth pages, redirect to dashboard
      if (isLoggedIn && (href === '/register' || href === '/login')) {
        return (
          <Button
            ref={ref}
            variant={variant}
            size={size}
            loading={loading}
            className={className}
            onClick={() => router.push('/dashboard')}
            {...props}
          >
            {children}
          </Button>
        )
      }

      return (
        <Link href={href}>
          <Button
            ref={ref}
            variant={variant}
            size={size}
            loading={loading}
            className={className}
            {...props}
          >
            {children}
          </Button>
        </Link>
      )
    }

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        loading={loading}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

SmartButton.displayName = 'SmartButton'

export { SmartButton }
