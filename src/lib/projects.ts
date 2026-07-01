import type { ApiProject, GalleryItem } from "@/lib/api";

export function formatProjectYear(year: string): string {
    return year.substring(0, 4);
}

export function getProjectSummary(project: ApiProject): string | null {
    if (project.statement) return project.statement;

    const firstContent = project.gallery
        ?.flatMap((group) => group.items ?? [])
        .find((item) => item.content?.trim());

    if (!firstContent?.content) return null;

    return firstContent.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function getNextProject(
    projects: ApiProject[],
    currentSlug: string,
): ApiProject | null {
    const index = projects.findIndex((project) => project.slug === currentSlug);
    if (index === -1 || projects.length <= 1) return null;
    return projects[(index + 1) % projects.length];
}

export function getGalleryItems(project: ApiProject): GalleryItem[] {
    return project.gallery?.flatMap((group) => group.items ?? []) ?? [];
}

export function hasTechnicalContent(project: ApiProject): boolean {
    return Boolean(project.materials || project.sturucture || project.sustainability);
}

export const PLACEHOLDER_IMAGE =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'%3E%3Crect fill='%23E8E4DC' width='1600' height='900'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239A9590' font-family='Georgia, serif' font-size='28' letter-spacing='0.15em'%3EIMAGE%3C/text%3E%3C/svg%3E";
