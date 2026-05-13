const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const SUBJECTS = [
  { slug: 'somali', name: 'Af-Soomaali' },
  { slug: 'mathematics', name: 'Mathematics' },
  { slug: 'biology', name: 'Biology' },
  { slug: 'chemistry', name: 'Chemistry' },
  { slug: 'physics', name: 'Physics' },
  { slug: 'english', name: 'English' }
];

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];
const GRADES = ['form4', 'grade8'];

async function seedExams() {
  console.log('Starting seed process...');

  for (const grade of GRADES) {
    for (const year of YEARS) {
      for (const subject of SUBJECTS) {
        const title = `${subject.name} ${grade === 'form4' ? 'Form 4' : 'Grade 8'} Final ${year}`;
        
        // Check if exam already exists
        const { data: existing } = await supabase
          .from('exams')
          .select('id')
          .eq('title', title)
          .single();

        if (existing) {
          console.log(`Skipping: ${title} (Already exists)`);
          continue;
        }

        console.log(`Seeding: ${title}`);
        
        const { data: exam, error: examError } = await supabase
          .from('exams')
          .insert({
            title,
            subject: subject.slug,
            grade,
            year,
            duration: 120,
            total_marks: 100,
            status: 'published'
          })
          .select()
          .single();

        if (examError) {
          console.error(`Error seeding exam ${title}:`, examError);
          continue;
        }

        // Add dummy questions for the simulator
        const questions = [];
        for (let i = 1; i <= 10; i++) {
          questions.push({
            exam_id: exam.id,
            question_number: i,
            question_type: 'mcq',
            topic: 'General Revision',
            question_text: `Sample question ${i} for ${title}. What is the correct answer?`,
            option_a: 'Option A (Incorrect)',
            option_b: 'Option B (Correct)',
            option_c: 'Option C (Incorrect)',
            option_d: 'Option D (Incorrect)',
            correct_answer: 'B',
            explanation: 'This is a sample explanation for the revision material.',
            difficulty: 'medium'
          });
        }

        const { error: qError } = await supabase.from('questions').insert(questions);
        if (qError) console.error(`Error seeding questions for ${title}:`, qError);
      }
    }
  }

  console.log('Seed process completed!');
}

seedExams();
