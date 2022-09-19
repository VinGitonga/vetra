import { useState, useEffect } from "react";
import RequestItem from "../components/requests/RequestItem";
import useRequests from "../hooks/useRequests";
import useAuth from "../hooks/useAuth";
import Button from "../components/common/PrimaryButton";
import Head from "next/head"

export default function RequestsToMe() {
    const [requests, setRequests] = useState([]);
    const { hasAccount } = useAuth();
    const { getRequests, getReplies, newReply } = useRequests();

    async function fetchMyRequests() {
        let myrequests = await getRequests("receiver");
        setRequests(myrequests);
    }

    useEffect(() => {
        if (hasAccount) {
            fetchMyRequests();
        }
    }, [hasAccount]);


    return (
        <>
        <Head>
            <title>Requests Addressed to My Wallet | Vetra</title>
        </Head>
        <section
            className="bg-white dark:bg-gray-900"
            style={{ fontFamily: "Poppins" }}
        >
            <div className="container px-6 py-3 mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
                        File Requests To Me
                    </h1>
                    <Button
                        text={"Refresh Requests"}
                        isWidthFull={false}
                        onClick={fetchMyRequests}
                    />
                </div>
                <div className="mt-8">
                    {requests.length > 0 ? (
                        requests.map((request) => (
                            <RequestItem
                                request={request.account}
                                key={request.account.requestIndex}
                                getReplies={getReplies}
                                newReply={newReply}
                                refreshMyRequests={fetchMyRequests}
                            />
                        ))
                    ) : (
                        <div className="font-bold text-gray-700 dark:text-white">
                            No New Requests
                        </div>
                    )}
                </div>
            </div>
        </section>
        </>
    );
}
