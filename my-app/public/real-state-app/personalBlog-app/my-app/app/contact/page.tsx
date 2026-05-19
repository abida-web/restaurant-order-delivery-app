"use client";

import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert(`Thank you ${formData.name}! Your message has been sent.`);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-12 lg:py-16">
      {/* Contact Form */}
      <div className="bg-[#375534] flex flex-col gap-6 sm:gap-8 p-6 sm:p-8 lg:p-10 rounded-lg">
        <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold text-center">
          Get In Touch
        </h1>
        <p className="text-white/80 text-sm sm:text-base text-center mb-4">
          We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="border border-white bg-transparent placeholder-white text-white px-4 sm:px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm sm:text-base"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="border border-white bg-transparent placeholder-white text-white px-4 sm:px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm sm:text-base"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="border border-white bg-transparent placeholder-white text-white px-4 sm:px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm sm:text-base"
          />
          <textarea
            rows={5}
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            className="border border-white bg-transparent placeholder-white text-white px-4 sm:px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 resize-vertical text-sm sm:text-base"
            required
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-[#375534] bg-white py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isSubmitting ? "Sending..." : "Submit Message"}
          </button>
        </form>
      </div>

      {/* Contact Information & Social Media */}
      <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
        {/* Contact Information */}
        <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-6">
            Contact Information
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full mt-1">
                <FaMapMarkerAlt className="text-green-900 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900 text-lg mb-1">
                  Our Location
                </h3>
                <p className="text-gray-700">
                  123 Nature Street
                  <br />
                  Green Valley, Earth 12345
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full mt-1">
                <FaPhone className="text-green-900 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900 text-lg mb-1">
                  Phone Number
                </h3>
                <p className="text-gray-700">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full mt-1">
                <FaEnvelope className="text-green-900 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900 text-lg mb-1">
                  Email Address
                </h3>
                <p className="text-gray-700">hello@natureblog.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mb-6">
            Connect With Us
          </h2>

          <p className="text-gray-700 mb-6 text-sm sm:text-base">
            Follow us on social media for daily inspiration, updates, and
            behind-the-scenes content.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1">
              <h3 className="font-semibold text-green-900 mb-4 text-lg">
                Social Links
              </h3>
              <div className="flex space-x-4 sm:space-x-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-900 text-white p-3 sm:p-4 rounded-full hover:bg-green-800 transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-900 text-white p-3 sm:p-4 rounded-full hover:bg-green-800 transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebook size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-900 text-white p-3 sm:p-4 rounded-full hover:bg-green-800 transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter size={20} className="sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-green-900 mb-4 text-lg">
                Business Hours
              </h3>
              <div className="text-gray-700 space-y-1 text-sm sm:text-base">
                <p>
                  <span className="font-medium">Mon-Fri:</span> 9:00 AM - 6:00
                  PM
                </p>
                <p>
                  <span className="font-medium">Saturday:</span> 10:00 AM - 4:00
                  PM
                </p>
                <p>
                  <span className="font-medium">Sunday:</span> Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Response Note */}
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
          <h3 className="font-semibold text-green-900 text-lg mb-2">
            Quick Response
          </h3>
          <p className="text-green-800 text-sm sm:text-base">
            We typically respond to all inquiries within 24 hours during
            business days. For urgent matters, please call us directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
