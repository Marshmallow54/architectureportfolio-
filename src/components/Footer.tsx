import Link from "next/link";
import { contact } from "@/data/cv";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-stone/40">
            <div className="px-6 md:px-12 py-section">
                <div className="editorial-grid max-w-6xl mx-auto gap-y-12">
                    <div className="col-span-12 lg:col-span-6">
                        <span className="text-caption block mb-4">Contact</span>
                        <h2 className="font-serif text-heading mb-6 max-w-md">
                            Let&apos;s discuss architecture, collaboration, or opportunities.
                        </h2>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3">
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
                            <span className="text-body-sm text-muted-foreground">
                                {contact.location}
                            </span>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-3 lg:col-start-8">
                        <span className="text-caption block mb-4">Navigation</span>
                        <ul className="space-y-3">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/portfolio", label: "Works" },
                                { href: "/about", label: "About" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-body-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-12 lg:col-span-3">
                        <span className="text-caption block mb-4">Studio</span>
                        <p className="text-body-sm text-muted-foreground leading-relaxed">
                            {contact.name}
                            <br />
                            {contact.subtitle}
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-3">
                    <span className="text-caption">© {new Date().getFullYear()} {contact.name}</span>
                    <span className="text-caption">Architecture Portfolio</span>
                </div>
            </div>
        </footer>
    );
}
