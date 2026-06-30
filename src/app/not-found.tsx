import Link from "next/link";
import Layout from "@/components/Layout";

export default function NotFound() {
    return (
        <Layout>
            <section className="px-6 md:px-12 py-section min-h-[60vh] flex items-center">
                <div className="max-w-xl">
                    <span className="text-caption block mb-4">404</span>
                    <h1 className="font-serif text-heading mb-4">Page not found</h1>
                    <p className="text-body text-muted-foreground mb-8">
                        The page you are looking for does not exist or may have been moved.
                    </p>
                    <Link
                        href="/"
                        className="text-caption border border-border px-5 py-3 inline-block hover:bg-foreground hover:text-background transition-colors duration-500"
                    >
                        Return Home
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
