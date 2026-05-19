"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type OrderType = "dine-in" | "takeaway" | "delivery";
type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";
type PaymentMethod = "card" | "cash" | "online";
type PaymentStatus = "pending" | "paid" | "failed";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  isAvaliable: boolean;
  categoryId: string;
  updatedAt: string;
  createdAt: string;
}

interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  quantity: number;
  price: string;
  notes: string | null;
  createdAt: string;
  menuItem: MenuItem;
}

interface Driver {
  id: string;
  name: string;
  email?: string;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  type: OrderType;
  status: OrderStatus;
  totalAmount: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  driverId: string | null;
  updatedAt: string;
  createdAt: string;
  item: OrderItem[];
  driver: Driver | null;
}
const DetailsModal = ({ orderId }: { orderId: string }) => {
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`/api/admin/orders/${orderId}`);
        const data = await res.json();
        setOrderDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start px-2">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order details</DialogTitle>
        </DialogHeader>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-2">
            <pre className="text-sm">
              <h1>
                <span className=" text-gray-400">Customer Name:</span>
                {orderDetails?.customerName}
              </h1>
              <p>
                <span className=" text-gray-400">Customer P.Number:</span>
                {orderDetails?.phone}
              </p>
              <p>
                <span className=" text-gray-400">Address:</span>
                {orderDetails?.address}
              </p>
              <p>
                <span className=" text-gray-400">Type:</span>
                {orderDetails?.type}
              </p>
              <p
                className={`${
                  orderDetails?.status === "pending"
                    ? " text-yellow-500 "
                    : orderDetails?.status === "preparing"
                      ? " text-blue-500"
                      : orderDetails?.status === "ready"
                        ? " text-green-500 "
                        : orderDetails?.status === "delivered"
                          ? " text-purple-500 "
                          : " text-red-500 "
                }`}
              >
                <span className=" text-gray-400">Status:</span>
                {orderDetails?.status}
              </p>
              <p>
                <span className=" text-gray-400">Price: </span>
                <span className=" text-red-500">AFG</span>
                {orderDetails?.totalAmount}
              </p>
              <p>
                <span className=" text-gray-400">Date: </span>
                {new Date(orderDetails?.createdAt).toLocaleDateString()}
              </p>
              <h2 className=" py-3 text-lg text-amber-400">Ordered Items</h2>
              <div className=" border p-3 rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderDetails?.item.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <span>{item.menuItem.name}</span>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>AFG {item.price}</TableCell>
                        <TableCell className="text-right">
                          AFG {Number(item.price) * item.quantity}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </pre>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
