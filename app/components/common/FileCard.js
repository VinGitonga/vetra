import { Dropdown } from "flowbite-react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { BsFillFileEarmarkFill } from "react-icons/bs";
import { getFileSize, getSlicedAddress } from "../../utils/utils";
import axios from "axios";
import { useContext } from "react";
import { ModalContext } from "../../context/ShareModalContext";

// method that takes in filename and outputs the equivalent file extension to be used FileIcon component
const getFileExtension = (filename = "carbon.png") => filename.split(".").pop();

const FileCard = ({ file }) => {
    const { setModalOpen, setFileDetails } = useContext(ModalContext);

    /**
     * this method takes in the parameter file the sets file details to it in order to be used when button Share is clicked
     */
    const openShareModal = () => {
        setFileDetails(file);
        setModalOpen(true);
    };

    /**
     * Function to download file from IPFS to local machine
     */

    async function downloadFile() {
        try {
            const resp = await axios.get(
                `https://${file.attributes.fileCid}.ipfs.w3s.link`,
                {
                    responseType: "blob",
                    headers: {
                        Accept: "application/json",
                    },
                }
            );
            console.log(resp);

            const type = resp.data.type;
            // get arrayBuffer
            const arrayBf = await resp.data.arrayBuffer();

            // get Blob
            const blob = new Blob([arrayBf], { type });

            const url = URL.createObjectURL(blob);

            console.log(url);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", file.displayName);
            link.click();

            setTimeout(() => URL.revokeObjectURL(url), 3000);
        } catch (err) {}
    }
    return (
        <div className="mx-auto">
            <div className="block p-6 max-w-sm bg-white rounded-2xl border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex justify-end">
                    <Dropdown inline={true} label="">
                        <Dropdown.Item>
                            <button
                                onClick={openShareModal}
                                className="block py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Share
                            </button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <button
                                onClick={downloadFile}
                                className="block py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Download
                            </button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <a
                                href="#"
                                className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Remove
                            </a>
                        </Dropdown.Item>
                    </Dropdown>
                </div>
                <div className="flex items-center w-12">
                    <FileIcon
                        extension={getFileExtension(file?.attributes?.displayName)}
                        {...defaultStyles[getFileExtension(file?.attributes?.displayName)]}
                        labelUppercase={true}
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4 mt-2">
                <BsFillFileEarmarkFill className="w-6 h-6 text-blue-600" />
                <div className="font-medium dark:text-white space-y-2">
                    <div className="text-xs">{file?.displayName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        {file?.attributes?.displayName}{" "}
                        • {getFileSize(file?.attributes?.size)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        {getSlicedAddress(file?.attributes?.owner)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileCard;
