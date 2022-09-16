import { useState } from "react";
import { useNewMoralisObject } from "react-moralis";
import useToast from "./useToast";
import { useWallet } from "@solana/wallet-adapter-react";

const useMoralisDB = () => {
    const toast = useToast();
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");
    const { save: saveNewFolder } = useNewMoralisObject("Folder");
    const wallet = useWallet();

    async function createFolder(displayName) {
        if (!wallet.connected) {
            toast("error", "Connect your wallet first to create folder");
            return;
        }

        const data = {
            displayName: displayName,
            ownerAddress: wallet.publicKey.toString(),
            allowedAddresses: [wallet.publicKey.toString()],
        };

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

    return { createFolder };
};

export default useMoralisDB;
