import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export function RegisterPage() {
  const { registerDemoUser } = useStore();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return setError('Please enter your full name.');
    if (!email.includes('@')) return setError('Please enter a valid email address.');
    if (phone.trim().length < 7) return setError('Please enter a valid phone number.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    if (password !== confirm) return setError('Passwords do not match.');
    if (!accepted) return setError('Please accept the terms and privacy notice.');

    setError('');
    registerDemoUser({ fullName, email, phone });
    navigate('/account');
  };

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-14">
      <Breadcrumbs items={[{ label: 'Create Account' }]} />

      <div className="max-w-lg mx-auto bg-white rounded-[14px] p-6 md:p-8">
        <p className="text-xs font-semibold text-[#5a5d76]">Simulated Registration</p>
        <h1 className="text-2xl font-semibold text-[#16193a] mt-1">Create WACO Account</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <p className="p-3 rounded-[10px] bg-red-50 text-red-800 text-xs font-medium">{error}</p>
          )}

          <div>
            <label htmlFor="reg-name" className="block text-xs font-semibold text-[#16193a] mb-1.5">
              Full Name
            </label>
            <input
              id="reg-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/75 text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reg-email" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                Email Address
              </label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/75 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="reg-phone" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                Phone Number
              </label>
              <input
                id="reg-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/75 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reg-pw" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                Password
              </label>
              <input
                id="reg-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/75 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="reg-confirm" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                Confirm Password
              </label>
              <input
                id="reg-confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/75 text-sm focus:outline-none"
              />
            </div>
          </div>

          <label className="flex items-start gap-2.5 text-xs text-[#5a5d76] cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="w-4 h-4 mt-0.5 accent-[#141a4a]"
            />
            <span>
              I agree to the{' '}
              <Link to="/terms" className="text-[#141a4a] font-semibold underline">
                Terms &amp; Conditions
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="text-[#141a4a] font-semibold underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            className="w-full h-11 rounded-full bg-[#141a4a] text-white text-sm font-semibold hover:bg-[#3a49c9] transition-colors cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 pt-5 border-t border-[#16193a]/10 text-center text-xs text-[#5a5d76]">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-[#141a4a] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
