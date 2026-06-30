import Link from "next/link";
import type { ApiProject } from "@/lib/api";
import { formatProjectYear } from "@/lib/projects";
import ScrollReveal from "./ScrollReveal";

interface NextProjectLinkProps {
    project: ApiProject;
}

export default function NextProjectLink({ project }: NextProjectLinkProps) {
    return (
        <ScrollReveal>
            <section className="mt-section pt-section border-t border-border">
                <span className="text-caption block mb-8">Next Project</span>
                <Link href={`/portfolio/${project.slug}`} className="group block">
                    <div className="editorial-grid items-end gap-y-8">
                        <div className="col-span-12 md:col-span-5">
                            <h3 className="font-serif text-heading mb-3 group-hover:opacity-70 transition-opacity duration-500">
                                {project.title}
                            </h3>
                            <p className="text-caption mb-4">
                                {project.location} · {formatProjectYear(project.year)}
                            </p>
                            <span className="text-caption inline-block group-hover:translate-x-1 transition-transform duration-500">
                                Continue →
                            </span>
                        </div>
                        <div className="col-span-12 md:col-span-7">
                            <div className="image-frame aspect-[16/10] overflow-hidden bg-stone">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </Link>
            </section>
        </ScrollReveal>
    );
}
