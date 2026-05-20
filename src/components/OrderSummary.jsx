// import { useState } from 'react';

// export default function OrderSummary({ cart = [], onOrderProcessed }) {
//   const [form, setForm] = useState({
//     fullName: '', email: '', phone: '',
//     address: '', city: '', postcode: ''
//   });
//   const [submitting, setSubmitting] = useState(false);

//   const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const shipping = subtotal > 0 ? 10 : 0;
//   const total = subtotal + shipping;

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const processOrder = async () => {
//     const { fullName, email, phone, address, city, postcode } = form;

//     if (!fullName || !email || !phone || !address || !city || !postcode) {
//       alert('Please fill in all required shipping fields.');
//       return;
//     }
//     if (cart.length === 0) {
//       alert('Your cart is empty. Add items before processing your order.');
//       return;
//     }

//     const orderPayload = {
//       name: fullName,
//       email,
//       phone,
//       address,
//       city,
//       postcode,
//       items: cart.map(i => `${i.name} (x${i.quantity})`),
//       total
//     };

//     setSubmitting(true);
//     try {
//       const response = await fetch('http://localhost:3001/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(orderPayload)
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to place order');
//       }

//       if (onOrderProcessed) onOrderProcessed(data.order);
//       setForm({ fullName: '', email: '', phone: '', address: '', city: '', postcode: '' });
//     } catch (error) {
//       alert(`Order Error: ${error.message}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="lg:col-span-1">
//       <div className="rounded-[2rem] border p-6 glass-card sticky top-24 bg-white/80 shadow-sm">
//         <h3 className="font-semibold text-xl mb-4">Order Summary</h3>
//         <div className="flex justify-between mb-2 text-sm">
//           <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between mb-4 text-sm">
//           <span>Shipping</span> <span>${shipping.toFixed(2)}</span>
//         </div>
//         <div className="border-t pt-4 mb-6 flex justify-between font-semibold text-base">
//           <span>Total</span> <span>${total.toFixed(2)}</span>
//         </div>

//         <h3 className="font-semibold text-lg mb-4">Shipping Info</h3>
//         <div className="grid gap-3">
//           <input type="text" name="fullName" placeholder="Full Name"
//             className="rounded-lg border p-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
//             value={form.fullName} onChange={handleChange} autoComplete="name" spellCheck="false" />
//           <input type="email" name="email" placeholder="Email"
//             className="rounded-lg border p-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
//             value={form.email} onChange={handleChange} autoComplete="email" spellCheck="false" />
//           <input type="tel" name="phone" placeholder="Phone Number"
//             className="rounded-lg border p-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
//             value={form.phone} onChange={handleChange} autoComplete="tel" spellCheck="false" />
//           <input type="text" name="address" placeholder="Street Address"
//             className="rounded-lg border p-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
//             value={form.address} onChange={handleChange} autoComplete="street-address" spellCheck="false" />
//           <input type="text" name="city" placeholder="City"
//             className="rounded-lg border p-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
//             value={form.city} onChange={handleChange} autoComplete="address-level2" spellCheck="false" />
//           <input type="text" name="postcode" placeholder="Postcode"
//             className="rounded-lg border p-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
//             value={form.postcode} onChange={handleChange} autoComplete="postal-code" spellCheck="false" />
//         </div>
//         <button
//           type="button"
//           disabled={submitting}
//           className="w-full bg-[#705338] text-white rounded-full px-6 py-4 font-semibold mt-6 transition hover:opacity-90 active:scale-98 shadow-md disabled:opacity-60"
//           onClick={processOrder}
//         >
//           {submitting ? 'Placing Order...' : 'Process Order'}
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function OrderSummary({ cart = [], onOrderProcessed }) {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    address: '', city: '', postcode: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const processOrder = async () => {
    const { fullName, email, phone, address, city, postcode } = form;

    if (!fullName || !email || !phone || !address || !city || !postcode) {
      alert('Please fill in all required shipping fields.');
      return;
    }
    if (cart.length === 0) {
      alert('Your cart is empty. Add items before processing your order.');
      return;
    }

    const orderPayload = {
      name: fullName,
      email,
      phone,
      address,
      city,
      postcode,
      items: cart.map(i => `${i.name} (x${i.quantity})`),
      total
    };

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      if (onOrderProcessed) onOrderProcessed(data.order);
      setForm({ fullName: '', email: '', phone: '', address: '', city: '', postcode: '' });
    } catch (error) {
      alert(`Order Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="rounded-[2rem] border p-6 glass-card sticky top-24 bg-white/80 shadow-sm">
        <h3 className="font-semibold text-xl mb-4">Order Summary</h3>
        <div className="flex justify-between mb-2 text-sm">
          <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4 text-sm">
          <span>Shipping</span> <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="border-t pt-4 mb-6 flex justify-between font-semibold text-base">
          <span>Total</span> <span>${total.toFixed(2)}</span>
        </div>

        <h3 className="font-semibold text-lg mb-4">Shipping Info</h3>
        <div className="grid gap-3">
          <input type="text" name="fullName" placeholder="Full Name"
            className="rounded-lg border p-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
            value={form.fullName} onChange={handleChange} autoComplete="name" spellCheck="false" />
          <input type="email" name="email" placeholder="Email"
            className="rounded-lg border p-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
            value={form.email} onChange={handleChange} autoComplete="email" spellCheck="false" />
          <input type="tel" name="phone" placeholder="Phone Number"
            className="rounded-lg border p-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
            value={form.phone} onChange={handleChange} autoComplete="tel" spellCheck="false" />
          <input type="text" name="address" placeholder="Street Address"
            className="rounded-lg border p-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
            value={form.address} onChange={handleChange} autoComplete="street-address" spellCheck="false" />
          <input type="text" name="city" placeholder="City"
            className="rounded-lg border p-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
            value={form.city} onChange={handleChange} autoComplete="address-level2" spellCheck="false" />
          <input type="text" name="postcode" placeholder="Postcode"
            className="rounded-lg border p-3 w-full text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
            value={form.postcode} onChange={handleChange} autoComplete="postal-code" spellCheck="false" />
        </div>
        <button
          type="button"
          disabled={submitting}
          className="w-full bg-[#705338] text-white rounded-full px-6 py-4 font-semibold mt-6 transition hover:opacity-90 active:scale-98 shadow-md disabled:opacity-60"
          onClick={processOrder}
        >
          {submitting ? 'Placing Order...' : 'Process Order'}
        </button>
      </div>
    </div>
  );
}