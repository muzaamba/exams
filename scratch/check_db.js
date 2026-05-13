import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkData() {
  const { data: exams, error: eError } = await supabase.from('exams').select('*');
  console.log('Exams count:', exams?.length || 0);
  if (exams?.length > 0) {
    console.log('Sample exam subjects:', [...new Set(exams.map(e => e.subject))]);
  }

  const { data: profiles, error: pError } = await supabase.from('profiles').select('*');
  console.log('Profiles count:', profiles?.length || 0);
}

checkData();
