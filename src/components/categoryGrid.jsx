export function CategoryGrid() {
    return (
        <>
            <div class="max-w-7xl mx-auto">
                <h2 class="font-semibold text-3xl mb-8">Shop by Routine</h2>
                <div class="grid sm:grid-cols-3 gap-5">
                    <div class="category-card rounded-[2rem] border p-6 sm:p-8 glass-card cursor-pointer transition hover:-translate-y-1" onclick="navigateTo('shop')">
                        <div class="rounded-2xl w-16 h-16 mb-4 flex items-center justify-center" style="background: linear-gradient(145deg, #f4e5d2, #e9cda9);">
                            <i data-lucide="waves" class="w-8 h-8"></i>
                        </div>
                        <h3 id="categoryOne" class="font-semibold text-xl mb-2">Cleanse &amp; Prep</h3>
                        <p class="text-sm opacity-70">Gentle reset and prep.</p>
                    </div>
                    <div class="category-card rounded-[2rem] border p-6 sm:p-8 glass-card cursor-pointer transition hover:-translate-y-1" onclick="navigateTo('shop')">
                        <div class="rounded-2xl w-16 h-16 mb-4 flex items-center justify-center" style="background: linear-gradient(145deg, #dfe8d7, #b9c8a9);">
                            <i data-lucide="droplet" class="w-8 h-8"></i>
                        </div>
                        <h3 id="categoryTwo" class="font-semibold text-xl mb-2">Treat &amp; Target</h3>
                        <p class="text-sm opacity-70">Deep hydration and serum power.</p>
                    </div>
                    <div class="category-card rounded-[2rem] border p-6 sm:p-8 glass-card cursor-pointer transition hover:-translate-y-1" onclick="navigateTo('shop')">
                        <div class="rounded-2xl w-16 h-16 mb-4 flex items-center justify-center" style="background: linear-gradient(145deg, #eadfd2, #d8bda0);">
                            <i data-lucide="shield" class="w-8 h-8"></i>
                        </div>
                        <h3 id="categoryThree" class="font-semibold text-xl mb-2">Protect &amp; Moisturise</h3>
                        <p class="text-sm opacity-70">Barrier comfort and seal.</p>
                    </div>
                </div>
            </div>
        </>
    )
}