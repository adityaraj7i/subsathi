import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';
import { storeInfo as initialStoreInfo, policies as initialPolicies } from '../data/policies';
import {
  isSupabaseConfigured,
  fetchProductsFromSupabase,
  saveProductToSupabase,
  deleteProductFromSupabase,
  fetchStoreConfigFromSupabase,
  saveStoreConfigToSupabase,
  fetchOrdersFromSupabase,
  insertOrderToSupabase,
  updateOrderStatusInSupabase
} from '../lib/supabase';

export const initialHeroBadges = [
  {
    id: 'badge-1',
    label: 'Top-Left Floating Badge',
    position: 'top-6 left-3 md:top-10 md:left-6 lg:top-12 lg:left-10 xl:left-24 2xl:left-48 -rotate-12',
    delay: '0s',
    front: { name: 'ChatGPT Plus', slug: 'chatgpt-plus', imageUrl: '' },
    back: { name: 'Gemini Pro', slug: 'gemini-pro-5tb-storage', imageUrl: '' }
  },
  {
    id: 'badge-2',
    label: 'Top-Right Floating Badge',
    position: 'top-6 right-3 md:top-10 md:right-6 lg:top-12 lg:right-10 xl:right-24 2xl:right-48 rotate-12',
    delay: '0.3s',
    front: { name: 'Adobe Creative Cloud', slug: 'adobe-creative-cloud', imageUrl: '' },
    back: { name: 'Canva Pro', slug: 'canva-pro', imageUrl: '' }
  },
  {
    id: 'badge-3',
    label: 'Bottom-Left Floating Badge',
    position: 'bottom-6 left-3 md:bottom-10 md:left-8 lg:bottom-12 lg:left-14 xl:left-28 2xl:left-52 -rotate-6',
    delay: '0.6s',
    front: { name: 'Netflix', slug: 'netflix', imageUrl: '' },
    back: { name: 'Prime Video', slug: 'prime-video', imageUrl: '' }
  },
  {
    id: 'badge-4',
    label: 'Bottom-Right Floating Badge',
    position: 'bottom-6 right-3 md:bottom-10 md:right-8 lg:bottom-12 lg:right-14 xl:right-28 2xl:right-52 rotate-6',
    delay: '0.9s',
    front: { name: 'Spotify', slug: 'spotify', imageUrl: '' },
    back: { name: 'NordVPN', slug: 'nord-vpn', imageUrl: '' }
  }
];

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Products list (CMS state)
  const [productsList, setProductsList] = useState(() => {
    try {
      const saved = localStorage.getItem('subsathi_products_list');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Store Configuration
  const [storeConfig, setStoreConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('subsathi_store_config');
      const base = saved ? JSON.parse(saved) : initialStoreInfo;
      if (!base.adminPassword || base.adminPassword === 'admin123' || base.adminPassword === '1234') {
        base.adminPassword = 'Aryan7834#$2&*';
      }
      return base;
    } catch {
      return { ...initialStoreInfo, adminPassword: 'Aryan7834#$2&*' };
    }
  });

  // Hero Floating Badges (Customizable in Admin)
  const [heroBadges, setHeroBadges] = useState(() => {
    try {
      const saved = localStorage.getItem('subsathi_hero_badges');
      return saved ? JSON.parse(saved) : initialHeroBadges;
    } catch {
      return initialHeroBadges;
    }
  });

  // Promo Coupons
  const [couponsList, setCouponsList] = useState(() => {
    try {
      const saved = localStorage.getItem('subsathi_coupons_list');
      return saved ? JSON.parse(saved) : [
        { id: 'c1', code: 'SUBSATHI10', discount: 10, isActive: true, description: '10% Storewide Welcome Discount' },
        { id: 'c2', code: 'WELCOME10', discount: 10, isActive: true, description: '10% New User Discount' },
        { id: 'c3', code: 'FESTIVE15', discount: 15, isActive: true, description: '15% Festive Special Promo' }
      ];
    } catch {
      return [
        { id: 'c1', code: 'SUBSATHI10', discount: 10, isActive: true, description: '10% Storewide Welcome Discount' },
        { id: 'c2', code: 'WELCOME10', discount: 10, isActive: true, description: '10% New User Discount' },
        { id: 'c3', code: 'FESTIVE15', discount: 15, isActive: true, description: '15% Festive Special Promo' }
      ];
    }
  });

  // Cart, Wishlist, Orders
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('subsathi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('subsathi_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('subsathi_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'SS-849201',
          orderId: 'SS-849201',
          customerName: 'Rohan Sharma',
          customerEmail: 'rohan.sharma@gmail.com',
          customerPhone: '9841234567',
          paymentMethod: 'whatsapp',
          transactionId: 'WA-89B42A',
          date: new Date(Date.now() - 3600000 * 2).toISOString(),
          status: 'Completed',
          totalAmount: 1499,
          items: [
            {
              product: initialProducts.find(p => p.slug === 'netflix') || initialProducts[0],
              plan: { name: '1 Month - Private PIN Profile', price: 1499 },
              quantity: 1,
              price: 1499
            }
          ]
        }
      ];
    } catch {
      return [];
    }
  });

  // Comprehensive route parser to determine active view, product, policy, admin, or 404 Not Found
  const parseCurrentRoute = (products = productsList) => {
    try {
      const rawPath = window.location.pathname.toLowerCase().replace(/\/+$/, '');
      const path = rawPath === '' ? '/' : rawPath;
      const params = new URLSearchParams(window.location.search);

      // 1. Check if Admin Portal URL (/aresxayu6720 or ?view=aresxayu6720)
      if (
        path === '/aresxayu6720' ||
        params.get('view') === 'aresxayu6720' ||
        params.has('aresxayu6720')
      ) {
        return { isAdmin: true, isBilling: false, policyPage: null, product: null, is404: false };
      }

      // 2. Check if Billing / Checkout URL (/billing or /checkout or ?view=billing)
      if (path === '/billing' || path === '/checkout' || params.get('view') === 'billing') {
        return { isAdmin: false, isBilling: true, policyPage: null, product: null, is404: false };
      }

      // 3. Check if Policy Pages (/about-us, /contact, etc. or ?page=about-us)
      const policyKeys = [
        'about-us',
        'contact',
        'how-it-works',
        'refund-policy',
        'warranty-policy',
        'privacy-policy',
        'terms-conditions',
        'support-desk'
      ];
      const matchedPolicy = policyKeys.find(k => path === `/${k}`) || (params.get('page') && policyKeys.includes(params.get('page')) ? params.get('page') : null);
      if (matchedPolicy) {
        return { isAdmin: false, isBilling: false, policyPage: matchedPolicy, product: null, is404: false };
      }

      // 4. Check if Product Detail Page (/product/:slug or ?product=slug)
      let productSlug = params.get('product');
      if (!productSlug && (path.startsWith('/product/') || path.startsWith('/p/'))) {
        productSlug = path.split('/')[2];
      }
      if (productSlug) {
        const found = products.find(p => p.slug === productSlug || p.id === productSlug);
        if (found) {
          return { isAdmin: false, isBilling: false, policyPage: null, product: found, is404: false };
        }
      }

      // 5. Official Root Homepage
      if (path === '/' || path === '/index.html') {
        return { isAdmin: false, isBilling: false, policyPage: null, product: null, is404: false };
      }

      // 6. Any other entered path -> 404 NOT FOUND
      return { isAdmin: false, isBilling: false, policyPage: null, product: null, is404: true };
    } catch {
      return { isAdmin: false, isBilling: false, policyPage: null, product: null, is404: false };
    }
  };

  const initialRoute = parseCurrentRoute(productsList);

  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(initialRoute.isAdmin);
  const [isBillingPageOpen, setIsBillingPageOpen] = useState(initialRoute.isBilling);
  const [activePolicyPage, setActivePolicyPage] = useState(initialRoute.policyPage);
  const [selectedProduct, setSelectedProduct] = useState(initialRoute.product);
  const [isNotFoundPage, setIsNotFoundPage] = useState(initialRoute.is404);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('subsathi_admin_auth') === 'true';
  });

  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard' | 'products' | 'orders' | 'crm' | 'coupons' | 'heroBadges' | 'settings'

  // Store Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activePolicyModal, setActivePolicyModal] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Persist Products, Settings, HeroBadges, Coupons, Cart, Wishlist, Orders
  useEffect(() => {
    try { localStorage.setItem('subsathi_products_list', JSON.stringify(productsList)); } catch (e) {}
  }, [productsList]);

  useEffect(() => {
    try { localStorage.setItem('subsathi_store_config', JSON.stringify(storeConfig)); } catch (e) {}
  }, [storeConfig]);

  useEffect(() => {
    try { localStorage.setItem('subsathi_hero_badges', JSON.stringify(heroBadges)); } catch (e) {}
  }, [heroBadges]);

  useEffect(() => {
    try { localStorage.setItem('subsathi_coupons_list', JSON.stringify(couponsList)); } catch (e) {}
  }, [couponsList]);

  useEffect(() => {
    try { localStorage.setItem('subsathi_cart', JSON.stringify(cart)); } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem('subsathi_wishlist', JSON.stringify(wishlist)); } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try { localStorage.setItem('subsathi_orders', JSON.stringify(orders)); } catch (e) {}
  }, [orders]);

  // Real-time Multi-Tab Storage Listener
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (!e.newValue) return;
      try {
        if (e.key === 'subsathi_products_list') setProductsList(JSON.parse(e.newValue));
        if (e.key === 'subsathi_store_config') setStoreConfig(JSON.parse(e.newValue));
        if (e.key === 'subsathi_hero_badges') setHeroBadges(JSON.parse(e.newValue));
        if (e.key === 'subsathi_coupons_list') setCouponsList(JSON.parse(e.newValue));
        if (e.key === 'subsathi_orders') setOrders(JSON.parse(e.newValue));
        if (e.key === 'subsathi_cart') setCart(JSON.parse(e.newValue));
        if (e.key === 'subsathi_wishlist') setWishlist(JSON.parse(e.newValue));
      } catch (err) {
        console.error('Storage sync error:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Supabase Cloud Sync (Loads live cloud database if configured in .env / Vercel)
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const syncCloudData = async () => {
      try {
        const cloudProducts = await fetchProductsFromSupabase();
        if (cloudProducts && cloudProducts.length > 0) {
          setProductsList(cloudProducts);
        }
        const cloudConfig = await fetchStoreConfigFromSupabase();
        if (cloudConfig) {
          setStoreConfig(cloudConfig);
        }
        const cloudOrders = await fetchOrdersFromSupabase();
        if (cloudOrders && cloudOrders.length > 0) {
          setOrders(cloudOrders);
        }
      } catch (err) {
        console.warn('Supabase sync notice:', err);
      }
    };

    syncCloudData();
  }, []);

  // Handle browser back/forward buttons & URL path changes
  useEffect(() => {
    const handlePopState = () => {
      const route = parseCurrentRoute(productsList);
      setIsAdminPortalOpen(route.isAdmin);
      setIsBillingPageOpen(route.isBilling);
      setActivePolicyPage(route.policyPage);
      setSelectedProduct(route.product);
      setIsNotFoundPage(route.is404);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [productsList]);

  const goToHome = () => {
    setIsNotFoundPage(false);
    setIsAdminPortalOpen(false);
    setIsBillingPageOpen(false);
    setActivePolicyPage(null);
    setSelectedProduct(null);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductPage = (product) => {
    if (!product) {
      closeProductPage();
      return;
    }

    setIsNotFoundPage(false);
    setIsBillingPageOpen(false);
    setActivePolicyPage(null);
    setSelectedProduct(product);
    const url = new URL(window.location.href);
    url.searchParams.set('product', product.slug || product.id);
    url.searchParams.delete('view');
    url.searchParams.delete('page');
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProductPage = () => {
    setSelectedProduct(null);
    setIsNotFoundPage(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('product');
    window.history.pushState({}, '', url.pathname === '/' ? '/' : '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Policy & Quick Links Pages Navigation (About Us, Contact, How It Works, Policies, Support Desk)
  const openPolicyPage = (pageKey) => {
    if (!pageKey) {
      closePolicyPage();
      return;
    }
    setIsNotFoundPage(false);
    setSelectedProduct(null);
    setIsBillingPageOpen(false);
    setActivePolicyModal(null);
    setActivePolicyPage(pageKey);
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageKey);
    url.searchParams.delete('product');
    url.searchParams.delete('view');
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closePolicyPage = () => {
    setActivePolicyPage(null);
    setIsNotFoundPage(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('page');
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to Billing Checkout Page
  const openBillingPage = (product = null, plan = null, quantity = 1) => {
    if (product) {
      addToCart(product, plan, quantity);
    }
    setIsNotFoundPage(false);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setSelectedProduct(null);
    setIsBillingPageOpen(true);
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'billing');
    url.searchParams.delete('product');
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeBillingPage = () => {
    setIsBillingPageOpen(false);
    setIsNotFoundPage(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to Admin view (Secret Route /aresxayu6720)
  const openAdminPortal = (tab = 'dashboard') => {
    setIsNotFoundPage(false);
    setIsAdminPortalOpen(true);
    setAdminTab(tab);
    setSelectedProduct(null);
    setIsBillingPageOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'aresxayu6720');
    url.searchParams.delete('product');
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Exit Admin view
  const closeAdminPortal = () => {
    setIsAdminPortalOpen(false);
    setIsNotFoundPage(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    url.searchParams.delete('aresxayu6720');
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Auth Methods - Password strictly verified against Aryan7834#$2&*
  const adminLogin = (password) => {
    const validPassword = storeConfig.adminPassword || 'Aryan7834#$2&*';
    if (password === validPassword || password === 'Aryan7834#$2&*') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('subsathi_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('subsathi_admin_auth');
  };

  // CMS: Product Management Actions
  const addProduct = (newProduct) => {
    const id = 'prod_' + Date.now();
    const slug = newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const created = {
      id,
      slug,
      rating: 4.9,
      totalSales: 0,
      stock: 50,
      isFlashSale: false,
      isBestSeller: false,
      isCombo: false,
      plans: [
        {
          id: 'plan_' + Date.now(),
          name: '1 Month Subscription',
          price: newProduct.price || 499,
          originalPrice: (newProduct.price || 499) * 1.3,
          duration: '1 Month',
          warranty: '28 Days Replacement Warranty'
        }
      ],
      faqs: [],
      ...newProduct
    };

    setProductsList(prev => [created, ...prev]);
    saveProductToSupabase(created);
    return created;
  };

  const updateProduct = (productId, updatedData) => {
    setProductsList(prev => {
      const updatedList = prev.map(p => (p.id === productId ? { ...p, ...updatedData } : p));
      const target = updatedList.find(p => p.id === productId);
      if (target) saveProductToSupabase(target);
      return updatedList;
    });
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => ({ ...prev, ...updatedData }));
    }
  };

  const deleteProduct = (productId) => {
    setProductsList(prev => prev.filter(p => p.id !== productId));
    deleteProductFromSupabase(productId);
    if (selectedProduct && selectedProduct.id === productId) {
      closeProductPage();
    }
  };

  // CMS: Store Settings Actions
  const updateStoreConfig = (newSettings) => {
    setStoreConfig(prev => {
      const updated = { ...prev, ...newSettings };
      saveStoreConfigToSupabase(updated);
      return updated;
    });
  };

  // CMS: Hero Floating Badges Actions
  const updateHeroBadges = (newBadges) => {
    setHeroBadges(newBadges);
  };

  const resetHeroBadges = () => {
    setHeroBadges(initialHeroBadges);
    localStorage.removeItem('subsathi_hero_badges');
  };

  // CMS: Coupon Management
  const addCoupon = (couponData) => {
    const newCoupon = {
      id: 'c_' + Date.now(),
      code: couponData.code.toUpperCase().trim(),
      discount: Number(couponData.discount) || 10,
      isActive: true,
      description: couponData.description || `${couponData.discount}% Off Discount`
    };
    setCouponsList(prev => [newCoupon, ...prev]);
  };

  const toggleCouponStatus = (couponId) => {
    setCouponsList(prev =>
      prev.map(c => (c.id === couponId ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCoupon = (couponId) => {
    setCouponsList(prev => prev.filter(c => c.id !== couponId));
  };

  // CMS: Order Status Updates
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o => (o.orderId === orderId || o.id === orderId ? { ...o, status: newStatus } : o))
    );
    updateOrderStatusInSupabase(orderId, newStatus);
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.orderId !== orderId && o.id !== orderId));
  };

  // Reset to Factory Data
  const resetToFactoryDefaults = () => {
    setProductsList(initialProducts);
    setStoreConfig({ ...initialStoreInfo, adminPassword: 'Aryan7834#$2&*' });
    setHeroBadges(initialHeroBadges);
    setCouponsList([
      { id: 'c1', code: 'SUBSATHI10', discount: 10, isActive: true, description: '10% Storewide Welcome Discount' },
      { id: 'c2', code: 'WELCOME10', discount: 10, isActive: true, description: '10% New User Discount' },
      { id: 'c3', code: 'FESTIVE15', discount: 15, isActive: true, description: '15% Festive Special Promo' }
    ]);
    localStorage.removeItem('subsathi_products_list');
    localStorage.removeItem('subsathi_store_config');
    localStorage.removeItem('subsathi_hero_badges');
    localStorage.removeItem('subsathi_coupons_list');
  };

  // Cart actions with strict stock quantity cap
  const addToCart = (product, selectedPlan = null, quantity = 1) => {
    const liveProduct = productsList.find(p => p.id === product.id || p.slug === product.slug) || product;
    const maxStock = typeof liveProduct.stock === 'number' ? liveProduct.stock : 50;

    if (maxStock <= 0) {
      alert(`"${liveProduct.name}" is currently out of stock.`);
      return;
    }

    const plan = selectedPlan || product.plans?.[0] || {
      id: 'default',
      name: 'Standard Plan',
      price: product.price,
      duration: '1 Month'
    };

    const cartItemId = `${product.id}_${plan.id || plan.name}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        const targetQty = Math.min(maxStock, existing.quantity + quantity);
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: targetQty, product: liveProduct }
            : item
        );
      } else {
        const safeQty = Math.min(maxStock, Math.max(1, quantity));
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            product: liveProduct,
            plan,
            quantity: safeQty,
            price: plan.price
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.cartItemId !== cartItemId) return item;
        const liveProduct = productsList.find(p => p.id === item.productId || p.id === item.product?.id || p.slug === item.product?.slug) || item.product;
        const maxStock = typeof liveProduct.stock === 'number' ? liveProduct.stock : 50;
        const safeQty = Math.min(maxStock, newQty);
        return { ...item, quantity: safeQty, product: liveProduct };
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon('');
    setDiscountPercent(0);
    setCouponSuccess('');
    setCouponError('');
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return;

    const matchedCoupon = couponsList.find(c => c.code === cleanCode && c.isActive);

    if (matchedCoupon) {
      setCoupon(cleanCode);
      setDiscountPercent(matchedCoupon.discount);
      setCouponSuccess(`Coupon ${cleanCode} applied! ${matchedCoupon.discount}% discount added.`);
      setCouponError('');
    } else {
      setCouponError('Invalid or expired coupon code.');
      setCouponSuccess('');
    }
  };

  const removeCoupon = () => {
    setCoupon('');
    setDiscountPercent(0);
    setCouponSuccess('');
    setCouponError('');
  };

  const addOrder = (orderDetails) => {
    const orderId = 'SS-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: orderId,
      orderId,
      date: new Date().toISOString(),
      items: [...cart],
      totalAmount,
      discountAmount,
      status: 'Processing',
      ...orderDetails
    };

    setOrders(prev => [newOrder, ...prev]);
    insertOrderToSupabase(newOrder);
    clearCart();
    return newOrder;
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalAmount = Math.max(0, subtotal - discountAmount);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        // Products CMS
        productsList,
        addProduct,
        updateProduct,
        deleteProduct,
        
        // Store Config & Settings
        storeConfig,
        updateStoreConfig,
        
        // Hero Floating 3D Badges
        heroBadges,
        updateHeroBadges,
        resetHeroBadges,

        // Coupons
        couponsList,
        addCoupon,
        toggleCouponStatus,
        deleteCoupon,

        // Cart & Checkout
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discountAmount,
        discountPercent,
        totalAmount,
        totalItems,
        coupon,
        couponSuccess,
        couponError,
        applyCoupon,
        removeCoupon,

        // Wishlist
        wishlist,
        toggleWishlist,
        isWishlisted,

        // Orders & Fulfillment
        orders,
        orderHistory: orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,

        // Modals & Drawers
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        activePolicyModal,
        setActivePolicyModal,
        isAuthOpen,
        setIsAuthOpen,
        isAdminOpen,
        // Dedicated Policy & Quick Links Standalone Pages
        activePolicyPage,
        setActivePolicyPage,
        openPolicyPage,
        closePolicyPage,

        // Dedicated Full Product Detail Page State
        selectedProduct,
        setSelectedProduct,
        selectedProductForModal: selectedProduct,
        setSelectedProductForModal: openProductPage,
        openProductPage,
        closeProductPage,

        // Dedicated Billing & WhatsApp Checkout Page State
        isBillingPageOpen,
        setIsBillingPageOpen,
        openBillingPage,
        closeBillingPage,
        setIsCheckoutOpen: openBillingPage,

        // 404 Not Found Page State
        isNotFoundPage,
        setIsNotFoundPage,
        goToHome,

        // Full Admin Portal Secret Route
        isAdminPortalOpen,
        adminTab,
        setAdminTab,
        openAdminPortal,
        closeAdminPortal,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        resetToFactoryDefaults
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
