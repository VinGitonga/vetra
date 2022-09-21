import { useState } from "react";
import { useNewMoralisObject, useMoralis } from "react-moralis";
import useToast from "./useToast";
import { useWallet } from "@solana/wallet-adapter-react";
import useAuth from "./useAuth";

const useMoralisDB = () => {
    const toast = useToast();
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");
    const { save: saveNewFolder } = useNewMoralisObject("Folder");
    const { Moralis } = useMoralis()
    const wallet = useWallet();
    const { hasAccount, authUser } = useAuth()

    /**
     * Create new Folder and save its details on Moralis Database
     */

    async function createFolder(displayName) {
        if (!wallet.connected) {
            toast("error", "Connect your wallet first to create folder");
            return;
        } else if (!hasAccount){
            toast("error", "Create an account with Vetra");
            return;
        }

        const data = {
            displayName: displayName,
            ownerAddress: authUser.userWalletAddress.toString(),
            allowedAddresses: [],
        };

        /**
         * After getting folderInfo then save on db and show success or error messages respectively
         */
        saveNewFolder(data, {
            onSuccess: (folder) => {
                console.log(folder);
                setMsgType("success");
                setMsg(`${displayName} Folder has been created successfully`);
            },
            onError: (error) => {
                console.log(error);
                setMsgType("error");
                setMsg("An error was encountered while created the folder");
            },
        });

        return { msg, msgType };
    }

    /**
     * This function retrieves details of all files that belong to the logged in user and returns an array
     * @returns files[]
     */

    async function getUserFiles(){
        let files = []
        if (!wallet.connected) {
            toast("error", "Connect your wallet first to create folder");
            return;
        }

        try {
            const File = Moralis.Object.extend("File");
            const query = new Moralis.Query(File);
            query.equalTo(
                "allowedAddresses",
                wallet.publicKey.toString()
            );
            let results = await query.find();
            console.log("results", results);
            files = results
        } catch (err) {
            console.log(err);
        }

        return files;
    }

    return { createFolder, getUserFiles };
};

export default useMoralisDB;
