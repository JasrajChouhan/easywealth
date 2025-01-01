import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
}
