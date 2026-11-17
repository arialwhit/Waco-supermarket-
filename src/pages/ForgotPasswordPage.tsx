import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-14">
      <Breadcrumbs items={[{ label: 'Sign In', to: '/login' }, { label: 'Reset Password' }]} />

      <div className="max-w-md mx-auto bg-white rounded-[14px] p-6 md:p-8">
        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle2 className="w-10 h-10 text-[#1c4a35] mx-auto mb-3" />
            <h1 className="text-xl font-semibold text-[#16193a]">Recovery email simulated</h1>
            <p className="text-xs md:text-sm text-[#5a5d76] mt-2 leading-relaxed">
              In a live environment, reset instructions would be sent to{' '}
              <strong className="text-[#16193a]">{email}</strong>.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#141a4a] text-white text-xs font-semibold"
            >
              Return to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-[#16193a]">Recover Password</h1>
            <p className="text-xs md:text-sm text-[#5a5d76] mt-1.5">
              Enter your email address to simulate sending a password recovery link.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <p className="p-3 rounded-[10px] bg-red-50 text-red-800 text-xs font-medium">
                  {error}
                </p>
              )}
              <div>
                <label htmlFor="fp-email" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                  Email Address
                </label>
                <input
                  id="fp-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/75 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full h-11 rounded-full bg-[#141a4a] text-white text-sm font-semibold hover:bg-[#3a49c9] transition-colors cursor-pointer"
              >
                Send Reset Link
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
