import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { prisma } from '@/lib/db'
import { generateShareId, isValidFileType } from '@/lib/utils'


const MAX_FILE_SIZE = 1024 * 1024 * 1024 // 1GB
const UPLOAD_DIR = './uploads'

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called')
    
    // Get user ID from request headers (sent from frontend)
    const userId = request.headers.get('x-user-id')
    console.log('User ID from headers:', userId)
    
    if (!userId) {
      console.log('Authentication required - no user ID')
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum limit of 1GB' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!isValidFileType(file)) {
      return NextResponse.json(
        { error: 'File type not supported' },
        { status: 400 }
      )
    }

    // Create upload directory if it doesn't exist
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true })
    }

    // Generate unique filename and share ID
    const shareId = generateShareId()
    
    // Safely extract file extension and handle special characters
    const fileExtension = file.name.split('.').pop() || 'bin'
    
    // Create a safe filename without special characters
    const filename = `${shareId}.${fileExtension}`
    const filePath = join(UPLOAD_DIR, filename)
    
    // Log the file information for debugging
    console.log('File upload details:', {
      originalName: file.name,
      sanitizedName: filename,
      size: file.size,
      type: file.type,
      path: filePath
    })

    try {
      // Convert file to buffer and save
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(filePath, buffer)
    } catch (writeError) {
      console.error('Error writing file to disk:', writeError)
      const errorMessage = writeError instanceof Error ? writeError.message : 'Unknown write error'
      throw new Error(`Failed to save file: ${errorMessage}`)
    }

    // Save file info to database
    console.log('Saving to database with data:', {
      filename,
      originalName: file.name,
      size: file.size,
      mimeType: file.type,
      path: filePath,
      shareId,
      userId
    })
    
    let fileRecord;
    try {
      // Sanitize the original filename to prevent database errors
      // Handle URLs and special characters more aggressively
      let safeOriginalName = file.name
        .replace(/[^\x20-\x7E]/g, '') // Remove non-printable ASCII chars
        .replace(/[=?&:]/g, '_')      // Replace URL special chars with underscore
        .replace(/\.+$/, '')          // Remove trailing dots
        .substring(0, 255);           // Limit length to 255 chars
      
      // Ensure we have a valid name even after sanitization
      if (!safeOriginalName || safeOriginalName.trim() === '') {
        safeOriginalName = 'unnamed_file';
      }
        
      fileRecord = await prisma.file.create({
        data: {
          filename,
          originalName: safeOriginalName,
          size: file.size,
          mimeType: file.type || 'application/octet-stream',
          path: filePath,
          shareId,
          userId: userId, // Use the authenticated user's ID
        },
      })
    } catch (dbError) {
      console.error('Database error:', dbError);
      const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown database error'
      throw new Error(`Database error: ${errorMessage}`);
    }

    return NextResponse.json({
      success: true,
      shareId: fileRecord.shareId,
      filename: fileRecord.originalName,
      size: fileRecord.size,
      downloadUrl: `/download/${shareId}`,
    })

  } catch (error) {
    console.error('Upload error:', error)
    
    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : 'No stack trace',
      name: error instanceof Error ? error.name : 'Unknown error type'
    })
    
    // Return a proper error response instead of throwing
    return NextResponse.json(
      { error: `Upload failed: ${errorMessage}` },
      { status: 500 }
    )
  }
}
