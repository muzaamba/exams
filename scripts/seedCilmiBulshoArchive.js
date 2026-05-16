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
  "subject": "geography",
  "grade": "grade8",
  "year": 2023,
  "title": "Cilmi Bulsho Grade 8 Revision Pack",
  "questions": [
    {"q": "Lakabka sare ee carrada waxa loo yaqaan", "a": "Carro"},
    {"q": "Dhaqaalaha Jabuuti waxa uu ku tiirsan yahay", "a": "Adeegga"},
    {"q": "Sababta cirifka waqooyi u qabow yahay", "a": "Dhulbaraha ayuu ka fog yahay"},
    {"q": "Xaalufinta deegaanka waxa kamid ah", "a": "Dhirta oo la jaro"},
    {"q": "Beerista dhir cusub waxa loo yaqaan", "a": "Dhireyn"},
    {"q": "Jabuuti xornimada waxa ay qaadatay", "a": "27 Juun 1977"},
    {"q": "Madaxweynihii ugu horreeyay Aljeeriya", "a": "Axmed Ben Bella"},
    {"q": "Lacagta Aljeeriya", "a": "Dinar"},
    {"q": "Marooko waxa ay ka tirsan tahay", "a": "IGAD ma aha, OPEC ma aha, COMESA sax"},
    {"q": "Ahraamta waxaa laga helaa", "a": "Masar"},
    {"q": "Dhulbaraha Soomaaliya waxa uu maraa", "a": "Sanguni"},
    {"q": "Tunisiy waxa ay ku taal Afrika", "a": "Waqooyi"},
    {"q": "Qorraxdu waxa ay ka soo baxdaa", "a": "Bariga"},
    {"q": "Dhulku hal wareeg waxa uu qaataa", "a": "24 saac"},
    {"q": "Labada dhigood u dhaxaysa masaafada", "a": "69.4 mayl"},
    {"q": "Jihada qorrax dhaca", "a": "Galbeed"},
    {"q": "Webiga Nayl waxa mara", "a": "Masar"},
    {"q": "Jadeecada calaamadeeda", "a": "Indho xanuun"},
    {"q": "Jadeecada ka hortag", "a": "Tallaalka MMR"},
    {"q": "Cudurka ugu da'da weyn", "a": "Duumada"},
    {"q": "Dhagaxtuur waxa uu dhacay", "a": "1948"},
    {"q": "Madaxweynihii 1aad Soomaaliya", "a": "Aadan Cabdulle Cismaan"},
    {"q": "Madaxweynihii 2aad Soomaaliya", "a": "Cabdirashiid Cali Sharmaarke"},
    {"q": "Cabbaasiyiinta waxa ay ka wareegeen", "a": "Umawiyiinta"},
    {"q": "Khaliifkii 1aad Cabbaasiyiinta", "a": "Abuu Al-Cabaas"},
    {"q": "Caasimada Cabbaasiyiinta", "a": "Baqdaad"},
    {"q": "Xaawo Taako waxa ay ahayd", "a": "Halgame"},
    {"q": "Fayraska jadeecada", "a": "Morbillivirus"},
    {"q": "Magaalada Muqdisho waa", "a": "Caasimada Soomaaliya"},
    {"q": "Suudaan Ra’iisul wasaarihii hore", "a": "Ismail Al-Azhari"},
    {"q": "Bakool caasimaddeeda", "a": "Xudur"},
    {"q": "Qorrax dhaqaaq waxa loo adeegsadaa", "a": "Waqtiga"},
    {"q": "Webiga Jubba waxa uu ku dhammaadaa", "a": "Sanguni"}
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

  // Create a single section
  const { data: section, error: secErr } = await supabase.from('sections').insert({
    exam_id: examId,
    section_name: "Su'aalo iyo Jawaabo (Questions & Answers)",
    sort_order: 1
  }).select('id').single();

  if (secErr) {
    console.error('Error inserting section:', secErr.message);
  }

  const sectionId = section?.id;
  const questionsToInsert = examData.questions.map((q, index) => {
    return {
      exam_id: examId,
      section_id: sectionId,
      question_number: index + 1,
      question_type: 'short_answer',
      topic: "Cilmi Bulsho",
      question_text: q.q,
      correct_answer: q.a,
      explanation: q.a,
      difficulty: 'medium'
    };
  });

  const { error: qErr } = await supabase.from('questions').insert(questionsToInsert);
  if (qErr) {
    console.error(`Failed to insert questions:`, qErr.message);
  } else {
    console.log(`Successfully inserted ${questionsToInsert.length} questions.`);
  }

  console.log('Seeding completed!');
}

seed().catch(console.error);
