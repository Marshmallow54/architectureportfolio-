"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    label: string;
    title?: string;
    description?: string;
    className?: string;
    align?: "left" | "center";
}

export default function SectionHeader({
    label,
    title,
    description,
    className,
    align = "left",
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "mb-12 md:mb-16",
                align === "center" && "text-center mx-auto max-w-2xl",
                className,
            )}
        >
            <span className="text-caption block mb-4">{label}</span>
            {title && <h2 className="font-serif text-heading mb-4">{title}</h2>}
            {description && (
                <p className="text-body text-muted-foreground leading-relaxed max-w-xl">
                    {description}
                </p>
            )}
        </div>
    );
}
