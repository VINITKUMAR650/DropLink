'use client'

'use client'

import { useAuth } from '@/lib/auth'
import { getReturnUrl, createLoginUrl, createRegisterUrl } from '@/lib/redirectUtils'
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
  ({ className, variant = 'primary', size = 'md', loading = false, href, children, onClick, ...props }, ref) => {
    const { isLoggedIn } = useAuth()
    const router = useRouter()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (href && isLoggedIn) {
        e.preventDefault();
        // If user is logged in and trying to go to auth pages, redirect to return URL or dashboard
        if (href === '/register' || href === '/login') {
          const searchParams = new URLSearchParams(window.location.search);
          const returnUrl = getReturnUrl(searchParams);
          router.push(returnUrl);
          return;
        }
      }
      
      // If user is not logged in and trying to access auth pages, add return URL
      if (href && !isLoggedIn && (href === '/register' || href === '/login')) {
        e.preventDefault();
        const redirectUrl = href === '/register' ? createRegisterUrl() : createLoginUrl();
        router.push(redirectUrl);
        return;
      }
      
      // Call original onClick if provided
      if (onClick) {
        onClick(e);
      }
    }

    if (href) {
      // If user is logged in and trying to go to auth pages, redirect to return URL or dashboard
      if (isLoggedIn && (href === '/register' || href === '/login')) {
        return (
          <Button
            ref={ref}
            variant={variant}
            size={size}
            loading={loading}
            className={className}
            onClick={() => {
              const searchParams = new URLSearchParams(window.location.search);
              const returnUrl = getReturnUrl(searchParams);
              router.push(returnUrl);
            }}
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
      >
        {children}
      </Button>
    )
  }
)

SmartButton.displayName = 'SmartButton'

export { SmartButton }
