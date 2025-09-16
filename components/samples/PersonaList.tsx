import React from 'react';
import Link from 'next/link';
import { User, Briefcase, MapPin, Tag } from 'lucide-react';

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
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* プロフィール画像 */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
        {persona.image ? (
          <img 
            src={persona.image} 
            alt={persona.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // 画像が読み込めない場合はデフォルトアイコンを表示
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg ${persona.image ? 'hidden' : ''}`}>
          <User className="w-12 h-12 text-gray-400" />
        </div>
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-medium text-gray-600">
          {persona.age}歳
        </div>
      </div>
      
      {/* カード内容 */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{persona.name}</h3>
        
        {/* 職業 */}
        <div className="flex items-center text-gray-600 mb-2">
          <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{persona.occupation}</span>
        </div>
        
        {/* 説明 */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{persona.description}</p>
        
        {/* タグ */}
        <div className="flex flex-wrap gap-1 mb-4">
          {persona.tags.slice(0, 4).map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
          {persona.tags.length > 4 && (
            <span className="text-xs text-gray-400">+{persona.tags.length - 4}</span>
          )}
        </div>
        
        {/* アクションボタン */}
        <div className="flex gap-2">
          <Link
            href={`/samples/personas/${persona.id}`}
            className="flex-1 bg-blue-500 text-white text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            詳細を見る
          </Link>
          <Link
            href={`/samples/personas/${persona.id}/prompt`}
            className="flex-1 bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            プロンプト
          </Link>
        </div>
      </div>
    </div>
  );
};

interface PersonaListProps {
  personas: Persona[];
}

const PersonaList: React.FC<PersonaListProps> = ({ personas }) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          サンプルペルソナ
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          様々な職業・年代・性格のペルソナサンプルです。詳細情報やAI用プロンプトをご確認いただけます。
          これらを参考に、あなた独自のペルソナを作成してみてください。
        </p>
      </div>
      
      {/* 統計情報 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-8">
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{personas.length}</div>
            <div className="text-sm text-gray-600">ペルソナ</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(personas.flatMap(p => p.tags)).size}
            </div>
            <div className="text-sm text-gray-600">タグ</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.min(...personas.map(p => p.age))} - {Math.max(...personas.map(p => p.age))}歳
            </div>
            <div className="text-sm text-gray-600">年齢幅</div>
          </div>
        </div>
      </div>
      
      {/* ペルソナグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <PersonaCard key={persona.id} persona={persona} />
        ))}
      </div>
      
      {/* フッター情報 */}
      <div className="mt-12 text-center">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            オリジナルペルソナを作成しませんか？
          </h3>
          <p className="text-gray-600 mb-4">
            これらのサンプルを参考に、あなただけのペルソナを作成することができます。
          </p>
          <Link
            href="/"
            className="inline-flex items-center bg-green-500 text-white py-2 px-6 rounded-md font-medium hover:bg-green-600 transition-colors"
          >
            ペルソナ作成を開始
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonaList;