/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { SCIENCE_TOPICS } from "../data";
import { Beaker, Layers, Sparkles, Binary } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ScienceSection() {
  const [activeTab, setActiveTab] = useState("collagen");

  const tabIcons = {
    collagen: <Layers className="h-4 w-4" />,
    tsuyadama: <Sparkles className="h-4 w-4" />,
    retinol: <Beaker className="h-4 w-4" />
  };

  const selectedTopic = SCIENCE_TOPICS.find((t) => t.id === activeTab) || SCIENCE_TOPICS[0];

  return (
    <section id="science-section" className="bg-white py-20 lg:py-28 relative">
      
      {/* Abstract structural grid overlay background representing collagen mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#BCA37410_1px,transparent_1px),linear-gradient(to_bottom,#BCA37410_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 bg-skincare-cream px-3 py-1.5 border border-skincare-text/10 mb-4 rounded-full">
            <Binary className="h-3.5 w-3.5 text-skincare-gold" />
            <span className="text-[9px] font-sans tracking-[0.2em] font-medium uppercase text-skincare-text">
              DENTAL COLLAGEN LABS
            </span>
          </div>
          <h2 className="font-serif text-3xl font-light text-skincare-text sm:text-4xl tracking-tight">
            Collagen Science, Perfected
          </h2>
          <p className="mt-4 text-sm font-sans font-light leading-relaxed text-skincare-text/85">
            Since 1983, Elixir has pioneered research into the vital connection between collagen structure density and your skin's inner visual luminosity.
          </p>
        </div>

        {/* Interactive Tabs Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          
          {/* Tabs Selector Navigation (Left / 4-cols) */}
          <div className="flex flex-col space-y-3 lg:col-span-4">
            {SCIENCE_TOPICS.map((topic) => {
              const isActive = activeTab === topic.id;
              return (
                <button
                  id={`science-tab-trigger-${topic.id}`}
                  key={topic.id}
                  onClick={() => setActiveTab(topic.id)}
                  className={`flex flex-col items-start p-5 text-left border rounded-xl transition-all duration-300 pointer-events-auto cursor-pointer ${
                    isActive
                      ? "bg-skincare-cream border-skincare-gold shadow-xs translate-x-1"
                      : "bg-white border-skincare-text/10 opacity-80 hover:opacity-100 hover:border-skincare-gold/30"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                        isActive
                          ? "bg-skincare-gold text-white"
                          : "bg-skincare-cream text-skincare-gold border border-skincare-text/10"
                      }`}
                    >
                      {tabIcons[topic.id as keyof typeof tabIcons]}
                    </div>
                    <span className="text-xs font-mono font-medium tracking-[0.1em] uppercase text-skincare-text">
                      PRO-SERIES RESEARCH
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-light text-skincare-text">
                    {topic.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Tab Viewer content (Right / 8-cols) */}
          <div className="bg-white border border-skincare-text/10 p-8 md:p-12 shadow-sm rounded-2xl lg:col-span-8 min-h-[420px] relative flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-sans tracking-[0.2em] font-medium text-skincare-gold uppercase">
                    {selectedTopic.subtitle}
                  </span>
                  
                  <h4 className="font-serif text-2xl font-light text-skincare-text mt-2 mb-6">
                    {selectedTopic.title}
                  </h4>

                  <p className="text-sm font-sans font-light leading-relaxed text-skincare-text/80">
                    {selectedTopic.description}
                  </p>
                </div>

                {/* Specific Core Benefit Card */}
                <div className="border-t border-skincare-text/10 pt-6 mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <span className="block text-[10px] font-mono tracking-widest text-skincare-bronze uppercase">
                      CLINICAL TARGET OUTCOME
                    </span>
                    <p className="text-xs font-medium font-sans text-skincare-text/92 mt-1">
                      {selectedTopic.benefit}
                    </p>
                  </div>
                  
                  <div className="shrink-0 flex items-center space-x-2 bg-skincare-clay px-4 py-2.5 border border-skincare-text/5 rounded-full">
                    <span className="h-2 w-2 rounded-full bg-skincare-gold animate-pulse" />
                    <span className="text-[10px] font-mono tracking-wider font-semibold text-skincare-bronze uppercase">
                      TOKYO DERMA-VERIFIED
                    </span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Graphical Science Visualizer Card below */}
        <div className="mt-16 bg-skincare-cream border border-skincare-text/10 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-xs">
          <div className="relative aspect-video w-full md:w-80 overflow-hidden rounded-lg shrink-0 bg-skincare-mist border border-skincare-text/10 shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop"
              alt="Macrophotography of skin moisture layer reflection"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover opacity-65 select-none"
            />
            {/* Overlay holographic gloss */}
            <div className="absolute inset-0 bg-radial from-transparent via-white/5 to-skincare-gold/15 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="text-white bg-skincare-text/80 backdrop-blur-sm text-[10px] py-1.5 px-3 font-mono rounded-full border border-white/20">
                MICROSCOPIC INTENSITY
              </span>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-skincare-bronze uppercase">
              REVOLUTIONARY RESEARCH BREAKTHROUGH
            </span>
            <h4 className="font-serif text-lg font-light text-skincare-text">
              The Reflective Optical Angle Theorem
            </h4>
            <p className="text-xs font-sans font-light leading-relaxed text-skincare-text/80">
              When collagen bonds shrink from dehydration, light penetrates unevenly, creating shadows that appear as wrinkles. Our peptide complexes bind moisture physically to the structural protein scaffold, smoothing the epidermis into a flawless curved matrix. This forces optical light arrays to bounce outwards cleanly at a premium, glossy focus—restoring the Tsuyadama angle.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
