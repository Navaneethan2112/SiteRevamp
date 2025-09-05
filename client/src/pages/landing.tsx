import { Navigation } from '@/components/landing/navigation';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { ScrollingFeatures } from '@/components/landing/scrolling-features';
import { ImageCarousel } from '@/components/landing/image-carousel';
import { Statistics } from '@/components/landing/statistics';
import { BenefitsBanner } from '@/components/landing/benefits-banner';
import { Testimonials } from '@/components/landing/testimonials';
import { Pricing } from '@/components/landing/pricing';
import { Contact } from '@/components/landing/contact';
import { Footer } from '@/components/landing/footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <BenefitsBanner />
      <Statistics />
      <Features />
      <ScrollingFeatures />
      <ImageCarousel />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
