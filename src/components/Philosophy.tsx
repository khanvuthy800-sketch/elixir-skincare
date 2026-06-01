/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function Philosophy() {
  return (
    <section id="philosophy-section" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-6 lg:col-span-6"
          >
            <span className="text-[10px] font-sans tracking-[0.3em] font-medium uppercase text-skincare-gold">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl font-light leading-snug text-skincare-text sm:text-4xl lg:text-4xl">
              A Vision of Timeless <br />
              <span className="italic font-normal text-skincare-gold">Radiance</span>
            </h2>
            
            <div className="space-y-4 text-sm font-sans font-light leading-relaxed text-skincare-text/80">
              <p>
                At the heart of Elixir lies a profound commitment to the science of luminosity. We believe that true radiance is not merely surface-level, but a reflection of inner skin health cultivated through decades of collagen research. Our journey is one of precision and elegance, dedicated to uncovering the biological secrets of a youthful glow.
              </p>
              <p>
                By harmonizing advanced biotechnology with a deep understanding of human skin, we empower every individual to embrace a future where beauty is timeless and light is captured from within.
              </p>
            </div>

            {/* Micro-detail line */}
            <div className="pt-4 flex items-center space-x-3">
              <div className="h-[1px] w-12 bg-skincare-gold/50" />
              <span className="text-[10px] font-mono tracking-widest text-skincare-bronze uppercase">
                TSUYADAMA BIOLABS, TOKYO
              </span>
            </div>
          </motion.div>
 
          {/* Right Image Layout */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex justify-center relative"
          >
            {/* Visual offset background card */}
            <div className="absolute right-4 bottom-4 -z-10 h-full w-full max-w-sm rounded-md bg-skincare-cream border border-skincare-clay/50" />
            
            <div className="relative w-full max-w-sm aspect-3/4 overflow-hidden rounded-md bg-skincare-mist border border-skincare-text/10 shadow-xl translate-x-4 -translate-y-4 group">
              <img
                src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1200&auto=format&fit=crop"
                alt="Elixir Skincare Face Cream Jar Formulation"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-skincare-text/20 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
              
              {/* Corner accent */}
              <div className="absolute top-4 right-4 h-6 w-6 border-t border-r border-[#FAF8F5]/60" />
              <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-[#FAF8F5]/60" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
