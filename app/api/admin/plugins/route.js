import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET: Lấy danh sách plugin khả dụng và đã cài từ central manager
export async function GET() {
  try {
    const rows = await query("SELECT `key`, `value` FROM settings WHERE `key` IN ('site_name', 'manager_url')");
    const config = {};
    rows.forEach(r => {
      config[r.key] = r.value;
    });

    const siteName = config.site_name || 'hcc-danang';
    const managerUrl = (config.manager_url || 'https://autoweb.tubecreate.com').replace(/\/+$/, '');

    // 1. Fetch available plugins in store
    const storeRes = await fetch(`${managerUrl}/api/plugins`, {
      headers: { 'X-User-Email': 'admin@tubecreate.com' },
      next: { revalidate: 0 }
    });
    if (!storeRes.ok) {
      throw new Error(`Failed to fetch plugins from manager: ${storeRes.statusText}`);
    }
    const storeData = await storeRes.json();

    // 2. Fetch installed plugins on this site
    const installedRes = await fetch(`${managerUrl}/api/plugins/installed/${siteName}`, {
      headers: { 'X-User-Email': 'admin@tubecreate.com' },
      next: { revalidate: 0 }
    });
    if (!installedRes.ok) {
      throw new Error(`Failed to fetch installed plugins: ${installedRes.statusText}`);
    }
    const installedData = await installedRes.json();

    return NextResponse.json({
      plugins: storeData.plugins || [],
      installed: installedData.installed || []
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Thực hiện cài đặt (install) hoặc gỡ cài đặt (uninstall) plugin
export async function POST(req) {
  try {
    const body = await req.json();
    const { action, pluginId, config: pluginConfig } = body;

    if (!pluginId) {
      return NextResponse.json({ error: 'Plugin ID is required' }, { status: 400 });
    }

    const rows = await query("SELECT `key`, `value` FROM settings WHERE `key` IN ('site_name', 'manager_url')");
    const config = {};
    rows.forEach(r => {
      config[r.key] = r.value;
    });

    const siteName = config.site_name || 'hcc-danang';
    const managerUrl = (config.manager_url || 'https://autoweb.tubecreate.com').replace(/\/+$/, '');

    if (action === 'install') {
      const res = await fetch(`${managerUrl}/api/plugins/install`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': 'admin@tubecreate.com'
        },
        body: JSON.stringify({ site: siteName, pluginId, config: pluginConfig })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Install failed');
      return NextResponse.json(data);
    } 
    
    if (action === 'uninstall') {
      const res = await fetch(`${managerUrl}/api/plugins/uninstall`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Email': 'admin@tubecreate.com'
        },
        body: JSON.stringify({ site: siteName, pluginId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Uninstall failed');
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PATCH: Cập nhật cấu hình (configuration) của plugin đã cài
export async function PATCH(req) {
  try {
    const body = await req.json();
    const { pluginId, config: pluginConfig } = body;

    if (!pluginId || !pluginConfig) {
      return NextResponse.json({ error: 'Plugin ID and config are required' }, { status: 400 });
    }

    const rows = await query("SELECT `key`, `value` FROM settings WHERE `key` IN ('site_name', 'manager_url')");
    const config = {};
    rows.forEach(r => {
      config[r.key] = r.value;
    });

    const siteName = config.site_name || 'hcc-danang';
    const managerUrl = (config.manager_url || 'https://autoweb.tubecreate.com').replace(/\/+$/, '');

    const res = await fetch(`${managerUrl}/api/plugins/configure`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': 'admin@tubecreate.com'
      },
      body: JSON.stringify({ site: siteName, pluginId, config: pluginConfig })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Configure failed');
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
