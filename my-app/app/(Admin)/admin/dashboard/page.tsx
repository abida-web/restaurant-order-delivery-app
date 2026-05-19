"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { BarChart2, Percent, Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DashboardProps {
  drivers: number;
  todayOrders: number;
  todayRevenue: number;
  pendingOrders: number;
  report: Array<{ date: string; orderCount: number }>;
  latestOrders: Array<{
    id: string;
    customerName: string;
    type: string;
    totalAmount: string;
    status: string;
    paymentMethod: string;
    createdAt: string;
    driverId?: string;
  }>;
  deliveries: number;
  takeAwayPrecentage: number;
  DineInPrecentage: number;
}

const chartConfig = {
  orderCount: {
    label: "Orders",
    color: " var(--color-amber-500)",
  },
} satisfies ChartConfig;

const Dashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardProps | null>(null);
  const fetchDashboard = async () => {
    const res = await fetch("/api/admin/dashboard");
    const data = await res.json();
    setDashboard(data);
  };
  useEffect(() => {
    fetchDashboard();
  }, []);
  const router = useRouter();
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap";
      case "completed":
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap";
      case "cancelled":
        return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap";
      case "preparing":
        return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap";
      default:
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap";
    }
  };
  return (
    <div>
      <div className=" flex justify-between">
        <h1 className="text-2xl mt-5">Owner Dashboard</h1>
      </div>
      <div className="flex gap-3 flex-wrap mt-5">
        <Button onClick={() => router.push("/admin/orders")}>
          <Plus className="mr-2 h-4 w-4" /> New Order
        </Button>
        <Button
          variant={"outline"}
          onClick={() => router.push("/admin/kitchen")}
        >
          Go to Kitchen
        </Button>
        <Button onClick={() => router.push("/admin/menu")}>
          <Plus className="mr-2 h-4 w-4" /> New MenuItem
        </Button>
        <Button
          variant={"outline"}
          onClick={() => router.push("/admin/drivers")}
        >
          View Drivers
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
        <div className="flex flex-col justify-center bg-amber-500 text-white items-center p-5 text-xl rounded-lg shadow-md shadow-amber-200">
          <span className="font-medium">Total Orders (Today)</span>
          <span className="text-2xl font-bold mt-1">
            {dashboard?.todayOrders ?? 0}
          </span>
        </div>

        <div className="flex flex-col justify-center bg-amber-500 text-white items-center p-5 text-xl rounded-lg shadow-md shadow-amber-200">
          <span className="font-medium">Total Revenue (Today)</span>
          <span className="text-2xl font-bold mt-1">
            AFG {dashboard?.todayRevenue?.toLocaleString() ?? 0}
          </span>
        </div>

        <div className="flex flex-col justify-center bg-amber-500 text-white items-center p-5 text-xl rounded-lg shadow-md shadow-amber-200">
          <span className="font-medium">Pending Orders</span>
          <span className="text-2xl font-bold mt-1">
            {dashboard?.pendingOrders ?? 0}
          </span>
        </div>

        <div className="flex flex-col justify-center bg-amber-500 text-white items-center p-5 text-xl rounded-lg shadow-md shadow-amber-200">
          <span className="font-medium">Active Drivers</span>
          <span className="text-2xl font-bold mt-1">
            {dashboard?.drivers ?? 0}
          </span>
        </div>
      </div>
      <h1 className=" pt-7 text-2xl font-semibold">Order Types</h1>
      <div className="flex gap-5 mt-5">
        <div className="flex flex-col items-center bg-blue-500 text-white p-4 rounded-lg flex-1">
          <span className="font-medium">Delivery Percentage</span>
          <span className="text-2xl font-bold">
            {dashboard?.deliveries?.toFixed(1) ?? 0}%
          </span>
        </div>
        <div className="flex flex-col items-center bg-green-500 text-white p-4 rounded-lg flex-1">
          <span className="font-medium">Takeaway Percentage</span>
          <span className="text-2xl font-bold">
            {dashboard?.takeAwayPrecentage?.toFixed(1) ?? 0}%
          </span>
        </div>
        <div className="flex flex-col items-center bg-purple-500 text-white p-4 rounded-lg flex-1">
          <span className="font-medium">Dine-in Percentage</span>
          <span className="text-2xl font-bold">
            {dashboard?.DineInPrecentage?.toFixed(1) ?? 0}%
          </span>
        </div>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={dashboard?.report}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="orderCount"
                fill="var(--color-orderCount)" //
                radius={8}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium"></div>
          <div className="leading-none text-muted-foreground">
            Showing total orders for the last 6 days
          </div>
        </CardFooter>
      </Card>
      <Card className="mt-5 hidden lg:flex">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableCaption>A list of recent orders</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] whitespace-nowrap">
                  Order ID
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  Customer Name
                </TableHead>
                <TableHead className="whitespace-nowrap">Type</TableHead>
                <TableHead className="whitespace-nowrap">Total</TableHead>
                <TableHead className="whitespace-nowrap">Driver ID</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">
                  Payment Method
                </TableHead>
                <TableHead className="whitespace-nowrap">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dashboard?.latestOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {order.id.substring(0, 12)}...
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {order.customerName}
                  </TableCell>
                  <TableCell className="capitalize whitespace-nowrap">
                    {order.type}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    AFN {order.totalAmount}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {order.driverId
                      ? order.driverId.substring(0, 12) + "..."
                      : "Not assigned"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span className={getStatusColor(order.status)}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="capitalize whitespace-nowrap">
                    {order.paymentMethod || "N/A"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
