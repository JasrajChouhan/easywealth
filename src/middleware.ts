import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public and protected routes
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

const isProtectRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/account(.*)',
  'transactions(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  if (!userId && isProtectRoute(request)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
