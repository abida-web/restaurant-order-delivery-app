"use client";
import Link from "next/link";
import { Card } from "./ui/card";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmitNewsLetter(e: React.FormEvent) {
    e.preventDefault(); // Prevent form from refreshing the page

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Fixed extra space
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Subscribed Successfully!");
        setEmail(""); // Clear input on success
      } else {
        toast.error(data.error || "Failed to subscribe. Please try again!");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="mt-20 rounded-none">
      <div className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-15 px-4 sm:px-6 lg:px-8">
          {/* Restaurant Name */}
          <div>
            <h1 className="font-serif text-3xl text-amber-500 mb-4">
              X Restaurant
            </h1>
            <p className="text-gray-400 text-sm">Fine dining experience</p>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Visit Us</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              123 Gourmet Street
              <br />
              Foodie District
              <br />
              New York, NY 10001
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-3">
              Get exclusive offers & updates
            </p>
            <form
              onSubmit={handleSubmitNewsLetter}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-amber-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>

          {/* Opening Hours */}
          <div className="ml-5">
            <h3 className="text-white font-semibold text-lg mb-4">
              Opening Hours
            </h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>Mon - Thu: 11am - 10pm</li>
              <li>Fri - Sat: 11am - 11pm</li>
              <li>Sunday: 12pm - 9pm</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} X Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Footer;
