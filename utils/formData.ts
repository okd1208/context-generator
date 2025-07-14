import { FormSection, FormMode, SelectOption } from '@/types/form';

export const formModes: FormMode[] = [
  {
    type: 'simple',
    label: '簡易コンテキスト',
    description: '基本的な情報でサクッと生成',
    estimatedTime: '約3分'
  },
  {
    type: 'detailed',
    label: '詳細コンテキスト',
    description: '充実した情報で高品質なコンテキストを生成',
    estimatedTime: '約10分'
  }
];

export const occupationOptions: SelectOption[] = [
  { value: 'engineer', label: 'エンジニア・開発者' },
  { value: 'designer', label: 'デザイナー' },
  { value: 'manager', label: 'マネージャー・管理職' },
  { value: 'consultant', label: 'コンサルタント' },
  { value: 'researcher', label: '研究者・学者' },
  { value: 'sales', label: '営業・セールス' },
  { value: 'marketing', label: 'マーケティング' },
  { value: 'student', label: '学生' },
  { value: 'teacher', label: '教師・講師' },
  { value: 'freelancer', label: 'フリーランス' },
  { value: 'entrepreneur', label: '起業家・経営者' },
  { value: 'other', label: 'その他' }
];

export const experienceLevelOptions: SelectOption[] = [
  { value: 'beginner', label: '初心者（1年未満）' },
  { value: 'junior', label: 'ジュニア（1-3年）' },
  { value: 'mid', label: 'ミドル（3-7年）' },
  { value: 'senior', label: 'シニア（7-15年）' },
  { value: 'expert', label: 'エキスパート（15年以上）' }
];

export const skillsOptions: SelectOption[] = [
  { value: 'programming', label: 'プログラミング' },
  { value: 'design', label: 'デザイン' },
  { value: 'marketing', label: 'マーケティング' },
  { value: 'sales', label: '営業・セールス' },
  { value: 'management', label: 'マネジメント' },
  { value: 'data_analysis', label: 'データ分析' },
  { value: 'writing', label: 'ライティング' },
  { value: 'translation', label: '翻訳・通訳' },
  { value: 'education', label: '教育・研修' },
  { value: 'consulting', label: 'コンサルティング' },
  { value: 'project_management', label: 'プロジェクト管理' },
  { value: 'finance', label: '財務・会計' }
];

export const programmingLanguagesOptions: SelectOption[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'dart', label: 'Dart' },
  { value: 'r', label: 'R' },
  { value: 'sql', label: 'SQL' },
  { value: 'html_css', label: 'HTML/CSS' }
];

export const developmentFieldsOptions: SelectOption[] = [
  { value: 'frontend', label: 'フロントエンド' },
  { value: 'backend', label: 'バックエンド' },
  { value: 'fullstack', label: 'フルスタック' },
  { value: 'mobile', label: 'モバイルアプリ' },
  { value: 'data_science', label: 'データサイエンス' },
  { value: 'machine_learning', label: '機械学習・AI' },
  { value: 'devops', label: 'DevOps・インフラ' },
  { value: 'security', label: 'セキュリティ' },
  { value: 'game', label: 'ゲーム開発' },
  { value: 'embedded', label: '組み込み・IoT' },
  { value: 'blockchain', label: 'ブロックチェーン' }
];

export const frameworksOptions: SelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxtjs', label: 'Nuxt.js' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'express', label: 'Express.js' },
  { value: 'nestjs', label: 'NestJS' },
  { value: 'django', label: 'Django' },
  { value: 'flask', label: 'Flask' },
  { value: 'fastapi', label: 'FastAPI' },
  { value: 'spring', label: 'Spring' },
  { value: 'laravel', label: 'Laravel' },
  { value: 'rails', label: 'Ruby on Rails' },
  { value: 'flutter', label: 'Flutter' },
  { value: 'react_native', label: 'React Native' }
];

export const communicationStyleOptions: SelectOption[] = [
  { value: 'formal', label: '丁寧・フォーマル' },
  { value: 'casual', label: 'カジュアル・親しみやすい' },
  { value: 'technical', label: '技術的・専門的' },
  { value: 'business', label: 'ビジネスライク' },
  { value: 'educational', label: '教育的・解説重視' }
];

export const responseStyleOptions: SelectOption[] = [
  { value: 'concise', label: '簡潔で要点を絞った回答' },
  { value: 'detailed', label: '詳細で丁寧な説明' },
  { value: 'examples', label: '具体例を多用した回答' },
  { value: 'step_by_step', label: 'ステップバイステップの説明' },
  { value: 'creative', label: 'クリエイティブで柔軟な発想' }
];

export const learningStyleOptions: SelectOption[] = [
  { value: 'hands_on', label: '実践的・ハンズオン' },
  { value: 'theoretical', label: '理論重視・体系的' },
  { value: 'visual', label: '視覚的・図解重視' },
  { value: 'trial_error', label: '試行錯誤・実験的' },
  { value: 'collaborative', label: '協力的・ディスカッション重視' }
];

export const interestsOptions: SelectOption[] = [
  { value: 'technology', label: 'テクノロジー・IT' },
  { value: 'business', label: 'ビジネス・経営' },
  { value: 'science', label: '科学・研究' },
  { value: 'arts', label: 'アート・クリエイティブ' },
  { value: 'sports', label: 'スポーツ・フィットネス' },
  { value: 'travel', label: '旅行・文化' },
  { value: 'education', label: '教育・学習' },
  { value: 'health', label: '健康・ウェルネス' },
  { value: 'finance', label: '投資・金融' },
  { value: 'environment', label: '環境・持続可能性' }
];

export const mbtiOptions: SelectOption[] = [
  { value: 'INTJ', label: 'INTJ（建築家）', description: '独創的で意志が強い戦略家' },
  { value: 'INTP', label: 'INTP（論理学者）', description: '革新的な発明家で知識に飢えている' },
  { value: 'ENTJ', label: 'ENTJ（指揮官）', description: '大胆で想像力豊かな強力な指導者' },
  { value: 'ENTP', label: 'ENTP（討論者）', description: '賢くて好奇心旺盛な思想家' },
  { value: 'INFJ', label: 'INFJ（提唱者）', description: '静かで神秘的、創造力あふれる理想主義者' },
  { value: 'INFP', label: 'INFP（仲介者）', description: '詩人的で親切、利他的な人' },
  { value: 'ENFJ', label: 'ENFJ（主人公）', description: 'カリスマ性がありインスピレーションを与える指導者' },
  { value: 'ENFP', label: 'ENFP（運動家）', description: '熱心で創造的、社交的で自由奔放' },
  { value: 'ISTJ', label: 'ISTJ（管理者）', description: '実用的で事実重視の信頼できる人' },
  { value: 'ISFJ', label: 'ISFJ（擁護者）', description: '心優しく、いつでも守る準備ができている' },
  { value: 'ESTJ', label: 'ESTJ（幹部）', description: '優秀な管理者、伝統と秩序の管理に長けている' },
  { value: 'ESFJ', label: 'ESFJ（領事）', description: '非常に思いやりがあり、社交的で人気がある' },
  { value: 'ISTP', label: 'ISTP（巨匠）', description: '大胆で実践的な実験者' },
  { value: 'ISFP', label: 'ISFP（冒険家）', description: '柔軟で魅力的な芸術家' },
  { value: 'ESTP', label: 'ESTP（起業家）', description: '賢くてエネルギッシュ、知覚に優れている' },
  { value: 'ESFP', label: 'ESFP（エンターテイナー）', description: '自発的でエネルギッシュで熱心' }
];

export const purposesOptions: SelectOption[] = [
  { value: 'work', label: '仕事・業務' },
  { value: 'learning', label: '学習・スキルアップ' },
  { value: 'research', label: '調査・研究' },
  { value: 'creative', label: '創作・アイデア出し' },
  { value: 'problem_solving', label: '問題解決・トラブルシューティング' },
  { value: 'planning', label: '企画・計画立案' },
  { value: 'consultation', label: '相談・アドバイス' },
  { value: 'general', label: '一般的な質問・雑談' }
];

export const locationOptions: SelectOption[] = [
  { value: 'tokyo', label: '東京都' },
  { value: 'osaka', label: '大阪府' },
  { value: 'kyoto', label: '京都府' },
  { value: 'yokohama', label: '神奈川県（横浜）' },
  { value: 'nagoya', label: '愛知県（名古屋）' },
  { value: 'fukuoka', label: '福岡県' },
  { value: 'sapporo', label: '北海道（札幌）' },
  { value: 'sendai', label: '宮城県（仙台）' },
  { value: 'other_japan', label: 'その他日本国内' },
  { value: 'asia', label: 'アジア' },
  { value: 'north_america', label: '北米' },
  { value: 'europe', label: 'ヨーロッパ' },
  { value: 'other', label: 'その他' }
];

export const personalityTraitsOptions: SelectOption[] = [
  { value: 'introverted', label: '内向的・思慮深い' },
  { value: 'extroverted', label: '外向的・社交的' },
  { value: 'logical', label: '論理的・分析的' },
  { value: 'intuitive', label: '直感的・感覚的' },
  { value: 'cautious', label: '慎重・リスク回避' },
  { value: 'aggressive', label: '積極的・チャレンジ精神' },
  { value: 'perfectionist', label: '完璧主義・品質重視' },
  { value: 'flexible', label: '柔軟性重視・適応力' },
  { value: 'individualistic', label: '個人主義・独立志向' },
  { value: 'collaborative', label: '協調性重視・チームワーク' },
  { value: 'innovative', label: '革新的・変化志向' },
  { value: 'conservative', label: '保守的・安定志向' },
  { value: 'optimistic', label: '楽観的・ポジティブ' },
  { value: 'realistic', label: '現実的・客観的' }
];

export const coreValuesOptions: SelectOption[] = [
  { value: 'growth_learning', label: '成長・学習' },
  { value: 'stability_security', label: '安定・安心' },
  { value: 'creativity_innovation', label: '創造性・革新' },
  { value: 'efficiency_productivity', label: '効率・生産性' },
  { value: 'quality_excellence', label: '品質・完璧性' },
  { value: 'fairness_justice', label: '公平・正義' },
  { value: 'freedom_independence', label: '自由・独立' },
  { value: 'cooperation_teamwork', label: '協力・チームワーク' },
  { value: 'family_private', label: '家族・プライベート' },
  { value: 'contribution_mission', label: '社会貢献・使命感' },
  { value: 'authenticity', label: '真正性・本物志向' },
  { value: 'diversity_inclusion', label: '多様性・包摂性' }
];

export const workPrioritiesOptions: SelectOption[] = [
  { value: 'results_achievement', label: '成果・結果' },
  { value: 'process_quality', label: 'プロセス・品質' },
  { value: 'relationships_communication', label: '人間関係・コミュニケーション' },
  { value: 'learning_growth', label: '学習・成長機会' },
  { value: 'work_life_balance', label: 'ワークライフバランス' },
  { value: 'autonomy_discretion', label: '裁量・自主性' },
  { value: 'stability_continuity', label: '安定性・継続性' },
  { value: 'innovation_challenge', label: '革新性・チャレンジ' },
  { value: 'teamwork_collaboration', label: 'チームワーク・協力' },
  { value: 'social_impact', label: '社会的意義・貢献' },
  { value: 'recognition_evaluation', label: '評価・承認' },
  { value: 'variety_stimulation', label: '多様性・刺激' }
];

export const educationLevelOptions: SelectOption[] = [
  { value: 'high_school', label: '高校卒業' },
  { value: 'vocational', label: '専門学校・職業訓練' },
  { value: 'associate', label: '短大・高専卒業' },
  { value: 'bachelor', label: '大学卒業（学士）' },
  { value: 'master', label: '大学院修了（修士）' },
  { value: 'phd', label: '博士号取得' },
  { value: 'other', label: 'その他' }
];

export const majorFieldOptions: SelectOption[] = [
  { value: 'computer_science', label: 'コンピュータサイエンス・情報学' },
  { value: 'engineering', label: '工学・技術系' },
  { value: 'business_economics', label: '経営・経済学' },
  { value: 'natural_sciences', label: '理学・自然科学' },
  { value: 'social_sciences', label: '社会科学・人文学' },
  { value: 'arts_design', label: 'アート・デザイン' },
  { value: 'medicine_health', label: '医学・保健' },
  { value: 'education', label: '教育学' },
  { value: 'law', label: '法学' },
  { value: 'psychology', label: '心理学' },
  { value: 'communication_media', label: 'コミュニケーション・メディア' },
  { value: 'other', label: 'その他' }
];

export const careerStageOptions: SelectOption[] = [
  { value: 'early_career', label: 'キャリア初期（新卒〜3年）' },
  { value: 'mid_career', label: 'キャリア中期（4〜10年）' },
  { value: 'senior_career', label: 'キャリア後期（11年以上）' },
  { value: 'career_change', label: 'キャリアチェンジ中' },
  { value: 'entrepreneur', label: '起業・独立' },
  { value: 'returning', label: '復職・再就職' }
];

export const decisionStyleOptions: SelectOption[] = [
  { value: 'data_driven', label: 'データ重視・分析的' },
  { value: 'intuition_based', label: '直感重視・経験的' },
  { value: 'consensus_building', label: '合意形成・協議重視' },
  { value: 'quick_decisive', label: '迅速・決断重視' },
  { value: 'risk_assessment', label: 'リスク評価・慎重' },
  { value: 'value_alignment', label: '価値観一致・理念重視' }
];

export const formSections: FormSection[] = [
  {
    id: 'basic',
    title: '基本情報',
    description: 'あなたの職業や経験について教えてください',
    fields: [
      {
        id: 'occupation',
        type: 'select',
        label: '職業・役職',
        required: true,
        options: occupationOptions,
        allowCustom: true,
        showInSimpleMode: true,
        canExclude: false
      },
      {
        id: 'experienceLevel',
        type: 'select',
        label: '経験レベル',
        options: experienceLevelOptions,
        showInSimpleMode: true,
        canExclude: true
      },
      {
        id: 'location',
        type: 'select',
        label: '地域',
        options: locationOptions,
        showInSimpleMode: false,
        canExclude: true,
        description: '個人情報が含まれます。プライバシー設定で除外できます。'
      }
    ]
  },
  {
    id: 'identity',
    title: '個人の特徴・アイデンティティ',
    description: 'あなたの性格や個人的な特徴について教えてください',
    fields: [
      {
        id: 'personalityTraits',
        type: 'multiselect',
        label: '性格的特徴',
        options: personalityTraitsOptions,
        showInSimpleMode: true,
        canExclude: true,
        description: '当てはまると思うものを選択してください（複数選択可）'
      },
      {
        id: 'strengths',
        type: 'text',
        label: '主な強み・得意分野',
        placeholder: '例: 問題解決能力、コミュニケーション力、論理的思考',
        showInSimpleMode: true,
        canExclude: true
      },
      {
        id: 'weaknesses',
        type: 'text',
        label: '改善したい点・苦手分野',
        placeholder: '例: 時間管理、プレゼンテーション、細部への注意',
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'roleModel',
        type: 'text',
        label: 'ロールモデル・尊敬する人',
        placeholder: '例: スティーブ・ジョブズ、チームのリーダー、特定の著者',
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'selfDescription',
        type: 'text',
        label: '自己紹介（一言で）',
        placeholder: '例: 好奇心旺盛なエンジニア、実践派のマネージャー',
        showInSimpleMode: true,
        canExclude: true
      }
    ]
  },
  {
    id: 'background',
    title: '背景・経歴・人生経験',
    description: 'あなたの学歴や経歴、重要な経験について教えてください',
    fields: [
      {
        id: 'educationLevel',
        type: 'select',
        label: '最終学歴',
        options: educationLevelOptions,
        showInSimpleMode: true,
        canExclude: true
      },
      {
        id: 'majorField',
        type: 'select',
        label: '専攻分野',
        options: majorFieldOptions,
        allowCustom: true,
        showInSimpleMode: true,
        canExclude: true
      },
      {
        id: 'careerStage',
        type: 'select',
        label: 'キャリアステージ',
        options: careerStageOptions,
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'careerTransition',
        type: 'textarea',
        label: 'キャリアの変遷・転機',
        placeholder: '例: 文系から理系への転向、起業経験、転職のきっかけ',
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'majorAchievement',
        type: 'text',
        label: '主要な成果・達成',
        placeholder: '例: プロジェクトの成功、資格取得、表彰',
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'learningFromFailure',
        type: 'text',
        label: '失敗から学んだ重要な教訓',
        placeholder: '例: チームワークの重要性、準備の大切さ',
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'lifeChangingEvent',
        type: 'text',
        label: '人生観に影響を与えた出来事',
        placeholder: '例: 海外経験、重要なプロジェクト、人との出会い',
        showInSimpleMode: false,
        canExclude: true
      }
    ]
  },
  {
    id: 'values',
    title: '価値観・信念',
    description: 'あなたが大切にしていることや意思決定の基準について教えてください',
    fields: [
      {
        id: 'coreValues',
        type: 'multiselect',
        label: '大切にしている価値観',
        options: coreValuesOptions,
        showInSimpleMode: true,
        canExclude: true,
        description: '特に重要だと思うものを3-5個選択してください'
      },
      {
        id: 'workPriorities',
        type: 'multiselect',
        label: '仕事で重視すること',
        options: workPrioritiesOptions,
        showInSimpleMode: true,
        canExclude: true,
        description: '仕事において特に重視する要素を選択してください'
      },
      {
        id: 'decisionStyle',
        type: 'select',
        label: '意思決定スタイル',
        options: decisionStyleOptions,
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'avoidanceFactors',
        type: 'text',
        label: '避けたいこと・嫌いなこと',
        placeholder: '例: 非効率な会議、明確でない指示、過度なプレッシャー',
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'idealWorkStyle',
        type: 'text',
        label: '理想の働き方・生き方',
        placeholder: '例: 自律的な環境、継続的な学習、社会への貢献',
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'socialContribution',
        type: 'text',
        label: '社会貢献に対する考え',
        placeholder: '例: 技術で社会課題を解決したい、教育に携わりたい',
        showInSimpleMode: false,
        canExclude: true
      }
    ]
  },
  {
    id: 'skills',
    title: '専門分野・スキル',
    description: 'あなたの専門知識やスキルについて教えてください',
    fields: [
      {
        id: 'skills',
        type: 'multiselect',
        label: '専門分野・スキル',
        options: skillsOptions,
        allowCustom: true,
        showInSimpleMode: true,
        canExclude: true
      }
    ]
  },
  {
    id: 'engineer_check',
    title: 'エンジニア判定',
    fields: [
      {
        id: 'isEngineer',
        type: 'checkbox',
        label: 'エンジニア・開発者ですか？',
        description: 'チェックすると技術関連の詳細な質問が追加されます',
        showInSimpleMode: true,
        canExclude: true
      }
    ]
  },
  {
    id: 'engineering',
    title: 'エンジニア詳細情報',
    description: '技術的な背景について詳しく教えてください',
    showIf: (data) => data.isEngineer === true,
    fields: [
      {
        id: 'programmingLanguages',
        type: 'multiselect',
        label: '主要プログラミング言語',
        options: programmingLanguagesOptions,
        showInSimpleMode: true,
        canExclude: true
      },
      {
        id: 'developmentFields',
        type: 'multiselect',
        label: '開発分野',
        options: developmentFieldsOptions,
        showInSimpleMode: true,
        canExclude: true
      },
      {
        id: 'frameworks',
        type: 'multiselect',
        label: '好きなフレームワーク・ツール',
        options: frameworksOptions,
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'developmentEnvironment',
        type: 'text',
        label: '開発環境',
        placeholder: '例: VS Code, MacBook Pro, Docker',
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'architecturePreference',
        type: 'text',
        label: 'アーキテクチャの好み',
        placeholder: '例: マイクロサービス, RESTful API, 関数型プログラミング',
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'mbtiType',
        type: 'select',
        label: 'MBTI性格タイプ',
        options: mbtiOptions,
        showInSimpleMode: false,
        canExclude: true,
        description: 'MBTIテストを受けたことがある場合は選択してください（任意）'
      }
    ]
  },
  {
    id: 'communication',
    title: 'コミュニケーションスタイル',
    description: 'どのような回答スタイルを好みますか？',
    fields: [
      {
        id: 'communicationStyle',
        type: 'select',
        label: 'コミュニケーションスタイル',
        options: communicationStyleOptions,
        showInSimpleMode: true,
        canExclude: true
      },
      {
        id: 'responseStyle',
        type: 'select',
        label: '回答スタイル',
        options: responseStyleOptions,
        showInSimpleMode: false,
        canExclude: true
      }
    ]
  },
  {
    id: 'learning',
    title: '学習・思考スタイル',
    description: 'あなたの学習や思考の特徴について教えてください',
    fields: [
      {
        id: 'learningStyle',
        type: 'select',
        label: '学習スタイル',
        options: learningStyleOptions,
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'thinkingStyle',
        type: 'text',
        label: '思考スタイル',
        placeholder: '例: ロジカル思考、創造的思考、批判的思考',
        showInSimpleMode: false,
        canExclude: true
      }
    ]
  },
  {
    id: 'interests',
    title: '関心事・興味',
    description: 'あなたの興味や関心のある分野について教えてください',
    fields: [
      {
        id: 'interests',
        type: 'multiselect',
        label: '関心事・興味',
        options: interestsOptions,
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'workEnvironment',
        type: 'text',
        label: '作業環境・好み',
        placeholder: '例: 静かな環境を好む、チームワークを重視、リモートワーク',
        showInSimpleMode: false,
        canExclude: true
      }
    ]
  },
  {
    id: 'context_enhancement',
    title: 'コンテキスト理解強化',
    description: 'AIがより適切な回答をするための補足情報',
    fields: [
      {
        id: 'professionalTerms',
        type: 'text',
        label: 'よく使う専門用語・業界用語',
        placeholder: '例: アジャイル、MVP、KPI、フロントエンド',
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'assumedKnowledge',
        type: 'text',
        label: '前提知識として持っていること',
        placeholder: '例: プログラミング基礎、ビジネス基本、特定の業界知識',
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'noExplanationNeeded',
        type: 'text',
        label: '説明不要な概念・技術',
        placeholder: '例: HTML/CSS、Excel基本操作、一般的なIT用語',
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'detailedInterest',
        type: 'text',
        label: '特に詳しく知りたい分野',
        placeholder: '例: 最新のAI動向、チームマネジメント手法、特定技術の深堀り',
        showInSimpleMode: false,
        canExclude: true
      },
      {
        id: 'preferredExamples',
        type: 'text',
        label: '理解しやすい例・比喩',
        placeholder: '例: 料理の例、スポーツの例、日常生活の例',
        showInSimpleMode: false,
        canExclude: true
      }
    ]
  },
  {
    id: 'purpose',
    title: '利用目的',
    description: 'このコンテキストをどのような目的で使用しますか？',
    fields: [
      {
        id: 'purposes',
        type: 'multiselect',
        label: '利用目的',
        options: purposesOptions,
        showInSimpleMode: true,
        canExclude: true
      }
    ]
  },
  {
    id: 'additional',
    title: 'その他・自由記述',
    description: '上記の項目で表現しきれない特徴や要望があれば記入してください',
    fields: [
      {
        id: 'freeText',
        type: 'textarea',
        label: '自由記述',
        placeholder: '例: 特定の業界の知識が必要、○○について詳しく知りたい、○○の視点から回答してほしい など',
        showInSimpleMode: true,
        canExclude: true
      }
    ]
  }
];
