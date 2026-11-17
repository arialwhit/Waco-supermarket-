import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { getProductById } from '../../data/products';
import { formatNaira } from '../../utils/format';
import { SafeImage } from '../common/SafeImage';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
  } = useStore();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeThreshold = 35000;
  const remaining = Math.max(0, freeThreshold - cartSubtotal);
  const progress = Math.min(100, (cartSubtotal / freeThreshold) * 100);

  return (
    <div className="fixed inset-0 z-[80] flex justify-end">
      <div
        className="absolute inset-0 bg-[#16193a]/40"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />
      <aside
        aria-label="Shopping Bag"
        className="relative w-full max-w-[430px] h-full bg-[#e9e7df] flex flex-col justify-between z-10 p-4 md:p-5"
      >
        <div className="bg-white rounded-[14px] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#141a4a]" />
            <h2 className="text-lg font-semibold text-[#16193a]">
              Shopping Bag <span className="text-sm font-normal text-[#5a5d76] tabular-nums">({cartCount})</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close shopping bag"
            className="w-9 h-9 rounded-full bg-[#e9e7df] flex items-center justify-center text-[#16193a] hover:bg-[#141a4a] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Illustrative free delivery threshold progress */}
        <div className="bg-white rounded-[14px] px-5 py-3 mt-3">
          <p className="text-xs font-medium text-[#16193a]">
            {remaining === 0
              ? 'You unlocked illustrative free neighborhood delivery!'
              : `Add ${formatNaira(remaining)} more for illustrative free delivery`}
          </p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-[#e9e7df] overflow-hidden">
            <div
              className="h-full bg-[#141a4a] rounded-full transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mt-3 space-y-2.5 pr-0.5">
          {cart.length === 0 ? (
            <div className="bg-white rounded-[14px] p-8 text-center h-full flex flex-col items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-[#16193a]/30 mb-3 stroke-[1.3]" />
              <p className="text-base font-semibold text-[#16193a]">Your bag is empty</p>
              <p className="text-sm text-[#5a5d76] mt-1 max-w-[26ch]">
                Browse fresh produce, grains, proteins, and pantry staples to fill your bag.
              </p>
              <Link
                to="/shop"
                onClick={() => setIsCartOpen(false)}
                className="mt-5 inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#141a4a] text-white text-sm font-semibold hover:bg-[#3a49c9] transition-colors"
              >
                Explore Supermarket
              </Link>
            </div>
          ) : (
            cart.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <div
                  key={`${item.productId}-${item.variant}`}
                  className="bg-white rounded-[14px] p-3 flex gap-3 items-center"
                >
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={() => setIsCartOpen(false)}
                    className="w-20 h-16 rounded-[10px] overflow-hidden bg-[#f4f2eb] shrink-0"
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
                      onClick={() => setIsCartOpen(false)}
                      className="text-sm font-semibold text-[#16193a] truncate block hover:text-[#3a49c9]"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-[#5a5d76] mt-0.5">{item.variant}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[#141a4a] tabular-nums">
                        {formatNaira(product.price * item.quantity)}
                      </span>
                      <div className="inline-flex items-center gap-1 bg-[#e9e7df] rounded-full px-1.5 py-0.5">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.productId, item.variant, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold tabular-nums min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.productId, item.variant, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId, item.variant)}
                    aria-label={`Remove ${product.name}`}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#5a5d76] hover:text-[#16193a] hover:bg-[#e9e7df] cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="bg-white rounded-[14px] p-4 mt-3 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#5a5d76]">Subtotal (Illustrative)</span>
              <span className="text-lg font-semibold text-[#141a4a] tabular-nums">
                {formatNaira(cartSubtotal)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/cart');
                }}
                className="h-11 rounded-full bg-[#e9e7df] text-[#141a4a] text-sm font-semibold hover:bg-[#141a4a] hover:text-white transition-colors cursor-pointer"
              >
                View Bag
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="h-11 rounded-full bg-[#f7d23a] text-[#141a4a] text-sm font-semibold hover:bg-[#141a4a] hover:text-white transition-colors cursor-pointer"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
