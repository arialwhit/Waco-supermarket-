import { Link, useParams } from 'react-router-dom';
import { Check, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatNaira } from '../utils/format';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';

const TIMELINE_STEPS = ['Processing', 'Packed', 'Out for Delivery', 'Delivered'] as const;

export function OrderDetailsPage() {
  const { orderId } = useParams();
  const { orders, reorderPreviousOrder } = useStore();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="w-[var(--w)] mx-auto pt-[110px] pb-16">
        <div className="bg-white rounded-[14px] p-12 text-center">
          <h1 className="text-2xl font-semibold text-[#16193a]">Order not found</h1>
          <Link
            to="/account/orders"
            className="mt-5 inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#141a4a] text-white text-sm font-semibold"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const currentStepIdx = TIMELINE_STEPS.indexOf(order.status);

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs
        items={[
          { label: 'Account', to: '/account' },
          { label: 'Orders', to: '/account/orders' },
          { label: order.orderNumber },
        ]}
      />

      <div className="bg-white rounded-[14px] p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-[#5a5d76]">
            Placed {order.createdAt} · Mock Order Status
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#16193a] mt-1">
            Order {order.orderNumber}
          </h1>
        </div>
        <button
          type="button"
          onClick={() => reorderPreviousOrder(order)}
          className="h-10 px-5 rounded-full bg-[#f7d23a] text-[#141a4a] text-xs font-semibold inline-flex items-center gap-2 hover:bg-[#141a4a] hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reorder All Items
        </button>
      </div>

      {/* Mock Status Timeline */}
      <div className="bg-white rounded-[14px] p-6">
        <h2 className="text-sm font-semibold text-[#16193a] mb-4">Fulfillment Timeline (Mock)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TIMELINE_STEPS.map((step, idx) => {
            const done = idx <= currentStepIdx;
            return (
              <div
                key={step}
                className={`rounded-[10px] p-3 border ${
                  done
                    ? 'bg-[#141a4a] text-white border-[#141a4a]'
                    : 'bg-[#e9e7df]/55 text-[#5a5d76] border-transparent'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{step}</span>
                  {done && <Check className="w-3.5 h-3.5 text-[#f7d23a]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)]">
        <div className="lg:col-span-8 bg-white rounded-[14px] p-6">
          <h2 className="text-lg font-semibold text-[#16193a] mb-4">Purchased Items</h2>
          <div className="divide-y divide-[#16193a]/10">
            {order.items.map((item, idx) => (
              <div key={`${item.productId}-${idx}`} className="py-3 flex items-center gap-3.5">
                <SafeImage
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-14 rounded-lg object-cover bg-[#f4f2eb] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#16193a] truncate">{item.name}</p>
                  <p className="text-xs text-[#5a5d76] tabular-nums">
                    {item.variant} · Qty {item.quantity} × {formatNaira(item.unitPrice)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-[#141a4a] tabular-nums">
                  {formatNaira(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-[var(--gap)]">
          <div className="bg-white rounded-[14px] p-6 text-sm space-y-2">
            <h2 className="text-base font-semibold text-[#16193a] mb-2">Delivery Details</h2>
            <p className="font-semibold">{order.customer.fullName}</p>
            <p className="text-[#5a5d76]">{order.customer.phone}</p>
            <p className="text-[#5a5d76]">
              {order.delivery.address}, {order.delivery.city}, {order.delivery.state}
            </p>
            <p className="text-xs text-[#3a49c9] pt-1">{order.estimatedDelivery}</p>
          </div>

          <div className="bg-white rounded-[14px] p-6 text-sm space-y-2">
            <h2 className="text-base font-semibold text-[#16193a] mb-2">Payment Summary</h2>
            <div className="flex justify-between">
              <span className="text-[#5a5d76]">Subtotal</span>
              <span className="font-semibold tabular-nums">{formatNaira(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5a5d76]">Delivery</span>
              <span className="font-semibold tabular-nums">{formatNaira(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#16193a]/10 font-semibold text-base text-[#141a4a]">
              <span>Total</span>
              <span className="tabular-nums">{formatNaira(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
