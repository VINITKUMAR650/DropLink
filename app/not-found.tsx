import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <FileQuestion className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the page you're looking for. The file might have been moved or deleted.
            </p>
            <div className="space-y-4">
              <Link href="/">
                <Button className="w-full flex items-center justify-center">
                  <Home className="h-4 w-4 mr-2" />
                  Go back home
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full flex items-center justify-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}