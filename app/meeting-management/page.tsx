'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { Search, Filter, Plus, Calendar, Users, Clock, Check } from 'lucide-react';

const initialMeetings = [
  {
    id: 1,
    title: '週次チーム会議',
    date: '2025-01-15',
    time: '10:00-11:00',
    participants: 5,
    status: 'scheduled',
    location: '会議室A',
    agenda: ['前週の振り返り', '今週の目標設定', 'プロジェクト進捗確認'],
    facilitator: '田中太郎'
  },
  {
    id: 2,
    title: 'プロジェクト進捗確認',
    date: '2025-01-15', 
    time: '14:00-15:30',
    participants: 8,
    status: 'scheduled',
    location: 'オンライン',
    agenda: ['プロジェクト全体の進捗報告', '各チームの状況共有'],
    facilitator: '佐藤花子'
  },
  {
    id: 3,
    title: '月次レビュー',
    date: '2025-01-16',
    time: '16:00-17:00',
    participants: 12,
    status: 'scheduled',
    location: '大会議室',
    agenda: ['月次売上報告', '課題の振り返り'],
    facilitator: '鈴木一郎'
  },
  {
    id: 4,
    title: '企画ブレインストーミング',
    date: '2025-01-17',
    time: '13:00-14:30',
    participants: 6,
    status: 'draft',
    location: '会議室B',
    agenda: ['新商品企画', 'アイデア出し'],
    facilitator: '高橋美咲'
  },
  {
    id: 5,
    title: 'クライアント打ち合わせ',
    date: '2025-01-18',
    time: '15:00-16:00',
    participants: 4,
    status: 'scheduled',
    location: 'オンライン',
    agenda: ['要件確認', 'スケジュール調整'],
    facilitator: '山田次郎'
  },
  {
    id: 6,
    title: '四半期戦略会議',
    date: '2025-01-20',
    time: '09:00-12:00',
    participants: 15,
    status: 'draft',
    location: '大会議室',
    agenda: ['四半期レビュー', '次期戦略立案'],
    facilitator: '佐藤花子'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled': return 'bg-green-100 text-green-700';
    case 'draft': return 'bg-yellow-100 text-yellow-700';
    case 'completed': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'scheduled': return '予定';
    case 'draft': return '下書き';
    case 'completed': return '完了';
    default: return '不明';
  }
};

export default function MeetingManagement() {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [filteredMeetings, setFilteredMeetings] = useState(initialMeetings);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const router = useRouter();

  // 初期化時にソートを適用
  useEffect(() => {
    applyFiltersAndSort(meetings, searchQuery, sortBy);
  }, []);

  const handleEditMeeting = (meeting: any) => {
    router.push(`/edit-meeting?id=${meeting.id}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFiltersAndSort(meetings, query, sortBy);
  };

  const handleSort = (sortOption: string) => {
    setSortBy(sortOption);
    applyFiltersAndSort(meetings, searchQuery, sortOption);
  };

  const applyFiltersAndSort = (meetingList: any[], query: string, sortOption: string) => {
    let filtered = meetingList;

    // Search filter
    if (query) {
      filtered = filtered.filter(meeting => 
        meeting.title.toLowerCase().includes(query.toLowerCase()) ||
        meeting.location.toLowerCase().includes(query.toLowerCase()) ||
        (meeting.facilitator && meeting.facilitator.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'status':
          return a.status.localeCompare(b.status);
        case 'facilitator':
          return (a.facilitator || '').localeCompare(b.facilitator || '');
        default:
          return 0;
      }
    });

    setFilteredMeetings(filtered);
  };

  const handleViewDetails = (meetingId: number) => {
    router.push(`/meeting/${meetingId}`);
  };

  const handleCreateMeeting = () => {
    router.push('/create-meeting');
  };

  const handleCreateMeetingData = (meetingData: any) => {
    const newMeeting = {
      id: meetings.length + 1,
      title: meetingData.title,
      date: meetingData.date,
      time: `${meetingData.startTime}-${meetingData.endTime}`,
      participants: meetingData.participantCount || 1,
      status: meetingData.status || 'draft',
      location: meetingData.location,
      agenda: meetingData.agenda || [],
      facilitator: meetingData.facilitator || ''
    };
    const updatedMeetings = [newMeeting, ...meetings];
    setMeetings(updatedMeetings);
    applyFiltersAndSort(updatedMeetings, searchQuery, sortBy);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">会議管理</h1>
        <Button 
          className="bg-orange-600 hover:bg-orange-700"
          onClick={handleCreateMeeting}
        >
          <Plus className="h-4 w-4 mr-2" />
          新しい会議の作成
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="会議を検索..."
            className="pl-10 bg-white border-gray-300"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Select value={sortBy} onValueChange={handleSort}>
          <SelectTrigger className="w-48 border-gray-300 bg-white flex-shrink-0">
            <Filter className="h-4 w-4 mr-2 flex-shrink-0" />
            <SelectValue placeholder="並び順を選択" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            <SelectItem 
              value="date" 
              className={`hover:bg-gray-50 ${sortBy === 'date' ? 'bg-orange-50' : ''}`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-gray-900">日付順</span>
                {sortBy === 'date' && (
                  <Check className="h-4 w-4 text-orange-600 ml-2" />
                )}
              </div>
            </SelectItem>
            <SelectItem 
              value="status" 
              className={`hover:bg-gray-50 ${sortBy === 'status' ? 'bg-orange-50' : ''}`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-gray-900">ステータス順</span>
                {sortBy === 'status' && (
                  <Check className="h-4 w-4 text-orange-600 ml-2" />
                )}
              </div>
            </SelectItem>
            <SelectItem 
              value="facilitator" 
              className={`hover:bg-gray-50 ${sortBy === 'facilitator' ? 'bg-orange-50' : ''}`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-gray-900">ファシリテーター順</span>
                {sortBy === 'facilitator' && (
                  <Check className="h-4 w-4 text-orange-600 ml-2" />
                )}
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMeetings.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">会議が見つかりません</p>
              <p className="text-sm mt-1">
                {searchQuery ? '検索条件を変更してください' : '新しい会議を作成してください'}
              </p>
            </div>
          </div>
        ) : (
          filteredMeetings.map((meeting) => (
            <Card key={meeting.id} className="bg-white hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {meeting.title}
                  </CardTitle>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(meeting.status)}`}>
                    {getStatusText(meeting.status)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {meeting.date}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {meeting.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {meeting.participants}名参加予定
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 mr-2 flex items-center justify-center">
                    📍
                  </div>
                  {meeting.location}
                </div>
                {meeting.facilitator && (
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-4 h-4 mr-2 flex items-center justify-center">
                      👤
                    </div>
                    ファシリテーター: {meeting.facilitator}
                  </div>
                )}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleEditMeeting(meeting)}
                    >
                      編集
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewDetails(meeting.id)}
                    >
                      詳細
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}