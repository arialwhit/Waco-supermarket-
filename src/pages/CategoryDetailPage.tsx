import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CATEGORIES, getCategoryBySlug } from '../data/categories';
import { getProductsByCategory } from '../data/products';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';
import { ProductCard } from '../components/product/ProductCard';

export function CategoryDetailPage() {
  const { slug = '' } = useParams();
  const category = getCategoryBySlug(slug);
  const [selectedSub, setSelectedSub] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');

  const categoryProducts = useMemo(
    () => (category ? getProductsByCategory(category.id) : []),
    [category]
  );

  const filtered = useMemo(() => {
    const base =
      selectedSub === 'All'
        ? categoryProducts
        : categoryProducts.filter((p) => p.subcategory === selectedSub);
    return [...base].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return b.reviewCount - a.reviewCount;
    });
  }, [categoryProducts, selectedSub, sortBy]);

  if (!category) {
    return (
      <div className="w-[var(--w)] mx-auto pt-[110px] pb-16">
        <div className="bg-white rounded-[14px] p-12 text-center">
          <h1 className="text-2xl font-semibold text-[#16193a]">Aisle not found</h1>
          <p className="text-sm text-[#5a5d76] mt-2">
            We could not find that supermarket department.
          </p>
          <Link
            to="/categories"
            className="mt-5 inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#141a4a] text-white text-sm font-semibold"
          >
            Browse All 15 Aisles
          </Link>
        </div>
      </div>
    );
  }

  const relatedCategories = CATEGORIES.filter((c) => c.id !== category.id).slice(0, 4);

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-10 space-y-[var(--gap)]">
      <Breadcrumbs
        items={[
          { label: 'Categories', to: '/categories' },
          { label: category.name },
        ]}
      />

      {/* Category Split Banner */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)] items-stretch">
        <div className="lg:col-span-7 bg-[#141a4a] text-white rounded-[14px] p-6 md:p-10 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[#f7d23a] tabular-nums">
              Department · {categoryProducts.length} products
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
              {category.name}
            </h1>
            <p className="mt-3 text-sm md:text-base text-white/80 max-w-[50ch] leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedSub('All')}
              className={`h-9 px-4 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedSub === 'All'
                  ? 'bg-[#f7d23a] text-[#141a4a]'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              All ({categoryProducts.length})
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSelectedSub(sub)}
                className={`h-9 px-4 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  selectedSub === sub
                    ? 'bg-[#f7d23a] text-[#141a4a]'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 rounded-[14px] overflow-hidden min-h-[240px] bg-white">
          <SafeImage
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Toolbar & Grid */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs md:text-sm text-[#5a5d76] tabular-nums">
          Showing <strong className="text-[#16193a]">{filtered.length}</strong> items in {category.name}
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'popular' | 'price-asc' | 'price-desc')}
          aria-label="Sort aisle products"
          className="h-9 px-4 rounded-full bg-white text-[#141a4a] text-xs font-semibold focus:outline-none cursor-pointer"
        >
          <option value="popular">Sort: Popular</option>
          <option value="price-asc">Sort: Price Low to High</option>
          <option value="price-desc">Sort: Price High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Related Aisles */}
      <section className="bg-white rounded-[14px] p-6 md:p-8 mt-4">
        <h2 className="text-xl font-semibold text-[#16193a] mb-4">Explore Related Aisles</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {relatedCategories.map((rel) => (
            <Link
              key={rel.id}
              to={`/category/${rel.slug}`}
              className="group bg-[#e9e7df]/60 hover:bg-[#e9e7df] rounded-[12px] p-3 transition-colors"
            >
              <div className="aspect-[4/3] rounded-[8px] overflow-hidden bg-white">
                <SafeImage
                  src={rel.image}
                  alt={rel.name}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
                />
              </div>
              <p className="mt-2.5 text-sm font-semibold text-[#16193a] truncate">{rel.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
