# AIコンテキスト生成ツール

フォーム入力だけで、あなたの背景に最適化されたAI用プロンプトを生成するWebアプリケーションです。

## 🚀 特徴

- **簡単操作**: フォーム入力だけでプロンプト生成
- **2つのモード**: 簡易版（3分）と詳細版（10分）
- **エンジニア対応**: 技術者向けの専門質問に対応
- **プライバシー重視**: 完全クライアントサイド処理
- **カスタマイズ可能**: 項目の除外・プライバシー設定
- **複数形式対応**: テキスト・JSON形式での出力
- **ペルソナ生成**: 詳細な人物設定からAI用プロンプトを生成

## 📚 ペルソナ生成機能

このプロジェクトには、AIに特定の人物になりきってもらうための詳細なペルソナコンテキストを生成する機能が含まれています。

### 含まれるファイル
- `persona-generation-questions.md`: ペルソナ作成用の100の質問項目
- `persona-generation-guidelines.md`: 効果的なペルソナ生成のためのガイドライン
- `sample-persona-tanaka-sakiko.md`: サンプルペルソナ（28歳女性IT企業勤務）
- `ai-persona-prompt-template.md`: AI用プロンプトのテンプレート
- `ai-prompt-tanaka-sakiko.md`: サンプル用の完成したAIプロンプト

### 活用方法
1. 質問項目を参考に対象人物の詳細情報を収集
2. ガイドラインに従ってペルソナを構築
3. テンプレートを使ってAI用プロンプトを生成
4. ChatGPT、Claude等でそのプロンプトを使用してなりきりAIを実現

## 🎯 使用例

### 対応AIサービス
- ChatGPT
- Claude
- Gemini
- Microsoft Copilot
- その他のAIチャットサービス

### 利用シーン
- 仕事での技術相談
- 学習・スキルアップ
- 創作・アイデア出し
- 問題解決・トラブルシューティング

## 🛠️ 技術構成

- **フロントエンド**: Next.js 14 + TypeScript
- **スタイリング**: Tailwind CSS
- **フォーム管理**: React Hook Form + Zod
- **アイコン**: Lucide React
- **デプロイ**: 静的エクスポート対応

## 📦 セットアップ

### 依存関係のインストール
```bash
npm install
```

### 開発サーバーの起動
```bash
npm run dev
```

### ビルド
```bash
npm run build
```

### 静的エクスポート
```bash
npm run export
```

## 📁 プロジェクト構成

```
context-generator/
├── components/
│   ├── forms/          # フォーム関連コンポーネント
│   │   ├── ModeSelection.tsx
│   │   ├── ContextForm.tsx
│   │   ├── FormField.tsx
│   │   └── PromptResult.tsx
│   └── ui/             # UIコンポーネント
│       └── FormElements.tsx
├── pages/
│   ├── _app.tsx
│   └── index.tsx
├── styles/
│   └── globals.css
├── types/
│   └── form.ts
├── utils/
│   ├── formData.ts     # フォーム定義データ
│   └── promptGenerator.ts  # プロンプト生成ロジック
├── persona-generation-questions.md    # ペルソナ生成用質問項目（100問）
├── persona-generation-guidelines.md   # 効果的なペルソナ生成ガイドライン
├── sample-persona-tanaka-sakiko.md    # サンプルペルソナ（田中咲子）
├── ai-persona-prompt-template.md      # AI用プロンプトテンプレート
├── ai-prompt-tanaka-sakiko.md         # 田中咲子用AIプロンプト
├── next.config.js
├── tailwind.config.js
└── package.json
```

## 🔧 カスタマイズ

### フォーム項目の追加
`utils/formData.ts`でフォームセクションや項目を追加・編集できます。

### プロンプトテンプレートの変更
`utils/promptGenerator.ts`でプロンプト生成ロジックをカスタマイズできます。

### デザインの変更
`tailwind.config.js`と`styles/globals.css`でデザインを調整できます。

## 🌐 デプロイ

### Cloudflare Pages
```bash
npm run build
```
生成された`out/`フォルダをCloudflare Pagesにアップロード

### Netlify
```bash
npm run build
```
生成された`out/`フォルダをNetlifyにデプロイ

### GitHub Pages
1. リポジトリをGitHubに作成
2. GitHub Actionsで自動デプロイ設定
3. `out/`フォルダをgh-pagesブランチにデプロイ

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します！

## 📞 サポート

質問や要望がある場合は、GitHubのIssuesをご利用ください。
