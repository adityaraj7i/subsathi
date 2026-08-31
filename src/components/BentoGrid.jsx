import { useCart } from '../context/CartContext';

export const BentoGrid = () => {
  const { openProductPage, addToCart, productsList = [] } = useCart();

  const handleOpenProduct = (slug) => {
    const product = productsList.find(p => p.slug === slug || p.id === slug);
    if (product) openProductPage(product);
  };

  return (
    <section className="py-14 max-w-7xl mx-auto px-4 font-jakarta">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Categories
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Next-Gen Subscription Ecosystem
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          Explore specialized digital hubs engineered for students, developers, designers, and movie lovers in Nepal.
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Tile 1: AI Powerhouse (Col 7) */}
        <div className="md:col-span-7 rounded-3xl glass-card p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group border-purple-500/20 hover:border-purple-500/40">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Bot className="w-6 h-6" />
              </div>
              <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/30">
                Top Trending in Nepal
              </span>
            </div>

            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-2 group-hover:text-purple-300 transition-colors">
              AI Intelligence Hub
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed mb-6">
              Unlock unlimited GPT-4o reasoning, DALL-E image generation, Claude Pro coding, and Google Gemini 5TB cloud models without international cards.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
              {['ChatGPT Plus', 'Gemini Pro 5TB', 'Super Grok'].map((name) => (
                <div key={name} className="p-3 bg-slate-900/60 rounded-xl border border-white/5 flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div>
              <span className="text-xs text-slate-400 block">Starting from</span>
              <span className="font-mono font-black text-xl text-purple-400">Rs. 1,499</span>
            </div>

            <button
              onClick={() => handleOpenProduct('chatgpt-plus')}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              <span>Get ChatGPT Plus</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tile 2: 4K Cinema Vault (Col 5) */}
        <div className="md:col-span-5 rounded-3xl glass-card p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group border-red-500/20 hover:border-red-500/40">
          <div className="absolute top-0 right-0 w-60 h-60 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
                <Tv className="w-6 h-6" />
              </div>
              <span className="bg-red-500/20 text-red-300 text-xs font-bold px-2.5 py-1 rounded-full border border-red-500/30">
                4K Ultra HD
              </span>
            </div>

            <h3 className="font-heading font-black text-xl sm:text-2xl text-white mb-2 group-hover:text-red-300 transition-colors">
              Streaming & Entertainment
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Private PIN-locked profiles with 4K UHD streaming on Smart TVs, tablets & laptops. Netflix, Spotify, Prime & YouTube.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Netflix 4K from</span>
              <span className="font-mono font-black text-xl text-red-400">Rs. 380</span>
            </div>

            <button
              onClick={() => handleOpenProduct('netflix')}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
            >
              <span>Explore Netflix</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tile 3: Creator Suite (Col 6) */}
        <div className="md:col-span-6 rounded-3xl glass-card p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between group border-cyan-500/20 hover:border-cyan-500/40">
          <div className="flex justify-between items-start mb-4">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Palette className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              Design & Video
            </span>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
              Creative Studio Pack (Canva + Adobe CC)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Premium vector assets, templates, background remover, Photoshop, Illustrator, Premiere Pro & CapCut VIP.
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="font-mono font-bold text-cyan-400">Canva Pro Rs. 169/yr</span>
            <button
              onClick={() => handleOpenProduct('canva-pro')}
              className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-colors cursor-pointer"
            >
              View Plans
            </button>
          </div>
        </div>

        {/* Tile 4: Cyber Shield VPN & Software (Col 6) */}
        <div className="md:col-span-6 rounded-3xl glass-card p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between group border-emerald-500/20 hover:border-emerald-500/40">
          <div className="flex justify-between items-start mb-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Security & Office
            </span>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
              NordVPN & Microsoft 365 Lifetime
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              High-speed encrypted servers, streaming unblocking, and genuine Microsoft Office apps with OneDrive cloud storage.
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="font-mono font-bold text-emerald-400">Office 365 Rs. 1,499</span>
            <button
              onClick={() => handleOpenProduct('microsoft-365-lifetime-office-suite')}
              className="px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-colors cursor-pointer"
            >
              View Plans
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
