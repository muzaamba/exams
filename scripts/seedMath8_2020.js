import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are in .env.local');
  process.exit(1);
}

const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

const examData = {
  "subject": "mathematics",
  "grade": "grade8",
  "year": 2020,
  "title": "Xisaab Fasalka 8aad 2020",
  "sections": [
    {
      "name": "Sets and Basic Math",
      "questions": [
        { "id": 1, "question": "Ururka soo koobaya dhammaan ku tirsanayaasha ururrada waxa loo yaqaanaa", "answer": "Urur guud" },
        { "id": 2, "question": "A = {1,2,3,4,5,6,7,8,9}, B = {1,3,4,5,9}. Ururka ka maqan B ee ku jira A waa", "answer": "{2,6,7,8}" },
        { "id": 3, "question": "Hababka loo qoro ururrada waxaa ka mid ah", "answer": "Habka tixidda ku tirsanayaasha ururka" },
        { "id": 12, "question": "4 × 6 waa", "answer": "24" },
        { "id": 13, "question": "20 + 10 waa", "answer": "30" },
        { "id": 14, "question": "10 + 20 waa", "answer": "30" },
        { "id": 24, "question": "4 × 6 waa", "answer": "24" },
        { "id": 25, "question": "20 + 10 ama 10 + 20 waa", "answer": "30" },
        { "id": 26, "question": "4 × 6 waa", "answer": "24" }
      ]
    },
    {
      "name": "Indices and Roots",
      "questions": [
        { "id": 4, "question": "36 waxa loo qoro jibbaar ahaan", "answer": "6²" },
        { "id": 5, "question": "2³ waa", "answer": "8" },
        { "id": 6, "question": "3³ waa", "answer": "27" },
        { "id": 7, "question": "√81 waa", "answer": "9" },
        { "id": 8, "question": "8² waa", "answer": "64" },
        { "id": 9, "question": "12² waa", "answer": "144" },
        { "id": 10, "question": "16² waa", "answer": "256" },
        { "id": 11, "question": "6×6×6×6×6 waa", "answer": "6⁵" },
        { "id": 15, "question": "4 × 5 × 5 × 5 waa", "answer": "500" },
        { "id": 16, "question": "Jibbaarada isku salku leeyihiin marka la isku dhufto", "answer": "Jibbaarada waa la isku daraa" },
        { "id": 17, "question": "Jibbaaro is dul saaran waxa loola jeedaa", "answer": "Jibbaar jibbaaran" },
        { "id": 18, "question": "√9 waa", "answer": "3" },
        { "id": 19, "question": "(23)² waa", "answer": "529" },
        { "id": 20, "question": "√7³ (xidid saddex jibbaaran 7) qiyaas ahaan", "answer": "1.91" },
        { "id": 27, "question": "Xididka saddex-jibbaaran ee 1 (√ cube of 1) waa", "answer": "1" }
      ]
    },
    {
      "name": "Algebra and Graphs",
      "questions": [
        { "id": 21, "question": "Barta A dhibicdeeda x (x-coordinate) waa", "answer": "2" },
        { "id": 22, "question": "Barta A dhibicdeeda y (y-coordinate) waa", "answer": "3" },
        { "id": 23, "question": "Barta B dhibicdeeda x (x-coordinate) waa", "answer": "-2" },
        { "id": 28, "question": "Fududee: 6 + x − 35 − 10x", "answer": "-29 - 9x" },
        { "id": 29, "question": "Kala bixi: (x + 2)²", "answer": "x² + 4x + 4" },
        { "id": 31, "question": "Haddii x = 0, qiimaha x waa", "answer": "0" },
        { "id": 36, "question": "4m × m waa", "answer": "4m²" },
        { "id": 37, "question": "Kala bixi: (3m - 6)(m + 4)", "answer": "3m² + 6m - 24" },
        { "id": 38, "question": "m² × m⁴ waa", "answer": "m⁶" },
        { "id": 39, "question": "x² + 5x - 8 waa caynkee", "answer": "polynomial" },
        { "id": 40, "question": "Haddii x = 2, geli qiimaha", "answer": "2" },
        { "id": 41, "question": "Isleegta x + 4 = 6, x waa", "answer": "2" },
        { "id": 49, "question": "Kala bixi: (x + 4)²", "answer": "x² + 8x + 16" },
        { "id": 50, "question": "Fududee: 5(x + 3)", "answer": "5x + 15" }
      ]
    },
    {
      "name": "Geometry and Measurement",
      "questions": [
        { "id": 32, "question": "Saddex xagal imisa dhinac ayuu leeyahay?", "answer": "3 dhinac" },
        { "id": 33, "question": "Formula-ha bedka saddex xagal waa", "answer": "1/2 × base × height" },
        { "id": 34, "question": "Shaxanka Cube-ka (3D) imisa waji ayuu leeyahay?", "answer": "6 waji" },
        { "id": 35, "question": "Dhulubo maxay ka kooban tahay?", "answer": "2 sal iyo qolof" },
        { "id": 42, "question": "Magaca shaxanka saddex dhinac leh", "answer": "Saddex xagal" },
        { "id": 43, "question": "Bedka laydi waa", "answer": "dherer × ballac" },
        { "id": 44, "question": "Cube imisa waji ayuu leeyahay?", "answer": "6 waji" },
        { "id": 45, "question": "Prism (seddex-xagalka ah) imisa waji ayuu leeyahay?", "answer": "6 waji" },
        { "id": 46, "question": "Bedka guud ee dhulubada waa", "answer": "2πr(h + r)" },
        { "id": 47, "question": "Bedka laydi dhererkiisu yahay 8cm ballaciisuna 4cm", "answer": "32" },
        { "id": 48, "question": "Halbeegga lagu cabbiro joogga (height)", "answer": "cm" }
      ]
    }
  ]
};

async function seed() {
  console.log('Starting seed process for', examData.title);

  // Check if exam exists
  const { data: existingExam } = await supabase
    .from('exams')
    .select('id')
    .eq('title', examData.title)
    .single();

  let examId;
  if (existingExam) {
    examId = existingExam.id;
    console.log('Using existing exam ID:', examId);
  } else {
    const { data: newExam, error: examErr } = await supabase.from('exams').insert({
      year: examData.year,
      subject: examData.subject.toLowerCase(),
      title: examData.title,
      grade: examData.grade,
      status: 'published'
    }).select('id').single();

    if (examErr) {
      console.error('Error inserting exam:', examErr);
      return;
    }
    examId = newExam.id;
    console.log('Created new exam with ID:', examId);
  }

  let totalQuestions = 0;

  for (let i = 0; i < examData.sections.length; i++) {
    const sec = examData.sections[i];
    console.log(`Processing section: ${sec.name}`);

    const { data: section, error: secErr } = await supabase.from('sections').insert({
      exam_id: examId,
      section_name: sec.name,
      sort_order: i + 1
    }).select('id').single();

    if (secErr) {
      console.error('Error inserting section', sec.name, secErr.message);
    }

    const sectionId = section?.id;
    const questionsToInsert = sec.questions.map((q) => {
      totalQuestions++;
      return {
        exam_id: examId,
        section_id: sectionId,
        question_number: q.id || totalQuestions,
        question_type: 'short_answer',
        topic: sec.name,
        question_text: q.question,
        correct_answer: null,
        explanation: q.answer,
        difficulty: 'medium'
      };
    });

    const { error: qErr } = await supabase.from('questions').insert(questionsToInsert);
    if (qErr) {
      console.error(`Failed to insert questions for ${sec.name}:`, qErr.message);
    } else {
      console.log(`Successfully inserted ${questionsToInsert.length} questions for ${sec.name}.`);
    }
  }

  console.log('Seeding completed! Total questions processed:', totalQuestions);
}

seed().catch(console.error);
