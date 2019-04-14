---
templateKey: about-page
title: Testing Data Storage in Solidity Smart Cntracts
date: 2019-04-21T15:36:00.000Z
updatedDate: 2019-04-21T15:36:00.000Z
draft: false
description: How to test data storage when developing using truffle
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

## Recap

Previously we have set up a truffle project, which contains a `Cars`
smart contract (the implementation),
and a specification file that references it.
As of yet, we still have zero tests - let's get cracking! 🏁

## Adding a test block

Look in the existing test file, `test/Cars.spec.js`, and replace this part:

```javascript
// tests go here
```

&hellip; with a test.

```javascript{2}
  it('Initialised with zero cars', async () => {
    const instance = await Cars.deployed();

    // assertions go here
  });
```

This test is not yet very useful - there are no assertions made.

At this point it is worth pointing out that the test is identical to a standard
mocha test:

- We use an `it` block
- Its first parameter is a string, which is a description of the test
- Its second parameter is a function in which the code executing the test
  is written.
  - Within the test function body, we set up the initial state of the test,
  - which is then followed by the assertions

The only new thing here is `Cars.deployed()`.
Within the context of truffle tests, this is saying that we start of with a
fresh instance of the contract for each test.

Note that this operation is asynchronous, and returns a `Promise` -
many smart contract interactions do the same -
and thus we need to `await` it,
and the function it is within must be declared as `async`.
If we were to use mocha to test any other Javascript functionality which
is `Promise`-based, it would be exactly the same.

## Adding some assertions

Replace this part:

```javascript
// assertions go here
```

&hellip; with some code that retrieves a value from the contract,
and then compares it to an expected value:

```javascript{2}
    const initialNumCars =
      await instance.numCars.call()

    assert.equal(initialNumCars.toString(), '0');
```

This type of comaprison is called an **assertion**.

Here `initialNumCars` is an instance of `BN`.
It is used because it can store very large integers,
and certainly can handle numbers that Solidity smart contracts can.
These are much larger than what Javascript's built-in `Number` type can.
We obtained `BN` via `web3`, which is available as a global variable,
thanks to truffle.

## Run your tests

Once again, run:

```bash
truffle test
```

You should get output similar to:

```bash{12}
Using network 'development'.

Compiling your contracts...
===========================
> Compiling ./contracts/Cars.sol
> Compiling ./contracts/Migrations.sol
> Artifacts written to /var/folders/_9/ywg4bs594rd1zfh0n6166rr40000gn/T/test-119322-12133-5bq3y1.ci3p5
> Compiled successfully using:
   - solc: 0.5.0+commit.1d4f565a.Emscripten.clang

  Contract: Cars - data storage
    ✓ Initialised with zero cars (41ms)

  1 passing (59ms)
```

This time we have one test - up from zero - and it has passed.

Try experimenting - make the test fail by breaking the implementation,
or by breaking the specification.
Try to see if you can break both the implementation and specification at the
same time in order to get a **false negative**,
as we saw in the [introduction to mocha](/hands-on/mocha-intro/).

## Add more tests

This is just one test that you can write,
which tests the state of this contract.

Think of any other tests that you could write to test
the initial state of this smart contract.

Hint:
How about the `cars` (which is a `mapping`) -
is there something that you could write a test for here?

There are a number of others that you could write as well,
but in order for that to happen,
we would need some non-default state to occur.
That is precisely what we are about to do next.

## Congratulations

🎉🎉🎉 You have got your very first test running!

Next, we will write some more complex tests!

## Next &hellip;

- [Testing Solidity State Machines](/hands-on/testing/solidity-state-machines/)
- [Testing Solidity Events](/hands-on/testing/solidity-events/)
- [Mocking Solidity for Tests](/hands-on/testing/solidity-mocks/)
