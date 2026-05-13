-- Biology National Exam 2020 Seeding Script
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
    VALUES (v_exam_id, 'Biology National Exam 2020', 'biology', 'form4', 2020, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec_a_id, v_exam_id, 'PART A: Multiple Choice', 20, 1),
    (v_sec_b_id, v_exam_id, 'PART B: Fill in the Blanks', 10, 2),
    (v_sec_c_id, v_exam_id, 'SECTION C: Theory & Applications', 70, 3);

    -- 3. Insert Questions (Section A - MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec_a_id, 'Which of the following neurons transmit nerve impulses from the central nervous system to the effector organ?', 'mcq', 'Sensory', 'Motor', 'Relay', 'Cranial', 'b', 1),
    (v_exam_id, v_sec_a_id, 'Which of the following glands is classified for secreting hormone thyroxin?', 'mcq', 'Adrenal gland', 'Pituitary gland', 'Thyroid gland', 'Pancreas', 'c', 2),
    (v_exam_id, v_sec_a_id, 'Choose the female organ that produce the ovum.', 'mcq', 'Oviduct', 'Ovary', 'Uterus', 'Fallopian tube', 'b', 3),
    (v_exam_id, v_sec_a_id, 'The part of the flower where the pollen grain is produced is called', 'mcq', 'Stigma', 'Petal', 'Anther', 'Filament', 'c', 4),
    (v_exam_id, v_sec_a_id, 'Select the part of the brain which controls the homeostatic functions', 'mcq', 'Cerebrum', 'Thalamus', 'Hypothalamus', 'Pituitary gland', 'c', 5),
    (v_exam_id, v_sec_a_id, 'Which of the following statements best describes the structure of the human sperm?', 'mcq', 'Ovoid head, short neck and nucleus', 'Middle piece, short neck and mitochondria', 'Short neck, nucleus and mitochondria', 'Ovoid head, short neck, middle piece and tail', 'd', 6),
    (v_exam_id, v_sec_a_id, 'Which of the following traits is identified as an example of continuous variation?', 'mcq', 'Sex', 'ABO blood group', 'Tongue rolling', 'Height', 'd', 7),
    (v_exam_id, v_sec_a_id, 'When a homozygous man from blood group A marries a woman who is homozygous from blood group B, the probability of them producing an offspring of AB blood group is', 'mcq', '25%', '50%', '75%', '100%', 'd', 8),
    (v_exam_id, v_sec_a_id, 'The type of chromosomal mutation that occurs when a section of the chromatid break and fail to reconnect to any other chromatid is called', 'mcq', 'Duplication', 'Deletion', 'Inversion', 'Translocation', 'b', 9),
    (v_exam_id, v_sec_a_id, 'Which of the following glands secretes the Follicle Stimulating Hormone (FSH)', 'mcq', 'Corpus luteum', 'Adrenal gland', 'Pituitary gland', 'Thyroid gland', 'c', 10);

    -- 4. Insert Questions (Section B - Fill in the Blank)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_b_id, 'Name two types of reproduction', 'short_answer', 'Sexual reproduction, Asexual reproduction', 11),
    (v_exam_id, v_sec_b_id, 'Describe the condition in which the embryo gets attached to the wall of the oviduct.', 'short_answer', 'Ectopic pregnancy', 12),
    (v_exam_id, v_sec_b_id, 'The bacteria that causes syphilis is known as', 'short_answer', 'Treponema pallidum', 13),
    (v_exam_id, v_sec_b_id, 'The gene that determines whether a child becomes a male or female is located on a specific pair of chromosome called', 'short_answer', 'Sex chromosomes', 14);

    -- 5. Insert Questions (Section C - Theory)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, explanation, question_number) VALUES
    (v_exam_id, v_sec_c_id, 'Define the term Genetics', 'essay', 'Genetics is the branch of biology that studies heredity and variation in organisms.', 15),
    (v_exam_id, v_sec_c_id, 'State the two types of mutation', 'short_answer', 'Gene mutation, Chromosomal mutation', 16),
    (v_exam_id, v_sec_c_id, 'Describe the functions of the different parts of female reproductive system (Ovary, Oviduct, Uterus, Cervix, Vagina).', 'essay', 'Ovary: Produces ova; Oviduct: Fertilization; Uterus: Implantation; Cervix: Opening; Vagina: Birth canal.', 17),
    (v_exam_id, v_sec_c_id, 'Explain how impulses are passed from receptors to effectors via the central nervous system.', 'essay', 'Receptors -> Sensory neuron -> CNS -> Relay neuron -> Motor neuron -> Effector.', 18),
    (v_exam_id, v_sec_c_id, 'Analyze the retinal adaptations of the owl help it move at night.', 'essay', 'High density of rod cells for dim light vision and large eyes to collect light.', 19),
    (v_exam_id, v_sec_c_id, 'Using diagram illustration, analyze the genetic cross between a man with blood group A and a woman with blood group B producing offspring of all the four blood groups.', 'essay', 'IAi × IBi produces AB, A, B, and O (ii).', 20),
    (v_exam_id, v_sec_c_id, 'Describe the differences between Phenotype and Genotype.', 'short_answer', 'Phenotype: Observable traits; Genotype: Genetic makeup.', 21),
    (v_exam_id, v_sec_c_id, 'Discuss the effects of overproduction of thyroxine on humans.', 'essay', 'Weight loss, rapid heartbeat, nervousness, and excess sweating.', 22),
    (v_exam_id, v_sec_c_id, 'Differentiate between internal fertilization and external fertilization', 'short_answer', 'Internal: inside body; External: outside body.', 23),
    (v_exam_id, v_sec_c_id, 'Define Gestation period, Abortion, Ovulation, and Menopause.', 'short_answer', 'Gestation: period until birth; Abortion: premature termination; Ovulation: egg release; Menopause: end of menstruation.', 24),
    (v_exam_id, v_sec_c_id, 'Explain the physiological importance of the testes being outside the body', 'short_answer', 'Maintains lower temperature required for sperm production.', 25),
    (v_exam_id, v_sec_c_id, 'Sketch and label the male parts of a flower.', 'short_answer', 'Anther and Filament.', 26),
    (v_exam_id, v_sec_c_id, 'Describe any two sex linked diseases.', 'short_answer', 'Haemophilia (clotting disorder) and Colour blindness.', 27),
    (v_exam_id, v_sec_c_id, 'Estimate the number of teeth in adult human being.', 'short_answer', '32 teeth', 28),
    (v_exam_id, v_sec_c_id, 'Classify: Elephant, Human, Cat, Rat based on diet.', 'short_answer', 'Elephant: Herbivore; Human: Omnivore; Cat: Carnivore; Rat: Omnivore.', 29),
    (v_exam_id, v_sec_c_id, 'Name the parasite that causes malaria to humans', 'short_answer', 'Plasmodium', 30),
    (v_exam_id, v_sec_c_id, 'If the base sequence of a DNA strand is A C G T C A G T A, synthesize the complementary strand.', 'short_answer', 'T G C A G T C A T', 31),
    (v_exam_id, v_sec_c_id, 'Explain why it is difficult to cure the third stage of syphilis.', 'essay', 'Deep damage to body tissues and the nervous system.', 32),
    (v_exam_id, v_sec_c_id, 'Discuss the significance of meiosis.', 'essay', 'Haploid gamete production, chromosome maintenance, and genetic variation.', 33),
    (v_exam_id, v_sec_c_id, 'Describe the role of placenta during pregnancy to foetus', 'essay', 'Nutrient transfer, waste removal, and hormone production.', 34);

END $$;
