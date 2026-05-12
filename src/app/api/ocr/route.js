import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request) {
  try {
    const { image, pageNumber } = await request.json();

    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenAI API key is missing' }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    // Use GPT-4o Vision to extract questions
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: `You are an expert exam transcriber. Transcribe all questions from this exam page (Page ${pageNumber}). 
              
              Instructions:
              1. Extract all questions, options (A, B, C, D), and identify the correct answer if possible.
              2. Maintain the original language (e.g., Somali or English).
              3. If there are diagrams, describe them briefly in brackets like [Diagram: description].
              4. Format the output clearly.
              
              Return the raw text of the questions.` 
            },
            {
              type: "image_url",
              image_url: {
                url: image, // This is expected to be a data URL (base64)
              },
            },
          ],
        },
      ],
    });

    const extractedText = response.choices[0].message.content;

    return NextResponse.json({ text: extractedText });

  } catch (error) {
    console.error('OCR API Error:', error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}
