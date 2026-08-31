import React from 'react';

export const FeaturedCategories = ({ onSelectCategory }) => {
  return (
    <div className="px-4 py-8 lg:pb-[110px] pb-[55px] bg-white max-w-7xl mx-auto font-poppins border-b border-gray-100">
      
      {/* Category header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-5 h-10 bg-[#293d67] rounded"></div>
        <h2 className="text-md text-[#293d67] font-semibold font-inter">Category</h2>
      </div>

      <h2 className="text-3xl font-semibold font-inter mb-8 text-gray-900">
        Featured Categories
      </h2>

      {/* Grid matching OTT Sathi with exact vector paths */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* 1. Cloud Service */}
        <div
          onClick={() => onSelectCategory('cloud-services')}
          className="bg-gray-100 cursor-pointer rounded-lg p-6 shadow-xs hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 mb-4 text-black" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M58.2588 33.3343C58.2834 33.334 58.3084 33.334 58.3334 33.334C66.6178 33.334 73.3334 40.0497 73.3334 48.334C73.3334 56.6183 66.6178 63.334 58.3334 63.334H23.3334C14.1287 63.334 6.66675 55.872 6.66675 46.6673C6.66675 38.0017 13.28 30.8809 21.7348 30.0763M58.2588 33.3343C58.3081 32.7852 58.3334 32.2292 58.3334 31.6673C58.3334 21.5421 50.1254 13.334 40.0001 13.334C30.4109 13.334 22.5412 20.6961 21.7348 30.0763M58.2588 33.3343C57.9178 37.1157 56.4287 40.566 54.1427 43.334M21.7348 30.0763C22.2609 30.0263 22.7942 30.0007 23.3334 30.0007C27.0861 30.0007 30.5492 31.241 33.3351 33.334" />
            </svg>
            <h3 className="text-center font-medium text-black">Cloud Service</h3>
          </div>
        </div>

        {/* 2. AI Tools */}
        <div
          onClick={() => onSelectCategory('ai-tools')}
          className="bg-gray-100 cursor-pointer rounded-lg p-6 shadow-xs hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 mb-4 text-black" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13.3333 40.0007C13.3333 27.4299 13.3333 21.1445 17.2385 17.2392C21.1438 13.334 27.4291 13.334 39.9999 13.334C52.5706 13.334 58.8562 13.334 62.7612 17.2392C66.6666 21.1445 66.6666 27.4299 66.6666 40.0007C66.6666 52.5713 66.6666 58.857 62.7612 62.762C58.8562 66.6673 52.5706 66.6673 39.9999 66.6673C27.4291 66.6673 21.1438 66.6673 17.2385 62.762C13.3333 58.857 13.3333 52.5713 13.3333 40.0007Z" />
              <path d="M25 50L31.1396 31.5811C31.4544 30.6369 32.338 30 33.3333 30C34.3287 30 35.2123 30.6369 35.527 31.5811L41.6667 50M28.3333 43.3333H38.3333" />
              <path d="M51.6667 30V50" />
            </svg>
            <h3 className="text-center font-medium text-black">AI Tools</h3>
          </div>
        </div>

        {/* 3. Graphic Tools */}
        <div
          onClick={() => onSelectCategory('graphic-tools')}
          className="bg-gray-100 cursor-pointer rounded-lg p-6 shadow-xs hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 mb-4 text-black" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M47.2024 31.2083L38.1704 25.3281C37.8411 25.1137 37.4604 25 37.0721 25C35.9274 25 34.9998 25.9665 34.9998 27.1587V39.508C34.9998 40.7003 35.9274 41.6667 37.0721 41.6667C37.4604 41.6667 37.8411 41.553 38.1704 41.3387L47.2024 35.4583C47.9058 35.0003 48.3331 34.1973 48.3331 33.3333C48.3331 32.4693 47.9058 31.6663 47.2024 31.2083Z" />
              <path d="M68.333 54.9993V28.3327C68.333 20.4759 68.333 16.5476 65.892 14.1068C63.4513 11.666 59.523 11.666 51.6663 11.666H28.3329C20.4762 11.666 16.5478 11.666 14.107 14.1068C11.6663 16.5476 11.6663 20.4759 11.6663 28.3327V54.9993" />
              <path d="M73.2803 68.3333H6.71882C5.44235 68.3333 4.61215 67.0293 5.18302 65.9213L11.6662 55H68.3329L74.8159 65.9213C75.3869 67.0293 74.5566 68.3333 73.2803 68.3333Z" />
            </svg>
            <h3 className="text-center font-medium text-black">Graphic tools</h3>
          </div>
        </div>

        {/* 4. Software Subscription */}
        <div
          onClick={() => onSelectCategory('software-subscription')}
          className="bg-gray-100 cursor-pointer rounded-lg p-6 shadow-xs hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 mb-4 text-black" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8.33325 40.0007C8.33325 25.0729 8.33325 17.609 12.9707 12.9715C17.6082 8.33398 25.0721 8.33398 39.9999 8.33398C54.9276 8.33398 62.3916 8.33398 67.0293 12.9715C71.6666 17.609 71.6666 25.0729 71.6666 40.0007C71.6666 54.9283 71.6666 62.3923 67.0293 67.03C62.3916 71.6673 54.9276 71.6673 39.9999 71.6673C25.0721 71.6673 17.6082 71.6673 12.9707 67.03C8.33325 62.3923 8.33325 54.9283 8.33325 40.0007Z" />
              <path d="M8.33325 30H71.6666" />
              <path d="M26.6667 43.334L30.7552 46.858C32.474 48.3393 33.3334 49.0803 33.3334 50.0007C33.3334 50.921 32.474 51.662 30.7552 53.1433L26.6667 56.6673" />
              <path d="M40 56.666H53.3333" />
            </svg>
            <h3 className="text-center font-medium text-black">Software Subscription</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
