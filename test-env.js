#!/usr/bin/env node

// Environment Variables Test Script
// Run with: node test-env.js

console.log('🔍 DropLink Environment Variables Test\n');

// Check if we're in the right directory
const fs = require('fs');
const path = require('path');

if (!fs.existsSync('package.json')) {
  console.error('❌ Please run this script from your project root directory');
  process.exit(1);
}

// Load environment variables
require('dotenv').config({ path: '.env.local' });

console.log('📋 Environment Variables Check:');
console.log('================================');

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

let allGood = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  const status = value ? '✅' : '❌';
  const display = value ? 
    (value.length > 50 ? `${value.substring(0, 50)}...` : value) : 
    'MISSING';
  
  console.log(`${status} ${varName}: ${display}`);
  
  if (!value) {
    allGood = false;
  } else if (value.includes('paste_your_actual') || value.includes('REPLACE_THIS')) {
    console.log(`   ⚠️  Still contains placeholder text`);
    allGood = false;
  }
});

console.log('\n📝 Summary:');
console.log('===========');

if (allGood) {
  console.log('✅ All environment variables are properly configured!');
  console.log('✅ You can now add these same variables to Vercel');
  console.log('\n🚀 Next Steps:');
  console.log('1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables');
  console.log('2. Add all 3 variables with the same values');
  console.log('3. Redeploy your project');
} else {
  console.log('❌ Some environment variables need attention');
  console.log('\n🔧 Action Required:');
  console.log('1. Go to Supabase Dashboard → Settings → API');
  console.log('2. Copy your service_role key');
  console.log('3. Update .env.local with the actual key');
  console.log('4. Run this script again to verify');
}

console.log('\n📖 For detailed instructions, see: VERCEL_FIX_GUIDE.md');