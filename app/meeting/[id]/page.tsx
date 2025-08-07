'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Play, 
  Pause,
  Star, 
  Download, 
  FileText, 
  MessageSquare, 
  Target, 
  Clock, 
  Users 
} from 'lucide-react';


// UIコンポーネントのインポートを追加
type ButtonVariant = 'default' | 'outline' | 'ghost';
type ButtonSize = 'default' | 'sm';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
}

const Button = ({ children, onClick, variant = 'default', size = 'default', className = '', disabled = false, ...props }: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants: Record<ButtonVariant, string> = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };
  const sizes: Record<ButtonSize, string> = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md',
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', ...props }: any) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }: any) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }: any) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '', ...props }: any) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, className = '', ...props }: any) => (
  <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`} {...props}>
    {children}
  </div>
);


// 会議のダミーデータ
const getMeetingById = (id: string) => {
  const meetings = [
    {
      id: '1',
      title: '週次チーム会議',
      date: '2025-01-15',
      time: '10:00-11:00',
      participants: 5,
      status: 'scheduled',
      location: '会議室A',
      agenda: [
        '前週の振り返り',
        '今週の目標設定',
        'プロジェクト進捗確認',
        '課題・問題点の共有',
        '来週のスケジュール確認'
      ],
      facilitator: '田中太郎'
    },
    {
      id: '2',
      title: 'プロジェクト進捗確認',
      date: '2025-01-15',
      time: '14:00-15:30',
      participants: 8,
      status: 'scheduled',
      location: 'オンライン',
      agenda: [
        'プロジェクト全体の進捗報告',
        '各チームの状況共有',
        'リスク・課題の洗い出し',
        '次フェーズの計画確認',
        'リソース配分の検討'
      ],
      facilitator: '佐藤花子'
    }
  ];
  return meetings.find(m => m.id === id);
};

const mockMinutes = [
  { time: '10:02', speaker: '田中太郎', content: '皆さん、おはようございます。週次チーム会議を開始します。' },
  { time: '10:03', speaker: '佐藤花子', content: '前週の売上目標は達成できました。特にオンライン販売が好調でした。' },
  { time: '10:05', speaker: '山田一郎', content: 'システム改修の件ですが、予定より2日遅れています。リソースの追加が必要かもしれません。' },
  { time: '10:07', speaker: '田中太郎', content: 'リソース追加について、具体的にはどのような支援が必要でしょうか？' },
  { time: '10:09', speaker: '高橋三郎', content: 'マーケティング施策の効果測定結果をまとめました。来週共有します。' }
];

export default function MeetingFacilitation() {
  const params = useParams();
  const router = useRouter();
  const [meeting, setMeeting] = useState<any>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [minutes, setMinutes] = useState(mockMinutes);
  const [currentAgenda, setCurrentAgenda] = useState(0);

  useEffect(() => {
    const meetingData = getMeetingById(params.id as string);
    setMeeting(meetingData);
  }, [params.id]);

  if (!meeting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">会議が見つかりません</h2>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
        </div>
      </div>
    );
  }

  const handleStartMeeting = () => {
    if (!isStarted) {
      // 初回開始
      setIsStarted(true);
      setIsPaused(false);
    } else {
      // 開始後は停止/再開を切り替え
      setIsPaused(!isPaused);
    }
  };

  const handleOpenEvaluation = () => {
    router.push(`/evaluation/form?title=${encodeURIComponent(meeting.title)}&facilitator=${encodeURIComponent(meeting.facilitator)}`);
  };

  const handleOpenTodoExtraction = () => {
    router.push('/todo-extraction');
  };

  const handleFacilitationAction = (action: string) => {
    const newMinute = {
      time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      speaker: 'ファシリテーター',
      content: `${action}を実行しました。`
    };
    setMinutes(prev => [...prev, newMinute]);
  };

  const handleExport = (format: 'pdf' | 'txt') => {
    // Mock export functionality
    const content = minutes.map(m => `[${m.time}] ${m.speaker}: ${m.content}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${meeting.title}_議事録.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{meeting.title}</h1>
            <p className="text-gray-600">{meeting.date} {meeting.time} | {meeting.location}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            onClick={handleStartMeeting}
            className={`${
              !isStarted 
                ? 'bg-orange-600 hover:bg-orange-700' 
                : isPaused 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {!isStarted ? (
              <>
                <Play className="h-4 w-4 mr-2" />
                開始
              </>
            ) : isPaused ? (
              <>
                <Play className="h-4 w-4 mr-2" />
                再開
              </>
            ) : (
              <>
                <Pause className="h-4 w-4 mr-2" />
                停止
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleOpenEvaluation}>
            <Star className="h-4 w-4 mr-2" />
            評価
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Top Row - Agenda and Facilitation Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Agenda */}
          <Card className="bg-white h-fit">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">アジェンダ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {meeting.agenda.map((item: string, index: number) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                    index === currentAgenda 
                      ? 'bg-orange-50 border-orange-200' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentAgenda(index)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{item}</span>
                    {index === currentAgenda && (
                      <Badge className="bg-orange-600 text-white">進行中</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Right Column - Facilitation Tools */}
          <Card className="bg-white h-fit">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">ファシリテーションツール</CardTitle>
              <p className="text-sm text-gray-600">会議進行をサポートするツールです</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => handleFacilitationAction('発言を促す')}
                className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
                variant="outline"
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">発言を促す</div>
                  <div className="text-xs text-blue-600">参加者の意見を引き出します</div>
                </div>
              </Button>

              <Button 
                onClick={() => handleFacilitationAction('論点整理')}
                className="w-full justify-start bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
                variant="outline"
              >
                <Target className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">論点整理</div>
                  <div className="text-xs text-green-600">議論の要点をまとめます</div>
                </div>
              </Button>

              <Button 
                onClick={() => handleFacilitationAction('決定事項記録')}
                className="w-full justify-start bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200"
                variant="outline"
              >
                <FileText className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">決定事項記録</div>
                  <div className="text-xs text-purple-600">重要な決定を記録します</div>
                </div>
              </Button>

              <Button 
                onClick={() => handleFacilitationAction('時間管理')}
                className="w-full justify-start bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200"
                variant="outline"
              >
                <Clock className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">時間管理</div>
                  <div className="text-xs text-orange-600">時間配分を調整します</div>
                </div>
              </Button>

              {/* Meeting Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">会議情報</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    参加者: {meeting.participants}名
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    時間: {meeting.time}
                  </div>
                  <div>
                    <span className="font-medium">ファシリテーター:</span> {meeting.facilitator}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row - Real-time Minutes (Full Width) */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">リアルタイム議事録</CardTitle>
            <div className="flex items-center space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleExport('pdf')}
              >
                <Download className="h-4 w-4 mr-1" />
                PDF
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleExport('txt')}
              >
                <FileText className="h-4 w-4 mr-1" />
                TXT
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleOpenTodoExtraction}>
                抽出
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {minutes.map((minute, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <span className="text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded">
                      {minute.time}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900 mb-1">
                        {minute.speaker}
                      </div>
                      <div className="text-sm text-gray-700">
                        {minute.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}