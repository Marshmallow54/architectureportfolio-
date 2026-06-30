"use client";

import { useEffect, useState } from "react";
import { PARALLAX_MAX_OFFSET, PARALLAX_MAX_SCALE } from "@/lib/animations";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

interface ParallaxValues {
    offset: number;
    scale: number;
}

export function useParallax(enabled = true): ParallaxValues {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [values, setValues] = useState<ParallaxValues>({ offset: 0, scale: 1 });

    useEffect(() => {
        if (!enabled || prefersReducedMotion) return;

        let frame = 0;

        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const viewport = window.innerHeight || 1;
                const isMobile = window.innerWidth < 768;
                const intensity = isMobile ? 0.35 : 1;
                const progress = Math.min(scrollY / viewport, 1) * intensity;

                setValues({
                    offset: progress * PARALLAX_MAX_OFFSET,
                    scale: 1 + progress * (PARALLAX_MAX_SCALE - 1),
                });
            });
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
        };
    }, [enabled, prefersReducedMotion]);

    return values;
}
