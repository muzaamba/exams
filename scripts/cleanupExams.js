import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Canonical subject slug mapping
function normalizeSubject(subject) {
  if (!subject) return null;
  const s = subject.toLowerCase().trim();
  if (s.includes('soomaali') || s === 'somali') return 'somali';
  if (s.includes('math')) return 'mathematics';
  if (s.includes('bio')) return 'biology';
  if (s.includes('chem')) return 'chemistry';
  if (s.includes('physic')) return 'physics';
  if (s.includes('arab')) return 'arabic';
  if (s.includes('eng')) return 'english';
  if (s.includes('geo')) return 'geography';
  if (s.includes('hist') || s.includes('taariikhda')) return 'history';
  if (s.includes('islamic') || s.includes('tarbiya')) return 'islamic_studies';
  if (s.includes('business') || s.includes('maamulka') || s.includes('ganacsiga')) return 'business';
  if (s.includes('ict') || s.includes('computer') || s.includes('teknoolajiyada')) return 'ict';
  if (s.includes('science') || s.includes('saynis')) return 'science';
  if (s.includes('cilmi') || s.includes('bulsh')) return 'social_studies';
  return s.replace(/\s+/g, '_');
}

// Canonical grade mapping
function normalizeGrade(grade, title) {
  if (grade && (grade === 'grade8' || grade === 'form4')) return grade;
  // Try to infer from title
  const t = (title || '').toLowerCase();
  if (t.includes('form 4') || t.includes('form4') || t.includes('fasalka 11') || t.includes('fasalka 12')) return 'form4';
  return 'grade8'; // Default to grade8
}

async function cleanup() {
  console.log('🔍 Fetching all exams from database...');
  const { data: exams, error } = await supabase
    .from('exams')
    .select('id, subject, grade, title, year');

  if (error) {
    console.error('Failed to fetch exams:', error.message);
    return;
  }

  console.log(`Found ${exams.length} exam records.\n`);

  // Group by normalized subject + year + grade to find duplicates
  const seen = new Map();
  const toDelete = [];
  const toUpdate = [];

  for (const exam of exams) {
    const normalizedSubject = normalizeSubject(exam.subject);
    const normalizedGrade = normalizeGrade(exam.grade, exam.title);
    const key = `${normalizedSubject}__${exam.year}__${normalizedGrade}`;

    const needsUpdate =
      exam.subject !== normalizedSubject || exam.grade !== normalizedGrade;

    if (seen.has(key)) {
      // This is a duplicate — mark for deletion (keep the first seen)
      toDelete.push(exam.id);
      console.log(`🗑️  DUPLICATE: [${exam.id}] "${exam.title}" (${exam.subject}, ${exam.year}, ${exam.grade})`);
    } else {
      seen.set(key, exam.id);
      if (needsUpdate) {
        toUpdate.push({ id: exam.id, subject: normalizedSubject, grade: normalizedGrade });
        console.log(`✏️  UPDATE: [${exam.id}] "${exam.title}" → subject: "${exam.subject}" → "${normalizedSubject}", grade: "${exam.grade}" → "${normalizedGrade}"`);
      }
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`  - Records to update: ${toUpdate.length}`);
  console.log(`  - Duplicate records to delete: ${toDelete.length}`);

  // Perform updates
  if (toUpdate.length > 0) {
    console.log('\n⏳ Applying updates...');
    for (const u of toUpdate) {
      const { error: updateErr } = await supabase
        .from('exams')
        .update({ subject: u.subject, grade: u.grade })
        .eq('id', u.id);
      if (updateErr) {
        console.error(`  ❌ Failed to update ${u.id}:`, updateErr.message);
      } else {
        console.log(`  ✅ Updated ${u.id}`);
      }
    }
  }

  // Delete duplicates (cascade deletes sections + questions if FK is set)
  if (toDelete.length > 0) {
    console.log('\n⏳ Deleting duplicate records...');
    for (const id of toDelete) {
      // First delete associated questions and sections
      await supabase.from('questions').delete().eq('exam_id', id);
      await supabase.from('sections').delete().eq('exam_id', id);
      const { error: delErr } = await supabase.from('exams').delete().eq('id', id);
      if (delErr) {
        console.error(`  ❌ Failed to delete ${id}:`, delErr.message);
      } else {
        console.log(`  ✅ Deleted duplicate exam ${id}`);
      }
    }
  }

  // Final count
  const { data: finalExams } = await supabase
    .from('exams')
    .select('subject, year, grade')
    .order('subject');

  const summary = finalExams.reduce((acc, e) => {
    const key = `${e.grade} | ${e.subject}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  console.log('\n✅ CLEANUP COMPLETE. Final exam inventory:');
  Object.entries(summary).sort().forEach(([k, v]) => {
    console.log(`  ${k}: ${v} paper(s)`);
  });
}

cleanup().catch(console.error);
