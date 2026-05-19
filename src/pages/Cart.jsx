import CartItems from '../components/CartItems';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Orders from '../components/Order';
import OrderSummary from '../components/OrderSummary';

export default function Cart() {
  return (
    <>
      <Header />

      <section id="cartPage" className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <CartItems />
        <Orders />
        <OrderSummary />
      </section>

      <Footer />
    </>
  );
}