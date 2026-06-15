import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_KEY!;

// service role client（僅後端使用），寫入 website.inquiries
const admin = createClient(url, serviceKey, { db: { schema: 'website' } });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? '').trim();
    const phone = String(body.phone ?? '').trim();

    if (!name || !phone) {
      return NextResponse.json({ error: '姓名與電話為必填' }, { status: 400 });
    }

    const { error } = await admin.from('inquiries').insert({
      name,
      phone,
      house_type: body.house_type || null,
      size: body.size || null,
      region: body.region || null,
      budget: body.budget || null,
      message: body.message || null,
    });

    if (error) {
      console.error('[contact] insert error:', error.message);
      return NextResponse.json({ error: '寫入失敗' }, { status: 500 });
    }

    // TODO: 之後可在此串接 LINE Notify / n8n webhook 即時通知業務
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[contact] error:', e);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  }
}
