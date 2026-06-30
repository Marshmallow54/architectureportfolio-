"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { scrollToTop } from "@/lib/scroll-to-top";
import { useMotion } from "@/contexts/motion-context";

export default function PageTransition({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const ref = useRef<HTMLDivElement>(null);
    const { motionEnabled } = useMotion();

    useEffect(() => {
        scrollToTop(true);

        if (!ref.current) return;

        registerGsapPlugins();
        ScrollTrigger.refresh();
        if (!motionEnabled) {
            gsap.set(ref.current, { opacity: 1, y: 0 });
            return;
        }

        const tween = gsap.fromTo(
            ref.current,
            { opacity: 0, y: 28 },
            {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
            },
        );

        return () => {
            tween.kill();
        };
    }, [pathname, motionEnabled]);

    return <div ref={ref}>{children}</div>;
}
