# Supabase Setup Guide for DropLink

## Step 1: Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/Sign in to your account
3. Click "New Project"
4. Choose your organization and fill in project details:
   - Name: `droplink` (or any name you prefer)
   - Database Password: Choose a strong password
   - Region: Choose closest to your users
5. Wait for the project to be created (takes ~2 minutes)

## Step 2: Get API Keys
1. Go to your project dashboard
2. Click on "Settings" in the left sidebar
3. Click on "API" under Settings
4. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **Anon public** key (starts with `eyJ`)
   - **Service role** key (starts with `eyJ`) - Keep this secret!

## Step 3: Update Environment Variables
1. Open the `.env.local` file in your project root
2. Replace the placeholder values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

## Step 4: Create Database Schema
1. In your Supabase dashboard, go to "SQL Editor"
2. Copy the entire content from `supabase-schema.sql` file
3. Paste it in the SQL Editor and click "Run"
4. This will create all necessary tables, indexes, and security policies

## Step 5: Set up Storage
1. In your Supabase dashboard, go to "Storage"
2. Click "Create a new bucket"
3. Bucket name: `uploads`
4. Make it **Public** (for file downloads)
5. Click "Create bucket"

## Step 6: Configure Storage Policies
1. In the Storage section, click on the `uploads` bucket
2. Go to "Policies" tab
3. The following policies should be created automatically, but verify:
   - **Upload**: Allow authenticated users to upload
   - **Download**: Allow public download access
   - **Delete**: Allow users to delete their own files

## Step 7: Test the Setup
1. Run `npm run dev` to start your development server
2. Go to `/supabase-demo` page to test all functionality:
   - Authentication (Sign up/Sign in)
   - Database operations
   - File storage

## Step 8: Production Deployment
When deploying to production (Vercel, Netlify, etc.):
1. Add the same environment variables to your hosting platform
2. Make sure your Supabase project is in the same region as your deployment
3. Consider upgrading to a paid Supabase plan for better performance

## Important Notes
- **Row Level Security (RLS)** is enabled for data protection
- **Authentication** is handled entirely by Supabase
- **File storage** uses Supabase Storage instead of local filesystem
- **Database** uses PostgreSQL with proper schema and policies

## Troubleshooting
- If you get CORS errors, check your Supabase URL and keys
- If database operations fail, verify RLS policies are set correctly
- If file uploads fail, check storage bucket permissions
- Always check the Supabase dashboard logs for detailed error messages