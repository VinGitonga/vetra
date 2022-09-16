import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdOutlineMoreVert, MdOutlineViewInAr } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import DownloadBtn from "./DownloadBtn";

const DropdownButton = ({
    filename,
    fileCid,
    isDisabled = true,
    onClickShare,
    onClickPreview,
}) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <MdOutlineMoreVert
                        className="w-6 h-6"
                        disabled={isDisabled}
                    />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active
                                            ? "bg-violet-500 text-white"
                                            : "text-gray-900"
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={onClickShare}
                                >
                                    <IoShareSocialOutline
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    Share
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active
                                            ? "bg-violet-500 text-white"
                                            : "text-gray-900"
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={onClickPreview ? onClickPreview : () => {}}
                                >
                                    <MdOutlineViewInAr
                                        className="mr-2 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    Preview
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <DownloadBtn
                                    btnActive={active}
                                    fileCid={fileCid}
                                    filename={filename}
                                    isDisabled={false}
                                />
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default DropdownButton;
