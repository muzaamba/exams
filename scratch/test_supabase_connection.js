require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Supabase URL or Anon Key is missing in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing connection to:', supabaseUrl);
  
  // Test 1: Fetch subjects/exams
  const { data, error } = await supabase.from('exams').select('count', { count: 'exact' });
  
  if (error) {
    console.error('❌ Connection Error:', error.message);
    if (error.message.includes('relation "exams" does not exist')) {
      console.log('💡 Tip: You likely need to run the SQL migrations in the Supabase SQL Editor.');
    }
  } else {
    console.log('✅ Success! Connected to Supabase.');
    console.log(`📊 Found ${data?.[0]?.count || 0} exams in the database.`);
  }
}

testConnection();
