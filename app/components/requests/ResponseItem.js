export default function ResponseItem() {
    return (
        <div className="rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 ml-4 my-3">
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ea
                tempora dolores qui eius pariatur odit ad voluptas iste
            </p>
        </div>
    );
}
