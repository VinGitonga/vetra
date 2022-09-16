import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { SOLANA_HOST } from "../utils/constants";
import { getProgramInstance } from "../utils/utils";
import { useMoralisQuery } from "react-moralis";

const anchor = require("@project-serum/anchor");
const utf8 = anchor.utils.bytes.utf8;
const { BN, web3 } = anchor;
const { SystemProgram } = web3;

const defaultAccount = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId,
};

const useShare = (file_id) => {
    const wallet = useWallet();
    const connection = new anchor.web3.Connection(SOLANA_HOST);
    const program = getProgramInstance(connection, wallet);
    const { data: file } = useMoralisQuery("File", (query) =>
        query.equalTo("objectId", file_id)
    );

    const newFileShare = async (
        filename,
        ipfs_path,
        sent_to,
        file_size,
        shareType
    ) => {
        let [share_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode("share"), wallet.publicKey.toBuffer()],
            program.programId
        );

        await program.rpc.createShare(
            file_id,
            filename,
            ipfs_path,
            sent_to,
            new BN(file_size),
            {
                accounts: {
                    share: share_pda,
                    authority: wallet.publicKey,
                    ...defaultAccount,
                },
            }
        );

        if (shareType === "wallet") {
            file[0].addUnique("allowedAddresses", sent_to);
            await file[0].save();
        }
    };

    return { newFileShare };
};

export default useShare;
