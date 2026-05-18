import { Waves, Droplet, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Shop() {
  return (
    <>

    <Header />

      <section id="shopPage" className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-semibold text-3xl mb-12">Shop by Category</h2>

          {/* CLEANSE & PREP SECTION */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="rounded-2xl w-12 h-12 flex items-center justify-center"
                style={{ background: 'linear-gradient(145deg, #f4e5d2, #e9cda9)' }}
              >
                <Waves className="w-6 h-6" />
              </div>
              <h3 id="shopCategoryOne" className="font-semibold text-2xl">Cleanse & Prep</h3>
            </div>
            <div id="cleanseGrid" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"></div>
          </div>

          {/* TREAT & TARGET SECTION */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="rounded-2xl w-12 h-12 flex items-center justify-center"
                style={{ background: 'linear-gradient(145deg, #dfe8d7, #b9c8a9)' }}
              >
                <Droplet className="w-6 h-6" />
              </div>
              <h3 id="shopCategoryTwo" className="font-semibold text-2xl">Treat & Target</h3>
            </div>
            <div id="treatGrid" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"></div>
          </div>

          {/* PROTECT & MOISTURISE SECTION */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="rounded-2xl w-12 h-12 flex items-center justify-center"
                style={{ background: 'linear-gradient(145deg, #eadfd2, #d8bda0)' }}
              >
                <Shield className="w-6 h-6" />
              </div>
              <h3 id="shopCategoryThree" className="font-semibold text-2xl">Protect & Moisturise</h3>
            </div>
            <div id="protectGrid" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"></div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}