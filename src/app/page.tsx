import Layout from "@/components/Layout";
import CinematicHero, { EditorialIntro } from "@/components/CinematicHero";
import PinnedFeaturedProjects from "@/components/PinnedFeaturedProjects";
import { getProjects } from "@/lib/api";

export default async function Index() {
    const allProjects = await getProjects();
    const heroProject = allProjects[0];
    const heroImage = heroProject?.image ?? null;
    const featuredProjects = allProjects.slice(1);

    return (
        <Layout overlayNav hideMainOffset>
            <CinematicHero backgroundImage={heroImage} />
            <EditorialIntro />
            <PinnedFeaturedProjects projects={featuredProjects} />
        </Layout>
    );
}