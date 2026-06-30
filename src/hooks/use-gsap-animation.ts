"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { useMotion } from "@/contexts/motion-context";

export function useGsapContext(
    setup: (ctx: gsap.Context) => void,
    deps: React.DependencyList = [],
    enabled = true,
) {
    const scopeRef = useRef<HTMLDivElement>(null);
    const { motionEnabled } = useMotion();

    useEffect(() => {
        if (!enabled || !motionEnabled || !scopeRef.current) return;

        registerGsapPlugins();

        const ctx = gsap.context(() => {
            setup(ctx);
        }, scopeRef);

        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, motionEnabled, ...deps]);

    return scopeRef;
}
