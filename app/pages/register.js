import PrimaryButton from "../components/common/PrimaryButton";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";
import { useRouter } from "next/router";
import { RiLoginCircleFill } from "react-icons/ri";
import Head from "next/head"

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast(5000);
    const router = useRouter();

    const { signup, hasAccount, setHasAccount } = useAuth();

    const clickSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email) {
            toast("error", "Please fill all the fields");
        } else {
            // setLoading(true);
            // signup(name, email)
            // toast("success", "Account created successfully");
            // setLoading(false)
            try {
                await signup(name, email);
                toast("success", "Account created successfully");
                setHasAccount(true);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
                toast("error", "An error was encountered");
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (hasAccount) {
            router.push("/dashboard");
        }
    }, [hasAccount]);

    return (
        <>
        <Head>
            <title>Register | Vetra</title>
        </Head>
            <section
                className="w-full min-h-screen bg-white dark:bg-gray-900"
                style={{ fontFamily: "Poppins" }}
            >
                <div className="container relative flex flex-col min-h-screen px-6 py-8 mx-auto">
                    <section className="flex items-center flex-1">
                        <div className="w-full max-w-md mx-auto">
                            <h3 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
                                Create an Account with Vetra
                            </h3>

                            <form className="mt-6">
                                <div>
                                    <label className="block text-sm text-gray-800 dark:text-gray-200">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        placeholder="Walt Mich"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="mt-4">
                                    <div>
                                        <label className="block text-sm text-gray-800 dark:text-gray-200">
                                            Email Address
                                        </label>
                                    </div>

                                    <input
                                        type="email"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        placeholder="walt@kovu.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="mt-6">
                                    <PrimaryButton
                                        text="Submit"
                                        isLoading={loading}
                                        loadingText={"Saving your info ..."}
                                        onClick={clickSubmit}
                                        Icon={RiLoginCircleFill}
                                    />
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
}
