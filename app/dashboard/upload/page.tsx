'use client'

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/Header';
import { 
  Upload, 
  X, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft, 
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import { formatFileSize, isValidFileType, getFileIcon } from '@/lib/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

interface FileWithProgress {
  file: File
  progress: number
  status: 'uploading' | 'success' | 'error'
  shareId?: string
  error?: string
}

export default function DashboardUploadPage() {
  const router = useRouter()
  const [files, setFiles] = useState<FileWithProgress[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Check authentication status
  useEffect(() => {
    // Check Supabase auth
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        toast.error('Please log in to upload files');
        router.push('/login');
        return;
      }
      setUser(data.user);
      setIsLoggedIn(true);
    };
    checkAuth();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [router]);

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
    setIsUploading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      toast.error('Please log in to upload files');
      router.push('/login');
      setIsUploading(false);
      return;
    }
    for (const fileWithProgress of filesToUpload) {
      try {
        if (!isValidFileType(fileWithProgress.file)) {
          throw new Error('File type not supported');
        }
        // Upload to Supabase Storage (bucket: uploads)
        const filePath = `${userData.user.id}/${Date.now()}_${fileWithProgress.file.name}`;
        const { error } = await supabase.storage.from('uploads').upload(filePath, fileWithProgress.file);
        if (error) throw error;
        setFiles(prev => prev.map(f =>
          f.file === fileWithProgress.file
            ? { ...f, status: 'success', shareId: filePath, progress: 100 }
            : f
        ));
        toast.success(`${fileWithProgress.file.name} uploaded successfully!`);
      } catch (error) {
        setFiles(prev => prev.map(f =>
          f.file === fileWithProgress.file
            ? { ...f, status: 'error', error: error instanceof Error ? error.message : 'Upload failed', progress: 0 }
            : f
        ));
        toast.error(`Failed to upload ${fileWithProgress.file.name}`);
      }
    }
    setIsUploading(false);
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(prev => prev.filter(f => f.file !== fileToRemove))
  }

  const copyShareLink = async (shareId: string) => {
    // Generate a public URL for the file in Supabase Storage
    const { data } = supabase.storage.from('uploads').getPublicUrl(shareId);
    const link = data?.publicUrl || `${window.location.origin}/download/${shareId}`;
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Share link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  const supportedFormats = [
    { icon: <Image className="h-5 w-5" />, label: "Images", formats: "PNG, JPG, GIF, WebP" },
    { icon: <Video className="h-5 w-5" />, label: "Videos", formats: "MP4, AVI, MOV, WMV" },
    { icon: <Music className="h-5 w-5" />, label: "Audio", formats: "MP3, WAV, FLAC, AAC" },
    { icon: <FileText className="h-5 w-5" />, label: "Documents", formats: "PDF, DOC, DOCX, TXT" },
    { icon: <Archive className="h-5 w-5" />, label: "Archives", formats: "ZIP, RAR" }
  ]

  const features = [
    { icon: <Zap className="h-5 w-5 text-yellow-500" />, text: "Lightning fast uploads" },
    { icon: <Shield className="h-5 w-5 text-blue-500" />, text: "256-bit encryption" },
    { icon: <Globe className="h-5 w-5 text-green-500" />, text: "Universal file sharing" }
  ]

  if (!isLoggedIn) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToDashboard}
              className="mr-4 hover:bg-white/50 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Button>
          </div>
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Upload className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Upload Your Files
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Drag, drop, and share files instantly with our secure platform. 
              Join thousands of users who trust DropLink for their file sharing needs.
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-gray-600">
                  {feature.icon}
                  <span className="ml-2 text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto space-y-8">
          {/* Upload Area */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <div className="p-8">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                  isDragActive
                    ? 'border-blue-500 bg-blue-50 scale-105'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Upload className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    or click to browse and select files from your device
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 max-w-2xl">
                    <div className="flex items-center justify-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-blue-700">Max size: 1GB</span>
                    </div>
                    <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-700">Multiple files</span>
                    </div>
                    <div className="flex items-center justify-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium text-purple-700">All formats</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Supported Formats */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Supported File Formats</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {supportedFormats.map((format, index) => (
                  <div key={index} className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-110 transition-transform">
                      {format.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{format.label}</h4>
                    <p className="text-xs text-gray-600">{format.formats}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* File List */}
          {files.length > 0 && (
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Upload Progress</h3>
                <div className="space-y-4">
                  {files.map((fileWithProgress, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border border-gray-200 rounded-xl bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center space-x-4 min-w-0 flex-1 mb-4 sm:mb-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                          <span className="text-xl">{getFileIcon(fileWithProgress.file.type)}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 truncate text-lg">{fileWithProgress.file.name}</p>
                          <p className="text-gray-500">{formatFileSize(fileWithProgress.file.size)}</p>
                          
                          {/* Progress Bar */}
                          {fileWithProgress.status === 'uploading' && (
                            <div className="mt-2">
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Uploading...</span>
                                <span>{fileWithProgress.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${fileWithProgress.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 flex-shrink-0">
                        {fileWithProgress.status === 'uploading' && (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                            <span className="text-sm text-blue-600 font-medium">Uploading...</span>
                          </div>
                        )}
                        
                        {fileWithProgress.status === 'success' && (
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span className="text-sm text-green-600 font-medium">Complete</span>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => copyShareLink(fileWithProgress.shareId!)}
                              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                            >
                              Copy Link
                            </Button>
                          </div>
                        )}
                        
                        {fileWithProgress.status === 'error' && (
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            <span className="text-sm text-red-500 font-medium">{fileWithProgress.error}</span>
                          </div>
                        )}
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(fileWithProgress.file)}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Success Message and Back Button */}
                {files.some(f => f.status === 'success') && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Files uploaded successfully!</h4>
                      <p className="text-gray-600 mb-6">
                        Your files are now securely stored and ready to share. 
                        Go back to your dashboard to manage all your files.
                      </p>
                      <Button 
                        onClick={handleBackToDashboard}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}