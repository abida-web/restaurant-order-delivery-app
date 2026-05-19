"use client";
import React, { useState } from "react";
import { mobileNavigation } from "../data/posts";
import NavLink from "./NavLink";
import { FiMenu } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { HiX } from "react-icons/hi";

const Navbar = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [openAccountModel, setOpenAccountModel] = useState(false);

  return (
    <div className="relative">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex md:flex sm:flex min-w-full gap-10 items-center mx-10 lg:justify-center  justify-start text-[#375534] font-bold py-5 relative">
        {mobileNavigation.map((nav, index) => (
          <NavLink key={index} href={nav.href}>
            {nav.name}
          </NavLink>
        ))}

        {/* Desktop User Actions */}
        <div className="absolute right-35 flex items-center gap-5">
          <button onClick={() => setOpenAccountModel(true)}>
            <FaUser color="#6E473B" size={20} />
          </button>
          <button className="text-white px-4 py-2 rounded-md hover:bg-[#5e3b31] bg-[#6E473B]">
            Start Exploring
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden md:hidden sm:hidden flex justify-between text-[#0F2A1D] px-5 z-50 bg-white py-5 relative">
        <button onClick={() => setOpenMobileNav(true)}>
          <FiMenu size={20} />
        </button>
        <button onClick={() => setOpenAccountModel(true)}>
          <FaUser size={20} />
        </button>

        {/* Mobile Navigation Overlay */}
        {openMobileNav && (
          <div className="fixed inset-0 bg-white z-50 p-5">
            <div className="flex justify-end items-center mb-8">
              <button
                className="text-[#0F2A1D]"
                onClick={() => setOpenMobileNav(false)}
              >
                <HiX size={24} />
              </button>
            </div>
            <div className="flex flex-col font-bold text-[#375534] gap-5">
              {mobileNavigation.map((nav, index) => (
                <NavLink
                  key={index}
                  href={nav.href}
                  onClick={() => setOpenMobileNav(false)}
                >
                  {nav.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {/* Account Modal */}
        {openAccountModel && (
          <div className="fixed inset-0 bg-white z-50 p-5">
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold">Account</span>
              <button
                className="text-[#0F2A1D]"
                onClick={() => setOpenAccountModel(false)}
              >
                <HiX size={24} />
              </button>
            </div>
            {/* Add account modal content here */}
            <div>Account modal content</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
