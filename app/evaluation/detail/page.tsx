'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, CheckCircle, Target, TrendingUp, Users } from 'lucide-react';

// 評価データ（実際にはAPIから取得）
const evaluationData = {
  4: {
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
  5: {
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
  6: {
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
};

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

export default function EvaluationDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const evaluationId = searchParams.get('id');
  const [evaluation, setEvaluation] = useState<any>(null);

  useEffect(() => {
    if (evaluationId) {
      const numId = parseInt(evaluationId);
      if (evaluationData[numId as keyof typeof evaluationData]) {
        setEvaluation(evaluationData[numId as keyof typeof evaluationData]);
      }
    }
  }, [evaluationId]);

  const handleBack = () => {
    router.back();
  };

  if (!evaluation) {
    return (
      <div className="min-h-screen bg-[#FFEAE0] py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <p className="text-lg text-gray-600">評価が見つかりません</p>
            <Button onClick={handleBack} className="mt-4">
              戻る
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFEAE0] py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {evaluation.title} - 評価詳細
          </h1>
        </div>

        <div className="space-y-6">
          {/* 基本情報 */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm text-gray-600">開催日時</span>
                  <div className="font-medium">{evaluation.date}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">参加者数</span>
                  <div className="font-medium">{evaluation.participants}名</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">所要時間</span>
                  <div className="font-medium">{evaluation.duration}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">総合評価</span>
                  <div className="flex items-center">
                    {renderStars(evaluation.rating)}
                    <span className="ml-2 font-medium">{evaluation.rating}/5.0</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 評価指標 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                評価指標
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{evaluation.satisfaction}/5.0</div>
                  <div className="text-sm text-gray-600">満足度</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{evaluation.timeUtilization}/5.0</div>
                  <div className="text-sm text-gray-600">時間活用度</div>
                </div>
                <div className="text-center">
                  <Badge className={getEfficiencyColor(evaluation.efficiency)}>
                    {evaluation.efficiency}
                  </Badge>
                  <div className="text-sm text-gray-600 mt-1">効率性</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* アジェンダ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                議題・アジェンダ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {evaluation.details?.agenda.map((item: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* 参加者フィードバック */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                参加者フィードバック
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evaluation.details?.participantFeedback.map((feedback: any, index: number) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{feedback.name}</span>
                      <div className="flex items-center">
                        {renderStars(feedback.rating)}
                        <span className="ml-1 text-sm">{feedback.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{feedback.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 成果・決定事項 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                成果・決定事項
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {evaluation.details?.outcomes.map((outcome: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {outcome}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* 改善提案 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                改善提案
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {evaluation.details?.improvements.map((improvement: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {improvement}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
