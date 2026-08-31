import React from 'react';
import { useCart } from '../context/CartContext';

export const TopBar = () => {
  const { openPolicyPage, storeConfig } = useCart();

  const phoneDisplay = storeConfig?.phone || '+977 9744723372';
  const waNumber = storeConfig?.whatsappNumber || '9779744723372';

  return (
    <div className="bg-[#293d67] hidden lg:block text-white py-2 font-poppins text-sm border-b border-blue-900/20" role="toolbar" aria-label="Top navigation bar">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        
        {/* Left: Quick links & WhatsApp */}
        <nav className="flex items-center gap-2" aria-label="Quick links">
          <button
            onClick={() => openPolicyPage('about-us')}
            className="hover:text-blue-200 transition-colors cursor-pointer text-xs font-medium"
          >
            About Us
          </button>
          <div className="border-r border-blue-400/40 h-3.5"></div>
          <button
            onClick={() => openPolicyPage('privacy-policy')}
            className="hover:text-blue-200 transition-colors cursor-pointer text-xs font-medium"
          >
            Privacy Policy
          </button>
          <div className="border-r border-blue-400/40 h-3.5"></div>
          
          <div className="flex items-center gap-1.5 pl-1">
            <div className="bg-[#25D366] flex items-center justify-center rounded-full w-5 h-5 shadow-xs shrink-0">
              <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.05 20.15ZM16.57 14.37C16.32 14.24 15.11 13.65 14.88 13.57C14.66 13.48 14.5 13.44 14.33 13.69C14.17 13.94 13.7 14.52 13.56 14.69C13.42 14.85 13.27 14.87 13.03 14.75C12.78 14.62 11.99 14.37 11.05 13.53C10.32 12.87 9.83 12.06 9.69 11.81C9.55 11.57 9.67 11.43 9.8 11.31C9.91 11.2 10.05 11.02 10.17 10.88C10.29 10.74 10.34 10.63 10.42 10.47C10.5 10.3 10.46 10.16 10.4 10.03C10.34 9.91 9.84 8.7 9.64 8.2C9.43 7.71 9.23 7.78 9.07 7.77C8.92 7.76 8.75 7.76 8.59 7.76C8.42 7.76 8.16 7.82 7.93 8.07C7.7 8.32 7.07 8.91 7.07 10.11C7.07 11.31 7.95 12.47 8.07 12.63C8.19 12.79 9.79 15.26 12.25 16.32C12.83 16.57 13.29 16.72 13.64 16.83C14.23 17.02 14.76 16.99 15.18 16.93C15.66 16.86 16.65 16.33 16.86 15.75C17.06 15.16 17.06 14.66 17 14.56C16.94 14.46 16.82 14.41 16.57 14.37Z"/>
              </svg>
            </div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Hello SubSathi, I have an inquiry about subscriptions.')}`}
              className="text-white hover:text-green-300 font-semibold text-xs transition-colors"
            >
              {phoneDisplay}
            </a>
          </div>
        </nav>

        {/* Right: Guarantees (Exact OTT Sathi Verified SVGs) */}
        <div className="flex items-center gap-3.5 text-xs font-semibold" role="list">
          <span className="flex items-center gap-1.5" role="listitem">
            <svg className="w-4 h-4 text-white shrink-0" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.4735 2.33306C11.206 1.70014 9.67069 1.33301 8.00016 1.33301C6.32964 1.33301 4.79435 1.70014 3.52684 2.33306C2.90998 2.64107 2.60155 2.79507 2.30078 3.27506C2.00001 3.75505 2.00001 4.23306 2.00001 5.17415V7.50004C2.00001 11.2789 5.0336 13.3916 6.78262 14.2882C7.26947 14.5377 7.5129 14.6625 8.00016 14.6625C8.48743 14.6625 8.73086 14.5377 9.21771 14.2882C10.9667 13.3916 14.0003 11.2789 14.0003 7.50004V5.17415C14.0003 4.23306 14.0003 3.75505 13.6995 3.27506C13.3988 2.79507 13.0903 2.64107 12.4735 2.33306Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 7.66732C6 7.66732 6.9386 7.83525 7.33333 9.00065C7.33333 9.00065 8.33333 7.00065 10 6.33398" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>100% SAFE AND SECURED</span>
          </span>

          <span className="bg-white/40 w-1.5 h-1.5 rounded-full"></span>

          <span className="flex items-center gap-1.5" role="listitem">
            <svg className="w-4 h-4 text-white shrink-0" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.6665 9.33398H4.26305C4.45915 9.33398 4.65256 9.37818 4.82795 9.46305L6.18927 10.1217C6.36466 10.2066 6.55807 10.2507 6.75417 10.2507H7.44924C8.1215 10.2507 8.6665 10.7781 8.6665 11.4287C8.6665 11.4549 8.6485 11.4781 8.62237 11.4853L6.92844 11.9537C6.62455 12.0377 6.29917 12.0084 6.0165 11.8716L4.56124 11.1675" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.6665 11L11.7284 10.0593C12.2712 9.89015 12.8579 10.0907 13.1979 10.5616C13.4438 10.902 13.3436 11.3895 12.9855 11.5962L7.9751 14.487C7.65644 14.6709 7.28044 14.7158 6.92997 14.6118L2.6665 13.3466" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 8.00065H8.66667C7.4096 8.00065 6.78107 8.00065 6.39053 7.61012C6 7.21958 6 6.59106 6 5.33398V4.00065C6 2.74357 6 2.11503 6.39053 1.72451C6.78107 1.33398 7.4096 1.33398 8.66667 1.33398H10C11.2571 1.33398 11.8856 1.33398 12.2761 1.72451C12.6667 2.11503 12.6667 2.74357 12.6667 4.00065V5.33398C12.6667 6.59106 12.6667 7.21958 12.2761 7.61012C11.8856 8.00065 11.2571 8.00065 10 8.00065Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.6665 3.33398H9.99984" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>INSTANT DELIVERY</span>
          </span>

          <span className="bg-white/40 w-1.5 h-1.5 rounded-full"></span>

          <span className="flex items-center gap-1.5" role="listitem">
            <svg className="w-4 h-4 text-white shrink-0" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.3335 7.203C11.3335 6.97253 11.3335 6.85733 11.3682 6.75467C11.469 6.45629 11.7347 6.34051 12.0009 6.21925C12.3002 6.08295 12.4498 6.01479 12.598 6.0028C12.7664 5.98919 12.935 6.02545 13.0788 6.10619C13.2696 6.21323 13.4026 6.41662 13.5388 6.58201C14.1677 7.34587 14.4821 7.72787 14.5972 8.14907C14.69 8.48893 14.69 8.8444 14.5972 9.18427C14.4294 9.7986 13.8992 10.3136 13.5067 10.7903C13.306 11.0341 13.2056 11.156 13.0788 11.2271C12.935 11.3079 12.7664 11.3441 12.598 11.3305C12.4498 11.3185 12.3002 11.2504 12.0009 11.1141C11.7347 10.9928 11.469 10.8771 11.3682 10.5787C11.3335 10.476 11.3335 10.3608 11.3335 10.1303V7.203Z" stroke="white" strokeWidth="1.25" />
              <path d="M4.66683 7.20307C4.66683 6.91294 4.65868 6.65214 4.4241 6.44814C4.33878 6.37394 4.22566 6.32241 3.99944 6.21937C3.70017 6.08306 3.55054 6.0149 3.40227 6.00291C2.95744 5.96694 2.71811 6.27054 2.46158 6.58212C1.83266 7.346 1.5182 7.72794 1.40314 8.14914C1.31028 8.48907 1.31028 8.84454 1.40314 9.1844C1.57096 9.79874 2.10118 10.3137 2.49364 10.7904C2.74102 11.0909 2.97734 11.365 3.40227 11.3307C3.55054 11.3187 3.70017 11.2505 3.99944 11.1142C4.22566 11.0111 4.33878 10.9596 4.4241 10.8854C4.65868 10.6814 4.66683 10.4207 4.66683 10.1305V7.20307Z" stroke="white" strokeWidth="1.25" />
              <path d="M3.3335 6C3.3335 3.79086 5.42284 2 8.00016 2C10.5775 2 12.6668 3.79086 12.6668 6" stroke="white" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="round" />
              <path d="M12.6665 11.334V11.8673C12.6665 13.0455 11.4726 14.0007 9.99984 14.0007H8.6665" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>CUSTOMER SUPPORT GUARANTEED</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
