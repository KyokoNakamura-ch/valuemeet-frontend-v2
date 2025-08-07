'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

interface CreateMeetingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateMeeting: (meetingData: any) => void;
}

export default function CreateMeetingModal({ open, onOpenChange, onCreateMeeting }: CreateMeetingModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    priority: '',
    date: '',
    startTime: '',
    endTime: '',
    objectives: [''],
    agenda: [''],
    tags: [''],
    participants: [{ email: '', role: '' }]
  });

  const addObjective = () => {
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, '']
    }));
  };

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  const updateObjective = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => i === index ? value : obj)
    }));
  };

  const addAgenda = () => {
    setFormData(prev => ({
      ...prev,
      agenda: [...prev.agenda, '']
    }));
  };

  const removeAgenda = (index: number) => {
    setFormData(prev => ({
      ...prev,
      agenda: prev.agenda.filter((_, i) => i !== index)
    }));
  };

  const updateAgenda = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      agenda: prev.agenda.map((item, i) => i === index ? value : item)
    }));
  };

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }));
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const updateTag = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => i === index ? value : tag)
    }));
  };

  const addParticipant = () => {
    setFormData(prev => ({
      ...prev,
      participants: [...prev.participants, { email: '', role: '' }]
    }));
  };

  const removeParticipant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index)
    }));
  };

  const updateParticipant = (index: number, field: 'email' | 'role', value: string) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.map((participant, i) => 
        i === index ? { ...participant, [field]: value } : participant
      )
    }));
  };

  const handleSubmit = () => {
    const meetingData = {
      ...formData,
      id: Date.now(),
      status: 'scheduled',
      location: 'オンライン',
      participantCount: formData.participants.filter(p => p.email).length
    };
    onCreateMeeting(meetingData);
    onOpenChange(false);
    // Reset form
    setFormData({
      title: '',
      description: '',
      type: '',
      priority: '',
      date: '',
      startTime: '',
      endTime: '',
      objectives: [''],
      agenda: [''],
      tags: [''],
      participants: [{ email: '', role: '' }]
    });
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset form
    setFormData({
      title: '',
      description: '',
      type: '',
      priority: '',
      date: '',
      startTime: '',
      endTime: '',
      objectives: [''],
      agenda: [''],
      tags: [''],
      participants: [{ email: '', role: '' }]
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-4xl max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900">新しい会議の作成</DialogTitle>
          <p className="text-gray-600 mt-2">会議の基本的な情報を入力してください</p>
        </DialogHeader>

        <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
          {/* 基本情報 */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">基本情報</CardTitle>
              <p className="text-sm text-gray-600">会議の基本的な情報を入力してください</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">会議タイトル</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="会議のタイトルを入力してください"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">会議概要</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="会議の概要を入力してください"
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type" className="text-sm font-medium text-gray-700">会議種別</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="会議種別を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">定例会議</SelectItem>
                      <SelectItem value="project">プロジェクト会議</SelectItem>
                      <SelectItem value="brainstorm">ブレインストーミング</SelectItem>
                      <SelectItem value="review">レビュー会議</SelectItem>
                      <SelectItem value="planning">企画会議</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority" className="text-sm font-medium text-gray-700">優先度</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="優先度を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">高</SelectItem>
                      <SelectItem value="medium">中</SelectItem>
                      <SelectItem value="low">低</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 日程・時間 */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">日程・時間</CardTitle>
              <p className="text-sm text-gray-600">会議の開催日時を設定してください</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700">開催日</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="startTime" className="text-sm font-medium text-gray-700">開始時間</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime" className="text-sm font-medium text-gray-700">終了時間</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 会議の目的・ゴール */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">会議の目的・ゴール</CardTitle>
              <p className="text-sm text-gray-600">この会議で達成したい具体的な目標を設定してください</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.objectives.map((objective, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={objective}
                    onChange={(e) => updateObjective(index, e.target.value)}
                    placeholder="目的を入力してください"
                    className="flex-1"
                  />
                  {formData.objectives.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeObjective(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addObjective}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                追加
              </Button>
            </CardContent>
          </Card>

          {/* アジェンダ */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">アジェンダ</CardTitle>
              <p className="text-sm text-gray-600">この会議で議論する項目を設定してください</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.agenda.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={item}
                    onChange={(e) => updateAgenda(index, e.target.value)}
                    placeholder="アジェンダを入力してください"
                    className="flex-1"
                  />
                  {formData.agenda.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeAgenda(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addAgenda}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                追加
              </Button>
            </CardContent>
          </Card>

          {/* 会議タグ */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">会議タグ</CardTitle>
              <p className="text-sm text-gray-600">タグを設定してください</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={tag}
                    onChange={(e) => updateTag(index, e.target.value)}
                    placeholder="タグを入力してください"
                    className="flex-1"
                  />
                  {formData.tags.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeTag(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                追加
              </Button>
            </CardContent>
          </Card>

          {/* 参加者 */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">参加者</CardTitle>
              <p className="text-sm text-gray-600">会議に参加するメンバーを登録してください</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.participants.map((participant, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={participant.email}
                    onChange={(e) => updateParticipant(index, 'email', e.target.value)}
                    placeholder="参加者のメールアドレス"
                    className="flex-1"
                    type="email"
                  />
                  <Select
                    value={participant.role}
                    onValueChange={(value) => updateParticipant(index, 'role', value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="役割を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="host">主催者</SelectItem>
                      <SelectItem value="presenter">発表者</SelectItem>
                      <SelectItem value="participant">参加者</SelectItem>
                      <SelectItem value="observer">オブザーバー</SelectItem>
                    </SelectContent>
                  </Select>
                  {formData.participants.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeParticipant(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addParticipant}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                追加
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* ボタン */}
        <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
          <Button
            onClick={handleSubmit}
            className="bg-orange-600 hover:bg-orange-700 px-8"
          >
            会議を作成
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="px-8"
          >
            キャンセル
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}