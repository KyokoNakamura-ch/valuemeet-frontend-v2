'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, TrendingUp, Plus } from 'lucide-react';

const statsCards = [
  { title: '今月の会議数', value: '24', icon: Calendar, color: 'text-blue-600' },
  { title: '平均効率性', value: '87%', icon: TrendingUp, color: 'text-green-600' },
  { title: '時間削減', value: '12h', icon: Clock, color: 'text-purple-600' },
  { title: '満足度', value: '4.2', icon: Users, color: 'text-orange-600' },
];

const todayMeetings = [
  { title: '週次チーム会議', time: '10:00-11:00', participants: 5, status: 'upcoming' },
  { title: 'プロジェクト進捗確認', time: '14:00-15:30', participants: 8, status: 'upcoming' },
  { title: '月次レビュー', time: '16:00-17:00', participants: 12, status: 'upcoming' },
];

const recentEvaluations = [
  { title: '企画会議', date: '2025-01-09', rating: 4.5, efficiency: '良好' },
  { title: 'チーム会議', date: '2025-01-08', rating: 3.8, efficiency: '普通' },
  { title: '進捗報告会', date: '2025-01-08', rating: 4.2, efficiency: '良好' },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Meetings */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">今日の会議</CardTitle>
            <Button 
              size="sm" 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => router.push('/create-meeting')}
            >
              <Plus className="h-4 w-4 mr-2" />
              新規作成
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayMeetings.map((meeting, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                  <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">
                    {meeting.status === 'upcoming' ? '予定' : '完了'}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {meeting.time}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {meeting.participants}名
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Evaluations */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">最近の会議評価</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEvaluations.map((evaluation, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{evaluation.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-yellow-600">★ {evaluation.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{evaluation.date}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    evaluation.efficiency === '良好' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {evaluation.efficiency}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}