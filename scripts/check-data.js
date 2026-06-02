import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: exams } = await supabase.from('exams').select('id, title, subject, grade');
  console.log(`Found ${exams?.length} exams total`);
  for (const exam of (exams || [])) {
    const { data: sections } = await supabase.from('sections').select('id, section_name').eq('exam_id', exam.id);
    let qCount = 0;
    for (const sec of (sections || [])) {
      const { count } = await supabase.from('questions').select('*', { count: 'exact', head: true }).eq('section_id', sec.id);
      qCount += count || 0;
    }
    console.log(`${exam.title} (${exam.id}): ${sections?.length || 0} sections, ${qCount} questions`);
  }
}

check();
