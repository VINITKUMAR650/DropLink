import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { existsSync } from 'fs'
import { prisma } from '@/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { shareId: string } }
) {
  try {
    const { shareId } = params

    // Get user ID from request headers for authentication
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Find the file and verify ownership
    const file = await prisma.file.findUnique({
      where: { shareId },
      select: {
        id: true,
        path: true,
        userId: true
      }
    })

    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    // Check if user owns this file
    if (file.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this file' },
        { status: 403 }
      )
    }

    // Delete the physical file if it exists
    if (existsSync(file.path)) {
      try {
        await unlink(file.path)
      } catch (error) {
        console.error('Error deleting physical file:', error)
        // Continue with database deletion even if physical file deletion fails
      }
    }

    // Delete the database record
    await prisma.file.delete({
      where: { id: file.id }
    })

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}
