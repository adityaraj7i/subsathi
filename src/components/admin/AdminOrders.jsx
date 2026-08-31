import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  MessageCircle,
  Trash2,
  Send,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const AdminOrders = () => {
  const { orders, updateOrderStatus, deleteOrder, productsList = [], storeConfig } = useCart();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderForDelivery, setSelectedOrderForDelivery] = useState(null);
  const [deliveryCredentials, setDeliveryCredentials] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchesSearch =
      o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendCredentialsViaWhatsApp = (order) => {
    const itemsList = order.items?.map(i => `${i.product?.name || 'Subscription'} (${i.plan?.name || 'Standard'})`).join(', ');
    const msg = `*SUBSATHI ORDER FULFILLED* 🇳🇵
-------------------------------------
Dear ${order.customerName},
Your subscription order *${order.orderId}* is now active!

*Ordered Service:* ${itemsList}
*Access Details:*
${deliveryCredentials || 'Email/Login: customer@account.com\nPassword/PIN: SubSathi@2026'}

*Support & Warranty:*
If you need profile activation or renewal assistance, reply directly to this chat (${storeConfig?.phone || '+977 9744723372'}).

Thank you for choosing SubSathi! 🚀`;

    updateOrderStatus(order.orderId, 'Completed');
    window.open(`https://wa.me/977${order.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
    setSelectedOrderForDelivery(null);
    setDeliveryCredentials('');
  };

  return (
    <div className="space-y-6 font-poppins animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Order Fulfillment & Sales ({orders.length})
          </h2>
          <p className="text-xs text-gray-500">
            Verify eSewa/Khalti transactions and deliver credentials directly via WhatsApp.
          </p>
        </div>

        <div className="flex gap-2">
          {['all', 'Processing', 'Completed', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                filterStatus === status
                  ? 'bg-[#293d67] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All Orders' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Order ID, Customer Name, WhatsApp Phone, or Email..."
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-xs focus:border-[#293d67] outline-hidden shadow-xs"
        />
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            return (
              <div
                key={order.id || order.orderId}
                className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs hover:border-blue-200 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#293d67] flex items-center justify-center font-bold font-mono">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-sm text-[#293d67]">
                          {order.orderId}
                        </span>
                        <button
                          onClick={() => handleCopy(order.orderId, order.orderId)}
                          className="text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                        >
                          {copiedId === order.orderId ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                      <span className="text-[11px] text-gray-400">
                        {order.date ? new Date(order.date).toLocaleString() : 'Just now'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border cursor-pointer outline-hidden ${
                        order.status === 'Completed'
                          ? 'bg-green-50 border-green-300 text-green-700'
                          : order.status === 'Processing'
                          ? 'bg-amber-50 border-amber-300 text-amber-700'
                          : 'bg-red-50 border-red-300 text-red-700'
                      }`}
                    >
                      <option value="Processing">⏳ Processing</option>
                      <option value="Completed">✓ Completed / Delivered</option>
                      <option value="Cancelled">✕ Cancelled</option>
                    </select>

                    <button
                      onClick={() => deleteOrder(order.orderId)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg cursor-pointer transition-colors"
                      title="Delete order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                  
                  {/* Customer Info (4 cols) */}
                  <div className="md:col-span-4 space-y-1 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider block">
                      Customer Info
                    </span>
                    <div className="font-bold text-gray-900">{order.customerName}</div>
                    <div className="text-gray-600 font-mono">{order.customerPhone}</div>
                    <div className="text-gray-500 truncate">{order.customerEmail}</div>
                    {order.customerNotes && (
                      <div className="text-[11px] text-blue-700 bg-blue-50 p-1.5 rounded mt-1">
                        Note: {order.customerNotes}
                      </div>
                    )}
                  </div>

                  {/* Purchased Items (5 cols) */}
                  <div className="md:col-span-5 space-y-1 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider block">
                      Ordered Subscriptions
                    </span>
                    <div className="space-y-1.5">
                      {order.items?.map((item, idx) => {
                        const currentProduct = productsList.find(p => p.id === item.productId || p.id === item.product?.id || p.slug === item.product?.slug);
                        const currentStock = currentProduct && typeof currentProduct.stock === 'number' ? currentProduct.stock : (item.product?.stock || 0);

                        return (
                          <div key={idx} className="flex justify-between items-center text-gray-800">
                            <div>
                              <span className="font-semibold">
                                {item.product?.name || 'Subscription'} ({item.plan?.name || 'Standard'}) x{item.quantity}
                              </span>
                              <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                                currentStock <= 0
                                  ? 'bg-red-100 text-red-700'
                                  : currentStock <= 10
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-emerald-100 text-emerald-700'
                              }`}>
                                Stock: {currentStock} left
                              </span>
                            </div>
                            <span className="font-bold font-inter text-gray-900">
                              Rs. {item.price * item.quantity}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Payment Details & Total (3 cols) */}
                  <div className="md:col-span-3 space-y-1 bg-gray-50/70 p-3 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-gray-500 text-[10px] uppercase tracking-wider block">
                        Payment Method
                      </span>
                      <div className="font-extrabold text-sm uppercase text-[#293d67]">
                        {order.paymentMethod}
                      </div>
                      <div className="text-[11px] text-gray-600 font-mono">
                        Ref: {order.transactionId || 'N/A'}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
                      <span className="text-gray-500 font-bold">Total:</span>
                      <span className="font-extrabold text-base text-[#293d67] font-inter">
                        Rs. {order.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom WhatsApp Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100">
                  <div className="text-[11px] text-gray-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                    <span>Customer WhatsApp is ready for direct delivery</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedOrderForDelivery(order)}
                      className="px-3.5 py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send Account Credentials on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 bg-white rounded-2xl border border-dashed border-gray-300 text-center text-gray-500 space-y-2">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
            <h4 className="font-bold text-base text-gray-700">No orders found</h4>
            <p className="text-xs text-gray-400">Incoming checkout purchases will show up here in real-time.</p>
          </div>
        )}
      </div>

      {/* WhatsApp Credentials Delivery Modal */}
      {selectedOrderForDelivery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs font-poppins">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div>
                <h3 className="font-bold text-base text-gray-900">
                  Deliver Credentials: {selectedOrderForDelivery.orderId}
                </h3>
                <p className="text-xs text-gray-500">
                  Customer: <strong>{selectedOrderForDelivery.customerName}</strong> ({selectedOrderForDelivery.customerPhone})
                </p>
              </div>
              <button
                onClick={() => setSelectedOrderForDelivery(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Type Account Login / PIN / Family Invite Link:
              </label>
              <textarea
                rows={4}
                value={deliveryCredentials}
                onChange={(e) => setDeliveryCredentials(e.target.value)}
                placeholder="Email: customer.netflix@gmail.com&#10;Password: SecurePass123&#10;Profile: Screen 2 (PIN: 4421)"
                className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:border-green-600 outline-hidden font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedOrderForDelivery(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSendCredentialsViaWhatsApp(selectedOrderForDelivery)}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open WhatsApp & Send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
