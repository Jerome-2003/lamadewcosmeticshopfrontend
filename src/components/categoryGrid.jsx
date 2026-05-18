import { Waves, Droplet, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CategoryGrid() {
  const navigate = useNavigate();

  return (
        <>
      <div className="max-w-7xl mx-auto">
      <h2 className="font-semibold text-3xl mb-8">Shop by Routine</h2>
      <div className="grid sm:grid-cols-3 gap-5">

        <div
          className="category-card rounded-[2rem] border p-6 sm:p-8 glass-card cursor-pointer transition hover:-translate-y-1"
          onClick={() => navigate('/shop')}
        >
          <div className="rounded-2xl w-16 h-16 mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #f4e5d2, #e9cda9)' }}>
            <Waves className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-xl mb-2">Cleanse & Prep</h3>
          <p className="text-sm opacity-70">Gentle reset and prep.</p>
        </div>

        <div
          className="category-card rounded-[2rem] border p-6 sm:p-8 glass-card cursor-pointer transition hover:-translate-y-1"
          onClick={() => navigate('/shop')}
        >
          <div className="rounded-2xl w-16 h-16 mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #dfe8d7, #b9c8a9)' }}>
            <Droplet className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-xl mb-2">Treat & Target</h3>
          <p className="text-sm opacity-70">Deep hydration and serum power.</p>
        </div>

        <div
          className="category-card rounded-[2rem] border p-6 sm:p-8 glass-card cursor-pointer transition hover:-translate-y-1"
          onClick={() => navigate('/shop')}
        >
          <div className="rounded-2xl w-16 h-16 mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #eadfd2, #d8bda0)' }}>
            <Shield className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-xl mb-2">Protect & Moisturise</h3>
          <p className="text-sm opacity-70">Barrier comfort and seal.</p>
        </div>

      </div>
    </div>
    </>
  );
}