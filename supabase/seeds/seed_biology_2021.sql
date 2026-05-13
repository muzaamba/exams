-- Biology National Exam 2021 Seeding Script
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
    VALUES (v_exam_id, 'Biology National Exam 2021', 'biology', 'form4', 2021, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_a_id, v_exam_id, 'Section A: Multiple Choice', 40, 1),
    (v_sec_b_id, v_exam_id, 'Section B: Matching Terms', 20, 2),
    (v_sec_c_id, v_exam_id, 'Section C: Theory & Genetics', 40, 3);

    -- 3. Insert Questions (Section A - MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_a_id, 'The nerves that arise from the brain are known as', 'mcq', 'Spinal cord', 'Spinal nerve', 'Cranial nerves', 'Central nerves', 'c', 1),
    (v_exam_id, v_sec_a_id, 'The nerve system that is controlled by the hypothalamus is said to be', 'mcq', 'Voluntary', 'Sensory', 'Autonomic', 'Peripheral', 'c', 2),
    (v_exam_id, v_sec_a_id, 'The part of the neuron that receives information from other neurons is', 'mcq', 'Dendrite', 'Axon', 'Cell body', 'Synapse', 'a', 3),
    (v_exam_id, v_sec_a_id, 'Damage to the cerebellum (trauma) most likely results in:', 'mcq', 'Memory loss', 'Temperature fluctuation', 'Trouble in maintaining balance', 'Rapid breathing', 'c', 4),
    (v_exam_id, v_sec_a_id, 'The primary function of the melanin is to', 'mcq', 'Produce vitamin D', 'Produce sebum', 'Waterproof the skin', 'Provide protection against UV', 'd', 5),
    (v_exam_id, v_sec_a_id, 'The first integumentary structure through which a needle passes is', 'mcq', 'Reticular layer', 'Epidermis', 'Papillary layer', 'Hypodermis', 'b', 6),
    (v_exam_id, v_sec_a_id, 'In humans, all are functions of the skin except:', 'mcq', 'Respiratory gas exchange', 'Water loss prevention', 'Excretion', 'Temperature regulation', 'a', 7),
    (v_exam_id, v_sec_a_id, 'A type of bone that is classified as irregular bone is known as', 'mcq', 'Leg bones', 'Vertebrae', 'Skull', 'Wrist bones', 'b', 8),
    (v_exam_id, v_sec_a_id, 'Which of the following is NOT part of the appendicular skeleton?', 'mcq', 'Shoulder', 'Hips', 'Feet', 'Skull', 'd', 9),
    (v_exam_id, v_sec_a_id, '_____ releases excess water that helps the skin to regulate body temperature', 'mcq', 'Sweat gland', 'Sebaceous gland', 'Oil gland', 'Ceruminous gland', 'a', 10),
    (v_exam_id, v_sec_a_id, 'After eating bread, the glucose level of the blood will:', 'mcq', 'Increase', 'Decrease', 'Remains the same', 'Vary', 'a', 11),
    (v_exam_id, v_sec_a_id, 'The thyroxine hormone is secreted by', 'mcq', 'Pituitary gland', 'Adrenal gland', 'Thyroid gland', 'Parathyroid gland', 'c', 12),
    (v_exam_id, v_sec_a_id, 'The tough outer membrane covering the brain and spinal cord is called', 'mcq', 'Dura mater', 'Pia mater', 'Arachnoid mater', 'Cerebrospinal fluid', 'a', 13),
    (v_exam_id, v_sec_a_id, 'If one strand of a DNA is 5'' ATCGTTAAGCGAGTCA 3'' the complimentary strand would be', 'mcq', 'TAGCAATTCGCTCAGT', 'ACTGAGCGAATTGCTA', 'TGACTCGCTTAACGAT', 'ATCGTTAAGCGAGTCA', 'c', 14),
    (v_exam_id, v_sec_a_id, 'A black Ox (Bb) was crossed with a white cow (bb). Resulting phenotypic ratio is:', 'mcq', '0:1', '1:1 black to white', '1:0', '3:1', 'b', 15),
    (v_exam_id, v_sec_a_id, 'Crossing purple flower (PP) and a white flower (pp) results in F1 generation being:', 'mcq', 'All white', 'All purple', '3 purple:1 white', '1 purple:2 white', 'b', 16),
    (v_exam_id, v_sec_a_id, 'Region in Somalia with greatest species diversity:', 'mcq', 'Galgudud', 'Benadir', 'Bari', 'Lower Juba', 'd', 17),
    (v_exam_id, v_sec_a_id, 'Group of organisms containing largest number of species:', 'mcq', 'Birds', 'Plants', 'Insects', 'Mammals', 'c', 18),
    (v_exam_id, v_sec_a_id, 'Part of the ear responsible for hearing:', 'mcq', 'Semicircular canal', 'Cochlea', 'Tympanum', 'Ear canal', 'b', 19),
    (v_exam_id, v_sec_a_id, 'Probability of child having blood group O from IAi and IBi parents:', 'mcq', '25%', '50%', '75%', '100%', 'a', 20);

    -- 4. Insert Questions (Section B - Matching)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_b_id, 'Match: Meninges, Cerebrum, Cerebrospinal fluid, Hypothyroidism, Genomics, Synovial fluids, Joint, Codon, DDT, ABO.', 'short_answer', 'Meninges: Layer; Cerebrum: Largest part; CSF: Nutrients; Hypothyroidism: Deficiency; Genomics: Genome study; Synovial: Lubricant; Joint: Meeting place; Codon: Triple base; DDT: Pesticide; ABO: Codominance.', 21);

    -- 5. Insert Questions (Section C - Theory)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_c_id, 'Define Mutation and Neuron.', 'short_answer', 'Mutation: Heritable change; Neuron: Nerve cell.', 22),
    (v_exam_id, v_sec_c_id, 'State abnormalities related to hypo- and hyperthyroidism.', 'short_answer', 'Hypo: Cretinism/Myxedema; Hyper: Graves/Goiter.', 23),
    (v_exam_id, v_sec_c_id, 'Differentiate between lipophilic and hydrophilic hormones.', 'short_answer', 'Lipophilic: Fat-soluble/pass membrane; Hydrophilic: Water-soluble/surface receptors.', 24),
    (v_exam_id, v_sec_c_id, 'Define genetic engineering and list four tools used.', 'short_answer', 'Modification of genes; Tools: Restriction enzymes, Ligase, Plasmids, PCR.', 25),
    (v_exam_id, v_sec_c_id, 'Differentiate between species diversity and genetic diversity.', 'short_answer', 'Species: Variety of species; Genetic: Variation within species.', 26),
    (v_exam_id, v_sec_c_id, 'Give examples of steroid (lipophilic) and non-steroid (hydrophilic) hormones.', 'short_answer', 'Steroid: Testosterone/Estrogen; Non-steroid: Insulin/Adrenaline.', 27),
    (v_exam_id, v_sec_c_id, 'Differentiate between type I and type II diabetes.', 'short_answer', 'Type I: Lack of insulin; Type II: Insulin resistance.', 28),
    (v_exam_id, v_sec_c_id, 'Name the four lobes of the human brain (Frontal, Parietal, Occipital, Temporal).', 'short_answer', 'A: Frontal; B: Parietal; C: Occipital; D: Temporal.', 29),
    (v_exam_id, v_sec_c_id, 'Probability of child being colour blind from XcY and XCXc parents?', 'short_answer', '50%', 30);

END $$;
