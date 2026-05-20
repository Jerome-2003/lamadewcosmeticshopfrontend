// import { Link } from 'react-router-dom';
// import { ShoppingBag, Menu } from 'lucide-react';
// import { useState } from 'react';

// export default function Header() {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-30 px-4 sm:px-6 lg:px-10 py-4">
//       <nav id="navSurface" className="max-w-7xl mx-auto glass-card rounded-full border shadow-sm px-4 sm:px-5 py-3" aria-label="Main navigation">
//         <div className="flex items-center justify-between gap-4">
//           <Link to="/" className="flex items-center gap-3" aria-label="Go to homepage">
//             <span id="brandMark" className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner">
//               <span className="w-4 h-6 rounded-full border-2 rotate-12"></span>
//             </span>
//             <span id="brandName" className="font-semibold tracking-wide">
//               URIEL cosmetics
//             </span>
//           </Link>

//           <div className="hidden md:flex items-center gap-8">
//             <Link to="/" className="text-sm font-medium hover:opacity-70 transition">Home</Link>
//             <Link to="/cart" className="text-sm font-medium hover:opacity-70 transition">Cart</Link>
//           </div>

//           <div className="flex items-center gap-2">
//             <Link to="/cart" id="cartButton" className="relative rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5">
//               <span className="inline-flex items-center gap-2">
//                 <ShoppingBag className="w-4 h-4" />
//                 <span className="hidden sm:inline">Cart</span>
//               </span>
//               <span id="cartCount" className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center">0</span>
//             </Link>

//             <button
//               type="button"
//               className="md:hidden rounded-full p-3 border"
//               aria-label="Open mobile menu"
//               aria-expanded={mobileOpen}
//               onClick={() => setMobileOpen(!mobileOpen)}
//             >
//               <Menu className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {mobileOpen && (
//           <div className="md:hidden overflow-hidden transition-all duration-300">
//             <div className="pt-4 pb-2 grid gap-2">
//               <Link to="/" className="rounded-2xl px-4 py-3 text-sm font-semibold" onClick={() => setMobileOpen(false)}>Home</Link>
//               <Link to="/cart" className="rounded-2xl px-4 py-3 text-sm font-semibold" onClick={() => setMobileOpen(false)}>Cart</Link>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }


// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { useSite } from '../Store';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart, siteConfig } = useSite();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 px-4 sm:px-6 lg:px-10 py-4">
      <nav id="navSurface" className="max-w-7xl mx-auto glass-card rounded-full border shadow-sm px-4 sm:px-5 py-3 bg-white/80 backdrop-blur-md" aria-label="Main navigation">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Go to homepage">
            <span id="brandMark" className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner bg-[#705338]/10 text-[#705338]">
              <span className="w-4 h-6 rounded-full border-2 rotate-12 border-[#705338]"></span>
            </span>
            <span id="brandName" className="font-semibold tracking-wide text-gray-800">
              {siteConfig.brand_name || "URIEL cosmetics"}
            </span>
          </Link>

          {/* Conditional Navigation Links based on Current Route */}
          <div className="hidden md:flex items-center gap-8">
            {location.pathname === '/' && (
              <Link to="/" className="text-sm font-semibold text-[#705338] border-b-2 border-[#705338] pb-1 transition">
                {siteConfig.nav_home || "Home"}
              </Link>
            )}
            <Link to="/shop" className="text-sm font-medium hover:opacity-70 text-gray-700 transition">
              {siteConfig.nav_shop || "Shop"}
            </Link>
            {location.pathname === '/cart' && (
              <Link to="/cart" className="text-sm font-semibold text-[#705338] border-b-2 border-[#705338] pb-1 transition">
                {siteConfig.nav_cart || "Cart"}
              </Link>
            )}
            <Link to="/admin" className="text-sm font-medium hover:text-amber-700 text-gray-500 flex items-center gap-1">
              <ShieldAlert className="w-4 h-4" /> Admin
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/cart" id="cartButton" className="relative rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-gray-100 bg-[#705338]/5 text-[#705338]">
              <span className="inline-flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
              </span>
              {totalItems > 0 && (
                <span id="cartCount" className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center bg-[#705338] text-white font-bold animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="md:hidden rounded-full p-2 border hover:bg-gray-50"
              aria-label="Open mobile menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-4 pt-2 border-t grid gap-2">
            {location.pathname === '/' && <Link to="/" className="rounded-xl px-4 py-2.5 text-sm font-semibold bg-gray-50" onClick={() => setMobileOpen(false)}>Home</Link>}
            <Link to="/shop" className="rounded-xl px-4 py-2.5 text-sm font-medium" onClick={() => setMobileOpen(false)}>Shop</Link>
            {location.pathname === '/cart' && <Link to="/cart" className="rounded-xl px-4 py-2.5 text-sm font-semibold bg-gray-50" onClick={() => setMobileOpen(false)}>Cart</Link>}
            <Link to="/admin" className="rounded-xl px-4 py-2.5 text-sm font-medium text-amber-800" onClick={() => setMobileOpen(false)}>Admin Management</Link>
          </div>
        )}
      </nav>
    </header>
  );
}