import FolderCard from "../components/common/FolderCard";
import { BsFileImageFill } from "react-icons/bs";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Dropdown } from "flowbite-react";
import Button from "../components/common/PrimaryButton";
import {
    getDateAdded,
    getSlicedAddress,
    getFileSize,
    getFileExtension,
} from "../utils/utils";
import useToast from "../hooks/useToast";
import Head from "next/head"

export default function MyFiles() {
    const { Moralis } = useMoralis();
    const toast = useToast();
    const { hasAccount, authUser } = useAuth();
    const [files, setFiles] = useState([]);
    const [folders, setFolders] = useState([]);
    const [folderObj, setFolderObj] = useState(null);

    async function getFolderForUpdate(folderId) {
        const Folder = Moralis.Object.extend("Folder");
        const query = new Moralis.Query(Folder);

        query.get(folderId).then(
            (folder) => setFolderObj(folder),
            (error) => console.log(error)
        );
    }

    async function updateFile(fileObj) {
        const File = Moralis.Object.extend("File");
        const query = new Moralis.Query(File);
        await getFolderForUpdate(fileObj.attributes.currentFolder);

        //get monster with id xWMyZ4YEGZ
        query.get(fileObj.id).then(
            async (file) => {
                file.set("currentParentFolder", folderObj);
                let resp = await file.save();
                console.log(resp);
                toast("success", "File Updated Successfully");
            },
            (error) => {
                console.log(error);
            }
        );
    }

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
            className="bg-white dark:bg-gray-900"
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
                <div className="grid grid-cols-1 gap-8 mt-4 xl:mt-12 xl:gap-12 md:grid-cols-4">
                    {folders.length > 0 ? (
                        folders.map(({ attributes: fold }, i) => (
                            <FolderCard
                                Icon={BsFileImageFill}
                                title={fold.displayName}
                                hrefPath={`folder/${folders[i].id}`}
                                key={i}
                            />
                        ))
                    ) : (
                        <div className="font-bold text-gray-700 dark:text-white">
                            No Folders Created Yet! Create One 😁
                        </div>
                    )}
                </div>
                <h2 className="text-sm font-semibold text-gray-800 capitalize lg:text-xl dark:text-white my-8">
                    All Files
                </h2>

                {files.length > 0 ? (
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Added
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Owner
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        File Type
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Size
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map(({ attributes: file }, i) => (
                                    <tr
                                        key={i}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {file.displayName}
                                        </th>
                                        <td className="py-4 px-6">
                                            {getDateAdded(file.createdAt)}
                                        </td>
                                        <td className="py-4 px-6">
                                            {getSlicedAddress(file.owner)}
                                        </td>
                                        <td className="py-4 px-6">
                                            {getFileExtension(file.displayName)}
                                        </td>
                                        <td className="py-4 px-6">
                                            {getFileSize(file.size)}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <DropdownMenu
                                                onClickUpdate={() =>
                                                    updateFile(files[i])
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="font-bold text-gray-700 dark:text-white">
                        No Files yet! Upload some 🚀
                    </div>
                )}
            </div>
        </section>
        </>
    );
}

const DropdownMenu = ({ onClickUpdate }) => (
    <Dropdown label="Options">
        <Dropdown.Item>Share</Dropdown.Item>
        <Dropdown.Item>Download</Dropdown.Item>
        <Dropdown.Item onClick={onClickUpdate}>Update</Dropdown.Item>
    </Dropdown>
);
