# ********************
# 依存関係をインストールする
# ********************
FROM node:26-alpine AS deps

WORKDIR /app

# package.json / package-lock.jsonをコピーしてDocker cacheを効かせる
COPY package*.json ./

# package-lock.jsonに基づいて依存関係を再現性高くインストール
RUN npm ci

# ********************
# 開発用
# ********************
FROM node:26-alpine AS dev

WORKDIR /app

# deps stageで作ったnode_modulesを使う
COPY --from=deps /app/node_modules ./node_modules

# アプリコピー
COPY . .

EXPOSE 3000

# docker compose用。外部からアクセスできるように0.0.0.0で起動する
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]

# ********************
# 本番build 
# ********************
FROM node:26-alpine AS builder

WORKDIR /app

# deps stageで作ったnode_modulesを使う
COPY --from=deps /app/node_modules ./node_modules

# アプリコピー
COPY . .

# Next.jsを本番build
RUN npm run build

# ********************
# 本番実行
# ********************
FROM node:26-alpine AS prod

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# 本番起動に必要なファイルをコピー
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

# Next.jsを本番起動
CMD ["npm", "start", "--", "-H", "0.0.0.0"]