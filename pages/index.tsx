import React, { useState } from 'react';
import Head from 'next/head';
import { FormMode, GeneratedPrompt } from '@/types/form';
import { formModes } from '@/utils/formData';
import { ModeSelection } from '@/components/forms/ModeSelection';
import { ContextForm } from '@/components/forms/ContextForm';
import { PromptResult } from '@/components/forms/PromptResult';

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
    // 保存されたフォームデータをクリア
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
        <title>AIコンテキスト生成ツール - あなた専用のプロンプトを作成</title>
        <meta
          name="description"
          content="フォーム入力だけで、あなたの背景に最適化されたAI用プロンプトを生成。ChatGPT、Claude、Gemini等で使用可能。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AIコンテキスト生成ツール" />
        <meta
          property="og:description"
          content="あなたの背景に最適化されたAI用プロンプトを簡単生成"
        />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AIコンテキスト生成ツール" />
        <meta
          name="twitter:description"
          content="あなたの背景に最適化されたAI用プロンプトを簡単生成"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">AI</span>
                </div>
                <h1 className="text-lg font-semibold text-gray-900">
                  コンテキスト生成ツール
                </h1>
              </div>
              <div className="text-xs text-gray-500">
                完全無料・登録不要
              </div>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
          <div className="animate-fade-in">
            {appState === 'mode-selection' && (
              <ModeSelection
                modes={formModes}
                selectedMode={selectedMode}
                onSelectMode={handleModeSelect}
              />
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

        {/* フッター */}
        <footer className="bg-white border-t mt-8 sm:mt-12">
          <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  このツールについて
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  AIとの対話をより効果的にするため、あなたの背景情報を元に最適化されたプロンプトを生成します。
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  プライバシー
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  入力された情報は完全にクライアントサイドで処理され、サーバーには送信されません。
                </p>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  対応AIサービス
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  ChatGPT、Claude、Gemini、Copilot等、主要なAIサービスで使用可能です。
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                © 2024 AIコンテキスト生成ツール. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
