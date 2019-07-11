---
templateKey: blog-post
title: "Summary of session #10"
date: 2019-07-10T08:55:00Z
updatedDate: 2019-07-11T18:57:00Z
draft: false
featuredImage: /img/dadc-s01e10-roundup.jpeg
description: "Finale session, featuring guest speakers on permissioned networks, verifiable credentials, and non-blockchain DLTs"
section: news
authors:
  - bguiz
tags:
  - irl
  - s01
  - s01e10
  - summary
  - permissioned-networks
  - quorum
  - json-ld
  - structured-documents
  - verifiable-credentials
  - identity
  - blockchain
  - consensus
  - byzantine-fault-tolerance
  - gossip
---

The DApps Dev Club held its tenth session -
the **final one** for the first season - featuring three **guest speakers**:

- Thomas Lee from Chainstack
- Wong Wai Chung from NextID
- Calvin Cheng from Hedera Hashgraph

We spent sessions one through nine covering topics that were focused very much on Ethereum,
and developing decentralised applications using Ethereum.
In this finale session though, we took a different track -
and our topics were all themed around *Beyond Ethereum*.
The common thread between all of the different topics was how
technology and concepts employed by Ethereum, or other crypto networks,
have been used in different ways.

We also had a **record high turnout** for the session: 44!

~~Videos will be posted soon!~~
All [videos from this session](/blog/2019-07-12-dapps-dev-club-10th-session-videos/ "Videos from DApps Dev Club session #10")
have now been posted!

<!-- excerpt -->

## Format

The usual format for our sessions thus far has been:

- Cover material selected from *Mastering Ethereum*
- Try out a demo, or do a hands-on exercise
- Repeat the above a two or three times

This time however, we had no hands-on exercises,
and we had guest speakers talk about their experiences.
The format was more similar to the usual tech meetup format.
It was nice to change things up a little!

## Above and beyond

During the sessions, we thanked not only the organisations that have made the sessions possible,
but also the individual people who have gone out of their way to help out with running them.

A quick shout out to:
Dr Leong Li Ming from Lifelong Learning Institute,
Ashlie &amp; Dennis from Chainstack &amp; Acronis,
Sarah Thiam &amp; Dickson from Microsoft,
Wing &amp; Daniel &amp; Lewis from NBC'19,
Michael Cheng from EngineersSG,
Gerald Nah,
Kenneth Goh,
Jack Ng,
Scott Koh,
Solomon Soh -
all of you have helped out in many ways that are mostly behind-the-scenes,
and thus often unnoticed.
You have been great, and helped make these sessions happen!

## Topics

### Permissioned networks and Quorum

[Thomas Lee](https://www.linkedin.com/in/thomas-lee-95b024b1/)
from Chainstack kicked off the session with a talk about 
permissioned networks, with a focus on Quorum.

Quorum is a fork of Ethereum, with modifications made
that make it suitable for deployments in permissioned networks -
which are also known as private chains.
The key changes that Quorum has made to Ethereum are that:

- It uses a different consensus algorithm (RAFT or IBFT)
  instead of Proof-of-Work (Satoshi consensus)
- It has the concept of a private transaction - 
  referred to as `privateFor` in Quorum lingo - where data is encrypted at rest,
  and public key cryptography is used to gate read and write access
  to smart contract data

Thomas explored the implications of each of these differences in depth.

My personal reflection here is that while permissioned networks 
are *not truly decentralised*, they still have some of the benefits 
of using the technologies that underpin crypto networks,
in order to build general purpose *distributed computation networks*.

### Structured documents, verifiable credentials, and self-sovereign identity

[Wong Wai Chung](https://www.linkedin.com/in/wai1chung/)
from NextID talked about structured documents, verifiable credentials,
and self-sovereign identity.

So we started off with structured documents, 
which are essentially representing something in a manner
that is machine parseable, because it has a schema,
and the schema itself is defined using a standard -
in this case that standard was JSON-LD.

However, the problem with structured documents is that 
they only solve parseability - 
anyone can make up fake data that passes schema validation.
For this, we need verifiable credentials.
Think checksums, except instead of CRCs, weighted-modulos, et cetera,
you use hash functions, Merkle trees, 
and write the Merkle tree's root onto an immutable distributed ledger 
(Blockchain, for example).

This certainly guarantees you a lot more than just having structured documents,
but you could still make up *fake credentials*,
you would just need to do a bunch of extra steps in order to have it validate.
This is where we need to use digital signature algorithms in order to ensure
that a document is indeed not made up, 
as we know that only the possessor of a particular private key can sign data.

And yet again, we find a hole in the solution, 
because anyone can *generate their own set of keys* and claim themselves
to be the signing authority, and sign their own documents,
thereby passing all of the validations necessary.
At this point it becomes apparent that the core issue that needs to be solved
really is **identity**.
When a claim of an identity is correctly independently verifiable,
then we can plug the final whole in the sequence of solutions that we have gotten up to with at this point.

This was certainly a meaty talk,
with lots of completely new concepts introduced.

My personal takeaway from this was that identity is a problem that is hard to solve,
and that we have yet to find a solution that is self-sovereign,
that is, not based around blind trust in a central authority.
The path taken to solving this problem, however, already has lots of interesting solutions.

### Non-blockchain distributed ledger technologies

[Calvin Cheng](https://www.linkedin.com/in/calvinchengx/)
from Hedera Hashgraph talked about non-blockchain distributed ledger technologies.

Hashgraph is both a consensus algorithm and data structure.
It has been used to build Hedera, which is a crypto currency,
that does *not* use blockchain at all:

- For **consensus**: Instead of using Proof of Work, an alternate
  "gossip about gossip" voting based consensus algorithm is used instead.
- For **data structures**: Instead of having a singly linked list where each node
  is a binary tree of transactions, a directed acyclic graph where each
  edge is a transaction is used instead.

This in itself turns everything we know about crypto currency implementation
on its head, as two core parts of their implementation have been
completely replaced by something radically different.
It is a distributed ledger technology that is *not* a Blockchain.

What's interesting is that despite these differences,
development of DApps is not going to be that much different,
because their smart contracts are based on the EVM,
and plan to be compatible with Ethereum dev tools and libraries,
such as Truffle and `web3.js`.

My personal takeaway here was that DApp development skills are transferrable
from one crypto network to the next - at least some of the time.
Furthermore, that the existence of such a radically different network implementation
is evidence that there is a huge amount of innovation in
technologies used in decentralisation,
and we are likely only just beginning to see this space mature.

## Next season

DApps Dev Club is *planning* to hold its next ~~session~~ season soon!

&hellip; but we would like to hear from you first!

- What are the other networks that you would like to build DApps on?
- Are there any upcoming hackathons that you would like to build a DApp at?
- What would you like to learn about in DApps Dev Club season #2?
- Do you have a venue that we can use for session in season #2?
- Do you have cash to splash to sponsor sessions in season #2?

Please join the
[DApps Dev Club chat group](https://bit.ly/dadc-chat)
and let me know your answers to the above.
