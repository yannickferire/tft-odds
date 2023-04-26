import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
        <main className="w-full xl:container px-5 pt-6 sm:pt-10 pb-6 sm:pb-8 flex flex-col min-h-screen">
          {children}
        </main>
      <Footer />
    </>
  );
};

export default Layout;