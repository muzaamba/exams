import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import OpenAI from 'openai';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject');

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API Key is missing. Please configure it in .env.local' }, { status: 500 });
  }

  const openai = new OpenAI({ apiKey });

  if (!subject) {
    return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
  }

  try {
    const supabase = await createClient();

    // 1. Fetch questions from the last 3 years for this subject
    const { data: questions, error } = await supabase
      .from('questions')
      .select('question_text, topic, difficulty, exams!inner(year, subject)')
      .eq('exams.subject', subject)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // 2. Prepare data for AI analysis
    const context = questions.map(q => ({
      text: q.question_text,
      topic: q.topic,
      year: q.exams?.year,
      difficulty: q.difficulty
    }));

    // 3. Call OpenAI for pattern analysis
    const prompt = `
      You are an expert educational data analyst for the Somali Ministry of Education.
      Analyze the following exam data from the last 3 years for the subject: ${subject}.
      
      Tasks:
      1. Identify the top 5 most frequently repeated topics/chapters.
      2. Calculate a correlation score (0-1) between yearly topics.
      3. Identify "Hot Topics" likely to appear in the upcoming exam based on historical patterns.
      4. Provide a strategy recommendation for students.
      
      Return ONLY a JSON object in this format:
      {
        "repeated_topics": [{"topic": "string", "frequency": number, "trend": "up|down|stable"}],
        "correlation_score": number,
        "hot_topics": ["string"],
        "difficulty_trend": "increasing|decreasing|stable",
        "strategy": "string",
        "predicted_focus_areas": [{"area": "string", "probability": number}]
      }

      Data: ${JSON.stringify(context.slice(0, 50))} 
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const analysisResult = JSON.parse(completion.choices[0].message.content);

    // 4. Cache the result in the database
    await supabase.from('ai_topic_analysis').insert({
      subject,
      analysis_data: analysisResult,
      correlation_score: analysisResult.correlation_score,
      insight_summary: analysisResult.strategy
    });

    return NextResponse.json(analysisResult);

  } catch (error) {
    console.error('AI Analysis Error:', error);
    return NextResponse.json({ error: 'Failed to analyze exam data' }, { status: 500 });
  }
}
