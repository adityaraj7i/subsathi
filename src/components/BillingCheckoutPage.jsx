import React, { useState } from 'react';
import {
  ArrowLeft,
  Tag,
  Check,
  ShieldCheck,
  Zap,
  HelpCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getBrandIconBySlug } from '../assets/brandIcons';

export const BillingCheckoutPage = ({ onBack }) => {
  const {
    cart,
    totalAmount,
    subtotal,
    discountAmount,
    discountPercent,
    coupon,
    couponSuccess,
    couponError,
    applyCoupon,
    removeCoupon,
    addOrder,
    storeConfig,
    productsList
  } = useCart();

  const { user } = useAuth();

  // Form State
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [countryCode, setCountryCode] = useState('+977');
  const [phone, setPhone] = useState(user?.phone || '');
  const [alternativeNumber, setAlternativeNumber] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, use the first product as a demo or fallback
  const checkoutItems = cart.length > 0 ? cart : [
    {
      cartItemId: 'fallback_1',
      product: productsList.find(p => p.slug === 'gemini-pro-5tb-storage') || productsList[0],
      plan: {
        name: 'Shared — 12 Months | 3-Month Warranty • 1 month(s)',
        price: productsList.find(p => p.slug === 'gemini-pro-5tb-storage')?.price || 1499
      },
      quantity: 1,
      price: productsList.find(p => p.slug === 'gemini-pro-5tb-storage')?.price || 1499
    }
  ];

  const calculatedSubtotal = cart.length > 0 ? subtotal : (checkoutItems[0]?.price || 1499);
  const calculatedTotal = cart.length > 0 ? totalAmount : Math.max(0, calculatedSubtotal - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    applyCoupon(promoCodeInput);
  };

  const handleContinueOnWhatsApp = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your Full Name.');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Please enter your Delivery Email address.');
      return;
    }

    if (!phone.trim()) {
      setErrorMessage('Please enter your WhatsApp phone number.');
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage('Please accept the terms and conditions to proceed.');
      return;
    }

    setIsSubmitting(true);

    const formattedPhone = `${countryCode} ${phone.trim()}`;

    // Register order in Admin Orders & CRM
    const newOrder = addOrder({
      customerName: fullName.trim(),
      customerEmail: email.trim(),
      customerPhone: phone.trim(),
      customerNotes: orderNote.trim(),
      paymentMethod: 'whatsapp',
      transactionId: 'WA-' + Math.floor(100000 + Math.random() * 900000)
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Format WhatsApp message to store owner
    const itemsList = checkoutItems
      .map(i => `• *${i.product?.name || 'Subscription'}* (${i.plan?.name || 'Standard'})\n  Qty: ${i.quantity} | Rs. ${i.price * i.quantity}`)
      .join('\n\n');

    const whatsappMessage = `*NEW ORDER ON SUBSATHI* 🇳🇵
------------------------------------
*Order ID:* ${newOrder.orderId}
*Customer Name:* ${fullName.trim()}
*Email:* ${email.trim()}
*WhatsApp Number:* ${formattedPhone}
${alternativeNumber ? `*Alt Phone:* ${alternativeNumber}\n` : ''}${orderNote ? `*Order Note:* ${orderNote}\n` : ''}
*Ordered Services:*
${itemsList}

*Sub Total:* Rs. ${calculatedSubtotal}
${discountAmount > 0 ? `*Discount (${discountPercent}%):* -Rs. ${discountAmount}\n` : ''}*Total Payable Amount:* *Rs. ${calculatedTotal}*
------------------------------------
Please send me payment instructions and account credentials!`;

    const targetWhatsAppNumber = storeConfig.whatsappNumber || '9779744723372';
    const waUrl = `https://wa.me/${targetWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-poppins pb-20 animate-in fade-in duration-300">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-[#293d67] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-[#293d67] transition-colors cursor-pointer"
          >
            Add to Cart
          </button>
          <span>/</span>
          <span className="text-gray-900 font-bold">Billing</span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Billing Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Billing Details
              </h1>
            </div>

            {errorMessage && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <span>⚠️ {errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleContinueOnWhatsApp} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-[#293d67] focus:ring-1 focus:ring-[#293d67] outline-hidden transition-all bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-[#293d67] focus:ring-1 focus:ring-[#293d67] outline-hidden transition-all bg-white"
                />
              </div>

              {/* WhatsApp Number Card (Exact Green Bordered Design) */}
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-500/80 bg-emerald-50/20 space-y-3 relative">
                
                {/* Green Left Accent / Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 21 21">
                        <path d="M13.5391 14.7601C9.44489 14.7601 6.11391 11.427 6.11279 7.33157C6.11391 6.29342 6.95899 5.44922 7.9946 5.44922C8.10107 5.44922 8.20642 5.45819 8.30729 5.47613C8.5292 5.51312 8.73992 5.58824 8.93381 5.70147C8.96183 5.71829 8.98088 5.74519 8.98537 5.77658L9.41799 8.50426C9.42359 8.53677 9.41351 8.56816 9.39221 8.59171C9.15348 8.85629 8.84863 9.04688 8.50903 9.14217L8.3454 9.18814L8.40704 9.34622C8.96519 10.7678 10.1017 11.9035 11.5239 12.464L11.682 12.5268L11.7279 12.3631C11.8232 12.0234 12.0137 11.7185 12.2782 11.4797C12.2973 11.4618 12.3231 11.4528 12.3488 11.4528C12.3544 11.4528 12.3601 11.4528 12.3668 11.4539L15.0936 11.8867C15.1262 11.8923 15.1531 11.9102 15.1699 11.9382C15.2819 12.1322 15.357 12.3441 15.3951 12.5661C15.4131 12.6647 15.4209 12.769 15.4209 12.8777C15.4209 13.9148 14.577 14.759 13.5391 14.7601Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-gray-900 leading-tight">
                        WhatsApp Number
                      </h3>
                      <p className="text-[11px] text-gray-500">
                        Order updates will be sent here
                      </p>
                    </div>
                  </div>

                  <span className="bg-emerald-100/80 text-emerald-700 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider">
                    REQUIRED
                  </span>
                </div>

                {/* Country Code + Phone Input */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-1">
                  
                  {/* Code */}
                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Code
                    </label>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-gray-300 bg-white focus:border-emerald-500 outline-hidden"
                    >
                      <option value="+977">NP +977</option>
                      <option value="+91">IN +91</option>
                      <option value="+1">US +1</option>
                      <option value="+44">UK +44</option>
                      <option value="+971">UAE +971</option>
                      <option value="+61">AU +61</option>
                    </select>
                  </div>

                  {/* Phone Input */}
                  <div className="sm:col-span-8">
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="w-5 h-5 absolute left-3.5 top-3 text-[#25D366]">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 21 21">
                          <path d="M13.5391 14.7601C9.44489 14.7601 6.11391 11.427 6.11279 7.33157C6.11391 6.29342 6.95899 5.44922 7.9946 5.44922C8.10107 5.44922 8.20642 5.45819 8.30729 5.47613C8.5292 5.51312 8.73992 5.58824 8.93381 5.70147C8.96183 5.71829 8.98088 5.74519 8.98537 5.77658L9.41799 8.50426C9.42359 8.53677 9.41351 8.56816 9.39221 8.59171C9.15348 8.85629 8.84863 9.04688 8.50903 9.14217L8.3454 9.18814L8.40704 9.34622C8.96519 10.7678 10.1017 11.9035 11.5239 12.464L11.682 12.5268L11.7279 12.3631C11.8232 12.0234 12.0137 11.7185 12.2782 11.4797C12.2973 11.4618 12.3231 11.4528 12.3488 11.4528C12.3544 11.4528 12.3601 11.4528 12.3668 11.4539L15.0936 11.8867C15.1262 11.8923 15.1531 11.9102 15.1699 11.9382C15.2819 12.1322 15.357 12.3441 15.3951 12.5661C15.4131 12.6647 15.4209 12.769 15.4209 12.8777C15.4209 13.9148 14.577 14.759 13.5391 14.7601Z" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your WhatsApp number"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:border-emerald-500 outline-hidden font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternative Number (Optional) */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                  Alternative Number <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={alternativeNumber}
                  onChange={(e) => setAlternativeNumber(e.target.value)}
                  placeholder="Alternative Number (Optional)"
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-[#293d67] outline-hidden transition-all bg-white"
                />
              </div>

              {/* Order Note (optional) */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                  Order Note <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Order Note (optional)"
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-[#293d67] outline-hidden transition-all bg-white"
                />
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary & Purchase Method (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Order Summary
              </h2>
            </div>

            {/* Order Items List */}
            <div className="space-y-3">
              {checkoutItems.map((item, idx) => {
                const IconComponent = getBrandIconBySlug(item.product?.slug);
                return (
                  <div
                    key={item.cartItemId || idx}
                    className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200 flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0">
                        {item.product?.logoUrl || item.product?.image ? (
                          <img
                            src={item.product?.logoUrl || item.product?.image}
                            alt={item.product?.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <IconComponent className="w-8 h-8" />
                        )}
                      </div>

                      <div>
                        <h4 className="font-extrabold text-xs sm:text-sm text-gray-900">
                          {item.product?.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-medium line-clamp-1">
                          {item.plan?.name}
                        </p>
                        <div className="inline-block mt-1 bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-0.2 rounded">
                          Qty: {item.quantity}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-sm sm:text-base text-gray-900 font-inter">
                        Rs {item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Promo Code Input */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-xs font-bold text-gray-800">
                Promo Code
              </label>
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-[#293d67] uppercase font-bold outline-hidden bg-white"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {couponSuccess && (
                <div className="text-[11px] text-green-600 font-semibold flex justify-between items-center pt-1">
                  <span>✓ {couponSuccess}</span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponError && (
                <div className="text-[11px] text-red-500 font-semibold pt-1">
                  {couponError}
                </div>
              )}
            </div>

            {/* Order Details Breakdown */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
                Order Details
              </h3>

              <div className="p-4 bg-gray-50/60 rounded-2xl border border-gray-200 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Sub Total</span>
                  <span className="font-semibold text-gray-900 font-inter">Rs {calculatedSubtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-inter">- Rs {discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-2 border-t border-gray-200 text-base sm:text-lg font-extrabold text-gray-900">
                  <span>Total Price</span>
                  <span className="font-extrabold text-[#293d67] font-inter">Rs {calculatedTotal}</span>
                </div>
              </div>
            </div>

            {/* Purchase Method (WhatsApp Only) */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight">
                Purchase Method
              </h3>

              <div className="p-3.5 rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 21 21">
                      <path d="M13.5391 14.7601C9.44489 14.7601 6.11391 11.427 6.11279 7.33157C6.11391 6.29342 6.95899 5.44922 7.9946 5.44922C8.10107 5.44922 8.20642 5.45819 8.30729 5.47613C8.5292 5.51312 8.73992 5.58824 8.93381 5.70147C8.96183 5.71829 8.98088 5.74519 8.98537 5.77658L9.41799 8.50426C9.42359 8.53677 9.41351 8.56816 9.39221 8.59171C9.15348 8.85629 8.84863 9.04688 8.50903 9.14217L8.3454 9.18814L8.40704 9.34622C8.96519 10.7678 10.1017 11.9035 11.5239 12.464L11.682 12.5268L11.7279 12.3631C11.8232 12.0234 12.0137 11.7185 12.2782 11.4797C12.2973 11.4618 12.3231 11.4528 12.3488 11.4528C12.3544 11.4528 12.3601 11.4528 12.3668 11.4539L15.0936 11.8867C15.1262 11.8923 15.1531 11.9102 15.1699 11.9382C15.2819 12.1322 15.357 12.3441 15.3951 12.5661C15.4131 12.6647 15.4209 12.769 15.4209 12.8777C15.4209 13.9148 14.577 14.759 13.5391 14.7601Z" />
                    </svg>
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-gray-900">
                    Continue on WhatsApp
                  </span>
                </div>

                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Selected
                </span>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-0 cursor-pointer"
                />
                <span>I agree to terms and conditions</span>
              </label>

              {/* Big Green CTA Button */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleContinueOnWhatsApp}
                className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 transform hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Opening WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 21 21">
                      <path d="M13.5391 14.7601C9.44489 14.7601 6.11391 11.427 6.11279 7.33157C6.11391 6.29342 6.95899 5.44922 7.9946 5.44922C8.10107 5.44922 8.20642 5.45819 8.30729 5.47613C8.5292 5.51312 8.73992 5.58824 8.93381 5.70147C8.96183 5.71829 8.98088 5.74519 8.98537 5.77658L9.41799 8.50426C9.42359 8.53677 9.41351 8.56816 9.39221 8.59171C9.15348 8.85629 8.84863 9.04688 8.50903 9.14217L8.3454 9.18814L8.40704 9.34622C8.96519 10.7678 10.1017 11.9035 11.5239 12.464L11.682 12.5268L11.7279 12.3631C11.8232 12.0234 12.0137 11.7185 12.2782 11.4797C12.2973 11.4618 12.3231 11.4528 12.3488 11.4528C12.3544 11.4528 12.3601 11.4528 12.3668 11.4539L15.0936 11.8867C15.1262 11.8923 15.1531 11.9102 15.1699 11.9382C15.2819 12.1322 15.357 12.3441 15.3951 12.5661C15.4131 12.6647 15.4209 12.769 15.4209 12.8777C15.4209 13.9148 14.577 14.759 13.5391 14.7601Z" />
                    </svg>
                    <span>Continue on WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingCheckoutPage;
