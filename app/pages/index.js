import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head"
import useAuth from "../hooks/useAuth"
import Button from "../components/common/PrimaryButton"

export default function Home() {
    const { hasAccount } = useAuth()
    const router = useRouter();

    useEffect(() => {
        if (hasAccount) {
            router.push("/dashboard");
        }
    }, [hasAccount]);

    return (
        <>
        <Head>
            <title>Home | Vetra</title>
        </Head>
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
                                A decentralized storage service platform for all
                                data storage needs. Built on Solana Blockchain,
                                Moralis and Web3.Storage.
                            </p>

                            <div className="flex flex-col mt-8 space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0 space-x-4">
                                <WalletMultiButton style={{ backgroundColor: "#512da8" }} />
                                {!hasAccount && <Button text={"Create an Account"} onClick={() => router.push('/register')} isWidthFull={false} /> }
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
}
