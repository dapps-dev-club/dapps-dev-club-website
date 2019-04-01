---
templateKey: about-page
title: solc hands-on
date: 2019-04-06T13:49:00.000Z
updatedDate: 2019-04-06T13:49:00.000Z
draft: false
description: Using solc
section: "hands-on"
authors:
  - bguiz
tags:
  - hands-on
---

### Install `solc`

Follow the [official installation instructions](https://solidity.readthedocs.io/en/v0.5.7/installing-solidity.html).

You have a choice between installing it via package managers on your operating system,
via `npm`, or compiling from source.

Note that if you install via `npm` you get `solcjs` instead of `solc`.
Keep this in mind during the subsequent steps.

## Create a solidity file

Write or copy any smart contract written in Solidity.
You may use [this contract](https://dappsdev.org/hands-on/solidity-intro/cars-05.sol).

## Run `solc`

Assuming that your Solidity file is `MyContract.sol`, and you're in the same
directory as it:

```bash
# Abstract Syntax Tree
solc --ast MyContract.sol

# Assembly (EVM op code)
solc --asm MyContract.sol

# Binary (EVM byte code)
solc --bin MyContract.sol

# Application Binary Interface
solc --abi MyContract.sol
```

## Inspect the output

Look at the output for each of the above commands - it should appear directly in
your terminal, and it shows various stages of the compiler in action.

- Abstract Syntax Tree (`--ast`): The compiler taken the input Solidity code and parsed and tokenised it.
- Assembly (`--asm`): The compiler has turned the AST into a series of **EVM
  op codes**.
- Binary (`--bin`): The compiler has turned the EVM op codes into **EVM
  byte codes**.
  - This isn't necessarily a separate stage in itself, as it really
    is a 1-to-1 mapping, and the assembly effectively functions as a
    "pretty print" variety of the byte code.
- Application Binary Interface (`--abi`): The compiler has turned the AST and
  the byte code into a JSON file describing each of the functions in a manner
  such that clients (such as `web3.js`) are able to invoke them.
