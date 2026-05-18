import { Link } from 'react-router-dom';
import { ShoppingBag, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 px-4 sm:px-6 lg:px-10 py-4">
      <nav id="navSurface" className="max-w-7xl mx-auto glass-card rounded-full border shadow-sm px-4 sm:px-5 py-3" aria-label="Main navigation">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Go to homepage">
            <span id="brandMark" className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner">
              <span className="w-4 h-6 rounded-full border-2 rotate-12"></span>
            </span>
            <span id="brandName" className="font-semibold tracking-wide">
              URIEL cosmetics
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:opacity-70 transition">Home</Link>
            <Link to="/cart" className="text-sm font-medium hover:opacity-70 transition">Cart</Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/cart" id="cartButton" className="relative rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5">
              <span className="inline-flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
              </span>
              <span id="cartCount" className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center">0</span>
            </Link>

            <button
              type="button"
              className="md:hidden rounded-full p-3 border"
              aria-label="Open mobile menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden overflow-hidden transition-all duration-300">
            <div className="pt-4 pb-2 grid gap-2">
              <Link to="/" className="rounded-2xl px-4 py-3 text-sm font-semibold" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/cart" className="rounded-2xl px-4 py-3 text-sm font-semibold" onClick={() => setMobileOpen(false)}>Cart</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


