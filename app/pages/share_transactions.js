import useShare from "../hooks/useShare";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import prettyBytes from "pretty-bytes";
import Button from "../components/common/PrimaryButton";
import Head from "next/head"

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-US");

const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
const getSlicedAddress = (address) =>
    regexExp.test(address)
        ? address
        : `${address.slice(0, 6)}.....${address.slice(-6)}`;
const getFileSize = (fileSize) => prettyBytes(parseInt(fileSize));

export default function ShareTransactions() {
    const [files, setFiles] = useState([]);
    const { hasAccount, authUser } = useAuth();
    const { fetchMyShareTransactions } = useShare();

    const getMyTransactions = async () => {
        let allTransactions = await fetchMyShareTransactions();
        setFiles(allTransactions);
    };

    const getSortedFiles = (allFiles) => {
        let newFiles = allFiles.filter(
            (item) =>
                item.account.ownerAddress.toString() ===
                authUser.userWalletAddress.toString()
        );
        return newFiles.sort(
            (a, b) =>
                b?.account?.shareTime?.toNumber() -
                a?.account?.shareTime?.toNumber()
        );
    };

    useEffect(() => {
        if (hasAccount) {
            getMyTransactions();
        }
    }, [hasAccount]);

    console.log(files);

    return (
        <>
        <Head>
            <title>My Files Transactions | Vetra</title>
        </Head>
        <section
            className="bg-white dark:bg-gray-900"
            style={{ fontFamily: "Poppins" }}
        >
            <div className="container px-6 py-3 mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white mb-8">
                    Documents/Files Shared Transactions
                </h1>

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-gray-800 capitalize lg:text-xl dark:text-white mt-8 mb-4">
                        Files Shared
                    </h2>
                    <Button
                        text={"Refresh Files"}
                        isWidthFull={false}
                        onClick={getMyTransactions}
                    />
                </div>

                {files.length > 0 ? (
                    <>
                        {getSortedFiles(files).length > 0 ? (
                            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                File Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Shared With
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Shared On
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6"
                                            >
                                                Size
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getSortedFiles(files).map(
                                            ({ account: file }) => (
                                                <tr
                                                    key={file.shareTime}
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                >
                                                    <th
                                                        scope="row"
                                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {file.filename}
                                                    </th>
                                                    <td className="py-4 px-6">
                                                        {getSlicedAddress(
                                                            file.sentTo
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {timeAgo.format(
                                                            new Date(
                                                                file.shareTime *
                                                                    1000
                                                            ),
                                                            "twitter-now"
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {getFileSize(
                                                            file.fileSize
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="font-bold text-gray-700 dark:text-white">
                                No Files Shared Yet 😢
                            </div>
                        )}
                    </>
                ) : (
                    <div className="font-bold text-gray-700 dark:text-white">
                        No Files Shared Yet 😢
                    </div>
                )}
            </div>
        </section>
        </>
    );
}
