import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { stateSet, currentSet, setStage, patch } from '@/constants/set';
import { navigationConfig, NavigationItem } from '@/config/navigation';

const Header = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleCloseMenu);

    return () => router.events.off('routeChangeStart', handleCloseMenu);
  });

  // Helper to check if current path matches nav item or its children
  const isActive = (item: NavigationItem): boolean => {
    if (router.pathname === item.href) return true;
    if (item.children) {
      return item.children.some(child => router.pathname === child.href);
    }
    return false;
  };

  // Render mobile menu item
  const renderMobileItem = (item: NavigationItem) => {
    const active = router.pathname === item.href;

    return (
      <li key={item.href}>
        <Link
          href={item.href}
          className={`block px-4 py-2 text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold rounded-lg border border-transparent hover:bg-white/10 hover:border-white/20 ${active ? 'bg-white/5 text-morning' : ''}`}
        >
          {item.label}
        </Link>
      </li>
    );
  };

  // Render desktop menu item
  const renderDesktopItem = (item: NavigationItem) => {
    const active = isActive(item);

    // Item with dropdown
    if (item.children && item.children.length > 0) {
      return (
        <li key={item.href} className="hidden sm:inline-block relative group">
          <p className="px-3 py-2 text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold rounded-lg border border-transparent group-hover:bg-white/10 group-hover:border-white/20">
            {item.label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={4}
              stroke="currentColor"
              className="w-4 h-4 inline-block ml-1 relative top-[3px]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </p>
          <div className="hidden group-hover:inline-block absolute right-0 top-full pt-4 cursor-pointer z-10 animate-fromtop">
            <ul className="text-left w-56 bg-midnight/95 border border-white/10 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden">
              {item.children.map((child, index) => {
                const childActive = router.pathname === child.href;

                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className={`block py-3 px-4 text-crema transition-all duration-300 ease-in-out cursor-pointer hover:bg-white/10 ${childActive ? 'bg-white/5 text-morning' : ''}`}
                    >
                      {child.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </li>
      );
    }

    // Regular item
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          className={`block px-3 py-2 text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold rounded-lg border border-transparent hover:bg-white/10 hover:border-white/20 ${active ? 'bg-white/5 text-morning' : ''}`}
        >
          {item.label}
        </Link>
      </li>
    );
  };

  return (
    <>
      <header className="sticky top-4 z-50 flex flex-col min-[1000px]:flex-row items-center justify-between mb-8 w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-lg px-4 md:px-8 py-3 transition-all duration-300">
        <div className="flex justify-between w-full min-[1000px]:w-auto z-50">
          <div className="flex items-end">
            <Link href="/">
              <Image src="/tft-odds-logo.svg" alt="TFT Odds" width={130} height={35} />
            </Link>
            <p className="bg-white/5 border border-white/10 px-2 py-1 ml-3 -mb-px rounded-md text-xs backdrop-blur-md">
              <span className="flex">
                <span className="opacity-40">
                  Set {currentSet}{setStage === 2 ? '.5' : null}
                  {stateSet === 'pbe' ? <small className="ml-1 opacity-60">– PBE</small> : <small className="ml-1 opacity-60">– Patch {patch}</small>}</span>
              </span>
            </p>
          </div>
          <button className="min-[1000px]:hidden" onClick={handleToggleMenu}>
            {mobileMenuOpen ? (
              <Image src="/icons/x.svg" alt="Close" width={40} height={40} className="cursor-pointer" />
            ) : (
              <Image src="/icons/menu.svg" alt="Menu" width={40} height={40} className="cursor-pointer" />
            )}
          </button>
        </div>

        <div className="flex-1 hidden min-[1000px]:block self-center">
          <ul className="flex items-center justify-end gap-3 min-[1000px]:gap-4">
            {navigationConfig.map(item => renderDesktopItem(item))}
          </ul>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`min-[1000px]:hidden fixed top-0 ${mobileMenuOpen ? "left-0" : "left-full"} p-6 w-screen h-screen bg-midnight transition-all duration-500 z-40`}>
        <ul className="relative top-20 flex flex-col text-left justify-end gap-2 md:gap-6">
          {navigationConfig.map(item => {
            // For mobile, flatten the children
            if (item.children && item.children.length > 0) {
              return item.children.map(child => renderMobileItem(child));
            }
            return renderMobileItem(item);
          })}
        </ul>
      </div>
    </>
  );
};

export default Header;
