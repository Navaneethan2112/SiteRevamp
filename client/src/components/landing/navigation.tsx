import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'wouter';
import { LoginButton } from '@/components/auth/login-button';
import { LogoutButton } from '@/components/auth/logout-button';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';

export function Navigation() {
  const { isAuthenticated, user } = useAuth0();
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
              <img 
                src="/assets/logo.png" 
                alt="AaraConnect Logo" 
                className="h-8 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-xl font-bold">AaraConnect</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-features"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-pricing"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-contact"
              >
                Contact
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="rounded-lg"
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" data-testid="link-dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <div className="flex items-center space-x-2">
                  {user?.picture && (
                    <img 
                      src={user.picture} 
                      alt="User avatar" 
                      className="w-8 h-8 rounded-full"
                      data-testid="img-user-avatar"
                    />
                  )}
                  <span className="text-sm hidden sm:block" data-testid="text-username">{user?.name}</span>
                </div>
                <LogoutButton variant="outline">Logout</LogoutButton>
              </div>
            ) : (
              <>
                <LoginButton variant="outline">Login</LoginButton>
                <LoginButton className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Start Free Trial
                </LoginButton>
              </>
            )}
            
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              size="icon"
              className="md:hidden"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('features')}
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors w-full text-left"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors w-full text-left"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors w-full text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
