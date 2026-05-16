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
  "subject": "english",
  "grade": "grade8",
  "year": 2022,
  "title": "English Grade 8 Exam 2022",
  "sections": [
    {
      "name": "Reading Comprehension",
      "questions": [
        { "id": 1, "question": "Good food is important for our life because it:", "options": ["gives us health and energy", "we must eat clean food", "locally available food", "fresh food"], "answer": "gives us health and energy" },
        { "id": 2, "question": "State the names of two vegetables mentioned in the passage.", "options": ["Onions and papayas", "Carrots and olives", "Tomatoes and spinach", "Garlics and bananas"], "answer": "Tomatoes and spinach" },
        { "id": 3, "question": "Where can we buy fresh food from?", "options": ["Markets and farms", "Rivers and lakes", "Carbohydrates and proteins", "Vitamins and minerals"], "answer": "Markets and farms" },
        { "id": 4, "question": "Which deadly diseases are mentioned when we eat bad food?", "options": ["Medicine and poison", "HIV and AIDS", "Cancer and diabetes", "Obesity and malnutrition"], "answer": "Cancer and diabetes" },
        { "id": 5, "question": "The two classes of food mentioned in the passage are:", "options": ["Carbohydrates and proteins", "Lemons and dates", "Millet and maize", "Rice and beans"], "answer": "Carbohydrates and proteins" },
        { "id": 6, "question": "Pick out the opposite of 'dirty' from the passage.", "options": ["Healthy", "Eat", "Toxic", "Clean"], "answer": "Clean" },
        { "id": 7, "question": "Which is healthier according to the passage?", "options": ["Imported food", "Exported food", "Domestic food", "Expired food"], "answer": "Domestic food" }
      ]
    },
    {
      "name": "Matching and Grammar",
      "questions": [
        { "id": 8, "question": "Mechanic", "answer": "A person who repairs cars in a garage" },
        { "id": 9, "question": "Spawn", "answer": "The egg of a frog" },
        { "id": 10, "question": "Weather", "answer": "Condition of the atmosphere" },
        { "id": 11, "question": "Doctor", "answer": "Treats sick people" },
        { "id": 12, "question": "Antonym", "answer": "A word with opposite meaning" },
        { "id": 13, "question": "Synonym", "answer": "A word with same meaning" }
      ]
    },
    {
      "name": "Fill in the blanks",
      "questions": [
        { "id": 24, "question": "The tablet is ___ for me to swallow.", "answer": "bitter" },
        { "id": 27, "question": "The ___ pronoun does not refer to a particular person, place or thing.", "answer": "they" },
        { "id": 28, "question": "The masculine gender of the word 'aunt' is ___", "answer": "uncle" },
        { "id": 29, "question": "A dentist is a person who looks after our ___", "answer": "teeth" },
        { "id": 30, "question": "The ___ is a place where Muslims go to pray Salah.", "answer": "mosque" },
        { "id": 31, "question": "Food is to hungry as water is to ___", "answer": "thirsty" },
        { "id": 32, "question": "The feminine gender of 'dog' is ___", "answer": "bitch" }
      ]
    },
    {
      "name": "Direct Questions",
      "questions": [
        { "id": 40, "question": "Define prefix", "answer": "A letter or group of letters added at the beginning of a word" },
        { "id": 41, "question": "Define present progressive tense", "answer": "Tense showing action happening now" },
        { "id": 42, "question": "Define adjectives", "answer": "Words that describe nouns" },
        { "id": 43, "question": "Complete: When the cat is away ___", "answer": "the mice will play" },
        { "id": 44, "question": "Complete: Birds of a feather ___", "answer": "flock together" },
        { "id": 45, "question": "Complete: Action speaks ___", "answer": "louder than words" },
        { "id": 46, "question": "Plural of child", "answer": "children" },
        { "id": 47, "question": "Plural of knife", "answer": "knives" },
        { "id": 48, "question": "Plural of glass", "answer": "glasses" }
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
