#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up DropLink...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  const envContent = `# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}"

# File Upload
MAX_FILE_SIZE=1073741824
UPLOAD_DIR="./uploads"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local created successfully');
} else {
  console.log('✅ .env.local already exists');
}

// Create uploads directory
const uploadsPath = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsPath)) {
  console.log('📁 Creating uploads directory...');
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log('✅ uploads directory created');
} else {
  console.log('✅ uploads directory already exists');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Generate Prisma client
console.log('\n🗄️ Setting up database...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated');
} catch (error) {
  console.error('❌ Failed to generate Prisma client');
  process.exit(1);
}

// Push database schema
try {
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('✅ Database schema pushed');
} catch (error) {
  console.error('❌ Failed to push database schema');
  process.exit(1);
}

console.log('\n🎉 Setup complete!');
console.log('\nTo start the development server:');
console.log('  npm run dev');
console.log('\nThen open http://localhost:3000 in your browser');
console.log('\nHappy coding! 🚀');




<<<<<<< HEAD



=======
>>>>>>> 5bf4f332082fa7a0c2c3c4d5e340d6a1a6169b51
