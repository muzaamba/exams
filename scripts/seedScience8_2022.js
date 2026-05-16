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
  "year": 2022,
  "title": "Saynis Fasalka 8aad 2022",
  "sections": [
    {
      "name": "General Science & Knowledge",
      "questions": [
        { "question": "Lakabka sare ee dhulka oo ka samaysan bus iyo dhagxaan waxaa loo yaqaan:", "answer": "Carro" },
        { "question": "Dalka Ereteriya waxaa uu helay madax banaanidiisa sanadkii:", "answer": "1993" },
        { "question": "Gumaystaha waxaa uu ka midaysan yahay in uu:", "answer": "Isku diro bulshada uu gumaysto" },
        { "question": "Gobalka Maqrib waxaa leeyahay buuraha Atlas:", "answer": "Atlas" },
        { "question": "Madaxweynihii ugu horeeyay ee Aljeeriya:", "answer": "Axmad Ben Bella" },
        { "question": "Lacagta Marooko:", "answer": "Dirham" },
        { "question": "Luqada rasmiga ah ee Tuniisiya:", "answer": "Faransiis" },
        { "question": "Magaalada Qaahira waxay leedahay minaarado ka badan:", "answer": "Kun minaaradood" },
        { "question": "Biyo xireenka Jabal Awliya wuxuu ku yaal:", "answer": "Niilka Cad" },
        { "question": "Wareega dhulka:", "answer": "40207.92444 mayl" },
        { "question": "Afayeenka baarlamaanka KAMA MID AHA xuquuqdiisa:", "answer": "magacaabo ra’iisul wasaare" },
        { "question": "Humaaga kaamirada biin daloolka ah waa:", "answer": "Rogan ama foorana" },
        { "question": "Waraabowga heerka 3aad wuxuu saameeyaa:", "answer": "Maskaxda iyo dareemayaasha" },
        { "question": "Haddii Hawsha H = F × X, markaas Xoogga F =", "answer": "H ÷ X" },
        { "question": "Fayraska keena AIDS waxaa loo yaqaan:", "answer": "HIV" },
        { "question": "Dariiqada cilmi baarista ee sayniska waxaa la yiraahdaa:", "answer": "Dariiq cilmiyeed" },
        { "question": "Waraabinta habeenkii waxaa loo sameeyaa si:", "answer": "loo yareeyo uumi baxa biyaha" },
        { "question": "Cilladda aragga fog waxaa lagu saxaa bikaaco:", "answer": "Kulmisa" },
        { "question": "Xawaaraha socodka dabeysha waxaa lagu cabbiraa qalabka:", "answer": "Dabeysha cabbir (Anemometer)" }
      ]
    },
    {
      "name": "Matching (Iswaafajinta)",
      "questions": [
        { "question": "Bacrimin", "answer": "Isku midoobidda unugyada lab iyo dheddig" },
        { "question": "Caleenta", "answer": "Meesha cuntada laga sameeyo geedka" },
        { "question": "Xidigaha qiblada", "answer": "Xiddigta waqooyi" },
        { "question": "Aydhis", "answer": "Cudur HIV keeno" },
        { "question": "Dayax gacmeed", "answer": "Meere ku wareega meere kale" },
        { "question": "Waraabin dhibcis", "answer": "Hab biyo si toos ah u gaara xididka" },
        { "question": "Khafiyadaha la adeegsado", "answer": "Mashiinno shaqo fududeeya" },
        { "question": "Huunyo", "answer": "Qaybta cuntada sameysa geedka" },
        { "question": "Iskudhis", "answer": "Laba walax oo kiimiko isugu darantay" },
        { "question": "Qurubyada atomka", "answer": "Borotoon, neutron, elektaroon" }
      ]
    },
    {
      "name": "Short Answer & Definitions",
      "questions": [
        { "question": "Cimilada meel gaar ah muddo gaaban:", "answer": "Cilimilo Gooreed" },
        { "question": "Awooda hawl lagu qabto waxaa loo yaqaan:", "answer": "Tamartu" },
        { "question": "Mashiin fududeeya shaqo (tusaale ahaan):", "answer": "Karirad" },
        { "question": "Duumada waxaa gudbiya:", "answer": "Anoofalis" },
        { "question": "Faa’iidada xayawaanka ka helaan dhirta:", "answer": "Cuno iyo Ogsanjin" },
        { "question": "Taranka xoolaha wuxuu kordhaa xilliga:", "answer": "Roobaadka" },
        { "question": "Cilmiga lagu helo baaris:", "answer": "Baaris" },
        { "question": "Tirada borotoonada atomka waxaa loo yaqaan:", "answer": "Tiro Atam" },
        { "question": "Mandheerta iyo ilmaha isku xira waxaa loo yaqaan:", "answer": "Xudunta" },
        { "question": "Mitirku waa cabbirka:", "answer": "Fogaanta" }
      ]
    },
    {
      "name": "Chemistry & Physics Basics",
      "questions": [
        { "question": "Sumadda Aluminiyam", "answer": "Al" },
        { "question": "Sumadda Fluorine", "answer": "F" },
        { "question": "Sumadda Magniisiyam", "answer": "Mg" },
        { "question": "Sumadda Lithium", "answer": "Li" },
        { "question": "Birlabta, halkee ayuu xoogga ugu badan ku yaal?", "answer": "Cirifyada, waqooyi iyo koonfur" },
        { "question": "Falaar la ganayo waxay leedahay tamar noocee ah?", "answer": "Tamar socod" },
        { "question": "Cuntada waxay leedahay tamar noocee ah?", "answer": "Tamar keydsan" },
        { "question": "Diyaarad duulaysa waxay leedahay tamar noocee ah?", "answer": "Tamar socod" },
        { "question": "Birlab waxay leedahay tamar noocee ah?", "answer": "Tamar keydsan" }
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
