import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/auth/logout-button';
import { Bell, ChevronDown } from 'lucide-react';
import logoImage from '@assets/logo(1)_1757082606279.png';
import { Link } from 'wouter';

export function DashboardHeader() {
  const { user } = useAuth0();

  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center" data-testid="link-home">
              <img 
                src={logoImage} 
                alt="Aara Connect Logo" 
                className="h-14 w-auto max-w-none"
              />
            </Link>
            <span className="text-sm bg-muted px-2 py-1 rounded">Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" data-testid="button-notifications">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              {user?.picture && (
                <img 
                  src={user.picture} 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full"
                  data-testid="img-user-avatar"
                />
              )}
              <span className="text-sm hidden sm:block" data-testid="text-username">
                {user?.name}
              </span>
              <ChevronDown className="h-3 w-3" />
            </div>
            <LogoutButton>Logout</LogoutButton>
          </div>
        </div>
      </div>
    </header>
  );
}
