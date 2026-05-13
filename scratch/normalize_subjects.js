import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const MAPPING = {
  'af-soomaali': 'somali',
  'af soomaali': 'somali',
  'af-soomali': 'somali',
  'af soomali': 'somali',
  'somali': 'somali',
  'mathematics': 'mathematics',
  'math': 'mathematics',
  'biology': 'biology',
  'chemistry': 'chemistry',
  'physics': 'physics',
  'english': 'english',
  'arabic': 'arabic',
  'geography': 'geography',
  'history': 'history',
  'islamic_studies': 'islamic_studies',
  'tarbiya': 'islamic_studies',
  'business': 'business'
};

async function normalizeExams() {
  const { data: exams, error } = await supabase.from('exams').select('id, subject');
  if (error) {
    console.error('Error fetching exams:', error);
    return;
  }

  console.log(`Checking ${exams.length} exams...`);

  for (const exam of exams) {
    const original = exam.subject || '';
    const normalized = original.toLowerCase().trim();
    
    let finalSlug = normalized;
    for (const [key, value] of Object.entries(MAPPING)) {
      if (normalized.includes(key)) {
        finalSlug = value;
        break;
      }
    }

    if (finalSlug !== original) {
      console.log(`Updating exam ${exam.id}: "${original}" -> "${finalSlug}"`);
      await supabase.from('exams').update({ subject: finalSlug }).eq('id', exam.id);
    }
  }
  console.log('Normalization complete!');
}

normalizeExams();
