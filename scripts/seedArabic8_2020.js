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
  "subject": "arabic",
  "grade": "grade8",
  "year": 2020,
  "title": "Arabic Grade 8 Exam 2020",
  "sections": [
    {
      "section": "Reading (القراءة)",
      "questions": [
        { "question_no": 1, "question": "الغنم له كم نوع؟", "options": ["نوعين", "ثلاثة أنواع", "أربعة أنواع", "ستة أنواع"], "answer": "ثلاثة أنواع" },
        { "question_no": 2, "question": "الغنم له فوائد منها:", "options": ["اللحم واللبن والسمن", "اللحم والسمن", "اللبن فقط", "الجلد فقط"], "answer": "اللحم واللبن والسمن" },
        { "question_no": 3, "question": "ذكر الضأن يسمى:", "options": ["التيس", "الكبش", "النعجة", "العنزة"], "answer": "الكبش" },
        { "question_no": 4, "question": "أنثى الماعز تسمى:", "options": ["التيس", "الكبش", "العنزة", "الخروف"], "answer": "العنزة" },
        { "question_no": 5, "question": "ذكر الماعز يسمى:", "options": ["الخروف", "التيس", "النعجة", "العزة"], "answer": "التيس" }
      ]
    },
    {
      "section": "Literature (النصوص الأدبية)",
      "questions": [
        { "question_no": 6, "question": "معنى كلمة (الكريم):", "options": ["التزين", "الجمال", "الكريم", "الإساءة"], "answer": "الكريم" },
        { "question_no": 7, "question": "معنى كلمة (ناقص):", "options": ["كامل", "مختل", "ناقص", "متوسط"], "answer": "ناقص" },
        { "question_no": 8, "question": "معنى كلمة (جميع):", "options": ["التحذير", "الجميع", "الربح", "الخسارة"], "answer": "الجميع" },
        { "question_no": 9, "question": "معنى كلمة (أذنيه):", "options": ["يديه", "رجليه", "أذنيه", "عينيه"], "answer": "أذنيه" },
        { "question_no": 10, "question": "معنى كلمة (معزول):", "options": ["ضار", "نافع", "معزول", "قوي"], "answer": "معزول" }
      ]
    },
    {
      "section": "Grammar (النحو)",
      "questions": [
        { "question_no": 11, "question": "تعريف العطف هو:", "answer": "تابع يتبع ما قبله في الإعراب", "type": "short_answer" },
        { "question_no": 12, "question": "أقسام التوكيد المعنوي:", "answer": "قسمين", "type": "short_answer" },
        { "question_no": 13, "question": "من أمثلة التوكيد اللفظي:", "answer": "الخطيب الخطيب", "type": "short_answer" },
        { "question_no": 14, "question": "البدل هو:", "answer": "تابع يكون هو المقصود في الكلام", "type": "short_answer" }
      ]
    },
    {
      "section": "Vocabulary (المفردات)",
      "questions": [
        { "question_no": 15, "question": "مفرد كلمة (فِتن):", "answer": "فتنة", "type": "short_answer" },
        { "question_no": 16, "question": "جمع كلمة (تجند):", "answer": "جندات", "type": "short_answer" },
        { "question_no": 17, "question": "جمع كلمة (الدهر):", "answer": "دهور", "type": "short_answer" },
        { "question_no": 18, "question": "مفرد كلمة (أعمال):", "answer": "عمل", "type": "short_answer" },
        { "question_no": 19, "question": "جمع كلمة (قص):", "answer": "قصص", "type": "short_answer" }
      ]
    },
    {
      "section": "Spelling & Composition (الإملاء والتعبير)",
      "questions": [
        { "question_no": 20, "question": "فائدة علامات الترقيم:", "options": ["تقسيم الكلام", "توضيح المعنى", "توضيح الألفاظ", "جميع ما سبق"], "answer": "جميع ما سبق" },
        { "question_no": 21, "question": "الفاصلة علامة:", "answer": "دلالة على متابعة الكلام", "type": "short_answer" },
        { "question_no": 22, "question": "النقطة توضع:", "answer": "عند انتهاء الكلام", "type": "short_answer" }
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
    console.log(`Processing section: ${sec.section}`);

    const { data: section, error: secErr } = await supabase.from('sections').insert({
      exam_id: examId,
      section_name: sec.section,
      sort_order: i + 1
    }).select('id').single();

    if (secErr) {
      console.error('Error inserting section', sec.section, secErr.message);
    }

    const sectionId = section?.id;
    const questionsToInsert = sec.questions.map((q) => {
      totalQuestions++;
      const isMcq = Array.isArray(q.options);
      
      let correctAns = null;
      if (isMcq) {
        const index = q.options.indexOf(q.answer);
        correctAns = index === 0 ? 'a' : index === 1 ? 'b' : index === 2 ? 'c' : index === 3 ? 'd' : null;
      }

      return {
        exam_id: examId,
        section_id: sectionId,
        question_number: q.question_no || totalQuestions,
        question_type: q.type || (isMcq ? 'mcq' : 'short_answer'),
        topic: sec.section,
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
      console.error(`Failed to insert questions for ${sec.section}:`, qErr.message);
    } else {
      console.log(`Successfully inserted ${questionsToInsert.length} questions for ${sec.section}.`);
    }
  }

  console.log('Seeding completed! Total questions processed:', totalQuestions);
}

seed().catch(console.error);
