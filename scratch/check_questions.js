import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkQuestions() {
  const { data, error } = await supabase.from('questions').select('subject, topic').limit(50);
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  const subjects = [...new Set(data.map(q => q.subject))];
  const topics = data.filter(q => q.topic).length;
  
  console.log('Sample subjects found in questions:', subjects);
  console.log('Questions with topics:', topics, 'out of', data.length);
}

checkQuestions();
