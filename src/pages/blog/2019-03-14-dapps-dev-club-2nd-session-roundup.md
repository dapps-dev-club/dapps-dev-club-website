---
templateKey: blog-post
title: "Round up of session #02"
date: 2019-03-14T16:18:00Z
updatedDate: 2019-03-16T01:35:00Z
draft: false
description: 2nd session - Tech overview - EVM + Smart Contracts + Web3
featuredImage: /img/dadc-s01-e02-featured-image.jpeg
section: news
authors:
  - bguiz
tags:
  - irl
  - evm
  - smart contract
  - web3
---

DApps Dev Club held its second session - Technical overview - on Tuesday,
where we covered the Ethereum Virtual Machine, Smart Contracts, and Web3.

Each of these three things are hard to explain without first knowing what the other
two of them are, so the over-arching idea was to go cover each of these briefly,
in a single session, before we delve into the details about them in subsequent 
sessions. Hence we had an "overview". We could call this, to borrow a very apt
computer science terminology, a
[*breadth-first* approach](https://en.wikipedia.org/wiki/Breadth-first_search)
(with our subsequent sessions being
[*depth-first*](https://en.wikipedia.org/wiki/Depth-first_search)).

Hopefully all who attended came away with an understanding of
not only what the purpose of each of these three things are, but also how
they they *integrate*, and fit in with each other.

<!-- excerpt -->

## Format

As promised in the [kickoff session](https://dappsdev.org/blog/2018-02-25-dapps-dev-club-kickoff-session/),
this session saw a small, but deliberate, shift from being a one-way information
presentation session - akin to a lecture - and towards an interactive, hands-on
session - akin to a **workshop**.
While we did spend most of the time looking at information on slides, we also spent a some time exploring and trying out  mini-exercises on your computers.

The other changes that happened naturally, was that the talking was a lot more 
bi-directional, with you fielding many questions and comments. 

We hope that this continues, being more **participatory** - with both working 
hands-on on something, as well as with discussion - as that is the core or 
essence of being a **technical book club**!

As with the kickoff session, we recorded this one too. ~~, and will post them as soon as we can!~~

[Videos for Session #02](/blog/2019-03-16-dapps-dev-club-2nd-session-videos/)
are now up.

## Deck

If you would like to review the slide deck that was presented again, or follow
along while watching the recordings, or get at a hyperlink that we mentioned - 
[here it is!](https://dappsdev.org/deck/s01e02/ "DApps Dev Club S01E02 Slide Deck")

## Hands on

We had two hands-on parts during the session.

### Compile solidity in Remix

This exercise was one to simply get our feet wet:

- Open up Remix
- Copy-and-paste a sample Solidity file into it
- Press the compile button
- Inspect the compiler output
- Relate this compiler output to EVM byte codes and op codes that were just discussed

Here are [instructions we used](https://gist.github.com/bguiz/3d7048362323cc76931f72719972dc3b "compile and inspect solidity demo instructions"),
if you would like to follow along.

### Code state blockchain

In the kickoff session, we explained what a blockhain was using Anders' Blockchain demo.
This demo was great because it starts from the most primitive feature, the hash,
and then builds up, step-by-step, to showing how a blockchain works.

However, towards the end, it becomes specific to transfers of currency, which is
merely one of the use cases for a blockchain. In Ethereum (as with many others since it),
there is also **code and state**, the building blocks that enable smart contracts.

So we [forked Anders' Blockchain demo](https://github.com/anders94/blockchain-demo/compare/master...dapps-dev-club:feat/codestate)
to add a new tab that adds a demonstration for precisely that - code and state on a blockchain.

Here are the [instructions to follow along](https://gist.github.com/bguiz/d9737ab76bf58ab20b4884f3f15bcb39 "code state blockchain demo instructions").

## Questions

There were quite a few questions that were fielded.

A few of them were related to the nonce in a block:

- Do nodes share/ publish their nonces?
- Why is the nonce included in the data that is hashed?

A few of them were related to the mechanics of Nakamoto consensus:

- How does a soft fork arise?
- How about hash collisions?

Finally, a few questions about the Ethereum network:

- How many nodes are currently on the Ethereum main net?
- Is the price of gas stable, or does it fluctuate?

Hopefully these questions were answered well!

## Favourites

The code state blockchain demo was a hit, with lots of **Aha** moments all around.
We even got requests to *take it further*, by making it a smart contract blockchain demo!

The other thing that perhaps wasn't so much a favourite, as it was something that
provoked a very obvious reaction (gasps!) was the cost of storage. One 
participant even remarked during the break that she was now reconsidering about
whether something that she had in mind could be feasibly built on a blockchain. 

## Thanks

A huge thanks to [Chainstack](https://chainstack.com) and
[Acronis](https://www.acronis.com/) 
for hosting us at their excellent office space. Especially 
Ashlie for organising the event space, and Dennis for supporting the AV set up.

Thanks to [Spartan](https://spartangroup.io) for sponsoring the refreshments,
and their community outreach.

Thanks to [StartupToken](https://www.startuptoken.com) for their community
outreach.

Thanks also to Wing & Gerald for their on-site assistance in running the event.

## Next session

Our third session will be on Tuesday 26th March. Please let us know if you're 
planning to attend, as it helps us to plan for seating, et cetera.

[RSVP on eventbrite](https://dappsdev-s01e03.eventbrite.com/)
