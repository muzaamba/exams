-- Biology National Exam 2025 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec_a_id UUID := gen_random_uuid();
    v_sec_b_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Biology National Exam 2025', 'biology', 'form4', 2025, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_a_id, v_exam_id, 'Section A: Multiple Choice Questions', 40, 1),
    (v_sec_b_id, v_exam_id, 'Section B: Structural Questions', 60, 2);

    -- 3. Insert Questions (Section A - MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_a_id, 'The peripheral nervous system consists of:', 'mcq', 'Brain and spinal cord', 'Cranial and spinal nerves', 'Spinal cord and spinal nerves', 'Cranial nerves and nerves', 'B', 1),
    (v_exam_id, v_sec_a_id, 'The point at which the nerve impulse passes from the pre-synaptic neuron to the post-synaptic neuron is:', 'mcq', 'Synaptic knob', 'Synaptic vesicles', 'Synaptic cleft', 'Synaptic terminal', 'C', 2),
    (v_exam_id, v_sec_a_id, 'When you sleep in your room, which part of nervous system works?', 'mcq', 'Parasympathetic', 'Sympathetic', 'Somatic', 'Autonomic', 'A', 3),
    (v_exam_id, v_sec_a_id, 'If a person holding a very hot object does not feel burning pain, which neurons are probably damaged?', 'mcq', 'Connectors', 'Sensory', 'Motor', 'Neuron', 'B', 4),
    (v_exam_id, v_sec_a_id, 'Which hormone regulates blood sugar level?', 'mcq', 'Insulin', 'Thyroxin', 'Calcitonin', 'Melatonin', 'A', 5),
    (v_exam_id, v_sec_a_id, 'The gland enlarged in goiter due to iodine deficiency is:', 'mcq', 'Adrenal', 'Parathyroid', 'Pineal', 'Thyroid', 'D', 6),
    (v_exam_id, v_sec_a_id, 'The number of true ribs (attached to sternum) in human body are:', 'mcq', '12 ribs', '14 ribs', '16 ribs', '18 ribs', 'B', 7),
    (v_exam_id, v_sec_a_id, 'A hypodermic needle first passes through which skin structure?', 'mcq', 'Epidermis', 'Dermis', 'Reticular layer', 'Papillary layer', 'A', 8),
    (v_exam_id, v_sec_a_id, 'What is the total number of bones in the lower limbs (both legs)?', 'mcq', '30', '60', '40', '80', 'B', 9),
    (v_exam_id, v_sec_a_id, 'The process by which genetic instructions are rewritten into RNA is called:', 'mcq', 'Translation', 'Termination', 'Transcription', 'Translocation', 'C', 10),
    (v_exam_id, v_sec_a_id, 'Identify a disease caused by recessive gene mutation on X chromosome:', 'mcq', 'Phenylketonuria', 'Krabbe disease', 'Color blindness', 'Hemophilia', 'D', 11),
    (v_exam_id, v_sec_a_id, 'What determines gender in humans?', 'mcq', 'The X chromosome', 'The Y chromosome', 'The X and Y chromosomes', 'Chromosome 21', 'C', 12),
    (v_exam_id, v_sec_a_id, 'Blood group A is incompatible with B and O because both make:', 'mcq', 'Anti-B antibodies', 'Anti-A antibodies', 'Anti-A antigens', 'Anti-B antigens', 'B', 13),
    (v_exam_id, v_sec_a_id, 'Basis of DNA fragment separation by gel electrophoresis:', 'mcq', 'Size of fragments', 'Presence of dye', 'Sequence', 'Positive charge', 'A', 14),
    (v_exam_id, v_sec_a_id, 'The machine used in amplification of DNA is:', 'mcq', 'PCR machine', 'Sequencing machine', 'Gel electrophoresis', 'CRP machine', 'A', 15),
    (v_exam_id, v_sec_a_id, 'Which is a major threat to biodiversity?', 'mcq', 'Pollution', 'Genetic diversity', 'Seed dispersal', 'Habitat destruction', 'D', 16),
    (v_exam_id, v_sec_a_id, 'Two cows with different characteristics demonstrate:', 'mcq', 'Ecosystem diversity', 'Genetic diversity', 'Species diversity', 'Species richness', 'B', 17),
    (v_exam_id, v_sec_a_id, 'Which disease can result from water pollution?', 'mcq', 'Cholera', 'Measles', 'Malaria', 'Mumps', 'A', 18);

    -- 4. Insert Questions (Section B - Structural)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_b_id, 'Define biodiversity and list factors that threaten it.', 'short_answer', 'Biodiversity: variety of life. Threats: habitat destruction, pollution, overexploitation.', 19),
    (v_exam_id, v_sec_b_id, 'Describe uses of restriction enzymes and gene cloning.', 'short_answer', 'Restriction enzymes cut DNA; Cloning makes copies of genes.', 20),
    (v_exam_id, v_sec_b_id, 'Identify the type of joint at the shoulder.', 'short_answer', 'Ball and socket joint.', 21),
    (v_exam_id, v_sec_b_id, 'Difference between fast-twitch and slow-twitch muscles.', 'short_answer', 'Fast-twitch: quick bursts of energy; Slow-twitch: endurance/oxygen use.', 22),
    (v_exam_id, v_sec_b_id, 'Name the gland producing estrogen and list hormones from thyroid.', 'short_answer', 'Ovary; Thyroid: Thyroxine, Triiodothyronine, Calcitonin.', 23),
    (v_exam_id, v_sec_b_id, 'Compare structure of DNA and RNA.', 'short_answer', 'DNA: double helix, deoxyribose, thymine; RNA: single strand, ribose, uracil.', 24),
    (v_exam_id, v_sec_b_id, 'Explain ABO inheritance involving AB and O parents.', 'short_answer', 'IAIB x ii results in 50% A (IAi) and 50% B (IBi). No AB or O children.', 25),
    (v_exam_id, v_sec_b_id, 'Difference between lichens and mycorrhiza.', 'short_answer', 'Lichens: Fungi + Algae; Mycorrhiza: Fungi + Plant Roots.', 26),
    (v_exam_id, v_sec_b_id, 'Importance of Protista.', 'short_answer', 'Decomposers, producers (algae), pathogens, and evolutionary links.', 27);

END $$;
