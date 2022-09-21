import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { SOLANA_HOST } from "../utils/constants";
import { getProgramInstance, filterRequests } from "../utils/utils";
import useAuth from "../hooks/useAuth";

const anchor = require("@project-serum/anchor");
const utf8 = anchor.utils.bytes.utf8;
const { BN, web3 } = anchor;
const { SystemProgram } = web3;

const defaultAccount = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId,
};

const useRequests = () => {
    const wallet = useWallet();
    const { authUser } = useAuth();
    const connection = new anchor.web3.Connection(SOLANA_HOST);
    const program = getProgramInstance(connection, wallet);

    /**
     * Get requests addressed to a certain wallet address or that belong a given wallet address
     * @param filterType "myrequests" | "receiver"
     */
    const getRequests = async (filterType) => {
        const allRequests = await program.account.requestAccount.all();
        console.log("All Requests");
        console.log(allRequests);
        const filteredRequests = filterRequests(
            allRequests,
            wallet?.publicKey?.toString(),
            filterType
        );

        console.log("Filtered requests");
        console.log(filteredRequests);
        return filteredRequests;
    };

    /**
     *
     * @param {*} message e.g "Share New Docs"
     * @param {*} author e.g "Mark Jessen"
     * @param {*} addressTo e.g "HVJqBuGymzQWAM7JwixLvQcVSZ6rKowvo3j7eH1yScHN"
     * @returns tx
     */
    const newRequest = async (message, author, addressTo) => {
        // init state program derived address to keep track of requests created to make it easier to track requests
        let [state_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode("state")],
            program.programId
        );

        let stateInfo;

        /**
         * Check if the state is created or not.
         * If not create new state
         */

        try {
            stateInfo = await program.account.stateAccount.fetch(state_pda);
            console.log(stateInfo);
        } catch {
            await program.rpc.createState({
                accounts: {
                    state: state_pda,
                    authority: wallet.publicKey,
                    ...defaultAccount,
                },
            });
            return;
        }

        // refetch pda since we are sure an actual state account exists
        stateInfo = await program.account.stateAccount.fetch(state_pda);

        // fetch request pda in order to create request
        let [request_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("request"),
                stateInfo.requestCount.toArrayLike(Buffer, "be", 8),
            ],
            program.programId
        );
        // convert the address to (wallet address) to string
        const addressToPubkey = new PublicKey(addressTo);

        // make the create new request trans;
        const tx = await program.rpc.createRequest(
            message,
            author,
            addressToPubkey,
            {
                accounts: {
                    state: state_pda,
                    request: request_pda,
                    authority: wallet.publicKey,
                    ...defaultAccount,
                },
            }
        );

        console.log(tx);
    };

    /**
     * This function sends a new reply to a File message request and may or maynot include a file document
     * @param {*} index Request index of current Request item
     * @param {*} count The no of responses in the Request Item
     * @param {*} msgTxt The text message to be sent as a response
     * @param {*} document_name name of file being sent
     * @param {*} document_cid Content Identifier of the file being sent or shared so that the recipient party can easily download or save to their files
     */

    const newReply = async (
        index,
        count,
        msgTxt,
        document_name,
        document_cid
    ) => {
       
        console.log("docname", document_name);
        console.log("doccid", document_cid);
        // fetch the request program derived address in order to make it easier to retrieve each and every request
        let [request_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("request"),
                new BN(index).toArrayLike(Buffer, "be", 8),
            ],
            program.programId
        );

        // get reply pda instance in order to sent the new response
        let [reply_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("reply"),
                new BN(index).toArrayLike(Buffer, "be", 8),
                new BN(count).toArrayLike(Buffer, "be", 8),
            ],
            program.programId
        );

        // Start the new response transaction using the current request item instance and reply and sign transaction
        const tx = await program.rpc.createReply(
            msgTxt,
            authUser?.name,
            document_name,
            document_cid,
            {
                accounts: {
                    request: request_pda,
                    reply: reply_pda,
                    authority: wallet.publicKey,
                    ...defaultAccount,
                },
            }
        );

        console.log(tx);
    };

    /**
     * 
     * @param {*} index The Request Index
     * @param {*} count The no of responses in the current Request instance
     * @returns replies[] -- Array of all response for a given Request
     */

    const getReplies = async (index, count) => {
        let replySigners = [];

        // fetch all responses signers and save them in array 
        for (let i = 0; i < count; i++) {
            let [replySigner] = await anchor.web3.PublicKey.findProgramAddress(
                [
                    utf8.encode("reply"),
                    new BN(index).toArrayLike(Buffer, "be", 8),
                    new BN(i).toArrayLike(Buffer, "be", 8),
                ],
                program.programId
            );

            replySigners.push(replySigner);
        }

        // fetch all responses for a given request item and filter them also.

        const replies = await program.account.replyAccount.fetchMultiple(
            replySigners
        );

        // in case there are null values remove
        let filteredReplies = replies.filter((item) => item !== null);

        // sort replies by time
        filteredReplies.sort(
            (a, b) => b?.replyTime?.toNumber() - a?.replyTime?.toNumber()
        );

        return filteredReplies;
    };

    return { getRequests, newRequest, newReply, getReplies };
};

export default useRequests;
