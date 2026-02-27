import Link from "next/link";
import Layout from "@/components/Layout";
import { getProjects } from "@/lib/api";

export default async function Portfolio() {
    const projects = await getProjects();

    return (
        <Layout>
            <section className="px-6 md:px-12 pt-section pb-section">
                <h1 className="text-heading mb-12 animate-fade-in">Portfolio</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-grid gap-y-16">
                    {projects.map((project, i) => (
                        <Link
                            key={project.slug}
                            href={`/portfolio/${project.slug}`}
                            className="group block animate-fade-in"
                            style={{ animationDelay: `${0.08 * i}s` }}
                        >
                            <div className="aspect-[4/3] overflow-hidden mb-4 bg-secondary">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-80"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex items-baseline justify-between gap-4 mb-1">
                                <h3 className="text-body-sm font-medium">{project.title}</h3>
                                <span className="text-caption shrink-0">{project.year.substring(0, 4)}</span>
                            </div>
                            <div className="flex items-baseline justify-between gap-4 mb-3">
                                <span className="text-caption">{project.location}</span>
                            </div>
                            <p className="text-body-sm text-muted-foreground line-clamp-3">{project.statement}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </Layout>
    );
}
