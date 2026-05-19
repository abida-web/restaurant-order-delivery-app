import Link from "next/link";
import React from "react";

// Define a specific interface for BlogCard props that matches what we actually use
interface BlogCardProps {
  thumbnail: string;
  title: string;
  slug: string;
  longDescription: string;
  author: string;
  date: string;
  id: string | number;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  thumbnail,
  title,
  slug,
  longDescription,
  author,
  date,
}) => {
   const getAuthorInitial = (author: string): string => {
    return author?.charAt(0)?.toUpperCase() || "A";
  };

  // Helper function to format date safely
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Recent"
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  return (
    <div>
      <article className="flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
        {/* Image */}
        <div className="w-full h-48 sm:h-56 lg:h-64 overflow-hidden">
          <img
            className="w-full h-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
            src={thumbnail}
            alt={title}
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#0F2A1D] line-clamp-2 mb-2">
            {title}
          </h2>

          <p className="text-sm text-[#5e3b31] font-medium mb-3 line-clamp-1">
            {slug}
          </p>

          <p className="text-gray-600 text-sm sm:text-base line-clamp-3 mb-4 flex-1">
            {longDescription}
          </p>

          {/* Author */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
            <div
              className="w-10 h-10 rounded-full bg-[#375534] flex items-center justify-center text-white text-xs font-medium"
              aria-label={`Author: ${author}`}
            >
              {getAuthorInitial(author)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-800 truncate">
                {author}
              </p>
              <p className="text-xs text-gray-500">{formatDate(date)}</p>
            </div>
            <Link href={`/blog/${id}`}>
              <button className="bg-[#375534] px-3 py-2 text-white rounded-full w-30 cursor-pointer hover:bg-[#2a4230] transition-colors duration-200">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogCard;
