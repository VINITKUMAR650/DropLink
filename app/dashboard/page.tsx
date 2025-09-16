'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { formatFileSize, getFileIcon, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Header } from '@/components/Header'
import { 
  Upload, 
  Download, 
  Trash2, 
  Copy, 
  Calendar, 
  HardDrive,
  Plus,
  Search
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface File {
  id: string
  filename: string
  originalName: string
  size: number
  mimeType: string
  shareId: string
  downloadCount: number
  createdAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [uploadingFiles, setUploadingFiles] = useState<Array<{file: File, progress: number, status: 'uploading' | 'success' | 'error'}>>([])
  const [isDragOver, setIsDragOver] = useState(false)

  // Ensure files is always an array
  const safeFiles = files || []

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (!userData) {
      toast.error('Please log in to access your dashboard')
      router.push('/login')
      return
    }

    const user = JSON.parse(userData)
    setUser(user)
    
    // Fetch user's files
    fetchUserFiles()
  }, [router])

  const fetchUserFiles = async () => {
    try {
      // Get user data from localStorage
      const userData = localStorage.getItem('user')
      if (!userData) {
        toast.error('Please log in to access your dashboard')
        router.push('/login')
        return
      }

      const user = JSON.parse(userData)
      const response = await fetch(`/api/files?userId=${user.id}`)
      if (response.ok) {
        const data = await response.json()
        // Ensure we only set valid files
        const validFiles = data.files?.filter(file => 
          file && 
          file.id && 
          file.size !== undefined && 
          file.downloadCount !== undefined &&
          file.mimeType &&
          file.originalName &&
          file.shareId &&
          file.createdAt
        ) || []
        setFiles(validFiles)
      }
    } catch (error) {
      console.error('Error fetching files:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    // Check if user is logged in
    if (!user || !user.id) {
      toast.error('Please log in to upload files')
      router.push('/login')
      return
    }
    
    // Add files to uploading state
    const newUploadingFiles = Array.from(selectedFiles).map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }))
    
    setUploadingFiles(prev => [...prev, ...newUploadingFiles])
    
    // Upload each file
    for (const uploadFile of newUploadingFiles) {
      uploadSingleFile(uploadFile, user)
    }
    
    // Clear the input
    event.target.value = ''
    
    // Remove uploaded files from uploading state after a delay
    setTimeout(() => {
      setUploadingFiles(prev => prev.filter(f => f.status !== 'success'))
    }, 3000)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    if (droppedFiles.length === 0) {
      toast.error('No files were dropped')
      return
    }

    // Validate files
    const validFiles = droppedFiles.filter(file => {
      if (file.size > 1024 * 1024 * 1024) { // 1GB limit
        toast.error(`${file.name} is too large. Maximum size is 1GB`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) {
      toast.error('No valid files to upload')
      return
    }

    // Check if user is logged in
    if (!user || !user.id) {
      toast.error('Please log in to upload files')
      router.push('/login')
      return
    }

    // Add files to uploading state
    const newUploadingFiles = validFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }))
    
    setUploadingFiles(prev => [...prev, ...newUploadingFiles])
    
    // Upload each dropped file
    for (const uploadFile of newUploadingFiles) {
      uploadSingleFile(uploadFile, user)
    }
  }

  const uploadSingleFile = async (uploadFile: {file: File, progress: number, status: 'uploading' | 'success' | 'error'}, user: any) => {
    try {
      // Debug: Log user data
      console.log('Uploading file:', uploadFile.file.name)
      console.log('User data:', user)
      console.log('User ID:', user?.id)

      if (!user || !user.id) {
        throw new Error('User not authenticated')
      }

      // Update progress to show upload starting
      setUploadingFiles(prev => prev.map(f => 
        f.file === uploadFile.file ? { ...f, progress: 10 } : f
      ))

      const formData = new FormData()
      formData.append('file', uploadFile.file)
      formData.append('userId', user.id)

      // Debug: Log form data
      console.log('FormData userId:', user.id)
      console.log('File size:', uploadFile.file.size)
      console.log('File type:', uploadFile.file.type)

      // Update progress to show upload in progress
      setUploadingFiles(prev => prev.map(f => 
        f.file === uploadFile.file ? { ...f, progress: 50 } : f
      ))

      console.log('Sending request to /api/upload')
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'x-user-id': user.id
        },
        body: formData
      })

      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)

      if (response.ok) {
        const result = await response.json()
        console.log('Upload success result:', result)
        
        // Update upload status to success
        setUploadingFiles(prev => prev.map(f => 
          f.file === uploadFile.file ? { ...f, status: 'success', progress: 100 } : f
        ))
        
        // Add new file to files list
        setFiles(prev => [...prev, result.file])
        
        toast.success(`${uploadFile.file.name} uploaded successfully!`)
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error('Upload API error:', errorData)
        throw new Error(errorData.error || `Upload failed with status ${response.status}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      
      // Update upload status to error
      setUploadingFiles(prev => prev.map(f => 
        f.file === uploadFile.file ? { ...f, status: 'error' } : f
      ))
      
      toast.error(`Failed to upload ${uploadFile.file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleDeleteFile = async (shareId: string) => {
    if (!confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
      return
    }

    try {
      // Get user data from localStorage
      const userData = localStorage.getItem('user')
      if (!userData) {
        toast.error('Please log in to delete files')
        router.push('/login')
        return
      }

      const user = JSON.parse(userData)
      
      const response = await fetch(`/api/files/${shareId}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': user.id,
        },
      })

      if (response.ok) {
        // Remove file from local state
        setFiles(prev => prev.filter(file => file.shareId !== shareId))
        toast.success('File deleted successfully')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete file')
      }
    } catch (error) {
      console.error('Error deleting file:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to delete file')
    }
  }

  const totalFiles = safeFiles.filter(file => file && file.size !== undefined).length
  const totalSize = safeFiles
    .filter(file => file && file.size !== undefined)
    .reduce((acc, file) => acc + (file.size || 0), 0)
  const totalDownloads = safeFiles
    .filter(file => file && file.downloadCount !== undefined)
    .reduce((acc, file) => acc + (file.downloadCount || 0), 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {user?.name}! Manage your uploaded files and track downloads
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <div className="flex items-center p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Files</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalFiles}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <Download className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Downloads</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalDownloads}</p>
              </div>
            </div>
          </Card>

          <Card className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <HardDrive className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Storage Used</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatFileSize(totalSize)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-3 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Your Files</h2>
        </div>

        {/* Unified Upload Area - Drag & Drop + Click + Progress */}
        <div className="mb-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
              isDragOver 
                ? 'border-blue-500 bg-blue-50 border-solid' 
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload-input')?.click()}
          >
            <input
              id="file-upload-input"
              type="file"
              multiple
              accept="image/*,video/*,audio/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/*,application/zip,application/x-rar-compressed"
              className="hidden"
              onChange={handleFileSelect}
            />
            <div className="flex flex-col items-center">
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {isDragOver ? 'Drop files here' : 'Drag & drop files here'}
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse files
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Max file size: 1GB</span>
                <span>•</span>
                <span>Multiple files supported</span>
              </div>
              <div className="mt-3 text-xs text-gray-400">
                Supported: Images, Videos, Audio, Documents, Archives
              </div>
            </div>
          </div>

          {/* Upload Progress Inside Upload Area */}
          {uploadingFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadingFiles.map((uploadFile, index) => (
                <div key={index} className="bg-white rounded-lg border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {uploadFile.file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {uploadFile.status === 'uploading' ? 'Uploading...' : 
                       uploadFile.status === 'success' ? 'Complete' : 'Failed'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        uploadFile.status === 'success' ? 'bg-green-500' :
                        uploadFile.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${uploadFile.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Files List */}
        {safeFiles.length > 0 && (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-sm sm:text-base">File</th>
                    <th className="hidden sm:table-cell text-left py-3 px-4 font-medium text-gray-900">Size</th>
                    <th className="hidden sm:table-cell text-left py-3 px-4 font-medium text-gray-900">Downloads</th>
                    <th className="hidden lg:table-cell text-left py-3 px-4 font-medium text-gray-900">Uploaded</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-sm sm:text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {safeFiles.map((file) => (
                    <tr key={file.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <div className="flex items-center">
                          <span className="text-xl sm:text-2xl mr-2 sm:mr-3">
                            {(() => {
                              try {
                                return getFileIcon(file.mimeType || 'application/octet-stream')
                              } catch (error) {
                                return '📁' // Default file icon
                              }
                            })()}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{file.originalName || 'Unknown'}</p>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                              {file.shareId || 'N/A'}
                            </p>
                            <div className="sm:hidden mt-1">
                              <p className="text-xs text-gray-600">{formatFileSize(file.size || 0)} • {file.downloadCount || 0} downloads</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell py-3 sm:py-4 px-4 text-gray-600 text-sm">
                        {formatFileSize(file.size || 0)}
                      </td>
                      <td className="hidden sm:table-cell py-3 sm:py-4 px-4 text-gray-600 text-sm">
                        {file.downloadCount || 0}
                      </td>
                      <td className="hidden lg:table-cell py-3 sm:py-4 px-4 text-gray-600 text-sm">
                        {(() => {
                          try {
                            return formatDate(file.createdAt || new Date())
                          } catch (error) {
                            return 'Unknown'
                          }
                        })()}
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const link = `${process.env.NEXT_PUBLIC_APP_URL}/download/${file.shareId}`
                              navigator.clipboard.writeText(link)
                            }}
                            className="text-xs sm:text-sm"
                          >
                            <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="hidden sm:inline">Copy Link</span>
                            <span className="sm:hidden">Copy</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteFile(file.shareId)}
                            className="text-xs sm:text-sm text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="hidden sm:inline">Delete</span>
                            <span className="sm:hidden">Del</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
