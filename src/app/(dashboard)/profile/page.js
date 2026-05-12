'use client';

import { useState } from 'react';
import { User, Mail, GraduationCap, Trophy, Flame, Brain, Award, Save } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { CircularProgress, LinearProgress } from '@/components/ui/Progress';
import { ACHIEVEMENTS } from '@/lib/constants';
import { getLevel } from '@/lib/utils';

const userProfile = {
  name: 'Abdirahman Mohamed',
  email: 'abdi@example.com',
  grade: 'Form 4',
  joinDate: 'Jan 2026',
  xp: 2450,
  quizzes: 42,
  streak: 7,
  accuracy: 78,
};

const unlockedAchievements = ['first_quiz', 'streak_3', 'streak_7', 'perfect_quiz'];

export default function ProfilePage() {
  const level = getLevel(userProfile.xp);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>

      {/* Profile Header */}
      <Card hover={false} className="!p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl animated-gradient flex items-center justify-center text-white font-black text-3xl">
            {userProfile.name[0]}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold">{userProfile.name}</h2>
            <p className="text-muted">{userProfile.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
              <Badge color="blue">{userProfile.grade}</Badge>
              <Badge color="green">Level {level.level}</Badge>
              <Badge color="yellow">Joined {userProfile.joinDate}</Badge>
            </div>
          </div>
          <div className="text-center">
            <CircularProgress value={level.progress} size={80} strokeWidth={6} color="var(--primary)">
              <span className="text-lg font-bold">{level.level}</span>
            </CircularProgress>
            <p className="text-xs text-muted mt-1">{userProfile.xp} / {level.nextLevelXP} XP</p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="!p-4 text-center"><Trophy className="mx-auto text-yellow-400 mb-1" size={20} /><p className="text-xl font-bold">{userProfile.xp.toLocaleString()}</p><p className="text-xs text-muted">Total XP</p></Card>
        <Card className="!p-4 text-center"><Brain className="mx-auto text-primary mb-1" size={20} /><p className="text-xl font-bold">{userProfile.quizzes}</p><p className="text-xs text-muted">Quizzes Done</p></Card>
        <Card className="!p-4 text-center"><Flame className="mx-auto text-orange-400 mb-1" size={20} /><p className="text-xl font-bold">{userProfile.streak}</p><p className="text-xs text-muted">Day Streak</p></Card>
        <Card className="!p-4 text-center"><Award className="mx-auto text-indigo-400 mb-1" size={20} /><p className="text-xl font-bold">{userProfile.accuracy}%</p><p className="text-xs text-muted">Accuracy</p></Card>
      </div>

      {/* Achievements */}
      <Card hover={false}>
        <h3 className="font-bold mb-4 flex items-center gap-2"><Award size={18} className="text-yellow-400" />Achievements</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ACHIEVEMENTS.map((ach) => {
            const unlocked = unlockedAchievements.includes(ach.id);
            return (
              <div key={ach.id} className={`p-4 rounded-xl border text-center transition-all ${
                unlocked ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-border opacity-40'
              }`}>
                <div className="text-3xl mb-2">{ach.icon}</div>
                <p className="text-xs font-bold">{ach.name}</p>
                <p className="text-[10px] text-muted mt-0.5">{ach.description}</p>
                <Badge color="yellow" className="mt-2">{ach.xp} XP</Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Edit Profile */}
      <Card hover={false}>
        <h3 className="font-bold mb-4 flex items-center gap-2"><User size={18} className="text-primary" />Edit Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" icon={User} defaultValue={userProfile.name} />
          <Input label="Email" icon={Mail} defaultValue={userProfile.email} type="email" />
        </div>
        <div className="mt-4">
          <Button icon={Save}>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}
