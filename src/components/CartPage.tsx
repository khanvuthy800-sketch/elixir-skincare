/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { CartItem, Product } from "../types";
import { PRODUCTS } from "../data";
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Truck, 
  CreditCard,
  Building,
  Check,
  Percent,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigateTo: (page: "home" | "products") => void;
  onOpenProductDetail: (product: Product) => void;
}

type CheckoutStage = "review" | "shipping" | "payment" | "confirmed";

export default function CartPage({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateTo,
  onOpenProductDetail
}: CartPageProps) {
  const [stage, setStage] = useState<CheckoutStage>("review");
  const [deliveryMethod, setDeliveryMethod] = useState<"express" | "pickup">("express");
  
  // Checkout Form Details
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    prefecture: "Tokyo",
    postalCode: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    agreeToTerms: true,
  });

  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [discountError, setDiscountError] = useState("");

  // Calculate pricing matrices
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const discAmount = useMemo(() => {
    if (!activeDiscount) return 0;
    return Math.round(subtotal * (activeDiscount.percent / 100));
  }, [subtotal, activeDiscount]);

  const filteredSubtotal = subtotal - discAmount;
  const consumptionTax = Math.round(filteredSubtotal * 0.1); // Japanese 10% tax

  const FREE_SHIPPING_LIMIT = 10000;
  const shippingFee = useMemo(() => {
    if (deliveryMethod === "pickup" || filteredSubtotal === 0 || filteredSubtotal >= FREE_SHIPPING_LIMIT) {
      return 0;
    }
    return 750;
  }, [filteredSubtotal, deliveryMethod]);

  const estimatedTotal = filteredSubtotal + consumptionTax + shippingFee;

  // Recommended formulation upsells to cross the free-shipping threshold
  const upsells = useMemo(() => {
    const activeIds = new Set(cartItems.map(item => item.product.id));
    return PRODUCTS.filter(p => !activeIds.has(p.id)).slice(0, 3);
  }, [cartItems]);

  // Handle promo code application
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setDiscountError("");
    const cleaned = discountCode.trim().toUpperCase();
    if (cleaned === "TSUYADAMA") {
      setActiveDiscount({ code: "TSUYADAMA", percent: 15 });
      setDiscountCode("");
    } else if (cleaned === "COLLAGEN10") {
      setActiveDiscount({ code: "COLLAGEN10", percent: 10 });
      setDiscountCode("");
    } else {
      setDiscountError("Invalid or expired promotional code.");
    }
  };

  // Switch steps with simple validation
  const transitionToStage = (next: CheckoutStage) => {
    if (next === "shipping" && cartItems.length === 0) return;
    if (next === "payment") {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
        alert("Please complete the required shipping information details.");
        return;
      }
    }
    setStage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Submit mock checkout payment
  const handleMockPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cardName || !formData.cardNumber || !formData.cardExpiry || !formData.cardCvv) {
      alert("Please complete all credit card validation parameters.");
      return;
    }
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setStage("confirmed");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1800);
  };

  const handleFinishAndReset = () => {
    onClearCart();
    onNavigateTo("home");
  };

  return (
    <div id="cart-page-root" className="bg-[#FAF8F5] min-h-screen pt-24 pb-24 font-sans text-skincare-text">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Navigation Breadcrumbs */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <button
            id="cart-back-btn"
            onClick={() => onNavigateTo("products")}
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#8E7F70] hover:text-skincare-gold transition-colors duration-300 uppercase cursor-pointer py-1 focus:outline-none"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            BACK TO SCIENTIFIC DIRECTORY
          </button>

          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-skincare-bronze/70">
            <span className="cursor-pointer hover:text-skincare-gold" onClick={() => onNavigateTo("home")}>ELIXIR HOME</span>
            <span>/</span>
            <span>SHOPPING BAG FILAMENT</span>
            <span>/</span>
            <span className="text-skincare-gold font-semibold uppercase">{stage}</span>
          </div>
        </div>

        {/* Page Main Heading */}
        <div className="mb-12 border-b border-skincare-text/5 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-skincare-gold uppercase font-bold block">Exclusive Shiseido Elixir Vault</span>
              <h1 className="font-serif text-3xl md:text-4xl font-light tracking-wide">
                Your Curated Treatment Regimen
              </h1>
            </div>

            {/* Stepper Progress bar visual indicator */}
            {stage !== "confirmed" && (
              <div className="flex items-center bg-white border border-skincare-text/10 p-2.5 rounded-full shadow-xs gap-1 md:gap-2">
                <button
                  onClick={() => transitionToStage("review")}
                  className={`text-[10px] font-mono tracking-wider px-3 py-1.5 rounded-full transition-all ${
                    stage === "review" 
                      ? "bg-skincare-text text-white font-medium" 
                      : "text-skincare-text/50 hover:text-skincare-text"
                  }`}
                >
                  1. Review Bag
                </button>
                <span className="text-skincare-text/20 font-mono text-[10px]">•</span>
                <button
                  onClick={() => transitionToStage("shipping")}
                  disabled={cartItems.length === 0}
                  className={`text-[10px] font-mono tracking-wider px-3 py-1.5 rounded-full transition-all disabled:opacity-40 ${
                    stage === "shipping" 
                      ? "bg-skincare-text text-white font-medium" 
                      : "text-skincare-text/50 hover:text-skincare-text"
                  }`}
                >
                  2. Shipping
                </button>
                <span className="text-skincare-text/20 font-mono text-[10px]">•</span>
                <button
                  onClick={() => transitionToStage("payment")}
                  disabled={cartItems.length === 0 || !formData.address}
                  className={`text-[10px] font-mono tracking-wider px-3 py-1.5 rounded-full transition-all disabled:opacity-40 ${
                    stage === "payment" 
                      ? "bg-skincare-text text-white font-medium" 
                      : "text-skincare-text/50 hover:text-skincare-text"
                  }`}
                >
                  3. Payment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Outer Split Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT PANEL: Dynamic Content stage based routing */}
          <div className="lg:col-span-8 space-y-8">
            
            <AnimatePresence mode="wait">
              
              {/* STAGE A: CART ITEMS LISTING */}
              {stage === "review" && (
                <motion.div
                  key="stage-review"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  {/* Delivery notification indicator bar */}
                  {cartItems.length > 0 && (
                    <div className="bg-white border border-skincare-text/10 p-5 rounded-2xl shadow-xs flex items-center gap-4">
                      <div className="h-10 w-10 bg-skincare-cream border border-[#EADBC8]/35 rounded-full flex items-center justify-center text-skincare-gold shrink-0">
                        <Truck className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-serif text-xs font-semibold">
                          {subtotal >= FREE_SHIPPING_LIMIT 
                            ? "Complimentary Premium Express Delivery Qualified" 
                            : "complimentary Express Delivery Standard Limit"
                          }
                        </h4>
                        <p className="text-xs text-skincare-text/75 font-sans leading-relaxed">
                          {subtotal >= FREE_SHIPPING_LIMIT 
                            ? "Your premium collective formulation is authorized for complimentary direct express dispatch from our Tokyo center." 
                            : `Add only ${new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(FREE_SHIPPING_LIMIT - subtotal)} more value of skincare to unlock zero-cost express delivery.`
                          }
                        </p>
                        {subtotal < FREE_SHIPPING_LIMIT && (
                          <div className="h-1.5 w-full bg-skincare-cream border border-skincare-text/5 rounded-full mt-2 overflow-hidden">
                            <div 
                              className="h-full bg-skincare-gold rounded-full transition-all duration-500"
                              style={{ width: `${Math.min((subtotal / FREE_SHIPPING_LIMIT) * 100, 100)}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {cartItems.length > 0 ? (
                    <div className="bg-white border border-skincare-text/10 rounded-2xl shadow-xs overflow-hidden">
                      {/* Cart Table Headers */}
                      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-skincare-cream/45 border-b border-skincare-text/10 text-[10px] font-mono uppercase tracking-widest text-skincare-bronze/95">
                        <div className="col-span-6">Formulation Detail</div>
                        <div className="col-span-2 text-center">Unit Price</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 text-right">Line Subtotal</div>
                      </div>

                      {/* Items rows */}
                      <div className="divide-y divide-skincare-text/5 px-6">
                        {cartItems.map((item) => (
                          <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-center">
                            
                            {/* Product Info Column */}
                            <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                              <div 
                                onClick={() => onOpenProductDetail(item.product)}
                                className="h-20 w-16 bg-skincare-mist border border-skincare-text/10 rounded-lg overflow-hidden shrink-0 cursor-pointer group"
                              >
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name} 
                                  referrerPolicy="no-referrer"
                                  className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500"
                                />
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[8px] font-sans tracking-[0.2em] font-semibold text-skincare-gold uppercase">
                                    {item.product.category}
                                  </span>
                                  {item.product.branch && (
                                    <span className="text-[8px] font-mono text-skincare-bronze uppercase bg-skincare-cream px-2 py-0.5 rounded-full border border-[#EADBC8]/30">
                                      {item.product.branch}
                                    </span>
                                  )}
                                </div>
                                <h3 
                                  onClick={() => onOpenProductDetail(item.product)}
                                  className="font-serif text-[14px] font-medium hover:text-skincare-gold transition-colors cursor-pointer leading-tight"
                                >
                                  {item.product.name}
                                </h3>
                                <p className="text-[11px] font-sans text-skincare-text/65 line-clamp-1">
                                  {item.product.briefDescription}
                                </p>
                              </div>
                            </div>

                            {/* Unit Price Column */}
                            <div className="col-span-4 md:col-span-2 text-left md:text-center">
                              <span className="text-xs text-skincare-text/50 md:hidden font-mono uppercase mr-2">Price:</span>
                              <span className="text-xs font-mono font-medium">
                                {new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(item.product.price)}
                              </span>
                            </div>

                            {/* Quantity Widgets Column */}
                            <div className="col-span-4 md:col-span-2 flex justify-start md:justify-center">
                              <div className="flex items-center bg-[#FAF8F5] border border-skincare-text/15 p-1 rounded-full px-2.5">
                                <button
                                  id={`cart-page-dec-${item.product.id}`}
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="p-1 hover:bg-white rounded-full cursor-pointer text-skincare-text transition-colors"
                title="Decrease"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="w-7 text-center text-xs font-mono font-semibold">
                                  {item.quantity}
                                </span>
                                <button
                                  id={`cart-page-inc-${item.product.id}`}
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="p-1 hover:bg-white rounded-full cursor-pointer text-skincare-text transition-colors"
                title="Increase"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>

                            {/* Line value total Column */}
                            <div className="col-span-4 md:col-span-2 text-right flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                              <span className="text-xs text-skincare-text/50 md:hidden font-mono uppercase">Subtotal:</span>
                              <div className="space-y-1 text-right">
                                <p className="text-xs font-mono font-semibold">
                                  {new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(item.product.price * item.quantity)}
                                </p>
                                <button
                                  id={`cart-page-remove-${item.product.id}`}
                                  onClick={() => onRemoveItem(item.product.id)}
                                  className="text-[10px] font-mono text-stone-400 hover:text-red-500 flex items-center gap-1 cursor-pointer transition-colors"
                                  title="Remove item"
                                >
                                  <Trash2 className="h-3 w-3" />
                                  Remove
                                </button>
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>

                      {/* Clear entire bag action bar footer */}
                      <div className="bg-[#FAF8F5]/50 border-t border-skincare-text/5 px-6 py-4 flex items-center justify-between">
                        <button
                          id="cart-page-clear-btn"
                          onClick={onClearCart}
                          className="text-[10px] font-mono text-stone-400 hover:text-red-500 cursor-pointer flex items-center gap-1.5 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          CLEAR THE ENTIRE BAG
                        </button>

                        <button
                          id="cart-page-continue-shop"
                          onClick={() => onNavigateTo("products")}
                          className="text-xs font-mono text-skincare-gold hover:text-skincare-text transition-colors flex items-center gap-1.5 font-semibold uppercase underline underline-offset-4"
                        >
                          Add More Treatment Formulas 
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Elegant Empty bag screen
                    <div className="bg-white border border-skincare-text/10 rounded-2xl p-16 text-center space-y-6" id="cart-page-empty">
                      <div className="h-16 w-16 bg-skincare-cream border border-skincare-text/10 rounded-full flex items-center justify-center text-skincare-gold mx-auto shadow-inner">
                        <ShoppingBag className="h-6 w-6" />
                      </div>
                      <div className="space-y-2 max-w-sm mx-auto">
                        <h3 className="font-serif text-lg font-light text-skincare-text">
                          Your Diagnostics Bag is Vacant
                        </h3>
                        <p className="text-xs font-sans font-light text-skincare-text/75 leading-relaxed">
                          Before clinical calibration can compile, you should define your formulas repository catalog. Explore New arrivals or active series lines.
                        </p>
                      </div>
                      <button
                        id="empty-nav-shop-btn"
                        onClick={() => onNavigateTo("products")}
                        className="inline-flex items-center gap-2 bg-skincare-text hover:bg-skincare-gold text-white text-[11px] font-sans font-semibold tracking-widest uppercase px-8 py-3.5 rounded-full cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        EXPLORE FORMULAS DIRECTORY
                      </button>
                    </div>
                  )}

                  {/* Suggest Add-on micro-carousel if under target limit */}
                  {cartItems.length > 0 && subtotal < FREE_SHIPPING_LIMIT && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-skincare-gold" />
                        <h4 className="font-serif text-sm font-medium">Suggested Add-ons to Reach Free Shipping</h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {upsells.map((p) => (
                          <div 
                            key={p.id} 
                            className="bg-white border border-skincare-text/10 p-4 rounded-xl flex items-center gap-3 hover:border-skincare-gold/30 transition-all shadow-3xs"
                          >
                            <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="h-12 w-10 object-cover rounded-md border" />
                            <div className="flex-1 min-w-0 space-y-0.5">
                              <h5 className="font-serif text-xs font-medium truncate leading-tight text-skincare-text">{p.name}</h5>
                              <p className="text-[10px] font-mono text-skincare-gold">{new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(p.price)}</p>
                              <button
                                id={`upsell-add-${p.id}`}
                                onClick={() => onUpdateQuantity(p.id, 1)}
                                className="text-[9px] font-mono text-skincare-text/60 hover:text-skincare-gold font-bold underline underline-offset-2 uppercase flex items-center gap-0.5 mt-1 cursor-pointer"
                              >
                                Quick Add +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </motion.div>
              )}

              {/* STAGE B: SECURE SHIPPING DETAIL INPUTS */}
              {stage === "shipping" && (
                <motion.div
                  key="stage-shipping"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white border border-skincare-text/10 p-6 md:p-8 rounded-2xl shadow-xs space-y-6"
                >
                  <div className="border-b border-skincare-text/10 pb-4">
                    <h2 className="font-serif text-xl font-light">1. Delivery Destination & Recipient Verification</h2>
                    <p className="text-xs text-skincare-text/75 font-sans mt-1">Please provide accurate physical mailing address credentials to schedule carrier routing.</p>
                  </div>

                  {/* Delivery Routing Toggle Switch */}
                  <div className="space-y-3">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-skincare-bronze">Delivery Protocol</label>
                    <div className="grid grid-cols-2 gap-4">
                      
                      {/* Delivery Card */}
                      <div 
                        onClick={() => setDeliveryMethod("express")}
                        className={`cursor-pointer border p-4 rounded-xl flex items-start gap-3 transition-all ${
                          deliveryMethod === "express" 
                            ? "bg-skincare-cream border-skincare-gold" 
                            : "bg-white border-skincare-text/10 hover:border-skincare-text/25"
                        }`}
                      >
                        <Truck className={`h-4.5 w-4.5 mt-0.5 ${deliveryMethod === "express" ? "text-skincare-gold" : "text-skincare-text/60"}`} />
                        <div className="space-y-0.5">
                          <span className="block text-xs font-semibold">Express Carrier Dispatch</span>
                          <span className="block text-[10px] text-skincare-text/70">To your private residence (1-2 days dispatched via Tokyo Hub)</span>
                        </div>
                      </div>

                      {/* Store Pickup Card */}
                      <div 
                        onClick={() => setDeliveryMethod("pickup")}
                        className={`cursor-pointer border p-4 rounded-xl flex items-start gap-3 transition-all ${
                          deliveryMethod === "pickup" 
                            ? "bg-skincare-cream border-skincare-gold" 
                            : "bg-white border-skincare-text/10 hover:border-skincare-text/25"
                        }`}
                      >
                        <Building className={`h-4.5 w-4.5 mt-0.5 ${deliveryMethod === "pickup" ? "text-skincare-gold" : "text-skincare-text/60"}`} />
                        <div className="space-y-0.5">
                          <span className="block text-xs font-semibold">Flagship Branch Pickup</span>
                          <span className="block text-[10px] text-skincare-text/70">Pick up at Tokyo Flagship Boutique (Ginza Main Street)</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Recipient Coordinates Form Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">First Name *</label>
                      <input 
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-4.5 py-3 text-xs outline-none focus:ring-1 focus:ring-skincare-gold transition-all"
                        placeholder="Yuzuki"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Last Name *</label>
                      <input 
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-4.5 py-3 text-xs outline-none focus:ring-1 focus:ring-skincare-gold transition-all"
                        placeholder="Sato"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Email Address *</label>
                      <input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-4.5 py-3 text-xs outline-none focus:ring-1 focus:ring-skincare-gold transition-all"
                        placeholder="sato@shiseido.jp"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Phone Number *</label>
                      <input 
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-4.5 py-3 text-xs outline-none focus:ring-1 focus:ring-skincare-gold transition-all"
                        placeholder="090-1234-5678"
                      />
                    </div>
                  </div>

                  {deliveryMethod === "express" ? (
                    <div className="space-y-4 pt-2 border-t border-skincare-text/5">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-skincare-gold">Shipping Address Details</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze">Postal Zip Code *</label>
                          <input 
                            type="text"
                            required
                            value={formData.postalCode}
                            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                            className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-4.5 py-3 text-xs outline-none"
                            placeholder="100-0005"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze">Prefecture *</label>
                          <select
                            value={formData.prefecture}
                            onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                            className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-4 py-3 text-xs outline-none"
                          >
                            <option value="Tokyo">Tokyo-to</option>
                            <option value="Kyoto">Kyoto-fu</option>
                            <option value="Osaka">Osaka-fu</option>
                            <option value="Kanagawa">Kanagawa-ken</option>
                            <option value="Hokkaido">Hokkaido</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze">City District *</label>
                          <input 
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-4.5 py-3 text-xs outline-none"
                            placeholder="Chiyoda-ku, Marunouchi"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze">Street Address (Chome & House ID) *</label>
                        <input 
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-4.5 py-3 text-xs outline-none focus:ring-1 focus:ring-skincare-gold transition-all"
                          placeholder="1-chome 101-bldg Suite 4B"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 bg-skincare-cream border border-[#EADBC8]/40 rounded-2xl flex items-start gap-3.5 pt-4 mt-2">
                      <Building className="h-5 w-5 text-skincare-gold shrink-0 mt-0.5" />
                      <div className="space-y-1.5">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-skincare-text">Tokyo Ginza Flagship Outlet Pickup</span>
                        <p className="text-xs text-skincare-text/75 font-sans leading-relaxed">
                          Your purchase will be waiting safely behind our central concierge display table. Please present your Order QR Code to any team technician on arrival. 
                          <span className="block mt-1.5 font-medium text-skincare-bronze">Location: Chuo-ku, Ginza 5-chome, Shiseido Tower Floor 1.</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Shipping actions Footer */}
                  <div className="flex justify-between items-center pt-6 border-t border-skincare-text/5">
                    <button
                      type="button"
                      onClick={() => transitionToStage("review")}
                      className="text-xs font-mono text-[#8E7F70] hover:text-skincare-text transition-colors uppercase flex items-center gap-1.5"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back to Bag
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => transitionToStage("payment")}
                      className="bg-skincare-text hover:bg-skincare-gold text-white font-sans text-xs tracking-[0.2em] font-semibold uppercase px-8 py-3.5 rounded-full cursor-pointer transition-all hover:shadow-md flex items-center gap-1.5"
                    >
                      CONTINUE TO SECURE PAYMENT
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                </motion.div>
              )}

              {/* STAGE C: SECURE PAYMENT CREDIT CARD ENTRY */}
              {stage === "payment" && (
                <motion.div
                  key="stage-payment"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white border border-skincare-text/10 p-6 md:p-8 rounded-2xl shadow-xs space-y-6"
                >
                  <div className="border-b border-skincare-text/10 pb-4 flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-xl font-light">2. Secure Transaction Verification Gateway</h2>
                      <p className="text-xs text-skincare-text/75 font-sans mt-1">Transactions are secured via Elixir Shiseido double-layered encryption protocols.</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-mono">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      SECURE 256-BIT SSL
                    </div>
                  </div>

                  {/* Graphic Card Indicator */}
                  <div className="bg-gradient-to-tr from-skincare-text via-[#2C2620] to-[#40372F] p-6 rounded-2xl text-white shadow-md relative overflow-hidden aspect-16/9 md:max-w-md mx-auto">
                    {/* Glowing gold accents */}
                    <div className="absolute top-0 right-0 h-40 w-40 bg-skincare-gold/15 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 h-16 w-16 bg-white/5 rounded-full blur-lg" />

                    <div className="h-full flex flex-col justify-between relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="font-serif italic text-base tracking-[0.2em] text-skincare-cream font-semibold">ELIXIR PLATINUM</span>
                        <CreditCard className="h-6 w-6 text-skincare-gold" />
                      </div>

                      {/* Chip */}
                      <div className="h-7 w-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-md border border-yellow-200/20 shadow-xs" />

                      <div className="space-y-2">
                        <span className="block font-mono tracking-widest text-xs md:text-sm text-slate-300">
                          {formData.cardNumber || "•••• •••• •••• ••••"}
                        </span>
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                            HOLDER: <strong className="text-white block font-sans text-[10px] uppercase font-light mt-0.5">{formData.cardName || "YUZUKI SATO"}</strong>
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 text-right">
                            EXPIRY: <strong className="text-white block font-mono text-[10px] mt-0.5">{formData.cardExpiry || "09/31"}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleMockPaymentSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Cardholder Named Identity *</label>
                      <input 
                        type="text"
                        required
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-4.5 py-3 text-xs outline-none"
                        placeholder="YUZUKI SATO"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Standard Credit Card Number *</label>
                      <input 
                        type="text"
                        required
                        maxLength={19}
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-4.5 py-3 text-xs outline-none font-mono"
                        placeholder="4111 2222 3333 4444"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Expiration Date *</label>
                        <input 
                          type="text"
                          required
                          maxLength={5}
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-4.5 py-3 text-xs outline-none font-mono"
                          placeholder="09/31"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">CVV Security Token *</label>
                        <input 
                          type="password"
                          required
                          maxLength={4}
                          value={formData.cardCvv}
                          onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-4.5 py-3 text-xs outline-none font-mono"
                          placeholder="•••"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input 
                        type="checkbox"
                        id="agreeTerms"
                        checked={formData.agreeToTerms}
                        onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                        className="h-4 w-4 bg-[#FAF8F5] border-skincare-text/10 text-skincare-gold rounded-sm focus:ring-skincare-gold"
                      />
                      <label htmlFor="agreeTerms" className="text-[11px] text-skincare-text/75 leading-relaxed">
                        I authorize the secure lock on checkout funds in accordance with Shiseido general terms and diagnostics preservation rules.
                      </label>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-skincare-text/5">
                      <button
                        type="button"
                        onClick={() => transitionToStage("shipping")}
                        className="text-xs font-mono text-[#8E7F70] hover:text-skincare-text transition-colors uppercase flex items-center gap-1.5"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back to Shipping
                      </button>

                      <button
                        id="checkout-secure-submit"
                        type="submit"
                        disabled={paymentProcessing || !formData.agreeToTerms}
                        className="bg-skincare-gold hover:bg-skincare-text text-white font-sans text-xs tracking-[0.2em] font-semibold uppercase px-8 py-3.5 rounded-full cursor-pointer transition-all hover:shadow-md disabled:opacity-40 flex items-center gap-1.5"
                      >
                        {paymentProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            PROCESSING TRANSACTION...
                          </>
                        ) : (
                          <>
                            AUTHORIZE PAYOUT
                            <Check className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </motion.div>
              )}

              {/* STAGE D: COMPLETE TRANSACTION APPROVED */}
              {stage === "confirmed" && (
                <motion.div
                  key="stage-confirmed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="bg-white border border-skincare-text/10 p-8 md:p-12 rounded-2xl shadow-md text-center max-w-2xl mx-auto space-y-8"
                >
                  <div className="h-16 w-16 bg-emerald-50 border border-emerald-200 text-emerald-500 flex items-center justify-center rounded-full mx-auto shadow-inner">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-skincare-gold">Diagnostic Regiment Verified</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-light">Thank You for Your Elixir Verification</h2>
                    <p className="text-xs text-skincare-text/75 font-sans leading-relaxed max-w-md mx-auto">
                      Your order has been approved by the central Tokyo laboratories desk. A complete scientific skin ledger, invoice receipt, and shipping code have been scheduled and dispatched to <strong className="text-skincare-text font-semibold">{formData.email}</strong>.
                    </p>
                  </div>

                  {/* Summary order parameters */}
                  <div className="bg-[#FAF8F5] border border-skincare-text/10 p-6 rounded-2xl text-left space-y-4 font-mono text-xs text-skincare-text/80">
                    <h4 className="text-[10px] text-skincare-bronze uppercase font-bold tracking-widest flex items-center gap-1">Order Particulars Status</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                      <div><strong>ORDER ID:</strong> #ELX-{Math.floor(100000 + Math.random() * 900000)}</div>
                      <div><strong>DATE:</strong> {new Date().toLocaleDateString("ja-JP")}</div>
                      <div><strong>RECIPIENT:</strong> {formData.firstName} {formData.lastName}</div>
                      <div><strong>DELIVERY METHOD:</strong> {deliveryMethod === "express" ? "Express Carrier Post" : "GINZA Boutique Pick-Up"}</div>
                    </div>
                    {deliveryMethod === "express" && (
                      <div className="text-[11px] pt-2 border-t border-skincare-text/5">
                        <strong>DESTINATION ADDRESS:</strong> <span className="font-sans text-[11px]">{formData.address}, {formData.city}, {formData.prefecture} {formData.postalCode}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <button
                      id="order-completed-back-home"
                      onClick={handleFinishAndReset}
                      className="w-full bg-skincare-text hover:bg-skincare-gold text-white font-sans py-4 text-xs tracking-[0.2em] font-semibold uppercase rounded-full cursor-pointer transition-all hover:shadow-md"
                    >
                      RETURN TO HOME COMPOSITIONS
                    </button>
                    <p className="text-[10px] font-mono text-stone-400">
                      Need modifications? Contact concierge support at 0120-770-933.
                    </p>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

          {/* RIGHT COLUMN: CALCULATIONS MATRIX PANEL */}
          {stage !== "confirmed" && (
            <div className="lg:col-span-4 bg-white border border-skincare-text/10 rounded-2xl shadow-xs p-6 space-y-6 sticky top-24">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-skincare-text border-b border-skincare-text/10 pb-3">Regimen Invoice Statement</h3>
              
              {/* Promo code application block */}
              {stage === "review" && (
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase text-skincare-bronze">Promotional coupon code</label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="e.g. TSUYADAMA"
                      className="flex-1 bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full px-3.5 py-2 text-xs outline-none"
                    />
                    <button 
                      id="promo-apply-btn"
                      type="submit"
                      className="bg-skincare-text hover:bg-skincare-gold text-white text-[10px] font-mono px-5 py-2 rounded-full cursor-pointer uppercase font-semibold"
                    >
                      APPLY
                    </button>
                  </div>
                  {discountError && <p className="text-[10px] text-red-500 font-mono pl-1">{discountError}</p>}
                  {activeDiscount && <p className="text-[10px] text-emerald-500 font-mono pl-1">Coupon "{activeDiscount.code}" applied! ({activeDiscount.percent}% discount)</p>}
                  <div className="text-[9px] text-[#8E7F70] font-sans/90 pl-1">⭐ Tip: Try coupon "<strong>TSUYADAMA</strong>" for 15% luxury discount.</div>
                </form>
              )}

              {/* Numerical elements block */}
              <div className="space-y-3 pt-3 border-t border-skincare-text/5 text-xs font-mono text-skincare-text/80">
                <div className="flex justify-between items-center">
                  <span>Skincare Subtotal:</span>
                  <span>{new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(subtotal)}</span>
                </div>

                {activeDiscount && (
                  <div className="flex justify-between items-center text-emerald-600">
                    <span className="flex items-center gap-1"><Percent className="h-3 w-3" /> Promotion Discount:</span>
                    <span>-{new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(discAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Consumption Tax (10%):</span>
                  <span>{new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(consumptionTax)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Express Transit delivery:</span>
                  <span>{shippingFee === 0 ? "FREE" : new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(shippingFee)}</span>
                </div>

                <div className="border-t border-skincare-text/10 pt-4 flex justify-between items-baseline font-mono">
                  <span className="text-xs font-bold uppercase text-skincare-text">EST. DIRECT TOTAL:</span>
                  <span className="text-base font-semibold text-skincare-text">
                    {new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(estimatedTotal)}
                  </span>
                </div>
              </div>

              {/* Secondary Helper messages */}
              <div className="p-4 bg-skincare-cream border border-[#EADBC8]/30 rounded-xl space-y-2 text-[11px] text-skincare-text/75 leading-relaxed">
                <p className="font-semibold text-skincare-bronze uppercase text-[9px] tracking-wider flex items-center gap-1">Regimen Verification Guarantee</p>
                <p>Every clinical delivery is secured by our certified thermo-control glass packaging, guarding anti-aging ingredients against ambient temperature spikes.</p>
              </div>

              {/* Primary Forward action triggers */}
              {stage === "review" && cartItems.length > 0 && (
                <button
                  id="cart-review-proceed-shipping"
                  onClick={() => transitionToStage("shipping")}
                  className="w-full bg-skincare-text hover:bg-skincare-gold text-white font-sans py-4 text-xs tracking-[0.2em] font-semibold uppercase rounded-full cursor-pointer transition-all hover:shadow-md flex items-center justify-center gap-1.5"
                >
                  PROCEED TO DELIVERY ARMS
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              {stage === "shipping" && (
                <button
                  id="cart-shipping-proceed-payment"
                  onClick={() => transitionToStage("payment")}
                  className="w-full bg-skincare-text hover:bg-skincare-gold text-white font-sans py-4 text-xs tracking-[0.2em] font-slate-100 uppercase rounded-full cursor-pointer transition-all hover:shadow-md flex items-center justify-center gap-1"
                >
                  PROCEED TO PAYMENT PORTAL
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
