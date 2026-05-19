import React from "react";
import OrderCard from "./OrderCard";
import { updateStatus } from "@/actions/orders";

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

interface ReadyProps {
  orders: Order[];
  onOrderUpdate: () => void; // Add this prop
}

const Ready: React.FC<ReadyProps> = ({ orders, onOrderUpdate }) => {
  const handleStatusUpdate = async (orderId: string, currentStatus: string) => {
    const order = orders.find((o) => o.id === orderId);
    const newStatus =
      order?.type === "delivery" ? "out_for_delivery" : "completed";
    const result = await updateStatus(orderId, newStatus);
    if (result) {
      // Refetch orders after successful update
      onOrderUpdate();
    }
    return result;
  };

  const getButtonLabel = (order: Order): string => {
    switch (order.type) {
      case "delivery":
        return "Start Delivery";
      case "dine-in":
        return "Mark as Served";
      case "takeaway":
        return "Mark as Picked Up";
      default:
        return "Complete Order";
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-gray-400">No ready orders</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-500">Ready Orders</h1>
        <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-500">
          {orders.length} orders
        </span>
      </div>

      <div className="grid gap-4 grid-cols-1">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onStatusUpdate={handleStatusUpdate}
            buttonLabel={getButtonLabel(order)}
          />
        ))}
      </div>
    </div>
  );
};

export default Ready;
