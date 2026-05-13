require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const mapping = {
  'Af-Soomaali': 'somali',
  'Af Soomaali': 'somali',
  'Mathematics': 'mathematics',
  'Physics': 'physics',
  'Chemistry': 'chemistry',
  'Biology': 'biology',
  'English': 'english',
  'Arabic': 'arabic',
  'History': 'history',
  'Geography': 'geography'
};

async function normalize() {
  console.log('Starting subject normalization...');
  
  for (const [oldName, newSlug] of Object.entries(mapping)) {
    console.log(`Updating "${oldName}" to "${newSlug}"...`);
    const { data, error } = await supabase
      .from('exams')
      .update({ subject: newSlug })
      .eq('subject', oldName);
    
    if (error) {
      console.error(`Error updating ${oldName}:`, error.message);
    } else {
      console.log(`Successfully updated ${oldName}.`);
    }
  }
  
  console.log('Normalization complete.');
}

normalize();
