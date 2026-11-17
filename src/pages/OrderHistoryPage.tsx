import { Link } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatNaira } from '../utils/format';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export function OrderHistoryPage() {
  const { orders, reorderPreviousOrder } = useStore();

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs
        items={[
          { label: 'Account', to: '/account' },
          { label: 'Order History' },
        ]}
      />

      <div className="bg-white rounded-[14px] p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#16193a]">Order History</h1>
        <p className="text-xs md:text-sm text-[#5a5d76] mt-1">
          Simulated customer order records stored locally in your browser.
        </p>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-[14px] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-base font-semibold text-[#16193a]">{order.orderNumber}</span>
                <span className="text-xs font-semibold px-3 py-0.5 rounded-full bg-[#f7d23a] text-[#141a4a]">
                  {order.status} (Mock)
                </span>
              </div>
              <p className="text-xs text-[#5a5d76] tabular-nums">
                Placed {order.createdAt} · {order.items.length} products · Total{' '}
                <strong className="text-[#141a4a]">{formatNaira(order.total)}</strong>
              </p>
              <p className="text-xs text-[#5a5d76] truncate max-w-[60ch]">
                {order.items.map((i) => i.name).join(', ')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => reorderPreviousOrder(order)}
                className="h-9 px-4 rounded-full bg-[#e9e7df] text-[#141a4a] text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-[#f7d23a] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reorder Items
              </button>
              <Link
                to={`/account/orders/${order.id}`}
                className="h-9 px-5 rounded-full bg-[#141a4a] text-white text-xs font-semibold inline-flex items-center hover:bg-[#3a49c9] transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
