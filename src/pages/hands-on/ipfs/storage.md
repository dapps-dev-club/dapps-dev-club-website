---
templateKey: about-page
title: Extending storage with IPFS
date: 2019-06-09T04:29:00.000Z
updatedDate: 2019-06-09T04:29:00.000Z
draft: false
description: A hands-on for using IPFS for extending storage in a smart contract
section: "hands-on"
authors:
  - bguiz
tags:
  - hands-on
---

## Set up a new DApp

Follow all the steps in the web3 hands on,
but this time in a new project with a different name,
or just clone a starter repo from
[github.com/dapps-dev-club/ipfs-hands-on](https://github.com/dapps-dev-club/ipfs-hands-on/)

Before proceeding further, make sure that the following steps can be executed,
without errors:

```bash
# smart contract compiles
truffle compile

# development build for front end
cd app
npm install
npm run dev
# ... leave this running, and use a new terminal to execute subsequent commands
```

## Write the smart contract

```bash
truffle create contract Profiles
```

Edit `contracts/Profiles.sol` to add the following:

```solidity
pragma solidity ^0.5.0;

contract Profiles {
  mapping(address => string) public profiles;

  constructor() public {
  }

  function updateProfile(string calldata ipfsHash) external {
    profiles[msg.sender] = ipfsHash;
  }
}

```

This is a straight forward smart contract - it simply maintains a mapping
of address to IPFS hashes, and allows users to update their own profile
by sending in new IPFS hashes.

## Deploy the smart contract

As with our previous hands-on exercises, we'll use truffle to manage our
migrations, and deploy to a local blockchain (Ganache).

```bash
truffle create migration Profiles
```

Edit the newly generated file in `migrations/`,
such that it contains the following:

```javascript
const Profiles = artifacts.require("Profiles");

module.exports = function(deployer) {
  deployer.deploy(Profiles);
};

```

Make sure that you have Ganache running,
before you run the next step.
Double check that the network ID in Ganache matches the network ID
in  your `truffle-config.js`.

```bash
truffle migrate
```

Now we have our smart contract deployed,
let's move on to making the client web application that will interact with it
plus IPFS.
This will be very similar to our web3.js hands-on exercises,
but the IPFS parts will be new.

## Bootstrap client without IPFS

The file `app/src/index.html` should look like this:

```
<!DOCTYPE html>
<html>
  <head>
    <title>IPFS demo - DApps Dev Club</title>
  </head>
  <style>
  </style>
  <body>
    <h1>Profiles</h1>

    <h2>View Profile</h2>
    <p>
      <label for="addressInput">Address</label>
      <input type="text" id="addressInput" />
      <br />
      <button id="queryProfileButton">Query Profile</button>
      <br />
      <textarea rows="10" cols="20" id="profileOutput" readonly="true">
      </textarea>
    </p>

    <h2>Update Profile</h2>
    <p>
      <textarea rows="10" cols="20" id="profileInput"></textarea>
      <br />
      <button id="updateProfileButton">Update Profile</button>
      <br />
    </p>

    <script src="index.js"></script>
  </body>
</html>
```

&hellip; and `app/src/index.js` should look like this:

```javascript
import Web3 from 'web3';

import profilesArtefact from "../../build/contracts/Profiles.json";

const ProfilesApp = {
  web3: undefined,
  accounts: undefined,
  contract: undefined,
};

window.addEventListener('load', function() {
  if (window.ethereum) {
    init();
  } else {
    // basically, politely telling the user to install a newer version of
    // metamask, or else fly 🪁
    console.error('No compatible web3 provider injected');
  }
});

async function init() {
  try {
    window.ProfilesApp = ProfilesApp; // DEBUG
    await window.ethereum.enable(); // get permission to access accounts
    ProfilesApp.web3 = new Web3(window.ethereum);

    // determine network to connect to
    let networkId = await ProfilesApp.web3.eth.net.getId();
    console.log('networkId', networkId);

    let deployedNetwork = profilesArtefact.networks[networkId];
    if (!deployedNetwork) {
      console.warn('web3 provider is connected to a network ID that does not matched the deployed network ID');
      console.warn('Pls make sure that you are connected to the right network, defaulting to deployed network ID');
      networkId = Object.keys(profilesArtefact.networks)[0];
      deployedNetwork = profilesArtefact.networks[networkId];
    }
    console.log('deployedNetwork', deployedNetwork);

    // initialise the contract
    ProfilesApp.contract = new ProfilesApp.web3.eth.Contract(
      profilesArtefact.abi,
      deployedNetwork.address,
    );

    // set the initial accounts
    updateAccounts(await ProfilesApp.web3.eth.getAccounts());

    console.log('ProfilesApp initialised');
  } catch (err) {
    console.error('Failed to init contract');
    console.error(err);
  }

  // set up listeners for app interactions.
  const queryProfileButton = document.querySelector('#queryProfileButton');
  queryProfileButton.addEventListener('click', queryProfile);

  const updateProfileButton = document.querySelector('#updateProfileButton');
  updateProfileButton.addEventListener('click', updateProfile);

  // trigger various things that need to happen upon app being opened.
  window.ethereum.on('accountsChanged', updateAccounts);
}

async function updateAccounts(accounts) {
  ProfilesApp.accounts = accounts;
  console.log('updateAccounts', accounts[0]);
}

async function queryProfile() {
  const addressInput = document.querySelector('#addressInput');
  const profileAddress = addressInput.value;
  console.log({ profileAddress });

  const ipfsHash = await ProfilesApp.contract.methods.profiles(profileAddress).call({
    from: ProfilesApp.accounts[0],
  });
  console.log({ ipfsHash });

  // TODO use the IPFS hash to read file
  // https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#cat

  // TODO display profile
}

async function updateProfile() {
  const profileInput = document.querySelector('#profileInput');
  let profile;
  try {
    profile = JSON.parse(profileInput.value);
  } catch (ex) {
    throw 'Failed to parse input profile';
  }
  console.log({ profile });

  // TODO write to IPFS and obtain its hash
  // ref: https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#add

  // TODO write IPFS hash instead of the full JSON file
  await ProfilesApp.contract.methods.updateProfile(
    JSON.stringify(profile),
  ).send({
    from: ProfilesApp.accounts[0],
  });
}

```

## Enter IPFS

As we have it currently, we have a client that write the **entire profile**
as JSON to the smart contract storage. This will work for short pieces of data,
and run out of gas when large data is used instead. Whether short or long,
the costs of calling the function are going to be prohibitively expensive.

The motivation for using IPFS in this context is to move data storage off-chain
so that we can avoid these costs. Let's do that now!

### IPFS API

Create a new file: `src/ipfs.js`.

```javascript
const ipfsApi = require('ipfs-api');

const localIpfsConnection = {
  host: 'localhost',
  port: 5001,
  protocol: 'http',
};

const infuraIpfsConnection = {
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
};

const ipfs = new ipfsApi(
  localIpfsConnection, // to connect to your local IPFS node
  // infuraIpfsConnection, // to connect to Infura's IPFS node
);

module.exports = ipfs;

```

You can connect to either your local IPFS node or to any publicly available
IPFS node! The code above shows two possible options.

Then import that within `src/index.js`,
as we will be making use of that next:

```javascript
import ipfs from './ipfs.js';

```

### Writing off-chain data

First, we'll tackle the writing data:

Here, we will send the data to IPFS, and obtain its hash,
then we will write that hash to the smart contract,
instead of the full data, as we were doing previously.

In the `updateProfile()` function, modify the bottom half to do this instead:

```javascript
  // write to IPFS and obtain its hash
  // ref: https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#add
  const buffer = await Buffer.from(JSON.stringify(profile, undefined, 2));
  const ipfsResult = await ipfs.add(buffer);
  console.log({ ipfsResult });

  await ProfilesApp.contract.methods.updateProfile(
    // Write the IPFS hash instead of the full JSON
    // JSON.stringify(profile),
    ipfsResult[0].hash,
  ).send({
    from: ProfilesApp.accounts[0],
  });

```

### CORS errors

When you press the **Update Profile** button here,
you might encounter an error relating to *CORS* that looks similar to the one below:

> Access to fetch at 'http://localhost:5001/api/v0/add?stream-channels=true' from origin
> 'http://localhost:8081' has been blocked by CORS policy: No 'Access-Control-Allow-Origin'
> header is present on the requested resource.
> If an opaque response serves your needs, set the request's mode to 'no-cors'
> to fetch the resource with CORS disabled.

This means that you need to tell your IPFS node to white list cross origin requests made
from `localhost`, for testing purposes:

```bash
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:8081"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'

```

This is likely not the behaviour you would want if you intend to run your IPFS node for general use.
However, for development purposes, this is OK.

Further reading:
[CORS documentation](https://github.com/ipfs/js-ipfs-http-client#cors)

### Reading off-chain data

When we wrote the data, we sent a file to IPFS first,
then sent its IPFS hash to the smart contract.
Now we will do it the other way around -
fetch the IPFS hash from the smart contract,
then use that hash to fetch the file from IPFS.

In the `queryProfile()` function, modify the bottom half to do this instead:

```javascript
  // use the IPFS hash to read file
  // https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#cat
  const ipfsFileBuffer = await ipfs.cat(`/ipfs/${ipfsHash}`);
  const profile = ipfsFileBuffer.toString();

  // display profile
  console.log({ profile });
  const profileOutput = document.querySelector('#profileOutput');
  profileOutput.value = profile;

```

## Try it out

Write some profile data, then query it.
Overwrite your profile data, then query it.
Switch to a different account, and repeat.

## Stretch goals

- Typing out your profile data in JSON is such horrible user experience
  that only a developer would subject themselves to it!
  Let's fix this, by creating a form where there's several fields,
  and the front end assembles these into JSON.
- At the moment, a user can input arbitrary data as their profile.
  Let's fix this, by adding validation logic for the profile JSON,
  and make this validation run in both the update and the query scenarios.
  The validation only needs to be rudimentary,
  e.g. whether all fields filled in.
- Strings in Solidity are a variable sized data type,
  and thus use up more gas than dealing with fixed sized data types.
  Try substituting `string` for the following `struct`, which is fixed sized.
  ```
  struct IpfsHash {
    bytes32 hash
    uint8 hashFunction
    uint8 size
  }
  ```
  See [multiformats/multihash](https://github.com/multiformats/multihash)
- What's the fun in a profile without a profile picture?
  `ipfs.add()` allows you to upload any file, not just JSON.
  Why not allow the user to browse an upload an image file of their choosing,
  and copy the IPFS hash of that, and insert that into the profile JSON?
  When viewing the profile, after downloading the profile JSON,
  find the image that the profile references and download that as well.
- Have the user sign the profile data that they are submitting,
  making use of
  [EIP 712](https://eips.ethereum.org/EIPS/eip-712)
