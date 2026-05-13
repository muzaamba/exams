-- Biology National Exam 2022 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec1_id UUID := gen_random_uuid();
    v_sec2_id UUID := gen_random_uuid();
    v_sec3_id UUID := gen_random_uuid();
    v_sec4_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Biology National Exam 2022', 'biology', 'form4', 2022, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec1_id, v_exam_id, 'Part 1: Multiple Choice', 40, 1),
    (v_sec2_id, v_exam_id, 'Part 2: Matching', 20, 2),
    (v_sec3_id, v_exam_id, 'Part 3: Fill in the Blanks', 10, 3),
    (v_sec4_id, v_exam_id, 'Part 4: Long Answers & Genetics', 30, 4);

    -- 3. Insert Questions (Part 1 - MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec1_id, 'Nervous system consists of specialized cells known as:', 'mcq', 'Neurons', 'Skin cells', 'Muscle cells', 'Blood cells', 'a', 1),
    (v_exam_id, v_sec1_id, 'The pigment that provides protection against UV radiation is:', 'mcq', 'Keratin', 'Chlorophyll', 'Melanin', 'Hemoglobin', 'c', 2),
    (v_exam_id, v_sec1_id, 'The axial skeleton includes the:', 'mcq', 'Leg bones', 'Arm bones', 'Vertebral column', 'Hips', 'c', 3),
    (v_exam_id, v_sec1_id, 'Which sugar is found in RNA?', 'mcq', 'Glucose', 'Ribose', 'Deoxyribose', 'Fructose', 'b', 4),
    (v_exam_id, v_sec1_id, 'Phenotypic ratio of a cross between Tt and tt (Tall vs Short) is:', 'mcq', '3:1', 'All tall', '1:1 tall to short', 'All short', 'c', 5),
    (v_exam_id, v_sec1_id, 'The function of the ear includes:', 'mcq', 'Only hearing', 'Hearing and balance', 'Only balance', 'Smell', 'b', 6),
    (v_exam_id, v_sec1_id, 'A mutation where a chromosome segment is reversed is called:', 'mcq', 'Inversion', 'Deletion', 'Duplication', 'Translocation', 'a', 7),
    (v_exam_id, v_sec1_id, 'The bond between nucleotides in a DNA strand is:', 'mcq', 'Ionic bond', 'Phosphodiester bond', 'Hydrogen bond', 'Peptide bond', 'b', 8),
    (v_exam_id, v_sec1_id, 'The study of interactions between organisms and their environment is:', 'mcq', 'Genetics', 'Botany', 'Ecology', 'Zoology', 'a', 9),
    (v_exam_id, v_sec1_id, 'Damage to the cerebellum results in:', 'mcq', 'Memory loss', 'Loss of sight', 'Loss of body balance and posture', 'Loss of hearing', 'c', 10),
    (v_exam_id, v_sec1_id, 'Accumulation of lactic acid in muscles causes:', 'mcq', 'Muscle fatigue', 'Muscle growth', 'Muscle energy', 'Nothing', 'a', 11),
    (v_exam_id, v_sec1_id, 'Treating a disease by replacing a faulty gene is called:', 'mcq', 'Surgery', 'Vaccination', 'Gene therapy', 'Antibiotics', 'c', 12),
    (v_exam_id, v_sec1_id, 'Types of joints include:', 'mcq', 'Only fixed', 'Only ball and socket', 'Wrist and pivot joint', 'Only hinge', 'c', 13),
    (v_exam_id, v_sec1_id, 'Which of the following is an mRNA codon?', 'mcq', 'ATT', 'GCC', 'GCU', 'TGA', 'c', 14),
    (v_exam_id, v_sec1_id, 'A neuron with many dendrites and one axon is a:', 'mcq', 'Multipolar neuron', 'Unipolar neuron', 'Bipolar neuron', 'None', 'a', 15),
    (v_exam_id, v_sec1_id, 'Insulin and glucagon are examples of:', 'mcq', 'Steroid hormones', 'Lipophilic hormones', 'Antagonistic hormones', 'Sex hormones', 'c', 16),
    (v_exam_id, v_sec1_id, 'The monomer of DNA is a:', 'mcq', 'Amino acid', 'Nucleotide', 'Monosaccharide', 'Fatty acid', 'b', 17),
    (v_exam_id, v_sec1_id, 'Toxic substances becoming more concentrated in higher trophic levels is:', 'mcq', 'Biological magnification', 'Eutrophication', 'Global warming', 'Acid rain', 'a', 18),
    (v_exam_id, v_sec1_id, 'An enzyme that cuts DNA at specific sequences is:', 'mcq', 'DNA ligase', 'DNA polymerase', 'Restriction enzyme', 'Helicase', 'd', 19),
    (v_exam_id, v_sec1_id, 'Mating of closely related individuals is called:', 'mcq', 'Inbreeding', 'Outbreeding', 'Crossbreeding', 'Hybridization', 'a', 20);

    -- 4. Insert Questions (Part 2 - Matching)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec2_id, 'Match: Fertilization, Mutation, Eutrophication, Foramen magnum, Transcription, Non-disjunction, Insulin, Hypothalamus, Myofibrils, Genome.', 'short_answer', 'Fertilization: Gamete union; Mutation: Genetic error; Eutrophication: Nutrient excess; Foramen: Skull opening; Transcription: DNA to RNA; Non-disjunction: Chromosome fail to separate; Insulin: Lowers glucose; Hypothalamus: Pituitary control; Myofibrils: Muscle fibers; Genome: Genetic set.', 21);

    -- 5. Insert Questions (Part 3 - Fill in the Blanks)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec3_id, 'The largest part of the brain is ____.', 'short_answer', 'Cerebrum', 22),
    (v_exam_id, v_sec3_id, 'Growth hormone deficiency leads to ____.', 'short_answer', 'Dwarfism', 23),
    (v_exam_id, v_sec3_id, 'The sugar in DNA is ____.', 'short_answer', 'Deoxyribose', 24),
    (v_exam_id, v_sec3_id, 'The outer layer of the skin is ____.', 'short_answer', 'Epidermis', 25),
    (v_exam_id, v_sec3_id, 'An organism that eats others is a ____.', 'short_answer', 'Consumer', 26),
    (v_exam_id, v_sec3_id, 'Retinal cells for dim light are ____.', 'short_answer', 'Rods', 27),
    (v_exam_id, v_sec3_id, 'The thick filament in muscle is ____.', 'short_answer', 'Myosin', 28),
    (v_exam_id, v_sec3_id, 'Amino acids are joined by ____.', 'short_answer', 'Peptide bond', 29),
    (v_exam_id, v_sec3_id, 'The study of the full set of proteins is ____.', 'short_answer', 'Proteomics', 30),
    (v_exam_id, v_sec3_id, 'Shoulder bones belong to the ____.', 'short_answer', 'Pectoral girdle', 31);

    -- 6. Insert Questions (Part 4 - Long Answers)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec4_id, 'Define Genetic Engineering and Biodiversity.', 'short_answer', 'Genetic Engineering: Gene modification; Biodiversity: Variety of life.', 32),
    (v_exam_id, v_sec4_id, 'Describe the divisions of the Nervous System.', 'essay', 'CNS (Brain/Spinal cord) and PNS (Sensory/Motor). Motor includes Somatic and Autonomic.', 33),
    (v_exam_id, v_sec4_id, 'What is a compound (open) fracture?', 'short_answer', 'A fracture where the bone breaks through the skin.', 34),
    (v_exam_id, v_sec4_id, 'List uses of DNA fingerprinting.', 'short_answer', 'Crime, Paternity, ID of bodies, Disease diagnosis.', 35),
    (v_exam_id, v_sec4_id, 'Result of TT x tt cross?', 'short_answer', '100% Tt (Tall).', 36),
    (v_exam_id, v_sec4_id, 'Name parts of a nucleotide.', 'short_answer', 'Phosphate, Sugar, Nitrogenous base.', 37),
    (v_exam_id, v_sec4_id, 'Importance of DNA replication?', 'essay', 'Continuity, Cell division, Growth/Repair.', 38),
    (v_exam_id, v_sec4_id, 'Functions of skin?', 'short_answer', 'Protection, Temp regulation, Excretion, Water retention.', 39),
    (v_exam_id, v_sec4_id, 'Species vs Genetic Diversity?', 'short_answer', 'Species: Number of species; Genetic: Variation within species.', 40);

END $$;
