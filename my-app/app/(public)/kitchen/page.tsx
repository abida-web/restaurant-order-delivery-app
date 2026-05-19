"use client";
import {
  getPendingOrders,
  getPreparingOrders,
  getReadyOrders,
} from "@/actions/orders";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Topbar from "./_components/Topbar";
import Pending from "./_components/Pending";
import Preparing from "./_components/Preparing";
import Ready from "./_components/Ready";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Kitchen = () => {
  const { data: session, isPending } = authClient.useSession();
  const [pendingOrders, setPendingOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchAllOrders = useCallback(async () => {
    try {
      setIsRefetching(true);
      const [pending, preparing, ready] = await Promise.all([
        getPendingOrders(),
        getPreparingOrders(),
        getReadyOrders(),
      ]);

      setPendingOrders(pending);
      setPreparingOrders(preparing);
      setReadyOrders(ready);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsRefetching(false);
    }
  }, []);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  const router = useRouter();

  useEffect(() => {
    if (
      !isPending &&
      session?.user.role !== "kitchen" &&
      session?.user.role !== "admin"
    ) {
      router.push("/");
    }
  }, [session, isPending, router]);

  return (
    <div className="min-h-screen px-10">
      <Topbar />

      {isRefetching && (
        <div className="fixed top-4 right-4 z-50">
          <div className="rounded-lg bg-amber-500/10 px-4 py-2 text-sm text-amber-500">
            Refreshing orders...
          </div>
        </div>
      )}

      {/* Desktop Layout - 3 columns */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-8 p-4 md:p-5 lg:p-6 xl:p-8">
        <div className="min-w-0">
          <Pending orders={pendingOrders} onOrderUpdate={fetchAllOrders} />
        </div>
        <div className="min-w-0">
          <Preparing orders={preparingOrders} onOrderUpdate={fetchAllOrders} />
        </div>
        <div className="min-w-0">
          <Ready orders={readyOrders} onOrderUpdate={fetchAllOrders} />
        </div>
      </div>

      {/* Mobile/Tablet Layout - Tabs */}
      <div className="lg:hidden px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
        <Tabs defaultValue="pending" className="w-full">
          <div className="sticky top-0  z-10 pb-3 sm:pb-4">
            <TabsList className="w-full sm:w-auto grid grid-cols-3">
              <TabsTrigger value="pending" className="text-xs sm:text-sm">
                Pending ({pendingOrders.length})
              </TabsTrigger>
              <TabsTrigger value="preparing" className="text-xs sm:text-sm">
                Preparing ({preparingOrders.length})
              </TabsTrigger>
              <TabsTrigger value="ready" className="text-xs sm:text-sm">
                Ready ({readyOrders.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="pending" className="mt-3 sm:mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Pending orders={pendingOrders} onOrderUpdate={fetchAllOrders} />
            </div>
          </TabsContent>

          <TabsContent value="preparing" className="mt-3 sm:mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Preparing
                orders={preparingOrders}
                onOrderUpdate={fetchAllOrders}
              />
            </div>
          </TabsContent>

          <TabsContent value="ready" className="mt-3 sm:mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Ready orders={readyOrders} onOrderUpdate={fetchAllOrders} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Kitchen;
