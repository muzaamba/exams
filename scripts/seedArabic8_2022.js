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
  "year": 2022,
  "title": "Arabic Grade 8 Exam 2022",
  "parts": [
    {
      "part": "Part 1: Reading Comprehension (فهم المقروء)",
      "questions": [
        {"q": "يستيقظ أحمد من النوم في الساعة", "options": ["السابعة صباحا", "السادسة صباحا", "متأخرا", "بعد الاستيقاظ"], "answer": "السابعة صباحا", "type": "mcq"},
        {"q": "بعد الاستيقاظ من النوم يذهب أحمد إلى", "options": ["الشارع", "المطبخ", "المسجد", "المدرسة"], "answer": "المسجد", "type": "mcq"},
        {"q": "يذهب أحمد إلى المدرسة بواسطة", "options": ["الحافلة", "سيارة أجرة", "سيارة أبيه", "الدابة"], "answer": "الحافلة", "type": "mcq"},
        {"q": "في الاستراحة أحمد", "options": ["يلبس", "يستريح", "يتحاور مع أصدقائه", "يراجع دروسه"], "answer": "يتحاور مع أصدقائه", "type": "mcq"},
        {"q": "نال أحمد الدرجة الأولى بفضل", "options": ["جهده وصبره", "معلمه", "أهله", "التاريخ"], "answer": "جهده وصبره", "type": "mcq"},
        {"q": "يحب أحمد مادة", "options": ["الجغرافيا", "اللغة العربية", "اللغة الإنجليزية", "التاريخ"], "answer": "اللغة العربية", "type": "mcq"}
      ]
    },
    {
      "part": "Part 2: Grammar and Vocabulary (النحو والمفردات)",
      "questions": [
        {"q": "ما كان وسطه حرف علة", "answer": "الفعل الأجوف", "type": "short_answer"},
        {"q": "ما كان أوله حرف علة", "answer": "الفعل المثال", "type": "short_answer"},
        {"q": "هو ما كان بعده توكيد معنوي", "answer": "المعطوف عليه", "type": "short_answer"},
        {"q": "هي التوكيد المعنوي", "answer": "بدل المطابق", "type": "short_answer"},
        {"q": "ما كان آخره حرف علة", "answer": "الفعل الناقص", "type": "short_answer"},
        {"q": "المتبوع الذي يقع قبل حرف العطف", "answer": "المعطوف عليه", "type": "short_answer"},
        {"q": "جمع كلمة ثروة", "answer": "ثروات", "type": "short_answer"},
        {"q": "ظهرت علاماتها كانت أسماء من", "answer": "السابقات للإسلام", "type": "short_answer"},
        {"q": "بدت أشراطها", "answer": "التعجب", "type": "short_answer"},
        {"q": "ضد الكبيرة", "answer": "صغيرة", "type": "short_answer"},
        {"q": "أمير الشعراء في العصر الحديث", "answer": "أحمد شوقي", "type": "short_answer"},
        {"q": "مفرد كلمة السطور", "answer": "السطر", "type": "short_answer"},
        {"q": "البرية مثال للتضحية", "answer": "رمز لفداء", "type": "short_answer"}
      ]
    },
    {
      "part": "Part 3: Literature and Completion (النصوص والتكملة)",
      "questions": [
        {"q": "أكمل البيت: طاهر القلب صادق الكلمات", "answer": "خذ نصيحة خدن", "type": "short_answer"},
        {"q": "أكمل: وتجئ بالسوء الفال التي...", "answer": "تربي دونها ثورة الحسرات", "type": "short_answer"},
        {"q": "أكمل: واتق الظلم إنه...", "answer": "يجور الظلوم لظلمات", "type": "short_answer"}
      ]
    },
    {
      "part": "Part 4: Language Skills (المهارات اللغوية)",
      "questions": [
        {"q": "بات تشير إلى", "options": ["الإبل", "البقر", "الغنم", "الخيول"], "answer": "الإبل", "type": "mcq"},
        {"q": "مفرد كلمة الذين", "answer": "الذي", "type": "short_answer"},
        {"q": "الصديقان بعد فراق طويل لمن الجملة تعود", "answer": "الصديقان", "type": "short_answer"},
        {"q": "اشتد النزاع بين", "answer": "اللصين", "type": "short_answer"},
        {"q": "الوتر معنى الكلمة", "answer": "حب", "type": "short_answer"},
        {"q": "من علامات الترقيم", "answer": "،", "type": "short_answer"}
      ]
    },
    {
      "part": "Part 5: Vocabulary Context (السياق اللغوي)",
      "questions": [
        {"q": "اقتدار اللغة العربية بنفسه يدل على", "answer": "اعتزاز", "type": "short_answer"},
        {"q": "دور الطالب في رفع مستوى اللغة", "answer": "الاهتمام بالدراسة", "type": "short_answer"},
        {"q": "الاصر تعني", "answer": "الثبات", "type": "short_answer"},
        {"q": "اتس تعني", "answer": "الاتساع", "type": "short_answer"}
      ]
    },
    {
      "part": "Part 6: Error Correction (التصحيح)",
      "questions": [
        {"q": "أغرب ما تحته خط: حضر المعلم نسنُ", "answer": "نسنُ تصحيحها ناسٌ", "type": "short_answer"},
        {"q": "دخل محمد في أصلثم أحمد", "answer": "أصلهم أحمد", "type": "short_answer"},
        {"q": "النظافة الظافة", "answer": "تصحيحها النظافة", "type": "short_answer"}
      ]
    },
    {
      "part": "Part 7: Composition (التعبير)",
      "questions": [
        {
          "q": "تحدث عن فضل العمل في عشرة أسطر (Write about the importance of work in 10 lines)",
          "answer": "العمل يرفع شأن الفرد. يعطيك خبرة. يساعدك تساهم في المجتمع. يجلب دخلا مستقرا. يبني شخصيتك. يعلمك الصبر. يزيد معرفتك. يوسع مهاراتك. يقربك من الناس. يطور حياتك.",
          "type": "essay"
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

  for (let i = 0; i < examData.parts.length; i++) {
    const part = examData.parts[i];
    console.log(`Processing part: ${part.part}`);

    const { data: section, error: secErr } = await supabase.from('sections').insert({
      exam_id: examId,
      section_name: part.part,
      sort_order: i + 1
    }).select('id').single();

    if (secErr) {
      console.error('Error inserting section', part.part, secErr.message);
    }

    const sectionId = section?.id;
    const questionsToInsert = part.questions.map((q) => {
      totalQuestions++;
      const isMcq = q.type === 'mcq';
      const isEssay = q.type === 'essay';
      
      let correctAns = null;
      if (isMcq) {
        const index = q.options.indexOf(q.answer);
        correctAns = index === 0 ? 'a' : index === 1 ? 'b' : index === 2 ? 'c' : index === 3 ? 'd' : null;
      }

      return {
        exam_id: examId,
        section_id: sectionId,
        question_number: totalQuestions,
        question_type: q.type,
        topic: part.part,
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
      console.error(`Failed to insert questions for ${part.part}:`, qErr.message);
    } else {
      console.log(`Successfully inserted ${questionsToInsert.length} questions for ${part.part}.`);
    }
  }

  console.log('Seeding completed! Total questions processed:', totalQuestions);
}

seed().catch(console.error);
