import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import PortfolioHeader from "@/components/PortfolioHeader";
import { getProjects } from "@/lib/api";
import { getProjectSummary } from "@/lib/projects";

export default async function Portfolio() {
    const projects = await getProjects();

    return (
        <Layout>
            <section className="px-6 md:px-12 pt-section pb-section">
                <div className="max-w-6xl mx-auto">
                    <PortfolioHeader
                        label="Portfolio"
                        title="Works"
                        description="Architectural projects spanning adaptive reuse, housing, collage studies, and coastal landscape analysis."
                    />

                    <div>
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.slug}
                                project={project}
                                index={index}
                                variant="list"
                                statement={getProjectSummary(project)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
