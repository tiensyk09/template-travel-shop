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

  return (
    <div className="w-full">
      {/* HERO BANNER SECTION */}
      <div 
        className="relative bg-cover bg-center py-20 px-4 min-h-[420px] flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')`
        }}
      >
        {/* Banner Content Card Overlay */}
        <div className="relative z-10 max-w-3xl mx-auto backdrop-blur-md bg-white/40 p-8 rounded-3xl border border-white/60 shadow-2xl">
          <p className="font-serif italic text-2xl text-amber-900 mb-2 tracking-wide font-medium">Khám phá</p>
          <h1 className="text-4xl md:text-5xl font-black text-teal-950 uppercase tracking-tight mb-4 leading-tight">
            TINH HOA ĐẶC SẢN
          </h1>
          <p className="text-base md:text-lg font-bold text-teal-900 tracking-wider uppercase mb-6">
            MANG VỀ NHỮNG KỶ NIỆM TUYỆT VỜI
          </p>
          
          {/* Tag Highlights */}
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-teal-950 mb-8">
            <span className="bg-amber-100/90 text-amber-900 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">✨ Đặc sản 3 miền</span>
            <span className="bg-teal-100/90 text-teal-900 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">🎁 Quà tặng du lịch</span>
            <span className="bg-amber-100/90 text-amber-900 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">🚀 Giao hàng toàn quốc</span>
          </div>

          <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm uppercase px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all tracking-wider transform hover:-translate-y-0.5">
            KHÁM PHÁ NGAY ➔
          </button>
        </div>
      </div>

      {/* SELLING POINTS STRIP */}
      <div className="bg-white border-b border-gray-200 py-6 px-4">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 divide-x-0 md:divide-x divide-gray-100">
          {sellingPoints.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3 px-3 py-2 justify-center text-left">
              <div className="text-3xl bg-teal-50 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-teal-800 shadow-sm border border-teal-100">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 tracking-tight uppercase">{item.title}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
