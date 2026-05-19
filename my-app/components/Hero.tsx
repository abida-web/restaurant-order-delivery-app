import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="mt-20 px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* items-start instead of items-center */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Experience the <span className="text-amber-500">Taste</span> of the
          World
        </h1>
        <p className="text-gray-400 text-lg">
          Bite into happiness with every single order — no fancy stuff, just
          seriously delicious food.
        </p>
        <div className=" flex items-center gap-5">
          <Link href="/cart">
            <Button className="bg-amber-500 py-4 px-5 text-white">
              Order Now
            </Button>
          </Link>

          <Link href="/menu">
            <Button variant="outline" className="px-5 py-4 text-amber-500">
              View Menu
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center lg:justify-end">
        <div className="flex justify-center lg:justify-end">
          <img
            src="./hero.png"
            alt="Delicious food"
            className="w-full max-w-md lg:max-w-full h-auto object-contain -mt-20 lg:-mt-50"
          />
        </div>
      </div>
    </div>
  );
};
export default Hero;
