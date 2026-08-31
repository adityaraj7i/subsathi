import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getBrandIconBySlug } from '../assets/brandIcons';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    discountPercent,
    totalAmount,
    coupon,
    couponSuccess,
    couponError,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    productsList = [],
    storeConfig
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const phoneDisplay = storeConfig?.phone || '+977 9744723372';
  const waNumber = storeConfig?.whatsappNumber || '9779744723372';

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppQuickOrder = () => {
    if (cart.length === 0) return;
    const itemsList = cart
      .map(i => `- ${i.product?.name || 'Item'} (${i.plan?.name || 'Standard'}) x${i.quantity} = Rs. ${i.price * i.quantity}`)
      .join('\n');
    const msg = `Hello SubSathi, I would like to order:\n${itemsList}\nTotal: Rs. ${totalAmount}\nPlease share payment QR.`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-poppins">
      
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-gray-200 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#293d67] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-base sm:text-lg text-gray-900">
                Your Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cart.length > 0 ? (
              cart.map((item) => {
                const IconComponent = getBrandIconBySlug(item.product?.slug);
                return (
                  <div
                    key={item.cartItemId}
                    className="flex gap-3 p-3 bg-white rounded-xl border border-gray-200 shadow-xs hover:border-[#293d67]/40 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-lg bg-gray-50 p-1.5 border border-gray-100 flex items-center justify-center shrink-0">
                      {item.product?.logoUrl || item.product?.image ? (
                        <img
                          src={item.product?.logoUrl || item.product?.image}
                          alt={item.product?.name}
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
                          <h4 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1">
                            {item.product?.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] text-gray-500 block">{item.plan.name}</span>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        {(() => {
                          const liveProduct = productsList.find(p => p.id === item.productId || p.id === item.product?.id || p.slug === item.product?.slug) || item.product;
                          const maxStock = typeof liveProduct.stock === 'number' ? liveProduct.stock : 50;
                          const isMaxReached = item.quantity >= maxStock;

                          return (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-50">
                                <button
                                  onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                  className="px-2 py-0.5 text-gray-600 hover:bg-gray-200 text-xs font-bold cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="px-2 py-0.5 font-bold text-xs text-gray-800">
                                  {item.quantity}
                                </span>
                                <button
                                  disabled={isMaxReached}
                                  onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                  className={`px-2 py-0.5 text-xs font-bold ${
                                    isMaxReached
                                      ? 'text-gray-300 bg-gray-100 cursor-not-allowed'
                                      : 'text-gray-600 hover:bg-gray-200 cursor-pointer'
                                  }`}
                                  title={isMaxReached ? `Max stock available: ${maxStock}` : 'Add 1'}
                                >
                                  +
                                </button>
                              </div>
                              {isMaxReached && (
                                <span className="text-[10px] text-amber-600 font-bold">
                                  (Max {maxStock})
                                </span>
                              )}
                            </div>
                          );
                        })()}

                        <span className="font-bold text-xs sm:text-sm text-[#293d67] font-inter">
                          Rs. {item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-16 text-center text-gray-500 space-y-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-gray-800">Your cart is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Add subscriptions like Netflix, Prime, ChatGPT Plus or Canva Pro to get started.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2 bg-[#293d67] text-white text-xs font-semibold rounded-xl hover:bg-[#1e4cb1] transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50 space-y-4">
              
              {/* Promo Code */}
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Coupon (e.g. SUBSATHI10)"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white rounded-xl border border-gray-300 focus:border-[#293d67] uppercase font-bold outline-hidden"
                    />
                  </div>
                  <button
                    onClick={() => {
                      applyCoupon(inputCode);
                      setInputCode('');
                    }}
                    className="px-4 py-2 bg-gray-800 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {couponSuccess && (
                  <div className="text-[11px] text-green-600 font-semibold flex justify-between items-center">
                    <span>{couponSuccess}</span>
                    <button onClick={removeCoupon} className="text-red-500 hover:underline cursor-pointer">
                      Remove
                    </button>
                  </div>
                )}

                {couponError && (
                  <div className="text-[11px] text-red-500 font-semibold">{couponError}</div>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900 font-inter">Rs. {subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-inter">- Rs. {discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="font-bold text-[#293d67] font-inter">Rs. {totalAmount}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-[#293d67] hover:bg-[#1e4cb1] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleWhatsAppQuickOrder}
                  className="w-full py-2.5 px-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly via WhatsApp ({phoneDisplay})</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span>100% Verified Delivery & Local Payment Protection</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
