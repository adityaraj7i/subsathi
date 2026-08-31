import React, { useState } from 'react';
import { Tag, Plus, Trash2, CheckCircle2, XCircle, Sparkles, Percent } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const AdminCoupons = () => {
  const { couponsList, addCoupon, toggleCouponStatus, deleteCoupon } = useCart();

  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(10);
  const [description, setDescription] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!code) {
      alert('Please enter a coupon code.');
      return;
    }

    addCoupon({
      code,
      discount,
      description: description || `${discount}% Storewide Promo`
    });

    setCode('');
    setDiscount(10);
    setDescription('');
  };

  return (
    <div className="space-y-6 font-poppins animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-500" />
            <span>Discounts & Promo Coupons Engine ({couponsList.length})</span>
          </h2>
          <p className="text-xs text-gray-500">
            Create promotional discount codes that customers can apply in their cart drawer.
          </p>
        </div>
      </div>

      {/* Grid: Create Coupon & List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Create Coupon Card (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Create New Promo Voucher</span>
          </h3>

          <form onSubmit={handleAdd} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Coupon Code *
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. DASHAIN20 or SUMMER15"
                className="w-full px-3.5 py-2 text-xs uppercase font-mono font-bold border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Discount Percentage (%) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="90"
                  required
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="10"
                  className="w-full px-3.5 py-2 text-xs font-inter font-bold border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden pr-8"
                />
                <Percent className="w-3.5 h-3.5 absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Short Description / Offer Note
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. 20% Holiday Season Special Discount"
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Activate New Coupon</span>
            </button>
          </form>
        </div>

        {/* Coupons List (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-gray-900">
            Active Store Promo Codes
          </h3>

          <div className="space-y-2.5">
            {couponsList.map((c) => (
              <div
                key={c.id}
                className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-extrabold flex items-center justify-center text-xs font-inter">
                    {c.discount}%
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-sm text-gray-900">
                        {c.code}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                        c.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {c.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500">{c.description}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleCouponStatus(c.id)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                      c.isActive
                        ? 'bg-amber-50 hover:bg-amber-100 text-amber-700'
                        : 'bg-green-50 hover:bg-green-100 text-green-700'
                    }`}
                  >
                    {c.isActive ? 'Disable' : 'Enable'}
                  </button>

                  <button
                    onClick={() => deleteCoupon(c.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded cursor-pointer"
                    title="Delete coupon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCoupons;
