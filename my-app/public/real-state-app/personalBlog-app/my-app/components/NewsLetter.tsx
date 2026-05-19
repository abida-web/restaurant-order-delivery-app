"use client";
import { useRef } from "react";

const NewsLetter = () => {
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (emailRef.current) {
      const email = emailRef.current.value.trim();

      if (email) {
        alert(`User subscribed: ${email}`);
        emailRef.current.value = "";
      } else {
        alert("Please enter a valid email address");
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <h1 className="py-4 sm:py-5 text-[#5e3b31] font-semibold text-2xl sm:text-3xl lg:text-4xl text-center">
        Subscribe to our Newsletter
      </h1>

      {/* Description text */}
      <p className="text-gray-600 text-sm sm:text-base lg:text-lg text-center max-w-2xl mb-6 sm:mb-8">
        Stay updated with our latest news, offers, and exclusive content
        delivered directly to your inbox.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md lg:max-w-lg"
      >
        <div className="flex-1">
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#375534] focus:border-transparent text-sm sm:text-base"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 sm:py-2 bg-[#375534] text-white rounded-lg hover:bg-[#2a4128] transition-colors duration-300 font-medium text-sm sm:text-base whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>

      {/* Privacy note */}
      <p className="text-gray-500 text-xs sm:text-sm mt-4 text-center max-w-md">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </section>
  );
};

export default NewsLetter;
