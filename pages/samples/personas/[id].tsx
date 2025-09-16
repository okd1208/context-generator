import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, User, Briefcase, MapPin, Calendar, Tag, Download, Eye } from 'lucide-react';
import fs from 'fs';
import path from 'path';

interface Persona {
  id: string;
  name: string;
  age: number;
  occupation: string;
  description: string;
  image: string;
  tags: string[];
}

interface PersonaDetailPageProps {
  persona: Persona;
  content: string;
}

const PersonaDetailPage: React.FC<PersonaDetailPageProps> = ({ persona, content }) => {
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${persona.id}-persona-detail.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Markdownの簡易パース
  const formatContent = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold text-gray-800 mb-4 mt-8">{line.substring(2)}</h1>;
        } else if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-semibold text-gray-800 mb-3 mt-6">{line.substring(3)}</h2>;
        } else if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold text-gray-700 mb-2 mt-4">{line.substring(4)}</h3>;
        } else if (line.startsWith('- **') && line.includes('**:')) {
          const [key, ...valueParts] = line.substring(2).split(':');
          const value = valueParts.join(':').trim();
          return (
            <div key={index} className="flex mb-2">
              <span className="font-semibold text-gray-800 min-w-0 flex-shrink-0 mr-2">
                {key.replace(/\*\*/g, '')}:
              </span>
              <span className="text-gray-700">{value}</span>
            </div>
          );
        } else if (line.startsWith('  1. ') || line.startsWith('  2. ') || line.startsWith('  3. ')) {
          return <div key={index} className="ml-6 mb-1 text-gray-700">{line.trim()}</div>;
        } else if (line.trim() === '') {
          return <br key={index} />;
        } else if (!line.startsWith('#')) {
          return <p key={index} className="text-gray-700 mb-2">{line}</p>;
        }
        return null;
      });
  };

  return (
    <>
      <Head>
        <title>{persona.name} | ペルソナ詳細</title>
        <meta name="description" content={persona.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          {/* ヘッダー */}
          <div className="mb-6">
            <Link
              href="/samples"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              サンプル一覧に戻る
            </Link>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start gap-6">
                {/* プロフィール画像 */}
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
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
                  <User className={`w-12 h-12 text-gray-400 ${persona.image ? 'hidden' : ''}`} />
                </div>
                
                {/* 基本情報 */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{persona.name}</h1>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{persona.age}歳</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span>{persona.occupation}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{persona.description}</p>
                  
                  {/* タグ */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {persona.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* アクションボタン */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleDownload}
                      className="flex items-center bg-green-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      詳細データをダウンロード
                    </button>
                    <Link
                      href={`/samples/personas/${persona.id}/prompt`}
                      className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      AIプロンプトを見る
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 詳細内容 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">詳細情報</h2>
            <div className="prose max-w-none">
              {formatContent(content)}
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
    
    const paths = personas.map((persona) => ({
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

    // 詳細コンテンツを取得
    const contentFilePath = path.join(process.cwd(), 'samples', 'personas', `${params?.id}.md`);
    const content = fs.readFileSync(contentFilePath, 'utf8');

    return {
      props: {
        persona,
        content,
      },
    };
  } catch (error) {
    console.error('Failed to load persona data:', error);
    return { notFound: true };
  }
};

export default PersonaDetailPage;