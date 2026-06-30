"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { prefersReducedMotion, isMobileViewport } from "@/lib/gsap";

interface MotionContextValue {
    reducedMotion: boolean;
    isMobile: boolean;
    motionEnabled: boolean;
}

const MotionContext = createContext<MotionContextValue>({
    reducedMotion: false,
    isMobile: false,
    motionEnabled: true,
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<MotionContextValue>({
        reducedMotion: false,
        isMobile: false,
        motionEnabled: true,
    });

    useEffect(() => {
        const update = () => {
            const reducedMotion = prefersReducedMotion();
            const isMobile = isMobileViewport();
            setState({
                reducedMotion,
                isMobile,
                motionEnabled: !reducedMotion,
            });
        };

        update();

        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        motionQuery.addEventListener("change", update);
        window.addEventListener("resize", update);

        return () => {
            motionQuery.removeEventListener("change", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    return (
        <MotionContext.Provider value={state}>{children}</MotionContext.Provider>
    );
}

export function useMotion() {
    return useContext(MotionContext);
}
