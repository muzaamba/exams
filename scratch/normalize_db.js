const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const MAPPINGS = {
  'af-soomaali': 'somali',
  'Af-Soomaali': 'somali',
  'Af Soomaali': 'somali',
  'Mathematics': 'mathematics',
  'Physics': 'physics',
  'Chemistry': 'chemistry',
  'Biology': 'biology',
  'English': 'english',
  'Arabic': 'arabic',
  'History': 'history',
  'Geography': 'geography',
};

async function cleanup() {
  console.log('Starting data normalization...');
  
  for (const [oldName, newName] of Object.entries(MAPPINGS)) {
    console.log(`Updating ${oldName} -> ${newName}...`);
    const { count, error } = await supabase
      .from('exams')
      .update({ subject: newName })
      .eq('subject', oldName);
    
    if (error) console.error(`Error updating ${oldName}:`, error);
    else console.log(`Updated records for ${oldName}`);
  }
  
  console.log('Normalization complete.');
}

cleanup();
