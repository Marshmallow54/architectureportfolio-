"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsapPlugins() {
    if (registered || typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
}

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobileViewport(): boolean {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
}

export function shouldUseSmoothScroll(): boolean {
    return !prefersReducedMotion() && !isMobileViewport();
}

export function killScrollTriggers(scope?: Element | string) {
    if (scope) {
        ScrollTrigger.getAll()
            .filter((trigger) => {
                const triggerElement = trigger.trigger;
                if (!triggerElement || typeof scope === "string") return false;
                return scope.contains(triggerElement as Node);
            })
            .forEach((trigger) => trigger.kill());
        return;
    }

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
