import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Button from "../components/common/PrimaryButton"
import FileCard from "../components/common/FileCard";
import Head from "next/head"

export default function FilesSharedToMe() {
    const { Moralis } = useMoralis();
    const { hasAccount, authUser } = useAuth();
    const [files, setFiles] = useState([]);

    async function getFiles() {
        try {
            const File = Moralis.Object.extend("File");
            const query = new Moralis.Query(File);
            query.equalTo(
                "allowedAddresses",
                authUser.userWalletAddress.toString()
            );
            let results = await query.find();
            let filteredResults = results.filter(item => item.attributes?.owner !== authUser?.userWalletAddress?.toString())
            setFiles(filteredResults);
        } catch (err) {
            console.log(err);
        }
    }

    async function refreshDetails() {
        await getFiles();
    }

    useEffect(() => {
        if (hasAccount) {
            refreshDetails();
        }
    }, [hasAccount]);

    console.log(files);

    return (
        <>
        <Head>
            <title>Files Shared to Me | Vetra</title>
        </Head>
        <section
            className="bg-white dark:bg-gray-900"
            style={{ fontFamily: "Poppins" }}
        >
            <div className="container px-6 py-3 mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white mb-8">
                    Files Shared to Me
                </h1>

                <div className="flex items-center justify-between my-8">
                    <h2 className="text-sm font-semibold text-gray-800 capitalize lg:text-xl dark:text-white mb-4">
                        All Files
                    </h2>
                    <Button
                        text={"Refresh Files"}
                        isWidthFull={false}
                        onClick={refreshDetails}
                    />
                </div>

                {files.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 xl:gap-12 md:grid-cols-4 mb-4">
                            {files.map(({ attributes: file }, i) => (
                                <FileCard file={files[i]} key={files[i].id} />
                            ))}
                        </div>
                    ) : (
                        <div className="font-bold text-gray-700 dark:text-white mt-2">
                            No Files yet! Request Some 🚀
                        </div>
                    )}
            </div>
        </section>
        </>
    );
}
