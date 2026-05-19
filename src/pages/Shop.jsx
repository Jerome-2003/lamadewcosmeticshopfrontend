// // import { Waves, Droplet, Shield } from 'lucide-react';
// // import Header from '../components/Header';
// // import Footer from '../components/Footer';

// // export default function Shop() {
// //   return (
// //     <>

// //     <Header />

// //       <section id="shopPage" className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
// //         <div className="max-w-7xl mx-auto">
// //           <h2 className="font-semibold text-3xl mb-12">Shop by Category</h2>

// //           {/* CLEANSE & PREP SECTION */}
// //           <div className="mb-16">
// //             <div className="flex items-center gap-3 mb-6">
// //               <div
// //                 className="rounded-2xl w-12 h-12 flex items-center justify-center"
// //                 style={{ background: 'linear-gradient(145deg, #f4e5d2, #e9cda9)' }}
// //               >
// //                 <Waves className="w-6 h-6" />
// //               </div>
// //               <h3 id="shopCategoryOne" className="font-semibold text-2xl">Cleanse & Prep</h3>
// //             </div>
// //             <div id="cleanseGrid" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"></div>
// //           </div>

// //           {/* TREAT & TARGET SECTION */}
// //           <div className="mb-16">
// //             <div className="flex items-center gap-3 mb-6">
// //               <div
// //                 className="rounded-2xl w-12 h-12 flex items-center justify-center"
// //                 style={{ background: 'linear-gradient(145deg, #dfe8d7, #b9c8a9)' }}
// //               >
// //                 <Droplet className="w-6 h-6" />
// //               </div>
// //               <h3 id="shopCategoryTwo" className="font-semibold text-2xl">Treat & Target</h3>
// //             </div>
// //             <div id="treatGrid" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"></div>
// //           </div>

// //           {/* PROTECT & MOISTURISE SECTION */}
// //           <div className="mb-16">
// //             <div className="flex items-center gap-3 mb-6">
// //               <div
// //                 className="rounded-2xl w-12 h-12 flex items-center justify-center"
// //                 style={{ background: 'linear-gradient(145deg, #eadfd2, #d8bda0)' }}
// //               >
// //                 <Shield className="w-6 h-6" />
// //               </div>
// //               <h3 id="shopCategoryThree" className="font-semibold text-2xl">Protect & Moisturise</h3>
// //             </div>
// //             <div id="protectGrid" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"></div>
// //           </div>

// //         </div>
// //       </section>

// //       <Footer />
// //     </>
// //   );
// // }

// // src/pages/Shop.jsx
// import { Waves, Droplet, Shield, ShoppingCart } from 'lucide-react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { useSite } from '../Store';

// export default function Shop() {
//   const { products, addToCart, siteConfig } = useSite();

//   const sections = [
//     { key: 'cleanse', label: siteConfig.category_one || "Cleanse & Prep", icon: <Waves className="w-5 h-5 text-amber-800" />, bg: 'linear-gradient(145deg, #f4e5d2, #e9cda9)' },
//     { key: 'treat', label: siteConfig.category_two || "Treat & Target", icon: <Droplet className="w-5 h-5 text-emerald-800" />, bg: 'linear-gradient(145deg, #dfe8d7, #b9c8a9)' },
//     { key: 'protect', label: siteConfig.category_three || "Protect & Moisturise", icon: <Shield className="w-5 h-5 text-orange-800" />, bg: 'linear-gradient(145deg, #eadfd2, #d8bda0)' }
//   ];

//   return (
//     <div className="min-h-screen bg-[#f8f0e6]/40">
//       <Header />

//       <main id="shopPage" className="px-4 sm:px-6 lg:px-10 py-12 max-w-7xl mx-auto">
//         <h2 className="font-semibold text-4xl mb-2 text-gray-900 tracking-tight">Shop by Category</h2>
//         <p className="text-gray-500 mb-12">Pure botanical treatments tailored precisely for your morning and evening rituals.</p>

//         {sections.map((sec) => (
//           <div key={sec.key} className="mb-16">
//             <div className="flex items-center gap-3 mb-6 border-b pb-3">
//               <div className="rounded-xl w-10 h-10 flex items-center justify-center shadow-sm" style={{ background: sec.bg }}>
//                 {sec.icon}
//               </div>
//               <h3 className="font-semibold text-2xl text-gray-800">{sec.label}</h3>
//             </div>

//             {/* Dynamic Product Grid Injection Area */}
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {(!products[sec.key] || products[sec.key].length === 0) ? (
//                 <p className="text-sm italic text-gray-400 py-4 sm:col-span-2 lg:col-span-4">
//                   No active listings available inside this category right now.
//                 </p>
//               ) : (
//                 products[sec.key].map((prod) => (
//                   <div key={prod.id} className="rounded-[2rem] border bg-white p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
//                     <div>
//                       <div 
//                         className="w-full aspect-square rounded-[1.5rem] mb-4 transition group-hover:scale-[1.02] relative flex items-center justify-center overflow-hidden" 
//                         style={{ background: prod.accent || sec.bg }}
//                       >
//                         <span className="opacity-10 text-black font-bold text-4xl tracking-widest uppercase select-none p-2 text-center">
//                           {prod.name.split(' ')[0]}
//                         </span>
//                       </div>
//                       <h4 className="font-semibold text-gray-900 text-lg group-hover:text-amber-900 transition">{prod.name}</h4>
//                       <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[2rem]">{prod.desc || "No description provided."}</p>
//                     </div>
                    
//                     <div className="flex items-center justify-between mt-5 pt-3 border-t">
//                       <span className="font-bold text-gray-900">${prod.price.toFixed(2)}</span>
//                       <button
//                         type="button"
//                         className="inline-flex items-center gap-2 bg-[#705338] text-white rounded-full px-4 py-2.5 text-xs font-semibold shadow transition hover:opacity-90 active:scale-95"
//                         onClick={() => addToCart(prod)}
//                       >
//                         <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         ))}
//       </main>
//       <Footer />
//     </div>
//   );
// }

// src/pages/Shop.jsx
import { Waves, Droplet, Shield, ShoppingCart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSite } from '../Store';

export default function Shop() {
  const { products, addToCart, siteConfig } = useSite();

  const sections = [
    { key: 'cleanse', label: siteConfig.category_one || "Cleanse & Prep", icon: <Waves className="w-5 h-5 text-amber-800" />, bg: 'linear-gradient(145deg, #f4e5d2, #e9cda9)' },
    { key: 'treat', label: siteConfig.category_two || "Treat & Target", icon: <Droplet className="w-5 h-5 text-emerald-800" />, bg: 'linear-gradient(145deg, #dfe8d7, #b9c8a9)' },
    { key: 'protect', label: siteConfig.category_three || "Protect & Moisturise", icon: <Shield className="w-5 h-5 text-orange-800" />, bg: 'linear-gradient(145deg, #eadfd2, #d8bda0)' }
  ];

  return (
    <div className="min-h-screen bg-[#f8f0e6]/40">
      <Header />

      <main id="shopPage" className="px-4 sm:px-6 lg:px-10 py-12 max-w-7xl mx-auto overflow-hidden">
        <h2 className="font-semibold text-4xl mb-2 text-gray-900 tracking-tight">Shop by Category</h2>
        <p className="text-gray-500 mb-10">Pure botanical treatments tailored precisely for your skincare rituals.</p>

        {sections.map((sec) => (
          <div key={sec.key} className="mb-12 last:mb-4">
            <div className="flex items-center gap-3 mb-5 border-b pb-3">
              <div className="rounded-xl w-10 h-10 flex items-center justify-center shadow-sm" style={{ background: sec.bg }}>
                {sec.icon}
              </div>
              <h3 className="font-semibold text-2xl text-gray-800">{sec.label}</h3>
            </div>

            {/* Changed from layout grid grid-cols to horizontal layout flex row */}
            <div className="flex flex-row overflow-x-auto gap-6 pb-6 snap-x scroll-smooth scrollbar-thin">
              {(!products[sec.key] || products[sec.key].length === 0) ? (
                <p className="text-sm italic text-gray-400 py-4 block">
                  No active listings available inside this category right now.
                </p>
              ) : (
                products[sec.key].map((prod) => (
                  <div 
                    key={prod.id} 
                    className="rounded-[2rem] border bg-white p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between min-w-[260px] sm:min-w-[290px] max-w-[310px] shrink-0 snap-start group"
                  >
                    <div>
                      <div 
                        className="w-full aspect-square rounded-[1.5rem] mb-4 transition group-hover:scale-[1.01] relative flex items-center justify-center overflow-hidden bg-gray-50"
                        style={!prod.imageFile ? { background: prod.accent || sec.bg } : undefined}
                      >
                        {/* Render Gallery File if present, fallback to textual placeholder */}
                        {prod.imageFile ? (
                          <img src={prod.imageFile} alt={prod.name} className="w-full h-full object-cover rounded-[1.5rem]" />
                        ) : (
                          <span className="opacity-10 text-black font-bold text-4xl tracking-widest uppercase select-none p-2 text-center">
                            {prod.name.split(' ')[0]}
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900 text-lg group-hover:text-amber-900 transition truncate">{prod.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[2.5rem]">{prod.desc || "Pure active formulation."}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <span className="font-bold text-gray-900 font-mono">${prod.price.toFixed(2)}</span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 bg-[#705338] text-white rounded-full px-4 py-2.5 text-xs font-semibold shadow transition hover:opacity-90 active:scale-95"
                        onClick={() => addToCart(prod)}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}