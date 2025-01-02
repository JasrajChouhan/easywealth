'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../ui/button';

export const Hero = () => {
  const imageRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (!imageElement) {
        return;
      }
      if (scrollPosition > scrollThreshold) {
        imageElement?.classList.add('scrolled');
      } else {
        imageElement?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <section className="px-4 pb-20 pt-40">
      <div className="container mx-auto text-center">
        <h1 className="gradient-title pb-10 text-5xl md:text-6xl lg:text-[105px]">
          Manage Your Finances <br /> with Intelligence
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>

        <div className="flex items-center justify-center space-x-4">
          <Link href={'/dashboard'}>
            <Button className="px-8" size={'lg'}>
              <span>Get Started</span>
            </Button>
          </Link>

          <Link href={'/dashboard'}>
            <Button className="px-8" variant={'secondary'}>
              <span>Watch Demo</span>
            </Button>
          </Link>
        </div>

        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="mx-auto rounded-lg border shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
