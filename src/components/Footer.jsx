import React from 'react';
import { useCart } from '../context/CartContext';

export const Footer = () => {
  const { openPolicyPage, storeConfig } = useCart();

  return (
    <footer className="bg-gray-100 w-full font-poppins text-gray-900 border-t border-gray-200" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Main 12-col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 pb-8 border-b border-gray-300">
          
          {/* Brand Info (Col 7) */}
          <div className="space-y-3 md:col-span-7">
            <a href="/" className="inline-block mb-1">
              <img
                src="/logo.svg"
                alt={storeConfig.name || 'SubSathi'}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </a>

            <p className="text-sm leading-relaxed font-poppins max-w-[520px] text-gray-700">
              <span className="font-bold block mb-2 text-gray-900">
                Your trusted partner for global digital services in Nepal.
              </span>
              We make it easy for everyone to access international subscriptions, software licenses, AI tools, OTT platforms, and game top-ups using safe and convenient local digital payment methods. Enjoy fast delivery, secure transactions, and dedicated customer support every step of the way.
            </p>
          </div>

          {/* Quick Links (Col 2) */}
          <nav className="space-y-3 md:col-span-2 mt-4 md:mt-0 font-poppins text-left" aria-labelledby="quick-links-heading">
            <h3 id="quick-links-heading" className="text-base font-bold font-inter text-gray-800">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => openPolicyPage('about-us')}
                  className="text-gray-900 hover:text-[#293d67] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyPage('contact')}
                  className="text-gray-900 hover:text-[#293d67] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyPage('how-it-works')}
                  className="text-gray-900 hover:text-[#293d67] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyPage('refund-policy')}
                  className="text-gray-900 hover:text-[#293d67] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyPage('privacy-policy')}
                  className="text-gray-900 hover:text-[#293d67] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyPage('terms-conditions')}
                  className="text-gray-900 hover:text-[#293d67] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyPage('warranty-policy')}
                  className="text-gray-900 hover:text-[#293d67] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  Warranty Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicyPage('support-desk')}
                  className="text-gray-900 hover:text-[#293d67] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                >
                  Support Desk
                </button>
              </li>
            </ul>
          </nav>

          {/* Contact & Social (Col 3) */}
          <div className="space-y-4 md:col-span-3 mt-4 md:mt-0 font-poppins text-left">
            <div>
              <h3 className="text-base font-bold font-inter text-gray-900 mb-3">
                Contact Us
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-[#293d67] flex items-center justify-center rounded-full w-8 h-8 shrink-0">
                    <svg className="w-4 h-4 text-white fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                    </svg>
                  </div>
                  <a
                    href={`mailto:${storeConfig.email}`}
                    className="text-gray-900 hover:text-red-500 transition-colors font-medium text-xs sm:text-sm"
                  >
                    {storeConfig.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#25D366] flex items-center justify-center rounded-full w-8 h-8 shrink-0 shadow-xs">
                    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.05 20.15ZM16.57 14.37C16.32 14.24 15.11 13.65 14.88 13.57C14.66 13.48 14.5 13.44 14.33 13.69C14.17 13.94 13.7 14.52 13.56 14.69C13.42 14.85 13.27 14.87 13.03 14.75C12.78 14.62 11.99 14.37 11.05 13.53C10.32 12.87 9.83 12.06 9.69 11.81C9.55 11.57 9.67 11.43 9.8 11.31C9.91 11.2 10.05 11.02 10.17 10.88C10.29 10.74 10.34 10.63 10.42 10.47C10.5 10.3 10.46 10.16 10.4 10.03C10.34 9.91 9.84 8.7 9.64 8.2C9.43 7.71 9.23 7.78 9.07 7.77C8.92 7.76 8.75 7.76 8.59 7.76C8.42 7.76 8.16 7.82 7.93 8.07C7.7 8.32 7.07 8.91 7.07 10.11C7.07 11.31 7.95 12.47 8.07 12.63C8.19 12.79 9.79 15.26 12.25 16.32C12.83 16.57 13.29 16.72 13.64 16.83C14.23 17.02 14.76 16.99 15.18 16.93C15.66 16.86 16.65 16.33 16.86 15.75C17.06 15.16 17.06 14.66 17 14.56C16.94 14.46 16.82 14.41 16.57 14.37Z"/>
                    </svg>
                  </div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent('Hello SubSathi, I want to inquire about subscriptions.')}`}
                    className="text-gray-900 hover:text-green-600 font-semibold transition-colors text-xs sm:text-sm"
                  >
                    {storeConfig.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <h3 className="text-base font-bold font-poppins text-gray-800 mb-3">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-3" role="list">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={storeConfig.social?.facebook || 'https://facebook.com/subsathiofficial'}
                  className="w-9 h-9 bg-[#293d67] hover:bg-[#1877F2] rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-12 shadow-xs"
                  aria-label="Follow SubSathi on Facebook"
                >
                  <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 10 19">
                    <path d="M6.57339 4.17812V6.79228H9.80629L9.29437 10.3137H6.57339V18.4269C6.02785 18.5026 5.4697 18.5421 4.90314 18.5421C4.24917 18.5421 3.60696 18.49 2.98156 18.3891V10.3137H0V6.79228H2.98156V3.59374C2.98156 1.60937 4.5896 0 6.57423 0H9.80713V3.04551H7.70566C7.0811 3.04551 6.57423 3.55254 6.57423 4.17728L6.57339 4.17812Z"/>
                  </svg>
                </a>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={storeConfig.social?.instagram || 'https://instagram.com/subsathi'}
                  className="w-9 h-9 bg-[#293d67] hover:bg-[#E4405F] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
                  aria-label="Follow SubSathi on Instagram"
                >
                  <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 15 15">
                    <path d="M11.14 0H3.72C1.67 0 0 1.67 0 3.72V10.51C0 12.57 1.67 14.24 3.72 14.24H11.14C13.19 14.24 14.86 12.57 14.86 10.51V3.72C14.86 1.67 13.19 0 11.14 0ZM1.31 3.72C1.31 2.39 2.39 1.31 3.72 1.31H11.14C12.47 1.31 13.55 2.39 13.55 3.72V10.51C13.55 11.84 12.47 12.92 11.14 12.92H3.72C2.39 12.92 1.31 11.84 1.31 10.51V3.72Z"/>
                    <path d="M7.43 10.58C9.34 10.58 10.89 9.02 10.89 7.12C10.89 5.21 9.34 3.65 7.43 3.65C5.53 3.65 3.97 5.21 3.97 7.12C3.97 9.02 5.53 10.58 7.43 10.58ZM7.43 4.97C8.62 4.97 9.58 5.93 9.58 7.12C9.58 8.3 8.62 9.26 7.43 9.26C6.25 9.26 5.29 8.3 5.29 7.12C5.29 5.93 6.25 4.97 7.43 4.97Z"/>
                  </svg>
                </a>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={storeConfig.social?.tiktok || 'https://tiktok.com/@subsathi'}
                  className="w-9 h-9 bg-[#293d67] hover:bg-black rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-6 shadow-xs"
                  aria-label="Follow SubSathi on TikTok"
                >
                  <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 12 14">
                    <path d="M11.39 3.18V5.45C10.99 5.41 10.48 5.32 9.91 5.11C9.16 4.84 8.61 4.47 8.25 4.18V8.76L8.24 8.74C8.25 8.84 8.25 8.93 8.25 9.02C8.25 11.3 6.4 13.15 4.12 13.15C1.85 13.15 0 11.3 0 9.02C0 6.75 1.85 4.89 4.12 4.89C4.35 4.89 4.57 4.91 4.78 4.95V7.18C4.57 7.11 4.35 7.07 4.12 7.07C3.05 7.07 2.17 7.94 2.17 9.02C2.17 10.1 3.05 10.98 4.12 10.98C5.2 10.98 6.08 10.1 6.08 9.02C6.08 8.98 6.08 8.94 6.07 8.9V0H8.34C8.35 0.19 8.35 0.39 8.36 0.58C8.38 0.95 8.51 1.32 8.75 1.61C9.02 1.96 9.43 2.37 10 2.69C10.53 2.99 11.03 3.12 11.39 3.19V3.18Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & payment methods */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 pt-2 text-sm text-gray-700">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span>© 2026 <strong>{storeConfig.name || 'SubSathi'}</strong> | Digital Subscriptions Hub in Nepal 🇳🇵</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-900 text-sm font-poppins">Payment Methods:</span>
            <div className="flex gap-3" role="list" aria-label="Accepted payment methods">
              <div className="w-20 h-8 rounded flex items-center justify-center" role="listitem" title="eSewa">
                <img alt="eSewa payment method" className="w-full h-full object-contain mix-blend-multiply" src="/esewa.svg" />
              </div>
              <div className="w-20 h-8 rounded flex items-center justify-center" role="listitem" title="Khalti">
                <img alt="Khalti payment method" className="w-full h-full object-contain mix-blend-multiply" src="/khalti.svg" />
              </div>
              <div className="w-20 h-8 rounded flex items-center justify-center" role="listitem" title="Bank Transfer">
                <img alt="Bank Transfer payment method" className="w-full h-full object-contain mix-blend-multiply" src="/bank.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
