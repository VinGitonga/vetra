import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";

export default function Layout({ children }) {
    const router = useRouter();
    const wallet = useWallet();
    const { isAuthenticated } = useAuth();
    let authTest = true

    // useEffect(() => {
    //     if (wallet.connected && !isAuthenticated) {
    //         router.push("/register");
    //     }
    // }, [wallet.connected]);

    return (
        <>
            <Navbar />
            <main
                className="grid grid-cols-8 gap-4 px-16 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700"
                style={{ fontFamily: "Poppins" }}
            >
                {wallet.connected && isAuthenticated && (
                    <div className="col-span-2">
                        <Sidebar />
                    </div>
                )}
                <div
                    className={`${
                        wallet.connected && isAuthenticated
                            ? "col-span-6"
                            : "col-span-8"
                    }`}
                >
                    {children}
                </div>
            </main>
        </>
    );
}
