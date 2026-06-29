'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackCategories = [
    {
      name: 'Sâm Ngọc Linh',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2021/02/mat-ong-rung-nguyen-chat-ngoc-linh-xanh-matongrung-ngoclinhxanh-com-mat-ong-khoai-treo-lo-du-dang-sam-dat.jpg',
      slug: 'sam-ngoc-linh'
    },
    {
      name: 'Sâm Dây Ngọc Linh',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2017/12/sam-day-ngoc-linh-kho-hong-dang-sam-kho-sam-day-kho-rung-samday-samdayngoclinh-ngoc-linh-xanh-ngoclinhxanh.jpg-8.jpg',
      slug: 'sam-day'
    },
    {
      name: 'Mật Ong Rừng',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2021/02/mat-ong-rung-nguyen-chat-ngoc-linh-xanh-matongrung-ngoclinhxanh-com-mat-ong-khoai-treo-lo-du-dang-sam-dat.jpg',
      slug: 'mat-ong'
    },
    {
      name: 'Nấm Rừng Ngọc Linh',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2017/12/nam-lim-xanh-rung-ngoc-linh-xanh-chinh-hieu-tu-nhien-kon-tum-namlimxanh-ngoclinhxanh-6.jpg',
      slug: 'nam-rung'
    },
    {
      name: 'Đặc Sản Núi Rừng',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2017/12/kho-qua-rung-kho-muop-dang-rung-ngoc-linh-xanh-com-ngoclinhxanh-5.jpg',
      slug: 'dac-san'
    },
    {
      name: 'Lan Kim Tuyến',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2019/01/nu-hoa-tam-that-rung-ngoc-linh-xanh-tay-nguyen-100-tu-nhien-tri-mat-ngu-hieu-qua-2.jpg',
      slug: 'lan-kim-tuyen'
    }
  ];

  useEffect(() => {
    fetch('/api/shop-categories')
      .then(res => res.json())
      .then(data => {
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories.filter(c => c.is_active !== 0));
        } else {
          setCategories(fallbackCategories);
        }
      })
      .catch(() => setCategories(fallbackCategories))
      .finally(() => setLoading(false));
  }, []);

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
              href={`/products?cat=${cat.slug}`}
              className="group bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center transform hover:-translate-y-1"
            >
              <div className="w-28 h-28 rounded-2xl overflow-hidden mb-3 bg-teal-50 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={cat.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'} 
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:rotate-1 transition-all duration-500"
                  onError={(e) => {
                    const fallback = fallbackCategories.find(fc => fc.slug === cat.slug);
                    e.target.src = fallback ? fallback.image : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80';
                  }}
                />
              </div>
              <h3 className="text-xs font-bold text-gray-800 tracking-tight mb-1 group-hover:text-teal-700 transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-2xs font-medium text-teal-600 flex items-center gap-1 group-hover:underline">
                Xem ngay ➔
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
