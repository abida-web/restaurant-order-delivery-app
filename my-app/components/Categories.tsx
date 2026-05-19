import { Cake, CupSoda, Pizza, Salad, Sandwich, Soup } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Category {
  id: string;
  name: string;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Drinks: <CupSoda size={30} />,
  Salads: <Salad size={30} />,
  Cakes: <Cake size={30} />,
  Sandwich: <Sandwich size={30} />,
  Noodle: <Soup size={30} />,
};

const Categories = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/admin/category`, {
      cache: "force-cache", // Optional: enable caching in Next.js
      next: { revalidate: 3600 }, // Optional: revalidate every hour
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();

    if (!data?.length) {
      return <div className="text-center py-8">No categories found</div>;
    }

    const getCategoryIcon = (categoryName: string) => {
      return CATEGORY_ICONS[categoryName] || <Pizza size={30} />;
    };

    return (
      <div className="sm:px-10 mx-5">
        <h1 className="mb-5 text-xl md:text-3xl font-semibold text-amber-500">
          Categories
        </h1>
        <div className="grid grid-cols-3 gap-3 sm:gap-5  ">
          {data.map((category: Category, index: number) => (
            <Link
              href={`/menu?categoryId=${category.id}`}
              key={category.id || `${category.name}-${index}`}
              className="flex flex-col items-center  justify-center border hover:border-amber-500 shadow hover:shadow-amber-500 hover:scale-105 duration-500 rounded-lg p-4 min-w-0 cursor-pointer transition-all"
            >
              <span className="text-amber-500 bg-amber-500/20 p-3 rounded-full">
                {getCategoryIcon(category.name)}
              </span>
              <span className="mt-2 text-sm font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load categories. Please try again later.
      </div>
    );
  }
};

export default Categories;
