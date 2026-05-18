import Header from '../components/Header';
import AboutSkincareAdv from '../components/AboutSkincareAdv';
import SkincareAdv from '../components/SkincareAdv';
import Video from '../components/Video';
import CategoryGrid from '../components/CategoryGrid';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />

      <section id="homePage" className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <AboutSkincareAdv />
        <SkincareAdv />
        <Video />
        <CategoryGrid />
        <Footer />
      </section>
    </>
  );
}