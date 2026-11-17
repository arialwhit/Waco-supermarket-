import { Clock, MapPin, PackageCheck, Truck } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FAQ_ITEMS } from '../data/mockStoreData';

export function DeliveryInfoPage() {
  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs items={[{ label: 'Delivery Information' }]} />

      <div className="bg-[#141a4a] text-white rounded-[14px] p-6 md:p-10">
        <span className="text-xs font-semibold text-[#f7d23a]">
          Illustrative Fulfillment Guide — Subject to Launch Confirmation
        </span>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
          How WACO Delivery Works
        </h1>
        <p className="mt-2.5 text-sm md:text-base text-white/80 max-w-[58ch] leading-relaxed">
          Every online grocery basket is hand-picked inside our retail store, separated into ambient pantry bags and chilled protein packs before dispatch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--gap)]">
        {[
          {
            icon: Truck,
            title: 'Standard Next-Day Delivery',
            desc: 'Illustrative flat fee of ₦2,000 (free above ₦35,000) for scheduled next-day morning or afternoon delivery windows.',
          },
          {
            icon: Clock,
            title: 'Same-Day Express Dispatch',
            desc: 'Illustrative ₦3,500 express courier option targeting under 3 hours for urgent family cooking needs.',
          },
          {
            icon: PackageCheck,
            title: 'In-Store Click & Collect',
            desc: 'Free pickup at our dedicated WACO retail counter—walk in and collect your packed crates in minutes.',
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white rounded-[14px] p-6">
              <Icon className="w-6 h-6 text-[#141a4a] mb-3" />
              <h2 className="text-lg font-semibold text-[#16193a]">{card.title}</h2>
              <p className="text-sm text-[#5a5d76] mt-2 leading-relaxed">{card.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--gap)]">
        <div className="bg-white rounded-[14px] p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-[#141a4a]" />
            <h2 className="text-xl font-semibold text-[#16193a]">
              Delivery Coverage Placeholder
            </h2>
          </div>
          <p className="text-sm text-[#5a5d76] leading-relaxed">
            Exact dispatch zones, neighborhood postcodes, and cold-chain radius boundaries will be confirmed and published here prior to WACO&apos;s commercial go-live.
          </p>
        </div>

        <div className="bg-white rounded-[14px] p-6 md:p-8">
          <h2 className="text-xl font-semibold text-[#16193a] mb-3">Delivery Questions</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.filter((f) => f.topic === 'Delivery' || f.topic === 'Order Tracking').map(
              (f) => (
                <div key={f.id} className="bg-[#e9e7df]/55 rounded-[10px] p-4">
                  <p className="text-sm font-semibold text-[#16193a]">{f.question}</p>
                  <p className="text-xs text-[#5a5d76] mt-1 leading-relaxed">{f.answer}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
