export function AboutSkincareAdv() {
    return (
        <>
            <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16">
                <div class="reveal reveal-delay-1">
                    <h1 id="heroTitle" class="max-w-3xl font-semibold leading-tight tracking-tight text-4xl sm:text-5xl lg:text-6xl">Skin that looks rested, even when you are not.</h1>
                    <p id="heroBody" class="max-w-2xl mt-6 leading-8 text-lg">A modern skincare line built around hydration, calm, and glow — no ten-step routine required.</p>
                    <div class="mt-8">
                        <button id="primaryButton" type="button" class="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-semibold shadow-lg transition hover:-translate-y-1" onclick="navigateTo('shop')"> Shop now <i data-lucide="arrow-right" class="w-4 h-4"></i> </button>
                    </div>
                </div>

            </div>
        </>
    )
}