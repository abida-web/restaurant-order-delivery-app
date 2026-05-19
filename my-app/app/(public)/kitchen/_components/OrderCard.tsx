import React from "react";
import { Card } from "@/components/ui/card";

// Type definitions
interface MenuItem {
  id: string;
  name: string;
  price?: number;
}

interface OrderItem {
  id: string;
  quantity: number;
  notes?: string;
  menuItem: MenuItem;
}

interface Order {
  id: string;
  createdAt: string | Date;
  type: "dine-in" | "takeaway" | "delivery";
  item: OrderItem[];
  status?: string;
  customerName?: string;
}

interface OrderCardProps {
  order: Order;
  buttonLabel?: string;
  onStatusUpdate?: (orderId: string, status: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onStatusUpdate,
  buttonLabel,
}) => {
  const handleStatusUpdate = () => {
    if (onStatusUpdate) {
      onStatusUpdate(order.id, order.status);
    }
  };
  const getAgeInMinutes = (createdAt) => {
    const orderTime = new Date(createdAt);
    const currentTime = new Date();
    const ageMinutes = Math.floor((currentTime - orderTime) / (1000 * 60));
    const agehours = Math.floor((currentTime - orderTime) / (1000 * 60 * 60));
    const ageDays = Math.floor(
      (currentTime - orderTime) / (1000 * 60 * 60 * 24),
    );
    let time;
    let stausString;
    if (ageDays > 0) {
      time = `${ageDays}d ${agehours % 24}h ago`;
      stausString = "Urgent";
    }
    if (agehours > 0) {
      time = `${agehours}h ${ageMinutes % 60}m ago`;
      stausString = agehours >= 2 ? "Warning" : "Normal";
    } else {
      time = `${ageMinutes} min ago`;
      stausString =
        ageMinutes < 10 ? "Normal" : ageMinutes < 20 ? "Warning" : "Urgent";
    }
    return { time: time, status: stausString };
  };
  const orderAge = getAgeInMinutes(order.createdAt);
  return (
    <Card className="overflow-hidden border-gray-800 bg-gray-900 shadow-lg transition-shadow hover:shadow-xl hover:shadow-amber-500/10">
      <div className="border-b border-gray-800 bg-gray-800/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Order #{order.id.slice(-6)}</p>
            <p className="text-xs text-gray-500 mb-2">({orderAge?.time})</p>
            <span
              className={`text-xs px-2 py-1 rounded mts-4 ${
                orderAge?.status === "Normal"
                  ? "bg-green-900/50 text-green-400"
                  : orderAge?.status === "Warning"
                    ? "bg-yellow-900/50 text-yellow-400"
                    : "bg-red-900/50 text-red-400"
              }`}
            >
              {orderAge?.status}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                order.type === "dine-in"
                  ? "bg-purple-500/10 text-purple-400"
                  : order.type === "takeaway"
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-green-500/10 text-green-400"
              }`}
            >
              {order.type === "dine-in"
                ? "Dine In"
                : order.type === "takeaway"
                  ? "Takeaway"
                  : "Delivery"}
            </span>
            {order.customerName && (
              <span className="mt-1 text-xs text-gray-500">
                {order.customerName}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {order.item?.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-800 bg-gray-800/30 p-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-amber-500">
                    {item.quantity}×
                  </span>
                  <span className="text-gray-300">{item.menuItem.name}</span>
                </div>
              </div>
              {item.notes && (
                <p className="mt-2 text-sm text-gray-400">
                  <span className="font-medium text-gray-500">Notes:</span>{" "}
                  {item.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800 bg-gray-800/50 p-4">
        <button
          onClick={handleStatusUpdate}
          className="w-full rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-gray-900 transition-all hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          {buttonLabel}
        </button>
      </div>
    </Card>
  );
};

export default OrderCard;
