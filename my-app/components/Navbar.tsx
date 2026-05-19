"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ForkKnife,
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingCartIcon,
  Truck,
  User,
  X,
} from "lucide-react";
import { useCart } from "@/cartContext/store";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const { cart } = useCart();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Reservations", href: "/reservations" },
    { name: "About", href: "/about" },
  ];

  const router = useRouter();
  const path = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setOpenMobile(false);
  }, [path]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (openMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openMobile]);

  const signOut = async () => {
    await authClient.signOut();
  };

  const { data: session } = authClient.useSession();

  return (
    <div className="flex items-center justify-between p-5 border-b bg-black">
      {/* Logo */}
      <div className="text-2xl font-bold text-amber-500">
        <Link href="/">Snappet</Link>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className={`transition-colors duration-200 capitalize ${
              path === item.href
                ? "text-amber-500 font-semibold"
                : "text-gray-400 hover:text-amber-500"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Action Buttons - Desktop */}
      <div className="hidden relative md:flex items-center gap-4">
        <span className="absolute top-0 text-xs left-4 bg-white text-amber-500 px-[2px] rounded-full">
          {cart.length}
        </span>
        <Button
          variant="outline"
          className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
          onClick={() => router.push("/cart")}
        >
          <ShoppingCartIcon />
        </Button>
        {!session ? (
          <Button
            className="bg-amber-500 text-white hover:bg-amber-600"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
        ) : (
          <>
            {" "}
            <Button
              className="bg-amber-500 text-white hover:bg-amber-600"
              onClick={() => router.push("/reservations")}
            >
              Reserve Table
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {session && session.user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                {session && session.user.role === "kitchen" && (
                  <DropdownMenuItem asChild>
                    <Link href="/kitchen" className="cursor-pointer">
                      <ForkKnife className="mr-2 h-4 w-4" />
                      Kitchen
                    </Link>
                  </DropdownMenuItem>
                )}
                {session && session.user.role === "driver" && (
                  <DropdownMenuItem asChild>
                    <Link href="/driver" className="cursor-pointer">
                      <Truck className="mr-2 h-4 w-4" />
                      Driver
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={signOut}
                  className="text-red-600 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>

      {/* Mobile Controls - Cart on left, Menu on right */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="relative">
          <span className="absolute -top-2 -right-2 text-xs bg-white text-amber-500 px-[2px] rounded-full min-w-[18px] text-center">
            {cart.length}
          </span>
          <Button
            variant="outline"
            className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCartIcon />
          </Button>
        </div>
        <button
          onClick={() => setOpenMobile(true)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {openMobile && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setOpenMobile(false)}
          />

          {/* Menu Panel */}
          <div className="bg-black fixed inset-y-0 right-0 w-full max-w-sm z-50 md:hidden shadow-xl animate-in slide-in-from-right">
            {/* Close button */}
            <button
              onClick={() => setOpenMobile(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col items-center justify-center h-full gap-8 px-6">
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={`text-2xl transition-colors duration-200 capitalize ${
                    path === item.href
                      ? "text-amber-500 font-semibold"
                      : "text-gray-400 hover:text-amber-500"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Action Buttons */}
              <div className="flex flex-col gap-4 mt-8 w-full">
                <Button
                  className="bg-amber-500 text-white hover:bg-amber-600 w-full"
                  onClick={() => {
                    router.push("/reservations");
                    setOpenMobile(false);
                  }}
                >
                  Reserve Table
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
