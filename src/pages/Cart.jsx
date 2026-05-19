// // import CartItems from '../components/CartItems';
// // import Footer from '../components/Footer';
// // import Header from '../components/Header';
// // import Orders from '../components/Order';
// // import OrderSummary from '../components/OrderSummary';

// // export default function Cart() {
// //   return (
// //     <>
// //       <Header />

// //       <section id="cartPage" className="px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
// //         <CartItems />
// //         <Orders />
// //         <OrderSummary />
// //       </section>

// //       <Footer />
// //     </>
// //   );
// // }

// import { useState } from 'react';
// import CartItems from '../components/CartItems';
// import OrderSummary from '../components/OrderSummary';
// import Orders from '../components/Order';

// export default function CartPage() {
//   const [cart, setCart] = useState([]); // populate via context/props as needed
//   const [orders, setOrders] = useState([]);

//   const handleUpdateQuantity = (id, amount) => {
//     setCart(prev => prev.map(item => 
//       item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
//     ).filter(item => item.quantity > 0));
//   };

//   const handleRemoveItem = (id) => {
//     setCart(prev => prev.filter(item => item.id !== id));
//   };

//   const handleOrderProcessed = (newOrder) => {
//     setOrders(prev => [...prev, newOrder]);
//     setCart([]); // Clears cart upon successful order
//     alert('Order placed successfully!');
//   };

//   return (
//     <div className="p-4 sm:p-6 lg:p-10">
//       <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <CartItems 
//             cart={cart} 
//             onUpdateQuantity={handleUpdateQuantity} 
//             onRemoveItem={handleRemoveItem} 
//           />
//           <Orders orders={orders} />
//         </div>
//         <OrderSummary cart={cart} onOrderProcessed={handleOrderProcessed} />
//       </div>
//     </div>
//   );
// }

// src/pages/Cart.jsx
import Header from '../components/Header';
import CartItems from '../components/CartItems';
import OrderSummary from '../components/OrderSummary';
import Orders from '../components/Order';
import Footer from '../components/Footer';
import { useSite } from '../Store';

export default function CartPage() {
  const { cart, orders, updateQuantity, removeItem, processOrder, adminSettings } = useSite();

  const handleOrderProcessed = (newOrder) => {
    // 1. Process order locally in site state logger
    processOrder(newOrder);

    // 2. Automated Admin WhatsApp Routing Forwarder Engine
    if (adminSettings && adminSettings.whatsappNumber) {
      // Clean up string format numbers
      const sanitizedPhone = adminSettings.whatsappNumber.replace(/[^0-9]/g, '');
      if (sanitizedPhone) {
        const messageText = `*NEW ORDER RECIEVED* 🛍️\n\n` +
          `*Customer:* ${newOrder.fullName}\n` +
          `*Email:* ${newOrder.email}\n` +
          `*Phone:* ${newOrder.phone}\n` +
          `*Delivery Address:* ${newOrder.address}, ${newOrder.city}, ${newOrder.postcode}\n\n` +
          `*Purchased Lineup Items:*\n${newOrder.items.map(item => `• ${item}`).join('\n')}\n\n` +
          `*Grand Total:* $${newOrder.total.toFixed(2)}`;

        const encodedMessage = encodeURIComponent(messageText);
        const whatsappUrl = `https://wa.me/${sanitizedPhone}?text=${encodedMessage}`;
        
        // Triggers instant new tab outbox routing
        window.open(whatsappUrl, '_blank');
      }
    }
    alert('Order successfully logged! Admin WhatsApp alert generated.');
  };

  return (
    <div className="min-h-screen bg-[#f8f0e6]/40">
      <Header />

      <main id="cartPage" className="px-4 sm:px-6 lg:px-10 py-12 max-w-7xl mx-auto space-y-12">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <CartItems 
              cart={cart} 
              onUpdateQuantity={updateQuantity} 
              onRemoveItem={removeItem} 
            />
            <Orders orders={orders} />
          </div>
          <OrderSummary 
            cart={cart} 
            onOrderProcessed={handleOrderProcessed} 
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}