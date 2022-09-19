import { RiUserLine } from "react-icons/ri";
import { IoWalletOutline, IoRocketSharp } from "react-icons/io5";
import PrimaryButton from "../components/common/PrimaryButton";
import { useState } from "react";
import useToast from "../hooks/useToast";
import useRequests from "../hooks/useRequests";
import { useRouter } from "next/router";
import Head from "next/head"

export default function CreateRequest() {
    const toast = useToast();
    const router = useRouter();
    const [msg, setMsg] = useState("");
    const [author, setAuthor] = useState("");
    const [addressTo, setAddressTo] = useState("");
    const [loading, setLoading] = useState(false);

    const { newRequest } = useRequests();

    const resetForm = () => {
        setMsg("");
        setAuthor("");
        setAddressTo("");
    };

    const clickSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!msg || !author || !addressTo) {
            toast("error", "Please fill all the fields");
            setLoading(false);
        } else {
            try {
                await newRequest(msg, author, addressTo);
                resetForm();
                toast(
                    "success",
                    "Your file request has been created, await for response from the wallet addressee"
                );
                router.push("/my_requests");
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
        <Head>
            <title>Create New Request | Vetra</title>
        </Head>
        <section
            className="bg-white dark:bg-gray-900"
            style={{ fontFamily: "Poppins" }}
        >
            <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
                <h3 className="text-xl font-semibold tracking-wide text-center text-gray-800 capitalize dark:text-white">
                    Create New File Request
                </h3>

                <div className="w-full max-w-md mx-auto mt-6">
                    <form>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                            >
                                Message
                            </label>
                            <textarea
                                rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
                                placeholder="Type your message ..."
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Your Name
                            </label>
                            <div className="relative mb-6">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <RiUserLine className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Bonnie Green"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Wallet Address
                            </label>
                            <div className="relative mb-6">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <IoWalletOutline className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="HVJqBuGymzQWAM7JwixLvQcVSZ6rKowvo3j7eH1yScHN"
                                    value={addressTo}
                                    onChange={(e) =>
                                        setAddressTo(e.target.value)
                                    }
                                />
                            </div>
                            <p className="my-3 text-sm text-gray-500 dark:text-gray-400">
                                Paste the Wallet Address of the Recipient
                            </p>
                        </div>

                        <PrimaryButton
                            text="Send Request"
                            Icon={IoRocketSharp}
                            onClick={clickSubmit}
                            disabled={loading}
                            isLoading={loading}
                            loadingText={"Sending Request 🚀..."}
                        />
                    </form>
                </div>
            </div>
        </section>
        </>
    );
}

// CreateRequest.getLayout = function getLayout(page) {
//     return <Layout>{page}</Layout>;
// };
