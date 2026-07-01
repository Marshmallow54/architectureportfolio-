import Link from "next/link";
import Layout from "@/components/Layout";
import ProjectGallery from "@/components/ProjectGallery";
import NextProjectLink from "@/components/NextProjectLink";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFrameSequence from "@/components/ScrollFrameSequence";
import { getProjectBySlug, getProjects } from "@/lib/api";
import { getFrameSequenceForSlug } from "@/lib/frame-sequence";
import {
    formatProjectYear,
    getNextProject,
    getProjectSummary,
    getGalleryItems,
    hasTechnicalContent,
} from "@/lib/projects";
import { notFound } from "next/navigation";
export default async function ProjectDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;
    const [project, allProjects] = await Promise.all([
        getProjectBySlug(resolvedParams.slug),
        getProjects(),
    ]);

    if (!project) {
        notFound();
    }

    const summary = getProjectSummary(project);
    const galleryItems = getGalleryItems(project);
    const nextProject = getNextProject(allProjects, project.slug);
    const year = formatProjectYear(project.year);
    const frameSequence = getFrameSequenceForSlug(project.slug);
    const hasFrameSequence = frameSequence !== null;

    return (
        <Layout overlayNav={hasFrameSequence} hideMainOffset={hasFrameSequence}>
            {frameSequence ? (
                <ScrollFrameSequence
                    frames={frameSequence.frames}
                    label={`${project.title} — Process Sequence`}
                    scrollHeightVh={frameSequence.scrollHeightVh}
                />
            ) : (
                <div className="relative w-full min-h-[55vh] md:min-h-[70vh] bg-stone overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full min-h-[55vh] md:min-h-[70vh] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                </div>
            )}
            <article className="px-6 md:px-12 py-section">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal>
                        <div className="editorial-grid mb-16 md:mb-20">
                            <div className="col-span-12 lg:col-span-8">
                                <span className="text-caption block mb-4">Project</span>
                                <h1 className="font-serif text-display mb-6">{project.title}</h1>
                            </div>
                            <div className="col-span-12 lg:col-span-4 lg:text-right flex flex-col lg:items-end gap-3 pt-2">
                                <span className="text-caption">{year}</span>
                                <span className="text-caption">{project.location}</span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {summary && (
                        <ScrollReveal delay={80}>
                            <section className="mb-section pb-section border-b border-border">
                                <span className="text-caption block mb-6">Summary</span>
                                <p className="text-body-lg text-muted-foreground leading-relaxed max-w-3xl whitespace-pre-wrap">
                                    {summary}
                                </p>
                            </section>
                        </ScrollReveal>
                    )}

                    {galleryItems.length > 0 && (
                        <section className="mb-section">
                            <ProjectGallery items={galleryItems} />
                        </section>
                    )}

                    {project.pdfFile && (
                        <ScrollReveal>
                            <section className="mb-section pb-section border-b border-border">
                                <span className="text-caption block mb-6">Document</span>
                                <div
                                    className="w-full border border-border overflow-hidden bg-stone"
                                    style={{ height: "min(800px, 80vh)" }}
                                >
                                    <iframe
                                        src={project.pdfFile}
                                        className="w-full h-full"
                                        title={`${project.title} — PDF Document`}
                                    />
                                </div>
                            </section>
                        </ScrollReveal>
                    )}

                    {hasTechnicalContent(project) && (
                        <ScrollReveal>
                            <section className="mb-section pb-section border-b border-border">
                                <span className="text-caption block mb-8">Technical Thinking</span>
                                <div className="editorial-grid gap-y-10">
                                    {project.materials && (
                                        <div className="col-span-12 md:col-span-4 line-rule pt-6 md:pt-0 md:border-t-0">
                                            <h4 className="text-caption mb-4">Materials</h4>
                                            <p className="text-body-sm text-muted-foreground leading-relaxed">
                                                {project.materials}
                                            </p>
                                        </div>
                                    )}
                                    {project.sturucture && (
                                        <div className="col-span-12 md:col-span-4 line-rule pt-6 md:pt-0 md:border-t-0">
                                            <h4 className="text-caption mb-4">Structure</h4>
                                            <p className="text-body-sm text-muted-foreground leading-relaxed">
                                                {project.sturucture}
                                            </p>
                                        </div>
                                    )}
                                    {project.sustainability && (
                                        <div className="col-span-12 md:col-span-4 line-rule pt-6 md:pt-0 md:border-t-0">
                                            <h4 className="text-caption mb-4">Sustainability</h4>
                                            <p className="text-body-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                                {project.sustainability}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </ScrollReveal>
                    )}

                    {nextProject && <NextProjectLink project={nextProject} />}

                    <div className="mt-12">
                        <Link
                            href="/portfolio"
                            className="text-caption hover:opacity-70 transition-opacity duration-300"
                        >
                            ← All Works
                        </Link>
                    </div>
                </div>
            </article>
        </Layout>
    );
}

export async function generateStaticParams() {
    try {
        const projects = await getProjects();
        return projects.map((project) => ({
            slug: project.slug,
        }));
    } catch {
        return [];
    }
}
