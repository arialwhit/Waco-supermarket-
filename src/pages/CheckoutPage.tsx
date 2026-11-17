import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Landmark, ShieldAlert, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getProductById } from '../data/products';
import { formatNaira } from '../utils/format';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';

const NIGERIAN_STATES = ['Lagos', 'Abuja (FCT)', 'Ogun', 'Rivers', 'Oyo', 'Enugu', 'Kano'];

export function CheckoutPage() {
  const { cart, user, cartSubtotal, cartDiscount, placeSimulatedOrder, showToast } = useStore();
  const navigate = useNavigate();

  const defaultAddr = user?.addresses?.[0];

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [state, setState] = useState(defaultAddr?.state || 'Lagos');
  const [city, setCity] = useState(defaultAddr?.city || 'Lekki Phase 1');
  const [address, setAddress] = useState(defaultAddr?.street || '');
  const [instructions, setInstructions] = useState(defaultAddr?.instructions || '');
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'pickup'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'pay_on_delivery'>('card');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    return (
      <div className="w-[var(--w)] mx-auto pt-[110px] pb-16">
        <div className="bg-white rounded-[14px] p-12 text-center">
          <h1 className="text-2xl font-semibold text-[#16193a]">Your bag is empty</h1>
          <p className="text-sm text-[#5a5d76] mt-1.5">
            Add groceries before opening simulated checkout.
          </p>
          <Link
            to="/shop"
            className="mt-5 inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#141a4a] text-white text-sm font-semibold"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const deliveryFee =
    deliveryMethod === 'pickup'
      ? 0
      : deliveryMethod === 'express'
      ? 3500
      : cartSubtotal >= 35000
      ? 0
      : 2000;
  const total = Math.max(0, cartSubtotal - cartDiscount + deliveryFee);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = 'Full name is required.';
    if (!email.trim() || !email.includes('@')) next.email = 'Valid email address is required.';
    if (!phone.trim() || phone.trim().length < 7) next.phone = 'Valid phone number is required.';
    if (deliveryMethod !== 'pickup') {
      if (!city.trim()) next.city = 'City or neighborhood is required.';
      if (!address.trim()) next.address = 'Delivery street address is required.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please check highlighted fields', undefined, 'warning');
      return;
    }
    const order = placeSimulatedOrder({
      customer: { fullName, email, phone },
      delivery: {
        state,
        city: deliveryMethod === 'pickup' ? 'WACO Flagship Store' : city,
        address: deliveryMethod === 'pickup' ? 'In-store Click & Collect Counter' : address,
        instructions,
        method: deliveryMethod,
      },
      paymentMethod,
      deliveryFee,
    });
    navigate(`/order-confirmation/${order.id}`);
  };

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs items={[{ label: 'Shopping Bag', to: '/cart' }, { label: 'Checkout' }]} />

      {/* Illustrative Demo Notice */}
      <div className="bg-[#f7d23a] text-[#141a4a] rounded-[14px] px-5 py-3.5 flex items-center gap-3 text-xs md:text-sm font-medium">
        <ShieldAlert className="w-4 h-4 shrink-0" />
        <span>
          Frontend Checkout Demonstration: No payment gateway is connected and no real charge will be made.
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)] items-start">
        <div className="lg:col-span-8 space-y-[var(--gap)]">
          {/* Customer Information */}
          <section className="bg-white rounded-[14px] p-6 md:p-7 space-y-4">
            <h1 className="text-xl font-semibold text-[#16193a]">1. Customer Information</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="chk-name" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                  Full Name
                </label>
                <input
                  id="chk-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/70 text-sm text-[#16193a] focus:outline-none focus:ring-2 focus:ring-[#141a4a]/25"
                />
                {errors.fullName && <p className="text-xs text-red-700 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="chk-email" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                  Email Address
                </label>
                <input
                  id="chk-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/70 text-sm text-[#16193a] focus:outline-none focus:ring-2 focus:ring-[#141a4a]/25"
                />
                {errors.email && <p className="text-xs text-red-700 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="chk-phone" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                  Phone Number
                </label>
                <input
                  id="chk-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/70 text-sm text-[#16193a] focus:outline-none focus:ring-2 focus:ring-[#141a4a]/25"
                />
                {errors.phone && <p className="text-xs text-red-700 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </section>

          {/* Delivery Information */}
          <section className="bg-white rounded-[14px] p-6 md:p-7 space-y-4">
            <h2 className="text-xl font-semibold text-[#16193a]">2. Delivery Option &amp; Address</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'standard' as const,
                  title: 'Standard Delivery',
                  sub: 'Next-day slot (Illustrative)',
                  fee: cartSubtotal >= 35000 ? 'Free' : formatNaira(2000),
                },
                {
                  id: 'express' as const,
                  title: 'Same-Day Express',
                  sub: 'Under 3 hrs (Illustrative)',
                  fee: formatNaira(3500),
                },
                {
                  id: 'pickup' as const,
                  title: 'Store Pickup',
                  sub: 'Collect at WACO Store',
                  fee: 'Free',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDeliveryMethod(opt.id)}
                  className={`p-3.5 rounded-[12px] text-left border-2 transition-colors cursor-pointer ${
                    deliveryMethod === opt.id
                      ? 'border-[#141a4a] bg-[#e9e7df]/60'
                      : 'border-transparent bg-[#e9e7df]/35 hover:bg-[#e9e7df]/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-[#141a4a]">
                    <span>{opt.title}</span>
                    <span className="tabular-nums">{opt.fee}</span>
                  </div>
                  <p className="text-xs text-[#5a5d76] mt-1">{opt.sub}</p>
                </button>
              ))}
            </div>

            {deliveryMethod !== 'pickup' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label htmlFor="chk-state" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                    State
                  </label>
                  <select
                    id="chk-state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/70 text-sm text-[#16193a] focus:outline-none"
                  >
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="chk-city" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                    City / Area
                  </label>
                  <input
                    id="chk-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/70 text-sm text-[#16193a] focus:outline-none"
                  />
                  {errors.city && <p className="text-xs text-red-700 mt-1">{errors.city}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="chk-addr" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                    Street Delivery Address
                  </label>
                  <input
                    id="chk-addr"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House number, street, estate"
                    className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/70 text-sm text-[#16193a] focus:outline-none"
                  />
                  {errors.address && <p className="text-xs text-red-700 mt-1">{errors.address}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="chk-notes" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                    Delivery Instructions (Optional)
                  </label>
                  <textarea
                    id="chk-notes"
                    rows={2}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Gate code, call on arrival, landmark..."
                    className="w-full p-3.5 rounded-[10px] bg-[#e9e7df]/70 text-sm text-[#16193a] focus:outline-none"
                  />
                </div>
              </div>
            )}
          </section>

          {/* Payment Presentation UI Only */}
          <section className="bg-white rounded-[14px] p-6 md:p-7 space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-[#16193a]">
                3. Illustrative Payment Method (UI Preview)
              </h2>
              <p className="text-xs text-[#5a5d76] mt-0.5">
                Select a visual payment preference for demonstration purposes only.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'card' as const, label: 'Debit / Credit Card (Demo)', icon: CreditCard },
                { id: 'transfer' as const, label: 'Bank Transfer (Demo)', icon: Landmark },
                { id: 'pay_on_delivery' as const, label: 'Pay on Delivery (Demo)', icon: Truck },
              ].map((pm) => {
                const Icon = pm.icon;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-3.5 rounded-[12px] text-left border-2 transition-colors cursor-pointer flex items-center gap-2.5 ${
                      paymentMethod === pm.id
                        ? 'border-[#141a4a] bg-[#e9e7df]/60'
                        : 'border-transparent bg-[#e9e7df]/35 hover:bg-[#e9e7df]/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#141a4a] shrink-0" />
                    <span className="text-xs font-semibold text-[#16193a]">{pm.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-4 bg-white rounded-[14px] p-6 space-y-4 sticky top-[9vh]">
          <h2 className="text-lg font-semibold text-[#16193a]">Order Summary</h2>
          <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
            {cart.map((item) => {
              const p = getProductById(item.productId);
              if (!p) return null;
              return (
                <div key={`${item.productId}-${item.variant}`} className="flex items-center gap-3">
                  <SafeImage
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-10 rounded-lg object-cover shrink-0 bg-[#f4f2eb]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#16193a] truncate">{p.name}</p>
                    <p className="text-[11px] text-[#5a5d76] tabular-nums">
                      {item.quantity} × {item.variant}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#141a4a] tabular-nums">
                    {formatNaira(p.price * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#16193a]/10 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#5a5d76]">Subtotal</span>
              <span className="font-semibold tabular-nums">{formatNaira(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5a5d76]">Delivery Fee (Illustrative)</span>
              <span className="font-semibold tabular-nums">
                {deliveryFee === 0 ? 'Free' : formatNaira(deliveryFee)}
              </span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-[#1c4a35]">
                <span>Promo Discount</span>
                <span className="font-semibold tabular-nums">-{formatNaira(cartDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-[#16193a]/10 text-base font-semibold text-[#141a4a]">
              <span>Simulated Total</span>
              <span className="tabular-nums">{formatNaira(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-full bg-[#141a4a] text-white text-sm font-semibold hover:bg-[#3a49c9] transition-colors cursor-pointer"
          >
            Place Simulated Order
          </button>
        </aside>
      </form>
    </div>
  );
}
