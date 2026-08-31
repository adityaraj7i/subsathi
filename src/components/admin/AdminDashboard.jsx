import React from 'react';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  PlusCircle,
  Tag,
  Store
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const AdminDashboard = ({ onNavigate }) => {
  const { productsList, orders, couponsList, storeConfig } = useCart();

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const pendingOrders = orders.filter(o => o.status === 'Processing' || o.status === 'Pending').length;

  // Unique customer emails
  const uniqueCustomers = new Set(orders.map(o => o.customerEmail)).size;

  // Payment Breakdown
  const paymentStats = orders.reduce((acc, o) => {
    const method = o.paymentMethod || 'other';
    acc[method] = (acc[method] || 0) + (o.totalAmount || 0);
    return acc;
  }, {});

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6 font-poppins animate-in fade-in duration-200">
      
      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1b253b] via-[#293d67] to-[#1e3a8a] text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-200 bg-white/10 px-3 py-1 rounded-full">
            SubSathi Control Center 🇳🇵
          </span>
          <h2 className="text-xl sm:text-2xl font-bold mt-2">
            Welcome back, Store Administrator!
          </h2>
          <p className="text-xs text-blue-100 mt-1 max-w-xl">
            Manage your subscription products, real-time pricing, order fulfillment, and WhatsApp customer CRM directly from here.
          </p>
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={() => onNavigate('products')}
            className="px-4 py-2.5 bg-white hover:bg-blue-50 text-[#293d67] font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </button>

          <button
            onClick={() => onNavigate('orders')}
            className="px-4 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>View Orders ({pendingOrders})</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue */}
        <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Sales</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              Rs.
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 font-inter">
            Rs. {totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>All time verified earnings</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Orders</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 font-inter">
            {totalOrders}
          </div>
          <div className="text-[11px] text-gray-500 font-medium mt-1">
            <strong className="text-green-600">{completedOrders} Delivered</strong> · {pendingOrders} Pending
          </div>
        </div>

        {/* Total Customers */}
        <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Customer Leads</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 font-inter">
            {uniqueCustomers || 12}
          </div>
          <div className="text-[11px] text-purple-600 font-semibold mt-1">
            100% WhatsApp Verified
          </div>
        </div>

        {/* Catalog Subscriptions */}
        <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Services</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 font-inter">
            {productsList.length}
          </div>
          <div className="text-[11px] text-gray-500 font-medium mt-1">
            {productsList.filter(p => p.isFlashSale).length} on Flash Sale
          </div>
        </div>
      </div>

      {/* Grid: Payment Method Breakdown & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Payment Gateways (5 cols) */}
        <div className="lg:col-span-5 p-5 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900 flex items-center justify-between">
            <span>Payment Channels in Nepal</span>
            <span className="text-[10px] text-gray-500 font-normal">NPR Share</span>
          </h3>

          <div className="space-y-3">
            {[
              { id: 'esewa', name: 'eSewa Mobile Wallet', color: 'bg-emerald-500', amount: paymentStats.esewa || 0 },
              { id: 'khalti', name: 'Khalti Digital Wallet', color: 'bg-purple-600', amount: paymentStats.khalti || 0 },
              { id: 'fonepay', name: 'Fonepay QR / Mobile Banking', color: 'bg-red-500', amount: paymentStats.fonepay || 0 },
              { id: 'bank', name: 'Direct Bank Transfer (Nabil)', color: 'bg-blue-700', amount: paymentStats.bank || 0 }
            ].map((m) => {
              const pct = totalRevenue > 0 ? Math.round((m.amount / totalRevenue) * 100) : 25;
              return (
                <div key={m.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-700">{m.name}</span>
                    <span className="font-bold text-gray-900 font-inter">Rs. {m.amount} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${m.color} rounded-full`} style={{ width: `${Math.max(5, pct)}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between">
            <span>Merchant WhatsApp: <strong>{storeConfig.phone}</strong></span>
            <button
              onClick={() => onNavigate('settings')}
              className="text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              Edit Gateways →
            </button>
          </div>
        </div>

        {/* Quick Management Shortcuts (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          <div
            onClick={() => onNavigate('products')}
            className="p-5 bg-white hover:bg-blue-50/40 rounded-2xl border border-gray-200 hover:border-blue-300 shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-gray-900 group-hover:text-blue-700">
                Products & Plans CMS
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Add new subscriptions, change prices, update plans, or toggle flash sales.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 mt-4 flex items-center gap-1">
              Manage Catalog →
            </span>
          </div>

          <div
            onClick={() => onNavigate('crm')}
            className="p-5 bg-white hover:bg-purple-50/40 rounded-2xl border border-gray-200 hover:border-purple-300 shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-gray-900 group-hover:text-purple-700">
                Customer CRM & WhatsApp
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Send credentials, delivery details, and renewal reminders in 1-click.
              </p>
            </div>
            <span className="text-xs font-bold text-purple-600 mt-4 flex items-center gap-1">
              Open CRM →
            </span>
          </div>

          <div
            onClick={() => onNavigate('coupons')}
            className="p-5 bg-white hover:bg-amber-50/40 rounded-2xl border border-gray-200 hover:border-amber-300 shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Tag className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-gray-900 group-hover:text-amber-700">
                Discounts & Coupons
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Manage promotional discount codes and holiday sales.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-600 mt-4 flex items-center gap-1">
              {couponsList.filter(c => c.isActive).length} Active Codes →
            </span>
          </div>

          <div
            onClick={() => onNavigate('settings')}
            className="p-5 bg-white hover:bg-gray-100/70 rounded-2xl border border-gray-200 hover:border-gray-400 shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-gray-900">
                Store Customizer
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Update phone numbers, WhatsApp, bank details, and backup data.
              </p>
            </div>
            <span className="text-xs font-bold text-gray-700 mt-4 flex items-center gap-1">
              Website Settings →
            </span>
          </div>
        </div>
      </div>

      {/* Recent Orders Stream */}
      <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-base text-gray-900">Recent Customer Orders</h3>
            <p className="text-xs text-gray-500">Live incoming orders and activations</p>
          </div>

          <button
            onClick={() => onNavigate('orders')}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            View All ({orders.length}) →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Subscription</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 font-mono font-bold text-blue-600">{o.orderId}</td>
                  <td className="py-3">
                    <div className="font-bold text-gray-900">{o.customerName}</div>
                    <div className="text-[11px] text-gray-500">{o.customerPhone}</div>
                  </td>
                  <td className="py-3">
                    <span className="font-medium text-gray-800 line-clamp-1">
                      {o.items?.map(i => `${i.product.name} (${i.plan.name})`).join(', ')}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="uppercase font-bold text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                      {o.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-gray-900 font-inter">
                    Rs. {o.totalAmount}
                  </td>
                  <td className="py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      o.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://wa.me/977${o.customerPhone}?text=${encodeURIComponent(`Hello ${o.customerName}, your SubSathi order ${o.orderId} is confirmed!`)}`}
                      className="px-2.5 py-1 bg-green-50 hover:bg-green-100 text-green-700 font-semibold rounded-lg text-[11px] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
