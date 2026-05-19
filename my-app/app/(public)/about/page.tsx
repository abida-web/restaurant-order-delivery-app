// app/about/page.tsx
import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">
        About Our Restaurant
      </h1>
      <p className="text-center text-gray-400 mb-12">
        Serving delicious meals since 2024
      </p>

      <div className="space-y-6 text-gray-300">
        <p>
          Welcome to our family-owned restaurant where we serve authentic,
          freshly prepared meals made with love and the finest ingredients.
        </p>

        <p>
          Our mission is to provide you with an unforgettable dining experience,
          whether you're dining in or ordering from home.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-black/50 p-5 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">🍕 Fresh Ingredients</h2>
            <p className="text-gray-400">
              We source only the best quality ingredients for our dishes.
            </p>
          </div>

          <div className="bg-black/50 p-5 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">👨‍🍳 Expert Chefs</h2>
            <p className="text-gray-400">
              Our experienced chefs bring years of culinary expertise.
            </p>
          </div>

          <div className="bg-black/50 p-5 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">🚚 Fast Delivery</h2>
            <p className="text-gray-400">
              Hot and fresh food delivered right to your doorstep.
            </p>
          </div>

          <div className="bg-black/50 p-5 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">⭐ Quality Guarantee</h2>
            <p className="text-gray-400">
              Your satisfaction is our top priority.
            </p>
          </div>
        </div>

        <div className="text-center pt-6">
          <h3 className="text-2xl font-semibold mb-2">Visit Us Today!</h3>
          <p className="text-gray-400">📍 123 Food Street, Downtown</p>
          <p className="text-gray-400">📞 (555) 123-4567</p>
          <p className="text-gray-400">⏰ Mon-Sun: 10:00 AM - 10:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
