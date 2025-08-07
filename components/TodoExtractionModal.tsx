'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, CheckCircle, AlertCircle, Calendar, User } from 'lucide-react';

interface TodoExtractionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTodos: (todos: any[]) => void;
}

interface ExtractedTodo {
  id: number;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  meetingTitle: string;
}

export default function TodoExtractionModal({ open, onOpenChange, onAddTodos }: TodoExtractionModalProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedTodos, setExtractedTodos] = useState<ExtractedTodo[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setExtractedTodos([]); // Reset extracted todos when new file is uploaded
    }
  };

  const handleExtract = async () => {
    if (!uploadedFile) return;

    setIsExtracting(true);
    
    // Simulate extraction process
    setTimeout(() => {
      const mockExtractedTodos: ExtractedTodo[] = [
        {
          id: Date.now() + 1,
          title: '資料作成（企画書）',
          description: '新プロジェクトの企画書を作成し、来週の会議で発表する',
          assignee: '田中太郎',
          dueDate: '2025-01-25',
          priority: 'high',
          meetingTitle: '企画会議'
        },
        {
          id: Date.now() + 2,
          title: 'クライアント連絡',
          description: '進捗状況をクライアントに報告し、次回の打ち合わせ日程を調整',
          assignee: '佐藤花子',
          dueDate: '2025-01-22',
          priority: 'medium',
          meetingTitle: 'プロジェクト進捗確認'
        },
        {
          id: Date.now() + 3,
          title: 'システム要件定義',
          description: 'システムの詳細要件を定義し、技術仕様書を作成',
          assignee: '山田一郎',
          dueDate: '2025-01-30',
          priority: 'high',
          meetingTitle: '技術検討会議'
        },
        {
          id: Date.now() + 4,
          title: 'テストケース作成',
          description: 'ユーザビリティテストのケースを作成し、テスト環境を準備',
          assignee: '高橋三郎',
          dueDate: '2025-02-05',
          priority: 'medium',
          meetingTitle: '品質管理会議'
        }
      ];
      
      setExtractedTodos(mockExtractedTodos);
      setIsExtracting(false);
    }, 2000);
  };

  const handleRegister = async () => {
    setIsRegistering(true);
    
    // Simulate registration process
    setTimeout(() => {
      const todosToAdd = extractedTodos.map(todo => ({
        ...todo,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0]
      }));
      
      onAddTodos(todosToAdd);
      setIsRegistering(false);
      onOpenChange(false);
      
      // Reset modal state
      setUploadedFile(null);
      setExtractedTodos([]);
    }, 1000);
  };

  const handleCancel = () => {
    setUploadedFile(null);
    setExtractedTodos([]);
    onOpenChange(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '不明';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900 text-center">
            ToDoの抽出
          </DialogTitle>
          <p className="text-gray-600 text-center mt-2 text-sm">
            会議資料からToDoを自動抽出します
          </p>
        </DialogHeader>

        <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
          {/* File Uploader */}
          <div className="flex justify-center">
            <div className="w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-3 pb-3">
                  <Upload className="w-6 h-6 mb-1 text-gray-400" />
                  <p className="mb-1 text-xs text-gray-500">
                    <span className="font-semibold">クリックしてファイルをアップロード</span>
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOCX, TXT (最大 10MB)</p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                />
              </label>
              {uploadedFile && (
                <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>{uploadedFile.name}</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-3">
            <Button
              onClick={handleExtract}
              disabled={!uploadedFile || isExtracting}
              size="sm"
              className={`px-6 ${
                !uploadedFile || isExtracting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isExtracting ? '抽出中...' : '抽出'}
            </Button>
            <Button
              onClick={handleRegister}
              disabled={extractedTodos.length === 0 || isRegistering}
              size="sm"
              className={`px-6 ${
                extractedTodos.length === 0 || isRegistering
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              {isRegistering ? '登録中...' : '登録'}
            </Button>
          </div>

          {/* Extracted Todos */}
          {extractedTodos.length > 0 && (
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  抽出されたToDo ({extractedTodos.length}件)
                </h3>
                <p className="text-xs text-gray-600">
                  以下のToDoが抽出されました。登録ボタンを押してToDo管理に追加してください。
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                {extractedTodos.map((todo) => (
                  <Card key={todo.id} className="bg-white border border-gray-200 hover:shadow-sm transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{todo.title}</h4>
                        <Badge className={`${getPriorityColor(todo.priority)} text-xs`}>
                          {getPriorityText(todo.priority)}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{todo.description}</p>
                      <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          <span>{todo.assignee}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{todo.dueDate}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Cancel Button */}
          <div className="flex justify-center pt-3 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleCancel}
              size="sm"
              className="px-6"
            >
              キャンセル
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}