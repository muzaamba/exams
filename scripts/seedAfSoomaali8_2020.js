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
  "year": 2020,
  "title": "Af-Soomaali Grade 8 Exam 2020",
  "sections": [
    {
      "name": "Naxwaha Af-Soomaaliga",
      "questions": [
        { "question_no": 1, "question": "Naxwaha Af-Soomaaligu wuxuu u kala baxaa:", "options": { "a": "2 qaybood", "b": "4 qaybood", "c": "3 qaybood", "d": "6 qaybood" }, "answer": "c" },
        { "question_no": 2, "question": "Erayga tilmaamaya qof ka badan hal qof waa:", "options": { "a": "niman", "b": "nimo", "c": "nimanyaalo", "d": "nin" }, "answer": "a" },
        { "question_no": 3, "question": "Erayga 'malab' wuxuu ka koobanyahay:", "options": { "a": "1 xubin", "b": "2 xubnood", "c": "3 xubnood", "d": "4 xubnood" }, "answer": "b" },
        { "question_no": 4, "question": "Magac-u-yaal waxaa loo isticmaalaa halkii laga isticmaali lahaa:", "options": { "a": "Sifada", "b": "Magaca", "c": "Falkaab", "d": "Falka" }, "answer": "b" },
        { "question_no": 5, "question": "Shardileey waa labo weerood oo la isu geeyay oo:", "options": { "a": "Kala madaxbanaan", "b": "Isku xiran", "c": "Isleh", "d": "Isku macno ah" }, "answer": "b" },
        { "question_no": 6, "question": "Cali wuxuu aaday suuqa shalay. Falka 'aaday' waa fal:", "options": { "a": "Ahaansho", "b": "Ma gudbe", "c": "Gudbe", "d": "Gargaare" }, "answer": "c" },
        { "question_no": 7, "question": "Weeraha soo socda midkee si saxan loo astaameeyay?", "options": { "a": "anas waa arday.", "b": "Maanta waa Talaado.", "c": "Maxaa dooneysaa.", "d": "Aniga ayaa arkay" }, "answer": "b" },
        { "question_no": 8, "question": "Magac-u-yaalka 'isaga' marka loo rogo jamac waa:", "options": { "a": "iyaga", "b": "innaga", "c": "idinka", "d": "iyada" }, "answer": "a" },
        { "question_no": 9, "question": "Dhameystir: Hadduu wax barto,", "options": { "a": "wuu shaqeystaa", "b": "wuu shaqeysan lahaa", "c": "wuu shaqeysan doonaa", "d": "wuu shaqeeyay" }, "answer": "a" },
        { "question_no": 10, "question": "Marka shay laga hadlayo heerarkiisa kala duwan waxaa lagu tilmaamaa:", "options": { "a": "Sifo xulasho", "b": "Sifo caadi", "c": "Sifo is-barbardhig", "d": "Sifo dahsoon" }, "answer": "c" },
        { "question_no": 11, "question": "Sifada is-barbardhigeed ee erayga geesi waa:", "options": { "a": "Ka geesisan", "b": "Ka geesan", "c": "Geesinimo", "d": "Geesi ah" }, "answer": "a" },
        { "question_no": 12, "question": "Ardaydu waxay aadeen dugsiga. Falka 'aadeen' waa:", "options": { "a": "Tagay", "b": "Jooga", "c": "Soo socda", "d": "Ahaansho" }, "answer": "a" },
        { "question_no": 13, "question": "Meeleey waxaa loo isticmaalaa ka hor:", "options": { "a": "Fal", "b": "Magac", "c": "Xiriiriye", "d": "Sifo" }, "answer": "b" },
        { "question_no": 14, "question": "Cad iyo caano ayaa la igu casuumay. Xiriiriyaha jumladdan ku jira waa:", "options": { "a": "ayaa", "b": "iyo", "c": "la igu", "d": "cad" }, "answer": "b" },
        { "question_no": 15, "question": "Kalluunka ayuu jecel yahay. Magac-u-yaalka ku qarsoon waa:", "options": { "a": "Iyagu", "b": "Innagu", "c": "Isagu", "d": "Iyadu" }, "answer": "c" },
        { "question_no": 16, "question": "Erayada soo socda midkee ma aha magac?", "options": { "a": "Tagay", "b": "Buug", "c": "Guri", "d": "Libaax" }, "answer": "a" },
        { "question_no": 17, "question": "Faadumo waa ardayad. Falka ku jira weedhan waa:", "options": { "a": "Ahaansho", "b": "Tagay", "c": "Jooga", "d": "Gudbe" }, "answer": "a" },
        { "question_no": 18, "question": "Joogsiga waa astaan la dhigto:", "options": { "a": "Bilowga", "b": "Dhammaadka", "c": "Dhexda", "d": "Korka" }, "answer": "b" },
        { "question_no": 19, "question": "Falkaabku waxa uu warbixin buuxda ka bixiyaa:", "options": { "a": "Falka", "b": "Magaca", "c": "Meeleeye", "d": "Magac-u-yaalka" }, "answer": "a" },
        { "question_no": 20, "question": "Erayada soo socda midkee ma aha xiriiriye?", "options": { "a": "Muuse", "b": "Mise", "c": "Ka dib", "d": "Iyo" }, "answer": "a" }
      ]
    },
    {
      "name": "Erayo",
      "questions": [
        { "question_no": 21, "question": "Gabayga 'Waa Duni' waxaa curiyey:", "options": { "a": "Cabdullaahi Suldaan Tima Cadden", "b": "Raage Ugaas", "c": "Xaaji Aadan Axmed Af-Qalooc", "d": "Maxamuud Cabdullaahi Sangub" }, "answer": "a" },
        { "question_no": 22, "question": "Magaalada Muqdisho waa:", "options": { "a": "Beel", "b": "Tuulo", "c": "Degmo", "d": "Caasimad" }, "answer": "d" },
        { "question_no": 23, "question": "Erayga xaas waxaa kale oo loo yaqaan:", "options": { "a": "Oori", "b": "Gabar", "c": "Garoob", "d": "Gashaanti" }, "answer": "a" },
        { "question_no": 24, "question": "Lidka erayga gaajo waa:", "options": { "a": "Dan", "b": "Oon", "c": "Dhereg", "d": "Harraad" }, "answer": "c" },
        { "question_no": 25, "question": "Geelu wuxuu leeyahay dhawaaq gaar ah oo loo yaqaan:", "options": { "a": "Oror", "b": "Olol", "c": "Orod", "d": "Horin" }, "answer": "a" },
        { "question_no": 26, "question": "Waxyaabaha loo adeegsado geela waxaa ka mid ah:", "options": { "a": "Rarasho", "b": "Hilibkiisa la cuno", "c": "Magta lagu bixiyo", "d": "Ceel qodis" }, "answer": "d" },
        { "question_no": 27, "question": "Erayga talantalli micnihiisu waa:", "options": { "a": "Kala hor marin", "b": "Kala tagid", "c": "Isfahan", "d": "Isweydaar" }, "answer": "d" },
        { "question_no": 28, "question": "Erayada dhexmara labo dhinac iyo in ka badan waa:", "options": { "a": "Wada sheekeysi", "b": "Dagaal", "c": "Wadahadal", "d": "Wada shaqeyn" }, "answer": "c" },
        { "question_no": 29, "question": "Gabayga Qabyaalad waxaa curiyay:", "options": { "a": "Sayid Maxamed Cabdulle Xasan", "b": "Abshir Nuur Faarax (Bacadle)", "c": "Xaaji Aadan Af-Qallooc", "d": "Ismaaciil Mire" }, "answer": "b" },
        { "question_no": 30, "question": "Lidka erayga gudcur waa:", "options": { "a": "Mugdi", "b": "Iftiin", "c": "Madow", "d": "Cagaar" }, "answer": "b" },
        { "question_no": 31, "question": "Faa’iidooyinka sabirka waxaa ka mid ah:", "options": { "a": "Welwel", "b": "Xamaasad", "c": "Xasillooni", "d": "Cadho" }, "answer": "c" },
        { "question_no": 32, "question": "Micnaha erayga 'boor' waa:", "options": { "a": "Beer", "b": "Dhiiqo", "c": "Dabeyl", "d": "Habaas" }, "answer": "d" },
        { "question_no": 33, "question": "Labka lo’da waxaa loo yaqaan:", "options": { "a": "Sac", "b": "Wan", "c": "Qaalin", "d": "Dibi" }, "answer": "d" },
        { "question_no": 34, "question": "Derisku waa inuu is:", "options": { "a": "Dilo", "b": "Xanto", "c": "Dhibo", "d": "Ixtiraamo" }, "answer": "d" },
        { "question_no": 35, "question": "Dhameystir maahmaahda: Soor nin yimid baa leh, sagootinna nin:", "options": { "a": "Tegayaa", "b": "Soo socdaa", "c": "Guursanayaa", "d": "Jiifa" }, "answer": "a" }
      ]
    },
    {
      "name": "Sheeko",
      "questions": [
        { "question_no": 36, "question": "Mawduuca doodda waxa uu ku yimaadaa:", "options": { "a": "Amarka ardayda", "b": "Soo jeedinta ardayda", "c": "Qoraal xafiiseed", "d": "Rabitaanka mid kamid ah ardayda" }, "answer": "b" },
        { "question_no": 37, "question": "Doodda waxaa daadihiya:", "options": { "a": "Qofkii raba", "b": "Qofka hadalka badan", "c": "Dhageyste", "d": "Guddi" }, "answer": "d" },
        { "question_no": 38, "question": "Inta ay dooddu socoto qof waliba waa inuu:", "options": { "a": "Socdaa", "b": "Fariistaa", "c": "Taagnaadaa", "d": "Doodaa" }, "answer": "b" },
        { "question_no": 39, "question": "Guddi doodeed hawshiisu waa:", "options": { "a": "Qorista doodda", "b": "Gabagabeynta", "c": "Dhiirrigelinta", "d": "Kala saaridda kooxaha" }, "answer": "b" },
        { "question_no": 40, "question": "Ka qayb galayaasha doodda waa in codkoodu:", "options": { "a": "Hooseeyo", "b": "Dheer yahay", "c": "Macaan yahay", "d": "Dhagajabis yahay" }, "answer": "a" },
        { "question_no": 41, "question": "Barashada qaabka dooddu waxa ay ardayga ka caawisaa:", "options": { "a": "Dhaqanka doodda", "b": "Dagaalka", "c": "Aamusnaanta", "d": "Runta" }, "answer": "a" },
        { "question_no": 42, "question": "Codkar micnihiisu waa:", "options": { "a": "Afgaaban", "b": "Buuq badan", "c": "Afxun", "d": "Aftahan" }, "answer": "d" },
        { "question_no": 43, "question": "Doodaha waxa laga bartaa:", "options": { "a": "Daawadenimo", "b": "Dhegeystenimo", "c": "Macallinnimo", "d": "Aftahannimo" }, "answer": "d" },
        { "question_no": 44, "question": "Mawduuca dooddu waa inuu ahaadaa mid:", "options": { "a": "Furan", "b": "Gaar ah", "c": "Aan la fahmi karin", "d": "Adag" }, "answer": "b" },
        { "question_no": 45, "question": "Ka qayb qaadashada dooddu waxa ay ardayga ku abuurtaa:", "options": { "a": "Cabsi", "b": "Kalsooni", "c": "Xishood", "d": "Anshax xumo" }, "answer": "b" },
        { "question_no": 46, "question": "Daadihiyaha doodda waxaa dooranaya:", "options": { "a": "Shacabka", "b": "Ardayda", "c": "Macallimiinta", "d": "Waalidka" }, "answer": "b" },
        { "question_no": 47, "question": "Micnaha erayga 'cayiman' waa:", "options": { "a": "Mugdi ah", "b": "Gaar ah", "c": "Dheer", "d": "La garaneyn" }, "answer": "b" },
        { "question_no": 48, "question": "Dhibcaha ugu badan waxaa la siiyaa kooxda sababeyntoodu:", "options": { "a": "Ugu wanaagsan tahay", "b": "Ugu dheertahay", "c": "Ugu hooseyso", "d": "Ugu adagtahay" }, "answer": "a" },
        { "question_no": 49, "question": "Koox waliba hadalkeeda waxaa uruurinaya:", "options": { "a": "Macallinka", "b": "Ardayda", "c": "Daadihiyaha kaliya", "d": "Guddiga" }, "answer": "d" },
        { "question_no": 50, "question": "Dood waxaa lagu bartaa:", "options": { "a": "Qoridda", "b": "Akhriska", "c": "Wax sameynta", "d": "Codkarnimo" }, "answer": "d" }
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
    const questionsToInsert = sec.questions.map((q, index) => {
      totalQuestions++;
      return {
        exam_id: examId,
        section_id: sectionId,
        question_number: q.question_no || totalQuestions,
        question_type: 'mcq',
        topic: sec.name,
        question_text: q.question,
        option_a: q.options?.a || null,
        option_b: q.options?.b || null,
        option_c: q.options?.c || null,
        option_d: q.options?.d || null,
        correct_answer: q.answer.toLowerCase(),
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
