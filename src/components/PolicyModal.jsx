import React, { useState } from 'react';
import { X, ShieldCheck, HelpCircle, RefreshCw, FileText, Info, MessageSquare, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { policies } from '../data/policies';

export const PolicyModal = () => {
  const { activePolicyModal, setActivePolicyModal, storeConfig } = useCart();
  const waNumber = storeConfig?.whatsappNumber || '9779744723372';
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  if (!activePolicyModal) return null;

  const getPolicyContent = () => {
    switch (activePolicyModal) {
      case 'aboutUs':
        return {
          title: policies.aboutUs.title,
          icon: Info,
          content: policies.aboutUs.content
        };
      case 'howItWorks':
        return {
          title: policies.howItWorks.title,
          icon: HelpCircle,
          content: policies.howItWorks.steps.map(s => `${s.step}. ${s.title}\n${s.description}`).join('\n\n')
        };
      case 'warrantyPolicy':
        return {
          title: policies.warrantyPolicy.title,
          icon: ShieldCheck,
          content: policies.warrantyPolicy.content
        };
      case 'refundPolicy':
        return {
          title: policies.refundPolicy.title,
          icon: RefreshCw,
          content: policies.refundPolicy.content
        };
      case 'privacyPolicy':
        return {
          title: policies.privacyPolicy.title,
          icon: FileText,
          content: policies.privacyPolicy.content
        };
      case 'termsConditions':
        return {
          title: policies.termsConditions.title,
          icon: FileText,
          content: policies.termsConditions.content
        };
      case 'support':
        return {
          title: 'Customer Support & Help Desk',
          icon: MessageSquare,
          isSupportTicket: true
        };
      default:
        return { title: 'Store Information', icon: Info, content: 'SUB SATHI Nepal.' };
    }
  };

  const policy = getPolicyContent();
  const Icon = policy.icon;

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    setTicketSent(true);
    setTimeout(() => {
      setTicketSent(false);
      setTicketSubject('');
      setTicketMessage('');
      setActivePolicyModal(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs font-poppins animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-auto max-h-[85vh] flex flex-col text-gray-900">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#293d67] text-white flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-base sm:text-lg text-gray-900">
              {policy.title}
            </h2>
          </div>

          <button
            onClick={() => setActivePolicyModal(null)}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {policy.isSupportTicket ? (
            <div>
              {ticketSent ? (
                <div className="p-6 text-center text-green-600 font-bold bg-green-50 rounded-xl">
                  ✓ Your support request has been submitted! Our Nepal team will contact your WhatsApp shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <p className="text-xs text-gray-500">
                    Need help setting up Smart TV, renewing an active plan, or requesting account assistance? Submit a ticket below or WhatsApp us directly.
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="e.g. Netflix household update request"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Message / Issue Details</label>
                    <textarea
                      required
                      rows={4}
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      placeholder="Describe your issue with Order ID or registered email..."
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden"
                    ></textarea>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-[#293d67] hover:bg-[#1e4cb1] text-white font-semibold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Ticket</span>
                    </button>

                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hello SUB SATHI Support, I need help.`)}`}
                      className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>WhatsApp Live Chat</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div>{policy.content}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
