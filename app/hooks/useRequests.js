import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { SOLANA_HOST } from "../utils/constants";
import { getProgramInstance, filterRequests } from "../utils/utils";

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
            wallet.publicKey,
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
            await program.state.rpc.createState({
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

        // make the create new request transaction
        const tx = await program.state.rpc.createRequest(
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

    const newReply = async (
        index,
        count,
        msgTxt,
        author,
        document_name,
        document_cid
    ) => {
        let [request_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("request"),
                new BN(index).toArrayLike(Buffer, "be", 8),
            ],
            program.programId
        );

        let [reply_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("reply"),
                new BN(index).toArrayLike(Buffer, "be", 8),
                new BN(count).toArrayLike(Buffer, "be", 8),
            ],
            program.programId
        );

        const tx = await program.state.rpc.createReply(
            msgTxt,
            author,
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

    const getReplies = async (index, count) => {
        let replySigners = [];

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
