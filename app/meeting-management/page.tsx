'use client';
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { Search, Filter, Plus, Calendar, Users, Clock, MapPin, User } from 'lucide-react';

// 型定義を追加
interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  participants: number;
  status: 'scheduled' | 'draft' | 'completed';
  location: string;
  agenda: string[];
  facilitator: string;
}

interface UserProfile {
  user_id: string;
  organization_id: number;
}

interface ApiMeetingItem {
  meeting_id: number;
  title: string;
  date_time: string;
  participants?: number;
  status?: string;
  meeting_mode: string;
  agenda?: string[];
  name?: string;
}

// APIエンドポイントを定義
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// ユーティリティ関数
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'scheduled': return 'bg-green-100 text-green-700';
    case 'draft': return 'bg-yellow-100 text-yellow-700';
    case 'completed': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getStatusText = (status: string): string => {
  switch (status) {
    case 'scheduled': return '予定';
    case 'draft': return '下書き';
    case 'completed': return '完了';
    default: return '不明';
  }
};

// カスタムフック：API呼び出し
const useApi = () => {
  const fetchUserProfile = useCallback(async (userId: string): Promise<UserProfile> => {
    const response = await fetch(`${API_BASE_URL}/usr_profile?user_id=${userId}`);
    if (!response.ok) {
      throw new Error(`ユーザープロファイル取得失敗: ${response.status}`);
    }
    return response.json();
  }, []);

  const fetchMeetings = useCallback(async (userId: string): Promise<ApiMeetingItem[]> => {
    const params = new URLSearchParams({ user_id: userId });
    const response = await fetch(`${API_BASE_URL}/meeting_list?${params}`);
    if (!response.ok) {
      throw new Error(`会議一覧取得失敗: ${response.status}`);
    }
    return response.json();
  }, []);

  return { fetchUserProfile, fetchMeetings };
};

export default function MeetingManagement() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [orgId, setOrgId] = useState<number | null>(null);
  
  const router = useRouter();
  const { fetchUserProfile, fetchMeetings } = useApi();

  // APIデータのマッピング関数
  const mapApiDataToMeeting = (item: ApiMeetingItem): Meeting => ({
    id: item.meeting_id,
    title: item.title,
    date: item.date_time?.split('T')[0] || '',
    time: item.date_time?.split('T')[1]?.substring(0, 5) || '',
    participants: item.participants || 1,
    status: (item.status || 'scheduled') as Meeting['status'],
    location: item.meeting_mode,
    agenda: item.agenda || [],
    facilitator: item.name || ''
  });

  // データ取得の初期化
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 固定のユーザーID（実際のアプリでは認証から取得）
        const currentUserId = "A000001";
        
        // 1. ユーザープロファイル取得
        const profile = await fetchUserProfile(currentUserId);
        console.log('Profile:', profile);
        
        setUserId(profile.user_id);
        setOrgId(profile.organization_id);

        // 2. 会議一覧取得
        const meetingData = await fetchMeetings(profile.user_id);
        console.log('Meeting data:', meetingData);

        // 3. データマッピング
        const mappedMeetings = meetingData.map(mapApiDataToMeeting);
        
        setMeetings(mappedMeetings);
        setFilteredMeetings(mappedMeetings);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '予期しないエラーが発生しました';
        console.error('Data initialization error:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [fetchUserProfile, fetchMeetings]);

  // フィルタリング・ソート機能
  const applyFiltersAndSort = useCallback((
    meetingList: Meeting[], 
    query: string, 
    sortOption: string
  ) => {
    let filtered = [...meetingList];

    // 検索フィルタ
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(meeting =>
        meeting.title?.toLowerCase().includes(lowerQuery) ||
        meeting.location?.toLowerCase().includes(lowerQuery) ||
        meeting.facilitator?.toLowerCase().includes(lowerQuery)
      );
    }

    // ソート
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'date':
          return new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime();
        case 'status':
          return a.status.localeCompare(b.status);
        case 'facilitator':
          return a.facilitator.localeCompare(b.facilitator);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredMeetings(filtered);
  }, []);

  // 検索・ソートハンドラ
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    applyFiltersAndSort(meetings, query, sortBy);
  }, [meetings, sortBy, applyFiltersAndSort]);

  const handleSort = useCallback((sortOption: string) => {
    setSortBy(sortOption);
    applyFiltersAndSort(meetings, searchQuery, sortOption);
  }, [meetings, searchQuery, applyFiltersAndSort]);

  // ナビゲーションハンドラ
  const handleEditMeeting = useCallback((meeting: Meeting) => {
    router.push(`/edit-meeting?id=${meeting.id}`);
  }, [router]);

  const handleViewDetails = useCallback((meetingId: number) => {
    router.push(`/meeting/${meetingId}`);
  }, [router]);

  const handleCreateMeeting = useCallback(() => {
    router.push('/create-meeting');
  }, [router]);

  // ローディング状態
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">会議データを読み込んでいます...</p>
        </div>
      </div>
    );
  }

  // エラー状態
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <Calendar className="h-12 w-12 mx-auto mb-2" />
            <p className="text-lg font-medium">エラーが発生しました</p>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            再読み込み
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">会議管理</h1>
          {userId && <p className="text-sm text-gray-600 mt-1">ユーザー: {userId}</p>}
        </div>
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
            <SelectItem value="date">日時順</SelectItem>
            <SelectItem value="title">タイトル順</SelectItem>
            <SelectItem value="status">ステータス順</SelectItem>
            <SelectItem value="facilitator">ファシリテーター順</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Statistics */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{meetings.length}</p>
            <p className="text-sm text-gray-600">総会議数</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {meetings.filter(m => m.status === 'scheduled').length}
            </p>
            <p className="text-sm text-gray-600">予定</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">
              {meetings.filter(m => m.status === 'draft').length}
            </p>
            <p className="text-sm text-gray-600">下書き</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-600">
              {meetings.filter(m => m.status === 'completed').length}
            </p>
            <p className="text-sm text-gray-600">完了</p>
          </div>
        </div>
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
                  <CardTitle className="text-lg font-semibold text-gray-900 truncate mr-2">
                    {meeting.title}
                  </CardTitle>
                  <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${getStatusColor(meeting.status)}`}>
                    {getStatusText(meeting.status)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{meeting.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{meeting.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{meeting.participants}名参加予定</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{meeting.location}</span>
                </div>
                {meeting.facilitator && (
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">ファシリテーター: {meeting.facilitator}</span>
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