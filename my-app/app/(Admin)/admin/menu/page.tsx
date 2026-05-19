"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { uploadImage } from "@/actions/uploadImage";
import { Camera } from "lucide-react";
import MenuCatTab from "../../_components/MenuCatTab";
import MenuItemTab from "../../_components/MenuItemTab";

interface CategoryProps {
  id: string;
  name: string;
}

const MenuPage = () => {
  const [category, setCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadImage(formData);
    if (result.error) throw new Error(result.error);
    return result.url;
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);
    setIsUploading(true);

    try {
      const url = await handleImageUpload(file);
      setImageUrl(url);
      toast.success("Image uploaded!");
    } catch (error) {
      toast.error("Upload failed");
      setImageUrl("");
    } finally {
      setIsUploading(false);
      URL.revokeObjectURL(previewUrl);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/category");
    const data = await res.json();
    setCategories(data);
  };
  const fetchItems = async () => {
    const res = await fetch("/api/admin/menuItems");
    const data = await res.json();
    setMenuItems(data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchItems();
  }, []);
  const filteredItems = useMemo(() => {
    if (selectCategory) {
      return menuItems.filter(
        (item: any) => item.category.name === selectCategory,
      );
    }
    return menuItems;
  }, [selectCategory, menuItems]);

  return (
    <div className="mt-5 sm:mt-0">
      <h1 className="text-3xl">Menu</h1>
      <p className="text-gray-400 mt-2">Manage and add new menu</p>
      <Tabs defaultValue="categories" className="">
        <TabsList variant={"line"}>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          {/* Add Category */}
          <MenuCatTab
            category={category}
            setCategory={setCategory}
            categories={categories}
            fetchCategories={fetchCategories}
            onChange={(e) => setCategory(e.target.value)}
            editedCategory={editedCategory}
            setEditedCategory={setEditedCategory}
          />
        </TabsContent>
        <TabsContent value="items">
          {/* Add Menu Item */}
          <MenuItemTab
            fileInputRef={fileInputRef}
            isUploading={isUploading}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            menuItem={menuItem}
            fetchItems={fetchItems}
            setMenuItem={setMenuItem}
            categories={categories}
            handleImageSelect={handleImageSelect}
            menuItems={menuItems}
            filteredItems={filteredItems}
            selectCategory={selectCategory}
            setSelectCategory={setSelectCategory}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuPage;
