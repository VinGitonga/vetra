import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FiUser } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();
    return (
        <nav
            className="bg-white border-gray-200 lg:px-16 sm:px-4 py-2.5 rounded dark:bg-gray-900 sticky top-0 z-50"
            style={{ fontFamily: "Poppins" }}
        >
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a
                    className="flex items-center cursor-pointer"
                    onClick={() => router.push("/dashboard")}
                >
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Vetra
                    </span>
                </a>
                <div className="flex items-center md:order-2">
                    <Menu as="div" className="relative inline-block text-left">
                        <div className="flex items-center justify-between" >
                            <Menu.Button className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                <img
                                    className="w-12 h-12 rounded-full"
                                    src="https://avatars.dicebear.com/api/adventurer/bonniegreen.svg"
                                    alt="user photo"
                                />
                            </Menu.Button>
                            <span className="text-lg ml-3 whitespace-nowrap dark:text-white">
                                Bonnie Green
                            </span>
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
                                        <button
                                            className={
                                                "group flex w-full items-center rounded-md px-2 py-2 text-sm ext-gray-900 cursor-pointer"
                                            }
                                            onClick={() =>
                                                router.push("/register")
                                            }
                                        >
                                            <FiUser
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />

                                            <span className="text-md font-semibold whitespace-nowrap dark:text-white">
                                                Bonnie Green
                                            </span>
                                        </button>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <button
                                            className={
                                                "group flex w-full items-center rounded-md px-2 py-2 text-sm ext-gray-900 cursor-pointer"
                                            }
                                        >
                                            <FaUserCheck
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                            My Profile
                                        </button>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <button
                                            className={
                                                "group flex w-full items-center rounded-md px-2 py-2 text-sm ext-gray-900 cursor-pointer"
                                            }
                                        >
                                            <AiOutlineLogout
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                            Logout
                                        </button>
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </nav>
    );
}