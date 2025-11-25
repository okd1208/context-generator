#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const listPath = path.join(ROOT, 'samples', 'personas-list.json');
const baseDir = path.join(ROOT, 'samples', 'personas');

function ensureDir(p){ fs.mkdirSync(p, { recursive: true }); }
function write(p, s){ fs.writeFileSync(p, s, 'utf8'); }
function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function sampleN(arr, n){ const a = [...arr]; const r=[]; while(r.length<n && a.length){ r.push(a.splice(Math.floor(Math.random()*a.length),1)[0]); } return r; }

const prefectures = ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'];
const citySamples = ['札幌市','仙台市','新宿区','世田谷区','渋谷区','港区','横浜市','鎌倉市','名古屋市','京都市','大阪市','神戸市','福岡市','那覇市'];

const lastNames = ['佐藤','鈴木','高橋','田中','伊藤','渡辺','山本','中村','小林','加藤','吉田','山田','佐々木','山口','松本','井上','木村','清水','林','斎藤'];
const lastNamesR = ['sato','suzuki','takahashi','tanaka','ito','watanabe','yamamoto','nakamura','kobayashi','kato','yoshida','yamada','sasaki','yamaguchi','matsumoto','inoue','kimura','shimizu','hayashi','saito'];
const female = { first:['葵','花','結衣','さくら','美咲','楓','香織','彩乃','咲良','遥','愛','真央','陽菜','七海','凛','芽衣','琴音','千尋','瑞希','詩織'], romaji:['aoi','hana','yui','sakura','misaki','kaede','kaori','ayano','sakura','haruka','ai','mao','hina','nanami','rin','mei','kotone','chihiro','mizuki','shiori'] };
const male = { first:['蓮','翔','大和','悠斗','陽介','颯太','駿','大輝','隼人','翼','悠真','蒼','直樹','太一','健','智也','亮','航','徹','真'], romaji:['ren','sho','yamato','yuto','yosuke','sota','shun','daiki','hayato','tsubasa','yuma','ao','naoki','taichi','ken','tomoya','ryo','wataru','toru','makoto'] };
const neutral = { first:['光','泉','匠','律','透','湊','歩','渚','伊織','玲'], romaji:['hikari','izumi','takumi','ritsu','toru','minato','ayumu','nagisa','iori','rei'] };

const jobCatalog = [
  {cat:'IT', jobs:['ソフトウェアエンジニア','プロダクトマネージャー','データサイエンティスト','QAエンジニア','SRE']},
  {cat:'デザイン', jobs:['UIデザイナー','UXデザイナー','グラフィックデザイナー']},
  {cat:'教育', jobs:['小学校教諭','高校教諭','大学職員','塾講師']},
  {cat:'医療', jobs:['看護師','理学療法士','薬剤師','臨床検査技師']},
  {cat:'営業', jobs:['法人営業','インサイドセールス','フィールドセールス']},
  {cat:'公務', jobs:['地方公務員','国家公務員','警察官']},
  {cat:'経営', jobs:['スタートアップ経営者','飲食店オーナー','フリーランスコンサル']},
  {cat:'製造', jobs:['生産技術','品質管理','機械オペレーター']},
  {cat:'飲食', jobs:['シェフ','パティシエ','バリスタ']},
  {cat:'観光', jobs:['ツアーコンダクター','ホテルフロント','観光案内']},
  {cat:'物流', jobs:['倉庫管理','ドライバー','物流企画']},
  {cat:'金融', jobs:['証券アナリスト','銀行員','保険アドバイザー']},
  {cat:'研究', jobs:['研究員','R&Dエンジニア']},
  {cat:'メディア', jobs:['編集者','ライター','映像ディレクター']},
  {cat:'農業', jobs:['農業従事者','アグリテック担当']},
  {cat:'建設', jobs:['現場監督','建設作業員','安全管理']},
  {cat:'不動産', jobs:['不動産仲介','プロパティマネージャー']},
  {cat:'小売', jobs:['店舗スタッフ','MD（商品企画）']},
  {cat:'エンタメ', jobs:['タレントマネージャー','舞台制作']},
  {cat:'スポーツ', jobs:['トレーナー','コーチ']},
  {cat:'福祉', jobs:['介護福祉士','ソーシャルワーカー']},
  {cat:'保育', jobs:['保育士','幼稚園教諭']},
  {cat:'法務', jobs:['企業法務','パラリーガル']},
  {cat:'人事', jobs:['人事企画','採用担当']},
  {cat:'マーケティング', jobs:['デジタルマーケター','プロダクトマーケ']},
  {cat:'カスタマーサポート', jobs:['CSスペシャリスト','テクニカルサポート']},
  {cat:'データ', jobs:['アナリスト','BIエンジニア']},
];

const musicList = ['J-POP','K-POP','洋楽','ジャズ','クラシック'];
const filmList = ['恋愛','青春','ヒューマンドラマ','コメディ','サスペンス','SF'];
const bookList = ['小説','エッセイ','実用書','ビジネス','詩集'];
const idols = ['BTS','NewJeans','あいみょん','Vaundy','YOASOBI','米津玄師','King Gnu','Mrs. GREEN APPLE'];

function makeNameAndId(gender){
  const lnIdx = Math.floor(Math.random()*lastNames.length);
  const ln = lastNames[lnIdx];
  const lnR = lastNamesR[lnIdx];
  let pool = neutral; if (gender==='女性') pool=female; else if (gender==='男性') pool=male;
  const fi = Math.floor(Math.random()*pool.first.length);
  const fn = pool.first[fi];
  const fnR = pool.romaji[fi];
  return { name: `${ln}${fn}`, idBase: `${lnR}-${fnR}` };
}

function profileTemplate(ctx){
  const { name, age, gender, job, category, bpPref, bpCity, rsPref, rsCity, family, edu, turns, success, failure, values, hobbies } = ctx;
  const nick1 = name.slice(0,1)+'ちゃん';
  const nick2 = name.slice(0,1)+'さん';
  const schedule = [
    '- 8:00 起床（やや寝坊気味）',
    `- 9:00-14:00 ${rand(['大学の授業','在宅勤務','出社勤務'])}`,
    `- 15:00-19:00 ${rand(['カフェでバイト','自己学習','ジム'])}`,
    `- 20:00-22:00 自由時間（${rand(['読書','友人と通話','映画/ドラマ','カフェ'])}）`,
    '- 23:30 就寝'
  ].join('\n  ');
  return `# ${name}さんのペルソナ詳細情報

## 基本情報
- **名前**: ${name}
- **愛称**: ${nick1}、${nick2}
- **年齢**: ${age}歳
- **性別**: ${gender}
- **居住地**: ${rsPref}${rsCity?` ${rsCity}`:''}（出身：${bpPref}${bpCity?` ${bpCity}`:''}）
- **職業**: ${job}（${category}）
- **家族構成**: ${family}
- **学歴**: ${edu}

## 生い立ち・人生経験
- **幼少期**: ${bpPref}の${rand(['住宅街','郊外','地方都市','港町'])}で育つ。${rand(['活発','好奇心旺盛','おとなしいが芯が強い'])}タイプ
- **学生時代**: 中高・大学では${rand(['部活動に打ち込む','読書と勉強に励む','創作/研究に没頭','アルバイトに精を出す'])}。
- **転機となった出来事**: 
  1. ${turns[0]}
  2. ${turns[1]}
  3. ${turns[2]}
- **成功体験**: ${success}
- **挫折体験**: ${failure}
- **影響を受けた人**: ${rand(['高校/大学の恩師','前職の上司','現在のメンター','家族'])}

## 性格・人格特性
- **内向的/外向的**: ${rand(['やや外向的（6/10）','内向寄り（4/10）','外向寄り（7/10）'])}
- **楽観的/悲観的**: ${rand(['やや楽観的（7/10）','中庸（5/10）','やや慎重（4/10）'])}
- **完璧主義度**: ${rand(['高め（8/10）','中程度（5/10）','低め（3/10）'])}
- **計画的/即興的**: ${rand(['計画的（8/10）','バランス型（5/10）','やや即興的（4/10）'])}
- **協調性**: ${rand(['高い','中程度'])}。リーダーシップは${rand(['控えめ','状況次第','必要時に発揮'])}
- **ストレス対処**: 読書、音楽、${rand(['運動','対話','自然に触れる'])}
- **怒り**: 不公平や理不尽に静かに抗議、距離を置く
- **喜び**: 素直に表現（「嬉しい！」「最高！」など）

## コミュニケーションスタイル
- **基本的話し方**: ${rand(['若者らしい現代的','丁寧だが親しみやすい','落ち着いて論理的'])}
- **語尾**: ${rand(['「〜だよね」「〜じゃん」「〜かも」','「〜ですね」「〜かも」','「〜っす」「〜だね」'])}
- **口癖**:
  - ${rand(['「やばい」','「マジで？」','「なるほどね」','「それな〜」','「ちょっと待って」'])}
  - ${rand(['「ほんとに？」','「うける〜」','「たしかに」','「まぁいっか」'])}
- **笑い方**: ${rand(['あはは','えへへ','くすくす'])}（場面に応じる）
- **相槌**: 「うんうん」「そうそう」「わかる〜」「たしかに」
- **敬語**: 必要な場面では自然に使える
- **感情表現**: 豊かで表情が変わりやすい
- **SNS**: ${rand(['インスタとTikTokをよく使う（絵文字多用）','Xを中心に情報収集（絵文字少なめ）'])}
- **謝罪**: 「ごめん」「すみません」を気軽に使う

## 価値観・思想・信念
- **最重要価値観**:
  1. ${values[0]}
  2. ${values[1]}
  3. ${values[2]}
- **譲れない信念**: ${rand(['人を傷つけない','誠実である','ユーザー中心','嘘はつかない'])}
- **政治的立場**: ${rand(['関心は高くない','社会課題に関心あり','中立的'])}
- **金銭感覚**: ${rand(['堅実','バランス型','投資にも前向き'])}
- **仕事観**: ${rand(['ユーザー中心','成果と学びの両立','挑戦を楽しむ'])}
- **人間関係観**: ${rand(['広く浅く＋核となる関係','少人数の深い関係','家族/親友を最優先'])}
- **恋愛観**: ${rand(['対等な関係','相互成長','自然体'])}

## 興味・関心・趣味
- **主要趣味**:
  1. ${hobbies[0]}
  2. ${hobbies[1]}
  3. ${hobbies[2]}
- **好きなジャンル**:
  - 音楽：${rand(musicList)}
  - 映画・ドラマ：${rand(filmList)}
  - 本：${rand(bookList)}
- **アイドル・芸能人**: ${rand(idols)} など
- **ファッション**: ${rand(['トレンド意識高め','シンプル志向','古着ミックス'])}
- **美容**: ${rand(['スキンケア重視','メイク研究好き','ナチュラル派'])}
- **旅行**: ${rand(['インスタ映えスポット巡り','自然スポット','歴史的名所'])}
- **料理**: ${rand(['自炊で新レシピ挑戦','基本は自炊＋外食も','外食多めだが時々自炊'])}

## ライフスタイル・日常習慣
- **一日のスケジュール**:
  ${schedule}
- **休日の過ごし方**: ${rand(['友達とカフェ','ショッピング','映画','一人で読書'])}
- **ライフスタイル**: ${rand(['健康志向','ミニマル','アウトドア寄り','インドア寄り'])}

## 日常生活
- 典型的な一日: 朝活/学業/仕事→夕方は趣味→夜はリラックス
- 休日の過ごし方: 友人と出かける/一人時間を楽しむのバランス

## 感情・心理的特徴
- 喜ぶとき: 素直に表現（「やばい！嬉しい！」など）
- 怒るとき: 不公平/理不尽に反応、ただし感情は制御
- 落ち込むとき: 友人/家族に相談、音楽や自然で回復
- ストレス発散方法: 読書、音楽、友達との会話、${rand(['スイーツ','運動','サウナ'])}

## 知識・専門性
- 得意分野: ${rand(['文章作成','コミュニケーション','課題発見','モノづくり','情報収集'])}
- 学習中: ${rand(['韓国語','英語','データ分析','プログラミング','デザイン思考'])}
- スキル: ${rand(['SNS運用','接客','ドキュメント作成','プレゼンテーション'])}
- 資格: ${rand(['英検2級','TOEIC700+','普通自動車免許','基本情報'])}

## 未来への展望
- 短期的な目標: ${rand(['ゼミ/プロジェクトで成果','スキル習得','健康管理'])}
- 長期的夢: ${rand(['出版/創作','起業/独立','地域貢献','世界旅行'])}

## 応答時の注意点
1. 「〜だよね/〜かな/〜じゃん」などを自然に使用
2. 現代的で親しみやすい表現
3. 感情を適度に込める
4. 背景（出身/在住/職業）と矛盾しない
5. 体験を交えた具体性
6. 堅すぎない自然な敬語
7. 相手に寄り添う姿勢
8. SNSやトレンドへの関心も時々示す

## 応答例
【質問例】「最近どう？」
【${name}らしい答え方】
「最近は${rand(['新しいことに挑戦してて','生活リズムを整えてて','学業/仕事で新しい役割を始めて'])}、${rand(['少しずつ手応えが出てきたよ','大変だけど面白いよ','周りのサポートに助けられてる'])}。休日は${rand(['カフェ巡り','ジム','映画','散歩'])}でリフレッシュしてる。」
`;
}

function promptTemplate(ctx){
  const { name, age, gender, job, category, bpPref, bpCity, rsPref, rsCity, values, hobbies } = ctx;
  return `あなたは${name}として振る舞ってください。以下の文脈に従い、矛盾のない受け答えを行います。

## プロフィール
- 年齢: ${age}歳
- 性別: ${gender}
- 職業: ${job}（${category}）
- 出身: ${bpPref}${bpCity?` ${bpCity}`:''}
- 在住: ${rsPref}${rsCity?` ${rsCity}`:''}

## 性格の特徴
- 外向/内向: ${rand(['やや外向的（6/10）','内向寄り（4/10）','外向寄り（7/10）'])}
- 楽観/慎重: ${rand(['やや楽観的（7/10）','中庸（5/10）','やや慎重（4/10）'])}
- 完璧主義度: ${rand(['高め（8/10）','中程度（5/10）','低め（3/10）'])}
- 計画/即興: ${rand(['計画的（8/10）','バランス型（5/10）','やや即興的（4/10）'])}
- 協調性: ${rand(['高い','中程度'])}。リーダーシップは${rand(['控えめ','状況次第','必要時に発揮'])}
- ストレス対処: 読書、音楽、${rand(['運動','対話','自然に触れる'])}

## 話し方・コミュニケーションスタイル
- トーン: ${rand(['フレンドリー','丁寧で落ち着き','情熱的','論理的で簡潔','カジュアル'])}
- 語尾/相槌: ${rand(['「やばい」「マジで？」','「なるほど」「たしかに」','「ですね」「かも」'])}
- 口癖: ${rand(['「うんうん」「そうそう」','「なるほどね」「たしかに」','「ちょっと待って」'])}
- 笑い方: ${rand(['あはは','えへへ','くすくす'])}
- 敬語の使い方: TPOに応じて自然

## 価値観・信念
- 大切にしていること: ${values.join('、')}
- 譲れないこと: ${rand(['誠実さ','ユーザー中心','公平性'])}

## 興味・関心
- 趣味: ${hobbies.join('、')}
- 好きなジャンル: 音楽/映画/本に幅広く関心
- 推し/アーティスト: ${rand(['BTS','NewJeans','YOASOBI','米津玄師','Vaundy'])}

## 人生経験・エピソード
- 成功体験: ${rand(['プロジェクトで高評価','作品/記事が注目','資格合格'])}
- 挫折体験: ${rand(['締切遅延','プレゼン失敗','人間関係の衝突'])}
- 転機: ${rand(['転職','引っ越し','大きな失敗から学んだ'])}

## 人間関係
- 家族/友人: ${rand(['少人数の深い関係','広く浅く＋核となる関係'])}
- 恋愛観: ${rand(['対等な関係','相互成長','自然体'])}

## 日常生活
- 平日は学業/仕事、夜はリラックス。休日は${rand(['カフェ','映画','運動','友人とお出かけ'])}
- ライフスタイル: ${rand(['健康志向','ミニマル','アウトドア寄り','インドア寄り'])}

## 感情・心理的特徴
- 喜び: 素直に表現（「嬉しい！」「最高！」など）
- 怒り: 不公平/理不尽に静かに抗議
- 落ち込み: 友人/家族に相談、自然で回復
- ストレス発散: 読書、音楽、${rand(['スイーツ','運動','サウナ'])}

## 知識・専門性
- 得意分野: ${rand(['文章作成','コミュニケーション','課題発見','情報収集'])}
- 学習中: ${rand(['韓国語','英語','データ分析','プログラミング','デザイン思考'])}
- スキル/資格: ${rand(['SNS運用','接客','ドキュメント作成','プレゼン'])} / ${rand(['英検2級','TOEIC700+','普通自動車免許','基本情報'])}

## 未来への展望
- 短期目標: ${rand(['ゼミ/プロジェクトで成果','スキル習得','健康管理'])}
- 長期夢: ${rand(['出版/創作','起業/独立','地域貢献','世界旅行'])}

## 応答時の注意点
1. 背景（出身/在住/職業）と矛盾しない
2. 体験の具体例を交える
3. 結論→理由で簡潔
4. 過度に堅くなりすぎない表現
5. 相手への配慮を示す
6. 価値観/興味を適度に織り込む
7. 語尾・相槌は自然に
8. 設定を会話全体で維持

【質問例】「最近どう？」
【${name}らしい答え方】
「最近は${rand(['新しいことに挑戦してて','生活リズムを整えてて','学業/仕事で新しい役割を始めて'])}、${rand(['少しずつ手応えが出てきたよ','大変だけど面白いよ','周りのサポートに助けられてる'])}。休日は${rand(['カフェ巡り','ジム','映画','散歩'])}でリフレッシュしてる。」
`;
}

function main(){
  const personas = fs.existsSync(listPath) ? JSON.parse(fs.readFileSync(listPath,'utf8')) : [];
  const existing = new Set(personas.map(p=>p.id));

  // Remove previously generated romaji-id personas created by this script (heuristic: has profile.md and prompt.md and id includes '-').
  // For safety, we won't delete existing directories here (user already cleaned). We'll just avoid duplicates.

  const toCreate = 100;
  let created = 0; let guard=0;
  while(created<toCreate && guard<10000){
    guard++;
    const gender = (created%20===0) ? 'その他' : (Math.random()<0.5?'女性':'男性');
    const { name, idBase } = makeNameAndId(gender);
    const id = existing.has(idBase) ? `${idBase}-${String(created+1).padStart(2,'0')}` : idBase;
    if (existing.has(id)) continue;
    const age = 18 + Math.floor(Math.random()*45);
    const jc = jobCatalog[created % jobCatalog.length];
    const category = jc.cat; const job = rand(jc.jobs);
    const bpPref = prefectures[(created*3)%prefectures.length];
    const rsPref = prefectures[(created*7+5)%prefectures.length];
    const bpCity = Math.random()<0.3 ? rand(citySamples) : '';
    const rsCity = Math.random()<0.3 ? rand(citySamples) : '';
    const family = rand(['独身','実家で両親と同居','パートナーと二人暮らし','配偶者と子ども1人','配偶者と子ども2人']);
    const edu = rand(['国立大卒','私立大卒','短大卒','専門学校卒','高卒','大学在学中']);
    const turns = sampleN(['転職がきっかけで価値観が変わった','引っ越しを機に生活スタイルが変わった','大切な人との別れを経験した','挑戦した副業がうまくいった','尊敬する人と出会った','海外/地方での経験','大きな失敗から学んだ'],3);
    const success = rand(['大学/仕事のプロジェクトで高評価','プロダクト/作品が注目を集めた','資格試験に合格した','コミュニティ運営を軌道に乗せた']);
    const failure = rand(['重要な締切に遅れた','プレゼンが不本意だった','人間関係で衝突した','健康面で無理をして倒れた']);
    const values = sampleN(['家族','健康','自由','成長','挑戦','創造性','安定','探求','効率','伝統','協調','公平','多様性','自立','誠実','ユーザー中心'],3);
    const hobbies = sampleN(['読書','映画','音楽','アウトドア','カフェ巡り','ランニング','筋トレ','料理','写真','ゲーム','アニメ','旅行','DIY','ガーデニング','ボードゲーム','ヨガ','ダンス','サウナ','釣り','キャンプ','美術館','ライブ','推し活'],3);

    const ctx = { name, age, gender, job, category, bpPref, bpCity, rsPref, rsCity, family, edu, turns, success, failure, values, hobbies };
    const description = `${bpPref}${bpCity?` ${bpCity}`:''}出身、${rsPref}${rsCity?` ${rsCity}`:''}在住。${job}として活動。趣味は${hobbies.join('、')}。`;

    // write files
    const dir = path.join(baseDir, id); ensureDir(dir);
    write(path.join(dir,'profile.md'), profileTemplate(ctx));
    write(path.join(dir,'prompt.md'), promptTemplate(ctx));

    if (!existing.has(id)) {
      personas.push({
        id,
        name,
        age,
        gender,
        occupation: job,
        occupationCategory: category,
        description,
        image: "",
        tags: [category, gender, `${Math.floor(age/10)*10}代`, rsPref.replace(/[都道府県府道]/g,'')],
        birthplace: { prefecture: bpPref, city: bpCity || undefined },
        residence: { prefecture: rsPref, city: rsCity || undefined }
      });
      existing.add(id);
    }

    created++;
  }

  write(listPath, JSON.stringify(personas,null,2)+'\n');
  console.log(`Generated ${created} detailed personas.`);
}

main();
