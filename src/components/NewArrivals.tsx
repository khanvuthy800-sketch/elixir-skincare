/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plus, Eye, Star } from "lucide-react";
import { PRODUCTS } from "../data";
import { Product } from "../types";
import { motion } from "motion/react";

interface NewArrivalsProps {
  onAddProductToCart: (product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
  onCategoryFilterClick: () => void;
}

export default function NewArrivals({
  onAddProductToCart,
  onOpenProductDetail,
  onCategoryFilterClick
}: NewArrivalsProps) {
  // Let's filter or focus on the three featured items first in products, but can show all
  const mainProducts = PRODUCTS.slice(0, 3); // Day Care Revolution, The Serum, Total V Cream
  const secondaryProducts = PRODUCTS.slice(3); // Toner, Mask, etc.

  return (
    <section id="products-section" className="bg-skincare-cream py-20 lg:py-28 border-y border-skincare-text/10 shadow-xs">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-14 flex items-end justify-between border-b border-skincare-text/10 pb-5">
          <div className="flex flex-col space-y-2">
            <span className="text-[10px] font-sans tracking-[0.25em] font-medium uppercase text-skincare-bronze">
              CURATED INNOVATIONS
            </span>
            <h2 className="font-serif text-3xl font-light text-skincare-text">
              New Arrivals
            </h2>
          </div>
          <button
            id="view-all-products-btn"
            onClick={onCategoryFilterClick}
            className="group flex items-center space-x-1.5 text-xs font-sans tracking-[0.1em] uppercase text-skincare-text hover:text-skincare-gold transition-colors duration-300 cursor-pointer"
          >
            <span>View All Products</span>
            <span className="block h-[1px] w-5 bg-skincare-text transition-all duration-300 group-hover:w-8 group-hover:bg-skincare-gold" />
          </button>
        </div>

        {/* Featured 3 Products Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mainProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              key={product.id}
              className="group relative flex flex-col justify-between bg-white border border-skincare-text/10 p-5 rounded-xl shadow-xs hover:shadow-md transition-all duration-500 hover:-translate-y-1"
            >
              {/* Product Card Image Container */}
              <div
                onClick={() => onOpenProductDetail(product)}
                className="relative aspect-4/5 w-full bg-skincare-mist overflow-hidden mb-6 cursor-pointer rounded-md"
              >
                {/* Custom Brand Tag */}
                {product.tag && (
                  <span className="absolute top-4 left-4 z-20 bg-skincare-text text-skincare-cream text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 shadow-sm rounded-full">
                    {product.tag}
                  </span>
                )}

                {/* Overlaid Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />

                {/* Quick view overlay card */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/95 backdrop-blur-sm tracking-[0.15em] text-xs uppercase text-skincare-text px-5 py-2.5 shadow-lg border border-skincare-text/10 flex items-center gap-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 rounded-full">
                    <Eye className="h-3.5 w-3.5" />
                    Quick View
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-1">
                {/* Category tag */}
                <span className="text-[9px] font-sans tracking-[0.2em] font-medium text-skincare-gold uppercase mb-1">
                  {product.category}
                </span>

                {/* Name */}
                <h3
                  onClick={() => onOpenProductDetail(product)}
                  className="font-serif text-lg font-light text-skincare-text hover:text-skincare-gold cursor-pointer transition-colors"
                >
                  {product.name}
                </h3>

                {/* Rating summary */}
                <div className="flex items-center space-x-1.5 mt-2 mb-3">
                  <div className="flex text-skincare-gold">
                    <Star className="h-3 w-3 fill-current" />
                  </div>
                  <span className="text-[10px] text-skincare-text/80 font-mono">
                    {product.rating} ({product.reviewsCount} reviews)
                  </span>
                </div>

                {/* Brief description */}
                <p className="text-xs text-skincare-text/75 font-sans font-light leading-relaxed mb-4 line-clamp-2">
                  {product.briefDescription}
                </p>

                {/* Price */}
                <p className="text-sm font-mono tracking-wider text-skincare-text font-semibold mb-6">
                  {new Intl.NumberFormat("ja-JP", {
                    style: "currency",
                    currency: "JPY"
                  }).format(product.price)}
                </p>
              </div>

              {/* Add to Bag Button */}
              <button
                id={`add-to-bag-${product.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddProductToCart(product);
                }}
                className="w-full border border-skincare-text bg-transparent hover:bg-skincare-text hover:text-skincare-cream py-3 text-[10px] font-sans tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer rounded-full"
              >
                <Plus className="h-3.5 w-3.5" />
                ADD TO BAG
              </button>
            </motion.div>
          ))}
        </div>

        {/* Expandable Catalog Row */}
        <div className="mt-16 pt-12 border-t border-skincare-text/10">
          <div className="text-center mb-8">
            <h4 className="font-serif text-sm font-light tracking-widest text-skincare-text uppercase bg-white/75 py-2.5 px-6 inline-block mx-auto border border-skincare-text/10 rounded-full shadow-xs">
              Complimentary Hydration Companions
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
            {secondaryProducts.map((product) => (
              <div
                onClick={() => onOpenProductDetail(product)}
                key={product.id}
                className="flex flex-col sm:flex-row items-stretch bg-white border border-skincare-text/10 p-4 rounded-xl shadow-xs hover:shadow-sm cursor-pointer hover:border-skincare-gold/30 transition-all duration-300 group"
              >
                <div className="w-full sm:w-28 h-36 bg-skincare-mist overflow-hidden rounded-md relative shrink-0 mb-4 sm:mb-0 border border-skincare-text/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                </div>
                <div className="sm:pl-5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[8px] font-mono tracking-widest text-skincare-bronze uppercase block mb-1">
                      {product.category}
                    </span>
                    <h5 className="font-serif text-base font-light text-skincare-text mt-1 group-hover:text-skincare-gold transition-colors duration-300">
                      {product.name}
                    </h5>
                    <p className="text-[11px] text-skincare-text/75 font-sans font-light mt-1.5 line-clamp-2">
                       {product.briefDescription}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-skincare-text/10">
                    <span className="text-xs font-mono font-medium text-skincare-text">
                      {new Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY"
                      }).format(product.price)}
                    </span>
                    <button
                      id={`add-secondary-bag-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddProductToCart(product);
                      }}
                      className="text-[9px] font-mono tracking-widest font-semibold uppercase text-skincare-gold hover:text-skincare-text flex items-center gap-1 transition-colors underline underline-offset-4"
                    >
                      <Plus className="h-3 w-3" />
                      Quick Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
