---
templateKey: blog-post
title: "Hackathon Starter Pack, DApps Dev Club edition"
date: 2019-06-15T07:25:21.000Z
updatedDate: 2019-06-15T07:25:21.000Z
draft: false
description: "If you're at a hackathon, and wanna develop a DApp, we've got the basics covered here!"
featuredImage: /img/just-buidl-lah.jpeg
section: news
authors:
  - bguiz
tags:
  - irl
  - hackathon
  - resources
---

We're currently in the midst of
[NBC'19](https://nbc.devpost.com/),
and there are a few questions that keep coming up,
and a few resources that I have been referring you to quite often. In the spirit of scaling my reach up, and also so that everyone gets the same information &hellip; the following compiles all of thoses things into one post! 🎉

<!-- excerpt -->

## Things you need to install

- [NodeJs](https://nodejs.org/)
  - Javascript development platform, which several of the Ethereum development tools run on
- [MetaMask](https://metamask.io/)
  - Chrome browser extension, which acts as a wallet plus a means to interact with you smart contract from a web page
- [Truffle](https://truffleframework.com/docs/truffle/getting-started/installation)
  - A suite of smart contract development tools
- [Ganache](https://truffleframework.com/docs/ganache/quickstart)
  - A **simulated** blockchain that you can run on your own computer, with a GUI

## Hands-on guides

What are you currently trying to do?
Just jump in to the part which is relevant to you!

The items below are not intended to be comprehensive or thorough,
but rather the **absolute mininum** necessary required to pull off something during a hackathon.

### What is an Ethereum wallet?

- [BIP39](https://dappsdev.org/deck/s01e03/#keygen)
  - go through the slides in this section to understand how to derive accounts from seed phrases
  - MetaMask and Ganache will make use of this
- [Simple Transactions](https://dappsdev.org/hands-on/simple-tx/)
  - Once you have a wallet, try using it on this page
  - Get some ether try it out here

### Smart contract development

[DApps Dev Club session #04](https://dappsdev.org/blog/2019-04-12-dapps-dev-club-4th-session-roundup/)

- [Introduction to Solidity](https://dappsdev.org/hands-on/solidity-intro/)
- [Ganache](https://dappsdev.org/deck/s01e04/#ganache)
- [Truffle](https://dappsdev.org/hands-on/truffle-intro/)

### Front-end development

[DApps Dev Club session #06](https://dappsdev.org/blog/2019-05-16-dapps-dev-club-6th-session-roundup/)

- [Web development set up](https://dappsdev.org/hands-on/web3/project-setup/)
- [Web3.js scaffold](https://dappsdev.org/hands-on/web3/scaffold/)
- [Query smart contract state](https://dappsdev.org/hands-on/web3/query-state/)
- [Mutate (change) smart contract state](https://dappsdev.org/hands-on/web3/mutate-state/)
- [Listen to smart contract events](https://dappsdev.org/hands-on/web3/listen-events/)

## Frequently asked questions

**Why does MetaMask not connect to Truffle?**

Make sure that you have changed your network in MetaMask to the **localhost** network,
and that the **port number** matches too. Usually this will be `localhost:8545`.

**Why doesn't Truffle deploy connect to Ganache?**

- Make sure that you Ganache is running
- Open `truffle-config.js`, and ensure that the `development` object is uncommented.
  - Also, ensure that the port number and network ID are match that found in Ganache

**What's the difference between truffle develop and truffle console?**

- `truffle develop` runs its own local simulated blockchain, and thus whatever you have on ganache is ignored.
- `truffle console --network develop` does **not** run its own blockchain, and instead attempts to connect to whatever has been defined in `truffle-config.js`, which in this case should be your instance of Ganache that is running.

## Anything else?

Is there anything else that you think should be here?
Let me know and I'll update the list!

&hellip; Happy hacking!
