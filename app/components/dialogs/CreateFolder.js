import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import useMoralisDB from "../../hooks/useMoralisDB";
import PrimaryButton from "../common/PrimaryButton";

export default function CreateFolder({ isOpen, closeModal, toast }) {
    const [displayName, setDisplayName] = useState("");
    const [loading, setLoading] = useState(false);
    const { createFolder } = useMoralisDB();

    const clickSubmit = (e) => {
        e.preventDefault();
        if (!displayName) {
            toast("error", "Input Folder Name");
            return;
        }

        try {
            createFolder(displayName);
            toast("success", `${displayName} Created Successfully`)
            setDisplayName("");
            setLoading(false);
            closeModal();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

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
                                        Create New Folder
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Folder Name
                                        </label>
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="My Stuff"
                                            value={displayName}
                                            onChange={(e) =>
                                                setDisplayName(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <PrimaryButton
                                            text={"Create"}
                                            isWidthFull={false}
                                            isLoading={loading}
                                            loadingText={"Saving Folder ..."}
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
