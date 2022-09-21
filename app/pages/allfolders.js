import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Button from "../components/common/PrimaryButton";
import Head from "next/head";
import FolderCard2 from "../components/common/FolderCard2";

export default function AllFolders(){
    const { Moralis } = useMoralis();
    const { hasAccount, authUser } = useAuth();
    const [folders, setFolders] = useState([]);

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
    }

    useEffect(() => {
        if (hasAccount) {
            refreshDetails();
        }
    }, [hasAccount]);

    console.log(folders);

    return (
        <>
            <Head>
                <title>My Folders | Vetra</title>
            </Head>
            <section
                className="dark:bg-gray-900"
                style={{ fontFamily: "Poppins" }}
            >
                <div className="container px-6 py-3 mx-auto">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white mb-8">
                            My Folders
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
                </div>
            </section>
        </>
    )
}