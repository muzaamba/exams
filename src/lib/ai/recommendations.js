/**
 * Smart Revision Recommendation Engine
 */

/**
 * Generate personalized revision recommendations
 */
export function generateRecommendations({ weakTopics, topicFrequency, revisionProgress }) {
  const recommendations = [];

  // Priority 1: High-frequency + Low mastery topics
  if (weakTopics && topicFrequency) {
    weakTopics.forEach((weak) => {
      const freq = topicFrequency.find(
        (f) => f.subject === weak.subject && f.topic === weak.topic
      );
      if (freq && freq.frequency > 50) {
        recommendations.push({
          subject: weak.subject,
          topic: weak.topic,
          priority: 'critical',
          reason: `Low mastery (${weak.mastery}%) + High exam frequency (${Math.round(freq.frequency)}%)`,
          action: 'Start revision immediately',
          xpReward: 30,
        });
      }
    });
  }

  // Priority 2: Not reviewed recently
  if (revisionProgress) {
    revisionProgress.forEach((prog) => {
      const daysSince = Math.floor(
        (Date.now() - new Date(prog.last_reviewed).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSince > 5 && prog.mastery_level < 80) {
        recommendations.push({
          subject: prog.subject,
          topic: prog.topic,
          priority: daysSince > 10 ? 'high' : 'medium',
          reason: `Not reviewed in ${daysSince} days`,
          action: 'Schedule revision',
          xpReward: 20,
        });
      }
    });
  }

  // Priority 3: Subjects with low overall mastery
  if (weakTopics) {
    const subjectMastery = {};
    weakTopics.forEach((w) => {
      if (!subjectMastery[w.subject]) subjectMastery[w.subject] = [];
      subjectMastery[w.subject].push(w.mastery);
    });

    Object.entries(subjectMastery).forEach(([subject, masteries]) => {
      const avg = masteries.reduce((a, b) => a + b, 0) / masteries.length;
      if (avg < 50) {
        recommendations.push({
          subject,
          topic: 'All Topics',
          priority: 'high',
          reason: `Overall subject mastery is ${Math.round(avg)}%`,
          action: 'Focus on this subject',
          xpReward: 25,
        });
      }
    });
  }

  return recommendations
    .sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3);
    })
    .slice(0, 10);
}

/**
 * Calculate exam readiness score
 */
export function calculateReadiness({ weakTopics, quizAttempts, streak, subjectCount = 9 }) {
  let score = 0;
  const maxScore = 100;

  // Factor 1: Topic mastery (40%)
  if (weakTopics && weakTopics.length > 0) {
    const avgMastery = weakTopics.reduce((sum, t) => sum + t.mastery, 0) / weakTopics.length;
    score += (avgMastery / 100) * 40;
  }

  // Factor 2: Quiz consistency (30%)
  if (quizAttempts) {
    const recentAttempts = quizAttempts.filter(
      (a) => Date.now() - new Date(a.created_at).getTime() < 7 * 24 * 60 * 60 * 1000
    );
    const consistency = Math.min(recentAttempts.length / 20, 1);
    score += consistency * 30;
  }

  // Factor 3: Study streak (15%)
  if (streak) {
    score += Math.min(streak / 14, 1) * 15;
  }

  // Factor 4: Subject coverage (15%)
  if (weakTopics) {
    const coveredSubjects = new Set(weakTopics.map((t) => t.subject)).size;
    score += (coveredSubjects / subjectCount) * 15;
  }

  return Math.min(Math.round(score), maxScore);
}
