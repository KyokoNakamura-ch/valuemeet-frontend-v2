# N2frontend - 会議支援システム

## 概要
会議の効率化とファシリテーションを支援するNext.jsアプリケーションです。

## 🚀 セットアップ手順

### 前提条件
- Node.js 18.x 以上
- npm または yarn

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 必要な追加パッケージのインストール
```bash
npm install lucide-react clsx tailwind-merge class-variance-authority vaul react-day-picker recharts input-otp next-themes sonner cmdk embla-carousel-react react-resizable-panels react-hook-form vite @radix-ui/react-slot @radix-ui/react-checkbox @radix-ui/react-radio-group @radix-ui/react-switch @radix-ui/react-slider @radix-ui/react-label @radix-ui/react-toast @radix-ui/react-alert-dialog @radix-ui/react-progress @radix-ui/react-tabs @radix-ui/react-navigation-menu @radix-ui/react-dropdown-menu @radix-ui/react-menubar @radix-ui/react-popover @radix-ui/react-tooltip @radix-ui/react-hover-card @radix-ui/react-avatar @radix-ui/react-separator @radix-ui/react-select @radix-ui/react-accordion @radix-ui/react-aspect-ratio @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-context-menu @radix-ui/react-scroll-area @vitejs/plugin-react
```

### 3. 開発サーバーの起動
```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いてアプリケーションを確認してください。

## 📱 ページ構成

### 🏠 ホーム (`/`)
- ダッシュボード画面
- 各機能へのナビゲーション

### 📊 分析 (`/analytics`)
- 会議の効率性分析
- 統計データの表示
- チャートとメトリクス

### 📅 会議管理 (`/meeting-management`)
- 会議一覧の表示
- 新しい会議の作成
- 会議の編集・削除
- **検索機能**: 全幅検索ボックス + 右端フィルター

### 🎯 会議進行 (`/meeting/[id]`)
- リアルタイム会議ファシリテーション
- アジェンダ管理
- 議事録の自動生成
- ファシリテーションツール
- **レイアウト**: 上段（アジェンダ + ツール）、下段（議事録全幅）

### ✅ TODO管理 (`/todo-management`)
- タスク一覧の表示
- TODO抽出機能
- 進捗管理
- **検索機能**: 全幅検索ボックス + 右端フィルター

### ⭐ 評価登録 (`/evaluation`)
- 会議の評価入力
- 評価履歴の確認
- **検索機能**: 全幅検索ボックス

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 13 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: Radix UI
- **アイコン**: Lucide React

## 📁 プロジェクト構造

```
N2frontend/
├── app/                    # Next.js App Router
│   ├── globals.css        # グローバルスタイル（枠線削除済み）
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   ├── analytics/         # 分析ページ
│   ├── evaluation/        # 評価ページ
│   ├── meeting/           # 会議詳細ページ
│   │   └── [id]/         # 動的ルート
│   ├── meeting-management/# 会議管理ページ
│   └── todo-management/   # TODO管理ページ
├── components/            # 再利用可能なコンポーネント
│   ├── ui/               # UIコンポーネント
│   ├── CreateMeetingModal.tsx
│   ├── EvaluationModal.tsx
│   ├── TodoExtractionModal.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── hooks/                # カスタムフック
├── lib/                  # ユーティリティ関数
└── public/               # 静的ファイル
```

## 🔧 開発時の注意事項

### スタイリング
- **グローバルCSS**: `* { @apply border; }` を削除済み（枠線なし）
- **検索ボックス**: 全ページで全幅表示
- **フィルター**: 右端固定配置
- **カードレイアウト**: 影のみでボーダーなし

### TypeScript
- 型エラーには注意
- インターフェースを明確に定義
- `any` 型の使用は最小限に

### コンポーネント設計
- 再利用可能なUIコンポーネントは `components/ui/` に配置
- モーダルコンポーネントは `components/` 直下
- ページ固有のコンポーネントはページ内で定義

## 📋 利用可能なスクリプト

```bash
npm run dev      # 開発サーバーを起動
npm run build    # 本番用ビルドを作成
npm run start    # 本番用サーバーを起動
npm run lint     # コードの静的解析を実行
```

## 🐛 トラブルシューティング

### よくある問題

1. **`lucide-react` が見つからない**
   ```bash
   npm install lucide-react
   ```

2. **Tailwindのカスタムクラスエラー**
   - `tailwind.config.js` でカスタムカラーを定義
   - VS Code の Tailwind CSS IntelliSense 拡張機能をインストール

3. **TypeScriptエラー**
   ```bash
   npm install --save-dev @types/react @types/react-dom
   ```

### キャッシュクリア
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🎨 デザインシステム

### カラーパレット
- **Primary**: オレンジ系 (`bg-orange-600`)
- **Secondary**: グレー系
- **Success**: グリーン系
- **Warning**: イエロー系
- **Error**: レッド系

### レスポンシブデザイン
- モバイルファースト
- `lg:` ブレークポイントでデスクトップレイアウト
- グリッドシステム活用

## 👥 チーム開発

### Git ワークフロー
1. 機能ブランチを作成
2. 変更をコミット
3. プルリクエスト作成
4. レビュー後マージ

### コーディング規約
- ESLintルールに従う
- コンポーネント名は PascalCase
- ファイル名は kebab-case