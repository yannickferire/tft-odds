import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { stateSet, currentSet, setStage } from '@/constants/set';

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex flex-col items-center text-center sm:flex-row mb-8 sm:items-end">
      <div className="flex items-end mb-6 sm:mb-0">
        <Link href="/">
          <Image src="/tft-odds-logo.svg" alt="TFT Odds" width={160} height={43} />
        </Link>
        <p className="bg-earlynight px-2 py-1 ml-3 -mb-px rounded text-xs">
          <span className="opacity-40 flex">
            Set {currentSet}{setStage === 2 ? '.5': null}
            {/* {stateSet === 'pbe' ? <small className="ml-1 opacity-50">– PBE</small> : null} */}
          </span>
        </p>
      </div>
      <div className="flex-1">
        <ul className="flex justify-end gap-4 md:gap-6">
          <li>
            <Link 
              href="/" 
              className={`text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${router.pathname === '/' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
            >Champions</Link>
          </li>
          <li>
            <Link 
              href="/loaded-dice" 
              className={`text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${router.pathname === '/loaded-dice' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
            >Loaded Dice</Link>
          </li>
          <li>
            <Link 
              href="/tome-of-traits" 
              className={`relative z-20 text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${router.pathname === '/tome-of-traits' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
            >Tome of Traits</Link>
          </li>
          <li className="hidden sm:inline-block relative group">
            <p className="text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight hover:border-crema">Data <span className="inline-block rotate-180 relative -top-0.5 text-2xl font-normal leading-3">^</span></p>
            <div className="hidden group-hover:inline-block absolute right-0 top-0 pt-8 cursor-pointer z-10">
              <ul className="text-left w-44 bg-midday rounded-sm">
                <li>
                  <Link 
                    href="/data/augments-distribution" 
                    className={`block pt-2 h-10 px-2 rounded-t-sm text-crema transition-all duration-300 ease-in-out cursor-pointer hover:text-midday hover:bg-crema ${router.pathname === '/data/augments-distribution' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
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
                    href="/data/piltover" 
                    className={`block pt-2 h-10 px-2 text-crema transition-all duration-300 ease-in-out cursor-pointer hover:text-midday hover:bg-crema ${router.pathname === '/data/piltover' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
                  >Piltover Rewards</Link>
                </li>
                <li>
                  <Link 
                    href="/data/portals" 
                    className={`block pt-2 h-10 px-2 rounded-b-sm text-crema transition-all duration-300 ease-in-out cursor-pointer hover:text-midday hover:bg-crema ${router.pathname === '/data/portals' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
                  >Portals Rewards</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="sm:hidden flex-1 mt-2">
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
      <div className="sm:hidden flex-1 mt-2">
        <ul className="flex justify-end gap-4 md:gap-6">
          <li>
            <Link 
              href="/data/piltover" 
              className={`text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${router.pathname === '/data/piltover' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
            >Piltover Rewards</Link>
          </li>
          <li>
            <Link 
              href="/data/portals" 
              className={`text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight ${router.pathname === '/data/portals' ? 'text-morning border-morning cursor-default' : 'hover:border-crema'}`}
            >Portals Rewards</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header;