'use client';
import React from 'react';
import Link from 'next/link';

export default function ProductGrid() {
  const products = [
    {
      id: 1,
      title: 'Cà phê Việt Nam - Hương vị truyền thống',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=500&q=80',
      badge: '-10%',
      badgeType: 'discount',
      rating: 5,
      reviews: 128,
      price: '135.000đ',
      oldPrice: '150.000đ',
      slug: 'ca-phe-viet-nam'
    },
    {
      id: 2,
      title: 'Trà Sen Tây Hồ - Thơm ngon tinh khiết',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80',
      badge: 'BEST SELLER',
      badgeType: 'bestseller',
      rating: 5,
      reviews: 96,
      price: '120.000đ',
      oldPrice: '',
      slug: 'tra-sen-tay-ho'
    },
    {
      id: 3,
      title: 'Hạt điều rang muối Bình Phước',
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=500&q=80',
      badge: '-15%',
      badgeType: 'discount',
      rating: 5,
      reviews: 78,
      price: '85.000đ',
      oldPrice: '100.000đ',
      slug: 'hat-dieu-binh-phuoc'
    },
    {
      id: 4,
      title: 'Nước mắm Phú Quốc - Chính hiệu truyền thống',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80',
      badge: '',
      badgeType: '',
      rating: 5,
      reviews: 64,
      price: '180.000đ',
      oldPrice: '',
      slug: 'nuoc-mam-phu-quoc'
    },
    {
      id: 5,
      title: 'Bánh đậu xanh Hải Dương giòn thơm',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
      badge: '-10%',
      badgeType: 'discount',
      rating: 4,
      reviews: 52,
      price: '72.000đ',
      oldPrice: '80.000đ',
      slug: 'banh-dau-xanh-hai-duong'
    },
    {
      id: 6,
      title: 'Túi cói thủ công - Phong cách du lịch',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80',
      badge: '',
      badgeType: '',
      rating: 5,
      reviews: 38,
      price: '150.000đ',
      oldPrice: '',
      slug: 'tui-coi-thu-cong'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-teal-950 uppercase tracking-tight flex items-center justify-center gap-3">
            <span>🏝️</span> SẢN PHẨM NỔI BẬT <span>⛵</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {products.map((prod) => (
            <div 
              key={prod.id}
              className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Badge */}
              {prod.badge && (
                <div className={`absolute top-5 left-5 z-10 px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                  prod.badgeType === 'bestseller' ? 'bg-amber-500 text-white' : 'bg-orange-600 text-white'
                }`}>
                  {prod.badge}
                </div>
              )}

              {/* Product Image */}
              <Link href={`/products/${prod.slug}`} className="block relative overflow-hidden rounded-xl bg-gray-50 mb-3 aspect-square">
                <img 
                  src={prod.image} 
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </Link>

              {/* Content */}
              <div>
                <Link href={`/products/${prod.slug}`}>
                  <h3 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug hover:text-teal-700 transition-colors mb-1.5 h-8">
                    {prod.title}
                  </h3>
                </Link>

                {/* Star Rating */}
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(prod.rating)}{'☆'.repeat(5 - prod.rating)}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">({prod.reviews})</span>
                </div>

                {/* Price & Cart Button */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                  <div>
                    <div className="text-xs font-extrabold text-teal-900">{prod.price}</div>
                    {prod.oldPrice && (
                      <div className="text-[10px] text-gray-400 line-through font-medium">{prod.oldPrice}</div>
                    )}
                  </div>
                  <button className="w-8 h-8 rounded-lg bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center shadow-sm hover:scale-105 transition-all">
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
