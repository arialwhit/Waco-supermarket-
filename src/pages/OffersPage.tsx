import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BUNDLES } from '../data/mockStoreData';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatNaira } from '../utils/format';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';
import { ProductCard } from '../components/product/ProductCard';

export function OffersPage() {
  const { addToCart, showToast } = useStore();
  const discounted = useMemo(() => PRODUCTS.filter((p) => p.isDiscounted), []);

  const handleAddBundle = (bundleId: string) => {
    const bundle = BUNDLES.find((b) => b.id === bundleId);
    if (!bundle) return;
    bundle.productIds.forEach((pid) => addToCart(pid, 1, undefined, true));
    showToast('Bundle items added to bag', `${bundle.name}`, 'success');
  };

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs items={[{ label: 'Special Offers & Bundles' }]} />

      {/* Main Promo Banner */}
      <section className="bg-[#135224] text-white rounded-[14px] p-6 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#c61d23] text-white text-xs font-semibold">
            Weekly Promotions · Code WACO10 for 10% Pantry Savings
          </span>
          <h1 className="mt-2.5 text-3xl md:text-4xl font-semibold tracking-tight">
            Market Savings &amp; Family Boxes
          </h1>
          <p className="mt-2.5 text-sm md:text-base text-white/85 max-w-[54ch] leading-relaxed">
            Curated WACO Foods Signature Quartets and weekly price drops across Ekpoma rice, honey beans, cooking oils, poultry, and household care.
          </p>
        </div>
        <Link
          to="/shop"
          className="h-11 px-6 rounded-full bg-[#f7d23a] text-[#0c3b19] text-sm font-semibold inline-flex items-center justify-center hover:bg-white transition-colors shrink-0"
        >
          Shop Full Catalogue
        </Link>
      </section>

      {/* Curated Family Bundles */}
      <section className="bg-white rounded-[14px] p-6 md:p-8">
        <div className="mb-5">
          <p className="text-xs font-semibold text-[#135224]">Pre-Built Pantry Crates</p>
          <h2 className="text-2xl font-semibold text-[#16193a] mt-1">Special Grocery Bundles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BUNDLES.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-white border border-[#135224]/15 rounded-[12px] p-4 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] rounded-[10px] overflow-hidden bg-white border border-[#16193a]/10 p-1.5">
                  <SafeImage
                    src={bundle.image}
                    alt={bundle.name}
                    className="w-full h-full object-cover object-top rounded-[7px]"
                  />
                </div>
                <div className="mt-3.5">
                  <span className="inline-block px-2 py-0.5 rounded bg-[#c61d23] text-white text-[11px] font-semibold">
                    {bundle.savingsLabel}
                  </span>
                  <h3 className="text-lg font-semibold text-[#16193a] mt-1.5">{bundle.name}</h3>
                  <p className="text-xs text-[#5a5d76] mt-1.5 leading-relaxed">
                    {bundle.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#135224]/12 flex items-center justify-between gap-2">
                <div>
                  <div className="text-lg font-semibold text-[#135224] tabular-nums">
                    {formatNaira(bundle.bundlePrice)}
                  </div>
                  <div className="text-xs text-[#5a5d76] line-through tabular-nums">
                    {formatNaira(bundle.originalTotal)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddBundle(bundle.id)}
                  className="h-9 px-4 rounded-full bg-[#e6b31e] text-[#0c3b19] text-xs font-semibold hover:bg-[#135224] hover:text-white transition-colors cursor-pointer"
                >
                  Add Bundle
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discounted Products Grid */}
      <section className="py-2">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <p className="text-xs font-semibold text-[#5a5d76]">Illustrative Flash Price Drops</p>
            <h2 className="text-2xl font-semibold text-[#16193a]">
              Discounted Supermarket Items ({discounted.length})
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
          {discounted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
