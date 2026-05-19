"use client";

import { personalBlog } from "@/data/posts";
import { CatWithImage } from "@/types";
import Link from "next/link";

export const categoryImages: Record<string, string> = {
  Travel: "/images/travel.png",
  Food: "/images/food.png",
  Fashion: "/images/fashion.png",
  Wellness: "/images/wellness.png",
  Inspiring: "/images/inspiting.png",
};

const Categories = () => {
  const categories = [
    ...new Set(personalBlog.flatMap((blog) => blog.categories)),
  ];
  
  const categoriesWithImages: CatWithImage[] = categories.map((cat) => ({
    name: cat,
    image: categoryImages[cat] || "/images/default.png",
  }));

  if (categoriesWithImages.length === 0) {
    return <div className="px-10 text-center">No categories found</div>;
  }

  return (
    <div className="lg:px-10 px-5 py-10">
      <h1 className="py-5 text-[#5e3b31] font-semibolds text-3xl">Select by category</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* First category always takes large left spot */}
        <Link
          href={`/category/${categoriesWithImages[0].name}`}
          className="lg:col-span-2 h-96 lg:h-[600px] rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300 block" // Added 'block'
        >
          <div className="relative h-full">
            <img
              src={categoriesWithImages[0].image}
              alt={categoriesWithImages[0].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" // Fixed w-130 to w-full
            />
            <span className="absolute bottom-6 left-6 text-white text-2xl font-bold  bg-green-900 bg-opacity-60 px-4 py-2 rounded-lg">
              {categoriesWithImages[0].name}
            </span>
          </div>
        </Link>

        {/* Middle categories - 2x2 grid */}
        <div className="grid grid-cols-2 gap-4 lg:gap-8"> {/* Reduced gap on mobile */}
          {categoriesWithImages.slice(1, 5).map((item, index) => (
            <Link 
              key={item.name} 
              href={`/category/${item.name}`}
              className="block" // Added block display
            >
              <div className="h-48 lg:h-72 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300"> {/* Reduced height on mobile */}
                <div className="relative h-full w-full">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={item.image}
                    alt={item.name}
                  />
                  <span className="absolute bottom-4 left-4 text-white text-lg font-bold bg-green-900 bg-opacity-60 px-3 py-2 rounded-lg">
                    {item.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;