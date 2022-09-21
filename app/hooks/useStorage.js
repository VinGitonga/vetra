import { useNewMoralisObject, useMoralis } from "react-moralis";
import { makeStorageClient } from "../utils/storage";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import prettyBytes from "pretty-bytes";

/**
 * Custom Hook that facilitates Upload of documents and files on Decentralized Storage Web3.Storage
 */

const useStorage = (
    setMsg,
    setMsgType,
    resetFields,
    setProgressMsg
) => {
    const { save: saveFile } = useNewMoralisObject("File");
    const { Moralis } = useMoralis();
    const wallet = useWallet();
    const client = makeStorageClient();
    const [folderObj, setFolderObj] = useState(null);

    /**
     * Method that retrieves details of files sent to Web3.Storage after upload in order to get details and save them to Moralis Database
     * @param {*} cid of all files sent to IPFS
     * @returns Array[] -- All details of files sent
     */

    async function retrieveFiles(cid) {
        let allFiles = [];
        const client = makeStorageClient();
        try {
            const res = await client.get(cid).catch((err) => console.log(err));

            console.log(`Got a response! [${res.status}] ${res.statusText}`);

            if (!res.ok) {
                setProgressMsg("An error was encountered 😢, Please Try again!")
                throw new Error(
                    `Failed to get ${cid} - [${res.status}] ${res.statusText}`
                );
            }

            // unpack File Objects from the response
            const files = await res.files();
            for (const file of files) {
                let fileObj = {
                    name: file.name,
                    cid: file.cid.toString(),
                    size: file.size,
                };
                allFiles.push(fileObj);
            }
        } catch (err) {
            console.log(err);
        }
        console.log(allFiles);
        return allFiles
    }

    /**
     * This function facilitates the upload of files to Web3.Storage and saving its details Moralis Database
     * @param {*} files Array of files being uploaded
     * @param {*} folderId Id of the folder to save files into
     */

    const uploadFiles = async (files,
        folderId) => {
        let totalSize = files?.map((f) => f.size).reduce((a, b) => a + b, 0);

        const cid = await client.put(files, {
            onRootCidReady: (localCid) => {
                console.log(localCid)
                setProgressMsg(
                    `> 🔑 Calculating Storage ID `
                );
                setProgressMsg("> 📡 sending files to Decentralized Storage ");
            },

            // onStoredChunk is called after each chunk of data is uploaded
            onStoredChunk: (bytes) =>
                setProgressMsg(
                    `> 🛰 sent ${prettyBytes(parseInt(bytes))} / ${prettyBytes(
                        parseInt(totalSize)
                    )} to Decentralized Storage`
                ),
        });

        getFolderForUpdate(folderId);
        setProgressMsg("Saving Details ...")
        // Saving files details on Moralis By first retrieving details from Web3.Storage and then saving on Moralis Database
        await (await retrieveFiles(cid.toString())).forEach(async (item) => {
            let ipfsPath = `${cid.toString()}/${item.name}`;
            let data = {
                originalName: item.name,
                displayName: item.name,
                size: item.size,
                initFolder: folderId,
                currentFolder: folderId,
                parentCid: cid.toString(),
                ipfsPath: ipfsPath,
                fileCid: item.cid.toString(),
                owner: wallet.publicKey.toString(),
                allowedAddresses: [wallet.publicKey.toString()],
            };
            saveFile(data, {
                onSuccess: async (file) => {
                    console.log(file);
                    file.set("currentParentFolder", folderObj);
                    await file.save();
                    setMsg(`${data.originalName} Uploaded successfully`);
                    setMsgType("success");
                    resetFields();
                },
                onError: (err) => {
                    console.log(err);
                    setMsg(
                        `An error was encountured while uploading ${data.originalName}`
                    );
                    setMsgType("error");
                },
            });
        });

       
    };

    /**
     * This method retrieves the folder and saves the folder to File and a child (embended Object)
     */

    async function getFolderForUpdate(folderId) {
        const Folder = Moralis.Object.extend("Folder");
        const query = new Moralis.Query(Folder);

        query.get(folderId).then(
            (folder) => setFolderObj(folder),
            (error) => console.log(error)
        );
    }

    return { uploadFiles };
};

export default useStorage;
