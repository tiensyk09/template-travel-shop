'use client';
import React from 'react';

export default function PromoBanner() {
  return (
    <section className="py-10 px-4">
      <div className="container mx-auto bg-gradient-to-r from-teal-50 via-cyan-50 to-teal-50 rounded-3xl p-8 border border-teal-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Text Content */}
        <div className="max-w-xl z-10 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-100/80 px-3 py-1 rounded-full inline-block mb-3">
            QUÀ TẶNG SỨC KHỎE
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-teal-950 uppercase tracking-tight leading-tight mb-3">
            BẢO VẬT ĐẠI NGÀN
          </h2>
          <p className="text-sm text-gray-600 font-medium mb-6">
            Món quà ý nghĩa nâng niu sức khỏe vàng từ sâm quý và dược liệu rừng tự nhiên 100% tại dãy núi Ngọc Linh hùng vĩ.
          </p>
          <button className="bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase px-7 py-3 rounded-xl shadow-md hover:shadow-lg transition-all tracking-wider">
            XEM NGAY ➔
          </button>
        </div>

        {/* Right Polaroid Photos Graphics */}
        <div className="flex items-center space-x-overlap z-10 rotate-1 transform hover:rotate-0 transition-transform duration-500">
          <div className="bg-white p-2.5 pb-6 rounded-2xl shadow-xl border border-gray-100 -rotate-6 w-36 md:w-44 hover:scale-105 transition-transform">
            <img 
              src="https://ngoclinhxanh.com/wp-content/uploads/2017/12/nam-lim-xanh-rung-ngoc-linh-xanh-chinh-hieu-tu-nhien-kon-tum-namlimxanh-ngoclinhxanh-6.jpg" 
              alt="Nấm Lim Xanh" 
              className="w-full h-32 md:h-40 object-cover rounded-xl mb-2"
            />
            <span className="text-2xs font-bold text-gray-700 text-center block">Nấm Lim Xanh</span>
          </div>

          <div className="bg-white p-2.5 pb-6 rounded-2xl shadow-2xl border border-gray-100 z-10 w-40 md:w-48 hover:scale-105 transition-transform">
            <img 
              src="https://ngoclinhxanh.com/wp-content/uploads/2021/02/mat-ong-rung-nguyen-chat-ngoc-linh-xanh-matongrung-ngoclinhxanh-com-mat-ong-khoai-treo-lo-du-dang-sam-dat.jpg" 
              alt="Sâm Ngọc Linh" 
              className="w-full h-36 md:h-44 object-cover rounded-xl mb-2"
            />
            <span className="text-2xs font-bold text-teal-900 text-center block">Sâm Ngâm Mật</span>
          </div>

          <div className="bg-white p-2.5 pb-6 rounded-2xl shadow-xl border border-gray-100 rotate-6 w-36 md:w-44 hover:scale-105 transition-transform">
            <img 
              src="https://ngoclinhxanh.com/wp-content/uploads/2018/11/nam-linh-chi-co-co-rung-nam-muong-mua-ban-tac-dung-n%E1%BA%A5m-linh-chi-c%E1%BB%95-c%C3%B2-chat-luong-chinh-hieu-ng%E1%BB%8Dc-linh-xanh-nam-muong-ngoclinhxanh-4.jpg" 
              alt="Linh Chi Cổ Cò" 
              className="w-full h-32 md:h-40 object-cover rounded-xl mb-2"
            />
            <span className="text-2xs font-bold text-gray-700 text-center block">Linh Chi Cổ Cò</span>
          </div>
        </div>

        {/* Decorative Background Planes */}
        <div className="absolute -bottom-10 -left-10 text-teal-200/40 text-9xl pointer-events-none select-none">
          🌿
        </div>
      </div>
    </section>
  );
}
