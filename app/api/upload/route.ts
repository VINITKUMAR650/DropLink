import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API: Starting upload process');
    
    // Environment validation
    const requiredEnvVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
    };
    
    const missingVars = Object.entries(requiredEnvVars)
      .filter(([_, value]) => !value)
      .map(([key, _]) => key);
    
    if (missingVars.length > 0) {
      console.error('Upload API: Missing environment variables:', missingVars);
      return NextResponse.json({ 
        error: 'Server configuration error',
        details: `Missing environment variables: ${missingVars.join(', ')}`,
        missingVars
      }, { status: 500 });
    }
    
    console.log('Upload API: Environment variables validated');
    
    // Get user from Supabase auth
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      console.log('Upload API: No authorization header');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    console.log('Upload API: Checking user authentication');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      console.log('Upload API: Authentication failed:', authError);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Upload API: User authenticated:', user.id);

    const formData = await request.formData()
    const file = formData.get('file') as File
    const password = formData.get('password') as string
    const expiresAt = formData.get('expiresAt') as string

    if (!file) {
      console.log('Upload API: No file provided');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('Upload API: File received:', file.name, file.size);

    // Generate unique file path and share ID
    const timestamp = Date.now()
    const shareId = Math.random().toString(36).substring(2, 15)
    const filePath = `${user.id}/${timestamp}_${file.name}`

    console.log('Upload API: Uploading to storage:', filePath);

    // Test storage bucket accessibility first
    try {
      const { error: bucketError } = await supabase.storage.from('uploads').list('', { limit: 1 });
      if (bucketError) {
        console.error('Upload API: Storage bucket not accessible:', bucketError);
        return NextResponse.json({ 
          error: 'Storage system unavailable',
          details: 'File storage bucket is not accessible. Please check storage configuration.'
        }, { status: 503 });
      }
    } catch (bucketTestError) {
      console.error('Upload API: Storage bucket test failed:', bucketTestError);
      return NextResponse.json({ 
        error: 'Storage system error',
        details: 'Unable to access file storage system'
      }, { status: 503 });
    }

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Upload API: Storage upload error:', uploadError);
      
      // Handle specific error types
      let errorMessage = 'Failed to upload file';
      let statusCode = 500;
      
      if (uploadError.message?.includes('insufficient_privilege')) {
        errorMessage = 'Storage permission error: Please check storage policies';
        statusCode = 403;
      } else if (uploadError.message?.includes('row-level security')) {
        errorMessage = 'Storage access denied: Row Level Security policy violation';
        statusCode = 403;
      } else if (uploadError.message?.includes('file size')) {
        errorMessage = 'File too large: Please reduce file size and try again';
        statusCode = 413;
      }
      
      return NextResponse.json({ 
        error: errorMessage,
        details: uploadError.message,
        errorCode: statusCode
      }, { status: statusCode });
    }

    console.log('Upload API: Storage upload successful');

    // Get file URL
    const { data: urlData } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath)

    console.log('Upload API: Got public URL:', urlData.publicUrl);

    // Check if user exists in database first
    console.log('Upload API: Checking if user exists in database');
    
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
    
    let dbUser;
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Upload API: Error checking user:', error);
        throw error;
      }

      if (data) {
        dbUser = data;
        console.log('Upload API: Found existing user:', dbUser.id);
      } else {
        console.log('Upload API: User not found, creating user profile');
        const { data: newUserData, error: createError } = await supabaseAdmin
          .from('users')
          .insert([{
            id: user.id,
            email: user.email || '',
            name: user.user_metadata?.name || user.user_metadata?.full_name || null
          }])
          .select()
          .single();

        if (createError) {
          console.error('Upload API: Error creating user:', createError);
          throw createError;
        }
        dbUser = newUserData;
        console.log('Upload API: Created new user:', dbUser.id);
      }
    } catch (userError) {
      console.error('Upload API: User database operation failed:', userError);
      return NextResponse.json({ 
        error: 'User database error', 
        details: userError instanceof Error ? userError.message : 'Unknown user error' 
      }, { status: 500 });
    }

    console.log('Upload API: User exists in database:', dbUser.id);

    // Save file metadata to database
    console.log('Upload API: Saving file metadata to database');
    const { data: dbFile, error: fileError } = await supabaseAdmin
      .from('files')
      .insert([{
        filename: file.name,
        original_name: file.name,
        size: file.size,
        mime_type: file.type,
        path: filePath,
        share_id: shareId,
        password: password || undefined,
        expires_at: expiresAt || undefined,
        user_id: user.id
      }])
      .select()
      .single();

    if (fileError) {
      console.error('Upload API: File database error:', fileError);
      return NextResponse.json({ 
        error: 'File database error', 
        details: fileError.message || 'Unknown file error' 
      }, { status: 500 });
    }

    console.log('Upload API: File saved to database:', dbFile.id);

    return NextResponse.json({
      success: true,
      file: {
        id: dbFile.id,
        shareId,
        url: urlData.publicUrl,
        downloadUrl: `/download/${shareId}`,
        filename: file.name,
        size: file.size,
        mimeType: file.type,
        path: filePath // Include the actual storage path
      }
    })

  } catch (error) {
    console.error('Upload API: Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}