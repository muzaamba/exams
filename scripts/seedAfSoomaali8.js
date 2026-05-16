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
  "subject": "somali",
  "grade": "grade8",
  "year": 2021,
  "title": "Af-Soomaali Grade 8 Exam 2020/2021",
  "sections": [
    {
      "section": "Sheeko - Caqliga Wanaagsan",
      "questions": [
        {
          "id": 1,
          "question": "Kaafi, waxaa uu billaabay in uu tartiib u socdo markii uu?",
          "options": {
            "A": "jidka marayey",
            "B": "guriga u dhowaaday",
            "C": "arkayey eedadiis",
            "D": "la siiyey lacagta"
          },
          "answer": "B"
        },
        {
          "id": 2,
          "question": "Waxaa Kaafi ka codsaday in uu farriin muhiim ah gaarsiiyo eeddadiis?",
          "options": {
            "A": "walaalkiis",
            "B": "aabbihiis",
            "C": "adeerkiis",
            "D": "hooyadiis"
          },
          "answer": "A"
        },
        {
          "id": 3,
          "question": "Kaafi wuxuu isu heystay inuu yahay nin?",
          "options": {
            "A": "maskiin ah",
            "B": "faqiir ah",
            "C": "taajir ah",
            "D": "fataal ah"
          },
          "answer": "C"
        },
        {
          "id": 4,
          "question": "Kaafi wuxuu lacagta ku tiriyay?",
          "options": {
            "A": "guriga adeerkiis",
            "B": "sariirtiisa",
            "C": "bannaanka",
            "D": "jidka"
          },
          "answer": "D"
        },
        {
          "id": 5,
          "question": "Kaafi wuxuu jidka ugu socday sidii nin?",
          "options": {
            "A": "cabsanaya",
            "B": "qeylinaya",
            "C": "ordaya",
            "D": "xarragoonaya"
          },
          "answer": "D"
        },
        {
          "id": 6,
          "question": "Wiilka wuxuu doonayay inuu dadka tuso?",
          "options": {
            "A": "dadka kale",
            "B": "walaalkiis",
            "C": "eeddadiisa",
            "D": "aabbihiisa"
          },
          "answer": "A"
        },
        {
          "id": 7,
          "question": "Kaafi adeerkiis wuxuu u ballan qaaday inuu?",
          "options": {
            "A": "dibedda u wadayo",
            "B": "dhibco fiican siinayo",
            "C": "lacag siinayo",
            "D": "waxbarayo"
          },
          "answer": "C"
        },
        {
          "id": 8,
          "question": "Kaafi lacagta wuxuu ku iibsan lahaa?",
          "options": {
            "A": "ari iyo geel",
            "B": "kombiyuutar iyo raadiye",
            "C": "lo' iyo ari",
            "D": "kaamiro iyo mobil"
          },
          "answer": "B"
        },
        {
          "id": 9,
          "question": "Kaafi wuxuu ku fekeray inuu noqdo nin magac leh marka uu dhammeeyo?",
          "options": {
            "A": "Jaamacadda",
            "B": "dugsiga sare",
            "C": "dugsiga dhexe",
            "D": "dugsiga quraanka"
          },
          "answer": "A"
        },
        {
          "id": 10,
          "question": "Kaafi wuxuu hantida dadka kale u arkay?",
          "options": {
            "A": "fiican",
            "B": "xun",
            "C": "qatar ah",
            "D": "wax dhisaysa"
          },
          "answer": "B"
        },
        {
          "id": 11,
          "question": "Wiilka wuxuu arrinta u sheegay?",
          "options": {
            "A": "adeerkii",
            "B": "aabbihii",
            "C": "walaalkii",
            "D": "saaxibbadii"
          },
          "answer": "C"
        },
        {
          "id": 12,
          "question": "\"Haddii aan lacagtaas haysan lahaa, waxaan dhigan lahaa meel fiican\" waxaa yiri?",
          "options": {
            "A": "aabbihii",
            "B": "abtigii",
            "C": "adeerkii",
            "D": "walaalkii"
          },
          "answer": "D"
        },
        {
          "id": 13,
          "question": "Kaafi sirta uusan ceshan waayey wuxuu u sheegay?",
          "options": {
            "A": "walaalkiisa",
            "B": "aabbihiisa",
            "C": "adeerkiisa",
            "D": "eeddadiisa"
          },
          "answer": "A"
        },
        {
          "id": 14,
          "question": "Ugu dambeyn wiilku wuxuu jeclaystay inuu lacagtiisa dhigto?",
          "options": {
            "A": "ayuuto",
            "B": "bangi",
            "C": "shirkad",
            "D": "ganacsi"
          },
          "answer": "B"
        },
        {
          "id": 15,
          "question": "Waxaa Kaafi bangiga geeyay?",
          "options": {
            "A": "walaalkii",
            "B": "agaasimaha",
            "C": "adeerkii",
            "D": "aabbihii"
          },
          "answer": "A"
        },
        {
          "id": 16,
          "question": "Cinwaanka sheekadu waa?",
          "options": {
            "A": "Kaafi iyo walaalkii",
            "B": "Caqliga wanaagsan",
            "C": "Lacagtii badneyd",
            "D": "Kaafi iyo bangigii"
          },
          "answer": "B"
        },
        {
          "id": 17,
          "question": "\"Keen hadda inta aan maskaxdeydu is beddelin\" waxaa yiri?",
          "options": {
            "A": "Agaasimihii",
            "B": "Walaalkii",
            "C": "Kaafi",
            "D": "Adeerkii"
          },
          "answer": "C"
        },
        {
          "id": 18,
          "question": "Kaafi in lacagta la keydsado waxaa baray?",
          "options": {
            "A": "Agaasimaha",
            "B": "Walaalkii",
            "C": "Adeerkii",
            "D": "Aabbihii"
          },
          "answer": "B"
        },
        {
          "id": 19,
          "question": "Lacagta Kaafi loo soo dhiibay waxay ahayd?",
          "options": {
            "A": "570 Dollar",
            "B": "705 Dollar",
            "C": "507 Dollar",
            "D": "750 Dollar"
          },
          "answer": "D"
        },
        {
          "id": 20,
          "question": "Kaafi waxaa adeerkiisa u diray?",
          "options": {
            "A": "E-mail",
            "B": "Taleefan",
            "C": "Fax",
            "D": "Boosto"
          },
          "answer": "B"
        }
      ]
    },
    {
      "section": "Naxwe",
      "questions": [
        {
          "id": 21,
          "question": "Xiririyeyaalku shardileydu waa?",
          "options": {
            "A": "Shan qaybood",
            "B": "Laba qaybood",
            "C": "Saddex qaybood",
            "D": "Todoba qaybood"
          },
          "answer": "C"
        },
        {
          "id": 22,
          "question": "\"Marka aad daashaan, waad nasataan\" hawraartani waa?",
          "options": {
            "A": "Gooreyn tagto",
            "B": "Gooreyn joogte",
            "C": "Gooreyn diidmo",
            "D": "Gooreyn weydiin"
          },
          "answer": "A"
        },
        {
          "id": 23,
          "question": "\"Axmed cashar ayuu qoray\" wuxuu muujinayaa fal?",
          "options": {
            "A": "ahaansho",
            "B": "gudbe",
            "C": "kal-kaaliye",
            "D": "ma-gudbe"
          },
          "answer": "B"
        },
        {
          "id": 24,
          "question": "\"Bisaddu jiir bay dishay\" erayga Bisad waa?",
          "options": {
            "A": "yeele",
            "B": "la yeele",
            "C": "gudbe",
            "D": "ma-gudbe"
          },
          "answer": "A"
        },
        {
          "id": 25,
          "question": "\"Wiilku wuu wanaagsan yahay\" waa?",
          "options": {
            "A": "sifo caddayn",
            "B": "sifo caadi ah",
            "C": "sifo xulasho",
            "D": "sifo isbarbardhig"
          },
          "answer": "B"
        }
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
    const sectionName = sec.section || sec.name;
    console.log(`Processing section: ${sectionName}`);

    const { data: section, error: secErr } = await supabase.from('sections').insert({
      exam_id: examId,
      section_name: sectionName,
      sort_order: i + 1
    }).select('id').single();

    if (secErr) {
      console.error('Error inserting section', sectionName, secErr.message);
    }

    const sectionId = section?.id;
    const questionsToInsert = sec.questions.map((q, index) => {
      totalQuestions++;
      const isMcq = !!q.options;
      return {
        exam_id: examId,
        section_id: sectionId,
        question_number: totalQuestions,
        question_type: isMcq ? 'mcq' : 'short_answer',
        topic: sectionName,
        question_text: q.question,
        option_a: q.options?.A || null,
        option_b: q.options?.B || null,
        option_c: q.options?.C || null,
        option_d: q.options?.D || null,
        correct_answer: isMcq ? q.answer.toLowerCase() : null,
        explanation: !isMcq ? (typeof q.answer === 'object' ? JSON.stringify(q.answer) : q.answer) : null,
        difficulty: 'medium'
      };
    });

    const { error: qErr } = await supabase.from('questions').insert(questionsToInsert);
    if (qErr) {
      console.error(`Failed to insert questions for ${sectionName}:`, qErr.message);
    } else {
      console.log(`Successfully inserted ${questionsToInsert.length} questions for ${sectionName}.`);
    }
  }

  console.log('Seeding completed! Total questions processed:', totalQuestions);
}

seed().catch(console.error);
