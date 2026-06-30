"use client";

import { cn } from "@/lib/utils";
import { revealClasses } from "@/lib/animations";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function ScrollReveal({
    children,
    className,
    delay = 0,
}: ScrollRevealProps) {
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>(delay);

    return (
        <div
            ref={ref}
            className={cn(
                revealClasses.transition,
                isVisible ? revealClasses.visible : revealClasses.hidden,
                className,
            )}
        >
            {children}
        </div>
    );
}
