import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductCard } from '../components/product/ProductCard';

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [inputVal, setInputVal] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc'>('relevance');
  const { addRecentSearch } = useStore();

  const activeQuery = searchParams.get('q') || '';

  const matchingCategories = useMemo(() => {
    const q = activeQuery.trim().toLowerCase();
    if (!q) return [];
    return CATEGORIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [activeQuery]);

  const results = useMemo(() => {
    const q = activeQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      if (categoryFilter !== 'all' && p.categoryId !== categoryFilter) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

    if (sortBy === 'price-asc') return [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [activeQuery, categoryFilter, sortBy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputVal.trim();
    if (clean) addRecentSearch(clean);
    setSearchParams(clean ? { q: clean } : {});
  };

  const recommended = useMemo(() => PRODUCTS.filter((p) => p.bestSelling).slice(0, 4), []);

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs items={[{ label: 'Search Results' }]} />

      <div className="bg-white rounded-[14px] p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#16193a]">
          {activeQuery ? `Results for “${activeQuery}”` : 'Search WACO Supermarket'}
        </h1>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2.5 max-w-2xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5a5d76] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search Nigerian rice, honey beans, goat meat, palm oil..."
              className="w-full h-11 pl-10 pr-4 rounded-full bg-[#e9e7df]/75 text-sm text-[#16193a] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="h-11 px-6 rounded-full bg-[#141a4a] text-white text-sm font-semibold hover:bg-[#3a49c9] transition-colors cursor-pointer shrink-0"
          >
            Search
          </button>
        </form>

        {matchingCategories.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#5a5d76]">Suggested aisles:</span>
            {matchingCategories.map((c) => (
              <Link
                key={c.id}
                to={`/category/${c.slug}`}
                className="px-3.5 py-1 rounded-full bg-[#f7d23a] text-[#141a4a] text-xs font-semibold"
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <p className="text-xs md:text-sm text-[#5a5d76] tabular-nums">
          <strong className="text-[#16193a]">{results.length}</strong> matching products
        </p>
        <div className="flex flex-wrap gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter search by category"
            className="h-9 px-3.5 rounded-full bg-white text-xs font-semibold text-[#16193a] focus:outline-none"
          >
            <option value="all">All 15 Aisles</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'relevance' | 'price-asc' | 'price-desc')}
            aria-label="Sort search results"
            className="h-9 px-3.5 rounded-full bg-white text-xs font-semibold text-[#16193a] focus:outline-none"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Sort: Price Low to High</option>
            <option value="price-desc">Sort: Price High to Low</option>
          </select>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="space-y-6">
          <div className="bg-white rounded-[14px] p-10 text-center">
            <h2 className="text-xl font-semibold text-[#16193a]">
              No products matched “{activeQuery}”
            </h2>
            <p className="text-sm text-[#5a5d76] mt-1.5">
              Try popular staples like Ofada rice, Ijebu garri, plantain, or suya spice.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['Ofada', 'Beans', 'Garri', 'Plantain', 'Chicken'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setInputVal(term);
                    setSearchParams({ q: term });
                  }}
                  className="px-4 py-1.5 rounded-full bg-[#e9e7df] text-xs font-semibold text-[#141a4a] hover:bg-[#f7d23a] cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#16193a] mb-3 px-1">
              Recommended Staples
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {recommended.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
