import Layout from "../components/layout";


let files = [
    {
        name: "Get Started with Typescript.pdf",
        location: "Documents",
        sent_to: "7MKwk....xsQf67",
        sent_on: "2022-06-24 11:54PM",
        size: "8.5 MB"
    },
    {
        name: "Deadpool Full Movies.mkv",
        location: "Videos",
        sent_to: "richy@gmail.com",
        sent_on: "2022-09-01 10:12AM",
        size: "1054 MB"
    },
    {
        name: "IMG-25145551112.png",
        location: "Pictures",
        sent_to: "7MKwk....xsQf67",
        sent_on: "2022-07-11 02:36PM",
        size: "2.3 MB"
    },
];

export default function ShareTransactions() {
    return (
        <section
            className="bg-white dark:bg-gray-900"
            style={{ fontFamily: "Poppins" }}
        >
            <div className="container px-6 py-3 mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white mb-8">
                    Documents/Files Shared Transactions
                </h1>

                <h2 className="text-sm font-semibold text-gray-800 capitalize lg:text-xl dark:text-white mt-8 mb-4">
                    Files Shared
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
                                    Shared With
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Shared On
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
                                    <td className="py-4 px-6">{item.sent_to}</td>
                                    <td className="py-4 px-6">{item.sent_on}</td>
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
    );
}

// ShareTransactions.getLayout = function getLayout(page) {
//     return <Layout>{page}</Layout>;
// };
