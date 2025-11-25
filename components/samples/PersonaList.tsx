import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User, Briefcase, MapPin, Tag, ArrowRight, Sparkles } from 'lucide-react';
import { Persona, matchesGender, locationMatches, containsText } from '@/types/persona';

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
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  // Option lists
  const occupationCategoryOptions = useMemo(() => {
    const s = new Set<string>();
    personas.forEach(p => p.occupationCategory && s.add(p.occupationCategory));
    return Array.from(s);
  }, [personas]);
  const occupationOptions = useMemo(() => {
    const s = new Set<string>();
    personas.forEach(p => p.occupation && s.add(p.occupation));
    return Array.from(s);
  }, [personas]);
  const birthplaceOptions = useMemo(() => {
    const s = new Set<string>();
    personas.forEach(p => p.birthplace?.prefecture && s.add(p.birthplace.prefecture));
    return Array.from(s);
  }, [personas]);
  const residenceOptions = useMemo(() => {
    const s = new Set<string>();
    personas.forEach(p => p.residence?.prefecture && s.add(p.residence.prefecture));
    return Array.from(s);
  }, [personas]);

  // Filters (selection-based)
  const [gender, setGender] = useState<'all' | '女性' | '男性' | 'その他'>('all');
  const [ageMin, setAgeMin] = useState<string>('');
  const [ageMax, setAgeMax] = useState<string>('');
  const [occupationCategory, setOccupationCategory] = useState<string>('');
  const [occupation, setOccupation] = useState<string>('');
  const [birthplace, setBirthplace] = useState<string>('');
  const [residence, setResidence] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const resetFilters = () => {
    setGender('all');
    setAgeMin('');
    setAgeMax('');
    setOccupationCategory('');
    setOccupation('');
    setBirthplace('');
    setResidence('');
    setKeyword('');
    router.replace({ pathname: '/samples' }, undefined, { shallow: true });
  };

  // Load from query
  useEffect(() => {
    const q = router.query;
    if (!q) return;
    setGender((q.gender as any) || 'all');
    setAgeMin((q.ageMin as string) || '');
    setAgeMax((q.ageMax as string) || '');
    setOccupationCategory((q.occupationCategory as string) || '');
    setOccupation((q.occupation as string) || '');
    setBirthplace((q.birthplace as string) || '');
    setResidence((q.residence as string) || '');
    setKeyword((q.q as string) || '');
    // 状態反映後に同期を有効化（初期クエリを上書きしない）
    setTimeout(() => setHydrated(true), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  // Sync query when filters change (auto-search)
  useEffect(() => {
    if (!hydrated) return;
    const query: Record<string, any> = {};
    if (gender !== 'all') query.gender = gender;
    if (ageMin) query.ageMin = ageMin;
    if (ageMax) query.ageMax = ageMax;
    if (occupationCategory) query.occupationCategory = occupationCategory;
    if (occupation) query.occupation = occupation;
    if (birthplace) query.birthplace = birthplace;
    if (residence) query.residence = residence;
    if (keyword) query.q = keyword;
    router.replace({ pathname: '/samples', query }, undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender, ageMin, ageMax, occupationCategory, occupation, birthplace, residence, keyword, hydrated]);

  const filtered = useMemo(() => {
    return personas.filter((p) => {
      if (gender !== 'all' && !matchesGender(p, gender as any)) return false;

      const min = ageMin ? parseInt(ageMin, 10) : undefined;
      const max = ageMax ? parseInt(ageMax, 10) : undefined;
      if (min !== undefined && p.age < min) return false;
      if (max !== undefined && p.age > max) return false;

      if (occupationCategory && p.occupationCategory !== occupationCategory) return false;
      if (occupation && p.occupation !== occupation) return false;


      if (birthplace && p.birthplace?.prefecture !== birthplace) return false;
      if (residence && p.residence?.prefecture !== residence) return false;

      if (keyword) {
        const q = keyword.toLowerCase();
        const hit = containsText(p.name, q) || containsText(p.description, q) || containsText(p.occupation, q) || (p.tags || []).some(t => t.toLowerCase().includes(q));
        if (!hit) return false;
      }

      return true;
    });
  }, [personas, gender, ageMin, ageMax, occupationCategory, occupation, birthplace, residence, keyword]);

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

      {/* フィルター */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="card p-4">
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
            <div>
              <label className="text-xs text-gray-600">性別</label>
              <select className="mt-1 form-input" value={gender} onChange={(e) => setGender(e.target.value as any)}>
                <option value="all">すべて</option>
                <option value="女性">女性</option>
                <option value="男性">男性</option>
                <option value="その他">その他</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-600">年齢 最小</label>
              <input type="number" inputMode="numeric" className="mt-1 form-input" placeholder="min" value={ageMin} onChange={(e) => setAgeMin(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-gray-600">年齢 最大</label>
              <input type="number" inputMode="numeric" className="mt-1 form-input" placeholder="max" value={ageMax} onChange={(e) => setAgeMax(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-gray-600">職業カテゴリ</label>
              <select className="mt-1 form-input" value={occupationCategory} onChange={(e) => setOccupationCategory(e.target.value)}>
                <option value="">すべて</option>
                {occupationCategoryOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-600">職業（詳細）</label>
              <select className="mt-1 form-input" value={occupation} onChange={(e) => setOccupation(e.target.value)}>
                <option value="">すべて</option>
                {occupationOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-600">キーワード</label>
              <input type="text" className="mt-1 form-input" placeholder="自由検索（名前・説明・タグなど）" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
            <div>
              <label className="text-xs text-gray-600">出身地（都道府県）</label>
              <select className="mt-1 form-input" value={birthplace} onChange={(e) => setBirthplace(e.target.value)}>
                <option value="">すべて</option>
                {birthplaceOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-600">在住地（都道府県）</label>
              <select className="mt-1 form-input" value={residence} onChange={(e) => setResidence(e.target.value)}>
                <option value="">すべて</option>
                {residenceOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            {/* 性格・特徴の選択は未整備のため一旦未実装 */}
            <div className="flex gap-2 md:col-span-2 lg:col-span-4 justify-between items-center">
              <div className="flex items-center gap-3 text-sm">
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700">該当 {filtered.length} 件</span>
                <span className="text-xs text-gray-500">条件は変更と同時に適用されます</span>
              </div>
              <button className="btn-secondary h-10 px-3" onClick={resetFilters}>クリア</button>
            </div>
          </div>
        </div>
      </section>

      {/* ペルソナグリッド */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-600 text-lg">
              条件に一致するコンテキストが見つかりませんでした
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-gray-900">該当 {filtered.length} 件のコンテキスト</h3>
              <div className="text-sm text-gray-600">全 {personas.length} 件からフィルタ</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((persona) => (
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
