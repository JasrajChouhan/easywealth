import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="animate-bounce text-4xl font-bold text-gray-900 md:text-6xl">
          404 - Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600 md:text-xl">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/">
          <Button variant="outline" className="mt-6">
            Go Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
