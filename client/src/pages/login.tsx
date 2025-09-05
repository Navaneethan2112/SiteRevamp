import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation('/dashboard');
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // This component will redirect, so we don't need to render anything
  return null;
}
