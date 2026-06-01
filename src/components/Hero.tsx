/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onShopClick: () => void;
}

export default function Hero({ onShopClick }: HeroProps) {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-gradient-to-b from-skincare-cream via-skincare-cream/95 to-skincare-cream py-20 lg:py-32 border-b border-skincare-text/5"
    >
      {/* Radiant Glow Orb backdrop */}
      <div className="absolute top-[20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-radial from-skincare-clay/30 via-skincare-cream/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] h-[350px] w-[350px] rounded-full bg-radial from-skincare-gold/15 to-transparent blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Hero details - Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex flex-col space-y-6 lg:col-span-6 lg:max-w-xl"
          >
            {/* Philosophy Tag badge */}
            <div className="inline-flex">
              <span className="bg-skincare-clay/60 px-4 py-2 text-[9px] font-sans tracking-[0.25em] font-medium uppercase text-skincare-text shadow-xs rounded-full">
                THE TSUYADAMA PHILOSOPHY
              </span>
            </div>

            {/* Main title */}
            <h1 className="font-serif text-4xl font-light leading-[1.12] text-skincare-text sm:text-5xl lg:text-6xl tracking-tight">
              Unlock Your <br />
              <span className="italic font-normal text-skincare-gold">Inner Radiance</span>
            </h1>

            {/* Description text */}
            <p className="text-sm font-sans font-light leading-relaxed text-skincare-text/80 md:text-base max-w-lg">
              Experience the luminous pearl-like glow born from forty years of advanced Japanese collagen science. Our formulas replenish scaffolding density while maximizing natural light reflection.
            </p>

            {/* Button */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                id="hero-cta-shop"
                onClick={onShopClick}
                className="group relative inline-flex items-center justify-center bg-skincare-text hover:bg-skincare-gold px-8 py-4 text-xs font-sans font-semibold tracking-[0.2em] uppercase text-skincare-cream shadow-md hover:shadow-xl transition-all duration-500 transform rounded-full cursor-pointer hover:shadow-2xl active:scale-98 overflow-hidden"
              >
                {/* Gloss sweep animation */}
                <span className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  SHOP THE COLLECTION
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-4 border-t border-skincare-text/10 pt-8 mt-4 font-mono text-xs text-skincare-text/60">
              <div>
                <span className="block text-sm font-semibold font-sans text-skincare-text">40+ Yrs</span>
                Collagen Expertise
              </div>
              <div>
                <span className="block text-sm font-semibold font-sans text-skincare-text">98% Match</span>
                Skin Luminosity
              </div>
              <div>
                <span className="block text-sm font-semibold font-sans text-skincare-text">Tokyo Lab</span>
                Pure Biodevelopment
              </div>
            </div>
          </motion.div>

          {/* Hero interactive visual - Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative lg:col-span-6 flex justify-center lg:justify-end"
          >
            {/* Animated aura rings representing skin luminosity diffusion */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute h-80 w-80 animate-ping rounded-full bg-skincare-gold/5 opacity-40 [animation-duration:10s]" />
              <div className="absolute h-[420px] w-[420px] rounded-full border border-skincare-gold/10 opacity-60 animate-spin [animation-duration:40s]" />
              <div className="absolute h-[500px] w-[500px] rounded-full border border-skincare-clay/15 opacity-40 animate-pulse [animation-duration:15s]" />
            </div>

            {/* Image card with glowing frames */}
            <div className="relative w-full max-w-lg aspect-4/3 overflow-hidden rounded-md bg-skincare-clay/50 p-2.5 shadow-xl group border border-skincare-text/10">
              <div className="absolute inset-0 bg-linear-to-tr from-skincare-text/15 via-transparent to-white/5 opacity-60 z-10 pointer-events-none" />
              
              <img
                src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1200&auto=format&fit=crop"
                alt="Elixir Skincare Luminosity Serum"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover rounded-xs transition-transform duration-700 ease-out group-hover:scale-102"
              />

              {/* Float badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-5 py-2.5 shadow-lg border border-skincare-text/10 rounded-full"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-skincare-gold text-white">
                  <Sparkles className="h-3 w-3" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono tracking-widest text-[#8E7F70] uppercase leading-none">THE SIGNATURE EFFECT</span>
                  <span className="text-xs font-semibold font-serif text-skincare-text">Tsuyadama Pearl Glow</span>
                </div>
              </motion.div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
