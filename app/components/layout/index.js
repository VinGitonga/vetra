import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main
                className="grid grid-cols-8 gap-4 px-16 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700"
                style={{ fontFamily: "Poppins" }}
            >
                <div className="col-span-2">
                    <Sidebar />
                </div>
                <div className="col-span-6">{children}</div>
            </main>
        </>
    );
}
