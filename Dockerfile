# 統包先生官網 — Next.js standalone Docker build
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# NEXT_PUBLIC_* 需在 build 時 inline 進前端 bundle（皆為可公開的 publishable 值）
ARG NEXT_PUBLIC_SUPABASE_URL=https://obgobetnlecbmypvfnsq.supabase.co
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_yxXv8UbQkE5CNZNFpeq4qg_26E7jmfw
ARG NEXT_PUBLIC_SITE_URL=https://www.mrturnkey.com.tw
ARG NEXT_PUBLIC_LINE_URL=
# Google Maps JavaScript API 瀏覽器金鑰（已限制 referrer 為官網網域，公開無妨；GCP 專案 sage-ripple-483908-m4）
ARG NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIzaSyDg5di0kF3kAaNg5jTey0ArOGz9wVPxFuc
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
    NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_LINE_URL=$NEXT_PUBLIC_LINE_URL \
    NEXT_PUBLIC_GOOGLE_MAPS_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_KEY
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=8080
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 8080
CMD ["node", "server.js"]
