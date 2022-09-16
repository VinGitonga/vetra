import DropdownButton from "../../components/common/DropdownButton";
import { useMoralisQuery } from "react-moralis";
import { useRouter } from "next/router";
import prettyBytes from "pretty-bytes";
import { useState } from "react";
import FilePreview from "../../components/dialogs/FilePreview";
import { getFile } from "../../utils/getFile";
import ShareFile from "../../components/dialogs/ShareFile";

const getFileExtension = (filename) => filename.split(".").pop().toUpperCase();
const getDateAdded = (addedAt) => new Date(addedAt).toLocaleString();
const getSlicedAddress = (address) =>
    `${address.slice(0, 6)}.....${address.slice(-6)}`;
const getFileSize = (fileSize) => prettyBytes(fileSize);

const generateIpfsDirectUrl = (ipfsPath) => {
    let newIpfsPathArr = ipfsPath.split("/");
    return `https://${newIpfsPathArr[0]}.ipfs.w3s.link/ipfs/${newIpfsPathArr[0]}/${newIpfsPathArr[1]}`;
};

export default function Folder() {
    const router = useRouter();
    const [showPreview, setShowPreview] = useState(false);
    const [openShare, setOpenShare] = useState(false);
    const [fileDetailsShare, setFileDetailsShare] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [filename, setFilename] = useState(null);
    const { folderId } = router.query;
    console.log(folderId);

    const { data: folderInfo } = useMoralisQuery(
        "Folder",
        (query) => query.equalTo("objectId", folderId),
        []
    );

    // fetch all the folders associated with the current folder
    const { data: files } = useMoralisQuery("File", (query) =>
        query.equalTo("currentFolder", folderId)
    );

    const openModal = (ipfsPath, filename) => {
        let url = generateIpfsDirectUrl(ipfsPath);
        setFileUrl(url);
        setFilename(filename);
        setShowPreview(true);
    };

    const closeModal = () => {
        setFileUrl(null);
        setShowPreview(false);
    };

    const openShareModal = (file) => {
        setFileDetailsShare(file);
        setOpenShare(true);
    };

    const closeShareModal = () => {
        setFileDetailsShare(null);
        setOpenShare(false);
    };

    console.log(files);

    return (
        <section
            className="bg-white dark:bg-gray-900"
            style={{ fontFamily: "Poppins" }}
        >
            <FilePreview
                isOpen={showPreview}
                fileUrl={fileUrl}
                filename={filename}
                closeModal={closeModal}
            />
            <ShareFile
                isOpen={openShare}
                closeModal={closeShareModal}
                setIsOpen={setOpenShare}
                file={fileDetailsShare}
            />
            <div className="container px-6 py-3 mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white mb-8">
                    {folderInfo[0]?.attributes?.displayName || "Folder"}
                </h1>
                <h2 className="text-sm font-semibold text-gray-800 capitalize lg:text-xl dark:text-white mt-8 mb-4">
                    Files
                </h2>

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
                            {files.map((file) => (
                                <tr
                                    key={file.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {file.attributes.displayName}
                                    </th>
                                    <td className="py-4 px-6">
                                        {getDateAdded(file.createdAt)}
                                    </td>
                                    <td className="py-4 px-6">
                                        {getSlicedAddress(
                                            file.attributes?.owner
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        {getFileExtension(
                                            file.attributes?.displayName
                                        )}{" "}
                                        File
                                    </td>
                                    <td className="py-4 px-6">
                                        {getFileSize(file.attributes?.size)}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <DropdownButton
                                            fileCid={file.attributes?.fileCid}
                                            filename={
                                                file.attributes?.displayName
                                            }
                                            onClickShare={() =>
                                                openShareModal(file)
                                            }
                                            isDisabled={false}
                                            onClickPreview={() =>
                                                openModal(
                                                    file.attributes?.ipfsPath,
                                                    file.attributes?.displayName
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
