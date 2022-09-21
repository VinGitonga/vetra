import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import useAuth from "../../hooks/useAuth";
import ShareFile from "../dialogs/ShareFile";
import {useEffect} from "react"
import { useRouter } from "next/router"
import {useWallet} from "@solana/wallet-adapter-react"

export default function Layout({ children }) {
    const wallet = useWallet()
    const router = useRouter()
    const { hasAccount } = useAuth();

    useEffect(() => {
        if (!hasAccount){
            router.push('/')
        }
    }, [hasAccount])

    return (
        <div className="bg-white">
            <ShareFile />
            <Navbar />
            <main
                className="grid grid-cols-8 gap-4 px-16 py-8 border-r dark:bg-gray-900 dark:border-gray-700"
                style={{ fontFamily: "Poppins" }}
            >
                {hasAccount && (
                    <div className="col-span-2">
                        <Sidebar />
                    </div>
                )}
                <div
                    className={`${
                        hasAccount ? "col-span-6" : "col-span-8"
                    }`}
                >
                    {children}
                </div>
            </main>
        </div>
    );
}
