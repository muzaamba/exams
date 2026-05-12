-- =============================================
-- ZEWENO: Multiplayer & Social Expansion
-- =============================================

-- 1. FRIENDSHIPS
CREATE TABLE IF NOT EXISTS friendships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(sender_id, receiver_id)
);

-- 2. QUIZ ROOMS
CREATE TABLE IF NOT EXISTS quiz_rooms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  host_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  room_code TEXT UNIQUE NOT NULL,
  quiz_id UUID REFERENCES exams(id) ON DELETE SET NULL,
  max_players INTEGER DEFAULT 4,
  mode TEXT DEFAULT 'battle' CHECK (mode IN ('battle', 'group', 'collab')),
  status TEXT DEFAULT 'lobby' CHECK (status IN ('lobby', 'playing', 'finished')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ROOM PLAYERS
CREATE TABLE IF NOT EXISTS room_players (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  room_id UUID REFERENCES quiz_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER DEFAULT 0,
  is_ready BOOLEAN DEFAULT FALSE,
  last_active TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(room_id, user_id)
);

-- 4. AI TOPIC ANALYSIS (Gov-style prediction cache)
CREATE TABLE IF NOT EXISTS ai_topic_analysis (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subject TEXT NOT NULL,
  analysis_data JSONB NOT NULL, -- Correlation, repeated topics, predictions
  correlation_score FLOAT,
  insight_summary TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS POLICIES
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_topic_analysis ENABLE ROW LEVEL SECURITY;

-- Friendships
CREATE POLICY "Users can view own friendships" ON friendships FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send requests" ON friendships FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update own requests" ON friendships FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Rooms
CREATE POLICY "Rooms are viewable by all" ON quiz_rooms FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create rooms" ON quiz_rooms FOR INSERT WITH CHECK (auth.uid() = host_user_id);
CREATE POLICY "Hosts can update rooms" ON quiz_rooms FOR UPDATE USING (auth.uid() = host_user_id);

-- Room Players
CREATE POLICY "Players are viewable by everyone in room" ON room_players FOR SELECT USING (true);
CREATE POLICY "Users can join rooms" ON room_players FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own score" ON room_players FOR UPDATE USING (auth.uid() = user_id);

-- AI Analysis (Publicly readable)
CREATE POLICY "Analysis is viewable by all" ON ai_topic_analysis FOR SELECT USING (true);
