"use client";

import ItemCard from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
  category: Category;
}

interface Category {
  id: string;
  name: string;
  createdAt: string;
}
const Menu = () => {
  const [menues, setMenues] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const currentCatId = searchParams.get("categoryId");
  async function fetchMenues() {
    setLoading(true);
    const res = await fetch("/api/menu");
    const data = await res.json();
    setMenues(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchMenues();
  }, []);
  const categories = useMemo(() => {
    return Array.from(
      new Map(menues.map((menu) => [menu.category.id, menu.category])).values(),
    );
  }, [menues]);
  const router = useRouter();
  const filteredItems = menues.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  if (loading)
    return <h1 className=" flex items-center justify-center">Loading...</h1>;
  return (
    <div className="px-10">
      <div className=" flex items-center justify-between">
        <h1 className=" text-2xl py-5 font-semibold text-amber-500">
          List of Menues
        </h1>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for menue"
          className="max-w-lg py-4"
        />
      </div>
      <div className="flex flex-wrap gap-5 mb-5">
        {categories.map((menu, i) => (
          <Button
            key={i}
            variant={"outline"}
            onClick={() => router.push(`/menu?categoryId=${menu.id}`)}
          >
            {menu.name}
          </Button>
        ))}
      </div>
      {currentCatId ? (
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-5">
          {menues
            .filter((item) => item.categoryId === currentCatId)
            .map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
        </div>
      ) : (
        <div className=" grid grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
