"use client";

import { driverDetails } from "@/actions/drivers";
import { updateStatus } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface DriverData {
  id: string;
  name: string;
  email: string;
  status?: string; // Make optional if it might not exist
  role: string;
  driverOrders?: any[]; // Define proper Order type if needed
}

const Driver = () => {
  const { data: session, isPending } = authClient.useSession();
  const [driverData, setDriverData] = useState<DriverData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Redirect non-drivers
  useEffect(() => {
    if (
      !isPending &&
      session?.user.role !== "driver" &&
      session?.user.role !== "admin"
    ) {
      router.push("/");
    }
  }, [session, isPending, router]);

  // Fetch driver details
  const fetchDriverDetails = async () => {
    if (!session?.user.id) return;

    try {
      setIsLoading(true);
      const res = await driverDetails(session?.user.id);
      setDriverData(res);
    } catch (error) {
      console.error("Failed to fetch driver details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user.id) {
      fetchDriverDetails();
    }
    {
      const interval = setInterval(() => {
        fetchDriverDetails();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [session?.user.id, driverDetails]);

  // Loading states
  if (isPending || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // No session or unauthorized
  if (
    !session ||
    (session.user.role !== "driver" && session.user.role !== "admin")
  ) {
    return null;
  }

  // No driver data
  if (!driverData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>No driver data found</div>
      </div>
    );
  }
  const handleOrderStatusUpdat = async (orderId: string, status: string) => {
    const update = await updateStatus(orderId, status);
    fetchDriverDetails();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow rounded-lg border-amber-500 mb-6 border p-5">
        <div className="w-full md:w-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-300">
            Driver: {driverData.name}
          </h1>
          {driverData.status && (
            <div className="mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium inline-block
          ${
            driverData.status === "active"
              ? "bg-green-100 text-green-800"
              : driverData.status === "busy"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
          }`}
              >
                Status: {driverData.status}
              </span>
            </div>
          )}
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Email: {driverData.email}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xl sm:text-2xl font-semibold w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <Package size={30} color="oklch(76.9% 0.188 70.08)" />
            <h1 className="text-gray-400   sm:inline-flex hidden ">
              Total active deliveries :
            </h1>
            {/* Short version for very small screens */}
            <h1 className="text-gray-400 text-sm  sm:hidden">Deliveries :</h1>
          </div>
          <span className="text-amber-500 text-xl sm:text-2xl font-bold">
            ({driverData.driverOrders?.length || 0})
          </span>
        </div>
      </header>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {driverData.driverOrders
          ?.filter((order) => order.status !== "delivered")
          ?.map((order) => (
            <div
              key={order.id}
              className=" border shadow shadow-amber-500 p-5 rounded-lg"
            >
              <p className=" flex gap-2 items-center">
                <span className="text-gray-400">OrderId:</span>
                <span>{order.id.slice(0, 10)}</span>
              </p>
              <p className=" flex gap-2 items-center">
                <span className="text-gray-400">Customer:</span>
                <span>{order.customerName}</span>
              </p>
              <p className=" flex gap-2 items-center">
                <span className="text-gray-400">Phone:</span>
                <span>{order.phone}</span>
              </p>
              <p className=" flex gap-2 items-center">
                <span className="text-gray-400">Address:</span>
                <span>{order.address}</span>
              </p>
              <p className=" flex gap-2 items-center">
                <span className="text-gray-400">Type:</span>
                <span>{order.type}</span>
              </p>

              <p className=" flex gap-2 items-center">
                <span className="text-gray-400">Type:</span>
                <span>{order.status}</span>
              </p>
              <p className=" flex gap-2 items-center">
                <span className="text-gray-400">Address:</span>
                <span>
                  <span className=" text-red-600">AFG </span>
                  {order.totalAmount}
                </span>
              </p>
              <Button
                onClick={() => handleOrderStatusUpdat(order.id, "delivered")}
                className={"mt-5 w-full bg-amber-500 hover:bg-amber-400"}
              >
                Delivered
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Driver;
