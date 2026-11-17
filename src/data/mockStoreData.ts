import { Bundle, FaqItem, Order } from '../types/store';
import { STORE_IMAGES } from './images';

export const ANNOUNCEMENTS = [
  'WACO Foods — Quality From Our Farms To Your Table · Shop F1008, Apo Urban Market, Abuja',
  '100% Natural Packaged Rice, Beans, Garri & Plantain Flour — Clean, Sealed & Accurate Weights',
  'Use code WACO10 at checkout for 10% pantry savings · Call or WhatsApp +234 811 786 2336',
  'Fresh tomatoes, beef, Titus fish & leafy greens chilled daily for Apo, Wuse, Garki & nationwide dispatch',
];

export const BUNDLES: Bundle[] = [
  {
    id: 'bundle-waco-pantry',
    slug: 'waco-signature-pantry-quartet',
    name: 'WACO Signature Pantry Quartet',
    description:
      'All four farm-fresh WACO Foods staples in one bundle: 2kg Ekpoma Local Rice, 2kg Black Eye Beans, 2kg Ijebu Garri, and 2kg Premium Plantain Flour.',
    image: STORE_IMAGES.brand.farmPoster,
    productIds: ['waco-rg-ekpoma', 'waco-bl-blackeye-2kg', 'waco-gc-01', 'waco-gc-plantain-2kg'],
    bundlePrice: 23500,
    originalTotal: 26100,
    savingsLabel: 'Save ₦2,600',
  },
  {
    id: 'bundle-jollof',
    slug: 'sunday-jollof-family-box',
    name: 'Sunday Jollof Family Box',
    description:
      'Everything for a celebratory family pot: 5kg Mama Gold Rice, 2.5kg Stew Pepper Mix, 2L Vegetable Oil, Whole Dressed Chicken, and Curry/Thyme.',
    image: STORE_IMAGES.products['waco-rg-ekpoma'],
    productIds: ['waco-rg-01', 'waco-veg-08', 'waco-co-02', 'waco-mp-01', 'waco-ss-05'],
    bundlePrice: 35900,
    originalTotal: 40700,
    savingsLabel: 'Save ₦4,800',
  },
  {
    id: 'bundle-swallow',
    slug: 'soup-and-swallow-pantry-pack',
    name: 'Soup & Swallow Pantry Pack',
    description:
      'Authentic weekend soup kit: 2kg WACO Yellow Garri, 1kg Hand-Picked Egusi, 500g Smoked Catfish, 2L Edo Red Palm Oil, and Fresh Ugu Leaves.',
    image: STORE_IMAGES.products['waco-gc-yellow-2kg'],
    productIds: ['waco-gc-yellow-2kg', 'waco-bl-04', 'waco-fs-02', 'waco-co-01', 'waco-veg-06'],
    bundlePrice: 22100,
    originalTotal: 24950,
    savingsLabel: 'Save ₦2,850',
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Folake Adebowale',
    role: 'Home Cook & Mother of Three',
    location: 'Garki II, Abuja',
    quote:
      'Sorting tomatoes and beans used to eat half my Saturday. Every WACO Foods bag arrives stone-free, sealed cleanly, and weighed accurately.',
  },
  {
    id: 't2',
    name: 'Chukwudi Nwosu',
    role: 'Architect',
    location: 'Apo Legislative Quarters, Abuja',
    quote:
      'Picking up sealed Ekpoma Local Rice, Yellow Garri, and Plantain Flour right from Shop F1008 Apo Urban Market—or ordering online—is seamless.',
  },
  {
    id: 't3',
    name: 'Zainab Danjuma',
    role: 'Culinary Instructor',
    location: 'Wuse II, Abuja',
    quote:
      'From 5kg WACO Honey Beans to fresh beef steaks and sweet bell peppers, knowing a real Abuja retail store backs every pack builds total trust.',
  },
];

export const INITIAL_MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1042',
    orderNumber: 'WACO-1042',
    createdAt: 'November 12, 2026',
    estimatedDelivery: 'Delivered November 12, 2026',
    status: 'Delivered',
    customer: {
      fullName: 'Adaeze Eze',
      email: 'adaeze.demo@wacofoods.ng',
      phone: '+234 811 786 2336',
    },
    delivery: {
      state: 'FCT Abuja',
      city: 'Apo',
      address: '22 Gudu District Crescent, Apo, Abuja',
      instructions: 'Call at security gate on arrival.',
      method: 'standard',
    },
    paymentMethod: 'card',
    items: [
      {
        productId: 'waco-rg-ekpoma',
        name: 'WACO Foods Premium Local Rice (Ekpoma)',
        image: STORE_IMAGES.products['waco-rg-ekpoma'],
        variant: '2kg Sealed Pouch',
        unitPrice: 7800,
        quantity: 2,
      },
      {
        productId: 'waco-de-01',
        name: 'Fresh Large Brown Farm Eggs',
        image: STORE_IMAGES.products['waco-de-01'],
        variant: 'Full Crate (30)',
        unitPrice: 5800,
        quantity: 1,
      },
      {
        productId: 'waco-co-01',
        name: 'Edo Pure Unrefined Red Palm Oil',
        image: STORE_IMAGES.products['waco-co-01'],
        variant: '2 Litre Bottle',
        unitPrice: 5400,
        quantity: 1,
      },
    ],
    subtotal: 26800,
    deliveryFee: 2000,
    discount: 0,
    total: 28800,
  },
  {
    id: 'ord-1038',
    orderNumber: 'WACO-1038',
    createdAt: 'November 03, 2026',
    estimatedDelivery: 'In Transit — Apo Dispatch Slot',
    status: 'Out for Delivery',
    customer: {
      fullName: 'Adaeze Eze',
      email: 'adaeze.demo@wacofoods.ng',
      phone: '+234 811 786 2336',
    },
    delivery: {
      state: 'FCT Abuja',
      city: 'Wuse II',
      address: '14 Aminu Kano Crescent, Wuse II, Abuja',
      method: 'express',
    },
    paymentMethod: 'pay_on_delivery',
    items: [
      {
        productId: 'waco-bl-01',
        name: 'WACO Foods Honey Beans (Oloyin) — 5kg',
        image: STORE_IMAGES.products['waco-bl-01'],
        variant: '5kg Sealed Sack',
        unitPrice: 18900,
        quantity: 1,
      },
      {
        productId: 'waco-veg-08',
        name: 'Jollof & Stew Pepper Mix Box',
        image: STORE_IMAGES.products['waco-veg-08'],
        variant: '2.5kg Curated Box',
        unitPrice: 5500,
        quantity: 1,
      },
      {
        productId: 'waco-mp-01',
        name: 'Fresh Whole Dressed Broiler Chicken',
        image: STORE_IMAGES.products['waco-mp-01'],
        variant: 'Cut in 8 Pieces',
        unitPrice: 7800,
        quantity: 1,
      },
    ],
    subtotal: 32200,
    deliveryFee: 2500,
    discount: 0,
    total: 34700,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    topic: 'Ordering',
    question: 'How do I place a grocery order on WACO Foods?',
    answer:
      'Browse any aisle or the WACO Signature Packaged Line, select your package size (2kg, 5kg, or crates), add items to your shopping bag, and submit your order for Abuja doorstep delivery or Click & Collect pickup at Shop F1008, Apo Urban Market.',
  },
  {
    id: 'faq-2',
    topic: 'Ordering',
    question: 'Can I save items to purchase in a later weekly restock?',
    answer:
      'Yes. Click the heart icon on any product card to add it to your Wishlist, or use "Save for later" inside the Shopping Cart page. Your saved items persist locally in your browser.',
  },
  {
    id: 'faq-3',
    topic: 'Products',
    question: 'Are WACO Foods rice, beans, garri, and plantain flour pre-cleaned?',
    answer:
      'Yes. Every WACO Foods sealed pack—Ekpoma Local Rice, Honey Beans, Black Eye Beans, Ijebu Garri, Yellow Garri, and Plantain Flour—is 100% natural, hygienically processed, and stone-free.',
  },
  {
    id: 'faq-4',
    topic: 'Products',
    question: 'How are fresh tomatoes, meat, fish, and leafy greens handled?',
    answer:
      'Grade-A tomatoes, beef cuts, chilled chicken, mackerel, and fresh ugu leaves are stored in temperature-controlled chillers at Shop F1008, Apo Urban Market, and packed separately prior to dispatch.',
  },
  {
    id: 'faq-5',
    topic: 'Delivery',
    question: 'What fulfillment options does WACO Foods offer?',
    answer:
      'You can choose Same-Day Express Dispatch around Abuja (Apo, Gudu, Garki, Wuse, Maitama, Asokoro), Standard Next-Day Delivery, or walk-in Click & Collect pickup at Shop F1008, Apo Urban Market.',
  },
  {
    id: 'faq-6',
    topic: 'Payments',
    question: 'Do I enter real card details on this storefront preview?',
    answer:
      'No. Checkout on this preview website demonstrates order confirmation and tracking safely in your browser. You can also place direct orders via +234 811 786 2336 or +234 706 930 2350.',
  },
  {
    id: 'faq-7',
    topic: 'Returns',
    question: 'What happens if an item arrives bruised or incorrect?',
    answer:
      'Damaged or incorrect perishable items reported at delivery or within 24 hours qualify for immediate replacement or store credit.',
  },
  {
    id: 'faq-8',
    topic: 'Accounts',
    question: 'Do I need an account to browse or test checkout?',
    answer:
      'No—guest checkout works seamlessly, and you can also manage saved delivery addresses and reorder past baskets from Customer Account.',
  },
  {
    id: 'faq-9',
    topic: 'Order Tracking',
    question: 'How can I inspect my order status after checkout?',
    answer:
      'Immediately after checkout you are routed to an Order Confirmation receipt, and your order appears in Account Order History with a step-by-step fulfillment timeline.',
  },
];
