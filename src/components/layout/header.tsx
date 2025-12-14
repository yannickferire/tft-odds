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
          className={`py-2 inline-block text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${active ? 'text-morning underline underline-offset-4 cursor-default' : ''}`}
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
          <p className="text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-transparent hover:border-crema">
            {item.label} <span className="inline-block rotate-180 relative -top-0.5 text-2xl font-normal leading-3">^</span>
          </p>
          <div className="hidden group-hover:inline-block absolute right-0 top-full pt-2 cursor-pointer z-10">
            <ul className="text-left w-44 bg-midday rounded-sm">
              {item.children.map((child, index) => {
                const childActive = router.pathname === child.href;
                const isFirst = index === 0;
                const isLast = index === item.children!.length - 1;

                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className={`block pt-2 h-10 px-2 text-crema transition-all duration-300 ease-in-out cursor-pointer hover:text-midday hover:bg-crema ${isFirst ? 'rounded-t-sm' : ''} ${isLast ? 'rounded-b-sm' : ''} ${childActive ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
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
          className={`text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-transparent ${active ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
        >
          {item.label}
        </Link>
      </li>
    );
  };

  return (
    <header className="flex flex-col text-center md:flex-row mb-8 z-20">
      <div className="flex mb-6 justify-between md:mb-0 z-50">
        <div className="flex items-end">
          <Link href="/">
            <Image src="/tft-odds-logo.svg" alt="TFT Odds" width={160} height={43} />
          </Link>
          <p className="bg-earlynight px-2 py-1 ml-3 -mb-px rounded text-xs">
            <span className="flex">
              <span className="opacity-40">
                Set {currentSet}{setStage === 2 ? '.5' : null}
                {stateSet === 'pbe' ? <small className="ml-1 opacity-50">– PBE</small> : <small className="ml-1 opacity-50">– Patch {patch}</small>}</span>
            </span>
          </p>
        </div>
        <button className="md:hidden" onClick={handleToggleMenu}>
          {mobileMenuOpen ? (
            <Image src="/icons/x.svg" alt="Close" width={40} height={40} className="cursor-pointer" />
          ) : (
            <Image src="/icons/menu.svg" alt="Menu" width={40} height={40} className="cursor-pointer" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 ${mobileMenuOpen ? "left-0" : "left-full"} p-6 w-screen h-screen bg-midnight transition-all duration-500 z-40`}>
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

      {/* Desktop Menu */}
      <div className="flex-1 hidden md:block self-end">
        <ul className="flex justify-end gap-4 md:gap-6">
          {navigationConfig.map(item => renderDesktopItem(item))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
