import { Dropdown } from "flowbite-react";

export default function ResponseItem({ reply, timeAgo }) {
    return (
        <div className="rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 ml-4 my-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img
                        className="w-12 h-12 rounded-full"
                        src={`https://avatars.dicebear.com/api/adventurer/${reply?.replyAuthor
                            ?.toLowerCase()
                            ?.replaceAll(" ", "")}.svg`}
                        alt=""
                    />
                    <div>
                        <div className="font-bold text-gray-700 dark:text-white">
                            {reply?.replyAuthor}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {reply?.authority?.toString()}
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {timeAgo.format(
                        new Date(reply?.replyTime * 1000),
                        "twitter-now"
                    )}
                </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 my-2 w-3/4">
                {reply.replyMsg}
            </p>
            {reply.documentCid && (
                <div className="mt-4">
                    <DropdownMenu label={reply.documentName} />
                </div>
            )}
        </div>
    );
}

const DropdownMenu = ({ label }) => (
    <Dropdown label={label}>
        <Dropdown.Item>Download</Dropdown.Item>
        <Dropdown.Item>Save to My Files</Dropdown.Item>
    </Dropdown>
);
