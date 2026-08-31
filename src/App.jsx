import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { CategoryNav } from './components/CategoryNav';
import { HeroSection } from './components/HeroSection';
import { FlashDeals } from './components/FlashDeals';
import { ComboDeals } from './components/ComboDeals';
import { FeaturedCategories } from './components/FeaturedCategories';
import { BestSellers } from './components/BestSellers';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ProductDetailPage } from './components/ProductDetailPage';
import { BillingCheckoutPage } from './components/BillingCheckoutPage';
import { PolicyPages } from './components/PolicyPages';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AuthModal } from './components/AuthModal';
import { PolicyModal } from './components/PolicyModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { NotFoundPage } from './components/NotFoundPage';
import { MobileBottomNav } from './components/MobileBottomNav';
import { useCart } from './context/CartContext';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const {
    productsList,
    selectedProduct,
    closeProductPage,
    openProductPage,
    isBillingPageOpen,
    closeBillingPage,
    isAdminPortalOpen,
    activePolicyPage,
    openPolicyPage,
    closePolicyPage,
    isNotFoundPage,
    goToHome
  } = useCart();

  // If Admin Portal mode is active, render full Admin & CRM Suite
  if (isAdminPortalOpen) {
    return <AdminLayout />;
  }

  const handleSelectCategory = (catId) => {
    if (selectedProduct) {
      closeProductPage();
    }
    if (isBillingPageOpen) {
      closeBillingPage();
    }
    if (activePolicyPage) {
      closePolicyPage();
    }
    setSelectedCategory(catId);
    if (catId !== 'all') {
      setTimeout(() => {
        const el = document.getElementById('best-sellers') || document.getElementById('flash-deals');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleShopNow = () => {
    if (selectedProduct) {
      closeProductPage();
    }
    if (isBillingPageOpen) {
      closeBillingPage();
    }
    setSelectedCategory('all');
    const el = document.getElementById('best-sellers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleComboDeals = () => {
    if (selectedProduct) {
      closeProductPage();
    }
    if (isBillingPageOpen) {
      closeBillingPage();
    }
    setSelectedCategory('combo-deals');
    const el = document.getElementById('combo-deals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-poppins selection:bg-[#293d67] selection:text-white">
      
      {/* Top Blue Guarantee Bar */}
      <TopBar />

      {/* Main Header Navbar */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Category Navigation Pills */}
      {!selectedProduct && !isBillingPageOpen && !activePolicyPage && !isNotFoundPage && (
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* CASE 0: 404 Not Found Page for invalid URLs */}
        {isNotFoundPage ? (
          <NotFoundPage onGoHome={goToHome} />
        ) : activePolicyPage ? (
          /* CASE 1: Dedicated Policy & Quick Links Standalone Page */
          <PolicyPages
            page={activePolicyPage}
            onBack={closePolicyPage}
            onNavigatePage={openPolicyPage}
          />
        ) : isBillingPageOpen ? (
          /* CASE 2: Dedicated WhatsApp Billing & Checkout Page */
          <BillingCheckoutPage onBack={closeBillingPage} />
        ) : selectedProduct ? (
          /* CASE 3: Dedicated Full Product Detail Page */
          <ProductDetailPage
            product={selectedProduct}
            onBack={closeProductPage}
            onSelectProduct={openProductPage}
          />
        ) : (
          /* CASE 4: Main Store Homepage */
          <>
            {/* If no search and category is 'all', show the full homepage */}
            {!searchQuery && selectedCategory === 'all' && (
              <>
                {/* Hero Section with 3D Flip Badges */}
                <HeroSection
                  onShopNow={handleShopNow}
                  onComboDeals={handleComboDeals}
                />

                {/* Flash Sales with Red Countdown Clock */}
                <FlashDeals products={productsList} />

                {/* Combo Deals Section */}
                <ComboDeals products={productsList} />

                {/* Featured Categories Grid with Vectors */}
                <FeaturedCategories onSelectCategory={handleSelectCategory} />
              </>
            )}

            {/* If user clicked specifically on Combo Deals */}
            {!searchQuery && selectedCategory === 'combo-deals' && (
              <div className="pt-4">
                <ComboDeals products={productsList} />
              </div>
            )}

            {/* Best Seller / Products Catalog Section */}
            <BestSellers
              products={productsList}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              searchQuery={searchQuery}
            />

            {/* 3 Value Pillars */}
            {!searchQuery && (
              <WhyChooseUs />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating 24/7 WhatsApp Button */}
      <WhatsAppButton />

      {/* Interactive Drawers and Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <AuthModal />
      <PolicyModal />

      {/* Mobile App-Style Bottom Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
}

export default App;
