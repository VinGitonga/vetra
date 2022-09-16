import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import useToast from "../../hooks/useToast";
import PrimaryButton from "../common/PrimaryButton";
import useShare from "../../hooks/useShare";
import {BsFillFileTextFill} from "react-icons/bs"

export default function ShareFile({ isOpen, closeModal, file, setIsOpen }) {
    const toast = useToast();
    const [shareType, setShareType] = useState("wallet");
    const [email, setEmail] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const { newFileShare } = useShare(file.id);

    const clickSubmit = (e) => {
        e.preventDefault();
        if (shareType === "wallet" && !walletAddress) {
            toast("error", "Paste in the wallet address");
        } else if (shareType === "email" && !email) {
            toast("error", "Paste in the email address");
        } else {
            newFileShare(
                file.attributes.displayName,
                file.attributes.ipfsPath,
                getShareType(shareType),
                file.attributes.size,
                shareType
            );
        }
    };

    function getShareType(shareType) {
        switch (shareType) {
            case "wallet":
                return walletAddress;
            case "email":
                return email;
            default:
                return walletAddress;
        }
    }

    return (
        <>
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

                    <div className="fixed inset-0 overflow-y-auto" style={{ fontFamily: "Poppins" }} >
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
                                    <div className="flex items-center">
                                        <BsFillFileTextFill className="w-5 h-5 text-blue-500 mr-2" />
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Share File
                                        </Dialog.Title>
                                    </div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-2">
                                        Share to
                                    </label>
                                    <div className="flex mt-2">
                                        <div className="flex items-center mr-4">
                                            <input
                                                type="radio"
                                                value={"wallet"}
                                                onClick={() => setShareType("wallet")}
                                                className={`w-4 h-4 bg-gray-100 border-gray-300 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${shareType === "wallet" && "ring-2"} `}
                                            />
                                            <label
                                                for="inline-radio"
                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Wallet Address
                                            </label>
                                        </div>
                                        <div className="flex items-center mr-4">
                                            <input
                                                type="radio"
                                                value={"email"}
                                                onClick={() => setShareType("email") }
                                                className={`w-4 h-4 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 ${shareType === "email" && "ring-2"} `}
                                            />
                                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                Email Address
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        {shareType === "wallet" ? (
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                placeholder="HVJqBuGymzQWAM7JwixLvQcVSZ6rKowvo3j7eH1yScHN"
                                                value={walletAddress}
                                                onChange={(e) =>
                                                    setWalletAddress(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                placeholder="otherperson@gmail.com"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        )}
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <PrimaryButton
                                            text={"Share"}
                                            isWidthFull={false}
                                            onClick={clickSubmit}
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
