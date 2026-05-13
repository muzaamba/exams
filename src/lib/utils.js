/**
 * Merge class names, filtering out falsy values
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a number with commas
 */
export function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num?.toString() || '0';
}

/**
 * Calculate percentage
 */
export function calcPercentage(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Get time ago string
 */
export function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

/**
 * Get XP level from total XP
 */
export function getLevel(xp) {
  const levels = [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 10000];
  let level = 1;
  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i]) level = i + 1;
    else break;
  }
  const currentLevelXP = levels[level - 1] || 0;
  const nextLevelXP = levels[level] || levels[levels.length - 1] * 2;
  const progress = calcPercentage(xp - currentLevelXP, nextLevelXP - currentLevelXP);
  return { level, xp, nextLevelXP, currentLevelXP, progress };
}

/**
 * Generate a gradient from a color
 */
export function getSubjectGradient(color) {
  return `linear-gradient(135deg, ${color}20, ${color}05)`;
}

/**
 * Shuffle an array
 */
export function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Format duration from minutes
 */
export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes}min`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins ? `${hrs}h ${mins}m` : `${hrs}h`;
}

/**
 * Normalize subject slug from various database representations
 */
export function normalizeSubject(subject) {
  if (!subject) return 'unknown';
  const s = subject.toLowerCase().trim();
  if (s.includes('soomaali')) return 'somali';
  if (s.includes('math')) return 'mathematics';
  if (s.includes('bio')) return 'biology';
  if (s.includes('chem')) return 'chemistry';
  if (s.includes('physic')) return 'physics';
  if (s.includes('arab')) return 'arabic';
  if (s.includes('eng')) return 'english';
  if (s.includes('geo')) return 'geography';
  if (s.includes('hist')) return 'history';
  return s;
}

/**
 * Get greeting based on time of day
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

