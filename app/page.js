import HeroBanner from '@/components/HeroBanner';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import PromoBanner from '@/components/PromoBanner';
import BlogGrid from '@/components/BlogGrid';

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroBanner />
      <CategoryGrid />
      <ProductGrid />
      <PromoBanner />
      <BlogGrid />
    </div>
  );
}
