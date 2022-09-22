import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import useAuth from "../hooks/useAuth";
import Button from "../components/common/PrimaryButton";
import Head from "next/head";
import FolderCard2 from "../components/common/FolderCard2";
import FileCard from "../components/common/FileCard";

export default function Dashboard() {
    const { hasAccount, authUser } = useAuth();
    const { Moralis } = useMoralis();
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);

    async function getFolders() {
        try {
            const Folder = Moralis.Object.extend("Folder");
            const query = new Moralis.Query(Folder);
            query.equalTo(
                "ownerAddress",
                authUser?.userWalletAddress?.toString()
            );
            let results = await query.find();
            setFolders(results);
        } catch (err) {
            console.log(err);
        }
    }

    async function getFiles() {
        try {
            const File = Moralis.Object.extend("File");
            const query = new Moralis.Query(File);
            query.equalTo(
                "allowedAddresses",
                authUser?.userWalletAddress?.toString()
            );
            let results = await query.find();
            setFiles(results);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (hasAccount) {
            getFolders();
            getFiles();
        }
    }, [hasAccount]);


    return (
        <>
            <Head>
                <title>Dashboard | Vetra</title>
            </Head>
            <section
                className="dark:bg-gray-900"
                style={{ fontFamily: "Poppins" }}
            >
                <div className="container px-6 py-3 mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
                            My Files
                        </h1>
                        <Button
                            text={"Refresh Files / Folders"}
                            isWidthFull={false}
                            onClick={getFolders}
                        />
                    </div>
                    <h1 className="text-xl font-semibold text-gray-800 capitalize mb-4">
                        Folders
                    </h1>
                    {folders.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 xl:gap-12 md:grid-cols-3">
                            <FolderCard2
                                title={"All Folders"}
                                hrefPath={`allfolders`}
                            />
                            {folders.length > 8
                                ? folders
                                      .slice(0, 8)
                                      .map((folder) => (
                                          <FolderCard2
                                              key={folder.id}
                                              title={folder.get("displayName")}
                                              hrefPath={`folder/${folder.id}`}
                                          />
                                      ))
                                : folders.map((folder) => (
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
                            {files.map((file, i) => (
                                <FileCard file={file} key={files[i].id} />
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
