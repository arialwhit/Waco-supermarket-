import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { useStore } from '../../context/StoreContext';

export function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Enter a valid email address', undefined, 'warning');
      return;
    }
    showToast('Subscribed to WACO updates (demo)', email, 'success');
    setEmail('');
  };

  return (
    <footer className="w-[var(--w)] mx-auto mt-[var(--gap)] mb-8">
      <div className="bg-[#141a4a] text-white rounded-[14px] p-6 md:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-white/15">
          <div className="lg:col-span-5">
            <Link to="/" className="text-3xl font-semibold tracking-[-0.03em] text-white">
              WACO
            </Link>
            <p className="mt-3 text-sm text-white/75 max-w-[40ch] leading-relaxed">
              Your neighborhood retail supermarket brought online. Fresh Nigerian produce, stone-free staples, chilled proteins, and household care.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6 max-w-md">
              <label htmlFor="footer-newsletter" className="block text-xs font-semibold text-[#f7d23a] mb-2">
                Weekly Pantry &amp; Harvest Notes
              </label>
              <div className="flex gap-2">
                <input
                  id="footer-newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 h-11 px-4 rounded-full bg-white/10 text-white placeholder:text-white/50 text-sm focus:outline-none focus:bg-white/15"
                />
                <button
                  type="submit"
                  className="h-11 px-5 rounded-full bg-[#f7d23a] text-[#141a4a] text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-white transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-semibold text-[#f7d23a] mb-3">Popular Aisles</p>
              <ul className="space-y-2 text-white/80">
                {CATEGORIES.slice(0, 6).map((cat) => (
                  <li key={cat.id}>
                    <Link to={`/category/${cat.slug}`} className="hover:text-white transition-colors">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold text-[#f7d23a] mb-3">Shop &amp; Account</p>
              <ul className="space-y-2 text-white/80">
                <li><Link to="/shop" className="hover:text-white">All Products</Link></li>
                <li><Link to="/categories" className="hover:text-white">All 15 Categories</Link></li>
                <li><Link to="/offers" className="hover:text-white">Special Offers</Link></li>
                <li><Link to="/cart" className="hover:text-white">Shopping Bag</Link></li>
                <li><Link to="/wishlist" className="hover:text-white">Saved Wishlist</Link></li>
                <li><Link to="/account" className="hover:text-white">Customer Account</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-[#f7d23a] mb-3">Store &amp; Policies</p>
              <ul className="space-y-2 text-white/80">
                <li><Link to="/about" className="hover:text-white">About WACO</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact &amp; Store Hours</Link></li>
                <li><Link to="/delivery" className="hover:text-white">Delivery Information</Link></li>
                <li><Link to="/faq" className="hover:text-white">Help &amp; FAQ</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms &amp; Conditions</Link></li>
                <li><Link to="/returns-policy" className="hover:text-white">Returns Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/65">
          <p>© 2026 WACO Supermarket. All product prices, delivery windows, and order flows are illustrative frontend demos.</p>
          <p className="shrink-0">Customer-Facing Storefront · Phase 1</p>
        </div>
      </div>
    </footer>
  );
}
