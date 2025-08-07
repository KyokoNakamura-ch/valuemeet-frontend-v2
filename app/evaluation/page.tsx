'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, Calendar, Users, ChevronDown, Star } from 'lucide-react';

const pendingEvaluations = [
  {
    id: 1,
    title: '週次チーム会議',
    date: '2025-01-15',
    participants: 5,
    duration: '60分',
    type: 'regular'
  },
  {
    id: 2,
    title: 'プロジェクト進捗確認',
    date: '2025-01-15',
    participants: 8,
    duration: '90分',
    type: 'project'
  },
  {
    id: 3,
    title: '企画ブレインストーミング',
    date: '2025-01-14',
    participants: 6,
    duration: '120分',
    type: 'creative'
  }
];

const completedEvaluations = [
  {
    id: 4,
    title: '月次レビュー',
    date: '2025-01-10',
    participants: 12,
    duration: '90分',
    rating: 4.2,
    efficiency: '良好',
    satisfaction: 4.1,
    timeUtilization: 3.8,
    details: {
      agenda: ['前月の振り返り', 'KPIの確認', '今後の方針', 'リソース配分'],
      participantFeedback: [
        { name: '田中太郎', rating: 4, comment: '効率的に進行できました' },
        { name: '佐藤花子', rating: 5, comment: '議論が活発で良かったです' },
        { name: '山田一郎', rating: 3, comment: '時間がやや長く感じました' }
      ],
      outcomes: ['新規プロジェクトの承認', '予算の再配分', 'チーム体制の見直し'],
      improvements: ['資料の事前共有', '議論時間の管理', 'アクションアイテムの明確化']
    }
  },
  {
    id: 5,
    title: '四半期戦略会議',
    date: '2025-01-12',
    participants: 15,
    duration: '120分',
    rating: 4.6,
    efficiency: '優秀',
    satisfaction: 4.4,
    timeUtilization: 4.3,
    details: {
      agenda: ['Q4振り返り', 'Q1戦略立案', '競合分析', '予算計画'],
      participantFeedback: [
        { name: '鈴木次郎', rating: 5, comment: '戦略が明確になりました' },
        { name: '高橋三郎', rating: 4, comment: 'データ分析が充実していました' },
        { name: '伊藤四郎', rating: 5, comment: '建設的な議論ができました' }
      ],
      outcomes: ['Q1目標の設定', '新サービスの開発決定', 'マーケティング戦略の策定'],
      improvements: ['プレゼン時間の短縮', 'より詳細な競合分析', 'リスク評価の追加']
    }
  },
  {
    id: 6,
    title: '技術検討会議',
    date: '2025-01-08',
    participants: 7,
    duration: '75分',
    rating: 3.8,
    efficiency: '普通',
    satisfaction: 3.6,
    timeUtilization: 3.9,
    details: {
      agenda: ['新技術の導入検討', 'セキュリティ強化', 'パフォーマンス改善'],
      participantFeedback: [
        { name: '開発チームA', rating: 4, comment: '技術的な議論が深まりました' },
        { name: '開発チームB', rating: 3, comment: '実装の詳細をもう少し話したい' },
        { name: 'インフラチーム', rating: 4, comment: 'セキュリティ面で良い提案がありました' }
      ],
      outcomes: ['新フレームワークの採用', 'セキュリティポリシーの更新', 'パフォーマンス指標の設定'],
      improvements: ['技術仕様書の事前準備', 'プロトタイプの実演', 'スケジュール調整']
    }
  }
];

const getEfficiencyColor = (efficiency: string) => {
  switch (efficiency) {
    case '優秀': return 'bg-green-100 text-green-700';
    case '良好': return 'bg-blue-100 text-blue-700';
    case '普通': return 'bg-yellow-100 text-yellow-700';
    case '要改善': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${
        i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
      }`}
    />
  ));
};

export default function EvaluationPage() {
  const router = useRouter();
  const [completedEvals, setCompletedEvals] = useState(completedEvaluations);
  const [pendingEvals, setPendingEvals] = useState(pendingEvaluations);

  const handleViewDetails = (evaluation: any) => {
    router.push(`/evaluation/detail?id=${evaluation.id}`);
  };

  const handleStartEvaluation = (meeting: any) => {
    // ページ遷移で評価登録シートへ移動
    const params = new URLSearchParams({
      title: meeting.title,
      facilitator: '田中太郎'
    });
    router.push(`/evaluation/form?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">評価登録</h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="会議を検索..."
          className="pl-10 bg-white border-gray-300"
        />
      </div>

      {/* Pending Evaluations */}
      <Card className="bg-white">
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  評価待ち会議
                  <Badge className="ml-2 bg-orange-100 text-orange-700">
                    {pendingEvals.length}件
                  </Badge>
                </CardTitle>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              {pendingEvals.map((meeting) => (
                <div key={meeting.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                    <Button 
                      size="sm" 
                      className="bg-orange-600 hover:bg-orange-700"
                      onClick={() => handleStartEvaluation(meeting)}
                    >
                      評価開始
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {meeting.date}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {meeting.participants}名参加
                    </div>
                    <div>
                      ⏱️ {meeting.duration}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Completed Evaluations */}
      <Card className="bg-white">
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  評価済み会議
                  <Badge className="ml-2 bg-green-100 text-green-700">
                    {completedEvals.length}件
                  </Badge>
                </CardTitle>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              {completedEvals.map((meeting) => (
                <div key={meeting.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={getEfficiencyColor(meeting.efficiency)}>
                        {meeting.efficiency}
                      </Badge>
                      <div className="flex items-center">
                        {renderStars(meeting.rating)}
                        <span className="ml-1 text-sm font-medium text-gray-600">
                          {meeting.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">日時:</span>
                      <div className="font-medium">{meeting.date}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">参加者:</span>
                      <div className="font-medium">{meeting.participants}名</div>
                    </div>
                    <div>
                      <span className="text-gray-600">満足度:</span>
                      <div className="font-medium">{meeting.satisfaction}/5.0</div>
                    </div>
                    <div>
                      <span className="text-gray-600">時間活用:</span>
                      <div className="font-medium">{meeting.timeUtilization}/5.0</div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewDetails(meeting)}
                    >
                      詳細を見る
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}