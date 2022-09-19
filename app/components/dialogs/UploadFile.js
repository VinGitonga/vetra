import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useCallback } from "react";
import SelectFolder from "./SelectFolder";
import { useDropzone } from "react-dropzone";
import useStorage from "../../hooks/useStorage";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMoralis } from "react-moralis";
import Badge from "../common/Badge";
import Progress from "../common/ProgressBar";
import PrimaryButton from "../common/PrimaryButton";

export default function UploadFile({ isOpen, closeModal, setIsOpen, toast }) {
    const wallet = useWallet();
    const { Moralis } = useMoralis()
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState(null);
    const [msgType, setMsgType] = useState(null);
    const [files, setFiles] = useState([]);
    const [folderId, setFolderId] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [startUpload, setStartUpload] = useState(false);
    const [folders, setFolders] = useState([])
    const [progressMsg, setProgressMsg] = useState("")

    const resetFields = () => {
        setFolderId(null);
        setFiles([]);
        setStartUpload(false);
        setIsOpen(false)
    };

    const { uploadFiles } = useStorage(
        setMsg,
        setMsgType,
        resetFields,
        setProgressMsg
    );

    const closeDirModal = () => {
        setFolderId(selectedFolder?.id);
        setShow(false);
    };

    async function getFolders(){
        if(!wallet.connected){
            toast("error", "Please connected your wallet first");
            return;
        }

        try {
            const Folder = Moralis.Object.extend("Folder");
            const query = new Moralis.Query(Folder);
            query.equalTo(
                "ownerAddress",
                wallet.publicKey.toString()
            );
            let results = await query.find();
            console.log("results folders", results);
            setFolders(results);
        } catch (err) {
            console.log(err);
        }

    }

    const showDirModal = () => {
        getFolders()
        setSelectedFolder(folders[0]);
        setShow(true);
    };


    const onDrop = useCallback(async (acceptedFiles) => {
        console.log(acceptedFiles);
        setFiles(acceptedFiles);
    });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const uploadToStorage = async () => {
        if (files.length <= 0) {
            toast("error", "You haven't selected any file to upload");
            return;
        }

        if (!wallet.connected) {
            toast("error", "Please connected your wallet");
            return;
        }
        setStartUpload(true);
        await uploadFiles(files, folderId);
        toast(msgType, msg)
    };


    return (
        <>
            <SelectFolder
                show={show}
                closeDirModal={closeDirModal}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
                data={folders}
            />
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Upload File
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div
                                            className="flex justify-center items-center w-full"
                                            {...getRootProps()}
                                        >
                                            <input
                                                className="hidden"
                                                {...getInputProps()}
                                            />
                                            <label className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                                    <svg
                                                        className="mb-3 w-10 h-10 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        ></path>
                                                    </svg>
                                                    {isDragActive ? (
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                            <span className="font-semibold">
                                                                Drop files here
                                                            </span>
                                                        </p>
                                                    ) : (
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                            <span className="font-semibold">
                                                                Click to upload
                                                            </span>{" "}
                                                            or drag and drop
                                                        </p>
                                                    )}
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Any file types except
                                                        folders
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        {files?.length > 0 ? (
                                            files?.map((file, i) => (
                                                <Badge
                                                    text={file?.name}
                                                    key={i}
                                                    onClick={() => {
                                                        let newFiles =
                                                            files.filter(
                                                                (_, id) =>
                                                                    id != i
                                                            );
                                                        setFiles(newFiles);
                                                    }}
                                                />
                                            ))
                                        ) : (
                                            <p className="text-md text-gray-700 dark:text-gray-400">
                                                No files selected
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={showDirModal}
                                        >
                                            Select Folder to Upload Files
                                        </button>
                                        <p className="text-md text-gray-700 dark:text-gray-400">
                                            {selectedFolder
                                                ? selectedFolder?.attributes
                                                      ?.displayName
                                                : "No Folder Selected"}
                                        </p>
                                    </div>
                                    {startUpload && (
                                        <div className="mt-4">
                                            <Progress
                                                title={`Uploading ${files?.length} file(s)`}
                                                msg={progressMsg}
                                            />
                                        </div>
                                    )}

                                    <div className="mt-4 flex items-center justify-between">
                                        <PrimaryButton
                                            text={"Upload"}
                                            isWidthFull={false}
                                            onClick={uploadToStorage}
                                        />
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
