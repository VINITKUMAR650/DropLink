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

    if (fileError && fileError.code !== 'PGRST116') throw fileError; // PGRST116 means no rows found

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Check if file is expired
    if (file.expires_at && new Date(file.expires_at) < new Date()) {
      return NextResponse.json({ error: 'File has expired' }, { status: 410 })
    }

    // Check password if required
    const password = request.nextUrl.searchParams.get('password')
    if (file.password && file.password !== password) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    // Get file from Supabase Storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('uploads')
      .download(file.path)

    if (downloadError) {
      console.error('Download error:', downloadError)
      return NextResponse.json({ error: 'Failed to download file' }, { status: 500 })
    }

    // Increment download count
    try {
      const { error: incrementError } = await supabase
        .rpc('increment_download_count', { share_id_param: shareId }); // Assuming 'share_id_param' is the correct argument name for your rpc function
      if (incrementError) {
        console.error('Download API: Error incrementing download count:', incrementError);
      }
    } catch (error) {
      console.error('Failed to increment download count:', error)
      // Don't fail the download for this
    }

    // Create response with file
    const response = new NextResponse(fileData, {
      headers: {
        'Content-Type': file.mime_type,
        'Content-Disposition': `attachment; filename="${file.original_name}"`,
        'Content-Length': file.size.toString()
      }
    })

    return response

  } catch (error) {
    console.error('Download API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}