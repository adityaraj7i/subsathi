import React, { useState } from 'react';
import {
  Users,
  Search,
  MessageCircle,
  Phone,
  Mail,
  ShoppingBag,
  Sparkles,
  Send,
  Download,
  Tag,
  Star,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const AdminCRM = () => {
  const { orders, storeConfig } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('renewal');

  // Group orders by customer phone/email to form the CRM customer database
  const customerMap = {};

  orders.forEach((o) => {
    const key = o.customerPhone || o.customerEmail || 'anon';
    if (!customerMap[key]) {
      customerMap[key] = {
        name: o.customerName || 'Valued Customer',
        phone: o.customerPhone || '9800000000',
        email: o.customerEmail || 'customer@gmail.com',
        totalSpent: 0,
        ordersCount: 0,
        orders: [],
        lastOrderDate: o.date
      };
    }

    customerMap[key].totalSpent += o.totalAmount || 0;
    customerMap[key].ordersCount += 1;
    customerMap[key].orders.push(o);
  });

  const customersList = Object.values(customerMap);

  const filteredCustomers = customersList.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Message templates
  const messageTemplates = {
    renewal: (cust) => `Hello ${cust.name}! 🌟\nYour subscription from SubSathi is expiring soon. Renew today to avoid any service interruption. Reply to this message or visit subsathi.com to get an exclusive 10% renewal discount!`,
    vip: (cust) => `Special VIP Greeting for ${cust.name}! 🎉\nAs one of our most valued SubSathi members, here is your exclusive promo code *VIP15* for 15% off any Netflix, ChatGPT, Prime, or AI tool subscription.`,
    feedback: (cust) => `Hi ${cust.name}, hope you are enjoying your digital subscription from SubSathi! 🚀\nHow was your experience? If you have any questions or need extra screens/devices, we are always here to help!`,
    custom: () => customMessage
  };

  const handleSendWhatsAppTemplate = (cust, templateKey) => {
    let msg = '';
    if (templateKey === 'custom') {
      msg = customMessage;
    } else {
      msg = messageTemplates[templateKey](cust);
    }

    window.open(
      `https://wa.me/977${cust.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
    setSelectedCustomer(null);
  };

  const handleExportCSV = () => {
    const headers = ['Name,Phone,Email,TotalSpent,OrdersCount\n'];
    const rows = customersList.map(c => `"${c.name}","${c.phone}","${c.email}",${c.totalSpent},${c.ordersCount}`);
    const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subsathi_customers_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 font-poppins animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span>Customer CRM & WhatsApp Outreach ({customersList.length})</span>
          </h2>
          <p className="text-xs text-gray-500">
            Build customer loyalty, send renewal reminders, and broadcast promo offers via WhatsApp.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search customers by Name, WhatsApp Phone number, or Email..."
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-xs focus:border-purple-600 outline-hidden shadow-xs"
        />
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((cust, idx) => {
            const isVip = cust.totalSpent >= 2500 || cust.ordersCount >= 2;
            return (
              <div
                key={idx}
                className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                        {cust.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                          <span>{cust.name}</span>
                          {isVip && (
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-current" /> VIP
                            </span>
                          )}
                        </h4>
                        <span className="text-[11px] text-gray-500 font-mono block">
                          {cust.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 text-xs space-y-1.5 text-gray-600">
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{cust.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{cust.ordersCount} Subscriptions Ordered</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-1 font-bold text-gray-900 border-t border-dashed border-gray-200">
                      <span>Total Spent:</span>
                      <span className="text-purple-700 font-extrabold text-sm font-inter">
                        Rs. {cust.totalSpent}
                      </span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Action */}
                <div className="pt-2 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedCustomer(cust);
                      setSelectedTemplate('renewal');
                    }}
                    className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Outreach</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full p-12 bg-white rounded-2xl border border-dashed border-gray-300 text-center text-gray-500 space-y-2">
            <Users className="w-12 h-12 text-gray-300 mx-auto" />
            <h4 className="font-bold text-base text-gray-700">No customers found</h4>
            <p className="text-xs text-gray-400">Customer leads will appear automatically when orders are placed.</p>
          </div>
        )}
      </div>

      {/* WhatsApp Message Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs font-poppins">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div>
                <h3 className="font-bold text-base text-gray-900">
                  WhatsApp Outreach: {selectedCustomer.name}
                </h3>
                <p className="text-xs text-gray-500">
                  Phone: <strong>{selectedCustomer.phone}</strong>
                </p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Template Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Choose Message Template:
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'renewal', label: '🔄 Renewal Reminder' },
                  { id: 'vip', label: '🎁 VIP 15% Promo' },
                  { id: 'feedback', label: '⭐ Experience Review' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      selectedTemplate === t.id
                        ? 'bg-purple-50 border-purple-600 text-purple-700'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Preview */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Message Preview:
              </label>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-800 font-mono whitespace-pre-line leading-relaxed">
                {messageTemplates[selectedTemplate](selectedCustomer)}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSendWhatsAppTemplate(selectedCustomer, selectedTemplate)}
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

export default AdminCRM;
