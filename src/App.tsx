/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Product, CartItem } from "./types";
import { PRODUCTS } from "./data";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import NewArrivals from "./components/NewArrivals";
import SeasonalSets from "./components/SeasonalSets";
import ScienceSection from "./components/ScienceSection";
import SkinConcierge from "./components/SkinConcierge";
import Commitment from "./components/Commitment";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import ProductCatalogPage from "./components/ProductCatalogPage";
import CartPage from "./components/CartPage";
import ProductDetailPage from "./components/ProductDetailPage";
import AboutUsPage from "./components/AboutUsPage";
import ContactUsPage from "./components/ContactUsPage";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ShoppingBag, Search, X, Check, ArrowRight } from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "products" | "cart" | "product-details" | "about" | "contact">("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const handleOpenProductDetail = (product: Product) => {
    setSelectedDetailProduct(product);
    setCurrentPage("product-details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === "products-section") {
      setCurrentPage("products");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (sectionId === "about-page") {
      setCurrentPage("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (sectionId === "contact-page") {
      setCurrentPage("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentPage("home");
    // Small timeout for DOM mounting if coming from products page, so scroll targets exist
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 120);
  };

  // Add Item to Shopping Cart
  const handleAddProductToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, quantity }];
      }
    });

    // Trigger toast alert
    setActiveToast(`${product.name} added to your Shopping Bag.`);
    setTimeout(() => {
      setActiveToast(null);
    }, 4500);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove single line item
  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Clear entire cart after successful completed checkout
  const handleClearCart = () => {
    setCart([]);
  };

  // Compute total items count
  const cart总量 = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products for search bar
  const searchedProducts = searchQuery
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.briefDescription.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans select-none antialiased bg-skincare-cream">
      
      {/* 1. Header Navigation */}
      <Header
        onOpenCart={() => {
          setCurrentPage("cart");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        cartCount={cart总量}
        onNavigate={handleScrollToSection}
        onSearchToggle={() => setSearchOpen(!searchOpen)}
      />

      {/* 2. Interactive Search Overlay Block */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#FAF8F5] border-b border-[#EADBC8]/40 border-t border-[#FAF8F5]/50 z-30 sticky top-16 shadow-xl py-6"
            id="search-overlay"
          >
            <div className="mx-auto max-w-4xl px-6">
              <div className="flex items-center justify-between border-b border-[#EADBC8]/50 pb-2.5">
                <div className="flex items-center space-x-3 flex-1">
                  <Search className="h-5 w-5 text-skincare-gold" />
                  <input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search premium treatments, formulas, or benefits..."
                    className="w-full bg-transparent outline-none text-xs md:text-sm text-skincare-text placeholder-skincare-text/35 font-sans"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      id="search-clear"
                      onClick={() => setSearchQuery("")}
                      className="p-1 rounded-full hover:bg-skincare-mist text-skincare-text/50 hover:text-skincare-text cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button
                  id="search-dismiss"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-xs font-mono tracking-widest text-[#8E7F70] hover:text-skincare-gold ml-4 cursor-pointer"
                >
                  DISMISS [ESC]
                </button>
              </div>

              {/* Preset Search Keyword Suggestive Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-[10px] font-mono tracking-widest text-[#8E7F70] mr-2">
                  SUGGESTIONS:
                </span>
                {["Serum", "Cream", "Essence", "Toner", "Retinol", "Collagen"].map((tag) => (
                  <button
                    id={`search-tag-${tag}`}
                    key={tag}
                    onClick={() => handleSearchTagClick(tag)}
                    className="bg-white border border-[#EADBC8]/25 hover:border-skincare-gold px-3 py-1.5 text-[10px] font-mono uppercase text-skincare-text hover:text-skincare-gold rounded-full transition-all cursor-pointer shadow-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Dynamic Live results display list */}
              {searchQuery && (
                <div className="mt-6 bg-white border border-[#EADBC8]/20 rounded-xs p-4 max-h-80 overflow-y-auto shadow-inner">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 block mb-3">
                    MATCHING VERIFIED FORMULAS ({searchedProducts.length})
                  </span>
                  
                  {searchedProducts.length > 0 ? (
                    <div className="space-y-4">
                      {searchedProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            handleOpenProductDetail(p);
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-4 hover:bg-skincare-cream/40 p-2 border-b last:border-b-0 border-[#FAF8F5]/80 rounded-xs cursor-pointer group"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="h-12 w-10 object-cover rounded-xs border"
                          />
                          <div>
                            <span className="text-[8px] font-mono tracking-widest text-skincare-gold uppercase">
                              {p.category}
                            </span>
                            <h4 className="font-serif text-xs font-medium text-skincare-text group-hover:text-skincare-gold transition-colors">
                              {p.name}
                            </h4>
                            <p className="text-[10px] font-sans font-light text-skincare-text/60 truncate max-w-lg">
                              {p.briefDescription}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-skincare-text/50 italic py-4">
                      No formula found matching "{searchQuery}". Try searching for Collagen, Retinol, or Cream.
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentPage === "home" ? (
          <motion.div
            key="home-page"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.45 }}
          >
            {/* 3. Hero Section (Introduction and Philosophy Link) */}
            <Hero onShopClick={() => handleScrollToSection("products-section")} />

            {/* 4. Philosophy Description Column (Our Story) */}
            <Philosophy />

            {/* 5. New Arrivals Curated Catalog & Grid */}
            <NewArrivals
              onAddProductToCart={handleAddProductToCart}
              onOpenProductDetail={handleOpenProductDetail}
              onCategoryFilterClick={() => handleScrollToSection("products-section")}
            />

            {/* 6. Exclusive Seasonal sets promotional offer segment */}
            <SeasonalSets onDiscoverClick={() => handleScrollToSection("quiz-section")} />

            {/* 7. Advanced Collagen interactive Science breakdown */}
            <ScienceSection />

            {/* 8. Skin Concierge Diagnostic Stepper Assessment */}
            <SkinConcierge
              onAddProductToCart={handleAddProductToCart}
              onOpenProductDetail={handleOpenProductDetail}
            />

            {/* 9. Video Player storyline & commitment highlights */}
            <Commitment />

            {/* 10. Elegant Centralized Quote Board Section */}
            <section className="bg-skincare-mist py-24 border-t border-[#EADBC8]/20 flex justify-center items-center">
              <div className="mx-auto max-w-4xl px-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white border border-[#EADBC8]/30 max-w-2xl mx-auto rounded-sm p-10 md:p-14 shadow-md space-y-6 relative"
                >
                  {/* Top gold sparkle marker */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-skincare-cream border border-[#EADBC8]/40 text-skincare-gold mx-auto mb-2 shadow-xs">
                    <Sparkles className="h-4 w-4" />
                  </div>

                  <h3 className="font-serif text-2xl font-light text-skincare-text tracking-wide leading-snug">
                    Confidence in Every Reflection
                  </h3>
                  
                  <p className="text-sm font-serif italic text-skincare-text/80 leading-relaxed font-light max-w-md mx-auto">
                    "Your skin is the mirror of your inner health and timeless beauty. Embrace the natural luminous reflection of Tsuyadama."
                  </p>

                  <div className="pt-4">
                    <button
                      id="quote-cta-story"
                      onClick={() => handleScrollToSection("philosophy-section")}
                      className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-skincare-gold hover:text-skincare-text transition-colors duration-300 font-semibold uppercase underline underline-offset-6 cursor-pointer"
                    >
                      OUR STORY
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  
                </motion.div>
              </div>
            </section>
          </motion.div>
        ) : currentPage === "products" ? (
          <motion.div
            key="products-catalog-page"
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.45 }}
          >
            <ProductCatalogPage
              onBackToHome={() => {
                setCurrentPage("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onAddProductToCart={handleAddProductToCart}
              onOpenProductDetail={handleOpenProductDetail}
            />
          </motion.div>
        ) : currentPage === "product-details" && selectedDetailProduct ? (
          <motion.div
            key="product-detail-page"
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.45 }}
          >
            <ProductDetailPage
              product={selectedDetailProduct}
              onAddToCart={handleAddProductToCart}
              onNavigateTo={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onOpenProductDetail={handleOpenProductDetail}
            />
          </motion.div>
        ) : currentPage === "about" ? (
          <motion.div
            key="about-page"
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.45 }}
          >
            <AboutUsPage
              onNavigateTo={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </motion.div>
        ) : currentPage === "contact" ? (
          <motion.div
            key="contact-page"
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.45 }}
          >
            <ContactUsPage
              onNavigateTo={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="cart-full-page"
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.45 }}
          >
            <CartPage
              cartItems={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onNavigateTo={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onOpenProductDetail={handleOpenProductDetail}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 11. International Footer block */}
      <Footer onNavigate={handleScrollToSection} />

      {/* 12. Elegant slide out Shopping Bag panel */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 13. High-Fidelity Product details modal overlay */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddProductToCart={handleAddProductToCart}
      />

      {/* 14. Sliding Toast Notification system */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-skincare-text text-white border border-[#2C2620] px-5 py-4 shadow-2xl rounded-sm flex items-start gap-3.5"
            id="toast-notification"
          >
            <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5 text-white">
              <Check className="h-3.5 w-3.5" />
            </div>
            
            <div className="flex-1 space-y-1">
              <p className="text-[11px] font-mono tracking-widest text-skincare-gold uppercase leading-none font-bold">
                GLOW ESSENTIAL ADDED
              </p>
              <p className="text-xs font-sans font-light leading-relaxed text-slate-200">
                {activeToast}
              </p>
              <button
                id="toast-open-cart-btn"
                onClick={() => {
                  setCurrentPage("cart");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setActiveToast(null);
                }}
                className="text-[10px] font-mono text-skincare-gold hover:text-white uppercase tracking-widest pt-1.5 underline underline-offset-4 cursor-pointer flex items-center gap-1 font-semibold"
              >
                Open Shopping Bag
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <button
              id="toast-dismiss-btn"
              onClick={() => setActiveToast(null)}
              className="p-0.5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
