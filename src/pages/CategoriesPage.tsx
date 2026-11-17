import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';

export function CategoriesPage() {
  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-10">
      <Breadcrumbs items={[{ label: 'All Categories' }]} />

      <div className="bg-white rounded-[14px] p-6 md:p-9 mb-[var(--gap)]">
        <p className="text-xs font-semibold text-[#5a5d76]">15 Supermarket Departments</p>
        <h1 className="text-3xl md:text-4xl font-semibold text-[#16193a] tracking-tight mt-1">
          Explore WACO Aisles
        </h1>
        <p className="text-sm text-[#5a5d76] mt-2 max-w-[58ch] leading-relaxed">
          From stone-free rice and honey beans to chilled poultry, unrefined palm oil, and household care — pick any department below to browse.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--gap)]">
        {CATEGORIES.map((category) => {
          const count = PRODUCTS.filter((p) => p.categoryId === category.id).length;
          return (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group bg-white rounded-[14px] p-4 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div>
                <div className="aspect-[4/3] rounded-[10px] overflow-hidden bg-[#f4f2eb]">
                  <SafeImage
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold text-[#16193a] group-hover:text-[#3a49c9] transition-colors">
                      {category.name}
                    </h2>
                    <span className="text-xs font-medium text-[#5a5d76] tabular-nums">
                      {count} products
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-[#5a5d76] leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 px-1 border-t border-[#16193a]/10 flex items-center justify-between text-xs font-semibold text-[#141a4a]">
                <span>Browse aisle</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
