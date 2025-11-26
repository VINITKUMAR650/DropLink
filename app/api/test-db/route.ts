import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: NextRequest) {
  try {
    // Test 1: Check if users table exists
    const { data: usersTable, error: usersError } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    // Test 2: Check if files table exists
    const { data: filesTable, error: filesError } = await supabase
      .from('files')
      .select('id')
      .limit(1);

    // Test 3: Check storage buckets
    const { data: buckets, error: storageError } = await supabase
      .storage
      .listBuckets();

    // Test 4: Check if 'uploads' bucket exists
    const uploadsBucket = buckets?.find(bucket => bucket.name === 'uploads');
    
    // Compile results
    const results = {
      database: {
        usersTable: usersError ? `Error: ${usersError.message}` : 'OK',
        filesTable: filesError ? `Error: ${filesError.message}` : 'OK',
        connection: usersError || filesError ? 'Failed' : 'Successful'
      },
      storage: {
        buckets: buckets?.map(b => b.name) || [],
        uploadsBucket: uploadsBucket ? 'Found' : 'Not found',
        connection: storageError ? `Error: ${storageError.message}` : 'Successful'
      }
    };

    return NextResponse.json({ 
      success: !(usersError || filesError || storageError),
      results
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}