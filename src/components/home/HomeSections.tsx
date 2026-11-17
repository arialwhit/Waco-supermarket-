import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Clock, ShieldCheck, Store, Truck } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { BUNDLES, FAQ_ITEMS, TESTIMONIALS } from '../../data/mockStoreData';
import { STORE_IMAGES } from '../../data/images';
import { useStore } from '../../context/StoreContext';
import { formatNaira } from '../../utils/format';
import { ProductCard } from '../product/ProductCard';
import { SafeImage } from '../common/SafeImage';

export function HomeSections() {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('rice-grains');
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const { addToCart, showToast } = useStore();

  const topSelling = useMemo(
    () => PRODUCTS.filter((p) => p.bestSelling).slice(0, 8),
    []
  );

  const newArrivals = useMemo(
    () => PRODUCTS.filter((p) => p.newArrival || p.trending).slice(0, 4),
    []
  );

  const discountedProducts = useMemo(
    () => PRODUCTS.filter((p) => p.isDiscounted).slice(0, 4),
    []
  );

  const activeCategory = CATEGORIES.find((c) => c.id === selectedCategoryTab) || CATEGORIES[0];
  const activeCategoryProducts = useMemo(
    () => PRODUCTS.filter((p) => p.categoryId === activeCategory.id).slice(0, 4),
    [activeCategory.id]
  );

  const handleAddBundle = (bundleId: string) => {
    const bundle = BUNDLES.find((b) => b.id === bundleId);
    if (!bundle) return;
    bundle.productIds.forEach((pid) => addToCart(pid, 1, undefined, true));
    showToast('Bundle items added to bag', `${bundle.name} (${bundle.productIds.length} items)`, 'success');
  };

  return (
    <div className="w-[var(--w)] mx-auto mt-[var(--gap)] space-y-[var(--gap)]">
      {/* 1. Featured Categories Showcase */}
      <section className="bg-white rounded-[14px] p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold text-[#5a5d76]">Supermarket Aisles</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#16193a] tracking-tight mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#141a4a] hover:text-[#3a49c9] transition-colors whitespace-nowrap shrink-0"
          >
            View all 15 aisles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-4">
          {CATEGORIES.filter((c) => c.featured).map((cat) => {
            const count = PRODUCTS.filter((p) => p.categoryId === cat.id).length;
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group bg-[#e9e7df]/55 hover:bg-[#e9e7df] rounded-[12px] p-3 transition-colors flex flex-col justify-between"
              >
                <div className="aspect-[4/3] rounded-[10px] overflow-hidden bg-white">
                  <SafeImage
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-3 px-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[15px] font-semibold text-[#16193a] truncate">
                      {cat.name}
                    </h3>
                    <span className="text-xs text-[#5a5d76] tabular-nums shrink-0">
                      {count} items
                    </span>
                  </div>
                  <p className="text-xs text-[#5a5d76] mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 2. Top-Selling Products */}
      <section className="py-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 px-1">
          <div>
            <p className="text-xs font-semibold text-[#5a5d76]">Customer Favourites</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#16193a] tracking-tight mt-1">
              Top-Selling Groceries
            </h2>
          </div>
          <Link
            to="/shop?sort=popular"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#141a4a] hover:text-[#3a49c9] transition-colors whitespace-nowrap shrink-0"
          >
            Shop best sellers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
          {topSelling.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Dual MotionSites Split Promotional Banners */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)]">
        <div className="lg:col-span-7 bg-[#141a4a] text-white rounded-[14px] p-6 md:p-9 flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="text-xs font-semibold text-[#f7d23a]">Weekly Bundle Showcase</span>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-balance">
              {BUNDLES[0].name}
            </h2>
            <p className="mt-2.5 text-sm text-white/80 max-w-[46ch] leading-relaxed">
              {BUNDLES[0].description}
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-2xl font-semibold text-[#f7d23a] tabular-nums">
                {formatNaira(BUNDLES[0].bundlePrice)}
              </div>
              <div className="text-xs text-white/65 tabular-nums">
                Worth {formatNaira(BUNDLES[0].originalTotal)} · {BUNDLES[0].savingsLabel} (Illustrative)
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleAddBundle(BUNDLES[0].id)}
                className="h-10 px-5 rounded-full bg-[#f7d23a] text-[#141a4a] text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
              >
                Add Bundle to Bag
              </button>
              <Link
                to="/offers"
                className="h-10 px-5 rounded-full bg-white/10 text-white text-sm font-medium inline-flex items-center hover:bg-white/20 transition-colors"
              >
                All Deals
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#f7d23a] text-[#141a4a] rounded-[14px] p-6 md:p-9 flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="text-xs font-semibold">Fresh Morning Harvest</span>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-balance">
              Pre-sorted stew mixes &amp; farm eggs
            </h2>
            <p className="mt-2.5 text-sm text-[#141a4a]/85 leading-relaxed">
              Skip open-market haggling. Inspect clean-weighed produce and chilled proteins before checkout.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              to="/category/vegetables"
              className="h-10 px-5 rounded-full bg-[#141a4a] text-white text-sm font-semibold inline-flex items-center hover:bg-[#3a49c9] transition-colors"
            >
              Fresh Vegetables
            </Link>
            <Link
              to="/category/dairy-eggs"
              className="h-10 px-5 rounded-full bg-white text-[#141a4a] text-sm font-semibold inline-flex items-center hover:bg-[#141a4a] hover:text-white transition-colors"
            >
              Farm Eggs &amp; Dairy
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Products by Category Interactive Explorer (Covers all 15 Supermarket Aisles) */}
      <section className="bg-white rounded-[14px] p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-semibold text-[#5a5d76]">Explore Every Aisle</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#16193a] tracking-tight mt-1">
              Products by Category
            </h2>
          </div>
          <Link
            to={`/category/${activeCategory.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#141a4a] hover:text-[#3a49c9] whitespace-nowrap shrink-0"
          >
            View all in {activeCategory.shortName} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Interactive Aisle Filter Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 border-b border-[#16193a]/10">
          {CATEGORIES.map((cat) => {
            const active = cat.id === selectedCategoryTab;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryTab(cat.id)}
                className={`h-9 px-4 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#141a4a] text-white'
                    : 'bg-[#e9e7df] text-[#16193a] hover:bg-[#f7d23a]'
                }`}
              >
                {cat.shortName}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
          {activeCategoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Direct Quick Links across all 15 Categories */}
        <div className="mt-6 pt-5 border-t border-[#16193a]/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#5a5d76]">
          <span className="font-semibold text-[#16193a]">Jump to aisle:</span>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="hover:text-[#3a49c9] hover:underline transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Best Deals & New Arrivals */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--gap)]">
        <div className="bg-white rounded-[14px] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#16193a]">Best Pantry Deals</h2>
            <Link to="/offers" className="text-xs font-semibold text-[#3a49c9] hover:underline">
              View all offers
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {discountedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[14px] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#16193a]">New &amp; Trending Harvest</h2>
            <Link to="/shop?sort=newest" className="text-xs font-semibold text-[#3a49c9] hover:underline">
              See newest
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Shop With WACO + Physical Retail Store Showcase */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)] items-stretch">
        <div className="lg:col-span-6 bg-white rounded-[14px] p-6 md:p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-[#5a5d76]">Connected Retail Experience</p>
            <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-[#16193a] tracking-tight">
              Why households shop with WACO
            </h2>
            <p className="mt-2.5 text-sm text-[#5a5d76] leading-relaxed">
              Backed by our first brick-and-mortar retail store, every online order is picked directly from temperature-controlled supermarket shelves.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-[12px] bg-[#e9e7df]/65">
              <Store className="w-5 h-5 text-[#141a4a] mb-2" />
              <h3 className="text-sm font-semibold text-[#16193a]">Real Physical Store</h3>
              <p className="text-xs text-[#5a5d76] mt-1 leading-relaxed">
                Shop online or pick up in-store with consistent shelf hygiene and transparent weights.
              </p>
            </div>
            <div className="p-4 rounded-[12px] bg-[#e9e7df]/65">
              <ShieldCheck className="w-5 h-5 text-[#141a4a] mb-2" />
              <h3 className="text-sm font-semibold text-[#16193a]">Sorted &amp; Clean-Weighed</h3>
              <p className="text-xs text-[#5a5d76] mt-1 leading-relaxed">
                Stone-free Ofada rice, weevil-free honey beans, and crisp sealed garri packs.
              </p>
            </div>
            <div className="p-4 rounded-[12px] bg-[#e9e7df]/65">
              <Truck className="w-5 h-5 text-[#141a4a] mb-2" />
              <h3 className="text-sm font-semibold text-[#16193a]">Flexible Fulfillment</h3>
              <p className="text-xs text-[#5a5d76] mt-1 leading-relaxed">
                Illustrative standard, express dispatch, and store pickup scheduling options.
              </p>
            </div>
            <div className="p-4 rounded-[12px] bg-[#e9e7df]/65">
              <Clock className="w-5 h-5 text-[#141a4a] mb-2" />
              <h3 className="text-sm font-semibold text-[#16193a]">Weekly Restock Ready</h3>
              <p className="text-xs text-[#5a5d76] mt-1 leading-relaxed">
                Save favourite ingredients or reorder complete family shopping lists in seconds.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative rounded-[14px] overflow-hidden min-h-[320px] bg-[#141a4a]">
          <SafeImage
            src={STORE_IMAGES.storeInterior}
            alt="WACO modern neighborhood supermarket interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141a4a]/90 via-[#141a4a]/25 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
            <span className="text-xs font-semibold text-[#f7d23a]">Inside WACO Store</span>
            <h3 className="mt-1 text-xl md:text-2xl font-semibold">
              Bright aisles, chilled cold-room &amp; local harvest counter
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link
                to="/about"
                className="h-9 px-5 rounded-full bg-white text-[#141a4a] text-xs font-semibold inline-flex items-center hover:bg-[#f7d23a] transition-colors"
              >
                Our Store Story
              </Link>
              <Link
                to="/contact"
                className="h-9 px-5 rounded-full bg-white/15 text-white text-xs font-medium inline-flex items-center hover:bg-white/25 transition-colors"
              >
                Store Hours &amp; Location
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Customer Testimonials & Quick FAQ */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)]">
        <div className="lg:col-span-7 bg-white rounded-[14px] p-6 md:p-8">
          <p className="text-xs font-semibold text-[#5a5d76]">Illustrative Customer Feedback</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#16193a] mb-5">
            Trusted by busy kitchens
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.id}
                className="bg-[#e9e7df]/55 rounded-[12px] p-4 flex flex-col justify-between"
              >
                <p className="text-xs md:text-sm text-[#16193a] leading-relaxed">
                  “{t.quote}”
                </p>
                <footer className="mt-4 pt-3 border-t border-[#16193a]/10">
                  <div className="text-xs font-semibold text-[#16193a]">{t.name}</div>
                  <div className="text-[11px] text-[#5a5d76]">
                    {t.role} · {t.location}
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-[14px] p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#16193a]">Quick Questions</h2>
            <Link to="/faq" className="text-xs font-semibold text-[#3a49c9] hover:underline">
              Full FAQ
            </Link>
          </div>
          <div className="divide-y divide-[#16193a]/10">
            {FAQ_ITEMS.slice(0, 4).map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="py-3">
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-3 text-left text-sm font-semibold text-[#16193a] cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs text-[#5a5d76] leading-relaxed">{faq.answer}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
