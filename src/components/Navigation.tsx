"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { contact } from "@/data/cv";

const navItems = [
    { path: "/", label: "Home" },
    { path: "/portfolio", label: "Works" },
    { path: "/about", label: "About" },
];

interface NavigationProps {
    overlay?: boolean;
}

export default function Navigation({ overlay = false }: NavigationProps) {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const isHome = pathname === "/";
    const useOverlayStyle = overlay && isHome && !scrolled && !menuOpen;

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setScrolled(scrollTop > 48);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                useOverlayStyle
                    ? "bg-transparent border-b border-transparent"
                    : "bg-background/90 backdrop-blur-md border-b border-border",
            )}
        >
            <nav className="flex items-center justify-between px-6 md:px-12 h-16 md:h-[4.5rem]">
                <Link
                    href="/"
                    className={cn(
                        "font-serif text-body font-medium tracking-tight transition-opacity duration-300 hover:opacity-70",
                        useOverlayStyle ? "text-stone-light hero-text-shadow" : "text-foreground",
                    )}
                >
                    {contact.name.split(" ").slice(-1)[0]}
                </Link>

                <ul className="hidden md:flex items-center gap-10">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className={cn(
                                    "text-caption transition-opacity duration-300 hover:opacity-70",
                                    useOverlayStyle && "hero-text-shadow",
                                    pathname === item.path
                                        ? useOverlayStyle
                                            ? "text-stone-light"
                                            : "text-foreground"
                                        : useOverlayStyle
                                          ? "text-stone-light/90"
                                          : "text-muted-foreground",
                                )}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    className={cn(
                        "md:hidden text-caption transition-opacity duration-300 hover:opacity-70",
                        useOverlayStyle ? "text-stone-light hero-text-shadow" : "text-muted-foreground",
                    )}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? "Close" : "Menu"}
                </button>
            </nav>

            {menuOpen && (
                <div className="md:hidden bg-background border-b border-border">
                    <ul className="flex flex-col px-6 py-6 gap-5">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={cn(
                                        "text-body-sm",
                                        pathname === item.path
                                            ? "text-foreground"
                                            : "text-muted-foreground",
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
