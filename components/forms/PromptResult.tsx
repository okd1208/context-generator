import React, { useState } from 'react';
import { Copy, Check, Download, RefreshCw } from 'lucide-react';
import { GeneratedPrompt } from '@/types/form';
import { Button, Card } from '@/components/ui/FormElements';
import { copyToClipboard } from '@/utils/promptGenerator';

interface PromptResultProps {
  prompt: GeneratedPrompt;
  onReset: () => void;
  onEdit: () => void;
}

export const PromptResult: React.FC<PromptResultProps> = ({
  prompt,
  onReset,
  onEdit
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'detailed' | 'json'>('detailed');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'basic':
        return prompt.basicPrompt;
      case 'detailed':
        return prompt.detailedPrompt;
      case 'json':
        return prompt.jsonFormat;
      default:
        return prompt.detailedPrompt;
    }
  };

  const getCurrentFilename = () => {
    switch (activeTab) {
      case 'basic':
        return 'context-basic.txt';
      case 'detailed':
        return 'context-detailed.txt';
      case 'json':
        return 'context.json';
      default:
        return 'context.txt';
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="text-center">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
          コンテキスト生成完了！
        </h2>
        <p className="text-sm text-gray-600">
          以下のプロンプトをコピーしてAIサービスで使用してください
        </p>
      </div>

      {/* タブ */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === 'basic'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            簡易版
          </button>
          <button
            onClick={() => setActiveTab('detailed')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === 'detailed'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            詳細版
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === 'json'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            JSON形式
          </button>
        </div>
      </div>

      {/* プロンプト表示 */}
      <Card className="relative">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-base font-semibold text-gray-900">
            {activeTab === 'basic' && '簡易版プロンプト'}
            {activeTab === 'detailed' && '詳細版プロンプト'}
            {activeTab === 'json' && 'JSON形式（API用）'}
          </h3>
          <div className="flex space-x-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(getCurrentContent(), activeTab)}
              className="flex items-center space-x-1"
            >
              {copiedField === activeTab ? (
                <Check className="w-3 h-3 text-green-600" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              <span className="hidden sm:inline">{copiedField === activeTab ? 'コピー済み' : 'コピー'}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(getCurrentContent(), getCurrentFilename())}
              className="flex items-center space-x-1"
            >
              <Download className="w-3 h-3" />
              <span className="hidden sm:inline">ダウンロード</span>
            </Button>
          </div>
        </div>

        <div className="relative">
          <pre className="bg-gray-50 rounded-lg p-3 text-xs text-gray-800 whitespace-pre-wrap overflow-x-auto max-h-80 overflow-y-auto border">
            {getCurrentContent()}
          </pre>
        </div>

        {activeTab === 'basic' && (
          <div className="mt-2 p-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              💡 簡易版は短くて使いやすいプロンプトです。ChatGPTやClaude等で手軽に使用できます。
            </p>
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="mt-2 p-2 bg-green-50 rounded-lg">
            <p className="text-xs text-green-800">
              💡 詳細版はより具体的で高品質な回答を得られるプロンプトです。重要な会話や専門的な質問におすすめです。
            </p>
          </div>
        )}

        {activeTab === 'json' && (
          <div className="mt-2 p-2 bg-purple-50 rounded-lg">
            <p className="text-xs text-purple-800">
              💡 JSON形式はAPI連携や開発用途に使用できます。プログラムから扱いやすい構造化データです。
            </p>
          </div>
        )}
      </Card>

      {/* 使用例 */}
      <Card className="p-3">
        <h3 className="text-base font-semibold text-gray-900 mb-2">使用方法</h3>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-5 h-5 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
              1
            </div>
            <p className="text-xs text-gray-700">上記のプロンプトをコピーします</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-5 h-5 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
              2
            </div>
            <p className="text-xs text-gray-700">ChatGPT、Claude、Gemini等のAIサービスにアクセスします</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-5 h-5 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
              3
            </div>
            <p className="text-xs text-gray-700">会話の最初にプロンプトを貼り付けて送信します</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-5 h-5 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
              4
            </div>
            <p className="text-xs text-gray-700">その後、通常通り質問や会話を続けてください</p>
          </div>
        </div>
      </Card>

      {/* アクションボタン */}
      <div className="flex justify-center space-x-3">
        <Button variant="outline" onClick={onEdit} className="flex items-center space-x-1.5">
          <RefreshCw className="w-3 h-3" />
          <span>内容を編集</span>
        </Button>
        <Button onClick={onReset} className="flex items-center space-x-1.5">
          <RefreshCw className="w-3 h-3" />
          <span>新しくコンテキストを作成</span>
        </Button>
      </div>
    </div>
  );
};
