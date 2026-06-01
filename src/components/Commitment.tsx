/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Play, Pause, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Commitment() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <section id="commitment-section" className="bg-white py-20 lg:py-28 relative border-b border-skincare-text/5">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h3 className="font-serif text-3xl font-light text-skincare-text">
            Innovative Collagen Science, Perfected
          </h3>
          <p className="mt-3 text-xs md:text-sm font-sans font-light leading-relaxed text-skincare-bronze">
            Since 1983, Elixir has pioneered clinical research into the complex, vital bond between deep collagen density and physical facial luminescence.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Video Placeholder/Interactive Player - Left */}
          <div className="lg:col-span-6 relative flex flex-col justify-center">
            <div className="relative w-full aspect-video md:aspect-16/10 overflow-hidden rounded-lg bg-skincare-mist border border-skincare-text/10 shadow-xl group">
              
              {/* Cover Image */}
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop"
                alt="Elixir Skincare Laboratory Footage"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-750 group-hover:scale-101.5"
              />
              {/* Blur gradient mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-skincare-text/30 via-transparent to-transparent opacity-60 z-10" />

              {/* Trigger button */}
              <button
                id="play-video-trigger"
                onClick={() => setShowVideoModal(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-white/95 hover:bg-skincare-gold text-skincare-text hover:text-white shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border border-skincare-text/5"
                aria-label="Play brand story video"
              >
                <Play className="h-5 w-5 fill-current ml-1" />
              </button>

              <div className="absolute bottom-4 left-4 z-20 text-white font-mono text-[10px] tracking-widest uppercase">
                PRESS TO PLAY BRAND REVELATION
              </div>
            </div>
          </div>

          {/* Commitment Details Column - Right */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <span className="text-[10px] font-sans tracking-[0.25em] font-medium uppercase text-skincare-gold">
              OUR COMMITMENT
            </span>
            
            <h4 className="font-serif text-2xl font-light text-skincare-text">
              A Legacy of Luster
            </h4>

            <p className="text-xs md:text-sm font-sans font-light leading-relaxed text-skincare-text/85">
              Our advanced technology focuses on skin's "Tsuyadama"—that inner pearl-like glow on the cheeks that only healthy, firm skin can achieve. This geometric reflection is not a trick of highlighter cosmetics, but the somatic reality of perfectly organized dermal grids that reflect light arrays outwards synchronously.
            </p>

            <div className="border-t border-skincare-text/10 pt-6 space-y-4">
              <div className="flex items-start space-x-3.5">
                <div className="p-1 px-2 bg-skincare-clay text-skincare-gold rounded-full border border-skincare-text/5 shrink-0">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="font-serif text-sm font-medium text-skincare-text leading-tight">
                    Patent #J-382901-T
                  </h5>
                  <p className="text-[11px] text-skincare-text/75 font-sans font-light mt-1">
                    Awarded Tokyo Cosmetics Biotech formulation award for deep marine collagen double stabilization.
                  </p>
                </div>
              </div>
              
              <div className="h-[1px] w-full bg-skincare-text/10" />
            </div>
          </div>

        </div>
      </div>

      {/* Beautiful Story Video Presentation Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVideoModal(false)}
              className="absolute inset-0 bg-black"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-3xl bg-skincare-text p-1 border border-[#EADBC8]/30 shadow-2xl rounded-sm z-10 overflow-hidden"
            >
              <div className="aspect-video w-full bg-black relative flex items-center justify-center">
                
                {/* Playing simulation indicator */}
                {isPlaying ? (
                  <div className="absolute inset-x-0 bottom-4 z-20 flex justify-between items-center px-6">
                    <div className="flex items-center space-x-3 text-white font-mono text-[10px] tracking-wider bg-black/60 py-1.5 px-3 border border-white/10 rounded-xs">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      <span>STREAMING CLINICAL FOOTAGE (01:12 / 03:45)</span>
                    </div>
                    <button
                      id="video-player-pause"
                      onClick={() => setIsPlaying(false)}
                      className="bg-white/92 hover:bg-red-500 text-skincare-text hover:text-white p-2 rounded-full shadow-lg transition-colors cursor-pointer"
                    >
                      <Pause className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 z-10 p-6 text-center space-y-4">
                    <button
                      id="video-player-play"
                      onClick={() => setIsPlaying(true)}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-skincare-gold text-white shadow-xl hover:scale-110 active:scale-95 transition-all text-center cursor-pointer"
                    >
                      <Play className="h-5 w-5 fill-current ml-1" />
                    </button>
                    <div className="space-y-1">
                      <h5 className="text-white font-serif text-base font-light tracking-wide">
                        Tsuyadama Molecular Dermal Density Synthesis
                      </h5>
                      <p className="text-[10px] font-mono text-white/50">
                        BROADCASTING FROM TOKYO BIOLOGICAL DESIGN GROUP
                      </p>
                    </div>
                  </div>
                )}

                {/* Subtitle stream Simulation */}
                {isPlaying && (
                  <div className="absolute bottom-16 inset-x-6 z-10 text-center px-4">
                    <p className="text-white bg-black/70 py-2 px-4 rounded-sm inline-block text-xs font-sans font-light border border-white/10 shadow-lg">
                      "...When marine water-soluble collagen bonds connect, the light refraction expands, raising skin density..."
                    </p>
                  </div>
                )}

                {/* Simulated video frame background */}
                <div className="absolute inset-0 select-none opacity-40 pointer-events-none">
                  <img
                    src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop"
                    alt="Collagen formulation video background"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Close Button banner */}
              <div className="flex bg-[#2C2620] justify-between items-center py-2 px-4 text-[10px] text-white/70 font-mono">
                <span>PATENT NO: J-382901-T SECURE STREAM</span>
                <button
                  id="close-video-modal"
                  onClick={() => {
                    setIsPlaying(false);
                    setShowVideoModal(false);
                  }}
                  className="hover:text-white font-semibold cursor-pointer underline"
                >
                  DISMISS VIEW [ESC]
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
