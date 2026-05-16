const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const examData = {
  "year": 2020,
  "subject": "MATHEMATICS",
  "title": "Mathematics National Exam 2020",
  "grade": "form4",
  "sections": [
    {
      "name": "Multiple Choice Questions",
      "questions": [
        {
          "question": "Choose the number when increased by 12, becomes 20.",
          "options": { "A": "7", "B": "8", "C": "12", "D": "10" },
          "answer": "B"
        },
        {
          "question": "Probability of selecting a spade from a pack of cards is:",
          "options": { "A": "1/4", "B": "1/3", "C": "1/2", "D": "1/5" },
          "answer": "A"
        },
        {
          "question": "The mode of the following set of data: 2,3,4,4,7,8",
          "options": { "A": "8", "B": "5", "C": "4", "D": "7" },
          "answer": "C"
        },
        {
          "question": "Cos(A+B) is equal to:",
          "options": { "A": "cosAcosB + sinAsinB", "B": "sinAcosB + cosAsinB", "C": "cosAcosB - sinAsinB", "D": "sinAcosB - cosAsinB" },
          "answer": "C"
        },
        {
          "question": "The sum of (3 - i) + (2 + 3i) is:",
          "options": { "A": "5+2i", "B": "5-2i", "C": "6+3i", "D": "2+5i" },
          "answer": "A"
        },
        {
          "question": "The radius of a circle with equation x² + y² = 25 is:",
          "options": { "A": "25", "B": "10", "C": "5", "D": "15" },
          "answer": "C"
        },
        {
          "question": "What is the determinant of matrix [[2,4],[1,2]]?",
          "options": { "A": "20", "B": "10", "C": "4", "D": "-4" },
          "answer": "D"
        },
        {
          "question": "The value of lim x→2 (5x + 4) is:",
          "options": { "A": "14", "B": "10", "C": "5", "D": "11" },
          "answer": "A"
        },
        {
          "question": "The simplest form of (1/3)^3 is:",
          "options": { "A": "27", "B": "15", "C": "1/27", "D": "125" },
          "answer": "C"
        },
        {
          "question": "Calculate dy/dx when y = 3x² + 5x + 10",
          "options": { "A": "6x+5", "B": "6x+10", "C": "3x+5", "D": "6x²+5" },
          "answer": "A"
        },
        {
          "question": "State the simplest form of (cos²x - sin²x)",
          "options": { "A": "cosx + sinx", "B": "cosxsinx", "C": "cosx - sinx", "D": "sinx" },
          "answer": "C"
        },
        {
          "question": "What is the value of i²?",
          "options": { "A": "i", "B": "-i", "C": "-1", "D": "i+1" },
          "answer": "C"
        },
        {
          "question": "State the number of ways in which two books can be selected from a group of 5.",
          "options": { "A": "20", "B": "25", "C": "15", "D": "10" },
          "answer": "D"
        },
        {
          "question": "State the focus of the parabola where the equation is y² = 16x.",
          "options": { "A": "4", "B": "-8", "C": "16", "D": "-4" },
          "answer": "A"
        },
        {
          "question": "How many sides does a polygon have if the sum of its interior angles is 720°?",
          "options": { "A": "7 sides", "B": "8 sides", "C": "6 sides", "D": "5 sides" },
          "answer": "C"
        },
        {
          "question": "A box contains 3 red, 4 blue and 3 green beads. The probability of selecting a blue or red bead is:",
          "options": { "A": "7/10", "B": "3/10", "C": "4/10", "D": "1/10" },
          "answer": "A"
        },
        {
          "question": "If sin A = 5/13, then sin(A+B) is:",
          "options": { "A": "7/16", "B": "60/65", "C": "33/65", "D": "12/13" },
          "answer": "B"
        },
        {
          "question": "The integration of dx is:",
          "options": { "A": "Zero", "B": "x", "C": "x+c", "D": "1" },
          "answer": "C"
        },
        {
          "question": "If the number of boys is 320 out of 500 students, what is the percentage of girls?",
          "options": { "A": "40%", "B": "36%", "C": "27%", "D": "39%" },
          "answer": "B"
        },
        {
          "question": "The derivative of a constant number f(x)=C will be:",
          "options": { "A": "Cx", "B": "-2c", "C": "Zero", "D": "C+1" },
          "answer": "C"
        }
      ]
    },
    {
      "name": "Trigonometry",
      "questions": [
        { "question": "If tanB = 3/4 find sin2B", "answer": "24/25" },
        { "question": "If tanB = 3/4 find cos2B", "answer": "7/25" },
        { "question": "Write sin7A - sin3A as a product", "answer": "2cos5A sin2A" },
        { "question": "Use half angle identity to find tan15°", "answer": "2 - √3" },
        { "question": "Calculate the area of a triangle with sides 8cm and 11cm and perimeter 32cm", "answer": "≈ 38.97 cm²" }
      ]
    },
    {
      "name": "Complex Numbers",
      "questions": [
        { "question": "(8-i) - (4-i)", "answer": "4" },
        { "question": "(3 + 2i)²", "answer": "5 + 12i" },
        { "question": "Use quadratic formula to solve x² - 2x + 2 = 0", "answer": "x = 1 ± i" },
        { "question": "Write the conjugate of 3 + 2i", "answer": "3 - 2i" }
      ]
    },
    {
      "name": "Probability",
      "questions": [
        { "question": "Calculate P(8,3)", "answer": "336" },
        { "question": "Calculate C(7,4)", "answer": "35" },
        { "question": "A box contains 3 blue, 7 green and 11 red balls. Probability of selecting a red ball", "answer": "11/21" },
        { "question": "Find probability of getting a sum of 7 from two dice", "answer": "1/6" },
        { "question": "Probability of getting an even number on a die", "answer": "1/2" },
        { "question": "Probability of getting a number less than 5 on a die", "answer": "2/3" }
      ]
    },
    {
      "name": "Statistics",
      "questions": [
        { "question": "Find the mean of 8,5,14,6,4,12", "answer": "49/6" },
        { "question": "Find Q1 of 12,17,6,9,8,9,16,15,10", "answer": "8" },
        { "question": "Find Q3 of 12,17,6,9,8,9,16,15,10", "answer": "15" },
        { "question": "Find the range", "answer": "11" },
        { "question": "Find cumulative frequencies: 30-39(3), 40-49(13), 50-59(14), 60-69(6), 70-79(4)", "answer": "30-39: 3, 40-49: 16, 50-59: 30, 60-69: 36, 70-79: 40" },
        { "question": "Find the median frequency", "answer": "50-59" },
        { "question": "Calculate variance of 7,15,12,17,20,14,9", "answer": "17.39" },
        { "question": "Find mean of 45,21,53,49,50,37,48,30", "answer": "41.625" }
      ]
    },
    {
      "name": "Calculus",
      "questions": [
        { "question": "Evaluate lim x→3 (x²+1)", "answer": "10" },
        { "question": "Find derivative of y = (2x-3)/(x+4)", "answer": "11/(x+4)²" },
        { "question": "Find equation of tangent line to curve at point (2,4)", "answer": "y - 4 = m(x - 2)" },
        { "question": "Evaluate ∫(3x² + x +1)dx", "answer": "x³ + x²/2 + x + c" },
        { "question": "A mother is three times heavier than her daughter and together weigh 72kg. Find their weights.", "answer": "mother: 54kg, daughter: 18kg" },
        { "question": "Find the gradient of 2x + 3y - 6 = 0", "answer": "-2/3" }
      ]
    }
  ]
};

async function seed() {
  console.log('Checking for existing exam...');
  const { data: existingExam } = await supabase
    .from('exams')
    .select('id')
    .eq('title', examData.title)
    .single();

  let examId;
  if (existingExam) {
    examId = existingExam.id;
    console.log(`Using existing exam ID: ${examId}`);
  } else {
    examId = crypto.randomUUID();
    console.log('Inserting New Exam...');
    const { error: examError } = await supabase
      .from('exams')
      .insert({
        id: examId,
        title: examData.title,
        subject: examData.subject.toLowerCase(),
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
  }

  let qCount = 0;
  for (let i = 0; i < examData.sections.length; i++) {
    const section = examData.sections[i];
    const sectionId = crypto.randomUUID();
    
    console.log(`Inserting Section: ${section.name}...`);
    const { error: sectionError } = await supabase
      .from('sections')
      .insert({
        id: sectionId,
        exam_id: examId,
        section_name: section.name,
        marks: 0, // Placeholder
        sort_order: i + 1
      });

    if (sectionError) {
      console.error('Error inserting section:', sectionError.message);
      continue;
    }

    const questions = [];
    for (let j = 0; j < section.questions.length; j++) {
      const q = section.questions[j];
      qCount++;
      
      let qType = 'short_answer';
      if (q.options) qType = 'mcq';
      
      const questionPayload = {
        id: crypto.randomUUID(),
        exam_id: examId,
        section_id: sectionId,
        question_text: q.question,
        question_type: qType,
        difficulty: 'medium',
        question_number: qCount,
        subject: examData.subject.toLowerCase(),
        year: examData.year
      };

      if (qType === 'mcq') {
        questionPayload.option_a = q.options['A'];
        questionPayload.option_b = q.options['B'];
        questionPayload.option_c = q.options['C'];
        questionPayload.option_d = q.options['D'];
        questionPayload.correct_answer = q.answer.toLowerCase();
      } else {
        // For short answer, we might put the answer in explanation or a dedicated field if exists
        // Based on seed_arabic_exam_2021.js, it uses explanation for short answers
        questionPayload.explanation = typeof q.answer === 'object' ? JSON.stringify(q.answer) : q.answer;
      }

      questions.push(questionPayload);
    }

    const { error: qError } = await supabase.from('questions').insert(questions);
    if (qError) {
      console.error(`Error inserting questions for section ${section.name}:`, qError.message);
    } else {
      console.log(`Inserted ${questions.length} questions for ${section.name}.`);
    }
  }

  console.log(`Seeding complete. ${qCount} questions processed.`);
}

seed();
