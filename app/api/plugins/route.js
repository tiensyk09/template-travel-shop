import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /api/plugins — Public: lấy danh sách plugin đã cài cho site này (không cần auth)
export async function GET() {
  try {
    const rows = await query(
      "SELECT `key`, `value` FROM settings WHERE `key` IN ('site_name', 'manager_url')"
    );
    const config = {};
    rows.forEach(r => { config[r.key] = r.value; });

    const siteName = config.site_name || '';
    const managerUrl = (config.manager_url || 'https://autoweb.tubecreate.com').replace(/\/+$/, '');

    if (!siteName) {
      return NextResponse.json({ installed: [] });
    }

    const res = await fetch(`${managerUrl}/api/plugins/installed/${siteName}`, {
      headers: { 'X-User-Email': 'public' },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      return NextResponse.json({ installed: [] });
    }

    const data = await res.json();
    return NextResponse.json({
      installed: data.installed || [],
      managerUrl,
      siteName
    });
  } catch {
    return NextResponse.json({ installed: [] });
  }
}
