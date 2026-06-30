import { ScrollTrigger } from "@/lib/gsap";
import { getLenisInstance } from "@/lib/lenis-instance";

export function scrollToTop(immediate = true) {
    const lenis = getLenisInstance();

    if (lenis) {
        lenis.scrollTo(0, { immediate });
    }

    window.scrollTo({ top: 0, left: 0, behavior: immediate ? "auto" : "smooth" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });
}
