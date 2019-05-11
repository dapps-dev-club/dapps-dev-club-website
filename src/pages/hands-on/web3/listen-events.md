---
templateKey: about-page
title: Hands-on - web3 - listen to events
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
- [Query state](/hands-on/web3/query-state/)
- [Mutate state](/hands-on/web3/mutate-state/)

## Listen to events

Listening to events is harder than to do than request-response type stuff.
This happens to hold true for both DApps and CApps.
Thankfully web3.js has a well defined interface for dealing with events.

### Simple listeners

At the bottom of the `init` function, add the following:

```javascript
  // trigger various things that need to happen upon app being opened.
  listenToHonks(0);

```

Next implement the `listenToHonks` function:

```javascript
function listenToHonks(fromBlockNumber) {
  console.log('Listening for honks');
  CarsApp.contract.events.CarHonk({
    fromBlock: (fromBlockNumber || 0),
  }, honkListener);
}

```

When the function above runs, it tells web3.js to call a `honkListener` function
each time a `CarHonk` event is emitted.
By default, it does this for every single event in the past,
and then also does so as they come in.

Let's implement the `honkListener` function:

```javascript
function honkListener(err, contractEvent) {
  if (err) {
    console.error('Honk listener error', err);
    return;
  }
  console.log('Heard something!');
  const {
    event,
    returnValues,
    blockNumber,
  } = contractEvent;
  const {
    fromCar,
    atCar,
  } = returnValues;
  console.log(`${event}: Car #${fromCar} honked at Car #${atCar} (block #${blockNumber})`);
}

```

This function takes its second parameter -
the event that was just emitted -
and parses it to extract the relevant values.
In particular:

- `event` - which will always be `'CarHonk'`
- `blockNumber` - which indicates the block in which the event was emitted,
  thus giving us the order in which they were emitted
- `returnValues` - which are the parameters of the `CarHonk` event:
  - `fromCar`
  - `atCar`

In order to write this function, we should refer to the event definition
within our smart contract implementation:

```solidity
    event CarHonk (uint256 indexed fromCar, uint256 indexed atCar);

```

Here we see `CarHonk` as the event name,
and `fromCar` plus `atCar` as the event parameters.

Great - let's put the event listeners to the test!
Honk a car - that the currently selected account owns -
and then see what happens!

### Build a table

Here's bit of added challenge - let's display the events on the page,
and not just output to the console!

In the HTML file, add the following:

```html
    <!-- add event display here -->

    <h3>CarHonk</h3>

    <table id="carHonkEvents">
      <thead>
        <tr>
          <th scope="col">
            From Car #
          </th>
          <th scope="col">
            At Car #
          </th>
          <th scope="col">
            Block #
          </th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>

```

Just underneath the `console` statement in the `honkListener` function,
add the following:

```javascript
  const tbody = document.querySelector('#carHonkEvents > tbody');
  const tr = createTableRowElement(
    '' + fromCar,
    '' + atCar,
    '' + blockNumber,
  );
  tbody.appendChild(tr);

```

Then implement the `createTableRowElement` helper function like so:

```javascript
function createTableRowElement(...strings) {
  const tr = document.createElement('tr');
  strings.forEach((str) => {
    const td = document.createElement('td');
    td.appendChild(document.createTextNode('' + str));
    tr.appendChild(td);
  });
  return tr;
}

```

(that will be the most complex DOM wrangling we're going to do today! 😅)

### Filtering events

With the way that we have set up our listen for the `CarHonk` events,
each time we load the app, we're going to get **every* single one of them.
Which may be OK for a demo application, but in a large scale one,
where there are many users, and they have been using the DApp for a long time,
the entirety of the event history is probably less relevant.
It would make the most sense to display to the end user perhaps just a summary
of all of the events, or even just to display the last few events.
In some cases, the user would only care about a particular subset
of the events - the ones they are **involved** in.

Thankfully, web3.js provides built in means to filter events,
so we do not need to build our own custom ones.
Here are a couple of stretch goals for you to take on:

**Only the most recent events**:

You will notice that the current implementation of `listenToHonks`
already takes in one parameter,
which is used to specify the `fromBlock` filter.

Make use of this to only listen to events in the past few blocks.

Hints:

- You can make use of
  [`web3.eth.getBlockNumber`](https://web3js.readthedocs.io/en/1.0/web3-eth.html#getblocknumber)
  to obtain the current block number

**Only the events that the current user cares about**:

The average person does not normally care of one car honks at another car,
when neither car is theirs.
This is a more complex task:
Only display `CarHonk` events for which `fromCar` or `atCar` is one of the cars
that the current account owns.

Hints:

- Take a look at `options.filter` in the
  [`web3.eth.contract.events`](`https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#contract-events)
  documentation
- You may make use of [localForage](https://github.com/localForage/localForage)
  to store state within your browser that you need to persist between
  page refreshes
- How would you modify the implementation of the smart contract
  in order to make for a less round about means to implement this feature?

## Error Handling

Throughout our application so far,
when we go through the happy path, we have displayed the output on the page.
However, when we encounter an error,
the user does not know anything -
unless they have their developer console open.
This is not great, obviously, as most users are not developers,
and will need some indication displayed in the page itself
when errors do occur.

Hints:

- [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
  blocks can be used to capture and deal with errors.
  There already is one in use within the `init` function.
- If you do not want to write a whole bunch of DOM manipulation code,
  a quick and easy way would be to add a dependency that does this for you.
  [github.com/CodeSeven/toastr](https://github.com/CodeSeven/toastr)
  looks like it could meet the needs for this feature.

## Congratulations

🎉🎉🎉 You have given the users of your DApp the ability to listen to
events that are on your smart contract.

Congratulations, you have completed all of the hands-on exercises for web3!
