export default function Footer() {
  return (
    <>
      <footer id="siteFooter" className="px-4 sm:px-6 lg:px-10 py-8 border-t mt-16">
        <div className="max-w-7xl mx-auto">
          <p className="max-w-2xl">Vegan formulas. Dermatologist reviewed. Made for daily rituals.</p>
        </div>
      </footer>
      <div id="toast" className="fixed left-1/2 bottom-6 z-50 -translate-x-1/2 rounded-full px-5 py-3 shadow-xl border hidden" role="status" aria-live="polite"></div>
    </>
  );
}