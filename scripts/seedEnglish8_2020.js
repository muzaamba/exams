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
  "year": 2020,
  "title": "English Grade 8 Exam 2020",
  "sections": [
    {
      "name": "Grammar",
      "questions": [
        { "id": 1, "question": "I am interested ... playing tennis.", "options": ["in", "on", "at", "of"], "answer": "in" },
        { "id": 2, "question": "We have not ... for a very long time.", "options": ["meeting", "meet", "met", "meat"], "answer": "met" },
        { "id": 3, "question": "Did you see the message ... was sent to your email last week?", "options": ["where", "which", "who", "whose"], "answer": "which" },
        { "id": 4, "question": "Ali ... received a letter from his daughter.", "options": ["has been", "has", "have", "have been"], "answer": "has" },
        { "id": 5, "question": "Who ... the letter?", "options": ["write", "written", "wrote", "writing"], "answer": "wrote" },
        { "id": 6, "question": "She ... listening to the teacher.", "options": ["are", "were", "am", "is"], "answer": "is" },
        { "id": 7, "question": "The visitors have not arrived yet. ...?", "options": ["Haven't they?", "have they?", "have not they?", "have they not?"], "answer": "have they?" },
        { "id": 8, "question": "You will not repeat that mistake, ...?", "options": ["won't you?", "will you?", "will not you?", "wouldn't you?"], "answer": "will you?" },
        { "id": 9, "question": "Direct statement into indirect speech verb becomes:", "options": ["are", "was", "am", "were"], "answer": "was" },
        { "id": 10, "question": "How ... students came to school last week?", "options": ["much", "more", "many", "money"], "answer": "many" },
        { "id": 11, "question": "Whom are you waiting ...?", "options": ["from", "against", "in", "for"], "answer": "for" },
        { "id": 12, "question": "All proper nouns begin with a ...", "options": ["small letter", "lower letter", "italic letter", "capital letter"], "answer": "capital letter" },
        { "id": 13, "question": "She is ... the window to get fresh air.", "options": ["opening", "opened", "open", "opens"], "answer": "opening" },
        { "id": 14, "question": "Would you like to have ... apple?", "options": ["an", "the", "a", "to"], "answer": "an" },
        { "id": 15, "question": "Suffix 'ish' forms an ...", "options": ["adverb", "conjunction", "verb", "adjective"], "answer": "adjective" },
        { "id": 16, "question": "Plural of bay'is", "options": ["babys", "baby", "babies", "babes"], "answer": "babies" },
        { "id": 17, "question": "Past form of take", "options": ["taken", "took", "takes", "taking"], "answer": "took" },
        { "id": 18, "question": "We have been married ... twenty five years.", "options": ["since", "for", "to", "ago"], "answer": "for" },
        { "id": 19, "question": "I ... walk when I was two.", "options": ["can", "could", "would", "should"], "answer": "could" },
        { "id": 20, "question": "I promise this will never happen ...", "options": ["yet", "still", "first", "again"], "answer": "again" }
      ]
    },
    {
      "name": "Vocabulary and Similes",
      "questions": [
        { "id": 21, "question": "As green as ...", "options": ["grass", "glass", "trees", "class"], "answer": "grass" },
        { "id": 22, "question": "As brave as ...", "options": ["an elephant", "a lion", "a zebra", "cheetah"], "answer": "a lion" },
        { "id": 23, "question": "As quiet as ...", "options": ["a house", "a hotel", "a grave", "a garage"], "answer": "a grave" }
      ]
    },
    {
      "name": "Vocabulary",
      "questions": [
        { "id": 24, "question": "An ... is someone legally responsible for actions.", "options": ["adult", "child", "sibling", "relative"], "answer": "adult" },
        { "id": 25, "question": "Teacher didn't have enough ... to drive car.", "options": ["water", "money", "fuel", "window"], "answer": "fuel" },
        { "id": 26, "question": "School period is planned for ...", "options": ["timetable", "teaching a lesson", "duration", "interval"], "answer": "teaching a lesson" },
        { "id": 27, "question": "Synonym of respond", "options": ["reply", "ask", "give", "question"], "answer": "reply" },
        { "id": 28, "question": "Opposite of husband", "options": ["bride", "wife", "girl", "woman"], "answer": "wife" },
        { "id": 29, "question": "Parents tried to ... their child about internet dangers.", "options": ["take part", "advise", "stay in", "keep"], "answer": "advise" },
        { "id": 30, "question": "Can help a child become smart and a leader.", "options": ["ignorance", "appearance", "tolerance", "education"], "answer": "education" },
        { "id": 31, "question": "Not related to sports:", "options": ["jumping", "sleeping", "running", "exercise"], "answer": "sleeping" },
        { "id": 32, "question": "Mother of your father is your:", "options": ["grandmother", "grandfather", "mother", "aunt"], "answer": "grandmother" },
        { "id": 33, "question": "Non elected officers come through:", "options": ["disappointment", "discouragement", "approval", "appointment"], "answer": "appointment" },
        { "id": 34, "question": "One hundred years is a:", "options": ["century", "decade", "millennium", "centre"], "answer": "century" }
      ]
    },
    {
      "name": "Comprehension",
      "questions": [
        { "id": 36, "question": "We do communicate:", "options": ["everyday", "sometimes", "often", "once"], "answer": "everyday" },
        { "id": 37, "question": "Receiver of message is called:", "options": ["sender", "audience", "auditor", "channel"], "answer": "audience" },
        { "id": 38, "question": "Main purpose of media:", "options": ["store and process", "store and send", "store and write", "store and give"], "answer": "store and give" },
        { "id": 39, "question": "Telecommunication enables communication at:", "options": ["close areas", "far off places", "busy places", "forest"], "answer": "far off places" },
        { "id": 40, "question": "Telecommunication media include except:", "options": ["radio", "television", "print media", "Facebook"], "answer": "print media" },
        { "id": 41, "question": "Broadcast media is widely used because of:", "options": ["ability", "newness", "success", "need"], "answer": "success" },
        { "id": 42, "question": "Telecommunication ... us time.", "options": ["gives", "wastes", "saves", "takes"], "answer": "saves" },
        { "id": 43, "question": "Message is conveyed through:", "options": ["mediator", "median", "medium", "air"], "answer": "medium" },
        { "id": 44, "question": "Media originated from:", "options": ["Turkey", "America", "Africa", "Persia"], "answer": "Persia" },
        { "id": 45, "question": "Advertisement is used to:", "options": ["promote", "discourage", "reduce", "control"], "answer": "promote" },
        { "id": 46, "question": "Verbal communication means:", "options": ["writing", "body movement", "word of mouth", "facial expression"], "answer": "word of mouth" },
        { "id": 47, "question": "Digital media is:", "options": ["broadcast media", "printing media", "advertising", "digital media"], "answer": "digital media" },
        { "id": 48, "question": "Telecommunication does NOT include:", "options": ["radio", "television", "telegraph", "magazines"], "answer": "magazines" },
        { "id": 49, "question": "Convey means:", "options": ["get", "take", "wait", "send"], "answer": "send" },
        { "id": 50, "question": "Best title for passage:", "options": ["importance of communication", "telecommunication", "process of communication", "modern communication"], "answer": "importance of communication" }
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
