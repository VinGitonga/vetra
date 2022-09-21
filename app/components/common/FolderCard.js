import { useRouter } from "next/router";

const FolderCard = ({
    title,
    Icon,
    iconWidth = "w-36",
    iconHeight = "h-36",
    isSelect = false,
    hrefPath,
}) => {
    const router = useRouter();
    return (
        <div
            className="p-4 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl cursor-pointer"
            onClick={() => router.push(`/${hrefPath}`)}
        >
            <a
                className={`flex items-center p-2 text-blue-500 capitalize transition-colors duration-300 transform bg-blue-100 rounded-full rtl:-scale-x-100 dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500 ${
                    isSelect && "peer-checked:text-blue-700"
                }`}
            >
                <Icon className={`${iconWidth} ${iconHeight}`} />
            </a>
            <h1 className="pl-2 text-2xl font-semibold text-gray-700 capitalize dark:text-white">
                {title}
            </h1>
        </div>
    );
};

export default FolderCard;
