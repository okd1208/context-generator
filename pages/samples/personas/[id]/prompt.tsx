import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Copy, Download, Check, User } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import { Persona } from '@/types/persona';

interface PromptPageProps {
  persona: Persona;
  promptContent: string;
}

const PromptPage: React.FC<PromptPageProps> = ({ persona, promptContent }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([promptContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${persona.id}-ai-prompt.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>{`${persona.name}のAIプロンプト | AIコンテキスト生成ツール`}</title>
        <meta name="description" content={`${persona.name}のAI用プロンプト。ChatGPTやClaudeで使用できます。`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          {/* ヘッダー */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              コレクションに戻る
            </Link>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                  {persona.image ? (
                    <img 
                      src={persona.image} 
                      alt={persona.name}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        // 画像が読み込めない場合はデフォルトアイコンを表示
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <User className={`w-8 h-8 text-gray-400 ${persona.image ? 'hidden' : ''}`} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{persona.name}のAIプロンプト</h1>
                  <p className="text-gray-600">{persona.occupation} | {persona.age}歳</p>
                </div>
              </div>
              
              {/* 使用方法 */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-blue-800 mb-2">🤖 使用方法</h3>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. 下のプロンプトをコピーまたはダウンロード</li>
                  <li>2. ChatGPT、Claude、Gemini等のAIチャットに貼り付け</li>
                  <li>3. AIが{persona.name}として応答します</li>
                </ol>
              </div>
              
              {/* アクションボタン */}
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'コピーしました！' : 'プロンプトをコピー'}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center bg-green-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  ダウンロード
                </button>
                <Link
                  href={`/samples/personas/${persona.id}`}
                  className="flex items-center bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  詳細情報を見る
                </Link>
              </div>
            </div>
          </div>
          
          {/* プロンプト内容 */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">AIプロンプト</h2>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre-wrap text-gray-800">
                  {promptContent}
                </pre>
              </div>
            </div>
          </div>
          
          {/* フッター情報 */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 使用のヒント</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">対応AIサービス</h4>
                <ul className="space-y-1">
                  <li>• ChatGPT (GPT-3.5/GPT-4)</li>
                  <li>• Claude (Anthropic)</li>
                  <li>• Gemini (Google)</li>
                  <li>• その他のAIチャットサービス</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">効果的な使い方</h4>
                <ul className="space-y-1">
                  <li>• 最初にプロンプトを送信</li>
                  <li>• その後普通に会話を開始</li>
                  <li>• 一貫性を保つため新しいチャットで使用</li>
                  <li>• 長い会話では時々役割を思い出させる</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const filePath = path.join(process.cwd(), 'samples', 'personas-list.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const personas: Persona[] = JSON.parse(jsonData);

    // プロンプトMDが存在するIDのみを対象にする
    const paths = personas
      .filter((p) => {
        // 新構造: samples/personas/<id>/prompt.md
        const newPath = path.join(process.cwd(), 'samples', 'personas', p.id, 'prompt.md');
        // 旧構造: samples/personas/<id>-prompt.md
        const oldPath = path.join(process.cwd(), 'samples', 'personas', `${p.id}-prompt.md`);
        return fs.existsSync(newPath) || fs.existsSync(oldPath);
      })
      .map((persona) => ({
        params: { id: persona.id },
      }));

    return { paths, fallback: false };
  } catch (error) {
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    // ペルソナ情報を取得
    const personasFilePath = path.join(process.cwd(), 'samples', 'personas-list.json');
    const personasData = fs.readFileSync(personasFilePath, 'utf8');
    const personas: Persona[] = JSON.parse(personasData);
    
    const persona = personas.find(p => p.id === params?.id);
    if (!persona) {
      return { notFound: true };
    }

    // プロンプトコンテンツを取得
    // 新構造優先、なければ旧構造を参照
    const newPromptPath = path.join(process.cwd(), 'samples', 'personas', String(params?.id), 'prompt.md');
    const oldPromptPath = path.join(process.cwd(), 'samples', 'personas', `${params?.id}-prompt.md`);
    const promptPath = fs.existsSync(newPromptPath) ? newPromptPath : oldPromptPath;
    const promptContent = fs.readFileSync(promptPath, 'utf8');

    return {
      props: {
        persona,
        promptContent,
      },
    };
  } catch (error) {
    console.error('Failed to load prompt data:', error);
    return { notFound: true };
  }
};

export default PromptPage;
