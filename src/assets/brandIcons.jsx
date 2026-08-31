import React from 'react';

export const BrandIcons = {
  // Netflix 4K
  netflix: (props) => (
    <svg viewBox="0 0 111 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M105.062 14.2807L110.999 0H105.062V14.2807ZM105.062 14.2807L99.1248 0H93.1875L99.1248 14.2807L93.1875 28.5614H99.1248L105.062 14.2807ZM105.062 14.2807L110.999 28.5614H105.062V14.2807Z" fill="#E50914"/>
      <path d="M82.8028 4.76023H88.7401V28.5614H82.8028V4.76023Z" fill="#E50914"/>
      <path d="M72.4173 4.76023H78.3546V28.5614H72.4173V4.76023Z" fill="#E50914"/>
      <path d="M69.4485 9.52047H57.5739V4.76023H75.3858V0H51.6367V28.5614H57.5739V14.2807H69.4485V9.52047Z" fill="#E50914"/>
      <path d="M41.2505 4.76023H47.1878V0H35.3132V28.5614H41.2505V4.76023Z" fill="#E50914"/>
      <path d="M17.5015 28.5614L29.3761 0H23.4388L14.5328 21.421L5.62688 0H-0.310547V28.5614H5.62688V7.14035L14.5328 28.5614H17.5015Z" fill="#E50914"/>
    </svg>
  ),

  // Spotify
  spotify: (props) => (
    <svg viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="84" cy="84" r="84" fill="#1ED760"/>
      <path d="M120.2 121.8c-1.6 2.6-5 3.4-7.6 1.8-20.8-12.7-47-15.6-77.8-8.5-3 .7-5.9-1.2-6.6-4.2-.7-3 1.2-5.9 4.2-6.6 33.7-7.7 62.7-4.4 86 9.8 2.6 1.6 3.4 5 1.8 7.7zm10.4-23c-2 3.2-6.2 4.2-9.4 2.2-23.8-14.6-60.1-18.9-88.3-10.3-3.6 1.1-7.4-1-8.5-4.6-1.1-3.6 1-7.4 4.6-8.5 32.2-9.8 72.3-5 99.4 11.7 3.2 2 4.2 6.2 2.2 9.5zm.9-24C103 57.7 56 56.1 28.9 64.3c-4.4 1.3-9-1.2-10.3-5.6-1.3-4.4 1.2-9 5.6-10.3 31.1-9.4 83-7.6 115.6 11.7 4 2.4 5.2 7.6 2.8 11.6-2.4 4-7.6 5.3-11.1 2.7z" fill="#000000"/>
    </svg>
  ),

  // ChatGPT Plus (GPT-4o)
  chatgpt: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" fill="#10A37F"/>
    </svg>
  ),

  // Google Gemini Pro
  gemini: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 24c0-6.627-5.373-12-12-12 6.627 0 12-5.373 12-12 0 6.627 5.373 12 12 12-6.627 0-12 5.373-12 12z" fill="url(#geminiGrad)"/>
      <defs>
        <linearGradient id="geminiGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1BA1E3"/>
          <stop offset="0.34" stopColor="#5489D6"/>
          <stop offset="0.67" stopColor="#9B72CB"/>
          <stop offset="1" stopColor="#D96570"/>
        </linearGradient>
      </defs>
    </svg>
  ),

  // Super Grok (xAI)
  grok: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="24" rx="6" fill="#000000"/>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#FFFFFF"/>
    </svg>
  ),

  // Canva Pro
  canva: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="12" fill="url(#canvaGrad)"/>
      <path d="M11.8 15.6c-2.4 0-4.2-1.6-4.2-4.1 0-2.8 2.2-4.9 5.3-4.9 1.4 0 2.5.5 3.1 1.2l-1.3 1.3c-.4-.4-1-.7-1.8-.7-1.8 0-3.1 1.3-3.1 3.1 0 1.5 1 2.5 2.5 2.5.9 0 1.6-.4 2.1-.9l1.2 1.3c-.8.8-1.9 1.2-3.8 1.2z" fill="#FFFFFF"/>
      <defs>
        <linearGradient id="canvaGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C4CC"/>
          <stop offset="0.5" stopColor="#7D2AE8"/>
          <stop offset="1" stopColor="#FF007A"/>
        </linearGradient>
      </defs>
    </svg>
  ),

  // Adobe Creative Cloud
  adobe: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="24" rx="6" fill="#FF0000"/>
      <path d="M14.5 4H19.5V20H15.8L13.6 14.8C14.3 14 14.7 12.9 14.7 11.8C14.7 10 13.5 8.5 11.8 8.1L14.5 4ZM4.5 4H9.5L12.2 8.1C10.5 8.5 9.3 10 9.3 11.8C9.3 12.9 9.7 14 10.4 14.8L8.2 20H4.5V4ZM12 10C13 10 13.8 10.8 13.8 11.8C13.8 12.8 13 13.6 12 13.6C11 13.6 10.2 12.8 10.2 11.8C10.2 10.8 11 10 12 10Z" fill="#FFFFFF"/>
    </svg>
  ),

  // Prime Video
  prime: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="24" rx="6" fill="#00A8E1"/>
      <path d="M6 14.5c3.5 2 8.5 2 12 0" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 13.5l2 1-1 2" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 8h3c1.5 0 2.5.8 2.5 2s-1 2-2.5 2H9.5v2.5H8V8zm1.5 3h1.5c.6 0 1-.3 1-.8s-.4-.7-1-.7H9.5V11z" fill="#FFFFFF"/>
    </svg>
  ),

  // YouTube Premium
  youtube: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="24" rx="6" fill="#FF0000"/>
      <path d="M10 8.5v7l6-3.5-6-3.5z" fill="#FFFFFF"/>
    </svg>
  ),

  // CapCut Pro
  capcut: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="24" rx="6" fill="#000000"/>
      <path d="M6 7h12l-6 10-6-10z" fill="#00F0FF"/>
      <path d="M6 17h12l-6-10-6 10z" fill="#FFFFFF" fillOpacity="0.8"/>
    </svg>
  ),

  // Microsoft 365
  microsoft: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="3" y="3" width="8.5" height="8.5" fill="#F25022"/>
      <rect x="12.5" y="3" width="8.5" height="8.5" fill="#7FBA00"/>
      <rect x="3" y="12.5" width="8.5" height="8.5" fill="#00A4EF"/>
      <rect x="12.5" y="12.5" width="8.5" height="8.5" fill="#FFB900"/>
    </svg>
  ),

  // NordVPN
  nordvpn: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="12" fill="#4687FF"/>
      <path d="M12 5l5.5 13.5h-3L12 11.5l-2.5 7h-3L12 5z" fill="#FFFFFF"/>
    </svg>
  ),

  // QuillBot
  quillbot: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="12" fill="#48B774"/>
      <path d="M12 4c-4.4 0-8 3.6-8 8 0 2.2.9 4.2 2.3 5.7L6 20l3.3-1c.8.4 1.7.6 2.7.6 4.4 0 8-3.6 8-8s-3.6-8-8-8zm1 12h-2v-2h2v2zm0-4h-2V7h2v5z" fill="#FFFFFF"/>
    </svg>
  ),

  // Crunchyroll
  crunchyroll: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="12" fill="#F47521"/>
      <circle cx="12" cy="12" r="6" fill="#FFFFFF"/>
      <circle cx="13" cy="11" r="4.5" fill="#F47521"/>
    </svg>
  ),

  // Lovable UltraX
  lovable: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="24" rx="6" fill="#FF3366"/>
      <path d="M12 18l-1.45-1.32C5.4 12.04 2 8.96 2 5.25 2 2.42 4.42 0 7.25 0c1.6 0 3.13.75 4.75 2.09C13.62.75 15.15 0 16.75 0 19.58 0 22 2.42 22 5.25c0 3.71-3.4 6.79-8.55 11.43L12 18z" fill="#FFFFFF" transform="translate(1, 3) scale(0.9)"/>
    </svg>
  ),

  // Combo Gift Bundle
  combo: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="24" rx="6" fill="#7C3AED"/>
      <path d="M12 3v18M3 12h18" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3" fill="#F59E0B"/>
    </svg>
  )
};

export const getBrandIconBySlug = (slug) => {
  if (!slug) return BrandIcons.combo;
  const s = slug.toLowerCase();
  if (s.includes('netflix')) return BrandIcons.netflix;
  if (s.includes('spotify')) return BrandIcons.spotify;
  if (s.includes('chatgpt') || s.includes('gpt')) return BrandIcons.chatgpt;
  if (s.includes('gemini')) return BrandIcons.gemini;
  if (s.includes('grok')) return BrandIcons.grok;
  if (s.includes('canva')) return BrandIcons.canva;
  if (s.includes('adobe') || s.includes('creative-cloud')) return BrandIcons.adobe;
  if (s.includes('prime')) return BrandIcons.prime;
  if (s.includes('youtube')) return BrandIcons.youtube;
  if (s.includes('capcut')) return BrandIcons.capcut;
  if (s.includes('microsoft') || s.includes('office')) return BrandIcons.microsoft;
  if (s.includes('nord') || s.includes('vpn')) return BrandIcons.nordvpn;
  if (s.includes('quill')) return BrandIcons.quillbot;
  if (s.includes('crunchyroll')) return BrandIcons.crunchyroll;
  if (s.includes('lovable')) return BrandIcons.lovable;
  return BrandIcons.combo;
};

export default BrandIcons;
