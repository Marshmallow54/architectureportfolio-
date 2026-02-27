import Layout from "@/components/Layout";

const skills = [
    "Rhino 3D + Grasshopper",
    "Vectorworks",
    "V-Ray / Enscape",
    "Adobe Creative Suite",
    "AutoCAD",
    "Technical Drawing",
    "Site Analysis",
    "Physical Model Making",
];

const education = [
    { period: "2022 — Present", title: "BA (Hons) Architecture", institution: "University of [Your University]" },
    { period: "2020 — 2022", title: "Foundation Diploma", institution: "Art & Design, [Institution]" },
];

const experience = [
    { period: "Summer 2024", title: "Architectural Assistant", institution: "[Practice Name], London" },
    { period: "Summer 2023", title: "Design Intern", institution: "[Studio Name], Bristol" },
];

export default function About() {
    return (
        <Layout>
            <section className="px-6 md:px-12 pt-section pb-section max-w-4xl">
                <h1 className="text-heading mb-12 animate-fade-in">About</h1>

                {/* Bio */}
                <div className="mb-16 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <p className="text-body-sm text-muted-foreground leading-relaxed mb-4">
                        I am an architecture student based in the United Kingdom with a focus
                        on the material, tectonic, and environmental dimensions of architectural
                        design. My work is driven by a commitment to rigorous research, clear
                        spatial thinking, and an honest expression of construction.
                    </p>
                    <p className="text-body-sm text-muted-foreground leading-relaxed mb-4">
                        My research interests centre on adaptive reuse, low-carbon construction,
                        and the relationship between architectural form and structural logic.
                        I am particularly drawn to projects that operate at the intersection of
                        architecture and landscape, exploring how built interventions can mediate
                        between human inhabitation and ecological systems.
                    </p>
                    <p className="text-body-sm text-muted-foreground leading-relaxed">
                        My long-term ambition is to contribute to a practice that takes seriously
                        the social and environmental responsibilities of architecture — producing
                        work that is technically excellent, contextually sensitive, and spatially
                        generous. I am working toward RIBA Part 2 and aspire to join a
                        research-led practice in London.
                    </p>
                </div>

                {/* Skills */}
                <div className="mb-16 animate-fade-in" style={{ animationDelay: "0.15s" }}>
                    <span className="text-caption block mb-6">Core Skills</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-grid gap-y-3">
                        {skills.map((skill) => (
                            <span key={skill} className="text-body-sm text-muted-foreground">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div className="mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <span className="text-caption block mb-6">Education</span>
                    <div className="space-y-4">
                        {education.map((item) => (
                            <div key={item.title} className="line-rule pt-4 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8">
                                <span className="text-caption shrink-0 w-32">{item.period}</span>
                                <div>
                                    <span className="text-body-sm font-medium block">{item.title}</span>
                                    <span className="text-body-sm text-muted-foreground">{item.institution}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience */}
                <div className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
                    <span className="text-caption block mb-6">Experience</span>
                    <div className="space-y-4">
                        {experience.map((item) => (
                            <div key={item.title} className="line-rule pt-4 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8">
                                <span className="text-caption shrink-0 w-32">{item.period}</span>
                                <div>
                                    <span className="text-body-sm font-medium block">{item.title}</span>
                                    <span className="text-body-sm text-muted-foreground">{item.institution}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
