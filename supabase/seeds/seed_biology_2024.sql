-- Biology National Exam 2024 Seeding Script
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
    VALUES (v_exam_id, 'Biology National Exam 2024', 'biology', 'form4', 2024, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_a_id, v_exam_id, 'Section A: Multiple Choice', 40, 1),
    (v_sec_b_id, v_exam_id, 'Section B: Structured Questions', 30, 2),
    (v_sec_c_id, v_exam_id, 'Section C: Completion', 10, 3),
    (v_sec_d_id, v_exam_id, 'Section D: Matching', 20, 4);

    -- 3. Insert Questions (Section A - MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_a_id, 'Which part of the brain controls the pituitary gland?', 'mcq', 'Cerebrum', 'Cerebellum', 'Hypothalamus', 'Medulla', 'c', 1),
    (v_exam_id, v_sec_a_id, 'Identify the incorrect pair (Hormone : Gland):', 'mcq', 'Thyroxine : Thyroid', 'Insulin : Pancreas', 'Adrenaline : Pituitary gland', 'Estrogen : Ovary', 'c', 2),
    (v_exam_id, v_sec_a_id, 'The variety of life on earth is called:', 'mcq', 'Ecology', 'Genetics', 'Biodiversity', 'Evolution', 'c', 3),
    (v_exam_id, v_sec_a_id, 'What is a primary use of DNA fingerprinting?', 'mcq', 'To identify criminals', 'To cure cancer', 'To make vaccines', 'To study fossils', 'a', 4),
    (v_exam_id, v_sec_a_id, 'What is the function of the growth hormone?', 'mcq', 'Regulates sugar', 'Regulates growth and development', 'Regulates calcium', 'Regulates sleep', 'b', 5),
    (v_exam_id, v_sec_a_id, 'Correct path of a nerve impulse in a neuron:', 'mcq', 'Axon -> Dendrite', 'Dendrite -> Cell body -> Axon', 'Cell body -> Dendrite', 'Axon -> Cell body', 'b', 6),
    (v_exam_id, v_sec_a_id, 'An organism''s complete set of genetic material is its:', 'mcq', 'Gene', 'Genome', 'Allele', 'Chromatid', 'b', 7),
    (v_exam_id, v_sec_a_id, 'A cross between IAi and IBi can produce which blood groups?', 'mcq', 'Only A and B', 'A, B, AB, and O', 'Only AB', 'Only O', 'b', 8),
    (v_exam_id, v_sec_a_id, 'Difference between exoskeleton and endoskeleton:', 'mcq', 'Exo is internal', 'Exo is external, Endo is internal', 'No difference', 'Both are external', 'b', 9),
    (v_exam_id, v_sec_a_id, 'The fluid that lubricates joints is:', 'mcq', 'Plasma', 'Lymph', 'Synovial fluid', 'Blood', 'c', 10),
    (v_exam_id, v_sec_a_id, 'Neurons that carry impulses to effectors are:', 'mcq', 'Sensory', 'Relay', 'Motor neurons', 'Bipolar', 'c', 11),
    (v_exam_id, v_sec_a_id, 'Modification of genes using biotechnology is:', 'mcq', 'Cloning', 'Genetic engineering', 'Mutation', 'Evolution', 'b', 12),
    (v_exam_id, v_sec_a_id, 'Hormones secreted by the adrenal medulla:', 'mcq', 'Insulin', 'Thyroxine', 'Epinephrine and norepinephrine', 'Estrogen', 'c', 13),
    (v_exam_id, v_sec_a_id, 'Glands that secrete hormones into the bloodstream are:', 'mcq', 'Exocrine', 'Endocrine', 'Salivary', 'Sweat', 'b', 14),
    (v_exam_id, v_sec_a_id, 'The main component of bone tissue is:', 'mcq', 'Calcium phosphate', 'Sodium chloride', 'Potassium', 'Iron', 'a', 15),
    (v_exam_id, v_sec_a_id, 'Probability of a colour blind son from a carrier mother and normal father?', 'mcq', '25%', '50%', '75%', '100%', 'b', 16),
    (v_exam_id, v_sec_a_id, 'Failure of chromosomes to separate during meiosis is:', 'mcq', 'Mutation', 'Non-disjunction', 'Crossing over', 'Inversion', 'b', 17),
    (v_exam_id, v_sec_a_id, 'Hormone that triggers uterine contractions during birth:', 'mcq', 'Estrogen', 'Progesterone', 'Oxytocin', 'Insulin', 'c', 18),
    (v_exam_id, v_sec_a_id, 'Part of the nucleotide that contains phosphorus:', 'mcq', 'Sugar', 'Nitrogenous base', 'Phosphate group', 'Protein', 'c', 19),
    (v_exam_id, v_sec_a_id, 'Which is NOT a function of the skin?', 'mcq', 'Temp regulation', 'Protection', 'Detoxification of the body', 'Excretion', 'c', 20);

    -- 4. Insert Questions (Section B - Structured)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_b_id, 'List two other RNA types and their functions.', 'short_answer', 'mRNA: carries info; tRNA: transfers amino acids.', 21),
    (v_exam_id, v_sec_b_id, 'Which blood groups can donate to AB?', 'short_answer', 'A, B, AB, and O (Universal recipient).', 22),
    (v_exam_id, v_sec_b_id, 'Define Autonomic Nervous System and state main parts of CNS.', 'short_answer', 'ANS: involuntary actions; CNS: Brain and Spinal cord.', 23),
    (v_exam_id, v_sec_b_id, 'Differences between DNA and RNA?', 'short_answer', 'Sugar (Deoxyribose vs Ribose), Strands (Double vs Single), Bases (Thymine vs Uracil).', 24),
    (v_exam_id, v_sec_b_id, 'Disease caused by lack of insulin?', 'short_answer', 'Diabetes mellitus', 25),
    (v_exam_id, v_sec_b_id, 'Identify Cerebellum and Medulla and state function of Cerebrum.', 'short_answer', 'Cerebrum: Thinking, memory, voluntary actions.', 26),
    (v_exam_id, v_sec_b_id, 'Benefit of genetic engineering for diabetics?', 'short_answer', 'Cheap production of human insulin.', 27),
    (v_exam_id, v_sec_b_id, 'Types of skin glands and functions?', 'short_answer', 'Sweat glands (cooling) and Sebaceous glands (lubrication).', 28);

    -- 5. Insert Questions (Section C - Completion)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_c_id, 'Completion: Gene therapy, Dermis, Cerebrum, 206 bones, Splicing, Ecosystem diversity, Heredity.', 'short_answer', 'Correct terms: gene therapy, dermis, cerebrum, 206, splicing, ecosystem diversity, heredity.', 29);

    -- 6. Insert Questions (Section D - Matching)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_d_id, 'Match: PNS, Parasympathetic, Dermis, Genetics, Master gland (Pituitary), Biosphere, Hybridization, Adrenal, Extinction, Cloning.', 'short_answer', 'PNS: to/from CNS; Parasympathetic: resting; Dermis: inner skin; Genetics: study of heredity; Master gland: pituitary; Biosphere: all materials; Adrenal: top of kidney; Extinction: loss of organism; Cloning: exact copy.', 30);

END $$;
