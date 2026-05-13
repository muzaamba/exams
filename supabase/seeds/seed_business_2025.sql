-- Business Studies National Exam 2025 Seeding Script
-- Copy and paste this into the Supabase SQL Editor

DO $$
DECLARE
    v_exam_id UUID := gen_random_uuid();
    v_sec1_id UUID := gen_random_uuid();
BEGIN
    -- 1. Insert Exam
    INSERT INTO exams (id, title, subject, grade, year, total_marks, duration, status)
    VALUES (v_exam_id, 'Business Studies National Exam 2025', 'business', 'form4', 2025, 100, 120, 'published');

    -- 2. Insert Sections
    INSERT INTO sections (id, exam_id, section_name, marks, sort_order) VALUES
    (v_sec1_id, v_exam_id, 'Section A: Multiple Choice Questions', 40, 1);

    -- 3. Insert Questions (Section A - MCQs)
    INSERT INTO questions (exam_id, section_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, question_number) VALUES
    (v_exam_id, v_sec1_id, 'The kind of business activity labeled in the given picture is?', 'mcq', 'Extraction', 'Processing', 'Manufacturing', 'Construction', 'C', 1),
    (v_exam_id, v_sec1_id, 'The fundamental economic problem is that resources are limited but economic wants are insatiable. What term best describes this?', 'mcq', 'Trade-off', 'Productivity', 'Demand', 'Scarcity', 'D', 2),
    (v_exam_id, v_sec1_id, 'The information was obtained from the book of Kamil LTD. Calculate the total assets (based on provided data of 27500).', 'mcq', '3500', '27500', '15000', '1500', 'B', 3),
    (v_exam_id, v_sec1_id, 'The following are characteristics of an entrepreneur EXCEPT?', 'mcq', 'Optimistic', 'Resourceful', 'Advocacy', 'Motivated', 'C', 4),
    (v_exam_id, v_sec1_id, 'Calculate the price elasticity when price changes by 5% and quantity changes by 5%.', 'mcq', '1', '1.5', '0.25', '2.5', 'A', 5),
    (v_exam_id, v_sec1_id, 'Planning, organizing, command, coordination and control are sub activities of:', 'mcq', 'Commercial activities', 'Accounting activities', 'Financial activities', 'Managerial activities', 'D', 6),
    (v_exam_id, v_sec1_id, 'How does a team make decision in business project?', 'mcq', 'By approval', 'By Majority', 'Weighted', 'Unanimously', 'B', 7),
    (v_exam_id, v_sec1_id, 'Which one is NOT a determinant of supply?', 'mcq', 'Consumer''s tastes', 'Number of sellers', 'Technology', 'Taxes and subsidies', 'A', 8),
    (v_exam_id, v_sec1_id, 'The following are characteristics of money. Which one is NOT?', 'mcq', 'Convenient', 'Durable', 'Scarce', 'Accepted', 'C', 9),
    (v_exam_id, v_sec1_id, 'This figure is well known mail-handling equipment used in the office. It is known as?', 'mcq', 'Envelope', 'A4 letter', 'Stapler', 'Scissor', 'C', 10),
    (v_exam_id, v_sec1_id, 'Misuse of punctuations can affect communication. Which factor is it?', 'mcq', 'Distractions', 'Cultural', 'Status', 'Language', 'D', 11),
    (v_exam_id, v_sec1_id, 'To run an effective filing system, you should:', 'mcq', 'Avoid saving unnecessary documents', 'Keep all filing in closed cabinet', 'Drink coffee', 'Hide cables', 'B', 12),
    (v_exam_id, v_sec1_id, 'The branch of economics that assesses the government revenue and expenditure is:', 'mcq', 'Public issue', 'Public debts', 'Public Finance', 'Public Policy', 'C', 13),
    (v_exam_id, v_sec1_id, 'The earliest business made by people was barter trade. Which type of money was used?', 'mcq', 'Bank money', 'Paper money', 'Metallic money', 'Commodity money', 'D', 14),
    (v_exam_id, v_sec1_id, 'Trade carried out between two countries is referred as:', 'mcq', 'Multilateral trade', 'Retail Trade', 'Wholesale Trade', 'Bilateral trade', 'D', 15),
    (v_exam_id, v_sec1_id, 'Which of the following is NOT electronic marketing mix?', 'mcq', 'E-product', 'E-pricing', 'E-promotion', 'E-Packaging', 'D', 16),
    (v_exam_id, v_sec1_id, 'Which of the following is NOT a major function of a warehouse?', 'mcq', 'Inventory', 'Grading and branding', 'Storage of goods', 'Protection of goods', 'B', 17),
    (v_exam_id, v_sec1_id, 'The electronic technology through which the buyer and seller meet exchanging products is called:', 'mcq', 'Electronic business', 'Electronic market', 'E-commerce', 'Digital marketing', 'C', 18),
    (v_exam_id, v_sec1_id, 'The other name of Income Statement is?', 'mcq', 'Profit and loss statement', 'Profit and Revenue statement', 'Cash flow statement', 'Balance Sheet statement', 'A', 19),
    (v_exam_id, v_sec1_id, 'Which trade takes place between many countries?', 'mcq', 'Home trade', 'International trade', 'Import trade', 'Wholesale trade', 'B', 20);

END $$;
