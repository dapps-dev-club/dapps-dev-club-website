---
templateKey: about-page
title: "State Machines & Testing State Transitions in Solidity Smart Contracts"
date: 2019-04-21T15:36:00.000Z
updatedDate: 2019-04-21T15:36:00.000Z
draft: false
description: Understanding state machines, and how to test state transitions when developing using truffle
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

## Recap

Previously we have set up a truffle project,
which contains a `Cars` smart contract (the implementation).
Next we created a specification file that references it,
and wrote a test which performs assertions on its initial state.

## State transitions

Reading materials:

- [Transition systems](https://en.wikipedia.org/wiki/Transition_system)
- [Finite state machines](https://en.wikipedia.org/wiki/Finite-state_machine)
- [Transitions in Scilla](https://scilla.readthedocs.io/en/latest/scilla-by-example.html#defining-interfaces-aka-transitions) - the smart contract language used in Zilliqa

> A Scilla smart contract (and in general most smart contracts that you see today) are stateful systems. This basically means that a smart contract at any point of time can be said to be in a particular "state". This "state" for instance can be a set of variables (and its current value) or say map (in the case of ERC20 token contract) that stores which user owns how many tokens. A state transition is a function that allows users to change the state of the contract. For instance, the transfer state transition function will allow users to transfer tokens from one user to another and hence changing the map.
>
> &mdash; Amrit Kumar

Each time you call a function that is not `view` or `pure`,
it can potentially change the state of the contract.
These are known as **state transitions**.
The solidity compiler does not check or enforce this,
so it is a way of thinking about smart contracts when coding them,
and up to you to include the logic as you wish.

Let's write some tests involving state transitions.

### Create a new entity

The car objects (`struct Car`) are being managed by this smart contract.
Thus we expect that most of our tests are going to be
around checking the state transitions of these `Car`s.

The first state transition for a car object is when it is created.
Think of this as a transition from a "does not exist" state to
a "does exist" state.

First let's create a new specification file,
named `test/Cars-state-machines.spec.js`:

```javascript
const Cars = artifacts.require('Cars');

const BN = web3.utils.BN;

contract('Cars - state machines', (accounts) => {

  it('Adds a new car', async () => {
    const instance = await Cars.deployed();

    // perform the state transition

    // retrieve the updated state

    // perform the assertions
  });

});
```

Next, we perform the state transition:

```javascript
    const tx =
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
```

Next, we retrieve the updated state:

```javascript
    const numCars =
      await instance.numCars.call();
    const car1 =
      await instance.cars.call(new BN(1));
```

Finally, we perform assertions on the updated state:

```javascript
    assert.equal(numCars.toString(), '1');
    assert.equal(car1.colour, '0xff00ff');
    assert.equal(car1.doors.toString(), '4');
    assert.equal(car1.distance.toString(), '0');
    assert.equal(car1.lat.toString(), '0');
    assert.equal(car1.lon.toString(), '0');
    assert.equal(car1.status.toString(), '1'); // parked
    assert.equal(car1.owner, accounts[1]);
```

Now run the test command again

```bash
truffle test
```

This new test should pass.
As with the previous one, attempt to break your test in various ways,
by modifying the implementation, specification,
and both at the same time.

### How about return values?

In the test that we just wrote, you'll notice that we invoked the `addCar()`
function on the smart contract, and obtained a transaction result,
which we **did not** do anything with.

After that, we asserted the updated state of the contract.

The astute might have noticed that this function has a return value:

```typescript{7}
    function addCar(
        bytes3 colour,
        uint8 doors,
        uint256 distance,
        uint16 lat,
        uint16 lon
    ) public payable returns(uint256 carId) {
      // ...
    }
```

&hellip; so how do we get that `uint256 carId`, and do an assertion on it?

If you take a look at the transaction object that gets returned,
you will notice that the return value simply **is not** there!
Here's an example value:

```javascript
{ tx: '0xd8d198e769cda5b7d9a520a030523a80fd65c9c63fce65f6b06c5f73bce7b560',
  receipt:
   { transactionHash: '0xd8d198e769cda5b7d9a520a030523a80fd65c9c63fce65f6b06c5f73bce7b560',
     transactionIndex: 0,
     blockHash: '0xf790a11fe872bd60de413f72cb3eea2960836f514b0a2520c3c7ef481995c65e',
     blockNumber: 26,
     gasUsed: 95310,
     cumulativeGasUsed: 95310,
     contractAddress: null,
     logs: [],
     status: true,
     logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
     rawLogs: [] },
  logs: [] }
```

It turns out that we actually **can not** obtain the return value from
a function that modifies state on a smart contract, because this would need to
be included as part of the consensus data, which Ethereum has chosen not ot do.

So how do we work around this? Turns out that there are three common patterns
used in dealing with this.

**First**, we have the approach which we have already done, without knowing it
at the time, which is to infer the return value based on the new state,
which is this case is the value of `numCars` -
we have implemented the `addCar()` function in a manner such that the `carId`
theat is returned will be equal to the new value of `numCars`.

**Second**, we have an approach which requires modifying the implementation of
the function, such that it emits an event, which does get included within
the returned transaction - we will see how this is done in another hands-on.

**Third**, we have an approach which calls the `addCars` function **without**
creating a transaction. In other words, we call the function such that it
execute locally only, and the smart contract does not get executed by
nodes running on the network. Let's try this appraoach now!

```javascript{3,14}
    // preview the return value without modifying the state
    const returnValue =
      await instance.addCar.call(
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
    assert.equal(returnValue.toString(), '1');
```

This looks almost the same as the actual contract call, the difference being
that we use `instance.addCar.call(...)` instead of `instance.addCar()`.
Since we are doing the `.call()` variant, it is not sent as a transaction to
the network, and thus is does not result in the state of the contract being
changed. (Feel free to try it out by performing more assertions after this).

When doing this, you may think of it as a **preview** -
"If I were to call this function on the smart contract,
what would the result be?"

### Add more tests

This test that we have written is the very first **state transition**
that you can write tests for.
There are many other methods on this smart contract which cause
state changes, so have a go at writing soe tests for those too!

Hints:

- Try adding another `addCar()` test within **the same** `contract` block,
  and also try adding the same test within **a new** `contract` block.
  What is the difference?
  - Reading material:
    [truffle clean-room environment](https://truffleframework.com/docs/truffle/testing/testing-your-contracts#clean-room-environment)
- Now that you have a car, try changing driving it, parking it, and honking it.
- Some state changes are illegal, your tests should not only be for
  the "happy path", but should also assert that function calls
  that are not allowed, should indeed throw errors!

### Congratulations

🎉🎉🎉 You have learned about state machines, and tested some state transitions!

Next, we will take a look at events.

## Next &hellip;

- [Testing Solidity Events](/hands-on/testing/solidity-events/)
- [Mocking Solidity for Tests](/hands-on/testing/solidity-mocks/)
