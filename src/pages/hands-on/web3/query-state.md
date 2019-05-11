---
templateKey: about-page
title: Hands-on - web3 - query state
date: 2019-05-07T15:20:00.000Z
updatedDate: 2019-05-07T15:20:00.000Z
draft: false
description:
section: "hands-on"
authors:
  - bguiz
tags:
  - hands-on
---

## Previously &hellip;

- [Project set up](/hands-on/web3/project-setup/)
- [Web3.js scaffolding](/hands-on/web3/scaffold/)

## Functions

Getting set up to talk to a smart contract is extremely involved,
compared to making an API request to a CApp server &hellip;
but we got there!

Now it's time to finally interact with the smart contract!

### Detect when user switches accounts

At any time, the user can switch to a different account in MetaMask.
Our DApp needs to be aware of this, so that we do not sign transactions
using an unintended account, resulting in an error from MetaMask.

Let's fix this by adding the following to the bottom of our `init` function:

```javascript
  // trigger various things that need to happen upon app being opened.
  window.ethereum.on('accountsChanged', updateAccounts);

```

### Hoisting

In Javascript, you may declare functions in any order that you like,
and use them prior to their lexical definition.

In the example above, within the `init` function,
we have a reference to `updateAccounts`,
but the `updateAccounts` function can be anywhere in the same file -
it can be above `init`, or below `init` -
it would not make a difference.

Further reading:
MDN has a great reference article about
[Javascript function hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting).

### Query state

Let's add some functionality to our DApp which actually let's the user do
something.
We'll start with something simple - querying state!

#### Query state of a primitive value

In the HTML file, add the following:

```html
    <!-- add some queries here -->

    <p>
      <label for="queryNumCarsButton">numCars</label>
      <br />
      <button id="queryNumCarsButton">Query Num Cars</button>
      <br />
      <input type="text" id="numCarsOutput" readonly="true" />
    </p>

```

At the bottom of the `init` function, add the following:

```javascript
  // set up listeners for app interactions.
  const queryNumCarsButton = document.querySelector('#queryNumCarsButton');
  queryNumCarsButton.addEventListener('click', queryNumCars);

```

Then implement the `queryNumCars` function:

```javascript
async function queryNumCars() {
  console.log('Query Num Cars');
  const numCars = await CarsApp.contract.methods.numCars().call({
    from: CarsApp.accounts[0],
  });
  console.log(numCars);
  document.querySelector('#numCarsOutput').value = numCars.toString();
}

```

Take a look at `Cars.sol`, and you will see that `numCars` is a public variable.
Solidity automatically generates an accessor function for this.

```solidity
    uint256 public numCars = 0;

```

Since it is a **primitive** value,
we call the accessor function without any parameters: `numCars()`.
Additionally, since we are not mutating the state of the smart contract,
there is no need to send a transaction to the Ethereum network,
and we merely need to interact with our local copy, so we use `.call()`.

This happens to be something that would be useful to do when our DApp starts,
so let's add the following to the bottom of our `init` function:

```javascript
  // trigger various things that need to happen upon app being opened.
  await queryNumCars();

```

#### Query state of a `mapping`

In the HTML file, add the following:

```html
    <!-- add some queries here -->

    <p>
      <label for="carIdInput">Car ID</label>
      <input type="text" id="carIdInput" />
      <br />
      <button id="queryCarByIdButton">Query Car By ID</button>
      <br />
      <textarea rows="10" cols="20" id="carOutput" readonly="true">
      </textarea>
    </p>

```

At the bottom of the `init` function, add an event listener:

```javascript
  // set up listeners for app interactions.
  const queryCarByIdButton = document.querySelector('#queryCarByIdButton');
  queryCarByIdButton.addEventListener('click', queryCarById);\

```

Then implement a `queryCarById` function,
in a manner that is very similar to `queryNumCars` that we just did:

```javascript
async function queryCarById() {
  console.log('Query Car by ID');
  const carIdInput = document.querySelector('#carIdInput');

  const car = await CarsApp.contract.methods.cars(carIdInput.value).call({
    from: CarsApp.accounts[0],
  });
  console.log(car);
  const {
    colour,
    doors,
    owner,
  } = car;
  const parsedCar = {
    colour,
    doors,
    owner,
  };
  document.querySelector('#carOutput').value = JSON.stringify(parsedCar, undefined, 2);
}

```

Take a look at `Cars.sol`, and you will see that `cars` is a public variable.
Just like was the case for `numCars`,
Solidity automatically generates an accessor function for this.

```solidity
    mapping(uint256 => Car) public cars;

```

However, since `cars` is a `mapping`, it is **not** a **primitive** value,
the accessor function expects one parameter -
the key of this `mapping`, which in this case is the car ID (of type `uint256`).
So we need to call the accessor function with one parameter:
`cars(carIdInput.value)`.
Just like with `numCars()`, we are not mutating state,
so no need for a transaction, and we use `.call()` to interact with
our local copy of the contract instead.

### Nicer display

Imagine if crypto kitties simply output the JSON representation of
each of their cats - how many users would that DApp have got?

Stretch goal:
In this DApp we cannot hope for any better unless we display some
cars ourselves.
So display a car as an image, and whose **colour** is dynamic,
based on the response obtained from the query.

## Congratulations

🎉🎉🎉 You have given the users of your DApp the ability to query its state.

Next, we will give the user the ability interact with the contract in
a more involved way:
to mutate its state.

## Next &hellip;

- [Mutate state](/hands-on/web3/mutate-state/)
- [Listen to events](/hands-on/web3/listen-events/)
