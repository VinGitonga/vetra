import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Button from "../components/common/PrimaryButton";
import Head from "next/head";
import FolderCard2 from "../components/common/FolderCard2";
import FileCard from "../components/common/FileCard";

export default function MyFiles() {
    const { Moralis } = useMoralis();
    const { hasAccount, authUser } = useAuth();
    const [files, setFiles] = useState([]);
    const [folders, setFolders] = useState([]);


    async function getFiles() {
        try {
            const File = Moralis.Object.extend("File");
            const query = new Moralis.Query(File);
            query.equalTo("owner", authUser.userWalletAddress.toString());
            let results = await query.find();
            setFiles(results);
        } catch (err) {
            console.log(err);
        }
    }

    async function getFolders() {
        try {
            const Folder = Moralis.Object.extend("Folder");
            const query = new Moralis.Query(Folder);
            query.equalTo(
                "ownerAddress",
                authUser.userWalletAddress.toString()
            );
            let results = await query.find();
            console.log("results", results);
            setFolders(results);
        } catch (err) {
            console.log(err);
        }
    }

    async function refreshDetails() {
        await getFolders();
        await getFiles();
    }

    useEffect(() => {
        if (hasAccount) {
            refreshDetails();
        }
    }, [hasAccount]);

    console.log(files);
    console.log(folders);

    return (
        <>
            <Head>
                <title>My Files | Vetra</title>
            </Head>
            <section
                className="dark:bg-gray-900"
                style={{ fontFamily: "Poppins" }}
            >
                <div className="container px-6 py-3 mx-auto">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white mb-8">
                            My Files
                        </h1>
                        <Button
                            text={"Refresh Files"}
                            isWidthFull={false}
                            onClick={refreshDetails}
                        />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 capitalize dark:text-white">
                        Folders
                    </h3>
                    {folders.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 xl:gap-12 md:grid-cols-3">
                            {folders.map((folder) => (
                                <FolderCard2
                                    key={folder.id}
                                    title={folder.get("displayName")}
                                    hrefPath={`folder/${folder.id}`}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="font-bold text-gray-700 dark:text-white mt-2 text-xl">
                            You haven&apos;t created any folder yet! 😢 Create One 😂
                        </div>
                    )}
                    <h2 className="text-sm font-semibold text-gray-800 capitalize lg:text-xl dark:text-white mt-8 mb-4">
                        All Files
                    </h2>

                    {files.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 xl:gap-12 md:grid-cols-4 mb-4">
                            {files.map(({ attributes: file }, i) => (
                                <FileCard file={files[i]} key={files[i].id} />
                            ))}
                        </div>
                    ) : (
                        <div className="font-bold text-gray-700 dark:text-white mt-2">
                            No Files yet! Upload some 🚀
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
