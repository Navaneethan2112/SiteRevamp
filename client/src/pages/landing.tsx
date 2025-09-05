import { Navigation } from '@/components/landing/navigation';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Testimonials } from '@/components/landing/testimonials';
import { Pricing } from '@/components/landing/pricing';
import { Contact } from '@/components/landing/contact';
import { Footer } from '@/components/landing/footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <Features />
      
      {/* Demo Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="WhatsApp business messaging interface" 
                className="rounded-2xl shadow-2xl"
                data-testid="img-whatsapp-demo"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">See AaraConnect in Action</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Watch how leading businesses use our platform to automate customer communication, increase engagement, and drive sales through WhatsApp.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Automated welcome messages for new customers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Smart chatbots for instant customer support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Targeted campaigns with personalized templates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Real-time analytics and performance tracking</span>
                </div>
              </div>
              
              <button 
                className="mt-8 bg-primary text-primary-foreground px-8 py-4 rounded-lg hover-scale font-semibold"
                data-testid="button-request-demo"
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
