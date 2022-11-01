import { useMoralisQuery } from "react-moralis";
import { useRouter } from "next/router";
import FileCard from "../../components/common/FileCard";

export default function Folder() {
    const router = useRouter();

    const { folderId } = router.query;
    console.log(folderId);

    const { data: folderInfo } = useMoralisQuery(
        "Folder",
        (query) => query.equalTo("objectId", folderId),
        [folderId]
    );

    // fetch all the folders associated with the current folder
    const { data: files } = useMoralisQuery(
        "File",
        (query) => query.equalTo("currentFolder", folderId),
        [folderId]
    );

    console.log(files)

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
                {files.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 xl:gap-12 md:grid-cols-4 mb-4">
                        {files.map((fileItem) => (
                            <FileCard file={fileItem} key={fileItem?.id} />
                        ))}
                        
                    </div>
                ) : (
                    <div className="font-bold text-gray-700 dark:text-white mt-2">
                        No Files yet! Upload some 🚀
                    </div>
                )}
            </div>
        </section>
    );
}
