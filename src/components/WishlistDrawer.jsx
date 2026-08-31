import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getBrandIconBySlug } from '../assets/brandIcons';

export const WishlistDrawer = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
    addToCart,
    openProductPage
  } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-poppins">
      
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-gray-200 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <h2 className="font-bold text-base sm:text-lg text-gray-900">
                Saved Wishlist ({wishlist.length})
              </h2>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {wishlist.length > 0 ? (
              wishlist.map((product) => {
                const IconComponent = getBrandIconBySlug(product.slug);
                return (
                  <div
                    key={product.id}
                    className="flex gap-3 p-3 bg-white rounded-xl border border-gray-200 shadow-xs hover:border-[#293d67]/40 transition-colors"
                  >
                    <div
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openProductPage(product);
                      }}
                      className="w-14 h-14 rounded-lg bg-gray-50 p-1.5 border border-gray-100 flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      {product.logoUrl ? (
                        <img
                          src={product.logoUrl}
                          alt={product.name}
                          className="w-full h-full object-contain"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <IconComponent className="w-8 h-8" />
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4
                            onClick={() => {
                              setIsWishlistOpen(false);
                              openProductPage(product);
                            }}
                            className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1 cursor-pointer hover:text-[#293d67] transition-colors"
                          >
                            {product.name}
                          </h4>
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] text-gray-500 block">{product.category}</span>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-xs sm:text-sm text-[#293d67] font-inter">
                          Rs. {product.price}
                        </span>

                        <button
                          onClick={() => {
                            addToCart(product);
                            removeFromWishlist(product.id);
                          }}
                          className="px-3 py-1 bg-[#293d67] hover:bg-[#1e4cb1] text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-16 text-center text-gray-500 space-y-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-gray-800">Your wishlist is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Save your favorite subscriptions to buy later with 1-click.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-5 py-2 bg-[#293d67] text-white text-xs font-semibold rounded-xl hover:bg-[#1e4cb1] transition-colors cursor-pointer"
                >
                  Browse Catalog
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
