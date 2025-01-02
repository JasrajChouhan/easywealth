import { CallToAction } from '@/components/call-to-action/cta';
import { Features } from '@/components/Features/features';
import { Hero } from '@/components/Hero/hero';
import { HowItWorks } from '@/components/How-it-works/how-it-works';
import { Stats } from '@/components/Stats/stats';
import { Testimonial } from '@/components/testimonial/testimonial';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonial />
      <CallToAction />
    </div>
  );
}
