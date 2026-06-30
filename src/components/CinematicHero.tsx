"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { contact, introText } from "@/data/cv";
import { PLACEHOLDER_IMAGE } from "@/lib/projects";
import { useMotion } from "@/contexts/motion-context";

interface CinematicHeroProps {
    backgroundImage?: string | null;
}

export default function CinematicHero({ backgroundImage }: CinematicHeroProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const scrollCueRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const { motionEnabled, reducedMotion } = useMotion();

    const imageSrc = backgroundImage || PLACEHOLDER_IMAGE;

    useEffect(() => {
        if (!sectionRef.current || !motionEnabled) return;

        registerGsapPlugins();

        const ctx = gsap.context(() => {
            if (reducedMotion) {
                gsap.set(
                    [
                        imageRef.current,
                        overlayRef.current,
                        labelRef.current,
                        titleRef.current,
                        subtitleRef.current,
                        ctaRef.current,
                        scrollCueRef.current,
                        progressRef.current,
                    ],
                    { clearProps: "all" },
                );
                return;
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.8,
                },
            });

            tl.fromTo(
                imageRef.current,
                { scale: 1.18, y: 0 },
                { scale: 1, y: -90, ease: "none" },
                0,
            )
                .fromTo(
                    overlayRef.current,
                    { opacity: 0.72 },
                    { opacity: 0.92, ease: "none" },
                    0,
                )
                .fromTo(
                    contentRef.current,
                    { y: 0 },
                    { y: -120, ease: "none" },
                    0,
                )
                .fromTo(
                    titleRef.current,
                    { opacity: 1, y: 0 },
                    { opacity: 0, y: -40, ease: "none" },
                    0,
                )
                .fromTo(
                    [labelRef.current, subtitleRef.current, ctaRef.current],
                    { opacity: 1 },
                    { opacity: 0, ease: "none" },
                    0.15,
                )
                .fromTo(
                    scrollCueRef.current,
                    { opacity: 1, y: 0 },
                    { opacity: 0, y: -16, ease: "none" },
                    0,
                )
                .fromTo(
                    progressRef.current,
                    { scaleX: 0 },
                    { scaleX: 1, ease: "none" },
                    0,
                );
        }, sectionRef);

        return () => ctx.revert();
    }, [motionEnabled, reducedMotion, imageSrc]);

    return (
        <section
            ref={sectionRef}
            className="relative h-[100svh] flex items-end overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 will-change-transform">
                    <img
                        ref={imageRef}
                        src={imageSrc}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-[120%] object-cover origin-center"
                    />
                </div>
                <div
                    ref={overlayRef}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--charcoal)/0.97)] via-[hsl(var(--charcoal)/0.62)] to-[hsl(var(--charcoal)/0.35)]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--charcoal)/0.55)] via-transparent to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[hsl(var(--charcoal)/0.5)] to-transparent" />
                </div>
            </div>

            <div
                ref={contentRef}
                className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-24 pt-32 will-change-transform"
            >
                <div className="max-w-5xl">
                    <p
                        ref={labelRef}
                        className="hero-eyebrow mb-6 hero-text-shadow"
                    >
                        Architecture Portfolio
                    </p>
                    <h1
                        ref={titleRef}
                        className="font-serif text-display text-stone-light mb-5 max-w-4xl will-change-transform hero-text-shadow"
                    >
                        {contact.name}
                    </h1>
                    <p
                        ref={subtitleRef}
                        className="text-subheading text-stone-light mb-10 max-w-xl hero-text-shadow"
                    >
                        {contact.title}
                    </p>
                    <Link
                        ref={ctaRef}
                        href="/portfolio"
                        className="hero-cta hero-text-shadow"
                    >
                        View Selected Works
                    </Link>
                </div>
            </div>

            <div
                ref={scrollCueRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
                aria-hidden="true"
            >
                <span className="text-caption text-stone-light/70">Scroll</span>
                <div className="w-px h-12 bg-stone-light/30 overflow-hidden">
                    <div className="w-full h-full bg-stone-light/80 animate-scroll-cue" />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-stone-light/15">
                <div
                    ref={progressRef}
                    className="h-full bg-stone-light/70 origin-left will-change-transform"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>
        </section>
    );
}

export function EditorialIntro() {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paragraphRefs = useRef<HTMLParagraphElement[]>([]);
    const { motionEnabled, reducedMotion } = useMotion();

    useEffect(() => {
        if (!sectionRef.current || !motionEnabled) return;

        registerGsapPlugins();

        const ctx = gsap.context(() => {
            const targets = [
                labelRef.current,
                headingRef.current,
                ...paragraphRefs.current.filter(Boolean),
            ];

            if (reducedMotion) {
                gsap.set(targets, { opacity: 1, y: 0 });
                return;
            }

            gsap.set(targets, { opacity: 0, y: 56 });

            gsap.to(targets, {
                opacity: 1,
                y: 0,
                duration: 1.1,
                stagger: 0.14,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 78%",
                    toggleActions: "play none none reverse",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [motionEnabled, reducedMotion]);

    return (
        <section
            ref={sectionRef}
            className="px-6 md:px-12 py-section border-b border-border"
        >
            <div className="editorial-grid max-w-6xl mx-auto">
                <div className="col-span-12 lg:col-span-4">
                    <span ref={labelRef} className="text-caption block mb-4">
                        Introduction
                    </span>
                    <h2 ref={headingRef} className="font-serif text-heading">
                        Research-led spatial practice
                    </h2>
                </div>
                <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                    <p
                        ref={(el) => {
                            if (el) paragraphRefs.current[0] = el;
                        }}
                        className="text-body-lg text-muted-foreground leading-relaxed"
                    >
                        {introText}
                    </p>
                    <p
                        ref={(el) => {
                            if (el) paragraphRefs.current[1] = el;
                        }}
                        className="text-body text-muted-foreground leading-relaxed mt-6 max-w-2xl"
                    >
                        I am interested in buildings that do not compete for attention, but instead
                        reveal their logic through clarity, proportion, and restraint.
                    </p>
                </div>
            </div>
        </section>
    );
}
