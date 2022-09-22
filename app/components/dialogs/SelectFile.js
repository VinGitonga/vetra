import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import { Fragment } from "react";
import prettyBytes from "pretty-bytes";

const getFileSize = (fileSize) => prettyBytes(fileSize);
const getDateAdded = (addedAt) => new Date(addedAt).toLocaleString();

export default function SelectFile({
    show,
    closeModal,
    selectedFile,
    setSelectedFile,
    data,
}) {
    return (
        <>
            <Transition appear show={show} as={Fragment}>
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
                                        Select File
                                    </Dialog.Title>
                                    <div className="w-full px-4 py-6">
                                        <div className="mx-auto w-full max-w-md">
                                            <RadioGroup
                                                value={selectedFile}
                                                // onChange={setSelectedFile}
                                            >
                                                <RadioGroup.Label>
                                                    All Files
                                                </RadioGroup.Label>
                                                {data?.length <= 0 ? (
                                                    <div className="font-bold text-gray-700 dark:text-white">
                                                        Upload New Files First
                                                        to Share
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {data?.map((file, i) => (
                                                            <RadioGroup.Option
                                                                key={
                                                                    i
                                                                }
                                                                onClick={() => setSelectedFile(data[i])}
                                                                value={file}
                                                                className={({
                                                                    active,
                                                                    checked,
                                                                }) =>
                                                                    `${
                                                                        active
                                                                            ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                                                                            : ""
                                                                    }
                  ${
                      checked
                          ? "bg-sky-900 bg-opacity-75 text-white"
                          : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                                                }
                                                            >
                                                                {({
                                                                    active,
                                                                    checked,
                                                                }) => (
                                                                    <>
                                                                        <div className="flex w-full items-center justify-between">
                                                                            <div className="flex items-center">
                                                                                <div className="text-sm">
                                                                                    <RadioGroup.Label
                                                                                        as="p"
                                                                                        className={`font-medium  ${
                                                                                            checked
                                                                                                ? "text-white"
                                                                                                : "text-gray-900"
                                                                                        }`}
                                                                                    >
                                                                                        {
                                                                                            file
                                                                                                ?.attributes
                                                                                                ?.displayName
                                                                                        }
                                                                                    </RadioGroup.Label>
                                                                                    <RadioGroup.Description
                                                                                        as="span"
                                                                                        className={`inline ${
                                                                                            checked
                                                                                                ? "text-sky-100"
                                                                                                : "text-gray-500"
                                                                                        }`}
                                                                                    >
                                                                                        <span>
                                                                                            {getFileSize(
                                                                                                file
                                                                                                    ?.attributes
                                                                                                    ?.size
                                                                                            )}

                                                                                            /
                                                                                            {getDateAdded(
                                                                                                file
                                                                                                    ?.attributes
                                                                                                    ?.updatedAt
                                                                                            )}
                                                                                        </span>{" "}
                                                                                        <span aria-hidden="true">
                                                                                            &middot;
                                                                                        </span>{" "}
                                                                                        <span>
                                                                                            {
                                                                                                file?.id
                                                                                            }
                                                                                        </span>
                                                                                    </RadioGroup.Description>
                                                                                </div>
                                                                            </div>
                                                                            {checked && (
                                                                                <div className="shrink-0 text-white">
                                                                                    <CheckIcon className="h-6 w-6" />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </RadioGroup.Option>
                                                        ))}
                                                    </div>
                                                )}
                                            </RadioGroup>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Okay
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

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
