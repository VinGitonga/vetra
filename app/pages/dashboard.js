import FolderCard from "../components/common/FolderCard";
import { HiFolderOpen } from "react-icons/hi";
import { useState, useEffect } from "react";
import { BsFileImageFill } from "react-icons/bs";
import { useMoralis } from "react-moralis";
import useAuth from "../hooks/useAuth"
import Button from "../components/common/PrimaryButton"
import Head from "next/head"

let files = [
    {
        name: "Get Started with Typescript.pdf",
        location: "Documents",
        owner: "7MKwk....xsQf67",
        added: "2022-06-24 11:54PM",
        size: "8.5 MB",
    },
    {
        name: "Deadpool Full Movies.mkv",
        location: "Videos",
        owner: "7MKwk....xsQf67",
        added: "2022-09-01 10:12AM",
        size: "1054 MB",
    },
    {
        name: "IMG-25145551112.png",
        location: "Pictures",
        owner: "7MKwk....xsQf67",
        added: "2022-07-11 02:36PM",
        size: "2.3 MB",
    },
];

export default function Dashboard() {
    const { hasAccount, authUser } = useAuth()
    const { Moralis } = useMoralis();
    const [folders, setFolders] = useState([]);
    // const [files, setFiles] = useState([])

    async function getFolders() {
        try {
            const Folder = Moralis.Object.extend("Folder");
            const query = new Moralis.Query(Folder);
            query.equalTo("ownerAddress", authUser?.userWalletAddress?.toString());
            let results = await query.find();
            setFolders(results);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (hasAccount){
            getFolders()
        }
    }, [hasAccount])

    return (
        <>
        <Head>
            <title>Dashboard | Vetra</title>
        </Head>
        <section
            className="bg-white dark:bg-gray-900"
            style={{ fontFamily: "Poppins" }}
        >
            <div className="container px-6 py-3 mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white mb-8">
                        My Files
                    </h1>
                    <Button
                        text={"Refresh Files / Folders"}
                        isWidthFull={false}
                        onClick={getFolders}
                    />
                </div>
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
                    Folders
                </h1>
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-4">
                    <FolderCard
                        Icon={HiFolderOpen}
                        title="All Folders"
                        hrefPath={"allfolders"}
                    />
                    {folders.length > 3
                        ? folders
                              .slice(0, 3)
                              .map((folder) => (
                                  <FolderCard
                                      key={folder.id}
                                      Icon={BsFileImageFill}
                                      title={folder.get("displayName")}
                                      hrefPath={`folder/${folder.id}`}
                                  />
                              ))
                        : folders.map((folder) => (
                              <FolderCard
                                  key={folder.id}
                                  Icon={BsFileImageFill}
                                  title={folder.get("displayName")}
                                  hrefPath={`folder/${folder.id}`}
                              />
                          ))}
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
                                    {/* <td className="py-4 px-6 text-right">
                                        <a
                                            href="#"
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Share
                                        </a>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        </>
    );
}

// Dashboard.getLayout = function getLayout(page) {
//     return <Layout>{page}</Layout>;
// };
