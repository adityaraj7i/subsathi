import React from 'react';

export const Logo = ({ className = "h-10", iconOnly = false, isDarkBg = false }) => {
  if (iconOnly) {
    return (
      <div className={`flex items-center justify-center shrink-0 ${className}`}>
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <linearGradient id="logoPlayGradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00A3FF" />
              <stop offset="50%" stop-color="#3B82F6" />
              <stop offset="100%" stop-color="#8B5CF6" />
            </linearGradient>
          </defs>
          <g transform="translate(10, 10)">
            <path d="M 45 28 L 32 12" stroke={isDarkBg ? "#FFFFFF" : "#0F172A"} strokeWidth="7" strokeLinecap="round" />
            <path d="M 55 28 L 68 12" stroke={isDarkBg ? "#FFFFFF" : "#0F172A"} strokeWidth="7" strokeLinecap="round" />
            <rect x="5" y="28" width="90" height="70" rx="20" ry="20" fill="none" stroke={isDarkBg ? "#FFFFFF" : "#0F172A"} strokeWidth="7" strokeLinejoin="round" />
            <path d="M 36 44 C 36 41.5 39 40 41 41.5 L 68 58.5 C 70 60 70 62 68 63.5 L 41 80.5 C 39 82 36 80.5 36 78 Z" fill="url(#logoPlayGradIcon)" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/logo.svg"
        alt="SubSathi"
        className="h-full w-auto object-contain max-h-12"
      />
    </div>
  );
};

export default Logo;
