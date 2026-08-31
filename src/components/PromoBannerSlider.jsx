import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const PromoBannerSlider = () => {
  const { storeConfig } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: 'Upgrade to ChatGPT Plus & Gemini Pro',
      subtitle: 'Unlimited Smart AI Access in Nepal with instant WhatsApp activation.',
      tag: 'AI Tools Promotion',
      gradient: 'from-[#1e293b] via-[#293d67] to-[#1e1b4b]',
      badge: 'Best Value Deal',
      badgeColor: 'bg-emerald-500',
      actionText: 'Get AI Tools Now',
      whatsappMsg: 'Hello SubSathi, I want to inquire about ChatGPT Plus & Gemini Pro.'
    },
    {
      id: 2,
      title: 'Watch Netflix 4K, Prime & Hotstar in Nepal',
      subtitle: 'Premium Ultra HD Streaming profiles with 100% replacement warranty.',
      tag: 'OTT Streaming Specials',
      gradient: 'from-[#831843] via-[#881337] to-[#293d67]',
      badge: 'Most Popular',
      badgeColor: 'bg-red-500',
      actionText: 'Explore Streaming Deals',
      whatsappMsg: 'Hello SubSathi, I want to inquire about Netflix & OTT Streaming Subscriptions.'
    },
    {
      id: 3,
      title: 'Adobe Creative Cloud & Canva Pro',
      subtitle: 'Empower your creativity with genuine software licenses without foreign bank cards.',
      tag: 'Designers & Creators Hub',
      gradient: 'from-[#312e81] via-[#1e3a8a] to-[#0f172a]',
      badge: 'Instant Activation',
      badgeColor: 'bg-blue-500',
      actionText: 'Claim Designer Discount',
      whatsappMsg: 'Hello SubSathi, I want to inquire about Adobe Creative Cloud & Canva Pro.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const waNumber = storeConfig?.whatsappNumber || '9779744723372';

  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:pb-[110px] pb-[55px] py-4 font-poppins">
      <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100">
        
        {/* Aspect ratio banner box */}
        <div className="relative aspect-video sm:aspect-21/9 lg:aspect-16/7 min-h-[220px] sm:min-h-[280px]">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-gradient-to-r ${banner.gradient} flex items-center justify-between p-6 sm:p-10 lg:p-14 text-white ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Decorative Glow Orb */}
              <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Text content */}
              <div className="relative z-10 max-w-xl space-y-2 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <span className={`${banner.badgeColor} text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs`}>
                    {banner.badge}
                  </span>
                  <span className="text-gray-300 text-xs sm:text-sm font-medium">
                    {banner.tag}
                  </span>
                </div>

                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold font-poppins leading-tight">
                  {banner.title}
                </h2>

                <p className="text-xs sm:text-sm lg:text-base text-gray-200 line-clamp-2 sm:line-clamp-none font-normal">
                  {banner.subtitle}
                </p>

                <div className="pt-2">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/${waNumber}?text=${encodeURIComponent(banner.whatsappMsg)}`}
                    className="inline-flex items-center gap-2 bg-white text-[#293d67] hover:bg-[#293d67] hover:text-white border-2 border-white px-5 sm:px-7 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <span>{banner.actionText}</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Decorative Graphic */}
              <div className="hidden md:flex items-center justify-center pr-4 z-10">
                <div className="w-28 h-28 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center p-4 text-center shadow-inner animate-pulse">
                  <span className="text-2xl lg:text-3xl font-black text-amber-300">100%</span>
                  <span className="text-[11px] lg:text-xs font-semibold text-white uppercase tracking-wider">
                    Genuine Access
                  </span>
                  <span className="text-[9px] text-gray-300 mt-1">Instant via WhatsApp</span>
                </div>
              </div>
            </div>
          ))}

          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/30 hover:bg-white/80 text-white hover:text-gray-900 backdrop-blur-md flex items-center justify-center transition-all duration-200 z-20 cursor-pointer shadow-md"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/30 hover:bg-white/80 text-white hover:text-gray-900 backdrop-blur-md flex items-center justify-center transition-all duration-200 z-20 cursor-pointer shadow-md"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 py-3 bg-white border-t border-gray-100">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-[#293d67]' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBannerSlider;
