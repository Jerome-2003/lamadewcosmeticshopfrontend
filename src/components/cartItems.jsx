// export default function CartItems() {
//   return (
//     <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
//       <div className="lg:col-span-2">
//         <h2 className="font-semibold text-3xl mb-6">Your Cart</h2>
//         <div id="cartItemsList" className="grid gap-4 mb-8"></div>
//       </div>
//     </div>
//   );
// }
import { Trash2, ShoppingBag } from 'lucide-react';

export default function CartItems({ cart = [], onUpdateQuantity, onRemoveItem }) {
  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="font-semibold text-3xl mb-6">Your Cart</h2>
        <div id="cartItemsList" className="grid gap-4 mb-8">
          {cart.length === 0 ? (
            <div className="rounded-[1.5rem] border p-6 text-center bg-white/80">
              <ShoppingBag className="w-9 h-9 mx-auto mb-3 opacity-70" />
              <p className="font-semibold">Your cart is empty</p>
              <p className="text-sm opacity-70 mt-2">Add a product to get started.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="rounded-[1.5rem] border p-4 glass-card bg-white/80">
                <div className="flex gap-4">
                  {/* Accent Background Wrapper */}
                  <div 
                    className="w-20 h-20 rounded-2xl flex-shrink-0" 
                    style={{ background: item.accent }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm opacity-70 mt-1">${item.price}</p>
                      </div>
                      <button 
                        type="button" 
                        className="rounded-full p-2 border hover:bg-gray-100 transition" 
                        onClick={() => onRemoveItem(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button 
                        type="button" 
                        className="rounded-full w-8 h-8 border flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 font-semibold" 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button 
                        type="button" 
                        className="rounded-full w-8 h-8 border flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 font-semibold" 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}