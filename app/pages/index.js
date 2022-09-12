import { useRouter } from "next/router";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const { connected } = useWallet();

    useEffect(() => {
        if (connected) {
            router.push("/dashboard");
        }
    }, [connected]);

    return (
        <>
            <section
                className="w-full min-h-screen bg-white dark:bg-gray-900"
                style={{ fontFamily: "Poppins" }}
            >
                <div className="container relative flex flex-col min-h-screen px-6 py-8 mx-auto">
                    <section className="flex items-center flex-1">
                        <div className="flex flex-col w-full ">
                            <h1 className="text-5xl font-extrabold text-center lg:text-7xl 2xl:text-8xl">
                                <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
                                    Vetra
                                </span>

                                <span className="text-transparent bg-gradient-to-tr bg-clip-text from-blue-500 via-pink-500 to-red-500 dark:from-sky-300 dark:via-pink-300 dark:to-red-500">
                                    Cloud
                                </span>
                            </h1>

                            <p className="max-w-3xl mx-auto mt-6 text-lg text-center text-gray-700 dark:text-white md:text-xl">
                                A decentralized cloud platform for all data
                                storage needs
                            </p>

                            <div className="flex flex-col mt-8 space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">
                                <WalletMultiButton />
                                {/* <button
                                    onClick={() => router.push("/dashboard")}
                                    className="px-8 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none sm:mx-2"
                                >
                                    Connect Wallet
                                </button> */}
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
}
