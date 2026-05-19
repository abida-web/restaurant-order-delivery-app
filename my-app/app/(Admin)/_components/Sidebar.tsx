"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  ChefHat,
  Menu,
  Truck,
  Calendar,
  Users,
  Settings,
  MenuIcon,
  X,
  Table,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  const [openSidebar, setOpenSidebar] = useState(false);

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/menu", label: "Menu", icon: Menu },
    { href: "/admin/drivers", label: "Drivers", icon: Truck },
    { href: "/admin/tables", label: "Tables", icon: Table },
    { href: "/admin/reservations", label: "Reservations", icon: Calendar },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <Button
        onClick={() => setOpenSidebar(true)}
        className="md:hidden bg-amber-400 text-white fixed left-6 top-3 z-50"
      >
        <MenuIcon />
      </Button>

      {/* Mobile sidebar overlay */}
      {openSidebar && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-black/70 z-40"
          onClick={() => setOpenSidebar(false)}
        >
          <div
            className="fixed w-60 z-50 bg-gradient-to-b from-black/95 to-gray-900 text-gray-100 p-4 border-r flex-col h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6 flex-1">
              <button
                onClick={() => setOpenSidebar(false)}
                className="absolute right-3 top-6 hover:text-white text-gray-400"
              >
                <X />
              </button>
              <div className="px-4 py-2 mt-8">
                <h2 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Owner Panel
                </h2>
                <p className="text-xs text-gray-500 mt-1">Restaurant Manager</p>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenSidebar(false)}
                      className={`group flex items-center gap-3 py-2.5 px-4 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-amber-500/10 text-amber-400"
                          : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-100"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="pt-6 mt-auto border-t border-gray-800 px-4">
                <div className="text-xs text-gray-600">
                  <p>© 2024 Restaurant Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar - fixed */}
      <div className="hidden md:flex fixed w-60 h-full bg-gradient-to-b from-black/90 via-black to-gray-800 text-gray-100 p-4 border-r flex-col z-30">
        <div className="space-y-6 flex-1">
          <div className="px-4 py-2">
            <h2 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Owner Panel
            </h2>
            <p className="text-xs text-gray-500 mt-1">Restaurant Manager</p>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 py-2.5 px-4 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-amber-500/10 text-amber-400"
                      : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-6 mt-auto border-t border-gray-800 px-4">
            <div className="text-xs text-gray-600">
              <p>© 2024 Restaurant Admin</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
