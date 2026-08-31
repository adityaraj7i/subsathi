import React, { useState } from 'react';
import { Calculator, X, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const SavingsCalculator = ({ isOpen, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();

  const [selectedTools, setSelectedTools] = useState({
    netflix: true,
    chatgpt: true,
    canva: true,
    spotify: false,
    adobe: false,
    vpn: false
  });

  if (!isOpen) return null;

  const toolData = {
    netflix: { name: 'Netflix 4K Premium', usdYearly: 240, nprUsdCardCost: 34500, subsathiYearly: 4999 },
    chatgpt: { name: 'ChatGPT Plus (GPT-4o)', usdYearly: 240, nprUsdCardCost: 35000, subsathiYearly: 18500 },
    canva: { name: 'Canva Pro Annual', usdYearly: 120, nprUsdCardCost: 17500, subsathiYearly: 169 },
    spotify: { name: 'Spotify Premium Individual', usdYearly: 130, nprUsdCardCost: 18800, subsathiYearly: 2499 },
    adobe: { name: 'Adobe Creative Cloud All Apps', usdYearly: 660, nprUsdCardCost: 95000, subsathiYearly: 12500 },
    vpn: { name: 'NordVPN 1 Year', usdYearly: 80, nprUsdCardCost: 12000, subsathiYearly: 2499 }
  };

  const toggleTool = (key) => {
    setSelectedTools(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalBankCost = Object.keys(selectedTools).reduce((sum, key) => {
    return sum + (selectedTools[key] ? toolData[key].nprUsdCardCost : 0);
  }, 0);

  const totalSubSathiCost = Object.keys(selectedTools).reduce((sum, key) => {
    return sum + (selectedTools[key] ? toolData[key].subsathiYearly : 0);
  }, 0);

  const annualSavings = Math.max(0, totalBankCost - totalSubSathiCost);
  const savingsPercent = totalBankCost > 0 ? Math.round((annualSavings / totalBankCost) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto font-jakarta animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 my-auto text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl text-white">
              Nepal Subscription Savings Calculator
            </h3>
            <p className="text-xs text-slate-400">
              Compare direct USD dollar card bank costs vs buying locally from SUB SATHI.
            </p>
          </div>
        </div>

        {/* Tool Selectors */}
        <div className="my-6 space-y-2">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Select Subscriptions You Use:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.keys(toolData).map((key) => {
              const item = toolData[key];
              const isSelected = selectedTools[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleTool(key)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500/50 text-white shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-800/60 border-white/5 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${isSelected ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-700'}`}>
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                    </div>
                    <span className="text-xs font-bold">{item.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculated Result Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-cyan-500/40 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-slate-900 rounded-xl border border-white/5">
              <span className="text-[11px] text-slate-400 block">USD Dollar Card + Bank Fees</span>
              <span className="font-mono text-base sm:text-lg font-bold text-red-400">
                Rs. {totalBankCost.toLocaleString()} / yr
              </span>
            </div>

            <div className="p-3 bg-cyan-950/40 rounded-xl border border-cyan-500/30">
              <span className="text-[11px] text-cyan-300 block">SUB SATHI Local Price</span>
              <span className="font-mono text-base sm:text-lg font-bold text-cyan-400">
                Rs. {totalSubSathiCost.toLocaleString()} / yr
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-300 font-bold block uppercase tracking-wider">
                Total Annual Savings:
              </span>
              <span className="font-heading font-black text-2xl text-emerald-400">
                Rs. {annualSavings.toLocaleString()} NPR
              </span>
            </div>
            <div className="text-right">
              <span className="bg-emerald-500 text-black font-black text-xs px-2.5 py-1 rounded-full uppercase">
                {savingsPercent}% Saved
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all cursor-pointer"
          >
            Start Saving with SUB SATHI
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator;
