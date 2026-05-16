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
  "subject": "geography",
  "grade": "grade8",
  "year": 2020,
  "title": "Cilmi Bulsho Grade 8 Exam 2020",
  "questions": [
    { "q": "Beerista dhirta waxaa loo yaqaan:", "options": ["Lumeyn", "Falid", "Qurxin", "Dhirayn"], "answer": "Dhirayn" },
    { "q": "Abul Cabaas Al-safaax waxa uu hogaamiyay dowladdii cabbaasiyiinta xilligii:", "options": ["760 ilaa 780", "770 ilaa 780", "780 ilaa 784", "750 ilaa 754"], "answer": "750 ilaa 754" },
    { "q": "Daryeelka carrada waa hab lagu ilaaliyo carrada si ay:", "options": ["Nafaqada u luminin", "Geed uga bixin", "Biyaha u ceshanin", "Dhir loogu beerin"], "answer": "Nafaqada u luminin" },
    { "q": "Dalalka Geeska Afrika waxaa ay ka kooban yihiin:", "options": ["3 dal", "4 dal", "5 dal", "6 dal"], "answer": "5 dal" },
    { "q": "Wadamada Geeska Afrika waxaa soo gumaystay waddamada:", "options": ["Ingiriiska, Maraykanka iyo Turkiga", "Taliyaniga, Isbayn iyo Jarmalka", "Faransiiska, Burtuqiiska iyo Biljimka", "Ingiriiska, Faransiiska iyo Taliyaaniga"], "answer": "Ingiriiska, Faransiiska iyo Taliyaaniga" },
    { "q": "Jabuuti waxa ay dhinaca galbeed xuduud la leedahay:", "options": ["Soomaaliya", "Ereteriya", "Itoobiya", "Keenya"], "answer": "Itoobiya" },
    { "q": "Habkee ayaan looga hortagi karin nabaadguurka?", "options": ["Dalag gedis", "Beeritaanka diilimaha", "Dhisidda garoon diyaaradeed"], "answer": "Dhisidda garoon diyaaradeed" },
    { "q": "Goorma ayuu dalka Jabuuti qaatay xorriyadiisa?", "options": ["1960kii", "1977kii", "1972kii", "1985kii"], "answer": "1977kii" },
    { "q": "Madaxweynihii ugu horeeyay dalka Jabuuti?", "options": ["Ismaaciil Cumar Geelle", "Aadan Cabdulle Cusmaan", "Xasan Guuleed Abtidoon", "Maxamed Siyaad Barre"], "answer": "Xasan Guuleed Abtidoon" },
    { "q": "Wadankee leh xeebta ugu dheer Afrika?", "options": ["Faransiis", "Kenya", "Nigeria", "Soomaaliya"], "answer": "Soomaaliya" },
    { "q": "Soomaaliya waxay xiriir la lahayd Masar ilaa waqtigii boqoraddii:", "options": ["Fircawn", "Namruud", "Geeddi Shambow", "Xatshabsuut"], "answer": "Xatshabsuut" },
    { "q": "Ururkii xornimo doonka Soomaaliya sanadkee la aasaasay?", "options": ["1940", "1945", "1943", "1960"], "answer": "1943" },
    { "q": "Laf dhabarka dhaqaalaha Soomaaliya waa:", "options": ["Beeraha", "Batroolka", "Kaluunka", "Xoolaha"], "answer": "Xoolaha" },
    { "q": "Soomaaliya gumeystuhu wuxuu u qeybiyey:", "options": ["3 qaybood", "2 qaybood", "5 qaybood", "lama qaybin"], "answer": "5 qaybood" },
    { "q": "Goorma ayuu Taliyaanigu qabsaday Ereteriya?", "options": ["1842kii", "1888kii", "1897kii", "1942kii"], "answer": "1888kii" },
    { "q": "Dalka keliya ee ku yaalla Badweynta Hindiya iyo Badda Cas:", "options": ["Angoola", "Sinigaal", "Nayjeeriya", "Soomaaliya"], "answer": "Soomaaliya" },
    { "q": "Bu'aale waa caasimadda gobolka:", "options": ["Banaadir", "Jubbada Hoose", "Jubbada Dhexe", "Hiiraan"], "answer": "Jubbada Dhexe" },
    { "q": "Soomaaliya goorma ayey xorriyadda ka qaadatay Talyaaniga?", "options": ["1900kii", "1964kii", "1990kii", "1960kii"], "answer": "1960kii" },
    { "q": "Bedka Soomaaliya waa:", "options": ["650000 km2", "765897 km2", "675243 km2", "606078 km2"], "answer": "650000 km2" },
    { "q": "Bar kulanka badaha Hindiya iyo Atlantic waa:", "options": ["Koofur Afrika", "Masar", "Angola", "Soomaaliya"], "answer": "Koofur Afrika" },
    { "q": "Bedka Koonfur Afrika waa:", "options": ["543765 km2", "765341 km2", "1,221,037 km2", "987654 km2"], "answer": "1,221,037 km2" },
    { "q": "Haddii Qaahira 30° Bari tahay 10:00 subaxnimo, Muqdisho 45° Bari waa:", "options": ["9:00 subaxnimo", "11:00 subaxnimo", "1:00 duhurnimo", "9:00 fiidnimo"], "answer": "11:00 subaxnimo" },
    { "q": "Dhulka iftiinka iyo kulaylka wuxuu ka helaa:", "options": ["Dayaxa", "Xiddigaha", "Dayax gacmeed", "Qorraxda"], "answer": "Qorraxda" },
    { "q": "Dhulbaruhu wuxuu ka maraa Soomaaliya magaalo:", "options": ["Hargeysa", "Beledweyne", "Muqdisho", "Sanguuni"], "answer": "Beledweyne" },
    { "q": "Feyraska jadeecada waa:", "options": ["Morbillivirus", "Tifaanyo", "Dhungay", "Infection"], "answer": "Morbillivirus" },
    { "q": "Tallaalka MMR waxa looga hortagaa:", "options": ["Gowracatada", "Shubanka", "Jadeecada", "Hargabka"], "answer": "Jadeecada" },
    { "q": "Cudurka duumadu waa:", "answer": "Waa cudur dhilmaayo gudbiso", "type": "short_answer" },
    { "q": "Duumada waxaa gudbiya dhilmaayada nooceeda:", "options": ["Dheddig", "Lab", "Yaryar", "Waaweyn"], "answer": "Dheddig" },
    { "q": "Muuqaalka dhulka waa sida:", "options": ["Miiska", "Cirka", "Ukunta digaagga", "Geedaha"], "answer": "Ukunta digaagga" },
    { "q": "Dhaqaalaha Soomaaliya waxa uu ka yimaadaa:", "options": ["Beeraha", "Xoolaha", "Kaluumeysiga", "Beeraha iyo Xoolaha"], "answer": "Xoolaha" },
    { "q": "Qowmiyadaha Jabuuti:", "options": ["Soomaali", "Cafar", "Soomaali iyo Cafar", "Carab"], "answer": "Soomaali iyo Cafar" },
    { "q": "Xoolaha oo lagu daayo dhulka daaqsinta leh waxa ay keentaa:", "options": ["Barwaaqo", "Roob badan", "Nabaad guur", "Dhul cagaaran"], "answer": "Nabaad guur" },
    { "q": "Dhibaatooyinka dadku u keenaan deegaanka:", "options": ["Qurxin", "Dhirayn", "Duufaan", "Jarridda dhirta"], "answer": "Jarridda dhirta" },
    { "q": "Ereteriya waxay xorriyadda ka qaadatay:", "options": ["Itoobiya", "Masar", "Jabuuti", "Kenya"], "answer": "Itoobiya" },
    { "q": "Saddex dal oo Ingiriisku gumaystay:", "options": ["Ereteriya, Gini, Gaambiya", "Aljeeriya, Liibiya, Tuuniisiya", "Nayjeeriya, Kenya, Masar", "Gaambiya, Liibiya, Marooko"], "answer": "Nayjeeriya, Kenya, Masar" },
    { "q": "Af Carabiga waa luuqadda rasmiga ah ee:", "options": ["Soomaaliya", "Itoobiya", "Ruwanda"], "answer": "Soomaaliya" },
    { "q": "Cabbaasiyiintu waxay talada kala wareegeen:", "options": ["Faadimiiyiinta", "Khulafada Raashidiinta", "Umawiyiinta", "Cusmaaniyiinta"], "answer": "Umawiyiinta" },
    { "q": "Khaliifkii Cabbaasiyiinta Abu Ja’far Al-Mansuur waxa uu xukunka ka dhaxlay walaalkiis:", "options": ["Al-Cabbaas", "Al-Nawawi", "Abu Jacfar Mansuur", "Khaalid"], "answer": "Al-Cabbaas" },
    { "q": "Baqdaad waxay soo ifbaxday sanadkii:", "options": ["809", "890", "908", "989"], "answer": "908" },
    { "q": "Luqaddii Mucas waxay ahayd:", "options": ["Turki", "Masri", "Taliyaani", "Faarisi"], "answer": "Faarisi" },
    { "q": "Calawiyiintu waxay ku abtirsadaan:", "options": ["Cumar binu Khadaab", "Dalxa", "Cali binu Abii Daalib", "Xamsa"], "answer": "Cali binu Abii Daalib" },
    { "q": "Haddii Muqdisho 45 Bari tahay 9:00 aroornimo, Landhan 0°, waa:", "options": ["10:00", "6:00", "8:00", "12:00"], "answer": "6:00" },
    { "q": "Simbabwe wuxuu ka mid yahay wadamada uu gumaystay:", "options": ["Ingiriiska", "Holand", "Germany", "Isbaaniya"], "answer": "Ingiriiska" },
    { "q": "Madaxweynihii ugu horeeyay Soomaaliya:", "options": ["Cabdullaahi Ciise", "Aadan Cabdulle Cismaan", "Maxamed Siyaad Barre", "Cabdirashiid Cali Sharmaarke"], "answer": "Aadan Cabdulle Cismaan" },
    { "q": "Baaxadda Sudan waa:", "options": ["1,68,068 km2", "1,868,068 km2", "1,886,068 km2", "1,686,798 km2"], "answer": "1,868,068 km2" },
    { "q": "Badda dhinaca waqooyi ka xigta Soomaaliya waa:", "options": ["Badda Cas", "Badda Madow", "Badda Dhexe", "Gacanka Cadmeed"], "answer": "Badda Cas" },
    { "q": "Haarun Ar-Rashiid waxaa xigay:", "options": ["Al-Ma'muun", "Al-Amiin", "Al-Muctasim", "Al-Idiriis"], "answer": "Al-Amiin" },
    { "q": "Suudaan waxay ku taalaa waqooyi bari qaaradda:", "options": ["Amerika", "Aasiya", "Afrika"], "answer": "Afrika" },
    { "q": "Haddii dhirtu dhimato noolaha:", "options": ["Waan noolaanayaan", "Koraan", "Waa dhimanayaan", "Jiraanayaan"], "answer": "Waa dhimanayaan" },
    { "q": "Dalka Soomaaliya waxa uu ku yaalaa:", "options": ["Koonfur Afrika", "Bariga Afrika", "Bartamaha Afrika", "Galbeedka Afrika"], "answer": "Bariga Afrika" }
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

  // Create a single section for all questions
  const { data: section, error: secErr } = await supabase.from('sections').insert({
    exam_id: examId,
    section_name: "Xulashada Saxda ah (Multiple Choice)",
    sort_order: 1
  }).select('id').single();

  if (secErr) {
    console.error('Error inserting section:', secErr.message);
  }

  const sectionId = section?.id;
  const questionsToInsert = examData.questions.map((q, index) => {
    const isMcq = Array.isArray(q.options);
    
    let correctAns = null;
    if (isMcq) {
      const indexAns = q.options.indexOf(q.answer);
      correctAns = indexAns === 0 ? 'a' : indexAns === 1 ? 'b' : indexAns === 2 ? 'c' : indexAns === 3 ? 'd' : null;
    }

    return {
      exam_id: examId,
      section_id: sectionId,
      question_number: index + 1,
      question_type: q.type || (isMcq ? 'mcq' : 'short_answer'),
      topic: "Cilmi Bulsho",
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
    console.error(`Failed to insert questions:`, qErr.message);
  } else {
    console.log(`Successfully inserted ${questionsToInsert.length} questions.`);
  }

  console.log('Seeding completed!');
}

seed().catch(console.error);
