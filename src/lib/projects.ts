import { createClient } from '@supabase/supabase-js';

export type Project = {
  id: string;
  slug: string;
  name: string;
  category: string;
  location: string | null;
  style: string | null;
  description: string | null;
  cover_url: string;
  images: string[];
  is_featured: boolean;
  sort_order: number;
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// website schema 用獨立 client（PostgREST schema profile）
const supabase = createClient(url, anon, { db: { schema: 'website' } });

/** 取得已發佈作品集，依 sort_order 排序。前台 ISR 用。 */
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getProjects]', error.message);
    return [];
  }
  return (data ?? []) as Project[];
}
