import { Category } from '../types/store';
import { STORE_IMAGES } from './images';

export const CATEGORIES: Category[] = [
  {
    id: 'rice-grains',
    slug: 'rice-grains',
    name: 'Rice & Grains',
    shortName: 'Rice & Grains',
    description:
      'Hygienically packaged WACO Foods Local Rice (Ekpoma), stone-free Ofada, parboiled long-grain rice, aged Basmati, and golden maize.',
    image: STORE_IMAGES.categories['rice-grains'],
    subcategories: ['WACO Local Rice', 'Parboiled Rice', 'Local Ofada', 'Basmati', 'Grains & Maize'],
    featured: true,
  },
  {
    id: 'beans-legumes',
    slug: 'beans-legumes',
    name: 'Beans & Legumes',
    shortName: 'Beans',
    description:
      'Signature WACO Foods Honey Beans (5kg), Black Eye Beans (2kg & 5kg), Kano Drum Beans, hand-picked Egusi, and Ogbono seeds.',
    image: STORE_IMAGES.categories['beans-legumes'],
    subcategories: ['WACO Honey Beans', 'WACO Black Eye Beans', 'Drum Beans', 'Egusi & Ogbono'],
    featured: true,
  },
  {
    id: 'garri-cassava',
    slug: 'garri-cassava',
    name: 'Garri, Flour & Swallows',
    shortName: 'Garri & Flour',
    description:
      'WACO Foods sealed Ijebu Garri (2kg), Yellow Garri (2kg & 5kg), Premium Plantain Flour (2kg), and Ibadan Elubo yam flour.',
    image: STORE_IMAGES.categories['garri-cassava'],
    subcategories: ['WACO Ijebu Garri', 'WACO Yellow Garri', 'WACO Plantain Flour', 'Swallow Flours'],
    featured: true,
  },
  {
    id: 'yam-potatoes',
    slug: 'yam-potatoes',
    name: 'Yam & Potatoes',
    shortName: 'Yam & Tubers',
    description:
      'Firm Benue Puna yam tubers, Plateau fresh Irish potatoes, and orange-flesh honey sweet potatoes.',
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
      'Grade-A plum tomatoes, fiery ata rodo, sweet bell peppers, crunchy carrots, green garden peas, red onions, okra, and fresh ugu.',
    image: STORE_IMAGES.categories.vegetables,
    subcategories: ['Tomatoes & Peppers', 'Roots & Pods', 'Onions & Bulbs', 'Leafy Greens'],
    featured: true,
  },
  {
    id: 'fruits',
    slug: 'fruits',
    name: 'Fresh Fruits',
    shortName: 'Fruits',
    description:
      'Sweet semi-ripe plantains, Ogun sugarloaf pineapples, juicy watermelons, Benue oranges, and crisp Gala apples.',
    image: STORE_IMAGES.categories.fruits,
    subcategories: ['Plantains', 'Tropical Fruits', 'Citrus & Apples'],
    featured: true,
  },
  {
    id: 'meat-poultry',
    slug: 'meat-poultry',
    name: 'Meat & Poultry',
    shortName: 'Meat & Poultry',
    description:
      'Boneless fresh cow meat (beef), dressed broiler chicken, fresh cut goat meat (chevon), and meaty turkey cuts.',
    image: STORE_IMAGES.categories['meat-poultry'],
    subcategories: ['Beef Cuts', 'Poultry', 'Goat Meat'],
    featured: true,
  },
  {
    id: 'fish-seafood',
    slug: 'fish-seafood',
    name: 'Fish & Seafood',
    shortName: 'Fish & Seafood',
    description:
      'Whole sun-dried WACO crayfish, kiln-smoked mangala catfish, fresh Titus mackerel, Norwegian stockfish, and Atlantic king prawns.',
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
      'Pure unrefined Edo red palm oil, double-refined vegetable oil, and cold-pressed virgin coconut oil.',
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
      'Fermented iru (locust beans), Hausa suya spice (yaji), bouillon seasoning cubes, curry, thyme, and pepper soup spice.',
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
      'Crates of fresh brown farm eggs, full-cream evaporated milk, Irish salted butter, and unsweetened Greek yogurt.',
    image: STORE_IMAGES.categories['dairy-eggs'],
    subcategories: ['Farm Eggs', 'Milk & Cream', 'Butter & Yogurt'],
    featured: false,
  },
  {
    id: 'beverages',
    slug: 'beverages',
    name: 'Beverages',
    shortName: 'Beverages',
    description:
      'Chilled spiced hibiscus zobo, classic malt drinks, chocolate cocoa malt powder, and pressed fruit juices.',
    image: STORE_IMAGES.categories.beverages,
    subcategories: ['Juices & Zobo', 'Malt Drinks', 'Hot Beverages'],
    featured: false,
  },
  {
    id: 'snacks-confectionery',
    slug: 'snacks-confectionery',
    name: 'Snacks & Confectionery',
    shortName: 'Snacks',
    description:
      'Crispy golden plantain chips, crunchy nutmeg chin-chin, roasted bottle groundnuts, and spiced Nigerian treats.',
    image: STORE_IMAGES.categories['snacks-confectionery'],
    subcategories: ['Local Snacks', 'Nuts & Peanuts'],
    featured: false,
  },
  {
    id: 'breakfast',
    slug: 'breakfast',
    name: 'Breakfast & Bakery',
    shortName: 'Breakfast',
    description:
      'Soft Lagos Agege bread loaves, hearty wholegrain rolled oats, and pure raw Taraba wildflower honey.',
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
      'Fast-action laundry detergent, citrus grease-cutting dish soap, and soft quilted 2-ply bath tissues.',
    image: STORE_IMAGES.categories.household,
    subcategories: ['Laundry Care', 'Kitchen Cleaning', 'Paper & Tissue'],
    featured: false,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug || c.id === slug);
}
