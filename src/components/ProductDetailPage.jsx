import React, { useState, useEffect } from 'react';
import {
  Star,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Heart,
  ChevronDown,
  ChevronUp,
  Eye,
  Check,
  Share2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getBrandIconBySlug } from '../assets/brandIcons';
import { products as initialProducts } from '../data/products';
import { ProductCard } from './ProductCard';
import { useRealtimeProductPresence } from '../hooks/useRealtimeProductPresence';

export const ProductDetailPage = ({ product, onBack, onSelectProduct }) => {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    openBillingPage,
    productsList = initialProducts
  } = useCart();

  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'faqs'

  // Real-time live presence tracking (Baseline 5 + actual active user tabs/sessions)
  const { totalViewersCount, activeRealUsers } = useRealtimeProductPresence(product?.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedPlanIndex(0);
    setQuantity(1);
  }, [product?.id]);

  if (!product) return null;

  // Real-time product entity directly synced from Admin CMS
  const liveProduct = (productsList && productsList.find(p => p.id === product.id || p.slug === product.slug)) || product;

  const currentPlans = liveProduct.plans && liveProduct.plans.length > 0 ? liveProduct.plans : [
    {
      id: 'default',
      name: '1 Month Plan',
      price: liveProduct.price,
      duration: '1 Month',
      warranty: '1 Month Warranty'
    }
  ];

  const selectedPlan = currentPlans[selectedPlanIndex] || currentPlans[0];
  const IconComponent = getBrandIconBySlug(liveProduct.slug);

  const currentStock = typeof liveProduct.stock === 'number' ? liveProduct.stock : 50;
  const isOutOfStock = currentStock <= 0;

  // Related products
  const relatedProducts = (productsList || [])
    .filter(p => p.id !== liveProduct.id && (p.category === liveProduct.category || p.isCombo))
    .slice(0, 4);

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    openBillingPage(liveProduct, selectedPlan, quantity);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Format bullets cleanly
  const bulletLines = liveProduct.shortDescription
    ? liveProduct.shortDescription
        .split('\n')
        .map(l => l.replace(/^[•·-]\s*/, '').trim())
        .filter(l => l.length > 0)
    : [];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-poppins pb-20 animate-in fade-in duration-200">
      
      {/* Breadcrumb Navigation (Exact OTT Sathi style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-normal">
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-[#293d67] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-gray-500">{liveProduct.category}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{liveProduct.name}</span>
          </div>

          <button
            onClick={handleShare}
            className="text-gray-400 hover:text-gray-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Big Product Visual Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-square bg-[#f4f6f9] rounded-3xl border border-gray-100 p-6 sm:p-10 flex items-center justify-center shadow-xs overflow-hidden">
              {/* Large Centered Logo / App Icon with Adaptive Auto-Scaling */}
              <div className="w-full h-full max-w-[85%] max-h-[85%] flex items-center justify-center">
                {liveProduct.logoUrl || liveProduct.image ? (
                  <img
                    src={liveProduct.logoUrl || liveProduct.image}
                    alt={liveProduct.name}
                    className="w-auto h-auto max-w-full max-h-full min-w-[140px] min-h-[140px] object-contain rounded-2xl drop-shadow-md select-none"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center drop-shadow-sm">
                    <IconComponent className="w-full h-full object-contain" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Clean Product Details (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              {liveProduct.name}
            </h1>

            {/* Rating & In-Stock Status */}
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-1 font-bold text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span>{liveProduct.rating || '5.0'}</span>
              </div>

              {currentStock <= 0 ? (
                <div className="flex items-center gap-1 text-red-600 font-semibold">
                  <span className="font-bold">●</span>
                  <span>Out of stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <span className="font-bold">✓</span>
                  <span>{currentStock} items in stock</span>
                </div>
              )}
            </div>

            {/* Warranty Badge (Navy Blue Pill matching OTT Sathi) */}
            <div>
              <span className="inline-flex items-center gap-1.5 bg-[#293d67] text-white text-xs font-semibold px-3 py-1 rounded-md shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{selectedPlan.warranty || '3 Months Warranty'}</span>
              </span>
            </div>

            {/* Price */}
            <div className="pt-1">
              <span className="text-2xl sm:text-3xl font-bold text-[#293d67] font-inter">
                Rs {selectedPlan.price || product.price}
              </span>
            </div>

            {/* Bullet List Features (Exact OTT Sathi Typography) */}
            <div className="space-y-1.5 text-xs sm:text-sm text-[#475569] leading-relaxed pt-1">
              {bulletLines.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-gray-400 font-bold">•</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>

            {/* Live Real-Time Social Proof Badge (Starts from 5 + actual live users) */}
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#e8f8f0] text-[#107c41] border border-[#c3eed7] px-3 py-1 rounded-full text-xs font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <Eye className="w-3.5 h-3.5" />
                <span>{totalViewersCount} users checking this right now</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 space-y-4">
              
              {/* Choose Plan Dropdown Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Choose Plan
                </label>
                <div className="relative max-w-md">
                  <select
                    value={selectedPlanIndex}
                    onChange={(e) => setSelectedPlanIndex(Number(e.target.value))}
                    className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-medium text-gray-800 focus:border-[#293d67] focus:ring-1 focus:ring-[#293d67] outline-hidden pr-10 cursor-pointer shadow-xs"
                  >
                    {currentPlans.map((plan, idx) => (
                      <option key={plan.id || idx} value={idx}>
                        {plan.name} {plan.warranty ? `| ${plan.warranty}` : ''}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Quantity Capsule Selector (Strictly Capped by Admin Stock) */}
              <div>
                <div className="flex items-center justify-between max-w-md mb-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Quantity
                  </label>
                  {quantity >= currentStock && currentStock > 0 && (
                    <span className="text-[11px] text-amber-600 font-semibold">
                      Max available limit ({currentStock})
                    </span>
                  )}
                </div>

                <div className="inline-flex items-center bg-[#293d67] text-white px-3.5 py-1.5 rounded-full gap-4 shadow-xs">
                  <button
                    type="button"
                    disabled={quantity <= 1 || isOutOfStock}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      quantity <= 1 || isOutOfStock
                        ? 'bg-gray-500/50 text-gray-400 cursor-not-allowed'
                        : 'bg-[#1b2a4a] text-white hover:bg-white/20 cursor-pointer'
                    }`}
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-white min-w-4 text-center font-inter">
                    {isOutOfStock ? 0 : quantity}
                  </span>
                  <button
                    type="button"
                    disabled={quantity >= currentStock || isOutOfStock}
                    onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      quantity >= currentStock || isOutOfStock
                        ? 'bg-gray-500/50 text-gray-400 cursor-not-allowed'
                        : 'bg-[#1b2a4a] text-white hover:bg-white/20 cursor-pointer'
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price Row */}
              <div className="flex items-center justify-between max-w-md pt-2">
                <span className="text-sm font-bold text-gray-900">Total Price</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#293d67] font-inter">
                  Rs {selectedPlan.price * (isOutOfStock ? 0 : quantity)}
                </span>
              </div>

              {/* Buy Now & Add to Cart Buttons */}
              <div className="grid grid-cols-2 gap-3 max-w-md pt-1">
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleBuyNow}
                  className={`py-3 px-4 rounded-full border-2 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 shadow-xs ${
                    isOutOfStock
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-[#293d67] text-[#293d67] hover:bg-blue-50/60 cursor-pointer'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>{isOutOfStock ? 'Out of Stock' : 'Buy Now'}</span>
                </button>

                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={() => addToCart(liveProduct, selectedPlan, quantity)}
                  className={`py-3 px-4 rounded-full font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-1.5 ${
                    isOutOfStock
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#293d67] hover:bg-[#1e4cb1] text-white cursor-pointer'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-14 pt-8 border-t border-gray-200">
          <div className="flex border-b border-gray-200 gap-6 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm sm:text-base font-bold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'overview'
                  ? 'border-[#293d67] text-[#293d67]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Description & Specifications
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`pb-3 text-sm sm:text-base font-bold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'faqs'
                  ? 'border-[#293d67] text-[#293d67]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Frequently Asked Questions
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-800 leading-relaxed whitespace-pre-line animate-in fade-in">
              {liveProduct.longDescription || liveProduct.shortDescription}
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-3 animate-in fade-in">
              {liveProduct.faqs && liveProduct.faqs.length > 0 ? (
                liveProduct.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xs"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                        className="w-full p-4 text-left font-bold text-sm text-gray-800 flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#293d67]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 pt-0 text-sm text-gray-600 border-t border-gray-100 bg-gray-50/60 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-xs text-gray-500 bg-gray-50 rounded-xl">
                  No specific FAQs for this product. Contact our WhatsApp support for instant answers.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-200 pb-20 sm:pb-0">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                You Might Also Like
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <div
                  key={relProduct.id}
                  onClick={() => onSelectProduct && onSelectProduct(relProduct)}
                >
                  <ProductCard product={relProduct} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Phone Sticky Bottom Action Bar (Daraz/Amazon Style) */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl z-30 sm:hidden flex items-center justify-between gap-3 font-poppins">
        <div>
          <div className="text-[10px] text-gray-500 font-semibold">Total Price</div>
          <div className="text-lg font-black text-[#293d67] font-inter leading-none">
            Rs {selectedPlan.price * (isOutOfStock ? 0 : quantity)}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleBuyNow}
            className={`py-2.5 px-4 rounded-xl border-2 font-bold text-xs transition-colors flex items-center justify-center gap-1 ${
              isOutOfStock
                ? 'border-gray-200 bg-gray-100 text-gray-400'
                : 'border-[#293d67] text-[#293d67] active:bg-blue-50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Buy Now</span>
          </button>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={() => addToCart(liveProduct, selectedPlan, quantity)}
            className={`py-2.5 px-4 rounded-xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1 text-white ${
              isOutOfStock
                ? 'bg-gray-300'
                : 'bg-[#293d67] active:bg-[#1e4cb1]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
