import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request) {
  try {
    const { text, subject, grade } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenAI API key is missing' }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    const prompt = `
      You are an expert educational content creator. Convert the following raw exam text into a structured JSON array of questions.
      
      Subject: ${subject}
      Grade: ${grade}

      Rules:
      1. Each question must have: question_text, option_a, option_b, option_c, option_d, correct_answer (A, B, C, or D), explanation, topic, and difficulty (easy, medium, hard).
      2. If a question is not multiple choice, skip it or try to convert it to MCQ if possible.
      3. Use Somali for Somali subjects and English for others.
      4. Ensure JSON is valid.

      Text:
      ${text}

      Return ONLY a JSON array: [{"question_text": "...", "option_a": "...", ...}]
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const structuredData = JSON.parse(response.choices[0].message.content);
    // GPT might return { "questions": [...] } or just [...]
    const questions = structuredData.questions || structuredData;

    return NextResponse.json({ questions });

  } catch (error) {
    console.error('Structuring Error:', error);
    return NextResponse.json({ error: 'Failed to structure questions' }, { status: 500 });
  }
}
