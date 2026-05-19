// // import { Waves, Droplet, Shield } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';

// // export default function CategoryGrid() {
// //   const navigate = useNavigate();

// //   return (
// //         <>
// //       <div className="max-w-7xl mx-auto">
// //       <h2 className="font-semibold text-3xl mb-8">Shop by Routine</h2>
// //       <div className="grid sm:grid-cols-3 gap-5">

// //         <div
// //           className="category-card rounded-[2rem] border p-6 sm:p-8 glass-card cursor-pointer transition hover:-translate-y-1"
// //           onClick={() => navigate('/shop')}
// //         >
// //           <div className="rounded-2xl w-16 h-16 mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #f4e5d2, #e9cda9)' }}>
// //             <Waves className="w-8 h-8" />
// //           </div>
// //           <h3 className="font-semibold text-xl mb-2">Cleanse & Prep</h3>
// //           <p className="text-sm opacity-70">Gentle reset and prep.</p>
// //         </div>

// //         <div
// //           className="category-card rounded-[2rem] border p-6 sm:p-8 glass-card cursor-pointer transition hover:-translate-y-1"
// //           onClick={() => navigate('/shop')}
// //         >
// //           <div className="rounded-2xl w-16 h-16 mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #dfe8d7, #b9c8a9)' }}>
// //             <Droplet className="w-8 h-8" />
// //           </div>
// //           <h3 className="font-semibold text-xl mb-2">Treat & Target</h3>
// //           <p className="text-sm opacity-70">Deep hydration and serum power.</p>
// //         </div>

// //         <div
// //           className="category-card rounded-[2rem] border p-6 sm:p-8 glass-card cursor-pointer transition hover:-translate-y-1"
// //           onClick={() => navigate('/shop')}
// //         >
// //           <div className="rounded-2xl w-16 h-16 mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #eadfd2, #d8bda0)' }}>
// //             <Shield className="w-8 h-8" />
// //           </div>
// //           <h3 className="font-semibold text-xl mb-2">Protect & Moisturise</h3>
// //           <p className="text-sm opacity-70">Barrier comfort and seal.</p>
// //         </div>

// //       </div>
// //     </div>
// //     </>
// //   );
// // }..

// // src/components/CategoryGrid.jsx
// import { Waves, Droplet, Shield, ShoppingCart } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useSite } from '../Store';

// export default function CategoryGrid() {
//   const navigate = useNavigate();
//   const { products, addToCart, siteConfig } = useSite();

//   // Helper mapping values
//   const categories = [
//     { key: 'cleanse', title: siteConfig.category_one || "Cleanse & Prep", desc: "Gentle reset and prep.", icon: <Waves className="w-6 h-6 text-amber-800" />, bg: 'linear-gradient(145deg, #f4e5d2, #e9cda9)' },
//     { key: 'treat', title: siteConfig.category_two || "Treat & Target", desc: "Deep hydration and serum power.", icon: <Droplet className="w-6 h-6 text-emerald-800" />, bg: 'linear-gradient(145deg, #dfe8d7, #b9c8a9)' },
//     { key: 'protect', title: siteConfig.category_three || "Protect & Moisturise", desc: "Barrier comfort and daily defense.", icon: <Shield className="w-6 h-6 text-orange-800" />, bg: 'linear-gradient(145deg, #eadfd2, #d8bda0)' }
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4">
//       <h2 className="font-semibold text-3xl mb-2 text-gray-900">Shop by Routine</h2>
//       <p className="text-gray-500 mb-8 text-sm">Explore our targeted product previews. Click sections to see full collections.</p>
      
//       <div className="grid lg:grid-cols-3 gap-8">
//         {categories.map((cat) => {
//           // Get up to 2 items for preview display
//           const previewItems = (products[cat.key] || []).slice(0, 2);

//           return (
//             <div key={cat.key} className="rounded-[2.5rem] border p-6 bg-white shadow-sm flex flex-col justify-between">
//               <div>
//                 <div 
//                   className="rounded-2xl w-14 h-14 mb-4 flex items-center justify-center cursor-pointer transition hover:scale-105" 
//                   style={{ background: cat.bg }}
//                   onClick={() => navigate('/shop')}
//                 >
//                   {cat.icon}
//                 </div>
//                 <h3 className="font-semibold text-xl mb-1 text-gray-900 hover:text-amber-900 cursor-pointer" onClick={() => navigate('/shop')}>
//                   {cat.title}
//                 </h3>
//                 <p className="text-xs text-gray-500 mb-6">{cat.desc}</p>
                
//                 {/* Embedded Limited Lineup Items Showcase Area */}
//                 <div className="space-y-3 mb-6">
//                   {previewItems.length === 0 ? (
//                     <p className="text-xs italic text-gray-400 py-2">No preview lineup available.</p>
//                   ) : (
//                     previewItems.map((prod) => (
//                       <div key={prod.id} className="flex items-center justify-between p-3 border rounded-xl bg-gray-50 hover:bg-gray-100/50 transition">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 rounded-lg shrink-0" style={{ background: prod.accent || cat.bg }} />
//                           <div className="min-w-0">
//                             <p className="text-xs font-semibold text-gray-800 truncate">{prod.name}</p>
//                             <p className="text-[11px] text-gray-500 truncate">${prod.price}</p>
//                           </div>
//                         </div>
//                         <button
//                           type="button"
//                           className="p-2 rounded-full border bg-white hover:bg-[#705338] hover:text-white transition shadow-sm"
//                           onClick={() => addToCart(prod)}
//                           title="Add item to Cart"
//                         >
//                           <ShoppingCart className="w-3.5 h-3.5" />
//                         </button>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 className="w-full text-center text-xs font-semibold py-3 border rounded-xl hover:bg-gray-50 text-gray-700 transition"
//                 onClick={() => navigate('/shop')}
//               >
//                 View Complete Lineup →
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
// src/components/CategoryGrid.jsx
import { Waves, Droplet, Shield, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSite } from '../Store';

export default function CategoryGrid() {
  const navigate = useNavigate();
  const { products, addToCart, siteConfig } = useSite();

  const categories = [
    { key: 'cleanse', title: siteConfig.category_one || "Cleanse & Prep", desc: "Gentle reset and prep.", icon: <Waves className="w-6 h-6 text-amber-800" />, bg: 'linear-gradient(145deg, #f4e5d2, #e9cda9)' },
    { key: 'treat', title: siteConfig.category_two || "Treat & Target", desc: "Deep hydration and serum power.", icon: <Droplet className="w-6 h-6 text-emerald-800" />, bg: 'linear-gradient(145deg, #dfe8d7, #b9c8a9)' },
    { key: 'protect', title: siteConfig.category_three || "Protect & Moisturise", desc: "Barrier comfort and defense.", icon: <Shield className="w-6 h-6 text-orange-800" />, bg: 'linear-gradient(145deg, #eadfd2, #d8bda0)' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 overflow-hidden">
      <h2 className="font-semibold text-3xl mb-2 text-gray-900">Shop by Routine</h2>
      <p className="text-gray-500 mb-6 text-sm">Explore targeted routines. Swipe or scroll horizontally to browse sections.</p>
      
      {/* Changed layout wrapper to a horizontal flex row */}
      <div className="flex flex-row overflow-x-auto gap-6 pb-6 snap-x scroll-smooth scrollbar-thin">
        {categories.map((cat) => {
          // Get up to 2 items to preview
          const previewItems = (products[cat.key] || []).slice(0, 2);

          return (
            <div 
              key={cat.key} 
              className="rounded-[2.5rem] border p-6 bg-white shadow-sm flex flex-col justify-between min-w-[300px] sm:min-w-[340px] max-w-[360px] shrink-0 snap-start"
            >
              <div>
                <div 
                  className="rounded-2xl w-14 h-14 mb-4 flex items-center justify-center cursor-pointer transition hover:scale-105" 
                  style={{ background: cat.bg }}
                  onClick={() => navigate('/shop')}
                >
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-xl mb-1 text-gray-900 hover:text-amber-900 cursor-pointer" onClick={() => navigate('/shop')}>
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-500 mb-5">{cat.desc}</p>
                
                {/* Product showcase area inside categories */}
                <div className="space-y-3 mb-6">
                  {previewItems.length === 0 ? (
                    <p className="text-xs italic text-gray-400 py-2">No items listed in this segment yet.</p>
                  ) : (
                    previewItems.map((prod) => (
                      <div key={prod.id} className="flex items-center justify-between p-2.5 border rounded-xl bg-gray-50 hover:bg-gray-100/50 transition">
                        <div className="flex items-center gap-3 min-w-0">
                          {prod.imageFile ? (
                            <img src={prod.imageFile} alt="" className="w-10 h-10 rounded-lg object-cover border bg-white shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg shrink-0" style={{ background: prod.accent || cat.bg }} />
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-800 truncate">{prod.name}</p>
                            <p className="text-[11px] text-gray-500 font-mono">${prod.price}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="p-2 rounded-full border bg-white hover:bg-[#705338] hover:text-white transition shadow-sm shrink-0"
                          onClick={() => addToCart(prod)}
                          title="Add to Cart"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button
                type="button"
                className="w-full text-center text-xs font-semibold py-3 border rounded-xl hover:bg-gray-50 text-gray-700 transition mt-auto"
                onClick={() => navigate('/shop')}
              >
                View Full Lineup →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}