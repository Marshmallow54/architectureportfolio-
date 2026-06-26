import Layout from "@/components/Layout";

const contact = {
    name: "Osman Egehan Gezici",
    title: "Architecture Student · BA (Hons) Kingston University",
    location: "Flat 4, Lordship Lane, Wood Green, London",
    phone: "07404 754578",
    phoneHref: "tel:+447404754578",
    email: "egehangezici54@gmail.com",
};

const personalStatement = [
    "I am an architecture student at Kingston University with a deep interest in context-driven, socially responsive design and the influence of buildings on everyday life. I approach architecture as a disciplined investigation into place, material, and spatial order — combining site analysis, model making, and digital tools to develop considered, people-oriented solutions.",
    "My work is driven by rigorous research and clear spatial thinking, with particular focus on adaptive reuse, low-carbon construction, and the relationship between architectural form and structural logic. I am drawn to projects at the intersection of architecture and landscape, exploring how built interventions mediate between human inhabitation and ecological systems.",
    "Through experience in hospitality and teamwork-focused roles, I have developed strong communication, leadership, and organisational skills. I am committed to becoming a well-rounded designer who balances creative ambition, technical expertise, and societal impact — working toward RIBA Part 2 and contributing to a research-led practice in London.",
];

const education = [
    {
        period: "2024 — 2027",
        title: "BA (Hons) Architecture",
        institution: "Kingston University",
    },
    {
        period: "2022 — 2024",
        title: "UAL Level 3 Applied General Extended Diploma in Art and Design",
        institution: "Westminster Kingsway College",
    },
    {
        period: "2020 — 2022",
        title: "Secondary Education",
        institution: "Woodside High School",
    },
];

const experience = [
    {
        period: "2024 — Present",
        title: "Bartender",
        institution: "Capeesh Restaurant",
        summary:
            "Delivering high-quality customer service in a fast-paced hospitality environment while strengthening transferable skills relevant to collaborative design practice.",
        responsibilities: [
            "Preparing and serving drinks with precision and consistency.",
            "Communicating clearly with customers and staff to maintain smooth service.",
            "Managing multiple tasks under pressure while maintaining attention to detail.",
            "Ensuring the bar area remained organised, clean, and efficient.",
            "Supporting the team during peak hours and resolving customer requests effectively.",
            "Developing time-management, problem-solving, communication, teamwork, and leadership skills.",
        ],
    },
];

const technicalSkills = [
    { name: "Adobe Illustrator", level: "Skilled" },
    { name: "Adobe Photoshop", level: "Skilled" },
    { name: "AutoCAD", level: "Skilled" },
    { name: "SketchUp", level: "Intermediate" },
    { name: "Rhino 3D", level: "Basic" },
    { name: "Vectorworks", level: "Skilled" },
    { name: "V-Ray / Enscape", level: "Skilled" },
    { name: "Technical Drawing", level: "Skilled" },
    { name: "Site Analysis", level: "Skilled" },
    { name: "Physical Model Making", level: "Skilled" },
];

const languages = [
    { name: "Turkish", level: "Native" },
    { name: "English", level: "Fluent" },
];

const voluntaryExperience = [
    {
        period: "Oct 2023 — Apr 2024",
        title: "Open City Accelerate Programme for Architecture",
        detail: "Masterclass and subject insight programme exploring architectural practice, design thinking, and pathways into the profession.",
    },
    {
        period: "Nov 2023 — Feb 2024",
        title: "UAL Insights Autumn–Winter School",
        institution: "Central Saint Martins",
        detail: "Architecture and Product Design masterclass and subject insight sessions.",
    },
];

const interests = [
    {
        title: "Judo",
        detail: "Seven years of practice — developing discipline, focus, and resilience.",
    },
    {
        title: "Architectural Sketching & Model Making",
        detail: "Exploring form, materials, and spatial ideas.",
    },
    {
        title: "Site Photography & Urban Observation",
        detail: "Documenting architecture and understanding context.",
    },
    {
        title: "Digital Design & Creative Software",
        detail: "Experimenting with visual communication and 3D modelling.",
    },
];

function CvSection({
    title,
    children,
    delay = "0s",
}: {
    title: string;
    children: React.ReactNode;
    delay?: string;
}) {
    return (
        <section className="animate-fade-in" style={{ animationDelay: delay }}>
            <span className="text-caption block mb-6">{title}</span>
            {children}
        </section>
    );
}

function SkillLevel({ level }: { level: string }) {
    return (
        <span className="text-caption text-muted-foreground/80 shrink-0">{level}</span>
    );
}

export default function About() {
    return (
        <Layout>
            <section className="px-6 md:px-12 pt-section pb-section">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <header className="mb-16 md:mb-20 animate-fade-in">
                        <p className="text-caption mb-4">Curriculum Vitae</p>
                        <h1 className="text-heading mb-3">{contact.name}</h1>
                        <p className="text-subheading text-muted-foreground mb-8">
                            {contact.title}
                        </p>

                        <div className="line-rule pt-6 flex flex-col sm:flex-row sm:flex-wrap gap-x-10 gap-y-3">
                            <a
                                href={`mailto:${contact.email}`}
                                className="text-body-sm text-muted-foreground hover-lift"
                            >
                                {contact.email}
                            </a>
                            <a
                                href={contact.phoneHref}
                                className="text-body-sm text-muted-foreground hover-lift"
                            >
                                {contact.phone}
                            </a>
                            <span className="text-body-sm text-muted-foreground">
                                {contact.location}
                            </span>
                        </div>
                    </header>

                    {/* Personal Statement */}
                    <CvSection title="Personal Statement" delay="0.1s">
                        <div className="space-y-4 mb-16 md:mb-20">
                            {personalStatement.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="text-body-sm text-muted-foreground leading-relaxed"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </CvSection>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
                        {/* Main column */}
                        <div className="lg:col-span-7 space-y-16 md:space-y-20">
                            {/* Education */}
                            <CvSection title="Education" delay="0.15s">
                                <div className="space-y-0">
                                    {education.map((item, index) => (
                                        <div
                                            key={item.title}
                                            className={`line-rule pt-5 pb-5 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8 ${
                                                index === 0 ? "border-t-0 pt-0" : ""
                                            }`}
                                        >
                                            <span className="text-caption shrink-0 md:w-28">
                                                {item.period}
                                            </span>
                                            <div>
                                                <span className="text-body-sm font-medium block">
                                                    {item.title}
                                                </span>
                                                <span className="text-body-sm text-muted-foreground">
                                                    {item.institution}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CvSection>

                            {/* Experience */}
                            <CvSection title="Professional Experience" delay="0.2s">
                                <div className="space-y-10">
                                    {experience.map((item) => (
                                        <div key={item.title} className="line-rule pt-5">
                                            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8 mb-3">
                                                <span className="text-caption shrink-0 md:w-28">
                                                    {item.period}
                                                </span>
                                                <div>
                                                    <span className="text-body-sm font-medium block">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-body-sm text-muted-foreground">
                                                        {item.institution}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-body-sm text-muted-foreground leading-relaxed mb-4 md:ml-[calc(7rem+2rem)]">
                                                {item.summary}
                                            </p>
                                            <ul className="space-y-2 md:ml-[calc(7rem+2rem)]">
                                                {item.responsibilities.map((point) => (
                                                    <li
                                                        key={point}
                                                        className="text-body-sm text-muted-foreground leading-relaxed flex gap-3"
                                                    >
                                                        <span className="text-muted-foreground/50 shrink-0">
                                                            —
                                                        </span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </CvSection>

                            {/* Voluntary & Outreach */}
                            <CvSection title="Voluntary Experience & Outreach" delay="0.25s">
                                <div className="space-y-0">
                                    {voluntaryExperience.map((item, index) => (
                                        <div
                                            key={item.title}
                                            className={`line-rule pt-5 pb-5 flex flex-col md:flex-row md:items-start gap-1 md:gap-8 ${
                                                index === 0 ? "border-t-0 pt-0" : ""
                                            }`}
                                        >
                                            <span className="text-caption shrink-0 md:w-28">
                                                {item.period}
                                            </span>
                                            <div>
                                                <span className="text-body-sm font-medium block">
                                                    {item.title}
                                                </span>
                                                {item.institution && (
                                                    <span className="text-body-sm text-muted-foreground block mb-1">
                                                        {item.institution}
                                                    </span>
                                                )}
                                                <span className="text-body-sm text-muted-foreground leading-relaxed">
                                                    {item.detail}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CvSection>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-5 space-y-16 md:space-y-20">
                            {/* Technical Skills */}
                            <CvSection title="Technical & Design Skills" delay="0.15s">
                                <div className="space-y-0">
                                    {technicalSkills.map((skill, index) => (
                                        <div
                                            key={skill.name}
                                            className={`line-rule pt-4 pb-4 flex items-baseline justify-between gap-4 ${
                                                index === 0 ? "border-t-0 pt-0" : ""
                                            }`}
                                        >
                                            <span className="text-body-sm text-muted-foreground">
                                                {skill.name}
                                            </span>
                                            <SkillLevel level={skill.level} />
                                        </div>
                                    ))}
                                </div>
                            </CvSection>

                            {/* Languages */}
                            <CvSection title="Languages" delay="0.2s">
                                <div className="space-y-0">
                                    {languages.map((lang, index) => (
                                        <div
                                            key={lang.name}
                                            className={`line-rule pt-4 pb-4 flex items-baseline justify-between gap-4 ${
                                                index === 0 ? "border-t-0 pt-0" : ""
                                            }`}
                                        >
                                            <span className="text-body-sm text-muted-foreground">
                                                {lang.name}
                                            </span>
                                            <SkillLevel level={lang.level} />
                                        </div>
                                    ))}
                                </div>
                            </CvSection>

                            {/* Interests */}
                            <CvSection title="Interests" delay="0.25s">
                                <div className="space-y-0">
                                    {interests.map((item, index) => (
                                        <div
                                            key={item.title}
                                            className={`line-rule pt-5 pb-5 ${
                                                index === 0 ? "border-t-0 pt-0" : ""
                                            }`}
                                        >
                                            <span className="text-body-sm font-medium block mb-1">
                                                {item.title}
                                            </span>
                                            <span className="text-body-sm text-muted-foreground leading-relaxed">
                                                {item.detail}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CvSection>
                        </aside>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
