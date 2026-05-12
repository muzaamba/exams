/**
 * AI Analysis Engine
 * Smart topic analysis based on exam data — no external AI API needed.
 */

/**
 * Analyze topic frequency across exam questions
 */
export function analyzeTopicFrequency(questions) {
  const topicMap = {};
  
  questions.forEach((q) => {
    const key = `${q.subject}::${q.topic}`;
    if (!topicMap[key]) {
      topicMap[key] = { subject: q.subject, topic: q.topic, count: 0, years: new Set(), difficulties: [] };
    }
    topicMap[key].count++;
    if (q.year) topicMap[key].years.add(q.year);
    if (q.difficulty) topicMap[key].difficulties.push(q.difficulty);
  });

  return Object.values(topicMap)
    .map((t) => ({
      ...t,
      years: Array.from(t.years).sort(),
      frequency: (t.count / questions.length) * 100,
      avgDifficulty: getAvgDifficulty(t.difficulties),
    }))
    .sort((a, b) => b.frequency - a.frequency);
}

/**
 * Detect exam trends by year
 */
export function detectTrends(questions) {
  const yearTopics = {};
  
  questions.forEach((q) => {
    if (!q.year) return;
    if (!yearTopics[q.year]) yearTopics[q.year] = {};
    if (!yearTopics[q.year][q.topic]) yearTopics[q.year][q.topic] = 0;
    yearTopics[q.year][q.topic]++;
  });

  const years = Object.keys(yearTopics).sort();
  const trends = [];

  if (years.length >= 2) {
    const lastYear = yearTopics[years[years.length - 1]] || {};
    const prevYear = yearTopics[years[years.length - 2]] || {};
    
    const allTopics = new Set([...Object.keys(lastYear), ...Object.keys(prevYear)]);
    
    allTopics.forEach((topic) => {
      const current = lastYear[topic] || 0;
      const previous = prevYear[topic] || 0;
      const change = previous > 0 ? ((current - previous) / previous) * 100 : current > 0 ? 100 : 0;
      
      if (Math.abs(change) > 10) {
        trends.push({
          topic,
          direction: change > 0 ? 'increasing' : 'decreasing',
          changePercent: Math.round(Math.abs(change)),
          currentCount: current,
          previousCount: previous,
        });
      }
    });
  }

  return trends.sort((a, b) => b.changePercent - a.changePercent);
}

/**
 * Identify weak topics based on quiz attempts
 */
export function identifyWeakTopics(attempts) {
  const topicStats = {};
  
  attempts.forEach((a) => {
    const key = `${a.subject}::${a.topic}`;
    if (!topicStats[key]) {
      topicStats[key] = { subject: a.subject, topic: a.topic, correct: 0, total: 0 };
    }
    topicStats[key].total++;
    if (a.is_correct) topicStats[key].correct++;
  });

  return Object.values(topicStats)
    .map((t) => ({
      ...t,
      accuracy: Math.round((t.correct / t.total) * 100),
      mastery: calculateMastery(t.correct, t.total),
    }))
    .filter((t) => t.mastery < 60)
    .sort((a, b) => a.mastery - b.mastery);
}

/**
 * Calculate mastery level using spaced repetition principles
 */
function calculateMastery(correct, total) {
  if (total === 0) return 0;
  const accuracy = correct / total;
  // Weight recent performance more heavily
  const confidence = Math.min(total / 10, 1);
  return Math.round(accuracy * confidence * 100);
}

function getAvgDifficulty(difficulties) {
  const map = { easy: 1, medium: 2, hard: 3 };
  const avg = difficulties.reduce((sum, d) => sum + (map[d] || 2), 0) / difficulties.length;
  if (avg < 1.5) return 'easy';
  if (avg < 2.5) return 'medium';
  return 'hard';
}
