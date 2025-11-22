import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, Sparkles, User } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import { Persona } from '@/types/persona';

interface HomeProps {
  personas: Persona[];
}

export default function Home({ personas }: HomeProps) {
  return (
    <>
      <Head>
        <title>Context Collection | ユーザーインタビューのための文脈を整える</title>
        <meta name="description" content="ユーザーインタビューがすぐに始められる高品質なコンテキスト。職種・状況別のプロファイルとプロンプトを提供し、作成も簡単。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-lg shadow-soft border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-mint-400 to-mint-500 rounded-xl flex items-center justify-center shadow-soft animate-float">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-mint-600 to-peach-600 bg-clip-text text-transparent">Context Collection</h1>
                    <p className="text-xs text-gray-500">ユーザーインタビュー用コンテキスト集</p>
                  </div>
                </Link>
              </div>
              <nav className="hidden md:flex items-center space-x-1">
                <button className="nav-item nav-item-active">🏠 ホーム</button>
                <Link href="/samples" className="nav-item">🗂 コレクション</Link>
                <Link href="/create" className="nav-item">✍️ 作成</Link>
                <button className="nav-item">⭐ お気に入り</button>
              </nav>
              <div className="flex items-center space-x-3">
                <span className="badge badge-new">✨ NEW</span>
              </div>
            </div>
          </div>
        </header>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-mint-50 via-peach-50 to-lavender-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-mint-400 to-mint-500 rounded-xl flex items-center justify-center shadow-soft">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">ユーザーインタビュー用コンテキスト</h1>
                <p className="text-gray-600 mt-2">対象ユーザー像・状況・制約・口調まで。すぐに使えるプロンプト付き。</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/create" className="btn-primary inline-flex items-center px-4 py-2 rounded-lg">
                <span>✍️ コンテキストを作成する</span>
              </Link>
              <Link href="/samples" className="nav-item inline-flex items-center">
                <span>🗂 コレクションを見る</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Teaser collection (top 3) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">おすすめコレクション（抜粋）</h2>
            <Link href="/samples" className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm">
              すべて見る <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          {personas.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">コンテキストが見つかりませんでした</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personas.slice(0, 3).map((p) => (
                <Link key={p.id} href={`/samples/personas/${p.id}`} className="card-persona group">
                  <div className="relative h-40 -mx-6 -mt-6 mb-4 bg-gradient-to-br from-mint-100 via-peach-100 to-lavender-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-10 h-10 text-mint-400" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{p.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {p.tags.slice(0, 2).map((t, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700">{t}</span>
                      ))}
                      {p.tags.length > 2 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-gray-50 text-gray-500">+{p.tags.length - 2}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Create feature brief */}
        <section className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold text-gray-900 mb-2">コンテキスト生成で、インタビューを効率化</h2>
                <p className="text-gray-600 mb-4">対象ユーザー像、状況、制約、口調、出力形式を整えた高品質なプロンプトを簡単に生成できます。</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• 対象ユーザーと状況の定義</li>
                  <li>• 口調・出力形式の統一</li>
                  <li>• 制約/前提条件の明示</li>
                </ul>
              </div>
              <div className="flex md:justify-end items-start">
                <Link href="/create" className="btn-primary inline-flex items-center h-10 px-4">
                  ✍️ コンテキストを作成する
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-mint-400 to-mint-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg">Context Collection</span>
                </div>
                <p className="text-sm text-gray-600">
                  ユーザーインタビューをもっと楽しく、効果的に。
                  調査と検証の質を上げるためのコンテキストを整えましょう。
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4">特徴</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 簡単3ステップ作成</li>
                  <li>• 共有しやすい構成</li>
                  <li>• テンプレート継続改善</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4">対応AI</h3>
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
                  © 2024 Context Collection. Made with 💚 for UX/Research.
                </p>
                <div className="flex space-x-6">
                  <a href="#" className="text-sm text-gray-500 hover:text-mint-600 transition-colors">プライバシー</a>
                  <a href="#" className="text-sm text-gray-500 hover:text-mint-600 transition-colors">利用規約</a>
                  <a href="#" className="text-sm text-gray-500 hover:text-mint-600 transition-colors">お問い合わせ</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const filePath = path.join(process.cwd(), 'samples', 'personas-list.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const personas: Persona[] = JSON.parse(jsonData);

    return {
      props: {
        personas,
      },
    };
  } catch (error) {
    console.error('Failed to load personas data:', error);
    return {
      props: {
        personas: [],
      },
    };
  }
};
