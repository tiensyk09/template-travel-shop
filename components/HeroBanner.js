'use client';
import React from 'react';

export default function HeroBanner() {
  const sellingPoints = [
    { icon: '🎖️', title: 'ĐẶC SẢN CHÍNH HÃNG', desc: 'Cam kết chất lượng' },
    { icon: '🎁', title: 'ĐA DẠNG SẢN PHẨM', desc: 'Hơn 1000+ sản phẩm' },
    { icon: '🚚', title: 'GIAO HÀNG TOÀN QUỐC', desc: 'Nhanh chóng, tiện lợi' },
    { icon: '🛡️', title: 'THANH TOÁN AN TOÀN', desc: 'Bảo mật tuyệt đối' },
    { icon: '🔄', title: 'ĐỔI TRẢ DỄ DÀNG', desc: 'Hỗ trợ 7 ngày' },
  ];

  const scrollToProducts = () => {
    const el = document.getElementById('featured-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/products';
    }
  };

  return (
    <div className="w-full">
      {/* HERO BANNER SECTION */}
      <div 
        style={{
          position: 'relative',
          backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          padding: '80px 20px',
          minHeight: '480px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Subtle white/light overlay to make the photo pop and keep text super legible */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            pointerEvents: 'none'
          }}
        />

        {/* Banner Content Card Overlay — No border box, clear contrast */}
        <div 
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '850px',
            margin: '0 auto',
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(255,255,255,0.8)'
          }}
        >
          {/* Cursive style for "Khám phá" */}
          <p 
            style={{
              fontFamily: 'serif',
              fontStyle: 'italic',
              fontSize: '28px',
              color: '#c2410c',
              marginBottom: '4px',
              fontWeight: '700',
              letterSpacing: '1px'
            }}
          >
            Khám phá
          </p>

          <h1 
            style={{
              fontSize: '56px',
              fontWeight: '900',
              color: '#052e16',
              textTransform: 'uppercase',
              letterSpacing: '-1.5px',
              marginBottom: '8px',
              lineHeight: '1.1'
            }}
            className="hero-main-title"
          >
            TINH HOA ĐẶC SẢN
          </h1>

          <p 
            style={{
              fontSize: '18px',
              fontWeight: '800',
              color: '#0f766e',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px'
            }}
          >
            MANG VỀ NHỮNG KỶ NIỆM TUYỆT VỜI
          </p>
          
          {/* Tag Highlights */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '32px'
            }}
          >
            <span style={{ backgroundColor: '#fffbeb', color: '#78350f', padding: '6px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', border: '1px solid #fef3c7', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              ✨ Đặc sản 3 miền
            </span>
            <span style={{ backgroundColor: '#f0fdf4', color: '#14532d', padding: '6px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', border: '1px solid #dcfce7', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              🎁 Quà tặng du lịch
            </span>
            <span style={{ backgroundColor: '#fffbeb', color: '#78350f', padding: '6px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', border: '1px solid #fef3c7', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              🚀 Giao hàng toàn quốc
            </span>
          </div>

          {/* Action Button */}
          <button 
            onClick={scrollToProducts}
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '15px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '14px 36px',
              borderRadius: '999px',
              border: 'none',
              boxShadow: '0 8px 24px rgba(217, 119, 6, 0.45)',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(217, 119, 6, 0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(217, 119, 6, 0.45)';
            }}
          >
            KHÁM PHÁ NGAY ➔
          </button>
        </div>
      </div>

      {/* SELLING POINTS STRIP */}
      <div className="bg-white border-b border-gray-200 py-4 md:py-6 px-3">
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {sellingPoints.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2.5 p-2 bg-gray-50/50 rounded-xl border border-gray-100 md:border-none">
              <div className="text-xl md:text-3xl bg-teal-50 w-9 h-9 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-teal-800 shadow-sm border border-teal-100">
                {item.icon}
              </div>
              <div>
                <h4 className="text-3xs md:text-xs font-bold text-gray-900 tracking-tight uppercase leading-snug">{item.title}</h4>
                <p className="text-3xs text-gray-500 mt-0.5 font-medium hidden sm:block">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-main-title {
            font-size: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
