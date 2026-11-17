import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Search, TrendingUp, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { formatNaira } from '../../utils/format';
import { SafeImage } from '../common/SafeImage';

const POPULAR_SEARCHES = [
  'Ofada Rice',
  'Honey Beans',
  'Red Palm Oil',
  'Plantain',
  'Suya Spice',
  'Brown Eggs',
  'Smoked Catfish',
];

export function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, recentSearches, addRecentSearch, clearRecentSearches } =
    useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) setIsSearchOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [query]);

  const matchingCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return CATEGORIES.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 4);
  }, [query]);

  if (!isSearchOpen) return null;

  const submitSearch = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    addRecentSearch(clean);
    setIsSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(clean)}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) submitSearch(query);
  };

  return (
    <div className="fixed inset-0 z-[85] flex items-start justify-center pt-[6vh] px-4">
      <div
        className="absolute inset-0 bg-[#16193a]/45"
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-[780px] bg-[#e9e7df] rounded-[14px] p-4 md:p-5 z-10 max-h-[85vh] overflow-y-auto">
        <form onSubmit={handleFormSubmit} className="relative flex items-center bg-white rounded-[10px] px-4 h-13">
          <Search className="w-5 h-5 text-[#5a5d76] shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rice, honey beans, palm oil, meat, vegetables..."
            className="w-full h-full px-3 text-[15px] text-[#16193a] placeholder:text-[#5a5d76]/70 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search query"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#5a5d76] hover:text-[#16193a] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="ml-1 w-9 h-9 rounded-full bg-[#e9e7df] flex items-center justify-center text-[#16193a] hover:bg-[#141a4a] hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </form>

        {query.trim() ? (
          <div className="mt-4 space-y-4">
            {matchingCategories.length > 0 && (
              <div className="bg-white rounded-[14px] p-4">
                <p className="text-xs font-semibold text-[#5a5d76] mb-2.5">Matching Aisles</p>
                <div className="flex flex-wrap gap-2">
                  {matchingCategories.map((c) => (
                    <Link
                      key={c.id}
                      to={`/category/${c.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="px-3.5 py-1.5 rounded-full bg-[#e9e7df] text-xs font-semibold text-[#16193a] hover:bg-[#141a4a] hover:text-white transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-[14px] p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-[#5a5d76]">
                  Matching Products ({matches.length})
                </p>
                <button
                  type="button"
                  onClick={() => submitSearch(query)}
                  className="text-xs font-semibold text-[#3a49c9] inline-flex items-center gap-1 hover:underline cursor-pointer"
                >
                  See all results <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {matches.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-sm font-semibold text-[#16193a]">
                    No products found matching “{query}”
                  </p>
                  <p className="text-xs text-[#5a5d76] mt-1">
                    Try searching for rice, garri, plantain, chicken, or palm oil.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {matches.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      onClick={() => {
                        addRecentSearch(query);
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center gap-3 p-2 rounded-[10px] hover:bg-[#e9e7df]/60 transition-colors"
                    >
                      <SafeImage
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-12 rounded-lg object-cover shrink-0 bg-[#f4f2eb]"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#16193a] truncate">{p.name}</p>
                        <p className="text-xs text-[#5a5d76] tabular-nums">
                          {p.unit} · <span className="font-semibold text-[#141a4a]">{formatNaira(p.price)}</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white rounded-[14px] p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#5a5d76] inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Recent Searches
                </span>
                {recentSearches.length > 0 && (
                  <button
                    type="button"
                    onClick={clearRecentSearches}
                    className="text-xs text-[#5a5d76] hover:text-[#16193a] cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              {recentSearches.length === 0 ? (
                <p className="text-xs text-[#5a5d76]">Your recent searches appear here.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => submitSearch(term)}
                      className="px-3 py-1.5 rounded-full bg-[#e9e7df] text-xs font-medium text-[#16193a] hover:bg-[#141a4a] hover:text-white transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-[14px] p-4">
              <span className="text-xs font-semibold text-[#5a5d76] inline-flex items-center gap-1.5 mb-3">
                <TrendingUp className="w-3.5 h-3.5" /> Popular at WACO
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => submitSearch(term)}
                    className="px-3 py-1.5 rounded-full bg-[#f7d23a]/60 text-xs font-semibold text-[#141a4a] hover:bg-[#141a4a] hover:text-white transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
