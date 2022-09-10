import Layout from "../components/layout";
import FolderCard from "../components/common/FolderCard";
import { FaFileVideo } from "react-icons/fa";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { BsFileImageFill, BsFillFileEarmarkArrowUpFill } from "react-icons/bs";
import DropdownButton from "../components/common/DropdownButton"

let files = [
    {
        name: "Get Started with Typescript.pdf",
        location: "Documents",
        owner: "7MKwk....xsQf67",
        added: "2022-06-24",
        size: "8.5 MB"
    },
    {
        name: "Deadpool Full Movies.mkv",
        location: "Videos",
        owner: "7MKwk....xsQf67",
        added: "2022-09-01",
        size: "1054 MB"
    },
    {
        name: "IMG-25145551112.png",
        location: "Pictures",
        owner: "7MKwk....xsQf67",
        added: "2022-07-11",
        size: "2.3 MB"
    },
];

export default function MyFiles() {
    return (
        <section
            className="bg-white dark:bg-gray-900"
            style={{ fontFamily: "Poppins" }}
        >
            <div className="container px-6 py-3 mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white mb-8">
                    My Files
                </h1>
                <h3 className="text-xl font-semibold text-gray-800 capitalize dark:text-white">
                    Folders
                </h3>
                <div className="grid grid-cols-1 gap-8 mt-4 xl:mt-12 xl:gap-12 md:grid-cols-4">
                    <FolderCard Icon={FaFileVideo} title="Videos" />
                    <FolderCard Icon={MdOutlineLibraryMusic} title="Music" />
                    <FolderCard Icon={BsFileImageFill} title="Pictures" />
                    <FolderCard Icon={BsFillFileEarmarkArrowUpFill} title="Projects" />
                </div>
                <h2 className="text-sm font-semibold text-gray-800 capitalize lg:text-xl dark:text-white mt-8 mb-4">
                    All Files
                </h2>

                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Name
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Location
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Owner
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Added
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Size
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((item, i) => (
                                <tr
                                    key={i}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {item.name}
                                    </th>
                                    <td className="py-4 px-6">
                                        {item.location}
                                    </td>
                                    <td className="py-4 px-6">{item.owner}</td>
                                    <td className="py-4 px-6">{item.added}</td>
                                    <td className="py-4 px-6">{item.size}</td>
                                    <td className="py-4 px-6 text-right">
                                        <DropdownButton />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

MyFiles.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
