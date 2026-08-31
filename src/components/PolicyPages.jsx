import React, { useState } from 'react';
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageCircle,
  LifeBuoy,
  Search,
  ListChecks,
  CreditCard,
  Zap,
  Headphones,
  ShieldCheck,
  HelpCircle,
  Send,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Users,
  Award,
  Lock,
  RefreshCw,
  Copy,
  Check,
  FileText,
  DollarSign,
  Share2,
  Globe,
  MapPin,
  CheckCircle,
  XCircle,
  Flame,
  ShieldAlert,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { insertTicketToSupabase } from '../lib/supabase';

export const PolicyPages = ({ page, onBack, onNavigatePage }) => {
  const { storeConfig } = useCart();

  // Contact / Ticket Form State
  const [ticketName, setTicketName] = useState('');
  const [ticketPhone, setTicketPhone] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketOrderId, setTicketOrderId] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Account Activation');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState('');
  const [copiedField, setCopiedField] = useState(null);
  const [faqSearch, setFaqSearch] = useState('');

  // Accordions State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const phone = storeConfig?.phone || '+977 9744723372';
  const whatsappNumber = storeConfig?.whatsappNumber || '9779744723372';
  const email = storeConfig?.email || 'support@subsathi.com';
  const storeName = storeConfig?.name || 'SubSathi';
  const storeAddress = storeConfig?.address || 'Putalisadak, Kathmandu, Nepal';

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedField('share_url');
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketName || !ticketPhone || !ticketMessage) {
      alert('Please provide your name, WhatsApp number, and issue details.');
      return;
    }

    const tId = 'SUB-' + Math.floor(100000 + Math.random() * 900000);
    setCreatedTicketId(tId);
    setTicketSubmitted(true);

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

    const newTicket = {
      id: tId,
      date: new Date().toISOString(),
      name: ticketName,
      phone: ticketPhone,
      email: ticketEmail,
      orderId: ticketOrderId,
      category: ticketCategory,
      subject: ticketSubject,
      message: ticketMessage,
      status: 'Open'
    };

    const existingTickets = JSON.parse(localStorage.getItem('subsathi_user_tickets') || '[]');
    existingTickets.unshift(newTicket);
    localStorage.setItem('subsathi_user_tickets', JSON.stringify(existingTickets));
    insertTicketToSupabase(newTicket);
  };

  const handleSendTicketToWhatsApp = () => {
    const msg = `*🎫 SUBSATHI SUPPORT TICKET #${createdTicketId}*
━━━━━━━━━━━━━━━━━━━━
*Customer Name:* ${ticketName}
*WhatsApp:* ${ticketPhone}
${ticketEmail ? `*Email:* ${ticketEmail}\n` : ''}${ticketOrderId ? `*Order ID:* ${ticketOrderId}\n` : ''}*Category:* ${ticketCategory}
*Subject:* ${ticketSubject || 'Support Inquiry'}
*Message:*
${ticketMessage}
━━━━━━━━━━━━━━━━━━━━
Please assist me with this ticket!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Navigation Links Pill Bar
  const navTabs = [
    { id: 'about-us', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'refund-policy', label: 'Refund Policy' },
    { id: 'warranty-policy', label: 'Warranty Policy' },
    { id: 'privacy-policy', label: 'Privacy Policy' },
    { id: 'terms-conditions', label: 'Terms & Conditions' },
    { id: 'support-desk', label: 'Support Desk' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30 text-gray-900 font-poppins pb-24 animate-in fade-in duration-300">
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Top Navigation & Sub-Menu Bar
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="bg-white border-b border-gray-200/80 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          
          {/* Breadcrumb back */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Store</span>
            </button>
            <span className="text-gray-300">|</span>
            <span className="text-gray-900 font-bold capitalize">
              {page?.replace(/-/g, ' ') || 'Policy'}
            </span>
          </div>

          {/* Quick Page Nav Pills (Horizontally swipeable on phone) */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none w-full md:w-auto order-last md:order-none">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onNavigatePage && onNavigatePage(tab.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  page === tab.id
                    ? 'bg-[#293d67] text-white shadow-xs'
                    : 'bg-gray-100/80 md:bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors cursor-pointer"
          >
            {copiedField === 'share_url' ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-gray-500" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. ABOUT US PAGE (Inspiring Brand Story & Authority)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {page === 'about-us' && (
        <main className="max-w-6xl mx-auto px-4 py-8 sm:py-14">
          
          {/* Hero Section */}
          <section className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 text-[#293d67] text-xs font-extrabold uppercase tracking-wider mb-5 shadow-2xs">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Nepal's Premier Digital Subscription Network</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight mb-5 font-jakarta">
              Redefining How Nepal Accesses the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#293d67] via-blue-600 to-indigo-600">Digital World</span>
            </h1>
            
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              SubSathi was built on a single, uncompromising belief: every student, developer, creator, and business in Nepal deserves frictionless access to global software, AI tools, and entertainment at honest prices.
            </p>
          </section>

          {/* Metrics Grid with Glow */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {[
              { number: '15,000+', label: 'Happy Customers', sub: 'Across all 77 districts of Nepal 🇳🇵', icon: Users, color: 'text-blue-600' },
              { number: '< 15 Mins', label: 'Average Delivery', sub: 'Instant credentials via WhatsApp & Email', icon: Zap, color: 'text-amber-500' },
              { number: '100%', label: 'Replacement Guarantee', sub: 'Zero-downtime active warranty shield', icon: ShieldCheck, color: 'text-emerald-600' },
              { number: '24/7/365', label: 'Kathmandu Support', sub: 'Direct human engineering assistance', icon: Headphones, color: 'text-purple-600' }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 font-inter mb-1">
                  {stat.number}
                </div>
                <div className="font-bold text-xs sm:text-sm text-gray-900 mb-1">{stat.label}</div>
                <div className="text-[11px] text-gray-500 leading-snug">{stat.sub}</div>
              </div>
            ))}
          </section>

          {/* The Problem vs The SubSathi Solution Grid */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Why Thousands Across Nepal Trust SubSathi
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                The stark difference between traditional foreign card hassles and the SubSathi experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* The Old Way */}
              <div className="p-6 sm:p-8 rounded-3xl bg-red-50/40 border border-red-200/70 space-y-4">
                <div className="flex items-center gap-3 text-red-700 font-bold text-base">
                  <XCircle className="w-6 h-6 shrink-0" />
                  <span>The Traditional Foreign Card Problem</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>High annual dollar card issuance fees & complex banking procedures.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Unpredictable 5% to 15% currency conversion markups and hidden bank surcharges.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>Zero local customer support when an account or payment fails.</span>
                  </li>
                </ul>
              </div>

              {/* The SubSathi Solution */}
              <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/50 border border-emerald-200/80 space-y-4 shadow-xs">
                <div className="flex items-center gap-3 text-emerald-800 font-bold text-base">
                  <CheckCircle className="w-6 h-6 shrink-0 text-emerald-600" />
                  <span>The Seamless SubSathi Solution</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Instant checkout via <strong>eSewa, Khalti, and Mobile Banking</strong> in NPR.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Transparent, fixed wholesale pricing with zero hidden processing charges.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>100% Active Replacement Warranty</strong> with 24/7 Kathmandu live agent resolution.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4 Core Pillars */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: ShieldCheck,
                title: 'Verified Genuine Credentials',
                desc: 'Every account and activation license is legally provisioned, verified for clean uptime, and tested before delivery to protect your workspace.'
              },
              {
                icon: Zap,
                title: 'Lightning Automated Dispatch',
                desc: 'Our dispatch team processes orders rapidly. You receive logins or invitations directly to your WhatsApp with full step-by-step onboarding.'
              },
              {
                icon: DollarSign,
                title: 'Student & Creator Friendly',
                desc: 'Special tiered packages curated for university students, digital marketing agencies, and freelancers who need pro tools without heavy overheads.'
              },
              {
                icon: Headphones,
                title: '24/7 Direct Human Care',
                desc: 'No robotic automated dead-ends. Speak directly with knowledgeable support specialists in Kathmandu via WhatsApp or phone helpline.'
              }
            ].map((pillar, idx) => (
              <div key={idx} className="p-6 sm:p-7 rounded-3xl bg-white border border-gray-200 shadow-xs hover:border-[#293d67]/50 hover:shadow-md transition-all flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-[#293d67]/10 text-[#293d67] flex items-center justify-center shrink-0">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 mb-1">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </section>
        </main>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. CONTACT US PAGE (Interactive Multi-Channel Hub)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {page === 'contact' && (
        <main className="max-w-6xl mx-auto px-4 py-8 sm:py-14">
          
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#293d67] text-xs font-bold uppercase tracking-wider mb-3">
              <Headphones className="w-3.5 h-3.5" />
              <span>24/7 Customer Care</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Get in Touch with the SubSathi Team
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Whether you need plan recommendations, immediate activation support, or corporate licensing, our team is ready to assist you.
            </p>
          </div>

          {/* 4 Premium Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            
            {/* WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-green-50/80 to-white border border-green-200 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-1">WhatsApp Live Chat</h3>
                <p className="text-xs text-green-700 font-semibold mb-2">⚡ Typical reply: &lt; 3 mins</p>
                <p className="text-xs text-gray-600 font-mono font-bold">{phone}</p>
              </div>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello SubSathi team, I need support.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold text-xs rounded-xl text-center transition-colors shadow-xs"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-blue-50/60 to-white border border-blue-200 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#293d67] text-white flex items-center justify-center mb-4 shadow-xs">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-1">Official Email</h3>
                <p className="text-xs text-gray-500 mb-2">Orders & formal queries</p>
                <p className="text-xs text-gray-800 font-semibold break-all">{email}</p>
              </div>
              <button
                onClick={() => handleCopy(email, 'email')}
                className="mt-5 w-full py-2.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'email' ? 'Copied to Clipboard' : 'Copy Email Address'}</span>
              </button>
            </div>

            {/* Helpline Phone */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-50 to-white border border-gray-200 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center mb-4 shadow-xs">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-1">Direct Call Helpline</h3>
                <p className="text-xs text-gray-500 mb-2">9:00 AM – 9:00 PM (Daily)</p>
                <p className="text-xs text-gray-800 font-mono font-bold">{phone}</p>
              </div>
              <a
                href={`tel:${whatsappNumber}`}
                className="mt-5 w-full py-2.5 bg-gray-900 hover:bg-black text-white font-semibold text-xs rounded-xl text-center transition-colors shadow-xs"
              >
                Call Hotline
              </a>
            </div>

            {/* Support Desk Ticket */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-purple-50/60 to-white border border-purple-200 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-700 text-white flex items-center justify-center mb-4 shadow-xs">
                  <LifeBuoy className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-1">Support Desk</h3>
                <p className="text-xs text-purple-700 font-semibold mb-2">Track Tickets & History</p>
                <p className="text-xs text-gray-600">Formal issue ticketing system</p>
              </div>
              <button
                onClick={() => onNavigatePage && onNavigatePage('support-desk')}
                className="mt-5 w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl text-center transition-colors shadow-xs cursor-pointer"
              >
                Open Ticket Desk
              </button>
            </div>
          </div>

          {/* Location & Social Banner */}
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-gray-900 to-[#1b2a4a] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Headquarters & Physical Office</span>
              </div>
              <div className="text-lg sm:text-xl font-extrabold">{storeAddress}</div>
              <div className="text-xs text-gray-400">Registered Digital Services Provider in Nepal 🇳🇵</div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={storeConfig.social?.facebook || 'https://facebook.com/subsathiofficial'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold transition-all text-white"
              >
                Facebook
              </a>
              <a
                href={storeConfig.social?.instagram || 'https://instagram.com/subsathi'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold transition-all text-white"
              >
                Instagram
              </a>
              <a
                href={storeConfig.social?.tiktok || 'https://tiktok.com/@subsathi'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold transition-all text-white"
              >
                TikTok
              </a>
            </div>
          </div>
        </main>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. HOW IT WORKS PAGE (Visual Step-by-Step Experience)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {page === 'how-it-works' && (
        <main className="max-w-5xl mx-auto px-4 py-8 sm:py-14">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#293d67] text-xs font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Fast & Frictionless</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Get Started in 5 Simple Steps
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              From choosing your favorite digital subscription to receiving verified access on WhatsApp—here is the entire flow explained.
            </p>
          </div>

          {/* 5 Interactive Steps */}
          <div className="space-y-6 sm:space-y-8 relative">
            {[
              {
                step: '01',
                badge: 'Catalog Discovery',
                icon: Search,
                title: 'Browse & Select Your Tool',
                desc: 'Explore over 50+ handpicked digital subscriptions across Streaming, AI Tools, VPNs, Graphic Design, and Cloud Storage. Filter by category or search directly.'
              },
              {
                step: '02',
                badge: 'Custom Configuration',
                icon: ListChecks,
                title: 'Choose Duration & Account Type',
                desc: 'Select from 1 Month, 3 Months, 6 Months, or 1 Year durations. Choose between economical Shared Profiles or dedicated 100% Private Accounts.'
              },
              {
                step: '03',
                badge: 'Frictionless Checkout',
                icon: CreditCard,
                title: 'Pay with eSewa, Khalti or Mobile Banking',
                desc: 'Proceed to checkout in Nepali Rupees (NPR). Scan the instant QR code or transfer directly to our verified merchant accounts with zero dollar conversion fees.'
              },
              {
                step: '04',
                badge: 'Express Delivery',
                icon: Zap,
                title: 'Instant WhatsApp Credential Delivery',
                desc: 'Our dispatch team validates your payment and sends your login details, profile PIN, or license key straight to your WhatsApp within 10 to 30 minutes.'
              },
              {
                step: '05',
                badge: 'Peace of Mind',
                icon: ShieldCheck,
                title: 'Complete Replacement Warranty & Support',
                desc: 'Sit back and enjoy your service. If you ever need help or an account reset, our 24/7 support line provides instant replacement during your warranty period.'
              }
            ].map((st, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-5 p-6 sm:p-7 rounded-3xl bg-white border border-gray-200 shadow-xs hover:border-[#293d67] hover:shadow-md transition-all items-start">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#293d67] to-blue-700 text-white flex items-center justify-center shadow-md font-black text-lg font-inter">
                    {st.step}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                    {st.badge}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#293d67] via-[#1e3a8a] to-[#0f172a] text-white text-center shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Ready to upgrade your digital toolkit?</h2>
            <p className="text-blue-100 text-xs sm:text-sm mb-6 max-w-lg mx-auto leading-relaxed">
              Join 15,000+ satisfied customers across Nepal enjoying premium software and entertainment without payment barriers.
            </p>
            <button
              onClick={onBack}
              className="px-8 py-3.5 bg-white text-[#293d67] font-bold text-sm rounded-full shadow-lg hover:bg-gray-100 transition-all cursor-pointer hover:scale-105"
            >
              Explore Products Now
            </button>
          </div>
        </main>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. REFUND POLICY PAGE (Transparent & Fair Protection)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {page === 'refund-policy' && (
        <main className="max-w-4xl mx-auto px-4 py-8 sm:py-14">
          
          <div className="mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Customer Protection & Fair Terms</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              SubSathi Refund & Dispute Policy
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Clear guidelines ensuring honest service delivery and prompt technical resolutions.
            </p>
          </div>

          <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
            
            {/* 3-Tier Resolution Protocol */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-gray-900">1. Our 3-Stage Resolution Hierarchy</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                If an unexpected outage or login error occurs during your active subscription period, our technical team applies remedies in this strict, rapid order:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80">
                  <div className="font-bold text-xs text-[#293d67] uppercase tracking-wider mb-1">Stage 1: Rapid Repair</div>
                  <p className="text-xs text-gray-700">Diagnostic password/profile reset within 15 minutes by our Kathmandu team.</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                  <div className="font-bold text-xs text-emerald-800 uppercase tracking-wider mb-1">Stage 2: Free Replacement</div>
                  <p className="text-xs text-gray-700">If unresolved, an immediate brand-new replacement account is issued at 0 cost.</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80">
                  <div className="font-bold text-xs text-purple-800 uppercase tracking-wider mb-1">Stage 3: Prorated Refund</div>
                  <p className="text-xs text-gray-700">If service cannot be restored, a refund is processed back to your eSewa/Khalti wallet.</p>
                </div>
              </div>
            </div>

            {/* 72-Hour Guarantee */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex items-start gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900 mb-1">72-Hour Delivery Failure Guarantee</h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  If SubSathi is unable to provision your purchased service within 72 hours of verified payment, you are entitled to a <strong>100% Full Refund</strong> with zero administrative deductions.
                </p>
              </div>
            </div>

            {/* Exclusions */}
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 space-y-3">
              <h3 className="font-bold text-base text-gray-900">Standard Non-Refundable Conditions</h3>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-600 ml-1">
                <li>Violation of single-device limits, unauthorized profile creation, or modifying account master passwords.</li>
                <li>Buyer's remorse after credentials have been successfully delivered and activated.</li>
                <li>Third-party platform policy shifts beyond reasonable operator control (e.g. streaming platform regional restrictions).</li>
              </ul>
            </div>
          </div>
        </main>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. WARRANTY POLICY PAGE (Unmatched Guarantee)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {page === 'warranty-policy' && (
        <main className="max-w-4xl mx-auto px-4 py-8 sm:py-14">
          
          <div className="mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#293d67] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Replacement Protection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              SubSathi Warranty & Service Guarantee
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              We stand 100% behind every digital license and subscription account delivered.
            </p>
          </div>

          <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
            
            {/* Main Promise */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-green-500 text-white flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">What Does the SubSathi Warranty Cover?</h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Your subscription is fully insured against unexpected logouts, activation credential expirations, and technical delivery bugs throughout your selected plan duration (e.g. 28-day replacement warranty for monthly plans, or full 1-year coverage for annual licenses).
              </p>
            </div>

            {/* How to Claim in 3 Steps */}
            <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/50 border border-blue-200/80 space-y-4">
              <h3 className="font-bold text-base text-gray-900">How to Claim Instant Warranty Replacement:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-[#293d67] text-white flex items-center justify-center font-bold text-xs mb-2">1</div>
                  <div className="font-bold text-xs text-gray-900 mb-1">Message on WhatsApp</div>
                  <p className="text-[11px] text-gray-500">Send a quick note to <span className="font-mono font-bold text-gray-800">{phone}</span>.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-[#293d67] text-white flex items-center justify-center font-bold text-xs mb-2">2</div>
                  <div className="font-bold text-xs text-gray-900 mb-1">Provide Order ID</div>
                  <p className="text-[11px] text-gray-500">Share your Order ID and a screenshot of the login issue.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-[#293d67] text-white flex items-center justify-center font-bold text-xs mb-2">3</div>
                  <div className="font-bold text-xs text-gray-900 mb-1">Receive New Logins</div>
                  <p className="text-[11px] text-gray-500">Our engineer verifies and dispatches fresh credentials right away.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. PRIVACY POLICY PAGE (Data Trust & Integrity)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {page === 'privacy-policy' && (
        <main className="max-w-4xl mx-auto px-4 py-8 sm:py-14">
          
          <div className="mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#293d67] text-xs font-bold uppercase tracking-wider mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>Data Protection in Nepal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              SubSathi Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              We treat your personal data with utmost confidentiality and industry-grade security.
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <div className="p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200 text-emerald-950 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <strong>Our Non-Negotiable Privacy Promise:</strong> We never sell, rent, or distribute your name, email, or WhatsApp number to third-party advertisers or telemarketers.
              </div>
            </div>

            <section className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-3">
              <h2 className="text-base font-bold text-gray-900">What We Collect and Why</h2>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-600 ml-1">
                <li><strong>WhatsApp Phone & Name:</strong> Essential to instantly dispatch credentials, license keys, and handle warranty claims.</li>
                <li><strong>Email Address:</strong> Used for digital invoice generation and critical account renewal notices.</li>
                <li><strong>Payment Transaction IDs:</strong> Required to verify payments via eSewa, Khalti, or bank records.</li>
              </ul>
            </section>
          </div>
        </main>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. TERMS & CONDITIONS PAGE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {(page === 'terms-conditions' || page === 'terms') && (
        <main className="max-w-4xl mx-auto px-4 py-8 sm:py-14">
          
          <div className="mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#293d67] text-xs font-bold uppercase tracking-wider mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>User Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              SubSathi Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Clear rules governing purchases, warranty entitlements, and shared account etiquette.
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <section className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-3">
              <h2 className="text-base font-bold text-gray-900">1. Fair Usage on Shared Profiles</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Shared subscription plans are licensed strictly for single-device active streaming or usage. Modifying profile names, altering account master passwords, or redistributing login credentials results in instant warranty revocation.
              </p>
            </section>

            <section className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs space-y-3">
              <h2 className="text-base font-bold text-gray-900">2. Fulfillment Guarantee</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Standard orders are delivered in 10 to 30 minutes. In the rare event of provisioning delay exceeding 72 hours, a 100% unconditional refund is issued upon customer request.
              </p>
            </section>
          </div>
        </main>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. SUPPORT DESK & TICKETS (Interactive Dashboard)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {(page === 'support-desk' || page === 'support' || page === 'tickets') && (
        <main className="max-w-6xl mx-auto px-4 py-8 sm:py-14">
          
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
              <LifeBuoy className="w-3.5 h-3.5" />
              <span>Customer Resolution Desk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              SubSathi Support & Ticket Portal
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Submit a formal technical ticket, track active issues, or chat live with a support engineer on WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Form: Ticket Creator (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 sm:p-9 shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#293d67]/10 text-[#293d67] flex items-center justify-center font-bold">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Submit Support Ticket</h2>
                    <p className="text-[11px] text-gray-500">Tracked with unique Ticket ID</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  ⚡ 24/7 Active Desk
                </span>
              </div>

              {ticketSubmitted ? (
                <div className="p-6 sm:p-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-3xl text-center space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-gray-900">Support Ticket Generated!</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Your Unique Reference Code: <strong className="text-green-800 font-mono text-sm">{createdTicketId}</strong>
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-md mx-auto">
                    We have logged your ticket into our priority queue. For immediate instant resolution, you can forward this ticket directly to WhatsApp.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={handleSendTicketToWhatsApp}
                      className="flex-1 py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Forward to WhatsApp ({phone})</span>
                    </button>
                    <button
                      onClick={() => {
                        setTicketSubmitted(false);
                        setTicketMessage('');
                        setTicketSubject('');
                      }}
                      className="py-3 px-4 bg-white border border-gray-300 text-gray-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Create Another Ticket
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketName}
                      onChange={(e) => setTicketName(e.target.value)}
                      placeholder="e.g. Aryan Sharma"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-[#293d67] outline-hidden transition-all bg-gray-50/40 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={ticketPhone}
                        onChange={(e) => setTicketPhone(e.target.value)}
                        placeholder="98XXXXXXXX"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-[#293d67] outline-hidden font-mono bg-gray-50/40 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Order ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={ticketOrderId}
                        onChange={(e) => setTicketOrderId(e.target.value)}
                        placeholder="e.g. ORD-8721"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-[#293d67] outline-hidden font-mono bg-gray-50/40 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Issue Category
                    </label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:border-[#293d67] outline-hidden cursor-pointer"
                    >
                      <option value="Account Activation">Account Activation & Login Credential</option>
                      <option value="Password Reset">Password Reset & Profile PIN Assistance</option>
                      <option value="Warranty Claim">Warranty Replacement Request</option>
                      <option value="Subscription Renewal">Subscription Renewal Inquiry</option>
                      <option value="Payment Verification">Payment QR & Transfer Verification</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Issue Subject
                    </label>
                    <input
                      type="text"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="Brief headline of the problem"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-[#293d67] outline-hidden bg-gray-50/40 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Detailed Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      placeholder="Please describe what you are experiencing..."
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:border-[#293d67] outline-hidden resize-none bg-gray-50/40 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-[#293d67] hover:bg-[#1e4cb1] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Official Ticket</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Side: Fast Channel & FAQs (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* WhatsApp Priority Card */}
              <div className="p-6 sm:p-7 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl shadow-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base">Direct WhatsApp Line</h3>
                    <p className="text-xs text-green-100">Average response: &lt; 3 mins</p>
                  </div>
                </div>
                <p className="text-xs text-green-50 leading-relaxed">
                  Need immediate replacement or having trouble logging in? Message our live support engineer on WhatsApp for instant assistance.
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello SubSathi Support, I need immediate assistance with my account.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-white text-green-800 font-extrabold text-xs rounded-xl text-center block shadow-md hover:bg-gray-100 transition-all cursor-pointer"
                >
                  Chat with Live Agent ({phone})
                </a>
              </div>

              {/* FAQs Accordion */}
              <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-xs space-y-3">
                <h3 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#293d67]" />
                  <span>Frequently Asked Questions</span>
                </h3>

                {[
                  {
                    q: 'How long does delivery take after payment?',
                    a: 'Deliveries are processed within 10 to 30 minutes after your eSewa, Khalti, or Bank transfer is confirmed via WhatsApp.'
                  },
                  {
                    q: 'How does the replacement warranty work?',
                    a: 'If any account stops working during its validity, simply send your Order ID to our WhatsApp line and we will provision an instant replacement account.'
                  },
                  {
                    q: 'Are these shared profiles or private accounts?',
                    a: 'We offer both! Look at the plan tier on the product page: "1 Screen Profile" is shared, while "Private Account" gives you complete dedicated control.'
                  },
                  {
                    q: 'Can I renew the same account next month?',
                    a: 'Yes! For most services (ChatGPT, Canva, Spotify, Netflix), we can renew on your existing profile seamlessly.'
                  }
                ].map((faq, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : i)}
                        className="w-full p-3.5 text-left font-bold text-xs text-gray-900 flex justify-between items-center cursor-pointer hover:bg-gray-50/80 transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-[#293d67]" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
                      </button>
                      {isOpen && (
                        <div className="p-3.5 pt-0 text-xs text-gray-600 leading-relaxed bg-gray-50/50 border-t border-gray-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default PolicyPages;
