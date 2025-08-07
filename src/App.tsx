import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  CheckSquare, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Plus, 
  Clock, 
  Target, 
  TrendingUp,
  User,
  Bell,
  Search,
  Filter,
  Edit3,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Star,
  ThumbsUp,
  ThumbsDown,
  FileText,
  Download,
  Share2,
  ArrowRight,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

// Color System
const colors = {
  primary: {
    50: '#FFEAE0',
    100: '#FFE0D6',
    200: '#FFCCB8',
    300: '#FFB899',
    400: '#FFA57A',
    500: '#FF925C'
  },
  secondary: {
    50: '#E0FFED',
    100: '#D6FFE8',
    200: '#B8FFCC',
    300: '#99FFB8',
    400: '#7AFFA5',
    500: '#5CFF92'
  },
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD'
  }
};

// Typography Components
const Typography = {
  H1: ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <h1 className={`text-3xl md:text-4xl font-bold text-gray-800 leading-tight ${className}`}>{children}</h1>
  ),
  H2: ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <h2 className={`text-2xl md:text-3xl font-semibold text-gray-800 leading-snug ${className}`}>{children}</h2>
  ),
  H3: ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <h3 className={`text-xl md:text-2xl font-medium text-gray-800 leading-snug ${className}`}>{children}</h3>
  ),
  Body: ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <p className={`text-base text-gray-700 leading-relaxed ${className}`}>{children}</p>
  ),
  Secondary: ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <p className={`text-sm text-gray-500 leading-relaxed ${className}`}>{children}</p>
  )
};

// Button Component
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  icon: Icon,
  onClick,
  disabled = false,
  fullWidth = false
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'small' | 'medium' | 'large';
  icon?: any;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}) => {
  const variants = {
    primary: 'bg-orange-400 hover:bg-orange-500 text-white',
    secondary: 'bg-green-200 hover:bg-green-300 text-green-800',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    warning: 'bg-amber-400 hover:bg-amber-500 text-gray-800',
    error: 'bg-red-500 hover:bg-red-600 text-white',
    info: 'bg-blue-500 hover:bg-blue-600 text-white',
    outline: 'border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white'
  };

  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-base',
    large: 'px-6 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} 
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        flex items-center justify-center gap-2 rounded-lg font-medium
        transition-all duration-200 ease-in-out
        transform hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-sm hover:shadow-md
      `}
    >
      {Icon && <Icon size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />}
      {children}
    </button>
  );
};

// Card Component
const Card = ({ children, className = '', onClick }: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) => (
  <div 
    className={`
      bg-white rounded-2xl shadow-sm hover:shadow-md
      transition-all duration-300 ease-in-out
      border border-orange-100
      ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}
      ${className}
    `}
    onClick={onClick}
  >
    {children}
  </div>
);

// Status Badge Component
const StatusBadge = ({ 
  status, 
  children 
}: { 
  status: 'success' | 'warning' | 'error' | 'info' | 'pending'; 
  children: React.ReactNode 
}) => {
  const statusConfig = {
    success: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
    warning: { bg: 'bg-amber-100', text: 'text-amber-800', icon: AlertCircle },
    error: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle },
    info: { bg: 'bg-blue-100', text: 'text-blue-800', icon: AlertCircle },
    pending: { bg: 'bg-gray-100', text: 'text-gray-800', icon: Clock }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`
      ${config.bg} ${config.text}
      inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium
    `}>
      <Icon size={14} />
      {children}
    </span>
  );
};

// Meeting Rating Component
const MeetingRating = ({ rating }: { rating: number }) => {
  const emojis = ['😞', '😕', '😐', '😊', '😍'];
  const emoji = emojis[Math.max(0, Math.min(4, Math.floor(rating) - 1))];
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl">{emoji}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating 
                ? 'fill-amber-400 text-amber-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <Typography.Secondary>{rating}/5</Typography.Secondary>
    </div>
  );
};

// Navigation Component
const Navigation = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}) => {
  const navItems = [
    { id: 'dashboard', label: 'ダッシュボード', icon: BarChart3 },
    { id: 'meetings', label: '会議管理', icon: Calendar },
    { id: 'facilitation', label: 'ファシリテーション', icon: MessageSquare },
    { id: 'todos', label: 'ToDo管理', icon: CheckSquare },
    { id: 'analytics', label: '分析', icon: TrendingUp }
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-orange-400" size={28} />
            <Typography.H3 className="text-orange-600">ValueMeet</Typography.H3>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                    ${activeTab === item.id 
                      ? 'bg-orange-100 text-orange-600' 
                      : 'text-gray-600 hover:text-orange-600'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="flex items-center gap-4">
            <Bell className="text-gray-500 hover:text-orange-400 cursor-pointer transition-colors" size={20} />
            <Settings className="text-gray-500 hover:text-orange-400 cursor-pointer transition-colors" size={20} />
            <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
              <User size={16} className="text-orange-600" />
            </div>
            <button
              className="md:hidden text-gray-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-orange-100">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                    ${activeTab === item.id 
                      ? 'bg-orange-100 text-orange-600' 
                      : 'text-gray-600 hover:text-orange-600'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

// Dashboard Component
const Dashboard = () => {
  const upcomingMeetings = [
    { id: 1, title: 'システム設計レビュー', time: '10:00-11:00', participants: 8, status: 'pending' },
    { id: 2, title: 'プロジェクト進捗確認', time: '14:00-15:00', participants: 5, status: 'pending' },
    { id: 3, title: 'セキュリティ対策会議', time: '16:00-17:00', participants: 12, status: 'pending' }
  ];

  const recentMeetings = [
    { id: 1, title: 'API設計会議', date: '2024-01-15', rating: 4, efficiency: 85 },
    { id: 2, title: 'UI/UXレビュー', date: '2024-01-14', rating: 5, efficiency: 92 },
    { id: 3, title: '週次進捗会議', date: '2024-01-12', rating: 3, efficiency: 68 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Typography.Secondary>今月の会議数</Typography.Secondary>
              <Typography.H2 className="text-orange-600">24</Typography.H2>
            </div>
            <Calendar className="text-orange-400" size={32} />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Typography.Secondary>平均効率性</Typography.Secondary>
              <Typography.H2 className="text-green-600">82%</Typography.H2>
            </div>
            <TrendingUp className="text-green-400" size={32} />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Typography.Secondary>時間削減</Typography.Secondary>
              <Typography.H2 className="text-blue-600">15h</Typography.H2>
            </div>
            <Clock className="text-blue-400" size={32} />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Typography.Secondary>満足度</Typography.Secondary>
              <Typography.H2 className="text-purple-600">4.2</Typography.H2>
            </div>
            <Star className="text-purple-400" size={32} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meetings */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Typography.H3>今日の会議</Typography.H3>
            <Button variant="outline" size="small" icon={Plus}>
              新規作成
            </Button>
          </div>
          <div className="space-y-3">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex-1">
                  <Typography.Body className="font-medium">{meeting.title}</Typography.Body>
                  <div className="flex items-center gap-4 mt-1">
                    <Typography.Secondary className="flex items-center gap-1">
                      <Clock size={14} />
                      {meeting.time}
                    </Typography.Secondary>
                    <Typography.Secondary className="flex items-center gap-1">
                      <Users size={14} />
                      {meeting.participants}名
                    </Typography.Secondary>
                  </div>
                </div>
                <StatusBadge status="pending">準備中</StatusBadge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Meeting Performance */}
        <Card className="p-6">
          <Typography.H3 className="mb-4">最近の会議評価</Typography.H3>
          <div className="space-y-4">
            {recentMeetings.map((meeting) => (
              <div key={meeting.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Typography.Body className="font-medium">{meeting.title}</Typography.Body>
                  <Typography.Secondary>{meeting.date}</Typography.Secondary>
                </div>
                <div className="flex items-center justify-between">
                  <MeetingRating rating={meeting.rating} />
                  <div className="text-right">
                    <Typography.Secondary>効率性</Typography.Secondary>
                    <Typography.Body className="font-semibold text-green-600">
                      {meeting.efficiency}%
                    </Typography.Body>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// Meeting Management Component
const MeetingManagement = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  
  const meetings = [
    {
      id: 1,
      title: 'システム設計レビュー',
      date: '2024-01-16',
      time: '10:00-11:00',
      organizer: '田中太郎',
      participants: ['佐藤花子', '山田次郎', '鈴木一郎'],
      agenda: ['設計書レビュー', 'セキュリティ要件確認', '次回スケジュール'],
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'プロジェクト進捗確認',
      date: '2024-01-16',
      time: '14:00-15:00',
      organizer: '佐藤花子',
      participants: ['田中太郎', '山田次郎'],
      agenda: ['進捗報告', '課題共有', 'リソース調整'],
      status: 'scheduled'
    }
  ];

  if (selectedMeeting) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedMeeting(null)}>
            ← 戻る
          </Button>
          <Typography.H2>会議詳細</Typography.H2>
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Typography.H3 className="mb-2">{selectedMeeting.title}</Typography.H3>
                <div className="space-y-2">
                  <Typography.Body className="flex items-center gap-2">
                    <Calendar size={16} />
                    {selectedMeeting.date} {selectedMeeting.time}
                  </Typography.Body>
                  <Typography.Body className="flex items-center gap-2">
                    <User size={16} />
                    主催者: {selectedMeeting.organizer}
                  </Typography.Body>
                  <Typography.Body className="flex items-center gap-2">
                    <Users size={16} />
                    参加者: {selectedMeeting.participants.length + 1}名
                  </Typography.Body>
                </div>
              </div>

              <div>
                <Typography.H3 className="mb-2">参加者</Typography.H3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                    <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <div>
                      <Typography.Body className="font-medium">{selectedMeeting.organizer}</Typography.Body>
                      <Typography.Secondary>主催者</Typography.Secondary>
                    </div>
                  </div>
                  {selectedMeeting.participants.map((participant: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User size={16} />
                      </div>
                      <Typography.Body>{participant}</Typography.Body>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Typography.H3 className="mb-2">アジェンダ</Typography.H3>
                <div className="space-y-2">
                  {selectedMeeting.agenda.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 border border-gray-200 rounded">
                      <CheckSquare size={16} className="text-gray-400" />
                      <Typography.Body>{item}</Typography.Body>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="primary" fullWidth icon={Play}>
                  会議を開始
                </Button>
                <Button variant="outline" fullWidth icon={Edit3}>
                  編集
                </Button>
                <Button variant="secondary" fullWidth icon={Share2}>
                  共有
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Typography.H2>会議管理</Typography.H2>
        <Button variant="primary" icon={Plus}>
          新しい会議を作成
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="会議を検索..."
              className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>
        <Button variant="outline" icon={Filter}>
          フィルター
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {meetings.map((meeting) => (
          <Card 
            key={meeting.id} 
            className="p-6 cursor-pointer"
            onClick={() => setSelectedMeeting(meeting)}
          >
            <div className="flex items-start justify-between mb-3">
              <Typography.H3 className="flex-1">{meeting.title}</Typography.H3>
              <StatusBadge status="pending">予定</StatusBadge>
            </div>
            
            <div className="space-y-2 mb-4">
              <Typography.Body className="flex items-center gap-2">
                <Calendar size={16} />
                {meeting.date} {meeting.time}
              </Typography.Body>
              <Typography.Body className="flex items-center gap-2">
                <User size={16} />
                {meeting.organizer}
              </Typography.Body>
              <Typography.Body className="flex items-center gap-2">
                <Users size={16} />
                {meeting.participants.length + 1}名参加
              </Typography.Body>
            </div>

            <div className="flex items-center justify-between">
              <Typography.Secondary>
                アジェンダ {meeting.agenda.length}項目
              </Typography.Secondary>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Facilitation Component
const Facilitation = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentAgenda, setCurrentAgenda] = useState(0);
  
  const agendaItems = [
    { title: '設計書レビュー', duration: 20, status: 'completed' },
    { title: 'セキュリティ要件確認', duration: 15, status: 'active' },
    { title: '次回スケジュール', duration: 10, status: 'pending' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Typography.H2>ファシリテーション</Typography.H2>
        <div className="flex gap-2">
          <Button 
            variant={isActive ? "error" : "success"} 
            icon={isActive ? Pause : Play}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? '一時停止' : '開始'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Agenda */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <Typography.H3 className="mb-4">現在のアジェンダ</Typography.H3>
            <div className="space-y-3">
              {agendaItems.map((item, index) => (
                <div 
                  key={index}
                  className={`
                    p-4 rounded-lg border-2 transition-all
                    ${item.status === 'active' ? 'border-orange-400 bg-orange-50' : 
                      item.status === 'completed' ? 'border-green-400 bg-green-50' : 
                      'border-gray-200 bg-gray-50'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <Typography.Body className="font-medium">{item.title}</Typography.Body>
                    <div className="flex items-center gap-2">
                      <Typography.Secondary>{item.duration}分</Typography.Secondary>
                      {item.status === 'completed' && <CheckCircle size={16} className="text-green-500" />}
                      {item.status === 'active' && <Play size={16} className="text-orange-500" />}
                      {item.status === 'pending' && <Clock size={16} className="text-gray-400" />}
                    </div>
                  </div>
                  
                  {item.status === 'active' && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <Typography.Secondary className="mt-1">残り 6分</Typography.Secondary>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Facilitation Tools */}
        <div className="space-y-4">
          <Card className="p-4">
            <Typography.H3 className="mb-3">ファシリテーションツール</Typography.H3>
            <div className="space-y-2">
              <Button variant="outline" fullWidth icon={MessageSquare}>
                発言を促す
              </Button>
              <Button variant="outline" fullWidth icon={Target}>
                論点整理
              </Button>
              <Button variant="outline" fullWidth icon={CheckSquare}>
                決定事項記録
              </Button>
              <Button variant="outline" fullWidth icon={Clock}>
                時間管理
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <Typography.H3 className="mb-3">参加者エンゲージメント</Typography.H3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Typography.Body>田中太郎</Typography.Body>
                <div className="flex gap-1">
                  <ThumbsUp size={16} className="text-green-500" />
                  <span className="text-sm">5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Typography.Body>佐藤花子</Typography.Body>
                <div className="flex gap-1">
                  <ThumbsUp size={16} className="text-green-500" />
                  <span className="text-sm">3</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Typography.Body>山田次郎</Typography.Body>
                <div className="flex gap-1">
                  <ThumbsUp size={16} className="text-green-500" />
                  <span className="text-sm">2</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Real-time Notes */}
      <Card className="p-6">
        <Typography.H3 className="mb-4">リアルタイム議事録</Typography.H3>
        <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Typography.Secondary className="text-xs">10:15</Typography.Secondary>
              <Typography.Body>設計書の全体構成について確認完了</Typography.Body>
            </div>
            <div className="flex gap-2">
              <Typography.Secondary className="text-xs">10:18</Typography.Secondary>
              <Typography.Body>セキュリティ要件の詳細検討開始</Typography.Body>
            </div>
            <div className="flex gap-2">
              <Typography.Secondary className="text-xs">10:22</Typography.Secondary>
              <Typography.Body>認証方式についてさらなる検討が必要 - 田中さんが次回までに調査</Typography.Body>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" icon={Download}>
            エクスポート
          </Button>
          <Button variant="outline" icon={Share2}>
            共有
          </Button>
        </div>
      </Card>
    </div>
  );
};

// Todo Management Component
const TodoManagement = () => {
  const todos = [
    {
      id: 1,
      title: '認証方式の調査',
      assignee: '田中太郎',
      dueDate: '2024-01-20',
      priority: 'high',
      status: 'pending',
      meetingTitle: 'システム設計レビュー'
    },
    {
      id: 2,
      title: 'UI/UXデザインの修正',
      assignee: '佐藤花子',
      dueDate: '2024-01-18',
      priority: 'medium',
      status: 'in-progress',
      meetingTitle: 'UI/UXレビュー'
    },
    {
      id: 3,
      title: 'テストケースの作成',
      assignee: '山田次郎',
      dueDate: '2024-01-22',
      priority: 'low',
      status: 'completed',
      meetingTitle: '週次進捗会議'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-amber-600 bg-amber-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      case 'pending': return 'warning';
      default: return 'pending';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Typography.H2>ToDo管理</Typography.H2>
        <Button variant="primary" icon={Plus}>
          新しいToDoを追加
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="ToDoを検索..."
              className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>
        <Button variant="outline" icon={Filter}>
          フィルター
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {todos.map((todo) => (
          <Card key={todo.id} className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Typography.H3 className="flex-1">{todo.title}</Typography.H3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                    {todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低'}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <Typography.Body className="flex items-center gap-2">
                    <User size={16} />
                    担当者: {todo.assignee}
                  </Typography.Body>
                  <Typography.Body className="flex items-center gap-2">
                    <Calendar size={16} />
                    期限: {todo.dueDate}
                  </Typography.Body>
                  <Typography.Secondary className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    関連会議: {todo.meetingTitle}
                  </Typography.Secondary>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <StatusBadge status={getStatusColor(todo.status) as any}>
                  {todo.status === 'completed' ? '完了' : 
                   todo.status === 'in-progress' ? '進行中' : '未着手'}
                </StatusBadge>
                <Button variant="outline" size="small" icon={Edit3}>
                  編集
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Analytics Component
const Analytics = () => {
  return (
    <div className="space-y-6">
      <Typography.H2>分析・レポート</Typography.H2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <Typography.H3 className="mb-4">会議効率性の推移</Typography.H3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <Typography.Secondary>グラフエリア（実装時にChart.jsなどを使用）</Typography.Secondary>
          </div>
        </Card>
        
        <Card className="p-6">
          <Typography.H3 className="mb-4">参加者満足度</Typography.H3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <Typography.Secondary>満足度チャート</Typography.Secondary>
          </div>
        </Card>
        
        <Card className="p-6">
          <Typography.H3 className="mb-4">時間削減効果</Typography.H3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Typography.Body>今月の削減時間</Typography.Body>
              <Typography.H3 className="text-green-600">15時間</Typography.H3>
            </div>
            <div className="flex justify-between items-center">
              <Typography.Body>前月比</Typography.Body>
              <Typography.Body className="text-green-600">+20%</Typography.Body>
            </div>
            <div className="flex justify-between items-center">
              <Typography.Body>年間予想削減時間</Typography.Body>
              <Typography.H3 className="text-blue-600">180時間</Typography.H3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <Typography.H3 className="mb-4">組織文化指標</Typography.H3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Typography.Body>発言参加率</Typography.Body>
              <Typography.Body className="font-semibold">85%</Typography.Body>
            </div>
            <div className="flex justify-between items-center">
              <Typography.Body>意思決定速度</Typography.Body>
              <Typography.Body className="font-semibold">+30%</Typography.Body>
            </div>
            <div className="flex justify-between items-center">
              <Typography.Body>ナレッジ共有率</Typography.Body>
              <Typography.Body className="font-semibold">92%</Typography.Body>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'meetings':
        return <MeetingManagement />;
      case 'facilitation':
        return <Facilitation />;
      case 'todos':
        return <TodoManagement />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;