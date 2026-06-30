"use client";

import { useEffect, useRef, useState } from "react";
import { REVEAL_ROOT_MARGIN, REVEAL_THRESHOLD } from "@/lib/animations";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

export function useScrollReveal<T extends HTMLElement>(delay = 0) {
    const ref = useRef<T>(null);
    const prefersReducedMotion = usePrefersReducedMotion();
    const [isVisible, setIsVisible] = useState(prefersReducedMotion);

    useEffect(() => {
        if (prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    window.setTimeout(() => setIsVisible(true), delay);
                    observer.disconnect();
                }
            },
            { threshold: REVEAL_THRESHOLD, rootMargin: REVEAL_ROOT_MARGIN },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [delay, prefersReducedMotion]);

    return { ref, isVisible };
}
