import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { formatNaira } from '../utils/format';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductCard } from '../components/product/ProductCard';
import { ProductSkeleton } from '../components/product/ProductSkeleton';

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'newest' | 'rating';

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSort = (searchParams.get('sort') as SortOption) || 'popular';

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(40000);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [visibleCount, setVisibleCount] = useState(24);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(true);
    const id = window.setTimeout(() => setIsFiltering(false), 120);
    return () => window.clearTimeout(id);
  }, [query, selectedCategories, maxPrice, onlyDiscounted, inStockOnly, minRating, sortBy]);

  const toggleCategory = (catId: string) => {
    setVisibleCount(24);
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const resetFilters = () => {
    setQuery('');
    setSelectedCategories([]);
    setMaxPrice(40000);
    setOnlyDiscounted(false);
    setInStockOnly(false);
    setMinRating(0);
    setSortBy('popular');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      if (q) {
        const match =
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.categoryId)) {
        return false;
      }
      if (p.price > maxPrice) return false;
      if (onlyDiscounted && !p.isDiscounted) return false;
      if (inStockOnly && p.availability === 'out_of_stock') return false;
      if (p.rating < minRating) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return Number(Boolean(b.newArrival)) - Number(Boolean(a.newArrival));
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return b.reviewCount - a.reviewCount;
      }
    });
  }, [query, selectedCategories, maxPrice, onlyDiscounted, inStockOnly, minRating, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const filterPanelContent = (
    <div className="space-y-6">
      <div>
        <label htmlFor="shop-search" className="block text-xs font-semibold text-[#5a5d76] mb-2">
          Filter by keyword
        </label>
        <input
          id="shop-search"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisibleCount(24);
          }}
          placeholder="Search staples, meat, oil..."
          className="w-full h-10 px-3.5 rounded-[10px] bg-[#e9e7df]/75 text-sm text-[#16193a] placeholder:text-[#5a5d76] focus:outline-none focus:ring-2 focus:ring-[#141a4a]/25"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#16193a]">Max Price (Illustrative)</span>
          <span className="text-xs font-semibold text-[#141a4a] tabular-nums">
            {formatNaira(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={1000}
          max={40000}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#141a4a] cursor-pointer"
        />
      </div>

      <div>
        <p className="text-xs font-semibold text-[#16193a] mb-2.5">Categories (15 Aisles)</p>
        <div className="space-y-1.5 max-h-[270px] overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2.5 text-xs md:text-sm text-[#16193a] cursor-pointer py-1"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="w-4 h-4 rounded accent-[#141a4a]"
              />
              <span className="truncate flex-1">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2.5 pt-2 border-t border-[#16193a]/10">
        <p className="text-xs font-semibold text-[#16193a]">Promotions &amp; Stock</p>
        <label className="flex items-center gap-2.5 text-sm text-[#16193a] cursor-pointer">
          <input
            type="checkbox"
            checked={onlyDiscounted}
            onChange={(e) => setOnlyDiscounted(e.target.checked)}
            className="w-4 h-4 accent-[#141a4a]"
          />
          <span>Discounted items only</span>
        </label>
        <label className="flex items-center gap-2.5 text-sm text-[#16193a] cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 accent-[#141a4a]"
          />
          <span>Ready in store today</span>
        </label>
      </div>

      <div className="pt-2 border-t border-[#16193a]/10">
        <label htmlFor="rating-filter" className="block text-xs font-semibold text-[#16193a] mb-2">
          Minimum Customer Rating
        </label>
        <select
          id="rating-filter"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full h-10 px-3 rounded-[10px] bg-[#e9e7df]/75 text-sm text-[#16193a] focus:outline-none"
        >
          <option value={0}>All ratings</option>
          <option value={4.5}>4.5★ &amp; above</option>
          <option value={4.8}>4.8★ &amp; above</option>
        </select>
      </div>

      <button
        type="button"
        onClick={resetFilters}
        className="w-full h-10 rounded-full bg-[#e9e7df] text-[#141a4a] text-xs font-semibold hover:bg-[#141a4a] hover:text-white transition-colors cursor-pointer"
      >
        Reset All Filters
      </button>
    </div>
  );

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-10">
      <Breadcrumbs items={[{ label: 'Shop All Products' }]} />

      {/* Header Panel */}
      <div className="bg-white rounded-[14px] p-6 md:p-8 mb-[var(--gap)] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-[#5a5d76]">Complete Supermarket Catalogue</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#16193a] tracking-tight mt-1">
            All WACO Groceries
          </h1>
          <p className="text-sm text-[#5a5d76] mt-1.5 max-w-[56ch]">
            Browse 124 Nigerian staples, fresh market harvest, butcher cuts, and household essentials. All prices shown are illustrative demo figures.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden h-10 px-4 rounded-full bg-[#e9e7df] text-[#141a4a] text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          <label className="sr-only" htmlFor="shop-sort">
            Sort products
          </label>
          <select
            id="shop-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-10 px-4 rounded-full bg-[#e9e7df] text-[#141a4a] text-xs font-semibold focus:outline-none cursor-pointer"
          >
            <option value="popular">Sort: Most Popular</option>
            <option value="price-asc">Sort: Price Low to High</option>
            <option value="price-desc">Sort: Price High to Low</option>
            <option value="newest">Sort: Newest Arrivals</option>
            <option value="rating">Sort: Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)] items-start">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-[14px] p-5 sticky top-[9vh]">
          {filterPanelContent}
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-9">
          <div className="flex items-center justify-between mb-3 px-1 text-xs text-[#5a5d76]">
            <span className="tabular-nums">
              Showing <strong className="text-[#16193a]">{displayedProducts.length}</strong> of{' '}
              <strong className="text-[#16193a]">{filteredProducts.length}</strong> products
            </span>
            {selectedCategories.length > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="font-semibold text-[#3a49c9] hover:underline cursor-pointer"
              >
                Clear {selectedCategories.length} filter(s)
              </button>
            )}
          </div>

          {isFiltering ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 md:gap-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <ProductSkeleton key={idx} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-[14px] p-12 text-center">
              <h2 className="text-xl font-semibold text-[#16193a]">No matching products found</h2>
              <p className="text-sm text-[#5a5d76] mt-1.5">
                Try increasing your max price or clearing category filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 h-10 px-6 rounded-full bg-[#141a4a] text-white text-sm font-semibold hover:bg-[#3a49c9] transition-colors cursor-pointer"
              >
                Show All 124 Products
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 md:gap-4">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {visibleCount < filteredProducts.length && (
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 24)}
                    className="h-11 px-8 rounded-full bg-[#141a4a] text-white text-sm font-semibold hover:bg-[#3a49c9] transition-colors cursor-pointer"
                  >
                    Load More Products ({filteredProducts.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div
            className="absolute inset-0 bg-[#16193a]/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative w-[86vw] max-w-[360px] h-full bg-white p-5 overflow-y-auto z-10">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#16193a]/10">
              <h2 className="text-lg font-semibold text-[#16193a]">Filter Products</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="w-9 h-9 rounded-full bg-[#e9e7df] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {filterPanelContent}
          </div>
        </div>
      )}
    </div>
  );
}
