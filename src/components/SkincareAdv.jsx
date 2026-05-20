// import { Droplets } from 'lucide-react';

// export default function SkincareAdv() {
//   return (
//     <>
//     <div className="relative reveal reveal-delay-2">
//       <div className="rounded-[2.5rem] sm:rounded-[3.5rem] p-8 border product-glow overflow-hidden">
//         <div
//           className="aspect-[4/5] min-h-[420px] sm:min-h-[520px] rounded-[2rem] flex items-center justify-center floating-bottle"
//           style={{ background: 'linear-gradient(145deg, #dfe8d7, #b9c8a9)' }}
//         >
//           <div
//             className="w-44 sm:w-56 h-80 sm:h-96 rounded-[4rem] shadow-2xl border flex flex-col items-center justify-between py-10"
//             style={{ background: 'rgba(255,248,239,0.68)' }}
//           >
//             <div className="w-16 h-10 rounded-b-2xl border"></div>
//             <div className="text-center px-6">
//               <p className="text-xs uppercase tracking-widest mb-3">Luma</p>
//               <p className="font-semibold text-3xl leading-none">Dew Serum</p>
//               <p className="mt-4 text-xs uppercase tracking-wider">Hydration</p>
//             </div>
//             <div className="w-20 h-20 rounded-full border flex items-center justify-center">
//               <Droplets className="w-9 h-9" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }
// src/components/SkincareAdv.jsx
import { Droplets } from 'lucide-react';
import { useSite } from '../Store';

export default function SkincareAdv() {
  const { siteConfig } = useSite();

  if (siteConfig.show_image_adv === false) return null;

  return (
    <div className="max-w-7xl mx-auto mb-16 px-4 animate-fadeIn">
      <div className="relative rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-8 border bg-white/40 backdrop-blur shadow-sm overflow-hidden grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Column: Visual container (Bottle graphic or Custom Uploaded Image Preview) */}
        <div
          className="aspect-[4/5] min-h-[380px] sm:min-h-[480px] rounded-[2rem] flex items-center justify-center relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #dfe8d7, #b9c8a9)' }}
        >
          {siteConfig.hero_image_url ? (
            <img 
              src={siteConfig.hero_image_url} 
              alt="Featured Product Advocacy" 
              className="w-full h-full object-cover rounded-[2rem]"
            />
          ) : (
            <div className="w-44 sm:w-56 h-80 sm:h-96 rounded-[4rem] shadow-2xl border flex flex-col items-center justify-between py-10 bg-white/70">
              <div className="w-16 h-10 rounded-b-2xl border bg-gray-50"></div>
              <div className="text-center px-6">
                <p className="text-xs uppercase tracking-widest mb-3 text-gray-500">Luma</p>
                <p className="font-semibold text-3xl leading-none text-gray-800">Dew Serum</p>
                <p className="mt-4 text-xs uppercase tracking-wider text-gray-500">Hydration</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white border">
                <Droplets className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Educational Copy Text */}
        <div className="p-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#705338] px-3 py-1 bg-[#705338]/10 rounded-full">
            Product Spotlight
          </span>
          <h2 className="text-3xl font-semibold mt-4 text-gray-900">Formulated for delicate skin barriers</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Our award-winning serum offers deep dermal saturation using plant-derived lipids and moisture-locking squalane cores. No fillers, synthetic perfumes, or harsh reactions.
          </p>
        </div>
      </div>
    </div>
  );
}