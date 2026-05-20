// src/pages/AdminPage.jsx
import { useState, useEffect, useRef } from 'react';
import { useSite } from '../Store';
import { 
  PlusCircle, ShoppingBag, MessageSquare, AlertCircle, ShieldAlert,
  Save, Image, Video, Type, Upload, X, Phone, CheckCircle
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdminPage() {
  const { 
    siteConfig, updateSiteConfig, products, addProduct, 
    deleteProduct, adminSettings, updateAdminSettings 
  } = useSite();

  const [activeTab, setActiveTab] = useState('orders');
  const [newProd, setNewProd] = useState({ name: '', price: '', desc: '', category: 'cleanse', accent: '' });

  // --- BACKEND STATE ---
  const [orders, setOrders] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- SITE CONTENT STATE ---
  const [contentForm, setContentForm] = useState({
    hero_title: '',
    hero_body: '',
    primary_button: '',
    hero_image_url: '',
    hero_video_url: '',
  });
  const [contentSaving, setContentSaving] = useState(false);
  const [contentSaved, setContentSaved] = useState(false);

  // File input refs
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    const fetchBackendOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/api/orders`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 403) {
          setIsAuthorized(false);
          setLoading(false);
          return;
        }

        if (!response.ok) throw new Error('Could not authorize admin access.');

        const data = await response.json();
        setOrders(data.orders || []);
        setIsAuthorized(true);
      } catch (error) {
        console.error('Connection error:', error);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    fetchBackendOrders();
  }, []);

  // Populate content form from existing siteConfig
  useEffect(() => {
    if (siteConfig) {
      setContentForm({
        hero_title: siteConfig.hero_title || '',
        hero_body: siteConfig.hero_body || '',
        primary_button: siteConfig.primary_button || '',
        hero_image_url: siteConfig.hero_image_url || '',
        hero_video_url: siteConfig.hero_video_url || '',
      });
    }
  }, [siteConfig]);

  // Convert a local file to a base64 data URL
  const fileToDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setContentForm(prev => ({ ...prev, hero_image_url: dataUrl }));
    } catch {
      alert('Failed to read image file.');
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setContentForm(prev => ({ ...prev, hero_video_url: dataUrl }));
    } catch {
      alert('Failed to read video file.');
    }
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) {
      alert('Product Name and Price are mandatory.');
      return;
    }
    const priceNum = parseFloat(newProd.price);
    addProduct(newProd.category, {
      name: newProd.name,
      price: isNaN(priceNum) ? 0 : priceNum,
      desc: newProd.desc,
      category: newProd.category,
      accent: newProd.accent || undefined
    });
    setNewProd({ name: '', price: '', desc: '', category: 'cleanse', accent: '' });
  };

  const handleContentSave = (e) => {
    e.preventDefault();
    setContentSaving(true);
    try {
      // Update store directly — persisted via localStorage in Store.jsx
      updateSiteConfig(contentForm);
      setContentSaved(true);
      setTimeout(() => setContentSaved(false), 3000);
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save content. Please try again.');
    } finally {
      setContentSaving(false);
    }
  };

  const manualWhatsAppTrigger = (order) => {
    const customerMessage = `Hello ${order.name}, your order for [${order.items.join(', ')}] totaling $${order.total.toFixed(2)} has been acknowledged!`;
    const encodedCustomer = encodeURIComponent(customerMessage);
    window.open(`https://wa.me/${order.phone}?text=${encodedCustomer}`, '_blank');

    // Also notify admin if a WhatsApp number is configured
    const adminNumber = adminSettings.whatsappNumber?.replace(/\D/g, '');
    if (adminNumber) {
      const adminMessage = `New Order Alert!
Customer: ${order.name}
Phone: ${order.phone}
Email: ${order.email}
Address: ${order.address}, ${order.city} ${order.postcode}
Items: ${order.items.join(', ')}
Total: $${order.total.toFixed(2)}`;
      const encodedAdmin = encodeURIComponent(adminMessage);
      setTimeout(() => window.open(`https://wa.me/${adminNumber}?text=${encodedAdmin}`, '_blank'), 500);
    }
  };

  // --- LOADING SCREEN ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f0e6]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600 font-medium">Validating Admin Terminal IP Whitelist...</p>
        </div>
      </div>
    );
  }

  // --- RESTRICTED SCREEN ---
  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-[#f8f0e6] flex flex-col justify-between">
        <Header />
        <section className="max-w-xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex p-4 bg-red-50 rounded-full text-red-600 mb-6 border border-red-200 shadow-sm animate-pulse">
            <ShieldAlert className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">Access Restricted</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            This computer's current connection address is not authorized to interact with the administrative dashboard resources.
          </p>
          <div className="bg-white/80 backdrop-blur border border-red-100 rounded-2xl p-4 text-xs text-left text-gray-500 shadow-inner">
            <div className="flex gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-gray-700 block mb-1">How do I authorize this terminal?</span>
                Copy your network IP address and append it directly into your backend's <code className="bg-gray-100 px-1 py-0.5 rounded text-red-600 font-mono font-bold">.env</code> configuration file under the <code className="bg-gray-100 px-1 py-0.5 rounded font-mono font-bold">ALLOWED_IPS</code> variable string.
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // --- AUTHORIZED DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#f8f0e6] flex flex-col justify-between">
      <Header />

      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-10 flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Command Surface</h1>
            <p className="text-sm text-gray-500">Secure backend database link active.</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-white/60 backdrop-blur p-1 rounded-2xl border shadow-sm">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${activeTab === 'orders' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Live Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${activeTab === 'products' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Add Products
            </button>
            <button
              onClick={() => setActiveTab('site')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${activeTab === 'site' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Site Content
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${activeTab === 'settings' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Tab 1: Live Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Admin WhatsApp number notice */}
            {!adminSettings.whatsappNumber && (
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 text-sm text-amber-800">
                <Phone className="w-4 h-4 shrink-0 text-amber-500" />
                <span>No admin WhatsApp number set. Go to <button type="button" onClick={() => setActiveTab('settings')} className="font-semibold underline underline-offset-2">Settings</button> to add one so order alerts are forwarded to you.</span>
              </div>
            )}
            {adminSettings.whatsappNumber && (
              <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3 text-sm text-emerald-800">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>Order alerts will be forwarded to <strong>{adminSettings.whatsappNumber}</strong> on every Forward WhatsApp action.</span>
              </div>
            )}
          <div className="bg-white/80 backdrop-blur rounded-[2rem] border shadow-sm overflow-hidden p-6">
            <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-gray-800">
              <ShoppingBag className="w-5 h-5 text-emerald-600" /> System Order Feed
            </h3>
            {orders.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">No transactions registered inside the SQLite database yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 border-collapse">
                  <thead>
                    <tr className="border-b text-xs uppercase tracking-wider text-gray-400 bg-gray-50/50">
                      <th className="p-4 font-semibold">Customer Details</th>
                      <th className="p-4 font-semibold">Delivery Destination</th>
                      <th className="p-4 font-semibold">Items Purchased</th>
                      <th className="p-4 font-semibold">Revenue</th>
                      <th className="p-4 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <p className="font-semibold text-gray-900 leading-none">{order.name}</p>
                          <p className="text-xs text-gray-400 mt-1">{order.email}</p>
                          <p className="text-xs text-gray-400">{order.phone}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-700 leading-tight">{order.address}</p>
                          <p className="text-xs text-gray-500">{order.city}, {order.postcode}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-xs text-gray-600 font-medium line-clamp-2 max-w-[220px]">
                            {Array.isArray(order.items) ? order.items.join(', ') : order.items}
                          </p>
                          <span className="text-[10px] text-gray-400 block mt-0.5">{order.created_at || order.date}</span>
                        </td>
                        <td className="p-4 font-mono font-bold text-gray-900">${parseFloat(order.total).toFixed(2)}</td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition shadow-sm"
                            onClick={() => manualWhatsAppTrigger(order)}
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> Forward WhatsApp
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          </div>
        )}

        {/* Tab 2: Add Products */}
        {activeTab === 'products' && (
          <div className="max-w-xl mx-auto bg-white/80 backdrop-blur rounded-[2rem] border shadow-sm p-6 sm:p-8">
            <h3 className="font-semibold text-xl mb-6 text-gray-800 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-gray-700" /> Create Database Product Listing
            </h3>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Item Name</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g. Balancing Face Mist"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Price ($ USD)</label>
                  <input
                    type="number" step="0.01"
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="24.00"
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Category Placement</label>
                  <select
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  >
                    <option value="cleanse">Cleanse & Prep</option>
                    <option value="treat">Treat & Target</option>
                    <option value="protect">Protect & Moisturise</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description Summary</label>
                <textarea
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="Brief summary of ingredients or benefits..."
                  value={newProd.desc}
                  onChange={(e) => setNewProd({ ...newProd, desc: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-gray-900 text-white font-semibold py-4 mt-2 transition hover:bg-gray-800 shadow-sm"
              >
                Publish to Live Catalog
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Site Content Editor */}
        {activeTab === 'site' && (
          <div className="max-w-2xl mx-auto space-y-6">

            {/* About Section Text */}
            <div className="bg-white/80 backdrop-blur rounded-[2rem] border shadow-sm p-6 sm:p-8">
              <h3 className="font-semibold text-lg mb-5 text-gray-800 flex items-center gap-2">
                <Type className="w-4 h-4 text-[#705338]" /> About Section Text
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Headline</label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Skin that looks rested, even when you are not."
                    value={contentForm.hero_title}
                    onChange={(e) => setContentForm({ ...contentForm, hero_title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Body Text</label>
                  <textarea
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="A modern skincare line built around hydration, calm, and glow..."
                    value={contentForm.hero_body}
                    onChange={(e) => setContentForm({ ...contentForm, hero_body: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Button Label</label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Shop now"
                    value={contentForm.primary_button}
                    onChange={(e) => setContentForm({ ...contentForm, primary_button: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Skincare Adv Image Upload */}
            <div className="bg-white/80 backdrop-blur rounded-[2rem] border shadow-sm p-6 sm:p-8">
              <h3 className="font-semibold text-lg mb-5 text-gray-800 flex items-center gap-2">
                <Image className="w-4 h-4 text-[#705338]" /> Skincare Adv Image
              </h3>

              {/* Hidden file input */}
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              {contentForm.hero_image_url ? (
                <div className="relative rounded-xl overflow-hidden border border-gray-100 h-48 group">
                  <img
                    src={contentForm.hero_image_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => imageInputRef.current.click()}
                      className="px-3 py-2 bg-white text-gray-900 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" /> Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => setContentForm(prev => ({ ...prev, hero_image_url: '' }))}
                      className="px-3 py-2 bg-red-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => imageInputRef.current.click()}
                  className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center gap-3 text-gray-400 hover:border-[#705338] hover:text-[#705338] transition"
                >
                  <Upload className="w-8 h-8" />
                  <span className="text-sm font-medium">Click to upload from your gallery</span>
                  <span className="text-xs">JPG, PNG, WEBP supported</span>
                </button>
              )}
            </div>

            {/* Video Upload */}
            <div className="bg-white/80 backdrop-blur rounded-[2rem] border shadow-sm p-6 sm:p-8">
              <h3 className="font-semibold text-lg mb-5 text-gray-800 flex items-center gap-2">
                <Video className="w-4 h-4 text-[#705338]" /> Routine Video
              </h3>

              {/* Hidden file input */}
              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/webm,video/ogg"
                className="hidden"
                onChange={handleVideoUpload}
              />

              {contentForm.hero_video_url ? (
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden border border-gray-100">
                    <video
                      key={contentForm.hero_video_url}
                      className="w-full rounded-xl bg-black aspect-video"
                      controls
                    >
                      <source src={contentForm.hero_video_url} type="video/mp4" />
                    </video>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => videoInputRef.current.click()}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition"
                    >
                      <Upload className="w-3.5 h-3.5" /> Replace Video
                    </button>
                    <button
                      type="button"
                      onClick={() => setContentForm(prev => ({ ...prev, hero_video_url: '' }))}
                      className="px-3 py-2 border border-red-200 text-red-500 rounded-xl text-xs font-semibold hover:bg-red-50 flex items-center gap-1.5 transition"
                    >
                      <X className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => videoInputRef.current.click()}
                  className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center gap-3 text-gray-400 hover:border-[#705338] hover:text-[#705338] transition"
                >
                  <Upload className="w-8 h-8" />
                  <span className="text-sm font-medium">Click to upload from your gallery</span>
                  <span className="text-xs">MP4, WEBM, OGG supported</span>
                </button>
              )}
            </div>

            {/* Save Button */}
            <button
              onClick={handleContentSave}
              disabled={contentSaving}
              className={`w-full rounded-full font-semibold py-4 transition shadow-sm flex items-center justify-center gap-2 text-sm
                ${contentSaved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
                } disabled:opacity-60`}
            >
              <Save className="w-4 h-4" />
              {contentSaving ? 'Saving...' : contentSaved ? 'Saved Successfully!' : 'Save Site Content'}
            </button>

          </div>
        )}

        {/* Tab 4: Settings */}
        {activeTab === 'settings' && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="bg-white/80 backdrop-blur rounded-[2rem] border shadow-sm p-6 sm:p-8">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#705338]" /> Admin WhatsApp Number
              </h3>
              <p className="text-xs text-gray-400 mb-5">When set, every "Forward WhatsApp" action on an order will open a second WhatsApp message pre-filled with the full order details, directed to this number.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">WhatsApp Number (with country code)</label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      className="flex-1 rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                      placeholder="e.g. 2348012345678"
                      value={adminSettings.whatsappNumber || ''}
                      onChange={(e) => updateAdminSettings('whatsappNumber', e.target.value)}
                    />
                    {adminSettings.whatsappNumber && (
                      <button
                        type="button"
                        onClick={() => updateAdminSettings('whatsappNumber', '')}
                        className="px-3 py-2 border border-red-200 text-red-500 rounded-xl text-xs font-semibold hover:bg-red-50 flex items-center gap-1.5 transition"
                      >
                        <X className="w-3.5 h-3.5" /> Clear
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Include country code without + or spaces. Example: Nigeria (+234) → 2348012345678</p>
                </div>
                {adminSettings.whatsappNumber && (
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-700">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    Active — order alerts will forward to <strong className="ml-1">{adminSettings.whatsappNumber}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
}
