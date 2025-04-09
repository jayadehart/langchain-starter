"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

interface PaginationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  page: number;
  disabled?: boolean;
}

export function PaginationButton({
  page,
  disabled = false,
  children,
  ...props
}: PaginationButtonProps) {
  if (disabled) {
    return (
      <button
        className="px-4 py-2 bg-gray-100 text-gray-400 rounded-md cursor-not-allowed"
        disabled
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={`/haikus?page=${page}`}
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
    >
      {children}
    </Link>
  );
}
