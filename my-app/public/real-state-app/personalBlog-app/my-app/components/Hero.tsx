import React from "react";

const Hero = () => {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 lg:gap-0 w-full">
        {/* Text Content */}
        <div className="flex flex-col justify-center lg:ml-10 md:ml-8 mt-8 lg:mt-0 md:mt-20 px-4 lg:px-0">
          <div className="flex flex-col md:gap-4 gap-1 lg:gap-5 text-[#375534] font-bold">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl md:text-5xl leading-tight">
              Living Life,
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl md:text-5xl leading-tight">
              One Story at a Time
            </h1>
          </div>
          <p className="text-lg sm:text-xl py-4 lg:py-5 text-[#6E473B] max-w-md">
            Thoughts, routine, and moments that shape my everyday life...
          </p>
          <button className="bg-[#375534] px-6 py-3 text-white rounded-full w-40 cursor-pointer hover:bg-[#2a4230] transition-colors duration-200">
            Read More
          </button>
        </div>

        {/* Image */}
        <div className="flex justify-center items-center px-4 lg:px-4">
          <img
            src="./sangwon.png"
            alt="Hero"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-t-[4rem] lg:rounded-t-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
