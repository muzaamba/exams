-- Chemistry National Exam 2020 Seeding Script
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
    VALUES (v_exam_id, 'Chemistry National Exam 2020', 'chemistry', 'form4', 2020, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_a_id, v_exam_id, 'Section A: Multiple Choice', 20, 1),
    (v_sec_b_id, v_exam_id, 'Section B: Fill in the Blanks', 10, 2),
    (v_sec_c_id, v_exam_id, 'Section C: Structured Questions', 70, 3);

    -- 3. Insert Questions (Section A - MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_a_id, 'Which of the following organic compounds is unsaturated?', 'mcq', 'Ethylcyclobutane', '3-ethyl-2-methyl-1-pentene', '2-bromobutane', '2-methyl-1-chlorohexane', 'B', 1),
    (v_exam_id, v_sec_a_id, 'Alkanes have a general formula of:', 'mcq', 'CnH2n-1', 'CnH2n+1', 'CnH2n+2', 'CnH2n', 'C', 2),
    (v_exam_id, v_sec_a_id, 'The oxidation number of Chromium (Cr) in potassium dichromate (K2Cr2O7) is:', 'mcq', '+2', '+6', '+3', '+5', 'B', 3),
    (v_exam_id, v_sec_a_id, 'The chemical reaction in which heat is released is:', 'mcq', 'Exothermic', 'Endothermic', 'Isomeric', 'Precipitation', 'A', 4),
    (v_exam_id, v_sec_a_id, 'To which family of organic compound does CH3COCH2CH3 belong?', 'mcq', 'Alcohol', 'Aldehyde', 'Ketone', 'Carboxylic Acid', 'C', 5),
    (v_exam_id, v_sec_a_id, 'The general formula of aldehydes is:', 'mcq', 'R-CHO', 'R-OH', 'R-COOH', 'R-COOR', 'A', 6),
    (v_exam_id, v_sec_a_id, 'Which of the following is an allotrope of Carbon?', 'mcq', 'Diamond', 'Sulphur', 'Nitrogen', 'Aluminium', 'A', 7),
    (v_exam_id, v_sec_a_id, 'Identify the structure of methylbutanoate:', 'mcq', 'CH3COOC2H5', 'C3H7COOCH3', 'HCOOC3H7', 'CH3COOC4H9', 'B', 8),
    (v_exam_id, v_sec_a_id, 'Which of the following is the first synthetic organic molecule?', 'mcq', 'NH4CNO', 'C4H10', 'NH4Cl', '(NH2)2CO', 'D', 9),
    (v_exam_id, v_sec_a_id, 'What do we call compounds with the same molecular formula but different structures?', 'mcq', 'Isotopes', 'Allotropes', 'Isomers', 'Homologous series', 'C', 10);

    -- 4. Insert Questions (Section B - Fill in the Blanks)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_b_id, 'General formula of alkenes?', 'short_answer', 'CnH2n', 11),
    (v_exam_id, v_sec_b_id, 'Organic acids are also known as?', 'short_answer', 'Carboxylic acids', 12),
    (v_exam_id, v_sec_b_id, 'Functional group of alcohol?', 'short_answer', 'Hydroxyl group (-OH)', 13),
    (v_exam_id, v_sec_b_id, 'Combustion products of organic compounds?', 'short_answer', 'Carbon dioxide, water, and energy.', 14),
    (v_exam_id, v_sec_b_id, 'Compounds containing ONLY Carbon and Hydrogen?', 'short_answer', 'Hydrocarbons', 15);

    -- 5. Insert Questions (Section C - Structured)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_c_id, 'Define allotropes and state three allotropes of carbon.', 'short_answer', 'Allotropes: same element, different forms. Carbon: Diamond, Graphite, Fullerene.', 16),
    (v_exam_id, v_sec_c_id, 'Balanced equation for hydrogenation of ethene to ethane?', 'short_answer', 'C2H4 + H2 → C2H6', 17),
    (v_exam_id, v_sec_c_id, 'Differentiate between secondary and tertiary alcohol.', 'short_answer', 'Secondary: -OH on carbon with 2 Cs; Tertiary: -OH on carbon with 3 Cs.', 18),
    (v_exam_id, v_sec_c_id, 'Differentiate between aldehyde and ketone.', 'short_answer', 'Aldehyde: terminal -CHO; Ketone: carbonyl C=O within chain.', 19),
    (v_exam_id, v_sec_c_id, 'Calculate equilibrium constant K for CO(g) + H2O(g) ⇌ H2(g) + CO2(g) (Conc: 0.2, 0.5, 0.32, 0.42).', 'short_answer', 'K = (0.32 * 0.42) / (0.2 * 0.5) = 1.344', 20),
    (v_exam_id, v_sec_c_id, 'What are aromatic compounds?', 'short_answer', 'Organic compounds containing benzene rings.', 21),
    (v_exam_id, v_sec_c_id, 'Molecular formulas for Pentane, Pentene, Pentyne.', 'short_answer', 'Pentane: C5H12; Pentene: C5H10; Pentyne: C5H8.', 22),
    (v_exam_id, v_sec_c_id, 'Name CH3-CH2-CH3 and CH3-CH2-CH2-CH=CH2.', 'short_answer', 'Propane; 1-Pentene.', 23),
    (v_exam_id, v_sec_c_id, 'Explain why enzymes are catalysts.', 'short_answer', 'Speed up reactions without being consumed.', 24),
    (v_exam_id, v_sec_c_id, 'Equation for hydrogenation of propene to propane?', 'short_answer', 'C3H6 + H2 → C3H8', 25),
    (v_exam_id, v_sec_c_id, 'Classify: Hexane, Pentene, Butene as Saturated/Unsaturated.', 'short_answer', 'Hexane: Saturated; Pentene/Butene: Unsaturated.', 26),
    (v_exam_id, v_sec_c_id, 'Identify oxidizing/reducing agents in 4Al + 3O2 → 2Al2O3.', 'short_answer', 'OA: Oxygen (O2); RA: Aluminium (Al).', 27),
    (v_exam_id, v_sec_c_id, 'Distinguish Exothermic/Endothermic with examples (Ice melting, Paper burning).', 'short_answer', 'Exo (Paper): heat released; Endo (Ice): heat absorbed.', 28),
    (v_exam_id, v_sec_c_id, 'Boyle''s Law: relationship between Volume and Pressure?', 'short_answer', 'Inversely proportional at constant temperature.', 29),
    (v_exam_id, v_sec_c_id, 'Define: Hybridization, Isomer, Molecular weight.', 'short_answer', 'Hybridization: orbital mixing; Isomer: same formula/diff structure; MW: sum of atomic masses.', 30);

END $$;
