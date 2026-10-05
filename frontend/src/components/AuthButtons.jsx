import { Link } from 'react-router-dom';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { useAuth } from '../hooks/useAuth';

export default function AuthButtons() {
  const { isSignedIn, isLoaded } = useAuth();
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const normalizedClerkKey = typeof publishableKey === 'string' ? publishableKey.trim() : '';
  const isClerkConfigured = normalizedClerkKey.startsWith('pk_') && !/your|placeholder/i.test(normalizedClerkKey);

  if (!isLoaded) return null;

  if (!isClerkConfigured) {
    return null;
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="text-sm opacity-70 transition hover:opacity-100">
          Dashboard
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <SignInButton mode="modal">
        <button type="button" className="cursor-pointer text-sm opacity-70 transition hover:opacity-100">
          Sign In
        </button>
      </SignInButton>
    </div>
  );
}