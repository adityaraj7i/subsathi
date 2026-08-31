import React from 'react';
import { Home, Grid, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MobileBottomNav = ({ onSelectCategory, onScrollToSection }) => {
  const {
    totalItems,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    closeProductPage,
    closeBillingPage,
    closePolicyPage,
    goToHome,
    selectedProduct,
    isBillingPageOpen,
    activePolicyPage,
    isNotFoundPage,
    storeConfig
  } = useCart();

  const waNumber = storeConfig?.whatsappNumber || '9779744723372';

  // Do not show navigation on active product detail or checkout page to allow space for purchase buttons
  if (selectedProduct || isBillingPageOpen) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl lg:hidden font-poppins px-3 py-1.5"
      role="navigation"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        
        {/* 1. Home Button */}
        <button
          onClick={() => {
            goToHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            !activePolicyPage && !isNotFoundPage ? 'text-[#293d67] font-bold' : 'text-gray-500 hover:text-gray-900'
          }`}
          aria-label="Home"
        >
          <Home className={`w-5 h-5 ${!activePolicyPage && !isNotFoundPage ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px]">Home</span>
        </button>

        {/* 2. Categories Button */}
        <button
          onClick={() => {
            if (activePolicyPage || isNotFoundPage) {
              goToHome();
            }
            setTimeout(() => {
              const el = document.getElementById('best-sellers') || document.getElementById('flash-deals');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 60);
          }}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-gray-500 hover:text-[#293d67] transition-all cursor-pointer"
          aria-label="Categories"
        >
          <Grid className="w-5 h-5 stroke-2" />
          <span className="text-[10px]">Categories</span>
        </button>

        {/* 3. Wishlist Button with Badge */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-gray-500 hover:text-red-500 transition-all cursor-pointer"
          aria-label="Wishlist"
        >
          <div className="relative">
            <Heart className="w-5 h-5 stroke-2" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 shadow-xs animate-pulse">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px]">Wishlist</span>
        </button>

        {/* 4. Cart Button with Live Counter Badge */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-gray-500 hover:text-[#293d67] transition-all cursor-pointer"
          aria-label="Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-2" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 bg-[#293d67] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 shadow-xs">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px]">Cart</span>
        </button>

        {/* 5. Instant WhatsApp Support with Live Online Indicator */}
        <a
          href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Hello SubSathi, I have an inquiry about subscription purchases.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-emerald-600 font-semibold hover:text-emerald-700 transition-all cursor-pointer"
          aria-label="24/7 WhatsApp Support"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 stroke-[2.2]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <span className="text-[10px]">Support</span>
        </a>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
