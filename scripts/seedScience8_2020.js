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
  "subject": "science",
  "grade": "grade8",
  "year": 2020,
  "title": "Saynis Fasalka 8aad 2020",
  "sections": [
    {
      "name": "General Science Questions",
      "questions": [
        { "question": "Maxay geeduhu u baahan yihiin si ay u samaystaan cunto?", "answer": "Biyo, kaarboon laba ogsaaydh, ilayska qorraxda" },
        { "question": "Duumada unugyadee ayey wax yeeshaa?", "answer": "Unugyada beerka" },
        { "question": "Biyaha ugu badan ee dunida waxaa loo isticmaalaa:", "answer": "Waraabka beeraha" },
        { "question": "Midoobidda xawada labka iyo ugxanta dheddigga waxaa loo yaqaanaa:", "answer": "Bacrimin" },
        { "question": "Duumada waxaa gudbiya kaneecada dhedigga ee loo yaqaan:", "answer": "Anoofalis" },
        { "question": "Isku soo ururidda ilma galeenka marka uu wareegga dhamaado waxaa loo yaqaan:", "answer": "Foosha" },
        { "question": "Halbeegga lagu cabbiro hawsha waxaa loo yaqaan:", "answer": "Juul" },
        { "question": "Boqolleyda biyaha macaan ee dunida waa:", "answer": "3%" },
        { "question": "Cudurka waraabowga waxa uu ku bilawdaa:", "answer": "Boog yar oo agagaarka xubnaha taranka" },
        { "question": "Muddada uur-ku-sidka lo’da waa:", "answer": "Sagaal bilood" },
        { "question": "Kaamirada biindaloolka waxa ay sameysaa humaag:", "answer": "Janjeera" },
        { "question": "Uur-jiifka iyo hooyada waxaa isku xira:", "answer": "Mandheerta" },
        { "question": "Bakteeriyada keenta jabtada waa:", "answer": "Neisseria gonorrhoeae" },
        { "question": "Isbeddel tartiib ah oo hore loogu bedelo neef waxaa loo yaqaanaa:", "answer": "Uumi bax" },
        { "question": "Xubin aan kamid ahayn taranka dheddiga waa:", "answer": "Marinka xawda" },
        { "question": "Jabtadu dumarka waxa ay kaga dhacdaa:", "answer": "Ilmo galeenka iyo marinka kaadida" },
        { "question": "Isbeddelka jawiga meel gaar ah waxaa loo yaqaanaa:", "answer": "Cimilo" },
        { "question": "Arag dheerida waxa keenta:", "answer": "Hummaagga oo ka sameysma ratiinaha gadaashiisa" },
        { "question": "Cudurrada ku gudba biyaha iyo cuntada wasakhaysan:", "answer": "Tiifowga" },
        { "question": "Xubin aan kamid ahayn taranka labka waa:", "answer": "Marin ugxan" },
        { "question": "Labada cirif ee birlabta waa:", "answer": "Cirif koonfureed iyo cirif waqooyi" },
        { "question": "Ka hortagga duumada:", "answer": "In la xirto maro kaneeco" },
        { "question": "Cilladda arag dheerida waxaa lagu saxo:", "answer": "Bikaaco kulmis ah" },
        { "question": "Heerka labaad ee waraabowga wuxuu bilaabmaa:", "answer": "2 ilaa 12 toddobaad" },
        { "question": "Koriinka buuxa uurjiifka ka hor dhalmada waxaa la yiraahdaa:", "answer": "Dhalmada" },
        { "question": "Ka hortagga AIDS:", "answer": "In laga fogaado sinada" },
        { "question": "Qalabka lagu cabbiro roobka:", "answer": "Roob-beeg" },
        { "question": "Hab aan lagu daryeelin deegaanka:", "answer": "Xaalufinta dhirta" },
        { "question": "Boqolleyda biyaha milixda ah ee dhulka:", "answer": "97%" },
        { "question": "Sababta loo waraabiyo habeenkii:", "answer": "Si loo yareeyo uumi baxa" },
        { "question": "Muddada shimbirta ukunta ku fadhiso waxaa lagu magacaabaa:", "answer": "Ukun-dillaacin" },
        { "question": "Waraabinta tooska u gaarta xididka waxaa la yiraahdaa:", "answer": "Waraabin dhibcis" },
        { "question": "Xaniinyaha (Testes) waxa ay soo saaraan:", "answer": "Xawo" },
        { "question": "Bacriminta bani’aadamka waxay ka dhacdaa:", "answer": "Gudaha dheddigga" },
        { "question": "Midabka caleenta geedka waxaa keenta:", "answer": "Cagaariso" },
        { "question": "Diikhowga carrada maxaa aan keenin?", "answer": "Fatahaadaha" },
        { "question": "Ilmo galeenka (Uterus) halka uu ku yaallo:", "answer": "Bartamaha godka sinaha" },
        { "question": "Geedka qaybta cuntada sameysa waa:", "answer": "Caleemaha" },
        { "question": "Qalabka cabbira qoyaanka (Humidity) hawada:", "answer": "Huurbeeg" },
        { "question": "Silsiladda cuntada iyo shabakadda cuntada waxay wadaagaan:", "answer": "Tamar socodka" },
        { "question": "Rahu waxa uu dhala:", "answer": "Ukun" },
        { "question": "Keymuhu dhulka boqolley ahaan waxa ay ka fadhiyaan:", "answer": "Saddex meelood hal meel" },
        { "question": "Lullumadu (Insects) waxa ay ku neefsataa:", "answer": "Dulleelo" },
        { "question": "Dul janjeer adag oo shaqo fududeeya (Lever):", "answer": "Kabaalka" },
        { "question": "Xiddigga dhanka waqooyi jooga:", "answer": "Xiddig cirif" },
        { "question": "Unugyada isha ee dareema iftiinka:", "answer": "Rodis iyo konis" }
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
    const questionsToInsert = sec.questions.map((q, idx) => {
      totalQuestions++;
      return {
        exam_id: examId,
        section_id: sectionId,
        question_number: totalQuestions,
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
