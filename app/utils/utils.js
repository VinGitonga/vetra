import * as anchor from "@project-serum/anchor";
import { VETRA_IDL, VETRA_PROGRAM_ID } from "./constants";
import prettyBytes from "pretty-bytes";
import { makeStorageClient } from "./storage";


export function getProgramInstance(connection, wallet) {
    // get the provider

    const provider = new anchor.AnchorProvider(
        connection,
        wallet,
        anchor.AnchorProvider.defaultOptions()
    );

    // set the idl
    const idl = VETRA_IDL;

    // get program id of the deployed program
    const programId = VETRA_PROGRAM_ID;

    // instantiate a new program instance
    const program = new anchor.Program(idl, programId, provider);

    return program;
}


export function filterRequests(requests, walletAddress, filterType) {
    let newRequests = requests.filter((item) => {
        if (filterType === "myrequests") {
            return (
                item?.account?.authority?.toString() === walletAddress?.toString()
            );
        } else if (filterType === "receiver") {
            return (
                item?.account?.requestAddressTo?.toString() ===
                walletAddress?.toString()
            );
        }
    });

    // sort the retrieved array by request time
    newRequests.sort(
        (a, b) =>
            b.account.requestTime.toNumber() - a.account.requestTime.toNumber()
    );

    return newRequests;
}

export const getDateAdded = (addedAt) => new Date(addedAt).toLocaleString();
export const getSlicedAddress = (address) =>
    `${address.slice(0, 6)}.....${address.slice(-6)}`;
export const getFileSize = (fileSize) => prettyBytes(fileSize);
export const getFileExtension = (filename) => filename.split(".").pop().toUpperCase();

export async function retrieveFiles(cid) {
    let allFiles = []
    const client = makeStorageClient()
    try {
        const res = await client.get(cid).catch(err => console.log(err))
    
        console.log(`Got a response! [${res.status}] ${res.statusText}`)
    
        if (!res.ok){
            throw new Error(`Failed to get ${cid} - [${res.status}] ${res.statusText}`)
        }
    
        // unpack File Objects from the response
        const files = await res.files()
        for (const file of files){
            let fileObj = {
                name: file.name,
                cid: file.cid.toString(),
                size: file.size
            }
            allFiles.push(fileObj)
        }
    } catch(err){
        console.log(err)
    }

    console.log(allFiles)

    return allFiles
}