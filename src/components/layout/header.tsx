import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { stateSet, currentSet, setStage, patch } from '@/constants/set';

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
              Set {currentSet}{setStage === 2 ? '.5': null}
              {stateSet === 'pbe' ? <small className="ml-1 opacity-50">– PBE</small> : <small className="ml-1 opacity-50">– Patch {patch}</small>}</span> { /* <a className="ml-1 opacity-40 hover:opacity-80 transition-all" href="https://pbe.tftodds.com"><span className="top-px relative">→</span> Set 9.5</a> */ }
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
      <div className={`md:hidden fixed top-0 ${mobileMenuOpen ? "left-0" : "left-full"} p-6 w-screen h-screen bg-midnight transition-all duration-500 z-40`}>
        <ul className="relative top-20 flex flex-col text-left justify-end gap-2 md:gap-6">
          <li>
            <Link 
              href="/champions" 
              className={`py-2 inline-block text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${router.pathname === '/champions' ? 'text-morning underline underline-offset-4 cursor-default' : ''}`}
            >Champions</Link>
          </li>
          <li>
            <Link 
              href="/chem-baron" 
              className={`py-2 inline-block text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${router.pathname === '/chem-baron' ? 'text-morning underline underline-offset-4 cursor-default' : ''}`}
            >Chem Baron</Link>
          </li>
          <li>
            <Link 
              href="/conqueror" 
              className={`py-2 inline-block text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${router.pathname === '/conqueror' ? 'text-morning underline underline-offset-4 cursor-default' : ''}`}
            >Conqueror</Link>
          </li>
          <li>
            <Link 
              href="/augments-tier" 
              className={`py-2 inline-block text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${router.pathname === '/augments-tier' ? 'text-morning underline underline-offset-4 cursor-default' : ''}`}
            >Augments Tier</Link>
          </li>
          <li>
            <Link 
              href="/data/augments-distribution" 
              className={`py-2 inline-block text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${router.pathname === '/data/augments-distribution' ? 'text-morning underline underline-offset-4 cursor-default' : ''}`}
            >Augments Distribution</Link>
          </li>
          <li>
            <Link 
              href="/data/augments-tables"   
              className={`py-2 inline-block text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${router.pathname === '/data/augments-tables' ? 'text-morning underline underline-offset-4 cursor-default' : ''}`}
            >Augments Tables</Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 hidden md:block self-end">
        <ul className="flex justify-end gap-4 md:gap-6">
          <li>
            <Link 
              href="/champions" 
              className={`text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-transparent ${router.pathname === '/champions' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
            >Champions</Link>
          </li>
          <li>
            <Link 
              href="/chem-baron" 
              className={`text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-transparent ${router.pathname === '/chem-baron' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
            >Chem Baron</Link>
          </li>
          <li>
            <Link 
              href="/conqueror" 
              className={`text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-transparent ${router.pathname === '/conqueror' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
            >Conqueror</Link>
          </li>
          <li>
            <Link 
              href="/augments-tier" 
              className={`relative z-20 text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-transparent ${router.pathname === '/augments-tier' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
            >Augments Tier</Link>
          </li>
          <li className="hidden sm:inline-block relative group">
            <p className="text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-transparent hover:border-crema">Data <span className="inline-block rotate-180 relative -top-0.5 text-2xl font-normal leading-3">^</span></p>
            <div className="hidden group-hover:inline-block absolute right-0 top-0 pt-8 cursor-pointer z-10">
              <ul className="text-left w-44 bg-midday rounded-sm">
                <li>
                  <Link 
                    href="/data/augments-distribution" 
                    className={`rounded-t-sm block pt-2 h-10 px-2 text-crema transition-all duration-300 ease-in-out cursor-pointer hover:text-midday hover:bg-crema ${router.pathname === '/data/augments-distribution' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
                  >Augments Distribution</Link>
                </li>
                <li>
                  <Link 
                    href="/data/augments-tables" 
                    className={`block pt-2 h-10 px-2 text-crema transition-all duration-300 ease-in-out cursor-pointer hover:text-midday hover:bg-crema ${router.pathname === '/data/augments-tables' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
                  >Augments Tables</Link>
                </li>
                <li>
                  <Link 
                    href="/data/encounters" 
                    className={`block pt-2 h-10 px-2 rounded-b-sm text-crema transition-all duration-300 ease-in-out cursor-pointer hover:text-midday hover:bg-crema ${router.pathname === '/data/encounters' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
                  >Opening encounters</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="hidden md:hidden flex-1 mt-2">
        <ul className="flex justify-end gap-4 md:gap-6">
          <li>
            <Link 
              href="/data/augments-distribution" 
              className={`text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${router.pathname === '/data/augments-distribution' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
            >Augments Distribution</Link>
          </li>
          <li>
            <Link 
              href="/data/augments-tables" 
              className={`text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${router.pathname === '/data/augments-tables' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
            >Augments Tables</Link>
          </li>
        </ul>
      </div>
      <div className="hidden md:hidden flex-1 mt-2">
        <ul className="flex justify-end gap-4 md:gap-6">
          <li>
            <Link 
              href="/data/encounters" 
              className={`text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${router.pathname === '/data/encounters' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
            >Opening encounters</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header;