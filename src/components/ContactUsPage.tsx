/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Check, 
  Sparkles, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactUsPageProps {
  onNavigateTo: (page: "home" | "products" | "cart" | "about" | "contact") => void;
}

interface FaqItem {
  question: string;
  answer: string;
}

export default function ContactUsPage({ onNavigateTo }: ContactUsPageProps) {
  // Inquiry Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skinConcern, setSkinConcern] = useState("Dryness & Loss of Firmness");
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("Product Usage Query");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Faq Accordion states
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "What exactly is the signature Elixir 'Tsuyadama' effect?",
      answer: "The 'Tsuyadama' (often translated as the Pearl Luster) is the inner healthy radiance that forms naturally on the cheeks when the stratum corneum contains optimized moisture levels and dense collagen fibers. It captures and reflects ambient light cleanly. Elixir is formulated to preserve and stimulate this unique biological phenomenon."
    },
    {
      question: "Are Shiseido Elixir products suitable for active sensitive skin membranes?",
      answer: "Yes. All Elixir formulations undergo rigorous multi-phase hypoallergenic testing and dermal compliance diagnostics at our main Tokyo laboratory. If you have particularly sensitive or depleted tissue walls, we suggest utilizing our calming Elixir Superieur moisture series."
    },
    {
      question: "How can I sample a specific formulation before purchasing full sizes?",
      answer: "We offer custom sample vials with all purchases over JPY 7,500. Additionally, you can book an in-person, 15-minute scientific skin mapping diagnostic at our flagship counters in Tokyo (such as Ginza or Shinjuku) where active therapists supply a regimen-matched travel kit."
    },
    {
      question: "Do you offer international shipping or localized custom clearance?",
      answer: "Currently, our website services delivery directly throughout Japan. Overseas clients can acquire localized certified support and shipping options via their respective domestic boutique departments or Ginza export desks."
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    
    // Simulate server side log recording
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <div id="contact-page-root" className="bg-[#FAF8F5] min-h-screen pt-24 pb-24 font-sans text-skincare-text">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Navigation Breadcrumbs */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <button
            id="contact-back-btn"
            onClick={() => onNavigateTo("home")}
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#8E7F70] hover:text-skincare-gold transition-colors duration-300 uppercase cursor-pointer py-1 focus:outline-none"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            BACK TO SCIENTIFIC DIRECTORY
          </button>

          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#8E7F70]/70 uppercase">
            <span className="cursor-pointer hover:text-skincare-gold" onClick={() => onNavigateTo("home")}>ELIXIR HOME</span>
            <span>/</span>
            <span className="text-skincare-gold font-semibold uppercase">CONTACT LABS</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="max-w-xl mb-16 space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-skincare-gold uppercase font-bold block">EXPERIENTIAL INQUIRIES</span>
          <h1 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight">
            Consult Our Skincare Specialists
          </h1>
          <p className="text-xs text-skincare-text/85 leading-relaxed font-sans">
            Have queries regarding clinical application, collagen science peptide complexes, or boutique reservations? Our Ginza client support desk and Tokyo research division are standing by to guide your skincare regimen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* LEFT COLUMN: Contact Bio Ledger Information Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-skincare-text/10 rounded-2xl p-6 md:p-8 space-y-8 shadow-3xs">
              
              <div className="border-b border-skincare-text/5 pb-4">
                <h4 className="font-serif text-base font-semibold text-skincare-text uppercase tracking-wider text-xs">Flagship Division Address</h4>
                <p className="text-xs text-skincare-text/60 mt-1 font-mono">GINZA TOKYO OFFICES</p>
              </div>

              <div className="space-y-6">
                
                {/* Office Address Location */}
                <div className="flex items-start gap-4 text-xs text-skincare-text/80">
                  <div className="h-8 w-8 rounded-full bg-skincare-cream border border-[#EADBC8]/40 flex items-center justify-center shrink-0 text-skincare-gold">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-skincare-text mb-1 font-serif text-[13px]">Main Headquarters</h5>
                    <p className="leading-relaxed">Shiseido Elixir Division, Landmark Bldg<br />7-chome, Ginza, Chuo-ku, Tokyo 104-0061</p>
                  </div>
                </div>

                {/* Telephone Directory Contacts */}
                <div className="flex items-start gap-4 text-xs text-skincare-text/80">
                  <div className="h-8 w-8 rounded-full bg-skincare-cream border border-[#EADBC8]/40 flex items-center justify-center shrink-0 text-skincare-gold">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-skincare-text mb-1 font-serif text-[13px]">Boutique Support Hotline</h5>
                    <p className="font-mono text-skincare-text leading-tight text-sm font-semibold">0120-770-933</p>
                    <p className="text-[10px] text-stone-400 mt-1">Toll-free inside JP (Weekdays 9:30 AM - 5:00 PM)</p>
                  </div>
                </div>

                {/* Secure Email Support */}
                <div className="flex items-start gap-4 text-xs text-skincare-text/80">
                  <div className="h-8 w-8 rounded-full bg-skincare-cream border border-[#EADBC8]/40 flex items-center justify-center shrink-0 text-skincare-gold">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-skincare-text mb-1 font-serif text-[13px]">Scientific Mail</h5>
                    <p className="font-mono text-skincare-gold hover:underline underline-offset-4 font-medium text-sm">support@elixir.jp</p>
                    <p className="text-[10px] text-stone-400 mt-1">Our chemists reply to dermal logs within 24 hours.</p>
                  </div>
                </div>

                {/* Flagship Hours */}
                <div className="flex items-start gap-4 text-xs text-skincare-text/80">
                  <div className="h-8 w-8 rounded-full bg-skincare-cream border border-[#EADBC8]/40 flex items-center justify-center shrink-0 text-skincare-gold">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-skincare-text mb-1 font-serif text-[13px]">Office Operational Times</h5>
                    <p className="leading-relaxed font-mono">Mon – Fri: 09:30 – 17:00 JST<br />Weekend: Selected counters open for consultations</p>
                  </div>
                </div>

              </div>

              {/* Aesthetic trust signature card */}
              <div className="border-t border-skincare-text/5 pt-6 bg-[#FAF8F5] -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 rounded-b-2xl space-y-1.5 text-xs text-skincare-bronze leading-relaxed font-sans">
                <strong>Ginza Reservations:</strong> Booking high-pressure skin map diagnostics requires presenting your certified customer log ID at our flagship counter or submitting the concierge form.
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form with State Management UI */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-skincare-gold/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
              <div className="border-b border-skincare-text/5 pb-4 flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-serif text-lg font-light text-skincare-text">Dermal Inquiry Registry</h3>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-[#8E7F70]">Submit Secure Experience Logs</p>
                </div>
                <MessageSquare className="h-5 w-5 text-skincare-gold" />
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-xl space-y-4"
                  >
                    <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                      <Check className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-base font-semibold text-emerald-950">Inquiry Ledger Created!</h4>
                      <p className="text-xs text-emerald-800 leading-relaxed font-sans max-w-sm mx-auto">
                        Your clinical inquiry has been successfully transmitted to our Tokyo laboratory division. Our skincare therapists will evaluate your concerns and reply via email within one business day.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-xs font-mono text-emerald-950 underline underline-offset-4 uppercase tracking-wider font-semibold hover:text-emerald-700 cursor-pointer"
                    >
                      Submit Another Record
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleFormSubmit} 
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Your Identifier / Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-skincare-text/15 focus:border-skincare-gold rounded-full px-4 py-3.5 text-xs outline-none transition-all"
                          placeholder="Airi Sato"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Your Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-skincare-text/15 focus:border-skincare-gold rounded-full px-4 py-3.5 text-xs outline-none transition-all"
                          placeholder="airi.sato@gmail.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Topic Category Selection */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Inquiry Topic Category</label>
                        <select
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-skincare-text/15 focus:border-skincare-gold rounded-full px-4 py-3 text-xs outline-none cursor-pointer"
                        >
                          <option>Product Usage Query</option>
                          <option>Custom Regimen Matching</option>
                          <option>Flagship Boutique Booking</option>
                          <option>Order Delivery Diagnostics</option>
                          <option>Allergy Concerns Ledger</option>
                        </select>
                      </div>

                      {/* Primary Skin Concern Category */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Current Skin Concern Profile</label>
                        <select
                          value={skinConcern}
                          onChange={(e) => setSkinConcern(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-skincare-text/15 focus:border-skincare-gold rounded-full px-4 py-3 text-xs outline-none cursor-pointer"
                        >
                          <option>Dryness & Loss of Firmness</option>
                          <option>Microscopic Texture Dullness</option>
                          <option>Pore Elasticity Breakdown</option>
                          <option>Sensitive Membrane Reactivity</option>
                          <option>Fine Luster Maintenance</option>
                        </select>
                      </div>
                    </div>

                    {/* Detailed experiential message input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-skincare-bronze font-bold">Explain Dermal Concerns or Support Goal *</label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-skincare-text/15 focus:border-skincare-gold rounded-2xl px-4 py-3.5 text-xs outline-none transition-all"
                        placeholder="Detail the specific questions regarding Elixir sunscreens, emulsion textures, or list the routine you are seeking support balancing today..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-skincare-text hover:bg-skincare-gold text-white font-sans text-xs tracking-[0.2em] font-semibold uppercase py-4 rounded-full cursor-pointer transition-all hover:shadow-md flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />
                          RECORDING LEDGER ENTRIES...
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          TRANSMIT EXPERIENTIAL INQUIRY
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* COLLAPSIBLE ACCORDION FAQ SECTION */}
        <div className="border-t border-skincare-text/10 pt-16" id="faq-accordions-section">
          <div className="space-y-2 mb-10 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono tracking-widest text-skincare-gold uppercase font-bold block flex items-center justify-center gap-1">
              <HelpCircle className="h-3.5 w-3.5" /> RECURRENT TOPICAL ARCHIVE
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light">Skincare Knowledge Database</h2>
            <p className="text-xs text-skincare-text/60 leading-relaxed font-sans text-balance">
              Find instant responses to verified inquiries handled by our central clinical registry.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-skincare-text/10 rounded-2xl overflow-hidden shadow-3xs transition-all relative"
                >
                  <button
                    id={`faq-trigger-${idx}`}
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-6 flex justify-between items-center gap-5 cursor-pointer focus:outline-none focus:bg-skincare-cream/10"
                  >
                    <span className="font-serif text-sm font-semibold text-skincare-text tracking-tight flex items-center gap-3">
                      <span className="text-[10px] font-mono text-skincare-gold/50 font-bold">0{idx + 1}</span>
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-skincare-gold shrink-0 transition-transform" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#8E7F70] shrink-0 transition-transform" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`content-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-skincare-text/5 bg-[#FAF8F5]/45"
                      >
                        <div className="p-6 text-xs text-skincare-text/80 leading-relaxed font-sans text-balance">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
