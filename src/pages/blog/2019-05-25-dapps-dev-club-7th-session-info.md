---
templateKey: blog-post
title: "Info about session #07"
date: 2019-05-25T04:38:00Z
updatedDate: 2019-05-25T04:38:00Z
draft: false
description: "What you need to know about our 7th session!"
featuredImage: /img/dadc-s01e07-featured-image.jpeg
section: news
authors:
  - bguiz
tags:
  - irl
  - s01
  - s01e07
  - security
  - audit
  - lint
  - coverage
  - static analysis
---

DApps Dev Club is holding its 7th session, about smart contract security,
on Tuesday, 28th May.

[**RSVP now!**](https://dappsdev-s01e07.eventbrite.com/)

Here's what you need to know!

<!-- excerpt -->

## Event

The session will be held at
[BitTemple's](https://bittemple.io/)
office in Raffles Place.

Thanks Solomon for helping us run the event!

## Topics

In our previous session,
we wrote the client that allows an end user to
interact with our smart contracts,
using a combination of various front-end web development tools,
together with web3.js.

In session #04 we wrote a smart contract,
and in session #05, we wrote tests against our smart contracts.
In this session, we will learn about smart contract security,
which relates more to what we did in sessions #04 and #05,
and does **not** exactly flow on from the previous session.
So if you need a recap, please read the summary posts,
or watch the videos recorded,
for those sessions if you would like a refresher:

- [Session #04 summary](/blog/2019-04-12-dapps-dev-club-4th-session-roundup/)
- [Session #04 videos](/blog/2019-04-13-dapps-dev-club-4th-session-videos/)
- [Session #05 summary](/blog/2019-05-02-dapps-dev-club-5th-session-roundup/)
- [Session #05 videos](/blog/2019-05-01-dapps-dev-club-5th-session-videos/)

Specifically, for this session, what we have lined up:

- Demonstration of a common security vulnerability: Reentrance
  - We will write a vulnerable contract,
    then write another contract that successfully attacks it,
    and finally fix the contract such that it cannot be attacked
    using the same method.
- Introduce security training games, and play them a little bit
- Look at various Solidity developer tools that aid in the development of
  smart contracts.
  - Focus on tools that performs static and dynamic analyses.

As with the previous session, there will be hands-on parts.
However, as mentioned in the **Reflections** section of the
[session #06 summary post](/blog/2019-05-16-dapps-dev-club-6th-session-roundup/),
we will be kicking the difficulty level of this session **down a notch**,
so that it will be easier to follow along.
If you enjoyed the pace and complexity of sessions #03 and #04,
you'll enjoy this session too! 😁

Security is a **huge** topic within smart contracts,
and a single session on it would not everbe sufficient to cover it in any
reasonable amount of detail.
In fact, security alone could be the basis of an entire series of sessions!
Thus, this session has been designed as more of an introductory level **survey**
of the various facets of smart contract security,
with the intended take away for attendees being that you are **aware** of them,
and are eqiuipped with the resources to delve deeper into them
when the need strikes.

## Preparation

In this session, most of the things that we will be doing are browser based,
and to follow along you will need Chrome or Chromium,
with [MetaMask](https://metamask.io/) installed as a browser plugin.

In order to follow along with the secruity training games,
you will need some **Ropsten test net Ether**,
so please find a faucet and grab some Ether ahead of the session,
so that you do not need to waste time during the session.

Further to this, if you would like to follow along and try out
the demos as well, you should also install the following:

- [slither](https://github.com/crytic/slither) -
  `pip install slither-analyzer`
  - Note that you will need a Python 3 environment set up for this to work,
    which contradicts the requirement for `node-gyp` with Python 2 😬
    so this might make make it difficult to install.
- [solidity-coverage](https://github.com/sc-forks/solidity-coverage) -
  `npm i -g solidity-coverage`
  - This should be an easy installation,
    if you have prweviously installed truffle successfully.
- If you do not want to use Ropsten, you have the option of running things locally:
  - Clone the [ethernaut](https://github.com/OpenZeppelin/ethernaut) git repo,
    and follow the instructions for `localhost` in the readme.
  - Note that the installation for this is quite time consuming, be warned!
- If you would like to use the newer, snazzier, edition of Remix IDE that
  has just been released, you can run that locally too:
  - get [remix-ide](https://github.com/ethereum/remix-ide) -
    `npm i -g remix-ide`
  - This should be quite an easy installation as well,
    if you have previously intsalled truffle.

Do *attempt* to get these installed prior to the session if you can -
as it will be fun to follow along with -
but no worries if you cannot, as there will be live demos of these anyway!
The only true requirements here are Chrome + MetaMask.

## Projects

In the previous session, a few of you did say that you felt you were
ready to start developing your own DApps,
and asked for some project ideas to work on.
We're stoked!

&hellip; for those who are interested, please take your ideas to our
[chat group](https://dappsdev-s01e07.eventbrite.com/),
or come and talk with us during the session -
we have a few interesting ones for you to tackle!

## Next session

[**RSVP** on eventbrite](https://dappsdev-s01e07.eventbrite.com/)

&hellip; it helps us plan for seating, ordering F&amp;B, et cetera.

See you all again soon!
