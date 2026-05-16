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
  "subject": "science",
  "grade": "grade8",
  "year": 2021,
  "title": "Saynis Fasalka 8aad 2021",
  "sections": [
    {
      "name": "General Science Questions",
      "questions": [
        { "question": "Cudurka duumada waxaa gudbiya kaneecada nooca:", "answer": "Anofalis" },
        { "question": "Cudurka jabtada ragga waxa uu kaga dhacaa:", "answer": "Kaadi mareenka" },
        { "question": "Habka taranka dhirta/unugyada oo isku biiraya waxaa loo yaqaan:", "answer": "Bacriminta" },
        { "question": "Cudur aan ku gudbi karin hawada:", "answer": "Aydhis" },
        { "question": "Cudurka waraabowga waxaa lagu xakameyn karaa:", "answer": "Ka hortag sinada iyo isticماalka daawo" },
        { "question": "Habka hawo u beddelayo neef (neefsasho):", "answer": "Uuoi bax" },
        { "question": "Boqolleyda biyaha macaanka ah ee dhulka:", "answer": "3%" },
        { "question": "Xubinta soo saarta unugyada taranka dhaddiga:", "answer": "Ugxan sidaha" },
        { "question": "Neisseria gonorrhea waxa ay keentaa:", "answer": "Jabtada" },
        { "question": "Muddada uurka bani’aadamka:", "answer": "9 bilood" },
        { "question": "Maxaa aan muhiim u ahayn photosynthesis?", "answer": "oksaaydh" },
        { "question": "Muddada shinbir ku dul fadhiso ukunta waxaa lagu magacaabaa:", "answer": "Ukun dilaacid" },
        { "question": "Muddada hooyadu ilmaha siddo waxaa loo yaqaan:", "answer": "Uur-ku-sid" },
        { "question": "Bacriminta raha waxay ka dhacdaa:", "answer": "Dibadda jirkooda" },
        { "question": "Cudur qofka ka gudba qof kale waxaa loo yaqaan:", "answer": "Cudurrada la is qaadsiiyo" },
        { "question": "Maaddo ku jirta caleenta oo siisa midabka cagaaran:", "answer": "Cagaariso (chlorophyll)" },
        { "question": "Dheefsade labaad ee silsiladda cuntada (tusaale):", "answer": "Rah" },
        { "question": "Cimilo-gooreed waa:", "answer": "Xaaladaha cimilada muddo gaaban" },
        { "question": "Kulbeegga (Thermometer) waxa lagu cabbiraa:", "answer": "Heerkulka hawada" },
        { "question": "Halbeegga shaqada (Work) waa:", "answer": "Joule (J)" },
        { "question": "Haddii Xoog = 10N, Masaafad = 5m, markaas Shaqo =", "answer": "50 J" },
        { "question": "Dhaqdhaqaaqa isha waxa haya:", "answer": "Murqo" },
        { "question": "Xumbada isha waxay keentaa:", "answer": "Arag-gaabnida" },
        { "question": "Qaybaha muhiimka u ah aragga:", "answer": "Aragga" },
        { "question": "Meertada nolosha kaneecada waxay ka bilaabataa:", "answer": "Ugxaan → kaneeco" },
        { "question": "Aqoonta sayniska waxaa lagu helaa:", "answer": "Baaris" },
        { "question": "Xiddiga qiblada waxa uu caawiyaa:", "answer": "Badmareenada" },
        { "question": "Ilaha tamarta ugu weyn ee dhulka:", "answer": "Qoraxda" },
        { "question": "Habka dhirtu cunto u samayso:", "answer": "Photosynthesis" },
        { "question": "Isku xirnaanta silsiladda cuntada dhowr ah:", "answer": "Shabakadda cuntada" },
        { "question": "Beerista dhir cusub waxaa loo yaqaan:", "answer": "Dhirayn" },
        { "question": "Habka sayniska ee loo maro xallinta mashaakilaadka:", "answer": "Dariiq cilmiyeed" },
        { "question": "Birlabtu waxay leedahay:", "answer": "Cirif waqooyi iyo koonfur" },
        { "question": "Dhowga hawada iyo wasakhaynta waxay keentaa:", "answer": "Roob aysiidh ah" },
        { "question": "Birlab la jebiyo waxay u qaybsantaa:", "answer": "Laba cirif" },
        { "question": "Aqoonta iyo waayo-aragnimo ku dhisnaan raadinta runta:", "answer": "Saynis" },
        { "question": "Qolka loogu talagalay tijaabada sayniska:", "answer": "Sheybaarka sayniska" },
        { "question": "Saynisyahanka qaabilsan cimilada waxaa loo yaqaan:", "answer": "Cimilo-aqooneed" }
      ]
    },
    {
      "name": "Matching (Iswaafajinta)",
      "questions": [
        { "question": "Xaw", "answer": "dhaqdhaqaaq" },
        { "question": "Ugxaan", "answer": "unug taran" },
        { "question": "Folkaano", "answer": "qarax buur" },
        { "question": "Hawl", "answer": "shaqo" },
        { "question": "Curiye", "answer": "walax hal nooc ah" },
        { "question": "Tamar", "answer": "awood shaqo" },
        { "question": "Dawan-danabeed", "answer": "qalab koronto" },
        { "question": "Niyuukastal", "answer": "cudur" },
        { "question": "Isku-dhis", "answer": "laba walax isku daran" },
        { "question": "Isku-jir", "answer": "walxo kala duwan" }
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
    const questionsToInsert = sec.questions.map((q, idx) => {
      totalQuestions++;
      return {
        exam_id: examId,
        section_id: sectionId,
        question_number: totalQuestions,
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
