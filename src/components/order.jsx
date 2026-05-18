export default function Orders() {
    return (
        <>
        <div class="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        <div class="rounded-[2rem] border p-6 glass-card">
        <h3 class="font-semibold text-xl mb-4">Active Orders</h3>
        <div id="ordersList" class="grid gap-4"></div>
       </div></div>
        </>
    )
}