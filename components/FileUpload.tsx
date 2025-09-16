'use client'

'use client'

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Upload, X, CheckCircle, AlertCircle, LogIn } from 'lucide-react';
import { formatFileSize, isValidFileType, getFileIcon } from '@/lib/utils';
import { createLoginUrl } from '@/lib/redirectUtils';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabaseClient';

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

  // Check if storage bucket is accessible
  useEffect(() => {
    const checkStorage = async () => {
      try {
        const { data, error } = await supabase.storage.from('uploads').list();
        if (error) {
          console.error('Storage bucket error:', error);
          toast.error('Storage system is not accessible');
        } else {
          console.log('Storage bucket is accessible', data);
        }
      } catch (error) {
        console.error('Storage check failed:', error);
      }
    };
    checkStorage();
  }, []);

  // Check authentication status
  useEffect(() => {
    // Check Supabase auth
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data?.user);
    };
    checkAuth();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleUploadClick = () => {
    if (!isLoggedIn) {
      toast.error('Please log in to upload files');
      router.push(createLoginUrl());
      return;
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!isLoggedIn) {
      toast.error('Please log in to upload files');
      router.push(createLoginUrl());
      return;
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
      router.push(createLoginUrl());
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
        console.log('Attempting to upload file:', {
          name: fileWithProgress.file.name,
          size: fileWithProgress.file.size,
          type: fileWithProgress.file.type,
          path: filePath
        });

        const { error } = await supabase.storage.from('uploads').upload(filePath, fileWithProgress.file);
        
        if (error) {
          console.error('Supabase upload error:', error);
          throw error;
        }

        console.log('File uploaded successfully:', filePath);
        
        setFiles(prev => prev.map(f =>
          f.file === fileWithProgress.file
            ? { ...f, status: 'success', shareId: filePath, progress: 100 }
            : f
        ));
        toast.success(`${fileWithProgress.file.name} uploaded successfully!`);
      } catch (error) {
        console.error('Upload error:', error);
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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Upload Area */}
      <Card>
        {isLoggedIn ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 text-center transition-all duration-200 cursor-pointer relative overflow-hidden ${
              isDragActive
                ? 'border-primary-500 bg-primary-50 shadow-lg scale-[1.02] border-primary-400'
                : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50 hover:shadow-md'
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive && (
              <div className="absolute inset-0 bg-primary-100/80 border-2 border-primary-500 rounded-lg flex items-center justify-center z-10">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-primary-600 mb-2 animate-bounce" />
                  <p className="text-lg font-semibold text-primary-700">Drop files to upload</p>
                </div>
              </div>
            )}
            <Upload className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400 mb-3 sm:mb-4" />
            <p className="text-base sm:text-lg font-medium text-gray-900 mb-2">
              {isDragActive ? 'Drop files here' : 'Upload Your Files'}
            </p>
            <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4">
              {isDragActive ? 'Release to upload' : 'Drag & drop files here or click to browse'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
              <Button 
                type="button"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Choose Files
              </Button>
              <span className="text-gray-400 text-sm">or</span>
              <span className="text-gray-600 text-sm font-medium">Drag files here</span>
            </div>
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
