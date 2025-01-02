import { Button } from '@/components/ui/button';
import { LayoutDashboard, LogIn, PenBox } from 'lucide-react';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between border border-r-2 px-3 py-5 shadow-md">
        <div className="log-div">
          <Link href={'/'}>
            <h1>Welth</h1>
          </Link>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="login-btn">
            <Button variant="link">
              <LogIn size={24} />
              Log In
            </Button>
          </div>

          {/* 
            show page links here when user is signed out
          */}

          <div className="link-div hidden items-center gap-2 md:flex">
            <SignedOut>
              <a href="#features" className="text-gray-300 hover:text-blue-600">
                Features
              </a>

              <a
                href="#tesimonials"
                className="text-gray-300 hover:text-blue-600"
              >
                Testimonials
              </a>
            </SignedOut>
          </div>

          {/* 
            show dashboard button and user button when user is signed in
          */}

          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link
                href={'/dashboard'}
                className="flex items-center justify-center gap-2 text-gray-300 hover:text-blue-600"
              >
                <Button variant="outline">
                  <LayoutDashboard size={24} />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>

              <Link href={'/create/transaction'}>
                <Button variant="default">
                  <PenBox size={24} />
                  <span className="hidden md:inline">Create Transaction</span>
                </Button>
              </Link>
            </SignedIn>

            <SignedOut>
              <SignInButton forceRedirectUrl={'/dashboard'}>
                <Button variant="outline">
                  <PenBox size={24} />
                  <span className="hidden md:inline">Sign In</span>
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatar: true,
                    name: true,
                    email: true,
                    avatarBox: 'rounded-full w-10 h-10',
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};
