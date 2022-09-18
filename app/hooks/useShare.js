import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { SOLANA_HOST } from "../utils/constants";
import { getProgramInstance } from "../utils/utils";
import { useMoralisQuery } from "react-moralis";

const anchor = require("@project-serum/anchor");
const utf8 = anchor.utils.bytes.utf8;
const { web3 } = anchor;
const { SystemProgram } = web3;

const defaultAccount = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId,
};

const useShare = (setMsgType, setMsg) => {
    const wallet = useWallet();
    const connection = new anchor.web3.Connection(SOLANA_HOST);
    const program = getProgramInstance(connection, wallet);
    

    const newFileShare = async (
        file_id,
        filename,
        ipfs_path,
        sent_to,
        file_size,
    ) => {
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

        let [share_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("share"),
                stateInfo.shareCount.toArrayLike(Buffer, "be", 8),
            ],
            program.programId
        );

        const tx = await program.rpc.createShare(
            String(file_id),
            String(filename),
            String(ipfs_path),
            String(sent_to),
            String(file_size),
            {
                accounts: {
                    state: state_pda,
                    share: share_pda,
                    authority: wallet.publicKey,
                    ...defaultAccount,
                },
            }
        );
        
        console.log(tx)
    

    };

    const fetchMyShareTransactions = async () => {
        const allShares = await program.account.shareAccount.all();
        return allShares
    }

    return { newFileShare, fetchMyShareTransactions };
};

export default useShare;
