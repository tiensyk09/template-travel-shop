'use client';
import React from 'react';
import Link from 'next/link';

export default function BlogGrid() {
  const posts = [
    {
      id: 1,
      title: '10 món đặc sản Việt Nam nhất định phải thử một lần trong đời',
      date: '20/05/2026',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
      slug: '10-mon-dac-san-viet-nam'
    },
    {
      id: 2,
      title: 'Kinh nghiệm mua quà lưu niệm tinh tế khi đi du lịch 3 miền',
      date: '15/05/2026',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
      slug: 'kinh-nghiem-mua-qua-luu-niem'
    },
    {
      id: 3,
      title: 'Khám phá các làng nghề truyền thống lâu đời bậc nhất Việt Nam',
      date: '10/05/2026',
      image: 'https://images.unsplash.com/photo-1606760227091-3dd850d97f1d?auto=format&fit=crop&w=600&q=80',
      slug: 'kham-pha-lang-nghe-truyen-thong'
    }
  ];

  return (
    <section className="py-12 bg-gray-50/50">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-teal-950 uppercase tracking-tight flex items-center justify-center gap-3">
            <span>✈️</span> CẨM NANG DU LỊCH <span>⛵</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div 
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-teal-800 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                  📅 {post.date}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug hover:text-teal-700 transition-colors mb-3">
                    {post.title}
                  </h3>
                </Link>

                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 mt-auto pt-2 border-t border-gray-50"
                >
                  Xem thêm ➔
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
