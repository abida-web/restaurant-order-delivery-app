import {
  deleteItem,
  toggleAvalibilty,
  updateItem,
} from "@/actions/menu-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import CustomeEditField from "./CustomeEditField";
import CustomEditGroupButtons from "./CustomEditGroupButtons";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number | string;
  imageUrl: string;
  isAvaliable: boolean;
  category: {
    name: string;
  };
}

interface AdminMenuCardProps {
  item: MenuItem;
  fetchItems: () => void;
}

const AdminMenuCard = ({ item, fetchItems }: AdminMenuCardProps) => {
  async function handleToggleAvailability(itemId: string) {
    const result = await toggleAvalibilty(itemId);
    if (result.success) {
      toast.success("Availability updated");
      fetchItems(); // Refresh the list
    } else {
      toast.error(result.error);
    }
  }
  async function deleteMenuItem(itemId: string) {
    const result = await deleteItem(itemId);
    if (result.success) {
      toast.success("Menu item deleted");
      fetchItems(); // Refresh the list
    } else {
      toast.error(result.error || "Failed to delete menu item");
    }
  }

  // Update function with form data
  async function handleUpdateItem(formData: FormData) {
    const result = await updateItem(formData);
    if (result.success) {
      toast.success("Menu item updated");
      fetchItems(); // Refresh the list
    } else {
      toast.error(result.error || "Failed to update menu item");
    }
  }
  return (
    <div
      key={item.id}
      className="relative bg-gradient-to-b from-black/90 p-5 border rounded-2xl to-white/5 backdrop-blur-sm"
    >
      <img
        src={item.imageUrl}
        className="w-full h-48 object-cover rounded-sm"
        alt={item.name}
      />
      <h1 className="py-2 text-lg font-semibold">{item.name}</h1>
      <p className="text-sm text-gray-400 mb-2 line-clamp-2">
        {item.description}
      </p>
      <div className="flex gap-4 items-center">
        <span className="text-sm bg-amber-400/10 px-2 py-1 rounded-full">
          {item.category.name}
        </span>
        |
        <span className="flex gap-1">
          <span className="text-red-600 font-semibold">AFG</span>
          {item.price}
        </span>
      </div>
      <div className="flex gap-4 justify-end mt-4 pt-3 border-t border-white/10">
        <Button
          onClick={() => handleToggleAvailability(item.id)}
          className={
            item.isAvaliable
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-600 hover:bg-gray-700"
          }
        >
          {item.isAvaliable ? "Available" : "Unavailable"}
        </Button>
        <button
          onClick={() => deleteMenuItem(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 size={18} />
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-blue-500 hover:text-blue-700 transition-colors">
              <Edit size={18} />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Menu Item</DialogTitle>
            </DialogHeader>
            <form action={handleUpdateItem}>
              <FieldGroup className="space-y-4">
                {/* Hidden field */}
                <CustomeEditField
                  hidden={true}
                  id="id"
                  name="id"
                  defaultValue={item.id}
                />

                {/* Text fields */}
                <CustomeEditField
                  label="Name"
                  id="name"
                  name="name"
                  defaultValue={item.name}
                />

                <CustomeEditField
                  label="Description"
                  id="description"
                  name="description"
                  defaultValue={item.description}
                />

                {/* Number field with step */}
                <CustomeEditField
                  label="Price"
                  id="price"
                  name="price"
                  defaultValue={item.price}
                  type="number"
                  step="0.01"
                />
                <CustomEditGroupButtons type="submit" />
              </FieldGroup>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminMenuCard;
