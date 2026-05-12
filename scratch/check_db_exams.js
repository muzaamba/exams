require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkExams() {
  const { data, error } = await supabase
    .from('exams')
    .select('id, title, subject, status');
  
  if (error) {
    console.error('Error fetching exams:', error);
  } else {
    console.log('Current Exams in Database:');
    console.table(data);
  }
}

checkExams();
