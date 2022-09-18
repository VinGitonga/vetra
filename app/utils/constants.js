import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import vetra from "./vetra.json";

export const SOLANA_HOST = clusterApiUrl("devnet");

export const VETRA_PROGRAM_ID = new PublicKey(vetra.metadata.address)

export const VETRA_IDL = vetra;
