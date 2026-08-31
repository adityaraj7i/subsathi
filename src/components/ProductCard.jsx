import React from 'react';
import { Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getBrandIconBySlug } from '../assets/brandIcons';

export const ProductCard = ({ product }) => {
  const { toggleWishlist, isWishlisted, openProductPage, productsList } = useCart();
  const wishlisted = isWishlisted(product.id);
  const IconComponent = getBrandIconBySlug(product.slug);

  // Sync real-time live product data
  const liveProduct = productsList ? productsList.find(p => p.id === product.id || p.slug === product.slug) || product : product;

  // Calculate Price Range or single price
  const plans = liveProduct.plans && liveProduct.plans.length > 0 ? liveProduct.plans : [];
  const prices = plans
    .map((p) => p.price)
    .filter((p) => typeof p === 'number' && p > 0);

  if (prices.length === 0 && liveProduct.price) {
    prices.push(liveProduct.price);
  }

  const minPrice = prices.length > 0 ? Math.min(...prices) : liveProduct.price || 499;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : liveProduct.price || 499;

  let priceDisplay = `Rs ${minPrice.toLocaleString()}`;
  if (maxPrice > minPrice) {
    priceDisplay = `Rs ${minPrice.toLocaleString()} – ${maxPrice.toLocaleString()}`;
  }

  const isCombo = liveProduct.isCombo;

  return (
    <div
      onClick={() => openProductPage(liveProduct)}
      className="group font-poppins cursor-pointer flex flex-col transition-all duration-200"
    >
      {/* Clean Standardized Product Image Box */}
      <div className="relative w-full aspect-square bg-[#f4f6f8] hover:bg-[#edf1f5] rounded-2xl p-4 sm:p-5 flex items-center justify-center border border-gray-100 transition-all duration-300 group-hover:shadow-md overflow-hidden">
        
        {/* Top Tag for Combo Deals if applicable */}
        {isCombo && (
          <div className="absolute top-2.5 left-3 sm:top-3 sm:left-3.5 z-10">
            <span className="text-[9px] sm:text-[10px] font-black text-[#9f1239] uppercase tracking-tight block">
              1 MONTH OTT COMBO
            </span>
          </div>
        )}

        {/* Love React (Wishlist Heart Button) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(liveProduct);
          }}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-gray-400 hover:text-red-500 shadow-xs border border-gray-100 flex items-center justify-center transition-all cursor-pointer hover:scale-110 z-10"
          aria-label="Toggle wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              wishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'
            }`}
          />
        </button>

        {/* Centered Brand Icon / Image Box with Adaptive Auto-Scaling */}
        <div className="w-full h-full max-w-[85%] max-h-[85%] flex items-center justify-center">
          {liveProduct.logoUrl || liveProduct.image ? (
            <img
              src={liveProduct.logoUrl || liveProduct.image}
              alt={liveProduct.name}
              className="w-auto h-auto max-w-full max-h-full min-w-[70px] min-h-[70px] object-contain rounded-xl drop-shadow-xs transition-transform duration-300 group-hover:scale-105 select-none"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <IconComponent className="w-full h-full object-contain" />
            </div>
          )}
        </div>
      </div>

      {/* Clean Product Details below Image */}
      <div className="pt-2.5 space-y-1 text-left">
        
        {/* Title & Star Rating */}
        <div className="flex items-center justify-between gap-1">
          <h3 className="font-semibold text-xs sm:text-sm text-gray-900 line-clamp-1 group-hover:text-[#293d67] transition-colors leading-snug">
            {liveProduct.name}
          </h3>

          <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold shrink-0">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-gray-700 font-bold">{liveProduct.rating || '4.0'}</span>
          </div>
        </div>

        {/* Price Range */}
        <div className="flex items-baseline gap-2">
          {liveProduct.originalPrice && liveProduct.originalPrice > liveProduct.price && (
            <span className="text-xs text-gray-400 line-through font-inter font-medium">
              Rs {liveProduct.originalPrice}
            </span>
          )}
          <span className="text-xs sm:text-sm font-bold text-[#293d67] font-inter">
            {priceDisplay}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
