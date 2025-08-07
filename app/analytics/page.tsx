import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Clock, Target } from 'lucide-react';

const analyticsData = {
  efficiency: {
    current: 87,
    trend: '+5.2%',
    data: [75, 78, 82, 85, 87]
  },
  satisfaction: {
    current: 4.2,
    trend: '+0.3',
    data: [3.8, 3.9, 4.0, 4.1, 4.2]
  },
  timeSaved: {
    total: '24h',
    monthly: '12h',
    trend: '+15%'
  },
  culture: {
    participation: 92,
    engagement: 88,
    collaboration: 85,
    feedback: 90
  }
};

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">分析・レポート</h1>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meeting Efficiency Trend */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              会議効率性の推移
            </CardTitle>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{analyticsData.efficiency.current}%</div>
              <div className="text-sm text-green-600">{analyticsData.efficiency.trend}</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-32 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end justify-between p-4">
                {analyticsData.efficiency.data.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-blue-600 rounded-t"
                      style={{ height: `${(value / 100) * 80}px` }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-1">{value}%</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">平均効率性</div>
                  <div className="font-semibold">82%</div>
                </div>
                <div>
                  <div className="text-gray-600">最高記録</div>
                  <div className="font-semibold">95%</div>
                </div>
                <div>
                  <div className="text-gray-600">改善率</div>
                  <div className="font-semibold text-green-600">+16%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participant Satisfaction */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              参加者満足度の推移
            </CardTitle>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{analyticsData.satisfaction.current}</div>
              <div className="text-sm text-green-600">{analyticsData.satisfaction.trend}</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-32 bg-gradient-to-r from-green-50 to-green-100 rounded-lg flex items-end justify-between p-4">
                {analyticsData.satisfaction.data.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-green-600 rounded-t"
                      style={{ height: `${(value / 5) * 80}px` }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-1">{value}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">平均満足度</div>
                  <div className="font-semibold">4.0</div>
                </div>
                <div>
                  <div className="text-gray-600">参加率</div>
                  <div className="font-semibold">92%</div>
                </div>
                <div>
                  <div className="text-gray-600">リピート率</div>
                  <div className="font-semibold">88%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Reduction Effect */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-purple-600" />
              時間削減効果のまとめ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{analyticsData.timeSaved.total}</div>
                <div className="text-gray-600">今月の削減時間</div>
                <div className="text-sm text-green-600 font-medium">{analyticsData.timeSaved.trend} 前月比</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-bold text-purple-700">156h</div>
                  <div className="text-sm text-gray-600">累計削減時間</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-bold text-purple-700">¥780K</div>
                  <div className="text-sm text-gray-600">コスト削減効果</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>会議時間短縮</span>
                  <span className="font-semibold">18h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>準備時間削減</span>
                  <span className="font-semibold">6h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>フォローアップ効率化</span>
                  <span className="font-semibold">4h</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Organizational Culture Indicators */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Target className="h-5 w-5 mr-2 text-orange-600" />
              組織文化指標のまとめ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">参加積極性</span>
                  <span className="font-semibold">{analyticsData.culture.participation}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full" 
                    style={{ width: `${analyticsData.culture.participation}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">エンゲージメント</span>
                  <span className="font-semibold">{analyticsData.culture.engagement}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full" 
                    style={{ width: `${analyticsData.culture.engagement}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">コラボレーション</span>
                  <span className="font-semibold">{analyticsData.culture.collaboration}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full" 
                    style={{ width: `${analyticsData.culture.collaboration}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">フィードバック品質</span>
                  <span className="font-semibold">{analyticsData.culture.feedback}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full" 
                    style={{ width: `${analyticsData.culture.feedback}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}