import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getProductById } from '../data/products';
import { formatNaira } from '../utils/format';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';

export function CartPage() {
  const {
    cart,
    savedForLater,
    updateCartQuantity,
    removeFromCart,
    saveItemForLater,
    moveSavedToCart,
    removeSavedItem,
    cartSubtotal,
    cartDiscount,
    promoCode,
    applyPromoCode,
    clearPromoCode,
  } = useStore();
  const [promoInput, setPromoInput] = useState(promoCode);
  const navigate = useNavigate();

  const deliveryEstimate = cartSubtotal === 0 ? 0 : cartSubtotal >= 35000 ? 0 : 2000;
  const total = Math.max(0, cartSubtotal - cartDiscount + deliveryEstimate);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) applyPromoCode(promoInput);
  };

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs items={[{ label: 'Shopping Bag' }]} />

      <div className="bg-white rounded-[14px] p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#16193a]">Shopping Bag</h1>
        <p className="text-xs md:text-sm text-[#5a5d76] mt-1">
          All subtotals, delivery fees, and promo discounts are illustrative frontend estimates.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-[14px] p-12 text-center">
          <ShoppingBag className="w-12 h-12 text-[#16193a]/25 mx-auto mb-3 stroke-[1.3]" />
          <h2 className="text-xl font-semibold text-[#16193a]">Your shopping bag is empty</h2>
          <p className="text-sm text-[#5a5d76] mt-1.5 max-w-[38ch] mx-auto">
            Add fresh produce, rice, beans, oils, or household items from our aisles to begin checkout.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex items-center justify-center h-11 px-7 rounded-full bg-[#141a4a] text-white text-sm font-semibold hover:bg-[#3a49c9] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)] items-start">
          {/* Bag Items */}
          <div className="lg:col-span-8 space-y-3">
            {cart.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <div
                  key={`${item.productId}-${item.variant}`}
                  className="bg-white rounded-[14px] p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <Link
                    to={`/product/${product.slug}`}
                    className="w-full sm:w-28 h-24 rounded-[10px] overflow-hidden bg-[#f4f2eb] shrink-0"
                  >
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${product.slug}`}
                      className="text-base font-semibold text-[#16193a] hover:text-[#3a49c9] transition-colors block truncate"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-[#5a5d76] mt-0.5">
                      Pack: {item.variant} · Unit: {formatNaira(product.price)}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <div className="inline-flex items-center gap-1.5 bg-[#e9e7df] rounded-full px-2 py-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.productId, item.variant, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-semibold tabular-nums min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.productId, item.variant, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => saveItemForLater(item.productId, item.variant)}
                        className="text-xs font-medium text-[#5a5d76] hover:text-[#16193a] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Bookmark className="w-3.5 h-3.5" /> Save for later
                      </button>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId, item.variant)}
                        className="text-xs font-medium text-[#5a5d76] hover:text-red-700 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="text-lg font-semibold text-[#141a4a] tabular-nums">
                      {formatNaira(product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Card */}
          <aside className="lg:col-span-4 bg-white rounded-[14px] p-6 space-y-5 sticky top-[9vh]">
            <h2 className="text-lg font-semibold text-[#16193a]">Order Summary</h2>

            <form onSubmit={handlePromoSubmit} className="space-y-2">
              <label htmlFor="promo-code" className="block text-xs font-medium text-[#5a5d76]">
                Promo Code (Try <strong className="text-[#16193a]">WACO10</strong>)
              </label>
              <div className="flex gap-2">
                <input
                  id="promo-code"
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 h-10 px-3.5 rounded-full bg-[#e9e7df]/75 text-xs font-semibold text-[#16193a] focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-10 px-4 rounded-full bg-[#141a4a] text-white text-xs font-semibold hover:bg-[#3a49c9] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoCode && (
                <div className="flex items-center justify-between text-xs text-[#1c4a35] font-medium pt-1">
                  <span>Active code: {promoCode}</span>
                  <button type="button" onClick={clearPromoCode} className="underline cursor-pointer">
                    Remove
                  </button>
                </div>
              )}
            </form>

            <div className="space-y-2.5 pt-3 border-t border-[#16193a]/10 text-sm">
              <div className="flex justify-between">
                <span className="text-[#5a5d76]">Subtotal</span>
                <span className="font-semibold tabular-nums">{formatNaira(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5a5d76]">Illustrative Delivery</span>
                <span className="font-semibold tabular-nums">
                  {deliveryEstimate === 0 ? 'Free' : formatNaira(deliveryEstimate)}
                </span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#1c4a35]">
                  <span>Discount ({promoCode})</span>
                  <span className="font-semibold tabular-nums">-{formatNaira(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-[#16193a]/10 text-base font-semibold text-[#141a4a]">
                <span>Estimated Total</span>
                <span className="tabular-nums">{formatNaira(total)}</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full h-11 rounded-full bg-[#f7d23a] text-[#141a4a] text-sm font-semibold hover:bg-[#141a4a] hover:text-white transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/shop"
                className="w-full h-11 rounded-full bg-[#e9e7df] text-[#141a4a] text-sm font-semibold flex items-center justify-center hover:bg-[#141a4a] hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Saved For Later */}
      {savedForLater.length > 0 && (
        <section className="bg-white rounded-[14px] p-6 md:p-8">
          <h2 className="text-lg font-semibold text-[#16193a] mb-4">
            Saved for Later ({savedForLater.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {savedForLater.map((saved) => {
              const p = getProductById(saved.productId);
              if (!p) return null;
              return (
                <div
                  key={`${saved.productId}-${saved.variant}`}
                  className="bg-[#e9e7df]/55 rounded-[12px] p-3 flex items-center gap-3"
                >
                  <SafeImage
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate">{p.name}</p>
                    <p className="text-xs text-[#5a5d76] tabular-nums">
                      {saved.variant} · {formatNaira(p.price)}
                    </p>
                    <div className="mt-2 flex gap-3 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => moveSavedToCart(saved.productId, saved.variant)}
                        className="text-[#3a49c9] hover:underline cursor-pointer"
                      >
                        Move to bag
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSavedItem(saved.productId, saved.variant)}
                        className="text-[#5a5d76] hover:text-[#16193a] cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
