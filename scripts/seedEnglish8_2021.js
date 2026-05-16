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
  "year": 2021,
  "title": "English Grade 8 Exam 2021",
  "sections": [
    {
      "name": "Reading Comprehension",
      "questions": [
        { "id": 1, "question": "Qur'an was revealed in the month of:", "options": ["Arafah", "Ramadan", "Sakkah", "Mowlud"], "answer": "Ramadan" },
        { "id": 2, "question": "Who must fast during Ramadan?", "options": ["Every Muslim male or female", "Every mature person with healthy mind", "The sick and elderly", "Pregnant women and travellers"], "answer": "Every mature person with healthy mind" },
        { "id": 3, "question": "How long does fasting last during the day?", "options": ["From morning to midday", "From sunset to sunrise", "From dawn to sunset", "From noon to evening"], "answer": "From dawn to sunset" },
        { "id": 4, "question": "Ramadan is the ___ of the Islamic year", "options": ["Ninth month", "Fourth month", "Second month", "First month"], "answer": "Ninth month" },
        { "id": 5, "question": "Ramadan is the fourth of the five ___ of Islam", "options": ["Books", "Pillars", "Faiths", "Prayers"], "answer": "Pillars" },
        { "id": 6, "question": "Muslims fast in Ramadan because it is:", "options": ["Allah's command in the Qur'an", "A holy month only", "Prophet Muhammad tradition", "Important Sunnah"], "answer": "Allah's command in the Qur'an" },
        { "id": 7, "question": "Which groups are exempt from fasting?", "options": ["Travellers and the sick", "Children and disabled", "Busy business people", "People engaged in sexual activity"], "answer": "Travellers and the sick" },
        { "id": 8, "question": "Reward for fasting is:", "options": ["Paradise", "Money", "Iftar", "Charity"], "answer": "Paradise" },
        { "id": 9, "question": "Preferred food for iftar:", "options": ["Samosa and cake", "Soda and Fanta", "Coffee and tea", "Dates and water"], "answer": "Dates and water" },
        { "id": 10, "question": "Muslims break fasting at:", "options": ["Noon", "Sunrise", "Sunset", "Morning"], "answer": "Sunset" },
        { "id": 11, "question": "Tarawih is:", "options": ["Special prayers", "Restaurant", "Light meal", "Masjid"], "answer": "Special prayers" },
        { "id": 12, "question": "At the end of Ramadan Muslims give:", "options": ["Zakah", "Clothes", "Loans", "Id"], "answer": "Zakah" },
        { "id": 13, "question": "Deliberate breaking of fast by sexual activity requires:", "options": ["Consecutive weeks", "Consecutive days", "Continuous months", "Continuous years"], "answer": "Continuous months" },
        { "id": 14, "question": "In the last 10 days of Ramadan people stay in:", "options": ["Restaurants", "City", "Masjid", "School"], "answer": "Masjid" },
        { "id": 15, "question": "After Ramadan Muslims celebrate:", "options": ["Eid al Adxa", "Eid al Fitr", "Eid al Juma", "Eid al Mowlud"], "answer": "Eid al Fitr" },
        { "id": 16, "question": "During fasting Muslims should not:", "options": ["Go to work", "Stay home", "Go on holidays", "Take food"], "answer": "Take food" },
        { "id": 17, "question": "Iftar is followed by:", "options": ["Evening prayer", "Noon prayer", "Afternoon prayer", "Morning prayer"], "answer": "Evening prayer" },
        { "id": 18, "question": "The word 'afone' means:", "options": ["Do good deeds", "Do bad deeds", "Repent from sins", "Perform prayers"], "answer": "Repent from sins" },
        { "id": 19, "question": "Which breaks the fast?", "options": ["Brushing teeth", "Bath", "Swallowing saliva", "Smoking cigar"], "answer": "Smoking cigar" },
        { "id": 20, "question": "Benefits of fasting include:", "options": ["Being a traveller", "Allah's forgiveness", "Buying clothes", "Feeling hunger"], "answer": "Allah's forgiveness" }
      ]
    },
    {
      "name": "Grammar and Vocabulary",
      "questions": [
        { "id": 21, "question": "Auxiliary verbs are also called:", "options": ["Helping verbs", "Main verbs", "Infinitive verbs", "Phrasal verbs"], "answer": "Helping verbs" },
        { "id": 22, "question": "Proper noun:", "options": ["Student", "Benadir", "School", "Group"], "answer": "Benadir" },
        { "id": 23, "question": "Opposite of arrival:", "options": ["Ancient", "Departure", "Decrease", "Landlord"], "answer": "Departure" },
        { "id": 24, "question": "The masculine gender of cow:", "options": ["Dog", "Bull", "Ram", "Horse"], "answer": "Bull" },
        { "id": 25, "question": "Interjection:", "options": ["Young", "Wow", "Computer", "Sit"], "answer": "Wow" },
        { "id": 26, "question": "Word opposite of sweet:", "options": ["Delicious", "Tasteful", "Bitter", "Mouth-watering"], "answer": "Bitter" },
        { "id": 27, "question": "Suffix of happy:", "options": ["Unhappy", "Not happy", "Happy", "Happily"], "answer": "Happily" },
        { "id": 28, "question": "Journey means:", "options": ["Trip", "Glass", "Packet", "Sheet"], "answer": "Trip" },
        { "id": 29, "question": "Drought means:", "options": ["Shortage of food", "Hunger", "Shortage of rain", "Pollution"], "answer": "Shortage of rain" }
      ]
    },
    {
      "name": "Matching",
      "questions": [
        { "id": 30, "question": "Adverb", "answer": "Word that modifies a verb" },
        { "id": 31, "question": "Lawyer", "answer": "Works in a court of law" },
        { "id": 32, "question": "Nurses", "answer": "Work at hospitals" },
        { "id": 33, "question": "Past continuous tense", "answer": "Action in progress at a specific time" },
        { "id": 34, "question": "Gesture", "answer": "Sign language" },
        { "id": 35, "question": "Subject pronouns", "answer": "He, she, I, they, you, it" }
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
