"use client";

import BlogCard from "@/components/BlogCard";
import { personalBlog } from "@/data/posts";
import Link from "next/link";
import { useParams } from "next/navigation";

const Category = () => {
  const params = useParams();
  const catName = params.name as string;

  const filtereditems = personalBlog.filter((blog) =>
    blog.categories.includes(catName)
  );

  return (
    <div>
      <h1 className="px-10 text-3xl py-7">Categorized by:{catName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {filtereditems.map((blog) => (
          <BlogCard
          id={blog.id}
            key={blog.id}
            title={blog.title}
            longDescription={blog.longDescription}
            slug={blog.slug}
            author={blog.author}
            thumbnail={blog.thumbnail}
            date={blog.date} // Added missing date prop
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
