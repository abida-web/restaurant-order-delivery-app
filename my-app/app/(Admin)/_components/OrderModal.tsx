// components/OrderModal.tsx
"use client";
import { useCart } from "@/cartContext/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

interface OrderForm {
  customerName: string;
  phone: string;
  address: string;
  type: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onOrderCreated?: () => void;
}

const OrderModal = ({
  isOpen,
  onClose,
  menuItems,
  onOrderCreated,
}: OrderModalProps) => {
  const [orderForm, setOrderForm] = useState<OrderForm>({
    customerName: "",
    phone: "",
    address: "",
    type: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    cart,
    clearCart,
    addItem, // Changed from addItem to addToCart
    removeItem,
    decreaseQuantity,
    increaseQuantity,
  } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const router = useRouter();
  const handleCreateOrder = async () => {
    if (cart.length === 0 || !orderForm.customerName) {
      toast.error("Please add items and customer name");
      return;
    }

    const orderData = {
      customerName: orderForm.customerName,
      phone: orderForm.phone,
      address: orderForm.address,
      type: orderForm.type,
      items: cart.map((item) => ({
        menuItemId: item.menuItemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: total,
      createdAt: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/admin/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        toast.success("Order created successfully");
        const data = await response.json();
        const newOrderId = data.orderId || data.id;
        clearCart();
        router.push(`/track/${newOrderId}`);
        setOrderForm({
          customerName: "",
          phone: "",
          address: "",
          type: "",
        });
        setSearchTerm("");
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCart = (menuItem: MenuItem) => {
    addItem({
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      imageUrl: menuItem.imageUrl || "",
      quantity: 1,
    });
  };

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50">
      <div className="bg-gradient-to-b h-full from-black/90 to-white/20 backdrop-blur-sm rounded-r-lg p-6 w-[500px] max-w-[90%] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Create Orders</h1>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Customer Information */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Customer Name *
            </label>
            <Input
              type="text"
              placeholder="Enter customer name"
              value={orderForm.customerName}
              onChange={(e) =>
                setOrderForm({ ...orderForm, customerName: e.target.value })
              }
              className="bg-gray-800 text-white border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Phone Number
            </label>
            <Input
              type="tel"
              placeholder="Enter phone number"
              value={orderForm.phone}
              onChange={(e) =>
                setOrderForm({ ...orderForm, phone: e.target.value })
              }
              className="bg-gray-800 text-white border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Address
            </label>
            <Input
              type="text"
              placeholder="Enter address"
              value={orderForm.address}
              onChange={(e) =>
                setOrderForm({ ...orderForm, address: e.target.value })
              }
              className="bg-gray-800 text-white border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Order Type *
            </label>
            <Select
              value={orderForm.type}
              onValueChange={(value) =>
                setOrderForm({ ...orderForm, type: value })
              }
            >
              <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Types</SelectLabel>
                  <SelectItem value="dine-in">Dine In</SelectItem>
                  <SelectItem value="takeaway">Take Away</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Menu Items Selection */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Search Items
            </label>
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 text-white border-gray-700 mb-2"
            />
            <Select
              onValueChange={(value) => {
                const selectedItem = menuItems.find(
                  (item) => item.id === value,
                );
                if (selectedItem) handleAddToCart(selectedItem);
              }}
            >
              <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                <SelectValue placeholder="Select a menu item" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Items</SelectLabel>
                  {filteredMenuItems.length > 0 ? (
                    filteredMenuItems.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} | AFG {item.price}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-items" disabled>
                      No items available
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Cart Items */}
          {cart.length > 0 && (
            <div className="mt-6 border-t border-gray-700 pt-4">
              <h3 className="font-semibold mb-2">Current Items</h3>
              {cart.map((item) => (
                <div
                  key={item.menuItemId}
                  className="flex justify-between items-center text-sm mb-2"
                >
                  <span className="flex-1">{item.name.slice(0, 18)}</span>
                  <span className="w-14">AFG {item.price}</span>
                  <div className="flex items-center gap-2 mx-4">
                    <button
                      onClick={() => decreaseQuantity(item.menuItemId)}
                      className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                    >
                      -
                    </button>
                    <span className="min-w-[30px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.menuItemId)}
                      className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>
                  <span className="w-24 text-right">
                    AFG {item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => removeItem(item.menuItemId)}
                    className="ml-2 text-red-400 hover:text-red-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <div className="border-t border-gray-700 pt-2 mt-2 font-bold">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>AFG {total}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-black"
              disabled={
                cart.length === 0 ||
                !orderForm.customerName ||
                !orderForm.type ||
                isSubmitting
              }
              onClick={handleCreateOrder}
            >
              {isSubmitting ? "Creating Order..." : "Create Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
