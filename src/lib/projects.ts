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

export type GallerySectionKey = "concept" | "process" | "outcome" | "gallery";

export interface GroupedGallerySection {
    key: GallerySectionKey;
    label: string;
    items: GalleryItem[];
}

const SECTION_MATCHERS: { key: GallerySectionKey; label: string; keywords: string[] }[] = [
    {
        key: "concept",
        label: "Concept",
        keywords: ["research", "site plan", "context", "analysis"],
    },
    {
        key: "process",
        label: "Process",
        keywords: [
            "design development",
            "plan drawing",
            "axonometric",
            "sketch",
            "model",
            "development",
            "section",
            "elevation",
        ],
    },
    {
        key: "outcome",
        label: "Outcome",
        keywords: ["final", "render", "proposed", "outcome"],
    },
];

function classifyGalleryItem(name: string): GallerySectionKey {
    const normalized = name.toLowerCase().trim();

    for (const section of SECTION_MATCHERS) {
        if (section.keywords.some((keyword) => normalized.includes(keyword))) {
            return section.key;
        }
    }

    return "gallery";
}

export function groupGalleryItems(project: ApiProject): GroupedGallerySection[] {
    const items = project.gallery?.flatMap((group) => group.items ?? []) ?? [];
    const buckets: Record<GallerySectionKey, GalleryItem[]> = {
        concept: [],
        process: [],
        outcome: [],
        gallery: [],
    };

    for (const item of items) {
        buckets[classifyGalleryItem(item.name || "")].push(item);
    }

    const ordered: GroupedGallerySection[] = SECTION_MATCHERS.map(({ key, label }) => ({
        key,
        label,
        items: buckets[key],
    }));

    if (buckets.gallery.length > 0) {
        ordered.push({ key: "gallery", label: "Gallery", items: buckets.gallery });
    }

    return ordered.filter((section) => section.items.length > 0);
}

export function hasTechnicalContent(project: ApiProject): boolean {
    return Boolean(project.materials || project.sturucture || project.sustainability);
}

export const PLACEHOLDER_IMAGE =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'%3E%3Crect fill='%23E8E4DC' width='1600' height='900'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239A9590' font-family='Georgia, serif' font-size='28' letter-spacing='0.15em'%3EIMAGE%3C/text%3E%3C/svg%3E";
