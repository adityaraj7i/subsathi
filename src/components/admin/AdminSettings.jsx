import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  RotateCcw,
  Download,
  Upload,
  Lock,
  Phone,
  Building,
  CreditCard,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const AdminSettings = () => {
  const {
    storeConfig,
    updateStoreConfig,
    resetToFactoryDefaults,
    productsList,
    orders,
    couponsList
  } = useCart();

  const [settings, setSettings] = useState({
    name: storeConfig.name || 'SubSathi',
    tagline: storeConfig.tagline || "Nepal's Ultimate Hub for Premium Digital Subscriptions",
    phone: storeConfig.phone || '+977 9744723372',
    whatsappNumber: storeConfig.whatsappNumber || '9779744723372',
    email: storeConfig.email || 'support@subsathi.com',
    address: storeConfig.address || 'Putalisadak, Kathmandu, Nepal',
    hours: storeConfig.hours || '24/7 Online Instant Support & Fast Delivery',
    adminPassword: storeConfig.adminPassword || 'Aryan7834#$2&*',
    paymentDetails: {
      esewa: {
        id: storeConfig.paymentDetails?.esewa?.id || '9744723372',
        name: storeConfig.paymentDetails?.esewa?.name || 'SUBSATHI ENTERPRISE'
      },
      khalti: {
        id: storeConfig.paymentDetails?.khalti?.id || '9744723372',
        name: storeConfig.paymentDetails?.khalti?.name || 'SUBSATHI SERVICES'
      },
      bank: {
        bankName: storeConfig.paymentDetails?.bank?.bankName || 'Nabil Bank Ltd',
        accountName: storeConfig.paymentDetails?.bank?.accountName || 'SUBSATHI DIGITAL SERVICES PVT. LTD.',
        accountNumber: storeConfig.paymentDetails?.bank?.accountNumber || '01201017500999',
        branch: storeConfig.paymentDetails?.bank?.branch || 'Putalisadak Branch'
      }
    }
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (storeConfig) {
      setSettings({
        name: storeConfig.name || 'SubSathi',
        tagline: storeConfig.tagline || "Nepal's Ultimate Hub for Premium Digital Subscriptions",
        phone: storeConfig.phone || '+977 9744723372',
        whatsappNumber: storeConfig.whatsappNumber || '9779744723372',
        email: storeConfig.email || 'support@subsathi.com',
        address: storeConfig.address || 'Putalisadak, Kathmandu, Nepal',
        hours: storeConfig.hours || '24/7 Online Instant Support & Fast Delivery',
        adminPassword: storeConfig.adminPassword || 'Aryan7834#$2&*',
        paymentDetails: {
          esewa: {
            id: storeConfig.paymentDetails?.esewa?.id || '9744723372',
            name: storeConfig.paymentDetails?.esewa?.name || 'SUBSATHI ENTERPRISE'
          },
          khalti: {
            id: storeConfig.paymentDetails?.khalti?.id || '9744723372',
            name: storeConfig.paymentDetails?.khalti?.name || 'SUBSATHI SERVICES'
          },
          bank: {
            bankName: storeConfig.paymentDetails?.bank?.bankName || 'Nabil Bank Ltd',
            accountName: storeConfig.paymentDetails?.bank?.accountName || 'SUBSATHI DIGITAL SERVICES PVT. LTD.',
            accountNumber: storeConfig.paymentDetails?.bank?.accountNumber || '01201017500999',
            branch: storeConfig.paymentDetails?.bank?.branch || 'Putalisadak Branch'
          }
        }
      });
    }
  }, [storeConfig]);

  const handleSave = (e) => {
    e.preventDefault();
    updateStoreConfig(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportFullBackup = () => {
    const fullBackup = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      storeConfig: settings,
      products: productsList,
      orders,
      coupons: couponsList
    };

    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subsathi_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleResetFactory = () => {
    if (window.confirm('WARNING: Are you sure you want to reset all store data to factory defaults? This will restore original products, payments and settings.')) {
      resetToFactoryDefaults();
      alert('Store data restored to factory defaults!');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 font-poppins animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#293d67]" />
            <span>Storefront Settings & Payment Gateway Config</span>
          </h2>
          <p className="text-xs text-gray-500">
            Control store brand identity, customer WhatsApp phone, and eSewa / Khalti / Bank receiver accounts.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 bg-green-50 border border-green-200 text-green-700 font-bold text-xs rounded-xl flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Store Identity */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
            1. Brand Identity & Contact
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Store Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Display Phone Number (e.g. +977 9744723372)
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                WhatsApp Digits for wa.me Link (e.g. 9779744723372)
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-xl font-mono text-green-700 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Support Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Office Address / Location</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Payment Gateways (eSewa / Khalti / Bank) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>2. Payment Gateways & QR Receiver Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            {/* eSewa */}
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
              <span className="font-bold text-emerald-800 text-xs block">eSewa Wallet Setup</span>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">eSewa ID (Phone / Email)</label>
                <input
                  type="text"
                  value={settings.paymentDetails.esewa.id}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      paymentDetails: {
                        ...settings.paymentDetails,
                        esewa: { ...settings.paymentDetails.esewa, id: e.target.value }
                      }
                    })
                  }
                  className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Account / Merchant Name</label>
                <input
                  type="text"
                  value={settings.paymentDetails.esewa.name}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      paymentDetails: {
                        ...settings.paymentDetails,
                        esewa: { ...settings.paymentDetails.esewa, name: e.target.value }
                      }
                    })
                  }
                  className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg font-semibold"
                />
              </div>
            </div>

            {/* Khalti */}
            <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200 space-y-2">
              <span className="font-bold text-purple-800 text-xs block">Khalti Wallet Setup</span>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Khalti ID (Phone)</label>
                <input
                  type="text"
                  value={settings.paymentDetails.khalti.id}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      paymentDetails: {
                        ...settings.paymentDetails,
                        khalti: { ...settings.paymentDetails.khalti, id: e.target.value }
                      }
                    })
                  }
                  className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Account Name</label>
                <input
                  type="text"
                  value={settings.paymentDetails.khalti.name}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      paymentDetails: {
                        ...settings.paymentDetails,
                        khalti: { ...settings.paymentDetails.khalti, name: e.target.value }
                      }
                    })
                  }
                  className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg font-semibold"
                />
              </div>
            </div>

            {/* Bank Transfer */}
            <div className="sm:col-span-2 p-4 bg-blue-50/60 rounded-xl border border-blue-200 space-y-3">
              <span className="font-bold text-[#293d67] text-xs block flex items-center gap-1">
                <Building className="w-4 h-4" /> Bank Transfer & Mobile Banking Setup
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Bank Name</label>
                  <input
                    type="text"
                    value={settings.paymentDetails.bank.bankName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        paymentDetails: {
                          ...settings.paymentDetails,
                          bank: { ...settings.paymentDetails.bank, bankName: e.target.value }
                        }
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Account Number</label>
                  <input
                    type="text"
                    value={settings.paymentDetails.bank.accountNumber}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        paymentDetails: {
                          ...settings.paymentDetails,
                          bank: { ...settings.paymentDetails.bank, accountNumber: e.target.value }
                        }
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Account Holder Name</label>
                  <input
                    type="text"
                    value={settings.paymentDetails.bank.accountName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        paymentDetails: {
                          ...settings.paymentDetails,
                          bank: { ...settings.paymentDetails.bank, accountName: e.target.value }
                        }
                      })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Admin Passcode */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-700" />
            <span>3. Admin Security Passkey</span>
          </h3>

          <div className="max-w-xs text-xs">
            <label className="block font-bold text-gray-700 mb-1">
              Admin Password
            </label>
            <input
              type="text"
              value={settings.adminPassword}
              onChange={(e) => setSettings({ ...settings, adminPassword: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-300 rounded-xl font-mono font-bold text-gray-800"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="px-8 py-3 bg-[#293d67] hover:bg-[#1e4cb1] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Storefront Changes</span>
          </button>
        </div>
      </form>

      {/* Section 4: Data Backup & Reset */}
      <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
          4. Store Database Backup & Disaster Recovery
        </h3>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-bold text-xs text-gray-800">Export Store Data (JSON)</div>
            <p className="text-[11px] text-gray-500">Download a complete backup of all products, orders, customers, and coupons.</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleExportFullBackup}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON Backup</span>
            </button>

            <button
              onClick={handleResetFactory}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer border border-red-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Factory Defaults</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
