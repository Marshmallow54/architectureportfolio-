import type { GalleryItem } from "@/lib/api";
import ScrollReveal from "./ScrollReveal";

interface ProjectGalleryProps {
    items: GalleryItem[];
}

export default function ProjectGallery({ items }: ProjectGalleryProps) {
    return (
        <div className="space-y-16 md:space-y-20">
            {items.map((item, index) => (
                <ScrollReveal key={item._id} delay={index * 50}>
                    <article className="border-t border-border pt-10 first:border-t-0 first:pt-0">
                        {item.name?.trim() && (
                            <h3 className="font-serif text-subheading mb-4">{item.name}</h3>
                        )}
                        <div className="image-frame aspect-[16/10] overflow-hidden bg-stone mb-6 md:mb-8">
                            <img
                                src={item.image}
                                alt={item.name || "Project image"}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
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
    );
}
