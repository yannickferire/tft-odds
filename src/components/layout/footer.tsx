import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

const Footer = () => {
  return (
    <>
    <footer className="bg-earlynight py-4 rounded">
      <div className="flex flex-col sm:flex-row px-4 justify-between gap-4 sm:gap-8 md:gap-16">
        <div className="order-2 sm:order-1 flex-1">
          <p className="text-xs text-crema leading-5 opacity-40 mt-4 sm:mt-0">TFT Odds isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.<br/>
          </p>
          {/* <a className="block mt-0.5 text-xs leading-[30px] sm:leading-normal opacity-40 hover:opacity-100 tracking-wider font-bold" href="javascript:openAxeptioCookies()">Cookies</a> */}
        </div>
        <div className="order-1 sm:order-2 flex-1 flex">
          <ul className="flex-1 text-left text-xs text-crema leading-5">
            <li>
              <Link 
                href="/"
                className="leading-[30px] sm:leading-normal inline-block opacity-40 hover:opacity-100 tracking-wider font-bold"
              >Champions</Link>
            </li>
            <li>
              <p 
                className="leading-[30px] sm:leading-normal inline-block opacity-20 tracking-wider"
              >Headliners</p>
              <span className="opacity-50 px-1 bg-midnight ml-1 rounded-sm">Soon</span>
            </li>
            <li>
              <Link 
                href={`/tome-of-traits`}
                className="leading-[30px] sm:leading-normal inline-block opacity-40 hover:opacity-100 tracking-wider font-bold"
              >Tome of traits</Link>
            </li>
            <li>
              <Link 
                href={`/augments-tier`}
                className="leading-[30px] sm:leading-normal inline-block opacity-40 hover:opacity-100 tracking-wider font-bold"
              >Augments Tier</Link>
            </li>
          </ul>
          <ul className="flex-1 text-left text-xs text-crema leading-5">
            <li>
              <Link 
                href={`/data/augments-distribution`}
                className="leading-[30px] sm:leading-normal inline-block opacity-40 hover:opacity-100 tracking-wider font-bold"
              >Augments Distribution</Link>
            </li>
            <li>
              <Link 
                href={`/data/augments-tables`}
                className="leading-[30px] sm:leading-normal inline-block opacity-40 hover:opacity-100 tracking-wider font-bold"
              >Augments Tables</Link>
            </li>
            {/* <li>
              <Link 
                href={`/data/portals`}
                className="leading-[30px] sm:leading-normal inline-block opacity-40 hover:opacity-100 tracking-wider font-bold"
              >Portals Rewards</Link>
            </li> */}
          </ul>
          <ul className="flex-1 text-center sm:text-right text-xs text-crema leading-5">
            <li>
              <a href="https://twitter.com/tftodds" className="leading-[30px] sm:leading-normal opacity-40 hover:opacity-100 tracking-wider font-bold">
                <svg className="w-3.5 inline-block relative top-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248 204">
                  <path fill="#1d9bf0" d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"/>
                </svg> @tftodds</a>
            </li>
            <li className="hidden">
              <a rel="me" href="https://mastodon.social/@tftodds">@tftodds</a>
            </li>
            {/*
            <li>
              <a href="https://tactics.tools/player/euw/tftodds%20com" className="leading-[30px] sm:leading-normal opacity-40 hover:opacity-100 tracking-wider font-bold"><Image className="inline-block -mt-1" width="20" height="20" src="/images/ranks/master.webp" alt="Rank: Master" /> tftodds com</a>
            </li>
            */}
            <li>
              <a href="mailto:hello@tftodds.com" className="leading-[30px] sm:leading-normal block opacity-40 hover:opacity-100 tracking-wider font-bold">hello@tftodds.com</a>
            </li>
            <li><p className="inline opacity-40">© 2023 TFT Odds</p></li>
          </ul>
        </div>
      </div>
    </footer>
    <Script id="axeptio">
      {`window.axeptioSettings = {
        clientId: "6410ae10abd07c5b67cf880f",
        cookiesVersion: "tft odds-en",
      };
      (function (d, s) {
        var t = d.getElementsByTagName(s)[0],
          e = d.createElement(s);
        e.async = true;
        e.src = "//static.axept.io/sdk.js";
        t.parentNode.insertBefore(e, t);
      })(document, "script");`}
    </Script>
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-1QTL0DHGW5"/>
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
  )
}

export default Footer

