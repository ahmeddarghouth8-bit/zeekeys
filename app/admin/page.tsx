import { adminListOrders } from "@/lib/db"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  const orders = await adminListOrders()
  const total = orders.length
  const pending = orders.filter((o: any) => o.status === "PENDING").length
  const paid = orders.filter((o: any) => o.status === "PAID").length

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Total Orders</div>
          <div className="text-2xl font-bold">{total}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Pending</div>
          <div className="text-2xl font-bold">{pending}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Paid</div>
          <div className="text-2xl font-bold">{paid}</div>
        </div>
      </div>
      <div className="rounded-lg border p-4">
        <h2 className="font-semibold mb-3">Recent Orders</h2>
        <div className="space-y-2">
          {orders.slice(0, 10).map((o: any) => (
            <div key={o.id} className="flex items-center justify-between text-sm">
              <div className="font-mono">{o.id}</div>
              <div className="text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</div>
              <div className="font-semibold">${(o.totalCents / 100).toFixed(2)}</div>
              <div
                className={
                  o.status === "PAID"
                    ? "text-emerald-600 font-medium"
                    : o.status === "PENDING"
                    ? "text-amber-600 font-medium"
                    : "text-red-600 font-medium"
                }
              >
                {o.status}
              </div>
            </div>
          ))}
          {!orders.length && <div className="text-sm text-muted-foreground">No orders yet.</div>}
        </div>
      </div>
    </div>
  )
}
