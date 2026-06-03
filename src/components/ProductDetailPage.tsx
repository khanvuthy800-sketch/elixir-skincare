/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { Product, Review } from "../types";
import { PRODUCTS, REVIEWS } from "../data";
import { 
  ArrowLeft, 
  Star, 
  Shuffle, 
  MapPin, 
  Activity, 
  Plus, 
  Minus, 
  Check, 
  ShoppingBag, 
  Sparkles, 
  MessageSquare,
  Bookmark, 
  FileText, 
  Eye, 
  ChevronRight,
  ChevronLeft,
  X,
  Maximize2,
  ThumbsUp,
  User,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigateTo: (page: "home" | "products" | "cart") => void;
  onOpenProductDetail: (product: Product) => void;
}

type TabType = "diagnosis" | "ritual" | "science";

export default function ProductDetailPage({
  product,
  onAddToCart,
  onNavigateTo,
  onOpenProductDetail
}: ProductDetailPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("diagnosis");
  const [quantity, setQuantity] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeReviewTab, setActiveReviewTab] = useState<"all" | "high" | "low">("all");
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Local review state initialization based on database
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  
  // Custom reviews submission form
  const [showForm, setShowForm] = useState(false);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewSkinType, setNewReviewSkinType] = useState("Dry, Loss of Firmness");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Curated premium gallery images corresponding to clinical Tokyo laboratories
  const galleryImages = useMemo(() => {
    const backups: Record<string, string[]> = {
      "day-care-revolution": [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop", // Main product SPF
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1000&auto=format&fit=crop", // Cream lotion texture closeup
        "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000&auto=format&fit=crop", // Luxury setting arrangement
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop"  // Ritual skin model
      ],
      "the-serum": [
        "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=1000&auto=format&fit=crop", // Main serum bottle
        "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1000&auto=format&fit=crop", // Transparent fluid dropper glow
        "https://images.unsplash.com/photo-1554372562-ff5184355a73?q=80&w=1000&auto=format&fit=crop", // Scientific molecular testing
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop"  // Lab vials setting
      ],
      "total-v-cream": [
        "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1000&auto=format&fit=crop", // Main Jar
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1000&auto=format&fit=crop", // Whipped silk cream swatch
        "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1000&auto=format&fit=crop", // Botanical extraction
        "https://images.unsplash.com/photo-1601049541549-0639918731d1?q=80&w=1000&auto=format&fit=crop"  // Soft light golden aesthetic
      ],
      "moisture-balancing-toner": [
        "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop", // Main toner
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1000&auto=format&fit=crop", // Lotion swatch
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop", // Clinical glass bottles
        "https://images.unsplash.com/photo-1508759073847-9ca702cec7d2?q=80&w=1000&auto=format&fit=crop"  // Purified laboratory water splash
      ],
      "pearl-radiance-mask": [
        "https://images.unsplash.com/photo-1590156546746-c23702224744?q=80&w=1000&auto=format&fit=crop", // Main mask packaging
        "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=1000&auto=format&fit=crop", // Hydration paste texture
        "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000&auto=format&fit=crop", // Marine luxury pearl layout
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop"  // Collagen research vials
      ]
    };

    return backups[product.id] || [
      product.image,
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop"
    ];
  }, [product]);

  // Sync reviews and active photo when the product changes
  useEffect(() => {
    const defaultReviews = REVIEWS[product.id] || [];
    setLocalReviews(defaultReviews);
    setQuantity(1);
    setActiveTab("diagnosis");
    setShowForm(false);
    setSubmitSuccess(false);
    setNewReviewName("");
    setNewReviewRating(5);
    setNewReviewComment("");
    setActiveImageIndex(0);
  }, [product]);

  // Keyboard navigation support for fullscreen lightbox modal
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, galleryImages.length]);

  // Adjust buy quantity
  const handleQtyAdjust = (type: "up" | "down") => {
    if (type === "up") {
      setQuantity(q => q + 1);
    } else if (type === "down" && quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  // Submit new review callback
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const formattedReview: Review = {
      id: `custom-rev-${Date.now()}`,
      userName: newReviewName,
      rating: newReviewRating,
      date: "Just now",
      comment: newReviewComment,
      skinType: newReviewSkinType
    };

    setLocalReviews(prev => [formattedReview, ...prev]);
    setSubmitSuccess(true);
    setNewReviewName("");
    setNewReviewRating(5);
    setNewReviewComment("");

    // Automatically hide form state after success timeout banner
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowForm(false);
    }, 3000);
  };

  // Calculations for average dynamic review rating
  const finalRatingMetrics = useMemo(() => {
    if (localReviews.length === 0) {
      return { average: product.rating, count: product.reviewsCount };
    }
    const sum = localReviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      average: parseFloat((sum / localReviews.length).toFixed(1)),
      count: localReviews.length
    };
  }, [localReviews, product]);

  // Filter reviews
  const filteredReviews = useMemo(() => {
    if (activeReviewTab === "high") {
      return localReviews.filter(r => r.rating >= 4);
    }
    if (activeReviewTab === "low") {
      return localReviews.filter(r => r.rating <= 3);
    }
    return localReviews;
  }, [localReviews, activeReviewTab]);

  // Related products from the same brand series branch or category
  const recommendationList = useMemo(() => {
    return PRODUCTS.filter(p => p.id !== product.id && (p.branch === product.branch || p.category === product.category)).slice(0, 3);
  }, [product]);

  return (
    <div id="product-detail-page-container" className="bg-[#FAF8F5] min-h-screen pt-24 pb-24 font-sans text-skincare-text">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Navigation Breadcrumbs */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <button
            id="pdp-back-btn"
            onClick={() => onNavigateTo("products")}
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#8E7F70] hover:text-skincare-gold transition-colors duration-300 uppercase cursor-pointer py-1"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            BACK TO SCIENTIFIC DIRECTORY
          </button>

          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#8E7F70]/70 uppercase">
            <span className="cursor-pointer hover:text-skincare-gold" onClick={() => onNavigateTo("home")}>ELIXIR HOME</span>
            <span>/</span>
            <span className="cursor-pointer hover:text-skincare-gold" onClick={() => onNavigateTo("products")}>PRODUCTS</span>
            <span>/</span>
            <span className="text-skincare-gold font-semibold">{product.name}</span>
          </div>
        </div>

        {/* Outer Split Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* LEFT COLUMN: Luxurious Product Image Canvas & Physical Locations */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="aspect-square md:aspect-4/5 w-full bg-skincare-mist border border-skincare-text/10 rounded-2xl overflow-hidden relative shadow-sm group"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImageIndex}
                  src={galleryImages[activeImageIndex]} 
                  alt={`${product.name} aspect ${activeImageIndex}`} 
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full object-cover"
                />
              </AnimatePresence>
              
              {/* Overlay hover effect - Explore luster details */}
              <div 
                className="absolute inset-0 bg-skincare-text/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setIsLightboxOpen(true);
                  setLightboxIndex(activeImageIndex);
                }}
              >
                <div className="bg-white/95 text-skincare-text text-[10px] font-mono tracking-widest uppercase px-4.5 py-2.5 rounded-full shadow-lg flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 font-bold">
                  <Maximize2 className="h-3.5 w-3.5 text-skincare-gold" />
                  EXPLORE TSUYADAMA REFLECTION
                </div>
              </div>

              {/* Product branding branch overlay badge */}
              {product.branch && (
                <div className="absolute top-5 left-5 z-10 bg-skincare-text/90 backdrop-blur-md text-white border border-[#3E342B]/40 text-[9px] font-mono tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md select-none">
                  {product.branch}
                </div>
              )}

              {/* Status active stamp tags */}
              {product.tag && (
                <div className="absolute bottom-5 right-5 z-10 bg-skincare-gold text-white text-[9px] font-mono tracking-wider uppercase px-3 py-1.2 rounded-md shadow-md flex items-center gap-1.5 font-bold select-none">
                  <Sparkles className="h-3 w-3" />
                  {product.tag}
                </div>
              )}
            </motion.div>

            {/* Micro thumbnail slider track index */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((imgUrl, idx) => {
                const isSelected = activeImageIndex === idx;
                const sectionNames = ["Package", "Texture", "Science", "Ritual"];
                return (
                  <button
                    key={idx}
                    id={`thumb-btn-${idx}`}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 relative transition-all duration-300 group/thumb cursor-pointer focus:outline-none ${
                      isSelected 
                        ? "border-skincare-gold shadow-sm scale-102" 
                        : "border-skincare-text/10 hover:border-skincare-gold/50"
                    }`}
                    aria-label={`View ${sectionNames[idx]} image`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                    />
                    <div className="absolute bottom-1 right-1 text-[8px] font-mono text-white bg-black/55 px-1.2 py-0.2 rounded leading-none select-none">
                      0{idx + 1}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Scientific skin-membrane compliance guarantee signature */}
            <div className="bg-white border border-skincare-text/10 p-5 rounded-2xl shadow-3xs space-y-2.5">
              <div className="flex items-center gap-2">
                <Activity className="h-4.5 w-4.5 text-skincare-gold" />
                <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-skincare-text">
                  Dermal Integrity & Formulation Certificate
                </h4>
              </div>
              <p className="text-xs text-skincare-text/75 font-sans leading-relaxed">
                Passed triple phase allergy testing. Our laboratories extract rare <strong>Pearl Autolysate</strong> to rebuild the skin's natural elastic framework. This treatment triggers immediate cellular bounce without clogging active pores.
              </p>
            </div>

            {/* Interactive Physical Store Boutique Location Check */}
            <div className="bg-white border border-skincare-text/10 p-6 rounded-2xl shadow-3xs space-y-4">
              <div className="flex items-center justify-between border-b border-skincare-text/5 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4.5 w-4.5 text-skincare-gold" />
                  <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-skincare-text"> Bestseller Counter Stock Availability </h4>
                </div>
                <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase font-semibold">In Stock Counter</span>
              </div>
              <div className="space-y-3">
                <p className="text-xs text-skincare-text/75 leading-relaxed">
                  You can purchase this formulation in person. Present this product ledger card to skincare chemists at these flagship depots:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {(product.stores || ["Tokyo Flagship (Ginza)", "Kyoto Gion Boutique", "Osaka Landmark Hub"]).map((storeStr, idx) => (
                    <div key={idx} className="bg-[#FAF8F5] border border-skincare-text/5 p-3 rounded-xl flex flex-col justify-between">
                      <span className="text-xs font-medium text-skincare-text font-serif">{storeStr}</span>
                      <span className="text-[10px] font-mono text-skincare-bronze mt-1">Available Today • Reserve via Call</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Luxury Checkout Metrics Panel */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Core Header Elements */}
            <div className="space-y-3.5 border-b border-skincare-text/10 pb-6">
              <span className="text-[10px] font-mono tracking-widest text-skincare-gold uppercase font-bold block">
                {product.category} Formulation Group
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-skincare-text leading-tight">
                {product.name}
              </h1>

              {/* Dynamic Interactive Stars Summary */}
              <div className="flex items-center gap-3.5 select-none">
                <div className="flex text-skincare-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4.5 w-4.5 ${
                        i < Math.round(finalRatingMetrics.average) ? "fill-current" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-skincare-text/80 font-mono">
                  <strong>{finalRatingMetrics.average}</strong> ({finalRatingMetrics.count} validated reviews)
                </span>
                <span className="text-skincare-text/25 font-light">|</span>
                <a href="#pd-reviews-system" className="text-[11px] font-mono text-[#8E7F70] hover:text-skincare-gold transition-colors underline underline-offset-4">
                  READ DETAILED OPINIONS
                </a>
              </div>
            </div>

            {/* Price tag & description */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-mono font-medium tracking-tight text-skincare-text">
                  {new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(product.price)}
                </span>
                <span className="text-xs font-mono text-skincare-bronze/85">
                  ¥ Tax Included counter price (10% GST)
                </span>
              </div>
              <p className="text-xs font-sans text-skincare-text/80 leading-relaxed text-balance">
                {product.description || "Our high-precision daytime emulsion utilizes advanced Shiseido skin science research to defend against environmental pollutants while sealing moisture. Triggers the iconic 'Tsuyadama' pearl layer luster effect instantly."}
              </p>
            </div>

            {/* Specific key formula claims in list format */}
            <div className="space-y-3 pt-2 bg-white border border-skincare-text/10 p-5 rounded-2xl">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-skincare-gold font-bold">Clinically Proven Biological Targets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {(product.skinBenefits || ["Stimulates type VII moisture barrier", "Provides 24H resilient luster reflection", "Hypoallergenic dermal compliance testing", "Rebuilds bouncy lipid matrix layer"]).map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-skincare-text/85">
                    <div className="h-4.5 w-4.5 rounded-full bg-skincare-cream border border-skincare-gold/35 flex items-center justify-center shrink-0 text-skincare-gold text-[9px] font-bold mt-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector, Bookmarking, and Add-to-bag Interactive controls */}
            <div className="pt-4 border-t border-b border-skincare-text/5 py-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                
                {/* Quantity widget */}
                <div className="flex items-center justify-between w-full sm:w-auto bg-white border border-skincare-text/25 p-2 rounded-full px-5">
                  <span className="text-[10px] font-mono text-skincare-bronze font-bold mr-4 uppercase">QTY:</span>
                  <div className="flex items-center gap-3">
                    <button
                      id="pdp-qty-decrease"
                      onClick={() => handleQtyAdjust("down")}
                      className="p-1 hover:bg-[#FAF8F5] rounded-full cursor-pointer text-skincare-text transition-colors"
                      title="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-mono font-bold text-skincare-text select-none">
                      {quantity}
                    </span>
                    <button
                      id="pdp-qty-increase"
                      onClick={() => handleQtyAdjust("up")}
                      className="p-1 hover:bg-[#FAF8F5] rounded-full cursor-pointer text-skincare-text transition-colors"
                      title="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Main Action Add to Bag button */}
                <button
                  id="pdp-add-to-bag-btn"
                  onClick={() => onAddToCart(product, quantity)}
                  className="w-full sm:flex-1 bg-skincare-text hover:bg-skincare-gold text-white font-sans text-xs tracking-[0.2em] font-semibold uppercase py-4 rounded-full cursor-pointer transition-all hover:shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  ADD TO SHOPPING BAG • {new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(product.price * quantity)}
                </button>

                {/* Bookmark Toggle Icon */}
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-3.5 border rounded-full transition-all cursor-pointer ${
                    isBookmarked 
                      ? "bg-skincare-cream border-skincare-gold text-skincare-gold" 
                      : "bg-white border-skincare-text/25 text-skincare-text/75 hover:border-skincare-text"
                  }`}
                  aria-label="Bookmark product"
                  title={isBookmarked ? "Saved to regimen" : "Save formulation"}
                >
                  <Bookmark className={`h-4.5 w-4.5 ${isBookmarked ? "fill-current" : ""}`} />
                </button>

              </div>

              {/* Secure payment logo and assurances strip */}
              <div className="flex flex-wrap items-center justify-start gap-4 text-[10px] font-mono text-skincare-text/65 select-none pt-2.5">
                <span className="flex items-center gap-1"><Check className="h-3 w-3 text-skincare-gold" /> Original Shiseido Label</span>
                <span className="text-skincare-text/20">•</span>
                <span className="flex items-center gap-1"><Check className="h-3 w-3 text-skincare-gold" /> Tokyo Lab Fresh Batches</span>
                <span className="text-skincare-text/20">•</span>
                <span className="flex items-center gap-1"><Check className="h-3 w-3 text-skincare-gold" /> Complementary over 10,000 JPY</span>
              </div>
            </div>

            {/* Scientific Diagnostics & Usage instructions TABS system */}
            <div className="bg-white border border-skincare-text/10 rounded-2xl overflow-hidden">
              <div className="flex border-b border-skincare-text/10 bg-skincare-cream/45 text-[10px] font-mono uppercase tracking-widest text-[#8E7F70]">
                {(["diagnosis", "ritual", "science"] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    id={`pdp-tab-trigger-${tab}`}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 text-center py-4 border-r border-[#EADBC8]/20 last:border-0 cursor-pointer font-bold transition-all ${
                      activeTab === tab 
                        ? "bg-white text-skincare-text border-b-2 border-b-skincare-gold" 
                        : "text-skincare-text/60 hover:bg-[#FAF8F5] hover:text-skincare-text"
                    }`}
                  >
                    {tab === "diagnosis" ? "diagnostics chart" : tab === "ritual" ? "clinical ritual" : "collagen research"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "diagnosis" && (
                    <motion.div
                      key="tab-diagnosis"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="font-serif text-sm font-medium">Formulation Target Parameters</h4>
                      <p className="text-xs text-skincare-text/75 leading-relaxed">
                        This product is optimized to target elasticity breakdowns at a microscopic level. Formulated primarily for dehydrated skins losing cellular bounce due to metabolic oxidation or environmental moisture exhaustion.
                      </p>
                      
                      <div className="space-y-2 pt-2">
                        <span className="block text-[10px] font-mono uppercase tracking-widest text-skincare-bronze font-bold">Key Complex Formula Elements:</span>
                        <div className="flex flex-wrap gap-2">
                          {(product.ingredients || ["Water-Soluble Collagen", "Pearl Autolysate Glycosides", "Yoshino Cherry Leaf", "Inositol Dermal-S"]).map((ingredient, i) => (
                            <span 
                              key={i} 
                              className="text-xs bg-[#FAF8F5] border border-skincare-text/10 text-skincare-text px-3 py-1.5 rounded-lg font-mono relative hover:border-skincare-gold transition-colors inline-block cursor-help hover:shadow-2xs"
                              title={`${ingredient}: Clinical-grade skincare ingredient configured for optimum cellular density.`}
                            >
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "ritual" && (
                    <motion.div
                      key="tab-ritual"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="font-serif text-sm font-medium">Daily Application Chronology</h4>
                      <p className="text-xs text-skincare-text/75 leading-relaxed">
                        For maximum cell absorption and activation of the "Tsuyadama" luster layer, apply following this chronological order sequence:
                      </p>

                      <div className="relative border-l border-skincare-gold/20 pl-4.5 space-y-5.5 my-2">
                        {(product.ritual || [
                          "After cleansing, dispense a cherry-sized droplet onto a sterile organic cotton pad.",
                          "Gently sweep in light outward, upward directions, conforming with facial muscle maps.",
                          "Perform lightweight press patting across temples and cheeks for 15 seconds to sync thermal heat absorption."
                        ]).map((step, idx) => (
                          <div key={idx} className="relative">
                            {/* Bullet step indicator indicator dots */}
                            <div className="absolute -left-[24.5px] top-0.5 h-3 w-3 rounded-full bg-skincare-gold border-2 border-white shadow-xs" />
                            <span className="block text-[9px] font-mono text-skincare-gold uppercase font-bold tracking-widest leading-none mb-1">Step 0{idx + 1}</span>
                            <p className="text-xs text-skincare-text/80 font-sans leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "science" && (
                    <motion.div
                      key="tab-science"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="font-serif text-sm font-medium">Biological Collagen Matrix Collagen Science</h4>
                      <p className="text-xs text-skincare-text/75 leading-relaxed">
                        Shiseido's laboratories in Tokyo have pioneered <strong>Type VII Dermal anchoring technology</strong>. Healthy fibers pull the epidermis flush against deep facial fat cushions, preserving structure. This formula addresses baseline exhaustion by supplying direct plant stem cell peptides.
                      </p>
                      
                      <div className="p-3.5 bg-skincare-cream border border-[#EADBC8]/35 rounded-xl text-[11px] text-skincare-bronze flex items-start gap-2.5 leading-relaxed">
                        <AlertCircle className="h-4.5 w-4.5 shrink-0 text-skincare-gold mt-0.5" />
                        <div>
                          <strong>Tsuyadama Luster Effect:</strong> Clinical telemetry tests performed across 42 patients showed a 14% elevation in light absorption coefficients within 10 days of twice-daily applications of our formulation.
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>

        {/* FULL INTERACTIVE CUSTOMER REVIEWS BOARD AND FORM */}
        <section id="pd-reviews-system" className="border-t border-skincare-text/10 pt-16 mb-16 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-skincare-text/5 pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#8E7F70] uppercase font-bold block">Verified Opinions Journal</span>
              <h2 className="font-serif text-2xl md:text-3xl font-light">Skin Diagnostics Testimonials</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white border border-skincare-text/10 p-1.5 rounded-full shadow-3xs gap-1">
                <button
                  onClick={() => setActiveReviewTab("all")}
                  className={`text-[9px] font-mono tracking-wider px-3.5 py-1.5 rounded-full transition-all uppercase cursor-pointer ${
                    activeReviewTab === "all" ? "bg-skincare-text text-white font-bold" : "text-[#8E7F70] hover:text-skincare-text"
                  }`}
                >
                  All Reviews
                </button>
                <button
                  onClick={() => setActiveReviewTab("high")}
                  className={`text-[9px] font-mono tracking-wider px-3.5 py-1.5 rounded-full transition-all uppercase cursor-pointer ${
                    activeReviewTab === "high" ? "bg-skincare-text text-white font-bold" : "text-[#8E7F70] hover:text-skincare-text"
                  }`}
                >
                  High Grades (4-5★)
                </button>
                <button
                  onClick={() => setActiveReviewTab("low")}
                  className={`text-[9px] font-mono tracking-wider px-3.5 py-1.5 rounded-full transition-all uppercase cursor-pointer ${
                    activeReviewTab === "low" ? "bg-skincare-text text-white font-bold" : "text-[#8E7F70] hover:text-skincare-text"
                  }`}
                >
                  Constructive (1-3★)
                </button>
              </div>

              <button
                id="pdp-write-review-toggle"
                onClick={() => setShowForm(!showForm)}
                className="bg-skincare-gold hover:bg-skincare-text text-white text-[10px] font-mono tracking-widest uppercase px-5 py-3.5 rounded-full transition-all cursor-pointer shadow-3xs flex items-center gap-1.5 font-bold"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                WRITE TESTIMONIAL
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Box: Ratings Summary Dashboard */}
            <div className="lg:col-span-4 bg-white border border-skincare-text/10 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="text-center space-y-2">
                <p className="text-[10px] font-mono tracking-widest text-skincare-bronze uppercase">Diagnostic Score Index</p>
                <h3 className="font-mono text-5xl font-semibold tracking-tight text-skincare-text">{finalRatingMetrics.average}</h3>
                <div className="flex text-skincare-gold justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(finalRatingMetrics.average) ? "fill-current" : "text-gray-100"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-skincare-text/60 font-sans mt-1">Based on {finalRatingMetrics.count} authenticated purchases.</p>
              </div>

              {/* Progress Bar Grid metrics breakdown */}
              <div className="space-y-3.5 pt-4 border-t border-skincare-text/5 text-xs text-skincare-text/75">
                {[
                  { stars: 5, pct: 75, count: Math.ceil(product.reviewsCount * 0.75) },
                  { stars: 4, pct: 15, count: Math.ceil(product.reviewsCount * 0.15) },
                  { stars: 3, pct: 8, count: Math.ceil(product.reviewsCount * 0.08) },
                  { stars: 2, pct: 2, count: Math.ceil(product.reviewsCount * 0.02) },
                  { stars: 1, pct: 0, count: 0 },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-8 text-right font-mono text-[11px] font-bold">{row.stars}★</span>
                    <div className="flex-1 h-2 bg-[#FAF8F5] border border-skincare-text/5 rounded-full overflow-hidden">
                      <div className="h-full bg-skincare-gold rounded-full" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="w-8 text-left font-mono text-[10px] text-skincare-text/55">({row.count})</span>
                  </div>
                ))}
              </div>

              <div className="bg-skincare-cream/50 p-4 border border-[#EADBC8]/40 rounded-xl text-[11px] text-skincare-bronze leading-relaxed">
                <strong>Real Skin Authenticity:</strong> Every reviewer's skin credentials and purchase timestamp is filtered via Ginza's client ledger matching logs.
              </div>
            </div>

            {/* Right side Box: Reviews List & Dynamic Inputs Form */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Form container code block */}
              <AnimatePresence>
                {showForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="overflow-hidden mb-6"
                  >
                    <form onSubmit={handleReviewSubmit} className="bg-white border-2 border-skincare-gold/45 p-6 rounded-2xl shadow-md space-y-4">
                      <div className="border-b border-skincare-text/10 pb-3 flex items-center justify-between">
                        <h4 className="font-serif text-base font-light text-skincare-text">Complete Your Skincare Testimonial Form</h4>
                        <button 
                          type="button" 
                          onClick={() => setShowForm(false)} 
                          className="text-stone-400 hover:text-skincare-text text-xs font-mono uppercase underline underline-offset-4 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      {submitSuccess ? (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 p-5 rounded-xl text-center text-xs font-sans space-y-2">
                          <Check className="h-5 w-5 mx-auto text-emerald-500" />
                          <p className="font-bold">Testimonial Record Saved!</p>
                          <p className="text-emerald-800">Your dermal telemetry opinion log has been successfully published inside this scientific ledger.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Your Identifier / Name *</label>
                              <input 
                                type="text"
                                required
                                value={newReviewName}
                                onChange={(e) => setNewReviewName(e.target.value)}
                                className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-4.5 py-3.5 text-xs outline-none"
                                placeholder="Airi S."
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Your Skin Profile / Concerns *</label>
                              <select 
                                value={newReviewSkinType}
                                onChange={(e) => setNewReviewSkinType(e.target.value)}
                                className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-4 py-3 text-xs outline-none"
                              >
                                <option>Dehydrated, Sensitive Membrane</option>
                                <option>Dry, Loss of Firmness</option>
                                <option>Combination, Uneven Texture</option>
                                <option>Oily, Active Pore Boundaries</option>
                                <option>Normal, Seeking Glow Prevention</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Dermal Satisfaction Grade *</label>
                            <div className="flex items-center gap-2 select-none pt-1">
                              {[1, 2, 3, 4, 5].map((g) => (
                                <button
                                  key={g}
                                  type="button"
                                  onClick={() => setNewReviewRating(g)}
                                  className="p-1 cursor-pointer hover:scale-108 transition-all"
                                  title={`Rate ${g} stars`}
                                >
                                  <Star className={`h-6 w-6 ${g <= newReviewRating ? "text-skincare-gold fill-current" : "text-gray-200"}`} />
                                </button>
                              ))}
                              <span className="text-xs font-mono font-bold text-skincare-gold ml-2 uppercase">({newReviewRating} out of 5 stars)</span>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Your Written Experiential Statement *</label>
                            <textarea 
                              required
                              rows={3}
                              value={newReviewComment}
                              onChange={(e) => setNewReviewComment(e.target.value)}
                              className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-2xl px-4.5 py-3.5 text-xs outline-none"
                              placeholder="Describe your skin membrane feel, texture absorption parameters, and results after 7 days..."
                            />
                          </div>

                          <button
                            id="submit-custom-review"
                            type="submit"
                            className="bg-skincare-text hover:bg-skincare-gold text-white font-sans text-xs tracking-[0.2em] font-semibold uppercase px-8 py-3.5 rounded-full cursor-pointer transition-all w-full md:w-auto shadow-sm"
                          >
                            PUBLISH TESTIMONIAL LEDGER
                          </button>
                        </div>
                      )}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actual Reviews Content rows rendering */}
              <div className="space-y-4" id="pd-reviews-list-rows">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((rev) => (
                    <div 
                      key={rev.id} 
                      className="bg-white border border-skincare-text/10 p-6 rounded-2xl space-y-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-skincare-cream border border-[#EADBC8]/40 text-skincare-gold flex items-center justify-center text-xs font-serif shrink-0">
                            {rev.userName.charAt(0)}
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-xs font-serif font-medium block text-skincare-text">{rev.userName}</span>
                            <span className="text-[10px] font-mono text-skincare-bronze/70 uppercase block">Skin profile: <strong className="text-skincare-text font-serif">{rev.skinType}</strong></span>
                          </div>
                        </div>

                        <div className="space-y-1 text-right">
                          <div className="flex text-skincare-gold text-right justify-end">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < rev.rating ? "fill-current" : ""}`}
                              />
                            ))}
                          </div>
                          <span className="text-[9px] font-mono text-stone-400 block">{rev.date}</span>
                        </div>
                      </div>

                      <p className="text-xs text-skincare-text/80 font-sans leading-relaxed text-balance">
                        "{rev.comment}"
                      </p>

                      <div className="flex items-center gap-3 text-[10px] font-mono text-stone-400 select-none border-t border-skincare-text/5 pt-3">
                        <span>Was this testimonial helpful?</span>
                        <button className="flex items-center gap-1 hover:text-skincare-gold transition-colors cursor-pointer focus:outline-none">
                          <ThumbsUp className="h-3 w-3" /> Yes (12)
                        </button>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="bg-white border border-skincare-text/10 p-12 text-center rounded-2xl space-y-2">
                    <AlertCircle className="h-6 w-6 text-skincare-gold mx-auto" />
                    <h5 className="font-serif text-xs font-semibold uppercase text-skincare-text">No Matching Reviews Detected</h5>
                    <p className="text-xs text-skincare-text/65 font-light">Try selecting a different option grade tab above or write the first testimonial!</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </section>

        {/* DYNAMIC RELATED FORMULATIONS SECTION */}
        {recommendationList.length > 0 && (
          <section id="pd-related-formulas" className="border-t border-skincare-text/10 pt-16 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#8E7F70] uppercase font-bold block">Scientific Synergy Matching</span>
              <h2 className="font-serif text-2xl md:text-3xl font-light">Recommended Skincare Regimens</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendationList.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => onOpenProductDetail(p)}
                  className="bg-white border border-skincare-text/10 p-5 rounded-2xl hover:border-skincare-gold/30 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-auto shadow-2xs hover:shadow-xs"
                >
                  <div className="space-y-4">
                    <div className="aspect-square bg-skincare-mist border border-skincare-text/5 rounded-xl overflow-hidden relative">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-101"
                      />
                      {p.branch && (
                        <span className="absolute top-3 left-3 z-10 bg-skincare-text/85 text-[8px] font-mono tracking-widest text-white uppercase px-2.5 py-1 rounded-sm">
                          {p.branch}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[8px] font-mono tracking-[0.2em] font-semibold text-skincare-gold uppercase block">{p.category}</span>
                      <h4 className="font-serif text-[14px] font-semibold text-skincare-text group-hover:text-skincare-gold transition-colors leading-snug line-clamp-1">{p.name}</h4>
                      <p className="text-[11px] text-skincare-text/70 font-sans line-clamp-2 leading-relaxed">{p.briefDescription}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-skincare-text/5 flex items-center justify-between text-xs">
                    <span className="font-mono font-medium text-skincare-text">{new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(p.price)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProductDetail(p);
                      }}
                      className="text-[10px] font-mono font-bold text-[#8E7F70] group-hover:text-skincare-gold uppercase tracking-wider flex items-center gap-1 transition-colors hover:underline underline-offset-4"
                    >
                      CALIBRATE DETAILS
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </section>
        )}

      </div>

      {/* LUXURIOUS METICULOUS SCALED LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            id="skincare-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#0c0a09]/95 backdrop-blur-md flex flex-col justify-between p-6 md:p-10 select-none"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Top Control Bar with metadata information */}
            <div 
              className="flex items-center justify-between border-b border-white/5 pb-4 md:pb-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-skincare-gold font-bold">
                  Tsuyadama Luster Diagnostics
                </span>
                <h4 className="font-serif text-sm font-light text-white tracking-wide">
                  {product.name} — Detailed Reflection
                </h4>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-xs font-mono text-white/50 tracking-widest hidden sm:block">
                  IMAGE <span className="text-white font-bold">0{lightboxIndex + 1}</span> OF 0{galleryImages.length}
                </div>
                
                <button
                  id="lightbox-close-btn"
                  onClick={() => setIsLightboxOpen(false)}
                  className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer focus:outline-none"
                  aria-label="Close Lightbox"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Main Stage with Carousel Navigators */}
            <div className="flex-1 my-4 md:my-8 flex items-center justify-between gap-4 max-w-6xl mx-auto w-full relative">
              {/* Prev Button */}
              <button
                id="lightbox-prev-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                }}
                className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 hover:bg-white/10 hover:border-white/35 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer focus:outline-none"
                aria-label="Previous Image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* High-res Image Wrapper with Smooth Directional Fade */}
              <div 
                className="h-full max-h-[55vh] md:max-h-[65vh] flex-1 flex flex-col justify-center items-center relative"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="h-full w-full relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-stone-900"
                  >
                    <img
                      src={galleryImages[lightboxIndex]}
                      alt={`${product.name} high-definition details view - ${lightboxIndex}`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain"
                    />
                    
                    {/* Active Stamp indicator inside lightbox */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-md text-[9px] font-mono tracking-widest text-skincare-gold font-bold">
                      {["01 / PRODUCT PACKAGE", "02 / COHESIVE TEXTURE", "03 / MOLECULAR SCIENCE", "04 / RITUAL APPLICATION"][lightboxIndex]}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                id="lightbox-next-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
                }}
                className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5 hover:bg-white/10 hover:border-white/35 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer focus:outline-none"
                aria-label="Next Image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Bottom active thumbnails panel */}
            <div 
              className="border-t border-white/5 pt-4 md:pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[10px] font-mono tracking-widest text-white/40 uppercase text-center sm:text-left self-center sm:self-auto font-bold">
                Interactive Dermal Registry Index
              </p>

              <div className="flex gap-2.5 overflow-x-auto max-w-full justify-center p-1">
                {galleryImages.map((imgUrl, idx) => {
                  const isFocused = lightboxIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setLightboxIndex(idx)}
                      className={`h-12 md:h-14 aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 relative cursor-pointer focus:outline-none shrink-0 ${
                        isFocused 
                          ? "border-skincare-gold scale-103 shadow-inner" 
                          : "border-white/10 opacity-50 hover:opacity-100 hover:border-white/20"
                      }`}
                      aria-label={`Focus image ${idx + 1}`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Navigation thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                      {/* Active tag micro dots */}
                      {isFocused && (
                        <div className="absolute inset-0 bg-skincare-gold/10 flex items-end justify-center pb-0.5">
                          <span className="h-1 w-1 rounded-full bg-skincare-gold" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
