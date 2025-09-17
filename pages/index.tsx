import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FormMode, GeneratedPrompt } from '@/types/form';
import { formModes } from '@/utils/formData';
import { ModeSelection } from '@/components/forms/ModeSelection';
import { ContextForm } from '@/components/forms/ContextForm';
import { PromptResult } from '@/components/forms/PromptResult';
import { Sparkles, Plus, Users, TrendingUp, Star, Zap, ArrowRight, ExternalLink } from 'lucide-react';

type AppState = 'mode-selection' | 'form' | 'result';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('mode-selection');
  const [selectedMode, setSelectedMode] = useState<FormMode['type'] | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<GeneratedPrompt | null>(null);

  const handleModeSelect = (mode: FormMode['type']) => {
    setSelectedMode(mode);
    setAppState('form');
  };

  const handleFormComplete = (prompt: GeneratedPrompt) => {
    setGeneratedPrompt(prompt);
    setAppState('result');
  };

  const handleBackToModeSelection = () => {
    setSelectedMode(null);
    setAppState('mode-selection');
  };

  const handleBackToForm = () => {
    setAppState('form');
  };

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`context-form-simple`);
      localStorage.removeItem(`context-form-detailed`);
    }
    setSelectedMode(null);
    setGeneratedPrompt(null);
    setAppState('mode-selection');
  };

  return (
    <>
      <Head>
        <title>Context Generator - AIペルソナを簡単作成 ✨</title>
        <meta name="google-site-verification" content="9NSi-fDNw_Cwb_QJ_H2NvHxbIy9hsv-HUaEYCNKOFmI" />
        <meta
          name="description"
          content="AIに「ある人」になりきってもらうための、高品質なコンテキストを簡単生成。ChatGPT、Claude、Gemini等で使用可能。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        <meta property="og:title" content="Context Generator - AIペルソナ作成ツール" />
        <meta property="og:description" content="AIに特定の人格を持たせるコンテキストを簡単生成" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen">
        {/* ヘッダー */}
        <header className="bg-white/80 backdrop-blur-lg shadow-soft border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-mint-400 to-mint-500 rounded-xl flex items-center justify-center shadow-soft animate-float">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-mint-600 to-peach-600 bg-clip-text text-transparent">
                    Context Generator
                  </h1>
                  <p className="text-xs text-gray-500">AIペルソナを簡単作成</p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center space-x-1">
                <button className="nav-item nav-item-active">
                  🏠 ホーム
                </button>
                <Link
                  href="/samples"
                  className="nav-item flex items-center space-x-1"
                >
                  <span>📝 サンプル</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <button className="nav-item">
                  ⭐ お気に入り
                </button>
              </nav>

              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-xs text-gray-500">
                  完全無料・登録不要
                </div>
                <span className="badge badge-new">✨ NEW</span>
              </div>
            </div>
          </div>
        </header>

        {/* ヒーローセクション（mode-selectionの時のみ表示） */}
        {appState === 'mode-selection' && (
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-mint-50 via-peach-50 to-lavender-50 opacity-50"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center space-y-6 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-soft">
                  <Zap className="w-4 h-4 text-peach-500" />
                  <span className="text-sm font-medium text-gray-700">
                    完全無料・登録不要で今すぐ使える
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  AIに<span className="bg-gradient-to-r from-mint-500 to-peach-500 bg-clip-text text-transparent">
                    「なりきってもらう」
                  </span>を<br/>
                  もっと簡単に、楽しく
                </h2>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  専門家、キャラクター、特定の役割...あなたが求めるペルソナを
                  AIに持たせるためのコンテキストを簡単生成
                </p>

                <div className="flex flex-wrap gap-3 justify-center pt-4">
                  <div className="tag-category">
                    🎨 クリエイティブ
                  </div>
                  <div className="tag-category">
                    👨‍💼 ビジネス
                  </div>
                  <div className="tag-category">
                    📚 アカデミック
                  </div>
                  <div className="tag-category">
                    🎮 エンタメ
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* メインコンテンツ */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-fade-in">
            {appState === 'mode-selection' && (
              <>
                {/* 統計セクション */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  <div className="card p-6 text-center">
                    <div className="text-3xl font-bold text-mint-600">1000+</div>
                    <div className="text-sm text-gray-600 mt-1">作成されたペルソナ</div>
                  </div>
                  <div className="card p-6 text-center">
                    <div className="text-3xl font-bold text-peach-600">50+</div>
                    <div className="text-sm text-gray-600 mt-1">テンプレート</div>
                  </div>
                  <div className="card p-6 text-center">
                    <div className="text-3xl font-bold text-lavender-600">4.9</div>
                    <div className="text-sm text-gray-600 mt-1">ユーザー評価</div>
                  </div>
                  <div className="card p-6 text-center">
                    <div className="text-3xl font-bold text-mint-600">100%</div>
                    <div className="text-sm text-gray-600 mt-1">無料</div>
                  </div>
                </div>

                <ModeSelection
                  modes={formModes}
                  selectedMode={selectedMode}
                  onSelectMode={handleModeSelect}
                />
              </>
            )}

            {appState === 'form' && selectedMode && (
              <ContextForm
                mode={selectedMode}
                onBack={handleBackToModeSelection}
                onComplete={handleFormComplete}
              />
            )}

            {appState === 'result' && generatedPrompt && (
              <PromptResult
                prompt={generatedPrompt}
                onEdit={handleBackToForm}
                onReset={handleReset}
              />
            )}
          </div>
        </main>

        {/* フローティングアクションボタン */}
        <button className="fab">
          <Plus className="w-6 h-6" />
        </button>

        {/* フッター */}
        <footer className="bg-white border-t border-gray-100 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-mint-400 to-mint-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg">Context Generator</span>
                </div>
                <p className="text-sm text-gray-600">
                  AIとの対話をもっと楽しく、効果的に。
                  あなたのアイデアを形にするための最高のパートナーを作りましょう。
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  特徴
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-mint-500" />
                    <span>簡単3ステップ</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-peach-500" />
                    <span>共有機能</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-lavender-500" />
                    <span>常に改善</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  対応AI
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• ChatGPT</li>
                  <li>• Claude</li>
                  <li>• Gemini</li>
                  <li>• その他主要AI</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-500 mb-4 md:mb-0">
                  © 2024 Context Generator. Made with 💚 for AI enthusiasts.
                </p>
                <div className="flex space-x-6">
                  <a href="#" className="text-sm text-gray-500 hover:text-mint-600 transition-colors">
                    プライバシー
                  </a>
                  <a href="#" className="text-sm text-gray-500 hover:text-mint-600 transition-colors">
                    利用規約
                  </a>
                  <a href="#" className="text-sm text-gray-500 hover:text-mint-600 transition-colors">
                    お問い合わせ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
