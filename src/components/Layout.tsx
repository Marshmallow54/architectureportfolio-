import Navigation from "./Navigation";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

interface LayoutProps {
    children: React.ReactNode;
    overlayNav?: boolean;
    hideMainOffset?: boolean;
}

export default function Layout({
    children,
    overlayNav = false,
    hideMainOffset = false,
}: LayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <Navigation overlay={overlayNav} />
            <main className={hideMainOffset ? "" : "pt-16 md:pt-[4.5rem]"}>
                <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
        </div>
    );
}
