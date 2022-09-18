use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};
use std::mem::size_of;

declare_id!("74HrdaZXYxhozpW85ZicG1pJm4Fkf6PrxdPENeHXsXgK");

// Constants
const USER_NAME_LENGTH: usize = 50;
const USER_EMAIL_LENGTH: usize = 100;
const MAX_REQUEST_MSG_LEN: usize = 1024;
const DOCUMENT_CID_LEN: usize = 255;
const FILENAME_LEN: usize = 100;
const FILE_ID: usize = 20;

#[program]
pub mod vetra {
    use super::*;

    // Create new state if none exists
    pub fn create_state(
        ctx: Context<CreateState>
    ) -> Result<()> {
        // retrieve the state from context
        let state = &mut ctx.accounts.state;

        // Save the authority to state
        state.authority = ctx.accounts.authority.key();

        // Init the request count
        state.request_count = 0;

        // init the share count
        state.share_count = 0;

        // return success
        Ok(())
    }

    // Create new user account
    pub fn create_user(
        ctx: Context<CreateUser>,
        name: String,
        email: String,
    ) -> Result<()> {
        // get user struct from context
        let user = &mut ctx.accounts.user;

        // set the user_wallet_address as the user who authorized the transaction
        user.user_wallet_address = ctx.accounts.authority.key();

        // set the user name
        user.name = name;
        // set the email address
        user.email = email;

        // return success
        Ok(())
    }

    // Create new document request
    pub fn create_request(
        ctx: Context<CreateRequest>,
        msg: String,
        author: String,
        addressed_to: Pubkey,
    ) -> Result<()> {
        // get state
        let state = &mut ctx.accounts.state;
        // get request account from context
        let request = &mut ctx.accounts.request;

        // set request authorizer as the wallet address that authorized the transaction
        request.authority = ctx.accounts.authority.key();
        // set the msg being sent
        request.request_msg = msg;
        // set the author of the request
        request.request_author = author;
        // set the request address to -- recipient
        request.request_address_to = addressed_to;
        // set the request index as the state index
        request.request_index = state.request_count;
        // set the time the request was made
        request.request_time = ctx.accounts.clock.unix_timestamp;

        // Now increment the request by 1 since one more request has been made
        state.request_count += 1;

        // return success
        Ok(())
    }

    // create new response for the document either msg with document or msg only
    pub fn create_reply(
        ctx: Context<CreateReply>,
        msg: String,
        author: String,
        document_name: String,
        document_cid: String,
    ) -> Result <()> {
        let request = &mut ctx.accounts.request;
        // get the reply account from context
        let reply = &mut ctx.accounts.reply;
        // set the reply authorizer
        reply.authority = ctx.accounts.authority.key();
        // set the msg
        reply.reply_msg = msg;
        // set the author of the reply msg or document
        reply.reply_author = author;
        // set document name if any otherwise an empty string
        reply.document_name = document_name;
        // set document cid if any otherwise an empty string
        reply.document_cid = document_cid;
        // set reply index
        reply.reply_index = request.reply_count;
        // set the timestamp for the reply
        reply.reply_time = ctx.accounts.clock.unix_timestamp;
        
        // Increment the reply count in the request
        request.reply_count += 1;

        // return success
        Ok(())
    }

    // create a share for a document present in our web3 storage with a wallet address or email address
    pub fn create_share (
        ctx: Context<CreateShare>,
        file_id: String,
        filename: String,
        ipfs_path: String,
        sent_to: String,
        file_size: String,
    ) -> Result<()> {
        // get state acc from context
        let state = &mut ctx.accounts.state;
        // get share account from context
        let share = &mut ctx.accounts.share;

        // populate the share account
        share.owner_address = ctx.accounts.authority.key();
        share.file_id = file_id;
        share.filename = filename;
        share.ipfs_path = ipfs_path;
        share.sent_to = sent_to;
        share.file_size = file_size;
        share.share_time = ctx.accounts.clock.unix_timestamp;

        state.share_count += 1;

        Ok(())
    }
}

// Create State
#[derive(Accounts)]
pub struct CreateState<'info> {
    // Auth the state account
    #[account(
        init,
        seeds = [b"state".as_ref()],
        bump,
        payer = authority,
        space = size_of::<StateAccount>() + 8 // size of state account and discriminator
    )]

    pub state: Account<'info, StateAccount>,

    // Authorize the create state transaction
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program
    pub system_program: Program<'info, System>,
}

// Create a new user Account
#[derive(Accounts)]
pub struct CreateUser<'info> {
    // Authenticate the user account
    #[account(
        init,
        seeds = [b"user".as_ref(), authority.key().as_ref()],
        bump,
        payer = authority,
        space = size_of::<UserAccount>() + USER_EMAIL_LENGTH + USER_NAME_LENGTH + 8, // allocate space for the contract and include 8 bytes for the discriminator
    )]
    pub user: Account<'info, UserAccount>,
    // Authorize the create user transaction
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program for solana
    pub system_program: Program<'info, System>,

    // Save token program generated by spl_token
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // take the clock for saving timestamp for the user creation time
    pub clock: Sysvar<'info, Clock>,
}

// Struct for Creating new Request for a document
#[derive(Accounts)]
pub struct CreateRequest<'info>{
    // Authenticate the state account
    #[account(
        mut,
        seeds = [b"state".as_ref()],
        bump,
    )]
    pub state: Account<'info, StateAccount>,

    // init the request account
    #[account(
        init,
        seeds = [b"request".as_ref(), state.request_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<RequestAccount>() + USER_NAME_LENGTH + USER_EMAIL_LENGTH + MAX_REQUEST_MSG_LEN + 8 + 32,
    )]
    pub request: Account<'info, RequestAccount>,
    // Auth the create new request transaction
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program
    pub system_program: Program<'info, System>,

    // save token from spl_token
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // create clock instanse for saving request creation timestamp
    pub clock: Sysvar<'info, Clock>,
}

// Create a new reply message
#[derive(Accounts)]
pub struct CreateReply<'info> {
    // Auth the request account
    #[account(
        mut,
        seeds = [b"request".as_ref(), request.request_index.to_be_bytes().as_ref()],
        bump,
    )]
    pub request: Account<'info, RequestAccount>,

    // Init new reply msg account
    #[account(
        init,
        seeds = [b"reply".as_ref(), request.request_index.to_be_bytes().as_ref(), request.reply_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<ReplyAccount>() + USER_NAME_LENGTH + USER_EMAIL_LENGTH + 8 + 32 + MAX_REQUEST_MSG_LEN + DOCUMENT_CID_LEN,
    )]
    pub reply: Account<'info, ReplyAccount>,
    // Authorize create reply msg transaction
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program
    pub system_program: Program<'info, System>,

    // Save token program retrieved from spl_token
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // init clock instance to save reply msg timestamp
    pub clock: Sysvar<'info, Clock>,
}

// Create a new sharing document transaction
#[derive(Accounts)]
pub struct CreateShare<'info> {
    // Authenticate the state account
    #[account(
        mut,
        seeds = [b"state".as_ref()],
        bump,
    )]
    pub state: Account<'info, StateAccount>,

    // init new share account
    #[account(
        init,
        seeds = [b"share".as_ref(), state.share_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<ShareAccount>() + FILENAME_LEN + FILE_ID + DOCUMENT_CID_LEN + USER_EMAIL_LENGTH + 8 + 32,
    )]
    pub share: Account<'info, ShareAccount>,
    // authorize transaction
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program
    pub system_program: Program<'info, System>,

    // save token
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // take clock for saving  share timestamp
    pub clock: Sysvar<'info, Clock>,
}

// State Account
#[account]
pub struct StateAccount {
    // Signer address
    pub authority: Pubkey,
    // request count - keeps track of the requests made
    pub request_count: u64,
    // tracks document shares by each account
    pub share_count: u64,
}

// User Account
#[account]
pub struct UserAccount {
    // user wallet address
    pub user_wallet_address: Pubkey,
    // email of the user
    pub email: String,
    // name of the user or organization
    pub name: String,
}

// Request Account
#[account]
pub struct RequestAccount {
    // Authority
    pub authority: Pubkey,
    // msg
    pub request_msg: String,
    // request creator
    pub request_author: String,
    // reply count -- keeps track on the replies made on a given request
    pub reply_count: u64,
    // init request index
    pub request_index: u64,
    // recipient wallet address -- target wallet to request docs or info
    pub request_address_to: Pubkey,
    // time the request was made
    pub request_time: i64,
}

// Reply Account -- this rep the reply msg for a particular request made to a given request may contain a document cid
#[account]
pub struct ReplyAccount {
    // authority
    pub authority: Pubkey,
    // msg
    pub reply_msg: String,
    // document name
    pub document_name: String,
    // document cid
    pub document_cid: String,
    // author of the msg
    pub reply_author: String,
    // index of reply item
    pub reply_index: u64,
    // time the reply was made
    pub reply_time: i64,
}

// Share Account
// This account describes the share document transaction to either email address or wallet address

#[account]
pub struct ShareAccount {
    // owner-address - the owner of the document making the sharing transaction
    owner_address: Pubkey,
    // id of the file being shared (usually stored in Web3Storage and its details saved on Moralis Database)
    file_id: String,
    // filename - name of file being shared -- usually the same name as that in web3Storage
    filename: String,
    // ipfsPath
    ipfs_path: String,
    // sent_to : wallet address or email address
    sent_to: String,
    // file size
    file_size: String,
    // time the file was sent
    share_time: i64,
}