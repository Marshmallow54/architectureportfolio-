import Navigation from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-14">{children}</main>
      <footer className="border-t border-border px-6 md:px-12 py-6 mt-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <span className="text-caption">© 2025</span>
          <span className="text-caption">Architecture Portfolio</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
