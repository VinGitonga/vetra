
const FolderCard = ({ title, Icon }) => {
    return (
        <div className="p-4 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
            <a
                href="#"
                className="flex items-center p-2 text-blue-500 capitalize transition-colors duration-300 transform bg-blue-100 rounded-full rtl:-scale-x-100 dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500"
            >
                <Icon className="w-36 h-36" />
            </a>
            <h1 className="pl-2 text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                {title}
            </h1>
        </div>
    );
};

export default FolderCard;

