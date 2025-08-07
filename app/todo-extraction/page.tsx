'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, CheckCircle, User, Calendar, ArrowLeft } from 'lucide-react';

export default function TodoExtractionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meetingTitle = searchParams.get('title') || '会議';

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [extractedTodos, setExtractedTodos] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleExtract = async () => {
    if (!uploadedFile) return;

    setIsExtracting(true);
    // TODO: 実際のファイル解析処理
    
    // ダミーデータをセット
    setTimeout(() => {
      const dummyTodos = [
        {
          id: 1,
          title: 'プロジェクト計画書の作成',
          description: '次回の会議までにプロジェクトの詳細計画書を作成する',
          assignee: '田中太郎',
          dueDate: '2025-01-20',
          priority: 'high'
        },
        {
          id: 2,
          title: 'デザインレビューの実施',
          description: 'UI/UXデザインのレビューを実施し、フィードバックをまとめる',
          assignee: '佐藤花子',
          dueDate: '2025-01-18',
          priority: 'medium'
        },
        {
          id: 3,
          title: '予算見積もりの確認',
          description: '各部門の予算見積もりを確認し、調整が必要な箇所を特定する',
          assignee: '山田次郎',
          dueDate: '2025-01-22',
          priority: 'medium'
        }
      ];
      setExtractedTodos(dummyTodos);
      setIsExtracting(false);
    }, 2000);
  };

  const handleRegister = () => {
    setIsRegistering(true);
    // TODO: ToDoの登録処理
    setTimeout(() => {
      console.log('ToDoを登録:', extractedTodos);
      setIsRegistering(false);
      router.push('/todo-management');
    }, 1000);
  };

  const handleCancel = () => {
    router.back();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '-';
    }
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
          <h1 className="text-2xl font-bold text-gray-900">ToDoの抽出</h1>
        </div>

        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-gray-900 text-center">
              ToDoの抽出
            </CardTitle>
            <p className="text-gray-600 text-center mt-2 text-sm">
              会議資料からToDoを自動抽出します
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
