import { Web3Storage } from "web3.storage";

function getAccessToken() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDM5NDdmMGVGQjAzYzVkOEFkQjU3NjY4M0JBZTE4MmI4YkJCNkYwNDMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI4NzY5MzY1NTksIm5hbWUiOiJ2ZXRyYSJ9.yC3Ktriei_oH-fsqugJoY2ZfJsE346aAi6Rt7z11nbE";
}

export function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
}
