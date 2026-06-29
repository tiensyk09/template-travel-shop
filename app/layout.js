import './globals.css';
import { CartProvider } from '@/components/CartContext';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata = {
  title: 'Sâm Ngọc Linh - Đặc Sản & Dược Liệu Kon Tum',
  description: 'Ngọc Linh XANH cung cấp đặc sản rừng, dược liệu thiên nhiên, sâm dây, nấm lim xanh tự nhiên 100% từ đỉnh núi Ngọc Linh.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-white text-gray-800 font-sans antialiased min-h-screen">
        <CartProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
