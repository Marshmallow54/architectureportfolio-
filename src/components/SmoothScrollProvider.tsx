"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import {
    gsap,
    registerGsapPlugins,
    ScrollTrigger,
    shouldUseSmoothScroll,
} from "@/lib/gsap";
import { setLenisInstance } from "@/lib/lenis-instance";
import { useMotion } from "@/contexts/motion-context";

function setupLenisScrollerProxy(lenis: Lenis) {
    ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
            if (arguments.length && value !== undefined) {
                lenis.scrollTo(value, { immediate: true });
            }
            return lenis.scroll;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });
}

function clearLenisScrollerProxy() {
    ScrollTrigger.scrollerProxy(document.documentElement, {});
    setLenisInstance(null);
}

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenisRef = useRef<Lenis | null>(null);
    const { reducedMotion } = useMotion();

    useEffect(() => {
        registerGsapPlugins();

        const useSmooth = shouldUseSmoothScroll() && !reducedMotion;

        if (useSmooth) {
            const lenis = new Lenis({
                duration: 1.15,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: 1.2,
            });

            lenisRef.current = lenis;
            setLenisInstance(lenis);
            setupLenisScrollerProxy(lenis);

            lenis.on("scroll", ScrollTrigger.update);

            const tickerCallback = (time: number) => {
                lenis.raf(time * 1000);
            };

            gsap.ticker.add(tickerCallback);
            gsap.ticker.lagSmoothing(0);

            const refresh = () => ScrollTrigger.refresh();
            window.addEventListener("resize", refresh);

            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });

            return () => {
                window.removeEventListener("resize", refresh);
                gsap.ticker.remove(tickerCallback);
                clearLenisScrollerProxy();
                lenis.destroy();
                lenisRef.current = null;
            };
        }

        clearLenisScrollerProxy();
        ScrollTrigger.refresh();
        return undefined;
    }, [reducedMotion]);

    return <>{children}</>;
}
