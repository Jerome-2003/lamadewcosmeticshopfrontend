import { Droplets } from 'lucide-react';

export default function SkincareAdv() {
  return (
    <>
    <div className="relative reveal reveal-delay-2">
      <div className="rounded-[2.5rem] sm:rounded-[3.5rem] p-8 border product-glow overflow-hidden">
        <div
          className="aspect-[4/5] min-h-[420px] sm:min-h-[520px] rounded-[2rem] flex items-center justify-center floating-bottle"
          style={{ background: 'linear-gradient(145deg, #dfe8d7, #b9c8a9)' }}
        >
          <div
            className="w-44 sm:w-56 h-80 sm:h-96 rounded-[4rem] shadow-2xl border flex flex-col items-center justify-between py-10"
            style={{ background: 'rgba(255,248,239,0.68)' }}
          >
            <div className="w-16 h-10 rounded-b-2xl border"></div>
            <div className="text-center px-6">
              <p className="text-xs uppercase tracking-widest mb-3">Luma</p>
              <p className="font-semibold text-3xl leading-none">Dew Serum</p>
              <p className="mt-4 text-xs uppercase tracking-wider">Hydration</p>
            </div>
            <div className="w-20 h-20 rounded-full border flex items-center justify-center">
              <Droplets className="w-9 h-9" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}