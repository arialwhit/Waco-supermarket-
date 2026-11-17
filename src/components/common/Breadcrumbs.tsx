import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbCrumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbCrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs md:text-sm text-[#5a5d76] mb-5">
      <Link to="/" className="hover:text-[#16193a] transition-colors">
        Home
      </Link>
      {items.map((item, idx) => (
        <span key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 opacity-50" aria-hidden="true" />
          {item.to ? (
            <Link to={item.to} className="hover:text-[#16193a] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#16193a] font-medium truncate max-w-[26ch]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
