"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowLeftCircle, ArrowRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import OrderModal from "../../_components/OrderModal";
import OrderTableRow from "../../_components/TableRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomeInput from "../../_components/CustomeInput";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}
interface OrdersProp {
  id: string;
  customerName: string;
  type: string;
  totalAmount: string;
  status: string;
  phone: string;
  paymentMethod: string;
  createdAt: string;
  driverId?: string;
  driverName?: string;
  item: Array<{
    orderId: string;
    menuItem: {
      name: string;
    };
  }>;
}
interface Driver {
  id: string;
  name: string;
  email?: string;
}

const Orders = () => {
  const [openModal, setOpenModal] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<OrdersProp[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [page, setPage] = useState(1);
  const fetchDrivers = async () => {
    try {
      const res = await fetch("/api/admin/drivers");
      const data = await res.json();
      setDrivers(data.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const fetchItems = async () => {
    const res = await fetch("/api/admin/menuItems");
    const data = await res.json();
    setMenuItems(data);
  };

  const fetchOrders = async () => {
    const res = await fetch(`/api/admin/orders?page=${page}`);
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);
  useEffect(() => {
    fetchOrders();
  }, [page]);
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (!searchLower) return true;
    if (order.customerName?.toLowerCase().includes(searchLower)) return true;
    if (order.phone?.toLowerCase().includes(searchLower)) return true;
    if (order.id.toLowerCase().includes(searchLower)) return true;
    if (
      order.item?.some((item) =>
        item.menuItem.name.toLowerCase().includes(searchLower),
      )
    )
      return true;

    return false;
  });
  return (
    <div className="min-h-screen text-white">
      <header className="flex justify-between ">
        <Button onClick={() => setOpenModal(true)}>
          <Plus />
          Create Orders
        </Button>
        <div className="flex gap-5">
          <CustomeInput
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="">
        <div className="">
          <h1 className="pt-4 text-2xl">List of all orders</h1>
          <p className="font-normal text-gray-400">
            Manage all orders and statuses
          </p>
          <Table>
            <TableCaption>A list of your orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Driver ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <OrderTableRow
                  key={order.id}
                  order={order}
                  fetchOrders={fetchOrders}
                  drivers={drivers} // Add this line
                />
              ))}
            </TableBody>
          </Table>
          <div className=" flex items-center justify-center gap-5 mt-5">
            <Button
              variant={"outline"}
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              <ArrowLeft />
            </Button>
            <span className=" font-bold">{page}</span>
            <Button
              variant={"outline"}
              onClick={() => setPage((prev) => prev + 1)}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        menuItems={menuItems}
        onOrderCreated={fetchOrders}
      />
    </div>
  );
};

export default Orders;
