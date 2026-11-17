import React, { useState } from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export function ContactPage() {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@') || !message.trim()) {
      showToast('Please complete all fields', undefined, 'warning');
      return;
    }
    setSent(true);
    showToast('Inquiry received (demo)', 'Thank you for contacting WACO.', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs items={[{ label: 'Contact & Store Info' }]} />

      <div className="bg-white rounded-[14px] p-6 md:p-8">
        <p className="text-xs font-semibold text-[#5a5d76]">Placeholder Store Details — Pending Final Approval</p>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#16193a] mt-1">
          Contact WACO Supermarket
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)] items-start">
        <div className="lg:col-span-5 space-y-[var(--gap)]">
          <div className="bg-white rounded-[14px] p-6 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#141a4a] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#16193a]">Physical Store Address (Placeholder)</p>
                <p className="text-xs text-[#5a5d76] mt-0.5">
                  Plot 10 WACO Retail Boulevard, Lagos — Final street address to be inserted before launch.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#141a4a] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#16193a]">Customer Desk Phone (Placeholder)</p>
                <p className="text-xs text-[#5a5d76] mt-0.5">+234 (0) 800-WACO-DEMO</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#141a4a] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#16193a]">Email Support (Placeholder)</p>
                <p className="text-xs text-[#5a5d76] mt-0.5">hello@wacosupermarket.example</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#141a4a] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#16193a]">Store Business Hours (Placeholder)</p>
                <p className="text-xs text-[#5a5d76] mt-0.5">
                  Mon – Sat: 8:00 AM – 9:00 PM · Sun: 11:00 AM – 7:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#f7d23a] text-[#141a4a] rounded-[14px] p-6 min-h-[180px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold">Store Location Map Placeholder</span>
              <h2 className="text-lg font-semibold mt-1">Flagship Retail Store Pin</h2>
              <p className="text-xs text-[#141a4a]/80 mt-1">
                Interactive store locator map coordinates will be connected once the final retail address is confirmed.
              </p>
            </div>
            <span className="text-xs font-semibold pt-4">Directions ready at launch →</span>
          </div>
        </div>

        <section className="lg:col-span-7 bg-white rounded-[14px] p-6 md:p-8">
          <h2 className="text-xl font-semibold text-[#16193a]">Send us a message (Demo)</h2>
          <p className="text-xs text-[#5a5d76] mt-1">
            Questions about bulk orders, store pickup, or fresh produce availability?
          </p>

          {sent && (
            <div className="mt-4 p-3.5 rounded-[10px] bg-[#e9e7df] text-xs font-semibold text-[#141a4a]">
              Simulated message sent! Thank you for reaching out to WACO.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label htmlFor="cnt-name" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                Your Name
              </label>
              <input
                id="cnt-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/75 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="cnt-email" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                Email Address
              </label>
              <input
                id="cnt-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/75 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="cnt-msg" className="block text-xs font-semibold text-[#16193a] mb-1.5">
                Message
              </label>
              <textarea
                id="cnt-msg"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 rounded-[10px] bg-[#e9e7df]/75 text-sm focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="h-11 px-7 rounded-full bg-[#141a4a] text-white text-sm font-semibold hover:bg-[#3a49c9] transition-colors cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
