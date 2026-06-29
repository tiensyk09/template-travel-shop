'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const [addingId, setAddingId] = useState(null);

  const fallbackProducts = [
    {
      id: 1,
      name: 'Sâm Dây Ngọc Linh Khô – Chính hiệu – Chất lượng',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2017/12/sam-day-ngoc-linh-kho-hong-dang-sam-kho-sam-day-kho-rung-samday-samdayngoclinh-ngoc-linh-xanh-ngoclinhxanh.jpg-8.jpg',
      badge: '-22%',
      badgeType: 'discount',
      rating: 5,
      reviews: 128,
      price: 700000,
      original_price: 900000,
      slug: 'sam-day-ngoc-linh-kho'
    },
    {
      id: 2,
      name: 'Sâm Dây Ngọc Linh Tươi – Đảng Sâm Chính Hiệu',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2017/12/sam-day-ngoc-linh-kho-hong-dang-sam-kho-ngoc-linh-xanh-com-ngoclinhxanh-2.jpg',
      badge: 'BEST SELLER',
      badgeType: 'bestseller',
      rating: 5,
      reviews: 96,
      price: 390000,
      original_price: 490000,
      slug: 'sam-day-ngoc-linh-tuoi'
    },
    {
      id: 3,
      name: 'Mật Ong Rừng Nguyên Chất Ngọc Linh',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2021/02/mat-ong-rung-nguyen-chat-ngoc-linh-xanh-matongrung-ngoclinhxanh-com-mat-ong-khoai-treo-lo-du-dang-sam-dat.jpg',
      badge: 'NEW',
      badgeType: 'new',
      rating: 5,
      reviews: 78,
      price: 590000,
      original_price: 690000,
      slug: 'mat-ong-rung-ngoc-linh'
    },
    {
      id: 4,
      name: 'Nấm Lim Xanh Rừng Ngọc Linh - Kon Tum',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2017/12/nam-lim-xanh-rung-ngoc-linh-xanh-chinh-hieu-tu-nhien-kon-tum-namlimxanh-ngoclinhxanh-6.jpg',
      badge: '-20%',
      badgeType: 'discount',
      rating: 5,
      reviews: 64,
      price: 1200000,
      original_price: 1500000,
      slug: 'nam-lim-xanh-rung'
    },
    {
      id: 5,
      name: 'Nấm Linh Chi Cổ Cò Rừng – Chính Hiệu – Hảo Hạng',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2018/11/nam-linh-chi-co-co-rung-nam-muong-mua-ban-tac-dung-n%E1%BA%A5m-linh-chi-c%E1%BB%95-c%C3%B2-chat-luong-chinh-hieu-ng%E1%BB%8Dc-linh-xanh-nam-muong-ngoclinhxanh-4.jpg',
      badge: '',
      badgeType: '',
      rating: 5,
      reviews: 52,
      price: 1400000,
      original_price: 1800000,
      slug: 'nam-linh-chi-co-co'
    },
    {
      id: 6,
      name: 'Khổ Qua Rừng Khô (Mướp Đắng Rừng)',
      image: 'https://ngoclinhxanh.com/wp-content/uploads/2017/12/kho-qua-rung-kho-muop-dang-rung-ngoc-linh-xanh-com-ngoclinhxanh-5.jpg',
      badge: '',
      badgeType: '',
      rating: 5,
      reviews: 38,
      price: 450000,
      original_price: 550000,
      slug: 'kho-qua-rung-kho'
    }
  ];

  useEffect(() => {
    fetch('/api/products?limit=12')
      .then(res => res.json())
      .then(data => {
        if (data.products && data.products.length > 0) {
          setProducts(data.products.map(p => ({
            id: p.id,
            name: p.name,
            image: p.thumbnail,
            price: p.price,
            original_price: p.original_price,
            slug: p.slug,
            is_featured: p.is_featured,
            is_flash_sale: p.is_flash_sale,
            flash_sale_price: p.flash_sale_price,
            unit: p.unit
          })));
        } else {
          setProducts(fallbackProducts);
        }
      })
      .catch(() => setProducts(fallbackProducts))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (e, prod) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingId(prod.id);
    
    const productForCart = {
      id: prod.id,
      name: prod.name,
      price: prod.price,
      thumbnail: prod.image,
      unit: prod.unit || 'Hộp'
    };
    
    addItem(productForCart, null, 1);
    
    setTimeout(() => {
      setAddingId(null);
    }, 800);
  };

  return (
    <section id="featured-products" className="py-12 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 style={{ color: '#1a2e1e' }} className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center justify-center gap-3">
            <span>🌿</span> SẢN PHẨM NỔI BẬT <span>🌱</span>
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {products.map((prod) => {
            const hasDiscount = prod.original_price && prod.original_price > prod.price;
            const discountPercent = hasDiscount ? Math.round((1 - (prod.price / prod.original_price)) * 100) : 0;
            
            return (
              <div 
                key={prod.id}
                className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
              >
                {/* Discount Badge */}
                {hasDiscount && (
                  <div className="absolute top-5 left-5 z-10 px-2 py-0.5 text-3xs font-bold rounded-md bg-orange-600 text-white uppercase tracking-wider">
                    -{discountPercent}%
                  </div>
                )}

                {/* Product Image */}
                <Link href={`/products/${prod.slug}`} className="block relative overflow-hidden rounded-xl bg-gray-50 mb-3 aspect-square">
                  <img 
                    src={prod.image || 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=500&q=80'} 
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const fallback = fallbackProducts.find(fp => fp.slug === prod.slug);
                      e.target.src = fallback ? fallback.image : 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=500&q=80';
                    }}
                  />
                </Link>

                {/* Content */}
                <div>
                  <Link href={`/products/${prod.slug}`}>
                    <h3 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug hover:text-teal-700 transition-colors mb-1.5 h-8">
                      {prod.name}
                    </h3>
                  </Link>

                  {/* Star Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex text-amber-400 text-xs">
                      ★ ★ ★ ★ ★
                    </div>
                    <span className="text-3xs text-gray-400 font-medium">(100+)</span>
                  </div>

                  {/* Price & Cart Button */}
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                    <div>
                      <div className="text-xs font-extrabold text-teal-900">{prod.price.toLocaleString('vi-VN')}đ</div>
                      {hasDiscount && (
                        <div className="text-3xs text-gray-400 line-through font-medium">{prod.original_price.toLocaleString('vi-VN')}đ</div>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(e, prod)}
                      disabled={addingId === prod.id}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: 'none',
                        background: addingId === prod.id ? '#10b981' : '#e8f5ec',
                        color: addingId === prod.id ? '#ffffff' : '#0d6832',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        boxShadow: '0 2px 6px rgba(13, 104, 50, 0.1)'
                      }}
                      className={addingId !== prod.id ? "home-cart-btn-hover" : ""}
                    >
                      {addingId === prod.id ? '✓' : '🛒'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <style jsx global>{`
        .home-cart-btn-hover:hover {
          background-color: #0d6832 !important;
          color: #ffffff !important;
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}
