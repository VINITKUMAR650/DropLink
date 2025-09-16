'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Application Error
                </h2>
                <p className="text-gray-600 mb-6">
                  A critical error occurred. Please try refreshing the page.
                </p>
                <div className="space-y-4">
                  <Button
                    onClick={reset}
                    className="w-full flex items-center justify-center"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try again
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/'}
                    className="w-full"
                  >
                    Reload Application
                  </Button>
                </div>
                {process.env.NODE_ENV === 'development' && (
                  <details className="mt-6 text-left">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                      Error details (dev only)
                    </summary>
                    <pre className="mt-2 text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto">
                      {error.message}
                      {error.stack && `\n\n${error.stack}`}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}