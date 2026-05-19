import React from "react";
import CustomeInput from "./CustomeInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Edit, TrashIcon } from "lucide-react";
import CustomEditGroupButtons from "./CustomEditGroupButtons";

interface CategoryProps {
  category: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: Array<{ id: string; name: string }>;
  fetchCategories: () => void;
  editedCategory: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setEditedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const MenuCatTab = ({
  category,
  setCategory,
  onChange,
  categories,
  fetchCategories,
  editedCategory,
  setEditedCategory,
}: CategoryProps) => {
  async function deletedCategory(categoryId: string) {
    const res = await fetch(`/api/admin/category/${categoryId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Category deleted");
      fetchCategories();
    } else {
      toast.error("Failed to delete category");
    }
  }
  const addCategory = async () => {
    if (!category.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    const res = await fetch("/api/admin/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: category }),
    });
    if (res.ok) {
      toast.success("Category added");
      setCategory("");
      fetchCategories();
    } else {
      toast.error("Failed to add category");
    }
  };

  async function editeCategory(categoryId: string) {
    const res = await fetch(`/api/admin/category/${categoryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editedCategory }),
    });
    if (res.ok) {
      toast.success("Category updated");
      fetchCategories();
      setEditedCategory("");
    } else {
      toast.error("Failed to update category");
    }
  }

  return (
    <div className="flex flex-col">
      <div className="p-3 flex flex-col sm:flex-row gap-3 border rounded-lg mt-3 max-w-md">
        <CustomeInput
          value={category}
          onChange={onChange}
          placeholder="Add a new Category"
          type="text"
        />
        <Button onClick={addCategory}>Add Category</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-gradient-to-r mt-5 from-black/90 p-5 border to-white/5 backdrop-blur-sm transition-all hover:scale-105 duration-300 shadow shadow-amber-400 font-bold rounded-lg w-full"
          >
            <span className="break-words">{cat.name}</span>
            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                onClick={() => deletedCategory(cat.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <TrashIcon size={18} />
              </button>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    onClick={() => setEditedCategory(cat.name)}
                    className="hover:text-gray-400 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                  </DialogHeader>
                  <FieldGroup>
                    <Field>
                      <Label htmlFor="name-1">Name</Label>
                      <Input
                        id="name-1"
                        value={editedCategory}
                        onChange={(e) => setEditedCategory(e.target.value)}
                        name="name"
                      />
                    </Field>
                  </FieldGroup>
                  <CustomEditGroupButtons
                    onClick={() => editeCategory(cat.id)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCatTab;
