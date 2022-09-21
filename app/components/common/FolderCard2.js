import { FaFolder } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { useRouter } from "next/router";


const FolderCard2 = ({ title, hrefPath }) => {
    const router = useRouter()
    return (
        <div className="block p-6 max-w-sm bg-white rounded-2xl border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center justify-between">
                <div className="p-3 bg-emerald-100 rounded-lg flex items-center">
                    <div className="text-violet-500">
                        <FaFolder className="w-8 h-8" />
                    </div>
                </div>
                <div className="font-medium">{title}</div>
                <Dropdown inline={true} label="">
                    <Dropdown.Item>
                        <a
                            onClick={() => router.push(`${hrefPath}`)}
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            View Contents
                        </a>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <a
                            className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Delete
                        </a>
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    );
};

export default FolderCard2;
