"use client";

import { allUserOrders } from "@/actions/orders";
import { authClient } from "@/lib/auth-client";
import {
  Mail,
  Calendar,
  Package,
  ShoppingBag,
  User,
  Edit,
  Star,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Profile = () => {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userOrders = await allUserOrders();
        setOrders(userOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };
  const totalAmount = orders.reduce(
    (sum, item) => sum + parseFloat(item.totalAmount),
    0,
  );

  if (sessionLoading || ordersLoading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-amber-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-500/20 overflow-hidden">
          {/* Cover Image with Amber Accent */}
          <div className="h-32 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600"></div>

          {/* Profile Content */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex flex-col items-center -mt-12">
              <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-1 rounded-full shadow-lg shadow-amber-500/30">
                <div className="bg-gray-900 rounded-full p-1">
                  <span className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-500 to-yellow-600 text-gray-900 text-4xl font-bold rounded-full">
                    {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              </div>

              {/* User Name */}
              <h1 className="mt-4 text-2xl font-bold text-white">
                {session?.user?.name || "User"}
              </h1>
            </div>

            {/* User Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-amber-400" />
                <span>{session?.user?.email || "No email"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>
                  Joined{" "}
                  {session?.user?.createdAt
                    ? new Date(session.user.createdAt).toLocaleDateString()
                    : new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Package className="w-5 h-5 text-amber-400" />
                <span>{orders.length} Total Orders</span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center hover:bg-amber-500/20 transition-all">
                <div className="text-2xl font-bold text-amber-400">
                  {orders.length}
                </div>
                <div className="text-sm text-gray-400 mt-1">Total Orders</div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center hover:bg-amber-500/20 transition-all">
                <div className="text-2xl font-bold text-amber-400">$0</div>
                <div className="text-sm text-gray-400 mt-1">
                  afg {totalAmount}
                </div>
              </div>
            </div>

            {/* Recent Orders Section */}
            {orders.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  Recent Orders
                </h2>
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order: any) => (
                    <div
                      key={order.id}
                      className="bg-gray-800/50 border border-amber-500/20 rounded-xl p-4 hover:border-amber-500/40 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-400">
                            Order #{order.id.slice(0, 8)}
                          </p>
                          <p className="text-white font-medium mt-1">
                            afg {order.totalAmount}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium">
                          {order.status || "Processing"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {orders.length > 3 && (
                  <Link
                    href="/profile/orders"
                    className="mt-3 text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1"
                  >
                    View all {orders.length} orders →
                  </Link>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="flex gap-3">
                <button
                  onClick={handleSignOut}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium py-2 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
