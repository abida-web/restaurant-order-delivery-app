"use client";

import { orderTrack, updateStatus } from "@/actions/orders";
import React, { useState, useEffect } from "react";

const Track = ({ params }: { params: Promise<{ id: string }> }) => {
  const [trackData, setTrackData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { id } = await params;
        const data = await orderTrack(id);
        setTrackData(data);
      } catch (error) {
        console.error("Error fetching order data:", error);
        alert("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  if (loading) {
    return (
      <div className="px-10">
        <div className="px-10 max-w-4xl mx-auto">
          <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden p-8">
            <div className="text-center">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!trackData) {
    return (
      <div className="px-10">
        <div className="md:px-10 md:max-w-4xl mx-auto">
          <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden p-8">
            <div className="text-center text-red-500">
              Failed to load order details. Please try again.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-10">
      <div className="md:px-10 md:max-w-4xl mx-auto">
        {/* Customer Information Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden pb-5">
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">
              Customer Information
            </h1>
          </div>

          <div className="grid md:grid-cols-3 gap-4 p-5">
            <div className="flex items-baseline gap-2">
              <label className="text-sm font-medium text-gray-500">
                Full Name:
              </label>
              <p className="text-base font-semibold text-gray-900">
                {trackData?.customerName || "N/A"}
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <label className="text-sm font-medium text-gray-500">
                Phone:
              </label>
              <p className="text-base font-semibold text-gray-900">
                {trackData?.phone || "N/A"}
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <label className="text-sm font-medium text-gray-500">
                Address:
              </label>
              <p className="text-base font-semibold text-gray-900">
                {trackData?.address || "N/A"}
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <label className="text-sm font-medium text-gray-500">Type:</label>
              <p className="text-base font-semibold text-gray-900">
                {trackData?.type || "N/A"}
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <label className="text-sm font-medium text-gray-500">
                Status:
              </label>
              <p
                className={`text-base font-semibold ${
                  trackData?.status === "cancelled"
                    ? "text-red-600"
                    : "text-gray-900"
                }`}
              >
                {trackData?.status || "N/A"}
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <label className="text-sm font-medium text-gray-500">
                Total Amount:
              </label>
              <p className="text-base font-semibold text-gray-900">
                afg {trackData?.totalAmount || "N/A"}
              </p>
            </div>
          </div>

          <h1 className="text-amber-500 px-5 text-lg font-semibold">Orders</h1>
          <div>
            {trackData?.item?.map((item: any) => (
              <div
                key={item.id}
                className={`bg-white text-black mt-2 mx-5 p-4 border border-l-8 rounded-l-2xl shadow-sm hover:shadow-md transition-shadow ${
                  item.status === "cancelled"
                    ? "border-l-red-400 border-gray-200 opacity-75"
                    : "border-l-amber-400"
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.menuItem?.name || "Unknown Item"}
                  </h3>

                  {item.status === "cancelled" && (
                    <span className="text-red-500 text-sm font-medium">
                      Cancelled
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Quantity:</span>
                    <span className="font-medium text-gray-900">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Price:</span>
                    <span className="font-semibold text-amber-600">
                      AFG {item.price?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
