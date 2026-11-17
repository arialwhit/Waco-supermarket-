import { Link, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatNaira } from '../utils/format';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';

export function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="w-[var(--w)] mx-auto pt-[110px] pb-16">
        <div className="bg-white rounded-[14px] p-12 text-center">
          <h1 className="text-2xl font-semibold text-[#16193a]">Order not found</h1>
          <Link
            to="/shop"
            className="mt-5 inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#141a4a] text-white text-sm font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs items={[{ label: 'Order Confirmation' }]} />

      <div className="bg-[#141a4a] text-white rounded-[14px] p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="w-10 h-10 text-[#f7d23a] shrink-0 mt-1" />
          <div>
            <span className="text-xs font-semibold text-[#f7d23a]">
              Simulated Order Confirmed · {order.orderNumber}
            </span>
            <h1 className="mt-1 text-2xl md:text-3xl font-semibold">
              Thank you, {order.customer.fullName}
            </h1>
            <p className="mt-1.5 text-sm text-white/80">
              Estimated fulfillment: {order.estimatedDelivery}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link
            to={`/account/orders/${order.id}`}
            className="h-10 px-5 rounded-full bg-white/15 text-white text-xs font-semibold inline-flex items-center hover:bg-white/25"
          >
            View Order Details
          </Link>
          <Link
            to="/shop"
            className="h-10 px-6 rounded-full bg-[#f7d23a] text-[#141a4a] text-xs font-semibold inline-flex items-center hover:bg-white"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--gap)]">
        <div className="lg:col-span-8 bg-white rounded-[14px] p-6">
          <h2 className="text-lg font-semibold text-[#16193a] mb-4">
            Purchased Groceries ({order.items.length})
          </h2>
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
            <h2 className="text-base font-semibold text-[#16193a] mb-2">Customer &amp; Delivery</h2>
            <p className="font-medium text-[#16193a]">{order.customer.fullName}</p>
            <p className="text-[#5a5d76]">{order.customer.email}</p>
            <p className="text-[#5a5d76]">{order.customer.phone}</p>
            <div className="pt-2 border-t border-[#16193a]/10">
              <p className="font-medium text-[#16193a]">
                {order.delivery.city}, {order.delivery.state}
              </p>
              <p className="text-[#5a5d76]">{order.delivery.address}</p>
            </div>
          </div>

          <div className="bg-white rounded-[14px] p-6 text-sm space-y-2">
            <h2 className="text-base font-semibold text-[#16193a] mb-2">Order Summary</h2>
            <div className="flex justify-between">
              <span className="text-[#5a5d76]">Subtotal</span>
              <span className="font-semibold tabular-nums">{formatNaira(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5a5d76]">Delivery</span>
              <span className="font-semibold tabular-nums">{formatNaira(order.deliveryFee)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#1c4a35]">
                <span>Discount</span>
                <span className="font-semibold tabular-nums">-{formatNaira(order.discount)}</span>
              </div>
            )}
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
