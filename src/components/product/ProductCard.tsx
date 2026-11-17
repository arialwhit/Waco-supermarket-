import { Link } from 'react-router-dom';
import { Heart, Minus, Plus, Star } from 'lucide-react';
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
    <article className="group bg-white rounded-[14px] p-3 flex flex-col justify-between transition-transform duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-0.5">
      <div>
        <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-[#f4f2eb]">
          <Link to={`/product/${product.slug}`} className="block w-full h-full">
            <SafeImage
              src={product.image}
              alt={product.name}
              fallbackLabel={product.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
            />
          </Link>

          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer ${
              saved
                ? 'bg-[#141a4a] text-[#f7d23a]'
                : 'bg-white/95 text-[#16193a] hover:bg-[#141a4a] hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>

          {discountPct > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-[#f7d23a] text-[#141a4a] text-[11px] font-semibold px-2.5 py-1 rounded-full">
              -{discountPct}%
            </span>
          )}
        </div>

        <div className="mt-3 px-1">
          <div className="flex items-center justify-between gap-2 text-xs text-[#5a5d76]">
            <span className="truncate">
              {product.subcategory} · {product.unit}
            </span>
            <span className="inline-flex items-center gap-1 shrink-0 tabular-nums font-medium text-[#16193a]">
              <Star className="w-3.5 h-3.5 fill-[#f7d23a] text-[#f7d23a]" aria-hidden="true" />
              {product.rating.toFixed(1)}
            </span>
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="mt-1.5 block text-[15px] font-semibold text-[#16193a] leading-snug line-clamp-2 hover:text-[#3a49c9] transition-colors"
          >
            {product.name}
          </Link>
        </div>
      </div>

      <div className="mt-3.5 pt-2.5 px-1 border-t border-[#16193a]/8 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[16px] font-semibold text-[#141a4a] tabular-nums">
            {formatNaira(product.price)}
          </div>
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="text-xs text-[#5a5d76] line-through tabular-nums">
              {formatNaira(product.originalPrice)}
            </div>
          )}
        </div>

        {cartItem ? (
          <div
            className="inline-flex items-center bg-[#141a4a] text-white rounded-full h-9 px-1.5 gap-1.5 shrink-0"
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
            className="h-9 px-4 rounded-full bg-[#e9e7df] text-[#141a4a] text-xs font-semibold whitespace-nowrap shrink-0 hover:bg-[#141a4a] hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Add
          </button>
        )}
      </div>
    </article>
  );
}
