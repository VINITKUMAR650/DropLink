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
    // Get user ID from request headers (sent from frontend)
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
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
    const fileExtension = file.name.split('.').pop()
    const filename = `${shareId}.${fileExtension}`
    const filePath = join(UPLOAD_DIR, filename)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Save file info to database
    const fileRecord = await prisma.file.create({
      data: {
        filename,
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
        path: filePath,
        shareId,
        userId: userId, // Use the authenticated user's ID
      },
    })

    return NextResponse.json({
      success: true,
      shareId: fileRecord.shareId,
      filename: fileRecord.originalName,
      size: fileRecord.size,
      downloadUrl: `/download/${shareId}`,
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
