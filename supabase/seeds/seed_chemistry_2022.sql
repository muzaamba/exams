-- Chemistry National Exam 2022 (Consolidated) Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_a_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Chemistry National Exam 2022', 'chemistry', 'form4', 2022, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_a_id, v_exam_id, 'Section A: Multiple Choice Questions', 40, 1);

    -- 3. Insert Questions (Section A - MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_a_id, 'The chemical elements that make up carbohydrates are:', 'mcq', 'Carbon, hydrogen, nitrogen', 'Hydrogen, oxygen, phosphor', 'Sulphur, carbon, hydrogen', 'Carbon, hydrogen, oxygen', 'D', 1),
    (v_exam_id, v_sec_a_id, 'Select the functional group of carboxylic acid:', 'mcq', 'R-O-R', 'R-COOR', 'R-COOH', 'R-COR', 'C', 2),
    (v_exam_id, v_sec_a_id, 'An example of an alcohol is:', 'mcq', 'CH3-CH2-CH2-OH', 'CH3-CH=CH-CH3', 'CH3-CH2-O-CH2-CH3', 'CH3-CHO', 'A', 3),
    (v_exam_id, v_sec_a_id, 'Identify the IUPAC name of HO-CH2-CH(OH)-CH2-OH:', 'mcq', '1,2,3-propanetriol', '1,3-propanediol', '1,2,3,4-propanetetriol', '1,2,3-butanetriol', 'A', 4),
    (v_exam_id, v_sec_a_id, 'Express the equilibrium constant for P4 + 6Cl2 ⇌ 4PCl3:', 'mcq', '1/[Cl2]^6', '[PCl3]^4/[Cl2]^6', '[Cl2]^4', '[Cl2]^6', 'B', 5),
    (v_exam_id, v_sec_a_id, 'Identify the correct name for CH3-CH2-CH2-CH2-CH2-CH2-CH2-CH2-OH:', 'mcq', 'Octanal', 'Octanol', 'Octanone', 'Octane', 'B', 6),
    (v_exam_id, v_sec_a_id, 'Sucrose sugar consists of:', 'mcq', 'Glucose and Galactose', 'Glucose and Lactose', 'Glucose and Glycogen', 'Glucose and Fructose', 'D', 7),
    (v_exam_id, v_sec_a_id, 'Adenine always pairs with (in DNA):', 'mcq', 'Guanine', 'Thymine', 'Cytosine', 'Uracil', 'B', 8),
    (v_exam_id, v_sec_a_id, 'Correct name of a structure containing OH, Br, and Cl on a heptane chain:', 'mcq', '1-bromo-3,6-dichloro heptanol', '3,6-dichloro heptanol', '2-bromo-3,6-trichloro-1-heptanal', '2-bromo-3,6-dichloro-1-heptanol', 'D', 9),
    (v_exam_id, v_sec_a_id, 'RNA molecule is made up of:', 'mcq', 'Single strand', 'Double strand', 'Double helix', 'Circular strand', 'A', 10),
    (v_exam_id, v_sec_a_id, 'Which of the following is a monosaccharide?', 'mcq', 'Sucrose', 'Fructose', 'Lactose', 'Glycogen', 'B', 11),
    (v_exam_id, v_sec_a_id, 'Which of the following indicates a nuclear reaction turning one element into another?', 'mcq', 'Translocation', 'Transmission', 'Transmutation', 'Translation', 'C', 12),
    (v_exam_id, v_sec_a_id, 'Increasing concentration of reactants generates more products until:', 'mcq', 'Equilibrium', 'Expansion', 'Completion', 'Closed system', 'A', 13),
    (v_exam_id, v_sec_a_id, 'A reaction in which heat energy is absorbed is:', 'mcq', 'Exothermic', 'Endothermic', 'Equilibrium', 'Dynamic', 'B', 14),
    (v_exam_id, v_sec_a_id, 'Select the organic compound:', 'mcq', 'Na2SO2', 'K2CO3', 'CaCl2', 'C3H7O', 'D', 15),
    (v_exam_id, v_sec_a_id, 'General formula of an alkane:', 'mcq', 'CnH2n+2', 'CnHn+3', 'CnH2n-1', 'CnH2n+1', 'A', 16),
    (v_exam_id, v_sec_a_id, 'If one hydrogen atom is removed from an alkane, the group is called:', 'mcq', 'Halo group', 'Functional group', 'Alkyl group', 'Amino group', 'C', 17),
    (v_exam_id, v_sec_a_id, 'Number of possible structural isomers in pentane:', 'mcq', '2', '3', '4', '5', 'B', 18),
    (v_exam_id, v_sec_a_id, 'Structure corresponding to 2,2-dimethyl pentanal contains:', 'mcq', 'Ketone group', 'Aldehyde group on C1', 'Alcohol group', 'Ether group', 'B', 19),
    (v_exam_id, v_sec_a_id, 'Calculate reaction rate for 4Li + O2 → 2Li2O if 6g lithium is used in 3 minutes:', 'mcq', '0.4 mol/s', '0.5 mol/s', '0.0248 mol/s', '0.0048 mol/s', 'D', 20);

END $$;
