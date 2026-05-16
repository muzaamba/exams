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
  "year": 2022,
  "title": "Xisaab Fasalka 8aad 2022",
  "sections": [
    {
      "name": "General Questions",
      "questions": [
        { "id": 1, "question": "Ururka soo koobaya dhammaan ku tirsanayaasha ururrada, waxaa lagu magacaabaa:", "answer": "Urur guud" },
        { "id": 2, "question": "Haddii G = {buug, qalin, mastarad, sabuurad, jeeso}, B = {buug, mastarad, jeeso}. Urur duleedka B waa:", "answer": "{qalin, sabuurad}" },
        { "id": 3, "question": "To waliba oo aan ahayn (0) muujyeheeduna yahay (0) waxa ay le'eg tahay:", "answer": "1" },
        { "id": 4, "question": "Raadi mugga saddex jibbaaranaha:", "answer": "729 cm³" },
        { "id": 5, "question": "Qoro qoraalka gaaban 65, tirada 5 waxa loo yaqaan:", "answer": "Sal" },
        { "id": 6, "question": "Haddii mugga saddex jibbaarane uu yahay 125 m³, dhinaca waa:", "answer": "5 m" },
        { "id": 7, "question": "850000 qormo saynis ahaan:", "answer": "8.5 × 10⁵" },
        { "id": 8, "question": "1 × 10⁴ geed, wadarta:", "answer": "1.5 × 10⁴" },
        { "id": 9, "question": "Fududeynta (x + 5)(x − 5):", "answer": "x² − 25" },
        { "id": 10, "question": "4x + 2x la isku daro:", "answer": "6x" },
        { "id": 11, "question": "a × b × a × b × a waa:", "answer": "a³b²" },
        { "id": 12, "question": "6ab ÷ 3b:", "answer": "2a" },
        { "id": 13, "question": "Wareegga shaxanka laydiga:", "answer": "10x + 6" },
        { "id": 14, "question": "Bedka shaxan:", "answer": "8 cm²" },
        { "id": 15, "question": "Bedka saddex jibbaaran:", "answer": "315 cm²" },
        { "id": 16, "question": "Bedka dhululubo:", "answer": "3768 cm²" },
        { "id": 17, "question": "Dhinaca maqan (Pythagoras):", "answer": "5 cm" },
        { "id": 18, "question": "Xagasha shan geesle:", "answer": "108°" },
        { "id": 19, "question": "Fogaan (0,-3) ilaa (0,3):", "answer": "6 halbeeg" },
        { "id": 20, "question": "Wareegga saddex xagal:", "answer": "15 cm" }
      ]
    },
    {
      "name": "Matching (Iswaafajinta)",
      "questions": [
        { "id": 21, "question": "{6,8,10,12,14}:", "answer": "Bart-bartameed / tiro urur" },
        { "id": 22, "question": "45°:", "answer": "Xagal" },
        { "id": 23, "question": "8×8×8×8:", "answer": "8⁴" },
        { "id": 24, "question": "8000000:", "answer": "8×10⁶" },
        { "id": 25, "question": "10000:", "answer": "10⁴" },
        { "id": 26, "question": "2x²:", "answer": "Awood (square term)" },
        { "id": 27, "question": "x+y=12, x−y=4:", "answer": "Isla'egyo wadajir" },
        { "id": 28, "question": "x(2x):", "answer": "2x²" },
        { "id": 29, "question": "Xagal dibadeedka siddeed geesle:", "answer": "45°" },
        { "id": 30, "question": "Bar dhexe:", "answer": "Bart-bartameed" }
      ]
    },
    {
      "name": "Fill in the blanks (Buuxi meelaha bannaan)",
      "questions": [
        { "id": 31, "question": "Ururka soo koobaya dhammaan ku tirsanayaasha:", "answer": "Urur guud" },
        { "id": 32, "question": "3³:", "answer": "27" },
        { "id": 33, "question": "(x+2)²:", "answer": "x² + 4x + 4" },
        { "id": 34, "question": "3 × 10³:", "answer": "3000" },
        { "id": 35, "question": "Labajibbaarane wareeggiisa:", "answer": "4ab" }
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
