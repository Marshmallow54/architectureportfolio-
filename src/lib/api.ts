export interface ApiProject {
    id: number;
    title: string;
    slug: string;
    year: string;
    image: string;
    location: string;
    statement: string;
    gallery: string[];
    materials: string;
    sturucture: string; // Note: Typo in the API
    sustainability: string;
    sort: string;
    created_at: string;
    updated_at: string;
}

export interface ProjectsResponse {
    type: string;
    message: string;
    content: ApiProject[];
}

const API_BASE_URL = "https://ege.gezici.co.uk";

export async function getProjects(): Promise<ApiProject[]> {
    const res = await fetch(`${API_BASE_URL}/`, {
        // Next.js page/component level caching can be adjusted here if needed, 
        // using standard fetch cache options like `{ next: { revalidate: 3600 } }`
    });

    if (!res.ok) {
        throw new Error("Failed to fetch projects");
    }

    const data: ProjectsResponse = await res.json();

    if (data.type !== "success" || !data.content) {
        throw new Error(data.message || "Invalid API response structure");
    }

    return data.content;
}

export async function getProjectBySlug(slug: string): Promise<ApiProject | null> {
    const res = await fetch(`${API_BASE_URL}/${slug}`);

    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`Failed to fetch project details for ${slug}`);
    }

    // The single item API might also be wrapped in { type, message, content: ApiProject }
    // Let's assume it returns { type: 'success', content: { ...projectData } } based on standard REST patterns,
    // or if the URL `/[SLUG]` is just an array filter. We will fetch all and filter for maximum safety 
    // since the API output for a single slug wasn't fully inspected, or we can trust the endpoint.

    // NOTE: To be absolutely safe without knowing the exact /[SLUG] response schema, 
    // we'll fetch all projects and find the matching one.
    const projects = await getProjects();
    return projects.find(p => p.slug === slug) || null;
}
