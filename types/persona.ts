export type Gender = '女性' | '男性' | 'その他';

export interface LocationInfo {
  prefecture?: string;
  city?: string;
}

export interface Persona {
  id: string;
  name: string;
  age: number;
  gender?: Gender;
  occupation: string;
  occupationCategory?: string;
  description: string;
  image: string;
  tags: string[];
  personality?: string[]; // 性格・特徴
  birthplace?: LocationInfo; // 出身地
  residence?: LocationInfo; // 在住地
}

// 旧スキーマからのフォールバック補助
export function matchesGender(p: Persona, wanted: Gender): boolean {
  if (!wanted) return true;
  if (p.gender) return p.gender === wanted;
  // fallback: tags に含まれていれば採用
  return (p.tags || []).includes(wanted);
}

export function containsText(hay: string | undefined, needle: string): boolean {
  return (hay || '').toLowerCase().includes(needle.toLowerCase());
}

export function locationMatches(loc: LocationInfo | undefined, q: string): boolean {
  if (!q) return true;
  const n = q.toLowerCase();
  return (
    containsText(loc?.prefecture, n) ||
    containsText(loc?.city, n)
  );
}

