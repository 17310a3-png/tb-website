import type { MetadataRoute } from 'next';
import { getProjects, projectPath } from '@/lib/projects';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mrturnkey.com.tw';

// 首頁 + 每個已發佈作品一個網址；Supabase 新增案子後自動進 sitemap
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projects.map((p) => ({
      url: `${SITE}${projectPath(p.slug)}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
