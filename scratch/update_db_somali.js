require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateSomaliExams() {
  console.log('Updating subject names in database...');
  
  // Update all rows where subject is 'Af Soomaali' or 'af-soomaali' to 'somali'
  const { data, error } = await supabase
    .from('exams')
    .update({ subject: 'somali' })
    .or('subject.eq.Af Soomaali,subject.eq.af-soomaali');
  
  if (error) {
    console.error('Error updating exams:', error);
  } else {
    console.log('Successfully updated exams to use the new "somali" slug.');
  }
}

updateSomaliExams();
