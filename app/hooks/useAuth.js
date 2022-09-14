import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { SOLANA_HOST } from "../utils/constants";
import { getProgramInstance } from "../utils/utils";
import { useState, useEffect } from "react";

const anchor = require("@project-serum/anchor");
const utf8 = anchor.utils.bytes.utf8;
const { web3 } = anchor;
const { SystemProgram } = web3;

// declare default account options
const defaultAccount = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId,
};

const useAuth = () => {
    const wallet = useWallet();

    const connection = new anchor.web3.Connection(SOLANA_HOST);
    const program = getProgramInstance(connection, wallet);

    const [authUser, setAuthUser] = useState(null);
    const [hasAccount, setHasAccount] = useState(false);

    const signup = async (name, email) => {
        let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode("user"), wallet.publicKey.toBuffer()],
            program.programId
        );

        // create the user account on solana
        await program.rpc
            .createUser(name, email, {
                accounts: {
                    user: user_pda,
                    authority: wallet.publicKey,
                    ...defaultAccount,
                },
            })
    };

    const checkAccount = async () => {
        let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode("user"), wallet.publicKey.toBuffer()],
            program.programId
        );

        // Check if the connected wallet has an account already created
        try {
            const userInfo = await program.account.userAccount.fetch(user_pda);
            // log userInfo retrieved
            setAuthUser(userInfo);
            setHasAccount(true);
        } catch (err) {
            console.log(err);
            setHasAccount(false); // set to false as no account found
        }
    };

    useEffect(() => {
        if (wallet.connected) {
            checkAccount();
        }
    }, [wallet.connected]);

    // return signup method, user details and and auth status
    return { signup, authUser, hasAccount, setHasAccount };
};

export default useAuth;
