---
templateKey: blog-post
title: "Round up of session #03"
date: 2019-03-29T07:32:00Z
updatedDate: 2019-03-29T07:32:00Z
draft: false
description: 3rd session - Talking to Ethereum - EVM's Stack Based Execution + Cryptographic Key Generation + MetaMask + Simple Transactions + DApp Games
featuredImage: /img/dadc-s01-e03-featured-image.jpeg
section: news
authors:
  - bguiz
tags:
  - irl
  - s01
  - s01e03
  - summary
  - evm
  - rpn
  - cryptography
  - metamask
  - dapp
  - ethereum
---

DApps Dev Club held its third session - Talking to Ethereum - on Tuesday, where the stack-based execution model used by the Ethereum Virtual Machine, means to generate cryptographic keys for use in Ethereum wallet software, using MetaMask, performing simple transactions, and DApp Games.

We've *already* posted
[the videos from the session here](/blog/2019-03-27-dapps-dev-club-3rd-session-videos/).

<!-- excerpt -->

The goal was originally to spend some time getting everyone set up to use their networks to talk to the Ethereum network, followed by an introduction to Solidity.
However, we never fully got around to the latter part, because we spent too long on the set up. We will cover this in our next session instead!

## Format

As promised in the
[kickoff session](https://dappsdev.org/blog/2018-02-25-dapps-dev-club-kickoff-session/), and
[session #02](/blog/2019-03-14-dapps-dev-club-2nd-session-roundup/),
we have now finally transitioned from a one-way information transfer kind of environment, akin to a lecture&hellip;
to a more participatory hands-on kind of environment, akin to a workshop.

Things are finally starting to feel like it is a **technical book club**, as originally envisioned.

## Deck

If you would like to review the slide deck that was presented again, or follow
along while watching the recordings, or get at a hyperlink that we mentioned -
[here it is!](https://dappsdev.org/deck/s01e03/ "DApps Dev Club S01E03 Slide Deck")

## Topics

## EVM's stack-based execution model

The concept of a virtual machine as a software abstraction over hardware execution was introduced in session #02, and along with it a brief mention that Ethereum's virtual machine made use of a stack-based execution model - but with no further details.

As we all will be learning about and making use of solidity compilers, we thought it would best to visually show exactly what was meant by that.

Using reverse-Polish-notation and EVM op codes we stepped through a simple arithmetic operation with [illustrations for each step of the way](/deck/s01e03/#evm_stacks_steps).

## Generating cryptographic keys Ethereum

In this section we talked about BIP39, BIP44, and BIP32, and how they can be used to generate a large number of cryptographic keys from a single seed phrase, in a secure way.

When talking about randomly generated entropy,
[keep this XKCD comic in mind](https://xkcd.com/936/ "XKCD password strength")!

## Performing simple transactions

Next we installed MetaMask, which was introduced in session #02, this time we made use of the seed phrase that we generated as an input, as demonstrated that each *Account* actually matches the keys generated using BIP39.

Next, we used these accounts to send each other test-net Ethers, via
[this simple web page](https://dappsdev.org/hands-on/simple-tx/).

We also wrote random text strings onto the (test-net) blockchain, just for fun!

## Solidity

This is the section that we had been gearing up, never quite got enough time. Instead we talked about a learning tool which teaches you how to build your own version of CryptoKitties - the DApp that was so popular that it actually, at one point, "crashed" the Ethereum network with too many transactions.

[CryptoZombies](https://cryptozombies.io/) is that game, except that instead of kittens, you have Zombies.

## Reflections

**Pace**: Four of you said that the pace was too slow for you, during the hands-on sections. We are trying to cater for everyone, but at the same time feel your frustrations. But can we have our collective cake and eat it too? Vedant came up with an interesting solution:

Have the ones who finish quicker go around the room and help the rest who have not yet (completely optional, of course). This is totally in the spirit of a technical book club, so let's try this out
[our next session](https://dappsdev-s01e04.eventbrite.com/),
and see how it goes!

**Support**: We've received so much positive feedback with comments such as:

> This has been something I've wanted to try out for a while, but never got around to. I'm so glad that you're doing these sessions.

It is great that the stuff that we're doing in these sessions resonates so well with you. Also we've noticed that there are a number of you who have turned up at all three sessions so far - you're familiar faces now!!

**Offering help**: We've also been getting offers from you as participants to help us organising these sessions. From helping out with the pre-session AV set up, to offering to help build demos for the sessions. This is all great, and again, a very nice sign that we're building a neat club here. Thank you everyone!

## Favourites

The favourite part about this session was the **simple transactions hands-on**. For many of you, this would have been your first interaction with the Ethereum network.

In addition to this, we sensed that quite a few of you were pretty curious/ excited about being able to write not just transactional data, but also completely arbitrary data, to an publicly available immutable ledger.

One of the questions asked during the hands-on is also worth highlighting here, which was:

> Why was there a fee to transfer zero Ether?

This was really interesting because it was a very concrete way to show that executing a transaction is based solely on computational complexity, and not a percentage based fee.

## Thanks

A huge thanks to [BitTemple](https://bittemple.io/)
for hosting us at their excellent office space.
Especially Solomon for organising the event space.

Thanks also to Wing & Gerald for their on-site assistance in running the event.

## Next session

Our fourth session will be on Tuesday 9th April. Please let us know if you're
planning to attend, as it helps us to plan!

[**RSVP** on eventbrite](https://dappsdev-s01e04.eventbrite.com/)
