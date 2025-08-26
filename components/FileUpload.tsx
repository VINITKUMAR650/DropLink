'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Upload, X, CheckCircle, AlertCircle, LogIn } from 'lucide-react'
import { formatFileSize, isValidFileType, getFileIcon } from '@/lib/utils'
import toast from 'react-hot-toast'

interface FileWithProgress {
  file: File
  progress: number
  status: 'uploading' | 'success' | 'error'
  shareId?: string
  error?: string
}

export function FileUpload() {
  const router = useRouter()
  const [files, setFiles] = useState<FileWithProgress[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const user = localStorage.getItem('user')
      setIsLoggedIn(!!user)
    }
    
    checkAuthStatus()
    
    // Listen for auth changes
    window.addEventListener('storage', checkAuthStatus)
    return () => window.removeEventListener('storage', checkAuthStatus)
  }, [])

  const handleUploadClick = () => {
    if (!isLoggedIn) {
      toast.error('Please log in to upload files')
      router.push('/login')
      return
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!isLoggedIn) {
      toast.error('Please log in to upload files')
      router.push('/login')
      return
    }

    const newFiles = acceptedFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }))
    
    setFiles(prev => [...prev, ...newFiles])
    uploadFiles(newFiles)
  }, [isLoggedIn, router])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv'],
      'audio/*': ['.mp3', '.wav', '.flac', '.aac'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/*': ['.txt', '.md', '.json', '.csv'],
      'application/zip': ['.zip'],
      'application/x-rar-compressed': ['.rar'],
    },
    maxSize: 1024 * 1024 * 1024, // 1GB
    multiple: true
  })

  const uploadFiles = async (filesToUpload: FileWithProgress[]) => {
    setIsUploading(true)
    
    // Get user data from localStorage
    const userData = localStorage.getItem('user')
    if (!userData) {
      toast.error('Please log in to upload files')
      router.push('/login')
      setIsUploading(false)
      return
    }

    const user = JSON.parse(userData)
    
    for (const fileWithProgress of filesToUpload) {
      try {
        if (!isValidFileType(fileWithProgress.file)) {
          throw new Error('File type not supported')
        }

        const formData = new FormData()
        formData.append('file', fileWithProgress.file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'x-user-id': user.id, // Send user ID in headers
          },
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Upload failed')
        }

        const result = await response.json()
        
        setFiles(prev => prev.map(f => 
          f.file === fileWithProgress.file 
            ? { ...f, status: 'success', shareId: result.shareId, progress: 100 }
            : f
        ))

        toast.success(`${fileWithProgress.file.name} uploaded successfully!`)
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.file === fileWithProgress.file 
            ? { ...f, status: 'error', error: error instanceof Error ? error.message : 'Upload failed', progress: 0 }
            : f
        ))
        
        toast.error(`Failed to upload ${fileWithProgress.file.name}`)
      }
    }
    
    setIsUploading(false)
  }

  const removeFile = (fileToRemove: File) => {
    setFiles(prev => prev.filter(f => f.file !== fileToRemove))
  }

  const copyShareLink = async (shareId: string) => {
    const link = `${window.location.origin}/download/${shareId}`
    try {
      await navigator.clipboard.writeText(link)
      toast.success('Share link copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Upload Area */}
      <Card>
        {isLoggedIn ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 text-center transition-colors duration-200 cursor-pointer ${
              isDragActive
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400 mb-3 sm:mb-4" />
            <p className="text-base sm:text-lg font-medium text-gray-900 mb-2">
              {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4">
              or click to select files
            </p>
            <p className="text-xs sm:text-sm text-gray-400 px-2">
              Max file size: 1GB • Supported formats: Images, Videos, Audio, Documents, Archives
            </p>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 md:p-8 text-center">
            <LogIn className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400 mb-3 sm:mb-4" />
            <p className="text-base sm:text-lg font-medium text-gray-900 mb-2">
              Login Required to Upload Files
            </p>
            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
              Please sign in to start uploading and sharing your files
            </p>
            <Button onClick={handleUploadClick} className="w-full sm:w-auto">
              Sign In to Upload
            </Button>
          </div>
        )}
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Files</h3>
          <div className="space-y-3">
            {files.map((fileWithProgress, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg space-y-3 sm:space-y-0"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{getFileIcon(fileWithProgress.file.type)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{fileWithProgress.file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(fileWithProgress.file.size)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {fileWithProgress.status === 'uploading' && (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                      <span className="text-sm text-gray-500">Uploading...</span>
                    </div>
                  )}
                  
                  {fileWithProgress.status === 'success' && (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyShareLink(fileWithProgress.shareId!)}
                        className="text-xs sm:text-sm"
                      >
                        Copy Link
                      </Button>
                    </div>
                  )}
                  
                  {fileWithProgress.status === 'error' && (
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <span className="text-sm text-red-500">{fileWithProgress.error}</span>
                    </div>
                  )}
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFile(fileWithProgress.file)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
