'use client'

import { useState, useEffect } from 'react'
import { formatFileSize, getFileIcon, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { 
  Download, 
  Calendar, 
  HardDrive, 
  User, 
  AlertCircle, 
  Shield,
  Clock,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react'
import Link from 'next/link'

interface FileInfo {
  id: string
  filename: string
  originalName: string
  size: number
  mimeType: string
  shareId: string
  hasPassword: boolean
  expiresAt: string | null
  downloadCount: number
  createdAt: string
  user: {
    name: string | null
    email: string
  } | null
}

interface DownloadPageProps {
  params: {
    shareId: string
  }
}

export default function DownloadPage({ params }: DownloadPageProps) {
  const { shareId } = params
  const [file, setFile] = useState<FileInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    fetchFileInfo()
  }, [shareId])

  const fetchFileInfo = async () => {
    try {
      const response = await fetch(`/api/files/${shareId}`)
      const data = await response.json()

      if (!response.ok) {
        if (response.status === 404) {
          setError('File not found')
        } else if (response.status === 410) {
          setError('File has expired')
        } else {
          setError(data.error || 'Failed to load file')
        }
        return
      }

      setFile(data)
      setShowPasswordInput(data.hasPassword)
    } catch (error) {
      setError('Failed to load file')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const downloadUrl = file?.hasPassword
        ? `/api/download/${shareId}?password=${encodeURIComponent(password)}`
        : `/api/download/${shareId}`
      
      window.location.href = downloadUrl
    } finally {
      setTimeout(() => setDownloading(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
        
        <Card className="max-w-md w-full text-center bg-white/80 backdrop-blur-sm shadow-xl border-0 relative">
          <div className="p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading file...</h3>
            <p className="text-gray-600">Please wait while we fetch your file</p>
          </div>
        </Card>
      </div>
    )
  }

  if (error || !file) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
        
        <Card className="max-w-md w-full text-center bg-white/80 backdrop-blur-sm shadow-xl border-0 relative">
          <div className="p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {error === 'File has expired' ? 'File Expired' : 'File Not Found'}
            </h1>
            <p className="text-gray-600 mb-6">
              {error === 'File has expired'
                ? 'This file has expired and is no longer available for download.'
                : 'The file you are looking for does not exist or has been removed.'}
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all">
                Go Home
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  const isExpired = file.expiresAt && new Date(file.expiresAt) < new Date()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <Card className="max-w-lg w-full bg-white/80 backdrop-blur-sm shadow-xl border-0 relative">
        <div className="p-8">
          {/* File Icon and Title */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-4xl">{getFileIcon(file.mimeType)}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {file.originalName}
            </h1>
            <p className="text-gray-600">
              Ready to download from DropLink
            </p>
          </div>

          {/* File Information */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <HardDrive className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-700">File Size</span>
              </div>
              <span className="font-bold text-gray-900">
                {formatFileSize(file.size)}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="font-medium text-gray-700">Uploaded</span>
              </div>
              <span className="font-bold text-gray-900">
                {formatDate(file.createdAt)}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Download className="h-5 w-5 text-purple-600" />
                </div>
                <span className="font-medium text-gray-700">Downloads</span>
              </div>
              <span className="font-bold text-gray-900">
                {file.downloadCount}
              </span>
            </div>

            {file.user && (
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="font-medium text-gray-700">Shared by</span>
                </div>
                <span className="font-bold text-gray-900 truncate max-w-32">
                  {file.user.name || file.user.email}
                </span>
              </div>
            )}
          </div>

          {/* Password Input */}
          {showPasswordInput && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Shield className="inline h-4 w-4 mr-1" />
                Password Required
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password to download"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Expiry Warning */}
          {file.expiresAt && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-sm text-yellow-800">
                  {isExpired 
                    ? 'This file has expired'
                    : `Expires on ${formatDate(file.expiresAt)}`
                  }
                </span>
              </div>
            </div>
          )}

          {/* Download Actions */}
          <div className="space-y-4">
            <Button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
              disabled={(showPasswordInput && !password) || isExpired || downloading}
              loading={downloading}
            >
              {downloading ? (
                'Preparing Download...'
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Download File
                </>
              )}
            </Button>
            
            <Link href="/" className="block">
              <Button variant="outline" className="w-full border-2 hover:bg-gray-50 transition-all">
                Upload Your Own File
              </Button>
            </Link>
          </div>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center text-xs text-gray-500">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              <span>
                This file was securely shared via DropLink - Professional File Sharing Platform
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}