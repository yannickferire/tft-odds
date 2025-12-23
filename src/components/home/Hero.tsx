import Link from "next/link";
import NextImage from "next/image";
import { HexChampionCard } from "./HexChampionCard";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  // 1. Scroll Parallax
  const { scrollY } = useScroll();

  /**
   * Helper Component for Parallax Elements
   * @param speed - Scroll parallax multiplier (Higher = moves faster/further)
   * @param delay - Entrance animation delay in seconds
   * @param className - Positioning classes
   * @param children - The actual content (Image/Card)
   */
  const ParallaxLayer = ({
    speed = 1,
    delay = 0,
    className = "",
    children
  }: {
    speed?: number;
    delay?: number;
    className?: string;
    children: React.ReactNode
  }) => {
    // Scroll Transform
    const yScroll = useTransform(scrollY, [0, 1000], [0, -150 * speed]);
    const opacityScroll = useTransform(scrollY, [0, 600], [1, 0.2]);

    // Entrance Logic:
    // 1. Far elements (low speed) drop slightly. Near elements (high speed) drop more.
    // 2. Scale is subtle (0.9 -> 1).
    const startY = -8 * speed; // Divided by 5 as requested (was 40)

    return (
      <motion.div
        className={`absolute ${className}`}
        style={{ y: yScroll, opacity: opacityScroll }}
      >
        {/* Entrance Animation Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: startY, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </motion.div>
    );
  };

  const scrollToTools = () => {
    const element = document.getElementById('tools');
    if (element) {
      const offset = 96;
      const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
      const startY = window.scrollY;

      animate(startY, targetY, {
        duration: 0.8,
        ease: [0.45, 0, 0.55, 1], // easeInOutSine for smoother feel
        onUpdate: (latest) => window.scrollTo(0, latest)
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative -mt-32 overflow-hidden min-h-screen flex flex-col justify-center"
    >

      {/* Main Content Payload (Title, Text, Buttons) - Subtle Parallax (Depth 0.2) */}
      <motion.div
        className="flex flex-col items-center text-center max-w-5xl mx-auto px-4 relative z-20"
        style={{
          y: useTransform(scrollY, [0, 800], [0, 190]),
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tighter tracking-tight mb-2 md:mb-4 text-balance text-shadow-lg">
          <span className="text-crema">The </span>
          <span className="text-gradient">Teamfight Tactics Odds</span>
          <span className="text-crema"> & </span>
          <br className="hidden md:block" />
          <span className="text-gradient">Probability Tool</span>
        </h1>

        {/* Subheadline */}
        <h2 className="text-lg md:text-xl text-crema/80 max-w-2xl mx-auto mb-8 text-balance leading-relaxed">
          Stop guessing and start climbing. Master the game with our data-driven tools dedicated to <strong>odds and probabilities</strong>.
        </h2>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 relative pointer-events-auto">
          <Link href="/rolling-odds">
            <button className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-br from-morning to-[#E07B4A] text-midnight font-bold text-lg rounded-xl shadow-[0_4px_20px_rgba(236,179,101,0.3)] hover:shadow-[0_8px_30px_rgba(236,179,101,0.5)] hover:bg-brightness-110 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
              <span>Try Rolling Odds Tool</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
          <button
            onClick={scrollToTools}
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-crema border border-white/10 hover:border-white/20 font-semibold text-lg rounded-xl backdrop-blur-sm transition-all duration-300 w-full sm:w-auto"
          >
            <span>Other tools and data</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19V5m0 14l-7-7m7 7l7-7" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* 3D Roll Icon - Centered, entering from below with its own Parallax Layer */}
      <ParallaxLayer
        speed={0.75}
        delay={0.4}
        className="left-0 bottom-0 w-full flex justify-center z-10 pointer-events-none"
      >
        <div className="relative w-80 h-80 md:w-[520px] md:h-[520px] mx-auto opacity-70">
          <NextImage
            src="/roll-icon.png"
            alt="3D Roll Icon"
            fill
            className="object-contain drop-shadow-[0_0_50px_rgba(66,153,225,0.5)]"
            priority
          />
        </div>
      </ParallaxLayer>

      {/* Parallax / Floating Assets Scene */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-visible">

        {/* --- FLOATING COINS --- */}
        {/* Rule: Near (Large/Sharp) = Fast Speed. Far (Small/Blurred) = Slow Speed. */}

        {/* 1. Main Left (Large, Near) -> Fast */}
        <ParallaxLayer speed={1.8} delay={0.1} className="left-[5%] md:left-[8%] top-[25%] w-24 h-24 md:w-32 md:h-32">
          <div className="opacity-20 md:opacity-100 w-full h-full animate-float-medium" style={{ animationDelay: '0s' }}>
            <NextImage src="/hero-coin-spatula-transparent.png" alt="Gold Spatula Coin" fill className="object-contain opacity-90 blur-[0.5px]" priority />
          </div>
        </ParallaxLayer>

        {/* 2. Bottom Right (Medium, Mid) -> Medium */}
        <ParallaxLayer speed={1.0} delay={0.3} className="right-[5%] md:right-[15%] top-[70%] w-20 h-20 md:w-28 md:h-28">
          <div className="w-full h-full animate-float-fast" style={{ animationDelay: '1.5s' }}>
            <NextImage src="/hero-coin-spatula-angle2-transparent.png" alt="Gold Spatula Coin Side" fill className="object-contain opacity-80 blur-[1px] rotate-12" />
          </div>
        </ParallaxLayer>

        {/* 3. Bottom Left (Small, Mid-Far) -> Slower */}
        <ParallaxLayer speed={0.6} delay={0.5} className="left-[15%] bottom-[10%] w-16 h-16">
          <div className="w-full h-full animate-float-slow" style={{ animationDelay: '2s' }}>
            <NextImage src="/hero-coin-spatula-angle3-transparent.png" alt="Gold Spatula Coin Top" fill className="object-contain opacity-60 blur-[2px] -rotate-12" />
          </div>
        </ParallaxLayer>

        {/* 4. Top Right (Small, Far) -> Slow */}
        <ParallaxLayer speed={0.4} delay={0.7} className="right-[8%] top-[15%] w-12 h-12 md:w-16 md:h-16">
          <div className="w-full h-full animate-float-medium" style={{ animationDelay: '3s' }}>
            <NextImage src="/hero-coin-spatula-transparent.png" alt="Gold Spatula Coin Small" fill className="object-contain opacity-50 blur-[2px] rotate-45" />
          </div>
        </ParallaxLayer>

        {/* 5. Far Right Middle (Medium, Mid) -> Medium */}
        <ParallaxLayer speed={0.9} delay={0.2} className="right-[2%] top-[45%] w-14 h-14 md:w-20 md:h-20">
          <div className="w-full h-full animate-float-slow" style={{ animationDelay: '1s' }}>
            <NextImage src="/hero-coin-spatula-angle2-transparent.png" alt="Gold Spatula Coin Side" fill className="object-contain opacity-70 blur-[1px] -rotate-45" />
          </div>
        </ParallaxLayer>

        {/* 6. Far Left Middle (Small, Far) -> Slow */}
        <ParallaxLayer speed={0.3} delay={0.6} className="left-[2%] top-[55%] w-10 h-10 md:w-14 md:h-14">
          <div className="w-full h-full animate-float-fast" style={{ animationDelay: '4s' }}>
            <NextImage src="/hero-coin-spatula-angle3-transparent.png" alt="Gold Spatula Coin Top" fill className="object-contain opacity-60 blur-[1.5px] rotate-90" />
          </div>
        </ParallaxLayer>

        {/* 7. Top Left Corner (Tiny, Very Far) -> Very Slow */}
        <ParallaxLayer speed={0.2} delay={0.8} className="left-[20%] top-[5%] w-8 h-8 md:w-12 md:h-12">
          <div className="w-full h-full animate-float-slow" style={{ animationDelay: '2.5s' }}>
            <NextImage src="/hero-coin-spatula-transparent.png" alt="Gold Spatula Coin Tiny" fill className="object-contain opacity-40 blur-[3px] rotate-180" />
          </div>
        </ParallaxLayer>


        {/* --- FLOATING CARDS (Midground = Standard Speed) --- */}

        <ParallaxLayer speed={0.8} delay={0.2} className="right-[5%] md:right-[10%] top-[20%] w-32 h-36 md:w-48 md:h-52">
          <div className="opacity-30 md:opacity-100 w-full h-full animate-float-slow" style={{ animationDelay: '1s' }}>
            <HexChampionCard name="Bard" cost={2} status="unlocked" className="w-full h-full rotate-6" />
          </div>
        </ParallaxLayer>

        <ParallaxLayer speed={0.8} delay={0.4} className="left-[-10px] md:left-[5%] top-[60%] w-28 h-32 md:w-40 md:h-44">
          <div className="w-full h-full animate-float-medium" style={{ animationDelay: '2.5s' }}>
            <HexChampionCard name="Yunara" cost={4} className="w-full h-full -rotate-6" />
          </div>
        </ParallaxLayer>

        <ParallaxLayer speed={1.1} delay={0.6} className="right-[20%] bottom-[-10px] md:bottom-[5%] w-24 h-28 md:w-32 md:h-36">
          <div className="w-full h-full animate-float-fast" style={{ animationDelay: '3s' }}>
            <HexChampionCard name="Brock" cost={5} status="locked" className="w-full h-full rotate-12" />
          </div>
        </ParallaxLayer>

      </div>
    </section>
  );
};

