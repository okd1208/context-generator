# AIコンテキスト生成ツール

フォーム入力だけで、あなたの背景に最適化されたAI用プロンプトを生成するWebアプリケーションです。

## 🚀 特徴

- **簡単操作**: フォーム入力だけでプロンプト生成
- **2つのモード**: 簡易版（3分）と詳細版（10分）
- **エンジニア対応**: 技術者向けの専門質問に対応
- **プライバシー重視**: 完全クライアントサイド処理
- **カスタマイズ可能**: 項目の除外・プライバシー設定
- **複数形式対応**: テキスト・JSON形式での出力

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
