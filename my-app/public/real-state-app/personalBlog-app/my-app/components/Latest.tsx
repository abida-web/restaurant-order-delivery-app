import { personalBlog } from "../data/posts";
import BlogCard from "./BlogCard";

// Define the blog post interface based on your data structure
interface BlogPost {
  id: string | number;
  date: string;
  thumbnail: string;
  title: string;
  slug: string;
  longDescription: string;
  author: string;
}

interface LatestProps {
  // Optional props for future extensibility
  maxPosts?: number;
  featuredOnly?: boolean;
}

const Latest: React.FC<LatestProps> = ({ maxPosts = 3 }) => {
  // Safe date sorting with explicit typing
  const latest: BlogPost[] = personalBlog
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, maxPosts);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semisbold text-[#5e3b31] text-center mb-8 lg:mb-12">
        The Latest Blogs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {latest.map((blog) => (
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

      {/* Optional: Show message if no blogs */}
      {latest.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blog posts available.</p>
        </div>
      )}
    </section>
  );
};

export default Latest;
