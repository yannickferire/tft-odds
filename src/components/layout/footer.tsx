import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { navigationConfig } from '@/config/navigation';

const Footer = () => {
  const year = new Date().getFullYear();

  // Separate items with and without children
  const itemsWithoutChildren = navigationConfig.filter(item => !item.children || item.children.length === 0);
  const itemsWithChildren = navigationConfig.filter(item => item.children && item.children.length > 0);

  return (
    <>
      <footer className="bg-earlynight py-4 rounded z-10">
        <div className="flex flex-col sm:flex-row px-4 justify-between gap-4 sm:gap-8 md:gap-16">
          <div className="order-1 sm:order-2 flex-1 flex">
            {/* First column: Home + items without children */}
            <ul className="flex-1 text-left text-xs text-crema leading-5">
              <li>
                <Link
                  href="/"
                  className="leading-[30px] sm:leading-normal inline-block opacity-40 hover:opacity-100 tracking-wider font-bold"
                >
                  Home
                </Link>
              </li>
              {itemsWithoutChildren.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="leading-[30px] sm:leading-normal inline-block opacity-40 hover:opacity-100 tracking-wider font-bold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Columns for items with children */}
            {itemsWithChildren.map(parentItem => (
              <ul key={parentItem.href} className="flex-1 text-left text-xs text-crema leading-5">
                {parentItem.children!.map(child => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="leading-[30px] sm:leading-normal inline-block opacity-40 hover:opacity-100 tracking-wider font-bold"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}

            {/* Social & Copyright column */}
            <ul className="flex-1 text-center sm:text-right text-xs text-crema leading-5">
              <li>
                <a href="https://twitter.com/tftodds" className="leading-[30px] sm:leading-normal opacity-40 hover:opacity-100 tracking-wider font-bold">
                  <svg className="w-3.5 inline-block relative top-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248 204">
                    <path fill="#ffffff" className="scale-75" d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
                  </svg> @tftodds
                </a>
              </li>
              <li>
                <a href="https://tactics.tools/player/euw/tftodds%20com" className="leading-[30px] sm:leading-normal opacity-40 hover:opacity-100 tracking-wider font-bold">
                  <Image className="inline-block -mt-1" width="20" height="20" src="/images/ranks/platinum.svg" alt="Rank: Platinum" style={{ width: 'auto', height: 'auto' }} /> tftodds com
                </a>
              </li>
              <li>
                <a href="mailto:hello@tftodds.com" className="leading-[30px] sm:leading-normal block opacity-40 hover:opacity-100 tracking-wider font-bold">
                  hello@tftodds.com
                </a>
              </li>
              <li>
                <p className="inline opacity-40">© {year} TFT Odds</p>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-crema leading-5 opacity-40 mt-4 px-4">
          TFT Odds isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
          <br />
        </p>
      </footer>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-1QTL0DHGW5" />
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1QTL0DHGW5', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
    </>
  );
};

export default Footer;
