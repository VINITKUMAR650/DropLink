import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET(
  request: NextRequest,
  { params }: { params: { shareId: string } }
) {
  try {
    const shareId = params.shareId

    // Get file metadata from database
    const { data: file, error: fileError } = await supabase
      .from('files')
      .select('*')
      .eq('share_id', shareId)
      .single();

    if (fileError && fileError.code !== 'PGRST116') throw fileError;

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Check if file is expired
    if (file.expires_at && new Date(file.expires_at) < new Date()) {
      return NextResponse.json({ error: 'File has expired' }, { status: 410 })
    }

    // Get user info
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', file.user_id)
      .single();

    if (userError && userError.code !== 'PGRST116') throw userError;

    // Return file info (without sensitive data)
    return NextResponse.json({
      id: file.id,
      filename: file.filename,
      originalName: file.original_name,
      size: file.size,
      mimeType: file.mime_type,
      shareId: file.share_id,
      hasPassword: !!file.password,
      expiresAt: file.expires_at,
      downloadCount: file.download_count,
      createdAt: file.created_at,
      user: user ? {
        name: user.name,
        email: user.email
      } : null
    })

  } catch (error) {
    console.error('File info API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}