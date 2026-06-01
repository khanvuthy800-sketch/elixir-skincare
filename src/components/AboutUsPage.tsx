/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  ArrowLeft, 
  Sparkles, 
  History, 
  Flame, 
  ShieldCheck, 
  Beaker, 
  CheckCircle2, 
  Quote, 
  TrendingUp, 
  FileText
} from "lucide-react";
import { motion } from "motion/react";

interface AboutUsPageProps {
  onNavigateTo: (page: "home" | "products" | "cart" | "about" | "contact") => void;
}

export default function AboutUsPage({ onNavigateTo }: AboutUsPageProps) {
  const milestones = [
    {
      year: "1983",
      title: "The Genesis of Collagen Science",
      desc: "Launched by Shiseido in Tokyo, Elixir was born from revolutionary cellular matrix investigations specializing in restorative fiber tightening."
    },
    {
      year: "1997",
      title: "The Dual Barrier Emulsion Breakthrough",
      desc: "Pioneered lipids that mimic human skin membrane walls, allowing deep intercellular absorption without active pore blockage."
    },
    {
      year: "2010",
      title: "First Elasticity 'Tsuyadama' Standard",
      desc: "Scientifically defined the 'Tsuyadama' luster (the iconic natural inner cheek glow reflecting peak light density) as the ultimate skin heath index."
    },
    {
      year: "2021",
      title: "Next-gen Type VII Anchoring Peptide",
      desc: "Released our flagship bio-emulsion capable of reinforcing deep lipid-anchoring proteins, resulting in a 24H sustained bouncing matrix."
    }
  ];

  const values = [
    {
      icon: <Beaker className="h-6 w-6 text-skincare-gold" />,
      title: "Laboratory Accuracy First",
      desc: "Every single drop undergoes comprehensive triple-phase validation, certified by leading dermatological bureaus in Ginza."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-skincare-gold" />,
      title: "The Iconic 'Tsuyadama' Glow",
      desc: "We don't mask characteristics; we condition the surface layer so it naturally captures, refracts, and diffuses ambient light."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-skincare-gold" />,
      title: "Dermal Integrity Compliance",
      desc: "Hypoallergenic, botanical-powered science developed specifically to nourish sensitive or depleted facial cell membranes."
    }
  ];

  return (
    <div id="about-page-root" className="bg-[#FAF8F5] min-h-screen pt-24 pb-24 font-sans text-skincare-text">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Navigation Breadcrumbs */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <button
            id="about-back-btn"
            onClick={() => onNavigateTo("home")}
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#8E7F70] hover:text-skincare-gold transition-colors duration-300 uppercase cursor-pointer py-1 focus:outline-none"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            BACK TO SCIENTIFIC DIRECTORY
          </button>

          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-skincare-bronze/70">
            <span className="cursor-pointer hover:text-skincare-gold" onClick={() => onNavigateTo("home")}>ELIXIR HOME</span>
            <span>/</span>
            <span className="text-skincare-gold font-semibold uppercase">ABOUT HERITAGE</span>
          </div>
        </div>

        {/* Brand Philosophy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 border-b border-skincare-text/5 pb-16">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-skincare-gold uppercase font-bold block">SINCE 1983 COLLAGEN RESEARCH</span>
            <h1 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight">
              Preserving Cellular Resilience in Every Reflection
            </h1>
            <p className="text-sm font-sans text-skincare-text/85 leading-relaxed text-balance">
              At Elixir, we believe skin is the absolute mirror of your inner biological health. For more than four decades, Shiseido's specialized laboratory division has been researching the dynamic structure of type IV and VII collagen fibers. By decoding how moisture layers interact with tissue anchors, we developed state-of-the-art formulations that restore volume and trigger natural cheek luminescence.
            </p>
            <p className="text-xs text-skincare-text/70 leading-relaxed">
              Our clinical solutions are synthesized directly in Tokyo, combining rare organic concentrates—such as Yoshino Cherry Leaf and Pearl Autolysates—with advanced biometric carrier peptides. The result is the signature <strong className="font-semibold text-skincare-text uppercase tracking-wider text-[11px]">Tsuyadama</strong>: a dense pearl-like shine that glows cleanly through any application.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="space-y-1">
                <span className="font-mono text-3xl font-semibold text-skincare-gold block">40+</span>
                <span className="text-[9px] font-mono tracking-widest uppercase text-skincare-bronze">Years of Research</span>
              </div>
              <div className="h-10 w-[1px] bg-skincare-text/10 hidden sm:block" />
              <div className="space-y-1">
                <span className="font-mono text-3xl font-semibold text-skincare-gold block">Tokyo</span>
                <span className="text-[9px] font-mono tracking-widest uppercase text-skincare-bronze">Origin & Ginza Labs</span>
              </div>
              <div className="h-10 w-[1px] bg-skincare-text/10 hidden sm:block" />
              <div className="space-y-1">
                <span className="font-mono text-3xl font-semibold text-skincare-gold block">100%</span>
                <span className="text-[9px] font-mono tracking-widest uppercase text-skincare-bronze">Dermal Certificate</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-square bg-skincare-mist border border-skincare-text/10 rounded-2xl overflow-hidden shadow-sm relative group">
              <img 
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=82" 
                alt="Shiseido Scientific Skincare Development" 
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-skincare-text/60 to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <Quote className="h-5 w-5 text-skincare-gold mb-1" />
                <p className="font-serif italic text-xs leading-relaxed text-slate-100">
                  "Authentic skincare is not about masking tissue density; it is the physical chemistry of light reflection."
                </p>
                <div className="text-[9px] font-mono tracking-wider text-skincare-gold mt-1">
                  — DR. KAI MIYAHARA, CENTRAL TOKYO CLINICAL DEPT
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Scientific Foundation Values */}
        <div className="space-y-12 mb-20">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono tracking-widest text-[#8E7F70] uppercase font-bold block">OUR FORMULAR PRINCIPLES</span>
            <h2 className="font-serif text-2xl md:text-3xl font-light">The Pillars of Tokyo Skincare</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white border border-skincare-text/10 p-8 rounded-2xl space-y-4 hover:border-skincare-gold/30 transition-all shadow-3xs hover:shadow-2xs">
                <div className="h-12 w-12 bg-[#FAF8F5] border border-skincare-text/5 rounded-full flex items-center justify-center shadow-inner">
                  {v.icon}
                </div>
                <h3 className="font-serif text-base font-semibold text-skincare-text">{v.title}</h3>
                <p className="text-xs text-skincare-text/75 leading-relaxed font-sans">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Historial Timeline Milestones Grid */}
        <div className="space-y-12 mb-20 bg-white border border-skincare-text/10 p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-skincare-gold/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 bg-skincare-cream/70 rounded-full blur-3xl" />

          <div className="space-y-2 border-b border-skincare-text/5 pb-6">
            <span className="text-[10px] font-mono tracking-widest text-skincare-gold uppercase font-bold block flex items-center gap-1">
              <History className="h-3.5 w-3.5" /> FOUR DECADES OF EXCELLENCE
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-skincare-text">Chronology of Advancements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 pt-4">
            {milestones.map((m, i) => (
              <div key={i} className="space-y-3 relative group">
                <span className="font-mono text-3xl font-bold text-skincare-gold/30 group-hover:text-skincare-gold transition-colors block duration-300">
                  {m.year}
                </span>
                <h4 className="font-serif text-sm font-semibold tracking-tight text-skincare-text leading-snug">
                  {m.title}
                </h4>
                <p className="text-xs text-skincare-text/70 leading-relaxed font-sans">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action card footer */}
        <div className="bg-[#5C5248] text-white p-10 rounded-2xl text-center space-y-6 max-w-3xl mx-auto shadow-md">
          <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center mx-auto text-skincare-gold">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-light">Experience the Scientific 'Tsuyadama' Standard Today</h3>
            <p className="text-xs text-slate-200/80 leading-relaxed max-w-md mx-auto">
              Take our interactive skincare assessment diagnostic to receive custom recommended products configured by Tokyo-trained skincare chemists.
            </p>
          </div>
          <button
            id="about-cta-quiz-btn"
            onClick={() => onNavigateTo("products")}
            className="inline-flex items-center gap-2 bg-white text-[#5C5248] hover:bg-skincare-gold hover:text-white transition-colors text-[10px] font-sans font-bold tracking-widest uppercase px-8 py-3.5 rounded-full cursor-pointer shadow-xs"
          >
            EXPLORE THE FORMULARY
          </button>
        </div>

      </div>
    </div>
  );
}
