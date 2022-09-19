import { useNewMoralisObject, useMoralis } from "react-moralis";
import { makeStorageClient } from "../utils/storage";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import prettyBytes from "pretty-bytes";

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
    const [ipfsFiles, setIpfsFiles] = useState([]);

    async function retrieveFiles(cid) {
        let allFiles = [];
        const client = makeStorageClient();
        try {
            const res = await client.get(cid).catch((err) => console.log(err));

            console.log(`Got a response! [${res.status}] ${res.statusText}`);

            if (!res.ok) {
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
        setIpfsFiles(allFiles);
        return allFiles
    }

    const uploadFiles = async (files,
        folderId) => {
        let totalSize = files?.map((f) => f.size).reduce((a, b) => a + b, 0);

        const cid = await client.put(files, {
            onRootCidReady: (localCid) => {
                setProgressMsg(
                    `> 🔑 locally calculated Content ID: ${localCid} `
                );
                setProgressMsg("> 📡 sending files to web3.storage ");
            },

            // onStoredChunk is called after each chunk of data is uploaded
            onStoredChunk: (bytes) =>
                setProgressMsg(
                    `> 🛰 sent ${prettyBytes(parseInt(bytes))} / ${prettyBytes(
                        parseInt(totalSize)
                    )} to web3.storage`
                ),
        });

        getFolderForUpdate(folderId);
        setProgressMsg("Saving Details ...")
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

        // (await ipfsFiles).forEach(async (item) => {
        //     let ipfsPath = `${cid.toString()}/${item.name}`;
        //     let data = {
        //         originalName: item.name,
        //         displayName: item.name,
        //         size: item.size,
        //         initFolder: folderId,
        //         currentFolder: folderId,
        //         parentCid: cid.toString(),
        //         ipfsPath: ipfsPath,
        //         fileCid: item.cid.toString(),
        //         owner: wallet.publicKey.toString(),
        //         allowedAddresses: [wallet.publicKey.toString()],
        //     };
        //     saveFile(data, {
        //         onSuccess: async (file) => {
        //             console.log(file);
        //             file.set("currentParentFolder", folderObj);
        //             await file.save();
        //             setMsg(`${data.originalName} Uploaded successfully`);
        //             setMsgType("success");
        //             resetFields();
        //         },
        //         onError: (err) => {
        //             console.log(err);
        //             setMsg(
        //                 `An error was encountured while uploading ${data.originalName}`
        //             );
        //             setMsgType("error");
        //         },
        //     });
        // });
    };

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
