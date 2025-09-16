import { prisma } from '@/lib/db'
import { formatFileSize, getFileIcon, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Download, Calendar, HardDrive, User, AlertCircle } from 'lucide-react'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface DownloadPageProps {
  params: {
    shareId: string
  }
}

export default async function DownloadPage({ params }: DownloadPageProps) {
  const { shareId } = params

  // Find the file in the database
  const file = await prisma.file.findUnique({
    where: { shareId },
    include: { user: true }
  })

  if (!file) {
    notFound()
  }

  // Check if file has expired
  if (file.expiresAt && new Date() > file.expiresAt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center mx-4">
          <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-red-500 mx-auto mb-3 sm:mb-4" />
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            File Expired
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            This file has expired and is no longer available for download.
          </p>
          <Link href="/">
            <Button className="w-full sm:w-auto">
              Go Home
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  // Increment download count
  await prisma.file.update({
    where: { id: file.id },
    data: { downloadCount: { increment: 1 } }
  })

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full mx-4">
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">{getFileIcon(file.mimeType)}</div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {file.originalName}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Ready to download
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <HardDrive className="h-4 w-4 text-gray-500" />
              <span className="text-xs sm:text-sm text-gray-600">File Size</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-900">
              {formatFileSize(file.size)}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-xs sm:text-sm text-gray-600">Uploaded</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-900">
              {formatDate(file.createdAt)}
            </span>
          </div>

          {file.user && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-xs sm:text-sm text-gray-600">Shared by</span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                {file.user.name || file.user.email}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <a
            href={`/api/download/${shareId}`}
            download={file.originalName}
            className="w-full"
          >
            <Button className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Download File
            </Button>
          </a>
          
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              Upload Your Own File
            </Button>
          </Link>
        </div>

        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            This file was shared via DropLink - Universal File Sharing Platform
          </p>
        </div>
      </Card>
    </div>
  )
}
