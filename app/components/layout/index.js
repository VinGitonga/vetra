import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import useAuth from "../../hooks/useAuth";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Layout({ children }) {
    const { connected } = useWallet();
    const { hasAccount } = useAuth();

    return (
        <>
            <Navbar />
            <main
                className="grid grid-cols-8 gap-4 px-16 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700"
                style={{ fontFamily: "Poppins" }}
            >
                {connected && hasAccount && (
                    <div className="col-span-2">
                        <Sidebar />
                    </div>
                )}
                <div
                    className={`${
                        connected && hasAccount ? "col-span-6" : "col-span-8"
                    }`}
                >
                    {children}
                </div>
            </main>
        </>
    );
}
