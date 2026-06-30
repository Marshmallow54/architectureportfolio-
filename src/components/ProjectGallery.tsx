import type { GroupedGallerySection } from "@/lib/projects";
import ScrollReveal from "./ScrollReveal";

interface ProjectGalleryProps {
    sections: GroupedGallerySection[];
}

export default function ProjectGallery({ sections }: ProjectGalleryProps) {
    return (
        <div className="space-y-section">
            {sections.map((section, sectionIndex) => (
                <section key={section.key}>
                    <ScrollReveal delay={sectionIndex * 60}>
                        <span className="text-caption block mb-8">{section.label}</span>
                    </ScrollReveal>

                    <div className="space-y-16 md:space-y-20">
                        {section.items.map((item, itemIndex) => (
                            <ScrollReveal
                                key={item._id}
                                delay={(sectionIndex + itemIndex) * 50}
                            >
                                <article className="border-t border-border pt-10 first:border-t-0 first:pt-0">
                                    <div className="image-frame aspect-[16/10] overflow-hidden bg-stone mb-6 md:mb-8">
                                        <img
                                            src={item.image}
                                            alt={item.name || "Project image"}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    {item.name?.trim() && (
                                        <h3 className="font-serif text-subheading mb-4">
                                            {item.name}
                                        </h3>
                                    )}
                                    {item.content?.trim() && (
                                        <div
                                            className="text-body-sm text-muted-foreground leading-relaxed max-w-3xl prose-editorial"
                                            dangerouslySetInnerHTML={{ __html: item.content }}
                                        />
                                    )}
                                </article>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
