import Link from "next/link";
import Layout from "@/components/Layout";
import { getProjects } from "@/lib/api";

export default async function Index() {
    const allProjects = await getProjects();
    const previewProjects = allProjects.slice(0, 3);

    return (
        <Layout>
            {/* Hero */}
            <section className="px-6 md:px-12 pt-section pb-16 md:pb-24">
                <div className="max-w-4xl">
                    <h1 className="text-display mb-6 animate-fade-in">
                        Osman Egehan Gezici
                    </h1>
                    <p className="text-subheading text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                        Architecture Student · Spatial Designer · Research-led Practice
                    </p>
                    <p className="text-body-3xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        I approach architecture as a disciplined investigation into place, material, and spatial order. Each project begins with close observation of context, structure, and environmental conditions and develops through drawing, modelling, and critical refinement. I am interested in buildings that do not compete for attention, but instead reveal their logic through clarity, proportion, and restraint.
                    </p>
                </div>
            </section>

            {/* Selected Works Preview */}
            <section className="px-6 md:px-12 pb-section">
                <div className="flex items-baseline justify-between mb-8">
                    <span className="text-caption">My Top 3 Works</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-grid">
                    {previewProjects.map((project, index) => (
                        <Link
                            key={project.slug}
                            href={`/portfolio/${project.slug}`}
                            className="group block animate-fade-in"
                            style={{ animationDelay: `${0.1 * index}s` }}
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
                            </div>
                            <p className="text-caption">{project.location} — {project.year.substring(0, 4)}</p>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    <Link
                        href="/portfolio"
                        className="text-body-sm font-medium hover-lift inline-block"
                    >
                        See All Projects →
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
