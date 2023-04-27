import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { currentSet, setStage } from '@/constants/set';

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex flex-col items-center text-center sm:flex-row mb-8 sm:items-end">
      <div className="flex items-end mb-6 sm:mb-0">
        <Link href="/">
          <Image src="/tft-odds-logo.svg" alt="TFT Odds" width={160} height={43} />
        </Link>
        <h2 className="bg-earlynight px-2 py-1 ml-3 -mb-px rounded text-xs">
          <span className="opacity-40">
            Set {currentSet}{setStage == 2 ? '.5': null}
          </span>
        </h2>
      </div>
      <div className="flex-1">
        <ul className="flex justify-end gap-4 md:gap-6">
          <li>
            <Link 
              href="/" 
              className={`text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight hover:border-crema ${router.pathname === '/' ? 'text-morning border-morning' : ''}`}
            >Champions</Link>
          </li>
          <li>
            <Link 
              href="/hero-augments" 
              className={`text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight hover:border-crema ${router.pathname === '/hero-augments' ? 'text-morning border-morning' : ''}`}
            >Hero Augments</Link>
          </li>
          <li>
            <Link 
              href="/loaded-dice" 
              className={`text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight hover:border-crema ${router.pathname === '/loaded-dice' ? 'text-morning border-morning' : ''}`}
            >Loaded Dice</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header;