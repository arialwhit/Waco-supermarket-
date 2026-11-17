import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronRight, Clock, Leaf, Search, ShieldCheck, Store, Truck } from 'lucide-react';
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
  const { addToCart, setIsSearchOpen, showToast } = useStore();

  const wacoSignatureProducts = useMemo(
    () => PRODUCTS.filter((p) => p.isWacoSignature),
    []
  );

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
      {/* Mobile Quick Search Trigger (PricePally-inspired clean mobile search bar) */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="w-full h-12 px-4 rounded-[12px] bg-white border border-[#135224]/15 flex items-center gap-3 text-left text-sm text-[#5a5d76] cursor-pointer"
        >
          <Search className="w-4 h-4 text-[#135224] shrink-0" />
          <span className="truncate">Search rice, honey beans, garri, beef, tomatoes...</span>
        </button>
      </div>

      {/* 0. WACO Foods Signature Packaged Line Showcase */}
      <section className="bg-[#f4efe4] border border-[#135224]/15 rounded-[14px] p-5 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pb-7 mb-7 border-b border-[#135224]/12">
          <div className="lg:col-span-7 space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#135224] text-[#f7d23a] text-[11px] font-semibold uppercase tracking-wider">
              100% Natural · Hygienically Packaged
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#135224] tracking-tight">
              WACO Foods Signature Packaged Line
            </h2>
            <p className="text-sm md:text-[15px] text-[#16193a]/85 max-w-[58ch] leading-relaxed">
              Directly from our processing line to your kitchen counter: stone-free Ekpoma Local Rice, sweet Honey Beans, crisp Ijebu &amp; Yellow Garri, Black Eye Beans, and iron-rich Plantain Flour—sealed cleanly in 2kg and 5kg packs.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleAddBundle(BUNDLES[0].id)}
                className="h-10 px-5 rounded-full bg-[#c61d23] text-white text-xs md:text-sm font-semibold hover:bg-[#135224] transition-colors cursor-pointer"
              >
                Add Quartet Bundle ({formatNaira(BUNDLES[0].bundlePrice)})
              </button>
              <Link
                to="/shop"
                className="h-10 px-5 rounded-full bg-white text-[#135224] border border-[#135224]/20 text-xs md:text-sm font-semibold inline-flex items-center gap-1.5 hover:bg-[#135224] hover:text-white transition-colors"
              >
                Explore All {PRODUCTS.length} Items <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[12px] overflow-hidden bg-white p-2 border border-[#135224]/15 shadow-xs">
              <SafeImage
                src={STORE_IMAGES.brand.farmPoster}
                alt="WACO Foods Quality From Our Farms To Your Table poster"
                className="w-full h-[230px] md:h-[260px] object-cover object-top rounded-[8px]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
          {wacoSignatureProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 1. Featured Categories Showcase (PricePally pure white photo tiles + mobile horizontal scroll) */}
      <section className="bg-white rounded-[14px] p-5 md:p-8">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-semibold text-[#135224]">Supermarket Aisles</p>
            <h2 className="text-xl md:text-3xl font-semibold text-[#16193a] tracking-tight mt-0.5">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/categories"
            className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-[#d99b1e] hover:text-[#135224] transition-colors whitespace-nowrap shrink-0"
          >
            View all <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Link>
        </div>

        {/* Mobile PricePally-style horizontal category scroll with pure-white framed squares */}
        <div className="flex sm:hidden items-start gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="snap-start shrink-0 w-[108px] flex flex-col items-center text-center group"
            >
              <div className="w-[104px] h-[104px] rounded-[14px] bg-white border border-[#135224]/15 p-2 flex items-center justify-center overflow-hidden shadow-xs">
                <SafeImage
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-[9px]"
                />
              </div>
              <span className="mt-2 text-xs font-semibold text-[#16193a] group-hover:text-[#135224] line-clamp-2 leading-tight">
                {cat.shortName}
              </span>
            </Link>
          ))}
        </div>

        {/* Tablet & Desktop 4-column white-framed category grid */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-4">
          {CATEGORIES.filter((c) => c.featured).map((cat) => {
            const count = PRODUCTS.filter((p) => p.categoryId === cat.id).length;
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group bg-white border border-[#16193a]/10 hover:border-[#135224]/35 rounded-[12px] p-3 transition-colors flex flex-col justify-between"
              >
                <div className="aspect-[4/3] rounded-[10px] overflow-hidden bg-white p-1">
                  <SafeImage
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-[8px] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-3 px-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[15px] font-semibold text-[#16193a] group-hover:text-[#135224] truncate">
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

        {/* PricePally-inspired Weekly Food Plan callout bar */}
        <div className="mt-5 pt-5 border-t border-[#16193a]/10">
          <div className="rounded-[12px] bg-[#f4efe4] border border-[#135224]/20 px-4 py-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#135224] text-[#f7d23a] flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm md:text-[15px] font-semibold text-[#135224] truncate">
                  Create Your Weekly Food Plan
                </h3>
                <p className="text-xs text-[#5a5d76] truncate">
                  Quick-add our curated WACO Family Pantry Plan &amp; save on weekly staples
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleAddBundle(BUNDLES[1]?.id || BUNDLES[0].id)}
                className="h-9 px-3.5 rounded-full bg-[#135224] text-white text-xs font-semibold hover:bg-[#0c3b19] transition-colors cursor-pointer"
              >
                Quick Fill
              </button>
              <Link
                to="/offers"
                aria-label="Explore food bundles"
                className="w-9 h-9 rounded-full bg-white text-[#135224] flex items-center justify-center border border-[#135224]/15 hover:bg-[#f7d23a] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top-Selling Products */}
      <section className="py-2 md:py-4">
        <div className="flex items-end justify-between gap-4 mb-4 md:mb-5 px-1">
          <div>
            <p className="text-xs font-semibold text-[#135224]">Popular This Week</p>
            <h2 className="text-xl md:text-3xl font-semibold text-[#16193a] tracking-tight mt-0.5">
              Top-Selling Groceries
            </h2>
          </div>
          <Link
            to="/shop?sort=popular"
            className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-[#d99b1e] hover:text-[#135224] transition-colors whitespace-nowrap shrink-0"
          >
            View all <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {topSelling.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Dual MotionSites Split Promotional Banners (WACO Forest Green + Harvest Gold / Crimson) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)]">
        <div className="lg:col-span-7 bg-[#135224] text-white rounded-[14px] p-6 md:p-9 flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="text-xs font-semibold text-[#f7d23a] uppercase tracking-wider">
              Weekly Bundle Showcase
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-balance">
              {BUNDLES[0].name}
            </h2>
            <p className="mt-2.5 text-sm text-white/85 max-w-[46ch] leading-relaxed">
              {BUNDLES[0].description}
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-2xl font-semibold text-[#f7d23a] tabular-nums">
                {formatNaira(BUNDLES[0].bundlePrice)}
              </div>
              <div className="text-xs text-white/75 tabular-nums">
                Worth {formatNaira(BUNDLES[0].originalTotal)} · {BUNDLES[0].savingsLabel}
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleAddBundle(BUNDLES[0].id)}
                className="h-10 px-5 rounded-full bg-[#f7d23a] text-[#0c3b19] text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
              >
                Add Bundle to Bag
              </button>
              <Link
                to="/offers"
                className="h-10 px-5 rounded-full bg-white/15 text-white text-sm font-medium inline-flex items-center hover:bg-white/25 transition-colors"
              >
                All Deals
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#f7d23a] text-[#141a4a] rounded-[14px] p-6 md:p-9 flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#c61d23] text-white text-[11px] font-semibold uppercase tracking-wider">
              Fresh Morning Harvest
            </span>
            <h2 className="mt-2.5 text-2xl md:text-3xl font-semibold tracking-tight text-balance text-[#0c3b19]">
              Pre-sorted stew mixes &amp; farm eggs
            </h2>
            <p className="mt-2.5 text-sm text-[#141a4a]/85 leading-relaxed">
              Skip open-market haggling. Order clean-weighed tomatoes, ata rodo, sweet bell peppers, beef cuts, and fresh carrots ready for checkout.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              to="/category/vegetables"
              className="h-10 px-5 rounded-full bg-[#135224] text-white text-sm font-semibold inline-flex items-center hover:bg-[#0c3b19] transition-colors"
            >
              Fresh Vegetables
            </Link>
            <Link
              to="/category/dairy-eggs"
              className="h-10 px-5 rounded-full bg-white text-[#135224] text-sm font-semibold inline-flex items-center hover:bg-[#135224] hover:text-white transition-colors"
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
            <p className="text-xs font-semibold text-[#135224]">Explore Every Aisle</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#16193a] tracking-tight mt-1">
              Products by Category
            </h2>
          </div>
          <Link
            to={`/category/${activeCategory.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#135224] hover:text-[#c61d23] whitespace-nowrap shrink-0"
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
                    ? 'bg-[#135224] text-white'
                    : 'bg-[#e9e7df] text-[#16193a] hover:bg-[#f7d23a] hover:text-[#0c3b19]'
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
          <span className="font-semibold text-[#135224]">Jump to aisle:</span>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="hover:text-[#135224] hover:underline transition-colors"
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
            <Link to="/offers" className="text-xs font-semibold text-[#c61d23] hover:underline">
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
            <Link to="/shop?sort=newest" className="text-xs font-semibold text-[#135224] hover:underline">
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
            <p className="text-xs font-semibold text-[#135224]">Shop F1008, Apo Urban Market, Abuja</p>
            <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-[#16193a] tracking-tight">
              Why households shop with WACO Foods
            </h2>
            <p className="mt-2.5 text-sm text-[#5a5d76] leading-relaxed">
              Backed by our physical Abuja supermarket counter and agro-processing line, every order is picked directly from temperature-controlled shelves.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-[12px] bg-[#f4efe4] border border-[#135224]/10">
              <Store className="w-5 h-5 text-[#135224] mb-2" />
              <h3 className="text-sm font-semibold text-[#16193a]">Apo Urban Market Hub</h3>
              <p className="text-xs text-[#5a5d76] mt-1 leading-relaxed">
                Visit Shop F1008, Apo Urban Market, Abuja or pick up Click &amp; Collect orders in under 2 hours.
              </p>
            </div>
            <div className="p-4 rounded-[12px] bg-[#f4efe4] border border-[#135224]/10">
              <ShieldCheck className="w-5 h-5 text-[#135224] mb-2" />
              <h3 className="text-sm font-semibold text-[#16193a]">100% Natural &amp; Stone-Free</h3>
              <p className="text-xs text-[#5a5d76] mt-1 leading-relaxed">
                Sealed Ekpoma Local Rice, Honey Beans, Black Eye Beans, Garri &amp; Plantain Flour packs.
              </p>
            </div>
            <div className="p-4 rounded-[12px] bg-[#f4efe4] border border-[#135224]/10">
              <Truck className="w-5 h-5 text-[#135224] mb-2" />
              <h3 className="text-sm font-semibold text-[#16193a]">Abuja Same-Day Dispatch</h3>
              <p className="text-xs text-[#5a5d76] mt-1 leading-relaxed">
                Fast local delivery across Apo, Garki, Wuse, Maitama, Gudu, and Asokoro.
              </p>
            </div>
            <div className="p-4 rounded-[12px] bg-[#f4efe4] border border-[#135224]/10">
              <Clock className="w-5 h-5 text-[#135224] mb-2" />
              <h3 className="text-sm font-semibold text-[#16193a]">Weekly Restock Ready</h3>
              <p className="text-xs text-[#5a5d76] mt-1 leading-relaxed">
                Save favourite pantry staples or reorder complete family shopping lists in seconds.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative rounded-[14px] overflow-hidden min-h-[340px] bg-[#0c3b19]">
          <SafeImage
            src={STORE_IMAGES.storeInterior}
            alt="WACO Foods modern neighborhood supermarket interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c3b19]/95 via-[#0c3b19]/40 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
            <span className="text-xs font-semibold text-[#f7d23a]">Inside WACO Foods Abuja</span>
            <h3 className="mt-1 text-xl md:text-2xl font-semibold">
              Nourishing Nigeria. Enriching Lives.
            </h3>
            <p className="mt-1.5 text-xs md:text-sm text-white/80 max-w-[44ch]">
              Shop F1008, Apo Urban Market · +234 811 786 2336 · +234 706 930 2350
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link
                to="/about"
                className="h-9 px-5 rounded-full bg-[#f7d23a] text-[#0c3b19] text-xs font-semibold inline-flex items-center hover:bg-white transition-colors"
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
          <p className="text-xs font-semibold text-[#135224]">Abuja Kitchen Reviews</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#16193a] mb-5">
            Trusted by busy kitchens
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.id}
                className="bg-[#f4efe4] rounded-[12px] p-4 flex flex-col justify-between border border-[#135224]/10"
              >
                <p className="text-xs md:text-sm text-[#16193a] leading-relaxed">
                  “{t.quote}”
                </p>
                <footer className="mt-4 pt-3 border-t border-[#135224]/15">
                  <div className="text-xs font-semibold text-[#135224]">{t.name}</div>
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
            <Link to="/faq" className="text-xs font-semibold text-[#135224] hover:underline">
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
                    className="w-full flex items-center justify-between gap-3 text-left text-sm font-semibold text-[#16193a] hover:text-[#135224] cursor-pointer"
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
