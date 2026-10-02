import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

/** 知識文章：來源是 content/articles/*.md，build 時讀檔、全靜態輸出（standalone 執行環境沒有 content/）。
 *  新增文章 = 加一個 md + push 重新部署。 */
export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: 'draft' | 'published';
  /** 內文中文字數，約略，列表顯示閱讀時間用 */
  chars: number;
};

export type Heading = { id: string; text: string };
export type Article = ArticleMeta & { html: string; headings: Heading[] };

const DIR = path.join(process.cwd(), 'content', 'articles');

/** 分類顯示順序（README 的分法） */
export const CATEGORY_ORDER = ['合約與預算', '工程知識', '施工與驗收', '規劃與設計', '選材與設備'];

function readAll(): Article[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => {
      const raw = fs.readFileSync(path.join(DIR, f), 'utf8');
      const { data, content } = matter(raw);
      const rawHtml = marked.parse(content, { gfm: true, breaks: false }) as string;
      // h2 補 id 給側欄目錄用（marked 預設不產 id）
      const headings: Heading[] = [];
      const html = rawHtml.replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, inner: string) => {
        const id = `s${headings.length + 1}`;
        headings.push({ id, text: inner.replace(/<[^>]+>/g, '') });
        return `<h2 id="${id}">${inner}</h2>`;
      });
      const chars = (content.match(/[一-鿿]/g) ?? []).length;
      return {
        slug: String(data.slug ?? f.replace(/\.md$/, '')),
        title: String(data.title ?? ''),
        description: String(data.description ?? ''),
        category: String(data.category ?? '其他'),
        date: data.date ? String(data.date).slice(0, 10) : '',
        status: (data.status === 'published' ? 'published' : 'draft') as ArticleMeta['status'],
        chars,
        html,
        headings,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title, 'zh-Hant')));
}

let cache: Article[] | null = null;
function all(): Article[] {
  if (!cache) cache = readAll();
  return cache;
}

/** 目前 draft 也會顯示（老闆要先看效果）；之後要只出 published 時把這個 filter 打開。 */
const visible = (a: Article) => a.status === 'published' || a.status === 'draft';

export function getArticles(): ArticleMeta[] {
  return all().filter(visible).map(({ html: _html, headings: _h, ...meta }) => meta);
}

export function getArticle(slug: string): Article | null {
  return all().find((a) => a.slug === slug && visible(a)) ?? null;
}

export const articlePath = (slug: string) => `/articles/${slug}`;

/** 閱讀時間：中文約 400 字/分鐘 */
export const readMinutes = (chars: number) => Math.max(1, Math.round(chars / 400));
