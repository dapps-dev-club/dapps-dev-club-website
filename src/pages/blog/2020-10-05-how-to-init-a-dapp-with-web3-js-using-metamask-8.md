---
templateKey: blog-post
title: How to init a DApp with web3.js using MetaMask 8
featuredImage: /img/init-web3-in-dapp-metamask-8.png
date: 2020-10-05T08:59:13.122Z
description: >-
  in a manner that is compliant with both EIP1102 and EIP1193, and moves away
  from deprecated Web3 provider APIs.
tags:
  - web3
  - metamask
authors:
  - bguiz
---

MetaMask 8 [was released](https://medium.com/metamask/announcing-metamask-version-8-9126dc2df98) a few months ago - and it even included a [tiny contribution](https://github.com/MetaMask/metamask-extension/pull/8592 "fix: handle trailing slashes in block explorer URLs") of mine!

One of the less talked about "features" of this release is not about something that was added, but rather something that was removed. A key part of what MetaMask does is to inject a "Web3 provider" into the `window` global of the browser. This is not to be confused with a "Web3 instance", which is what `web3.js` or other similar libraries would give you. (Somewhat confusingly the "Web3 provider" that was injected used to be accessible through the variable `window.web3`.)

In any case, this is no more, and this way to do so has been deprecated by MetaMask.
Instead, the "Web3 provider" is now injected under a different variable name, `window.ethereum`.
This can be confusing for a different reason than the one stated above, if you happen to be using the "Web3 Provider" to interact with a non-Ethereum network, such as [RSK](https://developers.rsk.co/).

### The differences

This is not a simple naming change, however: This new "Web3 provider" has a different API. There are many changes, but the **short version** of it is that it is now compliant with these Ethereum Improvement Proposals (EIPs):

- [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102)
- [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)

The longer version of this is that it is now compulsory:

- To ask for users' permission to read their address
  - This implies that it is asynchronous, where it was previously synchronous
- To not longer rely on automatic page refreshes when a user switches between accounts
  - This implies that we need to handle this explicitly in our code

Apart from these two changes, almost everything else works the same as it did before.

### Show me the code!

The following code is a sample DApp whose front end is built using webpack and vanilla Javascript - look ma, no frameworks!

It also assumes that `../build/contracts/MySmartContract.json` contains a compiled smart contract conforming to the Truffle format. Note that this is not necessary, or even relevant, to this example. It is merely included to to mark **where** within the code one would insert the code dealing with smart contracts.

```javascript
import Web3 from 'web3';
import mySmartContractArtefact from '../build/contracts/MySmartContract.json';

document.addEventListener('DOMContentLoaded', onDocumentLoad);
function onDocumentLoad() {
  DApp.init();
}

const DApp = {
  web3: null,
  contracts: {},
  accounts: [],

  init: function() {
    return DApp.initWeb3();
  },

  initWeb3: async function () {
    if (typeof window.ethereum !== 'undefined') {
      // New web3 provider
      // As per EIP1102 and EIP1193
      // Ref: https://eips.ethereum.org/EIPS/eip-1102
      // Ref: https://eips.ethereum.org/EIPS/eip-1193
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        // Accounts now exposed, use them
        DApp.updateAccounts(accounts);

        // Opt out of refresh page on network change
        // Ref: https://docs.metamask.io/guide/ethereum-provider.html#properties
        ethereum.autoRefreshOnNetworkChange = false;

        // When user changes to another account,
        // trigger necessary updates within DApp
        window.ethereum.on('accountsChanged', DApp.updateAccounts);
      } catch (error) {
        // User denied account access
        console.error('User denied web3 access');
        return;
      }
      DApp.web3 = new Web3(window.ethereum);
    }
    else if (window.web3) {
      // Deprecated web3 provider
      DApp.web3 = new Web3(web3.currentProvider);
      // no need to ask for permission
    }
    // No web3 provider
    else {
      console.error('No web3 provider detected');
      return;
    }
    return DApp.initContract();
  },

  updateAccounts: async function(accounts) {
    const firstUpdate = !(DApp.accounts && DApp.accounts[0]);
    DApp.accounts = accounts || await DApp.web3.eth.getAccounts();
    console.log('updateAccounts', accounts[0]);
    if (!firstUpdate) {
      DApp.render();
    }
  },

  initContract: async function() {
    let networkId = await DApp.web3.eth.net.getId();
    console.log('networkId', networkId);

    let deployedNetwork = mySmartContractArtefact.networks[networkId];
    if (!deployedNetwork) {
      console.error('No contract deployed on the network that you are connected. Please switch networks.');
      return;
    }
    console.log('deployedNetwork', deployedNetwork);

    DApp.contracts.MySmartContract = new DApp.web3.eth.Contract(
      mySmartContractArtefact.abi,
      deployedNetwork.address,
    );
    console.log('Election', DApp.contracts.MySmartContract);

    return DApp.render();
  },

  render: async function() {
    // show spinner before loading data from smart contract
    // TODO

    // set or refresh any event listeners

    // update DOM to render account address where relevant
    // TODO using DApp.accounts[0]

    // retrieve data from smart contract and render it
    // TODO using DApp.contracts.MySmartContract

    // Hide spinner after loading and rendering data from smart contract
  },
};

```

As alluded to above, the real work happens in `DApp.initWeb3()` and `DApp.updateAccounts()`; whereas `DApp.initContract()` and `DApp.render()` are included to illustrate positions within the code that common smart contract related code would occur.

Happy DApp developing!
