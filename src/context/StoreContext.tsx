import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { INITIAL_MOCK_ORDERS } from '../data/mockStoreData';
import { getProductById, PRODUCTS } from '../data/products';
import {
  Address,
  BasketDropEvent,
  BasketDropOrigin,
  CartItem,
  Order,
  Product,
  SavedItem,
  ToastMessage,
  UserProfile,
} from '../types/store';

interface StoreContextValue {
  cart: CartItem[];
  savedForLater: SavedItem[];
  wishlist: string[];
  user: UserProfile | null;
  orders: Order[];
  recentSearches: string[];
  promoCode: string;
  toasts: ToastMessage[];
  basketDrops: BasketDropEvent[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  addToCart: (
    productId: string,
    quantity?: number,
    variant?: string,
    silent?: boolean,
    origin?: BasketDropOrigin
  ) => void;
  triggerBasketDrop: (productId: string, origin?: BasketDropOrigin) => void;
  dismissBasketDrop: (id: string) => void;
  removeFromCart: (productId: string, variant?: string) => void;
  updateCartQuantity: (productId: string, variant: string, quantity: number) => void;
  saveItemForLater: (productId: string, variant: string) => void;
  moveSavedToCart: (productId: string, variant: string) => void;
  removeSavedItem: (productId: string, variant: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  clearPromoCode: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  loginDemoUser: (email: string, fullName?: string) => void;
  registerDemoUser: (data: { fullName: string; email: string; phone: string }) => void;
  logoutUser: () => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  addUserAddress: (address: Omit<Address, 'id'>) => void;
  placeSimulatedOrder: (payload: {
    customer: Order['customer'];
    delivery: Order['delivery'];
    paymentMethod: Order['paymentMethod'];
    deliveryFee: number;
  }) => Order;
  reorderPreviousOrder: (order: Order) => void;
  addRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
  showToast: (title: string, description?: string, tone?: ToastMessage['tone']) => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  cart: 'waco_store_cart_v1',
  saved: 'waco_store_saved_v1',
  wishlist: 'waco_store_wishlist_v1',
  user: 'waco_store_user_v1',
  orders: 'waco_store_orders_v1',
  searches: 'waco_store_searches_v1',
  promo: 'waco_store_promo_v1',
};

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-demo-1',
  fullName: 'Adaeze Eze',
  email: 'adaeze.demo@wacostore.example',
  phone: '+234 800 000 0142',
  joinedDate: 'October 2026',
  addresses: [
    {
      id: 'addr-1',
      label: 'Home (Illustrative)',
      recipientName: 'Adaeze Eze',
      phone: '+234 800 000 0142',
      state: 'Lagos',
      city: 'Lekki Phase 1',
      street: '14 Admiralty Way (Illustrative Address)',
      instructions: 'Call at security gate on arrival.',
      isDefault: true,
    },
  ],
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() =>
    readJson<CartItem[]>(STORAGE_KEYS.cart, [
      { productId: 'waco-rg-01', variant: '5kg Bag', quantity: 1 },
      { productId: 'waco-veg-08', variant: '2.5kg Curated Box', quantity: 1 },
    ])
  );
  const [savedForLater, setSavedForLater] = useState<SavedItem[]>(() =>
    readJson<SavedItem[]>(STORAGE_KEYS.saved, [])
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readJson<string[]>(STORAGE_KEYS.wishlist, ['waco-bl-01', 'waco-co-01', 'waco-de-01'])
  );
  const [user, setUser] = useState<UserProfile | null>(() =>
    readJson<UserProfile | null>(STORAGE_KEYS.user, DEFAULT_DEMO_USER)
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    readJson<Order[]>(STORAGE_KEYS.orders, INITIAL_MOCK_ORDERS)
  );
  const [recentSearches, setRecentSearches] = useState<string[]>(() =>
    readJson<string[]>(STORAGE_KEYS.searches, ['Ofada Rice', 'Honey Beans', 'Red Palm Oil'])
  );
  const [promoCode, setPromoCode] = useState<string>(() =>
    readJson<string>(STORAGE_KEYS.promo, '')
  );
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [basketDrops, setBasketDrops] = useState<BasketDropEvent[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    } catch {
      // ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(savedForLater));
    } catch {
      // ignore
    }
  }, [savedForLater]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.searches, JSON.stringify(recentSearches));
    } catch {
      // ignore
    }
  }, [recentSearches]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.promo, JSON.stringify(promoCode));
    } catch {
      // ignore
    }
  }, [promoCode]);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showToast = (title: string, description?: string, tone: ToastMessage['tone'] = 'default') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev.slice(-3), { id, title, description, tone }]);
    window.setTimeout(() => {
      dismissToast(id);
    }, 3400);
  };

  const dismissBasketDrop = (id: string) => {
    setBasketDrops((prev) => prev.filter((d) => d.id !== id));
  };

  const triggerBasketDrop = (productId: string, origin?: BasketDropOrigin) => {
    const product = getProductById(productId);
    if (!product) return;
    const id = `drop-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setBasketDrops((prev) => [
      ...prev.slice(-4),
      {
        id,
        productId: product.id,
        image: product.image,
        name: product.name,
        origin,
      },
    ]);
  };

  const addToCart = (
    productId: string,
    quantity = 1,
    variant?: string,
    silent = false,
    origin?: BasketDropOrigin
  ) => {
    const product = getProductById(productId);
    if (!product) return;
    const chosenVariant = variant || product.variants[0] || product.unit;
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.productId === productId && i.variant === chosenVariant);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { productId, variant: chosenVariant, quantity }];
    });
    if (!silent) {
      triggerBasketDrop(productId, origin);
      showToast('Added to shopping bag', `${product.name} (${chosenVariant})`, 'success');
    }
  };

  const removeFromCart = (productId: string, variant?: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.productId === productId && (!variant || i.variant === variant)))
    );
  };

  const updateCartQuantity = (productId: string, variant: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variant === variant ? { ...i, quantity } : i
      )
    );
  };

  const saveItemForLater = (productId: string, variant: string) => {
    removeFromCart(productId, variant);
    setSavedForLater((prev) => {
      if (prev.some((s) => s.productId === productId && s.variant === variant)) return prev;
      return [...prev, { productId, variant }];
    });
    showToast('Saved for later');
  };

  const moveSavedToCart = (productId: string, variant: string) => {
    setSavedForLater((prev) =>
      prev.filter((s) => !(s.productId === productId && s.variant === variant))
    );
    addToCart(productId, 1, variant);
  };

  const removeSavedItem = (productId: string, variant: string) => {
    setSavedForLater((prev) =>
      prev.filter((s) => !(s.productId === productId && s.variant === variant))
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
  };

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product: Product | undefined = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) return sum;
      return sum + product.price * item.quantity;
    }, 0);
  }, [cart]);

  const cartDiscount = useMemo(() => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'WACO10') return Math.round(cartSubtotal * 0.1);
    if (code === 'FRESH500' && cartSubtotal >= 5000) return 500;
    return 0;
  }, [promoCode, cartSubtotal]);

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'WACO10' || normalized === 'FRESH500') {
      setPromoCode(normalized);
      showToast('Promo code applied', `Illustrative code ${normalized} active.`, 'success');
      return true;
    }
    showToast('Promo code not recognized', 'Try WACO10 or FRESH500 for this demo.', 'warning');
    return false;
  };

  const clearPromoCode = () => setPromoCode('');

  const toggleWishlist = (productId: string) => {
    const product = getProductById(productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', product?.name);
        return prev.filter((id) => id !== productId);
      }
      showToast('Saved to wishlist', product?.name, 'success');
      return [productId, ...prev];
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const loginDemoUser = (email: string, fullName?: string) => {
    setUser((prev) => ({
      ...(prev ?? DEFAULT_DEMO_USER),
      email,
      fullName: fullName || prev?.fullName || email.split('@')[0],
    }));
    showToast('Signed in (demo)', `Welcome back to WACO`, 'success');
  };

  const registerDemoUser = (data: { fullName: string; email: string; phone: string }) => {
    setUser({
      id: `usr-${Date.now()}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      joinedDate: 'November 2026',
      addresses: DEFAULT_DEMO_USER.addresses,
    });
    showToast('Account created (demo)', `Welcome, ${data.fullName}`, 'success');
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Signed out');
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
    showToast('Profile updated', undefined, 'success');
  };

  const addUserAddress = (address: Omit<Address, 'id'>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const newAddr: Address = { ...address, id: `addr-${Date.now()}` };
      const existing = address.isDefault
        ? prev.addresses.map((a) => ({ ...a, isDefault: false }))
        : prev.addresses;
      return { ...prev, addresses: [newAddr, ...existing] };
    });
    showToast('Delivery address saved', undefined, 'success');
  };

  const placeSimulatedOrder = ({
    customer,
    delivery,
    paymentMethod,
    deliveryFee,
  }: {
    customer: Order['customer'];
    delivery: Order['delivery'];
    paymentMethod: Order['paymentMethod'];
    deliveryFee: number;
  }): Order => {
    const orderItems = cart
      .map((item) => {
        const p = getProductById(item.productId);
        if (!p) return null;
        return {
          productId: p.id,
          name: p.name,
          image: p.image,
          variant: item.variant,
          unitPrice: p.price,
          quantity: item.quantity,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    const num = 1043 + orders.length;
    const newOrder: Order = {
      id: `ord-${num}`,
      orderNumber: `WACO-${num}`,
      createdAt: 'November 16, 2026',
      estimatedDelivery:
        delivery.method === 'express'
          ? 'Today within 3 hours (Illustrative)'
          : delivery.method === 'pickup'
          ? 'Ready for Store Pickup in 2 hours (Illustrative)'
          : 'Tomorrow, 10:00 AM – 2:00 PM (Illustrative)',
      status: 'Processing',
      customer,
      delivery,
      paymentMethod,
      items: orderItems,
      subtotal: cartSubtotal,
      deliveryFee,
      discount: cartDiscount,
      total: Math.max(0, cartSubtotal - cartDiscount + deliveryFee),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const reorderPreviousOrder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.productId, item.quantity, item.variant, true);
    });
    showToast('Order items added to bag', `${order.items.length} products restored from ${order.orderNumber}`, 'success');
    setIsCartOpen(true);
  };

  const addRecentSearch = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    setRecentSearches((prev) => [clean, ...prev.filter((t) => t.toLowerCase() !== clean.toLowerCase())].slice(0, 6));
  };

  const clearRecentSearches = () => setRecentSearches([]);

  return (
    <StoreContext.Provider
      value={{
        cart,
        savedForLater,
        wishlist,
        user,
        orders,
        recentSearches,
        promoCode,
        toasts,
        basketDrops,
        isCartOpen,
        isSearchOpen,
        setIsCartOpen,
        setIsSearchOpen,
        addToCart,
        triggerBasketDrop,
        dismissBasketDrop,
        removeFromCart,
        updateCartQuantity,
        saveItemForLater,
        moveSavedToCart,
        removeSavedItem,
        clearCart,
        applyPromoCode,
        clearPromoCode,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartSubtotal,
        cartDiscount,
        loginDemoUser,
        registerDemoUser,
        logoutUser,
        updateUserProfile,
        addUserAddress,
        placeSimulatedOrder,
        reorderPreviousOrder,
        addRecentSearch,
        clearRecentSearches,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
