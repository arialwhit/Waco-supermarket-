import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export function LoginPage() {
  const { loginDemoUser } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('adaeze.demo@wacostore.example');
  const [password, setPassword] = useState('wacodemo123');
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      setError('Please enter your password.');
      return;
    }
    setError('');
    loginDemoUser(email);
    navigate('/account');
  };

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-14">
      <Breadcrumbs items={[{ label: 'Customer Sign In' }]} />

      <div className="max-w-md mx-auto bg-white rounded-[14px] p-6 md:p-8">
        <p className="text-xs font-semibold text-[#5a5d76]">Simulated Frontend Authentication</p>
        <h1 className="text-2xl font-semibold text-[#16193a] mt-1">Sign in to WACO</h1>
        <p className="text-xs text-[#5a5d76] mt-1">
          Access your demo order history, saved addresses, and pantry wishlist.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <p className="p-3 rounded-[10px] bg-red-50 text-red-800 text-xs font-medium">{error}</p>
          )}

          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold text-[#16193a] mb-1.5">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/75 text-sm text-[#16193a] focus:outline-none focus:ring-2 focus:ring-[#141a4a]/25"
            />
          </div>

          <div>
            <label htmlFor="login-pw" className="block text-xs font-semibold text-[#16193a] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="login-pw"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-4 pr-11 rounded-[10px] bg-[#e9e7df]/75 text-sm text-[#16193a] focus:outline-none focus:ring-2 focus:ring-[#141a4a]/25"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a5d76] hover:text-[#16193a] cursor-pointer"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-[#16193a] cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 accent-[#141a4a]"
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="font-semibold text-[#3a49c9] hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-full bg-[#141a4a] text-white text-sm font-semibold hover:bg-[#3a49c9] transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 pt-5 border-t border-[#16193a]/10 text-center text-xs text-[#5a5d76]">
          New to WACO?{' '}
          <Link to="/register" className="font-semibold text-[#141a4a] hover:underline">
            Create a customer account
          </Link>
        </p>
      </div>
    </div>
  );
}
