import React, { useState, useRef, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ selectedCategory, onSelectCategory, searchQuery, setSearchQuery }) => {
  const {
    totalItems,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAuthOpen,
    openProductPage,
    productsList,
    storeConfig
  } = useCart();
  const { user } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  const searchSuggestions = searchQuery.trim()
    ? productsList.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full font-poppins sticky top-0 left-0 right-0 z-40 bg-white shadow-[0_2px_25px_rgba(0,0,0,0.08)] border-b border-gray-100" role="banner">
      <div className="py-2.5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center lg:pb-2">
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden cursor-pointer text-[#293d67] p-1"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>

            {/* Brand Logo & Desktop Search */}
            <div className="flex items-center gap-4 flex-1">
              
              {/* SubSathi Logo */}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory('all');
                  setSearchQuery('');
                  window.history.pushState({}, '', '/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center shrink-0 hover:opacity-95 transition-opacity"
              >
                <img
                  src="/logo.svg"
                  alt={storeConfig.name || 'SubSathi'}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </a>

              {/* Desktop Search Bar (Wider, taller and more spacious) */}
              <div ref={searchRef} className="relative flex-1 max-w-2xl xl:max-w-3xl mx-4 xl:mx-8 hidden lg:block">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsSearchFocused(false);
                    const el = document.getElementById('best-sellers');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative flex items-center"
                >
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchFocused(true);
                    }}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search Netflix, Spotify, Prime, ChatGPT, Canva..."
                    className="w-full bg-[#f4f7fa] text-gray-800 placeholder-gray-400 pl-5 pr-14 py-3 rounded-full text-sm sm:text-base border border-gray-200 focus:outline-hidden focus:border-[#293d67] focus:bg-white transition-all shadow-inner font-medium"
                    aria-label="Search subscriptions"
                  />
                  
                  <button
                    type="submit"
                    className="absolute right-1.5 w-9 h-9 bg-[#293d67] hover:bg-[#1e4cb1] text-white rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                    aria-label="Submit search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </form>

                {/* Autocomplete Search Dropdown */}
                {isSearchFocused && searchQuery.trim().length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                    {searchSuggestions.length > 0 ? (
                      <div className="py-2">
                        <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Matching Subscriptions
                        </div>
                        {searchSuggestions.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              openProductPage(item);
                              setIsSearchFocused(false);
                            }}
                            className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center justify-between transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-xs sm:text-sm text-gray-800">{item.name}</span>
                              <span className="text-[10px] text-gray-400 font-semibold bg-gray-100 px-2 py-0.5 rounded">
                                {item.category}
                              </span>
                            </div>
                            <span className="font-bold text-xs text-[#293d67] font-inter">Rs. {item.price}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 text-center text-xs text-gray-500">
                        No product found for "{searchQuery}".
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3 lg:gap-5">
              
              {/* Login Button with Arrow Slide Hover effect */}
              <button
                onClick={() => setIsAuthOpen(true)}
                className="relative flex items-center gap-2 border border-white bg-[#293d67] text-white lg:px-5 px-3 py-2 rounded-xl lg:font-semibold text-xs sm:text-sm font-poppins cursor-pointer transition-all duration-300 group hover:bg-[#1e4cb1] shadow-xs"
                aria-label="Login to your account"
              >
                <span>{user ? user.name.split(' ')[0] : 'Login'}</span>
                <span className="overflow-hidden w-0 group-hover:w-4 transition-all duration-300 hidden sm:inline-block">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 17L15 12L10 7" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 12H3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative group cursor-pointer"
                aria-label="Go to shopping cart"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                  <svg className="lg:w-9 lg:h-9 w-8 h-8 text-[#293d67]" viewBox="0 0 28 32" fill="currentColor">
                    <path d="M15.6497 0C17.04 0 18.3492 0.633454 19.2971 1.71875C20.1592 2.70581 20.6632 3.99761 20.7454 5.34961C21.3456 5.37005 21.8839 5.40597 22.3655 5.46973C23.5092 5.62118 24.4384 5.94016 25.1877 6.6543L25.3235 6.79004C25.9813 7.48323 26.3152 8.35449 26.5149 9.42383C26.724 10.5437 26.8025 11.9813 26.9026 13.8008L27.3567 22.0264L27.4329 23.458C27.5001 24.8126 27.5312 25.9386 27.4563 26.8701C27.3548 28.1329 27.0515 29.1583 26.2844 29.9766C25.5161 30.7961 24.5147 31.1606 23.2668 31.333C22.0414 31.5023 20.4628 31.5 18.4622 31.5H14.5129C14.495 31.5 14.4768 31.4983 14.4592 31.4971C13.9963 31.4999 13.506 31.5 12.9875 31.5H9.03833C7.0377 31.5 5.45911 31.5023 4.23364 31.333C2.9858 31.1606 1.98438 30.7961 1.21606 29.9766C0.448945 29.1583 0.144526 28.133 0.0432129 26.8701C-0.0564079 25.6282 0.0330848 24.0406 0.144775 22.0264L0.596924 13.8008L0.670166 12.5068C0.744442 11.2824 0.827645 10.2637 0.984619 9.42383C1.19777 8.28344 1.56438 7.36846 2.31274 6.6543C3.06206 5.94014 3.99132 5.62119 5.13501 5.46973C5.26032 5.45314 5.38964 5.43884 5.52271 5.42578C5.63529 4.25159 5.99051 2.89842 7.02075 1.71875C7.9685 0.633665 9.27715 0.000187574 10.6672 0C11.5553 0 12.4097 0.260055 13.1584 0.729492C13.9073 0.259884 14.7615 6.68876e-05 15.6497 0ZM7.99634 7.71289C7.99634 6.71342 8.74687 5.96289 9.74634 5.96289H12.2795C13.279 5.96289 14.0295 6.71342 14.0295 7.71289C14.0295 8.71236 13.279 9.46289 12.2795 9.46289H9.74634C8.74687 9.46289 7.99634 8.71236 7.99634 7.71289Z"/>
                  </svg>
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#293d67] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="w-10 h-10 bg-[#293d67] hover:bg-[#1e4cb1] rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer group"
                aria-label="Go to wishlist"
              >
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="mt-3 lg:hidden">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const el = document.getElementById('best-sellers');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative flex items-center"
            >
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Netflix, Spotify, Prime, ChatGPT..."
                className="w-full bg-[#f4f7fa] text-gray-800 placeholder-gray-400 pl-4 pr-12 py-2.5 rounded-full text-xs sm:text-sm border border-gray-200 focus:outline-hidden focus:border-[#293d67] focus:bg-white transition-all shadow-inner font-medium"
              />
              <button
                type="submit"
                className="absolute right-1 w-8 h-8 bg-[#293d67] text-white rounded-full flex items-center justify-center transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3 font-poppins text-xs animate-in slide-in-from-top duration-200">
          <div className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
            Categories
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'all', label: 'All Subscriptions' },
              { id: 'Streaming', label: 'OTT Streaming' },
              { id: 'AI Tools', label: 'AI Tools' },
              { id: 'Software & VPN', label: 'Software & VPN' },
              { id: 'Design & Tools', label: 'Design & Tools' },
              { id: 'combo-deals', label: '🔥 Combo Deals' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#293d67] text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 text-right">
            <span className="text-gray-400 font-mono text-[11px]">{storeConfig.phone}</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
