---
templateKey: about-page
title: Mocking Solidity Smart Contracts for Testing
date: 2019-04-21T15:36:00.000Z
updatedDate: 2019-04-21T15:36:00.000Z
draft: false
description: How to mock a smart contract when developing using truffle
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
- [Testing Solidity Events](/hands-on/testing/solidity-events/)

## Recap

Previously, we have set up a truffle project,
which contains a `Cars` smart contract (the implmentation).
Next we create a specification file that references it,
and wrote some tests which perform assertions on its initial state,
as well as its state and events after some state transitions have occurred.

## Modify the smart contract

Our cars contracts as it is now, does not really have anything that could be
a target for mocking. So we will need to create a problem for ourselves,
before solving it! 😜

Let's implement a **new rule** that our `honkCar()` function needs to check,
which is that one is not allowed to honk between
midnight and six in the morning -
you don't want to wake your neighbours up and get a noise complaint!

Add these two new statements to the the `honkCar()` function:

```javascript{7-8}
    function honkCar(uint256 carId, uint256 otherCarId)
        public
        onlyCarOwner(carId)
    {
        require(cars[otherCarId].owner != address(0x00),
          "other car must exist");
        uint256 timeOfDay = (getTime() % 86400);
        require(timeOfDay >= 21600,
            "cannot honk between midnight and 6am"
        );
        emit CarHonk(carId, otherCarId);
    }
```

The way we work out the time is to get the total number of seconds
since **epoch**, divide that by the number of seconds per day,
and take the remainder, which gives us the number of seconds since midnight
for the current day.

Reading material:
[Modular arithmetic](https://en.wikipedia.org/wiki/Modular_arithmetic)

The total number of seconds since epoch is obtained from the timestamp
of the latest block in the blockchain.
This is not the most accurate time, but it is good enough for this contract.

```javascript{4}
    function getTime() internal view returns (uint256) {
        // current block timestamp as seconds since unix epoch
        // ref: https://solidity.readthedocs.io/en/v0.5.7/units-and-global-variables.html#block-and-transaction-properties
        return block.timestamp;
    }
```

Aside:
You might observe that this assumes that all the cars are in the UTC time zone -
let's just roll with this, and say that that's OK for the purposes of this demonstration.

So let's try it out, and run the tests.
If it is past midnight in UTC, your tests should be failing.
So these tests will pass or fail,
depending on the time of day that you run them -
and that is obviously **not** a good thing.

&hellip; and, that's why we need to mock our smart contract!

Now, why did we create a separate function just to return a single value?
We are about to see very shortly!

## Creating a mocked contract

Create a new file to put our mocked contract in,
named `contracts/mocks/MockedCars.sol`:

```javascript{5}
// mocked version of Cars contract - *only* used in tests

import "../Cars.sol";

contract MockedCars is Cars {
  // implementation of the contract
}
```

By saying `MockedCars is Cars`, we have told the solidity compiler that
the `MockedCars` contract inherits from the `Cars` contract.
Since there is zero implementation within this contract,
this means that the `MockedCars` contract is now identical to
the `Cars` contract.

Let's go ahead and add some implementation:

```javascript{4}
  uint256 public fakeBlockTimeStamp;

  // override Cars.getTime()
  function getTime() internal view returns (uint256) {
    return fakeBlockTimeStamp;
  }

  function _mock_setBlockTimeStamp(uint256 value) public {
    fakeBlockTimeStamp = value;
  }
```

We have done three things here:

- create a contract level variable, `fakeBlockTimeStamp`
- create a `getTime()` function that overrides the `getTime()` function
  which was inherited - this is the **mocked function**
- create a `_mock_setBlockTimeStamp()` function

After doing this, our mocked contract becomes useful,
because it does something differently from the original contract
which it inherits from.
In particular, it allows us **to control** how the contract behaves,
independently of `block.timestamp`.

Now we are able to answer the earlier question:

> Why did we create a separate function just to return a single value?

## Deploying the mocked contract

Writing the mocked contract is not quite enough,
we also have to deploy it in order for the specifications to use them.

In truffle, deployments occur through migrations,
so create one using this command in the terminal:

```bash
truffle create migration mocked_cars
```

&hellip; and enter this into the file that gets generated,
which should be named something similar
to `migrations/1554816184_mocked_cars.js`:

```javascript{4}
const MockedCars = artifacts.require("MockedCars");

module.exports = function(deployer) {
  deployer.deploy(MockedCars);
};
```

Now when we run truffle, our new `MockedCars` contract will be deployed.

## Modify the events specification

Open the specification we created prevfiously,
named `test/Cars-events.spec.js`:

Right at the top, replace:

```javascript
const Cars = artifacts.require('Cars');
```

&hellip; with:

```javascript{3}
// we require the mocked version of the Cars contract instead of the
// original Cars contract itself
const Cars = artifacts.require('MockedCars');
```

From this point on, whenever we run `const instance = await Cars.deployed();`
within this file, it will get us an instance of `MockedCars` instead of `Cars`.

Finally, within the `before` block, let us make sure that we se the time of day
to a value that is on or after six in the morning so that our existing tests
do not fail:

```javascript
    // set a fake block time in the mocked contract
    await instance._mock_setBlockTimeStamp((365 * 86400) + 21600);
```

At this point, please run your tests, and make sure that they all pass.

## Write a new test

Now let's write a test where we attempt to honk a car when you are
not allowed to!

Create a new test, within the existing `contract` block:

```javascript{4}
  it('Honking at car in the wee hours is not allowed', async () => {
    const instance = await Cars.deployed();

    // set a fake block time in the mocked contract

    // perform the state transition

    // assert that we get an error with the expected reason
  });
```

For this test, we **do not** want the default time that was set
in the `before` block - let's pick something that is at three in the morning:

```javascript{2}
    // set a fake block time in the mocked contract
    await instance._mock_setBlockTimeStamp((9999 * 86400) + 10800);
```

Now we attempt to run `honkCar()`, with values that should **otherwise** work,
and capture the error:

```javascript
    // perform the state transition
    let tx;
    let err;
    try {
      tx =
        await instance.honkCar(
          2,
          1,
          {
            // account #2 owns car #2
            from: accounts[2],
          },
        );
    } catch (ex) {
      err = ex;
    }
```

Next, we run some assertions on the error,
to check that it has indeed been thrown for the expected reason:

```javascript{6}
    // should not get a result, but an error should have been thrown
    assert.ok(err);
    assert.ok(!tx);

    // check that the error reason is what you expect
    assert.equal(err.reason, 'cannot honk between midnight and 6am');
  });
```

Run your tests again to make sure that this one passes as well.

### Congratulations

🎉🎉🎉 You have written and deployed a mocked smart contract,
and modified your existing tests to make use of it!

Your smart contract is now certifiably neighbour friendly,
and noise complaint resistant! 😛
