// export default function Orders() {
//     return (
//         <>
//         <div class="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
//         <div class="rounded-[2rem] border p-6 glass-card">
//         <h3 class="font-semibold text-xl mb-4">Active Orders</h3>
//         <div id="ordersList" class="grid gap-4"></div>
//        </div></div>
//         </>
//     )
// }
import { Package } from 'lucide-react';

export default function Orders({ orders = [] }) {
  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 mt-6">
      <div className="rounded-[2rem] border p-6 glass-card bg-white/80 lg:col-span-2">
        <h3 className="font-semibold text-xl mb-4">Active Orders</h3>
        <div id="ordersList" className="grid gap-4">
          {orders.length === 0 ? (
            <div className="rounded-[1.5rem] border p-6 text-center bg-white/50">
              <Package className="w-9 h-9 mx-auto mb-3 opacity-70" />
              <p className="font-semibold">No active orders</p>
              <p className="text-sm opacity-70 mt-2">Your orders will appear here.</p>
            </div>
          ) : (
            orders.map((order, idx) => (
              <div key={idx} className="rounded-[1.5rem] border p-4 glass-card bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-base">Order #{1000 + idx}</p>
                    <p className="text-xs opacity-70">{order.date}</p>
                  </div>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold" 
                    style={{
                      backgroundColor: order.status === 'processing' 
                        ? 'rgba(112, 83, 56, 0.15)' 
                        : 'rgba(126, 148, 121, 0.15)',
                      color: order.status === 'processing' ? '#705338' : '#5a6b56'
                    }}
                  >
                    {order.status === 'processing' ? 'Processing' : 'Shipped'}
                  </span>
                </div>
                <p className="text-sm text-gray-700 font-medium">Items: {order.items.join(', ')}</p>
                <p className="font-semibold mt-3 text-sm border-t pt-2 text-right">
                  Total Paid: ${order.total.toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}