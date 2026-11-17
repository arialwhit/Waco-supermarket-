import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface PolicyConfig {
  title: string;
  subtitle: string;
  sections: Array<{ heading: string; body: string }>;
}

const POLICIES: Record<'privacy' | 'terms' | 'returns', PolicyConfig> = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Placeholder Legal Document — Requires Business Approval Before Launch',
    sections: [
      {
        heading: '1. Frontend Demonstration Data Storage',
        body: 'This Phase 1 storefront stores your shopping bag, wishlist, demo profile, and simulated orders solely inside your browser localStorage. No personal information is transmitted to external servers.',
      },
      {
        heading: '2. Intended Customer Information Collection (Draft)',
        body: 'Upon live commercial launch, WACO will collect only necessary delivery contact details (name, phone number, email, and delivery address) to fulfill grocery orders and provide order status updates.',
      },
      {
        heading: '3. Data Protection & Contact (Draft)',
        body: 'Formal NDPR/data-protection officer contact information and retention schedules will be reviewed and approved by WACO management prior to production deployment.',
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    subtitle: 'Placeholder Legal Document — Requires Business Approval Before Launch',
    sections: [
      {
        heading: '1. Illustrative Pricing & Availability',
        body: 'All Nigerian Naira prices, weights, discounts, and stock numbers shown on this preview website are illustrative demo figures and do not constitute confirmed binding retail offers.',
      },
      {
        heading: '2. Simulated Checkout & Orders',
        body: 'Orders placed on this frontend preview generate mock confirmation receipts locally. No payment gateway is connected and no actual delivery dispatch is scheduled.',
      },
      {
        heading: '3. Approved Retail Terms (Pending)',
        body: 'Final commercial terms governing bulk purchases, delivery rescheduling, and corporate accounts will replace this placeholder text upon client legal review.',
      },
    ],
  },
  returns: {
    title: 'Return & Refund Policy',
    subtitle: 'Placeholder Store Policy — Requires Business Approval Before Launch',
    sections: [
      {
        heading: '1. Fresh Produce & Perishable Inspection (Draft)',
        body: 'Customers are encouraged to inspect fresh vegetables, fruits, eggs, meat, and seafood at the point of delivery or store pickup. Any bruised, spoiled, or incorrect item will be flagged for prompt replacement.',
      },
      {
        heading: '2. Sealed Pantry & Household Goods (Draft)',
        body: 'Unopened, sealed dry groceries and household products may qualify for return or exchange within an approved window (to be finalized by WACO management) with proof of purchase.',
      },
      {
        heading: '3. Refund Processing Timeline (Draft)',
        body: 'Approved refund methods (store credit or bank reversal timelines) will be formally specified once WACO activates its production payment partner.',
      },
    ],
  },
};

export function PolicyPage({ type }: { type: 'privacy' | 'terms' | 'returns' }) {
  const doc = POLICIES[type];

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs items={[{ label: doc.title }]} />

      <div className="bg-white rounded-[14px] p-6 md:p-10 max-w-4xl">
        <span className="inline-block px-3 py-1 rounded-full bg-[#f7d23a] text-[#141a4a] text-xs font-semibold">
          {doc.subtitle}
        </span>
        <h1 className="mt-3 text-3xl font-semibold text-[#16193a]">{doc.title}</h1>

        <div className="mt-8 space-y-6">
          {doc.sections.map((sec) => (
            <section key={sec.heading} className="pt-4 border-t border-[#16193a]/10">
              <h2 className="text-lg font-semibold text-[#16193a]">{sec.heading}</h2>
              <p className="mt-2 text-sm text-[#5a5d76] leading-relaxed">{sec.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
