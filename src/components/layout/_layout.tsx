import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="w-full xl:max-w-screen-lg mx-auto px-4 pt-6 sm:pt-10 pb-6 sm:pb-8 flex flex-col min-h-screen relative z-10">
        <Header />
          {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;