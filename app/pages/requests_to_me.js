import Layout from "../components/layout";

export default function RequestsToMe() {
    return (
        <section
            className="bg-white dark:bg-gray-900"
            style={{ fontFamily: "Poppins" }}
        >
            <div className="container px-6 py-3 mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
                    File Requests To Me
                </h1>
                <div className="mt-8">
                    {[...Array(5)].map((_, i) => (
                        <div
                            className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 mb-5"
                            key={i}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img
                                        className="w-12 h-12 rounded-full"
                                        src="https://avatars.dicebear.com/api/adventurer/jeseleos.svg"
                                        alt=""
                                    />
                                    <div>
                                        <div className="font-bold text-gray-700 dark:text-white">
                                            Jese Leos
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            HVJqBuGymzQWAM7JwixLvQcVSZ6rKowvo3j7eH1yScHN
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Sept 8
                                </p>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 my-2 w-3/4">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Sit ea tempora dolores qui
                                eius pariatur odit ad voluptas iste
                            </p>

                            <div>
                                <label for="chat" class="sr-only">
                                    Your response
                                </label>
                                <div class="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                    <button
                                        type="button"
                                        class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            class="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        <span class="sr-only">
                                            Upload image
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            class="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        <span class="sr-only">Add emoji</span>
                                    </button>
                                    <textarea
                                        id="chat"
                                        rows="1"
                                        class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Type your response..."
                                    ></textarea>
                                    <button
                                        type="submit"
                                        class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            class="w-6 h-6 rotate-90"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                        </svg>
                                        <span class="sr-only">
                                            Send message
                                        </span>
                                    </button>
                                </div>
                            </div>
                            {[...Array(2)].map((_, i) => (
                                <div
                                    className="rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 ml-4 my-3"
                                    key={i}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                className="w-12 h-12 rounded-full"
                                                src="https://avatars.dicebear.com/api/adventurer/dylannkent.svg"
                                                alt=""
                                            />
                                            <div>
                                                <div className="font-bold text-gray-700 dark:text-white">
                                                    Dylann Kent
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    HVJqBuGymzQWAM7JwixLvQcVSZ6rKowvo3j7eH1yScHN
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Sept 11
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 my-2 w-3/4">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Sit ea tempora dolores
                                        qui eius pariatur odit ad voluptas iste
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// RequestsToMe.getLayout = function getLayout(page) {
//     return <Layout>{page}</Layout>;
// };
