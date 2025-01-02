import { Features } from '@/components/Features/features';
import { Hero } from '@/components/Hero/hero';
import { Stats } from '@/components/Stats/stats';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Stats />
      <Features />
    </div>
  );
}
