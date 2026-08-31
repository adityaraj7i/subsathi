import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Settings,
  Store,
  LogOut,
  Lock,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminCRM } from './AdminCRM';
import { AdminCoupons } from './AdminCoupons';
import { AdminHeroBadges } from './AdminHeroBadges';
import { AdminSettings } from './AdminSettings';

export const AdminLayout = () => {
  const {
    adminTab,
    setAdminTab,
    closeAdminPortal,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    orders
  } = useCart();

  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!pinInput) {
      setAuthError('Please enter admin access password.');
      return;
    }
    const success = adminLogin(pinInput);
    if (!success) {
      setAuthError('Incorrect security key. Access denied.');
    } else {
      setAuthError('');
      setPinInput('');
    }
  };

  // If Admin is not authenticated yet, show Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#131b2e] to-black text-white font-poppins flex flex-col justify-center items-center p-4">
        
        {/* Back to store button */}
        <button
          onClick={closeAdminPortal}
          className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </button>

        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/15 shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-[#293d67] mx-auto flex items-center justify-center shadow-lg border border-blue-400/30">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              SubSathi Management Portal
            </h1>
            <p className="text-xs text-gray-300">
              Restricted Area · Authorized Personnel Only
            </p>
          </div>

          {authError && (
            <div className="p-3.5 bg-red-500/20 border border-red-500/50 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Security Password
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter password..."
                autoFocus
                className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-hidden focus:border-blue-400 transition-colors font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="pt-2 text-center border-t border-white/10 text-[11px] text-gray-400">
            Protected by SubSathi Security Framework
          </div>
        </div>
      </div>
    );
  }

  const pendingOrdersCount = orders.filter(o => o.status === 'Processing' || o.status === 'Pending').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products & Plans (CMS)', icon: Package },
    { id: 'orders', label: 'Orders & Sales', icon: ShoppingBag, badge: pendingOrdersCount },
    { id: 'crm', label: 'Customer CRM', icon: Users },
    { id: 'heroBadges', label: 'Floating 3D Badges', icon: Sparkles },
    { id: 'coupons', label: 'Promo Coupons', icon: Tag },
    { id: 'settings', label: 'Store Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-poppins flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1b253b] text-white flex flex-col justify-between shrink-0 border-r border-gray-800">
        
        {/* Top Brand Logo */}
        <div>
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white shadow-md text-sm">
                SS
              </div>
              <div>
                <h2 className="font-bold text-sm text-white tracking-tight leading-none">SubSathi</h2>
                <span className="text-[10px] text-blue-300 uppercase tracking-widest font-semibold">Admin Panel</span>
              </div>
            </div>

            <button
              onClick={closeAdminPortal}
              title="View Storefront"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <Store className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md font-bold'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className="bg-amber-500 text-black text-[10px] font-extrabold px-2 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={closeAdminPortal}
            className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Open Live Website</span>
          </button>

          <button
            onClick={adminLogout}
            className="w-full py-2 px-3 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock & Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <h1 className="font-extrabold text-lg sm:text-xl text-gray-900 capitalize">
              {navItems.find(n => n.id === adminTab)?.label || 'Dashboard'}
            </h1>
            <span className="text-[11px] font-bold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Live Store Connected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={closeAdminPortal}
              className="px-3.5 py-1.5 bg-[#293d67] hover:bg-[#1e4cb1] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </button>
          </div>
        </header>

        {/* Dynamic Admin Tab View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50/80">
          {adminTab === 'dashboard' && <AdminDashboard onNavigate={setAdminTab} />}
          {adminTab === 'products' && <AdminProducts />}
          {adminTab === 'orders' && <AdminOrders />}
          {adminTab === 'crm' && <AdminCRM />}
          {adminTab === 'heroBadges' && <AdminHeroBadges />}
          {adminTab === 'coupons' && <AdminCoupons />}
          {adminTab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
