import { useNewMoralisObject } from "react-moralis";
import { makeStorageClient } from "../utils/storage";
import { create } from "ipfs-http-client";
import { useWallet } from "@solana/wallet-adapter-react";

const useStorage = (
    setUploadProgress,
    files,
    folderId,
    setMsg,
    setMsgType,
    resetFields
) => {
    const { save: saveFile } = useNewMoralisObject("File");
    const wallet = useWallet();
    const client = makeStorageClient();

    const uploadFiles = async () => {
        const onRootCidReady = (cid) => {
            console.log(`Uploading files with cid: ${cid}`);
        };

        let totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
        let uploaded = 0;

        const onStoredChunk = (size) => {
            uploaded += size;
            const pct = Math.floor(100 * (uploaded / totalSize));
            setUploadProgress(pct);
            console.log(`Uploading ... ${pct}`);
        };

        const cid = client.put(files, { onRootCidReady, onStoredChunk });

        const fileLinks = getFileLinks((await cid).toString());

        (await fileLinks).forEach(async (item) => {
            let data = {
                originalName: item.name,
                displayName: item.name,
                size: item.size,
                initFolder: folderId,
                currentFolder: folderId,
                parentCid: (await cid).toString(),
                ipfsPath: item.path,
                fileCid: item.cid.toString(),
                owner: wallet.publicKey.toString(),
                allowedAddresses: [wallet.publicKey.toString()],
            };
            saveFile(data, {
                onSuccess: (file) => {
                    console.log(file);
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

    async function getFileLinks(ipfsPath) {
        // console.log(ipfsPath)
        const url = "https://dweb.link/api/v0";
        const ipfs = create({ url });

        const links = [];
        for await (const link of ipfs.ls(ipfsPath)) {
            links.push(link);
        }

        return links;
    }

    return { uploadFiles };
};

export default useStorage;
