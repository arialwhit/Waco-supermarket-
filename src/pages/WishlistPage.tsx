import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getProductById } from '../data/products';
import { formatNaira } from '../utils/format';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';

export function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const savedProducts = wishlist
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const moveToCart = (productId: string, variant: string) => {
    addToCart(productId, 1, variant);
  };

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs items={[{ label: 'Wishlist' }]} />

      <div className="bg-white rounded-[14px] p-6 md:p-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#16193a]">Saved Wishlist</h1>
          <p className="text-xs md:text-sm text-[#5a5d76] mt-1 tabular-nums">
            {savedProducts.length} saved grocery item(s) for future restocks.
          </p>
        </div>
      </div>

      {savedProducts.length === 0 ? (
        <div className="bg-white rounded-[14px] p-12 text-center">
          <Heart className="w-10 h-10 text-[#16193a]/25 mx-auto mb-3 stroke-[1.3]" />
          <h2 className="text-xl font-semibold text-[#16193a]">Your wishlist is empty</h2>
          <p className="text-sm text-[#5a5d76] mt-1.5">
            Tap the heart icon on any grocery item to keep it handy here.
          </p>
          <Link
            to="/shop"
            className="mt-5 inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#141a4a] text-white text-sm font-semibold"
          >
            Browse Supermarket
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
          {savedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-[14px] p-3 flex flex-col justify-between">
              <div>
                <Link
                  to={`/product/${product.slug}`}
                  className="block aspect-[4/3] rounded-[10px] overflow-hidden bg-[#f4f2eb]"
                >
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="mt-3 px-1">
                  <p className="text-xs text-[#5a5d76]">{product.unit}</p>
                  <Link
                    to={`/product/${product.slug}`}
                    className="mt-1 block text-[15px] font-semibold text-[#16193a] hover:text-[#3a49c9] truncate"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-base font-semibold text-[#141a4a] tabular-nums">
                    {formatNaira(product.price)}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-2.5 px-1 border-t border-[#16193a]/10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => moveToCart(product.id, product.variants[0] || product.unit)}
                  className="flex-1 h-9 px-3 rounded-full bg-[#141a4a] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-[#3a49c9] transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="w-9 h-9 rounded-full bg-[#e9e7df] text-[#16193a] flex items-center justify-center hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
