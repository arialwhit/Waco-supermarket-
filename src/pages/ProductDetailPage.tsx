import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Heart, Minus, Plus, Star, ZoomIn, X } from 'lucide-react';
import { getCategoryBySlug } from '../data/categories';
import { getProductBySlug, PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatNaira, getDiscountPercent } from '../utils/format';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';
import { ProductCard } from '../components/product/ProductCard';

export function ProductDetailPage() {
  const { slug = '' } = useParams();
  const product = getProductBySlug(slug);
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useStore();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [qty, setQty] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImageIdx(0);
      setSelectedVariant(product.variants[0] || product.unit);
      setQty(1);
      setZoomOpen(false);
    }
  }, [product]);

  const category = product ? getCategoryBySlug(product.categoryId) : undefined;

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(
      (p) => p.categoryId === product.categoryId && p.id !== product.id
    ).slice(0, 4);
  }, [product]);

  const frequentlyBought = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(
      (p) => p.id !== product.id && p.categoryId !== product.categoryId && p.bestSelling
    ).slice(0, 2);
  }, [product]);

  if (!product) {
    return (
      <div className="w-[var(--w)] mx-auto pt-[110px] pb-16">
        <div className="bg-white rounded-[14px] p-12 text-center">
          <h1 className="text-2xl font-semibold text-[#16193a]">Product not found</h1>
          <p className="text-sm text-[#5a5d76] mt-2">
            This item may have moved or been updated in our catalog.
          </p>
          <Link
            to="/shop"
            className="mt-5 inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#141a4a] text-white text-sm font-semibold"
          >
            Back to Supermarket
          </Link>
        </div>
      </div>
    );
  }

  const saved = isInWishlist(product.id);
  const discountPct = getDiscountPercent(product.price, product.originalPrice);
  const activeImg = product.images[activeImageIdx] || product.image;

  const handleAddTogether = () => {
    addToCart(product.id, 1, selectedVariant || product.unit, true);
    frequentlyBought.forEach((item) => addToCart(item.id, 1, item.variants[0], true));
    showToast(
      'Added 3 items to bag',
      `${product.name} + ${frequentlyBought.length} pantry pairings`,
      'success'
    );
  };

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs
        items={[
          { label: 'Shop', to: '/shop' },
          ...(category ? [{ label: category.name, to: `/category/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      {/* Primary Contiguous Product Module */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)] items-start">
        {/* Left Gallery */}
        <div className="lg:col-span-6 bg-white rounded-[14px] p-4 md:p-5">
          <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden bg-white border border-[#16193a]/10 p-2 group">
            <SafeImage
              src={activeImg}
              alt={product.name}
              className="w-full h-full object-cover rounded-[8px] transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              aria-label="Zoom product photograph"
              className="absolute bottom-4 right-4 h-9 px-3.5 rounded-full bg-white text-[#16193a] border border-[#16193a]/10 text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-[#135224] hover:text-white transition-colors cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" /> Zoom
            </button>
          </div>

          {product.images.length > 1 && (
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={`${imgUrl}-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-[4/3] rounded-[10px] overflow-hidden bg-white p-1 border-2 transition-colors cursor-pointer ${
                    activeImageIdx === idx
                      ? 'border-[#135224]'
                      : 'border-[#16193a]/10 opacity-80 hover:opacity-100'
                  }`}
                >
                  <SafeImage
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover rounded-[6px]"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Purchase Details */}
        <div className="lg:col-span-6 bg-white rounded-[14px] p-6 md:p-8 space-y-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#5a5d76]">
              {product.isWacoSignature && (
                <span className="bg-[#135224] text-[#f7d23a] text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
                  WACO Signature
                </span>
              )}
              <span>{category?.name || product.subcategory}</span>
              <span aria-hidden="true">·</span>
              <span>{product.subcategory}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-[#16193a] font-semibold tabular-nums">
                <Star className="w-3.5 h-3.5 fill-[#f7d23a] text-[#f7d23a]" />
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-[#16193a] tracking-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-[#135224] tabular-nums">
                {formatNaira(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-base text-[#5a5d76] line-through tabular-nums">
                    {formatNaira(product.originalPrice)}
                  </span>
                  <span className="text-xs font-semibold text-white bg-[#c61d23] px-2.5 py-0.5 rounded-md">
                    Save {discountPct}%
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-[#5a5d76] mt-1">
              Illustrative store demo price · Pack: {product.unit}
            </p>
          </div>

          <p className="text-sm md:text-[15px] text-[#16193a]/85 leading-relaxed">
            {product.description}
          </p>

          {/* Availability */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1c4a35]">
            <Check className="w-4 h-4" />
            <span>
              {product.availability === 'low_stock'
                ? `Low shelf stock (${product.stockQuantity} packs illustrative)`
                : `In store & ready for dispatch (${product.stockQuantity} packs illustrative)`}
            </span>
          </div>

          {/* Package Variants */}
          <div>
            <p className="text-xs font-semibold text-[#16193a] mb-2">
              Select Weight / Package Size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => {
                const active = selectedVariant === variant;
                return (
                  <button
                    key={variant}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`h-9 px-4 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#141a4a] text-white'
                        : 'bg-[#e9e7df] text-[#16193a] hover:bg-[#f7d23a]'
                    }`}
                  >
                    {variant}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity + Primary CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center bg-[#e9e7df] rounded-full h-11 px-2 gap-2">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-semibold tabular-nums min-w-[24px] text-center">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => addToCart(product.id, qty, selectedVariant || product.unit)}
              className="flex-1 min-w-[180px] h-11 px-6 rounded-full bg-[#f7d23a] text-[#141a4a] text-sm font-semibold hover:bg-[#141a4a] hover:text-white transition-colors cursor-pointer"
            >
              Add to Shopping Bag
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                saved
                  ? 'bg-[#141a4a] text-[#f7d23a]'
                  : 'bg-[#e9e7df] text-[#16193a] hover:bg-[#141a4a] hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Specifications */}
          <div className="pt-4 border-t border-[#16193a]/10">
            <h2 className="text-xs font-semibold text-[#5a5d76] mb-3">Product Specifications</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {product.specifications.map((spec) => (
                <div key={spec.label} className="bg-[#e9e7df]/55 rounded-[10px] p-3">
                  <dt className="text-[#5a5d76]">{spec.label}</dt>
                  <dd className="font-semibold text-[#16193a] mt-0.5">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Frequently Bought Together + Customer Reviews */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)]">
        <div className="lg:col-span-5 bg-[#f7d23a] text-[#141a4a] rounded-[14px] p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold">Frequently Bought Together</span>
            <h2 className="text-xl font-semibold mt-1">Complete your kitchen basket</h2>
            <div className="mt-4 space-y-2.5">
              {[product, ...frequentlyBought].map((item) => (
                <div key={item.id} className="bg-white/85 rounded-[10px] p-2.5 flex items-center gap-3">
                  <SafeImage
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-10 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold truncate">{item.name}</p>
                    <p className="text-xs text-[#141a4a]/75 tabular-nums">{formatNaira(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddTogether}
            className="mt-5 h-10 w-full rounded-full bg-[#141a4a] text-white text-xs font-semibold hover:bg-white hover:text-[#141a4a] transition-colors cursor-pointer"
          >
            Add All 3 Items ({formatNaira(product.price + frequentlyBought.reduce((s, p) => s + p.price, 0))})
          </button>
        </div>

        <div className="lg:col-span-7 bg-white rounded-[14px] p-6">
          <h2 className="text-xl font-semibold text-[#16193a] mb-4">
            Illustrative Customer Reviews
          </h2>
          <div className="space-y-3">
            {(product.reviews || []).map((rev) => (
              <div key={rev.id} className="bg-[#e9e7df]/55 rounded-[12px] p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#16193a]">{rev.author}</span>
                  <span className="text-[#5a5d76]">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#f7d23a] text-[#f7d23a]" />
                  ))}
                </div>
                <p className="mt-2 text-xs md:text-sm text-[#16193a]/85 leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-2">
          <h2 className="text-2xl font-semibold text-[#16193a] mb-4 px-1">
            More in {category?.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Image Zoom Modal */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[90] bg-[#16193a]/80 flex items-center justify-center p-4"
          onClick={() => setZoomOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-[14px] p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              aria-label="Close zoom modal"
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-[#141a4a] text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <SafeImage
              src={activeImg}
              alt={product.name}
              className="w-full max-h-[75vh] object-contain rounded-[10px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
