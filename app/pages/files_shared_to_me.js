import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Dropdown } from "flowbite-react";
import Button from "../components/common/PrimaryButton"
import {
    getDateAdded,
    getSlicedAddress,
    getFileSize,
    getFileExtension,
} from "../utils/utils";

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
            setFiles(results);
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
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg my-4">
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
                                            <DropdownMenu />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="font-bold text-gray-700 dark:text-white">
                        No Files have been shared with you yet! 😢
                    </div>
                )}
            </div>
        </section>
    );
}

const DropdownMenu = () => (
    <Dropdown label="Options">
        <Dropdown.Item>Share</Dropdown.Item>
        <Dropdown.Item>Download</Dropdown.Item>
    </Dropdown>
);
