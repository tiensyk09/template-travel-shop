'use client';
import React from 'react';
import Link from 'next/link';

export default function CategoryGrid() {
  const categories = [
    {
      title: 'Đặc sản vùng miền',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80',
      link: '/products?cat=dac-san'
    },
    {
      title: 'Quà lưu niệm',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80',
      link: '/products?cat=qua-luu-niem'
    },
    {
      title: 'Thực phẩm & Đồ uống',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80',
      link: '/products?cat=thuc-pham'
    },
    {
      title: 'Thời trang & Phụ kiện',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80',
      link: '/products?cat=thoi-trang'
    },
    {
      title: 'Sản phẩm thủ công',
      image: 'https://images.unsplash.com/photo-1606760227091-3dd850d97f1d?auto=format&fit=crop&w=500&q=80',
      link: '/products?cat=thu-cong'
    },
    {
      title: 'Chăm sóc sức khỏe',
      image: 'https://images.unsplash.com/photo-1608248597263-0057e44a4590?auto=format&fit=crop&w=500&q=80',
      link: '/products?cat=suc-khoe'
    }
  ];

  return (
    <section className="py-12 bg-gray-50/50">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-teal-950 uppercase tracking-tight flex items-center justify-center gap-3">
            <span>✈️</span> DANH MỤC NỔI BẬT <span>⛵</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.link}
              className="group bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center transform hover:-translate-y-1"
            >
              <div className="w-28 h-28 rounded-2xl overflow-hidden mb-3 bg-teal-50 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={cat.image} 
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:rotate-1 transition-all duration-500"
                />
              </div>
              <h3 className="text-xs font-bold text-gray-800 tracking-tight mb-1 group-hover:text-teal-700 transition-colors line-clamp-1">
                {cat.title}
              </h3>
              <span className="text-[11px] font-medium text-teal-600 flex items-center gap-1 group-hover:underline">
                Xem ngay ➔
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
