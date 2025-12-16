import Link from 'next/link';
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  gradientColor: string;
  delay?: number;
  className?: string;
}

export const FeatureCard = ({
  title,
  description,
  href,
  icon,
  gradientColor,
  delay = 0,
  className = ""
}: FeatureCardProps) => {
  const delayClass = delay > 0 ? `animate-delay-${delay}` : '';

  return (
    <Link href={href} className={className}>
      <article
        className={`group relative flex flex-col h-full p-6 rounded-lg glass-card border-2 border-transparent hover:border-${gradientColor} transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl animate-fromleft ${delayClass}`}
        style={{
          background: 'rgba(4, 28, 50, 0.4)',
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(255, 255, 210, 0.1)',
        }}
      >
        {/* Gradient glow effect on hover */}
        <div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${gradientColor}40, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <div className="mb-4 text-morning">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-crema mb-3 group-hover:text-morning transition-colors flex items-center gap-2 tracking-wide">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm opacity-80 mb-4 flex-grow leading-relaxed">
          {description}
        </p>

        {/* CTA */}
        <div className="flex items-center text-morning font-semibold group-hover:translate-x-2 transition-transform duration-300">
          <span>Explore</span>
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </article>
    </Link>
  );
};
