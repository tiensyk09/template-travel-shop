'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogGrid() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackPosts = [
    {
      id: 1,
      title: 'Cách Ngâm Rượu Sâm Dây Ngọc Linh Tươi – Bí Quyết Tạo Nên Loại Rượu Quý',
      date: '22/10/2024',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2023/01/cach-ngam-ruou-sam-day-ngoc-linh-tuoi-ngoclinhxanh-1oclinhxanh-2Untitled-1111-770x350.jpg',
      slug: 'cach-ngam-ruou-sam-day-ngoc-linh-tuoi'
    },
    {
      id: 2,
      title: 'Lan Kim Tuyến chữa bệnh gì? – Thảo dược quý và những bệnh có thể điều trị',
      date: '15/10/2024',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2024/10/lan-kim-tuyen-chua-benh-gi-rung-ngoc-linh-xanh-ngoclinhxanh-202-770x350.jpg',
      slug: 'lan-kim-tuyen-chua-benh-gi'
    },
    {
      id: 3,
      title: 'Sâm Dây Ngọc Linh: Đặc Điểm, Thành Phần và Đối Tượng Sử Dụng',
      date: '14/08/2024',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2023/01/sam-day-ngoc-linh-xanh-hong-dang-sam-chinh-hieu-ngoclinhxanh-22-720x350.jpg',
      slug: 'sam-day-ngoc-linh-dac-diem-doi-tuong-su-dung'
    }
  ];

  useEffect(() => {
    fetch('/api/posts?status=published&limit=3')
      .then(res => res.json())
      .then(data => {
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts.map(p => ({
            id: p.id,
            title: p.title,
            date: p.created_at ? new Date(p.created_at).toLocaleDateString('vi-VN') : 'Mới nhất',
            image: p.image,
            slug: p.slug
          })));
        } else {
          setPosts(fallbackPosts);
        }
      })
      .catch(() => setPosts(fallbackPosts))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-12 bg-gray-50/50">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-teal-950 uppercase tracking-tight flex items-center justify-center gap-3">
            <span>🌿</span> CẨM NANG DƯỢC LIỆU <span>🌿</span>
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
                  src={post.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const fallback = fallbackPosts.find(fp => fp.slug === post.slug);
                    e.target.src = fallback ? fallback.image : 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-teal-800 text-3xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                  📅 {post.date}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <Link href={`/posts/${post.slug}`}>
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug hover:text-teal-700 transition-colors mb-3">
                    {post.title}
                  </h3>
                </Link>

                <Link 
                  href={`/posts/${post.slug}`}
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
