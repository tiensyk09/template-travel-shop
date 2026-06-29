import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Travel Shop - Tinh hoa Đặc sản & Quà lưu niệm Việt Nam',
  description: 'Chuyên cung cấp đặc sản 3 miền, quà tặng du lịch & làng nghề truyền thống Việt Nam chất lượng cao.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-white text-gray-800 font-sans antialiased min-h-screen flex flex-col justify-between">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
