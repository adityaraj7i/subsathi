import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const BestSellers = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef(null);

  const ITEMS_PER_PAGE = 8;

  let filtered = products.filter(p => {
    const matchesCategory =
      selectedCategory === 'all' ||
      p.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory ||
      (selectedCategory === 'combo-deals' && p.isCombo);

    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const isFullListingMode = isExpanded || selectedCategory !== 'all' || searchQuery.trim().length > 0;

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = isFullListingMode
    ? filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : filtered.slice(0, 8);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div id="best-sellers" className="px-4 py-8 lg:pb-24 pb-14 bg-white max-w-7xl mx-auto font-poppins border-b border-gray-100">
      
      {/* Breadcrumb if in Expanded Mode (Exact Screenshot 2) */}
      {isFullListingMode && (
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-6">
          <button
            onClick={() => {
              setIsExpanded(false);
              onSelectCategory('all');
            }}
            className="hover:text-[#293d67] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-gray-900 font-semibold capitalize">
            {selectedCategory === 'all' ? 'Best Seller' : selectedCategory.replace(/-/g, ' ')}
          </span>
        </div>
      )}

      {/* Category header tag (Exact Screenshot 1) */}
      {!isFullListingMode && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-8 bg-[#293d67] rounded-sm"></div>
            <span className="text-sm font-semibold text-[#293d67] font-inter">
              This Month
            </span>
          </div>
        </div>
      )}

      {/* Section Title Bar & Carousel Arrows */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="lg:text-3xl text-2xl font-bold font-inter text-gray-900 capitalize tracking-tight">
          {selectedCategory === 'all' ? 'Best Seller' : selectedCategory.replace(/-/g, ' ')}
        </h1>

        {/* Carousel Navigation Arrows on Home View (Screenshot 1) */}
        {!isFullListingMode && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-[#1b2a4a] text-white hover:bg-[#293d67] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full bg-[#1b2a4a] text-white hover:bg-[#293d67] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* CASE 1: Compact Clean Row Carousel on Home (Exact Screenshot 1) */}
      {!isFullListingMode ? (
        <div>
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory"
          >
            {filtered.slice(0, 10).map((product) => (
              <div key={product.id} className="shrink-0 w-44 sm:w-60 md:w-64 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Centered "See All >" Pill Button */}
          <div className="text-center pt-8">
            <button
              onClick={() => {
                setIsExpanded(true);
                window.scrollTo({ top: document.getElementById('best-sellers')?.offsetTop - 80 || 0, behavior: 'smooth' });
              }}
              className="px-8 py-2.5 rounded-full border border-[#1b2a4a] text-[#1b2a4a] hover:bg-[#1b2a4a] hover:text-white font-semibold text-sm transition-all inline-flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>See All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* CASE 2: Clean 4-Column Paginated Grid (Exact Screenshot 2) */
        <div>
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto">
              <SlidersHorizontal className="w-10 h-10 mx-auto text-gray-400 mb-3" />
              <h3 className="font-bold text-base text-gray-800 mb-1">No products found</h3>
              <p className="text-xs text-gray-500 mb-6">
                We couldn't find any products matching "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setIsExpanded(false);
                  onSelectCategory('all');
                }}
                className="px-6 py-2.5 bg-[#293d67] text-white text-xs font-semibold rounded-xl hover:bg-[#1e4cb1] transition-colors cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Pagination Controls at Bottom (Exact Screenshot 2) */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-12">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1));
                  window.scrollTo({ top: document.getElementById('best-sellers')?.offsetTop - 80 || 0, behavior: 'smooth' });
                }}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: document.getElementById('best-sellers')?.offsetTop - 80 || 0, behavior: 'smooth' });
                  }}
                  className={`w-9 h-9 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-[#1b2a4a] text-white shadow-xs'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(prev => Math.min(totalPages, prev + 1));
                  window.scrollTo({ top: document.getElementById('best-sellers')?.offsetTop - 80 || 0, behavior: 'smooth' });
                }}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#1b2a4a] hover:bg-[#293d67] text-white'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BestSellers;
