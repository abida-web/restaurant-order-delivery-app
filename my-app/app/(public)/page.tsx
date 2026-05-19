import BestSelling from "@/components/BestSelling";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <BestSelling />
      {/*Reservation CTA section */}
      <section className=" p-8 rounded-2xl shadow-lg sm:mx-10 mx-5 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Reserve Your Table Today
          </h1>
          <p className="text-gray-400 mt-2 max-w-md">
            Experience our exquisite cuisine in an unforgettable atmosphere.
            Book now and enjoy a complimentary welcome drink! 🍷
          </p>
          <div className="flex gap-4 mt-3 text-sm text-amber-500 justify-center lg:justify-start">
            <span>✓ Best Price Guarantee</span>
            <span>✓ Free Cancellation</span>
          </div>
        </div>
        <Link
          href="/reservations"
          className=" transition-all duration-300 rounded-lg text-lg font-semibold text-amber-500 px-8 py-3 inline-block shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Book Your Table →
        </Link>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
