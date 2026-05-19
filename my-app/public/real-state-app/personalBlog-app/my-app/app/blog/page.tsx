"use client"
import { personalBlog } from "@/data/posts";
import BlogCard from "@/components/BlogCard";
import React, { useState, useEffect } from "react";

const Blogs = () => {
  const [selectCategory, setSelectCategory] = useState("")
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState(personalBlog)
  
  // Get unique categories
  const categories = [...new Set(personalBlog.map((blog) => blog.categories))]

  // Always include both dependencies, even if initially empty
  useEffect(() => {
    let results = personalBlog;
    
    // Apply category filter
    if (selectCategory) {
      results = results.filter((blog) => blog.categories === selectCategory)
    }
    
    // Apply search filter
    if (search) {
      results = results.filter((blog) => 
        blog.title.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    setFiltered(results)
  }, [selectCategory, search]) // Keep this consistent

  // Search results for dropdown only
  const filteredSearch = personalBlog.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-5 lg:px-10">
        {/* Search Section */}
        <div className="relative w-full lg:w-1/2 xl:w-2/5">
          <input 
            className="border border-gray-300 w-full py-2 px-4 rounded-full" 
            placeholder="Search blogs..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* Search Dropdown */}
          {search && (
            <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
              {filteredSearch.map((query) => (
                <div 
                  key={query.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => {
                    setSearch(query.title);
                  }}
                >
                  {query.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-3 w-full lg:w-auto">
          {/* All Categories Button */}
          <button 
            onClick={() => setSelectCategory("")} 
            className={`px-3 py-2 rounded-lg text-sm lg:text-base ${selectCategory === "" ? 'bg-[#375534] text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          
          {categories.map((cat, index) => (
            <button 
              onClick={() => setSelectCategory(cat)} 
              className={`px-3 py-2 rounded-lg text-sm lg:text-base ${selectCategory === cat ? 'bg-[#375534] text-white' : 'bg-gray-200'}`}  
              key={index}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 px-5 md:px-10 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mt-6">
        {filtered.map((blog) => (
          <BlogCard
            id={blog.id}
            key={blog.id}
            title={blog.title}
            longDescription={blog.longDescription}
            slug={blog.slug}
            author={blog.author}
            thumbnail={blog.thumbnail}
            date={blog.date}
          />
        ))}
      </div>
    </div>
  )
}

export default Blogs