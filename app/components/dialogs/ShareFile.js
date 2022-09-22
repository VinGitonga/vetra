import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useContext } from "react";
import useToast from "../../hooks/useToast";
import PrimaryButton from "../common/PrimaryButton";
import useShare from "../../hooks/useShare";
import { BsFillFileTextFill } from "react-icons/bs";
import RadioButton from "../common/RadioButton";
import { useMoralis } from "react-moralis";
import { ModalContext } from "../../context/ShareModalContext"


export default function ShareFile() {
    const { modalOpen, setModalOpen, fileDetails, setFileDetails } = useContext(ModalContext)
    const { Moralis } = useMoralis();
    const { newFileShare } = useShare();
    const toast = useToast(5000);
    const [shareType, setShareType] = useState("wallet");
    const handleShareTypeWalletChange = () => setShareType("wallet");
    const handleShareTypeEmailChange = () => setShareType("email");

    const [email, setEmail] = useState("");
    const [walletAddress, setWalletAddress] = useState("");

    const resetForm = () => {
        setEmail("");
        setWalletAddress("");
        setShareType("wallet");
        setFileDetails(null)
        setModalOpen(false);
    };

    const closeModal = () => {
        resetForm()
    }

    function getAddress(shareType) {
        switch (shareType) {
            case "wallet":
                return walletAddress;
            case "email":
                return email;
            default:
                return walletAddress;
        }
    }

    


    async function updateFile(fileId, address) {
        const File = Moralis.Object.extend("File");
        const query = new Moralis.Query(File);

        //get monster with id xWMyZ4YEGZ
        query.get(fileId).then(
            async (file) => {
                file.addUnique("allowedAddresses", address)
                let resp = await file.save()
                console.log(resp)
                toast("success", "File Shared Successfully");
                resetForm();
            },
            (error) => {
                console.log(error)
            }
        );
    }

    const clickSubmit = async (e) => {
        e.preventDefault();
        if (shareType === "wallet" && !walletAddress) {
            toast("error", "Paste in the wallet address");
        } else if (shareType === "email" && !email) {
            toast("error", "Paste in the email address");
        } else {
            console.log(fileDetails)
            newFileShare(
                fileDetails.id,
                fileDetails.attributes.displayName,
                fileDetails.attributes.ipfsPath,
                getAddress(shareType),
                fileDetails.attributes.size
            );
            await updateFile(fileDetails.id, getAddress(shareType))
        }
    };

    return (
        <>
            <Transition appear show={modalOpen} as={Fragment}>
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

                    <div
                        className="fixed inset-0 overflow-y-auto"
                        style={{ fontFamily: "Poppins" }}
                    >
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
                                        <RadioButton
                                            label={"Wallet Address"}
                                            value={shareType === "wallet"}
                                            onChange={
                                                handleShareTypeWalletChange
                                            }
                                        />
                                        <RadioButton
                                            label={"Email Address"}
                                            value={shareType === "email"}
                                            onChange={
                                                handleShareTypeEmailChange
                                            }
                                        />
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
