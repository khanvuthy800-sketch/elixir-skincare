/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Globe, Heart, Shield, Landmark, Sparkles } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#EADBC8]/30 pt-16 pb-8 text-skincare-text">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Core links layout */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 border-b border-[#EADBC8]/20 pb-12 mb-12">
          
          {/* Contact Column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h5 className="font-serif text-sm font-semibold uppercase tracking-wider text-skincare-text">
              CONTACT
            </h5>
            <div className="space-y-2 text-xs font-sans font-light text-skincare-text/80 flex flex-col items-start">
              <button
                id="footer-contact-num"
                onClick={() => onNavigate("contact-page")}
                className="hover:text-skincare-gold text-left transition-colors duration-200 cursor-pointer"
              >
                0120-770-933
              </button>
              <button
                id="footer-contact-mail"
                onClick={() => onNavigate("contact-page")}
                className="hover:text-skincare-gold text-left transition-colors duration-200 cursor-pointer"
              >
                support@elixir.jp
              </button>
              <button
                id="footer-contact-desk"
                onClick={() => onNavigate("contact-page")}
                className="text-skincare-gold text-[10px] uppercase font-mono tracking-wider hover:underline underline-offset-4 cursor-pointer pt-1"
              >
                Dermal Support Desk &rarr;
              </button>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-4">
            <h5 className="font-serif text-sm font-semibold uppercase tracking-wider text-skincare-text">
              SHOP
            </h5>
            <div className="flex flex-col space-y-2.5 text-xs font-sans font-light text-skincare-text/80">
              <button
                id="footer-shop-skincare"
                onClick={() => onNavigate("products-section")}
                className="text-left hover:text-skincare-gold transition-colors cursor-pointer"
              >
                Skincare
              </button>
              <button
                id="footer-shop-sunscreen"
                onClick={() => onNavigate("products-section")}
                className="text-left hover:text-skincare-gold transition-colors cursor-pointer"
              >
                Sunscreen
              </button>
              <button
                id="footer-shop-antiaging"
                onClick={() => onNavigate("products-section")}
                className="text-left hover:text-skincare-gold transition-colors cursor-pointer"
              >
                Anti-Aging
              </button>
            </div>
          </div>

          {/* About Column */}
          <div className="space-y-4">
            <h5 className="font-serif text-sm font-semibold uppercase tracking-wider text-skincare-text">
              ABOUT
            </h5>
            <div className="flex flex-col space-y-2.5 text-xs font-sans font-light text-skincare-text/80">
              <button
                id="footer-about-science"
                onClick={() => onNavigate("science-section")}
                className="text-left hover:text-skincare-gold transition-colors cursor-pointer"
              >
                Our Science
              </button>
              <button
                id="footer-about-sustainability"
                onClick={() => onNavigate("commitment-section")}
                className="text-left hover:text-skincare-gold transition-colors cursor-pointer"
              >
                Sustainability
              </button>
              <button
                id="footer-about-heritage"
                onClick={() => onNavigate("about-page")}
                className="text-left hover:text-skincare-gold transition-colors cursor-pointer"
              >
                About Us (Heritage)
              </button>
            </div>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h5 className="font-serif text-sm font-semibold uppercase tracking-wider text-skincare-text">
              LEGAL
            </h5>
            <div className="flex flex-col space-y-2.5 text-xs font-sans font-light text-skincare-text/80">
              <button id="footer-privacy" className="text-left hover:text-skincare-gold transition-colors cursor-pointer">
                Privacy Policy
              </button>
              <button id="footer-terms" className="text-left hover:text-skincare-gold transition-colors cursor-pointer">
                Terms of Service
              </button>
            </div>
          </div>

          {/* Follow Column */}
          <div className="space-y-4">
            <h5 className="font-serif text-sm font-semibold uppercase tracking-wider text-skincare-text">
              FOLLOW
            </h5>
            <div className="flex space-x-3.5 pt-1">
              <button
                id="social-instagram"
                className="h-7 w-7 rounded-full border border-[#EADBC8]/40 hover:border-skincare-gold flex items-center justify-center text-skincare-text hover:text-skincare-gold transition-all duration-300 cursor-pointer"
                aria-label="Instagram Page"
              >
                <Globe className="h-4.5 w-4.5" />
              </button>
              <button
                id="social-globe"
                className="h-7 w-7 rounded-full border border-[#EADBC8]/40 hover:border-skincare-gold flex items-center justify-center text-skincare-text hover:text-skincare-gold transition-all duration-300 cursor-pointer"
                aria-label="Corporate Site"
              >
                <Landmark className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Small Brand Stamp Logo centermost layout */}
        <div className="flex flex-col items-center justify-center space-y-4 pt-4 text-center">
          <div className="border border-skincare-gold/30 p-2.5 bg-[#FAF8F5]/30 inline-flex items-center justify-center rounded-sm">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-skincare-gold font-bold">
              ELIXIR SKINCARE
            </span>
          </div>
          
          <p className="text-[10px] font-sans font-light text-skincare-text/60 leading-relaxed max-w-md">
            Confidence in Every Reflection. Skin is the absolute mirror of your inner health and timeless beauty. Since 1983, engineered inside Tokyo Biological Labs.
          </p>

          <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase pt-6">
            © {currentYear} ELIXIR SKINCARE. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
}
