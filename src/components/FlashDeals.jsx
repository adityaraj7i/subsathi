import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const FlashDeals = ({ products }) => {
  const flashProducts = products.filter(p => p.isFlashSale);
  const scrollRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 14,
    minutes: 38,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 1, hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div id="flash-deals" className="px-4 py-8 lg:pb-[110px] pb-[55px] bg-white max-w-7xl mx-auto font-poppins border-b border-gray-100">
      
      {/* Category header matching OTT Sathi */}
      <div className="flex justify-between items-center lg:mb-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-5 h-10 bg-[#293d67] rounded"></div>
          <h2 className="text-md font-semibold text-[#293d67] font-inter">Today's</h2>
        </div>
      </div>

      {/* Main Flash Sales Bar with Countdown & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center lg:gap-8 gap-2">
          <h1 className="lg:text-3xl text-2xl font-semibold font-inter text-gray-900">
            Flash Sales
          </h1>

          {/* Red Countdown Display matching OTT Sathi */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-600 font-inter">Days</span>
              <div className="bg-red-500 text-white py-1 px-3 text-2xl rounded font-mono w-12 flex items-center justify-center font-bold">
                {formatNumber(timeLeft.days)}
              </div>
            </div>

            <span className="text-xl font-bold pt-4 font-inter">:</span>

            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-600 font-inter">Hours</span>
              <div className="bg-red-500 text-white py-1 px-3 text-2xl rounded font-mono w-12 flex items-center justify-center font-bold">
                {formatNumber(timeLeft.hours)}
              </div>
            </div>

            <span className="text-xl font-bold pt-4 font-inter">:</span>

            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-600 font-inter">Minutes</span>
              <div className="bg-red-500 text-white py-1 px-3 text-2xl rounded font-mono w-12 flex items-center justify-center font-bold">
                {formatNumber(timeLeft.minutes)}
              </div>
            </div>

            <span className="text-xl font-bold pt-4 font-inter">:</span>

            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-600 font-inter">Seconds</span>
              <div className="bg-red-500 text-white py-1 px-3 text-2xl rounded font-mono w-12 flex items-center justify-center font-bold">
                {formatNumber(timeLeft.seconds)}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel buttons */}
        <div className="hidden lg:flex items-center pr-4 gap-2">
          <button
            onClick={() => scroll('left')}
            className="bg-[#293d67] cursor-pointer rounded-full text-white p-2 hover:bg-opacity-90 transition-colors"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="bg-[#293d67] cursor-pointer text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
            aria-label="Next products"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product list */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory"
      >
        {flashProducts.map((product) => (
          <div key={product.id} className="shrink-0 w-64 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashDeals;
