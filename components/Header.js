'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="w-full font-sans">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#0b4d48] text-white text-xs py-2 px-4 flex justify-between items-center border-b border-[#0d5c56]">
        <div className="flex items-center space-x-6 container mx-auto justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1">🌴 Chào mừng bạn đến với <strong>Travel Shop</strong></span>
            <span className="hidden md:inline text-teal-200">|</span>
            <span className="hidden md:flex items-center gap-1 text-teal-100">🚚 Miễn phí vận chuyển cho đơn từ <strong>500.000đ</strong></span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1">📞 Hỗ trợ khách hàng: <strong className="text-amber-400">1900 1234</strong></span>
            <span className="flex items-center gap-1 cursor-pointer hover:underline">🇻🇳 VN / VNĐ</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="bg-white py-4 px-4 shadow-sm border-b border-gray-100">
        <div className="container mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-teal-700 text-amber-400 rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform">
              🧳
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight text-teal-900 leading-none uppercase">TRAVEL <span className="text-amber-600">SHOP</span></div>
              <div className="text-[10px] font-medium text-gray-500 tracking-wider uppercase mt-1">Mang đặc sản thế giới đến với bạn</div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Bạn muốn tìm sản phẩm gì? (ví dụ: Trà sen, Cà phê, Nước mắm...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-14 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-teal-600 focus:bg-white transition-all"
              />
              <button 
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-5 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
              >
                🔍
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-6 text-gray-700">
            <Link href="/admin/login" className="flex items-center gap-2 hover:text-teal-700 transition-colors">
              <span className="text-xl">👤</span>
              <div className="text-left hidden lg:block">
                <div className="text-[11px] text-gray-400 font-medium">Tài khoản</div>
                <div className="text-xs font-bold text-gray-800">Đăng nhập</div>
              </div>
            </Link>

            <Link href="#" className="flex items-center gap-2 hover:text-teal-700 transition-colors relative">
              <span className="text-xl">🤍</span>
              <div className="text-left hidden lg:block">
                <div className="text-[11px] text-gray-400 font-medium">Yêu thích</div>
                <div className="text-xs font-bold text-gray-800">Sản phẩm</div>
              </div>
            </Link>

            <Link href="/cart" className="flex items-center gap-3 bg-teal-50 hover:bg-teal-100 p-2 px-3 rounded-xl transition-colors border border-teal-100">
              <div className="relative">
                <span className="text-2xl">🛒</span>
                <span className="absolute -top-1.5 -right-2 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </div>
              <div className="text-left hidden md:block">
                <div className="text-[11px] text-teal-600 font-medium">Giỏ hàng</div>
                <div className="text-xs font-bold text-teal-950">0 đ</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION BAR */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Category Dropdown Button */}
          <div className="relative">
            <button className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase px-5 py-3.5 flex items-center gap-3 rounded-t-lg transition-colors tracking-wider">
              <span>☰</span>
              <span>DANH MỤC SẢN PHẨM</span>
            </button>
          </div>

          {/* Main Menu Links */}
          <nav className="flex items-center space-x-8 font-semibold text-xs text-gray-700 tracking-wider uppercase py-3">
            <Link href="/" className="text-teal-700 border-b-2 border-teal-700 pb-1 font-bold">TRANG CHỦ</Link>
            <Link href="/about" className="hover:text-teal-700 transition-colors pb-1">GIỚI THIỆU</Link>
            <Link href="/products" className="hover:text-teal-700 transition-colors pb-1">SẢN PHẨM</Link>
            <Link href="/destinations" className="hover:text-teal-700 transition-colors pb-1">ĐIỂM ĐẾN</Link>
            <Link href="/blog" className="hover:text-teal-700 transition-colors pb-1">TIN TỨC</Link>
            <Link href="/contact" className="hover:text-teal-700 transition-colors pb-1">LIÊN HỆ</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
