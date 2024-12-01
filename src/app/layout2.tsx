// Second layout component
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Loader from "src/components/Loader";

export default function Layout2({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  return (
    <>
      {loading ? <Loader /> : null}
      <Header />
      <div className="container mx-auto my-4 p-4 bg-white shadow-md rounded-lg min-h-screen flex flex-col gap-4">
        {children}
      </div>
      <Footer />
    </>
  );
}
