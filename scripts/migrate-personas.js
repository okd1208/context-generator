#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const src = path.join(process.cwd(), 'samples', 'personas-list.json');
const raw = JSON.parse(fs.readFileSync(src, 'utf8'));

function inferGender(tags = []) {
  if (tags.includes('女性')) return '女性';
  if (tags.includes('男性')) return '男性';
  return undefined;
}

function capture(regex, text) {
  const m = text.match(regex);
  return m ? m[1] : undefined;
}

function inferBirthplace(desc) {
  // 例: 「静岡出身」「大阪出身の」など
  const place = capture(/([一-龥ぁ-んァ-ンA-Za-z0-9々ー]+)出身/u, desc || '');
  if (!place) return undefined;
  const norm = normalizeLocToken(place);
  return norm ? { prefecture: norm.prefecture, city: norm.city } : undefined;
}

function inferResidence(desc) {
  // 例: 「東京在住」「渋谷区在住」
  let place = capture(/([一-龥ぁ-んァ-ンA-Za-z0-9々ー]+)在住/u, desc || '');
  if (!place) {
    // 控えめに「〜で暮らす」のみ対応（"生活" は無視）
    place = capture(/([一-龥ぁ-んァ-ンA-Za-z0-9々ー]+)で暮らす/u, desc || '');
  }
  if (!place) return undefined;
  const norm = normalizeLocToken(place);
  return norm ? { prefecture: norm.prefecture, city: norm.city } : undefined;
}

function inferOccupationCategory(occupation = '') {
  const o = occupation.toLowerCase();
  if (/it|エンジニア|web|pm|プロダクト/.test(o)) return 'IT';
  if (/デザイナ/.test(o)) return 'デザイン';
  if (/教師|教諭|教授|大学|学校/.test(o)) return '教育';
  if (/看護|医療|病院/.test(o)) return '医療';
  if (/営業/.test(o)) return '営業';
  if (/公務員/.test(o)) return '公務';
  if (/コンサル/.test(o)) return 'コンサル';
  if (/経営|オーナー|女将|店/.test(o)) return '経営';
  if (/主婦|パート/.test(o)) return '家庭';
  if (/学生/.test(o)) return '学生';
  return undefined;
}

// Prefecture canonical names
const PREF_MAP = new Map([
  ['北海道', '北海道'],
  ['青森', '青森県'], ['岩手', '岩手県'], ['宮城', '宮城県'], ['秋田', '秋田県'], ['山形', '山形県'], ['福島', '福島県'],
  ['茨城', '茨城県'], ['栃木', '栃木県'], ['群馬', '群馬県'], ['埼玉', '埼玉県'], ['千葉', '千葉県'], ['東京', '東京都'], ['東京都', '東京都'], ['神奈川', '神奈川県'],
  ['新潟', '新潟県'], ['富山', '富山県'], ['石川', '石川県'], ['福井', '福井県'], ['山梨', '山梨県'], ['長野', '長野県'],
  ['岐阜', '岐阜県'], ['静岡', '静岡県'], ['愛知', '愛知県'],
  ['三重', '三重県'], ['滋賀', '滋賀県'], ['京都', '京都府'], ['京都府', '京都府'], ['大阪', '大阪府'], ['大阪府', '大阪府'], ['兵庫', '兵庫県'], ['奈良', '奈良県'], ['和歌山', '和歌山県'],
  ['鳥取', '鳥取県'], ['島根', '島根県'], ['岡山', '岡山県'], ['広島', '広島県'], ['山口', '山口県'],
  ['徳島', '徳島県'], ['香川', '香川県'], ['愛媛', '愛媛県'], ['高知', '高知県'],
  ['福岡', '福岡県'], ['佐賀', '佐賀県'], ['長崎', '長崎県'], ['熊本', '熊本県'], ['大分', '大分県'], ['宮崎', '宮崎県'], ['鹿児島', '鹿児島県'], ['沖縄', '沖縄県']
]);

const CITY_TO_PREF = new Map([
  ['横浜', '神奈川県'],
  ['鎌倉', '神奈川県'],
  ['渋谷区', '東京都'],
  ['港区', '東京都'],
  ['名古屋', '愛知県'],
  ['神戸', '兵庫県'],
  ['札幌', '北海道'],
  ['仙台', '宮城県'],
  // 同名が都道府県の場合は都道府県を優先
  ['京都', '京都府'],
  ['大阪', '大阪府'],
  ['東京', '東京都'],
]);

function normalizeLocToken(token) {
  if (!token) return undefined;
  const t = String(token).replace(/県|府|都|道/g, '');
  // prefecture canonical
  const pref = PREF_MAP.get(t) || PREF_MAP.get(token) || CITY_TO_PREF.get(token);
  if (pref) {
    // If it's a city mapping (CITY_TO_PREF) and not pure prefecture string, keep city
    const isCity = CITY_TO_PREF.has(token) && !PREF_MAP.has(t) && !PREF_MAP.has(token);
    return { prefecture: pref, city: isCity ? token : undefined };
  }
  // Fallback: if token ends with 区/市/町/村 treat as city, try rough mapping for big cities
  if (/区|市|町|村$/.test(token)) {
    const pref2 = CITY_TO_PREF.get(token) || undefined;
    return { prefecture: pref2, city: token };
  }
  return undefined;
}

const migrated = raw.map((p) => {
  const next = { ...p };
  if (!next.gender) next.gender = inferGender(next.tags);
  if (!next.birthplace) next.birthplace = inferBirthplace(next.description);
  if (!next.residence) next.residence = inferResidence(next.description);
  // Normalize birthplace/residence to prefecture base, keep city detail when available
  if (next.birthplace?.prefecture) {
    const norm = normalizeLocToken(next.birthplace.prefecture);
    if (norm) next.birthplace = { prefecture: norm.prefecture, city: norm.city || next.birthplace.city };
  }
  if (next.residence?.prefecture) {
    const norm = normalizeLocToken(next.residence.prefecture);
    if (norm) next.residence = { prefecture: norm.prefecture, city: norm.city || next.residence.city };
  }
  if (!next.occupationCategory) next.occupationCategory = inferOccupationCategory(next.occupation || '');
  // 性格(personality)は未運用のため削除しておく（誤混入防止）
  if (next.personality) delete next.personality;
  return next;
});

fs.writeFileSync(src, JSON.stringify(migrated, null, 2) + '\n', 'utf8');
console.log(`Migrated ${migrated.length} personas -> samples/personas-list.json`);
