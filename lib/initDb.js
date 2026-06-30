import { query } from './db';
import { hashPassword } from './auth';

export async function initDatabase() {
  // Signups table
  await query(`
    CREATE TABLE IF NOT EXISTS signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Settings table
  await query(`
    CREATE TABLE IF NOT EXISTS settings (
      \`key\` VARCHAR(255) NOT NULL PRIMARY KEY,
      \`value\` TEXT
    )
  `);

  // Users table
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(255) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      display_name TEXT,
      email TEXT,
      phone VARCHAR(100),
      address TEXT,
      role VARCHAR(50) NOT NULL DEFAULT 'member',
      tier VARCHAR(50) NOT NULL DEFAULT 'Free',
      active INTEGER NOT NULL DEFAULT 1,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  try {
    await query('ALTER TABLE users ADD COLUMN phone VARCHAR(100)');
  } catch (err) {}

  try {
    await query('ALTER TABLE users ADD COLUMN address TEXT');
  } catch (err) {}

  try {
    await query("ALTER TABLE users ADD COLUMN tier VARCHAR(50) NOT NULL DEFAULT 'Free'");
  } catch (err) {}

  // Alter products table columns if missing
  const productsColumns = [
    { name: 'original_price', type: 'REAL' },
    { name: 'images', type: 'TEXT' },
    { name: 'brand', type: 'VARCHAR(255)' },
    { name: 'origin', type: 'VARCHAR(255)' },
    { name: 'unit', type: "VARCHAR(100) DEFAULT 'Hộp'" },
    { name: 'sold_count', type: 'INTEGER DEFAULT 0' },
    { name: 'view_count', type: 'INTEGER DEFAULT 0' },
    { name: 'rating', type: 'REAL DEFAULT 0' },
    { name: 'is_featured', type: 'INTEGER DEFAULT 0' },
    { name: 'is_flash_sale', type: 'INTEGER DEFAULT 0' },
    { name: 'flash_sale_price', type: 'REAL' },
    { name: 'flash_sale_end', type: 'VARCHAR(100)' },
    { name: 'tags', type: 'TEXT' },
    { name: 'meta_title', type: 'TEXT' },
    { name: 'meta_description', type: 'TEXT' }
  ];

  for (const col of productsColumns) {
    try {
      await query(`ALTER TABLE products ADD COLUMN ${col.name} ${col.type}`);
    } catch (err) {
      // Column might already exist
    }
  }

  // Posts/Changelog table
  await query(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title TEXT NOT NULL,
      summary TEXT,
      content TEXT,
      image TEXT,
      author_id INTEGER,
      author_name TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'draft',
      views INTEGER DEFAULT 0,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Pages table
  await query(`
    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT,
      layout TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'published',
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // API Keys table
  await query(`
    CREATE TABLE IF NOT EXISTS api_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      api_key VARCHAR(255) NOT NULL UNIQUE,
      user_id INTEGER NOT NULL,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // File Categories table
  await query(`
    CREATE TABLE IF NOT EXISTS file_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Files table
  await query(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(500) NOT NULL,
      file_type VARCHAR(50),
      url LONGTEXT NOT NULL,
      file_size VARCHAR(50),
      folder VARCHAR(200) DEFAULT 'general',
      uploaded_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      uploaded_by INT,
      description TEXT,
      is_public INT DEFAULT 1,
      downloads INT DEFAULT 0,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Post Attachments table
  await query(`
    CREATE TABLE IF NOT EXISTS post_attachments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INT,
      name VARCHAR(500) NOT NULL,
      original_name VARCHAR(500),
      file_type VARCHAR(100),
      file_size BIGINT DEFAULT 0,
      file_size_label VARCHAR(50),
      url LONGTEXT NOT NULL,
      uploaded_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      uploaded_by INT,
      downloads INT DEFAULT 0,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Download tokens tracking table
  await query(`
    CREATE TABLE IF NOT EXISTS download_tokens (
      token VARCHAR(200) PRIMARY KEY,
      use_count INT DEFAULT 0,
      expires_at BIGINT NOT NULL
    )
  `);

  // Installed Plugins table — lưu plugin đã cài và config trong DB của website
  await query(`
    CREATE TABLE IF NOT EXISTS installed_plugins (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      version TEXT DEFAULT '1.0.0',
      config TEXT DEFAULT '{}',
      active INTEGER NOT NULL DEFAULT 1,
      installed_at DATETIME DEFAULT (datetime('now'))
    )
  `);


  // ─── E-COMMERCE TABLES ───────────────────────────────────────

  // Shop Categories (danh mục sản phẩm)
  await query(`
    CREATE TABLE IF NOT EXISTS shop_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      parent_id INTEGER,
      icon VARCHAR(100),
      image TEXT,
      description TEXT,
      is_active INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now'))
    )
  `);

  // Products (sản phẩm)
  await query(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      short_description TEXT,
      description TEXT,
      price REAL NOT NULL DEFAULT 0,
      original_price REAL,
      thumbnail TEXT,
      images TEXT,
      brand VARCHAR(255),
      origin VARCHAR(255),
      unit VARCHAR(100) DEFAULT 'Hộp',
      stock INTEGER DEFAULT 0,
      sold_count INTEGER DEFAULT 0,
      view_count INTEGER DEFAULT 0,
      rating REAL DEFAULT 0,
      status VARCHAR(50) DEFAULT 'active',
      is_featured INTEGER DEFAULT 0,
      is_flash_sale INTEGER DEFAULT 0,
      flash_sale_price REAL,
      flash_sale_end VARCHAR(100),
      tags TEXT,
      meta_title TEXT,
      meta_description TEXT,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      updated_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (category_id) REFERENCES shop_categories(id) ON DELETE SET NULL
    )
  `);

  // Product Variants (biến thể sản phẩm: Hộp, Vỉ, Chai...)
  await query(`
    CREATE TABLE IF NOT EXISTS product_variants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      name VARCHAR(255) NOT NULL,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Product Reviews (đánh giá)
  await query(`
    CREATE TABLE IF NOT EXISTS product_reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      order_id INTEGER,
      reviewer_name VARCHAR(255) NOT NULL,
      reviewer_id INTEGER,
      rating INTEGER NOT NULL DEFAULT 5,
      comment TEXT,
      is_verified INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Orders (đơn hàng)
  await query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_code VARCHAR(100) NOT NULL UNIQUE,
      user_id INTEGER,
      customer_name VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(100) NOT NULL,
      customer_email VARCHAR(255),
      shipping_address TEXT NOT NULL,
      shipping_province VARCHAR(255),
      shipping_note TEXT,
      items TEXT NOT NULL,
      subtotal REAL NOT NULL DEFAULT 0,
      discount_amount REAL DEFAULT 0,
      shipping_fee REAL DEFAULT 0,
      total REAL NOT NULL DEFAULT 0,
      coupon_code VARCHAR(100),
      payment_method VARCHAR(50) DEFAULT 'cod',
      payment_status VARCHAR(50) DEFAULT 'pending',
      status VARCHAR(50) DEFAULT 'pending',
      admin_note TEXT,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      updated_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Coupons (mã giảm giá)
  await query(`
    CREATE TABLE IF NOT EXISTS coupons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code VARCHAR(100) NOT NULL UNIQUE,
      discount_type VARCHAR(50) NOT NULL DEFAULT 'percent',
      discount_value REAL NOT NULL,
      min_order REAL DEFAULT 0,
      max_discount REAL,
      usage_limit INTEGER,
      usage_count INTEGER DEFAULT 0,
      expires_at VARCHAR(100),
      is_active INTEGER DEFAULT 1,
      created_at VARCHAR(100) DEFAULT (datetime('now'))
    )
  `);

  // Alter tables to add SEO columns dynamically if they do not exist
  const addColumns = [
    { table: 'pages', column: 'meta_title', type: 'TEXT' },
    { table: 'pages', column: 'meta_description', type: 'TEXT' },
    { table: 'pages', column: 'meta_keywords', type: 'TEXT' },
    { table: 'posts', column: 'meta_title', type: 'TEXT' },
    { table: 'posts', column: 'meta_description', type: 'TEXT' },
    { table: 'posts', column: 'meta_keywords', type: 'TEXT' }
  ];

  for (const item of addColumns) {
    try {
      await query(`ALTER TABLE ${item.table} ADD COLUMN ${item.column} ${item.type}`);
      console.log(`Added column ${item.column} to table ${item.table}`);
    } catch (err) {
      // Column already exists or error
    }
  }

  console.log('✅ Database tables created and migrated');
}


export async function seedData(adminPassword, force = false) {
  const passwordToSeed = adminPassword || 'admin123';
  
  // Check if we should force override because the database was previously seeded with Command Code data or Long Chau
  let isCommandCode = false;
  try {
    const existingLogo = await query('SELECT `value` FROM settings WHERE `key` = ?', ['header_logo_text']);
    if (existingLogo.length > 0 && (existingLogo[0].value === 'Command Code' || existingLogo[0].value === 'FPT Long Châu')) {
      isCommandCode = true;
    }
  } catch (e) {
    // Table or settings might not exist yet
  }

  const shouldForce = force || isCommandCode;
  
  // Seed Settings
  const defaultSettings = [
    ['site_title', 'Sâm Ngọc Linh - Đặc Sản & Dược Liệu Kon Tum'],
    ['site_description', 'Ngọc Linh XANH cung cấp đặc sản rừng, dược liệu thiên nhiên, sâm dây, nấm lim xanh tự nhiên 100% từ đỉnh núi Ngọc Linh.'],
    ['site_keywords', 'sâm ngọc linh, ngọc linh xanh, sâm dây ngọc linh, nấm lim xanh, dược liệu'],
    ['header_logo_text', 'Sâm Ngọc Linh'],
    ['header_logo_icon', '🌿'],
    ['header_links', JSON.stringify([
      { label: 'Trang chủ', href: '/' },
      { label: 'Giới thiệu', href: '/about' },
      { label: 'Sản phẩm', href: '/products' },
      { label: 'Tin tức', href: '/blog' }
    ])],
    ['footer_copyright', '© 2026 Ngọc Linh Xanh. All rights reserved. Powered by AutoWeb CMS.'],
    ['footer_columns', JSON.stringify([
      {
        title: 'Về chúng tôi',
        links: [
          { label: 'Giới thiệu về chúng tôi', href: '/about' },
          { label: 'Chính sách bảo mật', href: '#' },
          { label: 'Điều khoản sử dụng', href: '#' }
        ]
      },
      {
        title: 'Hỗ trợ khách hàng',
        links: [
          { label: 'Hướng dẫn mua hàng', href: '#' },
          { label: 'Chính sách đổi trả', href: '#' },
          { label: 'Chính sách vận chuyển', href: '#' }
        ]
      }
    ])]
  ];

  for (const [key, val] of defaultSettings) {
    try {
      if (shouldForce) {
        await query('INSERT OR REPLACE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
      } else {
        await query('INSERT OR IGNORE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
      }
    } catch (err) {
      console.error(`Failed to seed setting key ${key}:`, err);
    }
  }

  // Seed default admin and moderator users
  try {
    const adminExists = await query('SELECT id FROM users WHERE username = ?', ['admin']);
    const hashedAdminPw = await hashPassword(passwordToSeed);
    if (adminExists.length === 0) {
      await query(
        'INSERT INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, ?, ?, ?, ?, 1)',
        ['admin', hashedAdminPw, 'Administrator', 'admin@ngoclinhxanh.com', 'admin', 'Enterprise']
      );
      console.log('👑 Default admin user seeded');
    } else if (adminPassword) {
      await query('UPDATE users SET password = ? WHERE username = ?', [hashedAdminPw, 'admin']);
      console.log('👑 Admin user password updated to custom password');
    }

    const modExists = await query('SELECT id FROM users WHERE username = ?', ['moderator']);
    if (modExists.length === 0) {
      const hashedModPw = await hashPassword('mod123');
      await query(
        'INSERT INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, ?, ?, ?, ?, 1)',
        ['moderator', hashedModPw, 'Staff Moderator', 'mod@ngoclinhxanh.com', 'mod', 'Pro']
      );
      console.log('🛡️ Default moderator user seeded');
    }
  } catch (err) {
    console.error('Failed to seed default users:', err);
  }

  // Seed default dynamic pages
  try {
    const pageExists = await query('SELECT id FROM pages WHERE slug = ?', ['about']);
    if (pageExists.length === 0 || shouldForce) {
      const defaultLayout = [
        {
          id: 'b_about_hero',
          type: 'hero',
          visible: true,
          configs: {
            title: 'Sứ mệnh Ngọc Linh Xanh',
            description: 'Đưa đặc sản rừng, dược liệu thiên nhiên, nét đẹp bản sắc dân tộc vùng núi Ngọc Linh - Kon Tum đến với bạn bè, khách hàng cả nước.',
            buttonText: 'Xem sản phẩm',
            buttonLink: '/products'
          }
        },
        {
          id: 'b_about_feat',
          type: 'features',
          visible: true,
          configs: {
            tag: 'GIÁ TRỊ CỐT LÕI',
            title: 'Cam kết chất lượng 100% tự nhiên',
            description: 'Sản phẩm từ vùng núi Ngọc Linh linh thiêng.',
            items: [
              { title: 'Chính Gốc Ngọc Linh', desc: 'Thu hoạch từ đại ngàn rừng sâu Kon Tum.' },
              { title: 'Tự Nhiên 100%', desc: 'Không chất bảo quản, hoàn toàn nguyên chất và an toàn.' },
              { title: 'Bản Sắc Việt Nam', desc: 'Đậm nét đẹp truyền thống và tinh hoa thảo dược.' }
            ]
          }
        }
      ];
      if (pageExists.length > 0) {
        await query('DELETE FROM pages WHERE slug = ?', ['about']);
      }
      await query(
        'INSERT INTO pages (slug, title, description, layout, status) VALUES (?, ?, ?, ?, ?)',
        ['about', 'Giới thiệu về chúng tôi', 'Ngọc Linh XANH với sứ mệnh đưa đặc sản rừng, dược liệu thiên nhiên đến với khách hàng.', JSON.stringify(defaultLayout), 'published']
      );
      console.log('📄 Default about page seeded');
    }
  } catch (err) {
    console.error('Failed to seed default pages:', err);
  }

  // Seed default file categories
  try {
    const existingFileCats = await query('SELECT COUNT(*) as cnt FROM file_categories');
    if (existingFileCats[0].cnt === 0) {
      const defaultFileCats = [
        { name: 'Chưa phân loại', slug: 'general' },
        { name: 'Ảnh minh họa', slug: 'images' },
        { name: 'Tài liệu hướng dẫn', slug: 'documents' },
        { name: 'Mã nguồn / Code', slug: 'code' },
        { name: 'Khác', slug: 'other' }
      ];
      for (const c of defaultFileCats) {
        await query('INSERT OR IGNORE INTO file_categories (name, slug) VALUES (?, ?)', [c.name, c.slug]);
      }
      console.log('📁 Default file categories seeded');
    }
  } catch (err) {
    console.error('Failed to seed default file categories:', err);
  }

  // Seed E-Commerce data (shop categories + sample products + coupon)
  try {
    const catCount = await query('SELECT COUNT(*) as cnt FROM shop_categories');
    if (catCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM shop_categories');
      }
      const defaultCats = [
        { name: 'Sâm Ngọc Linh', slug: 'sam-ngoc-linh', icon: '🌱', image: 'https://ngoclinhxanh.com/wp-content/uploads/2021/02/mat-ong-rung-nguyen-chat-ngoc-linh-xanh-matongrung-ngoclinhxanh-com-mat-ong-khoai-treo-lo-du-dang-sam-dat.jpg', sort_order: 1 },
        { name: 'Sâm Dây Ngọc Linh', slug: 'sam-day', icon: '🍠', image: 'https://ngoclinhxanh.com/wp-content/uploads/2017/12/sam-day-ngoc-linh-kho-hong-dang-sam-kho-sam-day-kho-rung-samday-samdayngoclinh-ngoc-linh-xanh-ngoclinhxanh.jpg-8.jpg', sort_order: 2 },
        { name: 'Mật Ong Rừng', slug: 'mat-ong', icon: '🍯', image: 'https://ngoclinhxanh.com/wp-content/uploads/2021/02/mat-ong-rung-nguyen-chat-ngoc-linh-xanh-matongrung-ngoclinhxanh-com-mat-ong-khoai-treo-lo-du-dang-sam-dat.jpg', sort_order: 3 },
        { name: 'Nấm Rừng Ngọc Linh', slug: 'nam-rung', icon: '🍄', image: 'https://ngoclinhxanh.com/wp-content/uploads/2017/12/nam-lim-xanh-rung-ngoc-linh-xanh-chinh-hieu-tu-nhien-kon-tum-namlimxanh-ngoclinhxanh-6.jpg', sort_order: 4 },
        { name: 'Đặc Sản Núi Rừng', slug: 'dac-san', icon: '⛰️', image: 'https://ngoclinhxanh.com/wp-content/uploads/2017/12/kho-qua-rung-kho-muop-dang-rung-ngoc-linh-xanh-com-ngoclinhxanh-5.jpg', sort_order: 5 },
        { name: 'Lan Kim Tuyến', slug: 'lan-kim-tuyen', icon: '🌿', image: 'https://ngoclinhxanh.com/wp-content/uploads/2019/01/nu-hoa-tam-that-rung-ngoc-linh-xanh-tay-nguyen-100-tu-nhien-tri-mat-ngu-hieu-qua-2.jpg', sort_order: 6 },
      ];
      for (const c of defaultCats) {
        await query(
          'INSERT OR IGNORE INTO shop_categories (name, slug, icon, image, sort_order) VALUES (?, ?, ?, ?, ?)',
          [c.name, c.slug, c.icon, c.image, c.sort_order]
        );
      }
      console.log('🛍️ Default shop categories seeded');
    }

    const prodCount = await query('SELECT COUNT(*) as cnt FROM products');
    if (prodCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM products');
        await query('DELETE FROM product_variants');
      }
      const catSamNgocLinh = await query("SELECT id FROM shop_categories WHERE slug = 'sam-ngoc-linh'");
      const catSamDay = await query("SELECT id FROM shop_categories WHERE slug = 'sam-day'");
      const catMatOng = await query("SELECT id FROM shop_categories WHERE slug = 'mat-ong'");
      const catNamRung = await query("SELECT id FROM shop_categories WHERE slug = 'nam-rung'");
      const catDacSan = await query("SELECT id FROM shop_categories WHERE slug = 'dac-san'");
      const catLanKimTuyen = await query("SELECT id FROM shop_categories WHERE slug = 'lan-kim-tuyen'");
      
      const catIdSamNgocLinh = catSamNgocLinh[0]?.id || null;
      const catIdSamDay = catSamDay[0]?.id || null;
      const catIdMatOng = catMatOng[0]?.id || null;
      const catIdNamRung = catNamRung[0]?.id || null;
      const catIdDacSan = catDacSan[0]?.id || null;
      const catIdLanKimTuyen = catLanKimTuyen[0]?.id || null;

      const sampleProducts = [
        { category_id: catIdSamDay, name: 'Sâm Dây Ngọc Linh Khô – Chính hiệu – Chất lượng', slug: 'sam-day-ngoc-linh-kho', short_description: 'Sâm dây khô tự nhiên thơm ngon tốt cho sức khỏe', price: 700000, original_price: 900000, thumbnail: 'https://ngoclinhxanh.com/wp-content/uploads/2017/12/sam-day-ngoc-linh-kho-hong-dang-sam-kho-sam-day-kho-rung-samday-samdayngoclinh-ngoc-linh-xanh-ngoclinhxanh.jpg-8.jpg', brand: 'Ngọc Linh Xanh', origin: 'Kon Tum', unit: 'Kg', stock: 100, is_featured: 1, is_flash_sale: 1, flash_sale_price: 700000 },
        { category_id: catIdSamDay, name: 'Sâm Dây Ngọc Linh Tươi – Đảng Sâm Chính Hiệu', slug: 'sam-day-ngoc-linh-tuoi', short_description: 'Sâm dây tươi khai thác trực tiếp từ rừng sâu Ngọc Linh', price: 390000, original_price: 490000, thumbnail: 'https://ngoclinhxanh.com/wp-content/uploads/2017/12/sam-day-ngoc-linh-kho-hong-dang-sam-kho-ngoc-linh-xanh-com-ngoclinhxanh-2.jpg', brand: 'Ngọc Linh Xanh', origin: 'Kon Tum', unit: 'Kg', stock: 150, is_featured: 1 },
        { category_id: catIdMatOng, name: 'Mật Ong Rừng Nguyên Chất Ngọc Linh', slug: 'mat-ong-rung-ngoc-linh', short_description: 'Mật ong khoái rừng già tự nhiên thơm ngọt nguyên chất', price: 590000, original_price: 690000, thumbnail: 'https://ngoclinhxanh.com/wp-content/uploads/2021/02/mat-ong-rung-nguyen-chat-ngoc-linh-xanh-matongrung-ngoclinhxanh-com-mat-ong-khoai-treo-lo-du-dang-sam-dat.jpg', brand: 'Ngọc Linh Xanh', origin: 'Kon Tum', unit: 'Lít', stock: 80, is_featured: 1, is_flash_sale: 1, flash_sale_price: 590000 },
        { category_id: catIdNamRung, name: 'Nấm Lim Xanh Rừng Ngọc Linh - Kon Tum', slug: 'nam-lim-xanh-rung', short_description: 'Nấm lim xanh rừng giúp bồi bổ cơ thể nâng cao đề kháng', price: 1200000, original_price: 1500000, thumbnail: 'https://ngoclinhxanh.com/wp-content/uploads/2017/12/nam-lim-xanh-rung-ngoc-linh-xanh-chinh-hieu-tu-nhien-kon-tum-namlimxanh-ngoclinhxanh-6.jpg', brand: 'Ngọc Linh Xanh', origin: 'Kon Tum', unit: 'Hộp', stock: 50, is_featured: 1 },
        { category_id: catIdNamRung, name: 'Nấm Linh Chi Cổ Cò Rừng – Chính Hiệu – Hảo Hạng', slug: 'nam-linh-chi-co-co', short_description: 'Linh chi cổ cò hảo hạng khai thác tự nhiên', price: 1400000, original_price: 1800000, thumbnail: 'https://ngoclinhxanh.com/wp-content/uploads/2018/11/nam-linh-chi-co-co-rung-nam-muong-mua-ban-tac-dung-n%E1%BA%A5m-linh-chi-c%E1%BB%95-c%C3%B2-chat-luong-chinh-hieu-ng%E1%BB%8Dc-linh-xanh-nam-muong-ngoclinhxanh-4.jpg', brand: 'Ngọc Linh Xanh', origin: 'Kon Tum', unit: 'Kg', stock: 40 },
        { category_id: catIdDacSan, name: 'Khổ Qua Rừng Khô (Mướp Đắng Rừng)', slug: 'kho-qua-rung-kho', short_description: 'Mướp đắng rừng thái lát sấy khô nguyên chất giải nhiệt', price: 450000, original_price: 550000, thumbnail: 'https://ngoclinhxanh.com/wp-content/uploads/2017/12/kho-qua-rung-kho-muop-dang-rung-ngoc-linh-xanh-com-ngoclinhxanh-5.jpg', brand: 'Ngọc Linh Xanh', origin: 'Kon Tum', unit: 'Hộp', stock: 200, is_featured: 1 }
      ];

      for (const p of sampleProducts) {
        try {
          await query(
            `INSERT OR IGNORE INTO products (category_id, name, slug, short_description, price, original_price, thumbnail, brand, origin, unit, stock, is_featured, is_flash_sale, flash_sale_price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
            [p.category_id, p.name, p.slug, p.short_description, p.price, p.original_price || null, p.thumbnail || null, p.brand || null, p.origin || null, p.unit || 'Kg', p.stock || 0, p.is_featured || 0, p.is_flash_sale || 0, p.flash_sale_price || null]
          );
          // Add variants for each product
          const prod = await query('SELECT id FROM products WHERE slug = ?', [p.slug]);
          if (prod.length > 0) {
            const pid = prod[0].id;
            await query('INSERT INTO product_variants (product_id, name, price, stock) VALUES (?, ?, ?, ?)', [pid, p.unit || 'Kg', p.price, p.stock]);
          }
        } catch (e) { /* ignore duplicate */ }
      }
      console.log('🛒 Sample products seeded');
    }

    // Seed default blog posts
    const postCount = await query('SELECT COUNT(*) as cnt FROM posts');
    if (postCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM posts');
      }
      
      const defaultPosts = [
        {
          title: 'Cách Ngâm Rượu Sâm Dây Ngọc Linh Tươi – Bí Quyết Tạo Nên Loại Rượu Quý',
          slug: 'cach-ngam-ruou-sam-day-ngoc-linh-tuoi',
          summary: 'Sâm dây Ngọc Linh là một trong những dược liệu phổ biến vùng núi Ngọc Linh - Kon Tum và được đánh giá cao về dược tính, đặc biệt là khi ngâm rượu.',
          content: 'Sâm dây Ngọc Linh tươi sau khi thu hoạch cần được rửa sạch đất cát, để ráo nước hoàn toàn trước khi ngâm. Tỉ lệ ngâm chuẩn thường là 1kg sâm dây tươi với 3-5 lít rượu nếp trắng ngon từ 40-45 độ. Thời gian ngâm tối thiểu từ 3 tháng trở lên mới có thể sử dụng, rượu sâm dây có màu vàng óng, vị ngọt thanh mát đặc trưng.',
          image: 'https://ngoclinhxanh.com/wp-content/uploads/2023/01/cach-ngam-ruou-sam-day-ngoc-linh-tuoi-ngoclinhxanh-1oclinhxanh-2Untitled-1111-770x350.jpg',
          author_name: 'Dược Sĩ Ngọc Linh Xanh'
        },
        {
          title: 'Lan Kim Tuyến chữa bệnh gì? – Thảo dược quý và những bệnh có thể điều trị',
          slug: 'lan-kim-tuyen-chua-benh-gi',
          summary: 'Lan kim tuyến (hay còn gọi là lan gấm, cỏ nhung, lan kim cương) là một loài cây thảo dược quý hiếm thuộc họ phong lan.',
          content: 'Lan kim tuyến được biết đến với công dụng hỗ trợ điều trị các bệnh về gan, huyết áp cao, suy nhược thần kinh và tăng cường sức khỏe tổng thể. Cây có thể dùng tươi hoặc phơi khô sắc nước uống hàng ngày rất tốt cho sức khỏe.',
          image: 'https://ngoclinhxanh.com/wp-content/uploads/2024/10/lan-kim-tuyen-chua-benh-gi-rung-ngoc-linh-xanh-ngoclinhxanh-202-770x350.jpg',
          author_name: 'Dược Sĩ Ngọc Linh Xanh'
        },
        {
          title: 'Sâm Dây Ngọc Linh: Đặc Điểm, Thành Phần và Đối Tượng Sử Dụng',
          slug: 'sam-day-ngoc-linh-dac-diem-doi-tuong-su-dung',
          summary: 'Tại khu vực núi Ngọc Linh ở Tây Nguyên, Việt Nam, sâm dây Ngọc Linh là loại dược liệu quý giá có nhiều công dụng tuyệt vời.',
          content: 'Sâm dây Ngọc Linh (Đẳng sâm) chứa nhiều thành phần saponin, axit amin tốt cho tim mạch, hỗ trợ giảm stress mệt mỏi và bồi bổ máu. Phù hợp cho người già, người mới ốm dậy, người lao động trí óc căng thẳng.',
          image: 'https://ngoclinhxanh.com/wp-content/uploads/2023/01/sam-day-ngoc-linh-xanh-hong-dang-sam-chinh-hieu-ngoclinhxanh-22-720x350.jpg',
          author_name: 'Dược Sĩ Ngọc Linh Xanh'
        }
      ];

      for (const p of defaultPosts) {
        await query(
          `INSERT INTO posts (slug, title, summary, content, image, author_name, status) VALUES (?, ?, ?, ?, ?, ?, 'published')`,
          [p.slug, p.title, p.summary, p.content, p.image, p.author_name]
        );
      }
      console.log('📝 Sample posts seeded');
    }

    // Seed a sample coupon
    const couponExists = await query("SELECT id FROM coupons WHERE code = 'NGOCLINH10'");
    if (couponExists.length === 0) {
      await query(
        "INSERT INTO coupons (code, discount_type, discount_value, min_order, max_discount, usage_limit, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)",
        ['NGOCLINH10', 'percent', 10, 200000, 50000, 100]
      );
      console.log('🎟️ Sample coupon NGOCLINH10 seeded');
    }

  } catch (err) {
    console.error('Failed to seed E-Commerce data:', err);
  }

  console.log('✅ Seed data complete');
}
