import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';
import { ANNOUNCEMENTS } from '../../data/mockStoreData';

export function Navbar() {
  const { cartCount, wishlist, user, setIsCartOpen, setIsSearchOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [scrolledPastBanner, setScrolledPastBanner] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  const closeTimerRef = useRef<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setMobileNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4800);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolledPastBanner(window.scrollY > 24);
    };
    const onResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    onScroll();
    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const openMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMenuOpen(true);
  };

  const scheduleCloseMenu = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setMenuOpen(false);
    }, 160);
  };

  const navTopOffset =
    !isSmallScreen && !bannerDismissed && !scrolledPastBanner ? '40px' : '12px';

  return (
    <>
      {/* Slim static top announcement ribbon (desktop/tablet only so mobile sticky height stays compact) */}
      {!bannerDismissed && (
        <div className="hidden sm:flex w-full h-8 bg-[#135224] text-white text-xs items-center justify-center relative px-10 z-40">
          <p className="truncate font-medium tracking-wide text-center text-[#f7d23a]">
            {ANNOUNCEMENTS[announcementIdx]}
          </p>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss store notice"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Fixed MotionSites white rounded navigation bar */}
      <header
        id="nav"
        style={{ top: navTopOffset }}
        className="fixed left-1/2 -translate-x-1/2 w-[var(--w)] h-[46px] md:h-[5.2vh] md:min-h-[48px] bg-white rounded-[10px] z-50 flex items-center justify-between px-3.5 md:px-[2.4vw] transition-[top] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] border border-[#135224]/10"
      >
        {/* Zone 1: Brand Emblem & Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open mobile navigation"
            className="md:hidden w-9 h-9 -ml-1 flex items-center justify-center rounded-lg text-[#135224] hover:bg-[#e9e7df]/70 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 whitespace-nowrap shrink-0 group"
          >
            <img
              src="/assets/waco/waco-logo-transparent.png"
              alt="WACO Foods Logo"
              className="h-7 md:h-8 w-auto object-contain"
            />
            <span className="text-[clamp(16px,1.25vw,21px)] font-bold tracking-[-0.03em] text-[#135224] group-hover:text-[#0c3b19] transition-colors">
              WACO <span className="font-semibold text-[#c61d23]">FOODS</span>
            </span>
          </Link>
        </div>

        {/* Zone 2: Primary Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-[2.1vw] text-[clamp(12px,0.95vw,15px)] font-medium text-[#16193a]"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link-line whitespace-nowrap shrink-0 ${isActive ? 'active text-[#135224]' : 'hover:text-[#135224]'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `nav-link-line whitespace-nowrap shrink-0 ${isActive ? 'active text-[#135224]' : 'hover:text-[#135224]'}`
            }
          >
            Shop
          </NavLink>
          <div
            onMouseEnter={openMenu}
            onMouseLeave={scheduleCloseMenu}
            className="relative flex items-center"
          >
            <Link
              to="/categories"
              onClick={(e) => {
                if (window.innerWidth >= 768) {
                  e.preventDefault();
                  setMenuOpen((v) => !v);
                }
              }}
              aria-expanded={menuOpen}
              className={`nav-link-line flex items-center gap-1 whitespace-nowrap shrink-0 hover:text-[#135224] transition-opacity duration-200 ${
                menuOpen ? 'opacity-60 text-[#135224]' : ''
              }`}
            >
              <span>Categories</span>
              <svg
                viewBox="0 0 10 10"
                className={`w-[9px] h-[9px] transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                  menuOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                <polyline
                  points="1.5,3.5 5,7 8.5,3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <NavLink
            to="/offers"
            className={({ isActive }) =>
              `nav-link-line whitespace-nowrap shrink-0 ${isActive ? 'active text-[#135224]' : 'hover:text-[#135224]'}`
            }
          >
            Offers
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link-line whitespace-nowrap shrink-0 ${isActive ? 'active text-[#135224]' : 'hover:text-[#135224]'}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `nav-link-line whitespace-nowrap shrink-0 ${isActive ? 'active text-[#135224]' : 'hover:text-[#135224]'}`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Zone 3: Utility Actions */}
        <div className="flex items-center gap-1.5 md:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search products"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#16193a] hover:bg-[#135224]/10 hover:text-[#135224] transition-colors cursor-pointer"
          >
            <Search className="w-[17px] h-[17px] stroke-[1.7]" />
          </button>

          <Link
            to="/wishlist"
            aria-label={`Wishlist (${wishlist.length} items)`}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#16193a] hover:bg-[#135224]/10 hover:text-[#c61d23] transition-colors"
          >
            <Heart className="w-[17px] h-[17px] stroke-[1.7]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#c61d23] text-white text-[10px] font-semibold flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            to={user ? '/account' : '/login'}
            aria-label={user ? 'Customer account' : 'Sign in'}
            className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-[#16193a] hover:bg-[#135224]/10 hover:text-[#135224] transition-colors"
          >
            <User className="w-[17px] h-[17px] stroke-[1.7]" />
          </Link>

          <motion.button
            key={cartCount}
            initial={{ scale: 0.94 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 460, damping: 22 }}
            type="button"
            data-cart-target="desktop"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping cart (${cartCount} items)`}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-[#135224] text-white text-xs font-semibold hover:bg-[#0c3b19] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[2] text-[#f7d23a]" />
            <span className="tabular-nums">{cartCount}</span>
          </motion.button>
        </div>
      </header>

      {/* MotionSites Clip-path Wipe-Down Mega-Menu Strip */}
      <div
        id="drop"
        onMouseEnter={openMenu}
        onMouseLeave={scheduleCloseMenu}
        style={{
          top:
            !bannerDismissed && !scrolledPastBanner
              ? 'calc(40px + 5.2vh + 0.9vh)'
              : 'calc(1.6vh + 5.2vh + 0.9vh)',
        }}
        className={`hidden md:flex fixed left-1/2 -translate-x-1/2 w-[var(--w)] min-h-[78px] bg-white rounded-[10px] z-49 items-center justify-center gap-[5vw] px-6 waco-drop-strip ${
          menuOpen ? 'open' : ''
        }`}
      >
        <Link
          to="/shop"
          className="waco-drop-item group flex flex-col items-center gap-1.5 text-[#16193a] hover:text-[#135224]"
        >
          <svg
            viewBox="0 0 36 36"
            className="w-7 h-7 stroke-[#16193a] group-hover:stroke-[#135224] transition-colors"
            fill="none"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="14" width="26" height="17" />
            <polyline points="3,14 6,6 30,6 33,14" />
            <polyline points="14,31 14,22 22,22 22,31" />
            <rect x="9" y="18" width="4" height="3" />
          </svg>
          <span className="text-[12px] font-medium whitespace-nowrap">Shop All</span>
        </Link>

        <Link
          to="/category/rice-grains"
          className="waco-drop-item group flex flex-col items-center gap-1.5 text-[#16193a] hover:text-[#135224]"
        >
          <svg
            viewBox="0 0 36 36"
            className="w-7 h-7 stroke-[#16193a] group-hover:stroke-[#135224] transition-colors"
            fill="none"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="18,4 25,8 25,16 18,20 11,16 11,8" />
            <polyline points="11,8 18,12 25,8" />
            <line x1="18" y1="12" x2="18" y2="20" />
            <polygon points="11,20 18,24 18,32 11,28" />
            <polygon points="25,20 18,24 18,32 25,28" />
          </svg>
          <span className="text-[12px] font-medium whitespace-nowrap">Pantry &amp; Grains</span>
        </Link>

        <Link
          to="/category/vegetables"
          className="waco-drop-item group flex flex-col items-center gap-1.5 text-[#16193a] hover:text-[#135224]"
        >
          <svg
            viewBox="0 0 36 36"
            className="w-7 h-7 stroke-[#16193a] group-hover:stroke-[#135224] transition-colors"
            fill="none"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8,28 C8,14 17,7 30,7 C30,20 22,28 8,28 Z" />
            <path d="M8,28 Q16,20 24,14" />
          </svg>
          <span className="text-[12px] font-medium whitespace-nowrap">Fresh Produce</span>
        </Link>

        <Link
          to="/category/meat-poultry"
          className="waco-drop-item group flex flex-col items-center gap-1.5 text-[#16193a] hover:text-[#135224]"
        >
          <svg
            viewBox="0 0 36 36"
            className="w-7 h-7 stroke-[#16193a] group-hover:stroke-[#135224] transition-colors"
            fill="none"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="3.5" />
            <circle cx="25" cy="11" r="3.5" />
            <circle cx="18" cy="15" r="3" />
            <path d="M5,28 Q11,19 17,28" />
            <path d="M19,28 Q25,19 31,28" />
            <path d="M13,31 Q18,23 23,31" />
          </svg>
          <span className="text-[12px] font-medium whitespace-nowrap">Family &amp; Proteins</span>
        </Link>

        <Link
          to="/offers"
          className="waco-drop-item group flex flex-col items-center gap-1.5 text-[#16193a] hover:text-[#c61d23]"
        >
          <svg
            viewBox="0 0 36 36"
            className="w-7 h-7 stroke-[#16193a] group-hover:stroke-[#c61d23] transition-colors"
            fill="none"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="18" r="14" />
            <polygon points="20,7 13,19 19,19 16,29 24,16 18,16" />
          </svg>
          <span className="text-[12px] font-medium whitespace-nowrap">Weekly Offers</span>
        </Link>

        <Link
          to="/categories"
          className="waco-drop-item text-[12px] font-semibold text-[#135224] hover:underline whitespace-nowrap"
        >
          All 15 Aisles →
        </Link>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <div
            className="absolute inset-0 bg-[#16193a]/40"
            onClick={() => setMobileNavOpen(false)}
          />
          <aside className="relative w-[84vw] max-w-[340px] h-full bg-[#e9e7df] p-5 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#135224]/15">
                <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-[#135224]">
                  <img
                    src="/assets/waco/waco-logo-transparent.png"
                    alt="WACO Foods"
                    className="h-7 w-auto object-contain"
                  />
                  <span>WACO <span className="text-[#c61d23] font-semibold">FOODS</span></span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Close mobile menu"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#135224]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-5 space-y-1">
                {[
                  { label: 'Home', to: '/' },
                  { label: 'Shop All Products', to: '/shop' },
                  { label: 'All 15 Categories', to: '/categories' },
                  { label: 'Special Offers & Bundles', to: '/offers' },
                  { label: 'My Account', to: user ? '/account' : '/login' },
                  { label: 'Wishlist', to: '/wishlist' },
                  { label: 'About WACO Foods', to: '/about' },
                  { label: 'Contact & Store Info', to: '/contact' },
                  { label: 'Delivery Info', to: '/delivery' },
                  { label: 'FAQ', to: '/faq' },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block py-2.5 px-3 rounded-[10px] text-[15px] font-medium text-[#16193a] hover:bg-white hover:text-[#135224] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#135224]/15">
                <p className="text-xs font-semibold text-[#135224] px-3 mb-2">Quick Aisles</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {CATEGORIES.slice(0, 8).map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className="text-xs font-medium text-[#16193a] bg-white/85 rounded-lg px-2.5 py-2 truncate"
                    >
                      {cat.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#135224]/15 text-xs text-[#5a5d76]">
              WACO Foods · Shop F1008, Apo Urban Market, Abuja
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
