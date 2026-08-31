import React, { useState, useRef } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Check,
  X,
  Zap,
  Star,
  Layers,
  Sparkles,
  DollarSign,
  Clock,
  ShieldCheck,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Package,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Minus
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { getBrandIconBySlug } from '../../assets/brandIcons';

export const AdminProducts = () => {
  const { productsList, addProduct, updateProduct, deleteProduct } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'in-stock' | 'low-stock' | 'out-of-stock'
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const fileInputRef = useRef(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Streaming',
    price: 499,
    originalPrice: 699,
    shortDescription: '',
    longDescription: '',
    logoUrl: '',
    image: '',
    stock: 50,
    isFlashSale: false,
    isBestSeller: false,
    isCombo: false,
    plans: [
      {
        id: 'p_1',
        name: '1 Month Subscription',
        price: 499,
        originalPrice: 699,
        duration: '1 Month',
        warranty: '28 Days Replacement Warranty'
      }
    ]
  });

  const categories = ['all', 'Streaming', 'AI Tools', 'Software & VPN', 'Design & Tools', 'Combos'];

  // Inventory Statistics
  const totalStockUnits = productsList.reduce((acc, p) => acc + (typeof p.stock === 'number' ? p.stock : 0), 0);
  const inStockCount = productsList.filter(p => (p.stock || 0) > 10).length;
  const lowStockCount = productsList.filter(p => (p.stock || 0) > 0 && (p.stock || 0) <= 10).length;
  const outOfStockCount = productsList.filter(p => (p.stock || 0) <= 0).length;

  const filteredProducts = productsList.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory || (selectedCategory === 'Combos' && p.isCombo);
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesStock = true;
    const s = typeof p.stock === 'number' ? p.stock : 0;
    if (stockFilter === 'in-stock') matchesStock = s > 10;
    if (stockFilter === 'low-stock') matchesStock = s > 0 && s <= 10;
    if (stockFilter === 'out-of-stock') matchesStock = s <= 0;

    return matchesCat && matchesSearch && matchesStock;
  });

  // Handle local file upload (converts to base64 Data URL)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('Image size is too large. Please select an image under 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target.result;
      setFormData(prev => ({
        ...prev,
        logoUrl: base64Url,
        image: base64Url
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setFormData({
      name: '',
      slug: '',
      category: 'Streaming',
      price: 499,
      originalPrice: 699,
      stock: 50,
      shortDescription: '• Instant Delivery on WhatsApp\n• 100% Genuine Access\n• 28-day Replacement Warranty Included',
      longDescription: 'Enjoy premium uninterrupted access with SubSathi. Activated directly on your account or delivered with dedicated login details.',
      logoUrl: '',
      image: '',
      isFlashSale: false,
      isBestSeller: false,
      isCombo: false,
      plans: [
        {
          id: 'plan_1',
          name: '1 Month - Shared Profile',
          price: 499,
          originalPrice: 699,
          duration: '1 Month',
          warranty: '28 Days Replacement Warranty'
        },
        {
          id: 'plan_2',
          name: '1 Month - Private Account',
          price: 999,
          originalPrice: 1499,
          duration: '1 Month',
          warranty: '28 Days Replacement Warranty'
        }
      ]
    });
    setIsEditingModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name || '',
      slug: product.slug || '',
      category: product.category || 'Streaming',
      price: product.price || 499,
      originalPrice: product.originalPrice || (product.price ? product.price * 1.3 : 699),
      stock: typeof product.stock === 'number' ? product.stock : 50,
      shortDescription: product.shortDescription || '',
      longDescription: product.longDescription || '',
      logoUrl: product.logoUrl || product.image || '',
      image: product.image || product.logoUrl || '',
      isFlashSale: !!product.isFlashSale,
      isBestSeller: !!product.isBestSeller,
      isCombo: !!product.isCombo,
      plans: product.plans && product.plans.length > 0 ? product.plans : [
        {
          id: 'p_1',
          name: '1 Month Subscription',
          price: product.price || 499,
          originalPrice: product.originalPrice || 699,
          duration: '1 Month',
          warranty: '28 Days Replacement Warranty'
        }
      ]
    });
    setIsEditingModalOpen(true);
  };

  // Quick inline stock adjustment
  const handleQuickStockChange = (productId, delta) => {
    const product = productsList.find(p => p.id === productId);
    if (!product) return;
    const currentStock = typeof product.stock === 'number' ? product.stock : 0;
    const newStock = Math.max(0, currentStock + delta);
    updateProduct(productId, { stock: newStock });
  };

  const handleDirectStockInput = (productId, newStockValue) => {
    const val = Math.max(0, parseInt(newStockValue, 10) || 0);
    updateProduct(productId, { stock: val });
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Please provide a product title.');
      return;
    }

    const cleanedData = {
      ...formData,
      price: Number(formData.price) || 499,
      originalPrice: Number(formData.originalPrice) || (Number(formData.price) ? Number(formData.price) * 1.3 : 699),
      stock: typeof formData.stock === 'number' ? formData.stock : (parseInt(formData.stock, 10) || 0),
      plans: formData.plans && formData.plans.length > 0 ? formData.plans.map(p => ({
        ...p,
        price: Number(p.price) || Number(formData.price) || 499,
        originalPrice: Number(p.originalPrice) || (Number(p.price) ? Number(p.price) * 1.3 : 699)
      })) : [
        {
          id: 'p_' + Date.now(),
          name: '1 Month Subscription',
          price: Number(formData.price) || 499,
          originalPrice: Number(formData.originalPrice) || 699,
          duration: '1 Month',
          warranty: '28 Days Replacement Warranty'
        }
      ]
    };

    if (editingProductId) {
      updateProduct(editingProductId, cleanedData);
    } else {
      addProduct(cleanedData);
    }

    setIsEditingModalOpen(false);
  };

  // Plan tiers management inside modal
  const handleAddPlan = () => {
    const newPlan = {
      id: 'plan_' + Date.now(),
      name: '1 Year Plan',
      price: formData.price * 2.5,
      originalPrice: formData.price * 3.5,
      duration: '12 Months',
      warranty: 'Full 1-Year Replacement Warranty'
    };
    setFormData(prev => ({ ...prev, plans: [...prev.plans, newPlan] }));
  };

  const handleUpdatePlan = (index, field, value) => {
    const updated = [...formData.plans];
    updated[index][field] = field === 'price' || field === 'originalPrice' ? Number(value) : value;
    setFormData(prev => ({ ...prev, plans: updated }));
  };

  const handleRemovePlan = (index) => {
    if (formData.plans.length <= 1) {
      alert('A product must have at least one subscription plan.');
      return;
    }
    const updated = formData.plans.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, plans: updated }));
  };

  const handleDelete = (productId, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from your store catalog?`)) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="space-y-6 font-poppins animate-in fade-in duration-200">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#293d67]" />
            <span>Products & Stock Management ({productsList.length})</span>
          </h2>
          <p className="text-xs text-gray-500">
            Control product stock quantities, upload brand photos, edit pricing tiers, and configure flash sales.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Stock & Inventory Overview KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <button
          onClick={() => setStockFilter('all')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            stockFilter === 'all'
              ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-400/20'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-gray-500">Total Stock</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-black text-gray-900 font-inter">{totalStockUnits}</div>
          <div className="text-[11px] text-gray-500 font-medium">Units across {productsList.length} items</div>
        </button>

        <button
          onClick={() => setStockFilter('in-stock')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            stockFilter === 'in-stock'
              ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-400/20'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-gray-500">In Stock (&gt;10)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-emerald-600 font-inter">{inStockCount}</div>
          <div className="text-[11px] text-gray-500 font-medium">Ready for instant delivery</div>
        </button>

        <button
          onClick={() => setStockFilter('low-stock')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            stockFilter === 'low-stock'
              ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/20'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-gray-500">Low Stock (&le;10)</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-black text-amber-600 font-inter">{lowStockCount}</div>
          <div className="text-[11px] text-gray-500 font-medium">Need restocking soon</div>
        </button>

        <button
          onClick={() => setStockFilter('out-of-stock')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            stockFilter === 'out-of-stock'
              ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400/20'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-gray-500">Out of Stock (0)</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-xl font-black text-rose-600 font-inter">{outOfStockCount}</div>
          <div className="text-[11px] text-gray-500 font-medium">Shown as unavailable</div>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#293d67] text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subscriptions..."
            className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-gray-200 text-xs focus:border-[#293d67] outline-hidden shadow-xs"
          />
        </div>
      </div>

      {/* Products Grid Table with Stock Editing Controls */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4">Photo / Logo</th>
                <th className="p-4">Service Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Starting Price</th>
                <th className="p-4">Stock In Store</th>
                <th className="p-4">Plans Available</th>
                <th className="p-4">Badges</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => {
                const IconComponent = getBrandIconBySlug(product.slug);
                const stock = typeof product.stock === 'number' ? product.stock : 0;
                const isOutOfStock = stock <= 0;
                const isLowStock = stock > 0 && stock <= 10;

                return (
                  <tr key={product.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 p-1.5 flex items-center justify-center shrink-0">
                        {product.logoUrl || product.image ? (
                          <img
                            src={product.logoUrl || product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <IconComponent className="w-7 h-7" />
                        )}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-gray-900 text-sm">{product.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono">/{product.slug}</div>
                    </td>

                    <td className="p-4">
                      <span className="bg-gray-100 text-gray-700 font-bold px-2 py-0.5 rounded text-[11px]">
                        {product.category}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-gray-900 font-inter text-sm">
                        Rs. {product.price}
                      </div>
                      {product.originalPrice > product.price && (
                        <div className="text-[10px] text-gray-400 line-through font-inter">
                          Rs. {product.originalPrice}
                        </div>
                      )}
                    </td>

                    {/* Stock Quick Management Column */}
                    <td className="p-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          {isOutOfStock ? (
                            <span className="bg-red-100 text-red-700 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                              Out of Stock
                            </span>
                          ) : isLowStock ? (
                            <span className="bg-amber-100 text-amber-700 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                              Low Stock ({stock})
                            </span>
                          ) : (
                            <span className="bg-emerald-100 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              In Stock ({stock})
                            </span>
                          )}
                        </div>

                        {/* Quick stock stepper controls */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleQuickStockChange(product.id, -1)}
                            className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs cursor-pointer"
                            title="Decrease Stock (-1)"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <input
                            type="number"
                            value={stock}
                            onChange={(e) => handleDirectStockInput(product.id, e.target.value)}
                            className="w-14 px-1.5 py-0.5 text-center font-mono font-bold text-xs bg-white border border-gray-200 rounded focus:border-[#293d67] outline-hidden"
                            title="Directly edit stock"
                          />

                          <button
                            type="button"
                            onClick={() => handleQuickStockChange(product.id, 1)}
                            className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs cursor-pointer"
                            title="Increase Stock (+1)"
                          >
                            <Plus className="w-3 h-3" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleQuickStockChange(product.id, 10)}
                            className="px-1.5 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px] cursor-pointer"
                            title="Quick Refill +10"
                          >
                            +10
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="text-gray-700 font-medium">
                        {product.plans?.length || 1} plan tiers
                      </span>
                      <div className="text-[10px] text-gray-400">
                        {product.plans?.map(p => p.name).slice(0, 2).join(', ')}...
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {product.isFlashSale && (
                          <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <Zap className="w-2.5 h-2.5 fill-current" /> Flash
                          </span>
                        )}
                        {product.isBestSeller && (
                          <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-current" /> Best
                          </span>
                        )}
                        {product.isCombo && (
                          <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-1.5 py-0.2 rounded">
                            Combo
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg cursor-pointer transition-colors"
                          title="Edit product, photo, stock & plans"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg cursor-pointer transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Full Modal */}
      {isEditingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border border-gray-100 my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-gray-900">
                  {editingProductId ? 'Edit Subscription & Stock' : 'Add New Subscription'}
                </h3>
                <p className="text-xs text-gray-500">
                  Fill in the brand photo, pricing, available stock units, and warranty info.
                </p>
              </div>
              <button
                onClick={() => setIsEditingModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              {/* Product Photo Upload Section */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Product / Brand Photo (CMS Image Feature)
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Live Image Preview */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border border-gray-300 p-2 flex flex-col items-center justify-center relative shadow-xs shrink-0">
                    {formData.logoUrl || formData.image ? (
                      <>
                        <img
                          src={formData.logoUrl || formData.image}
                          alt="Preview"
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => { e.target.src = '/logo.svg'; }}
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, logoUrl: '', image: '' })}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 shadow-xs cursor-pointer"
                          title="Remove Image"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <div className="text-center text-gray-400 space-y-1">
                        <ImageIcon className="w-8 h-8 mx-auto opacity-50" />
                        <span className="text-[10px] font-semibold block">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Actions & URL input */}
                  <div className="flex-1 w-full space-y-2 text-xs">
                    
                    {/* Direct Upload button */}
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-[#293d67] hover:bg-[#1e4cb1] text-white font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Photo from Device (PNG / JPG / SVG)</span>
                      </button>
                    </div>

                    {/* Or URL input */}
                    <div className="relative">
                      <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="url"
                        value={formData.logoUrl}
                        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value, image: e.target.value })}
                        placeholder="Or paste direct image URL (https://...)"
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Product / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData({
                        ...formData,
                        name: val,
                        slug: editingProductId ? formData.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                      });
                    }}
                    placeholder="e.g. YouTube Premium"
                    className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    URL Slug (auto-generated)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. youtube-premium"
                    className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl font-mono text-gray-600 focus:border-[#293d67] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Store Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden"
                  >
                    <option value="Streaming">Streaming (OTT)</option>
                    <option value="AI Tools">AI Tools</option>
                    <option value="Software & VPN">Software & VPN</option>
                    <option value="Design & Tools">Design & Tools</option>
                  </select>
                </div>

                {/* Stock Quantity Editor in Modal */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Stock Quantity in Store *
                  </label>
                  <div className="space-y-1.5">
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: Math.max(0, parseInt(e.target.value, 10) || 0) })}
                      placeholder="e.g. 50"
                      className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden font-mono font-bold"
                    />
                    
                    {/* Quick Stock Setter Chips */}
                    <div className="flex flex-wrap gap-1">
                      {[0, 10, 25, 50, 100, 500].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setFormData({ ...formData, stock: val })}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                            formData.stock === val
                              ? 'bg-[#293d67] text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {val === 0 ? 'Out of Stock (0)' : val === 500 ? '500+' : val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Starting Price (Rs.) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden font-inter font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Original Price (Rs.)
                    </label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden font-inter text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Badges Toggles */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-wrap gap-4 text-xs font-bold">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFlashSale}
                    onChange={(e) => setFormData({ ...formData, isFlashSale: e.target.checked })}
                    className="rounded text-red-600 focus:ring-0"
                  />
                  <span>⚡ Flash Sale (Countdown)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                  <span>⭐ Best Seller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isCombo}
                    onChange={(e) => setFormData({ ...formData, isCombo: e.target.checked })}
                    className="rounded text-purple-600 focus:ring-0"
                  />
                  <span>🎁 Combo Bundle</span>
                </label>
              </div>

              {/* Plan Tiers Builder */}
              <div className="border border-gray-200 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Subscription Plans / Tiers ({formData.plans.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddPlan}
                    className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Plan Option</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {formData.plans.map((plan, idx) => (
                    <div key={plan.id || idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          value={plan.name}
                          onChange={(e) => handleUpdatePlan(idx, 'name', e.target.value)}
                          placeholder="Plan name (e.g. 1 Month Private)"
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded-lg font-bold"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <input
                          type="number"
                          value={plan.price}
                          onChange={(e) => handleUpdatePlan(idx, 'price', e.target.value)}
                          placeholder="Price (Rs.)"
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded-lg font-bold text-blue-600"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          value={plan.warranty}
                          onChange={(e) => handleUpdatePlan(idx, 'warranty', e.target.value)}
                          placeholder="Warranty (e.g. 28 Days)"
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="sm:col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemovePlan(idx)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Bullet Features (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="• 4K Ultra HD Streaming&#10;• Instant Activation&#10;• Full Replacement Guarantee"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:border-[#293d67] outline-hidden font-mono"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditingModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-colors"
                >
                  {editingProductId ? 'Save Product & Stock' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
