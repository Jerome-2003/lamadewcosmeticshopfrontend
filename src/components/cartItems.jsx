export function Cart() {
  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="font-semibold text-3xl mb-6">Your Cart</h2>
        <div id="cartItemsList" className="grid gap-4 mb-8"></div>
      </div>
    </div>
  );
}