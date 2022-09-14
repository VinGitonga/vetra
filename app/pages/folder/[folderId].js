import DropdownButton from "../../components/common/DropdownButton";
import { useMoralisQuery } from "react-moralis";
import { useRouter } from "next/router";

let files = [
    {
        name: "Get Started with Typescript.pdf",
        location: "Documents",
        owner: "7MKwk....xsQf67",
        added: "2022-06-24",
        size: "8.5 MB",
    },
    {
        name: "Deadpool Full Movies.mkv",
        location: "Videos",
        owner: "7MKwk....xsQf67",
        added: "2022-09-01",
        size: "1054 MB",
    },
    {
        name: "IMG-25145551112.png",
        location: "Pictures",
        owner: "7MKwk....xsQf67",
        added: "2022-07-11",
        size: "2.3 MB",
    },
];

export default function Folder() {
    const router = useRouter();
    const { folderId } = router.query;
    console.log(folderId)

    const { data: folderInfo } = useMoralisQuery(
        "Folder",
        (query) => query.equalTo("objectId", folderId),
        []
    );

    

    return (
        <section
            className="bg-white dark:bg-gray-900"
            style={{ fontFamily: "Poppins" }}
        >
            <div className="container px-6 py-3 mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white mb-8">
                    {folderInfo[0]?.attributes?.displayName || "Folder"}
                </h1>
                <h2 className="text-sm font-semibold text-gray-800 capitalize lg:text-xl dark:text-white mt-8 mb-4">
                    Files
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
