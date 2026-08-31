import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  MessageCircle,
  QrCode,
  Building,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { storeInfo } from '../data/policies';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    totalAmount,
    addOrder
  } = useCart();

  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerNotes, setCustomerNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('esewa');
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isCheckoutOpen) return null;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      alert('Please fill in your Name, Email, and WhatsApp Phone number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = addOrder({
        customerName,
        customerEmail,
        customerPhone,
        customerNotes,
        paymentMethod,
        transactionId: transactionId || 'TRX-' + Math.floor(100000 + Math.random() * 900000)
      });

      setIsSubmitting(false);
      setCompletedOrder(order);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 800);
  };

  const handleWhatsAppSendReceipt = () => {
    if (!completedOrder) return;
    const itemsText = completedOrder.items
      .map(i => `• ${i.product.name} (${i.plan.name}) x${i.quantity} = Rs. ${i.price * i.quantity}`)
      .join('\n');

    const msg = `*NEW ORDER ON SUBSATHI* 🇳🇵
---------------------------------
*Order ID:* ${completedOrder.orderId}
*Customer:* ${completedOrder.customerName}
*Email:* ${completedOrder.customerEmail}
*WhatsApp:* ${completedOrder.customerPhone}
*Payment Method:* ${completedOrder.paymentMethod.toUpperCase()}
*Transaction Ref:* ${completedOrder.transactionId}

*Ordered Services:*
${itemsText}

*Total Paid:* Rs. ${completedOrder.totalAmount}
---------------------------------
Please verify and activate my subscription!`;

    window.open(`https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto font-poppins animate-in fade-in duration-200">
      
      {/* Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-auto max-h-[92vh] flex flex-col text-gray-900">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div>
            <h2 className="font-bold text-lg sm:text-xl text-[#293d67] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span>{completedOrder ? 'Order Placed Successfully!' : 'Express Checkout & Payment'}</span>
            </h2>
            <p className="text-xs text-gray-500">
              {completedOrder
                ? 'Your order is recorded. Delivery is sent directly to your WhatsApp & email.'
                : 'Pay securely using eSewa, Khalti, Fonepay QR or Direct Bank Transfer in Nepal.'}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-8">
          {completedOrder ? (
            /* Receipt Screen */
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  Order Verified & Submitted
                </span>
                <h3 className="font-bold text-2xl text-gray-900 mt-2">
                  Thank You, {completedOrder.customerName}!
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-1">
                  Order <strong className="text-[#293d67]">{completedOrder.orderId}</strong> has been received. Our team will send your subscription credentials to your WhatsApp within 5 to 15 minutes.
                </p>
              </div>

              {/* Receipt card */}
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 text-left text-xs sm:text-sm space-y-3 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-mono font-bold text-[#293d67]">{completedOrder.orderId}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium text-gray-900">{completedOrder.customerEmail}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">WhatsApp Phone:</span>
                  <span className="font-medium text-gray-900">{completedOrder.customerPhone}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Payment:</span>
                  <span className="font-bold uppercase text-[#293d67]">{completedOrder.paymentMethod}</span>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-gray-600 font-bold block">Purchased Items:</span>
                  {completedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-gray-700 pl-2 border-l-2 border-[#293d67]">
                      <span>{item.product.name} ({item.plan.name}) x{item.quantity}</span>
                      <span className="font-bold font-inter">Rs. {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Amount:</span>
                  <span className="font-bold text-[#293d67] font-inter">Rs. {completedOrder.totalAmount}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleWhatsAppSendReceipt}
                  className="w-full sm:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to WhatsApp ({storeInfo.phone})</span>
                </button>

                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleConfirmOrder} className="space-y-6">
              
              {/* Step 1: Customer Details */}
              <div>
                <h3 className="text-xs font-bold text-[#293d67] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#293d67] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                  <span>Customer & Delivery Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ramesh Thapa"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-[#293d67] focus:ring-1 focus:ring-[#293d67] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Delivery Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="name@example.com (for logins & receipts)"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-[#293d67] focus:ring-1 focus:ring-[#293d67] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      WhatsApp Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-[#293d67] focus:ring-1 focus:ring-[#293d67] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Order Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="Special instructions (e.g. profile name)"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-[#293d67] outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div>
                <h3 className="text-xs font-bold text-[#293d67] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#293d67] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>Choose Payment Method</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {[
                    { id: 'esewa', name: 'eSewa', border: 'border-emerald-500 text-emerald-700 bg-emerald-50' },
                    { id: 'khalti', name: 'Khalti', border: 'border-purple-600 text-purple-700 bg-purple-50' },
                    { id: 'fonepay', name: 'Fonepay QR', border: 'border-red-500 text-red-700 bg-red-50' },
                    { id: 'bank', name: 'Bank Transfer', border: 'border-[#293d67] text-[#293d67] bg-blue-50' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer font-bold text-xs sm:text-sm ${
                        paymentMethod === m.id
                          ? `${m.border} shadow-sm font-extrabold`
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>

                {/* Method Details */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                  
                  {/* eSewa */}
                  {paymentMethod === 'esewa' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-sm text-gray-900">eSewa ID: {storeInfo.paymentDetails.esewa.id}</div>
                          <div className="text-xs text-gray-500">{storeInfo.paymentDetails.esewa.name}</div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopy(storeInfo.paymentDetails.esewa.id, 'esewa')}
                          className="px-3 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg text-xs font-semibold text-emerald-600 flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          {copiedKey === 'esewa' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'esewa' ? 'Copied' : storeInfo.paymentDetails.esewa.id}</span>
                        </button>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-gray-200 text-center flex flex-col items-center">
                        <div className="w-36 h-36 bg-gray-50 rounded-xl p-2 flex items-center justify-center mb-2 border border-gray-100">
                          <QrCode className="w-32 h-32 text-emerald-700" />
                        </div>
                        <span className="text-xs text-gray-600">
                          Scan and pay exactly <strong className="text-emerald-700 font-bold font-inter">Rs. {totalAmount}</strong>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Khalti */}
                  {paymentMethod === 'khalti' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-sm text-gray-900">Khalti ID: {storeInfo.paymentDetails.khalti.id}</div>
                          <div className="text-xs text-gray-500">{storeInfo.paymentDetails.khalti.name}</div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopy(storeInfo.paymentDetails.khalti.id, 'khalti')}
                          className="px-3 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg text-xs font-semibold text-purple-700 flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          {copiedKey === 'khalti' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'khalti' ? 'Copied' : storeInfo.paymentDetails.khalti.id}</span>
                        </button>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-gray-200 text-center flex flex-col items-center">
                        <div className="w-36 h-36 bg-gray-50 rounded-xl p-2 flex items-center justify-center mb-2 border border-gray-100">
                          <QrCode className="w-32 h-32 text-purple-700" />
                        </div>
                        <span className="text-xs text-gray-600">
                          Scan and pay exactly <strong className="text-purple-700 font-bold font-inter">Rs. {totalAmount}</strong>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Fonepay */}
                  {paymentMethod === 'fonepay' && (
                    <div className="space-y-3 text-center flex flex-col items-center">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-red-600" />
                        <span className="font-bold text-sm text-gray-900">Fonepay / All Mobile Banking QR</span>
                      </div>
                      <div className="w-40 h-40 bg-white rounded-xl p-3 border border-gray-200 shadow-xs flex items-center justify-center">
                        <QrCode className="w-32 h-32 text-red-600" />
                      </div>
                      <p className="text-xs text-gray-500 max-w-sm">
                        Open your mobile banking app (Nabil, NIC Asia, Global IME, etc.) and scan to pay.
                      </p>
                    </div>
                  )}

                  {/* Bank Transfer */}
                  {paymentMethod === 'bank' && (
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-[#293d67] font-bold mb-1">
                        <Building className="w-4 h-4" />
                        <span>Direct Bank Deposit / ConnectIPS</span>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Bank:</span>
                          <span className="font-bold text-gray-900">{storeInfo.paymentDetails.bank.bankName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Account Name:</span>
                          <span className="font-semibold text-gray-800">{storeInfo.paymentDetails.bank.accountName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Account No:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(storeInfo.paymentDetails.bank.accountNumber, 'bank')}
                            className="font-mono font-bold text-[#293d67] bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1 hover:bg-gray-200 cursor-pointer"
                          >
                            {copiedKey === 'bank' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{storeInfo.paymentDetails.bank.accountNumber}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Transaction Ref Input */}
                  <div className="pt-2 border-t border-gray-200">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Payment Transaction ID / Remarks (Optional):
                    </label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="e.g. 8A9B2C or payment phone number"
                      className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-gray-300 focus:border-[#293d67] outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Total & Submit Button */}
              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-gray-500">Total Amount to Pay</div>
                  <div className="font-bold text-2xl text-[#293d67] font-inter">
                    Rs. {totalAmount}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-[#293d67] hover:bg-[#1e4cb1] disabled:bg-gray-400 text-white font-semibold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Placing Order...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300 fill-current" />
                      <span>Confirm & Place Order</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
