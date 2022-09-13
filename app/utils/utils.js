import * as anchor from "@project-serum/anchor"
import { VETRA_IDL, VETRA_PROGRAM_ID } from "./constants"

export function getProgramInstance(connection, wallet){
    // get the provider

    const provider = new anchor.AnchorProvider(
        connection,
        wallet,
        anchor.AnchorProvider.defaultOptions()
    )

    // set the idl
    const idl = VETRA_IDL

    // get program id of the deployed program
    const programId = VETRA_PROGRAM_ID

    // instantiate a new program instance
    const program = new anchor.Program(idl, programId, provider);

    return program;
}
