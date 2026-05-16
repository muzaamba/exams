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
  "year": 2022,
  "title": "Af-Soomaali Grade 8 Exam 2022",
  "sections": [
    {
      "name": "Qaybta 1aad: Xulashada Saxda ah",
      "questions": [
        { "question_no": 1, "question": "Waxyaabaha kuu caddaynaya qiimaha geelu waa in uu:", "options": { "a": "Adkaysi badan yahay", "b": "Gaadiid inoo yahay", "c": "Qurux badan yahay", "d": "Dhaxal inoo yahay" }, "answer": "b" },
        { "question_no": 2, "question": "Qofka nabar culusi gaadhay geela la siinayo waxaa loo adeegsadaa erayga:", "options": { "a": "Hal daloolkeed", "b": "Magdhaw", "c": "Kadin", "d": "Dhaymo" }, "answer": "b" },
        { "question_no": 3, "question": "Arrimaha xaqidda waxaa lagala tashadaa:", "options": { "a": "Oday dhaqameedka", "b": "Aqoonyahanka", "c": "Dhallinyarada", "d": "Culimada" }, "answer": "d" },
        { "question_no": 4, "question": "Marka qoys cusub la dhisayo Soomaalidu waxa ay ka bixiyaan:", "options": { "a": "Geel", "b": "Gammaan", "c": "Qori", "d": "Lacag" }, "answer": "a" },
        { "question_no": 5, "question": "Geela waxa aynu ka helnaa dhaqaale sababta oo ah waynu:", "options": { "a": "Raranaa", "b": "Qalanaa", "c": "Dhoofinaa", "d": "Dhaqanaa" }, "answer": "c" },
        { "question_no": 6, "question": "Caanaha geelu waxa ay caanaha kale kaga duwan yihiin in ay ka:", "options": { "a": "Muddo dheeryihiin", "b": "Nafaqo badanyihiin", "c": "Macaan yihiin", "d": "Badanyihiin" }, "answer": "a" },
        { "question_no": 7, "question": "Qurbacu marka uu koro waxa uu noqdaa:", "options": { "a": "Qaalin", "b": "Awr", "c": "Baarqab", "d": "Aaran" }, "answer": "b" }
      ]
    },
    {
      "name": "Qaybta 2aad: Eray bixin iyo Naxwe",
      "questions": [
        // Synonyms
        { "question_no": 8, "question": "Erayga 'Luul' macnihiisa waa:", "answer": "Duddada", "type": "short_answer" },
        { "question_no": 9, "question": "Erayga 'Oodkac' macnihiisa waa:", "answer": "Duleedka", "type": "short_answer" },
        { "question_no": 10, "question": "Erayga 'Xilli' macnihiisa waa:", "answer": "Ammin", "type": "short_answer" },
        { "question_no": 11, "question": "Erayga 'Amaah' macnihiisa waa:", "answer": "Dayn", "type": "short_answer" },
        { "question_no": 12, "question": "Erayga 'Lisid' macnihiisa waa:", "answer": "Dhiljin", "type": "short_answer" },
        { "question_no": 13, "question": "Erayga 'San ku neefle' macnihiisa waa:", "answer": "Noole", "type": "short_answer" },
        { "question_no": 14, "question": "Erayga 'Muqmad' macnihiisa waa:", "answer": "Dhayman", "type": "short_answer" },
        { "question_no": 15, "question": "Erayga 'Maalqabeen' macnihiisa waa:", "answer": "Taajir", "type": "short_answer" },
        // Plurals
        { "question_no": 16, "question": "Jamaca erayga 'Guri' waa:", "answer": "Guryo", "type": "short_answer" },
        { "question_no": 17, "question": "Jamaca erayga 'Magaalo' waa:", "answer": "Magaalooyin", "type": "short_answer" },
        { "question_no": 18, "question": "Jamaca erayga 'Bare' waa:", "answer": "Barayaal", "type": "short_answer" },
        { "question_no": 19, "question": "Jamaca erayga 'Maalin' waa:", "answer": "Maalmo", "type": "short_answer" },
        { "question_no": 20, "question": "Jamaca erayga 'Cudur' waa:", "answer": "Cuduro", "type": "short_answer" },
        { "question_no": 21, "question": "Jamaca erayga 'Wiil' waa:", "answer": "Wiilal", "type": "short_answer" },
        { "question_no": 22, "question": "Jamaca erayga 'Miis' waa:", "answer": "Miisas", "type": "short_answer" },
        { "question_no": 23, "question": "Jamaca erayga 'Shaqo' waa:", "answer": "Shaqooyin", "type": "short_answer" },
        // Pronouns
        { "question_no": 24, "question": "_____ waa ay yimaadeen. (Buuxi Magac-u-yaal)", "answer": "Iyagu", "type": "short_answer" },
        { "question_no": 25, "question": "_____ caanaha ayuu jecel yahay. (Buuxi Magac-u-yaal)", "answer": "Isagu", "type": "short_answer" },
        { "question_no": 26, "question": "_____ waxa aan raacay baabuur. (Buuxi Magac-u-yaal)", "answer": "Anigu", "type": "short_answer" },
        { "question_no": 27, "question": "_____ waad ka habsaantay imtixaankii. (Buuxi Magac-u-yaal)", "answer": "Adigu", "type": "short_answer" },
        { "question_no": 28, "question": "_____ fiid hore ayey seexatay. (Buuxi Magac-u-yaal)", "answer": "Iyadu", "type": "short_answer" },
        { "question_no": 29, "question": "_____ waan daalnay. (Buuxi Magac-u-yaal)", "answer": "Innaga", "type": "short_answer" },
        { "question_no": 30, "question": "_____ ayaa naga fiican. (Buuxi Magac-u-yaal)", "answer": "Idinka", "type": "short_answer" },
        { "question_no": 31, "question": "_____ ayaa ka dadaal badan. (Buuxi Magac-u-yaal)", "answer": "Iyagu", "type": "short_answer" },
        // Fill in blanks MCQs
        { "question_no": 32, "question": "Jimcaale cashar ayuu _____", "options": { "a": "qoray", "b": "daadiyay" }, "answer": "a", "type": "mcq" },
        { "question_no": 33, "question": "Ninku libaax ayuu _____", "options": { "a": "lisay", "b": "dilay" }, "answer": "b", "type": "mcq" },
        { "question_no": 34, "question": "Dhibic _____", "options": { "a": "xitay", "b": "carartay" }, "answer": "b", "type": "mcq" },
        { "question_no": 35, "question": "Axmed _____", "options": { "a": "dhisay", "b": "kariyay" }, "answer": "a", "type": "mcq" },
        { "question_no": 36, "question": "Faarax wuu _____", "options": { "a": "fulay", "b": "akhriyay" }, "answer": "b", "type": "mcq" },
        { "question_no": 37, "question": "Cuntada ayuu _____", "options": { "a": "karinayaa", "b": "diyaarinayaa" }, "answer": "b", "type": "mcq" }
      ]
    },
    {
      "name": "Qaybta 3aad: Maahmaahyo iyo Curis",
      "questions": [
        { "question_no": 39, "question": "Waa maxay maahmaah?", "answer": "Maahmaah waa hadal kooban oo xambaarsan xikmad iyo waano.", "type": "short_answer" },
        { "question_no": 40, "question": "Keen hal maahmaah ah oo ka hadlaysa aqoonta.", "answer": "Aqoon la'aan waa iftiin la'aan.", "type": "short_answer" },
        { "question_no": 41, "question": "Sheeg macnaha maahmaahda 'Aqoon la'aan waa iftiin la'aan'.", "answer": "Waxay ka dhigan tahay in qofka aan aqoonta lahayn uusan garan karin sax iyo khalad.", "type": "short_answer" },
        { "question_no": 42, "question": "Maxay ku kala duwan yihiin murti iyo maahmaah?", "answer": "Murti waa hadal xikmad leh oo qof sameeyo, halka maahmaahdu tahay hadal dhaqameed dadku wada isticmaalaan.", "type": "short_answer" },
        { "question_no": 43, "question": "Curis: Nabadda", "answer": "Nabaddu waa tiirka nolosha bulshada. Marka ay nabad jirto dadku waxay helaan horumar iyo nolol wanaagsan. Caruurtu waxay helaan waxbarasho, ganacsiguna wuu kobcaa. Nabaddu waxay keentaa iskaashi iyo jacayl bulsho. Dal aan nabad lahayn horumar ma gaaro. Sidaa darteed waa in bulshada oo dhan ka shaqeyso ilaalinta nabadda.", "type": "essay" }
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
      const isMcq = q.type === 'mcq' || (!q.type && !!q.options);
      const isEssay = q.type === 'essay';
      
      return {
        exam_id: examId,
        section_id: sectionId,
        question_number: q.question_no || totalQuestions,
        question_type: q.type || (isMcq ? 'mcq' : 'short_answer'),
        topic: sec.name,
        question_text: q.question,
        option_a: q.options?.a || null,
        option_b: q.options?.b || null,
        option_c: q.options?.c || null,
        option_d: q.options?.d || null,
        correct_answer: isMcq ? q.answer.toLowerCase() : null,
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
