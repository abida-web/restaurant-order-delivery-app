import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const About = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 overflow-hidden">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[380px] mx-auto">
            <img
              src="./sangwon.png"
              className="w-full h-auto aspect-square object-cover rounded-full shadow-lg"
              alt="Profile"
            />
          </div>
          <h1 className="py-4 text-lg sm:text-xl md:text-2xl font-semibold text-green-900 text-center lg:text-left mt-4">
            Lost in the Beauty of Earth
          </h1>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl my-4 text-green-900 font-bold">
            Why start personal blog at the first place?
          </h1>

          <p className="text-green-900 text-base sm:text-lg md:text-xl leading-relaxed">
            I am someone who thinks deeply, grows constantly, and needs a place
            to reflect who I am and how I see the world. Writing helps me stay
            clear minded. Sharing it satisfies me for experiencing what's more
            and my love for creating and building out of nothing. I enjoy
            sharing what I love, learn, expressing real thoughts, and shaping my
            own identity and curiosity.
          </p>

          {/* Cards Section */}
          <div className="mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-[#375534] flex flex-col p-4 sm:p-5 lg:p-6 gap-3 rounded-sm text-white">
              <p className="font-semibold text-sm sm:text-base lg:text-lg">
                What I enjoy doing the most and why?
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                Learning new languages, creating new web designs, painting,
                exploring countries, trying out varieties of food and learning
                to cook.
              </p>
            </div>
            <div className="bg-[#375534] flex flex-col p-4 sm:p-5 lg:p-6 gap-3 rounded-sm text-white">
              <p className="font-semibold text-sm sm:text-base lg:text-lg">
                My passions and interests
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                Connecting with nature, photography, reading philosophy,
                sustainable living, and continuous learning through travel and
                cultural exchange.
              </p>
            </div>
          </div>

          {/* Social Section */}
          <div className="mt-6 lg:mt-8">
            <p className="text-green-900 text-base sm:text-lg mb-4">
              Feel free to catch up on socials :)
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-900 hover:text-green-700 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={28} className="sm:w-7 sm:h-7" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-900 hover:text-green-700 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={28} className="sm:w-7 sm:h-7" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-900 hover:text-green-700 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={28} className="sm:w-7 sm:h-7" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
