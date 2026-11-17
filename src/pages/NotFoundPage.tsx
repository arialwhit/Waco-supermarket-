import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="w-[var(--w)] mx-auto pt-[110px] pb-16">
      <div className="bg-[#141a4a] text-white rounded-[14px] p-8 md:p-14 text-center max-w-3xl mx-auto">
        <span className="text-xs font-semibold text-[#f7d23a]">404 — Aisle Not Found</span>
        <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
          WACO couldn&apos;t find that page
        </h1>
        <p className="mt-3 text-sm md:text-base text-white/80 max-w-[44ch] mx-auto leading-relaxed">
          The product or aisle link you followed may have moved. Head back to our fresh market homepage or browse all 124 groceries.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="h-11 px-7 rounded-full bg-[#f7d23a] text-[#141a4a] text-sm font-semibold inline-flex items-center hover:bg-white transition-colors"
          >
            Return Home
          </Link>
          <Link
            to="/shop"
            className="h-11 px-7 rounded-full bg-white/15 text-white text-sm font-semibold inline-flex items-center hover:bg-white/25 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
