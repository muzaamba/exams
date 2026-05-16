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
  "subject": "ict",
  "grade": "grade8",
  "year": 2022,
  "title": "ICT Grade 8 Exam 2022",
  "sections": [
    {
      "name": "Multiple Choice",
      "questions": [
        { "id": 1, "question": "Howl kasta oo la qabanaayo waxa ay u baahantahay:", "options": ["Tamar", "Shaqo", "Socod", "Biyo"], "answer": "Tamar" },
        { "id": 2, "question": "Ka soo saar lidka fayruska:", "options": ["Soollar", "Falaash", "Avast", "Danab"], "answer": "Avast" },
        { "id": 3, "question": "Astamaha fayruska kombiyuutarka:", "options": ["Furmi waayo", "Xawaaraha oo yaraada", "Iska dama", "Dhawaaq bixiya"], "answer": "Xawaaraha oo yaraada" },
        { "id": 4, "question": "Qorraxda waxa laga dhaliyaa danab iyadoo la adeegsanayo:", "options": ["Koronto", "Soollar", "Dayax", "Kombiyuutar"], "answer": "Soollar" },
        { "id": 5, "question": "Bold (qoraal qaro weyn) waxaa lagu sameeyaa:", "options": ["I", "U", "B", "S"], "answer": "B" },
        { "id": 6, "question": "Mastaraddu dokumentiga waxa ay ku taallaa:", "options": ["Kor iyo dhinaca midig", "Hoos iyo bidix", "Kor iyo bidix", "Kor iyo dhexda"], "answer": "Kor iyo bidix" },
        { "id": 7, "question": "Fayrus wuxuu ku gudbi karaa:", "options": ["Flash fayrus wata", "Qoraal typing", "Muuqaal daawasho", "Maqal shubid"], "answer": "Flash fayrus wata" },
        { "id": 8, "question": "Backstage waxa laga helaa:", "options": ["Keydinta iyo saxidda", "Qorista", "Daabacaad", "Habaynta kaliya"], "answer": "Keydinta iyo saxidda" },
        { "id": 9, "question": "Si loo abuuro document cusub:", "options": ["Create", "Open", "Blank document", "File"], "answer": "Blank document" },
        { "id": 10, "question": "Password lama sameeyo:", "options": ["Magacaaga", "Lambaro", "Summado", "Isku-dar"], "answer": "Magacaaga" },
        { "id": 11, "question": "Tamarta gurta (non-renewable):", "options": ["Dabaysha", "Nukliyeerka", "Qoraxda", "Biyaha"], "answer": "Nukliyeerka" },
        { "id": 12, "question": "Tamarta dabaysha waa:", "options": ["Holacda", "Gubata", "Gurta", "Maaxata"], "answer": "Gurta" },
        { "id": 13, "question": "Copy waxaa lagu sameeyaa:", "options": ["File", "Insert", "Home", "Page layout"], "answer": "Home" },
        { "id": 14, "question": "Shaqo aan la sameynin:", "options": ["Ilaalo", "Damin", "Qaadid", "Afgarasho"], "answer": "Qaadid" },
        { "id": 15, "question": "Font size beddel:", "options": ["Font size dooro tirada", "Font nooca dooro", "Enter", "File"], "answer": "Font size dooro tirada" },
        { "id": 16, "question": "Bullets waxa laga helaa:", "options": ["Page layout", "Insert", "Home", "Reference"], "answer": "Home" },
        { "id": 17, "question": "Tamarta qoraxda la keydiyo marka:", "options": ["Qorraxdu dhacdo", "Kulayl jiro", "Roob da'o", "Koronto tagto"], "answer": "Qorraxdu dhacdo" },
        { "id": 18, "question": "Save document:", "options": ["File > Save", "Home > Save", "Insert > Save", "View > Save"], "answer": "File > Save" },
        { "id": 19, "question": "Print document:", "options": ["File > Print", "Home > Print", "Insert > Print", "View > Print"], "answer": "File > Print" }
      ]
    },
    {
      "name": "Fill in the blanks",
      "questions": [
        { "id": 21, "question": "Ribbon-ka waa meesha laga helo amarrada muhiimka ah.", "answer": "Ribbon-ka" },
        { "id": 23, "question": "Barnaamij ka difaaca fayruska:", "answer": "lidka-fayruska" },
        { "id": 24, "question": "Barnaamij waxyeelleeya kombiyuutarka:", "answer": "fayrus" },
        { "id": 25, "question": "Nooc ka mid ah tamarta maaxata:", "answer": "Qoraxda" },
        { "id": 26, "question": "Tamarta qoraxda waxay ku timaadaa:", "answer": "ilays iyo kulayl" },
        { "id": 27, "question": "Faylasha dhowaan la furay:", "answer": "Recent documents" },
        { "id": 28, "question": "Xogta la ilaaliyo (password):", "answer": "Afgarasho" }
      ]
    },
    {
      "name": "Short Answer",
      "questions": [
        { "id": 29, "question": "Faahfaahin kooban ka bixi MS Word 2010", "answer": "Barnaamij lagu qoro, lagu habeeyo, laguna daabaco dokumentiyada" },
        { "id": 30, "question": "Noocyada tamarta u kala saar maaxata iyo gurta", "answer": "Maaxata: Qoraxda, dabaysha, biyaha. Gurta: Nukliyeer, shidaal, danab, kul" }
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
      const isMcq = Array.isArray(q.options);
      
      let correctAns = null;
      if (isMcq) {
        const indexAns = q.options.indexOf(q.answer);
        correctAns = indexAns === 0 ? 'a' : indexAns === 1 ? 'b' : indexAns === 2 ? 'c' : indexAns === 3 ? 'd' : null;
      }

      return {
        exam_id: examId,
        section_id: sectionId,
        question_number: q.id || totalQuestions,
        question_type: isMcq ? 'mcq' : 'short_answer',
        topic: sec.name,
        question_text: q.question,
        option_a: isMcq ? q.options[0] : null,
        option_b: isMcq ? q.options[1] : null,
        option_c: isMcq ? q.options[2] : null,
        option_d: isMcq ? q.options[3] : null,
        correct_answer: correctAns,
        explanation: !isMcq ? q.answer : null,
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
