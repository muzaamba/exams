-- Chemistry National Exam 2024 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_a_id UUID := gen_random_uuid();
    v_sec_b_id UUID := gen_random_uuid();
    v_sec_c_id UUID := gen_random_uuid();
    v_sec_d_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Chemistry National Exam 2024', 'chemistry', 'form4', 2024, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_a_id, v_exam_id, 'Section A: Multiple Choice', 40, 1),
    (v_sec_b_id, v_exam_id, 'Section B: Fill in the Blanks', 10, 2),
    (v_sec_c_id, v_exam_id, 'Section C: Matching', 10, 3),
    (v_sec_d_id, v_exam_id, 'Section D: Structured Questions', 40, 4);

    -- 3. Insert Questions (Section A - MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_a_id, 'Which of the following is an example of hydrocarbons?', 'mcq', '2-ethyl-3-methylheptane', 'Ethanol', 'Acetic acid', 'Ethylamine', 'A', 1),
    (v_exam_id, v_sec_a_id, 'The sugar that is in the backbone of RNA:', 'mcq', 'Deoxyribose', 'Ribose', 'Glucose', 'Fructose', 'B', 2),
    (v_exam_id, v_sec_a_id, 'Equilibrium expression Kc for H2(g)+F2(g) ⇌ 2HF(g):', 'mcq', '[HF]/[H2][F2]', '[HF]^2 / [H2][F2]', '[H2][F2] / [HF]^2', '[HF]^2 / [H2]', 'B', 3),
    (v_exam_id, v_sec_a_id, 'All monosaccharides and disaccharides are reducing sugars EXCEPT:', 'mcq', 'Glucose', 'Lactose', 'Sucrose', 'Maltose', 'C', 4),
    (v_exam_id, v_sec_a_id, 'Group 16 (VIA) elements of the periodic table are called:', 'mcq', 'Halogens', 'Noble gases', 'Oxygen family', 'Alkali metals', 'C', 5),
    (v_exam_id, v_sec_a_id, 'IUPAC name for 3-ethyl-6,7-dimethyl-4-octanone:', 'mcq', 'Octanol', 'Octanone', '3-ethyl-6,7-dimethyl-4-octanone', 'None', 'C', 6),
    (v_exam_id, v_sec_a_id, 'Structure indicating nitrobenzene:', 'mcq', 'Benzene + OH', 'Benzene + NO2', 'Benzene + CH3', 'Benzene + Cl', 'B', 7),
    (v_exam_id, v_sec_a_id, 'Product that balances the nuclear reaction ending in Lead:', 'mcq', '208Pb', '210Pb', '206Pb', '204Pb', 'A', 8),
    (v_exam_id, v_sec_a_id, 'Primary alcohols oxidize to produce:', 'mcq', 'Ketones', 'Aldehydes', 'Ethers', 'Alkanes', 'B', 9),
    (v_exam_id, v_sec_a_id, 'Reaction of water with calcium carbide produces:', 'mcq', 'Methane', 'Ethene', 'Ethyne (Acetylene)', 'Propane', 'C', 10),
    (v_exam_id, v_sec_a_id, 'Which of the following is a primary alcohol?', 'mcq', '2-Propanol', '1-Propanol', 'Tert-butanol', 'Phenol', 'B', 11),
    (v_exam_id, v_sec_a_id, 'Polonium-218 half-life is 3.04 min. After 18.24 min, how many half-lives passed?', 'mcq', '4', '5', '6', '7', 'C', 12),
    (v_exam_id, v_sec_a_id, 'Only factor that affects the value of the equilibrium constant Kc is:', 'mcq', 'Pressure', 'Concentration', 'Temperature', 'Volume', 'C', 13),
    (v_exam_id, v_sec_a_id, 'Molecular formula of ethylbenzene:', 'mcq', 'C7H8', 'C8H10', 'C6H6', 'C8H18', 'B', 14),
    (v_exam_id, v_sec_a_id, 'Which of the following is a tri-carboxylic acid?', 'mcq', 'Acetic acid', 'Oxalic acid', 'Citric acid', 'Malic acid', 'C', 15),
    (v_exam_id, v_sec_a_id, 'If NH3 appearance rate is 0.069 M/s (N2 + 3H2 → 2NH3), disappearance rate of H2 is:', 'mcq', '0.046 M/s', '0.069 M/s', '0.1035 M/s', '0.138 M/s', 'C', 16),
    (v_exam_id, v_sec_a_id, 'Element with highest electronegativity:', 'mcq', 'Oxygen', 'Fluorine', 'Chlorine', 'Nitrogen', 'B', 17),
    (v_exam_id, v_sec_a_id, 'Two nucleotides known as purines:', 'mcq', 'Cytosine and Thymine', 'Adenine and Guanine', 'Uracil and Cytosine', 'Adenine and Thymine', 'B', 18);

    -- 4. Insert Questions (Section B - Fill in the Blanks)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_b_id, 'Unit of rate of reaction?', 'short_answer', 'Mol/L.s-1', 19),
    (v_exam_id, v_sec_b_id, 'Isotope used in radiotherapy for cancer?', 'short_answer', 'Radon (or Cobalt-60).', 20),
    (v_exam_id, v_sec_b_id, 'Unit of radiation exposure?', 'short_answer', 'Rem', 21),
    (v_exam_id, v_sec_b_id, 'Simplest organic acid?', 'short_answer', 'Formic acid', 22),
    (v_exam_id, v_sec_b_id, 'Simplest alkyne used for welding?', 'short_answer', 'Acetylene (Ethyne)', 23),
    (v_exam_id, v_sec_b_id, 'Example of globular protein?', 'short_answer', 'Myoglobin (or Hemoglobin).', 24);

    -- 5. Insert Questions (Section C - Matching)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_c_id, 'Match: Meat/Milk, Interior carbonyl, Catechol/Quinol, Natural gas, Halogens, Furan/Pyrrole.', 'short_answer', 'Meat: Proteins; Interior C=O: Ketone; Catechol: Phenol; Natural gas: Hydrocarbons; Group 17: Halogens; Furan: non-Benzenoid (heterocyclic).', 25);

    -- 6. Insert Questions (Section D - Structured)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_d_id, 'Define Chemical equilibrium and Phenol.', 'short_answer', 'Equilibrium: equal rates; Phenol: -OH on benzene.', 26),
    (v_exam_id, v_sec_d_id, 'IUPAC naming: CH3-CH2-O-CH2-CH2-CH3 and 4-bromo-3-methylpentanoic acid.', 'short_answer', 'Ethoxypropane; 4-bromo-3-methylpentanoic acid.', 27),
    (v_exam_id, v_sec_d_id, 'Classify: NaHCO3, C3H8, NaCl, C2H5OH, C6H12O6 as Organic/Inorganic.', 'short_answer', 'Inorganic: NaHCO3, NaCl; Organic: C3H8, C2H5OH, C6H12O6.', 28),
    (v_exam_id, v_sec_d_id, 'Calculate K for HCl + NaOH ⇌ NaCl + H2O (Conc: 3.2, 4.3, 6.0, 1.0).', 'short_answer', 'K = (6 * 1) / (3.2 * 4.3) = 0.436. Reactant favored.', 29),
    (v_exam_id, v_sec_d_id, 'Sulfur (Z=16) config and most abundant crust element?', 'short_answer', 'S: 2,8,6; Crust: Oxygen.', 30),
    (v_exam_id, v_sec_d_id, 'Technetium-99m half-life (6h). After 24h, remaining mass from 80mg?', 'short_answer', '5 mg (4 half-lives).', 31),
    (v_exam_id, v_sec_d_id, 'Name radioactive decays X, Y, Z.', 'short_answer', 'X: Gamma; Y: Alpha; Z: Beta.', 32);

END $$;
