/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface SeasonalSetsProps {
  onDiscoverClick: () => void;
}

export default function SeasonalSets({ onDiscoverClick }: SeasonalSetsProps) {
  return (
    <section id="seasonal-section" className="bg-skincare-cream py-20 lg:py-28 overflow-hidden relative border-b border-skincare-text/5">
      
      {/* Decorative vertical gold text */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 writing-mode-vertical text-[44px] lg:text-[72px] font-serif font-light text-skincare-text/3 select-none pointer-events-none tracking-[0.2em] hidden md:block">
        TSUYADAMA
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="bg-skincare-clay border border-skincare-text/10 relative overflow-hidden rounded-2xl py-16 px-8 md:px-16 shadow-sm">
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Visual Column - image block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-white/50 shadow-md group">
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop"
                  alt="Exclusive Seasonal Gift Set Ritual"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-750 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-skincare-gold/5 blend-multiply pointer-events-none" />
              </div>
              
              {/* Highlight card detail */}
              <div className="absolute -bottom-5 -right-5 bg-white/95 backdrop-blur-sm py-3 px-5 border border-skincare-text/10 shadow-lg text-[9px] font-mono tracking-widest text-[#8E7F70] uppercase flex items-center gap-1.5 rounded-full">
                <Sparkles className="h-3 w-3 text-skincare-gold" />
                LIMITED STOCKS AVAILABLE
              </div>
            </motion.div>

            {/* Information details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 flex flex-col space-y-6"
            >
              <span className="text-[10px] font-sans tracking-[0.25em] font-medium uppercase text-skincare-gold">
                LIMITED OFFER
              </span>
              
              <h2 className="font-serif text-3xl font-light text-skincare-text sm:text-4xl">
                Exclusive Seasonal <br />
                <span className="italic font-normal text-skincare-gold">Sets & Rituals</span>
              </h2>

              <p className="text-sm text-skincare-text/85 font-sans font-light leading-relaxed max-w-xl">
                Discover the power of Retinol combined with our signature pearl-glow technology. A curated collection designed for transformative cell reconstruction, resulting in dramatically firmer skin and balanced dewy luminosity.
              </p>

              {/* Checklist details */}
              <div className="space-y-3 pt-2">
                {[
                  "Complimentary Travel-Sized Essence (30ml)",
                  "Signature Silk Cotton Application Pads (x40)",
                  "Bespoke Japanese Premium Cedarwood Gift Box",
                  "Elite Lifetime Skin Consultation Voucher"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-skincare-gold border border-skincare-text/10 shadow-xs">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-xs font-sans font-light text-skincare-text/90">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button Action */}
              <div className="pt-4">
                <button
                  id="discover-ritual-btn"
                  onClick={onDiscoverClick}
                  className="group inline-flex items-center justify-center bg-skincare-text hover:bg-skincare-gold px-8 py-3.5 text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-skincare-cream shadow-md hover:shadow-xl transition-all duration-300 rounded-full cursor-pointer"
                >
                  DISCOVER THE RITUAL
                </button>
              </div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
