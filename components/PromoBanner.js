'use client';
import React from 'react';

export default function PromoBanner() {
  return (
    <section className="py-10 px-4">
      <div className="container mx-auto bg-gradient-to-r from-teal-50 via-cyan-50 to-teal-50 rounded-3xl p-8 border border-teal-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Text Content */}
        <div className="max-w-xl z-10 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-100/80 px-3 py-1 rounded-full inline-block mb-3">
            GỢI Ý QUÀ TẶNG
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-teal-950 uppercase tracking-tight leading-tight mb-3">
            CHO MỖI CHUYẾN ĐI
          </h2>
          <p className="text-sm text-gray-600 font-medium mb-6">
            Những món quà ý nghĩa mang đậm bản sắc Việt Nam, thích hợp biếu tặng người thân, bạn bè & đối tác quốc tế.
          </p>
          <button className="bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase px-7 py-3 rounded-xl shadow-md hover:shadow-lg transition-all tracking-wider">
            XEM NGAY ➔
          </button>
        </div>

        {/* Right Polaroid Photos Graphics */}
        <div className="flex items-center space-x-[-20px] z-10 rotate-1 transform hover:rotate-0 transition-transform duration-500">
          <div className="bg-white p-2.5 pb-6 rounded-2xl shadow-xl border border-gray-100 -rotate-6 w-36 md:w-44 hover:scale-105 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80" 
              alt="Vịnh Hạ Long" 
              className="w-full h-32 md:h-40 object-cover rounded-xl mb-2"
            />
            <span className="text-[11px] font-bold text-gray-700 text-center block">Vịnh Hạ Long</span>
          </div>

          <div className="bg-white p-2.5 pb-6 rounded-2xl shadow-2xl border border-gray-100 z-10 w-40 md:w-48 hover:scale-105 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=400&q=80" 
              alt="Hội An" 
              className="w-full h-36 md:h-44 object-cover rounded-xl mb-2"
            />
            <span className="text-[11px] font-bold text-teal-900 text-center block">Phố Cổ Hội An</span>
          </div>

          <div className="bg-white p-2.5 pb-6 rounded-2xl shadow-xl border border-gray-100 rotate-6 w-36 md:w-44 hover:scale-105 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80" 
              alt="Chợ Bến Thành" 
              className="w-full h-32 md:h-40 object-cover rounded-xl mb-2"
            />
            <span className="text-[11px] font-bold text-gray-700 text-center block">Sài Gòn Nhộn Nhịp</span>
          </div>
        </div>

        {/* Decorative Background Planes */}
        <div className="absolute -bottom-10 -left-10 text-teal-200/40 text-9xl pointer-events-none select-none">
          ✈️
        </div>
      </div>
    </section>
  );
}
