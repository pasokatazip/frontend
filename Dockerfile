# ********************
# 依存関係をインストールする
# ********************
FROM node:24-alpine AS deps

WORKDIR /app

# package.json  pnpm-lock.yamlをコピーしてDocker cacheを効かせる
COPY package.json pnpm-lock.yaml ./

# pnpmをインストールして依存関係をインストール
RUN npm install -g pnpm@10.16.1 && \
    pnpm install --frozen-lockfile

# ********************
# 開発用
# ********************
FROM node:24-alpine AS dev

WORKDIR /app

RUN npm install -g pnpm@10.16.1
# deps stageで作ったnode_modulesを使う
COPY --from=deps /app/node_modules ./node_modules

# アプリコピー
COPY . .

EXPOSE 3000

# docker compose用。外部からアクセスできるように0.0.0.0で起動する
CMD ["pnpm", "run", "dev", "-H", "0.0.0.0"]

# ********************
# 本番build 
# ********************
FROM node:24-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@10.16.1

# deps stageで作ったnode_modulesを使う
COPY --from=deps /app/node_modules ./node_modules

# アプリコピー
COPY . .

# Next.jsを本番build
RUN pnpm run build

# ********************
# 本番実行
# ********************
FROM node:24-alpine AS prod

WORKDIR /app

RUN npm install -g pnpm@10.16.1

ENV NODE_ENV=production
ENV PORT=3000

# 本番起動に必要なファイルをコピー
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

# Next.jsを本番起動
CMD ["pnpm", "run", "start", "-H", "0.0.0.0"]