import React, { useState, useEffect } from 'react';
import { CheckCircle2, Zap, Sparkles } from 'lucide-react';

const mockActivities = [
  { name: 'Rohan S.', city: 'Pokhara', product: 'Netflix 4K Private', time: '2m ago' },
  { name: 'Aayush T.', city: 'Kathmandu', product: 'ChatGPT Plus (GPT-4o)', time: '4m ago' },
  { name: 'Sweta M.', city: 'Lalitpur', product: 'Canva Pro 1 Year', time: '7m ago' },
  { name: 'Binod K.', city: 'Butwal', product: 'Creator Pack Combo', time: '11m ago' },
  { name: 'Pooja R.', city: 'Biratnagar', product: 'Spotify Premium Individual', time: '15m ago' },
  { name: 'Niraj G.', city: 'Bhaktapur', product: 'Adobe Creative Cloud', time: '18m ago' }
];

export const LiveActivityToast = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show toast every 8 seconds, keep visible for 4.5 seconds
    const interval = setInterval(() => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 4500);

      setCurrentIdx((prev) => (prev + 1) % mockActivities.length);
    }, 9000);

    // Initial trigger after 3s
    const initialTimeout = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!visible) return null;

  const activity = mockActivities[currentIdx];

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-30 max-w-[280px] sm:max-w-sm glass-panel bg-slate-900/95 border border-cyan-500/30 p-2.5 sm:p-3 rounded-2xl shadow-2xl shadow-black/80 hidden sm:flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 font-jakarta text-slate-100">
      <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
        <Zap className="w-4 h-4 fill-current text-cyan-400" />
      </div>

      <div className="text-xs">
        <div className="font-bold text-white flex items-center gap-1.5">
          <span>{activity.name}</span>
          <span className="text-[10px] text-slate-400 font-normal">({activity.city})</span>
        </div>
        <div className="text-slate-300 text-[11px] truncate">
          Purchased <strong className="text-cyan-300 font-semibold">{activity.product}</strong>
        </div>
      </div>

      <span className="text-[9px] text-slate-500 font-mono shrink-0 ml-auto">
        {activity.time}
      </span>
    </div>
  );
};

export default LiveActivityToast;
