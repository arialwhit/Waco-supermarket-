import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, Store, Truck } from 'lucide-react';
import { STORE_IMAGES } from '../data/images';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';

export function AboutPage() {
  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs items={[{ label: 'About WACO Foods' }]} />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)] items-stretch">
        <div className="lg:col-span-6 bg-[#135224] text-white rounded-[14px] p-6 md:p-10 flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 rounded-md bg-[#c61d23] text-white text-[11px] font-semibold uppercase tracking-wider">
              WACO Foods Ltd · Abuja
            </span>
            <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
              Quality from our farms to your table.
            </h1>
            <p className="mt-4 text-sm md:text-base text-white/85 leading-relaxed">
              WACO Foods delivers safe, nutritious, and hygienically agro-processed Nigerian staples made from the best of Nigeria&apos;s harvest. Visit our flagship counter at Shop F1008, Apo Urban Market, Abuja or shop online for stone-free Ekpoma Local Rice, Honey Beans, Garri, Plantain Flour, fresh produce, and chilled proteins.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              to="/shop"
              className="h-10 px-6 rounded-full bg-[#f7d23a] text-[#0c3b19] text-sm font-semibold inline-flex items-center hover:bg-white transition-colors"
            >
              Explore WACO Aisles
            </Link>
            <Link
              to="/contact"
              className="h-10 px-5 rounded-full bg-white/15 text-white text-sm font-medium inline-flex items-center hover:bg-white/25 transition-colors"
            >
              Visit Apo Urban Market
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 rounded-[14px] overflow-hidden min-h-[320px] bg-white p-3">
          <SafeImage
            src={STORE_IMAGES.brand.farmPoster}
            alt="WACO Foods Quality From Our Farms To Your Table"
            className="w-full h-full object-cover object-top rounded-[10px]"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)] items-stretch">
        <div className="lg:col-span-5 rounded-[14px] overflow-hidden bg-white p-3">
          <SafeImage
            src={STORE_IMAGES.brand.aboutFlyer}
            alt="WACO Foods About Us and Order Now Flyer"
            className="w-full h-full max-h-[420px] object-cover rounded-[10px]"
          />
        </div>

        <div className="lg:col-span-7 bg-white rounded-[14px] p-6 md:p-9 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-[#c61d23] uppercase tracking-wider">
              Nourishing Nigeria. Enriching Lives.
            </p>
            <h2 className="text-2xl font-semibold text-[#16193a] mt-1 mb-6">
              Our Standards &amp; Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Store,
                title: 'Apo Urban Market Counter',
                text: 'Backed by our physical shop at Shop F1008, Apo Urban Market, Apo, Abuja for transparent browsing and Click & Collect.',
              },
              {
                icon: ShieldCheck,
                title: 'Modern Hygienic Processing',
                text: 'Every rice, beans, garri, and plantain flour pack is destoned, sieved, and sealed airtight in 2kg and 5kg sizes.',
              },
              {
                icon: Leaf,
                title: '100% Natural Harvest',
                text: 'Sourced directly from trusted Nigerian farms including Ekpoma, Benue, Ondo, Jos, and Ogun.',
              },
              {
                icon: Truck,
                title: 'Dependable Dispatch',
                text: 'Fast doorstep delivery across Abuja neighborhoods and nationwide fulfillment scheduling.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-[#f4efe4] rounded-[12px] p-5 border border-[#135224]/10">
                  <Icon className="w-5 h-5 text-[#135224] mb-3" />
                  <h3 className="text-base font-semibold text-[#16193a]">{item.title}</h3>
                  <p className="text-xs md:text-sm text-[#5a5d76] mt-1.5 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
