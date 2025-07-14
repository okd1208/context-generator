import React from 'react';
import { Clock, Zap, Target } from 'lucide-react';
import { FormMode } from '@/types/form';
import { Card } from '@/components/ui/FormElements';

interface ModeSelectionProps {
  modes: FormMode[];
  selectedMode: FormMode['type'] | null;
  onSelectMode: (mode: FormMode['type']) => void;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({
  modes,
  selectedMode,
  onSelectMode
}) => {
  const getIcon = (type: FormMode['type']) => {
    switch (type) {
      case 'simple':
        return <Zap className="w-8 h-8 text-green-600" />;
      case 'detailed':
        return <Target className="w-8 h-8 text-blue-600" />;
      default:
        return <Clock className="w-8 h-8 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AIコンテキスト生成ツール
        </h1>
        <p className="text-lg text-gray-600">
          あなたに最適なプロンプトを生成します
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {modes.map((mode) => (
          <Card
            key={mode.type}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedMode === mode.type
                ? 'ring-2 ring-primary-500 bg-primary-50'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onSelectMode(mode.type)}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getIcon(mode.type)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {mode.label}
                </h3>
                <p className="text-gray-600 mb-3">
                  {mode.description}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {mode.estimatedTime}
                </div>
              </div>
            </div>
            
            {mode.type === 'simple' && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">含まれる項目：</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 職業・役職</li>
                  <li>• 専門分野・スキル</li>
                  <li>• コミュニケーションスタイル</li>
                  <li>• 利用目的</li>
                  <li>• 自由記述</li>
                </ul>
              </div>
            )}
            
            {mode.type === 'detailed' && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">追加項目：</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• エンジニア向け詳細質問</li>
                  <li>• 学習・思考スタイル</li>
                  <li>• 関心事・興味分野</li>
                  <li>• 作業環境・好み</li>
                  <li>• より詳細なプロンプト生成</li>
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          ※ 生成されたプロンプトは完全にクライアントサイドで処理され、サーバーには送信されません
        </p>
      </div>
    </div>
  );
};
