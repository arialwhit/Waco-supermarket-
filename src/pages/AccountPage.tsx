import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, LogOut, MapPin, Package, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatNaira } from '../utils/format';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export function AccountPage() {
  const { user, orders, wishlist, logoutUser, updateUserProfile, addUserAddress } = useStore();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [addingAddr, setAddingAddr] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');

  if (!user) {
    return (
      <div className="w-[var(--w)] mx-auto pt-[110px] pb-16">
        <div className="max-w-md mx-auto bg-white rounded-[14px] p-8 text-center">
          <h1 className="text-2xl font-semibold text-[#16193a]">Sign in to view your account</h1>
          <p className="text-sm text-[#5a5d76] mt-2">
            Manage your simulated profile, delivery addresses, and order history.
          </p>
          <Link
            to="/login"
            className="mt-5 inline-flex items-center justify-center h-11 px-7 rounded-full bg-[#141a4a] text-white text-sm font-semibold"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    updateUserProfile({ fullName: name, phone });
    setEditing(false);
  };

  const handleSaveAddr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim() || !newCity.trim()) return;
    addUserAddress({
      label: 'Saved Address',
      recipientName: user.fullName,
      phone: user.phone,
      state: 'Lagos',
      city: newCity,
      street: newStreet,
      isDefault: false,
    });
    setNewStreet('');
    setNewCity('');
    setAddingAddr(false);
  };

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs items={[{ label: 'Customer Account' }]} />

      <div className="bg-[#141a4a] text-white rounded-[14px] p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#f7d23a]">Customer Overview (Demo)</span>
          <h1 className="text-2xl md:text-3xl font-semibold mt-1">{user.fullName}</h1>
          <p className="text-xs md:text-sm text-white/75 mt-0.5">
            {user.email} · Member since {user.joinedDate}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            logoutUser();
            navigate('/login');
          }}
          className="h-10 px-5 rounded-full bg-white/15 text-white text-xs font-semibold inline-flex items-center gap-2 hover:bg-white hover:text-[#141a4a] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>

      {/* Account Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--gap)]">
        <Link
          to="/account/orders"
          className="bg-white rounded-[14px] p-5 hover:bg-[#f7d23a]/35 transition-colors flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-full bg-[#e9e7df] flex items-center justify-center text-[#141a4a]">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#16193a]">Order History</p>
            <p className="text-xs text-[#5a5d76] tabular-nums">{orders.length} simulated orders</p>
          </div>
        </Link>

        <Link
          to="/wishlist"
          className="bg-white rounded-[14px] p-5 hover:bg-[#f7d23a]/35 transition-colors flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-full bg-[#e9e7df] flex items-center justify-center text-[#141a4a]">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#16193a]">Saved Wishlist</p>
            <p className="text-xs text-[#5a5d76] tabular-nums">{wishlist.length} saved items</p>
          </div>
        </Link>

        <div className="bg-white rounded-[14px] p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[#e9e7df] flex items-center justify-center text-[#141a4a]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#16193a]">Delivery Addresses</p>
            <p className="text-xs text-[#5a5d76] tabular-nums">{user.addresses.length} saved</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)]">
        {/* Personal Info */}
        <section className="lg:col-span-5 bg-white rounded-[14px] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#16193a] flex items-center gap-2">
              <User className="w-4 h-4" /> Personal Information
            </h2>
            <button
              type="button"
              onClick={() => setEditing((v) => !v)}
              className="text-xs font-semibold text-[#3a49c9] cursor-pointer"
            >
              {editing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {editing ? (
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3.5 rounded-[10px] bg-[#e9e7df]/75 text-sm"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 px-3.5 rounded-[10px] bg-[#e9e7df]/75 text-sm"
              />
              <button
                type="submit"
                className="h-9 px-5 rounded-full bg-[#141a4a] text-white text-xs font-semibold cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-xs text-[#5a5d76]">Full Name</dt>
                <dd className="font-semibold text-[#16193a]">{user.fullName}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#5a5d76]">Email</dt>
                <dd className="font-semibold text-[#16193a]">{user.email}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#5a5d76]">Phone</dt>
                <dd className="font-semibold text-[#16193a]">{user.phone}</dd>
              </div>
            </dl>
          )}

          {/* Addresses */}
          <div className="pt-4 border-t border-[#16193a]/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#16193a]">Saved Addresses</h3>
              <button
                type="button"
                onClick={() => setAddingAddr((v) => !v)}
                className="text-xs font-semibold text-[#3a49c9] cursor-pointer"
              >
                {addingAddr ? 'Cancel' : '+ Add Address'}
              </button>
            </div>

            {addingAddr && (
              <form onSubmit={handleSaveAddr} className="space-y-2.5 bg-[#e9e7df]/55 p-3 rounded-[10px]">
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="City / Area (e.g. Victoria Island)"
                  className="w-full h-9 px-3 rounded-lg bg-white text-xs"
                />
                <input
                  type="text"
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  placeholder="Street address (Illustrative)"
                  className="w-full h-9 px-3 rounded-lg bg-white text-xs"
                />
                <button
                  type="submit"
                  className="h-8 px-4 rounded-full bg-[#141a4a] text-white text-xs font-semibold cursor-pointer"
                >
                  Save Address
                </button>
              </form>
            )}

            {user.addresses.map((addr) => (
              <div key={addr.id} className="bg-[#e9e7df]/55 rounded-[10px] p-3 text-xs">
                <p className="font-semibold text-[#16193a]">{addr.label}</p>
                <p className="text-[#5a5d76] mt-0.5">
                  {addr.street}, {addr.city}, {addr.state}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Orders */}
        <section className="lg:col-span-7 bg-white rounded-[14px] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#16193a]">Recent Orders</h2>
            <Link to="/account/orders" className="text-xs font-semibold text-[#3a49c9] hover:underline">
              View all orders
            </Link>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 3).map((ord) => (
              <div
                key={ord.id}
                className="bg-[#e9e7df]/55 rounded-[12px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[#16193a]">
                    {ord.orderNumber} · <span className="text-[#3a49c9]">{ord.status}</span>
                  </p>
                  <p className="text-xs text-[#5a5d76] mt-0.5 tabular-nums">
                    {ord.createdAt} · {ord.items.length} items · {formatNaira(ord.total)}
                  </p>
                </div>
                <Link
                  to={`/account/orders/${ord.id}`}
                  className="h-9 px-4 rounded-full bg-white text-[#141a4a] text-xs font-semibold inline-flex items-center justify-center hover:bg-[#141a4a] hover:text-white transition-colors"
                >
                  Order Details
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
