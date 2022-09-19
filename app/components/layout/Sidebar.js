import { TbCloudUpload } from "react-icons/tb";
import { GrAdd, GrShareOption } from "react-icons/gr";
import { RiBookletLine, RiShareForwardBoxLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { TbMessage2Share } from "react-icons/tb";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { useRouter } from "next/router";
import { useState } from "react";
import CreateFolder from "../dialogs/CreateFolder";
import UploadFile from "../dialogs/UploadFile";
import useToast from "../../hooks/useToast";

export default function Sidebar() {
    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [showUpload, setShowUpload] = useState(false);

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const closeUpload = () => setShowUpload(false);
    const openUpload = () => setShowUpload(true);

    const router = useRouter();
    return (
        <div className="w-64 h-screen fixed">
            <CreateFolder
                isOpen={isOpen}
                closeModal={closeModal}
                toast={toast}
            />
            <UploadFile
                isOpen={showUpload}
                closeModal={closeUpload}
                setIsOpen={setShowUpload}
                toast={toast}
            />
            <button
                type="button"
                onClick={openUpload}
                className="text-white bg-blue-700 flex items-center hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <TbCloudUpload className="mr-2 h-6 w-6" />
                Upload File
            </button>

            <button
                type="button"
                onClick={openModal}
                className="py-2.5 px-5 mr-2 mt-6 mb-2 flex items-center text-sm font-medium text-blue-800 focus:outline-none bg-white rounded-full border border-blue-800 hover:bg-gray-100 hover:text-blue-900 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
                <GrAdd className="mr-2 h-6 w-6" />
                Create Folder
            </button>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <a
                        className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer"
                        onClick={() => router.push("/my_files")}
                    >
                        <RiBookletLine className="w-5 h-5" />

                        <span className="mx-4 font-medium">My Files</span>
                    </a>

                    <a
                        className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer"
                        onClick={() => router.push("/files_shared_to_me")}
                    >
                        <FaUsers className="w-5 h-5" />

                        <span className="mx-4 font-medium">
                            Files Shared to Me
                        </span>
                    </a>

                    <a
                        className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer"
                        onClick={() => router.push("/create_request")}
                    >
                        <VscGitPullRequestCreate className="w-5 h-5" />

                        <span className="mx-4 font-medium">
                            Create New File Request
                        </span>
                    </a>

                    <a
                        className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer"
                        onClick={() => router.push("/my_requests")}
                    >
                        <RiShareForwardBoxLine className="w-5 h-5" />

                        <span className="mx-4 font-medium">
                            My File Requests
                        </span>
                    </a>

                    <a
                        className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer"
                        onClick={() => router.push("/requests_to_me")}
                    >
                        <TbMessage2Share className="w-5 h-5" />

                        <span className="mx-4 font-medium">
                            File Requests to Me
                        </span>
                    </a>

                    <a
                        className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer"
                        onClick={() => router.push("/share_transactions")}
                    >
                        <GrShareOption className="w-5 h-5" />

                        <span className="mx-4 font-medium">
                            Document Share Transactions
                        </span>
                    </a>

                    <hr className="my-6 border-gray-200 dark:border-gray-600" />
                </nav>
            </div>
        </div>
    );
}
