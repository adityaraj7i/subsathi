import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const ComboDeals = ({ products }) => {
  const comboProducts = products.filter(p => p.isCombo || p.category === 'Combo Deals');
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div id="combo-deals" className="px-4 py-8 lg:pb-[110px] pb-[55px] max-w-7xl mx-auto font-poppins border-b border-gray-100">
      
      {/* Header Tag */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-5 h-10 bg-[#293d67] rounded"></div>
          <h2 className="text-md font-semibold text-[#293d67] font-inter">
            See more with Combo.
          </h2>
        </div>
      </div>

      {/* Main Title & Nav Buttons */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="lg:text-3xl text-2xl font-semibold font-inter text-gray-900">
          Combo Deals
        </h1>

        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="bg-[#293d67] cursor-pointer rounded-full text-white p-2 hover:bg-opacity-90 transition-colors"
            aria-label="Previous combo deals"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="bg-[#293d67] cursor-pointer text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
            aria-label="Next combo deals"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Cards Row */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory pt-2"
      >
        {comboProducts.map((product) => (
          <div key={product.id} className="shrink-0 w-64 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComboDeals;
