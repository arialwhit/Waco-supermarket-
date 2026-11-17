import { Link } from 'react-router-dom';
import { CheckCircle2, Heart, Minus, Plus, Star } from 'lucide-react';
import { Product } from '../../types/store';
import { useStore } from '../../context/StoreContext';
import { formatNaira, getDiscountPercent } from '../../utils/format';
import { SafeImage } from '../common/SafeImage';

export function ProductCard({ product }: { product: Product }) {
  const { cart, addToCart, updateCartQuantity, toggleWishlist, isInWishlist } = useStore();
  const defaultVariant = product.variants[0] || product.unit;
  const cartItem = cart.find(
    (item) => item.productId === product.id && item.variant === defaultVariant
  );
  const saved = isInWishlist(product.id);
  const discountPct = getDiscountPercent(product.price, product.originalPrice);

  return (
    <article className="group bg-white rounded-[14px] p-3 flex flex-col justify-between border border-[#16193a]/8 transition-transform duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-0.5">
      <div>
        {/* Crisp Pure White Product Photography Frame */}
        <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden bg-white border border-[#16193a]/10 p-1.5">
          <Link to={`/product/${product.slug}`} className="block w-full h-full rounded-[8px] overflow-hidden bg-white">
            <SafeImage
              src={product.image}
              alt={product.name}
              fallbackLabel={product.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
            />
          </Link>

          {/* Top-left single crisp status tag (no badge clusters) */}
          {discountPct > 0 ? (
            <span className="absolute top-2.5 left-2.5 bg-[#c61d23] text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
              -{discountPct}%
            </span>
          ) : product.isWacoSignature ? (
            <span className="absolute top-2.5 left-2.5 bg-[#135224] text-[#f7d23a] text-[10px] font-semibold px-2 py-0.5 rounded-md">
              WACO Pack
            </span>
          ) : null}

          {/* Top-right Wishlist Button (40px+ touch target) */}
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            className={`absolute top-2 right-2 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-xs ${
              saved
                ? 'bg-[#c61d23] text-white'
                : 'bg-white/95 text-[#16193a] border border-[#16193a]/10 hover:bg-[#135224] hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>

          {/* PricePally-inspired Golden Circular Quick-Add Overlay CTA */}
          {cartItem ? (
            <div
              className="absolute bottom-2 right-2 inline-flex items-center bg-[#135224] text-white rounded-full h-9 px-1.5 gap-1 shadow-md"
              aria-label={`Quantity controls for ${product.name}`}
            >
              <button
                type="button"
                onClick={() => updateCartQuantity(product.id, defaultVariant, cartItem.quantity - 1)}
                aria-label="Decrease quantity"
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-semibold tabular-nums min-w-[16px] text-center">
                {cartItem.quantity}
              </span>
              <button
                type="button"
                onClick={() => updateCartQuantity(product.id, defaultVariant, cartItem.quantity + 1)}
                aria-label="Increase quantity"
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product.id, 1, defaultVariant)}
              aria-label={`Add ${product.name} to shopping bag`}
              className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-[#e6b31e] text-[#0c3b19] flex items-center justify-center shadow-md hover:bg-[#135224] hover:text-white active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-5 h-5 stroke-[2.3]" />
            </button>
          )}
        </div>

        {/* Clean Metadata & Title */}
        <div className="mt-3 px-0.5">
          <Link
            to={`/product/${product.slug}`}
            className="block text-[15px] font-semibold text-[#16193a] leading-snug line-clamp-2 hover:text-[#135224] transition-colors"
          >
            {product.name}
          </Link>

          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-[16px] font-bold text-[#135224] tabular-nums">
              {formatNaira(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#5a5d76] line-through tabular-nums">
                {formatNaira(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="mt-1 text-xs text-[#5a5d76] truncate">
            {product.unit} · {product.variants.length} pack {product.variants.length === 1 ? 'option' : 'options'}
          </div>
        </div>
      </div>

      {/* Bottom Trust & Rating Footer Row */}
      <div className="mt-3 pt-2.5 px-0.5 border-t border-[#16193a]/8 flex items-center justify-between gap-2 text-xs">
        <span className="inline-flex items-center gap-1 tabular-nums font-medium text-[#16193a]">
          <Star className="w-3.5 h-3.5 fill-[#e6b31e] text-[#e6b31e]" aria-hidden="true" />
          ({product.rating.toFixed(1)})
        </span>
        <span className="inline-flex items-center gap-1 text-[#135224] font-medium truncate">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{product.isWacoSignature ? 'Sealed Pack' : 'Ready in store'}</span>
        </span>
      </div>
    </article>
  );
}
