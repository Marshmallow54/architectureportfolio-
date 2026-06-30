"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ApiProject } from "@/lib/api";
import { formatProjectYear } from "@/lib/projects";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { useMotion } from "@/contexts/motion-context";

interface PinnedFeaturedProjectsProps {
    projects: ApiProject[];
}

export default function PinnedFeaturedProjects({ projects }: PinnedFeaturedProjectsProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);
    const counterRef = useRef<HTMLSpanElement>(null);
    const activeIndexRef = useRef(0);
    const { motionEnabled, isMobile, reducedMotion } = useMotion();
    const [activeIndex, setActiveIndex] = useState(0);

    const featured = useMemo(() => projects.slice(0, 4), [projects]);
    const projectKey = useMemo(
        () => featured.map((project) => project.slug).join("|"),
        [featured],
    );

    const activeProject = featured[activeIndex] ?? featured[0];

    useEffect(() => {
        if (!sectionRef.current || !stickyRef.current || !motionEnabled || isMobile) return;
        if (featured.length === 0) return;

        registerGsapPlugins();

        let ctx: gsap.Context | undefined;

        const init = () => {
            const slides = imageRefs.current.filter(Boolean);
            const labels = textRefs.current.filter(Boolean);

            if (slides.length !== featured.length || labels.length !== featured.length) {
                return;
            }

            ctx = gsap.context(() => {
                if (reducedMotion) return;

                const panels = featured.length;

                const setActiveSlide = (index: number) => {
                    const clamped = Math.max(0, Math.min(index, panels - 1));
                    if (activeIndexRef.current === clamped) return;

                    activeIndexRef.current = clamped;

                    if (counterRef.current) {
                        counterRef.current.textContent = String(clamped + 1).padStart(2, "0");
                    }

                    setActiveIndex(clamped);
                };

                featured.forEach((_, index) => {
                    if (index === 0) {
                        gsap.set(slides[index], { opacity: 1, scale: 1 });
                        gsap.set(labels[index], { opacity: 1, y: 0 });
                        return;
                    }

                    gsap.set(slides[index], { opacity: 0, scale: 1.06 });
                    gsap.set(labels[index], { opacity: 0, y: 36 });
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.85,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            const nextIndex = Math.min(
                                Math.floor(self.progress * panels),
                                panels - 1,
                            );
                            setActiveSlide(nextIndex);
                        },
                    },
                });

                featured.forEach((_, index) => {
                    if (index === 0) return;

                    const position = index;

                    tl.to(
                        slides[index - 1],
                        { opacity: 0, scale: 1.03, duration: 1, ease: "none" },
                        position,
                    )
                        .fromTo(
                            slides[index],
                            { opacity: 0, scale: 1.08 },
                            { opacity: 1, scale: 1, duration: 1, ease: "none" },
                            position,
                        )
                        .to(
                            labels[index - 1],
                            { opacity: 0, y: -24, duration: 0.6, ease: "none" },
                            position,
                        )
                        .fromTo(
                            labels[index],
                            { opacity: 0, y: 36 },
                            { opacity: 1, y: 0, duration: 0.8, ease: "none" },
                            position + 0.12,
                        );
                });
            }, sectionRef);

            requestAnimationFrame(() => ScrollTrigger.refresh());
        };

        const frame = requestAnimationFrame(init);

        return () => {
            cancelAnimationFrame(frame);
            ctx?.revert();
            activeIndexRef.current = 0;
        };
    }, [projectKey, featured.length, motionEnabled, isMobile, reducedMotion]);

    if (featured.length === 0) return null;

    const scrollHeight = `${Math.max(featured.length * 85, 220)}vh`;

    if (isMobile || !motionEnabled) {
        return (
            <section className="px-6 md:px-12 py-section border-b border-border">
                <div className="max-w-6xl mx-auto space-y-16">
                    <span className="featured-eyebrow block">Featured Projects</span>
                    {featured.map((project) => (
                        <Link
                            key={project.slug}
                            href={`/portfolio/${project.slug}`}
                            className="group block"
                        >
                            <div className="aspect-[16/10] overflow-hidden bg-stone mb-5">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="font-serif text-heading mb-2">{project.title}</h3>
                            <p className="text-body-sm text-muted-foreground">
                                {project.location} · {formatProjectYear(project.year)}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            className="relative bg-[hsl(var(--charcoal))]"
            style={{ height: scrollHeight }}
        >
            <div
                ref={stickyRef}
                className="sticky top-0 h-[100svh] overflow-hidden bg-[hsl(var(--charcoal))]"
            >
                <div className="absolute inset-0">
                    {featured.map((project, index) => (
                        <div
                            key={project.slug}
                            ref={(el) => {
                                imageRefs.current[index] = el;
                            }}
                            className="absolute inset-0 will-change-[opacity,transform] pointer-events-none"
                            style={{
                                zIndex: index,
                                opacity: index === 0 ? 1 : undefined,
                            }}
                            aria-hidden={index !== activeIndex}
                        >
                            <img
                                src={project.image}
                                alt=""
                                aria-hidden="true"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--charcoal)/0.92)] via-[hsl(var(--charcoal)/0.45)] to-[hsl(var(--charcoal)/0.55)]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--charcoal)/0.5)] via-transparent to-transparent" />
                        </div>
                    ))}
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between px-6 py-16 md:px-12 md:py-20 pointer-events-none">
                    <div className="flex items-start justify-between hero-text-shadow">
                        <span className="featured-eyebrow">Featured Projects</span>
                        <span className="featured-eyebrow tabular-nums">
                            <span ref={counterRef}>01</span>
                            <span className="opacity-60">
                                {" "}
                                / {String(featured.length).padStart(2, "0")}
                            </span>
                        </span>
                    </div>

                    <div className="relative min-h-[220px] md:min-h-[240px]">
                        {featured.map((project, index) => (
                            <div
                                key={project.slug}
                                ref={(el) => {
                                    textRefs.current[index] = el;
                                }}
                                className="absolute inset-x-0 bottom-14 md:bottom-16 will-change-[opacity,transform] pointer-events-none"
                                style={{
                                    zIndex: index + 10,
                                    opacity: index === 0 ? 1 : undefined,
                                }}
                                aria-hidden={index !== activeIndex}
                            >
                                <p className="featured-meta mb-4 hero-text-shadow">
                                    {project.location} · {formatProjectYear(project.year)}
                                </p>
                                <h3 className="font-serif text-display text-stone-light hero-text-shadow max-w-3xl">
                                    {project.title}
                                </h3>
                            </div>
                        ))}

                        {activeProject && (
                            <Link
                                key={activeProject.slug}
                                href={`/portfolio/${activeProject.slug}`}
                                className="featured-cta hero-text-shadow absolute bottom-0 left-0 pointer-events-auto"
                            >
                                View Project →
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
