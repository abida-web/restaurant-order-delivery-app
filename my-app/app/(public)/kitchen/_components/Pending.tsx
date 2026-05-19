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

interface PendingProps {
  orders: Order[];
  onOrderUpdate: () => void; // Add this prop
}

const Pending: React.FC<PendingProps> = ({ orders, onOrderUpdate }) => {
  const handleStatusUpdate = async (orderId: string, currentStatus: string) => {
    const result = await updateStatus(orderId, "preparing");
    if (result) {
      // Refetch orders after successful update
      onOrderUpdate();
    }
    return result;
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-gray-400">No pending orders</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-amber-500">Pending Orders</h1>
        <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-500">
          {orders.length} orders
        </span>
      </div>

      <div className="grid gap-4 grid-cols-1">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onStatusUpdate={handleStatusUpdate}
            buttonLabel="Start Preparing"
          />
        ))}
      </div>
    </div>
  );
};

export default Pending;
