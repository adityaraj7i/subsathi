import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, Package, LogOut, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const AuthModal = () => {
  const { user, login, register, logout } = useAuth();
  const { isAuthOpen, setIsAuthOpen, orderHistory } = useCart();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    const success = login(email, password);
    if (success) {
      setError('');
      setSuccessMessage('Welcome back to SubSathi!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !phone) {
      setError('Please fill in all required fields.');
      return;
    }
    register(name, email, password, phone);
    setError('');
    setSuccessMessage('Account created successfully! Welcome to SubSathi.');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs font-poppins animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-auto text-gray-900">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-gray-50 to-blue-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#293d67] text-white flex items-center justify-center shadow-xs">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-gray-900 leading-tight">
                {user ? `Welcome, ${user.name.split(' ')[0]}!` : activeTab === 'login' ? 'Customer Sign In' : 'Join SubSathi'}
              </h2>
              <p className="text-[11px] text-gray-500">
                {user ? 'Manage your subscriptions & orders' : 'Access instant subscriptions & orders'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {successMessage && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {user ? (
            /* Logged-in Dashboard */
            <div className="space-y-4">
              
              {/* Member Status Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#293d67] to-[#1e3a8a] text-white space-y-2 shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">
                      Verified Member 🇳🇵
                    </span>
                    <h3 className="font-bold text-lg text-white mt-1">{user.name}</h3>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                </div>

                <div className="pt-2 border-t border-white/10 text-xs text-blue-100 space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 opacity-75" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 opacity-75" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>

              {/* Order Tracking */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-[#293d67]" />
                    <span>My Subscriptions ({orderHistory.length})</span>
                  </span>
                  <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded">
                    Instant Delivery
                  </span>
                </h4>

                <div className="max-h-52 overflow-y-auto space-y-2">
                  {orderHistory.length > 0 ? (
                    orderHistory.map((order) => (
                      <div key={order.id} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-xs space-y-1.5 transition-colors">
                        <div className="flex justify-between font-bold">
                          <span className="text-[#293d67] font-mono">{order.orderId}</span>
                          <span className="text-green-700 bg-green-100 px-2 py-0.2 rounded text-[10px]">
                            {order.status}
                          </span>
                        </div>
                        
                        <div className="text-gray-700 font-medium">
                          {order.items?.map(i => `${i.product.name} (${i.plan.name})`).join(', ')}
                        </div>

                        <div className="flex justify-between pt-1 text-gray-500 text-[11px] border-t border-gray-200">
                          <span>Method: <strong className="uppercase text-gray-800">{order.paymentMethod}</strong></span>
                          <span className="font-bold text-[#293d67] font-inter">Rs. {order.totalAmount}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      No purchases yet. Browse catalog to activate your first service!
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setIsAuthOpen(false)}
                  className="flex-1 py-2.5 bg-[#293d67] hover:bg-[#1e4cb1] text-white font-semibold text-xs rounded-xl transition-colors shadow-xs cursor-pointer text-center"
                >
                  Continue Shopping
                </button>

                <button
                  onClick={logout}
                  className="py-2.5 px-4 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Sign In / Sign Up Screen */
            <div>
              {/* Tab Selector */}
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  onClick={() => { setActiveTab('login'); setError(''); }}
                  className={`flex-1 py-2 text-xs font-bold transition-colors cursor-pointer text-center ${
                    activeTab === 'login'
                      ? 'text-[#293d67] border-b-2 border-[#293d67]'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setActiveTab('register'); setError(''); }}
                  className={`flex-1 py-2 text-xs font-bold transition-colors cursor-pointer text-center ${
                    activeTab === 'register'
                      ? 'text-[#293d67] border-b-2 border-[#293d67]'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {error && (
                <div className="mb-3 p-2.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium">
                  {error}
                </div>
              )}

              {activeTab === 'login' ? (
                <form onSubmit={handleSubmitLogin} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@gmail.com"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 bg-[#293d67] hover:bg-[#1e4cb1] text-white font-semibold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Sign In to SubSathi
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmitRegister} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Aayush Shrestha"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@gmail.com"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">WhatsApp Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98XXXXXXXX"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Create Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 bg-[#293d67] hover:bg-[#1e4cb1] text-white font-semibold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Create Free Account
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
