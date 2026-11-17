export type AvailabilityStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  subcategories: string[];
  featured: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  subcategory: string;
  description: string;
  image: string;
  images: string[];
  price: number;
  originalPrice?: number;
  unit: string;
  variants: string[];
  stockQuantity: number;
  availability: AvailabilityStatus;
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestSelling: boolean;
  newArrival?: boolean;
  trending?: boolean;
  isDiscounted: boolean;
  tags: string[];
  specifications: ProductSpecification[];
  reviews?: ProductReview[];
}

export interface CartItem {
  productId: string;
  variant: string;
  quantity: number;
}

export interface SavedItem {
  productId: string;
  variant: string;
}

export interface Address {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  state: string;
  city: string;
  street: string;
  instructions?: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  joinedDate: string;
  addresses: Address[];
}

export type OrderStatus = 'Processing' | 'Packed' | 'Out for Delivery' | 'Delivered';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  variant: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  estimatedDelivery: string;
  status: OrderStatus;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  delivery: {
    state: string;
    city: string;
    address: string;
    instructions?: string;
    method: 'standard' | 'express' | 'pickup';
  };
  paymentMethod: 'card' | 'transfer' | 'pay_on_delivery';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export interface Bundle {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productIds: string[];
  bundlePrice: number;
  originalTotal: number;
  savingsLabel: string;
}

export interface FaqItem {
  id: string;
  topic:
    | 'Ordering'
    | 'Products'
    | 'Delivery'
    | 'Payments'
    | 'Returns'
    | 'Accounts'
    | 'Order Tracking';
  question: string;
  answer: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  tone?: 'default' | 'success' | 'warning';
}
