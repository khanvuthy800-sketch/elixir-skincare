/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { QUIZ_QUESTIONS, QUIZ_RESULTS, PRODUCTS } from "../data";
import { Product } from "../types";
import {
  Droplets,
  Sparkles,
  Heart,
  CheckCircle,
  TrendingUp,
  Sun,
  Smile,
  Eye,
  Layers,
  Feather,
  ArrowLeft,
  RotateCcw,
  Check,
  ShoppingBag,
  Loader2,
  Bookmark
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SkinConciergeProps {
  onAddProductToCart: (product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
}

export default function SkinConcierge({
  onAddProductToCart,
  onOpenProductDetail
}: SkinConciergeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({
    skinType: "",
    concern: "",
    texture: ""
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultRegimen, setResultRegimen] = useState<any | null>(null);

  // Dynamic icon mapper helper
  const renderIcon = (name: string, active: boolean) => {
    const classStr = `h-5 w-5 ${active ? "text-white" : "text-skincare-gold"}`;
    switch (name) {
      case "Droplets":
        return <Droplets className={classStr} />;
      case "Sparkles":
        return <Sparkles className={classStr} />;
      case "Heart":
        return <Heart className={classStr} />;
      case "CheckCircle":
        return <CheckCircle className={classStr} />;
      case "TrendingUp":
        return <TrendingUp className={classStr} />;
      case "Sun":
        return <Sun className={classStr} />;
      case "Smile":
        return <Smile className={classStr} />;
      case "Eye":
        return <Eye className={classStr} />;
      case "Layers":
        return <Layers className={classStr} />;
      case "Feather":
        return <Feather className={classStr} />;
      default:
        return <Sparkles className={classStr} />;
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    const key = QUIZ_QUESTIONS[currentStep].key;
    const updatedAnswers = { ...answers, [key]: optionValue };
    setAnswers(updatedAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      // Proceed of course
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate Results with elegant loading screen simulation!
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        // Determine recommended regimen based on concern
        const selectedConcern = updatedAnswers.concern;
        let matchedResult = QUIZ_RESULTS[0]; // Default: Premium Sculpt

        if (selectedConcern === "spots" || selectedConcern === "dullness") {
          matchedResult = QUIZ_RESULTS[1]; // Radiance & Active
        } else if (selectedConcern === "dehydration" || updatedAnswers.skinType === "sensitive") {
          matchedResult = QUIZ_RESULTS[2]; // Intense Moisture Barrier Cure
        }
        setResultRegimen(matchedResult);
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setAnswers({ skinType: "", concern: "", texture: "" });
    setCurrentStep(0);
    setResultRegimen(null);
  };

  const getProgressPercent = () => {
    return ((currentStep + (resultRegimen ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;
  };

  return (
    <section id="quiz-section" className="bg-skincare-cream py-20 lg:py-28 relative border-b border-skincare-text/5">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Title container */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="text-[10px] font-sans tracking-[0.25em] font-medium uppercase text-skincare-bronze">
            INTELLIGENT SKIN CONCIERGE
          </span>
          <h2 className="font-serif text-3xl font-light text-skincare-text sm:text-4xl mt-2">
            The Radiance Advisor
          </h2>
          <p className="mt-3 text-xs md:text-sm font-sans font-light leading-relaxed text-skincare-text/85">
            Take our bespoke 3-step Tsuyadama diagnostic quiz to discover the perfect molecular collagen routine for your skin's unique cellular needs.
          </p>
        </div>

        {/* Progress gauge bar */}
        {!resultRegimen && !isAnalyzing && (
          <div className="max-w-md mx-auto mb-10">
            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-[#BCA374] mb-2 px-1">
              <span>Diagnostic Phase</span>
              <span>
                Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </span>
            </div>
            <div className="h-1 w-full bg-skincare-clay rounded-full overflow-hidden">
              <motion.div
                layout
                className="h-full bg-skincare-gold"
                style={{ width: `${getProgressPercent()}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        <div className="bg-white border border-skincare-text/10 p-8 md:p-14 shadow-sm rounded-2xl min-h-[460px] flex flex-col justify-between relative overflow-hidden">
          
          {/* Decorative stamp backing */}
          <div className="absolute -top-8 -right-8 text-skincare-cream/15 select-none pointer-events-none text-9xl font-serif">
            1983
          </div>

          <AnimatePresence mode="wait">
            {/* 1. Loader stage */}
            {isAnalyzing && (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center py-16 text-center space-y-5"
              >
                <Loader2 className="h-10 w-10 text-skincare-gold animate-spin" />
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-light text-skincare-text uppercase tracking-widest">
                    Analyzing Cellular Parameters...
                  </h3>
                  <p className="text-xs font-mono text-skincare-text/60 tracking-wider">
                    CALCULATING OPTIMAL TSUYADAMA REFLECTIONS
                  </p>
                </div>
                <p className="text-xs text-skincare-text/70 font-sans font-light max-w-sm">
                  Matching your skin barrier, target concern, and texture preference with forty years of Tokyo laboratory collagen data.
                </p>
              </motion.div>
            )}

            {/* 2. Result state */}
            {resultRegimen && !isAnalyzing && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8 flex-1 flex flex-col justify-between"
              >
                {/* Result header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-skincare-text/10 pb-6 gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 bg-skincare-cream px-4 py-1.5 border border-skincare-text/10 text-[9px] font-mono tracking-widest text-skincare-gold uppercase rounded-full">
                      <Bookmark className="h-3 w-3" />
                      YOUR TAILORED REGIMEN
                    </div>
                    <h3 className="font-serif text-3xl font-light text-skincare-text">
                      {resultRegimen.regimenName}
                    </h3>
                    <p className="text-xs font-sans font-light italic text-skincare-bronze">
                      {resultRegimen.tagline}
                    </p>
                  </div>

                  <button
                    id="quiz-retry-btn"
                    onClick={handleReset}
                    className="flex items-center space-x-1.5 text-xs text-skincare-text hover:text-skincare-cream border border-skincare-text hover:bg-skincare-text px-5 py-2 rounded-full transition-colors shrink-0 cursor-pointer self-start md:self-auto uppercase tracking-wider font-mono"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Diagnostics</span>
                  </button>
                </div>

                {/* Regimen detailed breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-2">
                  
                  {/* Left explanation and products */}
                  <div className="md:col-span-7 space-y-6">
                    <p className="text-xs md:text-sm font-sans font-light leading-relaxed text-skincare-text/90">
                      {resultRegimen.explanation}
                    </p>

                    <div>
                      <h4 className="font-serif text-base font-light text-skincare-text mb-4">
                        Regimen Products Lineup:
                      </h4>
                      
                      <div className="space-y-4">
                        {PRODUCTS.filter((p) =>
                          resultRegimen.recommendedProductIds.includes(p.id)
                        ).map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center bg-skincare-cream/55 border border-skincare-text/10 hover:border-skincare-gold/30 p-3 rounded-xl shadow-xs hover:shadow-sm"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              referrerPolicy="no-referrer"
                              className="h-14 w-12 object-cover shrink-0 rounded-md border border-skincare-text/10 cursor-pointer"
                              onClick={() => onOpenProductDetail(product)}
                            />
                            <div className="pl-4 flex-1">
                              <span className="text-[8px] font-sans tracking-widest text-skincare-bronze uppercase">
                                {product.category}
                              </span>
                              <h5
                                onClick={() => onOpenProductDetail(product)}
                                className="font-serif text-xs font-medium text-skincare-text hover:text-skincare-gold cursor-pointer leading-tight mt-0.5"
                              >
                                {product.name}
                              </h5>
                              <p className="text-[10px] font-mono text-skincare-text/75 mt-0.5">
                                {new Intl.NumberFormat("ja-JP", {
                                  style: "currency",
                                  currency: "JPY"
                                }).format(product.price)}
                              </p>
                            </div>

                            <button
                              id={`quiz-add-to-bag-${product.id}`}
                              onClick={() => onAddProductToCart(product)}
                              className="bg-white hover:bg-skincare-text border border-skincare-text/10 hover:border-skincare-text p-2 hover:text-white transition-all duration-300 rounded-full cursor-pointer shadow-xs"
                              title="Add to bag"
                            >
                              <ShoppingBag className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Step-by-Step schedule */}
                  <div className="md:col-span-5 bg-skincare-cream/50 p-6 rounded-2xl border border-skincare-text/10 space-y-6">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-skincare-bronze uppercase font-semibold">
                        AM / MORNING CLINICAL STEPS
                      </span>
                      <div className="mt-3 space-y-2">
                        {resultRegimen.morningSteps.map((step: string, idx: number) => (
                          <div key={idx} className="flex items-start space-x-2 text-[11px] leading-relaxed text-skincare-text/85">
                            <span className="font-mono text-skincare-gold font-bold">0{idx + 1}.</span>
                            <p>{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-skincare-text/10 pt-5">
                      <span className="text-[9px] font-mono tracking-widest text-skincare-bronze uppercase font-semibold">
                        PM / EVENING CLINICAL STEPS
                      </span>
                      <div className="mt-3 space-y-2">
                        {resultRegimen.eveningSteps.map((step: string, idx: number) => (
                          <div key={idx} className="flex items-start space-x-2 text-[11px] leading-relaxed text-skincare-text/85">
                            <span className="font-mono text-skincare-gold font-bold">0{idx + 1}.</span>
                            <p>{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* 3. Operational Questionnaire Steps */}
            {!resultRegimen && !isAnalyzing && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Step Metadata & back button */}
                  <div className="flex items-center space-x-3 mb-5">
                    {currentStep > 0 && (
                      <button
                        id="quiz-back-btn"
                        onClick={handleBack}
                        className="p-1.5 rounded-full border border-skincare-text/10 bg-white hover:border-skincare-gold text-skincare-text/75 hover:text-skincare-gold transition-colors cursor-pointer mr-1"
                        aria-label="Back"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                    )}
                    <span className="text-[10px] font-mono tracking-widest text-skincare-gold uppercase font-bold">
                      ASSESSMENT PHASE {currentStep + 1}
                    </span>
                  </div>

                  {/* Question */}
                  <h3 className="font-serif text-2xl font-light text-skincare-text mb-2 leading-snug">
                    {QUIZ_QUESTIONS[currentStep].question}
                  </h3>
                  
                  <p className="text-xs text-skincare-text/70 mb-8 max-w-lg font-sans font-light leading-relaxed">
                    {QUIZ_QUESTIONS[currentStep].description}
                  </p>

                  {/* Render Options list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {QUIZ_QUESTIONS[currentStep].options.map((option) => {
                      const key = QUIZ_QUESTIONS[currentStep].key;
                      const isSelected = answers[key] === option.value;
                      return (
                        <button
                          id={`quiz-option-${option.value}`}
                          key={option.value}
                          onClick={() => handleOptionSelect(option.value)}
                          className={`flex items-start p-4 text-left border rounded-xl transition-all pointer-events-auto cursor-pointer group ${
                            isSelected
                              ? "bg-skincare-cream border-skincare-gold shadow-xs"
                              : "bg-white border-skincare-text/10 hover:border-skincare-gold/30 hover:translate-x-0.5"
                          }`}
                        >
                          {/* Left icon wrapper */}
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 mr-4 transition-colors ${
                              isSelected
                                ? "bg-skincare-gold text-white"
                                : "bg-skincare-clay text-skincare-gold group-hover:bg-skincare-gold/10"
                            }`}
                          >
                            {renderIcon(option.icon, isSelected)}
                          </div>

                          {/* Text description */}
                          <div className="space-y-1">
                            <span className="block text-sm font-sans font-medium text-skincare-text group-hover:text-skincare-gold transition-colors">
                              {option.label}
                            </span>
                            <span className="block text-[11px] leading-relaxed text-skincare-text/70 font-sans font-light">
                              {option.detail}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="text-[10px] text-skincare-text/40 font-mono tracking-widest uppercase border-t border-[#FAF8F5]/40 pt-4 mt-8 flex justify-between">
                  <span>Meticulously Custom Refined</span>
                  <span>Authentic Pearl Formulation</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
