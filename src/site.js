
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
      footer_text: "Vegan formulas. Dermatologist reviewed. Made for daily rituals."
    };

    const products = {
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

    let cart = [];
    let orders = [];
    let currentPage = 'home';
    window.activeCategory = null;

    function getConfigValue(config, key) {
      return config[key] || defaultConfig[key];
    }

    function navigateTo(page) {
      currentPage = page;
      document.getElementById('homePage').style.display = page === 'home' ? 'block' : 'none';
      document.getElementById('shopPage').style.display = page === 'shop' ? 'block' : 'none';
      document.getElementById('cartPage').style.display = page === 'cart' ? 'block' : 'none';

      if (page === 'shop') {
        renderProducts();
      } else if (page === 'cart') {
        renderCart();
        renderOrders();
      }

      if (window.lucide) lucide.createIcons();
      window.scrollTo(0, 0);
    }

    function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      const button = document.getElementById('menuButton');
      const isOpen = menu.classList.contains('mobile-menu-open');
      menu.classList.toggle('mobile-menu-open', !isOpen);
      menu.classList.toggle('mobile-menu-closed', isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));
    }

    function renderProducts() {
      // Render products in category sections
      const cleanseGrid = document.getElementById('cleanseGrid');
      const treatGrid = document.getElementById('treatGrid');
      const protectGrid = document.getElementById('protectGrid');
      
      cleanseGrid.innerHTML = '';
      treatGrid.innerHTML = '';
      protectGrid.innerHTML = '';

      const renderProductCard = (product, container) => {
        const article = document.createElement('article');
        article.className = 'product-card rounded-[2rem] border p-3 transition hover:-translate-y-1';
        article.innerHTML = `
          <div class="h-48 rounded-[1.75rem] flex items-center justify-center" style="background:${product.accent}">
            <div class="w-20 h-36 rounded-[2rem] border shadow-xl flex flex-col items-center justify-between py-5" style="background:rgba(255,248,239,0.68);">
              <div class="w-9 h-5 rounded-b-xl border"></div>
              <div class="w-10 h-10 rounded-full border flex items-center justify-center">
                <i data-lucide="sparkle" class="w-5 h-5"></i>
              </div>
            </div>
          </div>
          <div class="p-3">
            <div class="flex items-start justify-between gap-3 mt-2">
              <div>
                <h3 class="font-semibold leading-tight">${product.name}</h3>
                <p class="text-sm opacity-70 mt-2">${product.desc}</p>
              </div>
              <p class="font-semibold">$${product.price}</p>
            </div>
            <button type="button" class="add-button mt-5 w-full rounded-full px-4 py-3 font-semibold inline-flex items-center justify-center gap-2" data-id="${product.id}" onclick="addToCart('${product.id}')">
              Add to cart <i data-lucide="plus" class="w-4 h-4"></i>
            </button>
          </div>
        `;
        container.appendChild(article);
      };

      products.cleanse.forEach(product => renderProductCard(product, cleanseGrid));
      products.treat.forEach(product => renderProductCard(product, treatGrid));
      products.protect.forEach(product => renderProductCard(product, protectGrid));

      if (window.lucide) lucide.createIcons();
      applyCurrentTheme();
    }

    function findProduct(id) {
      for (let category in products) {
        const found = products[category].find(p => p.id === id);
        if (found) return found;
      }
      return null;
    }

    function addToCart(productId) {
      const product = findProduct(productId);
      if (!product) return;

      const existing = cart.find(item => item.id === productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      updateCartCount();
      showToast(`${product.name} added to cart`);
    }

    function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      updateCartCount();
      renderCart();
    }

    function changeQuantity(productId, amount) {
      const item = cart.find(entry => entry.id === productId);
      if (!item) return;
      item.quantity += amount;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        updateCartCount();
        renderCart();
      }
    }

    function updateCartCount() {
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      document.getElementById('cartCount').textContent = count;
    }

    function renderCart() {
      const list = document.getElementById('cartItemsList');
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shipping = subtotal > 0 ? 10 : 0;
      const total = subtotal + shipping;

      document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
      document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
      document.getElementById('total').textContent = `$${total.toFixed(2)}`;

      list.innerHTML = '';
      if (cart.length === 0) {
        list.innerHTML = `
          <div class="rounded-[1.5rem] border p-6 text-center">
            <i data-lucide="shopping-bag" class="w-9 h-9 mx-auto mb-3"></i>
            <p class="font-semibold">Your cart is empty</p>
            <p class="text-sm opacity-70 mt-2">Add a product to get started.</p>
          </div>
        `;
      } else {
        cart.forEach(item => {
          const row = document.createElement('div');
          row.className = 'rounded-[1.5rem] border p-4 glass-card';
          row.innerHTML = `
            <div class="flex gap-4">
              <div class="w-20 h-20 rounded-2xl flex-shrink-0" style="background:${item.accent}"></div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="font-semibold">${item.name}</p>
                    <p class="text-sm opacity-70 mt-1">$${item.price}</p>
                  </div>
                  <button type="button" class="rounded-full p-2 border" onclick="removeFromCart('${item.id}')" aria-label="Remove">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
                <div class="flex items-center gap-2 mt-3">
                  <button type="button" class="rounded-full w-8 h-8 border" onclick="changeQuantity('${item.id}', -1)">−</button>
                  <span class="w-8 text-center font-semibold">${item.quantity}</span>
                  <button type="button" class="rounded-full w-8 h-8 border" onclick="changeQuantity('${item.id}', 1)">+</button>
                </div>
              </div>
            </div>
          `;
          list.appendChild(row);
        });
      }

      if (window.lucide) lucide.createIcons();
      applyCurrentTheme();
    }

    function renderOrders() {
      const list = document.getElementById('ordersList');
      list.innerHTML = '';

      if (orders.length === 0) {
        list.innerHTML = `
          <div class="rounded-[1.5rem] border p-6 text-center">
            <i data-lucide="package" class="w-9 h-9 mx-auto mb-3"></i>
            <p class="font-semibold">No active orders</p>
            <p class="text-sm opacity-70 mt-2">Your orders will appear here.</p>
          </div>
        `;
      } else {
        orders.forEach((order, idx) => {
          const row = document.createElement('div');
          row.className = 'rounded-[1.5rem] border p-4 glass-card';
          row.innerHTML = `
            <div class="flex justify-between items-start mb-3">
              <div>
                <p class="font-semibold">Order #${1000 + idx}</p>
                <p class="text-sm opacity-70">${order.date}</p>
              </div>
              <span class="px-3 py-1 rounded-full text-sm font-semibold" style="background: ${order.status === 'processing' ? 'rgba(112, 83, 56, 0.15)' : 'rgba(126, 148, 121, 0.15)'}">
                ${order.status === 'processing' ? 'Processing' : 'Shipped'}
              </span>
            </div>
            <p class="text-sm">${order.items.join(', ')}</p>
            <p class="font-semibold mt-3">Total: $${order.total.toFixed(2)}</p>
          `;
          list.appendChild(row);
        });
      }

      if (window.lucide) lucide.createIcons();
      applyCurrentTheme();
    }

    function updateOrderInfo() {
      // Order info is stored in form fields, ready for processing
    }

    function processOrder() {
      const name = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const address = document.getElementById('address').value;
      const city = document.getElementById('city').value;
      const postcode = document.getElementById('postcode').value;

      if (!name || !email || !phone || !address || !city || !postcode || cart.length === 0) {
        showToast('Please fill all fields and add items to cart');
        return;
      }

      const orderTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 10;
      const itemNames = cart.map(item => item.name);

      const order = {
        name,
        email,
        phone,
        address,
        city,
        postcode,
        items: itemNames,
        total: orderTotal,
        status: 'processing',
        date: new Date().toLocaleDateString()
      };

      orders.push(order);
      cart = [];
      updateCartCount();
      renderCart();
      renderOrders();

      document.getElementById('fullName').value = '';
      document.getElementById('email').value = '';
      document.getElementById('phone').value = '';
      document.getElementById('address').value = '';
      document.getElementById('city').value = '';
      document.getElementById('postcode').value = '';

      showToast(`Order #${1000 + orders.length - 1} processed successfully!`);
    }

    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.remove('hidden');
      clearTimeout(showToast.timer);
      showToast.timer = setTimeout(() => toast.classList.add('hidden'), 3000);
    }

    function applyCurrentTheme() {
      const config = window.elementSdk ? window.elementSdk.config : defaultConfig;
      const background = getConfigValue(config, "background_color");
      const surface = getConfigValue(config, "surface_color");
      const text = getConfigValue(config, "text_color");
      const primary = getConfigValue(config, "primary_action_color");
      const secondary = getConfigValue(config, "secondary_action_color");

      document.getElementById("app").style.background = `
        radial-gradient(circle at 12% 10%, ${secondary}44, transparent 28%),
        radial-gradient(circle at 88% 16%, ${primary}22, transparent 30%),
        linear-gradient(135deg, ${background} 0%, #efe2d1 52%, #e7d4bd 100%)
      `;
      document.getElementById("app").style.color = text;

      document.querySelectorAll("#navSurface, .glass-card, .product-card, .category-card").forEach(el => {
        el.style.backgroundColor = `${surface}dd`;
        el.style.borderColor = `${text}22`;
      });

      document.querySelectorAll("#primaryButton, #cartButton, #checkoutBtn, .add-button").forEach(el => {
        el.style.backgroundColor = primary;
        el.style.color = surface;
      });

      document.querySelectorAll("#brandMark").forEach(el => {
        el.style.backgroundColor = secondary;
        el.style.color = surface;
      });

      document.querySelectorAll("#menuButton, .remove-button, .quantity-button").forEach(el => {
        el.style.color = text;
        el.style.backgroundColor = `${surface}aa`;
      });

      document.getElementById("toast").style.backgroundColor = surface;
      document.getElementById("toast").style.color = text;
      document.getElementById("toast").style.borderColor = `${text}22`;
    }

    async function onConfigChange(config) {
      const baseSize = Number(config.font_size || defaultConfig.font_size);
      const customFont = config.font_family || defaultConfig.font_family;
      const fontStack = `${customFont}, Georgia, serif`;

      document.getElementById("brandName").textContent = getConfigValue(config, "brand_name");
      document.getElementById("navHome").textContent = getConfigValue(config, "nav_home");
      document.getElementById("navShop").textContent = getConfigValue(config, "nav_shop");
      document.getElementById("navCart").textContent = getConfigValue(config, "nav_cart");
      document.getElementById("mobileNavHome").textContent = getConfigValue(config, "nav_home");
      document.getElementById("mobileNavShop").textContent = getConfigValue(config, "nav_shop");
      document.getElementById("mobileNavCart").textContent = getConfigValue(config, "nav_cart");
      document.getElementById("heroTitle").textContent = getConfigValue(config, "hero_title");
      document.getElementById("heroBody").textContent = getConfigValue(config, "hero_body");
      document.getElementById("primaryButton").firstChild.textContent = getConfigValue(config, "primary_button");
      document.getElementById("categoryOne").textContent = getConfigValue(config, "category_one");
      document.getElementById("categoryTwo").textContent = getConfigValue(config, "category_two");
      document.getElementById("categoryThree").textContent = getConfigValue(config, "category_three");
      document.getElementById("shopCategoryOne").textContent = getConfigValue(config, "category_one");
      document.getElementById("shopCategoryTwo").textContent = getConfigValue(config, "category_two");
      document.getElementById("shopCategoryThree").textContent = getConfigValue(config, "category_three");
      document.getElementById("footerText").textContent = getConfigValue(config, "footer_text");

      document.body.style.fontFamily = fontStack;

      document.getElementById("heroTitle").style.fontSize = `${baseSize * 2.8}px`;
      document.querySelectorAll("h2").forEach(el => {
        el.style.fontSize = `${baseSize * 1.9}px`;
      });
      document.querySelectorAll("h3, .font-semibold").forEach(el => {
        el.style.fontSize = `${baseSize * 1.1}px`;
      });

      applyCurrentTheme();
    }

    function mapToCapabilities(config) {
      return {
        recolorables: [
          { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
          { get: () => config.surface_color || defaultConfig.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); } },
          { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
          { get: () => config.primary_action_color || defaultConfig.primary_action_color, set: (v) => { config.primary_action_color = v; window.elementSdk.setConfig({ primary_action_color: v }); } },
          { get: () => config.secondary_action_color || defaultConfig.secondary_action_color, set: (v) => { config.secondary_action_color = v; window.elementSdk.setConfig({ secondary_action_color: v }); } }
        ],
        borderables: [],
        fontEditable: { get: () => config.font_family || defaultConfig.font_family, set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); } },
        fontSizeable: { get: () => config.font_size || defaultConfig.font_size, set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); } }
      };
    }

    function mapToEditPanelValues(config) {
      return new Map([
        ["brand_name", getConfigValue(config, "brand_name")],
        ["nav_home", getConfigValue(config, "nav_home")],
        ["nav_shop", getConfigValue(config, "nav_shop")],
        ["nav_cart", getConfigValue(config, "nav_cart")],
        ["hero_title", getConfigValue(config, "hero_title")],
        ["hero_body", getConfigValue(config, "hero_body")],
        ["primary_button", getConfigValue(config, "primary_button")],
        ["category_one", getConfigValue(config, "category_one")],
        ["category_two", getConfigValue(config, "category_two")],
        ["category_three", getConfigValue(config, "category_three")],
        ["footer_text", getConfigValue(config, "footer_text")]
      ]);
    }

    document.addEventListener("DOMContentLoaded", () => {
      navigateTo('home');
      updateCartCount();
      renderOrders();

      if (window.lucide) lucide.createIcons();

      if (!window.elementSdk) {
        onConfigChange(defaultConfig);
      }
    });

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
      });
    }
  function (){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9fcc7b8592b4784e',t:'MTc3ODk1NjUyOS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();