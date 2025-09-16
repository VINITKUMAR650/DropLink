import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET(request: NextRequest) {
  try {
    // Get user from Supabase auth
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's files from database
    const { data: files, error: dbError } = await supabase
      .from('files')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (dbError) {
      console.error('Files API: Error fetching files:', dbError);
      return NextResponse.json({ error: 'Failed to retrieve files' }, { status: 500 });
    }

    if (!files) {
      return NextResponse.json({ files: [] });
    }

    // Transform for frontend
    const transformedFiles = files.map(file => ({
      id: file.id,
      name: file.filename,
      originalName: file.original_name,
      size: file.size,
      mimeType: file.mime_type,
      shareId: file.share_id,
      hasPassword: !!file.password,
      expiresAt: file.expires_at,
      downloadCount: file.download_count,
      createdAt: file.created_at,
      path: file.path,
      url: `/download/${file.share_id}`
    }))

    return NextResponse.json({ files: transformedFiles })

  } catch (error) {
    console.error('Files API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get user from Supabase auth
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { fileId, filePath } = await request.json()
    
    console.log('Delete API: Received request', { fileId, filePath, userId: user.id });

    if (!fileId) {
      return NextResponse.json({ error: 'File ID is required' }, { status: 400 })
    }

    // Create admin client for database operations
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // First, get the file to verify ownership and get the path
    const { data: fileData, error: getFileError } = await supabaseAdmin
      .from('files')
      .select('*')
      .eq('id', fileId)
      .eq('user_id', user.id)
      .single();

    if (getFileError) {
      console.error('Delete API: Error getting file:', getFileError);
      if (getFileError.code === 'PGRST116') {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Failed to verify file ownership' }, { status: 500 });
    }

    if (!fileData) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    console.log('Delete API: Found file to delete:', fileData.path);

    // Delete from database first
    const { error: deleteDbError } = await supabaseAdmin
      .from('files')
      .delete()
      .eq('id', fileId)
      .eq('user_id', user.id);

    if (deleteDbError) {
      console.error('Delete API: Error deleting file from database:', deleteDbError);
      return NextResponse.json({ error: 'Failed to delete file from database' }, { status: 500 });
    }

    console.log('Delete API: File deleted from database successfully');

    // Delete from storage using the actual file path
    const { error: deleteError } = await supabase.storage
      .from('uploads')
      .remove([fileData.path])

    if (deleteError) {
      console.error('Delete API: Storage delete error:', deleteError)
      // File deleted from DB but not storage - log but don't fail the request
      console.warn('Delete API: File deleted from database but storage deletion failed');
    } else {
      console.log('Delete API: File deleted from storage successfully');
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Delete API: Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}