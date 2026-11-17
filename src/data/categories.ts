import { Category } from '../types/store';
import { STORE_IMAGES } from './images';

export const CATEGORIES: Category[] = [
  {
    id: 'rice-grains',
    slug: 'rice-grains',
    name: 'Rice & Grains',
    shortName: 'Rice & Grains',
    description:
      'Stone-free local Ofada, parboiled long-grain rice, golden maize, millet, and sorghum for everyday Nigerian kitchens.',
    image: STORE_IMAGES.categories['rice-grains'],
    subcategories: ['Parboiled Rice', 'Local Ofada', 'Basmati', 'Grains & Maize'],
    featured: true,
  },
  {
    id: 'beans-legumes',
    slug: 'beans-legumes',
    name: 'Beans & Legumes',
    shortName: 'Beans',
    description:
      'Clean-picked Oloyin honey beans, drum brown beans, white black-eyed peas, melon seeds (egusi), and groundnuts.',
    image: STORE_IMAGES.categories['beans-legumes'],
    subcategories: ['Honey Beans', 'White Beans', 'Egusi & Ogbono', 'Nuts'],
    featured: true,
  },
  {
    id: 'garri-cassava',
    slug: 'garri-cassava',
    name: 'Garri & Cassava',
    shortName: 'Garri & Swallow',
    description:
      'Crisp sour Ijebu garri, rich yellow palm-oil garri, fufu flour, lafun, semolina, and yam flour (amala).',
    image: STORE_IMAGES.categories['garri-cassava'],
    subcategories: ['Yellow Garri', 'Ijebu White Garri', 'Swallow Flours'],
    featured: true,
  },
  {
    id: 'yam-potatoes',
    slug: 'yam-potatoes',
    name: 'Yam & Potatoes',
    shortName: 'Yam & Tubers',
    description:
      'Firm Benue Puna yam tubers, Plateau Irish potatoes, orange sweet potatoes, and cocoyam.',
    image: STORE_IMAGES.categories['yam-potatoes'],
    subcategories: ['Puna Yam', 'Irish Potatoes', 'Sweet Potatoes'],
    featured: true,
  },
  {
    id: 'vegetables',
    slug: 'vegetables',
    name: 'Fresh Vegetables',
    shortName: 'Vegetables',
    description:
      'Farm-sorted plum tomatoes, ata rodo, tatashe, red onions, okra, ugu, efo shoko, and aromatic herbs.',
    image: STORE_IMAGES.categories.vegetables,
    subcategories: ['Tomatoes & Peppers', 'Onions & Garlic', 'Leafy Greens', 'Okra & Pods'],
    featured: true,
  },
  {
    id: 'fruits',
    slug: 'fruits',
    name: 'Fresh Fruits',
    shortName: 'Fruits',
    description:
      'Sweet ripe and green plantains, sugarloaf pineapples, pawpaw, mangoes, watermelons, and citrus.',
    image: STORE_IMAGES.categories.fruits,
    subcategories: ['Plantains & Bananas', 'Tropical Fruits', 'Citrus & Apples'],
    featured: true,
  },
  {
    id: 'meat-poultry',
    slug: 'meat-poultry',
    name: 'Meat & Poultry',
    shortName: 'Meat & Poultry',
    description:
      'Hygienically dressed whole chicken, turkey cuts, prime boneless beef, shaki, and fresh goat meat.',
    image: STORE_IMAGES.categories['meat-poultry'],
    subcategories: ['Beef Cuts', 'Poultry', 'Goat Meat', 'Assorted'],
    featured: true,
  },
  {
    id: 'fish-seafood',
    slug: 'fish-seafood',
    name: 'Fish & Seafood',
    shortName: 'Fish & Seafood',
    description:
      'Fresh Titus mackerel, croaker, kiln-smoked mangala catfish, stockfish ears, and whole crayfish.',
    image: STORE_IMAGES.categories['fish-seafood'],
    subcategories: ['Fresh Fish', 'Smoked Fish', 'Stockfish & Crayfish'],
    featured: true,
  },
  {
    id: 'cooking-oils',
    slug: 'cooking-oils',
    name: 'Cooking Oils',
    shortName: 'Cooking Oils',
    description:
      'Pure unrefined red palm oil, double-refined vegetable oil, groundnut oil, and cold-pressed coconut oil.',
    image: STORE_IMAGES.categories['cooking-oils'],
    subcategories: ['Red Palm Oil', 'Vegetable Oil', 'Specialty Oils'],
    featured: false,
  },
  {
    id: 'spices-seasonings',
    slug: 'spices-seasonings',
    name: 'Spices & Seasonings',
    shortName: 'Spices',
    description:
      'Fermented iru (locust beans), suya spice, Cameroon pepper, curry, thyme, ginger, and stock cubes.',
    image: STORE_IMAGES.categories['spices-seasonings'],
    subcategories: ['Local Condiments', 'Spice Blends', 'Stock & Bouillon'],
    featured: false,
  },
  {
    id: 'dairy-eggs',
    slug: 'dairy-eggs',
    name: 'Dairy & Eggs',
    shortName: 'Dairy & Eggs',
    description:
      'Crates of fresh brown farm eggs, evaporated milk, powdered milk tins, salted butter, and Greek yogurt.',
    image: STORE_IMAGES.categories['dairy-eggs'],
    subcategories: ['Farm Eggs', 'Milk & Cream', 'Butter & Cheese'],
    featured: false,
  },
  {
    id: 'beverages',
    slug: 'beverages',
    name: 'Beverages',
    shortName: 'Beverages',
    description:
      'Brewed hibiscus zobo, malt drinks, cocoa beverage tins, table water packs, and pressed fruit juices.',
    image: STORE_IMAGES.categories.beverages,
    subcategories: ['Juices & Zobo', 'Malt & Soft Drinks', 'Hot Beverages'],
    featured: false,
  },
  {
    id: 'snacks-confectionery',
    slug: 'snacks-confectionery',
    name: 'Snacks & Confectionery',
    shortName: 'Snacks',
    description:
      'Crispy plantain chips, crunchy chin-chin, roasted bottle groundnuts, kulikuli, and family biscuits.',
    image: STORE_IMAGES.categories['snacks-confectionery'],
    subcategories: ['Local Snacks', 'Nuts & Seeds', 'Biscuits & Treats'],
    featured: false,
  },
  {
    id: 'breakfast',
    slug: 'breakfast',
    name: 'Breakfast & Bakery',
    shortName: 'Breakfast',
    description:
      'Soft Lagos Agege bread, whole-grain rolled oats, custard tins, pure wildflower honey, and crunchy granola.',
    image: STORE_IMAGES.categories.breakfast,
    subcategories: ['Bakery Bread', 'Cereals & Oats', 'Spreads & Honey'],
    featured: false,
  },
  {
    id: 'household',
    slug: 'household',
    name: 'Household Essentials',
    shortName: 'Household',
    description:
      'Laundry detergents, dishwashing liquids, bleach, multi-surface sprays, kitchen rolls, and bath tissues.',
    image: STORE_IMAGES.categories.household,
    subcategories: ['Laundry Care', 'Kitchen Cleaning', 'Paper & Tissue'],
    featured: false,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug || c.id === slug);
}
