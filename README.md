# Vetra Cloud

Vetra Cloud is a decentralized app that allows individuals and institutions with wallet addresses to store, retrieve and share files in decentralized storage while incorporating Web3 and blockchain capabilities.

## Inspiration 💡

Nowadays, individuals and most institutions rely on centralized storage providers to store and access their files and sensitize documents securely.
However, most of these services are offered at a subscription fee in order to access and store files.

For example, medical facilities and institutions rely on 3rd party cloud storage providers to keep their documents safe in a centralized manner. At times when a patient is being transfered to access advanced medical care, these facilities need to quickly access and transfer documents to the other institutions. Most of the time, they opt to use traditional methods such as Fax to securely transfer documents to the other institution.

As a result, such facilities and many other institutions not only need a secure decentralized infrastructure to keep their files safe but also a reliable protocol that allows them to quickly access and transfer their documents and files to other facilities or individuals that need access.

With the evolvement of web3 technologies and promotion of decentralized storages, such systems can be developed and hosted on blockchain with little to no monthly costs while reducing the risks of being denied access to data and also providing a reliable and secure system to transfer documents to other parties.

## Screenshots

**Homepage**

[![s9nc0l.md.png](https://iili.io/s9nc0l.md.png)](https://iili.io/s9nc0l.md.png)

**Dashboard**

[![s9o0CJ.md.png](https://iili.io/s9o0CJ.md.png)](https://iili.io/s9o0CJ.md.png)

**Files Upload**

[![s9oPje.md.png](https://iili.io/s9oPje.md.png)](https://iili.io/s9oPje.md.png)

**File Share**

[![s9xVPj.md.png](https://iili.io/s9xVPj.md.png)](https://iili.io/s9xVPj.md.png)

**Decentralized chat for file requests**

[![s9xSVa.md.png](https://iili.io/s9xSVa.md.png)](https://iili.io/s9xSVa.md.png)

## System Architecture
[![iytlSV.jpg](https://iili.io/iytlSV.jpg)](https://iili.io/iytlSV.jpg/)


## Overview

**Authentication and Onboarding**
At first User first visits [VetraCloud](https://vetra.vercel.app). User is supposed to connect any Solana based wallet. In this case, Vetra Cloud supports Solflare and Phantom wallets. Upon connecting their wallet, system automatically detects if they have an account stored on Solana blockchain, If not User redirects to Registration page where the user is onboarded using just their email and username of choice and details saved on Solana blockchain, otherwise system redirects to Dashboard Page.

A registered user can be to enjoy decentralized services on Vetra Cloud. User can Create a new folder whereby they can be able to store files and keep track of them easily.

**File Upload**

An authenticated User or Institution with a wallet address can upload their files on Vetra Cloud, they can drag and drop files or choose files from their local machines and upload. On uploading, the files are sent to decentralized storage via Web3.Storage, Content Identifier (CID) is generated. Once upload is complete, the details of the files are retrieved from IPFS through Web3.Storage client library and the details obtained are saved on Moralis Database. Each file uploaded, its details are saved on Moralis Database with the wallet address as the owner of the file(s).

**Files Retrieval**

Files uploaded on decentralized storage can be easily retrieved since their details are kept on Moralis Database. When a User or Institution Wallet is authenticated on to Vetra Cloud, the wallet address is used to retrieve files associated with it. Each wallet address can be able to retrieve files it uploaded by querying Moralis database for all files associated with the wallet address. 

On the Sidebar, User on Vetra Cloud can access "My Files", all files user uploaded. User can be able to download the archived files, share the files with other wallet addresses without having to download the files even sharing to email address is possible by sharing file links which contain unique id to file for download.

Also User or Institution connected with their wallet can be able to access all the files that other addresses have allowed access to. They can be to Download and also share with others. But the initial wallet that uploaded the file remains the owner address. 

**File Sharing**

An authenticated wallet on Vetra Cloud can be able to Share files uploaded on decentralized cloud easily. User clicks the Share button on the dropdown button and is requested to enter any valid Solana wallet address. Once done, User is prompted to confirm by signing the transaction using their wallets and some gas fees. Once its done, the share transaction is stored on Solana blockchain and also another transaction is sent to Moralis Database to include the wallet to access the file being shared


**Requesting Files**

Requesting files using a wallet address on blockchain has never been easier.
This features is really useful especially for institutions. In this case medical facilities, many are the times when patient are admitted to hospitals and require advance medicare care.
In this case they may use Vetra Cloud to request and send medical files and documents to other institution in a secure manner.
Admin in hospital A can send a formal medical document request to hospital B by just using their wallet address.

Admin in Hospital B can in turn attach a file that has been archived on decentralized storage. Hospital B admin sends the document together with a message to A. Document CID is embeded on the Solana smart contract and the Hospital A can immedietly download or save file to its storage on Vetra by access to file.

Requesting and Responding to file requests can be used in many instances, One department on a large company that work independent of each other may require access to files and can use blockchain to make file transactions easier.

Using messaging ability in Vetra Cloud, parties maybe use it as an anonymous file transactions with users they met online and don't trust them due to security and privacy of users.



## Tech Stack
- Next JS, React and Tailwind for the frontend UI and state management of the app.
- Phantom, Solflare and Solana Web3 client libraries for interaction with Solana smart contracts for requests and sharing of files.
- React-Moralis, client library for interacting with Moralis Database for querying and retrieval of details of files and folders.
- Anchor Framework - for writing solana smart contracts in Rust language and deployment to devnet.
- Web.Storage Node JS client library for providing api for uploading files and retrieving their details from decentralized storage.
- Solana blockchain for ledger for authenticating users, making requests and signing share documents or file transactions.

## 🚧 Challenges 🚧
- Maintaining wallet connection between different pages.
- Intergating Wallet Authentication using Moralis for Solana especially using other wallets such as Solflare.


## What Next For Vetra Cloud
- Developing a mobile version of Vetra Cloud in order for ease in access.
- Add email notifications once a file has been shared or file request has been made.
