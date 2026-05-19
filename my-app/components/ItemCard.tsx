"use client";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/cartContext/store";

interface ItemCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    isAvailable?: boolean;
  };
  index?: number;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const { addItem } = useCart();
  const handleAddToCart = () => {
    addItem({
      menuItemId: item.id, // Map id → menuItemId
      name: item.name,
      imageUrl: item.imageUrl,
      price: item.price,
      quantity: 1, // Add default quantity
    });
  };
  return (
    <div key={item.id} className=" relative w-fit border p-5 rounded-sm">
      <Link
        href={`/menu/${item.id}`}
        className="absolute top-8 p-1.5 rounded-full hover:scale-105  duration-300 border border-white right-8 bg-amber-500/80 cursor-pointer"
        aria-label="View item details"
      >
        <Eye />
      </Link>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="md:w-55 md:h-48 object-cover rounded-lg border-b-8 border-amber-500"
      />
      <div className="flex items-center mt-3 gap-2">
        <h3 className="font-semibold">{item.name.slice(0, 25)}</h3>
        <p className="text-amber-500 text-sm">afg{item.price}</p>
      </div>
      <Button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-amber-500 text-white"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ItemCard;
