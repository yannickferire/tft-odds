
import React from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { navigationConfig, NavigationItem } from '@/config/navigation';
import { PAGE_METADATA } from '@/config/page-metadata';

// --- Types ---
interface RelatedLink {
  href: string;
  label: string;
}

// --- Constants ---
const POPULAR_PAGES: RelatedLink[] = [
  { href: '/rolling-odds', label: 'Rolling Odds Tool' },
  { href: '/encounters', label: 'Encounters' },
  { href: '/augments/augments-simulator', label: 'Augments Simulator' },
];

const MANUAL_OVERRIDES: Record<string, string[]> = {
  '/rolling-odds': ['/data/shops-odds', '/data/champion-bags', '/encounters'],
};

// --- Helper Functions ---

const findNodeAndParent = (
  items: NavigationItem[],
  path: string,
  parent: NavigationItem | null = null
): { node: NavigationItem; parent: NavigationItem | null } | null => {
  for (const item of items) {
    if (item.href === path) {
      return { node: item, parent };
    }
    if (item.children) {
      const found = findNodeAndParent(item.children, path, item);
      if (found) return found;
    }
  }
  return null;
};

const getRelatedLinks = (currentPath: string): RelatedLink[] => {
  let initialLinks: RelatedLink[] = [];

  // 1. Manual Override
  if (MANUAL_OVERRIDES[currentPath]) {
    initialLinks = MANUAL_OVERRIDES[currentPath].map((href) => {
      const meta = PAGE_METADATA[href];
      const navItem = findNodeAndParent(navigationConfig, href)?.node;
      return { href, label: meta?.title || navItem?.label || 'Link' };
    });
  } else {
    // 2. Navigation Structure Logic
    const result = findNodeAndParent(navigationConfig, currentPath);

    if (result) {
      const { node, parent } = result;

      if (node.children && node.children.length > 0) {
        // Strategy B: I am a Parent -> Show Children
        initialLinks = node.children.map((child) => ({
          href: child.href,
          label: child.label,
        }));
      } else if (parent && parent.children) {
        // Strategy A: I am a Child -> Show Siblings
        initialLinks = parent.children
          .filter((sibling) => sibling.href !== currentPath)
          .map((sibling) => ({
            href: sibling.href,
            label: sibling.label,
          }));
      }
    }
  }

  // 3. Fallback / Fill
  // Create a pool of potential links to fill up to 3
  const pool = [...initialLinks, ...POPULAR_PAGES];
  const finalLinks: RelatedLink[] = [];
  const seen = new Set<string>();

  // Add current path to seen to prevent self-linking
  seen.add(currentPath);

  for (const item of pool) {
    if (finalLinks.length >= 3) break;
    if (!seen.has(item.href)) {
      finalLinks.push(item);
      seen.add(item.href);
    }
  }

  return finalLinks;
};

const RelatedContent = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  // Exclude Home
  if (currentPath === '/') return null;

  const relatedLinks = getRelatedLinks(currentPath);

  if (relatedLinks.length === 0) return null;

  return (
    <div className="mb-20 border-t border-white/10 pt-8">
      <div className="flex flex-col items-center mb-10">
        <h3 className="text-3xl mt-4 mb-2 font-bold px-4 text-center tracking-wide text-crema">Explore More</h3>
        <p className="text-center mb-0 text-sm text-crema/60">Discover other tools to improve your game</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedLinks.map((link) => {
          const meta = PAGE_METADATA[link.href];
          // Use meta values if available, otherwise fallbacks
          const title = meta?.title || link.label;
          const description = meta?.description || 'View this page';

          return (
            <Link
              key={link.href}
              href={link.href}
              className="group block relative p-6 rounded-xl bg-midnight/40 border border-white/10 hover:border-morning/50 transition-all duration-300 hover:bg-midnight/60 hover:-translate-y-1 overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-morning/10 blur-[50px] rounded-full translate-x-16 -translate-y-16 group-hover:translate-x-10 group-hover:bg-morning/20 transition-all duration-700" />

              <div className="relative z-10">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-crema mb-3 group-hover:text-morning transition-colors flex items-center gap-2 tracking-wide">
                      {title}
                      <svg className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </h4>
                    <p className="text-sm text-crema/60 leading-relaxed group-hover:text-crema/90 transition-colors">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedContent;
