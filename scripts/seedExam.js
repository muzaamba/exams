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
  "year": 2025,
  "subject": "PHYSICS",
  "title": "Physics National Exam 2025",
  "grade": "form4",
  "sections": [
    {
      "name": "Part One: Multiple Choice Questions",
      "questions": [
        { "question": "The branch of physics that deals with motion and force is called:", "options": { "a": "Optics", "b": "Mechanics", "c": "Atomic", "d": "Electromagnetism" }, "answer": "b" },
        { "question": "The magnetic field lines originate from:", "options": { "a": "East Pole", "b": "South Pole", "c": "North Pole", "d": "West Pole" }, "answer": "c" },
        { "question": "In which diagram are P and Q in series with each other and parallel with R?", "options": { "a": "A", "b": "B", "c": "C", "d": "D" }, "answer": "c" },
        { "question": "The period of SHM (Simple Pendulum) depends on:", "options": { "a": "Length of string", "b": "Mass of spring", "c": "Gravity", "d": "Mass of body" }, "answer": "a" },
        { "question": "At what interval is the velocity constant in the journey graph?", "options": { "a": "Between O and K", "b": "Between L and M", "c": "Between K and L", "d": "Between O and M" }, "answer": "c" },
        { "question": "Which quantity is measured as Force per unit Area (F/A)?", "options": { "a": "Pressure", "b": "Energy", "c": "Volume", "d": "Temperature" }, "answer": "a" },
        { "question": "The device used for measuring potential difference (Voltage) is known as:", "options": { "a": "Ammeter", "b": "Voltmeter", "c": "Ohmmeter", "d": "Galvanometer" }, "answer": "b" },
        { "question": "Which wave property describes waves spreading out through a gap?", "options": { "a": "Reflection", "b": "Refraction", "c": "Diffraction", "d": "Rectilinear Propagation" }, "answer": "c" },
        { "question": "Which method of heat transfer occurs in a vacuum?", "options": { "a": "conduction", "b": "convection", "c": "radiation", "d": "induction" }, "answer": "c" },
        { "question": "In the early morning, buildings form a shadow that appears:", "options": { "a": "Long", "b": "fat", "c": "thin", "d": "short" }, "answer": "a" },
        { "question": "Which pendulum length oscillates with the lowest frequency?", "options": { "a": "String A", "b": "String B", "c": "String C", "d": "String D (Longest)" }, "answer": "d" },
        { "question": "The third law of Newton is also known as:", "options": { "a": "Law of inertia", "b": "Law of acceleration", "c": "Law of action and reaction", "d": "Law of weight" }, "answer": "c" },
        { "question": "The motion shown in the curved path figure is:", "options": { "a": "Linear Motion", "b": "Projectile Motion", "c": "Circular Motion", "d": "Oscillatory Motion" }, "answer": "b" },
        { "question": "The quantity of heat energy is given by the formula:", "options": { "a": "Q=mcΔt", "b": "Q=mL", "c": "Q=Pt", "d": "Q=VIt" }, "answer": "a" },
        { "question": "In the wave diagram, the peak displacement (amplitude) is equivalent to:", "options": { "a": "1cm", "b": "2cm", "c": "3cm", "d": "4cm" }, "answer": "d" },
        { "question": "Which of the following materials allows light to pass through it?", "options": { "a": "Copper", "b": "wood", "c": "glass", "d": "rubber" }, "answer": "c" },
        { "question": "The frequency of simple harmonic motion for a spring is given by:", "options": { "a": "f = (1/2π)√(k/m)", "b": "f = (1/2π)√(m/k)", "c": "f = 2π√(k/m)", "d": "f = 2π√(m/k)" }, "answer": "a" },
        { "question": "Which brick placement results in the least pressure on the surface?", "options": { "a": "Shape A (Lying flat)", "b": "Shape B (Vertical)", "c": "Shape C (On edge)", "d": "All have same pressure" }, "answer": "a" },
        { "question": "Which characteristic of sound helps distinguish a woman's voice from a man's?", "options": { "a": "Intensity", "b": "Loudness", "c": "Quality", "d": "Pitch" }, "answer": "d" },
        { "question": "If the angle between two plane mirrors is 60°, how many images are formed?", "options": { "a": "6 images", "b": "5 images", "c": "4 images", "d": "3 images" }, "answer": "b" },
        { "question": "The image formed by a plane mirror is always:", "options": { "a": "real and erect", "b": "virtual and inverted", "c": "virtual and erect", "d": "real and magnified" }, "answer": "c" },
        { "question": "A battery of 220V is connected to a lamp of 800 Ω. The current is:", "options": { "a": "220V", "b": "176V", "c": "0.275A", "d": "220.8V" }, "answer": "c" },
        { "question": "The principle of formation of image in lenses is:", "options": { "a": "Reflection", "b": "Refraction", "c": "Dispersion", "d": "Scattering" }, "answer": "b" },
        { "question": "Coal appears dark when viewed with white light because it:", "options": { "a": "Reflects all light", "b": "Disperses light", "c": "Refracts light", "d": "Absorbs all light" }, "answer": "d" },
        { "question": "The stars appear to twinkle due to atmospheric:", "options": { "a": "refraction", "b": "diffraction", "c": "interference", "d": "reflection" }, "answer": "a" },
        { "question": "The seven colors obtained when white light passes through a prism is known as a:", "options": { "a": "Scattering", "b": "Refraction", "c": "Spectrum", "d": "Dispersion" }, "answer": "c" },
        { "question": "Calculate the equivalent capacitance for 4μF and 6μF capacitors in series:", "options": { "a": "3.4μF", "b": "2.4μF", "c": "4.4μF", "d": "5.4μF" }, "answer": "b" },
        { "question": "Basic elements in an RLC circuit are:", "options": { "a": "Resistor, Inductor, Capacitor", "b": "Voltage, Diode, Inductor", "c": "Transistor, Diode, Capacitor", "d": "Diode, Inductor, Resistor" }, "answer": "a" },
        { "question": "Which logic gate does the shown symbol represent?", "options": { "a": "AND gate", "b": "OR gate", "c": "NOT gate", "d": "NOR gate" }, "answer": "b" },
        { "question": "The two most frequently used materials for electronics are:", "options": { "a": "Carbon and Selenium", "b": "Selenium and Glass", "c": "Germanium and Silicon", "d": "Gallium and Arsenic" }, "answer": "c" },
        { "question": "Which electromagnetic radiation is the most hazardous?", "options": { "a": "y-ray (Gamma)", "b": "Infrared", "c": "x-ray", "d": "Ultraviolet" }, "answer": "a" },
        { "question": "Elements with the same mass number but different atomic number are called:", "options": { "a": "isobars", "b": "isotones", "c": "isotopes", "d": "isomers" }, "answer": "a" },
        { "question": "Which type of radiation is stopped by a sheet of paper?", "options": { "a": "Beta particle", "b": "alpha particle", "c": "gamma ray", "d": "x-ray" }, "answer": "b" }
      ]
    },
    {
      "name": "Structured Questions",
      "questions": [
        { "question": "What is a magnet and what are its poles?", "answer": "A magnet is a material that produces a magnetic field. Its poles are North and South." },
        { "question": "Distinguish between transparent and translucent materials.", "answer": "Transparent materials allow all light to pass through clearly. Translucent materials allow some light to pass but scatter it." },
        { "question": "List five common properties of waves.", "answer": "Reflection, Refraction, Diffraction, Interference, Polarization." },
        { "question": "Compare luminous and non-luminous bodies with examples.", "answer": "Luminous bodies emit their own light (Sun). Non-luminous bodies reflect light (Moon)." },
        { "question": "Why is red light used as a universal danger signal?", "answer": "Red light has the longest wavelength and is scattered the least by air molecules, making it visible from long distances." },
        { "question": "A student cannot see clearly beyond 2m. Name the defect and the correcting lens.", "answer": "Short-sightedness (Myopia). Corrected by Concave lens." },
        { "question": "Calculate weight of a yacht (m = 6200 kg, g = 10 m/s²).", "answer": "62,000 N" },
        { "question": "Calculate angular frequency of a clock's minute arm (1 revolution in 60s).", "answer": "ω = 2π / T = 2π / 60 ≈ 0.105 rad/s" },
        { "question": "Find the intensity level in dB for a sound wave of intensity 4×10^-6 W/m².", "answer": "dB = 10 log(I/Io)" },
        { "question": "Find secondary current in a transformer if Ip = 10 A, Np = 600, Ns = 3000.", "answer": "2 A" },
        { "question": "Calculate electron energy in J and eV if V = 10,000V.", "answer": "E = 1.6 × 10^-15 J, E = 10,000 eV" },
        { "question": "Find equivalent resistance of 20Ω, 60Ω, and 120Ω in parallel.", "answer": "12 Ω" },
        { "question": "Calculate induced EMF if L = 20cm, v = 5m/s, and B = 0.004T.", "answer": "0.004 V" }
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
      // If section insertion fails (RLS), we might try to proceed without it or stop
      // continue; 
    }

    const sectionId = section?.id;
    const questionsToInsert = sec.questions.map((q, index) => {
      totalQuestions++;
      const isMcq = !!q.options;
      return {
        exam_id: examId,
        section_id: sectionId,
        question_number: totalQuestions,
        question_type: isMcq ? 'mcq' : 'short_answer',
        topic: sec.name,
        question_text: q.question,
        option_a: q.options?.A || null,
        option_b: q.options?.B || null,
        option_c: q.options?.C || null,
        option_d: q.options?.D || null,
        correct_answer: isMcq ? q.answer.toLowerCase() : null,
        explanation: !isMcq ? (typeof q.answer === 'object' ? JSON.stringify(q.answer) : q.answer) : null,
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

