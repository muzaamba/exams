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
  "subject": "islamic_studies",
  "grade": "grade8",
  "year": 2022,
  "title": "Islamic Studies Grade 8 Exam 2022",
  "sections": [
    {
      "name": "Aqeedah and Belief",
      "questions": [
        { "id": 1, "question": "أبو بكر الصديق من الصحابة", "answer": "خليفة رسول الله صلى الله عليه وسلم" },
        { "id": 2, "question": "كلمة 'بنهال' في التجويد هي حكم", "answer": "الإقلاب" },
        { "id": 3, "question": "الإدغام في القرآن يكون في", "answer": "كلمتين أو أكثر حسب القاعدة" },
        { "id": 4, "question": "من أسماء اليوم الآخر", "answer": "يوم الوعيد" },
        { "id": 5, "question": "الصراط هو جسر ممدود على", "answer": "جهنم" },
        { "id": 6, "question": "دين الإسلام هو دين", "answer": "الرحمة" },
        { "id": 7, "question": "الإيمان بالقدر هو أحد أركان", "answer": "الإيمان" },
        { "id": 8, "question": "مراتب الإيمان بالقضاء والقدر", "answer": "الإيمان والإحسان والعمل" },
        { "id": 9, "question": "عذاب القبر هو", "answer": "ثابت في العقيدة الإسلامية" },
        { "id": 10, "question": "الإيمان بعذاب القبر ونعيمه من الإيمان", "answer": "باليوم الآخر" }
      ]
    },
    {
      "name": "Hadith and Fiqh",
      "questions": [
        { "id": 11, "question": "من فوائد صلة الرحم", "answer": "زيادة الإيمان وطاعة الله" },
        { "id": 12, "question": "المسلم الملتزم يتصف بالخلق", "answer": "الرفيع" },
        { "id": 13, "question": "مثل الجليس الصالح هو", "answer": "حامل المسك" },
        { "id": 14, "question": "عدد أنواع الأصدقاء عند ابن القيم", "answer": "ثلاثة" },
        { "id": 15, "question": "الذي عذب بلالاً من أجل دينه", "answer": "أمية بن خلف" },
        { "id": 16, "question": "من شروط وجوب الصوم", "answer": "الإسلام والبلوغ والعقل" },
        { "id": 17, "question": "عبادة تأتي مرة في كل سنة", "answer": "الحج" },
        { "id": 18, "question": "عدد الأشواط بين الصفا والمروة", "answer": "سبعة" },
        { "id": 19, "question": "من مفطرات الصيام", "answer": "القيء المتعمد" },
        { "id": 20, "question": "دخل الناس في دين الله أفواجاً", "answer": "فتح مكة" }
      ]
    },
    {
      "name": "Seerah and Islamic History",
      "questions": [
        { "id": 21, "question": "غزوة الأحزاب تسمى أيضاً", "answer": "غزوة الخندق" },
        { "id": 22, "question": "صلح الحديبية كان", "answer": "هدنة بين المسلمين وقريش" },
        { "id": 23, "question": "من الأئمة المشهورين في الحديث", "answer": "أبو هريرة" },
        { "id": 24, "question": "يجب الابتعاد عن مصاحبة أهل", "answer": "السوء" }
      ]
    },
    {
      "name": "General Islamic Knowledge",
      "questions": [
        { "id": 25, "question": "الهدف من جعل الناس شعوباً وقبائل", "answer": "التعارف والتعاون" },
        { "id": 26, "question": "مثال على الإظهار", "answer": "حرف النون الساكنة مع الحروف الحلقية" },
        { "id": 27, "question": "زكاة الغنم تبدأ من", "answer": "أربعين رأساً" }
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
