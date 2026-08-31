import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Heart,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Tv,
  Smartphone,
  Laptop,
  MessageCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { storeInfo } from '../data/policies';
import { getBrandIconBySlug } from '../assets/brandIcons';

export const ProductDetailModal = () => {
  const {
    selectedProductForModal: product,
    setSelectedProductForModal,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsCheckoutOpen
  } = useCart();

  if (!product) return null;

  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const selectedPlan = product.plans?.[selectedPlanIndex] || {
    id: 'default',
    name: '1 Month Plan',
    price: product.price,
    duration: '1 Month',
    warranty: '28 Days Replacement'
  };

  const wishlisted = isWishlisted(product.id);
  const IconComponent = getBrandIconBySlug(product.slug);

  const handleBuyNow = () => {
    addToCart(product, selectedPlan, quantity);
    setSelectedProductForModal(null);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppInquiry = () => {
    const text = `Hello SubSathi, I want to purchase ${product.name} (${selectedPlan.name}) for Rs. ${selectedPlan.price}. Please provide payment instructions.`;
    window.open(`https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto font-poppins animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-gray-900 border border-gray-100">
        
        {/* Header Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* Main Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Left Image Area */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full aspect-square bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-8 flex items-center justify-center relative shadow-inner">
                
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-gray-400 hover:text-red-500 shadow-sm flex items-center justify-center transition-all cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'text-red-500 fill-red-500' : ''}`} />
                </button>

                {!imgError && product.logoUrl ? (
                  <img
                    src={product.logoUrl}
                    alt={product.name}
                    onError={() => setImgError(true)}
                    className="max-h-44 max-w-full object-contain"
                  />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center drop-shadow-lg">
                    <IconComponent className="w-full h-full" />
                  </div>
                )}

                <span className="absolute bottom-3 left-3 bg-[#00E510]/15 text-green-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current text-green-600" /> Instant Delivery
                </span>
              </div>

              {/* Supported Platforms */}
              <div className="w-full mt-4 p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600">
                <span className="font-bold text-gray-700 text-[11px] block mb-1.5 uppercase tracking-wider">Supported Platforms:</span>
                <div className="flex items-center gap-3 font-medium">
                  <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-[#293d67]" /> Mobile</span>
                  <span className="flex items-center gap-1"><Laptop className="w-3.5 h-3.5 text-[#293d67]" /> Laptop/PC</span>
                  <span className="flex items-center gap-1"><Tv className="w-3.5 h-3.5 text-[#293d67]" /> Smart TV</span>
                </div>
              </div>
            </div>

            {/* Right Product Details & Plan Selection */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-50 text-[#293d67] text-xs font-bold px-2.5 py-0.5 rounded-md">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating || '4.9'}</span>
                    <span className="text-gray-400 font-normal">({product.totalSales || 120}+ reviews)</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-bold text-xl sm:text-2xl text-gray-900 mb-2">
                  {product.name}
                </h2>

                {/* Short bullet description */}
                <div className="text-xs sm:text-sm text-gray-600 space-y-1 mb-4 leading-relaxed">
                  {product.shortDescription.split('\n').map((line, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                      <span>{line.replace(/^[•·-]\s*/, '')}</span>
                    </div>
                  ))}
                </div>

                {/* Plan Selection */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Select Plan Tier:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.plans?.map((plan, idx) => {
                      const isSelected = selectedPlanIndex === idx;
                      return (
                        <button
                          key={plan.id || idx}
                          type="button"
                          onClick={() => setSelectedPlanIndex(idx)}
                          className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/80 border-[#293d67] shadow-sm'
                              : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className={`text-xs font-bold ${isSelected ? 'text-[#293d67]' : 'text-gray-800'}`}>
                              {plan.name}
                            </span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#293d67]" />}
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-bold text-sm text-gray-900 font-inter">
                              Rs. {plan.price}
                            </span>
                            {plan.originalPrice > plan.price && (
                              <span className="text-xs text-gray-400 line-through font-inter">
                                Rs. {plan.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-gray-500 mt-0.5">
                            {plan.warranty}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity + Total Price */}
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-200 mb-4">
                  <div className="flex items-center border border-gray-300 bg-white rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-bold text-xs text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex-1 text-right">
                    <span className="text-[11px] text-gray-500 block">Total Amount:</span>
                    <span className="font-bold text-xl text-[#293d67] font-inter">
                      Rs. {selectedPlan.price * quantity}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      addToCart(product, selectedPlan, quantity);
                      setSelectedProductForModal(null);
                    }}
                    className="py-2.5 px-4 rounded-xl border-2 border-[#293d67] text-[#293d67] hover:bg-[#293d67] hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-2.5 px-4 rounded-xl bg-[#293d67] hover:bg-[#1e4cb1] text-white font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-current text-amber-300" />
                    <span>Instant Checkout</span>
                  </button>
                </div>

                {/* WhatsApp button */}
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full mt-2.5 py-2 px-4 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-green-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly on WhatsApp ({storeInfo.phone})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          {product.longDescription && (
            <div className="pt-4 border-t border-gray-100">
              <h3 className="font-bold text-base text-gray-900 mb-2">
                Product Details
              </h3>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                {product.longDescription}
              </div>
            </div>
          )}

          {/* FAQs */}
          {product.faqs && product.faqs.length > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <h3 className="font-bold text-base text-gray-900 mb-3">
                Frequently Asked Questions
              </h3>
              <div className="space-y-2">
                {product.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                        className="w-full p-3.5 text-left font-semibold text-xs sm:text-sm text-gray-800 flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#293d67]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>

                      {isOpen && (
                        <div className="p-3.5 pt-0 text-xs sm:text-sm text-gray-600 border-t border-gray-100 bg-gray-50/50 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
