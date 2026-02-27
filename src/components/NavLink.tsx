"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
    className?: string;
    activeClassName?: string;
    exact?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
    ({ className, activeClassName, href, exact = false, ...props }, ref) => {
        const pathname = usePathname() || "";
        const hrefString = href ? href.toString() : "";
        const isActive = exact ? pathname === hrefString : pathname.startsWith(hrefString);

        return (
            <Link
                href={href}
                ref={ref}
                className={cn(className, isActive && activeClassName)}
                {...props}
            />
        );
    }
);

NavLink.displayName = "NavLink";

export { NavLink };
