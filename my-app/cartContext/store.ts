import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  menuItemId: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (menuItemId: string) => void;
  increaseQuantity: (menuItemId: string) => void;
  decreaseQuantity: (menuItemId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.cart.find(
            (cart) => cart.menuItemId === item.menuItemId,
          );
          if (existing) {
            return {
              cart: state.cart.map(
                (i) =>
                  i.menuItemId === item.menuItemId
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i, // Fixed: should return 'i' not 'item'
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),
      removeItem: (menuItemId) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.menuItemId !== menuItemId),
        })),
      increaseQuantity: (menuItemId) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.menuItemId === menuItemId
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        })),
      decreaseQuantity: (menuItemId) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.menuItemId === menuItemId
              ? { ...i, quantity: Math.max(0, i.quantity - 1) } // Prevent negative quantity
              : i,
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "shopping-cart-storage", // localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage
    },
  ),
);
