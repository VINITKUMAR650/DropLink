import { NextRequest, NextResponse } from 'next/server'
import { readFile, stat } from 'fs/promises'
import { existsSync } from 'fs'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { shareId: string } }
) {
  try {
    const { shareId } = params

    // Find the file in the database
    const file = await prisma.file.findUnique({
      where: { shareId }
    })

    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    // Check if file has expired
    if (file.expiresAt && new Date() > file.expiresAt) {
      return NextResponse.json(
        { error: 'File has expired' },
        { status: 410 }
      )
    }

    // Check if file exists on disk
    if (!existsSync(file.path)) {
      return NextResponse.json(
        { error: 'File not found on server' },
        { status: 404 }
      )
    }

    // Read file stats
    const fileStats = await stat(file.path)

    // Read the file
    const fileBuffer = await readFile(file.path)

    // Create response with proper headers
    const response = new NextResponse(fileBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': file.mimeType,
        'Content-Length': fileStats.size.toString(),
        'Content-Disposition': `attachment; filename="${file.originalName}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })

    return response

  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    )
  }
}

