# 🚀 Fix Vercel Upload Error - Complete Solution Guide

## Problem Identified
Your file uploads work locally but fail on Vercel with "Internal server error" because the `SUPABASE_SERVICE_ROLE_KEY` environment variable is missing on Vercel.

## Step-by-Step Solution

### 1. Get Your Supabase Service Role Key

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `lioqivtmcgsadzuyxlrf`
3. Navigate to **Settings** → **API**
4. Copy the **`service_role`** key (NOT the anon key)
   - It starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - It's different from your anon key

### 2. Update Your Local Environment

Replace the placeholder in your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://lioqivtmcgsadzuyxlrf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxpb3FpdnRtY2dzYWR6dXl4bHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MDYwMjgsImV4cCI6MjA3MTk4MjAyOH0.f5j0_Zhc_KkAupw0jfizeeaBNMyZtaYyQT_nhiF95MQ

# Replace this with your actual service_role key from Supabase Dashboard
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
```

### 3. Add Environment Variables to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these 3 variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://lioqivtmcgsadzuyxlrf.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxpb3FpdnRtY2dzYWR6dXl4bHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MDYwMjgsImV4cCI6MjA3MTk4MjAyOH0.f5j0_Zhc_KkAupw0jfizeeaBNMyZtaYyQT_nhiF95MQ` |
| `SUPABASE_SERVICE_ROLE_KEY` | `[Your service_role key from step 1]` |

### 4. Verify Storage Configuration

Make sure your Supabase storage is properly configured:

1. In Supabase Dashboard → **Storage**
2. Create bucket named `uploads` if it doesn't exist
3. Set bucket to **Public** 
4. Configure RLS policies:
   - Allow authenticated uploads
   - Allow public downloads
   - Allow users to delete own files

### 5. Redeploy on Vercel

1. Go to **Deployments** tab in your Vercel project
2. Click **"Redeploy"** on your latest deployment
3. Wait for deployment to complete

## Enhanced Error Handling

Your upload API now includes:
- ✅ Environment variable validation
- ✅ Storage bucket accessibility tests
- ✅ Detailed error messages
- ✅ Proper HTTP status codes
- ✅ Enhanced logging for debugging

## Testing the Fix

### Test Locally:
```bash
npm run dev
```
Try uploading a file at `http://localhost:3000/dashboard`

### Test on Vercel:
After redeployment, try uploading a file on your live site.

## Debugging

If issues persist:

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Functions → View Function Logs

2. **Verify Environment Variables:**
   - In Vercel Dashboard → Settings → Environment Variables
   - Ensure all 3 variables are set correctly

3. **Check Supabase Storage:**
   - Verify the `uploads` bucket exists and is public
   - Check RLS policies are configured

## Common Issues & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Missing environment variables" | Env vars not set in Vercel | Add all 3 env vars to Vercel |
| "Storage bucket not accessible" | Bucket doesn't exist or wrong permissions | Create/configure uploads bucket |
| "Storage permission error" | RLS policies incorrect | Update storage policies |
| "File too large" | File exceeds size limit | Reduce file size or increase limits |

## Security Notes

- ✅ `.env.local` is in `.gitignore` - never commit env variables
- ✅ Service role key is server-side only
- ✅ Client uses anon key with RLS protection
- ✅ All sensitive operations use service role key

Your upload system is now production-ready! 🎉