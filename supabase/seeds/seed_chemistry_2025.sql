-- Chemistry National Exam 2025 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_a_id UUID := gen_random_uuid();
    v_sec_b_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Chemistry National Exam 2025', 'chemistry', 'form4', 2025, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_a_id, v_exam_id, 'Section A: Multiple Choice Questions', 40, 1),
    (v_sec_b_id, v_exam_id, 'Section B: Structured & Calculations', 60, 2);

    -- 3. Insert Questions (Section A - MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_a_id, 'Which branch of science relates to all branches of science?', 'mcq', 'Biology', 'Physics', 'Chemistry', 'Astronomy', 'C', 1),
    (v_exam_id, v_sec_a_id, 'Which one of the following compounds has the maximum number of hydrogen atoms?', 'mcq', 'Methane', 'Ethane', 'Propane', 'Butane', 'D', 2),
    (v_exam_id, v_sec_a_id, 'Which part of the atmosphere contains the ozone layer?', 'mcq', 'Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere', 'B', 3),
    (v_exam_id, v_sec_a_id, 'The molar mass of CaCO3 (At. weights: Ca=40, C=12, O=16) is:', 'mcq', '50 g/mol', '75 g/mol', '100 g/mol', '150 g/mol', 'C', 4),
    (v_exam_id, v_sec_a_id, 'IUPAC name for product of CH3-CH2-CH2-O-K+ + CH3-CH2-Br:', 'mcq', 'Propoxyethane', 'Ethoxypropane', 'Butoxyethane', 'Pentoxyethane', 'B', 5),
    (v_exam_id, v_sec_a_id, 'If pH = 3.5, what is [H3O+]?', 'mcq', '1.0 x 10^-3 M', '3.2 x 10^-4 M', '5.0 x 10^-4 M', '1.0 x 10^-4 M', 'B', 6),
    (v_exam_id, v_sec_a_id, 'The horizontal rows of the periodic table are called:', 'mcq', 'Group', 'Family', 'Column', 'Period', 'D', 7),
    (v_exam_id, v_sec_a_id, 'If adenine is 30% in a DNA sample, how much guanine is present?', 'mcq', '10%', '20%', '30%', '40%', 'B', 8),
    (v_exam_id, v_sec_a_id, 'Quantity of electricity required to deposit one mole of Magnesium ions (Mg2+):', 'mcq', '1F', '2F', '3F', '4F', 'B', 9),
    (v_exam_id, v_sec_a_id, 'Which condition shifts equilibrium of an endothermic reaction to the LEFT?', 'mcq', 'Increase temp', 'Decrease temp', 'Increase pressure', 'Add catalyst', 'B', 10),
    (v_exam_id, v_sec_a_id, 'Which alcohol has the highest boiling point among these?', 'mcq', 'Methanol', 'Ethanol', 'Propanol', 'Pentanol', 'D', 11),
    (v_exam_id, v_sec_a_id, 'Chemical symbol of Tungsten:', 'mcq', 'T', 'Tu', 'W', 'Tg', 'C', 12),
    (v_exam_id, v_sec_a_id, 'Oxidation number of sulfur in H2SO4:', 'mcq', '+2', '+4', '+6', '+8', 'C', 13),
    (v_exam_id, v_sec_a_id, 'Reaction between carboxylic acid and alcohol is called:', 'mcq', 'Saponification', 'Hydration', 'Esterification', 'Neutralization', 'C', 14),
    (v_exam_id, v_sec_a_id, 'Valence electron configuration of group 15 elements:', 'mcq', 'ns2 np1', 'ns2 np3', 'ns2 np5', 'ns2 np6', 'B', 15),
    (v_exam_id, v_sec_a_id, 'Number of possible structural isomers for octane (C8H18):', 'mcq', '9', '18', '35', '75', 'B', 16),
    (v_exam_id, v_sec_a_id, 'Intermediate species in a reaction mechanism (example: N2O2):', 'mcq', 'Reactant', 'Product', 'Catalyst', 'Intermediate', 'D', 17),
    (v_exam_id, v_sec_a_id, 'Which element belongs to group 13?', 'mcq', 'Carbon', 'Silicon', 'Aluminium', 'Nitrogen', 'C', 18);

    -- 4. Insert Questions (Section B - Structured)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_b_id, 'General formulas: Alkane and Benzene series.', 'short_answer', 'Alkane: CnH2n+2; Benzene: CnH2n-6.', 19),
    (v_exam_id, v_sec_b_id, 'Determine Rate Law and Constant k (Data: Rate=k[A]^2[B]).', 'short_answer', 'Rate = k[A]^2[B]; k = 50 M^-2s^-1.', 20),
    (v_exam_id, v_sec_b_id, 'Classify: Silicon, Mercury, Carbon, Gold as Metal/Non-metal/Metalloid.', 'short_answer', 'Silicon: Metalloid; Mercury/Gold: Metals; Carbon: Non-metal.', 21),
    (v_exam_id, v_sec_b_id, 'Calculate pH when [OH-] = 1.5 x 10^-5 and [H3O+] = 2.3 x 10^-2.', 'short_answer', 'pOH=4.82 -> pH=9.18; pH = -log(2.3e-2) = 1.64.', 22),
    (v_exam_id, v_sec_b_id, 'Name parts of galvanic cell Q (Salt bridge) and S (Electrode).', 'short_answer', 'Q: Salt bridge; S: Electrode.', 23),
    (v_exam_id, v_sec_b_id, 'Why do aldehydes/ketones have lower boiling points than alcohols?', 'short_answer', 'Absence of intermolecular hydrogen bonding.', 24),
    (v_exam_id, v_sec_b_id, 'Half-life problem: 2.0 mg of Polonium-210 (138.4d). After 692d?', 'short_answer', '0.25 mg (5 half-lives).', 25);

END $$;
