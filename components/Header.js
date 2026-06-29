'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { title: 'Sâm Ngọc Linh', icon: '🌱', link: '/products?cat=sam-ngoc-linh' },
    { title: 'Sâm Dây Ngọc Linh', icon: '🍠', link: '/products?cat=sam-day' },
    { title: 'Mật Ong Rừng', icon: '🍯', link: '/products?cat=mat-ong' },
    { title: 'Nấm Rừng Ngọc Linh', icon: '🍄', link: '/products?cat=nam-rung' },
    { title: 'Đặc Sản Núi Rừng', icon: '⛰️', link: '/products?cat=dac-san' },
    { title: 'Lan Kim Tuyến', icon: '🌿', link: '/products?cat=lan-kim-tuyen' },
  ];

  return (
    <header style={{ width: '100%', fontFamily: 'Inter, sans-serif' }}>

      {/* 1. TOP BAR */}
      <div style={{ backgroundColor: '#0b4d48', color: '#fff', fontSize: '12px', padding: '6px 16px', borderBottom: '1px solid #0d5c56' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span>🌿 <strong>Sâm Ngọc Linh</strong></span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span style={{ color: '#99f6e4' }}>🚚 Miễn phí vận chuyển cho đơn từ <strong>500.000đ</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span>📞 Hỗ trợ khách hàng: <strong style={{ color: '#fbbf24' }}>1900 1234</strong></span>
            <span>🇻🇳 VN / VNĐ</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER — Logo + Search + Actions (1 row on desktop) */}
      <div style={{ backgroundColor: '#fff', padding: '12px 16px', borderBottom: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 20 }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ width: 44, height: 44, backgroundColor: '#0f766e', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', flexShrink: 0 }}>
              🌿
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.5px', color: '#052e16', lineHeight: 1, textTransform: 'uppercase' }}>
                SÂM <span style={{ color: '#d97706' }}>NGỌC LINH</span>
              </div>
              <div style={{ fontSize: 10, color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2, fontWeight: 500 }}>
                Đặc sản & Quà tặng Việt Nam
              </div>
            </div>
          </Link>

          {/* Search Bar — flex grow */}
          <div style={{ flex: 1, maxWidth: 640 }}>
            <form onSubmit={(e) => e.preventDefault()} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Bạn muốn tìm sản phẩm gì? (ví dụ: Trà sen, Cà phê, Nước mắm...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px 52px 10px 16px', borderRadius: 999, border: '1.5px solid #e5e7eb', fontSize: 13, backgroundColor: '#f9fafb', outline: 'none', fontFamily: 'inherit' }}
              />
              <button
                type="submit"
                style={{ position: 'absolute', right: 4, top: 4, bottom: 4, padding: '0 16px', backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: 999, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}
              >
                🔍
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
            <Link href="/admin/login" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#374151' }}>
              <span style={{ fontSize: 22 }}>👤</span>
              <div>
                <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500, lineHeight: 1.2 }}>Tài khoản</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1f2937', lineHeight: 1.2 }}>Đăng nhập</div>
              </div>
            </Link>

            <Link href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#374151' }}>
              <span style={{ fontSize: 22 }}>🤍</span>
              <div>
                <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500, lineHeight: 1.2 }}>Yêu thích</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1f2937', lineHeight: 1.2 }}>Sản phẩm</div>
              </div>
            </Link>

            <Link href="/cart" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', backgroundColor: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: 12, padding: '6px 12px' }}>
              <div style={{ position: 'relative' }}>
                <span style={{ fontSize: 24 }}>🛒</span>
                <span style={{ position: 'absolute', top: -6, right: -8, backgroundColor: '#f59e0b', color: '#fff', fontSize: 9, fontWeight: 800, width: 16, height: 16, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  0
                </span>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#16a34a', fontWeight: 500, lineHeight: 1.2 }}>Giỏ hàng</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#052e16', lineHeight: 1.2 }}>0 đ</div>
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ display: 'none', padding: 8, border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 18 }}
              className="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. NAV BAR — Category Dropdown + Menu Links */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>

          {/* Category Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsCatOpen(!isCatOpen)}
              style={{ backgroundColor: '#0f766e', color: '#fff', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, border: 'none', cursor: 'pointer', borderRadius: '0 0 6px 6px', minWidth: 220 }}
            >
              <span>☰</span>
              <span>DANH MỤC SẢN PHẨM</span>
              <span style={{ marginLeft: 'auto', fontSize: 10 }}>{isCatOpen ? '▲' : '▼'}</span>
            </button>

            {isCatOpen && (
              <div style={{ position: 'absolute', top: '100%', left: 0, width: 260, backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0 0 12px 12px', boxShadow: '0 16px 32px rgba(0,0,0,0.12)', zIndex: 100, animation: 'fadeInDown 0.15s ease-out' }}>
                {categories.map((cat, idx) => (
                  <Link
                    key={idx}
                    href={cat.link}
                    onClick={() => setIsCatOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', fontSize: 13, fontWeight: 600, color: '#374151', borderBottom: idx < categories.length - 1 ? '1px solid #f9fafb' : 'none', textDecoration: 'none', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f0fdf4'; e.currentTarget.style.color = '#0f766e'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = '#374151'; }}
                  >
                    <span style={{ fontSize: 18 }}>{cat.icon}</span>
                    <span>{cat.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {[
              { href: '/', label: 'TRANG CHỦ', active: true },
              { href: '/about', label: 'GIỚI THIỆU' },
              { href: '/products', label: 'SẢN PHẨM' },
              { href: '/destinations', label: 'ĐIỂM ĐẾN' },
              { href: '/blog', label: 'TIN TỨC' },
              { href: '/contact', label: 'LIÊN HỆ' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: item.active ? '#0f766e' : '#374151',
                  textDecoration: 'none',
                  padding: '14px 0',
                  borderBottom: item.active ? '2.5px solid #0f766e' : '2.5px solid transparent',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={(e) => { if (!item.active) { e.currentTarget.style.color = '#0f766e'; e.currentTarget.style.borderBottomColor = '#0f766e'; } }}
                onMouseLeave={(e) => { if (!item.active) { e.currentTarget.style.color = '#374151'; e.currentTarget.style.borderBottomColor = 'transparent'; } }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '8px 16px 16px' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { href: '/', label: 'Trang chủ' },
              { href: '/about', label: 'Giới thiệu' },
              { href: '/products', label: 'Sản phẩm' },
              { href: '/destinations', label: 'Điểm đến' },
              { href: '/blog', label: 'Tin tức' },
              { href: '/contact', label: 'Liên hệ' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ display: 'block', padding: '10px 0', fontSize: 14, fontWeight: 600, color: '#1f2937', borderBottom: '1px solid #f3f4f6', textDecoration: 'none' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .mobile-menu-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
