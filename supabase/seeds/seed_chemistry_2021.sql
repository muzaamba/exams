-- Chemistry National Exam 2021 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_a_id UUID := gen_random_uuid();
    v_sec_b_id UUID := gen_random_uuid();
    v_sec_c_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Chemistry National Exam 2021', 'chemistry', 'form4', 2021, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_a_id, v_exam_id, 'Section A: Multiple Choice', 40, 1),
    (v_sec_b_id, v_exam_id, 'Section B: Completion', 20, 2),
    (v_sec_c_id, v_exam_id, 'Section C: Structured & Calculations', 40, 3);

    -- 3. Insert Questions (Section A - MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_a_id, 'Hydrocarbons are compounds that contain:', 'mcq', 'Carbon only', 'Hydrogen only', 'Oxygen', 'Carbon and hydrogen', 'D', 1),
    (v_exam_id, v_sec_a_id, 'The simplest member of alkenes is known as:', 'mcq', 'Butane', 'Ethane', 'Ethene', 'Propene', 'C', 2),
    (v_exam_id, v_sec_a_id, 'Which of the following groups has the most reactive non-metals?', 'mcq', 'Alkali metals', 'Alkaline metals', 'Halogens', 'Noble gases', 'C', 3),
    (v_exam_id, v_sec_a_id, 'The general formula of alkanes is:', 'mcq', 'CnH2n+2', 'CnH2n', 'CnH2n+1', 'CnH2n-1', 'A', 4),
    (v_exam_id, v_sec_a_id, 'Phosphorous-32 half-life is 14.3 days. From 8.0 mg, how much remains after 42.9 days?', 'mcq', '4 mg', '6 mg', '2.5 mg', '1 mg', 'D', 5),
    (v_exam_id, v_sec_a_id, 'The simplest form of cycloalkanes is:', 'mcq', 'Cyclobutane', 'Cyclopentane', 'Cyclopropane', 'Cyclohexane', 'C', 6),
    (v_exam_id, v_sec_a_id, 'According to the general formula of alkenes, the molecular formula of butene is:', 'mcq', 'C4H10', 'C4H8', 'C4H12', 'C4H6', 'B', 7),
    (v_exam_id, v_sec_a_id, 'The hydrophilic part of alcohol is called:', 'mcq', 'Alkyl part', 'Hydroxyl part', 'Hydrogen part', 'Carbon part', 'B', 8),
    (v_exam_id, v_sec_a_id, 'The structural formula of ketones is:', 'mcq', 'R-CO-R', 'R-CHO', 'R-O-R', 'R-OH', 'A', 9),
    (v_exam_id, v_sec_a_id, 'If protons and neutrons are 11 and 12, the correct symbol is:', 'mcq', '23/11X', '11/23X', '12/11X', '23/12X', 'A', 10),
    (v_exam_id, v_sec_a_id, '______ is the energy needed to start the reaction.', 'mcq', 'Reactants', 'Products', 'Catalyst', 'Activation energy', 'D', 11),
    (v_exam_id, v_sec_a_id, 'Identify the structure of 2-methyl pentane:', 'mcq', 'CH3-CH2-CH2-CH(CH3)-CH3', 'CH3-CH(CH3)-CH3', 'CH3-CH2-CH2-CH2-CH3', 'CH3-C(CH3)-CH3', 'A', 12),
    (v_exam_id, v_sec_a_id, 'Which of the following structures is saturated?', 'mcq', 'CH2=CH3', 'CH2=CH-CH3', 'CH3-CH3', 'CH3-CH2-C≡CH', 'C', 13),
    (v_exam_id, v_sec_a_id, 'The functional group that contains both aldehyde and ketone is known as:', 'mcq', 'Aldehyde group', 'Ketone group', 'Carbonyl group', 'Amino group', 'C', 14),
    (v_exam_id, v_sec_a_id, 'When one large nucleus splits into two smaller nuclei, this is known as:', 'mcq', 'Fusion', 'Fission', 'Ionizing radiation', 'Alpha decay', 'B', 15),
    (v_exam_id, v_sec_a_id, 'Example of monosaccharide that contains five carbon atoms (pentose):', 'mcq', 'Erythrose', 'Ribose', 'Galactose', 'Cellulose', 'B', 16),
    (v_exam_id, v_sec_a_id, 'Which of the following is homogeneous chemical equilibrium?', 'mcq', 'CO2(g)+C(s)⇌2CO(g)', 'CaCO3(s)⇌CaO(s)+CO2(g)', 'P4(g)+6Cl2(g)⇌4PCl3(g)', 'N2(g)+O2(g)⇌2NO(g)', 'D', 17),
    (v_exam_id, v_sec_a_id, 'Le Chatelier''s principle states equilibrium shifts to ______ the change.', 'mcq', 'Oxidize', 'Increase', 'Induce', 'Reduce', 'D', 18);

    -- 4. Insert Questions (Section B - Completion)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_b_id, 'General structure of organic acid?', 'short_answer', 'R-COOH', 19),
    (v_exam_id, v_sec_b_id, 'Alcohol with two hydroxyl groups?', 'short_answer', 'Dihydroxy alcohol (Glycol).', 20),
    (v_exam_id, v_sec_b_id, 'Bond joining amino acids in proteins?', 'short_answer', 'Peptide bond', 21),
    (v_exam_id, v_sec_b_id, 'General formula of alkyne?', 'short_answer', 'CnH2n-2', 22),
    (v_exam_id, v_sec_b_id, 'State in which forward and reverse reaction rates are equal?', 'short_answer', 'Chemical equilibrium', 23),
    (v_exam_id, v_sec_b_id, 'Radioactive decay carrying positive charge?', 'short_answer', 'Alpha particles', 24),
    (v_exam_id, v_sec_b_id, 'Compounds with same formula but different structure?', 'short_answer', 'Isomers', 25);

    -- 5. Insert Questions (Section C - Structured)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_c_id, 'What does IUPAC stand for?', 'short_answer', 'International Union of Pure and Applied Chemistry.', 26),
    (v_exam_id, v_sec_c_id, 'Give IUPAC name for CH3-CH(CH3)-CH2-CH3 and CH3-CH=CH-CH(Br)-CH(CH3)-CH3.', 'short_answer', '2-methylbutane; 4-bromo-5-methylhex-2-ene.', 27),
    (v_exam_id, v_sec_c_id, 'State three uses of phenols.', 'short_answer', 'Disinfectants, plastics manufacture, medicines/dyes.', 28),
    (v_exam_id, v_sec_c_id, 'Calculate Kc for PCl5(g) ⇌ PCl3(g) + Cl2(g) (Conc: 0.0096, 0.0247, 0.0247).', 'short_answer', 'Kc = (0.0247 * 0.0247) / 0.0096 = 0.064', 29),
    (v_exam_id, v_sec_c_id, 'Half-life of polonium-210 is 138.4 days. From 2.0 mg, how much remains after 415.2 days?', 'short_answer', '0.25 mg (3 half-lives).', 30),
    (v_exam_id, v_sec_c_id, 'Distinguish between ionizing and non-ionizing radiation.', 'short_answer', 'Ionizing has enough energy to remove electrons; non-ionizing does not.', 31),
    (v_exam_id, v_sec_c_id, 'Electron configuration of Fluorine (Z=9) and Chlorine (Z=17).', 'short_answer', 'F: 2,7; Cl: 2,8,7.', 32);

END $$;
