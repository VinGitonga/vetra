import PrimaryButton from "../components/common/PrimaryButton";


export default function Register() {
    return (
        <>
            <section
                className="w-full min-h-screen bg-white dark:bg-gray-900"
                style={{ fontFamily: "Poppins" }}
            >
                <div className="container relative flex flex-col min-h-screen px-6 py-8 mx-auto">
                    <section className="flex items-center flex-1">
                        <div className="w-full max-w-md mx-auto">
                            <h3 class="text-3xl font-semibold text-center text-gray-700 dark:text-white">
                                Create an Account with Vetra
                            </h3>

                            <form class="mt-6">
                                <div>
                                    <label
                                        for="name"
                                        class="block text-sm text-gray-800 dark:text-gray-200"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        placeholder="Walt Mich"
                                    />
                                </div>

                                <div class="mt-4">
                                    <div>
                                        <label
                                            for="email"
                                            class="block text-sm text-gray-800 dark:text-gray-200"
                                        >
                                            Email Address
                                        </label>
                                    </div>

                                    <input
                                        type="email"
                                        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        placeholder="walt@kovu.com"
                                    />
                                </div>

                                <div class="mt-6">
                                    <PrimaryButton text="Submit" />
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
}
