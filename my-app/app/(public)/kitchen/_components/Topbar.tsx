"use client";

import { getOrdersCount } from "@/actions/orders";
import { ChefHatIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Topbar = () => {
  const [time, setTime] = useState(new Date());
  const [ordersCount, setOrdersCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timeId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timeId);
  }, []);

  useEffect(() => {
    const fetchOrdersCount = async () => {
      const count = await getOrdersCount();
      setOrdersCount(count);
    };
    fetchOrdersCount();
  }, []);

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 justify-between">
      <h1 className="md:text-4xl text-2xl flex gap-3 items-center">
        <ChefHatIcon color="oklch(76.9% 0.188 70.08)" size={35} />
        <span className="font-semibold">Kitchen</span>
      </h1>
      <div className="flex items-center gap-3">
        <span className="md:text-2xl text-gray-600">Active Orders:</span>
        <span className="bg-amber-500 text-white px-4 py-1 rounded-full font-bold text-xl">
          {ordersCount}
        </span>
      </div>
      <h2
        className=" text-2xl md:text-3xl font-semibold text-amber-500"
        suppressHydrationWarning
      >
        {mounted ? time.toLocaleTimeString() : ""}
      </h2>
    </div>
  );
};

export default Topbar;
