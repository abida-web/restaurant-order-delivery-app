"use client";
import { useCart } from "@/cartContext/store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import OrderModal from "@/app/(Admin)/_components/OrderModal";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { cart, increaseQuantity, decreaseQuantity, removeItem, clearCart } =
    useCart();
  const router = useRouter();

  // Fetch menu items for the modal
  const fetchMenuItems = async () => {
    try {
      const res = await fetch("/api/admin/menuItems");
      const data = await res.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto">
      <h1 className="py-5 text-3xl font-semibold text-amber-500">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Your cart is empty
          </p>
          <Button
            onClick={() => router.push("/menu")}
            className="mt-4 bg-amber-500 hover:bg-amber-600"
          >
            Browse Menu
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5">
            {cart.map((item, i) => (
              <div
                key={i}
                className="border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 
                   overflow-hidden hover:shadow-md transition-shadow duration-200 relative"
              >
                {/* Remove Button - Top Right Corner */}
                <button
                  onClick={() => removeItem(item.menuItemId)}
                  className="absolute bottom-2 right-2 z-10 w-8 h-8 rounded-full 
                             bg-red-500 hover:bg-red-600 
                             text-white flex items-center justify-center
                             transition-all duration-200 shadow-md
                             hover:scale-110 active:scale-95
                             touch-manipulation"
                  aria-label="Remove item"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Consistent layout for all screen sizes */}
                <div className="flex flex-row">
                  {/* Image Section - Fixed width */}
                  <div className="w-28 md:w-32 lg:w-36 flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-24 md:h-28 object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-3 md:p-4">
                    <div className="flex flex-row justify-between items-start gap-3">
                      {/* Product Details */}
                      <div className="flex-1 pr-2">
                        <h1 className="text-gray-900 dark:text-white font-medium text-base md:text-lg mb-1 line-clamp-2">
                          {item.name}
                        </h1>
                        <span className="text-amber-500 dark:text-amber-400 font-bold text-lg md:text-xl">
                          afg {item.price}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="flex items-center gap-2 md:gap-3">
                          <button
                            onClick={() => decreaseQuantity(item.menuItemId)}
                            className="w-8 h-8 md:w-9 md:h-9 rounded-full 
                               bg-gray-100 dark:bg-gray-700 
                               text-gray-800 dark:text-white
                               hover:bg-gray-200 dark:hover:bg-gray-600
                               active:bg-gray-300 dark:active:bg-gray-500
                               transition-all duration-150
                               flex items-center justify-center text-xl font-bold
                               shadow-sm active:scale-95 touch-manipulation"
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>

                          <span
                            className="min-w-[32px] text-center text-gray-900 dark:text-white 
                                 font-semibold text-base"
                          >
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.menuItemId)}
                            className="w-8 h-8 md:w-9 md:h-9 rounded-full 
                               bg-gray-100 dark:bg-gray-700 
                               text-gray-800 dark:text-white
                               hover:bg-gray-200 dark:hover:bg-gray-600
                               active:bg-gray-300 dark:active:bg-gray-500
                               transition-all duration-150
                               flex items-center justify-center text-xl font-bold
                               shadow-sm active:scale-95 touch-manipulation"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex justify-between items-center py-2 text-base">
              <span className="text-gray-600 dark:text-gray-400">
                Subtotal:
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                afg {totalAmount}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 text-base">
              <span className="text-gray-600 dark:text-gray-400">
                Total Items:
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                {totalItems}
              </span>
            </div>
            <div className="border-t dark:border-gray-700 mt-2 pt-3">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-gray-900 dark:text-white">Total:</span>
                <span className="text-amber-500 dark:text-amber-400">
                  afg {totalAmount}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                onClick={() => router.push("/menu")}
                variant="outline"
                className="flex-1"
              >
                Add More Items
              </Button>
              <Button
                onClick={() => setIsOpen(true)}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Order Modal for Checkout */}
      <OrderModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        menuItems={menuItems}
      />
    </div>
  );
};

export default Cart;
