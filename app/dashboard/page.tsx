'use client'

'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { formatFileSize, getFileIcon, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/Header';
import { 
  Upload, 
  Download, 
  Trash2, 
  Copy, 
  Calendar, 
  HardDrive, 
  Plus, 
  Search,
  FileText,
  TrendingUp,
  Users,
  Settings,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabaseClient';

interface FileItem {
  name: string;
  id: string;
  size: number;
  createdAt: string;
  url: string;
  path: string;
  originalName?: string;
  shareId?: string;
  downloadCount?: number;
}

export default function DashboardPage() {
  const router = useRouter()
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [uploadingFiles, setUploadingFiles] = useState<Array<{file: File, progress: number, status: 'uploading' | 'success' | 'error'}>>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Ensure files is always an array
  const safeFiles = files || []

  // Filter files based on search term
  const filteredFiles = safeFiles.filter((file: FileItem) => 
    file.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.originalName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    // Check Supabase auth and fetch files
    const checkAuthAndFetch = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        toast.error('Please log in to access your dashboard');
        router.push('/login');
        return;
      }
      setUser(data.user);
      await fetchUserFiles(data.user);
    };
    checkAuthAndFetch();
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkAuthAndFetch();
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
    // eslint-disable-next-line
  }, [router]);

  const fetchUserFiles = async (user: any) => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error('No authentication token');
      }

      const response = await fetch('/api/files', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch files');
      }

      const transformedFiles: FileItem[] = data.files.map((file: any) => ({
        id: file.id,
        name: file.name,
        originalName: file.originalName,
        size: file.size,
        createdAt: file.createdAt,
        url: file.url,
        path: file.path,
        shareId: file.shareId,
        downloadCount: file.downloadCount
      }));

      setFiles(transformedFiles);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast.error('Failed to load files');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    // Check if user is logged in
    if (!user || !user.id) {
      toast.error('Please log in to upload files')
      router.push('/login')
      return
    }
    
    // Validate files
    const validFiles = Array.from(selectedFiles).filter((file: File) => {
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
    
    // Add files to uploading state
    const newUploadingFiles = validFiles.map(file => ({
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
      setUploadingFiles(prev => prev.filter((f: {file: File, progress: number, status: 'uploading' | 'success' | 'error'}) => f.status !== 'success'))
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
    const validFiles = droppedFiles.filter((file: File) => {
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
      if (!user || !user.id) {
        throw new Error('User not authenticated');
      }
      
      setUploadingFiles(prev => prev.map(f => f.file === uploadFile.file ? { ...f, progress: 10 } : f));
      
      // Get auth session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error('No authentication token');
      }

      setUploadingFiles(prev => prev.map(f => f.file === uploadFile.file ? { ...f, progress: 25 } : f));
      
      // Create form data
      const formData = new FormData();
      formData.append('file', uploadFile.file);
      
      setUploadingFiles(prev => prev.map(f => f.file === uploadFile.file ? { ...f, progress: 50 } : f));
      
      // Upload via API
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        },
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }
      
      setUploadingFiles(prev => prev.map(f => f.file === uploadFile.file ? { ...f, status: 'success', progress: 100 } : f));
      
      // Add new file to files list using API response
      setFiles(prev => [
        ...prev,
        {
          name: result.file.filename,
          id: result.file.id,
          size: result.file.size,
          createdAt: new Date().toISOString(),
          url: result.file.downloadUrl,
          path: result.file.path, // Use the actual storage path from API
          shareId: result.file.shareId,
          downloadCount: 0
        },
      ]);
      
      toast.success(`${uploadFile.file.name} uploaded successfully!`);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadingFiles(prev => prev.map(f => f.file === uploadFile.file ? { ...f, status: 'error' } : f));
      toast.error(`Failed to upload ${uploadFile.file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
      return
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error('No authentication token');
      }

      const file = files.find(f => f.id === fileId);
      if (!file) {
        throw new Error('File not found in local state');
      }

      console.log('Deleting file:', { fileId, fileName: file.name, filePath: file.path });

      const response = await fetch('/api/files', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileId: file.id,
          filePath: file.path // This will be used as backup, but API will get path from DB
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Delete API error:', data);
        throw new Error(data.details || data.error || 'Failed to delete file');
      }

      setFiles(prev => prev.filter((f: FileItem) => f.id !== fileId));
      toast.success('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete file');
    }
  }

  const totalFiles = safeFiles.filter((file: FileItem) => file && file.size !== undefined).length
  const totalSize = safeFiles
    .filter((file: FileItem) => file && file.size !== undefined)
    .reduce((acc, file) => acc + (file.size || 0), 0)
  const totalDownloads = safeFiles
    .filter((file: FileItem) => file && file.downloadCount !== undefined)
    .reduce((acc, file) => acc + (file.downloadCount || 0), 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
            <p className="text-lg text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}! 👋
              </h1>
              <p className="text-lg text-gray-600">
                Manage your uploaded files and track downloads from your personal dashboard
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/dashboard/upload">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
              </Link>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Files</p>
                  <p className="text-3xl font-bold">{totalFiles}</p>
                  <p className="text-blue-100 text-xs mt-1">Files uploaded</p>
                </div>
                <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Total Downloads</p>
                  <p className="text-3xl font-bold">{totalDownloads}</p>
                  <p className="text-emerald-100 text-xs mt-1">File downloads</p>
                </div>
                <div className="w-12 h-12 bg-emerald-400 rounded-xl flex items-center justify-center">
                  <Download className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Storage Used</p>
                  <p className="text-3xl font-bold">{formatFileSize(totalSize)}</p>
                  <p className="text-purple-100 text-xs mt-1">Total storage</p>
                </div>
                <div className="w-12 h-12 bg-purple-400 rounded-xl flex items-center justify-center">
                  <HardDrive className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Average Size</p>
                  <p className="text-3xl font-bold">
                    {totalFiles > 0 ? formatFileSize(totalSize / totalFiles) : '0 B'}
                  </p>
                  <p className="text-orange-100 text-xs mt-1">Per file</p>
                </div>
                <div className="w-12 h-12 bg-orange-400 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <h2 className="text-2xl font-bold text-gray-900">Your Files</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
            <div className="md:hidden">
              <Link href="/dashboard/upload">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Drag & Drop Upload Area */}
        <div className="mb-8">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
              isDragOver 
                ? 'border-blue-500 bg-blue-50 border-solid scale-105' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
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
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isDragOver ? 'Drop files here' : 'Drag & drop files here'}
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse your files
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Max file size: 1GB
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Multiple files supported
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  All formats welcome
                </span>
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {uploadingFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="text-lg font-semibold text-gray-900">Uploading Files</h4>
              {uploadingFiles.map((uploadFile, index) => (
                <div key={index} className="bg-white rounded-xl border shadow-sm p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getFileIcon(uploadFile.file.type)}</span>
                      <div>
                        <span className="font-medium text-gray-900 truncate block max-w-xs">
                          {uploadFile.file.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatFileSize(uploadFile.file.size)}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {uploadFile.status === 'uploading' ? `${uploadFile.progress}%` : 
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
        {filteredFiles.length > 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-2 font-semibold text-gray-900">File</th>
                      <th className="hidden sm:table-cell text-left py-4 px-4 font-semibold text-gray-900">Size</th>
                      <th className="hidden sm:table-cell text-left py-4 px-4 font-semibold text-gray-900">Downloads</th>
                      <th className="hidden lg:table-cell text-left py-4 px-4 font-semibold text-gray-900">Uploaded</th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((file) => (
                      <tr key={file.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                        <td className="py-4 px-2">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{getFileIcon(file.name?.split('.').pop() || '')}</span>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 truncate">{file.name || 'Unknown'}</p>
                              <p className="text-sm text-gray-500 truncate">{file.id || 'N/A'}</p>
                              <div className="sm:hidden mt-1">
                                <p className="text-xs text-gray-600">{formatFileSize(file.size || 0)}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell py-4 px-4 text-gray-600">
                          {formatFileSize(file.size || 0)}
                        </td>
                        <td className="hidden sm:table-cell py-4 px-4 text-gray-600">
                          {file.downloadCount || 0}
                        </td>
                        <td className="hidden lg:table-cell py-4 px-4 text-gray-600">
                          {(() => {
                            try {
                              return formatDate(file.createdAt || new Date())
                            } catch (error) {
                              return 'Unknown'
                            }
                          })()}
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const shareUrl = file.shareId ? `/download/${file.shareId}` : file.url
                                navigator.clipboard.writeText(window.location.origin + shareUrl)
                                toast.success('Share link copied to clipboard!')
                              }}
                              className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              <span className="hidden sm:inline">Copy</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteFile(file.id)}
                              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              <span className="hidden sm:inline">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-10 w-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No files found' : 'No files uploaded yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? `No files match "${searchTerm}". Try a different search term.`
                  : 'Start by uploading your first file using the drag & drop area above'
                }
              </p>
              {!searchTerm && (
                <Link href="/dashboard/upload">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Your First File
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}