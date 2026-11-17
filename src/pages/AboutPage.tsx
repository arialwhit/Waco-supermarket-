import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, Store, Truck } from 'lucide-react';
import { STORE_IMAGES } from '../data/images';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';

export function AboutPage() {
  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs items={[{ label: 'About WACO' }]} />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)] items-stretch">
        <div className="lg:col-span-6 bg-[#141a4a] text-white rounded-[14px] p-6 md:p-10 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[#f7d23a]">About WACO Supermarket</span>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
              A physical neighborhood store, opened to your kitchen online.
            </h1>
            <p className="mt-4 text-sm md:text-base text-white/80 leading-relaxed">
              WACO connects our first physical retail supermarket floor directly to an intuitive online shopping experience—combining the freshness of morning market produce with clean packaging, accurate weights, and dependable fulfillment.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              to="/shop"
              className="h-10 px-6 rounded-full bg-[#f7d23a] text-[#141a4a] text-sm font-semibold inline-flex items-center hover:bg-white transition-colors"
            >
              Explore Aisles
            </Link>
            <Link
              to="/contact"
              className="h-10 px-5 rounded-full bg-white/15 text-white text-sm font-medium inline-flex items-center hover:bg-white/25 transition-colors"
            >
              Visit Store Info
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 rounded-[14px] overflow-hidden min-h-[300px] bg-white">
          <SafeImage
            src={STORE_IMAGES.storeInterior}
            alt="WACO physical retail supermarket interior"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="bg-white rounded-[14px] p-6 md:p-9">
        <h2 className="text-2xl font-semibold text-[#16193a] mb-6">Mission &amp; Store Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Store,
              title: 'Connected Retail Floor',
              text: 'Online orders are fulfilled from the same clean shelves our walk-in shoppers browse every day.',
            },
            {
              icon: ShieldCheck,
              title: 'Honest Sorting & Weights',
              text: 'Every rice, beans, and garri pack is clean-picked and sealed to save prep time at home.',
            },
            {
              icon: Leaf,
              title: 'Daily Freshness',
              text: 'Produce, leafy greens, and proteins are stored at proper chill temperatures until dispatch.',
            },
            {
              icon: Truck,
              title: 'Convenient Fulfillment',
              text: 'Choose doorstep delivery or quick Click & Collect pickup at our store desk (illustrative).',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-[#e9e7df]/55 rounded-[12px] p-5">
                <Icon className="w-5 h-5 text-[#141a4a] mb-3" />
                <h3 className="text-base font-semibold text-[#16193a]">{item.title}</h3>
                <p className="text-xs md:text-sm text-[#5a5d76] mt-1.5 leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-xs text-[#5a5d76]">
          Note: Brand story copy above serves as clean storefront presentation pending final WACO client history and store launch details.
        </p>
      </section>
    </div>
  );
}
