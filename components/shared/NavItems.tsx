"use client";

import { headerLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

// NavItems routes

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {

        const isActive = pathname === link.route

        return (
          <li key={link.route} className={cn(`flex-center p-medium-16 whitespace-nowrap text-slate-500`, isActive ? 'text-slate-900 font-bold underline underline-offset-4' : '')}>
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
