export default function OrderSummary() {
  return (
    <div className="lg:col-span-1">
      <div className="rounded-[2rem] border p-6 glass-card sticky top-24">
        <h3 className="font-semibold text-xl mb-4">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span> <span id="subtotal">$0</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Shipping</span> <span id="shipping">$0</span>
        </div>
        <div className="border-t pt-4 mb-6 flex justify-between font-semibold">
          <span>Total</span> <span id="total">$0</span>
        </div>
        <h3 className="font-semibold text-lg mb-4">Shipping Info</h3>
        <div className="grid gap-3">
          <input type="text" id="fullName" placeholder="Full Name" className="rounded-lg border p-3 w-full text-sm" onChange={updateOrderInfo} />
          <input type="email" id="email" placeholder="Email" className="rounded-lg border p-3 w-full text-sm" onChange={updateOrderInfo} />
          <input type="tel" id="phone" placeholder="Phone Number" className="rounded-lg border p-3 w-full text-sm" onChange={updateOrderInfo} />
          <input type="text" id="address" placeholder="Street Address" className="rounded-lg border p-3 w-full text-sm" onChange={updateOrderInfo} />
          <input type="text" id="city" placeholder="City" className="rounded-lg border p-3 w-full text-sm" onChange={updateOrderInfo} />
          <input type="text" id="postcode" placeholder="Postcode" className="rounded-lg border p-3 w-full text-sm" onChange={updateOrderInfo} />
        </div>
        <button id="checkoutBtn" type="button" className="w-full rounded-full px-6 py-4 font-semibold mt-6 transition hover:-translate-y-1" onClick={processOrder}>
          Process Order
        </button>
      </div>
    </div>
  );
}