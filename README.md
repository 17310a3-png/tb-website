# 統包先生 MR.TURNKEY 官方網站 (tb-website)

住宅裝修整合服務品牌官網。Next.js (App Router) + Supabase CMS。

## 技術架構

- **Next.js 15**（App Router、ISR）+ React 19 + TypeScript
- **framer-motion** — 進場 / 滾動 / lightbox 動畫
- **Supabase**（專案 `obgobetnlecbmypvfnsq`，`website` schema）
  - `website.projects` — 作品集（前台 ISR 讀取，60 秒自動更新）
  - `website.inquiries` — 預約諮詢表單收件匣
  - Storage bucket `website` — 作品集圖片（公開）
- 部署：Zeabur

## 本地開發

```bash
npm install
cp .env.local.example .env.local   # 填入 Supabase 金鑰
npm run dev      # http://localhost:3000
```

## 環境變數

| 變數 | 用途 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 專案 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | publishable key（前台讀作品集） |
| `SUPABASE_SERVICE_KEY` | service key（後端寫表單，**勿外洩**） |
| `NEXT_PUBLIC_SITE_URL` | 正式網域（OG / canonical 用） |
| `NEXT_PUBLIC_LINE_URL` | 官方 LINE 連結（選填，未填則 LINE 鈕為 #） |

## 老闆如何「自己補作品集」

不用改 code、不用重新部署，最多 60 秒後自動上站：

1. 進 Supabase → Table Editor → schema `website` → `projects`
2. **Insert row**：填 `slug`(英文唯一)、`name`、`category`(住宅裝修/商業空間)、`location`、`style`、`description`、`sort_order`
3. 圖片：Storage → `website` bucket → 上傳到 `projects/<slug>/`，複製公開網址
4. `cover_url` 填封面網址、`images` 填全部圖片網址的 JSON 陣列，例：
   `["https://.../01.jpg","https://.../02.jpg"]`
5. `is_published` 設 true（要當旗艦案就 `is_featured` = true）

> 之後可再做一個圖形化後台（上傳圖片自動寫表），目前先用 Supabase Studio 管理。

## 待補（功能缺口）

- [ ] 官方 LINE 連結（設 `NEXT_PUBLIC_LINE_URL`）
- [ ] 表單即時通知（API route 已留 TODO，可串 LINE Notify / n8n）
- [ ] 團隊大合照（About 區目前用完工實景頂著）
- [ ] 正式網域（設 `NEXT_PUBLIC_SITE_URL` + Zeabur 綁定）
