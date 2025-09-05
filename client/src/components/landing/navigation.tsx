import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'wouter';
import { LoginButton } from '@/components/auth/login-button';
import { LogoutButton } from '@/components/auth/logout-button';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Moon, Sun, Menu, X, Globe, DollarSign } from 'lucide-react';

export function Navigation() {
  const { isAuthenticated, user } = useAuth0();
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');

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
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 lg:space-x-8">
            <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
              <img 
                src="/assets/logo.png" 
                alt="AaraConnect Logo" 
                className="h-8 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-xl font-bold text-foreground">AaraConnect</span>
            </Link>
            <div className="hidden lg:flex space-x-6">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                data-testid="button-features"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                data-testid="button-pricing"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                data-testid="button-contact"
              >
                Contact
              </button>
              <Link href="/policies" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Policies
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-20 h-8 border-0 bg-transparent hover:bg-muted/50">
                <Globe className="h-3 w-3" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>

            {/* Currency Selector */}
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-20 h-8 border-0 bg-transparent hover:bg-muted/50">
                <DollarSign className="h-3 w-3" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="AED">AED</SelectItem>
                <SelectItem value="INR">INR</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg hover:bg-muted/50"
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="h-4 w-4 text-foreground" /> : <Moon className="h-4 w-4 text-foreground" />}
            </Button>
            
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-3">
                <Link href="/dashboard" data-testid="link-dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <div className="flex items-center space-x-2">
                  {user?.picture && (
                    <img 
                      src={user.picture} 
                      alt="User avatar" 
                      className="w-7 h-7 rounded-full"
                      data-testid="img-user-avatar"
                    />
                  )}
                  <span className="text-sm hidden md:block text-foreground" data-testid="text-username">{user?.name}</span>
                </div>
                <LogoutButton variant="outline">Logout</LogoutButton>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Select>
                  <SelectTrigger className="w-24 h-8 border-0 bg-transparent hover:bg-muted/50">
                    <SelectValue placeholder="Login" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">
                      <LoginButton variant="outline" className="w-full justify-start p-0 h-auto">
                        User Login
                      </LoginButton>
                    </SelectItem>
                    <SelectItem value="admin">
                      <LoginButton variant="outline" className="w-full justify-start p-0 h-auto">
                        Admin Login
                      </LoginButton>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <LoginButton className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm">
                  Request Demo
                </LoginButton>
              </div>
            )}
            
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4 text-foreground" /> : <Menu className="h-4 w-4 text-foreground" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors rounded-md"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors rounded-md"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors rounded-md"
              >
                Contact
              </button>
              <Link href="/policies" className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors rounded-md">
                Policies
              </Link>
              
              <div className="border-t border-border/40 pt-3 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link href="/dashboard">
                      <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                    </Link>
                    <LogoutButton variant="outline" className="w-full">Logout</LogoutButton>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <LoginButton variant="outline" className="w-full">User Login</LoginButton>
                    <LoginButton variant="outline" className="w-full">Admin Login</LoginButton>
                    <LoginButton className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Request Demo
                    </LoginButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
