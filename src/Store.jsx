// // src/context/SiteContext.jsx
// import { createContext, useContext, useState, useEffect } from 'react';

// const SiteContext = createContext();

// export const useSite = () => useContext(SiteContext);

// const defaultConfig = {
//   background_color: "#f8f0e6",
//   surface_color: "#fff8ef",
//   text_color: "#3e3226",
//   primary_action_color: "#705338",
//   secondary_action_color: "#7e9479",
//   font_family: "Cormorant Garamond",
//   font_size: 16,
//   brand_name: "Luma Dew",
//   nav_home: "Home",
//   nav_shop: "Shop",
//   nav_cart: "Cart",
//   hero_title: "Skin that looks rested, even when you are not.",
//   hero_body: "A modern skincare line built around hydration, calm, and glow — no ten-step routine required.",
//   primary_button: "Shop now",
//   category_one: "Cleanse & Prep",
//   category_two: "Treat & Target",
//   category_three: "Protect & Moisturise",
//   footer_text: "Vegan formulas. Dermatologist reviewed. Made for daily rituals.",
//   // New dynamic content fields
//   hero_image_url: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop', // default image
//   hero_video_url: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4',
// };

// // Initial product list from site.js
// const defaultProducts = {
//   cleanse: [
//     { id: "c1", name: "Cloud Milk Cleanser", category: "cleanse", price: 28, desc: "Creamy non-strip wash", accent: "linear-gradient(145deg, #f4e5d2, #e9cda9)" },
//     { id: "c2", name: "Gentle Gel Cleanser", category: "cleanse", price: 25, desc: "Light and refreshing", accent: "linear-gradient(145deg, #f0e0c8, #e8d0a0)" }
//   ],
//   treat: [
//     { id: "t1", name: "Dewdrop Serum", category: "treat", price: 42, desc: "Plumping hydration veil", accent: "linear-gradient(145deg, #dfe8d7, #b9c8a9)" },
//     { id: "t2", name: "Essence Toner", category: "treat", price: 38, desc: "Hydrating essence boost", accent: "linear-gradient(145deg, #e5e0d0, #d0c8b0)" }
//   ],
//   protect: [
//     { id: "p1", name: "Cica Sleep Cream", category: "protect", price: 38, desc: "Barrier comfort overnight", accent: "linear-gradient(145deg, #eadfd2, #d8bda0)" },
//     { id: "p2", name: "Rich Moisturizer", category: "protect", price: 45, desc: "Deep nourishing cream", accent: "linear-gradient(145deg, #f0d5c8, #e0b8a0)" }
//   ]
// };

// export const SiteProvider = ({ children }) => {
//   // Load initial state from local storage or defaults
//   const getInitialState = (key, defaultValue) => {
//     try {
//       const storedValue = localStorage.getItem(key);
//       return storedValue ? JSON.parse(storedValue) : defaultValue;
//     } catch (error) {
//       console.error(`Error loading state for ${key}`, error);
//       return defaultValue;
//     }
//   };

//   const [siteConfig, setSiteConfig] = useState(() => getInitialState('siteConfig', defaultConfig));
//   const [products, setProducts] = useState(() => getInitialState('products', defaultProducts));
//   const [cart, setCart] = useState(() => getInitialState('cart', []));
//   const [orders, setOrders] = useState(() => getInitialState('orders', []));
//   const [adminSettings, setAdminSettings] = useState(() => getInitialState('adminSettings', { whatsappNumber: '' }));

//   // Save state to local storage whenever it changes
//   useEffect(() => localStorage.setItem('siteConfig', JSON.stringify(siteConfig)), [siteConfig]);
//   useEffect(() => localStorage.setItem('products', JSON.stringify(products)), [products]);
//   useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
//   useEffect(() => localStorage.setItem('orders', JSON.stringify(orders)), [orders]);
//   useEffect(() => localStorage.setItem('adminSettings', JSON.stringify(adminSettings)), [adminSettings]);

//   // Update site config
//   const updateSiteConfig = (key, value) => {
//     setSiteConfig(prev => ({ ...prev, [key]: value }));
//   };

//   // Add/Delete products
//   const addProduct = (category, product) => {
//     setProducts(prev => ({
//       ...prev,
//       [category]: [...prev[category], { ...product, id: Date.now().toString() }] // Simple dynamic ID
//     }));
//   };

//   const deleteProduct = (category, id) => {
//     setProducts(prev => ({
//       ...prev,
//       [category]: prev[category].filter(p => p.id !== id)
//     }));
//   };

//   // Cart functions
//   const addToCart = (product) => {
//     setCart((prev) => {
//       const existingItem = prev.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prev.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   const updateQuantity = (id, amount) => {
//     setCart((prev) =>
//       prev
//         .map((item) =>
//           item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const removeItem = (id) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const clearCart = () => setCart([]);

//   // Process order
//   const processOrder = (order) => {
//     setOrders((prev) => [...prev, order]);
//     clearCart();
//   };

//   // Update admin settings
//   const updateAdminSettings = (key, value) => {
//     setAdminSettings(prev => ({ ...prev, [key]: value }));
//   };

//   return (
//     <SiteContext.Provider value={{
//       siteConfig, updateSiteConfig,
//       products, addProduct, deleteProduct,
//       cart, addToCart, updateQuantity, removeItem, clearCart,
//       orders, processOrder,
//       adminSettings, updateAdminSettings
//     }}>
//       {children}
//     </SiteContext.Provider>
//   );
// };

// src/context/SiteContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const SiteContext = createContext();

export const useSite = () => useContext(SiteContext);

const defaultConfig = {
  background_color: "#f8f0e6",
  surface_color: "#fff8ef",
  text_color: "#3e3226",
  primary_action_color: "#705338",
  secondary_action_color: "#7e9479",
  font_family: "Cormorant Garamond",
  font_size: 16,
  brand_name: "Luma Dew",
  nav_home: "Home",
  nav_shop: "Shop",
  nav_cart: "Cart",
  hero_title: "Skin that looks rested, even when you are not.",
  hero_body: "A modern skincare line built around hydration, calm, and glow — no ten-step routine required.",
  primary_button: "Shop now",
  category_one: "Cleanse & Prep",
  category_two: "Treat & Target",
  category_three: "Protect & Moisturise",
  footer_text: "Vegan formulas. Dermatologist reviewed. Made for daily rituals.",
  hero_image_url: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop',
  hero_video_url: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4',
};

const defaultProducts = {
  cleanse: [
    { id: "c1", name: "Cloud Milk Cleanser", category: "cleanse", price: 28, desc: "Creamy non-strip wash", accent: "linear-gradient(145deg, #f4e5d2, #e9cda9)" },
    { id: "c2", name: "Gentle Gel Cleanser", category: "cleanse", price: 25, desc: "Light and refreshing", accent: "linear-gradient(145deg, #f0e0c8, #e8d0a0)" }
  ],
  treat: [
    { id: "t1", name: "Dewdrop Serum", category: "treat", price: 42, desc: "Plumping hydration veil", accent: "linear-gradient(145deg, #dfe8d7, #b9c8a9)" },
    { id: "t2", name: "Essence Toner", category: "treat", price: 38, desc: "Hydrating essence boost", accent: "linear-gradient(145deg, #e5e0d0, #d0c8b0)" }
  ],
  protect: [
    { id: "p1", name: "Cica Sleep Cream", category: "protect", price: 38, desc: "Barrier comfort overnight", accent: "linear-gradient(145deg, #eadfd2, #d8bda0)" },
    { id: "p2", name: "Rich Moisturizer", category: "protect", price: 45, desc: "Deep nourishing cream", accent: "linear-gradient(145deg, #f0d5c8, #e0b8a0)" }
  ]
};

export const SiteProvider = ({ children }) => {
  const getInitialState = (key, defaultValue) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error loading state for ${key}`, error);
      return defaultValue;
    }
  };

  const [siteConfig, setSiteConfig] = useState(() => getInitialState('siteConfig', defaultConfig));
  const [products, setProducts] = useState(() => getInitialState('products', defaultProducts));
  const [cart, setCart] = useState(() => getInitialState('cart', []));
  const [orders, setOrders] = useState(() => getInitialState('orders', []));
  const [adminSettings, setAdminSettings] = useState(() => getInitialState('adminSettings', { whatsappNumber: '' }));

  useEffect(() => localStorage.setItem('siteConfig', JSON.stringify(siteConfig)), [siteConfig]);
  useEffect(() => localStorage.setItem('products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('adminSettings', JSON.stringify(adminSettings)), [adminSettings]);

  // Accepts either (key, value) or a plain object to merge
  const updateSiteConfig = (keyOrObject, value) => {
    if (typeof keyOrObject === 'object' && keyOrObject !== null) {
      setSiteConfig(prev => ({ ...prev, ...keyOrObject }));
    } else {
      setSiteConfig(prev => ({ ...prev, [keyOrObject]: value }));
    }
  };

  const addProduct = (category, product) => {
    setProducts(prev => ({
      ...prev,
      [category]: [...prev[category], { ...product, id: Date.now().toString() }]
    }));
  };

  const deleteProduct = (category, id) => {
    setProducts(prev => ({
      ...prev,
      [category]: prev[category].filter(p => p.id !== id)
    }));
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  const processOrder = (order) => {
    setOrders((prev) => [...prev, order]);
    clearCart();
  };

  const updateAdminSettings = (key, value) => {
    setAdminSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SiteContext.Provider value={{
      siteConfig, updateSiteConfig,
      products, addProduct, deleteProduct,
      cart, addToCart, updateQuantity, removeItem, clearCart,
      orders, processOrder,
      adminSettings, updateAdminSettings
    }}>
      {children}
    </SiteContext.Provider>
  );
};
