"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
interface NavLinkProps {
  href: string;
  onClick?: (e: MouseEvent) => void;
  className?: string;
  children: ReactNode;
}

const NavLink = ({ href, onClick, className, children }: NavLinkProps) => {
  const pathName = usePathname();
  const active = pathName === href;
  return (
    <Link
      className={`py-1 rounded-md px-2 ${active && "bg-[#4f8b599f]"}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
