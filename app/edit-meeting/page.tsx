'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Minus, ArrowLeft } from 'lucide-react';

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  participants: number;
  status: string;
  location: string;
  agenda?: string[];
  facilitator?: string;
}

export default function EditMeetingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meetingId = searchParams.get('id');

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    participants: 1,
    status: 'draft',
    location: '',
    facilitator: '',
    agenda: ['']
  });

  useEffect(() => {
    // TODO: 実際のAPIからデータを取得
    // 今はダミーデータを使用
    if (meetingId) {
      const dummyMeeting = {
        id: parseInt(meetingId),
        title: '週次チーム会議',
        date: '2025-01-15',
        time: '10:00-11:00',
        participants: 5,
        status: 'scheduled',
        location: '会議室A',
        agenda: ['前週の振り返り', '今週の目標設定', 'プロジェクト進捗確認'],
        facilitator: '田中太郎'
      };

      const [startTime, endTime] = dummyMeeting.time.split('-');
      setFormData({
        title: dummyMeeting.title,
        date: dummyMeeting.date,
        startTime: startTime || '',
        endTime: endTime || '',
        participants: dummyMeeting.participants,
        status: dummyMeeting.status,
        location: dummyMeeting.location,
        facilitator: dummyMeeting.facilitator || '',
        agenda: dummyMeeting.agenda || ['']
      });
    }
  }, [meetingId]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAgendaChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      agenda: prev.agenda.map((item, i) => i === index ? value : item)
    }));
  };

  const addAgendaItem = () => {
    setFormData(prev => ({
      ...prev,
      agenda: [...prev.agenda, '']
    }));
  };

  const removeAgendaItem = (index: number) => {
    if (formData.agenda.length > 1) {
      setFormData(prev => ({
        ...prev,
        agenda: prev.agenda.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = () => {
    const updatedMeeting: Meeting = {
      id: parseInt(meetingId || '0'),
      title: formData.title,
      date: formData.date,
      time: `${formData.startTime}-${formData.endTime}`,
      participants: formData.participants,
      status: formData.status,
      location: formData.location,
      facilitator: formData.facilitator,
      agenda: formData.agenda.filter(item => item.trim() !== '')
    };

    console.log('会議を更新:', updatedMeeting);
    // TODO: 会議データの更新処理
    router.push('/meeting-management');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#FFEAE0] py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">会議を編集</h1>
        </div>

        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">
              会議情報の編集
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 会議名 */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                会議名 *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="会議名を入力"
                className="bg-white border-gray-300"
              />
            </div>

            {/* 日時 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                  日付 *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="bg-white border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-sm font-medium text-gray-700">
                  開始時間 *
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="bg-white border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-sm font-medium text-gray-700">
                  終了時間 *
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="bg-white border-gray-300"
                />
              </div>
            </div>

            {/* 参加者数と場所 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="participants" className="text-sm font-medium text-gray-700">
                  参加者数 *
                </Label>
                <Input
                  id="participants"
                  type="number"
                  min="1"
                  value={formData.participants}
                  onChange={(e) => handleInputChange('participants', parseInt(e.target.value) || 1)}
                  className="bg-white border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  場所 *
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="会議室名またはオンライン"
                  className="bg-white border-gray-300"
                />
              </div>
            </div>

            {/* ステータスとファシリテーター */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                  ステータス *
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="ステータスを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">下書き</SelectItem>
                    <SelectItem value="scheduled">予定</SelectItem>
                    <SelectItem value="completed">完了</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="facilitator" className="text-sm font-medium text-gray-700">
                  ファシリテーター
                </Label>
                <Input
                  id="facilitator"
                  value={formData.facilitator}
                  onChange={(e) => handleInputChange('facilitator', e.target.value)}
                  placeholder="ファシリテーター名"
                  className="bg-white border-gray-300"
                />
              </div>
            </div>

            {/* アジェンダ */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                アジェンダ
              </Label>
              <div className="space-y-2">
                {formData.agenda.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={item}
                      onChange={(e) => handleAgendaChange(index, e.target.value)}
                      placeholder={`アジェンダ項目 ${index + 1}`}
                      className="bg-white border-gray-300 flex-1"
                    />
                    {formData.agenda.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeAgendaItem(index)}
                        className="px-2"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAgendaItem}
                  className="w-full border-dashed"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  アジェンダ項目を追加
                </Button>
              </div>
            </div>

            {/* ボタン */}
            <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
              <Button
                onClick={handleSubmit}
                className="bg-orange-600 hover:bg-orange-700 px-8"
                disabled={!formData.title || !formData.date || !formData.startTime || !formData.endTime || !formData.location}
              >
                更新
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="px-8"
              >
                キャンセル
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
