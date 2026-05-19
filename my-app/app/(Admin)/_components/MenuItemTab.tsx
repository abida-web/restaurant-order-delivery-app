import CustomeInput from "./CustomeInput";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AdminMenuCard from "./AdminMenuCard";
import CustomSelect from "./CustomSelect";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: {
    id: string;
    name: string;
  };
  isAvaliable: boolean;
}

interface MenuItemTabProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  menuItem: {
    name: string;
    description: string;
    price: string;
    categoryId: string;
    isAvaliable?: boolean;
  };
  setMenuItem: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      price: string;
      categoryId: string;
    }>
  >;
  categories: Array<{ id: string; name: string }>;
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  menuItems: MenuItem[];
  filteredItems: MenuItem[];
  fetchItems: () => void;
  selectCategory: string;
  setSelectCategory: (category: string) => void;
}

const MenuItemTab = ({
  fileInputRef,
  isUploading,
  imageUrl,
  setImageUrl,
  menuItem,
  setMenuItem,
  categories,
  handleImageSelect,
  menuItems,
  fetchItems,
  filteredItems,
  selectCategory,
  setSelectCategory,
}: MenuItemTabProps) => {
  const addMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuItem.name || !menuItem.price || !menuItem.categoryId) {
      toast.error("Fill all required fields");
      return;
    }

    const res = await fetch("/api/admin/menuItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...menuItem, imageUrl }),
    });

    if (res.ok) {
      toast.success("Menu item added");
      setMenuItem({ name: "", description: "", price: "", categoryId: "" });
      setImageUrl("");
      fetchItems();
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      toast.error("Failed to add");
    }
  };

  const clearFilters = () => {
    setSelectCategory("");
  };

  return (
    <div>
      <Card className="p-5 mt-5">
        <h1 className="text-lg font-semibold mb-4">Create Menu Item</h1>

        <form
          onSubmit={addMenuItem}
          className="flex flex-col md:flex-row gap-6"
        >
          {/* Image Upload Section - Left side, full height */}
          <div className="md:w-1/2">
            <label className="block text-sm font-medium mb-2">
              Menu Item Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="block cursor-pointer h-full"
            >
              {isUploading ? (
                <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" />
                </div>
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-96 object-cover rounded-lg border"
                />
              ) : (
                <div className="w-full h-96 border-2 border-dashed rounded-lg flex flex-col items-center justify-center hover:border-amber-500 transition-colors">
                  <Camera className="text-5xl mb-3 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Click to upload image
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    Recommended: 500x500px
                  </span>
                </div>
              )}
            </label>
          </div>

          {/* Form Fields Section - Right side, stacked */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Category Select for Form - Using shadcn Select */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <Select
                value={menuItem.categoryId}
                onValueChange={(value) =>
                  setMenuItem({ ...menuItem, categoryId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Form Fields */}
            <CustomeInput
              type="text"
              value={menuItem.name}
              onChange={(e) =>
                setMenuItem({ ...menuItem, name: e.target.value })
              }
              placeholder="Name *"
            />

            <CustomeInput
              type="text"
              value={menuItem.description}
              onChange={(e) =>
                setMenuItem({ ...menuItem, description: e.target.value })
              }
              placeholder="Description"
            />

            <CustomeInput
              value={menuItem.price}
              type="number"
              onChange={(e) =>
                setMenuItem({ ...menuItem, price: e.target.value })
              }
              placeholder="Price *"
            />

            <Button type="submit" disabled={isUploading} className="w-full">
              {isUploading ? "Uploading..." : "Add Menu Item"}
            </Button>
          </div>
        </form>
      </Card>

      <h1 className="mt-5 text-xl md:text-3xl font-semibold">
        List of All Menus
      </h1>

      {/* Filter Buttons */}
      <div className="flex gap-3 sm:gap-5 mt-5 flex-wrap">
        {menuItems.map((item) => (
          <button
            onClick={() => setSelectCategory(item.category.name)}
            className={`px-3 py-1.5 transition-all hover:scale-105 duration-300 rounded-md ${
              selectCategory === item.category.name
                ? "bg-amber-400 text-black"
                : "border"
            }`}
            key={item.id}
          >
            {item.category?.name}
          </button>
        ))}
        <button
          onClick={clearFilters}
          className="px-3 py-1.5 bg-white text-black rounded-md hover:bg-gray-100 transition-all duration-300"
        >
          Clear
        </button>
      </div>

      {menuItems.length === 0 ? (
        <Button disabled>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Loading...
        </Button>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
          {filteredItems?.map((item) => (
            <AdminMenuCard key={item.id} item={item} fetchItems={fetchItems} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItemTab;
