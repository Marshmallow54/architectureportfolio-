"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
    { path: "/", label: "Home" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/about", label: "About" },
];

const Navigation = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
            <nav className="flex items-center justify-between px-6 md:px-12 h-14 border-b border-border">
                <Link href="/" className="text-body-sm font-semibold tracking-tight hover-lift">
                    Portfolio
                </Link>

                <ul className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className={`text-body-sm hover-lift transition-opacity ${pathname === item.path
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    className="md:hidden text-body-sm text-muted-foreground hover-lift"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? "Close" : "Menu"}
                </button>
            </nav>

            {menuOpen && (
                <div className="md:hidden bg-background border-b border-border">
                    <ul className="flex flex-col px-6 py-4 gap-4">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={`text-body-sm ${pathname === item.path
                                            ? "text-foreground"
                                            : "text-muted-foreground"
                                        }`}
                                    onClick={() => setMenuOpen(false)}
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
};

export default Navigation;
