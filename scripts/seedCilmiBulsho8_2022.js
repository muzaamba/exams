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
  "year": 2022,
  "title": "Cilmi Bulsho Grade 8 Exam 2022",
  "sections": [
    {
      "name": "Part 1: Xulasho (Multiple Choice)",
      "questions": [
        {"q": "Lakabka sare ee dhulka oo ka samaysan bus iyo dhagxaan waxa loo yaqaan", "options": ["Dhoobo","Carro","Bacaad","Nabaad guur"], "answer": "Bacaad"},
        {"q": "Dalka Ereteriya waxa uu helay madax banaanidiisa sanadkii", "options": ["1983","1993","1893","1999"], "answer": "1993"},
        {"q": "Gumaystaha waxaa uu ka midaysan yahay in uu", "options": ["Isku diro bulshada","Horumariyo dhaqaalaha","Midnimada xoojiyo","Dadkooda wax baro"], "answer": "Isku diro bulshada"},
        {"q": "Gobalka Maqrib waxaa uu leeyahay buuro dhaadheer oo loo yaqaan", "options": ["Goolis","Duurus","Shimbiris","Atlas"], "answer": "Atlas"},
        {"q": "Madaxweynihii ugu horeeyay ee dalka Aljeeriya", "options": ["Axmad Ben Bella","Maxamed Mascuud","Xabiib Boorqiiba","Ismaaciil Al Ashari"], "answer": "Axmad Ben Bella"},
        {"q": "Lacagta laga isticmaalo dalka Marooko", "options": ["Dinaar","Dirham","Faran","Doolar"], "answer": "Dirham"},
        {"q": "Luqadda rasmiga ah ee dalka Tuniisiya waa", "options": ["Isbaanish","Talyaani","Faransiis","Carabi"], "answer": "Carabi"},
        {"q": "Magaalada Qaahira waxay leedahay in ka badan", "options": ["Kun minaaradood","Laba kun","Saddex kun","Sideed boqol"], "answer": "Kun minaaradood"},
        {"q": "Biya xireenka Jabal Awliya waxa uu ku yaal", "options": ["Niilka cad","Niilka buluuga","Harada Nuuba","Harada Fiktooriya"], "answer": "Niilka buluuga"},
        {"q": "Wareega dhulka waxaa lagu qiyaasaa mayl ahaan", "options": ["40207.92444","25000","111.688679","69.4"], "answer": "25000"}
      ]
    },
    {
      "name": "Part 2: Isku-beeg (Matching)",
      "questions": [
        {"q": "Tirada xariiqaha dhigu", "answer": "360 digrii"},
        {"q": "Cimilo gooreed", "answer": "Xaalad jawi oo waqti gaaban"},
        {"q": "Kaneecada gudbisa duumada", "answer": "Nooca dheddig"},
        {"q": "Tirada xariiqaha loolka", "answer": "180 digrii"},
        {"q": "Khaliifkii ugu horeeyay ee Cabaasiyiinta", "answer": "Abul Cabaas Al-Safaax"},
        {"q": "Isha koowaad ee dhulka diirimaadka ka helo", "answer": "Qorraxda"},
        {"q": "Sababta lamadegaanku uga kulul yahay meelaha kale", "answer": "Roob yari"},
        {"q": "Qaaradda Afrika badankeed waxay dhacdaa", "answer": "Dhulbare"},
        {"q": "Duumada waxaa gudbiya", "answer": "Kaneecada dheddig"},
        {"q": "Tallaalka jadeecada", "answer": "MMR"}
      ]
    },
    {
      "name": "Part 3: Buuxi Kaalmaha Banaan (Fill in Blanks)",
      "questions": [
        {"q": "Waa cudur kamid ah xanuunada faafa", "answer": "Jadeeco"},
        {"q": "… waxay dhacday 11 Janaayo 1948", "answer": "Dagaalkii labaad ee aduunka kadib xor u dirir"},
        {"q": "12-kii bishii… sanadkii… waxaa la taagay calankii Soomaaliya", "answer": "12 December 1954"},
        {"q": "Nakhshada calanka Soomaaliya waxaa alifay", "answer": "Maxamed Awale Liiban"},
        {"q": "Cabaasiyiintu waxay taliska kala wareegeen", "answer": "Umawiyiinta"},
        {"q": "Cabaasiyiintu waxay garabsadeen markii hore", "answer": "Faarisiinta"},
        {"q": "Dhismaha Baqdaad wuxuu socday", "answer": "4 sano"},
        {"q": "Al-Muctasim wuxuu caasimadda u wareejiyay", "answer": "Samarraa"},
        {"q": "Cabaasiyiintu waxay ku abtirsadaan", "answer": "Cali binu Abii Daalib"},
        {"q": "Afayeenkii ugu horeeyay ee Baarlamaanka Soomaaliya", "answer": "Sheekh Mukhtaar Maxamed Xuseen"}
      ]
    },
    {
      "name": "Part 4: Su'aalo Qoraal ah (Written Questions)",
      "questions": [
        {"q": "Saacadda London 3:00am, Muqdisho 45° Bari. Imisa ayay noqoneysaa waqtiga Muqdisho?", "answer": "6:00 subaxnimo"},
        {"q": "Farqiga u dhexeeya dhigtu iyo loolka", "answer": "Dhigtu waa waqooyi iyo koonfur. Loolku waa bari iyo galbeed."},
        {"q": "Saddexda laamood ee dowladda Baarlamaaniga", "answer": "Fulinta. Sharci dejinta. Garsoorka."},
        {"q": "Sidee ayuu dhulbaraha u saameeyaa cimilada?", "answer": "Meelaha dhulbaraha u dhow waa kulul. Meelaha ka fog waa qabow."},
        {"q": "Qor wadamada uu farta tilmaamay khariidada", "answer": "Masar. Suudaan. Itoobiya. kenya."}
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
    const questionsToInsert = sec.questions.map((q, index) => {
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
        question_number: totalQuestions,
        question_type: isMcq ? 'mcq' : 'short_answer',
        topic: "Cilmi Bulsho",
        question_text: q.q,
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
