ARG NODE_VERSION=24.18.0

# ********************
# 共通のNode・pnpm環境
# ********************
FROM node:${NODE_VERSION}-alpine3.24 AS base

ARG PNPM_VERSION=10.16.1

# pnpmはCorepackで管理し、実行時に不要なnpmはイメージへ残さない
RUN corepack enable && \
    corepack prepare pnpm@${PNPM_VERSION} --activate && \
    rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

# ********************
# 依存関係をインストールする
# ********************
FROM base AS deps

WORKDIR /app

# package.json  pnpm-lock.yamlをコピーしてDocker cacheを効かせる
COPY package.json pnpm-lock.yaml ./

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# ********************
# 開発用
# ********************
FROM base AS dev

WORKDIR /app

EXPOSE 3000

# docker compose用。外部からアクセスできるように0.0.0.0で起動する
CMD ["pnpm", "run", "dev", "-H", "0.0.0.0"]

# ********************
# 本番build 
# ********************
FROM base AS builder

WORKDIR /app

# deps stageで作ったnode_modulesを使う
COPY --from=deps /app/node_modules ./node_modules

# アプリコピー
COPY . .

# Next.jsを本番build
RUN pnpm run build

# ********************
# 本番実行
# ********************
FROM base AS prod

WORKDIR /app

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
