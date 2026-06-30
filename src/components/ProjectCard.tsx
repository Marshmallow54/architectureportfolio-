"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ApiProject } from "@/lib/api";
import { formatProjectYear } from "@/lib/projects";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { useMotion } from "@/contexts/motion-context";

interface ProjectCardProps {
    project: ApiProject;
    index?: number;
    variant?: "grid" | "list" | "featured";
    statement?: string | null;
}

export default function ProjectCard({
    project,
    index = 0,
    variant = "grid",
    statement,
}: ProjectCardProps) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const { motionEnabled, isMobile, reducedMotion } = useMotion();
    const year = formatProjectYear(project.year);
    const excerpt = statement ?? project.statement;

    useEffect(() => {
        if (!revealRef.current || !motionEnabled || variant === "featured") return;

        registerGsapPlugins();

        const ctx = gsap.context(() => {
            const image = imageWrapRef.current?.querySelector("img");

            if (reducedMotion) {
                gsap.set(revealRef.current, { opacity: 1 });
                if (image) gsap.set(image, { y: 0, scale: 1 });
                return;
            }

            gsap.set(revealRef.current, { opacity: 0 });

            gsap.to(revealRef.current, {
                opacity: 1,
                duration: 1,
                delay: Math.min(index * 0.08, 0.32),
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 92%",
                    toggleActions: "play none none reverse",
                },
            });

            if (image && !isMobile && variant === "list") {
                gsap.fromTo(
                    image,
                    { y: "-4%" },
                    {
                        y: "4%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: cardRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.75,
                        },
                    },
                );
            }
        }, cardRef);

        return () => ctx.revert();
    }, [index, motionEnabled, isMobile, reducedMotion, variant]);

    if (variant === "list") {
        return (
            <Link
                ref={cardRef}
                href={`/portfolio/${project.slug}`}
                className="group block w-full border-t border-border py-12 md:py-16 first:border-t-0"
            >
                <div ref={revealRef} className="editorial-grid w-full items-end gap-y-8 md:gap-x-12 lg:gap-x-16">
                    <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 md:pr-4">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                            <span className="text-caption">{year}</span>
                            {project.location && (
                                <span className="text-caption">{project.location}</span>
                            )}
                        </div>
                        <h3 className="font-serif text-heading group-hover:opacity-70 transition-opacity duration-500">
                            {project.title}
                        </h3>
                        {excerpt && (
                            <p className="text-body-sm text-muted-foreground leading-relaxed line-clamp-4">
                                {excerpt}
                            </p>
                        )}
                        <span className="text-caption mt-2 group-hover:translate-x-1 transition-transform duration-500 inline-block">
                            View Project →
                        </span>
                    </div>

                    <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                        <div
                            ref={imageWrapRef}
                            className="image-frame aspect-[16/10] lg:aspect-[16/9] overflow-hidden bg-stone w-full"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-[110%] object-cover will-change-transform transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    if (variant === "featured") {
        return null;
    }

    return (
        <Link ref={cardRef} href={`/portfolio/${project.slug}`} className="group block">
            <div
                ref={imageWrapRef}
                className="image-frame aspect-[4/3] overflow-hidden bg-stone mb-5"
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[115%] object-cover will-change-transform transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    loading="lazy"
                />
            </div>
            <div ref={revealRef} className="will-change-transform">
                <div className="flex items-baseline justify-between gap-4 mb-1">
                    <h3 className="font-serif text-body font-medium group-hover:opacity-70 transition-opacity duration-500">
                        {project.title}
                    </h3>
                    <span className="text-caption shrink-0">{year}</span>
                </div>
                <p className="text-caption">{project.location}</p>
            </div>
        </Link>
    );
}
