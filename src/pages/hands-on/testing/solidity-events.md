---
templateKey: about-page
title: Testing Events in Solidity Smart Contracts
date: 2019-04-21T15:36:00.000Z
updatedDate: 2019-04-21T15:36:00.000Z
draft: false
description: How to test events when developing using truffle
section: "hands-on"
authors:
  - bguiz
tags:
  - hands-on
---

## Previously &hellip;

- [Introduction to Solidity](/hands-on/solidity-intro/)
- [Introduction to Truffle](/hands-on/truffle-intro/)
- [Introduction to Mocha](/hands-on/mocha-intro/)
- [Truffle Testing Setup](/hands-on/testing/truffle-setup/)
- [Testing Solidity Data Storage](/hands-on/testing/solidity-data-storage/)
- [Testing Solidity State Machines](/hands-on/testing/solidity-state-machines/)

## Recap

Previously, we have set up a truffle project,
which contains a `Cars` smart contract (the implementation).
Next we create a specification file that references it,
and wrote some tests which perform assertions on its initial state,
as well as its state after some state transitions have occurred.

## Events

In Solidity, we define `events`, and then `emit` them within a function.

In our `Cars` contract the event that we have defined is:

```javascript
    event CarHonk (uint256 indexed fromCar, uint256 indexed atCar);
```

&hellip; and within our `honkCar()` function, we emit it:

```javascript
        emit CarHonk(carId, otherCarId);
```

Solidity events get turned into **logs** in Ethereum.
More details in [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#events).
You may think of events as structured logs.

## Create an event

Let's start by creating a new specification file,
name `test/Cars-events.spec.js`.


```javascript{7,19}
const Cars = artifacts.require('Cars');

const BN = web3.utils.BN;

contract('Cars - events', (accounts) => {

  before(async () => {
    // set up contract with relevant initial state
  });

  it('Honks a car at another car', async () => {
    const instance = await Cars.deployed();

    // perform the state transition

    // inspect the transaction & perform assertions on the logs
  });

  it('Honking a car that you do not own is not allowed', async () => {
    const instance = await Cars.deployed();

    // perform the state transition

    // assert that we get an error with the expected reason
  });

});
```

This specification is slightly more complex than the previous two, in two ways:

- We are using a `before` block within the `contract` block to set up the state
  of the contract instance to be ready for testing
- We are going to not only write a "happy path" test, but also an additional
  test that checks for a failure scenario.

## Setting up initial contract state

We set up initial contract state in a `before` block.

We need to do this because we wish to test the `honkCar` function on the smart
contract, but in order for that to happen, the contract needs to be initialised,
and then have at least two cars added to it,
before we can make a successful call -
there needs to be a valid `fromCar` and a valid `atCar` to pass in!

So let's fill in the `before` block with code that we have previously written
in specification for state machines:

```javascript{4,16}
    // set up contract with relevant initial state
    const instance = await Cars.deployed();

    await instance.addCar(
      '0xff00ff', // colour: purple
      new BN(4), // doors: 4
      new BN(0), // distance: 0
      new BN(0), // lat: 0
      new BN(0), // lon: 0
      {
        from: accounts[1],
        value: web3.utils.toWei('0.11', 'ether'),
      },
    );

    await instance.addCar(
      '0xffff00', // colour: yellow
      new BN(2), // doors: 2
      new BN(0), // distance: 0
      new BN(0), // lat: 0
      new BN(0), // lon: 0
      {
        from: accounts[2],
        value: web3.utils.toWei('0.11', 'ether'),
      },
    );

    // just a sanity check, we do not really need to do assertions
    // within the set up, as this should be for "known working state"
    // only
    const numCars =
      await instance.numCars.call();
    assert.equal(numCars.toString(), '2');
```

This is pretty much copy-and-paste from the tests we have written earlier,
except that we get rid of most of the assertions.

So now, we know that when each test runs, we have an initial state of:

- car #1 owned by account #1 (a purple sedan)
- car #2 owned by account #2 (a yellow coupé)

## Add a "happy path" test

In our first test case, enter the following:

```javascript{5}
    const instance = await Cars.deployed();

    // perform the state transition
    const tx =
      await instance.honkCar(
        2,
        1,
        {
          // account #2 owns car #2
          from: accounts[2],
        },
      );
```

This is where account #2, tells the smart contract that it wants to
honk from car #2 at car #1.
Since account #2 owns car #1, and car #1 exists, this should work -
but let's not assume that, and instead verify it using assertions:

```javascript{7-9}
    // inspect the transaction & perform assertions on the logs
    const { logs } = tx;
    assert.ok(Array.isArray(logs));
    assert.equal(logs.length, 1);

    const log = logs[0];
    assert.equal(log.event, 'CarHonk');
    assert.equal(log.args.fromCar.toString(), '2');
    assert.equal(log.args.atCar.toString(), '1');
```

This part is something we have not done before -
we have invoked a function that emits and event,
so instead of inspecting the new state of the smart contract,
we are instead looking at the transaction object for logs (which are events).

We perform assertion to check that the name, and the arguments
of the event matches what we expect.

Tip:
If you're curious, you can always use `console` within your test to see what
something contains.
For example `console.log(x);` would print something that looks like this:

```javascript{8,15,16}
{ logIndex: 0,
  transactionIndex: 0,
  transactionHash: '0x9e636fdb1d1193d9d365517682be277a4a67dc2585f7153b6b64b73de3e5aec6',
  blockHash: '0xaf66661a274f4c3e846473ea40ef2d76bcf48c7943683583f6744203981f3dab',
  blockNumber: 15,
  address: '0xefb375423829c10F58aaC5c1f3076DBc161a6FaE',
  type: 'mined',
  id: 'log_212889c5',
  event: 'CarHonk',
  args:
   Result {
     '0': <BN: 2>,
     '1': <BN: 1>,
     __length__: 2,
     fromCar: <BN: 2>,
     atCar: <BN: 1> } }
```

## Add a failure scenario test

In this test, let's try to get an account which **does not** own any cars to
honk someone else's car.
The purpose of this test would be to ensure that our `onlyCarOwner`
function modifier is working as expected.

```javascript{10-11}
    // perform the state transition
    let tx;
    let err;
    try {
      tx =
        await instance.honkCar(
          2,
          1,
          {
            // account #3 does not own any cars, only account #1 and #2 do
            from: accounts[3],
          },
        );
    } catch (ex) {
      err = ex;
    }
```

Note that unlike the previous test, with this one,
we have put the call to the smart contract within a try-catch block.
The purpose of this is to be able to extract the error that occurs,
so that we can perform some assertions on it:

```javascript{6}
    // should not get a result, but an error should have been thrown
    assert.ok(err);
    assert.ok(!tx);

    // check that the error reason is what you expect
    assert.equal(err.reason, 'you need to own this car');
```

Here we check that we did not get a result,
and get an error instead.
Then check that the `reason` property for the error matches the one that we
expect from the `onlyCarOwner` modifier.

## Add more tests

The `honkCar()` function has another failure scenario,
so write a test for that too!

Hint:
Look at the implementation of the smart contract to find it

## Congratulations

🎉🎉🎉 You have written a test that checks for events that have been emitted,
and you have also written test cases for both the happy path and
failure scenarios for the same function.

Next, we will take a look at how to use mocking when writing tests.

## Next &hellip;

- [Mocking Solidity for Tests](/hands-on/testing/solidity-mocks/)
