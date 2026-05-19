// import Header from '../components/Header';
// import AboutSkincareAdv from '../components/AboutSkincareAdv';
// import SkincareAdv from '../components/SkincareAdv';
// import Video from '../components/Video';
// import CategoryGrid from '../components/CategoryGrid';
// import Footer from '../components/Footer';

// export default function HomePage() {
//   return (
//     <>
//       <Header />

//       <section id="homePage" className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
//         <AboutSkincareAdv />
//         <SkincareAdv />
//         <Video />
//         <CategoryGrid />
//         <Footer />
//       </section>
//     </>
//   );
// }

// src/pages/HomePage.jsx
import Header from '../components/Header';
import AboutSkincareAdv from '../components/AboutSkincareAdv';
import SkincareAdv from '../components/SkincareAdv';
import Video from '../components/Video';
import CategoryGrid from '../components/CategoryGrid';
import Footer from '../components/Footer';

export default function HomePage() {

  
  return (
    <div className="min-h-screen bg-[#f8f0e6]/40">
      <Header />
      <main id="homePage" className="px-4 sm:px-6 lg:px-10 py-8 sm:py-12 max-w-7xl mx-auto space-y-6">
        <AboutSkincareAdv />
        <SkincareAdv />
        <Video />
        <CategoryGrid />
      </main>
      <Footer />
    </div>
  );
}