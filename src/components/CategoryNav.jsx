import React from 'react';
import { ChevronDown } from 'lucide-react';

export const CategoryNav = ({ selectedCategory, onSelectCategory }) => {
  const items = [
    { id: 'all', name: 'All Products', hasDropdown: false },
    { id: 'cloud-services', name: 'Cloud Services', hasDropdown: true },
    { id: 'ai-tools', name: 'Ai Tools', hasDropdown: true },
    { id: 'streaming', name: 'Streaming', hasDropdown: true },
    { id: 'vpn', name: 'VPN', hasDropdown: true },
    { id: 'combo-deals', name: 'Combo Deals', hasDropdown: false },
    { id: 'graphic-tools', name: 'Graphic Tools', hasDropdown: true },
    { id: 'academic-tools', name: 'Academic Tools', hasDropdown: true },
    { id: 'software-subscription', name: 'Software Subscription', hasDropdown: true }
  ];

  return (
    <nav className="bg-white border-b border-gray-100 font-poppins" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center gap-1.5 xl:gap-2 py-2 overflow-x-auto scrollbar-none sm:justify-center">
          {items.map((item) => {
            const isSelected = selectedCategory === item.id;
            const isCombo = item.id === 'combo-deals';

            if (isCombo) {
              return (
                <li key={item.id} className="shrink-0 flex items-center justify-center">
                  <button
                    onClick={() => onSelectCategory(item.id)}
                    className={`relative inline-flex cursor-pointer items-center gap-1 text-xs sm:text-sm font-medium rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 whitespace-nowrap transition-all duration-300 transform hover:shadow-lg overflow-hidden group ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-md'
                        : 'border border-orange-200 bg-orange-50/50 hover:bg-gradient-to-r hover:from-orange-500 hover:via-red-500 hover:to-pink-500 hover:text-white'
                    }`}
                  >
                    <span className={`transition-colors duration-300 ${
                      isSelected
                        ? 'text-white'
                        : 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent group-hover:text-white font-semibold'
                    }`}>
                      🔥 Combo Deals
                    </span>
                  </button>
                </li>
              );
            }

            return (
              <li key={item.id} className="shrink-0">
                <button
                  onClick={() => onSelectCategory(item.id)}
                  className={`inline-flex cursor-pointer items-center gap-1 text-xs sm:text-sm font-medium transition-colors rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#293d67] text-white shadow-xs font-semibold'
                      : 'bg-gray-100/70 sm:bg-transparent text-gray-700 hover:bg-[#293d67] hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 hidden sm:inline-block opacity-70 group-hover:opacity-100" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryNav;
