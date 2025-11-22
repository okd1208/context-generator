import React from 'react';
import Link from 'next/link';
import { User, Briefcase, MapPin, Tag, ArrowRight, Sparkles } from 'lucide-react';

interface Persona {
  id: string;
  name: string;
  age: number;
  occupation: string;
  description: string;
  image: string;
  tags: string[];
}

interface PersonaCardProps {
  persona: Persona;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona }) => {
  // タグのカラーマッピング
  const getTagColor = (index: number) => {
    const colors = [
      'bg-mint-100 text-mint-700',
      'bg-peach-100 text-peach-700',
      'bg-lavender-100 text-lavender-700',
      'bg-blue-100 text-blue-700'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="card-persona group">
      {/* プロフィール画像 */}
      <div className="relative h-48 -mx-6 -mt-6 mb-4 bg-gradient-to-br from-mint-100 via-peach-100 to-lavender-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
        {persona.image ? (
          <img 
            src={persona.image} 
            alt={persona.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg ${persona.image ? 'hidden' : ''}`}>
          <User className="w-12 h-12 text-mint-400" />
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-bold text-gray-700 shadow-soft">
          {persona.age}歳
        </div>
      </div>
      
      {/* カード内容 */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900">{persona.name}</h3>
        
        {/* 職業 */}
        <div className="flex items-center text-gray-600">
          <Briefcase className="w-4 h-4 mr-2 flex-shrink-0 text-mint-500" />
          <span className="text-sm font-medium">{persona.occupation}</span>
        </div>
        
        {/* 説明 */}
        <p className="text-gray-600 text-sm line-clamp-3">{persona.description}</p>
        
        {/* タグ */}
        <div className="flex flex-wrap gap-2">
          {persona.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${getTagColor(index)}`}
            >
              {tag}
            </span>
          ))}
          {persona.tags.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600">
              +{persona.tags.length - 3}
            </span>
          )}
        </div>
        
        {/* 詳細を見るボタン */}
        <Link
          href={`/samples/personas/${persona.id}`}
          className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:text-mint-600 transition-colors"
        >
          <span className="text-sm font-medium">詳細を見る</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

interface PersonaListProps {
  personas: Persona[];
}

const PersonaList: React.FC<PersonaListProps> = ({ personas }) => {
  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-lg shadow-soft border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-mint-400 to-mint-500 rounded-xl flex items-center justify-center shadow-soft animate-float">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-mint-600 to-peach-600 bg-clip-text text-transparent">
                    Context Collection
                  </h1>
                  <p className="text-xs text-gray-500">ユーザーインタビュー用コンテキスト集</p>
                </div>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              <button className="nav-item nav-item-active">🗂 コレクション</button>
              <Link href="/create" className="nav-item">✍️ 作成</Link>
              <button className="nav-item">
                ⭐ お気に入り
              </button>
            </nav>
            
            <div className="flex items-center space-x-3">
              <span className="badge badge-new">✨ NEW</span>
            </div>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-mint-50 via-peach-50 to-lavender-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-soft">
              <span className="text-2xl">📚</span>
              <span className="text-sm font-medium text-gray-700">ユーザーインタビューに使える文脈を多数収録</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-mint-500 to-peach-500 bg-clip-text text-transparent">
                ユーザーインタビュー用コンテキスト
              </span>
              コレクション
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">対象ユーザー像・状況・制約・口調など、インタビューに必要な文脈をまとめたコンテキスト集です。すぐに使えるプロンプト付き。</p>
            
            {/* 統計情報 */}
            <div className="flex justify-center gap-8 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-mint-600">{personas.length}</div>
                <div className="text-sm text-gray-600">コンテキスト</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-peach-600">10+</div>
                <div className="text-sm text-gray-600">カテゴリー</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lavender-600">∞</div>
                <div className="text-sm text-gray-600">可能性</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ペルソナグリッド */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {personas.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-600 text-lg">
              コンテキストが見つかりませんでした
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-gray-900">全{personas.length}件のコンテキスト</h3>
              <div className="flex gap-2">
                <button className="tag-category">
                  🎨 全て
                </button>
                <button className="tag">
                  👨‍💼 ビジネス
                </button>
                <button className="tag">
                  🎓 教育
                </button>
                <button className="tag">
                  💻 IT
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personas.map((persona) => (
                <PersonaCard key={persona.id} persona={persona} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* CTA セクション */}
      <section className="bg-gradient-to-r from-mint-50 to-peach-50 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            あなたのケースに合わせてコンテキストを作成しませんか？
          </h3>
          <p className="text-gray-600 mb-6">
            サンプルを参考に、あなただけのユーザーインタビュー用コンテキストを簡単に作成できます
          </p>
          <Link href="/create" className="btn-primary inline-flex items-center space-x-2">
            <Sparkles className="w-5 h-5" />
            <span>コンテキストを作成する</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PersonaList;
