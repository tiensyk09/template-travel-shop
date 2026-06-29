'use client';
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 font-sans pt-12 pb-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Column 1: Brand Intro & Social */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-teal-700 text-amber-400 rounded-lg flex items-center justify-center text-xl shadow-sm">
              🧳
            </div>
            <span className="text-xl font-black text-teal-950 uppercase tracking-tight">TRAVEL <span className="text-amber-600">SHOP</span></span>
          </Link>
          <p className="text-xs text-gray-500 leading-relaxed mb-6 font-medium">
            Chuyên cung cấp đặc sản, quà tặng và sản phẩm du lịch chất lượng nhất từ khắp mọi miền Việt Nam.
          </p>
          <div className="flex space-x-3 text-lg text-teal-800">
            <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center cursor-pointer hover:bg-teal-700 hover:text-white transition-colors">📘</span>
            <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center cursor-pointer hover:bg-teal-700 hover:text-white transition-colors">📷</span>
            <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center cursor-pointer hover:bg-teal-700 hover:text-white transition-colors">▶️</span>
            <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center cursor-pointer hover:bg-teal-700 hover:text-white transition-colors">🎵</span>
          </div>
        </div>

        {/* Column 2: Về Chúng Tôi */}
        <div>
          <h3 className="text-xs font-bold text-teal-950 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">VỀ CHÚNG TÔI</h3>
          <ul className="space-y-2.5 text-xs font-medium text-gray-500">
            <li><Link href="/about" className="hover:text-teal-700 transition-colors">Giới thiệu</Link></li>
            <li><Link href="#" className="hover:text-teal-700 transition-colors">Điều khoản sử dụng</Link></li>
            <li><Link href="#" className="hover:text-teal-700 transition-colors">Chính sách bảo mật</Link></li>
            <li><Link href="#" className="hover:text-teal-700 transition-colors">Chính sách đổi trả</Link></li>
            <li><Link href="/contact" className="hover:text-teal-700 transition-colors">Liên hệ</Link></li>
          </ul>
        </div>

        {/* Column 3: Hỗ Trợ Khách Hàng */}
        <div>
          <h3 className="text-xs font-bold text-teal-950 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">HỖ TRỢ KHÁCH HÀNG</h3>
          <ul className="space-y-2.5 text-xs font-medium text-gray-500">
            <li><Link href="#" className="hover:text-teal-700 transition-colors">Hướng dẫn mua hàng</Link></li>
            <li><Link href="#" className="hover:text-teal-700 transition-colors">Phương thức thanh toán</Link></li>
            <li><Link href="#" className="hover:text-teal-700 transition-colors">Chính sách vận chuyển</Link></li>
            <li><Link href="#" className="hover:text-teal-700 transition-colors">Đổi trả & hoàn tiền</Link></li>
            <li><Link href="#" className="hover:text-teal-700 transition-colors">Câu hỏi thường gặp</Link></li>
          </ul>
        </div>

        {/* Column 4: Thông Tin Liên Hệ */}
        <div>
          <h3 className="text-xs font-bold text-teal-950 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">THÔNG TIN LIÊN HỆ</h3>
          <ul className="space-y-3 text-xs font-medium text-gray-500">
            <li className="flex items-start gap-2">📍 <span>123 Đường Du Lịch, Quận 1, TP. Hồ Chí Minh</span></li>
            <li className="flex items-center gap-2">📞 <span className="font-bold text-teal-900">1900 1234</span></li>
            <li className="flex items-center gap-2">✉️ <span>info@travelshop.vn</span></li>
            <li className="flex items-center gap-2">🌐 <span>www.travelshop.vn</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Payments */}
      <div className="container mx-auto px-4 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 font-medium gap-4">
        <div>© 2026 <strong>Travel Shop</strong>. All rights reserved. Powered by AutoWeb CMS.</div>
        <div className="flex items-center space-x-3 text-[10px] font-bold text-gray-500">
          <span className="bg-gray-100 px-2.5 py-1 rounded border border-gray-200">VISA</span>
          <span className="bg-gray-100 px-2.5 py-1 rounded border border-gray-200">MasterCard</span>
          <span className="bg-pink-100 text-pink-700 px-2.5 py-1 rounded border border-pink-200">MoMo</span>
          <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded border border-blue-200">ZaloPay</span>
          <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded border border-amber-200">COD</span>
        </div>
      </div>
    </footer>
  );
}
