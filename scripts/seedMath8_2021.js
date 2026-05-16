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
  "year": 2021,
  "title": "Xisaab Fasalka 8aad 2021",
  "sections": [
    {
      "name": "Basic Laws and Sets",
      "questions": [
        { "id": 1, "question": "Haddii b iyo t yihiin tirooyin idil, b + t = t + b xeerkani waa:", "answer": "hormogalka (commutative law)" },
        { "id": 4, "question": "Urur maran summad ahaan waa:", "answer": "∅" },
        { "id": 9, "question": "Haddii A={5,6,7} iyo G={1,2,3,4,5,6,7}, urur duleedka A waa:", "answer": "{1,2,3,4}" },
        { "id": 34, "question": "Urur ka kooban tiro la tirin karo (finite set) waxaa lagu magacaabaa:", "answer": "urur koobane" }
      ]
    },
    {
      "name": "Indices and Scientific Notation",
      "questions": [
        { "id": 2, "question": "Tirada hoose ee jibbaarka (tusaale 4³) waxaa lagu magacaabaa:", "answer": "sal" },
        { "id": 5, "question": "3² × 3 =", "answer": "27" },
        { "id": 8, "question": "√169 =", "answer": "13" },
        { "id": 10, "question": "100 waxaa loo qori karaa jibbaar ahaan:", "answer": "10²" },
        { "id": 21, "question": "Qormo saynis ahaan 300 waa:", "answer": "3 × 10²" },
        { "id": 23, "question": "0.0035 qormo saynis ahaan waa:", "answer": "3.5 × 10⁻³" },
        { "id": 25, "question": "y⁵ ÷ y² =", "answer": "y³" },
        { "id": 31, "question": "0.0001 waxaa loo qori karaa:", "answer": "10⁻⁴" },
        { "id": 32, "question": "Macnaha Square Root (Xidid laba-jibbaaran) waa:", "answer": "laba jibbaar" }
      ]
    },
    {
      "name": "Algebra and Equations",
      "questions": [
        { "id": 6, "question": "(10 × 7) × 5 =", "answer": "350" },
        { "id": 11, "question": "Fududee: (4x + y − 8) − (2x − 4y + 6)", "answer": "2x + 5y − 14" },
        { "id": 12, "question": "Raadi qiimaha √(7m + c) haddii m=2, c=50", "answer": "8" },
        { "id": 13, "question": "Isleegta 6x + 10, x waxa ay u taagan tahay:", "answer": "doorsoome" },
        { "id": 14, "question": "Kala bixi: 5(x + 2)", "answer": "5x + 10" },
        { "id": 16, "question": "Haddii x=5, y=2, markaas x + 3y =", "answer": "11" },
        { "id": 17, "question": "Raadi x: 2x + 3 = 13", "answer": "5" },
        { "id": 19, "question": "Fududeynta (x − 5)(x + 5) waa:", "answer": "x² − 25" },
        { "id": 20, "question": "25x ÷ x² =", "answer": "25/x" },
        { "id": 22, "question": "Fududee: (2x + 6) + (4x − 2)", "answer": "6x + 4" },
        { "id": 24, "question": "6 + (2 + 3) =", "answer": "11" },
        { "id": 30, "question": "Faktoorey: x² − 10x + 25", "answer": "(x − 5)²" },
        { "id": 36, "question": "Raadi x haddii 2x + 7 = 17", "answer": "5" },
        { "id": 37, "question": "Isleegta 5x + 20, x waxa ay u taagan tahay:", "answer": "doorsoome" },
        { "id": 38, "question": "(−30) ÷ (−6) =", "answer": "5" },
        { "id": 39, "question": "Fududee: 5x + 8x − 9x", "answer": "4x" },
        { "id": 40, "question": "a × a × b × a × b =", "answer": "a³b²" }
      ]
    },
    {
      "name": "Geometry and Coordinates",
      "questions": [
        { "id": 3, "question": "Bedka laydi leh dhinacyo 5sm iyo 6sm waa:", "answer": "30 sm²" },
        { "id": 15, "question": "Bedka guud ee shaxanka dhulubada waa qiyaastii:", "answer": "326 cm²" },
        { "id": 18, "question": "Bedka dhululubo leh r=10, h=50, π=3.14 waa:", "answer": "3768 cm²" },
        { "id": 28, "question": "Dhibicda (x, y) ee plane-ka waxaa lagu matalaa:", "answer": "(5, 2)" },
        { "id": 29, "question": "Saddex xagal qumman (right triangle) leh 3sm iyo 4sm, dhinaca maqan waa:", "answer": "5 cm" },
        { "id": 33, "question": "Fogaanta u dhaxaysa labada dhibic (3, 3) waa:", "answer": "4 halbeeg" },
        { "id": 35, "question": "Dhinacyada saddex-xagal qumman haddii laba yihiin 3 iyo 4, ka saddexaad waa:", "answer": "5" }
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
