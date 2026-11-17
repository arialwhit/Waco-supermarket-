import React, { useState } from 'react';
import { Clock, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORE_IMAGES } from '../data/images';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';

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
    showToast('Inquiry received', 'Thank you for contacting WACO Foods Abuja.', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs items={[{ label: 'Contact & Store Info' }]} />

      <div className="bg-white border border-[#135224]/12 rounded-[14px] p-6 md:p-8">
        <p className="text-xs font-semibold text-[#135224] uppercase tracking-wider">
          Nourishing Nigeria · Enriching Lives
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#16193a] mt-1">
          Contact WACO Foods Ltd
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)] items-start">
        <div className="lg:col-span-5 space-y-[var(--gap)]">
          <div className="bg-white rounded-[14px] p-6 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#135224] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#16193a]">Physical Store Address</p>
                <p className="text-xs text-[#5a5d76] mt-0.5 leading-relaxed">
                  Shop F1008, Apo Urban Market (Urban Shelter Modern Market), Apo, Abuja, FCT, Nigeria.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#135224] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#16193a]">Phone &amp; WhatsApp Order Desk</p>
                <p className="text-xs text-[#5a5d76] mt-0.5 tabular-nums">
                  +234 811 786 2336 · +234 706 930 2350
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#135224] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#16193a]">Email Support</p>
                <p className="text-xs text-[#5a5d76] mt-0.5">wacofoodsltd@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-[#135224] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#16193a]">Website &amp; Socials</p>
                <p className="text-xs text-[#5a5d76] mt-0.5">
                  wacofoods.ng · Instagram &amp; TikTok: @wacofoods
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#135224] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#16193a]">Store Operating Hours</p>
                <p className="text-xs text-[#5a5d76] mt-0.5">
                  Mon – Sat: 8:00 AM – 7:00 PM · Apo Urban Market Dispatch
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#135224] text-white rounded-[14px] p-6 flex items-center gap-4">
            <div className="bg-white rounded-[10px] p-2 shrink-0">
              <SafeImage
                src={STORE_IMAGES.brand.logoClean}
                alt="WACO Foods Official Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#f7d23a] uppercase tracking-wider">
                Click &amp; Collect Counter
              </span>
              <h2 className="text-base font-semibold mt-0.5">Shop F1008, Apo Urban Market</h2>
              <p className="text-xs text-white/80 mt-1">
                Walk in for wholesale sacks, 2kg &amp; 5kg packs, or fast dispatch pickup.
              </p>
            </div>
          </div>
        </div>

        <section className="lg:col-span-7 bg-white rounded-[14px] p-6 md:p-8">
          <h2 className="text-xl font-semibold text-[#16193a]">Send us a message</h2>
          <p className="text-xs text-[#5a5d76] mt-1">
            Questions about wholesale orders, Abuja delivery slots, or WACO Foods distributor inquiries?
          </p>

          {sent && (
            <div className="mt-4 p-3.5 rounded-[10px] bg-[#f4efe4] border border-[#135224]/20 text-xs font-semibold text-[#135224]">
              Message received! Our Apo Urban Market team will respond shortly.
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
                className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/75 text-sm focus:outline-none focus:ring-2 focus:ring-[#135224]/25"
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
                className="w-full h-11 px-4 rounded-[10px] bg-[#e9e7df]/75 text-sm focus:outline-none focus:ring-2 focus:ring-[#135224]/25"
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
                className="w-full p-4 rounded-[10px] bg-[#e9e7df]/75 text-sm focus:outline-none focus:ring-2 focus:ring-[#135224]/25"
              />
            </div>

            <button
              type="submit"
              className="h-11 px-7 rounded-full bg-[#135224] text-white text-sm font-semibold hover:bg-[#0c3b19] transition-colors cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
