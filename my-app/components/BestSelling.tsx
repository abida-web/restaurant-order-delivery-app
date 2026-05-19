"use client";
import { bestSelling } from "@/actions/orders";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ItemCard from "./ItemCard";
interface BeastsellingProps {
  id: string;
  name: string;
  price: string;
  image: string | null;
  categoryId: string;
}
const BestSelling = () => {
  const [bestSellingItems, setBestSellingItems] = useState<
    BeastsellingProps | []
  >([]);

  useEffect(() => {
    const getBestSelling = async () => {
      const data = await bestSelling();
      setBestSellingItems(data);
    };
    getBestSelling();
  }, []);

  return (
    <div className="sm:px-10 mx-5">
      <h1 className="my-5 text-xl md:text-3xl font-semibold text-amber-500">
        Most Popular
      </h1>
      <div className="flex overflow-x-auto gap-5 pb-4">
        {bestSellingItems.map((item, index: number) => (
          <ItemCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default BestSelling;
