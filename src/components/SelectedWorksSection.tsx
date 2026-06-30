"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ApiProject } from "@/lib/api";
import { formatProjectYear } from "@/lib/projects";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { useMotion } from "@/contexts/motion-context";
import SectionHeader from "./SectionHeader";

interface SelectedWorksSectionProps {
    projects: ApiProject[];
}

function FeaturedProjectCard({
    project,
    index,
}: {
    project: ApiProject;
    index: number;
}) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const { motionEnabled, isMobile, reducedMotion } =  useMotion();
    const year = formatProjectYear(project.year);

    useEffect(() => {
        if (!cardRef.current || !imageRef.current || !textRef.current || !motionEnabled) return;

        registerGsapPlugins();

        const ctx = gsap.context(() => {
            if (reducedMotion) {
                gsap.set([cardRef.current, imageRef.current, textRef.current], {
                    opacity: 1,
                    y: 0,
                });
                return;
            }

            gsap.set(cardRef.current, { opacity: 0, y: 72 });
            const image = imageRef.current?.querySelector("img");
            if (image) gsap.set(image, { scale: 1.12, y: "-6%" });

            gsap.to(cardRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.15,
                delay: index * 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 88%",
                    toggleActions: "play none none reverse",
                },
            });

            if (!isMobile && image) {
                gsap.to(image, {
                    y: "6%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.7,
                    },
                });
            }
        }, cardRef);

        return () => ctx.revert();
    }, [index, motionEnabled, isMobile, reducedMotion]);

    return (
        <Link ref={cardRef} href={`/portfolio/${project.slug}`} className="group block">
            <div
                ref={imageRef}
                className="image-frame aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-stone mb-6"
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[115%] object-cover will-change-transform transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:-translate-y-[2%] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:translate-y-0"
                    loading="lazy"
                />
            </div>
            <div ref={textRef} className="will-change-transform">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-serif text-subheading group-hover:opacity-70 transition-opacity duration-500">
                        {project.title}
                    </h3>
                    <span className="text-caption shrink-0">{year}</span>
                </div>
                <p className="text-caption">{project.location}</p>
            </div>
        </Link>
    );
}

export default function SelectedWorksSection({ projects }: SelectedWorksSectionProps) {
    const ctaRef = useRef<HTMLDivElement>(null);
    const { motionEnabled, reducedMotion } = useMotion();

    useEffect(() => {
        if (!ctaRef.current || !motionEnabled) return;

        registerGsapPlugins();

        const ctx = gsap.context(() => {
            if (reducedMotion) {
                gsap.set(ctaRef.current, { opacity: 1, y: 0 });
                return;
            }

            gsap.fromTo(
                ctaRef.current,
                { opacity: 0, y: 32 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: "top 92%",
                        toggleActions: "play none none reverse",
                    },
                },
            );
        });

        return () => ctx.revert();
    }, [motionEnabled, reducedMotion]);

    return (
        <section className="px-6 md:px-12 py-section">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    label="Selected Works"
                    title="Projects"
                    description="A selection of architectural studies exploring context, materiality, and spatial order."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-grid gap-y-16 md:gap-y-20">
                    {projects.map((project, index) => (
                        <FeaturedProjectCard
                            key={project.slug}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>

                <div ref={ctaRef} className="mt-16 md:mt-20">
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-3 text-caption border border-border px-5 py-3 hover:bg-foreground hover:text-background transition-colors duration-500"
                    >
                        View All Works →
                    </Link>
                </div>
            </div>
        </section>
    );
}
