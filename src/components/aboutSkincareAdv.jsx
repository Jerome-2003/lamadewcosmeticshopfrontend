import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AboutSkincareAdv() {
  const navigate = useNavigate();

  return (
    <>
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16">
      <div className="reveal reveal-delay-1">
        <h1 className="max-w-3xl font-semibold leading-tight tracking-tight text-4xl sm:text-5xl lg:text-6xl">
          Skin that looks rested, even when you are not.
        </h1>
        <p className="max-w-2xl mt-6 leading-8 text-lg">
          A modern skincare line built around hydration, calm, and glow — no ten-step routine required.
        </p>
        <div className="mt-8">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-semibold shadow-lg transition hover:-translate-y-1"
            onClick={() => navigate('/shop')}
          >
            Shop now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    </>
  );
}