import { useCart } from '../context/CartContext';
import { getBrandIconBySlug } from '../assets/brandIcons';

export const HeroSection = ({ onShopNow, onComboDeals }) => {
  const { openProductPage, heroBadges = [], productsList = [] } = useCart();

  const handleCardClick = (slug) => {
    if (!slug) return;
    const product = productsList.find((p) => p.slug === slug || p.id === slug);
    if (product) openProductPage(product);
  };

  return (
    <section
      role="banner"
      aria-label="Hero section"
      className="relative w-full max-w-[2000px] mx-auto min-h-[500px] sm:min-h-[560px] lg:h-[620px] overflow-hidden font-poppins bg-gradient-to-b from-blue-50/30 via-white to-white flex items-center justify-center"
    >
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#293d67_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Floating 3D Flip Card Badges */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {heroBadges.map((badge) => {
          const FrontIcon = getBrandIconBySlug(badge.front.slug);
          const BackIcon = getBrandIconBySlug(badge.back.slug);

          return (
            <div
              key={badge.id}
              style={{ animationDelay: badge.delay }}
              className={`absolute ${badge.position} w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-26 xl:h-26 perspective-1000 cursor-pointer pointer-events-auto z-10 animate-float hidden sm:block`}
            >
              <div className="relative w-full h-full preserve-3d animate-card-flip shadow-lg rounded-2xl">
                
                {/* Front side */}
                <div
                  onClick={() => handleCardClick(badge.front.slug)}
                  className="absolute inset-0 w-full h-full bg-white rounded-2xl border-2 sm:border-3 lg:border-4 border-[#293d67] p-2 sm:p-2.5 lg:p-3 flex flex-col items-center justify-center backface-hidden shadow-md hover:border-blue-600 transition-colors cursor-pointer"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {badge.front.imageUrl ? (
                      <img
                        src={badge.front.imageUrl}
                        alt={badge.front.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <FrontIcon className="w-full h-full object-contain" />
                    )}
                  </div>
                </div>

                {/* Back side (rotated 180deg) */}
                <div
                  onClick={() => handleCardClick(badge.back.slug)}
                  className="absolute inset-0 w-full h-full bg-white rounded-2xl border-2 sm:border-3 lg:border-4 border-[#293d67] p-2 sm:p-2.5 lg:p-3 flex flex-col items-center justify-center rotate-y-180 backface-hidden shadow-md hover:border-blue-600 transition-colors cursor-pointer"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {badge.back.imageUrl ? (
                      <img
                        src={badge.back.imageUrl}
                        alt={badge.back.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <BackIcon className="w-full h-full object-contain" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Central Message Container */}
      <div className="relative z-20 flex items-center justify-center h-full px-4 sm:px-6 py-12">
        <div className="relative w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl p-4 sm:p-8 flex flex-col items-center justify-center text-center">
          
          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-poppins text-gray-900 leading-[1.15] mb-4 tracking-tight">
            Nepal's Ultimate Hub for Premium Digital Subscriptions
          </h1>

          {/* Subhead */}
          <p className="text-xs sm:text-base lg:text-lg font-poppins text-gray-600 max-w-2xl leading-relaxed text-center mb-6 sm:mb-8 font-normal">
            Get genuine access to Netflix, ChatGPT Plus, Canva Pro, OTT platforms & 50+ world-class digital tools with instant WhatsApp delivery and seamless eSewa & Khalti payments.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onShopNow}
              className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-[#293d67] bg-[#293d67] text-white font-poppins font-semibold rounded-full hover:bg-[#1e4cb1] hover:border-[#1e4cb1] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 28 32">
                <path d="M15.6497 0C17.04 0 18.3492 0.633454 19.2971 1.71875C20.1592 2.70581 20.6632 3.99761 20.7454 5.34961C21.3456 5.37005 21.8839 5.40597 22.3655 5.46973C23.5092 5.62118 24.4384 5.94016 25.1877 6.6543L25.3235 6.79004C25.9813 7.48323 26.3152 8.35449 26.5149 9.42383C26.724 10.5437 26.8025 11.9813 26.9026 13.8008L27.3567 22.0264L27.4329 23.458C27.5001 24.8126 27.5312 25.9386 27.4563 26.8701C27.3548 28.1329 27.0515 29.1583 26.2844 29.9766C25.5161 30.7961 24.5147 31.1606 23.2668 31.333C22.0414 31.5023 20.4628 31.5 18.4622 31.5H14.5129C14.495 31.5 14.4768 31.4983 14.4592 31.4971C13.9963 31.4999 13.506 31.5 12.9875 31.5H9.03833C7.0377 31.5 5.45911 31.5023 4.23364 31.333C2.9858 31.1606 1.98438 30.7961 1.21606 29.9766C0.448945 29.1583 0.144526 28.133 0.0432129 26.8701C-0.0564079 25.6282 0.0330848 24.0406 0.144775 22.0264L0.596924 13.8008L0.670166 12.5068C0.744442 11.2824 0.827645 10.2637 0.984619 9.42383C1.19777 8.28344 1.56438 7.36846 2.31274 6.6543C3.06206 5.94014 3.99132 5.62119 5.13501 5.46973C5.26032 5.45314 5.38964 5.43884 5.52271 5.42578C5.63529 4.25159 5.99051 2.89842 7.02075 1.71875C7.9685 0.633665 9.27715 0.000187574 10.6672 0C11.5553 0 12.4097 0.260055 13.1584 0.729492C13.9073 0.259884 14.7615 6.68876e-05 15.6497 0Z"/>
              </svg>
              <span>Shop Now</span>
            </button>

            <button
              onClick={onComboDeals}
              className="flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 border-2 border-orange-500 bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white font-poppins font-semibold rounded-full transition-all duration-300 shadow-xs cursor-pointer text-sm sm:text-base"
            >
              <span>Combo Deals (50% OFF)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
