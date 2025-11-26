# DropLink Setup Instructions

## Why You're Getting Upload Errors

The "User database error" occurs because the application needs real Supabase credentials to work properly. The current configuration uses placeholder values that don't connect to an actual database.

## Step-by-Step Setup Guide

### 1. Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign up"
3. Create a free account (no credit card required)

### 2. Create a New Supabase Project
1. After logging in, click "New Project"
2. Fill in the project details:
   - Name: `droplink` (or any name you prefer)
   - Database Password: Choose a strong password and save it
   - Region: Choose the region closest to you
3. Click "Create Project" (this may take 1-2 minutes)

### 3. Get Your API Credentials
1. Once your project is ready, go to "Settings" → "API"
2. Copy these three values:
   - **Project URL**: The full URL (starts with `https://`)
   - **Anon public key**: The long key under "Project API keys"
   - **Service role key**: The other long key (keep this secret!)

### 4. Update Your Environment Variables
1. Open the [.env.local](file:///C:/Users/conne/Desktop/project/.env.local) file in your project
2. Replace the placeholder values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-actual-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key
   ```

### 5. Set Up the Database
1. In your Supabase dashboard, go to "SQL Editor"
2. Copy the entire content from [supabase-schema.sql](file:///C:/Users/conne/Desktop/project/supabase-schema.sql)
3. Paste it in the SQL Editor and click "Run"

### 6. Set Up Storage
1. In your Supabase dashboard, go to "Storage"
2. Click "Create a new bucket"
3. Name it `uploads`
4. Make it Public
5. Click "Create bucket"

### 7. Restart the Development Server
1. Stop the current server (Ctrl+C in the terminal)
2. Run `npm run dev` again

## Troubleshooting

If you're still having issues:
1. Double-check that all three environment variables are correctly set
2. Make sure there are no extra spaces or quotes around the values
3. Ensure your Supabase project is fully created (check the dashboard)
4. Verify that you ran the database schema script

## Need Help?

If you're still experiencing issues:
1. Check the terminal for detailed error messages
2. Verify your internet connection
3. Make sure you're using the correct Supabase credentials