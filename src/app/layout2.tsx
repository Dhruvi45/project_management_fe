// Second layout component
import Footer from "src/components/Footer";
import Header from "src/components/Header";


export default function Layout2({ children }: { children: React.ReactNode }) {

    return (
        <>
            <Header />
            <div className="container mx-auto my-4 p-4 bg-white shadow-md rounded-lg min-h-screen flex flex-col gap-4">
                {children}
            </div>
            <Footer />
        </>
    );
}
