---
templateKey: about-page
title: Smart Contract Development Patterns
date: 2020-02-11T10:36:00.000Z
updatedDate: 2020-02-11T10:36:00.000Z
draft: false
description: "A series of hands-on workshops for smart contract development patterns: Ownable, pausable, and non-fungible token"
section: "hands-on"
authors:
  - bguiz
tags:
  - hands-on
---

This is a series of hands-on workshops that introduce the following contracts in the world of smart contract development:

## Quick Links

- [Start here](./01-start-here/)
- [Ownable](./02-ownable/)
- [Pausable](./03-pausable/)
- [Non-fungible token](./04-non-fungible-token/)

## Recap

Previously, we have learnt about the following

- Minimum viable blockchain, for DApp development
- Web browser based wallet (MetaMask), to interact with a blockchain
- Basic Solidity, used for smart contract development
- Ganache + Truffle + Mocha, used to test smart contracts locally
- web3.js, used for interacting with a smart contract within a webpage
- Storage (IPFS), to store files in a decentralised manner

## Details

Now we're about to focus on Solidity again, but this time go a bit deeper, learning commonly used software patterns.
These are similar to **design patterns** in software engineering,
but are specific to a particular programming language (Solidity),
and to a particular deployment and execution environment (Decentralised Ledger Technology, or Blockchain).

In our first hands-on workshop, [*start here*](./01-start-here/),
we set up a development environment with Ganache + Truffle + Mocha.
We also create a smart contract that *does not yet* make use of
any of the smart contract patterns.
This should be already be familiar to you,
and perhaps can act as a refresher.
We will write tests for this smart contract using web3.js,
in a manner similar to what we have done previously.

In our second hands-on workshop, [*ownable*](./02-ownable),
we take the contract created during the previous workshop,
and implement the *Ownable* smart contract pattern.
This adds functionality to the smart contract that allows
only the owner account
(which may either be operated by a human or another smart contract)
to invoke certain functions in the smart contract.
We will write tests for Ownable,
this time introducing some convenient test helpers from open zeppelin.

In our third hands-on workshop, [*pausable*](./03-pausable),
we take the contract from the previous workshop,
and implement the *Pausable* smart contract pattern.
This adds functionality to the smart contract that allows only the
owner account to to pause and unpause certain functions in the smart contract.
We will write tests for Pausable as well.

In our fourth hands-on workshop, [*non-fungible token*](./04-non-fungible-token/),
we take the contract from the previous workshop,
and implement the *ERC721* contract pattern.
This time, instead of writing the pattern from scratch,
as we have for the *Ownable* and *Pausable* patterns,
we use a readily available and well audited implementation,
from Open Zeppelin's contracts library.
We will write minimal tests for ERC721,
mainly relying on the existing tests found in the library.

## Let's begin

[Start here](./01-start-here/)!
