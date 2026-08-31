import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Upload,
  Link as LinkIcon,
  RotateCw,
  Save,
  CheckCircle2,
  Image as ImageIcon,
  RotateCcw,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useCart, initialHeroBadges } from '../../context/CartContext';
import { getBrandIconBySlug, BrandIcons } from '../../assets/brandIcons';

export const AdminHeroBadges = () => {
  const { heroBadges, updateHeroBadges, productsList, resetHeroBadges } = useCart();

  const [badges, setBadges] = useState(() => JSON.parse(JSON.stringify(heroBadges)));
  const [activeFlippedCard, setActiveFlippedCard] = useState({});
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRefs = useRef({});

  // Preset vector logos available
  const presetBrands = [
    { name: 'ChatGPT Plus', slug: 'chatgpt-plus', key: 'chatgpt' },
    { name: 'Gemini Pro', slug: 'gemini-pro-5tb-storage', key: 'gemini' },
    { name: 'Netflix', slug: 'netflix', key: 'netflix' },
    { name: 'Prime Video', slug: 'prime-video', key: 'prime' },
    { name: 'Canva Pro', slug: 'canva-pro', key: 'canva' },
    { name: 'Adobe Creative Cloud', slug: 'adobe-creative-cloud', key: 'adobe' },
    { name: 'Spotify', slug: 'spotify', key: 'spotify' },
    { name: 'NordVPN', slug: 'nord-vpn', key: 'nordvpn' },
    { name: 'Microsoft 365', slug: 'microsoft-365-lifetime-office-suite', key: 'microsoft' },
    { name: 'QuillBot', slug: 'quill-bot', key: 'quillbot' },
    { name: 'CapCut Pro', slug: 'capcut-pro', key: 'capcut' },
    { name: 'Super Grok', slug: 'super-grok', key: 'grok' },
    { name: 'Crunchyroll', slug: 'crunchyroll-premium', key: 'crunchyroll' }
  ];

  const handleFileUpload = (badgeIndex, side, file) => {
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      alert('Image size too large. Please select under 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      setBadges((prev) => {
        const updated = [...prev];
        updated[badgeIndex][side].imageUrl = base64;
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleApplyPreset = (badgeIndex, side, preset) => {
    setBadges((prev) => {
      const updated = [...prev];
      updated[badgeIndex][side] = {
        name: preset.name,
        slug: preset.slug,
        imageUrl: ''
      };
      return updated;
    });
  };

  const handleFieldChange = (badgeIndex, side, field, value) => {
    setBadges((prev) => {
      const updated = [...prev];
      updated[badgeIndex][side][field] = value;
      return updated;
    });
  };

  const toggleFlip = (badgeId) => {
    setActiveFlippedCard((prev) => ({
      ...prev,
      [badgeId]: !prev[badgeId]
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateHeroBadges(badges);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset floating 3D logo badges to default icons?')) {
      resetHeroBadges();
      setBadges(JSON.parse(JSON.stringify(initialHeroBadges)));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
      alert('Floating logo badges restored to defaults!');
    }
  };

  return (
    <div className="space-y-6 font-poppins animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#293d67]" />
            <span>Floating 3D Logo Badges Customizer</span>
          </h2>
          <p className="text-xs text-gray-500">
            Customize the 4 animated 3D flip card logos in the hero section. Upload custom images or select from preset brand icons.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <div className="px-3.5 py-2 bg-green-50 border border-green-200 text-green-700 font-bold text-xs rounded-xl flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Saved!</span>
            </div>
          )}

          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save All Badges</span>
          </button>
        </div>
      </div>

      {/* 4 Badges Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {badges.map((badge, idx) => {
          const isFlipped = !!activeFlippedCard[badge.id];
          const FrontIcon = getBrandIconBySlug(badge.front.slug);
          const BackIcon = getBrandIconBySlug(badge.back.slug);

          return (
            <div
              key={badge.id || idx}
              className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs space-y-5 flex flex-col justify-between"
            >
              {/* Badge Header & 3D Interactive Preview */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="font-bold text-sm text-gray-900">{badge.label}</h3>
                  <span className="text-[11px] text-gray-400 font-mono">Slot #{idx + 1}</span>
                </div>

                {/* Live 3D Flip Card Interactive Preview */}
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => toggleFlip(badge.id)}
                    className="w-16 h-16 sm:w-20 sm:h-20 perspective-1000 cursor-pointer group"
                    title="Click to preview 3D Flip animation"
                  >
                    <div
                      className={`relative w-full h-full preserve-3d transition-transform duration-700 rounded-2xl shadow-md ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* Front Preview */}
                      <div className="absolute inset-0 w-full h-full bg-white rounded-2xl border-2 border-[#293d67] p-2 flex items-center justify-center backface-hidden">
                        {badge.front.imageUrl ? (
                          <img
                            src={badge.front.imageUrl}
                            alt="Front"
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <FrontIcon className="w-full h-full object-contain" />
                        )}
                      </div>

                      {/* Back Preview */}
                      <div className="absolute inset-0 w-full h-full bg-white rounded-2xl border-2 border-[#293d67] p-2 flex items-center justify-center rotate-y-180 backface-hidden">
                        {badge.back.imageUrl ? (
                          <img
                            src={badge.back.imageUrl}
                            alt="Back"
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <BackIcon className="w-full h-full object-contain" />
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFlip(badge.id)}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    title="Toggle flip view"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Flip</span>
                  </button>
                </div>
              </div>

              {/* Side Editors (Front & Back) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. FRONT SIDE */}
                <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#293d67] uppercase tracking-wider">
                      Side A: Front Logo
                    </span>
                  </div>

                  {/* Name & Target Slug */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Service Name
                    </label>
                    <input
                      type="text"
                      value={badge.front.name}
                      onChange={(e) => handleFieldChange(idx, 'front', 'name', e.target.value)}
                      placeholder="e.g. ChatGPT Plus"
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Link Target Product
                    </label>
                    <select
                      value={badge.front.slug}
                      onChange={(e) => handleFieldChange(idx, 'front', 'slug', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs"
                    >
                      {productsList.map((p) => (
                        <option key={p.id} value={p.slug}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Image Upload / URL */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-[11px] font-semibold text-gray-700">
                      Custom Logo Image
                    </label>

                    <input
                      type="file"
                      ref={(el) => (fileInputRefs.current[`${idx}_front`] = el)}
                      accept="image/*"
                      onChange={(e) => handleFileUpload(idx, 'front', e.target.files?.[0])}
                      className="hidden"
                    />

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[`${idx}_front`]?.click()}
                        className="flex-1 py-1.5 bg-[#293d67] hover:bg-[#1e4cb1] text-white font-semibold text-[11px] rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload File</span>
                      </button>

                      {badge.front.imageUrl && (
                        <button
                          type="button"
                          onClick={() => handleFieldChange(idx, 'front', 'imageUrl', '')}
                          className="px-2 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-[11px] font-bold rounded-lg cursor-pointer"
                          title="Reset to Vector"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <input
                      type="url"
                      value={badge.front.imageUrl}
                      onChange={(e) => handleFieldChange(idx, 'front', 'imageUrl', e.target.value)}
                      placeholder="Or paste direct image URL (https://...)"
                      className="w-full px-2.5 py-1 text-[11px] bg-white border border-gray-300 rounded-lg font-mono text-gray-600"
                    />
                  </div>

                  {/* Quick Preset Icons */}
                  <div className="pt-1">
                    <span className="text-[10px] text-gray-400 font-semibold block mb-1">
                      Or Quick Select Preset:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {presetBrands.slice(0, 6).map((preset) => (
                        <button
                          key={preset.slug}
                          type="button"
                          onClick={() => handleApplyPreset(idx, 'front', preset)}
                          className="px-2 py-0.5 bg-white hover:bg-gray-200 border border-gray-200 rounded text-[10px] font-medium text-gray-700 cursor-pointer"
                        >
                          {preset.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. BACK SIDE */}
                <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#293d67] uppercase tracking-wider">
                      Side B: Back Logo
                    </span>
                  </div>

                  {/* Name & Target Slug */}
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Service Name
                    </label>
                    <input
                      type="text"
                      value={badge.back.name}
                      onChange={(e) => handleFieldChange(idx, 'back', 'name', e.target.value)}
                      placeholder="e.g. Gemini Pro"
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Link Target Product
                    </label>
                    <select
                      value={badge.back.slug}
                      onChange={(e) => handleFieldChange(idx, 'back', 'slug', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs"
                    >
                      {productsList.map((p) => (
                        <option key={p.id} value={p.slug}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Image Upload / URL */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-[11px] font-semibold text-gray-700">
                      Custom Logo Image
                    </label>

                    <input
                      type="file"
                      ref={(el) => (fileInputRefs.current[`${idx}_back`] = el)}
                      accept="image/*"
                      onChange={(e) => handleFileUpload(idx, 'back', e.target.files?.[0])}
                      className="hidden"
                    />

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[`${idx}_back`]?.click()}
                        className="flex-1 py-1.5 bg-[#293d67] hover:bg-[#1e4cb1] text-white font-semibold text-[11px] rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Upload File</span>
                      </button>

                      {badge.back.imageUrl && (
                        <button
                          type="button"
                          onClick={() => handleFieldChange(idx, 'back', 'imageUrl', '')}
                          className="px-2 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-[11px] font-bold rounded-lg cursor-pointer"
                          title="Reset to Vector"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <input
                      type="url"
                      value={badge.back.imageUrl}
                      onChange={(e) => handleFieldChange(idx, 'back', 'imageUrl', e.target.value)}
                      placeholder="Or paste direct image URL (https://...)"
                      className="w-full px-2.5 py-1 text-[11px] bg-white border border-gray-300 rounded-lg font-mono text-gray-600"
                    />
                  </div>

                  {/* Quick Preset Icons */}
                  <div className="pt-1">
                    <span className="text-[10px] text-gray-400 font-semibold block mb-1">
                      Or Quick Select Preset:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {presetBrands.slice(6, 12).map((preset) => (
                        <button
                          key={preset.slug}
                          type="button"
                          onClick={() => handleApplyPreset(idx, 'back', preset)}
                          className="px-2 py-0.5 bg-white hover:bg-gray-200 border border-gray-200 rounded text-[10px] font-medium text-gray-700 cursor-pointer"
                        >
                          {preset.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset to Default Badges</span>
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="px-8 py-3 bg-[#293d67] hover:bg-[#1e4cb1] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save All Floating Badges</span>
        </button>
      </div>
    </div>
  );
};

export default AdminHeroBadges;
