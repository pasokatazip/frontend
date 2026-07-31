# YO-YO frontend

Next.js App Router、Pixi.js、Tailwind CSS で実装した YO-YO のフロントエンドです。

## 再現手順（Docker Compose・推奨）

以下は、リポジトリを取得した直後から画面を表示するまでの最短手順です。

```bash
# 1. リポジトリを取得する
git clone https://github.com/pasokatazip/frontend.git
cd frontend

# 2. 環境変数ファイルを作る
cp .env.example .env

# 3. 「2. 環境変数を設定する」を参考に .env の各 URL を設定する

# 4. 開発サーバーを起動する
docker compose up --build
```

起動後、ブラウザで <http://127.0.0.1:3000> を開きます。未ログインの場合は `/Login` に移動します。

終了するときは、起動したターミナルで `Ctrl+C` を押した後、コンテナを停止します。

```bash
docker compose down
```

## 1. 必要な環境

Docker Compose を使う場合は、次のソフトウェアが必要です。

- Git
- Docker Desktop、または Docker Engine と Docker Compose
- ポート `3000` を使用できること
- 接続可能な YO-YO バックエンド API

Docker を使わずローカルで起動する場合は、`mise.toml` に記載された次のバージョンも必要です。

| ツール | バージョン |
| --- | --- |
| Node.js | 24.7.0 |
| pnpm | 10.16.1 |

## 2. 環境変数を設定する

`.env.example` をコピーして `.env` を作成し、各値を設定します。

```dotenv
# Next.js のサーバーから接続するバックエンド API のベース URL
PETYOYO_API_URL=http://127.0.0.1:8080

# ペット画像を配信するストレージ/CDN のベース URL
# 空の場合は、同一オリジンの画像パスを使用します
PETYOYO_IMAGE_URL=

# 画像キャッシュを更新したいときに変更する任意のバージョン文字列
PETYOYO_IMAGE_VERSION=
```

`PETYOYO_API_URL` は、`http://` または `https://` から始まる絶対 URL が必須です。API をローカルで動かす場合は、先にバックエンドを起動し、次のコマンドで応答を確認してください。

現在の `docker-compose.yaml` がコンテナへ渡すのは `PETYOYO_API_URL` と `PETYOYO_IMAGE_URL` です。`PETYOYO_IMAGE_VERSION` は、Docker を使わず起動するときに任意で設定できます。

```bash
curl http://127.0.0.1:8080/health
# 期待する応答: ok
```

フロントエンドを Docker Compose、バックエンドをホスト側で動かす場合、コンテナ内の `localhost` はバックエンドを指しません。Docker Desktop では `.env` を次のように変更します。

```dotenv
PETYOYO_API_URL=http://host.docker.internal:8080
```

バックエンドも Docker で動かしている場合は、両サービスを同じ Docker ネットワークへ接続し、バックエンドのサービス名を URL に指定してください。

## 3. Docker Compose で起動する

プロジェクトルートで次のコマンドを実行します。

```bash
docker compose up --build
```

初回は Docker イメージのビルドと `pnpm install --frozen-lockfile` が実行されるため、2回目以降より時間がかかります。ソースコードはコンテナへマウントされるため、起動中に変更すると画面へ反映されます。

バックグラウンドで起動する場合は、次のコマンドを使います。

```bash
docker compose up --build -d
docker compose logs -f front
```

## 4. Docker を使わず起動する

### mise を使う場合

```bash
mise install
pnpm install --frozen-lockfile
pnpm dev
```

### Node.js と pnpm を用意済みの場合

```bash
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm dev
```

表示されたバージョンが「1. 必要な環境」のバージョンと異なる場合は、`mise` の利用を推奨します。

## 5. 動作を確認する

| 確認対象 | URL |
| --- | --- |
| Next.js | <http://127.0.0.1:3000> |
| ログイン画面 | <http://127.0.0.1:3000/Login> |
| Storybook | <http://127.0.0.1:6006> |

Next.js の疎通だけを確認する場合は、次のコマンドも使用できます。

```bash
curl -I http://127.0.0.1:3000/Login
```

ログイン後の一連の動作を確認する場合は、次の順に操作します。

1. `/Signup` でユーザーを作成する
2. `/Setup` でペットを作成する
3. `/Home` でペットが表示されることを確認する
4. `/Post` からつぶやきを投稿する
5. `/Report` でレポートを確認する

この確認には、バックエンド API、データベース、名詞抽出サービス、および必要なマスターデータが起動・登録済みである必要があります。

## 6. Storybook と品質チェック

```bash
# UI コンポーネントを確認する
pnpm storybook

# 静的解析
pnpm lint

# TypeScript の型チェック
pnpm typecheck

# 本番用ビルド
pnpm build

# Storybook の静的ビルド
pnpm build-storybook
```

## 7. よくある問題

### `PETYOYO_API_URL` の検証エラーが表示される

`.env` の `PETYOYO_API_URL` が空、または絶対 URL ではありません。`http://127.0.0.1:8080` のようにスキームを含めて指定し、開発サーバーを再起動してください。

### Docker 起動時に API へ接続できない

`PETYOYO_API_URL=http://localhost:8080` では、`localhost` がフロントエンドコンテナ自身を指します。Docker Desktop では `http://host.docker.internal:8080` を使用してください。

### ペット画像が表示されない

`PETYOYO_IMAGE_URL` の値と、画像配信先への接続を確認してください。環境変数を変更した後は開発サーバーを再起動します。

### ポートが使用中と表示される

ポート `3000` を使用している別プロセスを停止してから、もう一度起動してください。Storybook の場合はポート `6006` を確認します。

### 依存関係の状態がおかしい

ローカル起動では、Node.js と pnpm のバージョンを確認してから依存関係を入れ直します。

```bash
pnpm install --frozen-lockfile
```
