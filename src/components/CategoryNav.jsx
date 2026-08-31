import React from 'react';

export const CategoryNav = ({ selectedCategory, onSelectCategory }) => {
  const items = [
    { id: 'all', name: 'All Products' },
    { id: 'cloud-services', name: 'Cloud Services' },
    { id: 'ai-tools', name: 'Ai Tools' },
    { id: 'streaming', name: 'Streaming' },
    { id: 'vpn', name: 'VPN' },
    { id: 'combo-deals', name: 'Combo Deals' },
    { id: 'graphic-tools', name: 'Graphic Tools' },
    { id: 'academic-tools', name: 'Academic Tools' },
    { id: 'software-subscription', name: 'Software Subscription' }
  ];

  return (
    <nav className="bg-white border-b border-gray-100 hidden lg:block font-poppins" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex justify-center items-center gap-1 xl:gap-2 py-2.5">
          {items.map((item) => {
            const isSelected = selectedCategory === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onSelectCategory(item.id)}
                  className={`inline-flex cursor-pointer items-center gap-1 text-xs xl:text-sm font-medium transition-colors rounded-full px-3.5 py-1.5 ${
                    isSelected
                      ? 'bg-[#293d67] text-white shadow-xs font-semibold'
                      : 'text-gray-700 hover:bg-[#293d67] hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
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
