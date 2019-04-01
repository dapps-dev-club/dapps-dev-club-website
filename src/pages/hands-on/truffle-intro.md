---
templateKey: about-page
title: Truffle hands-on
date: 2019-04-05T13:12:00.000Z
updatedDate: 2019-04-05T13:12:00.000Z
draft: false
description: Using truffle with ganache
section: "hands-on"
authors:
  - bguiz
tags:
  - hands-on
---

### Install ganache and truffle, run ganache in the background

Note that ganache is a GUI, install it using these
[instructions](https://truffleframework.com/docs/ganache/quickstart#1-install-ganache "install ganache") on their website.

For truffle, we can install it via npm.

```bash
# install ganache, and run it (GUI)
npm i -g truffle
```

### Create a blank truffle project

```bash
mkdir dadc-cars
cd dadc-cars
truffle init
$EDITOR truffle-config.js
```

When editing `truffle-config.js` uncomment `networks.development` and set to match the ganache instance.

Note that on the truffle website, they tell you to use `truffle unbox` -
we *do not* want to do this for the purposes of our session.

### Create and deploy the contract

```bash
truffle create contract Cars
# paste the cars contract into the new file

truffle create migration Cars
# paste the contents of `1_initial_migration.js` file into the new file,
# and replace all `Migrations` with `Cars`

truffle migrate
```

### Start the truffle REPL

> REPL: Read-evaluate-print-loop

```bash
truffle console --network development
```

Note that `truffle console` uses whatever is in `truffle-config.js`, so connects to ganache.
On the other hand, `truffle develop` will start its own simulated blockchain, which we *do not* want in this case.

Also, if you have used the `node` REPL before, this will seem familiar, with some differences:

- You *may not* end your statements with a `;`.
- Top level truffle commands are invokable, e.g. `migrate` within the REPL does the same thing as `truffle migrate` outside of the REPL.

### Access accounts, and get the contract

```javascript{1}
contract = await Cars.deployed()

accounts = await web3.eth.getAccounts()
accounts[0]
// should match the first account's address in ganache
```

Behind the scenes, truffle has done a few things to make this happen:

- Truffle has access to the compiled/ deployed contract and the ABI, which were used to create `Cars`
- We're creating `contract` from `Cars`, and this uses
  [`truffle-contract`](https://github.com/trufflesuite/truffle/tree/master/packages/truffle-contract) -
  think of this as an instance.

### Invoke an auto-generated getter for a public variable

```javascript{5}
numCars = await contract.numCars()
numCars.toString()
// this is a *transaction*, so we used up some gas

numCars = await contract.numCars.call()
numCars.toString()
// this is a *call*, so we used up no gas
```

We expect the result to be `'0'` since we haven't run anything yet.
Note that the actual returned value is a `BigNumber`, so we need to use `.toString()` or `.toNumber()`.

Generally speaking, use `.call()` where you can, as it executes locally and thus does not cost any gas.
Submit transactions only when you are doing something that changes the state of the contract.

### Invoke a function

```javascript
result = await contract.addCar('0x00FF00', 4, 0, 0, 0, { from: accounts[0], value: web3.utils.toWei('0.09', 'ether') })
// expect an error, as this function rejects payments less or equal to 0.1 ETH

result = await contract.addCar('0xFFFF00', 4, 0, 1800000, 1800000, { from: accounts[0], value: web3.utils.toWei('0.11', 'ether') })
// expect this to succeed - yellow car owned by account[0]
result

result = await contract.addCar('0xFF00FF', 4, 0, 1800000, 1800000, { from: accounts[1], value: web3.utils.toWei('0.11', 'ether') })
// expect this to succeed - purple car owned by account[1]
result
```

Try out some of the other functions. Is there anything wrong with them?

### State of the contract after invoking the functions

We have previously modified the state of the contract, so let's inspect this.

```javascript
numCars = await contract.numCars.call()
numCars.toString()
//  should now be 2

contract.cars(1)
contract.cars(2)
// output the cars that have been saved to the mapping - auto-generated getter takes 1 arg for the key
```

### Generate an event

Some functions emit events, and we can tell by looking at the `logs` property
of the result of the contract call.

```javascript{10}
result = await contract.honkCar(1, 999, { from: accounts[0] })
// expect this to fail, other car must exist

result = await contract.honkCar(2, 1, { from: accounts[0] })
// expect this to fail, you need to own this car

result = await contract.honkCar(2, 1, { from: accounts[1] })
// expect this to succeed

result.logs[0]
// event: 'CarHonk', `args.fromCar: <BN: 2>`, `args.atCar: <BN: 1>`
```
