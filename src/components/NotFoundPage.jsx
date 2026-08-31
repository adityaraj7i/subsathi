import React from 'react';
import { Home, MessageCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NotFoundPage = ({ onGoHome }) => {
  const { storeConfig } = useCart();
  const waNumber = storeConfig?.whatsappNumber || '9779744723372';

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-gradient-to-b from-blue-50/40 via-white to-white px-4 py-16 font-poppins">
      <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Animated Badge */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-blue-50 border-4 border-[#293d67]/20 flex items-center justify-center shadow-lg">
            <span className="text-5xl sm:text-7xl font-black text-[#293d67] font-inter tracking-tighter">
              404
            </span>
          </div>
          <div className="absolute -top-1 -right-1 w-10 h-10 rounded-full bg-amber-400 text-gray-900 flex items-center justify-center shadow-md animate-bounce">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Page Not Found / पृष्ठ भेटिएन
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            The URL you entered does not exist on SubSathi. Please verify the web address or return to our official storefront.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              if (onGoHome) {
                onGoHome();
              } else {
                window.history.pushState({}, '', '/');
                window.location.href = '/';
              }
            }}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#293d67] hover:bg-[#1e4cb1] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Back to SubSathi Store</span>
          </button>

          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Hello SubSathi, I encountered a 404 error page on the website.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full border-2 border-emerald-500 bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>24/7 WhatsApp Support</span>
          </a>
        </div>

        {/* Trust Note */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>SubSathi Nepal · 100% Genuine Digital Subscriptions</span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
