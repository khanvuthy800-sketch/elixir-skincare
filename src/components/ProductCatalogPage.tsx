/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  Eye, 
  Plus, 
  RotateCcw, 
  ArrowLeft, 
  Store, 
  Tag, 
  Grid, 
  List, 
  Compass, 
  Sparkles,
  ShoppingBag
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductCatalogPageProps {
  onBackToHome: () => void;
  onAddProductToCart: (product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
}

type SortType = "recommended" | "price-asc" | "price-desc" | "rating-desc";

export default function ProductCatalogPage({
  onBackToHome,
  onAddProductToCart,
  onOpenProductDetail
}: ProductCatalogPageProps) {
  // Filters States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedBranch, setSelectedBranch] = useState<string>("ALL");
  const [selectedStore, setSelectedStore] = useState<string>("ALL");
  const [selectedSort, setSelectedSort] = useState<SortType>("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extract unique categories
  const categories = useMemo(() => {
    const list = new Set(PRODUCTS.map(p => p.category));
    return ["ALL", ...Array.from(list)];
  }, []);

  // Extract unique series lines (branches of the brand)
  const brandBranches = useMemo(() => {
    const list = new Set(PRODUCTS.map(p => p.branch).filter(Boolean) as string[]);
    return ["ALL", ...Array.from(list)];
  }, []);

  // Extract unique physical store branch availabilities
  const storeBranches = useMemo(() => {
    const list = new Set<string>();
    PRODUCTS.forEach(p => {
      if (p.stores) {
        p.stores.forEach(s => list.add(s));
      }
    });
    return ["ALL", ...Array.from(list)];
  }, []);

  // Reset all filters easily
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setSelectedBranch("ALL");
    setSelectedStore("ALL");
    setSelectedSort("recommended");
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query match
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.briefDescription.toLowerCase().includes(query) ||
        (p.branch && p.branch.toLowerCase().includes(query)) ||
        p.ingredients.some(ing => ing.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== "ALL") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Branch filter (Brand line Series)
    if (selectedBranch !== "ALL") {
      result = result.filter(p => p.branch === selectedBranch);
    }

    // Store branch filter
    if (selectedStore !== "ALL") {
      result = result.filter(p => p.stores && p.stores.includes(selectedStore));
    }

    // Sort evaluation
    if (selectedSort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "rating-desc") {
      result.sort((a, b) => b.rating - a.rating);
    } // recommended keeps raw data order

    return result;
  }, [searchQuery, selectedCategory, selectedBranch, selectedStore, selectedSort]);

  // Compute active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "ALL") count++;
    if (selectedBranch !== "ALL") count++;
    if (selectedStore !== "ALL") count++;
    if (searchQuery.trim() !== "") count++;
    return count;
  }, [selectedCategory, selectedBranch, selectedStore, searchQuery]);

  return (
    <div id="product-catalog-root" className="bg-[#FAF8F5] min-h-screen pt-24 pb-20 font-sans">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Navigation Breadcrumb & Back Bar */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <button
            id="catalog-back-home"
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#8E7F70] hover:text-skincare-gold transition-colors duration-300 uppercase cursor-pointer py-1.5 focus:outline-none"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            BACK TO HOMEPAGE
          </button>

          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-skincare-bronze/70">
            <span>ELIXIR TOKYO</span>
            <span>/</span>
            <span>COLLECTION ARCHIVE</span>
            {selectedCategory !== "ALL" && (
              <>
                <span>/</span>
                <span className="text-skincare-gold font-semibold uppercase">{selectedCategory}</span>
              </>
            )}
          </div>
        </div>

        {/* Hero Header Segment */}
        <div className="mb-12 border-b border-skincare-text/10 pb-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-skincare-cream border border-skincare-text/5 px-3 py-1 rounded-full text-skincare-gold shadow-xs">
              <Compass className="h-3.5 w-3.5 animate-spin-slow" />
              <span className="text-[9px] font-mono tracking-widest uppercase font-semibold">Scientific Formula Directory</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-skincare-text tracking-wide leading-tight">
              The Product Archive
            </h1>
            <p className="text-xs md:text-sm font-sans font-light text-skincare-text/75 leading-relaxed">
              Explore Shiseido Elixir's core clinical lines. Calibrated with concentrated marine collagen matrices, targeted light-anchoring peptides, and deep botanical boosters, customized to unveil the timeless Pearl Glow (Tsuyadama) of cheek structure.
            </p>
          </div>
        </div>

        {/* Dual Filtering and Searching Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* LEFT COLUMN: Sidebar Filters panel */}
          <div className="lg:col-span-1 bg-white border border-skincare-text/10 p-6 rounded-2xl shadow-xs space-y-8 sticky top-24">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-skincare-text/10 pb-4">
              <span className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-skincare-text font-bold">
                <SlidersHorizontal className="h-4 w-4 text-skincare-gold" />
                FILTERS {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </span>
              {activeFiltersCount > 0 && (
                <button
                  id="reset-all-filters-btn"
                  onClick={handleResetFilters}
                  className="text-[10px] font-mono text-skincare-gold hover:text-skincare-text underline underline-offset-4 cursor-pointer flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  CLEAR ALL
                </button>
              )}
            </div>

            {/* LIVE SEARCH INPUT */}
            <div className="space-y-2.5">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-[#8E7F70]">
                Search Formula
              </label>
              <div className="relative">
                <input
                  id="catalog-search-inline"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Collagen, Serum, Cream..."
                  className="w-full bg-[#FAF8F5] border border-skincare-text/10 focus:border-skincare-gold rounded-full pl-9 pr-4 py-2.5 text-xs text-skincare-text outline-none focus:ring-1 focus:ring-skincare-gold transition-all"
                />
                <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-skincare-text/40" />
              </div>
            </div>

            {/* BRAND BRANCH (SERIES LINE) FILTER */}
            <div className="space-y-3">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-skincare-gold font-bold flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" />
                Brand Series Line
              </span>
              <div className="flex flex-col space-y-1.5">
                {brandBranches.map((branch) => (
                  <button
                    id={`filter-branch-${branch.toLowerCase().replace(/\s+/g, '-')}`}
                    key={branch}
                    onClick={() => setSelectedBranch(branch)}
                    className={`text-left text-xs py-2 px-3.5 rounded-full font-sans transition-all cursor-pointer flex items-center justify-between ${
                      selectedBranch === branch
                        ? "bg-skincare-text text-white font-medium shadow-sm"
                        : "bg-transparent text-skincare-text/80 hover:bg-skincare-cream"
                    }`}
                  >
                    <span>{branch === "ALL" ? "All Series Collections" : branch}</span>
                    {selectedBranch === branch && (
                      <span className="h-1.5 w-1.5 rounded-full bg-skincare-gold animate-ping" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* SKINCARE CATEGORY FILTER */}
            <div className="space-y-3">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-skincare-gold font-bold flex items-center gap-1">
                <Grid className="h-3.5 w-3.5" />
                Skin Application
              </span>
              <div className="flex flex-col space-y-1.5">
                {categories.map((cat) => (
                  <button
                    id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-xs py-2 px-3.5 rounded-full font-sans transition-all cursor-pointer flex items-center justify-between ${
                      selectedCategory === cat
                        ? "bg-skincare-text text-white font-medium shadow-sm"
                        : "bg-transparent text-skincare-text/80 hover:bg-skincare-cream"
                    }`}
                  >
                    <span className="capitalize">{cat === "ALL" ? "All Applications" : cat.toLowerCase()}</span>
                    {selectedCategory === cat && (
                      <span className="h-1.5 w-1.5 rounded-full bg-skincare-gold" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* PHYSICAL STORE BRANCH FILTER */}
            <div className="space-y-3">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-skincare-gold font-bold flex items-center gap-1">
                <Store className="h-3.5 w-3.5" />
                Store Availability
              </span>
              <div className="flex flex-col space-y-1.5">
                {storeBranches.map((store) => (
                  <button
                    id={`filter-store-${store.toLowerCase().replace(/[^\w]/g, '-')}`}
                    key={store}
                    onClick={() => setSelectedStore(store)}
                    className={`text-left text-xs py-2 px-3.5 rounded-full font-sans transition-all cursor-pointer flex items-center justify-between ${
                      selectedStore === store
                        ? "bg-skincare-text text-white font-medium shadow-sm"
                        : "bg-transparent text-skincare-text/80 hover:bg-skincare-cream"
                    }`}
                  >
                    <span>{store === "ALL" ? "All Physical Outlets" : store}</span>
                    {selectedStore === store && (
                      <span className="h-1.5 w-1.5 rounded-full bg-skincare-gold" />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Grid listings and sorters */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Bar for Results summary, View mode and Sorter */}
            <div className="bg-white border border-skincare-text/10 p-4 rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-xs text-skincare-text/75 font-sans">
                Showing <strong className="text-skincare-text font-serif text-sm font-medium">{filteredProducts.length}</strong> matching premium formulations
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 self-end sm:self-auto">
                
                {/* Sort selector dropdown overlay style */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-skincare-bronze">SORT:</span>
                  <select
                    id="catalog-sort"
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value as SortType)}
                    className="bg-[#FAF8F5] border border-skincare-text/10 rounded-full px-3 py-1.5 text-xs text-skincare-text outline-none cursor-pointer focus:border-skincare-gold"
                  >
                    <option value="recommended">Recommended Base</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating: Highest First</option>
                  </select>
                </div>

                {/* View toggles */}
                <div className="flex items-center border border-skincare-text/10 rounded-full p-1 bg-[#FAF8F5]">
                  <button
                    id="catalog-view-grid"
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${viewMode === "grid" ? "bg-white text-skincare-gold shadow-xs" : "text-skincare-text/40"}`}
                    title="Grid View"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    id="catalog-view-list"
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${viewMode === "list" ? "bg-white text-skincare-gold shadow-xs" : "text-skincare-text/40"}`}
                    title="List View"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

              </div>
            </div>

            {/* Active filters badge stack bar */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 ml-1">
                <span className="text-[10px] font-mono tracking-widest text-skincare-bronze uppercase">ACTIVE SELECTIONS:</span>
                
                {searchQuery && (
                  <span className="bg-skincare-cream border border-skincare-text/10 text-skincare-text text-[10px] font-sans px-3 py-1 rounded-full flex items-center gap-1">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className="hover:text-skincare-gold font-bold ml-1 font-mono">×</button>
                  </span>
                )}

                {selectedCategory !== "ALL" && (
                  <span className="bg-skincare-cream border border-skincare-text/10 text-skincare-text text-[10px] font-sans px-3 py-1 rounded-full flex items-center gap-1">
                    App: {selectedCategory}
                    <button onClick={() => setSelectedCategory("ALL")} className="hover:text-skincare-gold font-bold ml-1 font-mono">×</button>
                  </span>
                )}

                {selectedBranch !== "ALL" && (
                  <span className="bg-skincare-cream border border-skincare-text/10 text-skincare-text text-[10px] font-sans px-3 py-1 rounded-full flex items-center gap-1">
                    Line: {selectedBranch}
                    <button onClick={() => setSelectedBranch("ALL")} className="hover:text-skincare-gold font-bold ml-1 font-mono">×</button>
                  </span>
                )}

                {selectedStore !== "ALL" && (
                  <span className="bg-skincare-cream border border-skincare-text/10 text-skincare-text text-[10px] font-sans px-3 py-1 rounded-full flex items-center gap-1">
                    Store: {selectedStore.split(" ")[0]}
                    <button onClick={() => setSelectedStore("ALL")} className="hover:text-skincare-gold font-bold ml-1 font-mono">×</button>
                  </span>
                )}
              </div>
            )}

            {/* PRODUCT CARDS LISTINGS AREA */}
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                viewMode === "grid" ? (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredProducts.map((p) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        key={p.id}
                        className="group bg-white border border-skincare-text/10 p-5 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-500 hover:-translate-y-1 relative"
                      >
                        <div>
                          {/* Image box */}
                          <div
                            onClick={() => onOpenProductDetail(p)}
                            className="relative aspect-4/5 w-full bg-skincare-mist overflow-hidden mb-5 cursor-pointer rounded-lg border border-skincare-text/5"
                          >
                            {p.tag && (
                              <span className="absolute top-3 left-3 z-15 bg-skincare-text text-skincare-cream text-[8px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full">
                                {p.tag}
                              </span>
                            )}
                            
                            {p.branch && (
                              <span className="absolute top-3 right-3 z-15 bg-white/90 backdrop-blur-xs text-skincare-gold border border-skincare-gold/20 text-[8px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full font-bold">
                                {p.branch}
                              </span>
                            )}

                            <img
                              src={p.image}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                            />

                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-center justify-center">
                              <span className="bg-white/95 backdrop-blur-xs tracking-[0.15em] text-[10px] uppercase text-skincare-text px-4 py-2 shadow-md border border-skincare-text/10 flex items-center gap-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 rounded-full">
                                <Eye className="h-3 w-3" />
                                Quick View
                              </span>
                            </div>
                          </div>

                          {/* Category and Rating */}
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="text-[9px] font-sans tracking-[0.2em] font-bold text-skincare-gold uppercase">
                              {p.category}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="h-2.5 w-2.5 text-skincare-gold fill-current" />
                              <span className="text-[10px] text-skincare-text/70 font-mono">{p.rating}</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3
                            onClick={() => onOpenProductDetail(p)}
                            className="font-serif text-lg font-light text-skincare-text hover:text-skincare-gold transition-colors cursor-pointer leading-snug"
                          >
                            {p.name}
                          </h3>

                          {/* Brief statement */}
                          <p className="text-xs text-skincare-text/70 font-sans font-light leading-relaxed mt-2.5 mb-4 line-clamp-2">
                            {p.briefDescription}
                          </p>
                        </div>

                        <div>
                          {/* Store chips */}
                          {p.stores && p.stores.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 mb-4 pt-2 border-t border-skincare-text/5">
                              <Store className="h-3 w-3 text-skincare-bronze/60" />
                              {p.stores.map((s) => (
                                <span key={s} className="text-[9px] font-mono text-skincare-text/65 bg-[#FAF8F5] px-2 py-0.5 rounded-full border border-skincare-text/5">
                                  {s.replace(/\s*\(.*\)/, "")}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Price in JPY & Purchase */}
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-base font-mono font-semibold text-skincare-text">
                              {new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(p.price)}
                            </span>
                            <button
                              id={`catalog-buy-grid-${p.id}`}
                              onClick={() => onAddProductToCart(p)}
                              className="bg-skincare-text hover:bg-skincare-gold text-white p-2.5 rounded-full cursor-pointer transition-colors"
                              title="Add to Bag"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  // List View Mode
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4"
                  >
                    {filteredProducts.map((p) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.35 }}
                        key={p.id}
                        className="group bg-white border border-skincare-text/10 p-4 rounded-2xl flex flex-col sm:flex-row gap-5 items-stretch shadow-xs hover:border-skincare-gold/20 hover:shadow-xs transition-all duration-300"
                      >
                        {/* Image block left */}
                        <div
                          onClick={() => onOpenProductDetail(p)}
                          className="w-full sm:w-32 h-44 bg-skincare-mist overflow-hidden rounded-xl relative shrink-0 border border-skincare-text/5 cursor-pointer"
                        >
                          {p.tag && (
                            <span className="absolute top-2 left-2 z-10 bg-skincare-text text-skincare-cream text-[7px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full">
                              {p.tag}
                            </span>
                          )}
                          <img
                            src={p.image}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                          />
                        </div>

                        {/* Text block right */}
                        <div className="flex-1 flex flex-col justify-between sm:py-1">
                          <div>
                            {/* Tags and rating row */}
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="text-[8px] font-sans tracking-[0.2em] font-bold text-skincare-gold uppercase bg-skincare-cream px-2 py-0.5 rounded-full border border-skincare-gold/10">
                                {p.category}
                              </span>
                              {p.branch && (
                                <span className="text-[8px] font-mono tracking-wide text-skincare-bronze uppercase">
                                  • {p.branch}
                                </span>
                              )}
                              <div className="flex items-center gap-1 ml-auto">
                                <Star className="h-2.5 w-2.5 text-skincare-gold fill-current" />
                                <span className="text-[10px] text-skincare-text/80 font-mono font-medium">{p.rating} ({p.reviewsCount})</span>
                              </div>
                            </div>

                            {/* Title */}
                            <h3
                              onClick={() => onOpenProductDetail(p)}
                              className="font-serif text-lg font-light text-skincare-text hover:text-skincare-gold cursor-pointer transition-colors"
                            >
                              {p.name}
                            </h3>

                            {/* Brief desc */}
                            <p className="text-xs text-skincare-text/75 font-sans font-light leading-relaxed mt-2 mb-3">
                              {p.briefDescription}
                            </p>
                          </div>

                          {/* Footer row with stores, price, buy */}
                          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-skincare-text/5">
                            {/* stores */}
                            {p.stores && p.stores.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1 text-[10px] font-mono text-skincare-text/70">
                                <Store className="h-3 w-3 text-skincare-bronze/60 mr-0.5" />
                                <span>Stores:</span>
                                {p.stores.map((s, idx) => (
                                  <span key={s} className="hover:text-skincare-gold font-light">
                                    {s.replace(/\s*\(.*\)/, "")}{idx < (p.stores?.length || 0) - 1 ? "," : ""}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Price / buy button */}
                            <div className="flex items-center space-x-4 ml-auto">
                              <span className="text-sm font-mono font-semibold text-skincare-text text-right">
                                {new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(p.price)}
                              </span>
                              <button
                                id={`catalog-buy-list-${p.id}`}
                                onClick={() => onAddProductToCart(p)}
                                className="flex items-center gap-1.5 bg-skincare-text hover:bg-skincare-gold text-white font-sans text-[10px] font-semibold tracking-wider uppercase px-4 py-2 rounded-full cursor-pointer transition-all hover:shadow-xs"
                              >
                                <Plus className="h-3 w-3" />
                                ADD TO BAG
                              </button>
                            </div>
                          </div>
                        </div>

                      </motion.div>
                    ))}
                  </motion.div>
                )
              ) : (
                // EMPTY RESULTS BOARD
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-skincare-text/10 p-16 text-center rounded-2xl shadow-xs space-y-6 max-w-lg mx-auto mt-8"
                  id="catalog-empty-results"
                >
                  <div className="h-14 w-14 bg-skincare-cream border border-skincare-text/5 rounded-full flex items-center justify-center text-skincare-gold mx-auto">
                    <SlidersHorizontal className="h-6 w-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg text-skincare-text">No Formulations Match Your Filter Selection</h4>
                    <p className="text-xs font-sans font-light text-skincare-text/75 leading-relaxed">
                      We currently do not offer this specific combination of Brand series line and skin application available in this physical branch. Try adjusting your sidebar toggles.
                    </p>
                  </div>

                  <button
                    id="catalog-empty-reset"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 bg-skincare-text hover:bg-skincare-gold text-white text-[11px] font-sans font-semibold tracking-widest uppercase px-6 py-3 rounded-full cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    RESET SPECIFICATIONS
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Micro FAQ segment at base */}
            <div className="pt-12 border-t border-skincare-text/10 flex flex-col md:flex-row md:items-start gap-8 text-skincare-text/75">
              <div className="flex-1 space-y-2">
                <span className="block text-[9px] font-mono tracking-widest text-[#8E7F70] uppercase">GLOW CONCIERGE TIP</span>
                <h5 className="font-serif text-xs font-medium text-skincare-text">Need custom diagnostic calibration?</h5>
                <p className="text-[11px] font-sans font-light leading-relaxed">
                  Take credit of our specialized Skin Concierge diagnostic stepper test to discover your structural skin balance and receive a bespoke clinical collagen regimen mapping.
                </p>
              </div>
              <div className="flex-1 space-y-2">
                <span className="block text-[9px] font-mono tracking-widest text-[#8E7F70] uppercase">PRODUCT GUARANTEE</span>
                <h5 className="font-serif text-xs font-medium text-skincare-text">Authentic Shiseido Laboratories Formulation</h5>
                <p className="text-[11px] font-sans font-light leading-relaxed">
                  Every product listed in this archive carries our active moisture barrier pledge, ensuring dermatologically-tested skin compatibility and continuous luster preservation.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
