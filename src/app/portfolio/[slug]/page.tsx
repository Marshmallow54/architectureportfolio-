import Link from "next/link";
import Layout from "@/components/Layout";
import { getProjectBySlug, getProjects } from "@/lib/api";
import { notFound } from "next/navigation";

// Next.js App Router uses `params` prop for dynamic routes
export default async function ProjectDetail({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const resolvedParams = await params;
    const project = await getProjectBySlug(resolvedParams.slug);

    if (!project) {
        notFound();
    }

    return (
        <Layout>
            {/* Hero image */}
            <div className="w-full aspect-[16/7] bg-secondary overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <article className="px-6 md:px-12 pt-12 pb-section max-w-5xl">
                {/* Header */}
                <div className="mb-12 animate-fade-in">
                    <h1 className="text-heading mb-4">{project.title}</h1>
                    <div className="flex flex-wrap gap-x-8 gap-y-1 text-caption mb-8">
                        <span>{project.year.substring(0, 4)}</span>
                        <span>{project.location}</span>
                    </div>
                    <div className="line-rule pt-8">
                        <p className="text-body-sm text-muted-foreground max-w-2xl leading-relaxed whitespace-pre-wrap">
                            {project.statement}
                        </p>
                    </div>
                </div>

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.15s" }}>
                        <span className="text-caption block mb-6">Project Gallery</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-grid">
                            {project.gallery.map((img, i) => (
                                <div key={i} className="aspect-[4/3] bg-secondary overflow-hidden">
                                    <img
                                        src={img}
                                        alt={`${project.title} — ${i + 1}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Technical */}
                <section className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
                    <span className="text-caption block mb-6">Technical Thinking</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-grid">
                        <div className="line-rule pt-4">
                            <h4 className="text-caption mb-3">Materials</h4>
                            <p className="text-body-sm text-muted-foreground">
                                {project.materials}
                            </p>
                        </div>
                        <div className="line-rule pt-4">
                            <h4 className="text-caption mb-3">Structure</h4>
                            <p className="text-body-sm text-muted-foreground">
                                {project.sturucture}
                            </p>
                        </div>
                        <div className="line-rule pt-4">
                            <h4 className="text-caption mb-3">Sustainability</h4>
                            <p className="text-body-sm text-muted-foreground whitespace-pre-wrap">
                                {project.sustainability}
                            </p>
                        </div>
                    </div>
                </section>

                <div className="mt-16">
                    <Link href="/portfolio" className="text-body-sm text-muted-foreground hover-lift">
                        ← All Projects
                    </Link>
                </div>
            </article>
        </Layout>
    );
}

// Ensure static generation for all known projects
export async function generateStaticParams() {
    try {
        const projects = await getProjects();
        return projects.map((project) => ({
            slug: project.slug,
        }));
    } catch (e) {
        // Fallback for build time if API fails during generation
        return [];
    }
}
