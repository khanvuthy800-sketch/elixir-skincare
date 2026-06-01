/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CartItem, Product } from "../types";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "completed">("cart");
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    cardNum: "",
    cardExp: "",
    cardCvv: ""
  });
  const [submittingCheckout, setSubmittingCheckout] = useState(false);

  // Compute values
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.1); // 10% Japanese consumption tax
  const FREE_SHIPPING_LIMIT = 10000; // Free shipping over ¥10,000
  const shipping = subtotal >= FREE_SHIPPING_LIMIT || subtotal === 0 ? 0 : 750;
  const total = subtotal + tax + shipping;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerDetails.name || !customerDetails.email || !customerDetails.address) {
      return alert("Please fill in key contact information.");
    }
    setSubmittingCheckout(true);
    setTimeout(() => {
      setSubmittingCheckout(false);
      setCheckoutStep("completed");
    }, 1500);
  };

  const handleCloseInternal = () => {
    onClose();
    // Delay resetting checkout state to avoid jump styles
    setTimeout(() => {
      setCheckoutStep("cart");
    }, 400);
  };

  const handleCompletedFinished = () => {
    onClearCart();
    handleCloseInternal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" id="cart-drawer-wrapper">
          
          {/* Backdrop mask click to exit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseInternal}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Drawer container body panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 190 }}
            className="relative z-50 flex w-full max-w-md flex-col justify-between bg-white shadow-2xl h-full border-l border-skincare-text/10"
          >
            {/* Header section */}
            <div className="flex justify-between items-center bg-skincare-cream border-b border-skincare-text/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4.5 w-4.5 text-skincare-gold" />
                <span className="font-serif text-lg font-light text-skincare-text">
                  {checkoutStep === "cart" && "Your Shopping Bag"}
                  {checkoutStep === "form" && "Secure Checkout"}
                  {checkoutStep === "completed" && "Transaction Approved"}
                </span>
              </div>
              <button
                id="cart-drawer-close"
                onClick={handleCloseInternal}
                className="p-1.5 rounded-full hover:bg-skincare-clay text-skincare-text cursor-pointer transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Main Stage Panel Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar">
              
              {/* STAGE A: Cart List VIEW */}
              {checkoutStep === "cart" && (
                <>
                  {cartItems.length > 0 ? (
                    <div className="space-y-6">
                      
                      {/* Free shipping threshold progress bar */}
                      <div className="bg-skincare-cream/45 border border-skincare-text/5 p-4 rounded-xl">
                        {subtotal >= FREE_SHIPPING_LIMIT ? (
                          <div className="text-xs text-skincare-text/90 font-medium flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            Congratulations! Your bag qualifies for free express delivery from Tokyo.
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-xs text-skincare-text/80 leading-relaxed font-sans font-light">
                              Add only <strong className="font-mono">{new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(FREE_SHIPPING_LIMIT - subtotal)}</strong> more for <strong>complimentary express delivery</strong>!
                            </p>
                            <div className="h-1 w-full bg-skincare-clay rounded-full overflow-hidden">
                              <div
                                  className="h-full bg-skincare-gold rounded-full transition-all duration-300"
                                  style={{ width: `${(subtotal / FREE_SHIPPING_LIMIT) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Items loop list */}
                      <div className="divide-y divide-skincare-text/10">
                        {cartItems.map((item) => (
                          <div key={item.product.id} className="flex py-4 items-center gap-4 first:pt-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="h-16 w-14 object-cover rounded-md border border-skincare-text/10"
                            />
                            
                            <div className="flex-1">
                              <span className="text-[8px] font-sans tracking-widest text-skincare-gold uppercase">
                                {item.product.category}
                              </span>
                              <h4 className="font-serif text-[13px] font-medium text-skincare-text leading-tight mt-0.5">
                                {item.product.name}
                              </h4>
                              <p className="text-xs font-mono text-skincare-text/70 mt-1">
                                {new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(item.product.price)}
                              </p>

                              {/* Quantity selection widgets */}
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center bg-skincare-cream border border-skincare-text/15 p-1 rounded-full px-2">
                                  <button
                                    id={`cart-decrease-${item.product.id}`}
                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                    className="p-1 hover:bg-white rounded-full cursor-pointer text-skincare-text"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="w-6 text-center text-[11px] font-mono font-medium">
                                    {item.quantity}
                                  </span>
                                  <button
                                    id={`cart-increase-${item.product.id}`}
                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                    className="p-1 hover:bg-white rounded-full cursor-pointer text-skincare-text"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>

                                <button
                                  id={`cart-remove-${item.product.id}`}
                                  onClick={() => onRemoveItem(item.product.id)}
                                  className="text-[11px] font-mono text-stone-400 hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer"
                                  title="Remove item"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  ) : (
                    <div className="h-full flex flex-col justify-center items-center py-20 text-center space-y-4">
                      <div className="h-12 w-12 bg-skincare-cream border border-skincare-text/10 flex items-center justify-center text-skincare-gold rounded-full">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-base text-skincare-text font-light">
                          Your bag is vacant.
                        </h4>
                        <p className="text-xs text-skincare-text/50 font-sans max-w-xs">
                          Explore our curated revolutionary anti-aging formulas and add items to your diagnostic regimen.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* STAGE B: Secure billing checkout Form */}
              {checkoutStep === "form" && (
                <form id="checkout-secure-form" onSubmit={handleCheckoutSubmit} className="space-y-5">
                  <div className="bg-skincare-cream border border-skincare-text/5 p-4 font-mono text-[11px] text-skincare-bronze flex items-center gap-2 rounded-full justify-center shadow-xs">
                    <ShieldCheck className="h-4.5 w-4.5 text-skincare-gold" />
                    <span>SECURE 256-BIT TOKYO BANK SHARED GATEWAY</span>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze mb-1">
                        Full Name *
                      </label>
                      <input
                        id="checkout-name"
                        type="text"
                        required
                        value={customerDetails.name}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                        className="w-full bg-white border border-skincare-text/15 focus:border-skincare-gold rounded-full px-4 py-2.5 text-xs outline-hidden"
                        placeholder="Yuzuki Sato"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze mb-1">
                        Email Address *
                      </label>
                      <input
                        id="checkout-email"
                        type="email"
                        required
                        value={customerDetails.email}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                        className="w-full bg-white border border-skincare-text/15 focus:border-skincare-gold rounded-full px-4 py-2.5 text-xs outline-hidden"
                        placeholder="sato@elixir.jp"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze mb-1">
                        Delivery Address *
                      </label>
                      <input
                        id="checkout-address"
                        type="text"
                        required
                        value={customerDetails.address}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                        className="w-full bg-white border border-skincare-text/15 focus:border-skincare-gold rounded-full px-4 py-2.5 text-xs outline-hidden"
                        placeholder="Chiyoda-ku, Marunouchi 1-chome"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze mb-1">
                          Prefecture / City
                        </label>
                        <input
                          id="checkout-city"
                          type="text"
                          value={customerDetails.city}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })}
                          className="w-full bg-white border border-skincare-text/15 focus:border-skincare-gold rounded-full px-4 py-2.5 text-xs outline-hidden"
                          placeholder="Tokyo"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze mb-1">
                          Postal Code
                        </label>
                        <input
                          id="checkout-zip"
                          type="text"
                          className="w-full bg-white border border-skincare-text/15 focus:border-skincare-gold rounded-full px-4 py-2.5 text-xs outline-hidden"
                          placeholder="100-0005"
                        />
                      </div>
                    </div>

                    <div className="border-t border-skincare-text/10 pt-4 mt-2">
                      <span className="block text-[10px] font-mono uppercase tracking-widest text-skincare-gold font-bold mb-3">
                        Mock Payment Details
                      </span>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze mb-1">
                            Card Number (Any mock num)
                          </label>
                          <input
                            id="checkout-card"
                            type="text"
                            className="w-full bg-white border border-skincare-text/15 focus:border-skincare-gold rounded-full p-2.5 px-4 text-[11px] font-mono outline-hidden"
                            placeholder="4111 2222 3333 4444"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze mb-1">
                              Expiry Date
                            </label>
                            <input
                              id="checkout-expiry"
                              type="text"
                              className="w-full bg-white border border-skincare-text/15 focus:border-skincare-gold rounded-full p-2.5 px-4 text-[11px] font-mono outline-hidden"
                              placeholder="09/29"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze mb-1">
                              CVV Security Code
                            </label>
                            <input
                              id="checkout-cvv"
                              type="password"
                              className="w-full bg-white border border-skincare-text/15 focus:border-skincare-gold rounded-full p-2.5 px-4 text-[11px] font-mono outline-hidden"
                              placeholder="•••"
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <button type="submit" className="hidden" /> {/* Hidden button to allow enter submit */}
                </form>
              )}

              {/* STAGE C: Approved order completion confirmation message */}
              {checkoutStep === "completed" && (
                <div className="h-full flex flex-col justify-center items-center py-10 text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="h-16 w-16 bg-emerald-50 text-emerald-500 border border-emerald-200 flex items-center justify-center rounded-full shadow-inner"
                  >
                    <CheckCircle2 className="h-8 w-8" />
                  </motion.div>

                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-light text-skincare-text">
                      Thank You for Choosing Elixir!
                    </h4>
                    <p className="text-[11px] font-mono text-skincare-bronze tracking-widest uppercase">
                      ORDER ID: #ELX-{Math.floor(100000 + Math.random() * 900000)}
                    </p>
                    <p className="text-xs text-skincare-text/70 font-sans font-light max-w-sm px-4 leading-relaxed pt-2">
                      Your premium diagnostic regimen has been approved and registered. An invoice along with a customized molecular guide is landing in email box <strong>{customerDetails.email}</strong> right now. We expect dispatch in 24 hours.
                    </p>
                  </div>

                  <div className="bg-skincare-cream/55 border border-skincare-text/10 p-5 rounded-2xl w-full max-w-xs text-left text-xs font-mono text-skincare-text/80 space-y-1">
                    <span className="block text-[9px] text-skincare-bronze uppercase mb-1 font-semibold">SHIPMENT DETAILS:</span>
                    <p>RECIPIENT: {customerDetails.name}</p>
                    <p className="truncate">ADDRESS: {customerDetails.address}</p>
                    <p>TOTAL DEDUCTED: {new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(total)}</p>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom calculation and action summary bar */}
            {checkoutStep !== "completed" && cartItems.length > 0 && (
              <div className="border-t border-skincare-text/10 bg-skincare-cream/50 p-6 space-y-4 shrink-0">
                <div className="space-y-2 text-xs font-mono text-skincare-text/85">
                  <div className="flex justify-between">
                    <span>Selected Items Subtotal:</span>
                    <span>{new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-[11px] text-skincare-text/60">
                    <span>10% National Sales Tax:</span>
                    <span>{new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(tax)}</span>
                  </div>

                  <div className="flex justify-between text-[11px] text-skincare-text/60">
                    <span>Express Delivery (Tokyo):</span>
                    <span>{shipping === 0 ? "FREE" : new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(shipping)}</span>
                  </div>

                  <div className="h-[1px] w-full bg-skincare-text/10 mt-2" />
                  
                  <div className="flex justify-between text-sm font-semibold text-skincare-text pt-1.5 font-mono">
                    <span>ESTIMATED PAYOUT:</span>
                    <span>{new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(total)}</span>
                  </div>
                </div>

                {/* Primary Button action triggers */}
                <div>
                  {checkoutStep === "cart" && (
                    <button
                      id="cart-proceed-checkout"
                      onClick={() => setCheckoutStep("form")}
                      className="w-full bg-skincare-text hover:bg-skincare-gold text-white font-sans py-4 text-xs tracking-[0.25em] font-semibold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 rounded-full cursor-pointer shadow-md hover:shadow-xl active:scale-99 hover:-translate-y-0.5"
                    >
                      PROCEED TO SECURE CHECKOUT
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}

                  {checkoutStep === "form" && (
                    <div className="flex gap-3">
                      <button
                        id="checkout-cancel"
                        onClick={() => setCheckoutStep("cart")}
                        className="w-1/3 border border-skincare-text text-skincare-text hover:bg-skincare-text hover:text-white py-4 text-[10px] tracking-widest font-semibold uppercase transition-all rounded-full cursor-pointer text-center bg-white"
                      >
                        BACK
                      </button>
                      
                      <button
                        id="checkout-pay"
                        onClick={handleCheckoutSubmit}
                        disabled={submittingCheckout}
                        className="flex-1 bg-skincare-gold hover:bg-skincare-text text-white font-sans py-4 text-xs tracking-[0.2em] font-semibold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 rounded-full cursor-pointer shadow-md hover:shadow-xl disabled:opacity-50"
                      >
                        {submittingCheckout ? (
                          <span className="flex items-center gap-1">
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            VAULTING...
                          </span>
                        ) : (
                          "APPROVE DEPOSIT"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Completed Close footer button */}
            {checkoutStep === "completed" && (
              <div className="p-6 border-t border-skincare-text/10 bg-skincare-cream/20 shrink-0">
                <button
                  id="checkout-finished-btn"
                  onClick={handleCompletedFinished}
                  className="w-full bg-skincare-text hover:bg-skincare-gold text-white py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all rounded-full shadow-md flex items-center justify-center cursor-pointer hover:-translate-y-0.5 duration-300"
                >
                  RETURN TO HOME
                </button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
