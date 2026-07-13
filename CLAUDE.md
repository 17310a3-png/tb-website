# tb-website — 統包先生品牌官網

統包先生 MR.TURNKEY 對外品牌官網。作品集用 Supabase 當 CMS，可自助新增免重部署。

## 基本資訊

- **GitHub**: `17310a3-png/tb-website`
- **Zeabur project**: `tb-website`（id `6a2fa71317cd262e1f74d59e`）
- **本地路徑**: `Desktop/TB project/專案-官網/` ⚠️ 資料夾名跟 service name 不一致
- **生產網域**: https://mrturnkey.com.tw（www + 裸網域，HiNet DNS A 記錄 → `47.74.18.58`，TLS 已簽）
- **Zeabur 預設網域**: https://tb-website.zeabur.app（仍可用）

## Stack

- **Next.js 15**（App Router、SSR/ISR）+ React 19 + **TypeScript**
- **framer-motion**：進場滾動 / 淡入 / lightbox 動畫
- **Supabase**（project `obgobetnlecbmypvfnsq`、schema `website`）當 CMS
- 部署：Zeabur（Dockerfile，`output: 'standalone'`）

⚠️ 這是 TB 子系統中**唯一**用 Next.js + TS 的（其餘 8 個是 Vite+React，多為 JS）。改動時別套錯 stack 慣例。

## 資料層（website schema）

| 物件 | 用途 |
|---|---|
| `website.projects` | 作品集案場（ISR 每 60s 重新產生一次，改資料免重部署） |
| `website.inquiries` | 官網詢問表單來信 |
| Storage bucket `website` | 作品集照片（`next.config.mjs` remotePatterns 已放行 supabase host） |

## CMS 自助更新流程（給老闆 / 非工程用）

改作品集**不需要動 code、不需要重部署**：
1. 進 Supabase → Table Editor → schema `website` → `projects` 新增/編輯一列
2. 照片上傳到 Storage bucket `website`，把公開 URL 填回該列
3. 最多 60 秒後官網自動更新（ISR revalidate）

## 對外公開，不接 SSO

- **沒有登入**：純對外官網，不接 tb-portal SSO、不在 `hr.portal_subsystems`
- 唯一「寫入」是訪客送詢問表單 → `POST /api/contact` → `website.inquiries`

## 主要檔案

| 路徑 | 用途 |
|---|---|
| `src/app/page.tsx` | 單頁式 landing（組裝下方各 section 元件） |
| `src/app/layout.tsx` | 全站 layout + SEO meta / JSON-LD / canonical |
| `src/app/sitemap.ts` / `robots.ts` | SEO（sitemap 已提交 Google Search Console） |
| `src/app/api/contact/route.ts` | 詢問表單 endpoint → 寫 `website.inquiries` |
| `src/lib/projects.ts` | 從 Supabase 讀 `website.projects`（作品集資料源） |
| `src/components/Hero / About / Services / Why / Process` | landing 各段落 |
| `src/components/Portfolio / PortfolioGrid` | 作品集（橫向捲動 + lightbox） |
| `src/components/Locations` | 8 分店據點 |
| `src/components/Contact / Faq / Footer / Nav` | 聯絡 / 常見問題 / 頁尾 / 導航 |
| `src/components/Marquee / NumbersStrip / FloatCta / Reveal` | 跑馬燈 / 數據條 / 浮動 CTA / 進場動畫 wrapper |
| `next.config.mjs` | standalone 輸出 + Supabase 圖片 host 白名單 |
| `Dockerfile` | Zeabur 部署 |

## 環境變數

| Key | 說明 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 專案 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | publishable key（前端讀作品集用） |
| `SUPABASE_SERVICE_KEY` | service key（後端寫 inquiries，`sb_secret_*` 新格式） |
| `NEXT_PUBLIC_SITE_URL` | 正式網域（SEO / canonical 用），已設 `https://mrturnkey.com.tw` |
| `NEXT_PUBLIC_LINE_URL` | 🚫 **刻意留空、不要填**：官網一律導向 `#contact` 的 SurveyCake 預約表單（`surveycake.com/s/Ad81e`）。客戶填單後才由表單流程加入官方 LINE。若填了 lin.ee 直接加好友連結，會讓客人繞過表單 → 跳過 n8n 區域分流 + tb-cases 收單，客源資料與路由都會遺失。`FloatCta` 與 `Contact` 的 LINE 按鈕在此值為空時自動隱藏（正確行為）。 |

## 部署（auto-deploy 已通 ✓）

~~曾記載「MCP 建的 service 無 webhook、push 後要手動重建」~~ → **2026-07-13 稽核實證已解除**：push 後 5 秒內自動觸發部署（實證：commit `7e9ef51` 16:33:40 → 部署 16:33:45）。現在 `git push` 即自動部署，與其他子系統相同。詳見母 `docs/ZEABUR_AUDIT_2026-07-13.md`。

## 開發指令

```bash
cd "專案-官網"
npm install
cp .env.local.example .env.local   # 填入 Supabase 金鑰
npm run dev      # http://localhost:3000
npm run build && npm start   # 本地跑 production build
```

## 跨子系統共用

- 共用 Supabase project `obgobetnlecbmypvfnsq`（獨立 `website` schema，不碰 hr/cases/quotation）
- `SUPABASE_SERVICE_KEY` 用全 TB 統一的 `sb_secret_*` 格式
- 品牌資產（LOGO 去背字標等）來源見母資料夾 `brand_assets/`

## 母資料夾關係

母 `TB project/.gitignore` 白名單模式自動排除本子資料夾；本 repo 有自己的 `.git/` + 自己的 GitHub remote `17310a3-png/tb-website`。
