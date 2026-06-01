/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Product } from "../types";
import { REVIEWS } from "../data";
import { X, Star, Check, Sparkles, User, ShoppingBag, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddProductToCart: (product: Product, quantity?: number) => void;
}

type TabType = "details" | "science" | "reviews";

export default function ProductDetailModal({
  product,
  onClose,
  onAddProductToCart
}: ProductDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("details");
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const productReviews = REVIEWS[product.id] || [];

  const handleAdjustQuantity = (direction: "up" | "down") => {
    if (direction === "up") {
      setQuantity((q) => q + 1);
    } else if (direction === "down" && quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAddWithQuantity = () => {
    onAddProductToCart(product, quantity);
    setQuantity(1); // Reset
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6" id="product-detail-modal-container">
        
        {/* Dark drop shadow overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        />

        {/* Modal Panel content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-skincare-text/10 h-[90vh] md:h-auto md:max-h-[85vh] overflow-hidden flex flex-col z-10"
        >
          {/* Top header navigation buttons */}
          <div className="flex justify-between items-center bg-skincare-cream border-b border-skincare-text/10 px-6 py-4">
            <span className="text-[10px] font-mono tracking-widest text-skincare-bronze uppercase">
              TOKYO DERMATOLOGY LABORATORIES • DOSAGE SPECIFICATION
            </span>
            <button
              id="product-modal-close"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-skincare-clay/40 text-skincare-text cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Core scrollable details */}
          <div className="overflow-y-auto p-6 md:p-10 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Product Visual */}
              <div className="space-y-4">
                <div className="aspect-4/5 w-full bg-skincare-mist border border-skincare-text/10 rounded-xl overflow-hidden relative shadow-sm group">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-101.5"
                  />
                  {product.tag && (
                    <span className="absolute top-4 left-4 z-10 bg-skincare-text text-white text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full">
                      {product.tag}
                    </span>
                  )}
                </div>
                
                {/* Visual guarantee tag */}
                <div className="bg-skincare-cream/50 p-4 border border-skincare-text/10 flex items-center space-x-3 rounded-xl text-[11px] text-skincare-text/80">
                  <Sparkles className="h-4 w-4 shrink-0 text-skincare-gold" />
                  <span>
                    <strong>100% Pearl Autolysate.</strong> Hypoallergenic, clinical-grade collagen derivatives verified for reactive skin membranes.
                  </span>
                </div>
              </div>

              {/* Product Info & Tabs */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-sans tracking-[0.2em] font-medium text-skincare-gold uppercase">
                    {product.category}
                  </span>
                  
                  <h3 className="font-serif text-2xl font-light text-skincare-text mt-1.5 mb-2">
                    {product.name}
                  </h3>

                  {/* Rating summary */}
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="flex text-skincare-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating) ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-skincare-text/75 font-mono">
                      {product.rating} ({product.reviewsCount} verified reviews)
                    </span>
                  </div>

                  {/* Product Interactive Tabs Trigger */}
                  <div className="flex border-b border-skincare-text/10 mb-6 font-sans text-xs tracking-wider uppercase">
                    {(["details", "science", "reviews"] as TabType[]).map((tab) => (
                      <button
                        id={`product-tab-btn-${tab}`}
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 pr-6 border-b-2 font-medium cursor-pointer transition-colors ${
                          activeTab === tab
                            ? "border-skincare-gold text-skincare-text"
                            : "border-transparent text-skincare-text/50 hover:text-skincare-text"
                        }`}
                      >
                        {tab === "details" && "Description"}
                        {tab === "science" && "Ritual & Form"}
                        {tab === "reviews" && `Reviews (${productReviews.length})`}
                      </button>
                    ))}
                  </div>

                  {/* Tab Contents */}
                  <div className="min-h-[180px]">
                    <AnimatePresence mode="wait">
                      
                      {activeTab === "details" && (
                        <motion.div
                          key="details-tab"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-4 text-xs font-sans font-light leading-relaxed text-skincare-text/80"
                        >
                          <p>{product.description}</p>
                          <div className="space-y-2 pt-2">
                            <span className="block text-[10px] font-mono tracking-widest text-skincare-bronze uppercase">
                              EXPECTED RECOVERY OUTCOMES
                            </span>
                            <div className="grid grid-cols-1 gap-2 pt-1 font-sans text-[11px] text-skincare-text">
                              {product.skinBenefits.map((benefit, i) => (
                                <div key={i} className="flex items-start space-x-2">
                                  <div className="h-4 w-4 bg-skincare-clay flex items-center justify-center rounded-full text-skincare-gold mt-0.5 border border-skincare-text/5">
                                    <Check className="h-2.5 w-2.5" />
                                  </div>
                                  <p>{benefit}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "science" && (
                        <motion.div
                          key="science-tab"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-4"
                        >
                          <div>
                            <span className="block text-[10px] font-mono tracking-widest text-skincare-bronze uppercase mb-1.5">
                              Clinical Application Method
                            </span>
                            <div className="space-y-2">
                              {product.ritual.map((step, i) => (
                                <div key={i} className="flex items-start space-x-3 text-xs leading-relaxed text-skincare-text/80 font-sans font-light">
                                  <span className="font-mono text-skincare-gold">0{i+1}.</span>
                                  <p>{step}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2">
                            <span className="block text-[10px] font-mono tracking-widest text-skincare-bronze uppercase mb-1.5">
                              Key Ingredients Matrix
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {product.ingredients.map((ing) => (
                                <span key={ing} className="bg-skincare-cream border border-skincare-text/15 px-2.5 py-1.5 text-[10px] font-mono rounded-full text-skincare-text">
                                  {ing}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "reviews" && (
                        <motion.div
                          key="reviews-tab"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-4"
                        >
                          {productReviews.length > 0 ? (
                            <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
                              {productReviews.map((rev) => (
                                <div key={rev.id} className="bg-skincare-cream/55 border border-skincare-text/10 p-4 rounded-xl space-y-1.5 text-xs text-skincare-text/85">
                                  <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="flex items-center gap-1 font-semibold text-skincare-text">
                                      <User className="h-3 w-3 text-skincare-gold" />
                                      {rev.userName}
                                    </span>
                                    <span className="text-skincare-text/40">{rev.date}</span>
                                  </div>
                                  <div className="flex text-skincare-gold">
                                    {[...Array(rev.rating)].map((_, i) => (
                                      <Star key={i} className="h-2.5 w-2.5 fill-current" />
                                    ))}
                                  </div>
                                  <p className="font-sans font-light leading-relaxed">{rev.comment}</p>
                                  <span className="block text-[9px] font-mono text-skincare-bronze">
                                    DIAGNOSED SKIN: {rev.skinType.toUpperCase()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-skincare-text/50 italic py-6">
                              No customer reviews log has been integrated for this size yet.
                            </p>
                          )}
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>
                </div>

                {/* Pricing and cart checkout widgets */}
                <div className="border-t border-skincare-text/10 pt-6 mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-skincare-bronze uppercase">
                      RETAIL VALUE (INC TAX)
                    </span>
                    <p className="text-xl font-mono text-skincare-text font-bold">
                      {new Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY"
                      }).format(product.price)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 bg-skincare-cream border border-skincare-text/15 p-2 rounded-full shrink-0">
                    <div className="flex items-center">
                      <button
                        id="product-modal-decrease"
                        onClick={() => handleAdjustQuantity("down")}
                        className="p-1.5 hover:bg-skincare-clay-gold/20 rounded-full text-skincare-text cursor-pointer transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold font-mono text-skincare-text select-none">
                        {quantity}
                      </span>
                      <button
                        id="product-modal-increase"
                        onClick={() => handleAdjustQuantity("up")}
                        className="p-1.5 hover:bg-skincare-clay-gold/20 rounded-full text-skincare-text cursor-pointer transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <button
                    id="product-modal-add-to-bag"
                    onClick={handleAddWithQuantity}
                    className="flex-1 min-w-[150px] bg-skincare-text hover:bg-skincare-gold text-white font-sans py-3.5 px-6 text-xs tracking-[0.2em] font-semibold uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-full cursor-pointer hover:shadow-lg"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    ADD TO BAG
                  </button>
                </div>

              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
