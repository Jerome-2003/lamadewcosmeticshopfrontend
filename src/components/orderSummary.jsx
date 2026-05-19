import { useState } from 'react';

export default function OrderSummary({ cart = [], onOrderProcessed }) {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    address: '', city: '', postcode: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const processOrder = () => {
    const { fullName, email, phone, address, city, postcode } = form;
    if (!fullName || !email || !address) {
      alert('Please fill in required fields.');
      return;
    }
    const order = {
      ...form,
      items: cart.map(i => i.name),
      total,
      status: 'processing',
      date: new Date().toLocaleDateString()
    };
    console.log('Order placed:', order);
    if (onOrderProcessed) onOrderProcessed(order);
    setForm({ fullName: '', email: '', phone: '', address: '', city: '', postcode: '' });
  };

  return (
    <div className="lg:col-span-1">
      <div className="rounded-[2rem] border p-6 glass-card sticky top-24">
        <h3 className="font-semibold text-xl mb-4">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span> <span>${subtotal}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Shipping</span> <span>${shipping}</span>
        </div>
        <div className="border-t pt-4 mb-6 flex justify-between font-semibold">
          <span>Total</span> <span>${total}</span>
        </div>
        <h3 className="font-semibold text-lg mb-4">Shipping Info</h3>
        <div className="grid gap-3">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="rounded-lg border p-3 w-full text-sm"
            value={form.fullName}
            onChange={handleChange}
            autoComplete="name"
            spellCheck="false"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="rounded-lg border p-3 w-full text-sm"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            spellCheck="false"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="rounded-lg border p-3 w-full text-sm"
            value={form.phone}
            onChange={handleChange}
            autoComplete="tel"
            spellCheck="false"
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            className="rounded-lg border p-3 w-full text-sm"
            value={form.address}
            onChange={handleChange}
            autoComplete="street-address"
            spellCheck="false"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="rounded-lg border p-3 w-full text-sm"
            value={form.city}
            onChange={handleChange}
            autoComplete="address-level2"
            spellCheck="false"
          />
          <input
            type="text"
            name="postcode"
            placeholder="Postcode"
            className="rounded-lg border p-3 w-full text-sm"
            value={form.postcode}
            onChange={handleChange}
            autoComplete="postal-code"
            spellCheck="false"
          />
        </div>
        <button
          type="button"
          className="w-full rounded-full px-6 py-4 font-semibold mt-6 transition hover:-translate-y-1"
          onClick={processOrder}
        >
          Process Order
        </button>
      </div>
    </div>
  );
}