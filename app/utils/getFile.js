import axios from "axios";

export async function getFile(cid) {
    const resp = await axios.get(`https://${cid}.ipfs.w3s.link`, {
        responseType: "blob",
        headers: {
            Accept: "application/json",
        },
    });
    console.log(resp);

    const type = resp.data.type;
    // get arrayBuffer
    const arrayBf = await resp.data.arrayBuffer();

    // get Blob
    const blob = new Blob([arrayBf], { type });

    const url = URL.createObjectURL(blob);

    return url;
}
