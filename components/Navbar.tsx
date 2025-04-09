"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, BookOpen } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  // Debug function to verify click events
  const handleNavClick = () => {
    console.log("Nav container clicked");
  };

  return (
    <nav
      className="bg-white dark:bg-gray-900 shadow-sm border-b relative z-10"
      onClick={handleNavClick}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white block"
              onClick={() => console.log("Home link clicked")}
            >
              Haiku AI
            </Link>
          </div>

          <div className="flex space-x-4">
            <NavLink href="/" isActive={pathname === "/"}>
              <MessageSquare className="w-5 h-5 mr-1.5" />
              Chat
            </NavLink>

            <NavLink href="/haikus" isActive={pathname === "/haikus"}>
              <BookOpen className="w-5 h-5 mr-1.5" />
              Haikus
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors block ${
        isActive
          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      }`}
      onClick={() => console.log(`NavLink to ${href} clicked`)}
    >
      {children}
    </Link>
  );
}
