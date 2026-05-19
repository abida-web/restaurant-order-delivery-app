import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import DetailsModal from "./DetailsModal";
import { toast } from "sonner";
import CustomSelect from "./CustomSelect";

interface OrdersProp {
  id: string;
  customerName: string;
  type: string;
  totalAmount: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  driverId?: string;
}

interface Driver {
  id: string;
  name: string;
  email?: string;
}
const OrderTableRow = ({
  order,
  fetchOrders,
  drivers,
}: {
  order: OrdersProp;
  fetchOrders: () => void;
  drivers: Driver[];
}) => {
  async function upadteStatus(status: string) {
    const res = await fetch(`/api/admin/orders/${order.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    });
    if (res.ok) {
      toast.success("Status upadted Succeefully");
      fetchOrders();
    }
  }
  async function assignDriver(orderId: string, driverId: string) {
    const res = await fetch(`/api/admin/orders`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ driverId: driverId, orderId: orderId }),
    });
    if (res.ok) {
      toast.success("Status upadted Succeefully");
      fetchOrders();
    }
  }
  return (
    <TableRow>
      <TableCell className="font-medium">
        {order.id.substring(0, 12)}...
      </TableCell>
      <TableCell>{order.customerName}</TableCell>
      <TableCell className="capitalize">{order.type}</TableCell>
      <TableCell>AFG {order.totalAmount}</TableCell>
      <TableCell>{order.driverId?.slice(0, 12)}...</TableCell>
      <TableCell>
        <select
          className={`px-2 py-1 rounded-full text-xs border ${
            order.status === "pending"
              ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
              : order.status === "preparing"
                ? "bg-blue-500/20 text-blue-500 border-blue-500/50"
                : order.status === "ready"
                  ? "bg-green-500/20 text-green-500 border-green-500/50"
                  : order.status === "delivered"
                    ? "bg-purple-500/20 text-purple-500 border-purple-500/50"
                    : "bg-red-500/20 text-red-500 border-red-500/50"
          }`}
          value={order.status}
          onChange={(e) => upadteStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out_for_delivery">Out for delivery</option>
          <option value="ready">Ready</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </TableCell>
      <TableCell className="capitalize">
        {order.paymentMethod || "N/A"}
      </TableCell>
      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 cursor-pointer"
              type="button"
            >
              <MoreHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-50">
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DetailsModal orderId={order.id} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CustomSelect
                data={drivers}
                value={order.driverId}
                onValueChange={(driverId) => assignDriver(order.id, driverId)}
                placeholder="Select a driver"
                label="Drivers"
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
              Delete Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default OrderTableRow;
