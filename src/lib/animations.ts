export const REVEAL_THRESHOLD = 0.12;

export const REVEAL_ROOT_MARGIN = "0px 0px -8% 0px";

export const PARALLAX_MAX_OFFSET = 120;

export const PARALLAX_MAX_SCALE = 1.08;

export function getStaggerDelay(index: number, baseMs = 80): number {
    return index * baseMs;
}

export const revealClasses = {
    hidden: "opacity-0 translate-y-8",
    visible: "opacity-100 translate-y-0",
    transition: "transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100",
};
