console.log('Checking Environment Variables:');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Found' : '❌ Missing');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Found' : '❌ Missing');

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.log('\nAction Required:');
  console.log('1. If running LOCALLY: Create a .env.local file in the root directory.');
  console.log('2. If on VERCEL: Ensure variables are added in Project Settings > Environment Variables.');
  console.log('3. IMPORTANT: You must trigger a NEW DEPLOYMENT on Vercel after adding variables.');
}
