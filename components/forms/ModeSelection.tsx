import React from 'react';
import { Clock, Zap, Target, Sparkles, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { FormMode } from '@/types/form';

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
  const getModeStyle = (type: FormMode['type']) => {
    switch (type) {
      case 'simple':
        return {
          icon: <Zap className="w-6 h-6 text-white" />,
          bgColor: 'from-mint-400 to-mint-500',
          borderColor: 'border-mint-300',
          hoverBorder: 'hover:border-mint-400',
          badge: '🚀 クイック',
          badgeColor: 'bg-mint-100 text-mint-700'
        };
      case 'detailed':
        return {
          icon: <Target className="w-6 h-6 text-white" />,
          bgColor: 'from-peach-400 to-peach-500',
          borderColor: 'border-peach-300',
          hoverBorder: 'hover:border-peach-400',
          badge: '⭐ プロ',
          badgeColor: 'bg-peach-100 text-peach-700'
        };
      default:
        return {
          icon: <Clock className="w-6 h-6 text-white" />,
          bgColor: 'from-gray-400 to-gray-500',
          borderColor: 'border-gray-300',
          hoverBorder: 'hover:border-gray-400',
          badge: '基本',
          badgeColor: 'bg-gray-100 text-gray-700'
        };
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          作成モードを選択
        </h2>
        <p className="text-gray-600">
          あなたの目的に合わせて、最適なモードをお選びください
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {modes.map((mode) => {
          const style = getModeStyle(mode.type);
          const isSelected = selectedMode === mode.type;
          
          return (
            <div
              key={mode.type}
              className={`
                card-persona cursor-pointer group
                ${isSelected ? 'ring-2 ring-mint-400 border-mint-400' : ''}
              `}
              onClick={() => onSelectMode(mode.type)}
            >
              {/* バッジ */}
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold ${style.badgeColor}`}>
                  {style.badge}
                </span>
                {mode.type === 'detailed' && (
                  <span className="badge badge-popular">
                    人気
                  </span>
                )}
              </div>

              {/* アイコンとタイトル */}
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.bgColor} flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300`}>
                  {style.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {mode.label}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {mode.estimatedTime}
                  </div>
                </div>
              </div>

              {/* 説明 */}
              <p className="text-gray-600 mb-4">
                {mode.description}
              </p>

              {/* 特徴リスト */}
              {mode.type === 'simple' && (
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-mint-100 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-mint-600" />
                    </div>
                    <span className="text-gray-700">基本的な職業・役職設定</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-mint-100 flex items-center justify-center">
                      <Star className="w-3 h-3 text-mint-600" />
                    </div>
                    <span className="text-gray-700">専門分野・スキルの指定</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-mint-100 flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-mint-600" />
                    </div>
                    <span className="text-gray-700">コミュニケーションスタイル</span>
                  </div>
                </div>
              )}
              
              {mode.type === 'detailed' && (
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-peach-100 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-peach-600" />
                    </div>
                    <span className="text-gray-700">エンジニア向け詳細設定</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-peach-100 flex items-center justify-center">
                      <Star className="w-3 h-3 text-peach-600" />
                    </div>
                    <span className="text-gray-700">学習・思考スタイル</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-peach-100 flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-peach-600" />
                    </div>
                    <span className="text-gray-700">作業環境・好みの詳細</span>
                  </div>
                </div>
              )}

              {/* CTAボタン */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-900">
                  このモードで始める
                </span>
                <ArrowRight className={`w-5 h-5 ${isSelected ? 'text-mint-600' : 'text-gray-400'} group-hover:text-mint-600 transition-colors`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 人気のテンプレート */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          💡 人気のテンプレートから選ぶ
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="card p-4 text-left hover:border-mint-400 transition-all">
            <div className="text-2xl mb-2">👨‍💼</div>
            <div className="text-sm font-medium text-gray-900">ビジネスコンサルタント</div>
            <div className="text-xs text-gray-500 mt-1">戦略・分析のプロ</div>
          </button>
          <button className="card p-4 text-left hover:border-peach-400 transition-all">
            <div className="text-2xl mb-2">🎨</div>
            <div className="text-sm font-medium text-gray-900">クリエイティブデザイナー</div>
            <div className="text-xs text-gray-500 mt-1">UI/UXのエキスパート</div>
          </button>
          <button className="card p-4 text-left hover:border-lavender-400 transition-all">
            <div className="text-2xl mb-2">💻</div>
            <div className="text-sm font-medium text-gray-900">フルスタックエンジニア</div>
            <div className="text-xs text-gray-500 mt-1">技術のスペシャリスト</div>
          </button>
          <button className="card p-4 text-left hover:border-mint-400 transition-all">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-sm font-medium text-gray-900">教育コーチ</div>
            <div className="text-xs text-gray-500 mt-1">学習支援のプロ</div>
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500 flex items-center justify-center">
          <span className="inline-flex items-center mr-2">
            🔒
          </span>
          生成されたコンテキストは完全にローカルで処理され、外部に送信されません
        </p>
      </div>
    </div>
  );
};
