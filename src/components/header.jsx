function Header() {
    return (
        <>
            <header class="sticky top-0 z-30 px-4 sm:px-6 lg:px-10 py-4">
                <nav id="navSurface" class="max-w-7xl mx-auto glass-card rounded-full border shadow-sm px-4 sm:px-5 py-3" aria-label="Main navigation">
                    <div class="flex items-center justify-between gap-4">
                        <a href="#" class="flex items-center gap-3" aria-label="Go to homepage" onclick="navigateTo('home'); return false;"> <span id="brandMark" class="w-10 h-10 rounded-full flex items-center justify-center shadow-inner"> <span class="w-4 h-6 rounded-full border-2 rotate-12"></span> </span> <span id="brandName" class="font-semibold tracking-wide">Luma Dew</span> </a>
                        <div class="hidden md:flex items-center gap-8">
                            <a id="navHome" href="#" class="text-sm font-medium hover:opacity-70 transition" onclick="navigateTo('home'); return false;">Home</a> <a id="navShop" href="#" class="text-sm font-medium hover:opacity-70 transition" onclick="navigateTo('shop'); return false;">Shop</a> <a id="navCart" href="#" class="text-sm font-medium hover:opacity-70 transition" onclick="navigateTo('cart'); return false;">Cart</a>
                        </div>
                        <div class="flex items-center gap-2">
                            <button id="cartButton" type="button" class="relative rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5" onclick="navigateTo('cart')"> <span class="inline-flex items-center gap-2"> <i data-lucide="shopping-bag" class="w-4 h-4"></i> <span class="hidden sm:inline">Cart</span> </span> <span id="cartCount" class="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center">0</span> </button> <button id="menuButton" type="button" class="md:hidden rounded-full p-3 border" aria-label="Open mobile menu" aria-expanded="false" onclick="toggleMobileMenu()"> <i data-lucide="menu" class="w-5 h-5"></i> </button>
                        </div>
                    </div>
                    <div id="mobileMenu" class="mobile-menu-closed md:hidden overflow-hidden transition-all duration-300">
                        <div class="pt-4 pb-2 grid gap-2">
                            <a id="mobileNavHome" href="#" class="rounded-2xl px-4 py-3 text-sm font-semibold" onclick="navigateTo('home'); toggleMobileMenu(); return false;">Home</a> <a id="mobileNavShop" href="#" class="rounded-2xl px-4 py-3 text-sm font-semibold" onclick="navigateTo('shop'); toggleMobileMenu(); return false;">Shop</a> <a id="mobileNavCart" href="#" class="rounded-2xl px-4 py-3 text-sm font-semibold" onclick="navigateTo('cart'); toggleMobileMenu(); return false;">Cart</a>
                        </div>
                    </div>
                </nav>
            </header>

        </>
    );
}

export default Header