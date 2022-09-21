import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useState } from "react";
import ResponseInput from "./ResponseInput";
import Button from "../common/PrimaryButton";
import SelectFile from "../dialogs/SelectFile";
import Badge from "../common/Badge";
import useToast from "../../hooks/useToast";
import ResponseItem from "./ResponseItem";
import useMoralisDB from "../../hooks/useMoralisDB";

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-US");

export default function RequestItem({
    request,
    getReplies,
    newReply,
    refreshMyRequests,
}) {
    const [replies, setReplies] = useState([]);
    const [showResponses, setShowResponses] = useState(false);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showFileModal, setShowFileModal] = useState(false);
    const [documentName, setDocumentName] = useState("");
    const [documentCid, setDocumentCid] = useState("");
    const [userFiles, setUserFiles] = useState([]);
    const toast = useToast();
    const { getUserFiles } = useMoralisDB();

    const handleShowHideReplies = (show) => {
        if (!show) {
            fetchReplies();
        }
        setShowResponses(!show);
    };

    async function fetchUserFiles() {
        let files = await getUserFiles();
        setUserFiles(files);
    }

    const fetchReplies = async () => {
        let responses = await getReplies(
            request?.requestIndex,
            request?.replyCount
        );
        setReplies(responses);
    };

    const closeModal = () => {
        setShowFileModal(false);
    };

    const showModal = () => {
        fetchUserFiles();
        setShowFileModal(true);
    };

    const removeSelectedFile = () => setSelectedFile(null);

    const resetFields = () => {
        setMsg("");
        setSelectedFile(null);
    };

    function addDocDetails(fileDetails) {
        console.log("Hiii")
        setDocumentName(fileDetails?.originalName);
        setDocumentCid(fileDetails?.fileCid);
    }

    const submitResponse = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!msg) {
            toast("error", "Please fill all the fields");
            setLoading(false);
            return;
        } else {
            try {
                console.log(selectedFile)
                if (selectedFile){
                    setDocumentName(selectedFile?.get("originalName"))
                    setDocumentCid(selectedFile?.get("fileCid"))
                }
                console.log(documentName)
                console.log(documentCid)
                await newReply(
                    request.requestIndex,
                    request.replyCount,
                    msg,
                    documentName,
                    documentCid
                );
                toast("success", "Response sent successfully");
                setMsg("")
                setSelectedFile(null)
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    };

    console.log(replies);

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 mb-5">
            <SelectFile
                show={showFileModal}
                closeModal={closeModal}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                data={userFiles}
            />
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img
                        className="w-12 h-12 rounded-full"
                        src={`https://avatars.dicebear.com/api/adventurer/${request?.requestAuthor
                            ?.toString()
                            .toLowerCase()
                            .replaceAll(" ", "")}.svg`}
                        alt=""
                    />
                    <div>
                        <div className="font-bold text-gray-700 dark:text-white">
                            {request?.requestAuthor}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {request?.authority?.toString()}
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {timeAgo.format(
                        new Date(request?.requestTime * 1000),
                        "twitter-now"
                    )}
                </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 my-2 w-3/4">
                {request?.requestMsg}
            </p>
            <ResponseInput
                msg={msg}
                setMsg={setMsg}
                loading={loading}
                onClickSelectFile={showModal}
                onClickSubmit={submitResponse}
            />
            {selectedFile && (
                <Badge
                    text={selectedFile?.attributes?.displayName}
                    onClick={removeSelectedFile}
                />
            )}
            <div className="mt-4 flex justify-between items-center">
                <Button
                    text={`${showResponses ? "Hide" : "Show"} Responses`}
                    isWidthFull={false}
                    onClick={() => handleShowHideReplies(showResponses)}
                />
                <button
                    type="button"
                    onClick={fetchReplies}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                    Refresh Replies
                </button>
            </div>
            {showResponses && (
                <div className="mt-4">
                    {replies.length > 0 ? (
                        replies.map((reply) => (
                            <ResponseItem
                                reply={reply}
                                key={reply.replyIndex}
                                timeAgo={timeAgo}
                            />
                        ))
                    ) : (
                        <div className="font-bold text-gray-700 dark:text-white">
                            No Responses yet 😢
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
