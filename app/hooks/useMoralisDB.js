import { useState, useEffect } from "react";
import { useNewMoralisObject, useMoralisQuery } from "react-moralis";
import useToast from "./useToast";
import { useWallet } from "@solana/wallet-adapter-react";

const useMoralisDB = () => {
    const toast = useToast();
    const { save: saveNewFolder } = useNewMoralisObject("Folder");
    const wallet = useWallet();

    async function createFolder(displayName) {

        if (!wallet.connected){
            toast("error", "Connect your wallet first to create folder")
            return
        }

        const data = {
            displayName: displayName,
            ownerAddress: wallet.publicKey.toString(),
            allowedAddresses: [wallet.publicKey.toString()],
        };

        saveNewFolder(data, {
            onSuccess: (folder) => {
                console.log(folder);
                toast(
                    "success",
                    `${displayName} Folder has been created successfully`
                );
            },
            onError: (error) => {
                console.log(error);
                toast("error", "An error was encountered");
            },
        });
    }

    
    return { createFolder };
};

export default useMoralisDB;
