import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle }) => {
  return (
    <section className="relative overflow-hidden bg-(--color-primary) text-white pt-32 pb-16 lg:pt-40 lg:pb-24">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-(--color-primary-container) blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-300 font-medium mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Link
            to="/"
            className="hover:text-white transition-colors hover:underline underline-offset-4"
          >
            Home
          </Link>
          <ChevronRightIcon className="h-3 w-3" />
          <span className="text-white">{title}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-(--color-primary-container) max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
