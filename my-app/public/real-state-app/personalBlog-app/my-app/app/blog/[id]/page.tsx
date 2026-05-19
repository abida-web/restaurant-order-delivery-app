"use client"
import { personalBlog } from "@/data/posts";
import Link from "next/link";
import { useParams } from "next/navigation";

const Blog = () => {
  const params = useParams();
  const blogid = params.id;
  
  // Handle case where blogid might be undefined or not found
  const blogSpe = blogid ? personalBlog.find((b) => b.id.toString() === blogid) : null;

  // If blog not found, show error message
  if (!blogSpe) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts safely
  const relatedPosts = blogSpe.relatedPosts?.map((index) => personalBlog[index]).filter(Boolean) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image and Related Posts */}
        <div className="flex flex-col">
          <img 
            src={blogSpe.thumbnail} 
            alt={blogSpe.title}
            className="w-full h-auto rounded-lg shadow-md mb-6"
          />
          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#6E473B]">Related Posts</h3>
              <div className="flex flex-wrap gap-4">
                {relatedPosts.map((related) => (
                  <Link 
                    key={related.id} 
                    href={`/blog/${related.id}`}
                    className="block p-4 bg-[#375534] text-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium text-sm">{related.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Blog Content */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4 text-[#6E473B]">{blogSpe.title}</h1>
          <p className="text-gray-600 mb-2">{blogSpe.slug}</p>
          <p className="text-lg mb-6 text-green-700">{blogSpe.summary}</p>
          
          <div className="flex gap-5 text-sm text-red-500 text-gray-500 mb-6">
            <p>{blogSpe.readTime} read</p>
            <p>{blogSpe.date}</p>
            <p>{blogSpe.likes} likes</p>
          </div>

          <p className="text-[#375534] leading-relaxed ">{blogSpe.longDescription}</p>
          <p className="mt-5 py-3">Comments:</p>
          <div className="flex gap-5">
            {blogSpe.comments.map((item,index)=>(
              <div key={index} className="bg-gray-200 text-[#6E473B] my-3 p-4 rounded-lg">
                <p className="font-bold text-[#375534]">{item.name}</p>
                <h1>{item.text}</h1>
                <p >{item.date}</p>
                
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <p className="font-semibold text-[#6E473B]">By {blogSpe.author}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {blogSpe.tags.map((item, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                >
                  #{item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;