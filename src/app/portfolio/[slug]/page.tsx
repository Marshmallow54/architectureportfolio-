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

    const galleryItems = project.gallery?.flatMap((group) => group.items ?? []) ?? [];

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
                {galleryItems.length > 0 && (
                    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.15s" }}>
                        <span className="text-caption block mb-6">Project Gallery</span>
                        <div className="flex flex-col gap-16">
                            {galleryItems.map((item) => (
                                <article key={item._id} className="line-rule pt-8 first:pt-0 first:border-t-0">
                                    <div className="aspect-[16/10] bg-secondary overflow-hidden mb-6">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="text-subheading mb-4">{item.name}</h3>
                                    {item.content && (
                                        <div
                                            className="text-body-sm text-muted-foreground leading-relaxed max-w-2xl [&_p]:mb-4 [&_p:last-child]:mb-0"
                                            dangerouslySetInnerHTML={{ __html: item.content }}
                                        />
                                    )}
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* Embedded PDF */}
                {project.pdfFile && (
                    <section className="mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        <span className="text-caption block mb-6">PDF Document</span>
                        <div className="w-full border border-border rounded-sm overflow-hidden bg-secondary" style={{ height: "800px" }}>
                            <iframe
                                src={project.pdfFile}
                                className="w-full h-full"
                                title={`${project.title} — PDF Document`}
                            />
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
