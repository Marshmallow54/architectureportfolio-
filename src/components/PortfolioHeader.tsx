"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { useMotion } from "@/contexts/motion-context";

interface PortfolioHeaderProps {
    label: string;
    title: string;
    description: string;
}

export default function PortfolioHeader({
    label,
    title,
    description,
}: PortfolioHeaderProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { motionEnabled, reducedMotion } = useMotion();

    useEffect(() => {
        if (!ref.current || !motionEnabled) return;

        registerGsapPlugins();

        const ctx = gsap.context(() => {
            const items = ref.current?.querySelectorAll("[data-reveal]");

            if (!items?.length) return;

            if (reducedMotion) {
                gsap.set(items, { opacity: 1, y: 0 });
                return;
            }

            gsap.fromTo(
                items,
                { opacity: 0, y: 48 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                },
            );
        }, ref);

        return () => ctx.revert();
    }, [motionEnabled, reducedMotion]);

    return (
        <div ref={ref} className="mb-12 md:mb-16">
            <span data-reveal className="text-caption block mb-4">
                {label}
            </span>
            <h2 data-reveal className="font-serif text-heading mb-4">
                {title}
            </h2>
            <p data-reveal className="text-body text-muted-foreground leading-relaxed max-w-xl">
                {description}
            </p>
        </div>
    );
}
