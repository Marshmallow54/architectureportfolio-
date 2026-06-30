"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";
import {
    contact,
    personalStatement,
    education,
    experience,
    technicalSkills,
    languages,
    voluntaryExperience,
    interests,
} from "@/data/cv";

function TimelineRow({
    period,
    title,
    subtitle,
    detail,
    children,
}: {
    period: string;
    title: string;
    subtitle?: string;
    detail?: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="line-rule pt-6 pb-6 first:border-t-0 first:pt-0 editorial-grid gap-y-3">
            <span className="text-caption col-span-12 md:col-span-3 lg:col-span-2">{period}</span>
            <div className="col-span-12 md:col-span-9 lg:col-span-10">
                <h3 className="text-body font-medium mb-1">{title}</h3>
                {subtitle && (
                    <p className="text-body-sm text-muted-foreground mb-2">{subtitle}</p>
                )}
                {detail && (
                    <p className="text-body-sm text-muted-foreground leading-relaxed">{detail}</p>
                )}
                {children}
            </div>
        </div>
    );
}

function SkillRow({ name, level }: { name: string; level: string }) {
    return (
        <div className="line-rule pt-4 pb-4 first:border-t-0 first:pt-0 flex items-baseline justify-between gap-4">
            <span className="text-body-sm text-muted-foreground">{name}</span>
            <span className="text-caption">{level}</span>
        </div>
    );
}

export default function AboutContent() {
    return (
        <>
            <section className="px-6 md:px-12 pt-section pb-section border-b border-border">
                <div className="max-w-6xl mx-auto editorial-grid">
                    <ScrollReveal className="col-span-12 lg:col-span-5">
                        <span className="text-caption block mb-4">About</span>
                        <h1 className="font-serif text-display mb-4">{contact.name}</h1>
                        <p className="text-subheading text-muted-foreground mb-2">{contact.title}</p>
                        <p className="text-body-sm text-muted-foreground">{contact.subtitle}</p>
                    </ScrollReveal>

                    <ScrollReveal delay={100} className="col-span-12 lg:col-span-6 lg:col-start-7">
                        <div className="space-y-5">
                            {personalStatement.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="text-body text-muted-foreground leading-relaxed"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="px-6 md:px-12 py-section border-b border-border">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal>
                        <SectionHeader label="Education" title="Academic Background" />
                    </ScrollReveal>
                    <div>
                        {education.map((item, index) => (
                            <ScrollReveal key={item.title} delay={index * 60}>
                                <TimelineRow
                                    period={item.period}
                                    title={item.title}
                                    subtitle={item.institution}
                                />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 md:px-12 py-section border-b border-border">
                <div className="max-w-6xl mx-auto editorial-grid gap-y-16">
                    <div className="col-span-12 lg:col-span-7">
                        <ScrollReveal>
                            <SectionHeader label="Experience" title="Professional Experience" />
                        </ScrollReveal>
                        {experience.map((item, index) => (
                            <ScrollReveal key={item.title} delay={index * 60}>
                                <TimelineRow
                                    period={item.period}
                                    title={item.title}
                                    subtitle={item.institution}
                                    detail={item.summary}
                                >
                                    <ul className="mt-4 space-y-2">
                                        {item.responsibilities.map((point) => (
                                            <li
                                                key={point}
                                                className="text-body-sm text-muted-foreground leading-relaxed flex gap-3"
                                            >
                                                <span className="text-muted-foreground/40 shrink-0">—</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </TimelineRow>
                            </ScrollReveal>
                        ))}

                        <ScrollReveal delay={120}>
                            <div className="mt-16">
                                <span className="text-caption block mb-8">Voluntary Experience & Outreach</span>
                                {voluntaryExperience.map((item) => (
                                    <TimelineRow
                                        key={item.title}
                                        period={item.period}
                                        title={item.title}
                                        subtitle={item.institution}
                                        detail={item.detail}
                                    />
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>

                    <aside className="col-span-12 lg:col-span-4 lg:col-start-9 space-y-16">
                        <ScrollReveal>
                            <div>
                                <span className="text-caption block mb-8">Skills</span>
                                {technicalSkills.map((skill) => (
                                    <SkillRow key={skill.name} name={skill.name} level={skill.level} />
                                ))}
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={80}>
                            <div>
                                <span className="text-caption block mb-8">Languages</span>
                                {languages.map((lang) => (
                                    <SkillRow key={lang.name} name={lang.name} level={lang.level} />
                                ))}
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={120}>
                            <div>
                                <span className="text-caption block mb-8">Interests</span>
                                {interests.map((item) => (
                                    <div
                                        key={item.title}
                                        className="line-rule pt-5 pb-5 first:border-t-0 first:pt-0"
                                    >
                                        <h3 className="text-body-sm font-medium mb-1">{item.title}</h3>
                                        <p className="text-body-sm text-muted-foreground leading-relaxed">
                                            {item.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </aside>
                </div>
            </section>

            <section className="px-6 md:px-12 py-section">
                <div className="max-w-6xl mx-auto editorial-grid items-end">
                    <ScrollReveal className="col-span-12 lg:col-span-7">
                        <span className="text-caption block mb-4">Contact</span>
                        <h2 className="font-serif text-heading mb-6">
                            Open to collaborations, internships, and architectural dialogue.
                        </h2>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-10 gap-y-3">
                            <a
                                href={`mailto:${contact.email}`}
                                className="text-body-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                                {contact.email}
                            </a>
                            <a
                                href={contact.phoneHref}
                                className="text-body-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                                {contact.phone}
                            </a>
                            <span className="text-body-sm text-muted-foreground">{contact.location}</span>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={100} className="col-span-12 lg:col-span-4 lg:col-start-9">
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-3 text-caption border border-border px-5 py-3 hover:bg-foreground hover:text-background transition-colors duration-500"
                        >
                            View Works →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
