import { NavLink, useLocation } from 'react-router-dom';
import { ClipboardList, Home, ShoppingBag, Store, User } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function MobileBottomNav() {
  const { cartCount, setIsCartOpen, user } = useStore();
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Mobile quick navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#135224]/12 px-2 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 items-center h-[54px]">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-h-[44px] gap-0.5 text-[10px] font-semibold transition-colors ${
              isActive ? 'text-[#135224]' : 'text-[#5a5d76]'
            }`
          }
        >
          <Home className={`w-5 h-5 ${pathname === '/' ? 'stroke-[2.2] text-[#d99b1e]' : 'stroke-[1.7]'}`} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-h-[44px] gap-0.5 text-[10px] font-semibold transition-colors ${
              isActive ? 'text-[#135224]' : 'text-[#5a5d76]'
            }`
          }
        >
          <Store
            className={`w-5 h-5 ${
              pathname.startsWith('/shop') || pathname.startsWith('/categor')
                ? 'stroke-[2.2] text-[#d99b1e]'
                : 'stroke-[1.7]'
            }`}
          />
          <span>Products</span>
        </NavLink>

        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          aria-label={`Open shopping bag (${cartCount} items)`}
          className="relative flex flex-col items-center justify-center min-h-[44px] gap-0.5 text-[10px] font-semibold text-[#135224] cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#c61d23] text-white text-[9px] font-bold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        <NavLink
          to="/account/orders"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-h-[44px] gap-0.5 text-[10px] font-semibold transition-colors ${
              isActive ? 'text-[#135224]' : 'text-[#5a5d76]'
            }`
          }
        >
          <ClipboardList
            className={`w-5 h-5 ${
              pathname.includes('/orders') ? 'stroke-[2.2] text-[#d99b1e]' : 'stroke-[1.7]'
            }`}
          />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to={user ? '/account' : '/login'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-h-[44px] gap-0.5 text-[10px] font-semibold transition-colors ${
              isActive && !pathname.includes('/orders') ? 'text-[#135224]' : 'text-[#5a5d76]'
            }`
          }
        >
          <User
            className={`w-5 h-5 ${
              (pathname === '/account' || pathname === '/login') ? 'stroke-[2.2] text-[#d99b1e]' : 'stroke-[1.7]'
            }`}
          />
          <span>Account</span>
        </NavLink>
      </div>
    </nav>
  );
}
