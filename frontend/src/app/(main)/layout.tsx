import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
