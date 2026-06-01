/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onOpenCart: () => void;
  cartCount: number;
  onNavigate: (sectionId: string) => void;
  onSearchToggle: () => void;
}

export default function Header({
  onOpenCart,
  cartCount,
  onNavigate,
  onSearchToggle
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Shop All", target: "products-section" },
    { label: "Rituals", target: "quiz-section" },
    { label: "New Arrivals", target: "products-section" },
    { label: "Science", target: "science-section" },
    { label: "About", target: "about-page" },
    { label: "Contact", target: "contact-page" }
  ];

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-skincare-text/10 bg-skincare-cream/90 backdrop-blur-md transition-colors duration-300 shadow-xs">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Menu Icon (Mobile) */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(true)}
            className="p-1 text-skincare-text cursor-pointer md:hidden hover:text-skincare-gold transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <button
            id="logo-button"
            onClick={() => handleLinkClick("hero-section")}
            className="flex items-center space-x-2 text-xl font-serif tracking-[0.2em] font-medium leading-none text-skincare-text hover:text-skincare-gold transition-colors duration-300 cursor-pointer"
          >
            <span className="border border-skincare-gold py-1 px-3 text-xs tracking-[0.3em] uppercase bg-white/20 mr-1">
              ELIXIR
            </span>
          </button>

          {/* Center Navigation Links */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link, idx) => (
              <button
                id={`nav-link-${idx}`}
                key={link.label}
                onClick={() => handleLinkClick(link.target)}
                className="text-xs font-sans tracking-[0.15em] uppercase text-skincare-text/80 hover:text-skincare-gold transition-all duration-300 relative py-1 cursor-pointer group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-skincare-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              id="header-search"
              onClick={onSearchToggle}
              className="p-1 cursor-pointer text-skincare-text hover:text-skincare-gold transition-all duration-300"
              aria-label="Search items"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            <button
              id="header-account"
              className="hidden p-1 cursor-pointer text-skincare-text hover:text-skincare-gold transition-all duration-300 sm:block"
              aria-label="User Account"
            >
              <User className="h-4.5 w-4.5" />
            </button>

            <button
              id="header-bag"
              onClick={onOpenCart}
              className="relative p-1.5 cursor-pointer text-skincare-text hover:text-skincare-gold border border-transparent hover:border-skincare-gold/20 rounded-full transition-all duration-300 bg-white/40 shadow-sm"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key={cartCount}
                  className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-skincare-gold text-[10px] font-medium text-white shadow-sm font-mono"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden" id="mobile-drawer-container">
            {/* Dark Mask click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Menu container */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative z-50 flex w-4/5 max-w-sm flex-col justify-between bg-skincare-cream p-6 shadow-2xl border-r border-[#FAF8F5]/20 h-full"
            >
              <div>
                <div className="flex items-center justify-between border-b border-skincare-clay pb-4 mb-8">
                  <span className="font-serif text-lg tracking-[0.2em] uppercase font-semibold text-skincare-text">
                    ELIXIR
                  </span>
                  <button
                    id="mobile-drawer-close"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full hover:bg-skincare-clay/40 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-col space-y-6">
                  {navLinks.map((link, i) => (
                    <button
                      id={`mobile-nav-link-${i}`}
                      key={link.label}
                      onClick={() => handleLinkClick(link.target)}
                      className="text-left py-1.5 text-sm font-sans tracking-[0.1em] uppercase hover:text-skincare-gold border-b border-transparent hover:border-skincare-gold/20 transition-all duration-300"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-skincare-clay pt-6 mt-6">
                <p className="text-[11px] uppercase tracking-wider text-skincare-text/50 font-mono">
                  Sustaining Radiance Since 1983
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-skincare-text/70 font-mono">0120-770-933</span>
                  <span className="text-xs text-skincare-text/70 font-mono">support@elixir.jp</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
