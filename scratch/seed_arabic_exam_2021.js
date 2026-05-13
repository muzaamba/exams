/**
 * Seeding Script for Arabic National Exam 2021
 * 
 * Instructions:
 * 1. Ensure your .env.local has NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 * 2. Run: node scratch/seed_arabic_exam_2021.js
 */

const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

// Use SERVICE_ROLE_KEY for seeding to bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (supabaseKey === process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('WARNING: Using ANON_KEY. This may fail if RLS is enabled on your tables.');
  console.warn('Please add SUPABASE_SERVICE_ROLE_KEY to your .env.local for seeding.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const examData = {
  "year": 2021,
  "subject": "arabic",
  "title": "Arabic National Exam 2021",
  "grade": "form4",
  "sections": [
    {
      "name": "ضع دائرة حول رقم الإجابة الصحيحة",
      "questions": [
        {
          "question": "ولد الشاعر أحمد شوقي عام:",
          "options": { "أ": "1745", "ب": "1799", "ج": "1780", "د": "1868" },
          "answer": "د"
        },
        {
          "question": "قائل قصيدة (اللغة العربية) هو:",
          "options": { "أ": "أحمد شوقي", "ب": "أحمد محرم", "ج": "حافظ إبراهيم", "د": "محمود غنيم" },
          "answer": "ج"
        },
        {
          "question": "جمع كلمة (عظم) هو:",
          "options": { "أ": "عظامي", "ب": "أناتي", "ج": "نكي", "د": "غبي" },
          "answer": "أ"
        },
        {
          "question": "المحسن البديعي في قولهم (الصدق ينجي والكذب يهلك) هو:",
          "options": { "أ": "البدل", "ب": "العطف", "ج": "الجناس", "د": "المقابلة" },
          "answer": "د"
        },
        {
          "question": "إعراب كلمة (المجتهد) في جملة (نجح الطالب المجتهد) هو:",
          "options": { "أ": "البدل", "ب": "العطف", "ج": "التوكيد", "د": "النعت" },
          "answer": "د"
        },
        {
          "question": "الكلمة الصحيحة إملائياً هي:",
          "options": { "أ": "نافعا", "ب": "محبوبا", "ج": "كتابا", "د": "قرأات" },
          "answer": "ب"
        },
        {
          "question": "كلمة (الطلاب) نوع جمعها:",
          "options": { "أ": "جمع مذكر سالم", "ب": "جمع تكسير", "ج": "المثنى", "د": "جمع مؤنث سالم" },
          "answer": "ب"
        },
        {
          "question": "الكلمة المرادفة لكلمة (كفاح):",
          "options": { "أ": "سباق", "ب": "فرار", "ج": "نضال", "د": "نقاش" },
          "answer": "ج"
        },
        {
          "question": "الضد لكلمة (الظلام):",
          "options": { "أ": "العلم", "ب": "النور", "ج": "الكآبة", "د": "الهداية" },
          "answer": "ب"
        },
        {
          "question": "القاهرة هي:",
          "options": { "أ": "جوهر", "ب": "عاصمة", "ج": "الوسطى", "د": "مدينة" },
          "answer": "ب"
        },
        {
          "question": "عنوان الموضوع يكتب في:",
          "options": { "أ": "رأس الصفحة", "ب": "وسط الصفحة", "ج": "نهاية الصفحة", "د": "رأس الصفحة ووسطها" },
          "answer": "د"
        },
        {
          "question": "الشعر الوجداني:",
          "options": { "أ": "يدور حول موضوع ديني", "ب": "يرتبط بالمشاعر الإنسانية", "ج": "يحمل مبادئ دينية", "د": "سهلاً ومفهوماً" },
          "answer": "ب"
        },
        {
          "question": "الذي يبني ويربي الجيل هو:",
          "options": { "أ": "المهندس", "ب": "المعلم", "ج": "الطبيب", "د": "الشاعر" },
          "answer": "ب"
        },
        {
          "question": "في جملة (رأيت أسداً يقاتل) نوع البلاغة:",
          "options": { "أ": "المجاز المرسل", "ب": "المجاز العقلي", "ج": "الاستعارة", "د": "الكناية" },
          "answer": "ج"
        },
        {
          "question": "الفواصل القرآنية تشبه:",
          "options": { "أ": "السجع", "ب": "الفواصل", "ج": "الجناس", "د": "القوافي" },
          "answer": "أ"
        },
        {
          "question": "اسم المفعول في كلمة (محبوب):",
          "options": { "أ": "ثلاثي", "ب": "رباعي", "ج": "خماسي", "د": "سداسي" },
          "answer": "أ"
        },
        {
          "question": "العبارة (الوقت هو الحياة) تدل على:",
          "options": { "أ": "وجود الوقت ضرورة إنسانية", "ب": "أن الوقت هو عماد سير الحياة", "ج": "الوقت شيء في الحياة", "د": "أن الوقت شيء آخر" },
          "answer": "ب"
        },
        {
          "question": "الخطأ في الجملة (الطلاب مجتهدونن) هو:",
          "options": { "أ": "خطأ صرفي", "ب": "خطأ نحوي", "ج": "خطأ في المعنى", "د": "خطأ في البلاغة" },
          "answer": "أ"
        },
        {
          "question": "الصحة تعني:",
          "options": { "أ": "اسم الشخص", "ب": "صحة الشخص", "ج": "المهارات الشخصية", "د": "الحياة" },
          "answer": "ب"
        }
      ]
    },
    {
      "name": "القسم الثاني",
      "questions": [
        { "question": "اذكر أربعة من حروف الجر", "answer": "من، إلى، عن، على" },
        { "question": "كيف ساهمت الحكمة العربية في النهضة العربية؟", "answer": "ساهمت في نشر العلم والمعرفة وتطوير الفكر والأدب." },
        { "question": "ما غرض الشاعر في البيت المذكور؟", "answer": "الفخر والاعتزاز." },
        { "question": "عرف القبلية", "answer": "القبلية هي التعصب للقبيلة وتفضيلها على غيرها دون حق." },
        { "question": "اذكر مظهرين من مظاهر القبلية", "answer": "التعصب، والنزاعات بين القبائل." },
        { "question": "ما موقف الإسلام من القبلية؟", "answer": "الإسلام يرفض القبلية ويدعو إلى المساواة والأخوة." },
        { "question": "اجمع الكلمات: فرصة، بيت", "answer": "فرص، بيوت" },
        { "question": "استخرج اسم مفعول من القطعة", "answer": "مظلومة" },
        { "question": "هات ضد الكلمات: الردى، العصبية", "answer": "الحياة، التسامح" },
        { "question": "هات مرادف الكلمات: الخلاف، مظلومة", "answer": "النزاع، مقهورة" },
        { "question": "لماذا نهى الإسلام عن القبلية؟", "answer": "لأنها تسبب الفرقة والعداوة بين الناس." },
        { "question": "استخرج من القطعة حرف عطف", "answer": "و" }
      ]
    },
    {
      "name": "المفردات",
      "questions": [
        {
          "question": "حول المفردات إلى جمع",
          "items": [
            { "word": "ديوان", "answer": "دواوين" },
            { "word": "طفل", "answer": "أطفال" },
            { "word": "منزل", "answer": "منازل" },
            { "word": "مدينة", "answer": "مدن" },
            { "word": "مطبعة", "answer": "مطابع" }
          ]
        }
      ]
    },
    {
      "name": "صل العبارات",
      "questions": [
        { "question": "المخدرات من المشكلات الخطيرة", "answer": "في العصر الحديث في الأدب" },
        { "question": "النداء", "answer": "هو توجيه الدعوة إلى المخاطب" },
        { "question": "الشعر السياسي هو أحد فنون الأدب العربي الحديث", "answer": "يعتمد على الحقائق" },
        { "question": "النثر هو الكلام الذي ليس فيه وزن", "answer": "يختلف عن بقية أنواع الشعر" }
      ]
    }
  ]
};

async function seed() {
  const examId = crypto.randomUUID();
  
  console.log('Inserting Exam...');
  const { error: examError } = await supabase
    .from('exams')
    .insert({
      id: examId,
      title: examData.title,
      subject: examData.subject,
      grade: examData.grade,
      year: examData.year,
      total_marks: 100,
      duration: 120,
      status: 'published'
    });

  if (examError) {
    console.error('Error inserting exam:', examError.message);
    return;
  }
  console.log('Exam inserted successfully.');

  let qCount = 0;
  for (let i = 0; i < examData.sections.length; i++) {
    const section = examData.sections[i];
    const sectionId = crypto.randomUUID();
    
    const { error: sectionError } = await supabase
      .from('sections')
      .insert({
        id: sectionId,
        exam_id: examId,
        section_name: section.name,
        marks: 25,
        sort_order: i + 1
      });

    if (sectionError) {
      console.error('Error inserting section:', sectionError.message);
      continue;
    }

    for (let j = 0; j < section.questions.length; j++) {
      const q = section.questions[j];
      qCount++;
      
      let qType = 'short_answer';
      if (q.options) qType = 'mcq';
      if (q.items) qType = 'vocabulary';
      
      const questionPayload = {
        id: crypto.randomUUID(),
        exam_id: examId,
        section_id: sectionId,
        question_text: q.question,
        question_type: qType,
        difficulty: 'medium',
        question_number: qCount
      };

      if (qType === 'mcq') {
        questionPayload.option_a = q.options['أ'];
        questionPayload.option_b = q.options['ب'];
        questionPayload.option_c = q.options['ج'];
        questionPayload.option_d = q.options['د'];
        questionPayload.correct_answer = q.answer === 'أ' ? 'a' : q.answer === 'ب' ? 'b' : q.answer === 'ج' ? 'c' : 'd';
      } else if (qType === 'vocabulary') {
        questionPayload.question_text = q.question + ': ' + q.items.map(item => item.word).join(', ');
        questionPayload.explanation = q.items.map(item => `${item.word} -> ${item.answer}`).join('; ');
      } else {
        questionPayload.explanation = q.answer;
      }

      const { error: qError } = await supabase.from('questions').insert(questionPayload);
      if (qError) console.error('Error inserting question:', qError.message);
    }
  }

  console.log(`Seeding complete. ${qCount} questions processed.`);
}

seed();
