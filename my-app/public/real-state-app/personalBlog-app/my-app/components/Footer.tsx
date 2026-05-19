import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { mobileNavigation } from "../data/posts";

const Footer = () => {
  return (
    <section className="bg-[#375534] mt-10 w-full text-white py-10">
      {" "}
      {/* Changed height to padding */}
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {" "}
        {/* Added container with max-width */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {" "}
          {/* Added gap */}
          {/* Logo and Social Section */}
          <div className="flex flex-col space-y-4">
            {" "}
            {/* Added spacing */}
            <h1 className="font-bold text-2xl my-2">Logo here</h1>
            <p className="max-w-xs text-gray-200">
              {" "}
              {/* Changed width and color */}
              Thanks for being here and putting the time to explore. I
              appreciate that :)
            </p>
            <div className="flex space-x-4 mt-4">
              {" "}
              {/* Added flex for social icons */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="flex flex-col space-y-3">
            {" "}
            {/* Added spacing */}
            <h3 className="font-semibold text-lg mb-2">Navigation</h3>{" "}
            {/* Added heading */}
            {mobileNavigation.map((nav, index) => (
              <Link
                key={index}
                href={nav.href}
                className="text-gray-200 hover:text-white transition-colors w-fit" // Added hover effects
              >
                {nav.name}
              </Link>
            ))}
          </div>
          {/* Interests Section */}
          <div className="flex flex-col space-y-3">
            {" "}
            {/* Added spacing */}
            <h3 className="font-semibold text-lg mb-2">Interests</h3>{" "}
            {/* Added heading */}
            <Link
              href="#"
              className="text-gray-200 hover:text-white transition-colors w-fit"
            >
              Authentic
            </Link>
            <Link
              href="#"
              className="text-gray-200 hover:text-white transition-colors w-fit"
            >
              World
            </Link>
            <Link
              href="#"
              className="text-gray-200 hover:text-white transition-colors w-fit"
            >
              Explore
            </Link>
            <Link
              href="#"
              className="text-gray-200 hover:text-white transition-colors w-fit"
            >
              Travel
            </Link>
          </div>
        </div>
        {/* Bottom Copyright Section */}
        <div className="border-t border-white mt-8 pt-6 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} Your Blog Name. All rights
            reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
