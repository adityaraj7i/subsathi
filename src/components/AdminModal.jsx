import React from 'react';
import { X, ShieldAlert, Package, Check, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const AdminModal = () => {
  const { isAdminOpen, setIsAdminOpen, orderHistory } = useCart();

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs font-poppins animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-auto max-h-[85vh] flex flex-col text-gray-900">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#293d67] text-white flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-gray-900">
                SUB SATHI Store Owner Dashboard
              </h2>
              <span className="text-[11px] text-gray-500">Live Customer Orders & Transactions</span>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
              <div className="text-xs text-blue-700 font-semibold">Total Orders</div>
              <div className="text-xl font-bold text-[#293d67] font-inter">{orderHistory.length}</div>
            </div>
            <div className="p-3 bg-green-50 border border-green-100 rounded-xl">
              <div className="text-xs text-green-700 font-semibold">Revenue (NPR)</div>
              <div className="text-xl font-bold text-green-700 font-inter">
                Rs. {orderHistory.reduce((sum, o) => sum + (o.totalAmount || 0), 0)}
              </div>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
              <div className="text-xs text-amber-700 font-semibold">Fulfillment</div>
              <div className="text-xl font-bold text-amber-700 font-inter">100%</div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm text-gray-800 mb-3 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-[#293d67]" />
              <span>Customer Orders Stream</span>
            </h3>

            <div className="space-y-3">
              {orderHistory.length > 0 ? (
                orderHistory.map((order) => (
                  <div key={order.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono font-bold text-[#293d67] text-sm block">{order.orderId}</span>
                        <span className="text-gray-900 font-bold">{order.customerName}</span> ({order.customerPhone})
                      </div>
                      <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        {order.status}
                      </span>
                    </div>

                    <div className="text-gray-600 bg-white p-2.5 rounded-lg border border-gray-100 space-y-1">
                      {order.items.map((i, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{i.product.name} ({i.plan.name}) x{i.quantity}</span>
                          <span className="font-bold font-inter">Rs. {i.price * i.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-1 text-gray-500 text-[11px]">
                      <span>Method: <strong className="uppercase text-gray-700">{order.paymentMethod}</strong> (Ref: {order.transactionId})</span>
                      <span className="font-bold text-[#293d67] text-sm font-inter">Total: Rs. {order.totalAmount}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-gray-400">
                  No orders placed yet in this session.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
