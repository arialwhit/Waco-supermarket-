import { Bundle, FaqItem, Order } from '../types/store';
import { STORE_IMAGES } from './images';

export const ANNOUNCEMENTS = [
  'Illustrative Store Demo — Same-day neighborhood delivery on orders placed before 2:00 PM',
  'Use code WACO10 at checkout for an illustrative 10% pantry savings demo',
  'Connected to our flagship physical store — Click & Collect ready in under 2 hours',
  'Fresh Mile 12 & Jos harvest restocked every morning at 7:00 AM',
];

export const BUNDLES: Bundle[] = [
  {
    id: 'bundle-jollof',
    slug: 'sunday-jollof-family-box',
    name: 'Sunday Jollof Family Box',
    description:
      'Everything for a celebratory family pot: 5kg Mama Gold Rice, 2.5kg Stew Pepper Mix, 2L Vegetable Oil, Whole Dressed Chicken, and Curry/Thyme.',
    image: STORE_IMAGES.yellowBox,
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
      'Authentic weekend soup kit: 3kg Ijebu Garri, 1kg Hand-Picked Egusi, 500g Smoked Catfish, 2L Edo Red Palm Oil, and Fresh Ugu Leaves.',
    image: STORE_IMAGES.categories['beans-legumes'],
    productIds: ['waco-gc-01', 'waco-bl-04', 'waco-fs-02', 'waco-co-01', 'waco-veg-06'],
    bundlePrice: 22100,
    originalTotal: 24750,
    savingsLabel: 'Save ₦2,650',
  },
  {
    id: 'bundle-breakfast',
    slug: 'weekday-breakfast-crate',
    name: 'Weekday Breakfast Crate',
    description:
      'Mornings sorted for the week: Crate of 30 Brown Eggs, Soft Agege Bread Loaf, 1kg Rolled Oats, Milo Refill, and 6 Tins Peak Milk.',
    image: STORE_IMAGES.categories.breakfast,
    productIds: ['waco-de-01', 'waco-bk-01', 'waco-bk-02', 'waco-bv-03', 'waco-de-02'],
    bundlePrice: 19600,
    originalTotal: 21850,
    savingsLabel: 'Save ₦2,250',
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Folake Adebowale',
    role: 'Home Cook & Mother of Three',
    location: 'Victoria Island (Illustrative)',
    quote:
      'Sorting tomatoes and beans used to eat half my Saturday. Every WACO bag arrives stone-free, sealed cleanly, and weighed accurately.',
  },
  {
    id: 't2',
    name: 'Chukwudi Nwosu',
    role: 'Architect',
    location: 'Ikeja GRA (Illustrative)',
    quote:
      'Being able to order bulk Ofada rice, smoked catfish, and household detergents in one clean cart saves me two separate market trips.',
  },
  {
    id: 't3',
    name: 'Zainab Danjuma',
    role: 'Culinary Instructor',
    location: 'Wuse II (Illustrative)',
    quote:
      'The unrefined red palm oil and fresh Ugu arrive vibrant and crisp. Knowing there is a real physical store behind the website builds huge trust.',
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
      email: 'adaeze.demo@wacostore.example',
      phone: '+234 800 000 0142',
    },
    delivery: {
      state: 'Lagos',
      city: 'Lekki Phase 1',
      address: '14 Admiralty Way (Illustrative Address)',
      instructions: 'Call at security gate on arrival.',
      method: 'standard',
    },
    paymentMethod: 'card',
    items: [
      {
        productId: 'waco-rg-01',
        name: 'Mama Gold Long Grain Parboiled Rice',
        image: STORE_IMAGES.categories['rice-grains'],
        variant: '5kg Bag',
        unitPrice: 18500,
        quantity: 1,
      },
      {
        productId: 'waco-de-01',
        name: 'Ogun Fresh Large Brown Farm Eggs',
        image: STORE_IMAGES.categories['dairy-eggs'],
        variant: 'Full Crate (30)',
        unitPrice: 5800,
        quantity: 1,
      },
      {
        productId: 'waco-co-01',
        name: 'Edo Pure Unrefined Red Palm Oil',
        image: STORE_IMAGES.categories['cooking-oils'],
        variant: '2 Litre Bottle',
        unitPrice: 5400,
        quantity: 1,
      },
    ],
    subtotal: 29700,
    deliveryFee: 2000,
    discount: 0,
    total: 31700,
  },
  {
    id: 'ord-1038',
    orderNumber: 'WACO-1038',
    createdAt: 'November 03, 2026',
    estimatedDelivery: 'In Transit — Illustrative Slot',
    status: 'Out for Delivery',
    customer: {
      fullName: 'Adaeze Eze',
      email: 'adaeze.demo@wacostore.example',
      phone: '+234 800 000 0142',
    },
    delivery: {
      state: 'Lagos',
      city: 'Lekki Phase 1',
      address: '14 Admiralty Way (Illustrative Address)',
      method: 'express',
    },
    paymentMethod: 'pay_on_delivery',
    items: [
      {
        productId: 'waco-veg-08',
        name: 'Jollof & Stew Pepper Mix Box',
        image: STORE_IMAGES.categories.vegetables,
        variant: '2.5kg Curated Box',
        unitPrice: 5500,
        quantity: 1,
      },
      {
        productId: 'waco-mp-01',
        name: 'Fresh Whole Dressed Broiler Chicken',
        image: STORE_IMAGES.categories['meat-poultry'],
        variant: 'Cut in 8 Pieces',
        unitPrice: 7800,
        quantity: 1,
      },
    ],
    subtotal: 13300,
    deliveryFee: 3000,
    discount: 0,
    total: 16300,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    topic: 'Ordering',
    question: 'How do I place a grocery order on WACO?',
    answer:
      'Browse any aisle or search directly for items, pick your preferred package weight (e.g. 2kg or 5kg), add them to your shopping bag, and complete our streamlined checkout flow. All prices and order submissions in this phase are illustrative frontend demonstrations.',
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
    question: 'Are your rice, beans, and garri items pre-cleaned?',
    answer:
      'Our dry staples are selected and packed in clean sealed pouches and buckets, sorted to minimize chaff and stones before leaving our retail store floor.',
  },
  {
    id: 'faq-4',
    topic: 'Products',
    question: 'How are fresh meat, fish, and leafy greens kept fresh?',
    answer:
      'Perishable proteins and greens are stored in temperature-controlled chillers at the WACO store and packed separately in insulated bags prior to dispatch (illustrative store standard).',
  },
  {
    id: 'faq-5',
    topic: 'Delivery',
    question: 'What delivery speeds does WACO plan to support?',
    answer:
      'This storefront demonstrates three fulfillment modes: Standard Next-Day Delivery, Same-Day Express Dispatch, and Click & Collect pickup at our physical store counter. Specific coverage zones will be confirmed upon store launch.',
  },
  {
    id: 'faq-6',
    topic: 'Payments',
    question: 'Do I enter real card details on this preview website?',
    answer:
      'No. This is a frontend-only storefront showcase. No real payment gateway is connected, and no real charges are made when submitting the simulated checkout form.',
  },
  {
    id: 'faq-7',
    topic: 'Returns',
    question: 'What happens if a fresh produce item arrives bruised or incorrect?',
    answer:
      'Under our draft customer-first return policy (subject to final business approval), damaged or incorrect perishable items reported at delivery or within 24 hours qualify for replacement or store credit.',
  },
  {
    id: 'faq-8',
    topic: 'Accounts',
    question: 'Do I need an account to browse or test checkout?',
    answer:
      'No—guest checkout works seamlessly, and you can also test our simulated Customer Login and Registration flows to manage addresses and view mock order history.',
  },
  {
    id: 'faq-9',
    topic: 'Order Tracking',
    question: 'How can I inspect my order status after checkout?',
    answer:
      'Immediately after simulated checkout you are routed to an Order Confirmation receipt, and your order also appears in your Account Order History with a step-by-step status timeline.',
  },
];
